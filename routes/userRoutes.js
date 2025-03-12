import express from "express";
import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/userContoller.js";


const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.post("/users", addUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
