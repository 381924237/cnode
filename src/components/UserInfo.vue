<template>
  <!-- <main> -->
    <!-- <div class="sidebar"></div> -->
    
    <div class="content">
      <div class="isLoading" v-if="isLoading"><img src="../assets/loading.gif" alt=""></div>
      <div v-else>
        <div class="panel">
          <div class="header">
            <a href="/">主页</a>
            <span>/</span>
          </div>
          <div class="inner">
            <div class="user">
              <img :src="userinfo.avatar_url" alt="">
              <span>{{userinfo.loginname}}</span>
            </div>
            <div class="user_profile">
              <p class="score">{{userinfo.score}} 积分</p>
              <p class="github">GitHub: <a :href="github + userinfo.loginname" target="_blank">@{{userinfo.loginname}}</a></p>
              <p class="time">注册时间 {{userinfo.create_at | formatDate}}</p>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="header"><span>最近创建的话题</span></div>
          <div class="innerContent">
            <ul>
              <li v-for="post in userinfo.recent_topics" :key="post.id">
                <!-- 头像 -->
                <router-link :to="{name:'UserInfo',params:{name:post.author.loginname}}">
                 <img :src="post.author.avatar_url" alt="">
                </router-link>
 
                <!-- 帖子标题 -->
                <router-link :to="{name:'Article',params:{id:post.id}}" class="title">
                  <span >{{post.title}}</span>
                </router-link>


                <!-- 最后回复时间 -->
                <div class="last_reply"><span>{{post.last_reply_at | formatDate}}</span></div>
              </li>
            </ul>  
          </div>
        </div>
        <div class="panel">
          <div class="header"><span>最近参与的话题</span></div>
          <div class="innerContent">
            <ul>
              <li v-for="post in userinfo.recent_replies" :key="post.id">
                <!-- 头像 -->
                <router-link :to="{name:'UserInfo',params:{name:post.author.loginname}}">
                 <img :src="post.author.avatar_url" alt="">
                </router-link>
 
                <!-- 帖子标题 -->
                <router-link :to="{name:'Article',params:{id:post.id}}" class="title">
                  <span >{{post.title}}</span>
                </router-link>


                <!-- 最后回复时间 -->
                <div class="last_reply"><span>{{post.last_reply_at | formatDate}}</span></div>
              </li>
            </ul>  
          </div>
        </div>
      </div>
    </div>
  <!-- </main> -->
</template>

<script>
export default {
  name: 'UserInfo',
  data: function(){
    return{
      isLoading: true,
      userinfo: {},
      github: 'https://github.com/'
    }
  },
  methods:{
    getData(){
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res=>{
          this.userinfo = res.data.data
          console.log(res.data.data)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  beforeMount(){
    this.isLoading = false
    this.getData()
  }
}
</script>

<style scoped>
  .panel {
    margin-bottom: 13px;
  }

  .header {
    padding: 10px;
    background-color: rgb(246,246,246);

    color: #444;
  }
  .header a{
    color: #80bd01;
  }

  .header a:hover {
    text-decoration: underline;
  }

  .inner {
    border-top: 1px solid #e5e5e5;
    padding: 10px;
  }

  .user img {
    width: 40px;
    height: 40px;
    border-radius: 3px;
  }

  .user span {
    vertical-align: 110%;
    color: #778087;
    padding: 10px 5px;
  }

  .score, .github{
    margin-top: 10px;
  }

  .github {
    color: #778087;
  }

  .github a {
    color: #778087;
  }

  .time {
    margin: 16px 0;
    color: #ababab;
  }

  /* innerContent */
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

  .innerContent li:hover {
    background-color: rgb(245,245,245);
  }


  .title{
    color: #08c;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 70%;
    font-size: 16px;
    text-decoration: none;
    margin-left: 20px;
  }

  .title:hover {
    text-decoration: underline;
    color: #005580;
  }
  
  .last_reply {
    flex-grow: 1;
    text-align: right;
    color: #778087;
    font-size: 12px;
  }


</style>
