import { crud } from './baseController.js';
import { Kas, sequelize } from "../models/index.js";
import { postJournal } from "../utils/accounting.js";

const base = crud(Kas);

base.create = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { jenis, jumlah, tgl_transaksi, keterangan, akun_lawan, sumber, ref_id } = req.body;

        // 1. Simpan ke tabel kas
        const kas = await Kas.create({
            jenis,
            jumlah,
            tgl_transaksi,
            keterangan,
            sumber,
            ref_id: ref_id || null
        }, { transaction: t });

        // 2. Mapping akun Kas (default ID dari .env)
        const A = {
            kas: Number(process.env.ID_KAS)
        };

        // 3. Buat jurnal sesuai jenis
        let entries = [];
        if (jenis === "masuk") {
            entries = [
                { id_akun: A.kas, debit: jumlah, kredit: 0 },
                { id_akun: akun_lawan, debit: 0, kredit: jumlah }
            ];
        } else {
            entries = [
                { id_akun: akun_lawan, debit: jumlah, kredit: 0 },
                { id_akun: A.kas, debit: 0, kredit: jumlah }
            ];
        }

        await postJournal({
            tgl: tgl_transaksi,
            deskripsi: keterangan || `Transaksi kas manual`,
            sumber_referensi: "KAS",
            ref_id: kas.id_kas,
            entries
        }, t);

        await t.commit();
        res.status(201).json({ status: true, data: kas });
    } catch (e) {
        await t.rollback();
        res.status(400).json({ error: e.message });
    }
};

export default base;
