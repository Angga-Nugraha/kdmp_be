import { crud } from "./baseController.js";
import { Inventaris, UnitUsaha } from "../models/index.js";

export default crud(Inventaris, [
    {model: UnitUsaha, as: "unit_usaha"},
]);