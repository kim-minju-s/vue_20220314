import { createStore  } from 'vuex';

export default createStore({

    // 상태변수
    state : {
        logged : false,
    },

    // getters => App.vue
    getters : {
        getLogged(state) {
            return state.logged;
        }
    },

    // mutations => LoginView.vue, LogoutView.vue
    mutations : {
        setLogged(state, value) {
            state.logged = value;
        }
    }

    //actions

});