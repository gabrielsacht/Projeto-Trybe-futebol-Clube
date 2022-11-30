import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  private leaderBoardService = new LeaderBoardService();

  public getLeaderBoardHome = async (req: Request, res: Response) => {
    const table = await this.leaderBoardService.createHomeTable();

    res.status(200).json(table);
  };
}
