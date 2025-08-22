import { crud } from "./baseController.js";
import { Anggota, Keluarga, Simpanan, Pinjaman, ShuAnggota } from "../models/index.js";

export default crud(Anggota, [
    { model: Keluarga, as: "keluarga" }, 
    { model: Simpanan, as: "simpanan" }, 
    { model: Pinjaman, as: "pinjaman" }, 
    { model: ShuAnggota, as: "shu_anggota" }
]);