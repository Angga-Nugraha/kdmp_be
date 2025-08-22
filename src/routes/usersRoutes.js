import express from "express";
import ctrl from "../controllers/usersController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth(["admin"]), ctrl.findAll);
router.get("/:id", auth(["admin"]), ctrl.findOne);
router.post("/", auth(["admin"]), ctrl.create);
router.put("/:id", auth(["admin"]), ctrl.update);
router.delete("/:id", auth(["admin"]), ctrl.destroy);

export default router;
