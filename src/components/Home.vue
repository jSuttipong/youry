<template>
<!-- class="background-home" -->
  <div >
    <parallax fixed style="position:absolute;">
    <img src="../assets/bg/bgpara.gif">
  </parallax>
    <div>
  <b-container fluid>
  <b-row>
      <b-col md="1">
      </b-col>
      <!-- style="background-color:#333;border-radius: 5px;box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);" -->
      <b-col >
        <b-row>
          <b-col md="6" class="fontth fs24 cwhite">
            <h1 class="mt-5">Youry คืออะไร?</h1>
            <p> เราคือแพลตฟอร์มที่รับทำสื่อสิ่งพิมพ์ในรูปแบบออนไลน์
              โดยเราได้นำเทคโนโลยีAR มาใช้งานร่วมกับสื่อสิ่งพิมพ์
              ทำให้คุณได้รับประสบณ์ใหม่ๆ ตอนนี้เราได้ให้บริการโฟโต้บุ๊ค
              และ การ์ดเชิญสำหรับงานต่างๆ ท่านที่สนใจสามารถเลือกชม
              สินค้าได้จากทางเว็บไซต์นี่เลย
            </p>
            <br>
            <p>สำหรับท่านที่ไม่เข้าใจว่าAR คือะไร <a href="#" class="cred">คลิกเลย</a></p>
          </b-col>
          <!-- <b-col md="1"></b-col> -->
          <b-col md="6" left>
            <parallax-container>
            <parallax-element :parallaxStrength="-15" :type="'depth'">
                <img src="../assets/banner3.png" class="mt-3 card-show-home">
            </parallax-element>
          </parallax-container>
            </b-col>
        </b-row>
        <p class="fontth fs32 cwhite">สั่งสินค้าได้ง่ายๆเพียงแค่</p>
        <b-row>
          <div v-for="(item) in items" class="fontth cwhite ar-for-sample" :key="item.id">
            <b-col>
              <div class="flowbox">
                {{item.numFlow}}
            <br>
            <img :src="item.iconFlow">
            <br>
            <br>
            {{item.nameFlow}}
          </div>
            </b-col>
        </div>
          <swiper :options="swiperOption" class="box-display-phone">
            <swiper-slide v-for="(item) in items" class="fontth cwhite" :key="item.id">
              <div class="flowbox">
            {{item.numFlow}}
            <br>
              <img :src="item.iconFlow">
            <br>
            <br>
            {{item.nameFlow}}
          </div>
              </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        </b-row>
        <!-- v for -->
      </b-col>
      <b-col md="1">
      </b-col>
    </b-row>
    </b-container>
    <b-container>
    </b-container>
    <div class="bgartest mt-5 center cwhite fontth">
      <b-container>
        <h1 class="cwhite mt-5">AR Test</h1>
        <p class="fs24 mt-3">คุณสามารถนำโทรศัพท์ของคุณที่มีแอปพลิเคชั่น Youry มาสแกนเพื่อดู AR
        </p>
        <div class="center pb-3">
          <img src="../assets/qrcode.jpeg" style="width:150px; height:150px;">
              ทดลองใช้AR ดาวน์โหลดได้ที่
          <img src="../assets/gplogo.png" style="width:auto; height:24px;background-color:#fff;padding:1px;border-radius:5px">
        </div>

      </b-container>
    </div>
    <div class="fontth" style="height: auto;background-color:#fff">
      <b-container class="ar-for-sample pb-5">
        <h1 class=" pt-5 center">ทดลองสแกน AR ได้ที่นี่</h1>
        <b-row>
          <b-col>
            <h2 class="mt-5">ตัวอย่าง AR Cover Book</h2>
            <p class="fs24">เปลี่ยนหนังสือของคุณ ไม่ให้หยุดแค่ภาพนิ่ง
            คุณสามารถเลือกที่สร้าง AR เหมาะสมกับ
            ความต้องการของคุณ ทั้งการให้เล่นวีดีโอ
            หรือการทำให้มีมิติมากขึ้น</p>
          </b-col>
          <b-col>
            <img src="../assets/arcover.jpg" style="width:auto; height:350px;box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
    border: 1px solid rgba(0, 0, 0, 0.10);" class="mt-5">
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <img src="../assets/arcard.png" style="width:auto; height:500px;box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.10);
    border: 1px solid rgba(0, 0, 0, 0.10);" class="mt-5">
          </b-col>
          <b-col>
            <h2 class="mt-5">ตัวอย่าง Card</h2>
            <p class="fs24">ทำการเชิญของคุณให้สามารถบอกตำแหน่งที่จัดงานของคุณได้โดยที่
          ไม่ต้องค้นหาด้วยตัวเอง เพิ่มรายละเอียดของงานและ
          พรีเซนในแบบของคุณ</p>
          </b-col>
        </b-row>
      </b-container>
    </div>
    </div>
  </div>

