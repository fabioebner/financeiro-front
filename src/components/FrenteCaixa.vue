<template>
<v-container grid-list-md >
  <v-layout row wrap>
    <v-flex xs7>
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
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Nenhum pedido encontrado para o filtro:  "{{ search }}".
          </v-alert>
        </v-data-table>
      <v-footer height="auto" class="white darken-3">
        <v-layout row wrap justify-center>
          <v-container grid-list-md >
            <v-layout row wrap class="black--text text-xs-center">
                <v-flex xs7>
                  <strong class="green--text headlinefont">{{selecionadoRecebimento.length}}
                    </strong> recebimentos selecionados no total de
                    <strong class="green--text headlinefont">R$
                      {{vlSelecionadoRecebimento.toString()}}</strong>
                </v-flex>
                <v-flex xs5>
                  Total a receber / devolver
                </v-flex>
            </v-layout>
            <v-layout row wrap  class="black--text text-xs-center">
                <v-flex xs7>
                  <strong class="red--text headlinefont">
                    {{selecionadoDevolucao.length}}
                  </strong> devoluções selecionadas no total de
                  <strong class="red--text headlinefont">R$
                    {{vlSelecionadoDevolucao.toString()}}</strong>
                </v-flex>
                <v-flex xs5>
                <strong class="green--text headline">R$ {{vlTotalGeral.toString()}}</strong>
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
  <v-flex xs5>
      <Pagamento :valorTotal='vlTotalGeral'></Pagamento>
  </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import { BigNumber } from 'bignumber.js';
import Pagamento from './Pagamento';

BigNumber.config({ DECIMAL_PLACES: 13, ROUNDING_MODE: 2 });

export default {
  components: {
    Pagamento,
  },
  created() {
    const self = this;
    this.axios.get('/pedido/').then((response) => {
      self.items = response.data;
    });
  },
  watch: {
    // eslint-disable-next-line
    selected: function () {
      this.selecionadoDevolucao = [];
      this.selecionadoRecebimento = [];
      this.vlSelecionadoRecebimento = new BigNumber(0);
      this.vlSelecionadoDevolucao = new BigNumber(0);
      this.vlTotalGeral = new BigNumber(0);
      this.selected.forEach((pedido) => {
        const valorPedidoAtual = new BigNumber(pedido.valor);
        const valorPedidoAnterior = new BigNumber(pedido.pagoAnteriormente);
        if (valorPedidoAtual.minus(valorPedidoAnterior) < 0) {
          this.selecionadoDevolucao.push(pedido);
          this.vlSelecionadoDevolucao =
            this.vlSelecionadoRecebimento.plus(valorPedidoAtual.minus(valorPedidoAnterior));
        } else {
          this.selecionadoRecebimento.push(pedido);
          this.vlSelecionadoRecebimento =
            this.vlSelecionadoRecebimento.plus(valorPedidoAtual.minus(valorPedidoAnterior));
        }
      });
      this.vlTotalGeral = this.vlSelecionadoRecebimento.minus(this.vlSelecionadoDevolucao.abs());
    },
  },
  data() {
    return {
      selecionadoRecebimento: [],
      selecionadoDevolucao: [],
      vlSelecionadoRecebimento: new BigNumber(0),
      vlSelecionadoDevolucao: new BigNumber(0),
      vlTotalGeral: new BigNumber(0),
      selected: [],
      dialog: false,
      search: '',
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
};
</script>

