import MatchModel from '../database/models/Match.Model';
import Team from '../database/models/Team.Model';
import IMatch from '../interfaces/IMatch';
import IScore from '../interfaces/IScore';
import HttpException from '../utils/http.exeception';

export default class MatchService {
  private matchModel = MatchModel;

  public async getAll() {
    const response = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return response;
  }

  public async getAllByProgress(inProgress: string) {
    let param = false;
    if (inProgress === 'true') param = true;
    const response = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
      where: { inProgress: param },
    });
    return response;
  }

  public async insertMatch(match: IMatch) {
    const checkHome = await Team.findByPk(match.homeTeam);
    const checkAway = await Team.findByPk(match.awayTeam);

    if (!checkHome || !checkAway) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    if (match.homeTeam === match.awayTeam) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }
    const newMatch = await this.matchModel.create({ ...match, inProgress: true });
    return newMatch;
  }

  public async finishMatch(id: number) {
    const match = await this.matchModel.findByPk(id);
    if (!match) {
      throw new HttpException(404, 'There is no match with such id!');
    }
    await this.matchModel.update({ inProgress: false }, { where: { id } });
    return 'Finished';
  }

  public async updateMatch(id: number, scores: IScore) {
    const { homeTeamGoals, awayTeamGoals } = scores;
    const matchUpdated = await this.matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return matchUpdated;
  }
}
