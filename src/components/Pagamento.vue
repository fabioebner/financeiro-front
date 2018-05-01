<template>
<div>
  {{valorTotal}}
  Saldo: {{saldo}}
  <br>
  <v-text-field v-model="valorInformado"></v-text-field>
  <v-select
  :items="formaPagamentoList"
  item-text="nome"
  autocomplete
  v-model="formPagamentoSelecionada"
  item-value="id"
  placeholder="Selecione uma Forma de Pagamento"
  single-line
  ></v-select>
  <v-btn @click="adicionarFormaPagamento">
    Adicionar
  </v-btn>
    <v-alert type="error" dismissible v-model="alert">
      {{mensagemAlerta}}
    </v-alert>
    <v-list two-line>
      <template v-for="(item, index) in formPagamentoAdicionada">
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
    totalAdicionado: 0,
    valorInformado: 0,
    formaPagamentoList: [],
    formPagamentoAdicionada: [],
    alert: false,
    mensagemAlerta: 'favor preencher todos os campos',
  }),
  computed: {
    saldo() {
      return Number(this.$props.valorTotal) - Number(this.totalAdicionado);
    },
  },
  methods: {
    removerFormaPagamentoAdicionada(index) {
      this.formPagamentoAdicionada.splice(index, 1);
      this.recalcularValor();
    },
    recalcularValor() {
      this.totalAdicionado = 0;
      this.formPagamentoAdicionada.forEach((pagamentoAdicionado) => {
        this.totalAdicionado = Number(this.totalAdicionado) +
        Number(pagamentoAdicionado.valorAdicionado);
      });
    },
    /* eslint no-param-reassign: ["error", { "props": false }] */
    adicionarFormaPagamento() {
      this.alert = false;
      if (this.valorInformado <= this.saldo) {
        if (this.formPagamentoSelecionada && Number(this.valorInformado) > Number(0)) {
          this.formaPagamentoList.forEach((formaPagamento) => {
            if (formaPagamento.id === this.formPagamentoSelecionada) {
              const novaFormaPagamento = JSON.parse(JSON.stringify(formaPagamento));
              novaFormaPagamento.valorAdicionado = this.valorInformado;
              this.formPagamentoAdicionada.push(novaFormaPagamento);

              this.valorInformado = 0;
              this.formPagamentoSelecionada = null;
            }
          });
          this.recalcularValor();
        } else {
          this.mensagemAlerta = 'favor preencher todos os campos';
          this.alert = true;
        }
      } else {
        this.mensagemAlerta = 'valor não pode ser adicionado';
        this.alert = true;
      }
    },
  },
};
</script>
