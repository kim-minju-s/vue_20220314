<template>
    <div v-if="state.item">
        이름 : <input type="text" v-model="state.item.name" /><br />
        나이 : <input type="text" v-model="state.item.age" /><br />
        <button @click="handleUpdate">회원정보변경</button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    setup () {
        const state = reactive({
            token : sessionStorage.getItem("TOKEN")
        })
        
        const handleData = async() => {
            const url = `/member/selectone`;
            const headers = { 
                "Content-Type":"application/json",
                "auth"  : state.token
            }
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
            }
        }

        onMounted( async() => {
            handleData();
        })

        const handleUpdate = async () => {
            const url = `/member/update`;
            const headers = { 
                "Content-Type":"application/json",
                "auth"  : state.token
            }
            const body = {
                name :state.item.name,
                age : state.item.age
            }
            const response = await axios.put(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('수정되었습니다.');
            }
        }
        return {state, handleUpdate}
    }
}
</script>

<style lang="scss" scoped>

</style>