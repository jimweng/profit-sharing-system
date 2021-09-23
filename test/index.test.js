const {
    getCurrentSeason,
    invest,
    addProfit,
    claim,
    withdraw,
} = require('../index');

let profit = require('./mocks/profit');
let season = require('./mocks/season');
const MAXCLAIMABLESEASON = 1;
let sharestakers = {};


// TODO: decouple data access layer


describe('test getCurrentSeason', () => {
    afterEach(() => {
        profit = { '0': 0, '1': 0 };
        season = 1;
        sharestakers = {}
    })

    it('should return initial status', () => {
        expect(getCurrentSeason()).toEqual({ season: 1, profit: 0, sharestakers: {} })
    })
});

describe('test invest', () => {
    afterEach(() => {
        profit = { '0': 0, '1': 0 };
        season = 1;
        for (const prop in sharestakers) {
            delete sharestakers[prop];
        }
    })

    it('should return sharestaker list', () => {
        const account = 'Dave', amount = 15;
        invest({ amount, account });
        expect(getCurrentSeason().sharestakers).toEqual({ 'Dave': 15 });

        const account2 = 'Steve', amount2 = 10
        invest({ amount: amount2, account: account2 })
        expect(getCurrentSeason().sharestakers).toMatchObject({ 'Steve': 10 });
    });
})

describe('test addProfit', () => {
    afterEach(() => {
        profit = { '0': 0, '1': 0 };
        season = 1;
        sharestakers = {}
    })

    it('should add profit based on season', () => {
        addProfit(10)
        //expect(getCurrentSeason().profit)
    });
})

describe('test calim', () => {
    afterEach(() => {
        profit = { '0': 0, '1': 0 };
        season = 1;
        sharestakers = {};
    })

    it('should return Error not enough to share', () => {
        expect(claim('Jim')).toEqual(Error('not enough to share'));
    })
})

describe('test withdraw', () => {
    afterEach(() => {
        profit = { '0': 0, '1': 0 };
        season = 1;
        sharestakers = {}
    })

    it('should return not enough to withdraw', () => {
        const account = 'Jim', amount = 10;
        expect(withdraw({ account, amount })).toEqual(Error('should deposit first'));
    })

    it('should return the withdraw amount', () => {
        const account = 'Jim', amount = 10;
        invest({ account, amount })
        expect(withdraw({ account, amount })).toEqual(amount);
    })

    it('should return the amount should be greater than 0', () => {
        const account = 'Jim', amount = -100;
        expect(withdraw({ account, amount })).toEqual(Error('the amount should be greater than 0'));
    })
});