import HttpException from '../utils/http.exeception';
import TeamModel from '../database/models/Team.Model';

export default class TeamService {
  private teamModel = TeamModel;

  public async getAll() {
    const response = await this.teamModel.findAll();
    return response;
  }

  public async getById(id: number) {
    const response = await this.teamModel.findByPk(id);

    if (!response) throw new HttpException(404, 'Team not found');

    return response;
  }
}
