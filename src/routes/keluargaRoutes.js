import express from "express"
import ctrl from "../controllers/keluargaController.js"
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth(["admin", "pengurus"]), ctrl.findAll);
router.get("/:id", auth(["admin", "pengurus"]), ctrl.findOne);
router.post("/", auth(["admin", "pengurus"]), ctrl.create);
router.put("/:id", auth(["admin", "pengurus"]), ctrl.update);
router.delete("/:id", auth(["admin"]), ctrl.destroy);

export default router;
