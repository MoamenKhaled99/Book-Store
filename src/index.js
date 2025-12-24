import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import inventoryRoute from "./modules/inventory/presentation/routes.js";
import storeRoute from "./modules/store/presentation/routes.js";
import globalErrorFilter from "./modules/shared/filters/global_error.filter.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/inventory", inventoryRoute);
app.use("/api/store", storeRoute);
app.use(globalErrorFilter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
