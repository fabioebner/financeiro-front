<template>
  <v-container grid-list-md text-xs-center fluid="">
    <v-form>
      <v-layout row wrap>
        <v-flex xs4 md4>
          <v-select
            :items="especialidades"
            v-model="especialidadeSelecionada"
            item-value="cdCartorioNatureza"
            item-text="nome"
            label="Especialidade"
            placeholder="Selecione uma especialidade"
            required
          ></v-select>
        </v-flex>
        <v-flex xs4 md4>
          <v-select
            :items="servicos"
            v-model="servicoSelecionado"
            label="Servico"
            :placeholder="placeholderServicos"
            item-value="id"
            item-text="nome"
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
            required
          ></v-select>
        </v-flex>
        <v-flex xs2 md2>
          <v-text-field
            v-model.number="quantidade"
            label="Quantidade"
            mask="###"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 md2>
          <v-text-field
            v-model.number="valorBase"
            label="Valor Base"
            mask="###.###,##"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 md2>
          <v-text-field
            v-model.number="valorBase"
            label="Valor Base"
            mask="###.###,##"
          ></v-text-field>
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
    especialidadeSelecionada: null,
    servicos: [],
    servicoSelecionado: null,
    formaCalculos: [],
    formaCalculoSelecionada: null,
    quantidade: 0,
    valorBase: 0,
    placeholderServicos: 'Selecione uma especialidade',
  }),
  created() {
    this.axios.get('/formacalculo/').then((response) => {
      this.formaCalculos = response.data;
    });
  },
  methods: {
    buscarServicos(codigo) {
      this.axios.get(`/servico/${codigo}/`).then((response) => {
        this.servicos = response.data.content;
        if (response.data.totalElements > 0) {
          this.placeholderServicos = 'Selecione um serviço';
        } else {
          this.placeholderServicos = 'Nenhum serviço encontrado';
        }
      });
    },
  },
};
</script>

