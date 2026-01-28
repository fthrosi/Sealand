import { TeamsController } from "./teams.controller.js";
import { Router } from "express";
import { uploadTeamImage } from "../../middleware/uploadImage.js";
import { authenticate } from "../../middleware/auth.js";

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get("/", (req, res) => teamsController.getAllTeams(req, res));
teamsRouter.get("/format", (req, res) => teamsController.getTeamsFormat(req, res));
teamsRouter.get("/get/:id",authenticate, (req, res) => teamsController.getTeam(req, res));
teamsRouter.post("/add", authenticate, uploadTeamImage.single("image"), (req, res) => teamsController.addTeam(req, res));
teamsRouter.put("/edit/:id", authenticate, uploadTeamImage.single("image"), (req, res) => teamsController.editTeam(req, res));
teamsRouter.delete("/delete/:id", authenticate, (req, res) => teamsController.deleteTeam(req, res));

export default teamsRouter;