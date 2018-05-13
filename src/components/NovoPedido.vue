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
            item-value="id"
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
      </v-layout>
    </v-form>
  </v-container>
</template>
<script>
export default {
  name: 'NovoPedido',
  data: () => ({
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
    servicosAdicionados: [],
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
          idServico: this.servicoSelecionado,
          valorInformado: this.valorBase,
          quantidade: this.quantidade,
          divisorId: this.formaCalculoSelecionada,
          quantidadeDivisor: 0,
        };
        this.axios.post('/servico/calcular/', novoServico)
          .then((response) => {
            this.servicosAdicionados.push(response.data);
            this.$refs.form.reset();
          });
      }
    },
    verificarProtocolo() {
      if (this.servicoSelecionado && this.protocolo) {
        this.axios.get(`/protocolo/${this.servicoSelecionado}/${this.protocolo}/`).then((response) => {
          if (response.data) {
            alert('possui');
          } else {
            this.adicionarServico();
          }
        });
      }
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

