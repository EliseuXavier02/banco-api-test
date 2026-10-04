const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()

describe('Transferência', () => {
    describe('POST / transferencias', () =>{
        it('Deve retornar suceso com 201 quando o valor da transferencia for maior ou igual que R$ 10,00', async () => {
            const responseLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })

            const token = responseLogin.body.token

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 10.00,
                    'token': 'string'
                })
                expect(response.status).to.equal(201);
        })

        it('Deve retornar erro com 422 quando o valor da transferencia for menor que R$ 10,00', async () => {
            const responseLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })

            const token = responseLogin.body.token

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 9.99,
                    'token': ''
                })
                expect(response.status).to.equal(422);
        })
    })
})