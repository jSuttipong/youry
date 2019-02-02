<template>
  <div class="wrapper fontth pagebg" style="background-color:#fff; height:100%">
      <div v-if="themeSelection == false">
        <div class="box-example ">
          <b-container class="">
            <b-row>
              <b-col>
                <b-carousel id="carousel1"
                style="width:100%;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="300"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
          >
            <div v-for=" data in exampleDesign" :key="data.ex">
              <b-carousel-slide :img-src="data.ex"
              ></b-carousel-slide>
            </div>
          </b-carousel>
              </b-col>
              <b-col>
                <h1 class="mt-5 cwhite">ตัวอย่าง</h1>
                <p class="fs24 cwhite">นี่เป็นตัวอย่างการแสดงผล AR บนรูปภาพ โดยจะแสดงวีดีโอที่คุณต้องการให้เล่นบนรูปภาพผ่านแอพพลิเคชั้น Youry</p>
                <p class="cwhite">ดาวน์โหลดได้ที่</p>
                <router-link to="https://play.google.com"><img src="../assets/gplogo.png" style="width:30%;background-color:white;border-radius:5px;padding:5px;position:relative" alt=""></router-link>
                <b-col>
                  <img src="../assets/qrcode.jpeg" class="mt-3" style="width:25%;position:relative;margin-left:-10px">
                </b-col>
              </b-col>
            </b-row>
          </b-container>
        </div>
        <b-container >
          <div class="work-area">
            <div >
              <h3 class="center pt-3">สร้าง AR ของคุณ</h3>
              <div v-if="!video">
                  <form ref="videoShow" class="input-none" enctype="multipart/form-data">
                    <label for="vdoUpload" class="box-upload mt-5 mb-5" style="display: flex; justify-content: center;">
                      <h1 class="text-on-upload">
                        <i class="fas fa-upload">
                          <h5 class="fontth mt-2">Upload Video</h5>
                        </i>
                      </h1>
                    </label>
                    <input
                      class="input-none"
                      type="file"
                      name="vdo"
                      id="vdoUpload"
                      ref="vdoUpload"
                      @change="onFileChangeToVideo"
                    >
                    </form>
                    </div>
                <div v-else>
                  <b-row>
                    <b-col>
                      <h5 class="mt-3 fontth">วีดีโอ</h5><p class="cred">*หมายเหตุ วีดีโอที่อัพโหลดจะนำไปตัดต่อเพื่อแสดงผล AR ที่สมบูรณ์ยิ่งขึ้นหากคุณต้องการ</p>
                      <video width="100%" controls>
                      <source :src="video" type="video/mp4">
                    </video>
                    <b-button @click="removeVideo" class="yr-button mt-2 mb-2">Remove Video</b-button>
                    </b-col>
                    <b-col>
                      <h5 class="mt-3">Gallerys</h5>
                        <form ref="gallerys" enctype="multipart/form-data">
                          <!-- <label for="file-upload" class="button-upload mt-2">
                                                  <h5 class="text-on-btn-upload"><i class="fas fa-upload"></i></h5>
                                              </label>
                          <input class="input-none " type="file" name="files" id="file-upload"  ref="file" multiple />-->
                          <label class="button-upload input-none">
                            <h5 class="text-on-btn-upload">
                              <i class="fas fa-upload"></i>
                            </h5>
                            <input type="file" ref="gallerysData" name="gallerys[]" id="filesToUpload" @change="setDataGallerys" multiple="multiple">
                          </label>
                        </form>
                        <b-button class="yr-button right" @click="checkInputData()">สั่งทำ</b-button>
                    </b-col>
                  </b-row>
                </div>
            </div>
          </div>

        </b-container>
      </div>

      <b-modal ref="CheckData" hide-footer title="ตรวจสอบข้อมูล" size="lg">
      <div>
        <b-row>
          <b-col>
            <div class="bot-border mb-2"><h5>ราคาสร้างสรรค์งาน</h5></div>
            <p>{{defaultPriceFormat}} บาท</p>
            <div class="bot-border mb-2"><h5>รวม</h5></div>
            <p>{{allPrice}} บาท</p>
          </b-col>
          <b-col>
            <div class="bot-border mb-2"><h5>ราคาต่อปุ่ม</h5></div>
            <p>{{cardBntPrice}} บาท</p>
          </b-col>
          <b-col>
            <div class="bot-border mb-2"><h5>จำนวนปุ่ม</h5></div>
            <p>{{countBtn}} ปุ่ม</p>
          </b-col>
        </b-row>
        <p class="cred">*หมายเหตุ งานจะเริ่มดำเนินต่อเมื่อชำระเงินเสร็จสิ้น</p>
        <b-button class="yr-button right ml-3" @click="createOrder()">ยืนยัน</b-button>
        <b-button class="yr-button right bgblack" @click="cancel()">ยกเลิก</b-button>
      </div>
      </b-modal>
       <b-modal ref="CheckLogin" hide-footer title="กรุณาเข้าสู่ระบบ" size="lg">
      <div>
        <Signin></Signin>
      </div>
    </b-modal>

    <div class="vld-parent">
        <loading :active.sync="isLoading"
        :can-cancel="false"
        loader='dots'
        color= '#106FFF'
        backgroundColor= '#ffffff'
        :is-full-page="true"></loading>
        </div>
    <!-- {{imageType}} -->
  </div>

