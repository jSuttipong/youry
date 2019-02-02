<template>
<div class="bg-signin">
  <div class="signin fontth " style="position:relative;padding-top:200px;padding-bottom:200px">
    <div class="helper " >
      <b-card text-variant="black" header="Sign in" class="text-center signin-group">
        <b-form-input v-model="email" type="text" placeholder="E-mail" class="signin-input"></b-form-input>
        <div v-if="eEmail != ''" class="cred err-text">*{{eEmail}}</div>
        <b-form-input v-model="password" type="password" placeholder="Password" class="signin-input"></b-form-input>
        <div v-if="ePassword != ''" class="cred err-text">*{{ePassword}}</div>
        <!-- <div v-if="checkError" class="cred">{{errors}}</div> -->
        <div v-if="checkError2" class="cred err-text">{{reportAlert}}</div>
        <div style="float:left;width:200px;height:30px;"><router-link to="/Register">create account</router-link></div>
        <b-button class="yr-button" @click="checkForm()" type="submit">Sign in</b-button>

         <div class="vld-parent">
        <loading :active.sync="isLoading"
        :can-cancel="false"
        loader='dots'
        color= '#106FFF'
        backgroundColor= '#ffffff'
        :is-full-page="true"></loading>
        </div>

        <!-- <bar-loader class="custom-class" :loading="loading" :size="150" :sizeUnit="px"></bar-loader> -->
        <!-- <b-button class="yr-button" @click="cLogout()" type="submit">Sign Out</b-button> -->
      </b-card>
      <!-- {{info}} -->
    </div>
  </div>
  </div>
</template>

<script>
/* eslint-disable */
import Loading from 'vue-loading-overlay';
const axios = require('axios');
    export default {
      components: {
            Loading
        },
  name: 'App',
  data(){
      return{
          email: null,
          password: null,
          reportAlert: '',
          userSignin: false,
          errors: [],
          checkError: false,
          checkError2: false,

          isLoading: false,
          eEmail: '',
          ePassword: ''
      }

      
  },
  
  methods:{
    checkForm: function (e) {
      this.isLoading = true;
      this.ePassword = '';
      this.eEmail = ''

      this.errors = [];
      this.reportAlert = '';
      if (!this.password) {
        this.errors.push("กรุณาใส่ Password");
        this.ePassword= 'กรุณาใส่ Password'; 
      }

      if (!this.email) {
        this.errors.push('กรุณาใส่ E-mail');
        this.eEmail = 'กรุณาใส่ E-mail'
      } else if (!this.validEmail(this.email)) {
        this.errors.push('กรุณาใส่ E-mail ให้ถูกต้อง');
        this.eEmail = 'กรุณาใส่ E-mail ให้ถูกต้อง'
      }
    
      if (!this.errors.length) {
        return this.cSignin()
         setTimeout(() => {
            this.isLoading = false
      },2000)
        // return true;
      }else{
          this.checkError= true
      }
      setTimeout(() => {
            this.isLoading = false
      },300)
      // if(this.error == []){
      //   this.cSignin()
      // }
      //  e.preventDefault(console.log("asdasd"));
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
      cSignin(){
        this.isLoading = false
        var querystring = require('querystring');
        var chackEP = querystring.stringify({
          user_email: this.email,
          user_password: this.password,
        });

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        this.isLoading = true;
        axios.post('http://fishyutt.xyz/dev/admin/files/api/users_api/check_user_login.php', chackEP, config)
          .then((result) => {
            console.log(result.data)
            console.log(result)
            if(result.data[0].result == true){
              // this.isLoading = true;
              // this.render()
              console.log('Login success')
              this.$session.start()
              // this.$session.set('session', result.data)
              this.$session.set('session', true)
              this.$session.set('sessionData', result.data)
              // Vue.$http.headers.common['Authorization'] = User_email + result.body
              // console.log(result)
              this.$router.push( {name:'Home',params: { userSignin: true}})
              console.log(this.$session.getAll())
            this.isLoading = false
              // this.isLoading = false;
              
            }
            else {
              this.checkError= false
              this.checkError2 = true;
              this.reportAlert = 'E-mail หรือ Password ไม่ถูกต้อง ลองใหม่อีกครั้ง'
              this.isLoading = false

            }
            
          })
          .catch((error) => {
            console.log(error.response)
          })
          
      },
      cLogout(){
        console.log(this.$session.getAll())
        this.$session.clear()
        this.$session.destroy()
        
      },
      
  },
  
}
</script>

<style>
@import 'vue-loading-overlay/dist/vue-loading.css';
  .signin {
    display: table;
    height: 100%;
    position: absolute;
    overflow: hidden;
    width: 100%;
  }

  .helper {
    display: table-cell;
    vertical-align: middle;
  }

  .signin-group {
    position: relative;
    width: 30%;
    top: -50%;
    margin: 0 auto;
  }

  .signin-input {
    margin-bottom: 20px
  }

  .yr-button {
    border-radius: 1000px;
    background: #ffa200;
    border-color: #ffa200;
    min-width: 100px;
    float: right;
  }
  .err-text{
    font-size: 12px;
    float: left;
    margin-top: -20px;
    margin-bottom: 20px;
  }

</style>
