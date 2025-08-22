import { crud } from './baseController.js';
import { Rapat, Keputusan } from "../models/index.js";

export default crud(Rapat, [
    {model: Keputusan, as: "keputusan"},
]);