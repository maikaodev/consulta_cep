<template>
  <main class="container">
    <Modal v-show="mostrarModal"> {{ error }} </Modal>
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
      <ul v-for="data in data" class="container__result__list">
        <li class="container__result__list__item">
          CEP:
          <span>{{ data.cep }}</span>
        </li>
        <li class="container__result__list__item">
          Estado:
          <span>{{ data.uf }}</span>
        </li>
        <li class="container__result__list__item">
          Cidade:
          <span>{{ data.localidade }}</span>
        </li>
        <li class="container__result__list__item">
          Logradouro:
          <span>{{ data.logradouro }} </span>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import Input from "../Input/Input.vue";
import InputButton from "../InputButton/InputButton.vue";
import Modal from "../Modal/Modal.vue";
export default {
  name: "Form",
  components: { Input, InputButton, Modal },
  data() {
    return {
      mostrar: false,
      data: [],
      cep: "",
      error: "",
      mostrarModal: false,
    };
  },
  methods: {
    async getCEP() {
      if (this.cep.length < 8 || this.cep.length > 8) {
        setTimeout(() => {
          this.mostrarModal = false;
        }, 2 * 1000);
        this.error = "Digite um CEP válido!";
        this.mostrarModal = true;
        this.cep = "";
        return;
      }

      if (this.mostrar) {
        this.mostrar = false;
      }

      const url = `https://api-consulta-cep.herokuapp.com/cep/${this.cep}`;

      await fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Aconteceu um erro inesperado!");
          }
        })
        .then((data) => {
          this.data.push(data);
          this.mostrar = true;
        })
        .catch((error) => {
          if (error) {
            setTimeout(() => {
              this.mostrarModal = false;
            }, 2 * 1000);
            this.error = "Digite um CEP válido!";
            this.mostrarModal = true;
          }
        });

      this.cep = "";
    },
  },
};
</script>
<style src="./style.sass" lang="sass" scoped />
