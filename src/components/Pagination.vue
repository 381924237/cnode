<template>
  <div class="pagination">
    <ul>
      <li @click="changePage">首页</li>
      <li @click="changePage">上一页</li>
      <li v-if="judge" class="ellipsis">...</li>
      <li v-for="page in pages" :key="page.id" :class="[{currentPage:page == currentPage},'pageBtn']" @click="changePage(page)">{{page}}</li>
      <li class="ellipsis">...</li>
      <li @click="changePage">下一页</li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Pagination',
  data: function(){
    return{
      pages: [1,2,3,4,5],
      currentPage: 1,
      judge: false
    }
  },
  methods:{
    changePage(page){
      // console.log(typeof page)
      if(typeof page !== 'number'){
        let clickE = new Event('click')
        switch(page.target.innerText){
          case '上一页':
            document.querySelector('.currentPage').previousSibling.dispatchEvent(clickE);
            break;
          case '下一页':
            document.querySelector('.currentPage').nextSibling.dispatchEvent(clickE);
            break;
          case '首页':
            this.pages = [1,2,3,4,5];
            this.changePage(1);
            break;
          default: break  
        }
      }else{
        this.currentPage = page
        if(page > 4){
          this.judge = true
        }else{
          this.judge = false
        }

        if(page == this.pages[4]){
          this.pages.shift()
          this.pages.push(this.pages[3] + 1)
        }else if(page == this.pages[0] && page !== 1){
          this.pages.pop()
          this.pages.unshift(this.pages[0] -1) 
        }
                
      this.$emit('handleList',this.currentPage)          
      }


    }
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
    display: flex;
    padding: 10px;
  }

  li {
    padding: 4px 12px;
    border: 1px solid #ddd;
    border-left-width: 0;
    cursor: pointer;
    color: #778087;
  }

  li:first-child {
    border-left-width: 1px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  li:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .ellipsis {
    cursor: default;
  }

  .ellipsis:hover {
    background-color: white;
  }

  li:hover {
    background-color: #ccc;
  }

  .currentPage {
    color: #80bd01;
  }

  .pageBtn {
    width: 42px;
    text-align: center;
  }
</style>
