const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const {obertToken} = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferência', () => {
    describe('POST / transferencias', () =>{
        let token
        let bodyTransferencias

        beforeEach(async () => {
            token = await obertToken()
            bodyTransferencias = { ...postTransferencias}
        }) 

        it('Deve retornar suceso com 201 quando o valor da transferencia for maior ou igual que R$ 10,00', async () => {

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
                expect(response.status).to.equal(201);
        })

        it('Deve retornar erro com 422 quando o valor da transferencia for menor que R$ 10,00', async () => {
            bodyTransferencias.valor = 5.00

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
                expect(response.status).to.equal(422);
        })
    })
})