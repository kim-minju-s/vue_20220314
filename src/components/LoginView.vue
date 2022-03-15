<template>
    <div style="padding:20px">
        <h3>login</h3>
        <hr />
        아이디 : <input type="text" ref="userid" v-model="state.userid"/><br />
        암호 : <input type="password" ref="userpw" v-model="state.userpw"/><br />
        <button @click="handleLogin">로그인</button>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {

        const router = useRouter();
        const store = useStore();

        // 빈 ref객체 생성
        const userid = ref(null);
        const userpw = ref(null);

        const state = reactive({
            userid : '',
            userpw : '',
        });

        const handleLogin = async() => {
            if(state.userid.length <= 0){
                alert('아이디를 입력하세요.');
                userid.value.focus();
                return false;
            }

            if(state.userpw.length <= 0){
                alert('암호를 입력하세요.');
                userpw.value.focus();
                return false;
            }

            const url = `/member/select`;
            const headers = {"Content-Type":"application/json"};
            const body = { 
                id : state.userid,
                pw : state.userpw
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);

            if(response.data.status === 200) {
                sessionStorage.setItem("TOKEN", response.data.result);
                alert('로그인 되었습니다.');
                store.commit('setLogged', true);
                router.push({name:'Home'});
            }
        }

        return { state, handleLogin, userid, userpw }
    }
}
</script>

<style lang="scss" scoped>

</style>