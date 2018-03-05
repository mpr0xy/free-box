<template>
    <div id="loadPage">
        <p><span v-text="temp"></span>%100</p>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    #loadPage{
        width: 100%;
        height: 100%;
    }
</style>
<script ts>
    import list from '../assets/script/loadimg';
    import store from '../store/index';

    export default{
        data(){
            return {
                progress: 0,
                temp: 0
            }
        },

        mounted() {
            let imagesList = list.list;
            let len = imagesList.length;
            let images = [];
            let count = 0;
            this.progress = parseInt(count/len);

            if (imagesList.length > 0) {
                imagesList.forEach((item) => {
                    let imgUrl = require('../assets/images/' + item);
                    let img = document.createElement('img');
                    img.src = imgUrl;
                    images.push(img);
                })
            }
            var timer = setInterval( ()=>{
                var self = this;
                images.forEach(function(img, index){
                    if(img.complete){
                        count = count + 1;
                        images.splice(index, 1)
                    }
                });
                this.progress = parseInt(count * 100 / len);
                if(this.temp < this.progress - 1){
                    this.temp += 2;
                }

                if(this.progress == 100 && this.temp >= this.progress-1){
                    window.clearInterval(timer);
                    setTimeout( ()=>{
                        store.loading = false
                    }, 600 )
                }
                self.images = images;
            }, 33)
        }
    }
</script>
