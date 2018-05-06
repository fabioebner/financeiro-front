<template>
  <v-container grid-list-md fluid >
    <v-layout row wrap>
      <v-flex xs8>
        <v-card>
          <v-card-title>
            Lista de Pedidos
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Filtrar"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            v-model="selected"
            :search="search"
            :no-data-text="mensagem"
            select-all
            :rows-per-page-text="linhasPorPagina">
            <template slot="items" slot-scope="props">
              <tr :style="{'color': ((Number(props.item.valor)
              - Number(props.item.pagoAnteriormente))<0) ? 'red' : 'black'}" >
                <td>
                  <v-checkbox
                    primary
                    hide-details
                    v-model="props.selected"
                  ></v-checkbox>
                </td>
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.apresentante }}</td>
                <td class="text-xs-center">{{ moment(props.item.criado).format('DD/MM/YY') }}</td>
                <td class="text-xs-center">{{ props.item.identificacao }}</td>
                <td class="text-xs-center">{{ props.item.apresentanteDocumento }}</td>
                <td class="text-xs-center">{{ props.item.valor }}</td>
                <td class="text-xs-center">{{ props.item.pagoAnteriormente }}</td>
                <td class="text-xs-center">{{ Number(props.item.valor) -
                  Number(props.item.pagoAnteriormente)}}</td>
              </tr>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Nenhum pedido encontrado para o filtro:  "{{ search }}".
            </v-alert>
          </v-data-table>
          <!-- Footer com o resumo dos valores selecionados -->
        <v-footer height="auto" class="white darken-3">
          <v-layout row wrap justify-center>
            <v-container grid-list-md >
              <v-layout row wrap class="black--text text-xs-center">
                  <v-flex xs7>
                    <strong class="green--text headlinefont">{{selecionadoRecebimento.length}}
                      </strong> recebimentos no total de
                      <strong class="green--text headlinefont">R$
                        {{vlSelecionadoRecebimento.abs().toFormat()}}</strong>
                  </v-flex>
                  <v-flex xs5  :class="{'red--text' : vlTotalGeral.isNegative(),
                  'green--text': vlTotalGeral.isPositive() }">
                    Total a {{receberOuDevolver}}
                  </v-flex>
              </v-layout>
              <v-layout row wrap  class="black--text text-xs-center">
                  <v-flex xs7>
                    <strong class="red--text headlinefont">
                      {{selecionadoDevolucao.length}}
                    </strong> devoluções no total de
                    <strong class="red--text headlinefont">R$
                      {{vlSelecionadoDevolucao.abs().toFormat()}}</strong>
                  </v-flex>
                  <v-flex xs5>
                  <strong class="headline" :class="{'red--text' : vlTotalGeral.isNegative(),
                  'green--text': vlTotalGeral.isPositive() }">R$ {{vlTotalGeral.abs().toFormat()}}
                  </strong>
                  </v-flex>
              </v-layout>
            </v-container>
          </v-layout>
        </v-footer>
      <v-dialog v-model="dialog" width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Detalhes do Pedido</span>
          </v-card-title>
          <v-card-text>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
    </v-flex>
    <v-flex xs4>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <Pagamento ref="pagamentos" :valorTotal='vlTotalGeral'></Pagamento>
          </v-flex>
        </v-layout>
        <v-alert type="error" dismissible v-model="alert">
          Favor informar pelo menos 1 forma de pagamento
        </v-alert>
        <v-layout row wrap>
          <v-flex xs12 class="text-xs-center">
            <v-btn color="info" @click.stop="finalizarMovimentacao">Finalizar</v-btn>
            <v-btn color="warning">Recibo</v-btn>
            <v-btn color="error">Cancelar</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <v-alert type="error" dismissible v-model="alertaFinalizarPedido">
        {{mensagemAlerta}}
      </v-alert>
    </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Pagamento from './Pagamento';
import { eventBus } from '../main';

export default {
  components: {
    Pagamento,
  },
  created() {
    eventBus.$on('formaPagamentoAdicionado', this.setarPagamentos);
    const self = this;
    this.axios.get('/pedido/').then((response) => {
      self.items = response.data;
    });
  },
  watch: {
    // eslint-disable-next-line
    selected: function () {
      // Limpar selecionados individuais
      this.selecionadoDevolucao = [];
      this.selecionadoRecebimento = [];
      // zerar totais
      this.vlSelecionadoRecebimento = new BigNumber(0);
      this.vlSelecionadoDevolucao = new BigNumber(0);
      this.vlTotalGeral = new BigNumber(0);
      // Percorrer selecionados
      this.selected.forEach((pedido) => {
        // separar os valores atual e pago anteriormente do pedido
        const valorPedidoAtual = new BigNumber(pedido.valor);
        const valorPedidoAnterior = new BigNumber(pedido.pagoAnteriormente);
        const valorTotalPedido = valorPedidoAtual.minus(valorPedidoAnterior);
        // verifica se o valor final do pedido e negativo(deve devolver)
        if (valorTotalPedido.isNegative()) {
          this.selecionadoDevolucao.push(pedido);
          this.vlSelecionadoDevolucao =
            this.vlSelecionadoDevolucao.plus(valorTotalPedido);
        } else {
          this.selecionadoRecebimento.push(pedido);
          this.vlSelecionadoRecebimento =
            this.vlSelecionadoRecebimento.plus(valorTotalPedido);
        }
      });
      this.vlTotalGeral = this.vlSelecionadoRecebimento.minus(this.vlSelecionadoDevolucao.abs());
      if (this.vlTotalGeral.isNegative()) {
        this.receberOuDevolver = 'Devolver';
      } else {
        this.receberOuDevolver = 'Receber';
      }
    },
  },
  data() {
    return {
      recibo: {
        clienteId: null,
        nome: '',
        documento: '',
      },
      alertaFinalizarPedido: false,
      mensagemAlerta: '',
      pagamentosPedido: [],
      selecionadoRecebimento: [],
      selecionadoDevolucao: [],
      vlSelecionadoRecebimento: new BigNumber(0),
      vlSelecionadoDevolucao: new BigNumber(0),
      vlTotalGeral: new BigNumber(0),
      selected: [],
      dialog: false,
      search: '',
      receberOuDevolver: 'Receber',
      mensagem: 'Nenhum Pedido Encontrado',
      linhasPorPagina: 'Pedidos por página',
      headers: [
        {
          text: 'Pedido',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        { text: 'Apresentante', value: 'apresentante', align: 'left', sortable: false },
        { text: 'Data', value: 'criado', sortable: false },
        { text: 'Identificação', value: 'identificacao', sortable: false },
        { text: 'Doc. Apre.', value: 'apresentanteDocumento', sortable: false },
        { text: 'Total (R$)', value: 'valor', sortable: false },
        { text: 'Antes (R$)', value: 'pagoAnteriormente', sortable: false },
        { text: 'Saldo (R$)', value: 'saldo', sortable: false },
      ],
      items: [],
    };
  },
  methods: {
    finalizarMovimentacao() {
      this.alertaFinalizarPedido = false;
      // eslint-disable-next-line
      if (this.pagamentosPedido.length > 0) {
        alert('foi');
      } else {
        this.alertaFinalizarPedido = true;
        this.mensagemAlerta = 'Favor informar pelo menos 1 forma de pagamento';
      }
    },
    setarPagamentos(pagamentos) {
      this.pagamentosPedido = pagamentos;
    },
  },
};
</script>

