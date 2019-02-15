<template>
  <div class="fontth mb-5">
    <h2 class="center mt-5">สร้าง photobook AR ของคุณ</h2>
    <b-container>
      <b-row class="mt-5 mb-5">
        <b-col>
          <h4 class="mt-3 fontth">อัพโหลดวีดีโอ ที่ต้องการให้แสดง</h4>
            <div v-if="!video">
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
                  @change="onFileChangeToVideo"
                  accept=".avi,.flv,.mov,.mp4,.wmv,.3gp,.mpg"
                >
              </form>
            </div>
            <div v-else class="mb-5">
            <video width="100%" controls>
              <source :src="video" type="video/mp4">
            </video>
            <b-button @click="removeVideo" class="yr-button mt-2 mb-2">Remove Video</b-button>
          </div>
        </b-col>
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
    <!-- <v-uploader :multiple="true" language='en' @done="uploadDone" ></v-uploader> -->
    <b-row >
      <h5 class="center">อัพโหลดรูปภาพที่ต้องการให้แสดงผล AR</h5>
        <b-container>
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
        </b-container>
    </b-row>
    <div>
      <b-button class="yr-button right" @click="checkInputData()">สั่งทำ</b-button>
      <!-- <b-button class="yr-button right">ยกเลิก</b-button> -->
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
    </b-container>
  </div>
</template>
<script>
/* eslint-disable */
const axios = require('axios');
export default {
  name: 'createPhotobook',
  data(){
    return{
      video: '',
      images: [],
      gallerys:[],
      gallerysForShow:[],
      commentsData: ''
    }
  },
  methods:{
    onFileChangeToVideo(e) {
        this.videoData = this.$refs.vdoUpload.files[0];
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
    setDataGallerys(e) {
      var data = this.$refs.gallerysData.files;
      // this.gallerys = this.$refs.gallerysData.files;
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
      this.isLoading = true;
      setTimeout(() => {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;
        reader.onload = e => {
          vm.gallerysForShow.push(e.target.result);
        };
        reader.readAsDataURL(file);
        this.isLoading = false;
      }, 300);
    },
    removeGallerys(image){
      console.log('remove',image)
      this.gallerysForShow.splice(image,1)
      this.gallerys.splice(image,1)
      console.log('gallerys',this.gallerys)
    },
    checkInputData() {
      if (this.$session.get("session") == true) {
        // this.cardBntPrice = parseInt(this.cardBntPrice);
        // this.allPrice = this.cardBntPrice + this.defaultPrice;
        // console.log(this.allPrice);
        // var c = numeral(this.allPrice).format("0,0");
        // var d = numeral(this.defaultPrice).format("0,0");
        // this.allPrice = c;
        // this.defaultPriceFormat = d;
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
      // this.allPrice = this.cardBntPrice + this.defaultPrice;
      this.userData = getUserData[0];
      this.gallerys = Object.assign(this.gallerys);
      var theData = new FormData();
      theData.append("user_id", this.userData.user_id);
      theData.append("fileToUpload ", this.videoData);
      for (var i = 0; i < this.gallerys.length; i++) {
        let file = this.gallerys[i];

        theData.append("markers[" + i + "]", file);
      }
      axios({
        method: "post",
        url:
          "https://fishyutt.xyz/dev/admin/files/api/orders_api/insert_order_photobook.php",
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
  },
  
}
</script>
