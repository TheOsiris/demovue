<template>
  <div>
    <Header></Header>

    <div class="mblog">
      <h2>{{ blog.title }}</h2>
      <el-button
        type="primary"
        icon="el-icon-edit"
        circle
        v-if="ownBlog"
        @click="routerTo"
      ></el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        circle
        v-if="ownBlog"
        @click="deleteBlog"
      ></el-button>
      <el-divider></el-divider>
      <div class="markdown-description">
        <h4>{{ blog.description }}</h4>
      </div>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import "github-markdown-css";
import Header from "../components/Header";

export default {
  name: "BlogDetail.vue",
  components: { Header },
  data() {
    return {
      blog: {
        id: "",
        title: "",
        description: "",
        content: "",
      },
      ownBlog: false,
    };
  },
  methods: {
    routerTo() {
      this.$router.push("/blog/" + this.$route.params.blogId + "/edit");
    },
    deleteBlog() {
      const _this = this;
      _this
        .$confirm("该博客将永久被删除！！！  是否继续？", "提示", {
          confirmButtonText: "确定",
          ButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          const __this = this;
          this.$axios
            .get("/blog/delete/" + this.$route.params.blogId, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
            .then((res) => {
              console.log(res);
              __this.$confirm("删除成功", "提示", {
                confirmButtonText: "确定",
                showCancelButton: false,
                callback: (action) => {
                  __this.$router.push("/blogs");
                },
              });
            });
        });
    },
  },
  created() {
    const blogId = this.$route.params.blogId;

    const _this = this;
    this.$axios.get("/blog/" + blogId).then((res) => {
      const blog = res.data.data;
      _this.blog.id = blog.id;
      _this.blog.title = blog.title;
      _this.blog.description = blog.description;

      var MardownIt = require("markdown-it");
      var md = new MardownIt();

      var result = md.render(blog.content);
      _this.blog.content = result;
      _this.ownBlog = blog.userId === _this.$store.getters.getUser.id;
    });
  },
};
</script>

<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}
</style>