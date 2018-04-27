<template>
<div>
  {{valorTotal}}
  Saldo: {{saldo}}
  <br>
  <v-text-field v-model="valorInformado"></v-text-field>
  <v-select
  :items="formaPagamentoList"
  item-text="nome"
  v-model="formPagamentoSelecionada"
  item-value="id"
  placeholder="Selecione uma Forma de Pagamento"
  single-line
  ></v-select>
  <v-btn @click="adicionarFormaPagamento">
    Adicionar
  </v-btn>
    <v-alert type="error" dismissible v-model="alert">
      favor preencher todos os campos
    </v-alert>
    <v-list two-line>
      <template v-for="(item, index) in formPagamentoAdicionada">
        <v-subheader :key="item.header">{{ item.header }}</v-subheader>
        <v-list-tile avatar :key="item.title" @click.stop>
          <v-list-tile-avatar>
              <v-icon class="green lighten-1 white--tex">monetization_on</v-icon>
            </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.valorAdicionado"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.nome"></v-list-tile-sub-title>
          </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple @click="removerFormaPagamentoAdicionada(index)">
                <v-icon color="grey lighten-1">clear</v-icon>
              </v-btn>
            </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
</div>
</template>
<script>
export default {
  created() {
    this.axios.get('/formapagamento/').then((response) => {
      this.formaPagamentoList = response.data;
    });
    // console.log(this.$store.state.count);
  },
  name: 'Pagamento',
  props: ['valorTotal'],
  data: () => ({
    formPagamentoSelecionada: null,
    totalAdicionado: null,
    valorInformado: null,
    formaPagamentoList: [],
    formPagamentoAdicionada: [],
    alert: false,
  }),
  computed: {
    saldo() {
      return Number(this.$props.valorTotal) - Number(this.totalAdicionado);
    },
  },
  methods: {
    removerFormaPagamentoAdicionada(index) {
      this.formPagamentoAdicionada.splice(index, 1);
    },
    /* eslint no-param-reassign: ["error", { "props": false }] */
    adicionarFormaPagamento() {
      if (this.formPagamentoSelecionada) {
        console.log('selecionado id ', this.formPagamentoSelecionada +
        ' - ' + this.valorInformado);
        this.formaPagamentoList.forEach((formaPagamento) => {
          if (formaPagamento.id === this.formPagamentoSelecionada) {
            formaPagamento.valorAdicionado = this.valorInformado;
            this.formPagamentoAdicionada.push(formaPagamento);
          }
        });
      } else {
        this.alert = true;
      }
    },
  },
};
</script>
