<template>
    <div>
        <b-container class="fontth mt-5">
            <h1>เลือก Layout ของคุณ</h1>
            <div class="layout-main-space">
                <div v-for="layoutItem in Layouts" :key="layoutItem" class="layout-space mb-5 mt-5 left mr-5">
                    <div>
                        <!-- <router-link to="/Create" > -->
                        <router-link :to="{ name : 'Create', params:{Layouts: layoutItem}}">
                            <img :src='layoutItem.limg'>
                        </router-link>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'Layout',
  data(){
    return {
        Layouts:[
            {
                lName: 'Layout1',
                limg: require('../assets/product/layout1ex.png')
            },
            // {
            //     lName: 'Layout2',
            //     limg: require('../assets/product/layout1ex.png')
            // },
            // {
            //     lName: 'Customlayout',
            //     limg: require('../assets/product/customlayout.png')
            // }
        ],
    }
  }
}
</script>
<style>
    .layout-space{
        height: 400px;
        width: 300px;
        border: dotted 3px #333;
        border-radius: 10px;
        padding: 0;
        text-align: center;
    }
    .layout-space img{
        height: 400px;
        width: 290px;
    }
    .layout-main-space{
        min-height: 500px;
        width: 100%;
        /* position: absolute; */
        
    }
</style>
