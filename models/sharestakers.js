let sharestaker = {};

module.exports = class sharestaker {
    static async get() {

    }

    static async set({account, amount}) {
        
    }

    static async delete(account) {
        delete sharestaker[account];
        return `${account} has been deleted`;
    }
};