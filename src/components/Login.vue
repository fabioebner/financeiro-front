<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Acessar Sistema</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    :href="source"
                    target="_blank"
                    slot="activator"
                  >
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Usuário"
                  v-model='username' type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Senha"
                   v-model='password' id="password" type="password"></v-text-field>
                   <v-checkbox label="Lembrar senha" v-model="checkbox"></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click='logar()'>Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'Login',
  data: () => ({
    drawer: null,
    checkbox: false,
    username: 'cartorio@teste.com.br',
    password: '1234',
  }),
  props: {
    source: String,
  },
  methods: {
    logar() {
      this.axios.defaults.baseURL = 'http://localhost:8585';
      // var myVue = this.$vuetify;
      this.axios.post('/login', {
        email: this.username,
        senha: this.password,
      },
      {
        withCredentials: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
      ).then((response) => {
        // eslint-disable-next-line
        this.axios.defaults.headers.common['Authorization'] = response.headers.authorization;
        // this.$vuetify.auth = response.headers.authorization;
        this.$router.push({ name: 'Principal' });
        // console.log(this.$vuetify.goTo('Principal'));
      });
    },
  },
};
</script>
