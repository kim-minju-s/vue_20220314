<template>
    <div>
        <h3>회원가입</h3>
        <hr />
        {{state}}
        <hr />
        아이디 : <input type="text" @keyup="handleIdCheck" v-model="state.userid" />
        <label>{{state.idcheck}}</label><br />
        암호1 : <input type="password" v-model="state.userpw" /><br />
        암호2 : <input type="password" v-model="state.userpw1" /><br />
        이름 : <input type="text" v-model="state.username" /><br />
        이메일: <input type="text" v-model="state.useremail" /><br />
        나이 : <input type="text" v-model="state.userage" /><br />
        <el-button type="primary" @click="handleJoin">회원가입</el-button>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import {useRouter } from 'vue-router';

export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            idcheck : '중복확인',
            userid  : '',
            userpw  : '',
            userpw1 : '',
            username : '',
            useremail : '',
            userage : 0,
        });

        const handleJoin = async() => {
            // 유효성 검사 통과 후
            if(state.userid.length <=0 ){
                alert('아이디 입력하세요.');
                return false;
            }

            const url = `/member/insert`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : state.userid,
                name : state.username,
                pw : state.userpw,
                email : state.useremail,
                age : Number(state.userage)
            }

            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('회원 가입 되었습니다.');
                router.push({name:'Home'});
            }
        }

        const handleIdCheck = async() => {
            if( state.userid.length > 0 ) {
                const url = `/member/idcheck?id=${state.userid}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    if(response.data.result === 1){
                        state.idcheck = '사용불가';
                    }
                    else if(response.data.result === 0){
                        state.idcheck = '사용가능';
                    }
                }
            }
            else {
                state.idcheck = '중복확인';
            }
        }

        return {state, handleIdCheck, handleJoin}
    }
}
</script>

<style lang="scss" scoped>

</style>