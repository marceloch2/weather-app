<template>
  <div>
    <div class="app__topbar"></div>
    <div class="app__menu">
      <ul>
        <li>
          <a href="#" @click.prevent="tabs('weather')">Today</a>
        </li>
        <li>
          <a href="#" @click.prevent="tabs('forecast')">History</a>
        </li>
      </ul>
    </div>
    <div class="home">
      <div class="home__center">
        <Location/>
        <div class="home_center-right">
          <Chart v-show="activeTab === 'forecast'" :ready="ready"/>
          <Today v-show="activeTab === 'weather'"/>
        </div>
      </div>

      <button class="logout" @click="logout">sign out</button>
      <small v-if="errorMessage" class="errorMessage">{{ errorMessage }}</small>
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
      ready: false,
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
    errorMessage() {
      return this.$store.state.globalError.msg;
    },
    currentLocation() {
      return this.$store.state.location;
    }
  },

  mounted() {
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

.app__topbar {
  background-color: #00646e;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 38px;
}

.app__menu {
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
  top: 38px;
  left: 0;
  width: 100%;
  height: 55px;
  text-align: left;

  ul li {
    float: left;
    list-style: none;
    margin-right: 15px;

    a {
      width: 100px;
      text-align: center;
      display: block;
      cursor: pointer;
      height: 30px;
    }

    a:active {
      border-bottom: solid 3px green;
    }
  }
}

.home {
  background-color: rgba(255, 255, 255, 0.5);
  height: 100%;

  .home_center-right {
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.7);
    min-height: 600px;
  }

  .home__center {
    width: 100%;
    display: flex;
    flex-flow: row;
  }
}
</style>
