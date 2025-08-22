import { crud } from "./baseController.js";
import { Shu, ShuAnggota } from "../models/index.js";

export default crud(Shu, [
    {model: ShuAnggota, as: "shu_anggota"},
]);