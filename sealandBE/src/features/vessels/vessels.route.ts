import { VesselsController } from "./vessels.controller.js";
import { Router } from "express";
import { authenticate } from "../../middleware/auth.js";

const vesselsRouter = Router();
const vesselsController = new VesselsController();

vesselsRouter.get("/", (req, res) => vesselsController.getVessels(req, res));
vesselsRouter.post("/add", authenticate, (req, res) => vesselsController.addVessel(req, res));
vesselsRouter.put("/edit/:id", authenticate, (req, res) => vesselsController.editVessel(req, res));
vesselsRouter.delete("/delete/:id", authenticate, (req, res) => vesselsController.deleteVessel(req, res));

export default vesselsRouter;