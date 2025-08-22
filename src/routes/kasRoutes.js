import express from "express"
import ctrl from "../controllers/kasController.js"
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth(["admin", "bendahara", "pengurus", "auditor"]), ctrl.findAll);
router.get("/:id", auth(["admin", "bendahara", "pengurus", "auditor"]), ctrl.findOne);
router.post("/", auth(["admin", "bendahara"]), ctrl.create);
router.put("/:id", auth(["admin", "bendahara"]), ctrl.update);
router.delete("/:id", auth(["admin"]), ctrl.destroy);

export default router;
