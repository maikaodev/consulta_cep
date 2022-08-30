<template>
  <main class="container">
    <Modal v-show="mostrarModal"> {{ error }} </Modal>
    <Loading v-show="loading"></Loading>
    <section class="container__content">
      <form @submit.prevent class="container__form">
        <label>
          <Input
            class="container__form__text"
            type="tel"
            placeholder="Ex.: 00000-000"
            v-mask="'#####-###'"
            v-model:modelValue="cep"
            required
          />
        </label>
        <label>
          <InputButton
            class="container__form__submit"
            type="submit"
            value="Buscar CEP"
            @click="getCEP()"
          />
        </label>
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
    </section>
    <footer class="container__socialmedia">
      <SocialMedia />
    </footer>
  </main>
</template>

<script>
import { mask } from "vue-the-mask";
import Input from "@/components/Input/Input.vue";
import InputButton from "@/components/InputButton/InputButton.vue";
import Modal from "@/components/Modal/Modal.vue";
import Loading from "@/components/Loading/Loading.vue";
import SocialMedia from "@/components/SocialMedia/SocialMedia.vue";

export default {
  name: "Form",
  directives: { mask },
  components: { Input, InputButton, Modal, Loading, SocialMedia },
  data() {
    return {
      mostrar: false,
      data: [],
      cep: "",
      _cep: "",
      error: "",
      loading: false,
      mostrarModal: false,
    };
  },
  methods: {
    async getCEP() {
      this._cep = this.cep.replace("-", "");

      if (this._cep.length < 8 || this._cep.length > 8) {
        setTimeout(() => {
          this.mostrarModal = false;
        }, 2 * 1000);
        this.error = "Digite um CEP válido!";
        this.mostrarModal = true;
        this.cep = "";
        return;
      }

      if (this.mostrar) {
        this.data = [];
        this.mostrar = false;
      }
      this.loading = true;

      const url = `https://api-consulta-cep.herokuapp.com/cep/${this._cep}`;

      await fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error();
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
            this.error = error.message || "Digite um CEP válido!";
            this.mostrarModal = true;
          }
        });
      this.loading = false;
      this.cep = "";
    },
  },
};
</script>
<style src="./style.sass" lang="sass" scoped />
