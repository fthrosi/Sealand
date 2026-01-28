import { CareerController } from "./career.controller.js";
import { Router } from "express";
import { authenticate } from "../../middleware/auth.js";

const careerRouter = Router();
const careerController = new CareerController();

careerRouter.get("/", (req, res) => careerController.getCareers(req, res));
careerRouter.post("/add",authenticate, (req, res) => careerController.addCareer(req, res));
careerRouter.put("/edit/:id",authenticate, (req, res) => careerController.editCareer(req, res));
careerRouter.delete("/delete/:id",authenticate, (req, res) => careerController.deleteCareer(req, res));


export default careerRouter;