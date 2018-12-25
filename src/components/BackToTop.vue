<template>
  <transition name="fade">
    <div id="backtotop" v-if="show" @click="toTop">
      回到顶部
    </div>
  </transition>
</template>

<script>
export default {
  name:'BackToTop',
  data: function(){
    return{
      show: false,
      timer: null
    }
  },
  methods:{
    handleScroll(){
        this.scrollTop = document.documentElement.scrollTop
      // clearTimeout(this.timer)
      // this.timer = setTimeout(()=>{
        console.log('scroll')
        if(this.scrollTop > 300){
          this.show = true
        }else{
          this.show = false
        }                
      // },500)
    },
    toTop(){
      let distance = Math.floor(this.scrollTop / 50)
      let timer = setInterval(()=>{
        if(document.documentElement.scrollTop > 0){
            document.documentElement.scrollTop -= distance
        }else{
          clearInterval(timer)
        }
      },8)

    }
  },
  mounted(){
    window.addEventListener('scroll',this.handleScroll)
  }
}
</script>

<style scoped>
  #backtotop {
    width: 24px;
    color: gray;
    padding: 14px 0 14px 7px;
    cursor: pointer;
    position: fixed;
    top: 478px;
    right: 0px;
    text-align: center;
    z-index: 20;
    border-radius: 12px 0 0 12px;
    background-color: #f5f5f5;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