</template>
<script >
/* eslint-disable */

import Signin from '@/components/Signin'
import Loading from 'vue-loading-overlay';
// import FreeTransform from 'vue-free-transform'
import {gmapApi} from 'vue2-google-maps'
var numeral = require('numeral');
const axios = require('axios');
  export default {
    props: ["Layouts"],
    name: 'CreatePhotobook',
    components: {
      // FreeTransform,
      Signin,
      Loading,
    },
    data() {
      return {
        currentLocation : { lat : 13.923633, lng : 100.536543},
        searchAddressInput: '',
        cardBntPrice: 500,
        defaultPrice: 2000,
        defaultPriceFormat: '',
        active: '1',
        countBtn: '1',
        gallerytBtn: '',
        contactBtn: '',
        locationBtn: '',
        ShareBtn: '',
        video: '',
        video2: '',
        allPrice: '',
        videoData: '',
        markerData: '',
        gallerys: [],
        userData: '',
        slide: 0,
        sliding: null,
        file : '',
        commentsData: '',
        layoutImgData: require('../assets/layout/lv2_1.png'),
        themeSelection: false,
        selecttionItem: null,
        passData: this.layouts,
        inputMarker: [],
        image: '',
        imageType: '',
        showData:false,
        videoData:'',
        isLoading: false,
        chackUpload: false,
        myFormData: '',
        exampleDesign: [
          {
              ex: require('../assets/theme/1-ex/ex1.png'),
            },
            {
              ex: require('../assets/theme/1-ex/ex2.png'),
            },
            {
              ex: require('../assets/theme/1-ex/ex3.png'),
            }
        ],
      }
    },
    computed: {
    google: gmapApi
  },
    created(){
    },
    mounted() {
      

    },
    methods: {
      // layoutSet(data){
      //   this.layoutImgData = data.layoutImg
      //   this.cardBntPrice  = data.btnPrice
      //   this.countBtn = parseInt(data.value)
      //   console.log(data)
      // },
      onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    onFileChangeToVideo(e) {
        // this.videoData = e.target.files[0]
        this.videoData = this.$refs.vdoUpload.files[0];
        // this.videoData = document.getElementById('vdo-upload').files[0]
      // this.videoData = new FormData(this.$refs.video)
      console.log('videoData----'+this.videoData)
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createVideo(files[0]);
    },
    createVideo(file) {
      var video = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.video = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeVideo: function(e) {
      this.video = "";
    },
    setDataGallerys(){
        this.gallerys = this.$refs.gallerysData.files;
        console.log(this.gallerys)
    },
      selectTheme(data){
        this.themeSelection = true
        this.selecttionItem = data
        console.log(this.selecttionItem)
      },
      checkInputData(){
      if(this.$session.get('session') == true){
        this.cardBntPrice = parseInt(this.cardBntPrice)
        this.allPrice = this.cardBntPrice+this.defaultPrice
        console.log(this.allPrice)
        var c = numeral(this.allPrice).format('0,0')
        var d = numeral(this.defaultPrice).format('0,0')
        this.allPrice = c
        this.defaultPriceFormat = d
        this.$refs.CheckData.show()
        }else{
        this.isLoading = false
        this.$refs.CheckLogin.show()
      }
      },
      cancel(){
        this.$refs.CheckData.hide()
      },
    createOrder(){
      // var userData = this.$session.getAll()
      this.$refs.CheckData.hide()
        this.isLoading = true
        const getUserData = this.$session.get('sessionData')
        this.allPrice = this.cardBntPrice+this.defaultPrice
        this.userData = getUserData[0]
        var theData = new FormData();
        theData.append('user_id',this.userData.user_id);
        theData.append('files',this.videoData);
        for( var i = 0; i < this.gallerys.length; i++ ){
          let file = this.gallerys[i];
          theData.append('markers[' + i + ']', file);
        }
        var countFiles = this.gallerys.length*150
        theData.append('price',countFiles);
      
      axios({
                  method: 'post',
                  url: 'http://fishyutt.xyz/dev/admin/files/api/orders_api/insert_order_photobook.php',
                  data: theData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then((result) => {
              console.log(result)
              console.log('sccess')
              this.$router.push( {name:'OrderBill',params: { orderData: result.data}})
              this.isLoading = false
          })
          .catch((error) => {
            console.log('dataerror--------'+error)
            this.isLoading = false
          })
       
    },
    
    }
  }

</script>

<style>
  #app {
    display: flex;
    background: #F8FAFC;
  }
   #map {
        height: 100%;
      }

  .wrapper {
    flex: 1;
    min-height: 680px
  }

  .workspace {
    width: 700px;
    height: auto;
    margin: 25px auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
    border: 1px solid rgba(0, 0, 0, 0.10);
    background: #fff;

  }

  * {
    box-sizing: border-box;
  }

  .upload-file {
    width: 100px;

  }

  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }

  .upload-btn-wrapper input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  .bt-h {
    height: 40px;
  }

  .item-bar {
    height: 80px;
    width: 100%;
    background-color: #07bbf6;
  }

  .add-button{
    border-radius: 1000px;
    background: #ffa200 !important;
    border-color: #ffa200;
    min-width: 100px;
}

</style>
