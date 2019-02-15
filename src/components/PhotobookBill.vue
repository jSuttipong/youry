<template>
    <div class="fontth">
        <b-container class="wapper-order-bill" style="height: 1200px">
            <div >
                <h2 class="pt-4 mb-4 center" >ข้อมูลการสั่งทำ</h2>
                <div>
                    <b-row>
                        <b-col>
                            <h3 >เลขที่การสั่งทำ {{orderData[0].order_id}}</h3>
                        <b-row class="mt-4">
                            <b-col>
                                <div class="bot-border mb-2"><h5>ผู้สั่งทำ</h5></div>
                                <p>คุณ {{userData.user_fname}} {{userData.user_lname}}</p>
                                <div class="bot-border mb-2"><h5>ชนิด</h5></div>
                                <p>โฟโต้บุ๊ค</p>
                            </b-col>
                            <b-col>
                                <div class="bot-border mb-2"><h5>วันที่สั่งทำ</h5></div>
                                <p>{{date}}</p>
                                <div class="bot-border mb-2"><h5>ราคา</h5></div>
                                <p>{{price}}</p>
                            </b-col>
                            <b-col>
                                <div class="bot-border mb-2"><h5>สถานะ</h5></div>
                                <p class="cred">ยังไม่ได้ชำระเงิน</p>
                            </b-col>
                        </b-row>
                         <div class="right" style="">
                    <b-button class="yr-button ml-3" @click="goPayment()">ชำระเงิน</b-button>
                    <b-button class="yr-button bgblack" @click="close()">ปิด</b-button>
                    </div>
                        </b-col>
                    </b-row>
                </div>
                <h2 class="pt-4 mb-4 center">รายละเอียดการ์ด</h2>
                <b-row>
                    <b-col>
                    <div class="bot-border mb-3"><h5>วีดีโอ</h5></div>
                    <video width="100%" controls style="center">
                      <source :src="video" type="video/mp4">
                    </video>
                    </b-col>
                    <b-col>
                    <div class="bot-border mb-3"><h5>รูปMarker</h5></div>
                        <div v-for="gallerys in gallerys" :key="gallerys.gallery_name">
                    <img :src="gallerys" class="left mt-3 mr-3 gallerys-image" style="width:160px;height:160px">
                </div>
                    </b-col>
                </b-row>
                <b-row>
                </b-row>
            </div>
        </b-container>
    </div>
</template>
<script>
/* eslint-disable */
const moment = require('moment');
const axios = require('axios');
import Loading from 'vue-loading-overlay';
export default {
      props: ["orderData",'userData','video','gallerys','price'],
  components: {
      Loading
    },
    data() {
        return {
            date: ''
        }
    },
    mounted(){
        moment.locale('th');
        this.date = new Date()
        this.date = moment(this.date).format("D MMMM YYYY"); 
    },
    methods:{
        goPayment(){
            this.$router.push( {name:'Payment',params: { orderId: this.orderData[0].order_id,type: 'โฟโต้บุ๊ค'}})
        },
        close(){
            this.$router.push( {name:'Home'})
        } 
    }
}
</script>