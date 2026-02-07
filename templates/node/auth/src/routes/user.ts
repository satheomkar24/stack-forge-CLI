import { UserController } from "@controllers/user";
import { ROLES } from "@enums/index";
import { allowRoles } from "@middlewares/allowRoles";
import { ownResourceOrAdmin } from "@middlewares/ownResourceOrAdmin";
import { Router } from "express";

const router = Router();

router.get("/", allowRoles(ROLES.ADMIN), UserController.getAll);

router.use(allowRoles(ROLES.ADMIN, ROLES.USER), ownResourceOrAdmin);

router.get("/:id", UserController.getById);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);
router.put("/:id/image", UserController.updateImage);
export default router;