</template>
<script>
/* eslint-disable */
import Parallax from 'vue-parallaxy'
import HomeContent from '@/components/HomeContent'
// import {userChack} from '@/components/Signin'
  export default {
    props: ["userData","userSignin"],
    components: {
      Parallax
    },
    name: 'Home',
    // props:['userChack'],
    data() {
      return {
        mailContact: '',
        items: [{
            numFlow: '1',
            iconFlow: require('../assets/flowicon/icon1.png'),
            nameFlow: 'เลือกการ์ดหรือ Photobook'
          },
          {
            numFlow: '2',
            iconFlow: require('../assets/flowicon/icon2.png'),
            nameFlow: 'เลือกแบบที่สนใจ'
          },
          {
            numFlow: '3',
            iconFlow: require('../assets/flowicon/icon3.png'),
            nameFlow: 'อัพโหลดรูปภาพและวีดีโอของคุณ'
          },
          {
            numFlow: '4',
            iconFlow: require('../assets/flowicon/icon4.png'),
            nameFlow: 'ตรวจสอบและชำระเงิน'
          },
          // {
          //   numFlow: '5',
          //   iconFlow: require('../assets/flowicon/icon5.png'),
          //   nameFlow: 'ดูต้นแบบและสั่งปรับแก้'
          // },
          {
            numFlow: '6',
            iconFlow: require('../assets/flowicon/icon6.png'),
            nameFlow: 'รอทีมงานติดต่อไปเมื่อเสร็จสิ้น'
          },
        ],
        productList: [{
            pName: 'photobook',
            pImg: require('../assets/product/bookcover.png')
          },
          {
            pName: 'photobook',
            pImg: require('../assets/product/card.png')
          },
          {
            pName: 'photobook',
            pImg: require('../assets/product/card2.png')
          },
        ],
        imgSelect: null,
        coverSelected: null,
        bSizeSelected: null,
        pageSelected: null,
        coverType: [{
            value: null,
            text: 'Please select an option'
          },
          {
            value: 'ปกแข็ง',
            text: 'ปกแข็ง'
          },
          {
            value: 'ปกอ่อน',
            text: 'ปกอ่อน'
          },
        ],
        bsType: [{
            value: null,
            text: 'Please select an option'
          },
          {
            value: '6x6',
            text: '6x6 นิ้ว'
          },
          {
            value: '8x8',
            text: '8x8 นิ้ว'
          },
        ],
        pageType: [{
            value: null,
            text: 'Please select an option'
          },
          {
            value: '30',
            text: '30'
          },
          {
            value: '40',
            text: '40'
          },
        ],
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
          pagination: {
            el: '.swiper-pagination'
          }
        }
        

      }
    },
    methods:{
      cSignout(){
        console.log(this.$session.getAll())
        this.$session.clear()
        this.$session.destroy()
        
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }

  }

</script>

<style>
  @import '../assets/Style.css';

  /* body {
    background-image: url("../assets/bg.png")
  } */
  .background-home{
    background-image: url("../assets/bg.png");
    background-repeat: no-repeat;
    width: 100%;
  }

  .f-left {
    float: left;
  }

  .bg-info {
    background-color: white !important;
  }

  .navbar-dark .navbar-nav .nav-link {
    color: #707070;
  }

  .flowbox {
    background: #9CC7FF;
    width: 250px;
    height: 250px;
    border-radius: 1000px;
    /* float: left; */
    text-align: center;
    margin: 5px;
    padding: 30px
  }

  .product-box {
    height: 200px;
    width: 260px;
    background-color: #707070;
    border-radius: 10px;

  }

  .email{
    width: 200px;
    margin-right: 10px
  }

  .navbar-nav .nav-link:hover{
    color: #007bff !important
  }
</style>
