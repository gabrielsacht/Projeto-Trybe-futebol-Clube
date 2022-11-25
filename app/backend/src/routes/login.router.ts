import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import validateLoginFields from '../middlewares/validateLoginFields';

const router = Router();
const loginController = new LoginController();

router.post('/', validateLoginFields, loginController.login);
router.get('/validate', loginController.validate);

export default router;
