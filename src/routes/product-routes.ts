import { Router } from "express";
import { create, list } from "../controllers/productsControllers";

const productRouter = Router();

productRouter.post("/create", create);
productRouter.get("/list", list);

export default productRouter