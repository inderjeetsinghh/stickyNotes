<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button v-on:click="hitt" >Click Here!! </button>
  </div>
</template>

<script>
export default {
  name:'About Component',
   methods: {
    hitt() {
      alert("Button clicked");
    }
  }
}
</script>
