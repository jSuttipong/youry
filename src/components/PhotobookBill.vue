<template>
    <div class="fontth">
        <b-container class="wapper-order-bill" style="height: 1200px">
            <div >
                <h2 class="pt-4 mb-4 center" >ข้อมูลการสั่งทำ</h2>
                <div>
                    <b-row>
                        <b-col>
                            <h3 >เลขที่การสั่งทำ {{userData.user_id}}</h3>
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
                                <p>{{orderData[0].price}}</p>
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
                        <!-- {{orderData[0]}} -->
                    <div class="bot-border mb-3"><h5>วีดีโอ</h5></div>
                    <div v-for="dataSet in dataSet" :key="dataSet.vdo_url">
                  <video v-if="dataSet.vdo_url" width="70%" height="200px" class="mt-3" controls>
                    <source :src="dataSet.vdo_url" type="video/mp4">
                  </video>
                </div>
                    <!-- <video width="100%" controls style="center">
                      <source :src="video" type="video/mp4">
                    </video> -->
                    </b-col>
                    <b-col>
                    <div class="bot-border mb-3"><h5>รูปMarker</h5></div>
                    <b-row v-for="dataSet in dataSet" :key="dataSet.img_url">
                  <b-col>
                    <img
                    v-if="dataSet.img_url"
                      :src="dataSet.img_url"
                      class="gallerys-image mt-3"
                      style="width:50%;box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);border: 1px solid rgba(0, 0, 0, 0.10);"
                    >
                  </b-col>
                </b-row>
                        <!-- <div v-for="gallerys in gallerys" :key="gallerys.gallery_name">
                    <img :src="gallerys" class="left mt-3 mr-3 gallerys-image" style="width:160px;height:160px">
                </div> -->
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
            date: '',
            dataSet: [
                {
                    img_url: '',
                    vdo_url: ''
                },
                {
                    img_url: '',
                    vdo_url: ''
                },
                {
                    img_url: '',
                    vdo_url: ''
                },
                {
                    img_url: '',
                    vdo_url: ''
                },
                {
                    img_url: '',
                    vdo_url: ''
                },
            ]
        }
    },
    mounted(){
        moment.locale('th');
        this.date = new Date()
        this.date = moment(this.date).format("D MMMM YYYY");
           this.dataSet[0].img_url = this.orderData[0].img1_url
           this.dataSet[0].vdo_url = this.orderData[0].vdo1_url
           this.dataSet[1].img_url = this.orderData[0].img2_url
           this.dataSet[1].vdo_url = this.orderData[0].vdo2_url
           this.dataSet[2].img_url = this.orderData[0].img3_url
           this.dataSet[2].vdo_url = this.orderData[0].vdo3_url
           this.dataSet[3].img_url = this.orderData[0].img4_url
           this.dataSet[3].vdo_url = this.orderData[0].vdo4_url
           this.dataSet[4].img_url = this.orderData[0].img5_url
           this.dataSet[4].vdo_url = this.orderData[0].vdo5_url
        
        // this.orderData
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