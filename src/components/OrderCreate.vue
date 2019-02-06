<template>
  <div>
    <b-container>
      <div>
        <div v-if="!image">
          <form ref="marker" class="input-none" enctype="multipart/form-data">
              <!-- <input type="file" name="files" id="file" ref="file" @change="onFileChange"/>
            <b-button @click="go()">send</b-button> -->
            <!-- <input type="file" name="files" id="file" ref="file" class="box-upload mt-5 mb-5"/>
                <div type="file" name="files" id="file" ref="file" class="box-upload mt-5 mb-5">
                    <h1 class="text-on-upload cred">Upload Marker</h1>
            </div>-->
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
              @change="onFileChange"
            >
          </form>
        </div>
        <div v-else>
          <b-row class="mt-5 mb-5">
            <b-col>
              <img :src="image" class="image-show" style="display: flex; justify-content: center;">
              <!-- <b-button @click="removeImage" class="yr-button">Remove image</b-button> -->
            </b-col>
            <b-col>
              <!-- <h2>THEME</h2> -->
              <div class="box-theme" >
                <h5 class="text-on-theme cwhite">{{themeResult.themeName}}</h5>
                <img class="theme-show" :src="themeResult.themepic">
              </div>
              <h5 class="mt-3 fontth">อัพโหลดวีดีโอ ที่จะแสดงบนAR</h5>
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
                  >
                </form>
              </div>
              <div v-else>
                <video width="100%" controls>
                  <source :src="video" type="video/mp4">
                </video>
                <b-button @click="removeVideo" class="yr-button mt-2 mb-2">Remove Video</b-button>
              </div>
              <h5 class="fontth">UPLOAD FILES GALLERY</h5>
              <form ref="gallerys" enctype="multipart/form-data">
                <!-- <label for="file-upload" class="button-upload mt-2">
                                        <h5 class="text-on-btn-upload"><i class="fas fa-upload"></i></h5>
                                    </label>
                <input class="input-none " type="file" name="files" id="file-upload"  ref="file" multiple />-->
                <label class="button-upload input-none">
                  <h5 class="text-on-btn-upload">
                    <i class="fas fa-upload"></i>
                  </h5>
                  <input type="file" name="gallerys[]" id="filesToUpload" @change="setDataGallerys" multiple="multiple">
                </label>
              </form>
              <!-- <div
                id="my-strictly-unique-vue-upload-multiple-image"
                style="display: flex; justify-content: center;"
              >
                <vue-upload-multiple-image
                  @upload-success="uploadImageSuccess"
                  @before-remove="beforeRemove"
                  @edit-image="editImage"
                  @data-change="dataChange"
                  :data-images="gallery"
                  primaryText = 'success'
                  popupText = ''
                  dragText ='อัพโหลดรูปของคุณ'
                  browseText =''
                  markIsPrimaryText = ''
                  dropText= ''
                  name = 'gallerys'
                  id="gallery-upload"
                ></vue-upload-multiple-image>
              </div> -->
              <!-- <div v-for="img in gallery" :key="img">
                                <img :src="img" alt="">
              </div>-->
              <div class="right mt-3">
                  <b-button class="yr-button">ยกเลิก</b-button>
                  <!-- <b-button class="yr-button" @click="orderConfirm()">ยืนยัน</b-button> -->
                  <b-button class="yr-button" v-b-modal.checkOrder>ยืนยัน</b-button>
              </div>
              <b-modal id="checkOrder" ref="modalCheckOrder" size="lg"  hide-footer title="ยืนยันรายการ" class="fontth">
                  <b-row>
                    <div class="box-theme mr-3 ml-3 mb-5" >
                    <h5 class="text-on-theme cwhite">{{themeResult.themeName}}</h5>
                    <img class="theme-show" :src="themeResult.themepic">
                    <h5 class="mt-2">ราคา : 1999</h5>
                  </div>

                      <b-col>
                          <img :src="image" class="image-show" style="display: flex; justify-content: center;">
                      </b-col>
                      <b-col>
                          <video width="100%" controls>
                            <source :src="video" type="video/mp4">
                          </video>
                      </b-col>
                  </b-row>
                  <b-button @click="orderConfirm()" class="yr-button right">ตกลง</b-button>
                  <b-button class="yr-button right mr-3" @click="hideModal()" style="background-color:#999; border:none">ยกเลิก</b-button>
                </b-modal>
            </b-col>
          </b-row>
        </div>
        <!-- <b-button @click="go()">goooooooo</b-button> -->
      </div>
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
import VueUploadMultipleImage from "vue-upload-multiple-image";
import Loading from "vue-loading-overlay";
const axios = require("axios");
export default {
  name: "OrderCreate",
  components: {
    Loading,
    VueUploadMultipleImage
  },
  props: ["themeResult"],
  data() {
    return {
      image: "",
      isLoading: false,
      FormData: "",
      videoData: "",
      video: "",
      videoShow: '',
      galleryData: [[]],
      markerData: '',
      gallery: [],
      gallerys: [],
      userData: '',
      file : '',
      marker: '',
      dataCheck: 0
    };
  },
  mounted(){
      const getUserData = this.$session.get('sessionData')
    this.userData = getUserData
    console.log('--------------------------'+this.userData)
    
  },
  methods: {
    hideModal () {
      this.$refs.modalCheckOrder.hide()
    },
    setDataGallerys(){
      var input = document.getElementById('filesToUpload');
      console.log(document.getElementById('filesToUpload').files)
      // this.gallerys = document.getElementById('filesToUpload').files
      // console.log('asdfghjkl'+this.gallerys)
        // var list = document.getElementById('fileList');

        //empty list for now...
        // while (list.hasChildNodes()) {
        //   list.removeChild(ul.firstChild);
        // }

//for every file...
        for (var x = 0; x < input.files.length; x++) {
          //add to list
          // this.gallerys[x].push(document.getElementById('filesToUpload').files[x])
          this.gallerys[x] = document.getElementById('filesToUpload').files[x]
          // this.gallerys = document.getElementById('gallery').files[0]
          console.log('data---'+this.gallerys)
          // var li = document.createElement('li');
          // li.innerHTML = 'File ' + (x + 1) + ':  ' + input.files[x].name;
          // list.append(li);
        }
      // console.log('data---'+document.getElementById('gallerys'))
    },
    onFileChange(e) {
      // this.markerData = new FormData(this.$refs.marker);
      // this.markerData = document.getElementById('marker-upload');
      this.markerData = document.getElementById('marker-upload').files[0]

    //   var test = new FormData()
      console.log('555555'+this.markerData)
    // this.markerData = e.target.files[0]
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
      }, 500);
    },
    removeImage: function(e) {
      this.image = "";
    },
    onFileChangeToVideo(e) {
        // this.videoData = e.target.files[0]
        this.videoData = document.getElementById('vdo-upload').files[0]
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
    // onFileChangeToGallery(e) {
    //     // this.FormData = new FormData(this.$refs.myForm)
    //     var files = e.target.files || e.dataTransfer.files;
    //     if (!files.length)
    //         return;
    //     this.createGallery(files[0]);
    // },
    // createGallery(file) {
    //     var gallery = new Image();
    //     var reader = new FileReader();
    //     var vm = this;

    //     reader.onload = (e) => {
    //         vm.gallery = e.target.result;
    // };
    //     reader.readAsDataURL(file);
    // },
    // removeGallery: function (e) {
    //     this.gallery = '';
    // },
    go() {
      this.isLoading = true;
      // var myFormData = new FormData(this.$refs.myForm)
      console.log(this.FormData);
      axios({
        method: "post",
        url:
          "http://fishyutt.xyz/dev/admin/files/api/orders_api/insert_order_card.php",
        data: this.FormData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        .then(result => {
          console.log(result);
          console.log("sccess");
          this.isLoading = false;
        })
        .catch(error => {
          // Do somthing
          this.isLoading = false;
          console.log(error.response);
        });
    },
    uploadImageSuccess(formData, index, fileList) {
      // var datalist = 0
      console.log(this.gallery)
      // this.galleryData.push(formData,index);
      // datalist +=1
      console.log('7777777777777777777'+formData)

       this.galleryData.push( [] );
      let num = parseInt(index)
      console.log(num)
      this.galleryData[num].push(formData);
      // for( var i=r; i<rows; i++ ) {
      //     this.galleryData.push( [] );
      //   }
      // this.dataCheck = 0
      // if(formData ){
      //   this.dataCheck +=1
      //   // console.log('Data gallary')
      // for (var i = 1; i <= this.dataCheck; i++)
      //     {
      //             this.galleryData[i-1].push(formData);
      //     }
      //   }
    //   console.log("data", formData, index, fileList);
    // console.log('data', formData, index, fileList)
    
    // this.videoData = document.getElementById('gallery-upload').files[0]
      // this.galleryData.push(index)

      // this.galleryData = formData;
      console.log('upload gallary'+ this.galleryData)
      // Upload image api
      // axios.post('http://your-url-upload', { data: formData }).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove(index, done, fileList) {
    //   console.log("index", index, fileList);
      var r = confirm("remove image");
      if (r == true) {
        this.dataCheck -=1
        done();
      } else {
      }
    },
    editImage(formData, index, fileList) {
    //   console.log("edit data", formData, index, fileList);
    },
    dataChange(data) {
    //   console.log(data);
    },
    checkOrder(){

    },
    orderConfirm(){
              console.log('checkDataFiles'+ this.galleryData)
        // this.isLoading = true
        // // var myFormData = new FormData(this.$refs.myForm)
        // console.log(myFormData)
        // axios({
        //           method: 'post',
        //           url: 'http://fishyutt.xyz/dev/admin/files/api/orders_api/insert_order_card_2.php',
        //           data: myFormData,
        //           config: { headers: {'Content-Type': 'multipart/form-data' }}
        //       }).then((result) => {
        //       console.log(result)
        //       console.log('sccess')
        //       this.isLoading = false
        //   })
        //   .catch((error) => {
        //     // Do somthing
        //     this.isLoading = false
        //     console.log(error)
        //     console.log(error.response)
        //   })
        // console.log('go------------------'+this.markerData)
        // console.log(this.video)
        // console.log(this.galleryData)
            this.isLoading = true;
        //     const formData2 = new FormData(this.$refs.marker)
        // formData2.append('myFile', this.markerData, this.markerData.name)
        // const formData3 = new FormData(this.$refs.video)
        // formData3.append('myFile', this.videoData, this.videoData.name)
             var querystring = require('querystring');
        // console.log('*******************'+this.formData2+'**********************')
        var chackEP = querystring.stringify({
        //   order_id: '',
            // user_id: this.userData.User_id,
            user_id: '4',
            order_type: '2',
            theme_id: '2',
            location: 'none',
            contact: 'none',
            price: "1999",
            orther: 'none',
            name_img: this.markerData,
            name_vdo: this.videoData,
            // marker_img: this.markerData,
            // marker_vdo: this.videoData,
            // gallerys: this.gallerys

        //   User_password: this.password,
        });
        // var fileMarker = document.getElementById('marker-upload');
        // var fileVideo = document.getElementById('vdo-upload');
        // console.log('fileData'+fileMarker)

        // if(fileMarker.files.length)
        // {
        //     var reader = new FileReader();

        //     // reader.onload = function(e)
        //     // {
        //     //     document.getElementById('outputDiv').innerHTML = e.target.result;
        //     // };

        //     reader.readAsBinaryString(fileMarker.files[0]);
        // }
        var theData = new FormData();
        // var rawData = {
        //     user_id: '4',
        //     order_type: '2',
        //     theme_id: '2',
        //     location: 'none',
        //     contact: 'none',
        //     price: "1999",
        //     orther: 'none',
        //     // files_img: this.markerData,
        //     // files_vdo: fileVideo,
        // }
        this.$refs.modalCheckOrder.hide()
        // rawData = JSON.stringify(rawData) 
        theData.append('user_id','4');
        theData.append('order_type','2');
        theData.append('theme_id','2');
        theData.append('location','none');
        theData.append('contact','none');
        theData.append('price','1999');
        theData.append('orther','none');
        theData.append('files',this.markerData);
        theData.append('vdo',this.videoData);
        theData.append('gallerys[]',this.gallerys);

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        // axios.post('http://fishyutt.xyz/dev/admin/files/api/orders_api/create_order.php', this.markerData, )
        // axios.post('http://fishyutt.xyz/dev/admin/files/api/orders_api/create_order.php', this.videoData, )
        // axios({
        //           method: 'post',
        //           url: 'http://fishyutt.xyz/dev/admin/files/api/orders_api/create_order.php',
        //           data: this.markerData,
        //           config: { headers: {'Content-Type': 'multipart/form-data' }}
        //       })
        // axios({
        //           method: 'post',
        //           url: 'http://fishyutt.xyz/dev/admin/files/api/orders_api/create_order.php',
        //           data: this.videoData,
        //           config: { headers: {'Content-Type': 'multipart/form-data' }}
        //       })
        console.log('theData = '+ theData)
        // axios.post('http://fishyutt.xyz/dev/admin/files/api/orders_api/insert_order_card.php', theData, config)
        //   .then((result) => {

        //     // const data = result.data
        //     // console.log('data-------------'+result)
        //     console.log(result.data)
        //       console.log('sccess')
        //     this.isLoading = false
        // //   })
        //  let formData = new FormData()
        //  formData.append('data', rawData)
        //   formData.append('name_img', this.markerData, this.markerData.name)
        //   formData.append('name_vdo', this.videoData, this.videoData.name)
        
        // console.log(this.markerData.name)
        // console.log(formData)
        // try {
        // axios.post('http://fishyutt.xyz/dev/admin/files/api/orders_api/create_order.php', formData)
        //   .then((result) => {

        //     // const data = result.data
        //     // console.log('data-------------'+result)
        //     console.log(result)
        //     console.log(result.data)
        //       console.log('sccess')
        //     this.isLoading = false
        //   })
        
        
         axios({
                  method: 'post',
                  url: 'https://fishyutt.xyz/dev/admin/files/api/orders_api/insert_order_card.php',
                  data: theData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then((result) => {
              console.log(result)
              console.log('sccess')
              // this.$router.push( {name:'Order'})
              this.isLoading = false
          })
          .catch((error) => {
            console.log('dataerror--------'+error)
            console.log('dataerror--------'+error.response)
            this.isLoading = false
          })
    }
  }
};
</script>
<style>
.input-none input[type="file"] {
  display: none;
}
#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
} */
</style>
