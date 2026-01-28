import express, {Express,Request,Response} from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRouter from "./features/auth/auth.route.js";
import portfolioRouter from "./features/portfolio/portfolio.route.js";
import vesselsRouter from "./features/vessels/vessels.route.js";
import vesselTypeRouter from "./features/vessel_type/vessel_type.route.js";
import flagsRouter from "./features/flags/flags.route.js";
import licenseRouter from "./features/license/license.route.js";
import careerRouter from "./features/career/career.route.js";
import teamsRouter from "./features/teams/teams.route.js";
import galleryRouter from "./features/gallery/gallery.route.js";
import divisionRouter from "./features/division/division.route.js";
import appliedRouter from "./features/Applied/applied.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app:Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors(
  {
    origin: [process.env.CORS_ORIGIN || '*'],
    credentials: true,
  }
));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use("/auth", authRouter);
app.use("/portfolio", portfolioRouter);
app.use("/vessels", vesselsRouter);
app.use("/vessel-type", vesselTypeRouter);
app.use("/flags", flagsRouter);
app.use("/license", licenseRouter);
app.use("/career", careerRouter);
app.use("/teams", teamsRouter);
app.use("/gallery", galleryRouter);
app.use("/division", divisionRouter);
app.use("/applied", appliedRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, SealandBE!");
});
export default app;