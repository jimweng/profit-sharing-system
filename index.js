const ShareStakers = require('./models/sharestakers');
const Season = require('./models/season');
const Profit = require('./models/profit');

const getCurrentSeason = () => {
    const returnObj = {
        season: Season.getSeason(),
        sharestakers: ShareStakers.getAllStakers() || {},
        profit: Profit.getSeasonProfit(Season.getSeason()) || 0,
    }
    Season.nextSeason();
    return returnObj;
}

// TODO: amount uppder bound
const invest = ({ amount, account }) => {
    if (!account) return; 
    if (amount < 0) return Error('should deposit greater than 0');
    return ShareStakers.setStaker({ account, amount });
}

const addProfit = (amount) => {
    return Profit.setProfit({season: Season.getSeason(), amount});
}

const claim = (holder) => {
    let profitToShare = 0;
    const thisSeason = Season.getSeason();

    // all avaliable profit
    for (let i = thisSeason - Season.getMaxClaimAvailableSeason(); i < thisSeason; i++) {
        if (Profit.getSeasonProfit(i)) {
            profitToShare += Profit.getSeasonProfit(i);
        }
    }

    if (profitToShare < 0) {
        return Error('not enough to share');
    }

    if (profitToShare == 0) {
        return 0;
    }

    // calculate the portion of the holder
    const totalShare = Object.values(ShareStakers.getAllStakers()).reduce((a, b) => a + b);
    //Profit.setProfit({season: thisSeason-1, amount: -profitToShare * ShareStakers.getStaker(holder) / totalShare})    

    //console.log(`${holder} claim: ${profitToShare * ShareStakers.getStaker(holder) / totalShare}`);
    return profitToShare * ShareStakers.getStaker(holder) / totalShare;
}

const withdraw = ({ amount, account }) => {
    if (!account) {
        return; 
    }

    if (amount < 0) {
        return Error('the amount should be greater than 0');
    }

    if (!ShareStakers.getStaker(account)) {
        return Error('should deposit first');
    }

    if (ShareStakers.getStaker(account) - amount < 0) {
        return Error('not enough to withdraw');
    }

    return ShareStakers.setStaker({ account, amount: -amount });
}

module.exports = {
    getCurrentSeason,
    invest,
    addProfit,
    claim,
    withdraw,
}