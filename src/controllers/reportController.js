import { Sequelize } from "sequelize";
import { JurnalDetail, Akun, JurnalHeader } from "../models/index.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const neraca = wrapAsync(async (req, res) => {
    const { sampai } = req.query;
    const rows = await JurnalDetail.findAll({
        include: [
            { model: Akun, as: "akun", attributes: ["id_akun", "kode_akun", "nama_akun", "kategori", "normal_balance"] },
            { model: JurnalHeader, as: "header", attributes: ["tgl"] }
        ],
        where: sampai ? { "$header.tgl$": { [Sequelize.Op.lte]: sampai } } : {},
        raw: true
    });

    const saldo = {};
    let totalDebit = 0, totalKredit = 0;

    for (const r of rows) {
        const key = r["akun.id_akun"];
        saldo[key] = saldo[key] || {
            id_akun: key,
            kode_akun: r["akun.kode_akun"],
            nama_akun: r["akun.nama_akun"],
            kategori: r["akun.kategori"],
            normal_balance: r["akun.normal_balance"],
            debit: 0, kredit: 0
        };
        saldo[key].debit += Number(r.debit || 0);
        saldo[key].kredit += Number(r.kredit || 0);

        totalDebit += Number(r.debit || 0);
        totalKredit += Number(r.kredit || 0);
    }

    const hasil = Object.values(saldo).map(a => {
        const net = a.normal_balance === "debit"
            ? a.debit - a.kredit
            : a.kredit - a.debit;
        return { ...a, saldo: Number(net.toFixed(2)) };
    }).filter(a => ["aset", "kewajiban", "ekuitas"].includes(a.kategori));

    // === Tambahkan info seimbang atau tidak ===
    const selisih = totalDebit - totalKredit;
    const seimbang = selisih === 0;

    res.json({
        sampai: sampai || null,
        akun: hasil,
        check: {
            total_debit: totalDebit,
            total_kredit: totalKredit,
            selisih,
            seimbang
        }
    });
});

export const labaRugi = wrapAsync(async (req, res) => {

    const { dari, sampai } = req.query;
    const where = {};
    if (dari) where["$header.tgl$"] = { [Sequelize.Op.gte]: dari };
    if (sampai) where["$header.tgl$"] = { ...(where["$header.tgl$"] || {}), [Sequelize.Op.lte]: sampai };

    const rows = await JurnalDetail.findAll({
        include: [{ model: Akun, as: "akun", attributes: ["id_akun", "kode_akun", "nama_akun", "kategori", "normal_balance"] },
        { model: JurnalHeader, as: "header", attributes: ["tgl"] }],
        where, raw: true
    });

    let pendapatan = 0, biaya = 0;
    for (const r of rows) {
        const norm = r["akun.normal_balance"];
        const kategori = r["akun.kategori"];
        const debit = Number(r.debit || 0), kredit = Number(r.kredit || 0);
        const net = norm === "debit" ? debit - kredit : kredit - debit;
        if (kategori === "pendapatan") pendapatan += net;
        if (kategori === "beban") biaya += net;
    }
    res.json({
        periode: {
            dari: dari || null,
            sampai: sampai || null
        },
        pendapatan, 
        biaya, 
        laba_rugi: pendapatan - biaya
    });

});
