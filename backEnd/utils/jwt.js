import JWT  from 'jsonwebtoken';
import config  from '../../config.js';

const genarateToken = (res, uid) => {
    const token = JWT.sign( {uid} , config.jwt_secret, { expiresIn: '1D' });
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict'
    })
};

export default genarateToken;