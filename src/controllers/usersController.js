import { crud } from "./baseController.js";
import { User, Anggota } from "../models/index.js";

export default crud(User, [{ model: Anggota, as: "anggota" }]);
