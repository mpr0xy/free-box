<template>
    <div>
        模版
        <a href="" @click="goTest">跳转</a>
    </div>

</template>
<style rel="stylesheet/scss" lang="scss">



</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },

        methods: {
            goTest($e){
                $e.preventDefault();
                let lastPath = this.$route.path.split('test/')[1];
                console.log(lastPath);

                if(lastPath == '456'){
                    this.$router.push({ name: 'test', params: { id: 123 }});
                }else {
                    this.$router.push({ name: 'test', params: { id: 456 }});
                }
//                this.$router.push({ path: 'test', query: { userId: 123 }})
            },

            fetchData() {

            }

        },

        watch: {
            '$route' (to, from) {
                console.log(to, from)
            }
        },

        //

        components:{

        }
    }
</script>
