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
    alert: false,
  }),
  computed: {
    saldo() {
      return Number(this.$props.valorTotal) - Number(this.totalAdicionado);
    },
  },
  methods: {
    adicionarFormaPagamento() {
      if(this.formPagamentoSelecionada){
        console.log('selecionado id ' + this.formPagamentoSelecionada +
        ' - ' + this.valorInformado);
        this.totalAdicionado = this.valorInformado;
      }else{
        this.alert = true;
      }

    },
  },
};
</script>
