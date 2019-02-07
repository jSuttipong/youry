<template>
<div class="bg-signin">
    <div class="signin fontth" style="position:relative;padding-top:100px;padding-bottom:100px;">
    <div class="helper">
      <b-card text-variant="black" header="Sign in" class="text-center signin-group">
        <b-form-input v-model="email" type="text" placeholder="อีเมล์" class="signin-input"></b-form-input>
        <div v-if="eEmail != ''" class="cred err-text">*{{eEmail}}</div>
        <b-form-input v-model="password" type="password" placeholder="พาสเวิร์ด" class="signin-input"></b-form-input>
        <div v-if="ePassword != ''" class="cred err-text">*{{ePassword}}</div>
        <b-form-input v-model="cpassword" type="password" placeholder="ยืนยันพาสเวิร์ด" class="signin-input"></b-form-input>
        <div v-if="eCpassword != ''" class="cred err-text">*{{eCpassword}}</div>
        <b-form-input v-model="fname" type="text" placeholder="ชื่อ" class="signin-input"></b-form-input>
        <div v-if="eFname != ''" class="cred err-text">*{{eFname}}</div>
        <b-form-input v-model="lname" type="text" placeholder="นามสกุล" class="signin-input"></b-form-input>
        <div v-if="eLname != ''" class="cred err-text">*{{eLname}}</div>
        <b-form-input v-model="phoneNumber" type="text" maxlength="10" placeholder="เบอร์โทรศัพท์" class="signin-input"></b-form-input>
        <div v-if="ePhoneNumber !=''" class="cred err-text">*{{ePhoneNumber}}</div>
        <b-button class="yr-button" @click="checkForm()" type="submit">ตกลง</b-button>
        <!-- <b-button class="yr-button" @click="cLogout()" type="submit">Sign Out</b-button> -->
      </b-card>
      <div class="vld-parent">
        <loading :active.sync="isLoading"
        :can-cancel="false"
        loader='dots'
        color= '#106FFF'
        backgroundColor= '#ffffff'
        :is-full-page="true"></loading>
    </div>
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
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      cpassword: '',
      fname:'',
      lname: '',
      phoneNumber:'',

      eEmail:'',
      ePassword: '',
      eCpassword: '',
      eFname:'',
      eLname: '',
      ePhoneNumber:'',

      regisDate: new Date(),
      isLoading: false,
      checkError: false,
      errors: []

    }
  },
  methods:{
      submit(){
        this.isLoading = true;
        var querystring = require('querystring');

        var chackEP = querystring.stringify({
          user_email: this.email,
          user_password: this.password,
          user_fname: this.fname,
          user_lname: this.lname,
          user_mobile: this.phoneNumber,
          user_reg_date: this.regisDate
        });
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        
        axios.post('https://fishyutt.xyz/dev/admin/files/api/users_api/create_user.php', chackEP, config)
          .then((result) => {
              console.log(result)
              console.log('sccess')
              var chackEP2 = querystring.stringify({
                user_email: this.email,
                user_password: this.password,
              });
              axios.post('https://fishyutt.xyz/dev/admin/files/api/users_api/check_user_login.php', chackEP2, config)
               .then((result) => {
                  this.$session.start()
                  this.$session.set('session', true)
                  this.$session.set('sessionData', result.data)
                  console.log(this.$session.getAll())
                this.$router.push( {name:'Home'})
                this.isLoading = false
               }).catch((error) => {
                // Do somthing
                console.log(error.response)
              })  
          })
          .catch((error) => {
            // Do somthing
            console.log(error.response)
          })
          
      },
      checkForm: function (e) {
      this.isLoading = true;
      this.eEmail=''
      this.ePassword= ''
      this.eCpassword= ''
      this.eFname=''
      this.eLname= ''
      this.ePhoneNumber=''

      this.errors = [];
      if (!this.password) {
        this.errors.push("กรุณาใส่ Password");
        this.ePassword = "กรุณาใส่ Password"
      }
      if (!this.cpassword) {
        this.errors.push("กรุณายืนยัน Password");
        this.eCpassword = "กรุณายืนยัน Password"
      }

      if (this.password != this.cpassword) {
        this.errors.push("Password ไม่ตรงกัน");
        this.ePassword = ''
        this.eCpassword = "Password ไม่ตรงกัน"
        
      }
      if (!this.fname) {
        this.errors.push("กรุณาใส่ชื่อ");
        this.eFname = "กรุณาใส่ชื่อ"
      }
      if (!this.lname) {
        this.errors.push("กรุณาใส่นามสกุล");
        this.eLname = "กรุณาใส่นามสกุล"
      }
      if (!this.phoneNumber) {
        this.errors.push("กรุณาใส่เบอร์โทรศัพท์");
        this.ePhoneNumber = "กรุณาใส่เบอร์โทรศัพท์"
      }
      if(isNaN(this.phoneNumber) == true||!this.cvv || this.cvv.length !=10){
        this.errors.push("เบอร์โทรศัพท์ไม่ถูกต้อง");
        this.ePhoneNumber = "เบอร์โทรศัพท์ไม่ถูกต้อง"
      }

      if (!this.email) {
        this.errors.push('กรุณาใส่ E-mail');
        this.eEmail = "กรุณาใส่ E-mail"
      } else if (!this.validEmail(this.email)) {
        this.errors.push('กรุณาใส่ E-mail ให้ถูกต้อง');
        this.eEmail = "กรุณาใส่ E-mail ให้ถูกต้อง"
      }
    
      if (!this.errors.length) {
        return this.submit()
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
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  }
}
</script>


<style>
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