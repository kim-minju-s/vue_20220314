<template>
    <div>

        <button @click="handleDelete">회원탈퇴</button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN")
        });
        
        const handleDelete = async ()=>{
            if(confirm('탈퇴할까요?')){
                const url = `/member/delete`;
                const headers = { 
                    "Content-Type" : "application/json",
                    "auth"  : state.token
                }
                const response = await axios.delete(url, {headers:headers, data:{}});
                if(response.data.status === 200) {
                    alert('탈퇴 되었습니다.');
                    router.push({name:'Logout'});
                }
            }
        }

        return {state, handleDelete}
    }
}
</script>

<style lang="scss" scoped>

</style>