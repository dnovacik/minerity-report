import { createLocalStore } from '@/renderer/utils/localStore';

const localStorage = createLocalStore();

const state = {
    notifications: localStorage.get('notifications'),
    minToTray: localStorage.get('minToTray'),
    os: process.platform
}

const getters = {
    notifications() {
        return state.notifications;
    },

    minToTray() {
        return state.minToTray;
    },

    os() {
        return state.os;
    }
}

const mutations = {
    SET_SETTING (state, payload) {
        localStorage.set(payload.key, payload.val);
    }
}

const actions = {
    setSetting({ commit }, payload) {
        commit('SET_SETTING', payload);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}