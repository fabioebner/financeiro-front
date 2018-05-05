// https://github.com/ankurk91/vue-cleave-component
<template>
<v-container fluid>
  {{valorTotal.abs().toFormat(2)}}
  Saldo: {{saldo.abs().toFormat(2)}}
  <br>
  <v-layout row wrap>
    <v-flex xs3>
      <v-text-field v-model="vlInformado" ref="txtValorInformado" single-line hide-details
        @keyup.enter='adicionarFormaPagamento' row-height="50"></v-text-field>
    </v-flex>
    <v-flex xs8>
      <v-select
        :items="formaPagamentoList"
        item-text="nome"
        autocomplete
        v-model="formaPagamentoSelecionada"
        item-value="id"
        placeholder="Selecione uma Forma de Pagamento"
        single-line
        hide-details
        >
      </v-select>
    </v-flex>
    <v-flex xs1>
      <v-btn icon @click="adicionarFormaPagamento" >
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
    <v-alert type="error" dismissible v-model="alert">
      {{mensagemAlerta}}
    </v-alert>
    <v-list two-line >
      <template v-for="(item, index) in formaPagamentoAdicionada">
        <v-list-tile avatar :key="item.title" @click.stop>
          <v-list-tile-avatar>
              <v-icon class="lighten-1 white--tex" :class="{red: item.valorAdicionado.isNegative()
              ,green: item.valorAdicionado.isPositive()}" style="{background: 'red'}">
              monetization_on</v-icon>
            </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.valorAdicionado.abs().toFormat(2)"></v-list-tile-title>
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
</v-container>
</template>
<script>
import { eventBus } from '../main';

export default {
  created() {
    this.axios.get('/formapagamento/').then((response) => {
      this.formaPagamentoList = response.data;
      this.formaPagamentoList.forEach((forma) => {
        if (forma.nome === 'DINHEIRO') {
          this.formPagamentoDefaultId = forma.id;
          this.formaPagamentoSelecionada = this.formPagamentoDefaultId;
        }
      });
    });
    // console.log(this.$store.state.count);
  },
  name: 'Pagamento',
  props: {
    valorTotal: BigNumber,
  },
  data: () => ({
    formPagamentoDefaultId: 0,
    formaPagamentoSelecionada: null,
    totalAdicionado: new BigNumber(0),
    vlInformado: new BigNumber(0),
    formaPagamentoList: [],
    formaPagamentoAdicionada: [],
    alert: false,
    mensagemAlerta: 'favor preencher todos os campos',
  }),
  watch: {
    // eslint-disable-next-line
    valorTotal: function () {
      this.totalAdicionado = new BigNumber(0);
      this.formaPagamentoAdicionada = [];
      this.recalcularValor();
    },
  },
  computed: {
    saldo() {
      return this.$props.valorTotal.minus(this.totalAdicionado);
    },
  },
  methods: {
    removerFormaPagamentoAdicionada(index) {
      this.formaPagamentoAdicionada.splice(index, 1);
      this.recalcularValor();
    },
    recalcularValor() {
      this.totalAdicionado = 0;
      this.formaPagamentoAdicionada.forEach((pagamentoAdicionado) => {
        this.totalAdicionado = Number(this.totalAdicionado) +
        Number(pagamentoAdicionado.valorAdicionado);
      });
      this.vlInformado = this.$props.valorTotal.minus(this.totalAdicionado).abs();
      this.$refs.txtValorInformado.focus();
    },
    /* eslint no-param-reassign: ["error", { "props": false }] */
    adicionarFormaPagamento() {
      const valorInformado = new BigNumber(this.vlInformado);
      this.alert = false;
      if (valorInformado.lte(this.saldo.abs())) {
        if (this.formaPagamentoSelecionada && (valorInformado.comparedTo(new BigNumber(0)) !== 0)) {
          this.formaPagamentoList.forEach((formaPagamento) => {
            if (formaPagamento.id === this.formaPagamentoSelecionada) {
              const novaFormaPagamento = JSON.parse(JSON.stringify(formaPagamento));
              if (this.valorTotal.isNegative()) {
                novaFormaPagamento.valorAdicionado = valorInformado.negated();
              } else {
                novaFormaPagamento.valorAdicionado = valorInformado;
              }
              this.formaPagamentoAdicionada.push(novaFormaPagamento);
              this.vlInformado = 0;
              this.formaPagamentoSelecionada = null;
            }
          });
          this.recalcularValor();
          this.formaPagamentoSelecionada = this.formPagamentoDefaultId;
          eventBus.$emit('formaPagamentoAdicionado', this.formaPagamentoAdicionada);
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
<style scoped>
  .input-group {
    padding-top: 10px;
  }
</style>
