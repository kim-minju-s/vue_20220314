<template>
    <div>

    </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup () {
        const router = useRouter();
        const store = useStore();
        
        onMounted(() => {
            sessionStorage.removeItem("TOKEN");
            alert('로그아웃 되었습니다.');
            store.commit('setLogged', false);
            router.push({name:'Home'});
        });

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>