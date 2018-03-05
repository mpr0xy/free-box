<template>
    <div id="app">
        <!-- <loading v-show="store.loading"></loading> -->
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import 'mint-ui/lib/style.css';
    import api from './assets/script/api';

    import store from './store/index.js';
    import loading from './views/loading.vue';

    export default {
        data() {
            return {
                store: store
            }
        },   
        created() {
            
        },

        components: {
            loading: loading
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/reset.scss";
    @import "assets/styles/main.scss";
    html {
        font-size: 16px;
    }
    #app {
        overflow: hidden;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
