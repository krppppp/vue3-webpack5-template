import chai from 'chai';

describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            chai.assert.equal([1, 2, 3].indexOf(4), -1);
        });

        it('should return 0 when the value is present', () => {
            chai.assert.equal([1, 2, 3].indexOf(1), 0);
        });
    });
});
