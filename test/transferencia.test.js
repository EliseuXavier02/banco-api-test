const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const {obertToken} = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferência', () => {
     let token
        let bodyTransferencias

        beforeEach(async () => {
            token = await obertToken()
            bodyTransferencias = { ...postTransferencias}
        }) 

    describe('POST / transferencias', () =>{ 

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
    
    describe('GET / transferencias/{id}', () =>{
        it('Deve retornar 200 com os dados da transferência iguais ao do banco quando o ID for válido', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias/15')
                .set('Authorization', `Bearer ${token}`)

                expect(response.status).to.equal(200)
                expect(response.body.id).to.equal(15)
                expect(response.body.id).to.be.a('number')
                expect(response.body.conta_origem_id).to.equal(1)
                expect(response.body.conta_destino_id).to.equal(2)
                expect(response.body.valor).to.equal(10.00)
        })
    })

    describe('GET / transferencias', () =>{
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)
                
                expect(response.status).to.equal(200)
                expect(response.body.limit).to.equal(10)
                expect(response.body.transferencias).to.have.lengthOf(10)
        })

    })

})