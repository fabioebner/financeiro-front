<template>
<div>
  {{valorTotal.abs().toFormat(2)}}
  Saldo: {{saldo.abs().toFormat()}}
  <br>
  <v-text-field v-model="vlInformado"></v-text-field>
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
              <v-icon class="lighten-1 white--tex" :class="{red: item.valorAdicionado.isNegative()
              ,green: item.valorAdicionado.isPositive()}" style="{background: 'red'}">
              monetization_on</v-icon>
            </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.valorAdicionado.abs()"></v-list-tile-title>
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
  props: {
    valorTotal: BigNumber,
  },
  data: () => ({
    formPagamentoSelecionada: null,
    totalAdicionado: new BigNumber(0),
    vlInformado: 0,
    formaPagamentoList: [],
    formPagamentoAdicionada: [],
    alert: false,
    mensagemAlerta: 'favor preencher todos os campos',
  }),
  watch: {
    // eslint-disable-next-line
    valorTotal: function () {
      this.totalAdicionado = new BigNumber(0);
      this.formPagamentoAdicionada = [];
    },
  },
  computed: {
    saldo() {
      return this.$props.valorTotal.minus(this.totalAdicionado);
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
      const valorInformado = new BigNumber(this.vlInformado);
      this.alert = false;
      if (valorInformado.lte(this.saldo.abs())) {
        if (this.formPagamentoSelecionada && (valorInformado.comparedTo(new BigNumber(0)) !== 0)) {
          this.formaPagamentoList.forEach((formaPagamento) => {
            if (formaPagamento.id === this.formPagamentoSelecionada) {
              const novaFormaPagamento = JSON.parse(JSON.stringify(formaPagamento));
              if (this.valorTotal.isNegative()) {
                novaFormaPagamento.valorAdicionado = valorInformado.negated();
              } else {
                novaFormaPagamento.valorAdicionado = valorInformado;
              }
              this.formPagamentoAdicionada.push(novaFormaPagamento);
              this.vlInformado = 0;
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
