import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import UserInfo from '../components/UserInfo'
import SideBar from '../components/SideBar'
import SideBar2 from '../components/SideBar2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      components:{
        main: PostList,
        side: SideBar2
      }
    },
    {
      name: 'Article',
      path: '/topic/:id&author=:name',
      components:{
        main: Article,
        side: SideBar
      }
    },
    {
      name: 'UserInfo',
      path: '/userinfo/:name',
      components:{
        main: UserInfo,
        side: SideBar2
      }
    }
  ]
})
