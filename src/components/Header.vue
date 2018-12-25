<template>
  <div class="header">
    <div class="container">
      <a class="logo" href="/">
        <img src="../assets/cnodejs_light.svg" alt="">
      </a>
      <ul>
        <li><a href="/">首页</a></li>
        <li><a href="#">新手入门</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">关于</a></li>
        <li><a href="#">注册</a></li>
        <li><a href="#">登录</a></li>
      </ul>
    </div>

  </div>
</template>




<script>
export default {
  
}
</script>


<style scoped>
  a {
    text-decoration: none;
    font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
    color: rgb(204,204,204);
    font-size: 13px;
  }

  .header {
    background-color: rgb(68,68,68);
    height: 50px;
  }

  .container {
    width: 90%;
    height: 100%;
    margin: auto;
    padding: 5px;
    
  }

  .logo {
    display: inline-block;
    width: 160px;
    height: 40px;
    padding: 3px 20px; 
    margin-left: -20px;
  }
  
  .logo img {
    max-width: 100%;
    height: auto;
  }

  ul{
    float: right;
    list-style: none;
    display: flex;
    height: 100%;
    align-items: center;
  }

  li a {
    padding: 10px 15px;
  }

  li a:hover {
    color: #fff;
  }
</style>

