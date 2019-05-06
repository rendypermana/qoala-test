<template>
  <div class="layout">
    <mu-appbar style="width: 100%;" title="Test Qoala"></mu-appbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
  .mu-appbar {
    height: 64px;
    background: #ff7701!important;
    color: #fff!important;
    position: fixed;
    top: 0;
  }
  .layout{
    padding-top: 70px;
  }
</style>
