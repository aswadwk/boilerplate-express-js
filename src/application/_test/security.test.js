import {
    decodeToken, generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken,
} from '../security.js';

describe('Security Test', () => {
    it('can generate access token', async () => {
        // Arrange
        const payload = {
            email: 'aswad@gmail.com',
            id: '123',
        };

        // Act
        const token = generateAccessToken(payload);

        // Assert
        expect(token).toBeDefined();
    });

    it('can generate refresh token', async () => {
        // Arrange
        const payload = {
            email: 'aswad@gmail.com',
            id: '123',
        };

        // Act
        const token = generateAccessToken(payload);

        // Assert
        expect(token).toBeDefined();
    });

    it('can verify access token', async () => {
        // Arrange
        const payload = {
            email: 'aswad@gmail.com',
            id: '123',
        };

        const token = generateAccessToken(payload);

        // Act
        const result = verifyAccessToken(token);

        // Assert
        expect(result).toBeDefined();
    });

    it('can not verify access token', async () => {
        // Arrange
        const payload = {
            email: 'aswad@gmail.com',
            id: '123',
        };

        const token = `${generateAccessToken(payload)}a`;

        // Act
        try {
            verifyAccessToken(token);
        } catch (error) {
            // Assert
            expect(error).toBeDefined();
        }
    });

    it('can not verify refresh token', async () => {
        // Arrange
        const payload = {
            email: 'aswad@gmail.com',
            id: '123',
        };

        const token = generateRefreshToken(payload);

        // Act
        try {
            verifyRefreshToken(token);
        } catch (error) {
            // Assert
            expect(error).toBeDefined();
        }
    });

    it('can decode token', async () => {
        // Arrange
        const payload = {
            email: 'aswad@gmail.com',
            id: '123',
        };

        const token = generateAccessToken(payload);

        // Act
        const result = decodeToken(token);

        // Assert
        expect(result.email).toEqual(payload.email);
        expect(result.id).toEqual(payload.id);
    });
});
