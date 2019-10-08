<template>
  <div class="fontth mb-5">
    <b-container class="mt-4">
      <b-alert
        dismissible
        variant="danger"
        v-model="showDismissibleAlert"
      >กรุณาอัพโหลดรูปภาพและวีดีโอ</b-alert>
    </b-container>
    <b-container>
      <vs-divider color="primary">
        <h2 class="center">สร้าง photobook AR ของคุณ</h2>
      </vs-divider>
      <b-row >
      </b-row>
      <!-- <v-uploader :multiple="true" language='en' @done="uploadDone" ></v-uploader> -->
      <b-container>
        <h5 class="center">อัพโหลดรูปภาพที่ต้องการให้แสดงผล AR</h5>
      </b-container>
      <!-- <div v-for="countItem in countItem" :key="countItem"> -->
        <!-- <h5 class="fontth">รูปและวีดีโอ1</h5> -->
        <b-row  v-for="countItem in countItem" :key="countItem" style="width:100%; border: 1px solid #EDE4E5;margin-bottom:20px;border-radius:10px;padding:5px">
          <b-col>
            <h5 class="fontth">วีดีโอ</h5>
            <div v-if="!allMarker[countItem-1].marker_vdo">
                <form ref="videoShow" class="input-none" enctype="multipart/form-data">
                  <label for="vdoUpload" class="button-upload mt-2" >
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
                    @change="onFileChangeToVideo($event,countItem-1)"
                    accept=".avi,.flv,.mov,.mp4,.wmv,.3gp,.mpg"
                  >
                </form>
              </div>
              <div v-else class="mb-5">
              <video width="100%" controls>
                <source :src="allMarker[countItem-1].marker_vdo" type="video/mp4">
              </video>
              <b-button @click="removeVideo(countItem-1)" class="yr-button mt-2 mb-2">Remove Video</b-button>
            </div>
          </b-col>
          <b-col>
            <h5 class="fontth">รูป</h5>
            <div v-if="!allMarker[countItem-1].marker_img" class="mt-3">
              <form ref="gallerys" enctype="multipart/form-data">
              <label class="button-upload input-none">
                <h5 class="text-on-btn-upload">
                  <i class="fas fa-upload"></i>
                </h5>
                <input
                  type="file"
                  ref="gallerysData"
                  name="gallerys[]"
                  id="filesToUpload"
                  @change="setMarker($event,countItem-1)"
                  accept=".png, .jpg, .jpeg, .gif, .tif"
                >
              </label>
            </form>
            </div>

            <b-row v-else>
              <b-col>
                <b-container>
                  <div class="gallerys-box objact-scale">
                    <img :src="allMarker[countItem-1].marker_img" class="gallerys-image">
                  <div class="item-on-gallerys">
                        <b-button class="bgred" @click="removeMarker(countItem-1)">X</b-button>
                      </div>
                  </div>
                  <!-- <div v-for="(gallerysForShow,index) in gallerysForShow" :key="gallerysForShow.name">
                    <div class="gallerys-box objact-scale">
                      <img
                        :src="gallerysForShow"
                        class="gallerys-image"
                        style="box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);border: 1px solid rgba(0, 0, 0, 0.10);position:relative;"
                      >
                      <div class="item-on-gallerys">
                        <b-button class="bgred" @click="removeGallerys(index)">X</b-button>
                      </div>
                    </div>
                  </div> -->
                </b-container>
              </b-col>
            </b-row>
          </b-col>
          <div v-if="countItem-1 != 0" class="right">
              <b-button class="bgblue" style="border-radius:1000px" @click="removeCell(countItem-1)" >X</b-button>
          </div>
        </b-row>
        <!-- <Signin></Signin> -->
        <!-- <TemplateBook></TemplateBook> -->
      <!-- </div> -->
      <b-row>
        <b-container>
          <div class="add-btn center right" @click="addItem()">
            <h1 class="item-in-add">+</h1>
          </div>
          <!-- <h5 class="right fontth ml-3 mr-3 mt-4">เพิ่มรูปและวีดีโอ</h5> -->
          <!-- <vs-button @click="openAlert('danger')" color="danger" type="flat">Alert Danger</vs-button> -->
        </b-container>
      </b-row>
      <b-row>
        <b-col>
          <h4 class="fontth">ข้อมูลเพิ่มเติม</h4>
                <b-form-textarea id="textarea1"
              v-model="commentsData"
              placeholder="ข้อมูลความต้องการของคุณ"
              :rows="3"
              :max-rows="6">
            </b-form-textarea>
        </b-col>
      </b-row>
      <div>
        <b-button class="yr-button right mt-2 mb-5" @click="createOrder(countItem)">สั่งทำ</b-button>
        <!-- <b-button class="yr-button right mt-2 mb-5" @click="checkInputData()">สั่งทำ</b-button> -->
        <!-- <b-button class="yr-button right">ยกเลิก</b-button> -->
      </div>
      <b-modal ref="CheckData" hide-footer title="ตรวจสอบข้อมูล" size="lg">
        <div>
          <b-row>
            <!-- <b-col>
            <div class="bot-border mb-2">
              <h5>ราคาสร้างสรรค์งาน</h5>
            </div>
            <p>{{defaultPriceFormat}} บาท</p>
            </b-col>-->
            <b-col>
              <div class="bot-border mb-2">
                <h5>ราคาต่อรูปภาพ</h5>
              </div>
              <p>150 บาท</p>
            </b-col>
            <b-col>
              <div class="bot-border mb-2">
                <h5>จำนวนรูปที่อัพโหลด</h5>
              </div>
              <p>{{gallerys.length}}</p>
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
    </b-container>
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
<script>
/* eslint-disable */
const axios = require("axios");
const moment = require("moment");
import Signin from "@/components/Signin";

