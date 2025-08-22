import { crud } from "./baseController.js";
import { Shu, ShuAnggota, Anggota } from "../models/index.js";

export default crud(ShuAnggota, [
    {model: Anggota, as: "anggota"},
    {model: Shu, as: "shu"},
]);