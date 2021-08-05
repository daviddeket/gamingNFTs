const gnftMapping = () => ({
    svg: '',
    strength: 0,
    cost: 0,
    type: 0,
    rarity: 0
})
const state = {
    ownedGnfts: [],
    totalGnft: 0,
    balance: {}
};

const getters = {
    getOwnedGnft(state) {
        return state.ownedGnfts;
    }
};

const actions = {
    async fetchOwnedGnft({ commit, rootState }) {
        let drizzleInstance = rootState.drizzle.drizzleInstance;
        let activeAccount = rootState.accounts.activeAccount;

        // set total amount of Gntf tokens
        const totalSupply = await drizzleInstance.contracts.Gnft.methods.totalSupply().call()
        commit("setTotalGnft", totalSupply);

        // set current user balance
        const balance = await drizzleInstance.contracts.Gnft.methods.balanceOf(activeAccount).call()
        commit("setBalance", balance);

        for (var i = 1; i <= totalSupply; i++) {
            console.log('test')
            const gnft = gnftMapping()
            gnft.svg = await drizzleInstance.contracts.Gnft.methods.svgs(i - 1).call()
            gnft.strength = await drizzleInstance.contracts.Gnft.methods.strengths(i - 1).call()
            gnft.cost = await drizzleInstance.contracts.Gnft.methods.costs(i - 1).call()
            gnft.type = await drizzleInstance.contracts.Gnft.methods.types(i - 1).call()
            gnft.rarity = await drizzleInstance.contracts.Gnft.methods.rarities(i - 1).call()
            console.log('newgnft', gnft)
            commit("setOwnedGnft", gnft);
        }
    }
};

const mutations = {
    setOwnedGnft(state, gnft) {
        state.ownedGnfts.push(gnft)
    },
    setTotalGnft(state, amount) {
        state.totalGnft = amount;
    },
    setBalance(state, balance) {
        state.balance = balance;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};