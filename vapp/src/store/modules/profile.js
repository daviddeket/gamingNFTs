const state = {
    ownedGnfs: []
};

const getters = {
    getOwnedGnfs(state) {
        return state.ownedGnfs;
    }
};

const actions = {
    async fetchOwnedGnfs({ commit, rootState }) {
        let drizzleInstance = rootState.drizzle.drizzleInstance;
        let activeAccount = rootState.accounts.activeAccount;

        // get token balance for the active user
        console.log(await drizzleInstance.contracts.Gnft.methods.balanceOf(activeAccount).call())
        console.log(await drizzleInstance.contracts.Gnft.methods.totalSupply().call())
        console.log(await drizzleInstance.contracts.Gnft.methods.svgs(0).call())

        // remove the 18 decimals and commit as balance
        commit("setOwnedGnfs", []);
    }
};

const mutations = {
    setOwnedGnfs(state, balance) {
        state.ownedGnfs = balance;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};