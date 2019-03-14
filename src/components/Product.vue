<template>
<div >
    <b-container class="fontth">
      <h1 class="mt-4 mb-5 center">เลือกสินค้าของคุณ</h1>
      <div>
        <b-row>
          <b-col >
            <div class="card-item-product-container object-slide-right mr-3" style="right:0">
              <div class="card-item-product-box-top center">
                  <img src="../assets/product/cardicon.png" class="icon-img-in-card">
              </div>
              <div class="card-item-product-box-bottom">
                <b-container class="mt-5 text-in-card ">
                  <p class="ml-3 mr-3">สร้างการ์ดเชิญของคุณให้ไม่เหมือนใครโดยใช้เทคโนโลยี AR ได้ที่นี่</p>
                </b-container>
              </div>
              <!-- <b-button class="button-on-card button-slide-top font-hover" @click="$router.push('/Create')">คลิกเลย</b-button> -->
              <b-button class="button-on-card button-slide-top font-hover" @click="$router.push('/CreateCard')">คลิกเลย</b-button>
            </div>
          <!-- <router-link :to="productList[0].pLink">
          <div class="product-box slide-top ">
          <img :src="productList[0].pImg" class="mb-5 product-select" v-b-tooltip.hover :title="productList[0].pName">
          <div class="product-hide-box">
                    <div class="text-on-product" ><h1>Card</h1></div>
                  </div>
            </div>
          </router-link> -->
          </b-col>
          <b-col>
            <div class="card-item-product-container object-slide-left ml-3">
              <div class="card-item-product-box-top center">
                  <img src="../assets/product/bookicon.png" class="icon-img-in-card">
              </div>
              <div class="card-item-product-box-bottom">
                <b-container class="mt-5 text-in-card ">
                  <p class="ml-3 mr-3">เปลี่ยนรูปภาพบนโฟโต้บุ๊คของคุณให้เคลื่อนไหวได้ด้วยเทคโนโลยี AR ได้ที่นี้</p>
                </b-container>
              </div>
              <b-button class="button-on-card font-hover" @click="$router.push('/CreatePhotobook')">คลิกเลย</b-button>
            </div>
            <!-- <router-link :to="productList[1].pLink" >
            <div class="product-box slide-top ">
            <img :src="productList[1].pImg" class="mb-5 product-select " v-b-tooltip.hover :title="productList[1].pName">
            <div class="product-hide-box">
                    <div class="text-on-product" ><h1>Photobook</h1></div>
              </div>
            </div>
          </router-link> -->
          </b-col>
        </b-row>
      </div>
    </b-container>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Product',
  data () {
    return {
      upHere: false,
      productList:[
          {
            pName: 'Card',
            pImg: require('../assets/product/card.png'),
            pLink: '/Create'
          },

          {
            pName: 'Photobook',
            pImg: require('../assets/product/photobook.jpg'),
            pLink: '/CreatePhotobook'
          },
          ]
    }
  }
}
</script>

<style>
/* .product-select{
  border-radius: 10px;
  background-color: #333333;
  opacity: 1;
  z-index: 1;
} */
/* .product-select:hover {
  opacity: 0.5;
  background-color: #333333;
  z-index: 2 !important;
} */

/* .item:hover{
  border-radius: 10px;
  width: 100%;
  height: 100%;
  z-index: 1;
} */
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: #008CBA;
}
.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.item:hover .overlay {
  opacity: 1;
}
</style>
