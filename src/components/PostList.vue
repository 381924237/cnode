<template>
  <!-- <main> -->
    <!-- <div class="sidebar"></div> -->
    <div class="content">
      <div class="panel">
        <div class="header">
          <span @click="changeTab('all',$event)" class="active">全部</span>
          <span @click="changeTab('good',$event)">精华</span>
          <span @click="changeTab('share',$event)">分享</span>
          <span @click="changeTab('ask',$event)">问答</span>
          <span @click="changeTab('job',$event)">招聘</span>
          <span>客户端测试</span>
        </div> 

        <div class="innerContent">
          <!-- 刚开始加载慢时显示的 -->
          <div class="isLoading" v-if="isLoading"><img src="../assets/loading.gif" alt=""></div>

          <!-- 帖子列表 -->
          <div class="post" v-else>  
            <ul>
              <li v-for="post in posts" :key="post.id">
                <!-- 头像 -->
                <router-link :to="{name:'UserInfo',params:{name:post.author.loginname}}">
                 <img :src="post.author.avatar_url" alt="">
                </router-link>
 
                
                <!-- 回复数 -->
                <span class="counts">
                  <span class="reply_count">{{post.reply_count}}</span>
                  <span class="seperator">/</span>
                  <span class="visit_count">{{post.visit_count}}</span>
                </span>

                <!-- 帖子类型 -->
                <span :class="[{'put_top': post.top},{'put_good': post.good},
                {'topiclist-tab':(!post.top && !post.good)}]">
                  {{post | typeFormatter}}
                </span>

                <!-- 帖子标题 -->
                <router-link :to="{name:'Article',params:{id:post.id,name:post.author.loginname}}" class="title">
                  <span >{{post.title}}</span>
                </router-link>


                <!-- 最后回复时间 -->
                <div class="last_reply"><span>{{post.last_reply_at | formatDate}}</span></div>
              </li>
            </ul>  
          </div>
          <Pagination @handleList="renderList"></Pagination>
        </div>

      </div>
    </div>
  <!-- </main>   -->
</template>


<script>
import Vue from 'vue'
import Pagination from './Pagination'
import $ from 'jquery'


export default {
  name: 'PostList',
  data: function(){
    return{
      isLoading: true,
      posts: [],
      postPage: 1,
      tabType: 'all'
    }
  },
  components:{
    Pagination
  },
  methods: {
    getData(){
      this.$http.get('https://cnodejs.org/api/v1/topics',{
        params:{
          page: this.postPage,
          limit: 40,
          tab: this.tabType
        }
      }).then(res=>{
        console.log(res.data.data)
        this.posts = res.data.data
      }).catch(err=>{
        console.log(err)
      })
    },
    renderList(value){
      this.postPage = value
      this.getData()
      // console.log(value)
    },
    changeTab(type,event){
      $(event.target).addClass('active').siblings().removeClass('active')
      this.tabType = type
      this.getData()
    }
  },
  beforeMount(){
    this.getData()    
    this.isLoading = false //加载成功
  }
}

Vue.filter('formatDate',function(str){
  if(!str) return ''
  let date = new Date(str)
  let time = new Date().getTime() - date.getTime() //当前时间-传入的时间，得到相差的时间（单位为毫秒）
  if(time < 0){
    return ''
  }else if(time / 1000 < 30 ){
    return '刚刚'
  }else if(time / 1000 < 60){
    return parseInt(time / 1000) + ' ' +'秒前'
  }else if(time / 60000 < 60){
    return parseInt(time / 60000) + ' ' + '分钟前'
  }else if(time / 3600000 < 24){
    return parseInt(time / 3600000) + ' ' + '小时前'
  }else if(time / 86400000 < 31){
    return parseInt(time / 86400000) + ' ' + '天前'
  }else if(time / 2592000000 < 12){
    return parseInt(time / 2592000000) + ' ' + '个月前'
  }else {return parseInt(time / 31536000000) + ' ' + '年前'}
})

//处理title类型
Vue.filter('typeFormatter',function(post){
  if(post.good){
    return '精华'
  }else if(post.top){
    return '置顶'
  }else if(post.tab === 'ask'){
    return '问答'
  }else if(post.tab === 'share'){
    return '分享'
  }else{
    return '招聘'
  }
})
</script>


<style scoped>
  ul {
    list-style: none;
  }
  /*header*/
  .header {
    border-radius: 3px 3px 0 0;
    padding: 10px;
    background-color: #f6f6f6; 
  }

  .header span {
    margin: 0 10px;
    color: #80bd01;
    cursor: pointer;
  }

  .header span:hover {
    color: #005580;
  }

  .header .active {
    background-color: #80bd01;
    color: #fff;
    padding: 3px 4px;
    border-radius: 3px;
  }

  .header .active:hover {
    color: #fff;
  }

  /*innerContent*/
  .innerContent img {
    width: 30px;
    height: 30px; 
  }

  .innerContent li {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #f0f0f0;
  }

  .innerContent li:first-child {
    border: none;
  }

  .innerContent li:hover {
    background-color: rgb(245,245,245);
  }

  .counts {
    display: inline-block;
    width: 70px;
    text-align: center;
  }

  .reply_count {
    font-size: 14px;
    color: rgb(158,120,192);
  }

  .seperator {
    margin: 0 -3px;
    font-size: 10px;
  }

  .visit_count {
    font-size: 10px;
    color: #b4b4b4;
  }

  .title{
    color: rgb(51,51,51);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 70%;
    font-size: 16px;
    text-decoration: none;
  }

  .title:hover {
    text-decoration: underline;
  }
  
  .last_reply {
    flex-grow: 1;
    text-align: right;
    color: #778087;
    font-size: 12px;
  }

  .put_top, .put_good {
    background: #80bd01;
    color: #fff;
  }
  .put_top, .put_good, .topiclist-tab {
    font-size: 12px;
    border-radius: 3px;
    margin-right: 5px;
    padding: 2px 4px;
  }

  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
  }



</style>
