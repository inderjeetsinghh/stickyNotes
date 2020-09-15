<template>
  <div class="signup-container">
    <div class="signupAside image" :style="image">
      <h1></h1>
    </div>

    <div class="signup-tempalte">
      <form>
        <h3 class="headingText">Sign Up</h3>

        <div class="form-group">
          <label>Full Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>

        <div class="form-group">
          <label>Email address</label>
          <input type="email" class="form-control" v-model="email" />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="password" />
        </div>

        <button type="submit" class="btn btn-dark btn-block" v-on:click="registerUser">Sign Up</button>
        <div class="error" v-if="errorName">{{errorName}}</div>
        <p class="forgot-password text-right mt-2 mb-4">
          Already registered
          <router-link to="/login">Log In?</router-link>
        </p>
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
      image: {
        backgroundImage:
          "url(https://images.unsplash.com/photo-1533000247305-2061d09448e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80)",
      },
      name: "",
      email: "",
      password: "",
      errorName: "",
    };
  },
  computed: {},
  methods: {
    registerUser: function () {
      if (!this.name) {
        this.errorName = "Please Enter FullName";
      } else if (!this.email) {
        this.errorName = "Please Enter Email Address";
      } else if (!this.password) {
        this.errorName = "Please Enter Password";
      } else {
        axios
          .post(`http://localhost:3002/users`, {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            console.log("Response After register=>", res.data.user);
            localStorage.setItem("savedUser", JSON.stringify(res.data.user));
            this.$router.push("/login");
            this.name = "";
            this.email = "";
            this.password = "";
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
.signup-tempalte {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
  width: 390px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 10px 55px;
  border-radius: 15px;
}

.signup-container {
  width: 100%;
  height: 700px;
  display: flex;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}

.forgot-password a {
  color: #2554ff;
}

.signupAside {
  width: 50%;
  background: cyan;
}

.image {
  background-repeat: no-repeat;
  background-size: 150%;
}

.headingText {
  margin-left: 32%;
}

.error {
  background: #e53131;
  color: white;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 8px;
  text-align: center !important;
}
</style>