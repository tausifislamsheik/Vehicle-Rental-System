import express from 'express';

import { userControllers } from './users.controllers';
import auth from '../../middleware/auth';


const router = express.Router();

router.post("/", userControllers.createUser);

router.get("/", auth("admin"), userControllers.getUser);

router.put("/:userId", auth("admin", "customer"), userControllers.updateUser);

router.delete("/:userId", auth("admin"), userControllers.deleteUser);

export const userRoutes = router;