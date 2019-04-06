import { logins } from '../../Utils/constants'
export default {
  name: 'Login',
  data() {
    return {
      title: 'login',
      username: 'marceloch2@gmail.com',
      password: 'Demo12345'
    }
  },
  mounted() {},

  computed: {},
  methods: {
    login() {
      let logged = logins.filter(
        login => login.username === this.username && login.password === this.password
      )

      if (logged.length) {
        // this.$session.destroy()
        this.$session.start()
        this.$session.set('jwt', logged[0].hash)
        this.$router.push('/home')

        delete logged[0].password

        this.$store.commit('setUser', logged[0])
      }
    }
  }
}
