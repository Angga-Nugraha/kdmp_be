import express from "express"
import ctrl from "../controllers/jenisSimpananController.js"
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth(["admin", "bendahara", "pengurus"]), ctrl.findAll);
router.get("/:id", auth(["admin", "bendahara", "pengurus"]), ctrl.findOne);
router.post("/", auth(["admin"]), ctrl.create);
router.put("/:id", auth(["admin"]), ctrl.update);
router.delete("/:id", auth(["admin"]), ctrl.destroy);

export default router;
