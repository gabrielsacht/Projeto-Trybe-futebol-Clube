import TeamModel from '../database/models/Team.Model';

export default class TeamService {
  private teamModel = TeamModel;

  public async getAll() {
    const response = await this.teamModel.findAll();
    return response;
  }
}
