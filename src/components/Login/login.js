import { logins } from "../../Utils/constants";
export default {
  name: "Login",
  data() {
    return {
      title: "login",
      username: "marceloch2@gmail.com",
      password: "Demo12345"
    };
  },

  mounted() {
    this.$refs.loginForm.addEventListener("submit", event => {
      event.preventDefault();
      this.login();
    });
  },

  methods: {
    getLoginData() {
      return logins.filter(
        login =>
          login.username === this.username && login.password === this.password
      );
    },
    login() {
      if (this.getLoginData().length) {
        this.$session.start();
        this.$session.set("jwt", this.getLoginData()[0].hash);
        this.$router.push("/home");

        this.$store.commit("setUser", this.getLoginData()[0]);
      }
    }
  }
};
