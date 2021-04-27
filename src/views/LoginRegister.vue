<template>
  <div class="container" :class="{ 'sign-up-mode': signUpMode }">
    <!-- form表单容器 -->
    <div class="forms-container">
      <div class="signin-signup">
        <!-- 登录 -->
        <el-form
            :model="loginUser"
            :rules="rules1"
            ref="loginForm"
            label-width="100px"
            class="loginForm sign-in-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
                v-model="loginUser.username"
                placeholder="ENTER YOUR NAME ..."
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
                v-model="loginUser.password"
                type="password"
                placeholder="ENTER YOUR PASSWORD ..."
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                @click="loginForm('loginForm')"
                type="primary"
                class="submit-btn"
            >登录
            </el-button
            >
          </el-form-item>
          <!-- 找回密码 -->
          <div class="tiparea">
            <p>FORGET YOUR PASSWORD? <a href="">FIND BACK</a></p>
          </div>
        </el-form>
        <!-- 注册 -->
        <el-form
            :model="registerUser"
            :rules="rules2"
            ref="registerForm"
            label-width="100px"
            class="registerForm sign-up-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
                v-model="registerUser.username"
                placeholder="ENTER YOUR NAME ..."
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
                v-model="registerUser.password"
                type="password"
                placeholder="ENTER YOUR PASSWORD ..."
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
                v-model="registerUser.password2"
                type="password"
                placeholder="RE-ENTER YOUR PASSWORD ..."
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select
                v-model="registerUser.gender"
                placeholder="CHOOSE YOUR GENDER..."
            >
              <el-option label="男性" value="man"></el-option>
              <el-option label="女性" value="woman"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
                @click="registerForm('registerForm')"
                type="primary"
                class="submit-btn"
            >注册
            </el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 左右切换动画 -->
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>Welcome to my blog</h3>
          <p>Don't have an account?</p>
          <button @click="change" class="btn transparent">
            Sign in
          </button>
        </div>
        <img src="@/assets/index/login.svg" class="image" alt=""/>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>You can sign up here</h3>
          <p>Already have an account?</p>
          <button @click="change" class="btn transparent">Login</button>
        </div>
        <img src="@/assets/index/register.svg" class="image" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginRegister",
  data() {
    /* 判断两次密码是否一致 */
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please re-enter password"));
      } else if (value !== this.registerUser.password) {
        callback(new Error("Two passwords are inconsistent!"));
      } else {
        callback();
      }
    };
    return {
      signUpMode: false,
      loginUser: {
        username: "",
        password: "",
      },
      registerUser: {
        username: "",
        password: "",
        password2: "",
        gender: "",
      },
      /* 登录文本内容校验规则 */
      rules1: {
        username: [
          {
            required: true,
            message: "Username could not be empty...",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "Name's length has to be 2 to 10 characters...",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Password could not be empty...",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "Password's length has to be 6 to 15 characters...",
            trigger: "blur",
          },
        ],
      },
      /* 注册文本内容校验规则 */
      rules2: {
        username: [
          {
            required: true,
            message: "Username could not be empty...",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "Name's length has to be 2 to 10 characters...",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Password could not be empty...",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "Password's length has to be 6 to 15 characters...",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            message: "Password could not be empty...",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "Password's length has to be 6 to 15 characters...",
            trigger: "blur",
          },
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    change() {
      this.signUpMode = !this.signUpMode
    },

    /* 登录校验 */
    loginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios.post("/login", this.loginUser).then((res) => {
            const jwt = res.headers["authorization"];
            const userInfo = res.data.data;

            _this.$store.commit("SET_TOKEN", jwt);
            _this.$store.commit("SET_USERINFO", userInfo);
            /* 页面跳转 */
            _this.$router.push("/blogs");
          });
        } else {
          console.log(loginUser);
          return false;
        }
      });
    },

    /* 注册校验 */
    registerForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios.post("/userinfo/save", this.registerUser).then(() => {
            _this.signUpMode = !_this.signUpMode;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 44%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

/* 左右切换动画 */
.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 2.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }

  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }

  .panel .content {
    padding: 0.5rem 1rem;
  }

  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}

/* 控制login & register显示 */
form {
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
}

form.sign-in-form {
  z-index: 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

/* register */
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}

/* form */
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}

.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}

.tiparea p a {
  color: #409eff;
}
</style>
