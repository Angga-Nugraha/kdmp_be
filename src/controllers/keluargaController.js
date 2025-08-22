import { crud } from './baseController.js';
import { Keluarga, Anggota } from "../models/index.js";

export default crud(Keluarga, [{ model: Anggota, as: "anggota" }]);