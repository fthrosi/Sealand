import { AuthController } from "./auth.controller.js";
import { Router } from "express";
import { validateLoginBody,authenticate } from "../../middleware/auth.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", validateLoginBody, (req, res) => authController.login(req, res));
authRouter.post("/logout", authenticate, (req, res) => authController.logout(req, res));
authRouter.post("/refresh-token", (req, res) => authController.refresh(req, res));
export default authRouter;