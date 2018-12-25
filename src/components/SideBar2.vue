<template>
  <div class="sidebar">
    <div class="panel">
      <div class="header">
        CNode：Node.js专业中文社区
      </div>
      <div class="inner">
        国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。
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
      <div class="header">友情社区</div>
      <div class="inner community">  
        <a href="https://ruby-china.org/" target="_blank">
          <img src="..\assets\ruby-china.png" alt="">
        </a>
        <a href="https://golangtc.com/" target="_blank">
          <img src="..\assets\golangtc.png" alt="">
        </a>
        <a href="https://laravel-china.org/" target="_blank">
          <img src="..\assets\phphub.png" alt="">
        </a>
        <a href="https://testerhome.com/" target="_blank">
          <img src="..\assets\testerhome.png" alt="">
        </a>
      </div>
    </div>
    <div class="panel"></div>
  </div>
</template>

<script>
export default {

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

  .ad a {
    display: block;
  }
  .ad img {
    max-width: 100%;
    height: auto;
  }

  .community img {
    width: 150px;
  }

  .community a {
    display: block;
    padding: 5px 0;
  }
</style>
