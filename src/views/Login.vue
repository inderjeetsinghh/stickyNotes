<template>
  <div class="login-container">
    <div class="loginAside image" :style="image">
      <h1></h1>
    </div>

    <div class="login-tempalte">
      <form>
        <h2>Log In</h2>

        <div class="form-group">
          <label>Email address</label>
          <input type="email" v-model="email" class="form-control" />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="password" class="form-control" />
        </div>

        <button type="submit" v-on:click="loginUser" class="btn btn-dark btn-block">Log In</button>

        <div class="error" v-if="errorName">{{errorName}}</div>

        <!-- <p class="forgot-password text-right">
          <router-link to="/forgotpassword">Forgot password ?</router-link>
        </p> -->

        <p class="forgot-password text-right mb-4">
          Not registered yet
          <router-link to="/signup">Sign Up?</router-link>
        </p>

        <div class="social-icons">
          <ul>
            <li>
              <a href="#">
                <i class="fab fa-google"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueRouter from "vue-router";
Vue.use(VueRouter);
export default {
  data() {
    return {
      email: "",
      password: "",
      errorName: "",
      image: {
        backgroundImage:
          "url(https://images.unsplash.com/photo-1533000247305-2061d09448e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80)",
      },
    };
  },
  computed: {},
  methods: {
    loginUser: function () {
      if (!this.email) {
        this.errorName = "Please Enter Email Address";
      } else if (!this.password) {
        this.errorName = "Please Enter Password";
      } else {
        axios
          .post(`http://localhost:3002/users/login`, {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            console.log("Response After register=>", res);
            if (res.data.error) {
              this.errorName = res.data.error;
            } else {
              localStorage.setItem("savedUser", JSON.stringify(res.data.user));
              this.$router.push("/singlenote");

              this.email = "";
              this.password = "";
            }
          })
          .catch((e) => {
            this.errors.push(e);
          });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.login-tempalte {
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  width: 390px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
}

.login-container {
  width: 100%;
  height: 700px;
  display: flex;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 5px;
  color: #7a7a7a;
  margin: 0;
}

.forgot-password a {
  color: #2554ff;
}

.social-icons {
  text-align: center;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 1.5em;
  color: #222222;
}

.social-icons ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.social-icons ul li {
  display: inline-block;
  zoom: 1;
  width: 65px;
  vertical-align: middle;
  border: 1px solid #e3e8f9;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
  background: #f4f6ff;
}

.social-icons ul li a {
  display: block;
  font-size: 1.4em;
  margin: 0 5px;
  text-decoration: none;
}
.social-icons ul li a i {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.social-icons ul li a:focus i,
.social-icons ul li a:active i {
  transition: none;
  color: #222222;
}

.loginAside {
  width: 50%;
  background: cyan;
}

.image {
  background-repeat: no-repeat;
  background-size: 150%;
}

.error {
  background: #e53131;
  color: white;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 8px;
}
</style>