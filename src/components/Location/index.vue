<template>
  <form class="location" ref="locationForm">
    <fieldset>
      <legend>{{ title.toUpperCase() }}</legend>

      <label for="today__city">City Name</label>
      <input
        autofocus
        type="text"
        id="today__city"
        class="today__city"
        placeholder="city name"
        v-model.trim="city"
      >

      <label v-if="hideCountry" for="today__country">Country Code</label>
      <input
        v-if="hideCountry"
        type="text"
        id="today__country"
        class="today__country"
        placeholder="country code"
        v-model.trim="country"
      >
      <button type="submit">Update Data</button>
    </fieldset>
  </form>
</template>

<script>
import Location from "./location";
export default Location;
</script>

<style lang="sass" scoped>
	@import 'location.scss'
</style>
