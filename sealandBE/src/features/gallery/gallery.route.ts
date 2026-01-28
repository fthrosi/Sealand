import { GalleryController } from "./gallery.controller.js";
import { Router } from "express";
import { uploadGalleryImage } from "../../middleware/uploadImage.js";
import { authenticate } from "../../middleware/auth.js";

const galleryRouter = Router();
const galleryController = new GalleryController();

galleryRouter.get("/", (req, res) => galleryController.getAllGallery(req, res));
galleryRouter.get("/get/:id", authenticate, (req, res) => galleryController.getGallery(req, res));
galleryRouter.post("/add", authenticate, uploadGalleryImage.single("image"), (req, res) => galleryController.addGallery(req, res));
galleryRouter.put("/edit/:id", authenticate, uploadGalleryImage.single("image"), (req, res) => galleryController.editGallery(req, res));
galleryRouter.delete("/delete/:id", authenticate, (req, res) => galleryController.deleteGallery(req, res));
export default galleryRouter;