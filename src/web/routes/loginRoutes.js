import express from "express";
const router = express.Router();
import loginController from "../controllers/loginController.js";


router.get('/', loginController.getLogin);
router.post('/', loginController.checkLoginDetails);
router.get('/logout', loginController.logout);


export default router;