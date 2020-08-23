import Vue from 'vue'
let defaultUserData = {
    books: {},
    words: {}
}
export default {
    state: {
        userData: defaultUserData
    },
    mutations: {
        SET_USER_DATA(state, payload){
            Vue.set(state, 'userData', payload)
            // state.userData = payload
        },
        ADD_USER_BOOK(state, payload){
            Vue.set(state.userData.books, payload.bookId, payload.book)
        },
        ADD_USER_BOOK_PART(state, payload){
            Vue.set(state.userData.books[payload.bookId].parts, payload.partId, {addedDate: payload.timestamp})
        },
        UPDATE_USER_BOOK_PART_LAST_OPENED_DATE(state, payload){
            Vue.set(state.userData.books[payload.bookId].parts[payload.partId], 'lastOpenedDate', payload.timestamp)
        },
        UPDATE_USER_BOOK_PART_FINISH_INFO(state, payload){
            Vue.set(state.userData.books[payload.bookId].parts[payload.partId], 'finishedDate', payload.timestamp)
            Vue.set(state.userData.books[payload.bookId].parts[payload.partId], 'rating', payload.rating)
        },
    },
    actions: {
        LOAD_USER_DATA({commit}, payload){
            commit('SET_PROCESSING', true)
            let userDataRef = Vue.$db.collection('userData').doc(payload)
            userDataRef.get()
            .then((data) => {
                let userData = data.exists ? data.data() : defaultUserData

                if(!userData.books)
                    userData.books = {}

                commit('SET_USER_DATA', userData)
                commit('SET_PROCESSING', false)

            })
            .catch(() => {
                commit('SET_PROCESSING', false)
            })
        },
        ADD_USER_BOOK({ commit, getters }, payload) {
            commit('SET_PROCESSING', true)
            let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
            let book = {
                addedDate: new Date(),
                parts: {}
            }

            userDataRef.set({
                books: {
                    [payload]: book
                }
            }, { merge: true })
                .then(() => {
                    commit('ADD_USER_BOOK', { bookId: payload, book: book })
                    commit('SET_PROCESSING', false)
                })
                .catch(() => {
                    commit('SET_PROCESSING', false)
                })
        },
        UPDATE_USER_BOOK_PART_STATS({commit, getters}, payload)
        {
            let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
            let timestamp = new Date()
            if(!getters.userData.books[payload.bookId].parts[payload.partId]){
                userDataRef.update({
                    [`books.${payload.bookId}.parts.${payload.partId}.addedDate`] : timestamp
                })
                .then(() => commit('ADD_USER_BOOK_PART', {bookId: payload.bookId, partId: payload.partId, timestamp: timestamp}))
        }

        userDataRef.update({
            [`books.${payload.bookId}.parts.${payload.partId}.lastOpenedDate`] : timestamp
        })
        .then(() => commit('UPDATE_USER_BOOK_PART_LAST_OPENED_DATE', {bookId: payload.bookId, partId: payload.partId, timestamp: timestamp}))
    },
    FINISH_USER_BOOK_PART({commit, getters}, payload){
        let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
        let timestamp = new Date()

        userDataRef.update({
            [`books.${payload.bookId}.parts.${payload.partId}.finishedDate`] : timestamp,
            [`books.${payload.bookId}.parts.${payload.partId}.rating`] : payload.rating
        })
        .then(() => commit('UPDATE_USER_BOOK_PART_FINISH_INFO', {bookId: payload.bookId, partId: payload.partId, timestamp: timestamp, rating: payload.rating}))

    }
    },
    getters: {
       userData: (state) => state.userData
    },
}