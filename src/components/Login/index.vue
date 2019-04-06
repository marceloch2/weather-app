<template>
  <div class="login">
    <fieldset>
      <legend>[ {{title.toUpperCase()}} ]</legend>
      <input type="text" class="login__username" placeholder="username" v-model.trim="username">
      <input type="password" class="login__password" placeholder="password" v-model="password">
      <button @click="login">Enter</button>
    </fieldset>
  </div>
</template>

<script>
import Login from "./login";
export default Login;
</script>

<style lang="sass" scoped>
	@import 'login.scss'
</style>
