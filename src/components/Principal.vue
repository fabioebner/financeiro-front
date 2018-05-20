<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click.stop :to="{name: child.component}"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click.stop :to="{name: item.component}" :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
      dense
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Lumera [Financeiro]</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-badge >
          <span slot="badge">5</span>
          <v-icon>notifications</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view ></router-view>
    </v-content>
    <!-- <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop
    >
      <v-icon>add</v-icon>
    </v-btn>
    -->
  </v-app>
</template>

<script>
export default {
  name: 'Principal',
  created() {
    this.axios.get('/login/bootstrap/').then((response) => {
      this.$store.commit('setBootstrap', response.data);
    });
    // console.log(this.$store.state.count);
  },
  data: () => ({
    drawer: false,
    items: [
      { icon: 'contacts', text: 'Frente de Caixa', component: 'FrenteCaixa' },
      { icon: 'history', text: 'Expedição', component: 'Login' },
      { icon: 'content_copy', text: '2º Via de Recibos', component: 'NovoPedido' },
      { icon: 'money_off', text: 'Adicionar Despesas' },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Relatórios',
        model: true,
        children: [
          { icon: 'attach_money', text: 'Fechamento Caixa' },
          { icon: 'attach_money', text: 'Receitas e Despesas' },
          { icon: 'attach_money', text: 'Mensalista' },
        ],
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Provimento 45',
        model: true,
        children: [
          { icon: 'trending_up', text: 'Lv. Depósto Previo' },
          { icon: 'trending_up', text: 'Lv. Aux. Receitas e Despesas' },
          { icon: 'trending_up', text: 'Balancete Anual Receitas e Despesas' },
          { icon: 'trending_up', text: 'Resumo Anual Receitas e Despesas' },
        ],
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Relatórios RN',
        model: true,
        children: [
          { icon: 'monetization_on', text: 'FCRCPN' },
          { icon: 'monetization_on', text: 'FDJ/FRMP' },
        ],
      },
      { icon: 'settings', text: 'Administração' },
    ],
  }),
  props: {
    source: String,
  },
};
</script>
