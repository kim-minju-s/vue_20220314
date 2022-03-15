<template>
  <div>
    {{logged}}
    <button @click="handleMenu('home')">home</button>

    <button v-if="!logged" 
      @click="handleMenu('login')">login</button>

    <button v-if="logged" 
      @click="handleMenu('logout')">logout</button>

    <button v-if="logged === false" 
      @click="handleMenu('join')" >join</button>

    <button v-if="logged === true"
      @click="handleMenu('mypage')">mypage</button>

    <hr />

    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted,  computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup () {
    const router = useRouter();
    const store = useStore();

    //stores의 getters 호출
    const logged = computed( () => store.getters.getLogged )

    const handleMenu = (menu) => {
      console.log('App.vue => handlMenu => ', menu);
      router.push(menu);
    }

    // 생명주기(F5, refresh가 수행됨)
    onMounted(() => {
      if(sessionStorage.getItem("TOKEN") !== null){
        store.commit('setLogged', true);
      }
      else {
        store.commit('setLogged', false);
      }
    });

    return { handleMenu, logged }
  }
}
</script>

<style lang="scss" scoped>

</style>