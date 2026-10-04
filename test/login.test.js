const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()

describe('Login', () => {
    describe('POST / login', () =>{
        it('Deve retornar 200 com token em string ao usar credencias validas', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })
                
                
                expect(response.status).to.equal(200);
                expect(response.body.token).to.be.a('string');
        })

        it('Deve retornar 400 com error em string contendo Usuário e senha são obrigatórios ao nao informar username ou senha', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': ''
                })
                
                expect(response.status).to.equal(400);
                expect(response.body.error).to.be.a('string');
                expect(response.body.error).to.equal('Usuário e senha são obrigatórios.');
        })

        it('Deve retornar 401 com error em string contendo Usuário ou senha inválidos ao  informar credencias invalidas', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '11111'
                })
                
                expect(response.status).to.equal(401);
                expect(response.body.error).to.be.a('string');
                expect(response.body.error).to.equal('Usuário ou senha inválidos.');
        })

        it('Deve retornar 405 com error em string contenco Método não permitido ao usar metodo nao permitido', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })
                
                expect(response.status).to.equal(405);
                expect(response.body.error).to.be.a('string');
                expect(response.body.error).to.equal('Método não permitido.');
        })

    })
})