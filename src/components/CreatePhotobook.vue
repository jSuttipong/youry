<template>
  <div class="fontth">
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
                  accept=".avi,.flv,.mov,.mp4,.wmv.,.3gp,.mpg"
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
        <b-col >
          <b-container>
            <div style="display: flex; justify-content: center;">
              <vue-upload-multiple-image
              dragText="อัพโหลดรูปภาพของคุณ"
              upload-success="uploadImageSuccess"
              @before-remove="beforeRemove"
              edit-image="editImage"
              data-change="dataChange"
              browseText=''
              primaryText=''
              markIsPrimaryText=''
              popupText=''
                :data-images="images"
                ></vue-upload-multiple-image>
          </div>
          </b-container>
      </b-col>
      <b-col></b-col>
    </b-row>
    </b-container>
  </div>
</template>
<script>
/* eslint-disable */
import VueUploadMultipleImage from 'vue-upload-multiple-image'
const axios = require('axios');
export default {
  name: 'createPhotobook',
components: {
    VueUploadMultipleImage
  },
  data(){
    return{
      video: '',
      images: [],
      gallerys:[],
      commentsData: ''
      // uploadImageSuccess: ''
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
    uploadImageSuccess(formData, index, fileList) {
      console.log('data', formData, index, fileList)
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove (index, done, fileList) {
      console.log('index', index, fileList)
      var r = confirm("remove image")
      if (r == true) {
        done()
      } else {
      }
    },
    editImage (formData, index, fileList) {
      console.log('edit data', formData, index, fileList)
    },
    dataChange (data) {
      console.log(data)
    },
    // setDataGallerys(){
    //     this.gallerys = this.$refs.gallerysData.files;
    //     console.log(this.gallerys)
    // },
  },
  
}
</script>
