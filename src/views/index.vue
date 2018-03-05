<template>
    <div id="index">
        <box-render></box-render>
    </div>
</template>
<style scoped>
    body{
        background-color:#ff0000;
    }
    .test {
        animation: flash 1s;
    }
    @keyframes flash {
        from, 50%, to {
            opacity: 1;
        }

        25%, 75% {
            opacity: 0;
        }
    }
</style>
<script type="text/ecmascript-6">
    import api from '../assets/script/api';
    import BoxRender from './BoxRender.vue';

    export default{
        data(){
            return{
            }
        },

        mounted() {

        },

        methods: {

        },
        components:{
            BoxRender:BoxRender
        }
    }
</script>
