import { VesselTypeController } from "./vessel_type.controller.js";
import { Router } from "express";
import { uploadVesselTypeImage } from "../../middleware/uploadImage.js";
import { authenticate } from "../../middleware/auth.js";

const vesselTypeRouter = Router();
const vesselTypeController = new VesselTypeController();

vesselTypeRouter.get("/", (req, res) => vesselTypeController.getVesselTypes(req, res));
vesselTypeRouter.post("/add",authenticate, uploadVesselTypeImage.single("image"), (req, res) => vesselTypeController.addVesselType(req, res));
vesselTypeRouter.put("/edit/:id", authenticate, uploadVesselTypeImage.single("image"), (req, res) => vesselTypeController.editVesselType(req, res));
vesselTypeRouter.delete("/delete/:id", authenticate, (req, res) => vesselTypeController.deleteVesselType(req, res));

export default vesselTypeRouter;