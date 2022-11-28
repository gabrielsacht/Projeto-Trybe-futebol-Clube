import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  private teamService = new TeamService();

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAll();

    res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));

    res.status(200).json(team);
  };
}
