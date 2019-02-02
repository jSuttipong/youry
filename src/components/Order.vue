<template>
    <div>
        <b-container>
            <div class="order-space fontth mb-5">
                <h1 class="center mt-5">Your Order</h1>
                <div class="textName">คุณ {{userData.user_fname}} {{userData.user_lname}}</div>
                <div><p>เบอร์โทร : {{userData.user_mobile}}</p></div>
                <div style="width:100%;height:50px"><b-button class="yr-button order-btn">Order ทั้งหมด</b-button></div>
                <vue-good-table
                :columns="columns"
                :search-options="{
                    enabled: true,
                    initialSortBy: {field: 'orderId',type: 'asc'}
                }"
                :pagination-options="{
                    enabled: true,
                    perPage: 5,
                    perPageDropdown: [5, 10],
                }"
                @on-row-click="onRowClick"
                :rows="rows">
                <div slot="emptystate">
                    ยังไม่มีข้อมูล
                </div>
                </vue-good-table>
                <div class="vld-parent">
        <loading :active.sync="isLoading"
        :can-cancel="false"
        loader='dots'
        color= '#106FFF'
        backgroundColor= '#ffffff'
        :is-full-page="true"></loading>
        </div>
            </div>
            <!-- Modal Component -->
            <b-modal v-model="showData" size="lg" centered :title="'รายการที่ '+passData.orderId" class="fontth">
                <b-container>
                    <b-row>
                        <b-col>
                            <div class="bot-border mb-2"><h5>ประเภท</h5></div>
                            <p>{{passData.orderType}}</p>
                            <div class="bot-border mb-2"><h5>วันที่สร้าง</h5></div>
                            <p>{{dateShow}}</p>
                        </b-col>
                        <b-col>
                            <div class="bot-border mb-2"><h5>ราคา</h5></div>
                            <p>{{passData.price}}</p>
                            <div class="bot-border mb-2"><h5>Location</h5></div>
                            <p>{{cardDetail.card_detail_location}}</p>
                        </b-col>
                        <b-col>
                            <div class="bot-border mb-2"><h5>สถานะ</h5></div>
                            <p>{{passData.status}}</p>
                            <div class="bot-border mb-2"><h5>Contact</h5></div>
                            <p>{{cardDetail.card_detail_contact}}</p>
                            <!-- this.passData -->
                            <!-- {{passData.marker.marker_img}} -->
                            <div v-if="passData.status == 'ยังไม่ชำระเงิน'">
                        <b-button class="yr-button right" @click="goPayment()">ชำระเงิน</b-button>
                    </div>
                        </b-col>
                    </b-row>
                    <div>
                        <div class="bot-border mb-2"><h5>ข้อมูลเพิ่มเติม</h5></div>
                        <div v-if="cardDetail.card_detail_other == ''"><p >ไม่มีการส่งรายละเอียดที่ต้องการเพิ่มเติม</p></div>
                        <div v-else><p>{{cardDetail.card_detail_other}}</p></div>
                    </div>
                    <b-row>
                        <b-col>
                            <h5>รูป marker</h5>
                            <img :src="imgUrl" style="width:100%;box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);border: 1px solid rgba(0, 0, 0, 0.10);">
                        </b-col>
                        <b-col>
                            <h5 class="mb-5">Video บนการ์ด</h5>
                            <iframe width="100%" height='200px' controls
                            :src="vdoUrl">
                            </iframe>
                        </b-col>
                    </b-row>
                    <div>
                        <h5 class="mt-3">รูป Gallerys</h5>
                        <div v-for="galleriesData in passData.galleries" :key='galleriesData.gallery_url' style="width:100%; height:auto">
                            <img :src="galleriesData.gallery_url" class="left" style="width:20%;height:120px;margin: 5px">
                        </div>
                    </div>
                </b-container>
                <!-- <div>
                    <h5>ประเภท : {{passData.orderType}}</h5>
                    <h5>ราคา : {{passData.price}}</h5>
                    <h5>สถานะ : {{passData.status}}</h5>
                </div> -->
                <!-- <div v-for="item in imgData" :key="item">
                    <img :src="item.markerPath" alt="" class="left mr-3 ml-3 mt-3" style="width:200px;height:130px">
                    <video width="50%" controls>
                            <source :src="item.videoPath" type="video/mp4">
                          </video>
                </div> -->
                <div>
                    <!-- {{imgData}} -->
                    <!-- <video width="50%" controls>
                            <source :src="passData.video" type="video/mp4">
                    </video> -->
                    <!-- {{passData.status}} -->
                </div>
                <!-- {{passData}} -->
            </b-modal>
        </b-container>
    </div>
