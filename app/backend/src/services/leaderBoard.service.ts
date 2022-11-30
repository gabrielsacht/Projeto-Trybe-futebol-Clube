import Match from '../database/models/Match.Model';
import Team from '../database/models/Team.Model';
import IResultParam from '../interfaces/IResultParam';
import ITeamLeaderBoard from '../interfaces/ITeamLeaderBoard';
import MatchService from './match.service';
import TeamService from './team.service';

export default class LeaderBoardService {
  private matchService = new MatchService();
  private teamService = new TeamService();

  public createTable = async (side?: string): Promise<ITeamLeaderBoard[]> => {
    const teams = await this.teamService.getAll();
    const matches = await this.matchService.getAllByProgress('false');
    const tableHome: ITeamLeaderBoard[] = [];
    const tableAway: ITeamLeaderBoard[] = [];
    this.calculateScoreHome(teams, matches, tableHome);
    this.calculateScoreAway(teams, matches, tableAway);
    if (side === 'home') return this.sortTable(tableHome);
    if (side === 'away') return this.sortTable(tableAway);
    const fullTable = this.mergeTable(tableHome, tableAway);
    const finalTable = fullTable.map((team) => {
      const { name, totalGames, ...results } = team;
      return this.createTeamObj(name, results, totalGames);
    });
    return this.sortTable(finalTable);
  };

  private calculateScoreHome = (teams: Team[], matches: Match[], table: ITeamLeaderBoard[]) => {
    let results = this.newResults();
    teams.forEach((team) => {
      const matchesPerTeam = matches.filter((match) => team.id === match.homeTeam);
      matchesPerTeam.forEach(({ homeTeamGoals, awayTeamGoals }) => {
        results.goalsFavor += homeTeamGoals;
        results.goalsOwn += awayTeamGoals;
        if (homeTeamGoals > awayTeamGoals) results.totalVictories += 1;
        if (homeTeamGoals === awayTeamGoals) results.totalDraws += 1;
        if (homeTeamGoals < awayTeamGoals) results.totalLosses += 1;
      });
      table.push(this.createTeamObj(team.teamName, results, matchesPerTeam.length));
      results = this.newResults();
    });
  };

  private calculateScoreAway = (teams: Team[], matches: Match[], table: ITeamLeaderBoard[]) => {
    let results = this.newResults();
    teams.forEach((team) => {
      const matchesPerTeam = matches.filter((match) => team.id === match.awayTeam);
      matchesPerTeam.forEach(({ homeTeamGoals, awayTeamGoals }) => {
        results.goalsFavor += awayTeamGoals;
        results.goalsOwn += homeTeamGoals;
        if (homeTeamGoals < awayTeamGoals) results.totalVictories += 1;
        if (homeTeamGoals === awayTeamGoals) results.totalDraws += 1;
        if (homeTeamGoals > awayTeamGoals) results.totalLosses += 1;
      });
      table.push(this.createTeamObj(team.teamName, results, matchesPerTeam.length));
      results = this.newResults();
    });
  };

  private createTeamObj = (teamName: string, results: IResultParam, games: number) => {
    const totalPoints = (results.totalVictories * 3) + results.totalDraws;
    const totalGames = games;
    const efficiency = (totalPoints / (totalGames * 3)) * 100;

    const teamObj = {
      name: teamName,
      totalPoints,
      totalGames,
      ...results,
      goalsBalance: results.goalsFavor - results.goalsOwn,
      efficiency: Number(efficiency.toFixed(2)),
    };
    return teamObj;
  };

  private newResults = () => ({
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  });

  private sortTable = (table: ITeamLeaderBoard[]) => table.sort((a, b) => (
    b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn
  ));

  private mergeTable = (table1: ITeamLeaderBoard[], table2: ITeamLeaderBoard[]) =>
    table1.map((team) => {
      const finded = table2.find((finder) => finder.name === team.name);
      if (finded) {
        return {
          name: team.name,
          totalGames: team.totalGames + finded.totalGames,
          totalVictories: team.totalVictories + finded.totalVictories,
          totalDraws: team.totalDraws + finded.totalDraws,
          totalLosses: team.totalLosses + finded.totalLosses,
          goalsFavor: team.goalsFavor + finded.goalsFavor,
          goalsOwn: team.goalsOwn + finded.goalsOwn,
        };
      }
      return team;
    });
}
