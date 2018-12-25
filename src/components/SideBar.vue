<template>
    <div class="sidebar">
        <div class="panel">
            <div class="header">作者</div>
            <div class="inner">
                <router-link :to="{name:'UserInfo',params:{name:userinfo.loginname}}">
                    <img  class="avatar" :src="userinfo.avatar_url" alt="">
                    <span class="author_name">{{userinfo.loginname}}</span>
                </router-link>
                <p class="score">积分：{{userinfo.score}}</p>
            </div>
        </div>
        <div class="panel">
            <div class="inner ad">
                <a href="http://d2forum.alibaba-inc.com/?from=cnode#/index?_k=tzua3l" target="_blank">
                    <img src="../assets/ad1.jpg" alt="">
                </a>
                <a href="https://seeconf.antfin.com/?from=cnode" target="_blank">
                    <img src="../assets/ad2.jpg" alt="">
                </a>
                <a href="https://www.aliyun.com/product/nodejs?ref=cnode" target="_blank">
                    <img src="../assets/ad3.jpg" alt="">
                </a>
                <a href="https://render.alipay.com/p/s/taobaonpm_click/image_click_25" target="_blank">
                    <img src="../assets/ad4.jpg" alt="">
                </a>
            </div>
        </div>
        <div class="panel">
            <div class="header">最近创建的话题</div>
            <ul class="inner">
                <li v-for="topic in recent_topic" :key="topic.id">
                    <router-link :to="{name:'Article',params:{id:topic.id,name:topic.author.loginname}}">
                        {{topic.title}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="panel">
            <div class="header">最近参与的话题</div>
            <ul class="inner">
                <li v-for="reply in recent_reply" :key="reply.id">                    
                    <router-link :to="{name:'Article',params:{id:reply.id,name:reply.author.loginname}}">
                       {{reply.title}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sidebar',
    data: function(){
        return{
            userinfo: {}
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
        this.getData()
    },
    computed:{        
        recent_topic(){
            if(this.userinfo.recent_topics){
                return this.userinfo.recent_topics.slice(0,5)
            }else{
                return this.userinfo.recent_topics
            }
        },
        recent_reply(){
            if(this.userinfo.recent_replies){
                return this.userinfo.recent_replies.slice(0,5)
            }else{
                return this.userinfo.recent_replies
            }
        }
    },
    watch:{
        '$route'(to,from){
            this.getData()
        }
    }
}
</script>

<style scoped>
    .panel {
        margin-bottom: 10px;
    }

    .header {
        padding: 10px;
        font-size: 13px;
    }

    .inner {
        padding: 10px;
    }

    .avatar {
        height: 48px;
        width: 48px;
        border-radius: 3px;
    }

    .inner .author_name {
        font-size: 16px;
        color: #778087;
        vertical-align: 95%;
        margin-left: 5px;
    }

    .score {
        padding-top: 10px;
    }

    ul {
        list-style: none;
    }
    
    .inner li {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 5px 0;
    }
    .inner li:last-child {
        margin-bottom: 10px;
    }

    .inner a {
        color: rgb(119,128,135);
    }

    .ad a {
        display: block;
    }
    .ad img {
        max-width: 100%;
        height: auto;
    }
</style>

