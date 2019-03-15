<template>
    <div class="fontth">
        <b-container>
            <vs-divider color="primary">
               <h2 class="center mt-3 mb-3">Basic Package</h2>
            </vs-divider>
            <div v-if="!image" class="inputData-area">
            <h4>อัพโหลดรูปการ์ดเชิญของคุณ</h4>
            <form ref="marker" class="input-none" enctype="multipart/form-data">
                <label for="marker-upload" class="box-upload mt-5 mb-5" style="display: flex; justify-content: center;">
                <h1 class="text-on-upload">
                    <i class="fas fa-upload">
                    <h5 class="fontth mt-2">Upload Marker</h5>
                    </i>
                </h1>
                </label>
                <input
                class="input-none"
                type="file"
                name="files"
                id="marker-upload"
                ref="file"
                @change="renderImage"
                accept=".png, .jpg, .jpeg, .gif, .tif"
                >
            </form>
        </div>
        <div v-else class="inputData-area">
            <b-row class="mt-5 mb-5">
                <b-col>
                    <b-row>
                        <b-col>
                            <h4 class="mt-2 fontth">อัพโหลด Video ของคุณ</h4>
                <div v-if="!video">
                    <form ref="videoShow" class="input-none" enctype="multipart/form-data">
                    <label for="vdo-upload" class="button-upload mt-2" >
                        <h5 class="text-on-btn-upload">
                        <i class="fas fa-upload"></i>
                        </h5>
                    </label>
                    <input
                        class="input-none"
                        type="file"
                        name="vdo"
                        id="vdo-upload"
                        ref="file"
                        @change="onFileChangeToVideo"
                        accept=".avi, .flv, .mov, .mp4, .wmv, .3gp, .mpg"
                    >
                    </form>
                </div>
                <div v-else>
                <video width="100%" controls>
                  <source :src="video" type="video/mp4">
                </video>
                <b-button @click="removeVideo" class="yr-button mt-2 mb-2">Remove Video</b-button>
              </div>
                        </b-col>
                    </b-row>
                    <b-row class="pr-3 pl-3">
                        <h4 class="mb-2 mt-3 fontth">Contact</h4>
                          <b-form-input
                            class="mb-2"
                            v-model="contactBtn"
                            type="text"
                            placeholder="การติดต่อ ของคุณ เช่นเบอร์โทรศัพท์"
                          ></b-form-input>
                    </b-row>
                    <b-row>
                        <b-col>
                            <h4 class="mt-2 fontth">Gallerys</h4>
                  <form ref="gallerys" enctype="multipart/form-data">
                    <!-- <label for="file-upload" class="button-upload mt-2">
                                                  <h5 class="text-on-btn-upload"><i class="fas fa-upload"></i></h5>
                                              </label>
                    <input class="input-none " type="file" name="files" id="file-upload"  ref="file" multiple />-->
                    <label class="button-upload input-none" v-if="gallerysForShow.length < 10">
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
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <h4 class="fontth">ข้อมูลเพิ่มเติม</h4>
                  <b-form-textarea
                    id="textarea1"
                    v-model="commentsData"
                    placeholder="ข้อมูลความต้องการของคุณ เช่น ต้องการปุ่มแบบไหน รูปทรงของปุ่ม (ใส่ข้อมูลหรือไม่ใส่ก็ได้)"
                    :rows="3"
                    :max-rows="6"
                  ></b-form-textarea>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <h4 class="mt-2 fontth">marker</h4>
                    <b-row>
                        <b-col>
                            <b-button v-b-tooltip.hover title="Remove Marker" @click="removeImage" class="yr-bt-remove mt-3 right">X</b-button>
                        </b-col>
                    </b-row>
                    <!-- <div style="max-height:300px;overflow auto">
                    <vs-images hover='scale'>
                        <vs-image  :src="image" />
                    </vs-images>
                    </div> -->
                    <img :src="image" class="image-show " style="display: flex; justify-content: center;">
                </b-col>
            </b-row>
            <vs-divider v-if="gallerysForShow.length != 0">
                <h5 class="fontth">รูปที่อัพโหลด</h5>
            </vs-divider>
            <b-row>
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
            </b-row>
            <b-row>
                <b-col>
                    <div>
                        <b-button class="yr-button right" @click="checkInputData()">สั่งทำ</b-button>
                    </div>
                </b-col>
            </b-row>
        </div>
        </b-container>
        <b-modal ref="CheckData" hide-footer title="ตรวจสอบข้อมูล" size="lg">
      <div>
        <b-row>
          <!-- <b-col>
            <div class="bot-border mb-2">
              <h5>ราคาสร้างสรรค์งาน</h5>
            </div>
            <p>{{defaultPriceFormat}} บาท</p>
          </b-col> -->
          <!-- <b-col>
            <div class="bot-border mb-2">
              <h5>ราคาต่อปุ่ม</h5>
            </div>
            <p>500 บาท</p>
          </b-col> -->
          <b-col>
            <div class="bot-border mb-2">
              <h5>ราคา Package</h5>
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
    <!-- Loading****** -->
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
    </div>
