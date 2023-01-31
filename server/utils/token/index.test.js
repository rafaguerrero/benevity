
jest.mock('jsonwebtoken', () => ({ sign: jest.fn(), verify: jest.fn() }));
const jwt = require('jsonwebtoken');

const { generateToken, validateToken } = require('./index');

describe('Utils Token', () => {
    afterEach(() => jest.clearAllMocks());

    it('generateToken', () => {
        jwt.sign.mockReturnValue('TOKEN');

        const token = generateToken("payload");

        expect(token).toEqual("TOKEN");
        expect(jwt.sign).toHaveBeenCalledWith("payload", "PRIVATE_KEY", { expiresIn: '1d', algorithm: 'RS256' });
    });

    it('validateToken', () => {
        jwt.verify.mockReturnValue(true);

        const verify = validateToken("TOKEN");

        expect(verify).toEqual(true);
        expect(jwt.verify).toHaveBeenCalledWith("TOKEN", "PUBLIC_KEY");
    });
});