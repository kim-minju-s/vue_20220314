import { createRouter, createWebHashHistory  } from 'vue-router' 

import Home from '@/components/HomeView';
import Login from '@/components/LoginView';
import Logout from '@/components/LogoutView';
import Join from '@/components/JoinView';
import Mypage from '@/components/MypageView';
import Chat from '@/components/ChatView';
import Item from '@/components/ItemView';
import Admin from '@/components/AdminView';
import Admin1 from '@/components/Admin1View';

const routes =[
    { path : '/', redirect:'/home'},
    { path : '/home', name:'Home', component:Home },
    { path : '/login', name:'Login', component:Login },
    { path : '/logout', name:'Logout', component:Logout },
    { path : '/join', name:'Join', component:Join },
    { path : '/mypage', name:'Mypage', component:Mypage },
    { path : '/chat', name:'Chat', component:Chat },
    { path : '/item', name:'Item', component:Item },
    { path : '/admin', name:'Admin', component:Admin },
    { path : '/admin1', name:'Admin1', component:Admin1 },
];

const router = createRouter({ 
    history : createWebHashHistory(), 
    routes  : routes
});

export default router;
