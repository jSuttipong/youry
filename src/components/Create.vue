<template>
  <div class="wrapper fontth pagebg" style="background-color:#fff; height:100%">
    <div v-if="themeSelection == false">
      <!-- <div class="box-onbanner">
            <h1 class="text-on-banner cwhite">ตัวอย่าง</h1>
            <img class="theme-banner" src="../assets/theme/modern.jpg" alt="">
      </div>-->
      <div class="box-example">
        <b-container>
          <b-row>
            <b-col>
              <b-carousel
                id="carousel1"
                class="mt-4"
                style="width:100%;max-width:550px;border-radius:10px"
                controls
                indicators
                background="#fff"
                :interval="4000"
                img-width="300"
                img-height="480"
                v-model="slide"
                @sliding-starphot="onSlideStart"
                @sliding-end="onSlideEnd"
              >
                <div v-for=" data in exampleDesign" :key="data.ex">
                  <b-carousel-slide :img-src="data.ex"></b-carousel-slide>
                </div>
              </b-carousel>
            </b-col>
            <b-col>
              <h1 class="mt-5 cwhite">ตัวอย่าง</h1>
              <p
                class="fs24 cwhite"
              >นี่เป็นตัวอย่างการแสดงผล AR บนการ์ดงานแต่ง โดยจะแสดงผลปุ่มที่สามารถกดเพื่อดูข้อมูลเช่น ข้อมูลสถานที่จัดงาน ข้อมูลการติดต่อ อีกทั้งสามารถแสดงวีดีโอที่คุณต้องการให้เล่นบนหน้าการ์ดได้ผ่านแอปพลิเคชั้น Youry</p>
              <p class="cwhite">ดาวน์โหลดแอปพลิเคชั่นได้ที่ Google Playstore</p>
              <router-link to="https://play.google.com">
                <img
                  src="../assets/gplogo.png"
                  style="width:30%;background-color:white;border-radius:5px;padding:5px;position:relative"
                  alt
                >
              </router-link>
              <b-col>
                <img
                  src="../assets/qrcode.png"
                  class="mt-3"
                  style="width:25%;position:relative;margin-left:-10px"
                >
              </b-col>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <b-container>
        <div class="work-area">
          <!-- <div class="layout-area" >
                <h3 class="center pt-3">เลือกจำนวนปุ่มที่จะแสดง</h3>
              <div v-for="layout in layout" :key="layout.lid" class="box-on-layout" >
                <img :src="layout.layoutImg" class="left layout-selected" >
              <div class="layout-on" @click="active = layout.lid,layoutSet(layout)" :class="{layoutactive: active === layout.lid }">
                <div class="text-on-layout" >{{layout.btn}}</div>
              </div>
              </div>
          </div>-->
          <h3 class="center mt-3">สร้างออเดอร์ของคุณ</h3>
          <div class="inputData-area mt-4">
            <div v-if="!image">
              <form ref="marker" class="input-none" enctype="multipart/form-data">
                <label
                  for="markerUpload"
                  class="box-upload mt-5 mb-5"
                  style="display: flex; justify-content: center;"
                >
                  <h1 class="text-on-upload">
                    <i class="fas fa-upload">
                      <h5 class="fontth mt-2">Upload Marker</h5>
                      <h5 class="fontth mt-2">(รูปการ์ดของคุณ)</h5>
                    </i>
                  </h1>
                </label>
                <input
                  class="input-none"
                  type="file"
                  name="files"
                  id="markerUpload"
                  ref="markerUpload"
                  @change="onFileChange"
                  accept=".png, .jpg, .jpeg, .gif, .tif"
                >
              </form>
            </div>
            <div v-else>
              <b-row>
                <b-col>
                  <div>
                    <img
                      :src="image"
                      class="image-show"
                      style="display: flex; justify-content: center;"
                    >
                    <b-button
                      class="mt-3 ml-3 mb-3 left yr-button2"
                      @click="removeImage()"
                    >ลบ Marker</b-button>
                  </div>
                </b-col>
                <b-col class="pr-4">
                  <div v-if="image">
                    <h4 class="mt-3 fontth">อัพโหลดวีดีโอ ที่จะแสดงบนAR</h4>
                    <div v-if="!video">
                      <form ref="videoShow" class="input-none" enctype="multipart/form-data">
                        <label for="vdoUpload" class="button-upload mt-2">
                          <h5 class="text-on-btn-upload">
                            <i class="fas fa-upload"></i>
                          </h5>
                        </label>
                        <input
                          class="input-none"
                          type="file"
                          name="vdo"
                          id="vdoUpload"
                          ref="vdoUpload"
                          @change="onFileChangeToVideo"
                          accept=".avi, .flv, .mov, .mp4, .wmv, .3gp, .mpg"
                        >
                      </form>
                    </div>
                    <div v-else class="mb-5">
                      <video width="100%" controls>
                        <source :src="video" type="video/mp4">
                      </video>
                      <b-button @click="removeVideo" class="yr-button mt-2 mb-2">Remove Video</b-button>
                    </div>
                    <!-- <h4 class="corange">ปุ่มที่จะแสดง</h4> -->
                    <div>
                      <div>
                        <!-- <b-form-select v-if="countBtn == 4||countBtn == 3||countBtn == 2||countBtn == 1" v-model="btnData1" :options="btnOnCard" class="mb-3 yr-select" >
                        <template slot="first">
                        <option :value="null" disabled>-- เลือกปุ่มที่ 1 --</option>
                        </template>
                        </b-form-select>-->
                        <div>
                          <h4 class="mb-2 fontth">Location</h4>
                          <!-- <b-form-input class="mb-2" v-model="locationBtn" type="text" placeholder="Location ของคุณ"></b-form-input> -->
                          <div class="mb-2">
                            <GmapAutocomplete
                              placeholder="โปรดเพิ่มตำแหน่งของคุณ"
                              @place_changed="setLocation"
                              class="location-input"
                            ></GmapAutocomplete>
                          </div>
                          <!-- <GmapAutocomplete placeholder="..." @place_changed="ชื่อฟังก์ชัน"></GmapAutocomplete> -->
                          <GmapMap
                            :center="currentLocation"
                            :zoom="17"
                            map-type-id="terrain"
                            id="mapId"
                            style="width: 100%; height: 300px"
                          >
                            <GmapMarker ref="mapMarker" :position="currentLocation"/>
                            <!-- <GmapMarker ref="myMarker"
                            :position="google && new google.maps.LatLng(13.923633, 100.536543)"/>-->
                            <!-- <GmapMarker
                              :clickable="true"
                              :draggable="true"
                            />-->
                          </GmapMap>
                          <!-- <div class="geolocation" v-on:click="geolocation()">
                            <img src="../../static/images/geolocation.png" />
                          </div>-->
                          <!-- <div class="search">
                            <input type="text" v-model="searchAddressInput" v-on:change="searchLocation()">
                          </div>-->
                        </div>
                        <div>
                          <h4 class="mb-2 mt-3 fontth">Contact</h4>
                          <b-form-input
                            class="mb-2"
                            v-model="contactBtn"
                            type="text"
                            placeholder="การติดต่อ ของคุณ เช่นเบอร์โทรศัพท์"
                          ></b-form-input>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-container>
                <div class="mb-3">
                  <h4 class="mt-2 fontth">Gallerys</h4>
                  <form ref="gallerys" enctype="multipart/form-data">
                    <!-- <label for="file-upload" class="button-upload mt-2">
                                                  <h5 class="text-on-btn-upload"><i class="fas fa-upload"></i></h5>
                                              </label>
                    <input class="input-none " type="file" name="files" id="file-upload"  ref="file" multiple />-->
                    <label class="button-upload input-none">
                      <h5 class="text-on-btn-upload">
                        <i class="fas fa-upload"></i>
                      </h5>
                      <input
                        type="file"
                        ref="gallerysData"
                        name="gallerys[]"
                        id="filesToUpload"
                        @change="setDataGallerys"
                        multiple="multiple"
                        accept=".png, .jpg, .jpeg, .gif, .tif"
                      >
                    </label>
                  </form>
                  <!-- ************************************************************** -->
                  <b-row>
                    <b-col>
                      <b-container>
                        <div v-for="(gallerysForShow,index) in gallerysForShow" :key="gallerysForShow.name">
                          <div class="gallerys-box">
                            <img
                              :src="gallerysForShow"
                              class="gallerys-image"
                              style="box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);border: 1px solid rgba(0, 0, 0, 0.10);position:relative;"
                            >
                            <div class="item-on-gallerys">
                              <b-button class="bgred" @click="removeGallerys(index)">X</b-button>
                            </div>
                          </div>
                        </div>
                      </b-container>
                    </b-col>
                  </b-row>
                  <h4 class="fontth">ข้อมูลเพิ่มเติม</h4>
                  <b-form-textarea
                    id="textarea1"
                    v-model="commentsData"
                    placeholder="ข้อมูลความต้องการของคุณ เช่น ต้องการปุ่มแบบไหน รูปทรงของปุ่ม (ใส่ข้อมูลหรือไม่ใส่ก็ได้)"
                    :rows="3"
                    :max-rows="6"
                  ></b-form-textarea>
                </div>
                <div>
                  <b-button class="yr-button right" @click="checkInputData()">สั่งทำ</b-button>
                  <!-- <b-button class="yr-button right">ยกเลิก</b-button> -->
                </div>
              </b-container>
            </div>
          </div>
        </div>
      </b-container>
    </div>

    <b-modal ref="CheckData" hide-footer title="ตรวจสอบข้อมูล" size="lg">
      <div>
        <b-row>
          <b-col>
            <div class="bot-border mb-2">
              <h5>ราคาสร้างสรรค์งาน</h5>
            </div>
            <p>{{defaultPriceFormat}} บาท</p>
          </b-col>
          <b-col>
            <div class="bot-border mb-2">
              <h5>ราคาต่อปุ่ม</h5>
            </div>
            <p>500 บาท</p>
          </b-col>
          <b-col>
            <div class="bot-border mb-2">
              <h5>รวม</h5>
            </div>
            <p>{{allPrice}} บาท</p>
            <!-- <div class="bot-border mb-2"><h5>รวมราคาปุ่ม</h5></div>
            <p>{{cardBntPrice}} บาท</p>-->
            <!-- <div class="bot-border mb-2"><h5>จำนวนปุ่ม</h5></div>
            <p>{{countBtn}} ปุ่ม</p>-->
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
    <b-modal ref="reData" title="อัพโหลดข้อมูลใหม่อีกครั้ง">
      <h3>กรุณาอัพโหลดข้อมูลใหม่อีกครั้ง</h3>
    </b-modal>

    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        loader="dots"
        color="#106FFF"
        backgroundColor="#ffffff"
        :is-full-page="true"
      ></loading>
    </div>
    <!-- {{imageType}} -->
  </div>
