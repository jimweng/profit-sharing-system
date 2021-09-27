const Profit = require('../../models/profit');

describe('test profit model function', () => {
    beforeEach(() => {
        Profit.clearProfit();
        Profit.clearClaimList();
        Profit.clearClaimed();
    })

    it('[setProfit] should return the current season amount', () => {
        const season = 1, amount = 10; 

        expect(Profit.setProfit({ season, amount })).toEqual(amount);
    })

    it('[setProfit] should return the accumulate season amount', () => {
        const season = 1, amount = 10;

        expect(Profit.setProfit({ season, amount })).toEqual(amount);
        expect(Profit.setProfit({ season, amount })).toEqual(amount+amount);
    })

    it('[getSeasonProfit] should return the specific season profit', () => {
        const season = 1, amount = 10;
        expect(Profit.getSeasonProfit(season)).toEqual(0);
        
        Profit.setProfit({ season, amount });
        expect(Profit.getSeasonProfit(season)).toEqual(amount);

        Profit.setProfit({ season: season + 1, amount: amount + 1});
        expect(Profit.getSeasonProfit(season+1)).toEqual(amount + 1);
        expect(Profit.getSeasonProfit(season)).toEqual(amount);
    })

    it('[setClaimList] should return the profit which stakeholder can get on next available claim season', () => {
        const holder = 'Jim', amount = 100;

        expect(Profit.setClaimList({ holder, amount})).toEqual(amount);
        expect(Profit.getClaimAmount(holder)).toEqual(amount);
    })

    it('[getClaimList] should retrun the whole claimlist', () => {
        const holder = 'Jim', amount = 100, holder2 = 'Dave', amount2 = 50;

        Profit.setClaimList({ holder, amount});
        Profit.setClaimList({ holder: holder2, amount: amount2 });
        expect(Profit.getClaimList()).toEqual({ 'Jim': amount, 'Dave': amount2 })
    })

    it('[getClaimAmount] should return the profit that the specific stakeholder can claim', () => {
        const holder = 'Jim', amount = 100;

        Profit.setClaimList({ holder, amount});
        expect(Profit.getClaimAmount(holder)).toEqual(amount);
    })

    it('[setClaimed] should return the season that is set', () => {
        const holder = 'Jim', season = 1, season2 = 2;

        expect(Profit.isSeasonClaimed({ holder, season })).toBeFalsy();
        expect(Profit.setClaimed({ holder, season })).toEqual(season);
        expect(Profit.isSeasonClaimed({ holder, season })).toBeTruthy();

        expect(Profit.isSeasonClaimed({ holder, season: season2 })).toBeFalsy();
        expect(Profit.setClaimed({ holder, season: season2 })).toEqual(season2);
        expect(Profit.isSeasonClaimed({ holder, season:season2 })).toBeTruthy();
    })

    it('[isSeasonClaimed] should return boolean isClaimed based on if the stakeholder get the profit from the season', () => {
        const holder = 'Jim', season = 1;

        expect(Profit.isSeasonClaimed({ holder, season })).toBeFalsy();
        Profit.setClaimed({ holder, season });
        expect(Profit.isSeasonClaimed({ holder, season })).toBeTruthy();
    })

    it('[getAllProfit] should return all seasons profit', () => {
        expect(Profit.getAllProfit()).toEqual({ '0': 0, '1': 0 });

        const season = 1, amount = 10;
        Profit.setProfit({ season, amount });
        expect(Profit.getAllProfit()).toEqual({ '0': 0, '1': amount });
    })
})