<template>
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
      :search="search"
      :no-data-text="mensagem"
      :rows-per-page-text="linhasPorPagina"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.apresentante }}</td>
        <td class="text-xs-center">{{ props.item.criado }}</td>
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
  </v-card>
</template>
<script>
export default {
  created() {
    const self = this;
    this.axios.get('/pedido/').then((response) => {
      self.items = response.data;
    });
  },
  data() {
    return {
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

