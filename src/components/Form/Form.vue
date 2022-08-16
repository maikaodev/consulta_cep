<template>
  <main class="container">
    <form @submit.prevent class="container__form">
      <Input
        class="container__form__text"
        type="number"
        placeholder="Ex.: 00000-000"
        v-model:modelValue="cep"
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
    getCEP() {
      const url = `https://viacep.com.br/ws/${this.cep}/json/`;

      if (this.cep < 8) {
        alert("CEP invalid");
      } else {
        try {
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              this.$cep = data.cep;
              this.logradouro = data.logradouro;
              this.localidade = data.localidade;
              this.uf = data.uf;
              this.mostrar = true;
            });
        } catch (error) {
          console.log(error);
        }
      }
      this.cep = "";
    },
  },
};
</script>
<style src="./style.sass" lang="sass" scoped />
