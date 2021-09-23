module.exports = class {
    static season = 1;

    static MAXCLAIMABLESEASON = 1;

    static getSeason() {
        return this.season;
    }

    static nextSeason() {
        this.season += 1;
        return this.season;
    }

    static setMaxClaimAvailableSeason(availableSeason) {
        this.MAXCLAIMABLESEASON = availableSeason;
        return this.MAXCLAIMABLESEASON;
    }

    static getMaxClaimAvailableSeason() {
        return this.MAXCLAIMABLESEASON;
    }

    static rollbackSeason() {
        this.season = 1;
        return this.season;
    }
}