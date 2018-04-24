<template>
<v-container grid-list-md >
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
      :rows-per-page-text="linhasPorPagina"
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox
            primary
            hide-details
            v-model="props.selected"
            @change="selecionarPedido"
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
              <strong class="green--text headlinefont">0</strong> recebimentos selecionados no total de <strong class="green--text headlinefont">R$ 0,00</strong>
            </v-flex>
            <v-flex xs5>
              Total a receber / devolver
            </v-flex>
        </v-layout>
        <v-layout row wrap  class="black--text text-xs-center">
            <v-flex xs7>
              <strong class="red--text headlinefont">0</strong> devoluções selecionadas no total de R$ <strong class="red--text headlinefont">0,00</strong>
            </v-flex>
            <v-flex xs5>
            <strong class="green--text headline">R$ 0,00</strong>
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
      <v-expansion-panel inset>
        <v-expansion-panel-content>
          <div slot="header">Movimentação</div>
          <v-card>
            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">Descontos</div>
          <v-card>
            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <div slot="header">Forma de Pagamento</div>
          <v-card>
            <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
  </v-flex>
  </v-layout>

  </v-container>
</template>
<script>
export default {
  created() {
    const self = this;
    this.axios.get('/pedido/').then((response) => {
      self.items = response.data;
    });
  },
  methods: {
    selecionarPedido() {
        alert('foi');
    }
  },
  data() {
    return {
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
      items: [
        {
          value: false,
          id: 1,
          atendente: 'Fabio Alves',
          data: '10/10/2010',
          identificacao: '123sd23',
          protocolo: 'TD-44',
          total: '23,23',
          pagoAnteriormente: '23,23',
          saldo: '23,23',
        },
        {
          value: false,
          id: 2,
          atendente: 'Fabio Alves de Araujo',
          data: '10/10/2010',
          identificacao: '123sd23',
          protocolo: 'TD-123',
          total: '23,23',
          pagoAnteriormente: '23,23',
          saldo: '23,23',
        },
        {
          value: false,
          id: 3,
          atendente: 'Fabio Alves Ebner',
          data: '10/10/2010',
          identificacao: '123sd23',
          protocolo: 'TD-233',
          total: '23,23',
          pagoAnteriormente: '23,23',
          saldo: '23,23',
        },
        {
          value: false,
          id: 4,
          atendente: 'Fabio Alves',
          data: '10/10/2010',
          identificacao: '123sd23',
          protocolo: 'TD-55',
          total: '23,23',
          pagoAnteriormente: '23,23',
          saldo: '23,23',
        },
        {
          value: false,
          id: 5,
          atendente: 'Fabio Alves',
          data: '10/10/2010',
          identificacao: '123sd23',
          protocolo: 'TD-233',
          total: '23,23',
          pagoAnteriormente: '23,23',
          saldo: '23,23',
        },
        {
          value: false,
          id: 1,
          atendente: 'Fabio Alves',
          data: '10/10/2010',
          identificacao: '123sd23',
          protocolo: 'TD-233',
          total: '23,23',
          pagoAnteriormente: '23,23',
          saldo: '23,23',
        },
        {
          value: false,
          id: 1,
          atendente: 'Fabio Alves',
          data: '10/10/2010',
          identificacao: '123sd23',
          protocolo: 'TD-233',
          total: '23,23',
          pagoAnteriormente: '23,23',
          saldo: '23,23',
        },
        {
          value: false,
          id: 1,
          atendente: 'Fabio Alves',
          data: '10/10/2010',
          identificacao: '123sd23',
          protocolo: 'TD-233',
          total: '23,23',
          pagoAnteriormente: '23,23',
          saldo: '23,23',
        },
        {
          value: false,
          id: 1,
          atendente: 'Fabio Alves',
          data: '10/10/2010',
          identificacao: '123sd23',
          protocolo: 'TD-233',
          total: '23,23',
          pagoAnteriormente: '23,23',
          saldo: '23,23',
        },
      ],
    };
  },
};
</script>

