<template>
<div>
    <!-- {{imgData}} -->
    <!-- <img :src="imagePath" width="700" height="auto"> -->
    <!-- <div v-for="Item in imgData " :key="Item">
    </div> -->
    <div style="width:1000px;height:auto">
        {{imgData}}
    </div>
    <img :src="imgData" width="700" height="auto">
</div>
</template>
<script>
/* eslint-disable */
     export default {
    props: ["imgData","imageType"],
    name: 'app',
    data(){
        return{
            imagePath:''
        }
    },
     }
</script>