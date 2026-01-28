import { FlagsController } from "./flags.controller.js";
import { Router } from "express";
import { authenticate } from "../../middleware/auth.js";

const flagsRouter = Router();
const flagsController = new FlagsController();

flagsRouter.get("/", (req, res) => flagsController.getFlags(req, res));
flagsRouter.post("/add", authenticate, (req, res) => flagsController.addFlag(req, res));
flagsRouter.put("/edit/:id", authenticate, (req, res) => flagsController.editFlag(req, res));
flagsRouter.delete("/delete/:id", authenticate, (req, res) => flagsController.deleteFlag(req, res));

export default flagsRouter;