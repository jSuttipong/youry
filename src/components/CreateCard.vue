<template>
    <div class="fontth">
        <b-container class="mt-4">
            <h3 class="center">เลือก Package ที่คุณต้องการ</h3>
            <div class="mt-5">
                <b-row>
                <b-col>
                    <div class="card-item-product-container object-slide-right mr-3" style="right:0">
                    <div class="card-item-product-box-top center">
                        <img src="../assets/product/package1.png" class="icon-img-in-card">
                    </div>
                    <div class="card-item-product-box-bottom">
                        <b-container class="mt-4 text-in-card left">
                            <h5 class="center">Basic Package</h5>
                            <vs-divider class="pr-3 pl-3"/>
                            <p class="ml-3">ราคา 3,000 บาท</p>
                            <ul class="ml-3" style="margin-top: -20px">
                                <li>
                                    • วีดีโอ 1 ไฟล์
                                </li>
                                <li>
                                    • ปุ่ม 2 ปุ่ม ได้แก่ 1.แกลลอรี่, 2.Contact
                                </li>
                            </ul>
                        </b-container>
                    </div>
                    <b-button class="button-on-card button-slide-top font-hover" @click="$router.push('/CardPackage1')">เลือก</b-button>
                    </div>
                </b-col>
                <b-col>
                    <div class="card-item-product-container object-slide-left ml-3">
                    <div class="card-item-product-box-top center">
                        <img src="../assets/product/package2.png" class="icon-img-in-card">
                    </div>
                    <div class="card-item-product-box-bottom">
                        <b-container class="mt-4 text-in-card ">
                            <h5 class="center">For you Packages</h5>
                            <vs-divider class="pr-3 pl-3"/>
                        <p class="ml-3">ราคา 3,500 บาท</p>
                        <ul class="ml-3" style="margin-top: -20px">
                                <li>
                                    • วีดีโอ 1 ไฟล์
                                </li>
                                <li>
                                    • ปุ่ม 4 ปุ่ม ได้แก่ 1.แกลลอรี่, 2.โลเคชั่น , 3.Contact , 4.การเข้าร่วม
                                </li>
                            </ul>
                        </b-container>
                    </div>
                    <b-button class="button-on-card font-hover" @click="$router.push('/CardPackage2')">เลือก</b-button>
                    </div>
                </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    data(){
        return {
            
        }
    }
}
</script>
