import { Router } from 'express';

import loginRoute from './login.router';

const router = Router();

router.use('/login', loginRoute);

export default router;
