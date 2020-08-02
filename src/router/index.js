import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 左边导航栏
const FindMusic = ()=> import('@/views/FindMusic')
const Friends = ()=> import('@/views/Friends')
const LookLive = ()=> import('@/views/LookLive')
const PersonalFM = ()=> import('@/views/PersonalFM')
const Video = ()=> import('@/views/Video')
// 推荐下的上面导航栏
const PersonalRecommand = ()=> import('@/components/findmusicitem/PersonalRecommand')
const MusicList = ()=> import('@/components/findmusicitem/MusicList')

const MusicListDetail = ()=> import('@/components/findmusicitem/personalrecommandchild/MusicListDetail')
  const routes = [
    {
      path: '/',
      redirect: '/findmusic'
    },
    {
      path: '/findmusic',
      component: FindMusic,
      children:[
        {
          path: '',
          redirect: 'personalrecommand'
        },
        {
          path: 'personalrecommand',
          component: PersonalRecommand,
          
        },
        {
          path: 'musiclist',
          component: MusicList
        }
      ]
    },
    {
     path: '/friends',
     component:  Friends
    },
    {
      path: '/looklive',
      component:  LookLive
     },
     {
      path: '/personalfm',
      component:  PersonalFM
     },
     {
      path: '/video',
      component:  Video
     },
     //  下面是歌单详情页
     {
      path: '/musiclistdetail',
      component: MusicListDetail,
      name: "musiclistdetail"
    }
    
     
  
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
  ]

const router = new VueRouter({
  routes
})

export default router
