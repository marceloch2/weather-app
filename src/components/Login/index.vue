<template>
  <form class="login" ref="loginForm">
    <fieldset>
      <legend>[ {{title.toUpperCase()}} ]</legend>
      <input
        type="text"
        autofocus
        class="login__username"
        placeholder="username"
        v-model.trim="username"
      >
      <input type="password" class="login__password" placeholder="password" v-model="password">
      <button name="login" type="submit">Login</button>
    </fieldset>
  </form>
</template>

<script>
import Login from "./login";
export default Login;
</script>

<style lang="sass" scoped>
	@import 'login.scss'
</style>
