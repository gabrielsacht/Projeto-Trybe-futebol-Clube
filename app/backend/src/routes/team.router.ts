import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();
const teamController = new TeamController();

router.get('/:id', teamController.getById);
router.get('/', teamController.getAll);

export default router;
