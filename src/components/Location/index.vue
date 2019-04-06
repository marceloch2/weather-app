<template>
  <div class="location">
    <fieldset>
      <legend>{{ title.toUpperCase() }}</legend>
      <input type="text" class="today__country" placeholder="country" v-model.trim="city">
      <input type="text" class="today__city" placeholder="city name" v-model.trim="country">
      <button @click="search">Search</button>
    </fieldset>
  </div>
</template>

<script>
import Location from "./location";
export default Location;
</script>

<style lang="sass" scoped>
	@import 'location.scss'
</style>
