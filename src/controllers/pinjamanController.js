import { crud } from './baseController.js';
import { Pinjaman, Anggota, Angsuran,Kas, sequelize } from '../models/index.js';
import { postJournal } from "../utils/accounting.js";

const base = crud(Pinjaman, [
    { model: Anggota, as: "anggota" },
    { model: Angsuran, as: "angsuran" }
])

const akun = () => ({
  kas: Number(process.env.ID_KAS),
  piutang: Number(process.env.ID_PIUTANG_ANGGOTA),
});

base.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const pinjaman = await Pinjaman.create(req.body, { transaction: t });

    // === Kas (keluar) ===
    await Kas.create({
      jenis: "keluar",
      jumlah: pinjaman.jumlah,
      keterangan: `Pencairan pinjaman #${pinjaman.id_pinjaman}`,
      tgl_transaksi: pinjaman.tgl_pinjam,
      sumber: "pinjaman",
      ref_id: pinjaman.id_pinjaman
    }, { transaction: t });

    // === Jurnal ===
    const A = akun();
    await postJournal({
      tgl: pinjaman.tgl_pinjam,
      deskripsi: `Pinjaman #${pinjaman.id_pinjaman}`,
      sumber_referensi: "PINJAMAN",
      ref_id: pinjaman.id_pinjaman,
      entries: [
        { id_akun: A.piutang, debit: pinjaman.jumlah, kredit: 0 },
        { id_akun: A.kas, debit: 0, kredit: pinjaman.jumlah },
      ]
    }, t);

    await t.commit();
    res.status(201).json({ status: true, data: pinjaman });
  } catch (e) {
    await t.rollback();
    res.status(400).json({ error: e.message });
  }
};

export default base;