import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import validateTokenMiddleware from '../middlewares/validateToken.middleware';

const router = Router();
const matchController = new MatchController();

router.get('/', matchController.getAll);
router.post('/', validateTokenMiddleware, matchController.insertMatch);
router.patch('/:id/finish', matchController.finishMatch);
router.patch('/:id', matchController.updateMatch);

export default router;
