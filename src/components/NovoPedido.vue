<template>
  <v-container grid-list-md text-xs-center fluid="">
    <v-form ref="form" v-model="valid">
      <v-layout row wrap>
        <v-flex xs4 md4>
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
        </v-flex>
        <v-flex xs4 md4>
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
        </v-flex>
        <v-flex xs4 md4>
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
        </v-flex>
        <v-flex xs2 md2>
          <v-text-field
            v-model.number="quantidade"
            label="Quantidade"
            mask="###"
            required
            :rules="quantidadeRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 md2>
          <v-text-field
            v-model.number="valorBase"
            label="Valor Base"
            mask="###.###,##"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs2 md2>
          <v-text-field
            v-model.number="protocolo"
            label="Protocolo"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 md2>
          <v-btn color="info" @click.stop="verificarProtocolo" :disabled="!valid">Adicionar</v-btn>
        </v-flex>
        <v-flex xs12 md12>
          <v-data-iterator
            :items="servicosAdicionados"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            no-data-text="Nenhum serviço adicionado"
            row
            wrap
          >
            <v-flex
                slot="item"
                slot-scope="props"
                xs12
                sm6
                md4
                lg3
              >

              <v-card>
                <v-card-title>
                  <h4>{{props.item.calculoTabela[0].qtd}} - {{ props.item.nomeServico }}</h4>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <v-btn small icon ripple slot="activator" @click="removerServico(props.index)">
                      <v-icon color="grey lighten-1">clear</v-icon>
                    </v-btn>
                    <span>Remover Serviço</span>
                  </v-tooltip>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-container fluid grid-list-md text-xs-center>
                    <v-layout row wrap>
                      <v-flex xs4 class="caption">
                        {{ props.item.nmCustas1}}<v-spacer></v-spacer>
                        R$: {{ props.item.vlTotalCustas1 }}
                      </v-flex>
                      <v-flex xs4 v-if="props.item.nmCustas2" class="caption">
                        {{ props.item.nmCustas2}}<v-spacer></v-spacer>
                        R$: {{ props.item.vlTotalCustas2 }}
                      </v-flex>
                      <v-flex xs4 v-if="props.item.nmCustas3" class="caption">
                        {{ props.item.nmCustas3}}<v-spacer></v-spacer>
                        R$: {{ props.item.vlTotalCustas3 }}
                      </v-flex>
                      <v-flex xs4 v-if="props.item.nmCustas4" class="caption">
                        {{ props.item.nmCustas4}}<v-spacer></v-spacer>
                        R$: {{ props.item.vlTotalCustas4 }}
                      </v-flex>
                      <v-flex xs4 v-if="props.item.nmCustas5" class="caption">
                        {{ props.item.nmCustas5}}<v-spacer></v-spacer>
                        R$: {{ props.item.vlTotalCustas5 }}
                      </v-flex>
                      <v-flex xs4 v-if="props.item.nmCustas6" class="caption">
                        {{ props.item.nmCustas6}}<v-spacer></v-spacer>
                        R$: {{ props.item.vlTotalCustas6 }}
                      </v-flex>
                      <v-flex xs4 v-if="props.item.nmCustas7" class="caption">
                        {{ props.item.nmCustas7}}<v-spacer></v-spacer>
                        R$: {{ props.item.vlTotalCustas7 }}
                      </v-flex>
                      <v-flex xs4 v-if="props.item.nmCustas8" class="caption">
                        {{ props.item.nmCustas8}}<v-spacer></v-spacer>
                        R$: {{ props.item.vlTotalCustas8 }}
                      </v-flex>
                      <v-flex xs4 v-if="props.item.nmCustas9" class="caption">
                        {{ props.item.nmCustas9}}<v-spacer></v-spacer>
                        R$: {{ props.item.vlTotalCustas9 }}
                      </v-flex>
                      <v-flex xs4 v-if="props.item.nmCustas10" class="caption">
                        {{ props.item.nmCustas10}}<v-spacer></v-spacer>
                        R$: {{ props.item.vlTotalCustas10 }}
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-list>
                 <v-card-actions>
                <v-spacer></v-spacer>
                    <div class="green--text">Total R$ {{props.item.vlTotalCustas10}}</div>
              </v-card-actions>
              </v-card>
            </v-flex>
          </v-data-iterator>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'NovoPedido',
  data: () => ({
    rowsPerPageItems: [4, 8, 12],
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
      {
        nmCustas1: 'Cartorio',
        nomeServico: 'Compra e venda',
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
        valor: 3,
        qtd: 1,
        calculoTabela: [
          {
            nmTabela: '1A',
            divisor: '50% das custas do cartorio',
            codigo: null,
            vlBase: 3,
            qtd: 12,
            data: '15/05/2018',
            custas1: 1207.32,
            custas2: 0,
            custas3: 0,
            custas4: 120.72,
            custas5: 30.18,
            custas6: 48.96,
            custas7: 0,
            custas8: 0,
            custas9: 0,
            custas10: 1407.18,
          },
        ],
        cdFormaCalculo: 103,
        vlTotalCustas1: 1207.32,
        vlTotalCustas2: 0,
        vlTotalCustas3: 0,
        vlTotalCustas4: 120.72,
        vlTotalCustas5: 30.18,
        vlTotalCustas6: 48.96,
        vlTotalCustas7: 0,
        vlTotalCustas8: 0,
        vlTotalCustas9: 0,
        vlTotalCustas10: 1407.18,
        tabelaCustas: '1A',
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
    adicionarServico() {
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

            this.servicosAdicionados.push(servicoCalculado);
            // this.$refs.form.reset();
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
            this.adicionarServico();
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
  },
};
</script>

