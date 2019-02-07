<template>
<div>
  <div class="block-display-desktop">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
      crossorigin="anonymous">
    <b-navbar toggleable="md" type="dark" variant="light" style="box-shadow: 0px 1px 6px #888888; position:fixed;z-index:5 !important ; width:100%">
      <b-container style="padding-top:0;padding-bottom:5px">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand >
          <router-link to="/"><img src="./assets/logo.png" class="nav-logo"/></router-link>
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse" class="fontth">
          <b-navbar-nav>
          <vs-divider class="box-display-phone"/>
          <li style="list-style: none; "><router-link to="/" class="mr-3">หน้าแรก </router-link></li>
          <li style="list-style: none; "><router-link to="/Product" class="mr-3">สินค้า </router-link></li>
          <!-- <li style="list-style: none; "><router-link to="#" class="mr-3">ราคา </router-link></li> -->
          <!-- <li style="list-style: none; "><router-link to="#" class="mr-3">เกี่ยวกับเรา </router-link></li> -->
          <vs-divider class="box-display-phone"/>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <!-- {{this.$session.getAll()}} -->
                <router-link to="/Order"><b-button v-if="this.$session.get('session')== true" class="yr-button mr-2 bgblue">Order</b-button></router-link>
                <b-button v-if="this.$session.get('session')== true"  v-b-modal.checkSignOut class="yr-button">Sign Out</b-button>
                <router-link to="/Signin" v-else><b-button class="yr-button">Sign in</b-button></router-link>
                <div>
                <!-- Modal Component -->
                <b-modal id="checkSignOut" ref="modalSignOut" hide-footer title="Sign Out" >
                  <p class="my-4 cred">คุณต้องการออกจากระบบหรือไม่</p>
                  <b-button @click="cSignout()" class="yr-button">ตกลง</b-button>
                  <b-button class="yr-button2 right mr-3" @click="hideModal()" style="background-color:#999; border:none">ยกเลิก</b-button>
                </b-modal>
              </div>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <!-- navbar -->
    <div style="height:76px; width:100%"></div>
    <div class="vld-parent">
                    <loading :active.sync="isLoading"
                    :can-cancel="false"
                    loader='dots'
                    color= '#106FFF'
                    backgroundColor= '#ffffff'
                    :is-full-page="true"></loading>
    </div>
    <!-- router-view***************************************************************** -->
    <div class="block-display-desktop" style="position:relative;min-height:640px">
      <router-view/>
    </div>
    <!-- <div class="box-display-phone" style="position:relative;min-height:640px">
      <h1>ระบบยังไม่รองรับ Smartphone</h1>
    </div> -->
    <!-- Footer*********************************************** -->
    <div class="footer fontth cwhite pb-2" style=" position:relative; padding-top:1px">
      <b-container >
        <b-row class="mt-5" >
          <b-col md="4">
            <ul>
            <li v-for="footerItem in footerItem " :key="footerItem.id" >
              <a class="cwhite left" href="#" style="margin-right:20px ">{{footerItem.name}}</a>
            </li>
            </ul>
            <br>
          </b-col>
          <b-col md="4">
            <h5>ติดต่อเรา</h5>
            <p>เลขที่ 80 ถนนป๊อปปูล่า ต.บ้านใหม่
              อำเภอปากเกร็ด จังหวัดนนทบุรี 11120
              โทรศัพท์ 091-765-9890
              อีเมล์ customer@youry.com</p>
          </b-col>
          <b-col md="4" >
            <p >ติดตามข่าวสาร<a href=""><i class="fab fa-instagram" style="margin:0px 10px"></i ></a>
            <a href=""><i class="fab fa-facebook" style="margin:0px 10px"></i></a>
            <a href=""><i class="fab fa-twitter" style="margin:0px 10px"></i></a></p>
            <br>
            <b-form-input v-model="mailContact" type="text" placeholder="E-mail" class="email left"></b-form-input>
            <b-button class="yr-button mt-3">ส่ง</b-button>
          </b-col>
        </b-row>
            <p style="font-size:12px;"><i class="fas fa-copyright" style="font-size:12px; margin-top: 20px;"></i>2018 Youry, All rights reserved.</p>
      </b-container>
    </div>
  </div>
  <div class="box-display-phone fontth center-pages center">
    <b-container>
      <h2>ระบบยังไม่รองรับ Smartphone และ Tablet</h2>
    </b-container>
  </div>
  </div>
</template>

<script>
/* eslint-disable */
import Loading from 'vue-loading-overlay';
export default {
  components: {
    Loading
  },
  name: 'App',
  data(){
    return {
      footerItem: [{
            name: 'หน้าแรก'
          },
          {
            name: 'สินค้า'
          },
          {
            name: 'ราคา'
          },
          {
            name: 'เกี่ยวกับเรา'
          },
        ],
        mailContact: '',
        isLoading: false,
    }
  },
  methods:{
      cSignout(){
        this.isLoading = true
        console.log(this.$session.getAll())
        this.$session.clear()
        this.$session.destroy()
        this.$forceUpdate();
        this.hideModal()
        this.$router.push( {name:'Home'})
        setTimeout(() => {
          this.isLoading = false
        },700) 
      },
      hideModal () {
      this.$refs.modalSignOut.hide()
      

    },
    },
}
</script>

<style>

@import './assets/Style.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.bt-order{
  background-color: #777 !important;
  border: none
}
</style>
