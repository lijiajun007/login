<template>
  <div class="login-container">
    <div class="bg-shape shape-left"></div>
    <div class="bg-shape shape-right"></div>
    
    <div class="login-card">
      <h1 class="system-title">志愿填报智能分析系统</h1>
      
      <div class="card-content">
        <div class="illustration-section">
          <img src="../assets/f0ba85f0dc441240476950ab7949f66d068defa22517dc-81QIJf.png" alt="系统插画" class="illustration-img" />
        </div>
        
        <div class="form-section">
          <div class="input-group">
            <span class="icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#bfbfbf"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </span>
            <input type="text" v-model="formData.username" placeholder="请输入账号" autocomplete="off" />
          </div>
          
          <div class="input-group">
            <span class="icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#bfbfbf"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
            </span>
            <input :type="showPassword ? 'text' : 'password'" v-model="formData.password" placeholder="请输入密码" autocomplete="off" />
            <span class="icon action-icon" @click="togglePassword">
              <svg v-if="!showPassword" viewBox="0 0 24 24" width="20" height="20" fill="#4a8bff"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="#bfbfbf"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.14-.06.27-.06.42 0 1.66 1.34 3 3 3 .15 0 .28-.02.42-.06l2.61 2.61c-.92.38-1.92.58-2.98.58-2.76 0-5-2.24-5-5 0-1.06.2-2.06.58-2.98z"/></svg>
            </span>
          </div>
          
          <div class="remember-group">
            <label class="custom-checkbox">
              <input type="checkbox" v-model="formData.remember" />
              <span class="checkmark"></span>
              <span class="text">记住密码</span>
            </label>
          </div>
          
          <button class="login-btn" @click="handleLogin">登 录</button>
          
          <div class="forgot-link">
            <a href="javascript:void(0)">忘记账号密码？</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import router from '../router'
import {useIndexStore} from '../store/index.ts'
const store = useIndexStore()
// 表单响应式数据
const formData = reactive({
  username: '',
  password: '',
  remember: true
})

// 密码显示/隐藏状态
const showPassword = ref(false)

// 切换密码显示状态的方法
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// 登录处理方法
const handleLogin = () => {
  if (!formData.username || !formData.password) {
    alert('请输入账号和密码！')
    return
  }
  console.log('提交的登录表单数据:', formData)
  store.username = formData.username // 将用户名存储到 Pinia 中
  store.password = formData.password // 将密码存储到 Pinia 中
  // 此处可添加向后端发送请求的逻辑，例如 axios.post(...)
  router.push('/home') // 登录成功后跳转到主页
}
</script>

<style scoped>
/* 容器及背景样式 */
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../assets/4c745b0f79f2e583a1c53f4698e2f715c6ce367ce309e-9WWvxa.png') no-repeat center center;
  position: relative;
  overflow: hidden;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

/* 模拟原图背景中的蓝色光晕装饰 */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
}

.shape-left {
  width: 500px;
  height: 500px;
  background: #2a68f0;
  bottom: -150px;
  left: -100px;
  opacity: 0.8;
}

.shape-right {
  width: 400px;
  height: 400px;
  background: #1e5de6;
  bottom: 10%;
  right: 5%;
  opacity: 0.9;
}

/* 主体白色卡片 */
.login-card {
  width: 55%;
  max-width: 1100px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  padding: 50px;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

/* 系统标题文字 */
.system-title {
  text-align: center;
  font-size: 42px;
  color: #3b82f6;
  font-weight: 800;
  letter-spacing: 3px;
  margin-top: 20px;
  margin-bottom: 60px;
}

/* 卡片内部左右布局 */
.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* 左侧插画 */
.illustration-section {
  flex: 5.5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.illustration-img {
  width: 100%;
  max-width: 550px;
  object-fit: contain;
}

/* 右侧表单 */
.form-section {
  flex: 4.5;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 输入框组合 */
.input-group {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 5px;
  transition: border-color 0.3s;
}

.input-group:focus-within {
  border-bottom-color: #3b82f6;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.action-icon {
  cursor: pointer;
  margin-right: 0;
  margin-left: 10px;
}

.input-group input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  background: transparent;
}

.input-group input::placeholder {
  color: #b3b3b3;
  font-size: 15px;
}

/* 记住密码复选框 (自定义样式) */
.remember-group {
  display: flex;
  align-items: center;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  color: #888;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 16px;
  width: 16px;
  background-color: #fff;
  border: 1px solid #c0c0c0;
  border-radius: 3px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.custom-checkbox input:checked ~ .checkmark:after {
  content: "";
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-bottom: 2px;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  padding: 15px;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 2px;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(59, 130, 246, 0.3);
  transition: background-color 0.3s, transform 0.1s;
  margin-top: 10px;
}

.login-btn:hover {
  background-color: #2563eb;
}

.login-btn:active {
  transform: translateY(2px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

/* 忘记密码链接 */
.forgot-link {
  text-align: center;
  margin-top: 10px;
}

.forgot-link a {
  color: #a0a0a0;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-link a:hover {
  color: #3b82f6;
}

/* 响应式适配 */
@media screen and (max-width: 900px) {
  .card-content {
    flex-direction: column;
  }
  
  .illustration-section {
    margin-bottom: 40px;
  }
  
  .form-section {
    width: 100%;
    padding: 0 20px;
  }
  
  .system-title {
    font-size: 32px;
  }
}
</style>
