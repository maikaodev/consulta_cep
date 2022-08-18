<template>
  <main class="container">
    <form @submit.prevent class="container__form">
      <Input
        class="container__form__text"
        type="number"
        placeholder="Ex.: 00000-000"
        v-model:modelValue="cep"
        required
      />
      <InputButton
        class="container__form__submit"
        type="submit"
        value="Buscar CEP"
        @click="getCEP()"
      />
    </form>
    <section v-show="mostrar" class="container__result">
      <ul class="container__result__list">
        <li class="container__result__list__item">
          CEP:
          <span>{{ $cep }}</span>
        </li>
        <li class="container__result__list__item">
          Estado:
          <span>{{ uf }}</span>
        </li>
        <li class="container__result__list__item">
          Cidade:
          <span>{{ localidade }}</span>
        </li>
        <li class="container__result__list__item">
          Logradouro:
          <span>{{ logradouro }} </span>
        </li>
      </ul>
    </section>
  </main>
</template>

<!-- LINK : https://viacep.com.br/ws/{{CEP}}/json/-->
<!-- CEP : 57073541 -->
<script>
import Input from "../Input/Input.vue";
import InputButton from "../InputButton/InputButton.vue";
export default {
  name: "Form",
  components: { Input, InputButton },
  data() {
    return {
      mostrar: false,
      cep: "",
      $cep: "",
      logradouro: "",
      localidade: "",
      uf: "",
    };
  },
  methods: {
    async getCEP() {
      if (this.cep.length < 8) {
        //TODO: Lançar a modal
        alert("Informe o cep corretamente!");
        return;
      }

      const url = `https://viacep.com.br/ws/${this.cep}/json/`;

      await fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Aconteceu um erro inesperado!");
          }
        })
        .then((data) => {
          if (data.erro === "true") {
            //TODO: Lançar a modal
            throw new Error("CEP inexistente!");
          }
          this.$cep = data.cep;
          this.logradouro = data.logradouro;
          this.localidade = data.localidade;
          this.uf = data.uf;
          this.mostrar = true;
        })
        .catch((error) => {
          if (error) {
            //TODO: Lançar a modal
            alert("CEP inválido!");
          }
        });

      this.cep = "";
    },
  },
};
</script>
<style src="./style.sass" lang="sass" scoped />