var numeral = require("numeral");
import Loading from "vue-loading-overlay";
import TemplateBook from '@/components/TemplateBook'
export default {
  name: "createPhotobook",
  components: {
    Loading,
    Signin,
    TemplateBook
  },
  data() {
    return {
      video: "",
      images: [],
      gallerys: [],
      gallerysForShow: [],
      allPrice: 0,
      commentsData: "",
      userData: "",
      isLoading: false,
      videoData: "",
      showDismissibleAlert: false,
      dataTest: "",
      allMarker: [
        {
          marker_img: "",
          marker_vdo: "",
        },
        {
          marker_img: "",
          marker_vdo: "",
        },
        {
          marker_img: "",
          marker_vdo: "",
        },
        {
          marker_img: "",
          marker_vdo: "",
        },
        {
          marker_img: "",
          marker_vdo: "",
        }
      ],
      setDataMarker: [
        {
          marker_img: "",
          marker_vdo: "",
        },
        {
          marker_img: "",
          marker_vdo: "",
        },
        {
          marker_img: "",
          marker_vdo: "",
        },
        {
          marker_img: "",
          marker_vdo: "",
        },
        {
          marker_img: "",
          marker_vdo: "",
        }
      ],
      countItem: 1,
      colorAlert: 'primary',
      activeAlert:false,
    };
  },
  methods: {
    removeCell(count){
      this.countItem -=1
    },
    addItem(){
      if(this.countItem < 5 ){
        this.countItem += 1
      }else
      {
        this.openAlert()
      }
      // console.log('count',this.countItem)
    },
    openAlert(){
      this.colorAlert = 'danger'
      this.$vs.dialog({
        color:this.colorAlert,
        title: 'ผิดพลาด',
        text: 'เพิ่มได้ไม่เกิน 5 รูป 5วีดีโอ',
        acceptText: 'ตกลง'
        // accept:this.acceptAlert
      })
    },
    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Lorem ipsum dolor sit amet, consectetur"
      });
    },
    onFileChangeToVideo(e,count) {
      // console.log(e)
      // this.videoData = this.$refs.vdoUpload[0].files[0];
      this.setDataMarker[count].marker_vdo = this.$refs.vdoUpload[0].files[0];
      console.log("videoData----" , this.videoData);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createVideo(files[0],count);
    },
    createVideo(file,count) {
      var video = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.allMarker[count].marker_vdo = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeVideo: function(count) {
      this.allMarker[count].marker_vdo = "";
      this.setDataMarker[count].marker_vdo = "";
    },
    setMarker(e,count){
      this.setDataMarker[count].marker_img = this.$refs.gallerysData[0].files[0];
      // console.log("videoData----" , this.videoData);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createGallery(files[0],count);
    },
    // setDataGallerys(e) {
    //   var data = this.$refs.gallerysData.files;
    //   // this.gallerys = this.$refs.gallerysData.files;
    //   data = Array.from(data);
    //   for (let i = 0; i < data.length; i++) {
    //     this.gallerys.push(data[i]);
    //   }
    //   console.log(this.gallerys);
    //   var files = e.target.files || e.dataTransfer.files;
    //   if (!files.length) return;
    //   for (let i = 0; i < files.length; i++) {
    //     this.createGallery(files[i]);
    //   }
    // },
    createGallery(file,count) {
      this.isLoading = true;
      setTimeout(() => {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;
        reader.onload = e => {
          vm.allMarker[count].marker_img = e.target.result;
        };
        reader.readAsDataURL(file);
        this.isLoading = false;
      }, 300);
    },
    removeMarker(count){
      this.allMarker[count].marker_img = "";
      this.setDataMarker[count].marker_img = "";
    },
    // removeGallerys(image) {
    //   console.log("remove", image);
    //   this.gallerysForShow.splice(image, 1);
    //   this.gallerys.splice(image, 1);
    //   console.log("gallerys", this.gallerys);
    // },
    checkInputData() {
      if (this.$session.get("session") == true) {
        if (
          this.gallerys.length == 0 ||
          this.gallerys.length == "0" ||
          this.video == ""
        ) {
          this.showDismissibleAlert = true;
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          this.showDismissibleAlert = false;
          this.allPrice = 500 * parseInt(this.gallerys.length);
          var c = numeral(this.allPrice).format("0,0");
          this.allPrice = c;
          this.$refs.CheckData.show();
        }
      } else {
        this.isLoading = false;
        this.$refs.CheckLogin.show();
      }
    },
    cancel() {
      this.$refs.CheckData.hide();
    },
    createOrder(count) {
      // var userData = this.$session.getAll()
      this.$refs.CheckData.hide();
      this.isLoading = true;
      // const getUserData = this.$session.get("sessionData");
      const getUserData = this.$cookies.get('token')
      // this.allPrice = this.cardBntPrice + this.defaultPrice;
      console.log(this.setDataMarker)
      for (let i = 0; i <= count-1; i++) {
        this.setDataMarker[i].marker_img
      }
      //-----------------------------------
      this.userData = getUserData;
      console.log("user", this.userData);
      this.gallerys = Object.assign(this.gallerys);
      var theData = new FormData();

      theData.append("user_id", this.userData.user_id);
      // theData.append("fileToUpload", this.videoData);
      theData.append("orther", this.commentsData);
      // for (let i = 0; i <= count-1; i++) {
      //   theData.append("marker_img"+i,this.setDataMarker[i].marker_img)
      //   theData.append("marker_vdo"+i,this.setDataMarker[i].marker_vdo)
      // }
      theData.append("marker_img1",this.setDataMarker[0].marker_img)
      theData.append("marker_vdo1",this.setDataMarker[0].marker_vdo)
      theData.append("marker_img2",this.setDataMarker[1].marker_img)
      theData.append("marker_vdo2",this.setDataMarker[1].marker_vdo)
      theData.append("marker_img3",this.setDataMarker[2].marker_img)
      theData.append("marker_vdo3",this.setDataMarker[2].marker_vdo)
      theData.append("marker_img4",this.setDataMarker[3].marker_img)
      theData.append("marker_vdo4",this.setDataMarker[3].marker_vdo)
      theData.append("marker_img5",this.setDataMarker[4].marker_img)
      theData.append("marker_vdo5",this.setDataMarker[4].marker_vdo)
      for (var value of theData.values()) {
   console.log('form',value); 
}      // console.log("video", this.videoData);
      // for (var i = 0; i < this.gallerys.length; i++) {
      //   let file = this.gallerys[i];

      //   theData.append("markers[" + i + "]", file);
      // }
      axios({
        method: "post",
        url:
          "https://fishyutt.xyz/dev/admin/files/api/orders_api/insert_order_photobook3.php",
          // '',
        // "https://fishyutt.xyz/dev/admin/files/api/users_api/order_user_detail.php?user_id=5c66b996c80e3",
        data: theData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        .then(result => {
          console.log("sccess", JSON.stringify(result));
          console.log("sccess");
          console.log("pushData", result.data);
          this.$router.push({
            name: "PhotobookBill",
            params:{
              orderData: result.data,
              userData: this.userData,
              video: this.video,
              gallerys: this.gallerysForShow,
              price: this.allPrice
            }
            // params: {
            //   orderData: result.data,
            //   userData: this.userData,
            //   video: this.video,
            //   gallerys: this.gallerysForShow,
            //   price: this.allPrice
            // }
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
          this.isLoading = false;
        })
        .catch(error => {
          console.log("dataerror--------" + error);
          this.isLoading = false;
          this.$refs.reData.show();
        });
    }
  }
};
</script>
