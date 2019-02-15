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
                }"
                :sort-options="{
                    enabled: true,
                    initialSortBy: {field: 'createdAt',type: 'desc'}
                }"
                :pagination-options="{
                    enabled: true,
                    perPage: 5,
                    perPageDropdown: [5, 10],
                }"
                @on-row-click="onRowClick"
                :rows="rows">
                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'status'">
                        <span :style="'font-weight: 400; color:'+props.row.colorStatus">{{props.row.status}}</span>
                    </span>
                    <span v-else>
                    {{props.formattedRow[props.column.field]}}
                    </span>
                </template>
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
            <b-modal class="fontth" size="lg" v-model="people" :title="'รายชื่อผู้ที่จะเข้าร่วมงาน    จำนวน '+commentRespon.length+' คน'" ok-only>
                <b-table striped hover :items="commentRespon" :fields="fields" />
            </b-modal>
            <b-modal v-model="showData" size="lg" centered :title="'รายการที่ '+passData.orderId" class="fontth">
                <b-container>
                     <div class="mb-3" v-if="productType == 'การ์ด'">
                            <b-button @click="checkPeople()">ข้อมูลการเข้าร่วม</b-button>
                        </div>
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
                            <div class="bot-border mb-2" v-if="productType == 'การ์ด'"><h5>Location</h5></div>
                            <p>{{cardDetail.card_detail_location}}</p>
                        </b-col>
                        <b-col>
                            <div class="bot-border mb-2"><h5>สถานะ</h5></div>
                            <p :style="'font-weight: 400; color:'+passData.colorStatus">{{passData.status}}</p>
                            <div class="bot-border mb-2" v-if="productType == 'การ์ด'"><h5>Contact</h5></div>
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
                        <div v-if="cardDetail.card_detail_other == ''||cardDetail.card_detail_other == null"><p>ไม่มีการส่งรายละเอียดที่ต้องการเพิ่มเติม</p></div>
                        <div v-else><p>{{cardDetail.card_detail_other}}</p></div>
                       
                    </div>
                    <div v-if="productType == 'การ์ด'">
                        <b-row>
                        <b-col>
                            <h5>รูป marker</h5>
                            <img :src="imgUrl" style="width:100%;box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);border: 1px solid rgba(0, 0, 0, 0.10);">
                        </b-col>
                        <b-col>
                            <h5 class="mb-5">Video บนการ์ด</h5>
                            <!-- <iframe width="100%" height='200px' controls :src="vdoUrl">
                            </iframe> -->
                            <video v-if="vdoUrl" width="100%" height="200px" controls>
                                <source :src="vdoUrl" type="video/mp4">
                            </video>
                            <div v-else>
                                <h3>ไม่มีวีดีโอ</h3>
                            </div>
                        </b-col>
                    </b-row>
                        <div>
                            <h5 class="mt-3">รูป Gallerys</h5>
                            <div v-for="galleriesData in passData.galleries" :key='galleriesData.gallery_url' style="width:100%; height:auto">
                                <img :src="galleriesData.gallery_url" class="left gallerys-image" style="width:20%;height:120px;margin: 5px">
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h5>รูป marker</h5>
                        <b-row>
                            <b-container>
                        <img v-for="imgUrl in imgUrl" :key="imgUrl.marker_img" :src="imgUrl.marker_img" class="gallerys-image" style="width:30%;box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);border: 1px solid rgba(0, 0, 0, 0.10);">
                        </b-container>
                        </b-row>
                        <h5 class="mb-5">Video</h5>
                            <!-- <iframe width="100%" height='200px' controls :src="vdoUrl">
                            </iframe> -->
                            <video v-if="vdoUrl" width="100%" height="200px" controls>
                                <source :src="vdoUrl" type="video/mp4">
                            </video>
                            <div v-else>
                                <h3>ไม่มีวีดีโอ</h3>
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
            productType: '',
            colorText: '#159',
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
            commentRespon:[],
            people: false,
            fields: ['name'],
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
          label: 'สร้างเมื่อ',
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
       console.log('userData', this.userData)
    //    console.log(this.userData)
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
        // axios.post('http://fishyutt.xyz/dev/admin/files/api/users_api/order_user_detail.php', chackEP, config)
        axios.get('https://fishyutt.xyz/dev/admin/files/api/users_api/order_user_detail.php', {
    params: {
      user_id: this.userData.user_id
    }
  })
          .then((result) => {
                console.log('aaa',result)
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
                cardDetail: data[i].card_detail,
                video: data[i].video,
                colorStatus: ''})
                }
            
             for (var i = 0; i < data.length; i++) { 
                if(this.rows[i].orderType == 1){
                    this.rows[i].orderType = "โฟโต้บุ๊ค"
                }else this.rows[i].orderType = "การ์ด";
            }
            for (var i = 0; i < data.length; i++) { 
                if(this.rows[i].status == 1){
                    this.rows[i].status = "ยังไม่ชำระเงิน"
                    this.rows[i].colorStatus = '#E53167'
                }else if(this.rows[i].status == 2){
                    this.rows[i].status = "ชำระเงินแล้ว"
                    this.rows[i].colorStatus = '#61a0ff'
                }else if(this.rows[i].status == 3){
                    this.rows[i].status = "อยู่ในระหว่างดำเนินการ"
                    this.rows[i].colorStatus = '#ffa200'
                }else {this.rows[i].status = "เสร็จสิ้น"
                        this.rows[i].colorStatus = '#61ff83'
                        }
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
        checkPeople(){
            this.showData=false;
            this.people = true;
            
        },
        onRowClick(params) {
            // this.isLoading = true;
            // console.log('datarespon',params.row)
            this.vdoUrl= ''
            this.showData=true
            this.passData = params.row
            console.log(this.passData.marker)
            this.cardDetail = this.passData.cardDetail
            if(this.passData.orderType == 'การ์ด'){
                 this.imgUrl = this.passData.marker[0].marker_img
            }else  {this.imgUrl = this.passData.marker}
            this.vdoUrl = this.passData.video.video
            this.productType = this.passData.orderType
            // console.log(this.passData.galleries)
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
        var theData = new FormData();
        theData.append("order_id", this.passData.orderId);
        // console.log('check',this.passData.orderId)
        // const config = {
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }
        // }
        axios.get('https://fishyutt.xyz/dev/admin/files/api/orders_api/order_join_us.php', {
    params: {
      order_id: this.passData.orderId
    }
  })
          .then((result) => {
              console.log('',result)
              this.commentRespon = result.data
          })
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
