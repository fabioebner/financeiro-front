<template>
  <v-container grid-list-md text-xs-center fluid>
    <v-layout row wrap>
        <v-flex xs4 md4>
          <v-form ref="form" v-model="valid">
            <v-select
              :items="especialidades"
              v-model="especialidadeSelecionada"
              item-value="cdCartorioNatureza"
              item-text="nome"
              label="Especialidade"
              :rules="[v => !!v || 'Campo obrigatório']"
              @change="buscarServicos"
              placeholder="Selecione uma especialidade"
              required
            ></v-select>
            <v-select
              :items="servicos"
              v-model="servicoSelecionado"
              label="Servico"
              ref="servicos"
              :placeholder="placeholderServicos"
              item-value="value"
              item-text="nome"
              :rules="[v => !!v || 'Campo obrigatório']"
              required
            ></v-select>
            <v-select
              :items="formaCalculos"
              v-model="formaCalculoSelecionada"
              label="Forma de calculo"
              placeholder="Selecione a forma de calculo"
              item-value="cdDivisor"
              item-text="nmDivisor"
              :rules="[v => !!v || 'Campo obrigatório']"
              required
            ></v-select>
            <v-text-field
              v-model.number="quantidade"
              label="Quantidade"
              mask="###"
              required
              :rules="quantidadeRules"
            ></v-text-field>
            <v-text-field
              v-model.number="valorBase"
              label="Valor Base"
              mask="###.###,##"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="protocolo"
              label="Protocolo"
            ></v-text-field>
            <v-btn color="error" @click.stop="limparForm">Limpar</v-btn>
            <v-btn color="info" @click.stop="verificarProtocolo" :disabled="!valid">
              Adicionar</v-btn>
          </v-form>
        </v-flex>
        <v-flex xs8 md8>
          <v-flex xs12 md12>
            <v-data-table :items="servicosAdicionados" :headers="servicosAdicionados"
            :rows-per-page-items="rowsPerPageItems">
              <template slot="headers" slot-scope="props">
                <tr>
                  <th> Quantidade</th>
                  <th> Serviço </th>
                  <!-- Deve pegar automaticamente de algum lugar -->
                  <th v-if="props.headers[0].nmCustas1"> {{props.headers[0].nmCustas1}} </th>
                  <th v-if="props.headers[0].nmCustas2"> {{props.headers[0].nmCustas2}} </th>
                  <th v-if="props.headers[0].nmCustas3"> {{props.headers[0].nmCustas3}} </th>
                  <th v-if="props.headers[0].nmCustas4"> {{props.headers[0].nmCustas4}} </th>
                  <th v-if="props.headers[0].nmCustas5"> {{props.headers[0].nmCustas5}} </th>
                  <th v-if="props.headers[0].nmCustas6"> {{props.headers[0].nmCustas6}} </th>
                  <th v-if="props.headers[0].nmCustas7"> {{props.headers[0].nmCustas7}} </th>
                  <th v-if="props.headers[0].nmCustas8"> {{props.headers[0].nmCustas8}} </th>
                  <th v-if="props.headers[0].nmCustas9"> {{props.headers[0].nmCustas9}} </th>
                  <th v-if="props.headers[0].nmCustas10"> {{props.headers[0].nmCustas10}} </th>
                </tr>
              </template>
              <template slot="items" slot-scope="props">
                <td> {{props.item.qtd }} </td>
                <td> {{props.item.nomeServico }} </td>
                <td v-if="props.item.nmCustas1"> {{props.item.vlTotalCustas1 }} </td>
                <td v-if="props.item.nmCustas2"> {{props.item.vlTotalCustas2 }} </td>
                <td v-if="props.item.nmCustas3"> {{props.item.vlTotalCustas3 }} </td>
                <td v-if="props.item.nmCustas4"> {{props.item.vlTotalCustas4 }} </td>
                <td v-if="props.item.nmCustas5"> {{props.item.vlTotalCustas5 }} </td>
                <td v-if="props.item.nmCustas6"> {{props.item.vlTotalCustas6 }} </td>
                <td v-if="props.item.nmCustas7"> {{props.item.vlTotalCustas7 }} </td>
                <td v-if="props.item.nmCustas8"> {{props.item.vlTotalCustas8 }} </td>
                <td v-if="props.item.nmCustas8"> {{props.item.vlTotalCustas9 }} </td>
                <td v-if="props.item.nmCustas10"> {{props.item.vlTotalCustas10 }} </td>
              </template>
            </v-data-table>
          </v-flex>
          <v-flex xs12 md12>
            <v-btn @click.stop="criarPedido">Criar Pedido</v-btn>
          </v-flex>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'NovoPedido',
  data: () => ({
    rowsPerPageItems: [6],
    pagination: {
      rowsPerPage: 3,
    },
    especialidades: [
      {
        cdCartorioNatureza: 1,
        nome: 'Registro de Imóveis',
      },
      {
        cdCartorioNatureza: 2,
        nome: 'Protesto',
      },
      {
        cdCartorioNatureza: 3,
        nome: 'Notas',
      },
      {
        cdCartorioNatureza: 4,
        nome: 'Firmas',
      },
      {
        cdCartorioNatureza: 5,
        nome: 'Títulos e Documentos e Pessoa Jurídica',
      },
      {
        cdCartorioNatureza: 6,
        nome: 'Registro Civil',
      },
      {
        cdCartorioNatureza: 7,
        nome: 'Registro Civil PJ',
      },
    ],
    valid: true,
    especialidadeSelecionada: null,
    servicos: [],
    servicosAdicionados: [
      // quando remover tem que arrumar o header do grid
      {
        nmCustas1: 'Cartorio',
        nmCustas2: 'FDJ',
        nmCustas3: 'FRMP',
        nmCustas4: 'FCRCPN',
        nmCustas5: 'ISS',
        nmCustas6: 'PGE',
        nmCustas7: null,
        nmCustas8: null,
        nmCustas9: null,
        nmCustas10: null,
        vlDesconto: 0,
        valor: 23,
        qtd: 1,
        vlTotal: 106.11,
        calculoTabela: [
          {
            nmTabela: '3',
            divisor: 'Custas Integrais',
            codigo: null,
            vlBase: 23,
            qtd: 1,
            data: '19/05/2018',
            custas1: 90.69,
            custas2: 0,
            custas3: 0,
            custas4: 9.07,
            custas5: 2.27,
            custas6: 4.08,
            custas7: 0,
            custas8: 0,
            custas9: 0,
            custas10: 106.11,
          },
        ],
        cdFormaCalculo: 1,
        numeroProtocolo: null,
        natureza: 'Registro de Imóveis',
        nomeServico: 'Compra e Venda 2',
        servicoId: 2,
        certidao: false,
        vlTotalCustas1: 90.69,
        vlTotalCustas2: 0,
        vlTotalCustas3: 0,
        vlTotalCustas4: 9.07,
        vlTotalCustas5: 2.27,
        vlTotalCustas6: 4.08,
        vlTotalCustas7: 0,
        vlTotalCustas8: 0,
        vlTotalCustas9: 0,
        vlTotalCustas10: 106.11,
        tabelaCustas: '3',
      },
    ],
    servicoSelecionado: null,
    formaCalculos: [],
    formaCalculoSelecionada: null,
    quantidade: 0,
    valorBase: 0,
    protocolo: null,
    placeholderServicos: 'Selecione uma especialidade',
    quantidadeRules: [
      v => (v > 0) || 'Deve ser maior do que 0',
    ],

  }),
  created() {
    this.axios.get('/formacalculo/').then((response) => {
      this.formaCalculos = response.data;
    });
  },
  methods: {
    limparForm() {
      this.$refs.form.reset();
    },
    adicionarServico(numeroProtocolo) {
      if (this.$refs.form.validate()) {
        const novoServico = {
          idServico: this.servicoSelecionado.id,
          valorInformado: this.valorBase,
          quantidade: this.quantidade,
          divisorId: this.formaCalculoSelecionada,
          quantidadeDivisor: 0,
        };
        this.axios.post('/servico/calcular/', novoServico)
          .then((response) => {
            const servicoCalculado = JSON.parse(JSON.stringify(response.data));
            Vue.set(servicoCalculado, 'nomeServico', this.servicoSelecionado.nome);
            Vue.set(servicoCalculado, 'numeroProtocolo', numeroProtocolo);
            this.servicosAdicionados.push(servicoCalculado);
            this.$refs.form.reset();
          });
      }
    },
    verificarProtocolo() {
      if (this.servicoSelecionado && this.protocolo) {
        this.axios.get(`/protocolo/${this.servicoSelecionado.id}/${this.protocolo}/`).then((response) => {
          if (response.data) {
            // eslint-disable-next-line
            alert('possui');
          } else {
            this.adicionarServico(this.protocolo);
          }
        });
      }
    },
    removerServico(index) {
      this.servicosAdicionados.splice(index, 1);
    },
    buscarServicos(codigo) {
      if (codigo) {
        this.axios.get(`/servico/${codigo}/`).then((response) => {
          this.servicos = response.data.content;
          if (response.data.totalElements > 0) {
            this.placeholderServicos = 'Selecione um serviço';
          } else {
            this.placeholderServicos = 'Nenhum serviço encontrado';
          }
          this.$refs.servicos.focus();
        });
      }
    },
    criarPedido() {
      const novoPedido = {
        clienteId: 1,
        apresentante: 'binhoca',
        apresentanteDocumento: '294.889.898-66',
        identificador: '1',
        servicos: this.servicosAdicionados,
      };
      this.axios.post('/pedido/', novoPedido).then((response) => {
        // eslint-disable-next-line
        console.log(response.data);
      }).catch((error) => {
        if (error.response.status === 400) {
          // deve tratar o erro para listar todos caso tenha
          // eslint-disable-next-line
          console.log(error.response.data.errors[0].defaultMessage);
        }
      });
    },
  },
};
</script>

