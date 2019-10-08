<template>
    <div>
        <b-row>
          <b-col>
            <h5 class="fontth">วีดีโอ</h5>
            <div v-if="!marker_img1">
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
                <source :src="marker_img1" type="video/mp4">
              </video>
              <b-button @click="removeVideo" class="yr-button mt-2 mb-2">Remove Video</b-button>
            </div>
          </b-col>
          <b-col>
            <h5 class="fontth">รูป</h5>
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
                  @change="setDataGallerys"
                  accept=".png, .jpg, .jpeg, .gif, .tif"
                >
              </label>
            </form>
            <b-row>
              <b-col>
                <b-container>
                  <div v-for="(gallerysForShow,index) in gallerysForShow" :key="gallerysForShow.name">
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
                  </div>
                </b-container>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <!-- <b-row> -->
          <!-- <b-col>
            <h5 class="fontth">วีดีโอ</h5>
            <div v-if="!marker_img1">
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
                <source :src="marker_img1" type="video/mp4">
              </video>
              <b-button @click="removeVideo" class="yr-button mt-2 mb-2">Remove Video</b-button>
            </div>
          </b-col>
          <b-col>
            <h5 class="fontth">รูป</h5>
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
                  @change="setDataGallerys"
                  accept=".png, .jpg, .jpeg, .gif, .tif"
                >
              </label>
            </form>
            <b-row>
              <b-col>
                <b-container>
                  <div v-for="(gallerysForShow,index) in gallerysForShow" :key="gallerysForShow.name">
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
                  </div>
                </b-container>
              </b-col>
            </b-row>
          </b-col>
        </b-row><b-row>
          <b-col>
            <h5 class="fontth">วีดีโอ</h5>
            <div v-if="!marker_img1">
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
                <source :src="marker_img1" type="video/mp4">
              </video>
              <b-button @click="removeVideo" class="yr-button mt-2 mb-2">Remove Video</b-button>
            </div>
          </b-col>
          <b-col>
            <h5 class="fontth">รูป</h5>
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
                  @change="setDataGallerys"
                  accept=".png, .jpg, .jpeg, .gif, .tif"
                >
              </label>
            </form>
            <b-row>
              <b-col>
                <b-container>
                  <div v-for="(gallerysForShow,index) in gallerysForShow" :key="gallerysForShow.name">
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
                  </div>
                </b-container>
              </b-col>
            </b-row>
          </b-col>
        </b-row><b-row>
          <b-col>
            <h5 class="fontth">วีดีโอ</h5>
            <div v-if="!marker_img1">
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
                <source :src="marker_img1" type="video/mp4">
              </video>
              <b-button @click="removeVideo" class="yr-button mt-2 mb-2">Remove Video</b-button>
            </div>
          </b-col>
          <b-col>
            <h5 class="fontth">รูป</h5>
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
                  @change="setDataGallerys"
                  accept=".png, .jpg, .jpeg, .gif, .tif"
                >
              </label>
            </form>
            <b-row>
              <b-col>
                <b-container>
                  <div v-for="(gallerysForShow,index) in gallerysForShow" :key="gallerysForShow.name">
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
                  </div>
                </b-container>
              </b-col>
            </b-row>
          </b-col>
        </b-row> -->
    </div>
</template>
<script>
/* eslint-disable */
export default {
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
      marker_img1: "",
      marker_vdo1: "",
      marker_img2: "",
      marker_vdo2: "",
      marker_img3: "",
      marker_vdo3: "",
      marker_img4: "",
      marker_vdo4: "",
      marker_img5: "",
      marker_vdo5: "",
      countItem: 1,
      colorAlert: 'primary',
      activeAlert:false,
    };
  },
}
</script>
