const request = require('supertest');

const  obertToken = async (usuario, senha) => {
    const responseLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': usuario,
                    'senha': senha
                })
    
                return responseLogin.body.token
}
module.exports = {obertToken}