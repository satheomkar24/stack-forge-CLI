import { Router } from "express";
import { ROLES } from "./enums";
import { setAuthContext } from "@middlewares/setAuthContext";
import { requireAdminModule } from "@middlewares/requireAdminModule";
import refreshRoutes from "@routes/refresh";
import userAuthRoutes from "@routes/userAuth";
import userRoutes from "@routes/user";

const router = Router();

router.use("/auth", refreshRoutes);
router.use("/auth", setAuthContext(ROLES.USER), userAuthRoutes);
router.use(
  "/auth/admin",
  setAuthContext(ROLES.ADMIN),
  requireAdminModule,
  userAuthRoutes,
);
router.use("/users", userRoutes);

export default router;
