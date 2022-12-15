import * as sinon from 'sinon';
import * as chai from 'chai';
// import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchModel from '../database/models/Match.Model';
import TeamModel from '../database/models/Team.Model';
import { allMatchesFalse } from './mocks/matchesMocks';
import { allTeams } from './mocks/teamMocks';
import { leaderBoard, leaderBoardAway, leaderBoardHome } from './mocks/leaderboard.Mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes de Leaderboard', () => {

  describe('Teste da rota /leaderboard', () => {
    afterEach(() => sinon.restore());

    it('verifica que é possível buscar a tabela completa', async () => {
      sinon.stub(TeamModel, 'findAll').resolves(allTeams as [])
      sinon.stub(MatchModel, 'findAll').resolves(allMatchesFalse as [])

      const response = await chai.request(app).get('/leaderboard')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(leaderBoard)
    });

  })

  describe('Teste da rota /leaderboard/home', () => {
    afterEach(() => sinon.restore());

    it('verifica que é possível buscar a tabela completa', async () => {
      sinon.stub(TeamModel, 'findAll').resolves(allTeams as [])
      sinon.stub(MatchModel, 'findAll').resolves(allMatchesFalse as [])

      const response = await chai.request(app).get('/leaderboard/home')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(leaderBoardHome)
    });

  })

  describe('Teste da rota /leaderboard/away', () => {
    afterEach(() => sinon.restore());

    it('verifica que é possível buscar a tabela completa', async () => {
      sinon.stub(TeamModel, 'findAll').resolves(allTeams as [])
      sinon.stub(MatchModel, 'findAll').resolves(allMatchesFalse as [])

      const response = await chai.request(app).get('/leaderboard/away')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(leaderBoardAway)
    });

  })
})
