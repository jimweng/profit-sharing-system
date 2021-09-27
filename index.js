const ShareStakers = require('./models/sharestakers');
const Season = require('./models/season');
const Profit = require('./models/profit');

const calculateClaimableAmount = (holder) => {
    let profitToShare = 0;
    const currentSeason = Season.getSeason();
    const endCondition = Math.max(currentSeason - Season.getMaxClaimAvailableSeason(), 0)

    // All available profit(within claimAvailableSeason): invest on the season and the holder did not claim before. 
    for (let i = currentSeason; i > endCondition; i--) {
        if (Profit.getSeasonProfit(i) && !Profit.isSeasonClaimed({ holder, season: i })) {
            profitToShare += Profit.getSeasonProfit(i);
        }
    }

    if (profitToShare < 0) {
        return Error('not enough to share');
    }

    // Calculate the portion of the holder's share profit
    const totalShare = Object.values(ShareStakers.getAllStakers()).reduce((a, b) => a + b);
    let amount = parseFloat(profitToShare * ShareStakers.getStaker(holder) / totalShare).toPrecision(18);
    Profit.setClaimList({ holder, amount: Number(amount) });
    return;
}

// Summary the situation on the end of season, and update season to next.
const getCurrentSeason = () => {
    const currentSeason = Season.getSeason();
    if (!Profit.getSeasonProfit(currentSeason)) {
        Profit.setProfit({ season: currentSeason, amount: 0 });
    }

    const returnObj = {
        season: currentSeason,
        sharestakers: ShareStakers.getAllStakers(),
        profit: Profit.getSeasonProfit(currentSeason),
    }

    // update claimableProfit and claimed
    for (const staker in ShareStakers.getAllStakers()) {
        calculateClaimableAmount(staker);
    }

    Season.nextSeason();
    return returnObj;
}

const invest = ({ amount, account }) => {
    if (!account) return;
    if (amount < 0) return Error('should deposit greater than 0');
    if (amount > 1e18) return Error('Overflow');

    return ShareStakers.setStaker({ account, amount });
}

const addProfit = (amount) => {
    return Profit.setProfit({ season: Season.getSeason(), amount });
}

const claim = (holder) => {
    if (holder in Profit.getClaimList()) {
        const profit = Profit.getClaimAmount(holder);
        // If there is the available claim profit, then update the claimed list with the seasons that profits were claimed.
        if (profit > 0) {
            for (let i = Season.getSeason() - Season.getMaxClaimAvailableSeason(); i < Season.getSeason(); i++) {
                Profit.setClaimed({ holder, season: i });
            }
        }

        return profit;
    } else {
        return 0;
    }
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