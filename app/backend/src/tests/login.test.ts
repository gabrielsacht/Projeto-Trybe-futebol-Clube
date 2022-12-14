import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/User.Model';
import { invalidEmailLoginBody, invalidPasswordLoginBody, payloadMock, tokenMock, userMock, validLoginBody } from './mocks/userMocks';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes de Login', () => {

  describe('rota /login', () => {

    afterEach(() => sinon.restore());

    it('verifica que é possível fazer login com um corpo de requisição correto', async () => {
      sinon.stub(UserModel, 'findOne').resolves(userMock as any)
      sinon.stub(jwt, 'sign').resolves(tokenMock)

      const response = await chai.request(app).post('/login').send(validLoginBody)

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal({token: tokenMock})
    });

    it('verifica que não é possível fazer login com campos de requisição ausentes', async () => {

      const response = await chai.request(app).post('/login').send({})

      expect(response.status).to.be.equal(400);
      expect(response.body).to.deep.equal({message: 'All fields must be filled'})
    });

    it('verifica que não é possível fazer login com uma senha incorreta', async () => {
      sinon.stub(UserModel, 'findOne').resolves(userMock as any)

      const response = await chai.request(app).post('/login').send(invalidPasswordLoginBody)

      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({message: 'Incorrect email or password'})
    });

    it('verifica que não é possível fazer login com um email incorreto', async () => {
      sinon.stub(UserModel, 'findOne').resolves(undefined)

      const response = await chai.request(app).post('/login').send(invalidEmailLoginBody)

      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({message: 'Incorrect email or password'})
    });
    })

  describe('rota /login/validate', () => {

    afterEach(() => sinon.restore());

    it('verifica que um token válido é validado na rota "/validate"', async () => {
      sinon.stub(jwt, 'verify').resolves(payloadMock)

      const response = await chai.request(app).get('/login/validate').set('authorization', tokenMock)

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal({ role: "admin" })
    });

    it('verifica que um token inválido é invalidado na rota "/validate"', async () => {
      const response = await chai.request(app).get('/login/validate').set('authorization', 'invalidhashtest')

      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: "Token must be a valid token" })
    });

  })

  
});
