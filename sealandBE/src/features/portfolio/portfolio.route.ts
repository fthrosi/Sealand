import { PortfolioController } from "./portfolio.controller.js";
import { Router } from "express";
import { validatePortfolioBody } from "../../middleware/portfolio.js";
import { authenticate } from "../../middleware/auth.js";
import { uploadPortfolioImage } from "../../middleware/uploadImage.js";


const portfolioRouter = Router();
const portfolioController = new PortfolioController();

portfolioRouter.get("/", (req, res) => portfolioController.getPortfolio(res));
portfolioRouter.post("/add",authenticate, uploadPortfolioImage.single('image'), validatePortfolioBody, (req, res) => portfolioController.addPortfolio(req, res));
portfolioRouter.put("/edit/:id", authenticate, uploadPortfolioImage.single('image'), validatePortfolioBody, (req, res) => portfolioController.editPortfolio(req, res));
portfolioRouter.delete("/delete/:id", authenticate, (req, res) => portfolioController.deletePortfolio(req, res));

export default portfolioRouter;