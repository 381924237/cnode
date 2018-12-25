<template>
  <!-- <main id="article"> -->
    <!-- <div class="sidebar"></div> -->
    <div class="content" id="article">
      <div class="isLoading" v-if="isLoading"><img src="../assets/loading.gif" alt=""></div>
      <div v-else>
        <div class="panel">
          <div class="topic_header">
            <span class="title">
              <span :class="[{'put_top':post.top},{'put_good':post.good},{'type':true}]">{{post | typeFormatter}}</span>
              {{post.title}}
            </span>
            <ul class="detail">
              <li>发布于 {{post.create_at | formatDate}}</li>
              <li>作者 
                <router-link :to="{name:'UserInfo',params:{name:post.author.loginname}}">
                  {{post.author.loginname}}
                </router-link>
              </li>
              <li>{{post.visit_count}} 次浏览</li>
              <li>来自 {{post | typeFormatter}}</li>
            </ul>
          </div>
          <div class="inner" v-html="post.content"></div>
        </div>

        <!-- 回复板块 -->
        <div class="panel">
          <div class="header">
            <span>{{post.replies.length}} 回复</span>
          </div>
          <div v-for="(reply,index) in post.replies" :key="reply.id" class="reply_area" >

              <div class="author_content">

                <router-link :to="{name:'UserInfo',params:{name:post.author.loginname}}">
                  <img :src="reply.author.avatar_url" alt="">
                  <span class="reply_author">{{reply.author.loginname}}</span>
                </router-link>

                <span class="reply_time">{{index + 1}}楼·{{reply.create_at | formatDate}}</span>
                <span v-if="post.author.loginname === reply.author.loginname" class="author">作者</span>
              </div>
              <div class="reply_content">
                <div v-html="reply.content"></div>
              </div>

          </div>    
        </div>
      </div>
    </div>
  <!-- </main> -->
</template>


<script>
export default {
  name: 'Article',
  data: function(){
    return{
      isLoading: true,
      post: []
    }
  },
  methods:{
    getArticleData(){
      this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
                .then(res=>{
                  if(res.data.success === true){
                    this.post = res.data.data
                  }
                  console.log(res.data.data)
                }).catch(err=>{
                  console.log(err)
                })
    }
  },
  beforeMount(){
    this.isLoading = false,
    this.getArticleData()
  },
  watch:{
    '$route'(to,form){
      this.getArticleData()
    }
  }
}
</script>

<style>
  @import url('../assets/markdown-github.css');

  #article .type {
    display: none;
    font-size: 12px;
    border-radius: 3px;
    margin-right: 2px;
    padding: 2px 4px;
    background: #80bd01;
    color: #fff;
    line-height: 130%;
  }

  #article .type.put_top, .type.put_good {
    display: inline-block;
  }

  #article .topic_header {
    padding: 10px;
  }

  #article .title {
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
    display: inline-block;
    width: 75%;
    vertical-align: bottom;
  }

  #article .detail {
    display: flex;
    font-size: 12px;
    color: #838383;
    padding: 2px 0;
    list-style: none;
    margin: 0;
  }

  #article .detail li::before {
    content: '• '
  }

  #article .detail li {
    margin-right: 3px;
  }

  #article .inner {
    padding: 10px 20px;
    border-top: 1px solid #e5e5e5;
  }

  #article .panel {
    margin-bottom: 13px;
  }

  /* 回复板块 */
  #article .header {
    padding: 10px;
    background-color: rgb(246,246,246);
    border-radius: 3px 3px 0 0;
    font-size: 14px;
    color: #444;
  }

  #article .reply_area {
    padding: 10px 10px 7px 10px;
    border-top: 1px solid #f0f0f0;
  }
  
  #article .reply_area:nth-child(2) {
    border: none;
  }

  #article .author_content img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
    float: left;
  }

  #article .author_content .author {
    color: #fff;
    background-color: #6ba44e;
    padding: 2px;
    font-size: 12px;
    vertical-align: top;
  }

  #article .reply_author {
    margin-left: 7px;
    font-weight: 700;
    color: #666;
  }

  #article .reply_author,.reply_time {
    font-size: 12px;
    vertical-align: top;
  }

  /* #article .reply_time {
    color: #08c;
    text-decoration: none;
  }

  #article .reply_time:hover {
    color: #005580;
    text-decoration: underline;
  } */
  #article .reply_content {
    padding-left: 50px;
    margin-bottom: 20px;
    margin-top: 5px;
  }
</style>
