<template>
  <main class="container">
    <Modal v-show="mostrarModal" data-testid="modal"> {{ error }} </Modal>
    <Loading v-show="loading" data-testid="loading"></Loading>
    <section class="container__content">
      <form data-testid="form" @submit.prevent class="container__form">
        <label>
          <Input
            class="container__form__text"
            type="tel"
            placeholder="Ex.: 00000-000"
            v-mask="'#####-###'"
            v-model:modelValue="cep"
            data-testid="input-text-zip-code"
            required
          />
        </label>
        <label>
          <button
            class="container__form__submit"
            data-testid="submit"
            @click="GetTheAddress()"
          >
            Buscar CEP
          </button>
        </label>
      </form>
      <section v-show="mostrar" class="container__result">
        <ul
          v-for="data in data"
          class="container__result__list"
          data-testid="result-list"
        >
          <li class="container__result__list__item" data-testid="result-cep">
            CEP:
            <span>{{ data.cep }}</span>
          </li>
          <li class="container__result__list__item" data-testid="result-estado">
            Estado:
            <span>{{ data.uf }}</span>
          </li>
          <li class="container__result__list__item" data-testid="result-cidade">
            Cidade:
            <span>{{ data.localidade }}</span>
          </li>
          <li
            class="container__result__list__item"
            data-testid="result-logradouro"
          >
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
  name: "Home",
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
    async GetTheAddress() {
      /**
       * Retiro o - do cep e pego somente os n??meros.
       */
      this._cep = this.cep.replace("-", "");
      /**
       * Verifico o tamanho do cep para enviar um cep v??lido.
       * Caso n??o seja v??lido ?? avisado ao usu??rio e a req n??o ?? feita.
       */

      if (this._cep.length < 8 || this._cep.length > 8) {
        setTimeout(() => {
          this.mostrarModal = false;
        }, 2 * 1000);

        this.error = "Digite um CEP v??lido!";
        this.mostrarModal = true;
        this.cep = "";
        return;
      }
      /**
       * Validando caso j?? tenha feito uma requisi????o anteriormente eu reseto os dados.
       */
      if (this.mostrar) {
        this.data = [];
        this.mostrar = false;
      }

      /**
       *Ativando a tela de carregamento.
       */
      this.loading = true;

      //Salvando o cep na rota
      this.$router.push({ path: "", query: { cep: this._cep } });

      const url = `https://api-consulta-cep.herokuapp.com/v1/cep/${this._cep}`;
      /**
       * Pegando os dados e fazendo a requisi????o atrav??s do Fetch, fun????o do pr??prio JavaScript.
       * 1?? Verifico o status da requisi????o.
       * 2?? Salvo os dados no array para fazer o loop e mostrar os dados.
       * 3?? Caso ocorra qualquer tipo de erro na requisi????o e lan??ado isso se forma vis??vel para o usu??rio.
       */

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
            this.error = error.message || "Digite um CEP v??lido!";
            this.mostrarModal = true;
          }
        });

      /**
       * Retiro a tela de carregamento e apago o CEP que est?? dentro do input.
       */
      this.loading = false;
      this.cep = "";
    },
    checkingParams() {
      /**
       * Essa fun????o verifica se h?? par??mentros em rota, caso tenha ?? feito requisi????o.
       */
      const paramCep = this.$router.currentRoute.value.query.cep;
      if (paramCep) {
        this.cep = paramCep;
        this.GetTheAddress();
      }
    },
  },
  created() {
    /**
     * Chamo a fun????o atrav??s do hook created.
     */
    this.checkingParams();
  },
};
</script>
<style src="./style.sass" lang="sass" scoped />
