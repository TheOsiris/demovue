<template>
  <div class="m-content">
    <h3>WELCOME TO MY BLOG</h3>
    <div class="block">
      <el-avatar :size="50" :src="circleUrl"></el-avatar>
      <div>{{ user.username }}</div>
    </div>

    <div class="maction">
      <span><el-link href="/blogs" type="primary">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="success" href="/blog/add">发表博客</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin"
        ><el-link type="warning" href="/login">登录</el-link></span
      >
      <span v-show="hasLogin"
        ><el-link type="danger" @click="logout">退出登录</el-link></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      circleUrl: require('../assets/avatar/default.png'),
      user: {
        username: "请先登录",
        gender: "",
      },
      hasLogin: false,
    };
  },
  methods: {
    logout() {
      const _this = this;
      _this.$axios
        .get("/logout", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          _this.$store.commit("REMOVE_INFO");
          _this.$router.push("/blogs");
          _this.$router.go(0);
        });
    },
  },
  created() {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username;
      this.user.gender = this.$store.getters.getUser.gender;
      this.hasLogin = true;
    }

    if (this.user.gender == "woman") {
      this.circleUrl = require('../assets/avatar/woman.png');
    } else if (this.user.gender == "man") {
      this.circleUrl = require('../assets/avatar/man.png');
    }
  },
};
</script>

<style scoped>
.m-content {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}
.maction {
  margin: 10px 0;
}
</style>