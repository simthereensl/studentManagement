<template>
<el-container>
  <el-header><CommonHeader></CommonHeader></el-header>
  <el-main><router-view></router-view></el-main>
</el-container>
</template>

<script>
import CommonHeader from './CommonHeader.vue'
export default {
    components: {
        CommonHeader
    }
}
</script>

<style lang="less" scoped>

.el-header{
    background-color: #333;
}
.el-main{
    padding-top: 0;
}
</style>