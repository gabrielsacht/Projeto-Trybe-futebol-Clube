import { Router } from 'express';

import loginRoute from './login.router';
import teamRoute from './team.router';

const router = Router();

router.use('/login', loginRoute);
router.use('/teams', teamRoute);

export default router;
