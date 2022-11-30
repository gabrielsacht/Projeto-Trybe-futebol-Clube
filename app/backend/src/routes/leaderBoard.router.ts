import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoard.controller';

const router = Router();
const leaderBoardController = new LeaderBoardController();

router.get('/home', leaderBoardController.getLeaderBoardHome);

export default router;
