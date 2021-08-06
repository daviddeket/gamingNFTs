const gnftMapping = () => ({
    svg: '',
    strength: 0,
    cost: 0,
    type: 0,
    rarity: 0,
    owner: '',
    currentIsOwner: false,
    isPurchasable: false,
    tokenId: ''
})
const state = {
    gnfts: [],
    totalGnft: 0,
    balance: {}
};

const getters = {
    getGnfts(state) {
        return state.gnfts;
    }
};

const actions = {
    async fetchOwnedGnft({ commit, rootState }) {
        // get drizzleInstance with all contracts and their methods as well as the current logged in user (meta-mask)
        let drizzleInstance = rootState.drizzle.drizzleInstance;
        let activeAccount = rootState.accounts.activeAccount;

        // set total amount of Gntf tokens
        const totalSupply = await drizzleInstance.contracts.Gnft.methods.totalSupply().call()
        commit("setTotalGnft", totalSupply);

        // set current user tokens
        const balance = await drizzleInstance.contracts.Gnft.methods.balanceOf(activeAccount).call()
        commit("setBalance", balance);
        const gnfts = []
        for (var i = 1; i <= totalSupply; i++) {
            const gnft = gnftMapping()
            gnft.svg = await drizzleInstance.contracts.Gnft.methods.svgs(i - 1).call()
            gnft.strength = await drizzleInstance.contracts.Gnft.methods.strengths(i - 1).call()
            gnft.cost = await drizzleInstance.contracts.Gnft.methods.costs(i - 1).call()
            gnft.type = await drizzleInstance.contracts.Gnft.methods.types(i - 1).call()
            gnft.rarity = await drizzleInstance.contracts.Gnft.methods.rarities(i - 1).call()
            gnft.owner = await drizzleInstance.contracts.Gnft.methods.ownerOf(i - 1).call()
            gnft.currentIsOwner = activeAccount === gnft.owner
            gnft.isPurchasable = await drizzleInstance.contracts.Gnft.methods.tokenIdToPrice(i - 1).call()
            gnft.tokenId = i - 1
            gnfts.push(gnft)
        }
        commit("setGnfts", gnfts);
    },
    async mintGnft({ rootState }, svg) {
        let drizzleInstance = rootState.drizzle.drizzleInstance;
        let activeAccount = rootState.accounts.activeAccount;
        const response = await drizzleInstance.contracts.Gnft.methods.mint(svg).send({ activeAccount })
        console.log('create new gnft', response)
    },
    async setPurchasable({ rootState }, tokenId, price) {
        let drizzleInstance = rootState.drizzle.drizzleInstance;
        let activeAccount = rootState.accounts.activeAccount;
        const response = await drizzleInstance.contracts.Gnft.methods.allowBuy(tokenId, price).send({ activeAccount })
        console.log('set as purchasable', response)
    },
    async unSetPurchasable({ rootState }, tokenId) {
        let drizzleInstance = rootState.drizzle.drizzleInstance;
        let activeAccount = rootState.accounts.activeAccount;
        const response = await drizzleInstance.contracts.Gnft.methods.disallowBuy(tokenId).send({ activeAccount })
        console.log('unSet as purchasable', response)
    },
    async buyGnft({ rootState }, tokenId) {
        let drizzleInstance = rootState.drizzle.drizzleInstance;
        let activeAccount = rootState.accounts.activeAccount;
        const response = await drizzleInstance.contracts.Gnft.methods.buy(tokenId).send({ activeAccount })
        console.log('buy Gnft', response)
    }
    /*
    async mintToken({ commit, rootState}) {
        const tx = nftContract.methods.mintNFT(...).send({from: ...});

        tx.on('receipt', function(receipt){
            console.log(logs[0].topics[3]); // this prints the hex value of the tokenId
            // you can use `web3.utils.hexToNumber()` to convert it to decimal
        });
    }*/
}

const mutations = {
    setGnfts(state, gnfts) {
        state.gnfts = gnfts
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