import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        record: [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    },
    mutations: {
        addNewKeyIn(state, payload) {
            state.record[payload.level].push(payload.newKeyIn)
        }
    },
    actions: {
        resetAllRecords({state}) {
            // why this works but not forEach?
            state.record [
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ]
        }
    }
})

export { store }