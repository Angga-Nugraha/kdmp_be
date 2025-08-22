import { crud } from './baseController.js';
import { LogAktivitas, User } from "../models/index.js";

export default crud(LogAktivitas, [{ model: User, as: "user" }]);