import { createLocalStore } from '@/renderer/utils/localStore';
import { arrayRemove } from '@/renderer/utils/helpers';
import router from '@/renderer/router';

const localStorage = createLocalStore();

const state = {
    seed: localStorage.get('seed'),
    apibinds: localStorage.get('apibinds') || []
}

const getters = {
    seed() {
        return state.seed;
    },
    
    apibinds() {
        return state.apibinds;
    }
}

const mutations = {
    HANDLE_REGISTER (state, payload) {
        state.seed = payload.val;
        router.push('dashboard');
    },

    ADD_APIBIND (state, payload) {
        if (state.apibinds.some(a => a == payload.val)) {
            localStorage.set('apibinds', [...state.apibinds]);
        } else {
            localStorage.set('apibinds', [payload.val, ...state.apibinds]);
        }
    },

    REMOVE_APIBIND (state, payload) {
        localStorage.set('apibinds', arrayRemove(state.apibinds, payload.val));
    }
}

const actions = {
    setSetting({ commit }, payload) {
        commit('SET_SETTING', payload);
    },

    registerUser({ commit }, payload) {
        localStorage.set(payload.key, payload.val);
        commit('HANDLE_REGISTER', payload);
    },

    addApiBind({ commit }, payload) {
        commit('ADD_APIBIND', payload);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}