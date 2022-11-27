import IUser from '../../interfaces/IUser';

const validLoginBody =   {
  "email": "admin@admin.com",
  "password": "secret_admin"
}

const invalidPasswordLoginBody =   {
  "email": "admin@admin.com",
  "password": "secret_admine"
}

const invalidEmailLoginBody =   {
  "email": "admine@admin.com",
  "password": "secret_admin"
}

const userMock = {
  id: 1,
  userName: 'admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY5NTcyNDI0LCJleHAiOjE2NzAxNzcyMjR9.fDjjaTl3iRR_7rPEvsm6K2Eb_9dGKlF9q69m7iWJ1tI'

const payloadMock = {
  "id": 1,
  "role": "admin",
  "iat": 1669572424,
  "exp": 1670177224
}

export {
  userMock,
  tokenMock,
  validLoginBody,
  invalidPasswordLoginBody,
  invalidEmailLoginBody,
  payloadMock,
}