</template>
<script >
/* eslint-disable */
import Signin from "@/components/Signin";
import Loading from "vue-loading-overlay";
import { RENDER } from "../js/Render.js";
var numeral = require("numeral");
const axios = require("axios");
export default {
    components: {
    Loading,
    Signin
    },
    data(){
        return {
            image: '',
            markerData: '',
            isLoading: false,
            file: '',
            video: '',
            gallerysForShow: [],
            gallerys: [],
            contactBtn: '',
            commentsData: '',
            allPrice: 0,
            defaultPriceFormat: ''
        }
    },
    methods:{
        renderImage(e) {
            this.isLoading = true
            this.markerData = document.getElementById('marker-upload').files[0]
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            var file = files[0]
            var image = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = e => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
            this.isLoading = false
        },
        removeImage() {
            this.image = "";
        },
        onFileChangeToVideo(e) {
            this.isLoading = true
            this.videoData = document.getElementById('vdo-upload').files[0]
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            var file = files[0]
            var video = new Image();
            var reader = new FileReader();
            var vm = this;
            reader.onload = e => {
                vm.video = e.target.result;
            };
            reader.readAsDataURL(file);
            this.isLoading = false
        },
        removeVideo() {
            this.video = "";
        },
        setDataGallerys(e) {
            var data = this.$refs.gallerysData.files;
            data = Array.from(data);
            for (let i = 0; i < data.length; i++) {
                this.gallerys.push(data[i])
            }
            console.log(this.gallerys);
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            for (let i = 0; i < files.length; i++) {
                this.createGallery(files[i]);
            }
        },
        createGallery(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = e => {
            // vm.image = e.target.result;
            vm.gallerysForShow.push(e.target.result);
            };
            reader.readAsDataURL(file);
        },
        removeGallerys(image){
            console.log('remove',image)
            this.gallerysForShow.splice(image,1)
            this.gallerys.splice(image,1)
            console.log('gallerys',this.gallerys)
        },
        checkInputData() {
            if(this.$cookies.get('token')){


            // }
    //   if (this.$session.get("session") == true) {
        this.cardBntPrice = parseInt(this.cardBntPrice);
        // this.allPrice = this.cardBntPrice + this.defaultPrice;
        this.allPrice = 3000
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
    //   const getUserData = this.$session.get("sessionData");
    const getUserData = this.$cookies.get('token')
    //   this.allPrice = this.cardBntPrice + this.defaultPrice;
      this.userData = getUserData;
      this.gallerys = Object.assign(this.gallerys);
      var theData = new FormData();
      theData.append("user_id", this.userData.user_id);
    //   theData.append("layout_id", this.countBtn);
    //   theData.append("location", this.locationName);
    //   theData.append("latlong", this.latlong);
      theData.append("contact", this.contactBtn);
      theData.append("price", 3000);
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
          window.scrollTo({ top: 0, behavior: 'smooth' })
          this.isLoading = false;
        })
        .catch(error => {
          console.log("dataerror--------" + error);
          this.isLoading = false;
        //   this.$refs.reData.show();
        });
    }
    }
}
</script>
