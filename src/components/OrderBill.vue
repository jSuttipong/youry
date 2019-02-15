<template>
    <div class="fontth" style="height:1900px">
        <b-container class="wapper-order-bill" style="height: 1200px">
            <div >
                <h2 class="pt-4 mb-4 center" >ข้อมูลการสั่งทำ</h2>
                <div>
                    <b-row>
                        <b-col>
                            <div v-if="orderType == 'การ์ด'">
                            <img :src="orderDataShow.url_marker" class="image-show" style="display: flex; justify-content: center;">
                            </div>
                            <div v-else>
                                <video width="100%" controls>
                                <source :src="this.orderDataShow.url_vdo" type="video/mp4">
                                </video>
                            </div>
                        </b-col>
                        <b-col>
                            <h3 >เลขที่การสั่งทำ {{orderDataShow.order_id}}</h3>
                        <b-row class="mt-4">
                            <b-col>
                                <div class="bot-border mb-2"><h5>ผู้สั่งทำ</h5></div>
                                <p>คุณ {{userData.user_fname}} {{userData.user_lname}}</p>
                                <div class="bot-border mb-2"><h5>ชนิด</h5></div>
                                <p>{{this.orderType}}</p>
                            </b-col>
                            <b-col>
                                <div class="bot-border mb-2"><h5>วันที่สั่งทำ</h5></div>
                                <p>{{orderDate}}</p>
                                <br>
                                <div class="bot-border mb-2"><h5>ราคา</h5></div>
                                <p>{{orderDataShow.order_price}}</p>
                            </b-col>
                            <b-col>
                                <div class="bot-border mb-2"><h5>สถานะ</h5></div>
                                <p class="cred">{{orderStatus}}</p>
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
                    <video width="100%" controls>
                      <source :src="this.orderDataShow.url_vdo" type="video/mp4">
                    </video>
                    </b-col>
                    <b-col>
                        <div v-if="this.orderDataShow.contact != ''">
                            <div class="bot-border mb-3"><h5>Contact</h5></div>
                            <p>{{this.orderDataShow.contact}}</p>
                        </div>
                        <div v-if="this.orderDataShow.location != ''">
                            <div class="bot-border mb-3"><h5>Location</h5></div>
                            <p>{{this.orderDataShow.location}}</p>
                        </div>
                    </b-col>
                </b-row>
                <div v-for="galleryData in galleryData" :key="galleryData.gallery_name">
                    <img :src="galleryData.gallery_path" class="left mt-3 mr-3 gallerys-image" style="width:300px;height:250px;position:relative">
                </div>
            </div>
        </b-container>
    </div>
</template>
<script>
/* eslint-disable */
const moment = require('moment');
var numeral = require('numeral');
const axios = require('axios');
import Loading from 'vue-loading-overlay';
export default {
  props: ["orderData"],
  components: {
      Loading
    },
    data(){
      return{
          isLoading: false,
          orderDataShow: '',
          userData:'',
          orderStatus: '',
          orderDate: '',
          orderType: '',
          galleryData: ''
      }
  },
   mounted(){
       const getUserData = this.$session.get('sessionData')
        this.userData = getUserData[0]
        
       this.orderDataShow = this.orderData[0]
    //     console.log('1111'+this.userData)
    //    console.log('1111'+this.orderDataShow.order_status)
       moment.locale('th')
       this.orderDate = moment(this.orderDataShow.order_date).format("D MMMM YYYY")
       this.orderDataShow.order_price = numeral(this.orderDataShow.order_price).format('0,0')
        // console.log(this.orderDataShow.order_status.length)
                if(this.orderDataShow.order_status == 1){
                    this.orderStatus = "ยังไม่ชำระเงิน"
                }else if(this.orderDataShow.order_status == 2){
                    this.orderStatus = "ชำระเงินแล้ว"
                }else if(this.orderDataShow.order_status == 3){
                    this.orderStatus = "อยู่ในระหว่างดำเนินการ"
                }else if(this.orderDataShow.order_status == 4){
                this.orderStatus = "เสร็จสิ้น"
                }

        if(this.orderDataShow.order_type == 0){
                    this.orderType = "โฟโต้บุ๊ค"
                }else this.orderType = "การ์ด";   
                

        var querystring = require('querystring');
        var chackEP = querystring.stringify({
            order_id: this.orderDataShow.order_id

        });

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        axios.post('https://fishyutt.xyz/dev/admin/files/api/orders_api/query_gallery.php', chackEP, config)
          .then((result) => {
              console.log(result)
              this.galleryData = result.data
          }).catch((error) => {
            console.log(error.response)
            this.isLoading = false
          })

      },
    methods:{
        goPayment(){
            this.$router.push( {name:'Payment',params: { orderId: this.orderDataShow.order_id}})
        },
        close(){
            this.$router.push( {name:'Home'})
        } 
    }
}  
</script>