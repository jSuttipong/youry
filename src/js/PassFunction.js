/* eslint-disable */
export const PULL = {
    pullCreateCard(formData){
        axios({
            method: "post",
            url:
              "https://fishyutt.xyz/dev/admin/files/api/orders_api/insert_order_card.php",
            data: formData,
            config: { headers: { "Content-Type": "multipart/form-data" } }
          })
            .then(result => {
              console.log(result);
              console.log("sccess");
              console.log("pushData", result.data);
              this.$router.push({
                name: "OrderBill",
                params: { orderData: result.data }
              });
              window.scrollTo({ top: 0, behavior: 'smooth' })
              this.isLoading = false;
            })
            .catch(error => {
              console.log("dataerror--------" + error);
              this.isLoading = false;
              this.$refs.reData.show();
            });
    }
}