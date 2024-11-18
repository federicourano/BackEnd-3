import { Router } from "express";
import { getPetsMock, getUsersMock, generateData } from "../controllers/mocks.controller.js";

const router = Router();

router.get("/mockingpets", getPetsMock);
router.get("/mockingusers", getUsersMock);
router.post("/generateData", generateData);

export default router;