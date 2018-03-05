/**
 * Created by codoon on 16/11/30.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../views/index.vue';
import test from '../views/test.vue';
import p2 from '../views/p2.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { name: 'index', path: '/', component: index },
        { name: 'test', path: '/test/:id', component: test },
        { name: 'testp2', path: '/p2', component: p2 }
    ]
});



// const router = new VueRouter({
//   mode: 'history',
//   base: __dirname,
//   routes: [
//     { name:'index', path: '/', component: index },
//     { name:'category', path: '/category/:id(\\d+)', component: index },
//     { name:'search', path: '/search/:qs', component: index },
//     { name:'article', path: '/article/:id', component: article, meta: { scrollToTop: true } },
//     { name:'list', path: '/admin/list/:page(\\d+)', component: adminList, meta: { scrollToTop: true }, beforeEnter: guardRoute },
//     { name:'post', path: '/admin/post', component: adminPost, meta: { scrollToTop: true }, beforeEnter: guardRoute },
//     { name:'edit', path: '/admin/edit/:id/:page', component: adminEdit, meta: { scrollToTop: true }, beforeEnter: guardRoute }
//   ]
// })


export default router
