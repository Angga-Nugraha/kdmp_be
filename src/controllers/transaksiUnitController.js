import { crud } from './baseController.js';
import { TransaksiUnit, UnitUsaha } from "../models/index.js";

export default crud(TransaksiUnit, [
    {model: UnitUsaha, as: "unit_usaha"},
]);