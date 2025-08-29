// controllers/simpananController.js
import { crud } from "./baseController.js";
import { Simpanan, JenisSimpanan, Anggota, Kas, sequelize } from "../models/index.js";
import { postJournal } from "../utils/accounting.js";

const base = crud(Simpanan, [
    { model: Anggota, as: "anggota" },
    { model: JenisSimpanan, as: "jenis_simpanan" }
]);

base.create = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const simpanan = await Simpanan.create(req.body, { transaction: t });
        const akun = () => ({
            kas: Number(process.env.ID_KAS),
            simpanan: simpanan.id_jenis === 1 ?
                Number(process.env.ID_SIMPANAN_POKOK) : simpanan.id_jenis === 2 ?
                    Number(process.env.ID_SIMPANAN_WAJIB) : Number(process.env.ID_SIMPANAN_SUKARELA),
        });
        // === Kas (masuk) ===
        await Kas.create({
            jenis: "masuk",
            jumlah: simpanan.jumlah,
            keterangan: `Setoran simpanan anggota #${simpanan.id_anggota}`,
            tgl_transaksi: simpanan.tgl_simpan,
            sumber: "simpanan",
            ref_id: simpanan.id_simpanan
        }, { transaction: t });

        // === Jurnal ===
        const A = akun();
        await postJournal({
            tgl: simpanan.tgl_simpan,
            deskripsi: `Simpanan #${simpanan.id_simpanan}`,
            sumber_referensi: "SIMPANAN",
            ref_id: simpanan.id_simpanan,
            entries: [
                { id_akun: A.kas, debit: simpanan.jumlah, kredit: 0 },
                { id_akun: A.simpanan, debit: 0, kredit: simpanan.jumlah },
            ]
        }, t);

        await t.commit();
        res.status(201).json({ status: true, data: simpanan });
    } catch (e) {
        await t.rollback();
        res.status(400).json({ error: e.message });
    }
};

export default base;
