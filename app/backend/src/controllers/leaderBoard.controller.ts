import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  private leaderBoardService = new LeaderBoardService();

  public getLeaderBoardHome = async (req: Request, res: Response) => {
    const table = await this.leaderBoardService.createTable('home');

    res.status(200).json(table);
  };

  public getLeaderBoardAway = async (req: Request, res: Response) => {
    const table = await this.leaderBoardService.createTable('away');

    res.status(200).json(table);
  };

  public getLeaderBoard = async (req: Request, res: Response) => {
    const table = await this.leaderBoardService.createTable();

    res.status(200).json(table);
  };
}
