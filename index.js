// TODO: Support different MaxClaimableSeason
const MAXCLAIMABLESEASON = 1;
//let sharestakers = require('../model/sharestakers');
let sharestakers = {};
let profit = { '0': 0, '1': 0 };
let season = 1;

const getCurrentSeason = () => {
    const returnObj = {
        season,
        sharestakers,
        profit: profit[season]
    }
    season += 1;
    return returnObj;
}

// TODO: amount uppder bound
const invest = ({ amount, account }) => {
    if (amount < 0) return;
    if (account in sharestakers) {
        sharestakers.set({account, amount});
        sharestakers[account] += amount;
    } else {
        sharestakers[account] = amount;
    }
}

const addProfit = (amount) => {
    if (season in profit) {
        profit[season] += amount;
    } else {
        profit[season] = amount;
    }
}

const claim = (holder) => {
    let profitToShare = 0;
    // all avaliable profit
    for (let i = season - MAXCLAIMABLESEASON; i < season; i++) {
        if (profit[i]) {
            profitToShare += profit[i];
        }
    }


    if (profitToShare <= 0) {
        return Error('not enough to share');
    }

    // calculate the portion of the holder
    const totalShare = Object.values(sharestakers).reduce((a, b) => a + b);

    // TODO: MAXCLAIMABLESEASON
    console.log(`${holder} claim: ${profitToShare * sharestakers[holder] / totalShare}`);
    return profitToShare * sharestakers[holder] / totalShare;
}

const withdraw = ({amount, account}) => {
    if (amount < 0 ) {
        return Error('the amount should be greater than 0');
    }

    if (!(account in sharestakers)) {
        return Error('should deposit first');
    }

    if (sharestakers[account] - amount < 0 ) {
        return Error('not enough to withdraw');
    }

    sharestakers[account] -= amount;
    return amount;
}

// // season 1;
// invest(10, 'Steve');
// addProfit(20);
// invest(15, 'Dave');
// addProfit(30);
// invest(25, 'Dave');
// claim('Dave');
// getCurrentSeason();

// // season 2
// claim('Dave');
// getCurrentSeason();

// // season 3
// invest(20, 'Steve');
// claim('Steve');
// addProfit(35);
// getCurrentSeason();

// // season 4
// claim('Steve');
// claim('Dave');
// getCurrentSeason();


module.exports = {
    getCurrentSeason,
    invest,
    addProfit,
    claim,
    withdraw,
}