<template>
<div class="bg-payment">
    <div class="fontth pt-5 pb-5" style="min-height:567px">
        <b-container>
        <b-card text-variant="black" :header="'ชำระเงิน '+orderId" class="text-center signin-group " style="width:50%">
            <h5 class="cblue">บัตรเดบิต</h5>
        <div style="width:auto;height: 40px">
            <p class="left mb-1 mr-3" style="font-size:14px">เลือกชนิดบัตร</p><div v-if="eTypeCard" class="cred">{{eTypeCard}}</div>
            <div class="left">
                <b-form-radio-group  id="typecard" v-model="typeCard" name="typecard" >
                <b-form-radio value="visa" ><i class="fab fa-cc-visa" style="font-size:24px;"></i></b-form-radio>
                <b-form-radio value="mastercard" ><i class="fab fa-cc-mastercard" style="font-size:24px;"></i></b-form-radio>
                </b-form-radio-group>
            </div>
        </div>
        <p class="left mb-1 " style="font-size:14px">ธนาคาร</p><div v-if="eBankName" class="cred left">{{eBankName}}</div>
        <!-- <b-form-input v-model="bankName" type="text" placeholder="krungthai bank" class="signin-input mb-3"></b-form-input> -->
        <b-form-select v-model="bankName" :options="bankName2" class="mb-3 yr-select" >
                        <template slot="first">
                        <option :valueBank="null" disabled>-- เลือกธนาคาร --</option>
                        </template>
        </b-form-select>
        <p class="left mb-1" style="font-size:14px">ชื่อบนบัตร</p><div v-if="eNameOnCard" class="cred left">{{eNameOnCard}}</div>
        <b-form-input v-model="nameOnCard" type="text" placeholder="Suttipong Senasuttiphan" class="signin-input mb-3"></b-form-input>
        <p class="left mb-1" style="font-size:14px">เลขบนบัตร</p><div v-if="eBankNumber" class="cred left">{{eBankNumber}}</div>
        <b-form-input v-model="bankNumber" :state="numcardStatus" type="text" :maxlength="maxNumCard" placeholder="1234 4567 8912 3456" class="signin-input mb-3" style="width:100%"></b-form-input>
        <p class="left mb-1" style="font-size:14px">วันที่หมดอายุ</p><div v-if="eCardDate" class="cred left">{{eCardDate}}</div>
        <vue-monthly-picker
        v-model="cardDate" dateFormat="MM/YY">
        </vue-monthly-picker>
        <!-- <b-form-input v-model="cardDate" type="text" placeholder="08/20" class="signin-input mb-3 left mr-3" style="width:"></b-form-input> -->
        <p class="mb-1 left" style="font-size:14px">cvv *ด้านหลังบัตร</p><div v-if="eCvv" class="cred left">{{eCvv}}</div>
        <b-form-input v-model="cvv" :state="cvvStatus" :maxlength="maxCvv" type="password" placeholder="เลข3ตัว" class="signin-input mb-3 " style=""></b-form-input>
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
        <div class="mt-4">
            <!-- v-b-modal.checkC  -->
        <b-button class="yr-button"  @click="checkPayment()">ยืนยัน</b-button>
        <b-button class="yr-button" style="background-color:#999; border:none" @click="cancer()">ยกเลิก</b-button>
        </div>
      </b-card>
        </b-container>

        <b-modal id="checkC" ref="myModalRef" hide-footer title="ยืนยันการจ่ายเงิน" >
                  <p class="my-4 cred">ยืนยันการจ่ายเงิน</p>
                  <b-button @click="payment()" class="yr-button">ตกลง</b-button>
                  <b-button class="yr-button mr-3" @click="hideModal" style="background-color:#999; border:none">ยกเลิก</b-button>
        </b-modal>
    </div>
    </div>
