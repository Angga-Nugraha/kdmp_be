import { crud } from './baseController.js';
import { Rapat, Keputusan } from "../models/index.js";

export default crud(Keputusan, [
    {model: Rapat, as: "rapat"},
]);