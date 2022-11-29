import { Router } from 'express';

import loginRoute from './login.router';
import teamRoute from './team.router';
import matchRoute from './match.router';

const router = Router();

router.use('/login', loginRoute);
router.use('/teams', teamRoute);
router.use('/matches', matchRoute);

export default router;
