/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomeContent from '@/components/HomeContent'
import Signin from '@/components/Signin'
import Register from '@/components/Register'
import Product from '@/components/Product'
import Create from '@/components/Create'
import Payment from '@/components/Payment'
import Layout from '@/components/Layout'
import ChackOrder from '@/components/ChackOrder'
import Order from '@/components/Order'
import OrderCreate from '@/components/OrderCreate'
import OrderBill from '@/components/OrderBill'
import CreatePhotobook from '@/components/CreatePhotobook'
import PageNotFound from '@/components/PageNotFound'
import Verify from '@/components/verify'
import PhotobookBill from '@/components/PhotobookBill'
import CreateCard from '@/components/CreateCard'
import CardPackage1 from '@/components/CardPackage1'
import CardPackage2 from '@/components/CardPackage2'


Vue.use(Router)
const NotFound = { template: '<p>Page not found</p>' }
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      // redirect: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/Signin',
      name: 'Signin',
      component: Signin,
      props: true
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      props: true
    },
    {
      path: '/Product',
      name: 'Product',
      component: Product,
      props: true,
      // children: [
        
      // ]
    },
    {
      path: '/Create',
      name: 'Create',
      component: Create,
      props: true,
      
    },
    {
      path: '/Payment',
      name: 'Payment',
      component: Payment,
      props: true
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout,
      props: true
    },
    {
      path: '/ChackOrder:imgData',
      name: 'ChackOrder',
      component: ChackOrder,
      props: true
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order,
      props: true
    },
    {
      path: '/OrderCreate',
      name: 'OrderCreate',
      component: OrderCreate,
      props: true
    },
    {
      path: '/OrderBill',
      name: 'OrderBill',
      component: OrderBill,
      props: true
    },
    {
      path: '/CreatePhotobook',
      name: 'CreatePhotobook',
      component: CreatePhotobook,
      props: true
    },{
      path: '/verify',
      name: 'verify',
      component: Verify,
      props: true
    },
    {
      path: '/PhotobookBill',
      name: 'PhotobookBill',
      component: PhotobookBill,
      props: true
    },
    {
      path: '/CreateCard',
      name: 'CreateCard',
      component: CreateCard,
      props: true,
      // children: [{
      //   path: '/CardPackage1',
      //   name: 'CardPackage1',
      //   component: CardPackage1,
      //   props: true
      // },
      // // {
      // //   path: '/CardPackage1',
      // //   name: 'CardPackage1',
      // //   component: CardPackage1,
      // //   props: true
      // // }
      // ]
    },
    {
      path: '/CardPackage1',
        name: 'CardPackage1',
        component: CardPackage1,
        props: true
    },
    {
      path: '/CardPackage2',
        name: 'CardPackage2',
        component: CardPackage2,
        props: true
    },
    { path: '*', component: PageNotFound, }
    
    
  ]
})

