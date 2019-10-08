/* eslint-disable */
export default {
    methods: {
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
    },
}