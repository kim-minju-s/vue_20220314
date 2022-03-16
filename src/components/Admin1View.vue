<template>
    <div>
        <h3>차트</h3>
        <hr />

        <vue3-chart-js v-bind="barChart" ref="ChartRef"></vue3-chart-js>
    </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
import { reactive } from '@vue/reactivity';
import { onMounted, ref, getCurrentInstance } from 'vue';
import axios from 'axios';

export default {
    components: {
        Vue3ChartJs        
    },
    setup () {

        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;
        console.log('socket--->',socket);

        const ChartRef = ref(0);

        // 차트 설정
        const barChart = reactive({
            type : "bar",
            options : {
                
            },
            data: {
                labels : ["A","B","C"],
                datasets : [
                    {
                        label : "전체개수",
                        backgroundColor : [],
                        data : []
                    },
                    {
                        label : "가격합계",
                        backgroundColor : [],
                        data : []
                    },
                    {
                        label : "수량합계",
                        backgroundColor : [],
                        data : []
                    }
                ],
            }
        });
        
        const handleData = async()=> {
            const url = `/item/groupcode1`;
            const headers = {"Content-type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);

            if (response.data.status === 200) {
                // _id만 가져와서 보관하기 위해
                const arr1 = [];    // ['101','102','103']

                // 전체 개수를 보관하기 위해
                const arr2 = [];    // []
                const arr2color = [];

                // 가격합계 보관하기 위해
                const arr3 = [];
                const arr3color = [];

                // 수량합계 보관하기 위해
                const arr4 = [];
                const arr4color = [];

                for(let tmp of response.data.result){
                    console.log('tmp---->', tmp);
                    arr1.push(tmp._id);
                    arr2.push(tmp.count);
                    arr2color.push('#1abc9c');
                    arr3.push(tmp.pricesum);
                    arr3color.push('#456456');
                    arr4.push(tmp.quantitytotal);
                    arr4color.push('#46f84w');
                }
                console.log('arr1--->', arr1);

                // 라벨
                barChart.data.labels = arr1;

                // 전체 개수
                barChart.data.datasets[0].backgroundColor = arr2color;
                barChart.data.datasets[0].data = arr2;

                // 가격 합계
                barChart.data.datasets[1].backgroundColor = arr3color;
                barChart.data.datasets[1].data = arr3;

                // 수량 합계
                barChart.data.datasets[2].backgroundColor = arr4color;
                barChart.data.datasets[2].data = arr4;

                ChartRef.value.update(200);                
            }
        };

        onMounted( ()=> {
            handleData();

            // 신호를 받아서 데이터베이스에서 데이터를 가져옴
            socket.on('subscribe', (recv)=> {
                console.log(recv);
                if (recv.username === 'insert') {
                    handleData();
                }
            })
        });

        return {barChart, ChartRef}
    }
}
</script>

<style lang="scss" scoped>

</style>