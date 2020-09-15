<template>
  <div id="app">
     <div id="nav" v-if="!$route.meta.hideNavigation">
       <!-- <span class="mr-5"><i class="fas fa-user"></i></span> -->
      <!-- <router-link to="/">Home</router-link> | -->
      <router-link to="/singlenote">STICKY NOTES</router-link> 
      <!-- <router-link to="/about">About</router-link> |
      <router-link to="/hello">Hello</router-link> -->

      <button class="logoutbtn" v-on:click="logoutUser">LogOut</button>
    </div> 

    <transition name="fade" mode="out-in"> 
        <router-view/>
    </transition>   
  </div>
</template>


<script>
import Vue from "vue";
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
    logoutUser: function () {
        localStorage.removeItem("savedUser");
        this.$router.push("/login");
    }
  },
  mounted() {},
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: 	#f9f9f9
}

#nav {
  padding: 30px;
background-color: transparent;
// background: rgba(0,0,0,.5);
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-enter-active, .fade-leave-active{
     transition: all 0.5s;
}

.fade-enter, .fade-leave-to{
     opacity: 0;
     transform:translateY(30px);

}




.logoutbtn{
    align-items: right;
    right: 0;
    width: 79px;
    border-radius: 15px;
    border-style: none;
    background: #ef7777;
    color: white;
    margin-left: 83%;
}

.logoutbtn:hover{
background: #e15151;
}
</style>
