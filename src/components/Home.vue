<template>
  <div>
    <div class="app__topbar"></div>
    <div class="app__menu">
      <ul>
        <li>
          <a name="todayButton" href="#" @click.prevent="tabs('weather')">Today</a>
        </li>
        <li>
          <a name="chartButton" href="#" @click.prevent="tabs('forecast')">History</a>
        </li>
      </ul>
    </div>
    <div class="home">
      <div class="home__center">
        <Location :hasCountry="activeTab === 'weather' ? false : true "/>
        <div class="home__center-right">
          <div v-if="isLoading" class="lds-ripple">
            <div></div>
            <div></div>
          </div>

          <div v-if="!isLoading && !hasError" class="home__center-right-holder">
            <Chart v-show="activeTab === 'forecast'"/>
            <Today v-show="activeTab === 'weather'"/>
          </div>

          <div v-if="hasError && !isLoading" class="hasError">
            <span>:(</span>
          </div>
        </div>
      </div>

      <button class="logout" @click="logout">sign out</button>
      <span v-if="errorMessage" class="errorMessage">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Location from "./Location";
import Today from "./Today";
import Chart from "./Chart";

import weatherApiService from "../Services/weatherApiService";
import { gmapApi } from "vue2-google-maps";

export default {
  data() {
    return {
      activeTab: "weather"
    };
  },
  methods: {
    /**
     *
     */
    async tabs(tab) {
      this.$store.commit("setTabType", tab);
      this.activeTab = tab;
    },

    /**
     *
     */
    logout() {
      this.$session.destroy();
      this.$router.push("/");
    }
  },

  computed: {
    google: gmapApi,
    isLoading() {
      return this.$store.state.isLoading;
    },
    errorMessage() {
      return this.$store.state.globalError.msg;
    },
    currentLocation() {
      return this.$store.state.location;
    },
    hasError() {
      return this.$store.state.globalError.hasError;
    }
  },

  mounted() {
    this.$store.commit("setCurrentLocation", {
      city: "",
      country: ""
    });
    this.$store.commit("globalError", "");
  },

  components: {
    Location,
    Chart,
    Today
  }
};
</script>

<style lang="scss">
@import "Global.scss";
</style>