</template>
<script >
/* eslint-disable */

import Signin from "@/components/Signin";
import Loading from "vue-loading-overlay";
// import FreeTransform from 'vue-free-transform'
import { gmapApi } from "vue2-google-maps";
import VueGoogleAutocomplete from "vue-google-autocomplete";

var numeral = require("numeral");
const axios = require("axios");
export default {
  props: ["Layouts"],
  name: "app",
  components: {
    // FreeTransform,
    Signin,
    Loading,
    VueGoogleAutocomplete
  },
  data() {
    return {
      locationName: "",
      currentLocation: { lat: 13.923633, lng: 100.536543 },
      latlong: "",
      searchAddressInput: "",
      cardBntPrice: 500,
      defaultPrice: 2000,
      defaultPriceFormat: "",
      active: "1",
      countBtn: "1",
      btnCard: null,
      btnData1: null,
      btnData2: null,
      btnData3: null,
      btnData4: null,
      gallerytBtn: "",
      contactBtn: "",
      locationBtn: "",
      ShareBtn: "",
      video: "",
      video2: "",
      allPrice: "",
      videoData: "",
      markerData: "",
      gallerysForShow: [],
      gallerys: [],
      gallerysToDB: [],
      userData: "",
      slide: 0,
      sliding: null,
      file: "",
      commentsData: "",
      layoutImgData: require("../assets/layout/lv2_1.png"),
      themeSelection: false,
      selecttionItem: null,
      passData: this.layouts,
      inputMarker: [],
      image: "",
      imageType: "",
      showData: false,
      videoData: "",
      isLoading: false,
      chackUpload: false,
      myFormData: "",
      btnOnCard: [
        // {
        //   text: 'เลือกปุ่ม',
        //   value: null
        // },
        {
          text: "location",
          value: "location",
          btnModel: ""
        },
        {
          text: "gallery",
          value: "gallery",
          btnModel: ""
        },
        {
          text: "contact",
          value: "contact",
          btnModel: ""
        }
      ],
      layout: [
        {
          layoutImg: require("../assets/layout/lv2_1.png"),
          lid: "1",
          value: "1",
          btn: "1 Button",
          btnPrice: 500
        },
        {
          layoutImg: require("../assets/layout/lv2_2.png"),
          lid: "2",
          value: "2",
          btn: "2 Button",
          btnPrice: 1000
        },
        {
          layoutImg: require("../assets/layout/lv2_3.png"),
          lid: "3",
          value: "3",
          btn: "3 Button",
          btnPrice: 1500
        },
        {
          layoutImg: require("../assets/layout/lv2_5.png"),
          lid: "4",
          value: "4",
          btn: "4 Button",
          btnPrice: 2000
        }
      ],
      exampleDesign: [
        {
          ex: require("../assets/theme/1-ex/ex2.png")
        },
        {
          ex: require("../assets/theme/1-ex/ex1.png")
        },
        {
          ex: require("../assets/theme/1-ex/ex3.png")
        },
        {
          ex: require("../assets/banner3.png")
        }
      ]
    };
  },
  computed: {
    google: gmapApi
  },
  created() {},
  mounted() {
    // console.log(google)
    //   map.addListener('click', function(e) {
    // placeMarker(e.latLng, map);
    //   });
    // const getUserData = this.$session.get('sessionData')
    //  this.userData = getUserData[0]
  },
  methods: {
    initMap() {
      var map = new google.maps.Map(document.getElementById("mapId"), {
        zoom: 4,
        center: { lat: -25.363882, lng: 131.044922 }
      });

      map.addListener("click", function(e) {
        placeMarkerAndPanTo(e.latLng, map);
      });
    },
    placeMarkerAndPanTo(latLng, map) {
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      map.panTo(latLng);
    },

    placeMarker(position, map) {
      var marker = new google.maps.Marker({
        position: position,
        map: map
      });
      map.panTo(position);
    },
    setLocation(place) {
      // console.log('place', place.formatted_address + '' + place.geometry.location.lat() + '' +place.geometry.location.lng())
      this.currentLocation.lat = place.geometry.location.lat();
      this.currentLocation.lng = place.geometry.location.lng();
      this.latlong = this.currentLocation.lat + "," + this.currentLocation.lng;
      this.locationName = place.formatted_address;
      console.log("place", place.formatted_address);
    },
    // initMap() {
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 4,
    //     center: {lat: -25.363882, lng: 131.044922 }
    //   });

    //   map.addListener('click', function(e) {
    //     placeMarkerAndPanTo(e.latLng, map);
    //   });
    // },
    // placeMarkerAndPanTo(latLng, map) {
    //   var marker = new google.maps.Marker({
    //     position: latLng,
    //     map: map
    //   });
    //   map.panTo(latLng);
    // },

    //   geolocation : function() {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.currentLocation = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //   });
    // },
    // searchLocation: function() {
    //   var geocoder = new google.maps.Geocoder();
    //   geocoder.geocode({'address': this.searchAddressInput}, (results, status) => {
    //     if (status === 'OK') {
    //       this.currentLocation.lat = results[0].geometry.location.lat();
    //       this.currentLocation.lng = results[0].geometry.location.lng();
    //     }
    //   });
    // },
    layoutSet(data) {
      this.layoutImgData = data.layoutImg;
      this.cardBntPrice = data.btnPrice;
      this.countBtn = parseInt(data.value);
      console.log(data);
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    onFileChange(e) {
      this.markerData = this.$refs.markerUpload.files[0];
      //   this.markerData = new FormData(this.$refs.marker);
      // this.markerData = e.target.files[0]
      // this.markerData = document.getElementById('marker-upload').files[0]
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      this.isLoading = true;
      setTimeout(() => {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = e => {
          vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
        this.isLoading = false;
      }, 300);
    },
    removeImage: function(e) {
      this.isLoading = true;
      setTimeout(() => {
        this.image = "";
        this.isLoading = false;
      }, 200);
    },
    onFileChangeToVideo(e) {
      // this.videoData = e.target.files[0]
      this.videoData = this.$refs.vdoUpload.files[0];
      // this.videoData = document.getElementById('vdo-upload').files[0]
      // this.videoData = new FormData(this.$refs.video)
      console.log("videoData----" + this.videoData);
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
    setDataGallerys(e) {
      var data = this.$refs.gallerysData.files;
      // this.gallerys = this.$refs.gallerysData.files;
      data = Array.from(data);
    for (let i = 0; i < data.length; i++) {
      this.gallerys.push(data[i])
      
    }
        // this.gallerys = Array.from(data);
      // this.gallerysToDB 
      
      // onFileChangeGallery()
      console.log(this.gallerys);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      for (let i = 0; i < files.length; i++) {
        this.createGallery(files[i]);
      }
    },
    createGallery(file) {
      this.isLoading = true;
      setTimeout(() => {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = e => {
          // vm.image = e.target.result;
          vm.gallerysForShow.push(e.target.result);
        };
        reader.readAsDataURL(file);
        this.isLoading = false;
      }, 300);
    },
    removeGallerys(image){
      console.log('remove',image)
      this.gallerysForShow.splice(image,1)
      // this.gallerys = Array.from(this.gallerys);
      this.gallerys.splice(image,1)
      // delete Object.values(this.gallerys[image])
      // *********************
      // this.gallerys = Object.assign(this.gallerys);
      // console.log('arrData',fileArray)
      // for( let i = 0; i < this.gallerys.length; i++){
      //   if ( this.gallerys[i] == image) 
      //     console.log('wwwww',this.gallerys[i])
      //   }
      // for (let i = 0; i < this.gallerys.length; i++) {
      //   if(this.gallerys.FileList[i]==image)
      //   delete this.gallerys.FileList[i]
      // }
      // delete this.gallerys[image].
      console.log('gallerys',this.gallerys)
      // this.gallerys.splice(image)
    },
    selectTheme(data) {
      this.themeSelection = true;
      this.selecttionItem = data;
      console.log(this.selecttionItem);
    },
    checkInputData() {
      if (this.$session.get("session") == true) {
        this.cardBntPrice = parseInt(this.cardBntPrice);
        this.allPrice = this.cardBntPrice + this.defaultPrice;
        console.log(this.allPrice);
        var c = numeral(this.allPrice).format("0,0");
        var d = numeral(this.defaultPrice).format("0,0");
        this.allPrice = c;
        this.defaultPriceFormat = d;
        this.$refs.CheckData.show();
      } else {
        this.isLoading = false;
        this.$refs.CheckLogin.show();
      }
    },
    cancel() {
      this.$refs.CheckData.hide();
    },
    createOrder() {
      // var userData = this.$session.getAll()
      this.$refs.CheckData.hide();
      this.isLoading = true;
      const getUserData = this.$session.get("sessionData");
      this.allPrice = this.cardBntPrice + this.defaultPrice;
      this.userData = getUserData[0];
      this.gallerys = Object.assign(this.gallerys);
      var theData = new FormData();
      theData.append("user_id", this.userData.user_id);
      theData.append("layout_id", this.countBtn);
      theData.append("location", this.locationName);
      theData.append("latlong", this.latlong);
      theData.append("contact", this.contactBtn);
      theData.append("price", this.allPrice);
      theData.append("orther", this.commentsData);
      theData.append("files", this.markerData);
      theData.append("vdo", this.videoData);
      for (var i = 0; i < this.gallerys.length; i++) {
        let file = this.gallerys[i];

        theData.append("gallerys[" + i + "]", file);
      }

      axios({
        method: "post",
        url:
          "https://fishyutt.xyz/dev/admin/files/api/orders_api/insert_order_card.php",
        data: theData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        .then(result => {
          console.log(result);
          console.log("sccess");
          console.log("pushData", result.data);
          this.$router.push({
            name: "OrderBill",
            params: { orderData: result.data }
          });
          this.isLoading = false;
        })
        .catch(error => {
          console.log("dataerror--------" + error);
          this.isLoading = false;
          this.$refs.reData.show();
        });
    },
    // onFileChangeGallery(e) {
    //   this.markerData = this.$refs.markerUpload.files[0];
    //   //   this.markerData = new FormData(this.$refs.marker);
    //   // this.markerData = e.target.files[0]
    //   // this.markerData = document.getElementById('marker-upload').files[0]
    //   var files = e.target.files || e.dataTransfer.files;
    //   if (!files.length) return;
    //   this.createGallery(files[0]);
    // }

    // removeImage: function(e) {
    //   this.isLoading = true
    //   setTimeout(() => {
    //       this.image = "";
    //       this.isLoading = false
    //     },200)

    // },
  }
};
</script>

<style>
#app {
  display: flex;
  background: #f8fafc;
}
#map {
  height: 100%;
}

.wrapper {
  flex: 1;
  min-height: 680px;
}

.workspace {
  width: 700px;
  height: auto;
  margin: 25px auto;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
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

/* .btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
} */

.upload-btn-wrapper input[type="file"] {
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

.add-button {
  border-radius: 1000px;
  background: #ffa200 !important;
  border-color: #ffa200;
  min-width: 100px;
}
</style>
