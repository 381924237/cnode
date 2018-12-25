<template>
  <div id="app">
    <Header></Header>
    <BackToTop></BackToTop>
    <main>
      <router-view name="side"></router-view>  
      <router-view name="main"></router-view>      
    </main>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
import BackToTop from './components/BackToTop'

export default {
  name: 'App',
  components: {
    Header,PostList,BackToTop
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  } 

  body {
    background-color: #e1e1e1;
    font-size: 14px;
  }

  main {
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 15px auto;
  }

  @media (max-width: 960px) {
    .sidebar{
      display: none;
    }

    main, .content{
      width: 100%;
      min-width: 0;
    }
  }


  /* .sidebar, .content {
    background-color: rgb(255,255,255);
  } */
  
  .panel {
    background-color: rgb(255,255,255);
  }

  .sidebar {
    width: 290px;
    float: right;
  }

  .content {
    margin-right: 305px;
  }

</style>
