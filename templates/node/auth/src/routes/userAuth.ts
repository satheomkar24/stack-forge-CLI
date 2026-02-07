import { UserAuthController } from "@controllers/userAuth";
import { Router } from "express";

const router = Router();

router.post("/register", UserAuthController.register);

router.post("/login", UserAuthController.login);

router.post("/forgot-password", UserAuthController.forgotPassword);

router.post("/reset-password", UserAuthController.resetPassword);

router.post("/activate", UserAuthController.activateAccount);

router.post("/resend-activation", UserAuthController.resendActivation);

export default router;
