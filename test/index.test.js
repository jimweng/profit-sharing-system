const {
    getCurrentSeason,
    invest,
    addProfit,
    claim,
    withdraw,
} = require('../index');


const ShareStakers = require('../models/sharestakers');
const Profit = require('../models/profit');
const Season = require('../models/season');

describe('test getCurrentSeason', () => {
    afterEach(() => {
        Profit.clearProfit();
        Season.rollbackSeason();
        //ShareStakers.removeAllStakers();
    })

    it('should return initial status', () => {
        expect(getCurrentSeason()).toEqual({ season: 1, profit: 0, sharestakers: {} })
    })
});

describe('test invest', () => {
    afterEach(() => {
        Profit.clearProfit();
        Season.rollbackSeason();
        ShareStakers.removeAllStakers();
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
        Profit.clearProfit();
        Season.rollbackSeason();
        ShareStakers.removeAllStakers();
    })

    it('should add profit based on season', () => {
        addProfit(10)
        expect(getCurrentSeason().profit).toBe(10);
    });
})

describe('test calim', () => {
    afterEach(() => {
        Profit.clearProfit();
        Season.rollbackSeason();
        ShareStakers.removeAllStakers();
    })

    it('should return 0', () => {
        expect(claim('Jim')).toEqual(0);
    })
})

describe('test withdraw', () => {
    afterEach(() => {
        Profit.clearProfit();
        Season.rollbackSeason();
        ShareStakers.removeAllStakers();
    })

    it('should return not enough to withdraw', () => {
        const account = 'Jim', amount = 10;
        expect(withdraw({ account, amount })).toEqual(Error('should deposit first'));
    })

    it('should return the withdraw amount', () => {
        const account = 'Jim', amount = 10;
        invest({ account, amount: amount + 1 })
        expect(withdraw({ account, amount })).toEqual(1);
    })

    it('should return the amount should be greater than 0', () => {
        const account = 'Jim', amount = -100;
        expect(withdraw({ account, amount })).toEqual(Error('the amount should be greater than 0'));
    })
});

describe('integration test', () => {
    afterEach(() => {
        Profit.clearProfit();
        Season.rollbackSeason();
        ShareStakers.removeAllStakers();
    })

    it('should return as expect', () => {
        // season 1;
        const account1 = 'Steve', amount1 = 10;
        const account2 = 'Dave', amount2 = 15;
        const account3 = 'Dave', amount3 = 25;
        const profit1 = 20, profit2 = 30;

        expect(invest({ account: account1, amount: amount1 })).toEqual(amount1);
        expect(addProfit(profit1)).toEqual(profit1);
        expect(invest({ account: account2, amount: amount2 })).toEqual(amount2);
        expect(addProfit(profit2)).toEqual(profit1+profit2);
        expect(invest({ account: account3, amount: amount3 })).toEqual(amount2+amount3);
        expect(claim('Dave')).toEqual(0);
        expect(getCurrentSeason()).toEqual({ season: 1, profit: profit1+profit2, sharestakers: { 'Steve': 10, 'Dave': 40 } });

        //season2
        expect(claim('Dave')).toEqual(40);
        expect(getCurrentSeason()).toEqual({ season: 2, profit: 0, sharestakers: { 'Steve': 10, 'Dave': 40}});

        // season 3
        const account4 = 'Steve', amount4 = 20;
        const profit3 = 35;
        expect(invest({ account: account4, amount: amount4 })).toEqual(amount1+amount4);
        expect(claim('Steve')).toEqual(0);
        expect(addProfit(profit3)).toEqual(profit3);
        expect(getCurrentSeason()).toEqual({ season: 3, profit: profit3, sharestakers: { 'Steve': 30, 'Dave': 40 }});

        // season 4
        expect(claim('Steve')).toEqual(15);
        expect(claim('Dave')).toEqual(20);
        expect(getCurrentSeason()).toEqual({ season: 4, profit: 0, sharestakers: { 'Steve': 30, 'Dave': 40}});
    })

})