import JWT from 'jsonwebtoken'
import config from './../../config.js'

const accessToken = (uid) => {
    return JWT.sign({uid},config.access_secret,{expiresIn:'15M'})
}

export default accessToken;