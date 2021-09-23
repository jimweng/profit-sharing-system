module.exports = class {

    static sharestakers = {};

    static getAllStakers() {
        return this.sharestakers;
    }

    static setStaker({ account, amount }) {
        if (account in this.sharestakers) {
            this.sharestakers[account] += amount;
        } else {
            this.sharestakers[account] = amount;
        }
        return this.sharestakers[account];
    }

    static getStaker(account) {
        if (account in this.sharestakers) {
            return this.sharestakers[account];
        }
        return false;
    }

    static removeStaker(account) {
        delete this.sharestakers[account];
        return `${account} has been deleted`;
    }

    static removeAllStakers() {
        if (Object.keys(this.sharestakers).length == 0) {
            return;
        } else {

        for(const account in this.sharestakers) {
            delete this.sharestakers[account]
        }
        }
        return;
    }
};