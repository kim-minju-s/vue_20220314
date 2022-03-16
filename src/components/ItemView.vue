<template>
    <div>
        <h3>물품관리</h3>
        <hr />

        <div>
            코드 : <input type="text" placeholder="000-000-000" v-model="state.code" /> <br />
            이름 : <input type="text" placeholder="" v-model="state.name"/> <br />
            가격 : <input type="text" placeholder="" v-model="state.price" /> <br />
            수량 : <input type="text" placeholder="" v-model="state.quantity"/> <br />
            <button @click="handleInsert">등록하기</button>
        </div>
        <div >
            <el-table :data="state.items" border style="width:100%" >

                <el-table-column prop="_id" label="번호" width="50"/>
                <el-table-column prop="code1" label="대분류" />
                <el-table-column prop="code2" label="대분류"/>
                <el-table-column prop="code3" label="대분류"/>
                <el-table-column prop="name" label="이름" />
                <el-table-column prop="price" label="가격"/>
                <el-table-column prop="quantity" label="개수"/>
                <el-table-column prop="regdate" label="날짜" width="200" />
                
            </el-table>
        </div>


        <!-- <table border="1">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>대분류</th>
                    <th>중분류</th>
                    <th>소분류</th>
                    <th>이름</th>
                    <th>가격</th>
                    <th>개수</th>
                    <th>날짜</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.code1}}</td>
                    <td>{{tmp.code2}}</td>
                    <td>{{tmp.code3}}</td>
                    <td>{{tmp.name}}</td>
                    <td>{{tmp.price}}</td>
                    <td>{{tmp.quantity}}</td>
                    <td>{{tmp.regdate}}</td>
                </tr>
            </tbody>
        </table> -->
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from '@vue/reactivity';
import { onMounted, getCurrentInstance } from '@vue/runtime-core';

export default {
    setup () {
        // main.js 에 등록한 글로벌 변수 socket 가져오기
        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;
        console.log('socket--->',socket);

        const state = reactive({
            code: '',
            name: '',
            price: 0,
            quantity: 0,
        });

        // 물품 목록 받아오기
        const handleData = async() => {
            const url = `/item/select`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            
            if (response.data.status === 200) {
                state.items = response.data.result;
            }
        }

        onMounted( ()=> {
            handleData();
        });

        const handleInsert = async()=> {
            const tmp = state.code.split("-");
            console.log('코드 번호--->',tmp);

            const url = `/item/insert`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                code1 : tmp[0],
                code2 : tmp[1],
                code3 : tmp[2],
                name : state.name,
                price : state.price,
                quantity : state.quantity
            };
            console.log('body--->', body);

            const response = await axios.post(url, body, {headers});
            console.log(response.data);

            if (response.data.status === 200) {
                // alert('등록 완료');
                // 이 위치에서 등록했음을 통지
                // DB에 저장했다는 신호만 보냄
                // 바로 B로 전송하는게 X
                socket.emit('publish', {data:{userid: 'aaa', username: 'insert'}});
                
                handleData();   // 목록을 가져와서 state.items에 추가
            }
        };

        return {state, handleInsert}
    }
}
</script>

<style lang="scss" scoped>

</style>