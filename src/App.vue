<template>
  <div id="app">
    <GmapMap
      :options="{
				disableDefaultUI: true, 
				zoomControl: false,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				rotateControl: false,
				fullscreenControl: false
			}"
      :center="$store.state.geo"
      :zoom="13"
      map-type-id="terrain"
      style="width: 100%; height: 100%; position: absolute; z-index: 1;"
      ref="_map_"
    ></GmapMap>

    <!-- Router for views -->
    <router-view id="views"/>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  name: "app",
  data() {
    return {};
  },

  computed: {
    errorMessage() {
      return this.$store.state.globalError.msg;
    },
    city() {
      return this.$store.state.location.city;
    },
    country() {
      return this.$store.state.location.country;
    }
  },

  mounted() {
    this.$store.subscribe(async (mutation, state) => {
      switch (mutation.type) {
        case "setGeo":
          this.$refs._map_.$mapPromise.then(map => {
            map.setCenter(state.geo);
          });

          break;
      }
    });

    let _self = this;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        _self.$store.commit("setGeo", pos);
      });
    }
  },
  computed: {
    google: gmapApi
  }
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  #views {
    z-index: 2;
    width: 100%;
    height: 80%;
    margin: 5% 0 0 0;
  }

  #bg-map {
    width: 100%;
    position: absolute;
    top: 0;
  }

  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
