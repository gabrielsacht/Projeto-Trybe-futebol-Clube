import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  private matchService = new MatchService();

  public getAll = async (req: Request, res: Response) => {
    if (req.query.inProgress !== undefined) {
      const { inProgress } = req.query;
      const matches = await this.matchService.getAllByProgress(inProgress as string);

      res.status(200).json(matches);
    } else {
      const matches = await this.matchService.getAll();

      res.status(200).json(matches);
    }
  };

  public insertMatch = async (req: Request, res: Response) => {
    const newMatch = await this.matchService.insertMatch(req.body);

    res.status(201).json(newMatch);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await this.matchService.finishMatch(Number(id));

    res.status(200).json({ message: response });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedMatch = await this.matchService.updateMatch(Number(id), req.body);

    res.status(200).json(updatedMatch);
  };
}
