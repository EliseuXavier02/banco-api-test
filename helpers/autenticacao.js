const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json')

const  obertToken = async () => {
    const bodyLogin = { ...postLogin }

    const responseLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)
    
        return responseLogin.body.token
}
module.exports = {obertToken}