import { AppliedController } from "./applied.controller.js";
import { Router } from "express";
import { upload } from "../../middleware/uploadDataCredential.js";
import { authenticate } from "../../middleware/auth.js";

const appliedRouter = Router();
const appliedController = new AppliedController();

appliedRouter.get("/", authenticate, (req, res) => appliedController.getAllApplied(req, res));
appliedRouter.post(
  "/add",
  upload.fields([
    { name: "foto", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
    (req, res) => appliedController.addApplied(req, res)
);
appliedRouter.delete("/delete/:id",authenticate, (req, res) => appliedController.deleteApplied(req, res));
appliedRouter.get("/file/foto/:filename", authenticate, (req, res) => 
    appliedController.getFileFoto(req, res)
);
appliedRouter.get("/file/foto/download/:filename", authenticate, (req, res) => 
    appliedController.downloadFileFoto(req, res)
);

// Route untuk nampilin/download CV Pelamar
appliedRouter.get("/file/cv/:filename", authenticate, (req, res) => 
    appliedController.getFileCV(req, res)
);

export default appliedRouter;