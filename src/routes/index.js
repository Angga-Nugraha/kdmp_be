import express from "express";
import authRoutes from "./authRoutes.js";
import anggotaRoutes from "./anggotaRoutes.js";
import usersRoutes from "./usersRoutes.js";
import keluargaRoutes from "./keluargaRoutes.js";
import logAktivitasRoutes from "./logAktivitasRoutes.js";
import jenisSimpananRoutes from "./jenisSimpananRoutes.js";
import simpanan from "./simpananRoutes.js";
import pinjaman from "./pinjamanRoutes.js";
import kas from "./kasRoutes.js";
import akun from "./akunRoutes.js";
import unitUsaha from "./unitUsahaRoutes.js";
import transaksiUnit from "./transaksiUnitRoutes.js";
import inventaris from "./inventarisRoutes.js";
import shu from "./shuRoutes.js"
import shuAnggota from "./shuAnggotaRoutes.js"
import rapat from "./rapatRoutes.js";
import keputusan from "./keputusanRoutes.js";
import angsuran from "./angsuranRoutes.js";
import { neraca, labaRugi } from "../controllers/reportController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/anggota", anggotaRoutes);
router.use("/log-aktivitas", logAktivitasRoutes);
router.use("/users", usersRoutes);
router.use("/keluarga", keluargaRoutes);
router.use("/jenis-simpanan", jenisSimpananRoutes);
router.use("/simpanan", simpanan);
router.use("/pinjaman", pinjaman);
router.use("/kas", kas);
router.use("/akun", akun);
router.use("/unit-usaha", unitUsaha);
router.use("/transaksi-unit", transaksiUnit);
router.use("/inventaris", inventaris);
router.use("/shu", shu);
router.use("/shu-anggota", shuAnggota);
router.use("/rapat", rapat);
router.use("/keputusan", keputusan);
router.use("/angsuran", angsuran);

router.get("/reports/neraca", auth(["bendahara", "admin", "auditor"]), neraca);
router.get("/reports/laba-rugi", auth(["bendahara", "admin", "auditor"]), labaRugi);

export default router;