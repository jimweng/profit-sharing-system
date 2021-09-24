const Season = require('../../models/season');

describe('test season model function', () => {
    beforeEach(() => {
        Season.rollbackSeason();
        Season.rollbackMaxClaimAvailableSeason();
    })

    it('[getSeason] should return the current season', () => {
        expect(Season.getSeason()).toEqual(1);

        Season.nextSeason();
        expect(Season.getSeason()).toEqual(2);
    })

    it('[nextSeason] should return the next season', () => {
        expect(Season.getSeason()).toEqual(1);
        expect(Season.nextSeason()).toEqual(2);
    })

    it('[getMaxClaimAvailableSeason] should return the MAXCLAIMABLESEASON', () => {
        expect(Season.getMaxClaimAvailableSeason()).toEqual(1);

        Season.setMaxClaimAvailableSeason(2);
        expect(Season.getMaxClaimAvailableSeason()).toEqual(2);
    })

    it('[setMaxClaimAvailableSeason] should return the new MAXCLAIMABLESEASON', () => {
        expect(Season.getMaxClaimAvailableSeason()).toEqual(1);
        expect(Season.setMaxClaimAvailableSeason(2)).toEqual(2);
    })
})