</template>
<script>
/* eslint-disable */
const moment = require('moment');
import Loading from 'vue-loading-overlay';
var numeral = require('numeral');
const axios = require('axios');
export default {
    name: 'app',
    components: {
            Loading
        },
    data(){
        return{
            colorText: '',
            dateShow: '',
            imgUrl: '',
            vdoUrl:'',
            showData: false,
            passData: '',
            userData: '',
            textAlert: '',
            imgData: [],
            galleryData: [],
            cardDetail: '',
             columns: [
        {
          label: 'Order ID',
          field: 'orderId',
        },  
        {
          label: 'รายการ',
          field: 'orderType',
          sortable: false,
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD ',
          dateOutputFormat: 'DD MMM YYYY',
        },
        {
          label: 'ราคา',
          field: 'price',
          type: 'number',
        },
        {
          label: 'สถานะ',
          field: 'status',
        },],
         rows: [],
         allData: '',
      isLoading: false
        }
    },
    mounted(){
        this.isLoading = true;
       const getUserData = this.$session.get('sessionData')
       this.userData = getUserData[0]
       console.log(this.userData)
        var querystring = require('querystring');
        var chackEP = querystring.stringify({
            user_id: this.userData.user_id

        });

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        // var theData = new FormData();
        // theData.append('user_id','4');
        // var rawData = {
        //     user_id: 'this.userData',
        // }
        // rawData = JSON.stringify(rawData) 
        // axios({
        //           method: 'post',
        //           url: 'http://fishyutt.xyz/dev/admin/files/api/users_api/order_user_detail.php',
        //           data: theData,
        //           config: { headers: {'Content-Type': 'multipart/form-data' }}
        //       })
        axios.post('http://fishyutt.xyz/dev/admin/files/api/users_api/order_user_detail.php', chackEP, config)
//         axios.get('http://fishyutt.xyz/dev/admin/files/api/users_api/order_user_detail.php', {
//     params: {
//       user_id: '4'
//     }
//   })
          .then((result) => {
                console.log(result)
                const data = result.data
                this.allData = result.data
                for (var i = 0; i < data.length; i++) { 
                    this.rows.push({orderId:data[i].order_id,
                orderType:data[i].order_type,
                createdAt: data[i].order_date,
                price: data[i].order_price,
                status: data[i].order_status,
                comment_admin: data[i].comment_admin,
                comment_user: data[i].comment_user,
                galleries: data[i].galleries,
                marker: data[i].marker,
                cardDetail: data[i].card_detail})
                }
            
             for (var i = 0; i < data.length; i++) { 
                if(this.rows[i].orderType == 0){
                    this.rows[i].orderType = "โฟโต้บุ๊ค"
                }else this.rows[i].orderType = "การ์ด";
            }
            for (var i = 0; i < data.length; i++) { 
                if(this.rows[i].status == 1){
                    this.rows[i].status = "ยังไม่ชำระเงิน"
                    this.colorText = 'cred'
                }else if(this.rows[i].status == 2){
                    this.rows[i].status = "ชำระเงินแล้ว"
                }else if(this.rows[i].status == 3){
                    this.rows[i].status = "อยู่ในระหว่างดำเนินการ"
                }else this.rows[i].status = "เสร็จสิ้น"
            }
            
            for (var i = 0; i < data.length; i++) { 
                var c = numeral(this.rows[i].price).format('0,0')
                 this.rows[i].price = c
                // return c
                
            }
        // if(this.rows.orderType == 0){
        //     return 'โฟโต้บุ๊ค'
        // }else return 'การ์ด';
            this.isLoading = false
          })
          .catch((error) => {
            console.log(error.response)
            this.isLoading = false
          })

        
        // for (var i = 0; i < this.rows.length; i++) { 
        //        console.log(this.rows.orderType)
        //     }
    },
    methods:{
        onRowClick(params) {
            // this.isLoading = true;
            
            this.showData=true
            this.passData = params.row
            console.log(this.passData.marker)
            this.cardDetail = this.passData.cardDetail
            this.imgUrl = this.passData.marker.marker_img
            this.vdoUrl = this.passData.marker.marker_vdo
             console.log(this.passData.galleries)
            // for (let index = 0; index < this.passData.length; index++) {
            //     this.galleryData.push(this.passData[index].galleries)   
            // }
            // console.log('5555'+this.passData.marker)
            moment.locale('th')
            this.dateShow = moment(this.passData.createdAt).format("D MMMM YYYY")
            // console.log(this.passData)
            // this.imgData= []
        //      var querystring = require('querystring');
        // var chackEP = querystring.stringify({
        //   order_id: this.passData.orderId,
        // //   User_password: this.password,
        // });

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        // axios.post('http://fishyutt.xyz/dev/admin/files/api/users_api/order_user_detail.php', chackEP, config)
        //   .then((result) => {
        //     // console.log(result.data)
        //     // this.imgData.push(result.data)
        //     // console.log(this.imgData)
        //     const data = result.data
        //     // console.log(data)
        //     for (var i = 0; i < data.length; i++) { 
        //         this.imgData.push({markerPath:data[i].marker_img,
        //         videoPath:data[i].marker_vdo,
        //     })
        //     }
        //     // console.log(this.imgData)
        //     this.isLoading = false
        //   })
        //   .catch((error) => {
        //     console.log(error.response)
        //     this.isLoading = false
        //   })
  },
  goPayment(){
      this.$router.push( {name:'Payment',params: { orderId: this.passData.orderId}})
  }
    }
     }
</script>
<style>
.order-space{
    width: 100%;
    min-height: 566px;
    height: auto;
    position: relative
}
.order-btn{
    float:left !important;
    background-color:#61A0FF !important;
    border:none
}
.textName{
    font-size: 20px
}
</style>
