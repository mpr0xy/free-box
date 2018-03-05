<template>
  <div class="item-img">
    <div class="img-wrapper" 
      v-on:mousedown="mousedown"
      v-on:mousemove="mousemove"
      v-on:mouseup="mouseup"
      v-on:mouseover="mouseover"
      v-bind:style="styleObject"
    >
      <img :src="img.src" ondragstart="return false">
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .item-img {
    position: relative;
    width: 100%;
  }
  .img-wrapper {
    position: absolute;
    // border: 1px solid red;
  }
  body{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
</style>
<script type="text/ecmascript-6">
  import api from '../assets/script/api';
  export default{
    name: "ItemImg",
    props: [
      'img'
    ],
    data(){
      return{
        styleObject: {},
        moving: false,
        startX: 0,
        startY: 0,
        oldX: 0,
        oldY: 0
      }
    },
    mounted() {
      this.styleObject = {
        top: '0px',
        left: '0px'
      }
    },

    methods: {
      mousedown: function(event) {
        console.log('mousedown');
        this.moving = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.oldX = this.styleObject.left;
        this.oldY = this.styleObject.top;
        event.currentTarget.style['outline'] = '1px solid red';
        this.styleObject['outline'] = '1px solid red';
      },
      mousemove: function(event) {
        var xPoint = event.clientX;
        var yPoint = event.clientY;
        var _x = xPoint - this.startX;
        var _y = yPoint - this.startY;
        // console.log(parseInt(this.oldX) + _x);
        // console.log(parseInt(this.oldY) + _y);
        if (this.moving) {
          this.styleObject.left = (parseInt(this.oldX) + _x) + 'px';
          this.styleObject.top = (parseInt(this.oldY) + _y) + 'px';
        }
        // console.log('mousemove');
      },
      mouseup: function(event) {
        event.currentTarget.style['outline'] = 'none';
        this.moving = false;
        this.$nextTick(() => {
          this.styleObject.outline = 'none';
        })
        console.log('mouseup')
      },
      mouseover: function(event) {
        this.moving = false;
      }
    },
    components:{

    }
  }
</script>
