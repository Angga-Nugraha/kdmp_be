import { JurnalHeader, JurnalDetail } from "../models/index.js";
import { wrapAsync } from "./wrapAsync.js";

export const postJournal = async ({ tgl, deskripsi, sumber_referensi, ref_id, entries }, t) => {
    const totalDebit = entries.reduce((a, e) => a + Number(e.debit || 0), 0);
    const totalKredit = entries.reduce((a, e) => a + Number(e.kredit || 0), 0);
    if (Number(totalDebit.toFixed(2)) !== Number(totalKredit.toFixed(2))) {
        return res.status(400).json({ message: "Jurnal tidak seimbang (debit != kredit)" });
    }
    const header = await JurnalHeader.create({ tgl, deskripsi, sumber_referensi, ref_id }, { transaction: t });
    for (const e of entries) {
        await JurnalDetail.create({
            id_jurnal_header: header.id_jurnal_header,
            id_akun: e.id_akun,
            debit: e.debit || 0,
            kredit: e.kredit || 0
        }, { transaction: t });
    }
    return header;
};
