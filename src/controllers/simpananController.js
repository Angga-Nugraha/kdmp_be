import { crud } from './baseController.js';
import { Simpanan, JenisSimpanan, Anggota, } from "../models/index.js";

export default crud(Simpanan, [
    { model: Anggota, as: "anggota" },
    { model: JenisSimpanan, as: "jenis_simpanan" }
]);