import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchModel from '../database/models/Match.Model';
import TeamModel from '../database/models/Team.Model';
import { allMatches, allMatchesTrue, insertBody, checkAway, 
  checkHome, matchCreated, insertBodyEqual, insertBodyNonexistent, matchToFinish } from './mocks/matchesMocks';
import { payloadMock, tokenMock } from './mocks/userMocks'

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes de Match', () => {

  describe('Teste da rota /matches', () => {
    afterEach(() => sinon.restore());

    it('verifica que é possível buscar todos as patidas', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(allMatches as [])

      const response = await chai.request(app).get('/matches')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(allMatches)
    });

    it('verifica que é possível buscar todos as patidas que estão em progresso', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(allMatchesTrue as [])

      const response = await chai.request(app).get('/matches?inProgress=true')

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(allMatchesTrue)
    });

    it('verifica que é possível inserir uma partida', async () => {
      sinon.stub(jwt, 'verify').resolves(payloadMock)
      sinon.stub(TeamModel, 'findByPk').onFirstCall().resolves(checkHome as any).onSecondCall().resolves(checkAway as any)
      sinon.stub(MatchModel, 'create').resolves(matchCreated as any)
  
      const response = await chai.request(app).post('/matches').send(insertBody)
  
      expect(response.status).to.be.equal(201);
      expect(response.body).to.deep.equal(matchCreated)
    });
  
    it('verifica que é não possível inserir uma partida com times iguais', async () => {
      sinon.stub(jwt, 'verify').resolves(payloadMock)
      sinon.stub(TeamModel, 'findByPk').onFirstCall().resolves(checkAway as any).onSecondCall().resolves(checkAway as any)
      sinon.stub(MatchModel, 'create').resolves(matchCreated as any)
  
      const response = await chai.request(app).post('/matches').send(insertBodyEqual)
  
      expect(response.status).to.be.equal(422);
      expect(response.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
    });
  
    it('verifica que é não possível inserir uma partida com um time que não existe', async () => {
      sinon.stub(jwt, 'verify').resolves(payloadMock)
      sinon.stub(TeamModel, 'findByPk').onFirstCall().resolves(checkHome as any).onSecondCall().resolves(undefined)
      sinon.stub(MatchModel, 'create').resolves(matchCreated as any)
  
      const response = await chai.request(app).post('/matches').send(insertBodyNonexistent)
  
      expect(response.status).to.be.equal(404);
      expect(response.body).to.deep.equal({ message: 'There is no team with such id!' })
    });
  })

  describe('Teste da rota /matches/:id', () => {
    afterEach(() => sinon.restore());

    it('verifica que é possível encerrar uma partida', async () => {
      // sinon.stub(jwt, 'verify').resolves(payloadMock)
      sinon.stub(MatchModel, 'findByPk').resolves(matchToFinish as any)
      sinon.stub(MatchModel, 'update').resolves()
  
      const response = await chai.request(app).patch('/matches/42/finish')
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal({ message: 'Finished' })
    });
  })
  
})
