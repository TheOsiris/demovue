import axios from "axios";
import Element from "element-ui";
import router from "./router";
import store from "./store";

axios.defaults.baseURL = "http://localhost:8181";

// 前置拦截
axios.interceptors.request.use((config) => {
  return config;
});

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let data = response.data;

    if(data.code === 200){
      return response;
    } else {
      Element.Message({
        showClose: true,
        message: '用户名或密码错误',
        type: 'error'
      });
      return Promise.reject(data.message);
    }
    /* return data; */
  },
  function(error) {
    // 对响应错误做点什么
    if(error.response.data){
      error.message = error.response.data.message
    }

    if (error.response.status === 401) {
      store.commit("REMOVE_INFO");
      router.push("/");
    }
    Element.Message({
      showClose: true,
      message: error.message,
      type: 'error'
    });
    return Promise.reject(error);
  }
);