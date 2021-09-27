module.exports = class {
    static profit = { '0': 0, '1': 0 };

    static claimList = {};

    static claimed = {};

    static setProfit({ season, amount }) {
        if (season in this.profit) {
            this.profit[season] += amount;
        } else {
            this.profit[season] = amount;
        }

        return this.profit[season];
    }

    static getSeasonProfit(season) {
        return this.profit[season];
    }

    static setClaimList({ holder, amount }) {
        if (amount == 0) {
            this.claimList[holder] = 0;
        } else {
            this.claimList[holder] = Number(amount);
        }

        return this.claimList[holder];
    }

    static getClaimList() {
        return this.claimList;
    }

    static getClaimAmount(holder) {
        return this.claimList[holder];
    }

    static setClaimed({ holder, season }) {
        if (!(holder in this.claimed)) {
            this.claimed[holder] = [season];
        }

        if (!this.claimed[holder].find(element => element == season)) {
            this.claimed[holder].push(season)
        }

        return season;
    }

    static isSeasonClaimed({ holder, season }) {
        let isClaimed = false;

        if (Object.keys(this.claimed).length == 0) return isClaimed;

        if (holder in this.claimed) {
            isClaimed = this.claimed[holder].find(element => element == season) || false;
        }

        return isClaimed;
    }

    static getAllProfit() {
        return this.profit;
    }

    static clearProfit() {
        for (const season in this.profit) {
            delete this.profit[season];
        }

        this.profit[0] = 0;
        this.profit[1] = 0;
        return this.profit;
    }

    static clearClaimList() {
        for (const claimer in this.claimList) {
            delete this.claimList[claimer];
        }
        return this.claimList;
    }

    static clearClaimed() {
        for (const holder in this.claimed) {
            delete this.claimed[holder];
        }
        return this.claimed;
    }

}
