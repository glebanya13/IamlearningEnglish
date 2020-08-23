import firebase from 'firebase'

export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null
        }
    },
    mutations: {
        SET_USER(state, payload){
            state.user.isAuthenticated = true
            state.user.uid = payload
        },
        UNSER_USER(state){
            state.user = {
                isAuthenticated: false,
                uid: null
            }
        }
    },
    actions: {
        SINGUP({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
                commit('SET_PROCESSING', false)
            })
            .catch(function(error) {
                commit('SET_PROCESSING', false)
                commit('SET_ERROR', error.message)
              });
        },
        SINGIN({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
                commit('SET_PROCESSING', false)
            })
            .catch(function(error) {
                commit('SET_PROCESSING', false)
                commit('SET_ERROR', error.message)
              });
        },
        SIGNOUT(){
            firebase.auth().signOut()
        },
        STATE_CHANGED({commit, dispatch}, payload){
            if(payload){
                commit('SET_USER', payload.uid)
                dispatch('LOAD_USER_DATA', payload.uid)
            }else{
                commit('UNSER_USER')
            }
        }
    },
    getters:{
        userId: (state) => state.user.uid,
        isUserAuthenticated: (state) => state.user.isAuthenticated
    }
}