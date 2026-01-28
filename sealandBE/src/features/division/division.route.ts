import { DivisionController } from "./division.controller.js";
import { Router } from "express";
import { authenticate } from "../../middleware/auth.js";

const divisionRouter = Router();
const divisionController = new DivisionController();

divisionRouter.get("/", (req, res) => divisionController.getAllDivisions(req, res));
divisionRouter.get("/get/:id",authenticate, (req, res) => divisionController.getDivision(req, res));
divisionRouter.post("/add",authenticate, (req, res) => divisionController.addDivision(req, res));
divisionRouter.put("/edit/:id",authenticate, (req, res) => divisionController.editDivision(req, res));
divisionRouter.delete("/delete/:id",authenticate, (req, res) => divisionController.deleteDivision(req, res));

export default divisionRouter;