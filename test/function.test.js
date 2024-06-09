import formatDate from '../src/commons/utils.js';

describe('Utils', () => {
    describe('test is Valid Date', () => {
        it('should return true if date is valid', () => {
            // arrange
            const dateString = '04-12-2004';

            // act
            const result = formatDate(dateString);

            // assert
            expect(result).toEqual('04-12-2004');
        });

        it('should return true if date is invalid', () => {
            // arrange
            const dateString = '2021-1';

            // act
            const result = formatDate(dateString);

            // assert
            expect(result).toEqual('2021-1');
        });
    });
});
