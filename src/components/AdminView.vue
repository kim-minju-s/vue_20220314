<template>
    <div v-if="state.item">
        <h3>관리자</h3>
        <hr />

        <el-select v-model="state.item.code1" class="m-2" placeholder="대분류">
            <el-option
            v-for="tmp in state.item"
            :key="tmp.code1"
            :label="tmp.code1"
            :value="tmp.code1"
            />
        </el-select>

        <div >
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>대분류코드</th>
                        <th>전체개수</th>
                        <th>전체합계</th>
                        <th>수량합계</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tmp, idx) in state.items" :key="(tmp, idx)">
                        <td>{{idx}}</td>
                        <td>{{tmp._id}}</td>
                        <td>{{tmp.count}}</td>
                        <td>{{tmp.pricesum}}</td>
                        <td>{{tmp.quantitytotal}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <hr />

        <div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>중분류코드</th>
                        <th>전체개수</th>
                        <th>전체합계</th>
                        <th>수량합계</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tmp, idx) in state.items1" :key="(tmp, idx)">
                        <td>{{idx}}</td>
                        <td>{{tmp._id}}</td>
                        <td>{{tmp.count}}</td>
                        <td>{{tmp.pricesum}}</td>
                        <td>{{tmp.quantitytotal}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <hr />

        <div>    
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>소분류코드</th>
                        <th>전체개수</th>
                        <th>전체합계</th>
                        <th>수량합계</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(tmp, idx) in state.items2" :key="(tmp, idx)">
                        <td>{{idx}}</td>
                        <td>{{tmp._id}}</td>
                        <td>{{tmp.count}}</td>
                        <td>{{tmp.pricesum}}</td>
                        <td>{{tmp.quantitytotal}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted, getCurrentInstance } from '@vue/runtime-core';
import axios from 'axios';
export default {
    setup () {
        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;
        console.log('socket--->',socket);

        const state = reactive({
            
        });

        const handleDataGet = async()=> {
            const url = `/item/select`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log('---->', response.data);
            
            if (response.data.status === 200) {
                state.item = response.data.result;
            }
        }

        // 대분류
        const handleData = async()=> {
            const url = `/item/groupcode1`;
            const headers = {"Content-type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);

            if (response.data.status === 200) {
                state.items = response.data.result;
            }
        };

        // 중분류
        const handleData1 = async()=> {
            const url = `/item/groupcode2`;
            const headers = {"Content-type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);

            if (response.data.status === 200) {
                state.items1 = response.data.result;
            }
        }

        // 소분류
        const handleData2 = async()=> {
            const url = `/item/groupcode3`;
            const headers = {"Content-type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);

            if (response.data.status === 200) {
                state.items2 = response.data.result;
            }
        }

        onMounted( ()=> {
            handleDataGet();
            handleData();
            handleData1();
            handleData2();

            // 신호를 받아서 데이터베이스에서 데이터를 가져옴
            socket.on('subscribe', (recv)=> {
                console.log(recv);
                if (recv.username === 'insert') {
                    handleData();
                }
            })
        });

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>