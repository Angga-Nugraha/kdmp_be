import dayjs from "dayjs";
import { crud } from "./baseController.js";

import { Angsuran, Pinjaman, Kas, sequelize } from "../models/index.js";
import { postJournal } from "../utils/accounting.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const base = crud(Angsuran, []);

const akun = () => ({
    kas: Number(process.env.ID_KAS),
    piutang: Number(process.env.ID_PIUTANG_PINJAMAN),
    pendapatanBunga: Number(process.env.ID_PENDAPATAN_BUNGA),
    pendapatanDenda: Number(process.env.ID_PENDAPATAN_DENDA),
});


const persenDendaHarian = () => Number(process.env.DENDA_PERSEN_PER_HARI) || 0;

base.create = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id_pinjaman, angsuran_ke, jumlah, tgl_bayar } = req.body;
        const pinjaman = await Pinjaman.findByPk(id_pinjaman, { transaction: t, lock: t.LOCK.UPDATE });
        if (!pinjaman) throw { status: 404, message: "Pinjaman tidak ditemukan" };
        if (pinjaman.status !== "berjalan") throw { status: 400, message: "Pinjaman tidak dalam status berjalan" };


        const bungaBulanan = Number((Number(pinjaman.jumlah) * Number(pinjaman.bunga) / 100 / pinjaman.tenor).toFixed(2));

        let denda = 0;
        if (req.body.tgl_jatuh_tempo && tgl_bayar) {
            const jt = dayjs(req.body.tgl_jatuh_tempo);
            const tb = dayjs(tgl_bayar);
            const telatHari = Math.max(tb.diff(jt, "day"), 0);
            if (telatHari > 0) denda = Number((jumlah * (persenDendaHarian() / 100) * telatHari).toFixed(2));
        }

        const porsiBunga = Math.min(bungaBulanan, jumlah);
        const porsiPokok = Math.max(Number(jumlah) - porsiBunga, 0);

        const angsuran = await Angsuran.create({
            id_pinjaman,
            angsuran_ke,
            jumlah,
            denda,
            tgl_jatuh_tempo: req.body.tgl_jatuh_tempo || null,
            tgl_bayar: tgl_bayar || dayjs().format("YYYY-MM-DD"),
            status: "lunas"
        }, { transaction: t });

        await Kas.create({
            jenis: "masuk",
            keterangan: `Angsuran pinjaman #${id_pinjaman} ke-${angsuran_ke}`,
            jumlah: Number(jumlah) + Number(denda),
            tgl_transaksi: angsuran.tgl_bayar,
            sumber: "angsuran"
        }, { transaction: t });

        const A = akun();
        await postJournal({
            tgl: angsuran.tgl_bayar,
            deskripsi: `Angsuran #${angsuran.id_angsuran} Pinjaman #${id_pinjaman}`,
            sumber_referensi: "ANGSURAN",
            ref_id: angsuran.id_angsuran,
            entries: [
                { id_akun: A.kas, debit: Number(jumlah) + Number(denda), kredit: 0 },
                { id_akun: A.piutang, debit: 0, kredit: porsiPokok },
                { id_akun: A.pendapatanBunga, debit: 0, kredit: porsiBunga },
                ...(denda > 0 ? [{ id_akun: A.pendapatanDenda, debit: 0, kredit: denda }] : [])
            ]
        }, t);

        const paid = await Angsuran.findAll({ where: { id_pinjaman }, transaction: t });
        const totalBayar = paid.reduce((a, x) => a + Number(x.jumlah || 0), 0);
        const totalBungaEstimasi = bungaBulanan * Number(pinjaman.tenor);
        const pokokTerbayar = Math.max(totalBayar - totalBungaEstimasi, 0);

        if (pokokTerbayar + 1e-2 >= Number(pinjaman.jumlah)) {
            pinjaman.status = "lunas";
            await pinjaman.save({ transaction: t });
        }

        await t.commit();
        res.status(201).json({ angsuran, breakdown: { pokok: porsiPokok, bunga: porsiBunga, denda } });
    }
    catch (e) {
        await t.rollback();
        res.status(400).json({ error: e.message });
    }
};

export default base;