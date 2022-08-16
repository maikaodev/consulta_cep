<template>
  <main class="container">
    <form class="container__form">
      <Input class="container__form__text" />
      <Input class="container__form__submit" type="submit" value="Buscar CEP" />
    </form>
    <section class="container__result">
      <ul class="container__result__list">
        <li class="container__result__list__item">
          CEP:
          <span>12345678</span>
        </li>
        <li class="container__result__list__item">
          Cidade:
          <span>Alagoas</span>
        </li>
        <li class="container__result__list__item">
          Cidade:
          <span>Maceió</span>
        </li>
        <li class="container__result__list__item">
          Logradouro:
          <span>1° Travessa Costa Nabal </span>
        </li>
      </ul>
    </section>
  </main>
</template>
<script>
import Input from "../Input/Input.vue";
export default {
  name: "Form",
  components: { Input },
  data() {
    return {};
  },
};
</script>
<style src="./style.sass" lang="sass" scoped />
