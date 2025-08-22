import { crud } from './baseController.js';
import { UnitUsaha, Inventaris, TransaksiUnit } from "../models/index.js";

export default crud(UnitUsaha, [
    {model: Inventaris, as: "inventaris"},
    {model: TransaksiUnit, as: "transaksi_unit"},
]);