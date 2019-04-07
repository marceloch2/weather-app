<template>
  <div class="location">
    <fieldset>
      <legend>{{ title.toUpperCase() }}</legend>
      <label for="today__city">City Name</label>
      <input
        type="text"
        name="today__city"
        class="today__city"
        placeholder="city name"
        v-model.trim="city"
      >
      <label for="today__country">Country Code</label>
      <input
        type="text"
        name="today__country"
        class="today__country"
        placeholder="country code"
        v-model.trim="country"
      >
      <button @click="search">Update Data</button>
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
