import { LicenseController } from "./license.controller.js";
import { Router } from "express";
import { uploadLicenseImage } from "../../middleware/uploadImage.js";
import { authenticate } from "../../middleware/auth.js";

const licenseRouter = Router();
const licenseController = new LicenseController();

licenseRouter.get("/", (req, res) => licenseController.getLicenses(req, res));
licenseRouter.post("/add",authenticate, uploadLicenseImage.single("image"), (req, res) => licenseController.addLicense(req, res));
licenseRouter.put("/edit/:id", authenticate, uploadLicenseImage.single("image"), (req, res) => licenseController.editLicense(req, res));
licenseRouter.delete("/delete/:id", authenticate, (req, res) => licenseController.deleteLicense(req, res));

export default licenseRouter;