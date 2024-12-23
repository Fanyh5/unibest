<template>
  <div class="error-500">
    <h1>500</h1>
    <div class="error-desc">抱歉，服务器出现了一些问题</div>
    <el-button type="primary" @click="goHome">返回首页</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.error-500 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  margin-bottom: 20px;
  font-size: 72px;
  color: #409eff;
}

.error-desc {
  margin-bottom: 30px;
  font-size: 20px;
  color: #606266;
}
</style>
