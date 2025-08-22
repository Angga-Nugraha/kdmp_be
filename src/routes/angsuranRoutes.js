import express from "express"
import ctrl from "../controllers/angsuranController.js"
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth(["admin", "pengurus", "bendahara", "auditor"]), ctrl.findAll);
router.get("/:id", auth(["admin", "pengurus", "bendahara", "auditor"]), ctrl.findOne);
router.post("/", auth(["admin", "bendahara"]), ctrl.create);
router.put("/:id", auth(["admin", "bendahara"]), ctrl.update);
router.delete("/:id", auth(["admin"]), ctrl.destroy);

export default router;
