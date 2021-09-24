const Sharestakers = require('../../models/sharestakers');

describe('test sharestakers model', () => {
    beforeEach(() => {
        Sharestakers.removeAllStakers();
    })

    it('[getAllStakers] should return all stake list', () => {
        expect(Sharestakers.getAllStakers()).toEqual({});

        const account = 'John', amount = 15;
        Sharestakers.setStaker({ amount, account });
        expect(Sharestakers.getAllStakers()).toEqual({ 'John': 15 });

        const account2 = 'Dave', amount2 = 100;
        Sharestakers.setStaker({ amount: amount2, account: account2 });
        expect(Sharestakers.getAllStakers()).toEqual({ 'John': 15, 'Dave': 100 });

        Sharestakers.setStaker({ account, amount: amount2 });
        expect(Sharestakers.getAllStakers()).toEqual({ 'John': 115, 'Dave': 100 });
    })

    it('[setStaker] should return the amount staker deposit', () => {
        const account = 'John', amount = 15;
        expect(Sharestakers.setStaker({ amount, account })).toEqual(amount);
        expect(Sharestakers.setStaker({ amount, account })).toEqual(amount + amount);
    })

    it('[getStacker] should return the specific staker money', () => {
        const account = 'John', amount = 15;
        const account2 = 'Dave', amount2 = 100;
        Sharestakers.setStaker({ amount, account });
        Sharestakers.setStaker({ amount: amount2, account: account2 });

        expect(Sharestakers.getStaker(account)).toEqual(amount);
        expect(Sharestakers.getStaker(account2)).toEqual(amount2); 
    })

})