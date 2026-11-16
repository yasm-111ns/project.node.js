import jwt from 'jsonwebtoken';

const JWT_SECRET = 'super_secret_key_123'
const JWT_EXPIRES_IN = '24';

class TokenService{
    generateToken(paload){
        return jwt.sign(paload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN});
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            return null;
        }
    }
}


export default new TokenService();
