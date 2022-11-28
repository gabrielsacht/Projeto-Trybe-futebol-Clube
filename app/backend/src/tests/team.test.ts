import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamModel from '../database/models/Team.Model';
import { allTeams, team2Mock } from './mocks/teamMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes de Teams', () => {

  afterEach(() => sinon.restore());

  it('verifica que é possível buscar todos os teams', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(allTeams as [])

    const response = await chai.request(app).get('/teams')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allTeams)
  });

  it('verifica que é possível buscar um team pelo id', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(team2Mock as any)

    const response = await chai.request(app).get('/teams/2')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(team2Mock)
  });

  it('verifica que não é possível buscar um team pelo id inexistente', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(undefined)

    const response = await chai.request(app).get('/teams/99999')

    expect(response.status).to.be.equal(404);
    expect(response.body).to.deep.equal({message: 'Team not found'})
  });

  })