</template>
<script>
/* eslint-disable */
import VueMonthlyPicker from 'vue-monthly-picker'
import Loading from 'vue-loading-overlay';
const axios = require('axios');
    export default {
    props:["orderId"],
      components: {
            Loading,
            VueMonthlyPicker
        },
  name: 'App',
  data(){
      return{
          isLoading: false,
          bankName: null,
          valueBank: null,
          nameOnCard: 'Suttipong Senasuttiphan',
          bankNumber: '4234456789123456',
          cardDate: '',
          maxCvv: 3,
          maxNumCard: 16,
          cvv: '',
          typeCard: 'visa',
        //   cvvStatus: false,
          bankName2: [
               {
                    text:'ธนาคารกรุงไทย',
                    value: 'krungthai',
                },
                {
                    text:'ธนาคารกสิกรไทย',
                    value: 'kasikornthai',
                },
                {
                    text:'ธนาคารกรุงเทพ',
                    value: 'bangkokbank',
                },
                {
                    text:'ธนาคารไทยพาณิชย์',
                    value: 'siamcommercialbank',
                }
          ],
          eTypeCard: '',
          eBankName: '',
          eNameOnCard: '',
          eBankNumber: '',
          eCardDate: '',
          eCvv: '',
          errors: []

      }
  },
  computed:{
      cvvStatus () {
          if(this.cvv.length == 3 && isNaN(this.cvv) == false){
              return true
          }else return false
    //   return this.cvv.length > 2 && ? true : false
    },
    numcardStatus(){
        if(this.bankNumber.length == 16 && isNaN(this.bankNumber) == false){
              return true
          }else return false
    }
    //   if(this.cvv.length == 3){
    //       this.cvvStatus = true
    //   }
  },
  mounted(){
      
  },
  methods:{
      checkPayment(){
          this.errors = []
          if(!this.typeCard){
              this.eTypeCard = '*กรุณาเลือกชนิดบัตร'
              this.errors.push('*กรุณาเลือกชนิดบัตร')
          }else this.eTypeCard = ''
          if(!this.bankName){
              this.eBankName = '*กรุณาเลือกชื่อธนาคาร'
              this.errors.push('*กรุณาเลือกชื่อธนาคาร')
          }else this.eBankName = ''
          if(!this.nameOnCard){
              this.eBankName = '*กรุณาใส่ชื่อบนบัตร'
              this.errors.push('*กรุณาใส่ชื่อบนบัตร')
          }else this.eBankName = ''
          if(!this.bankNumber|| this.bankNumber.length != 16|| isNaN(this.bankNumber) == true){
              this.eBankNumber = '*เลขบัตรไม่ถูกต้อง'
              this.errors.push('*เลขบัตรไม่ถูกต้อง')
          }else this.eBankNumber = ''
          if(!this.cardDate){
              this.eCardDate = '*วันหมดอายุบัตรไม่ถูกต้อง'
              this.errors.push('*วันหมดอายุบัตรไม่ถูกต้อง')
          }else this.eCardDate = ''
          if(!this.cvv || this.cvv.length !=3 || isNaN(this.cvv) == true){
              this.eCvv = '*CVV ไม่ถูกต้อง'
              this.errors.push('**CVV ไม่ถูกต้อง')
          }else this.eCvv = ''

          if(!this.errors.length){
              this.$refs.myModalRef.show()
          }
      },
      payment(){
        this.$refs.myModalRef.hide()
        this.isLoading = true
        var theData = new FormData();
        theData.append('order_id',this.orderId);
        theData.append('payment_name',this.nameOnCard);
        theData.append('payment_card',this.bankName);
        theData.append('payment_date',this.cardDate);
        theData.append('payment_cvv',this.cvv);
        axios({
                  method: 'post',
                  url: 'http://fishyutt.xyz/dev/admin/files/api/orders_api/update_order_payment.php',
                  data: theData,
                  config: { headers: {'Content-Type': 'multipart/form-data' }}
              })
              .then((result) => {
              console.log(result)
              console.log('sccess')
              this.$router.push( {name:'Order'})
              this.isLoading = false
          })
          .catch((error) => {
            console.log('dataerror--------'+error)
            this.isLoading = false
          })
      },
      cancer(){
          this.$router.push( {name:'Home',})
      },
      hideModal () {
      this.$refs.myModalRef.hide()
    }
  }
}    
</script>
<style>
.helper {
    display: table-cell;
    vertical-align: middle;
  }
</style>
