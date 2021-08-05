import Vue from 'vue';
import Vuex from 'vuex';
import gnfs from "./modules/gntf";
import profile from "./modules/profile";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        gnfs,
        profile
    }
});