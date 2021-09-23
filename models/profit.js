module.exports = class {
    static profit = { '0': 0, '1': 0 };

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

    static getAllProfit() {
        return this.profit;
    }

    static clearProfit() {
        for(const season in this.profit) {
            delete this.profit[season]
        }

        this.profit[0] = 0;
        this.profit[1] = 0;
        return this.profit;
    }
}
