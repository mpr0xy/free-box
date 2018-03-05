<template>
  <div id="box-render">
    <div class="box" @dragover.prevent @drop.prevent @dragenter.prevent @drop="this.ondrop" @dragover="this.ondragover" @dragenter="this.ondragenter">
      <img class="bg" v-if="store.backgroundImg" :src="store.backgroundImg" />
      <ItemImg v-for="imgItem in store.boxArray" :key="imgItem.id" :img="imgItem"></ItemImg>
      <!--<ItemImg img-src="http://imgsize.ph.126.net/?imgurl=http://img0.ph.126.net/rgYRPDZPVsNjYJzIwKYRfg==/6632048530070693067.jpg_188x188x1.jpg"></ItemImg>-->
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  body{
    background-color:#ff0000;
  }
  #box-render {
    margin: 40px;
  }
  .box {
    position: relative;
    width: 375px;
    height: 608.5px;
    border: 1px solid #cecece;
    overflow: hidden;
  }
</style>
<script type="text/ecmascript-6">
  import api from '../assets/script/api';
  import ItemImg from './ItemImg.vue';
  import store from '../store/index';

  export default{
    name: "BoxRender",
    data(){
      return{
        store: store
      }
    },
    mounted() {
      
    },

    methods: {
      ondrop(e) {
        var self = this;
        e.preventDefault();
        var f = e.dataTransfer.files[0];  
        // 这时已经获取到文件了，具体想要用第几个文件自己处理，发post请求后端处理就行了！
        
        // 下面是图片获取到之后显示在imgContainer中的流程
        var fileReader = new FileReader();
        fileReader.onload=function(){
          self.store.boxArray.push({
            id: (new Date()).getTime(),
            src: fileReader.result,
		        styleObject: {}
          })
          // imgContainer.innerHTML = "<img src=\""+fileReader.result+"\">"
        }
        fileReader.readAsDataURL(f);
      },
      ondragenter(e) {
        e.preventDefault();
        console.log(e);
      },
      ondragover(e) {
        e.preventDefault();
        console.log(e);
      }
    },
    components:{
      ItemImg: ItemImg
    }
  }
</script>
