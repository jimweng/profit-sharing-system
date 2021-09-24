const Profit = require('../../models/profit');

describe('test profit model function', () => {
    beforeEach(() => {
        Profit.clearProfit();
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

    it('[getAllProfit] should return all seasons profit', () => {
        expect(Profit.getAllProfit()).toEqual({ '0': 0, '1': 0 });

        const season = 1, amount = 10;
        Profit.setProfit({ season, amount });
        expect(Profit.getAllProfit()).toEqual({ '0': 0, '1': amount });
    })
})