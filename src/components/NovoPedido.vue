<template>
  <v-container grid-list-md text-xs-center fluid="">
    <v-form>
      <v-layout row wrap>
        <v-flex xs4 md4>
          <v-select
            :items="especialidades"
            v-model="especialidadeSelecionada"
            label="Especialidade"
            required
          ></v-select>
        </v-flex>
        <v-flex xs4 md4>
          <v-select
            :items="servicos"
            v-model="servicoSelecionado"
            label="Servico"
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
    especialidades: [],
    especialidadeSelecionada: null,
    servicos: [],
    servicoSelecionado: null,
    quantidade: 0,
    valorBase: 0,
  }),
};
</script>

