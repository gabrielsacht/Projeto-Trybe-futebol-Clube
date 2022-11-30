import { Router } from 'express';

import loginRoute from './login.router';
import teamRoute from './team.router';
import matchRoute from './match.router';
import leaderBoardRoute from './leaderBoard.router';

const router = Router();

router.use('/login', loginRoute);
router.use('/teams', teamRoute);
router.use('/matches', matchRoute);
router.use('/leaderboard', leaderBoardRoute);

export default router;
