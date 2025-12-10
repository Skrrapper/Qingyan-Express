// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// Vue2中如果使用Pinia需要单独配置
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    pinia // 注入pinia
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
// 导入Pinia
import { createPinia } from 'pinia'

export function createApp() {
  const app = createSSRApp(App)
  // 创建并安装Pinia
  const pinia = createPinia()
  app.use(pinia)
  
  return {
    app
  }
}
// #endif
