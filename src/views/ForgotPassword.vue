<template>
<div class="forgot-container">
    <div class="forgotAside image" :style="image">  <h1></h1></div>
 
    <div class="forgot-tempalte">
        <form>
            <h3 class="forgotheadingText">Forgot Password</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" />
            </div>

            <button type="submit" class="btn btn-dark  btn-block">Reset password</button>

             <p class="forgot-password text-right ">
                Jump to
                <router-link to="/login">Log In?</router-link>
            </p>
        </form>
    </div>
    
    </div>
</template>

<script>
    export default {
        data() {
                return {
                image: {backgroundImage:"url(https://images.unsplash.com/photo-1533000247305-2061d09448e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80)"}
            }            
        }
    }
</script>

<style lang="scss">


.forgot-tempalte{
    display: flex;
    text-align: left;
    justify-content: center;
    flex-direction: column;
    width: 390px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 30px 55px;
    border-radius: 15px;
}

.forgot-container{
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
  color: #2554FF;
}



.forgotAside{
    width: 50%;
    background: cyan;
}

.image {
        background-repeat: no-repeat;
        background-size: 150%;
    }

    .forgotheadingText{
        margin-left: 13%;
    }
</style>