//Component
import Home from "../Home/Home.vue";

//Libraries
import { createRouter, createWebHistory } from "vue-router";
import { render, fireEvent } from "@testing-library/vue";
import { describe, expect } from "vitest";

describe("Home", () => {
  /**
   * Instanciando o vue router
   */
  const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: "/", component: Home }],
  });

  it("should be a form", async () => {
    /**
     * Renderizando o componente.
     */
    const { getByTestId } = render(Home, {
      global: {
        plugins: [router],
      },
    });
    //Pegando os elementos:
    const form = getByTestId("form");
    const input = getByTestId("input-text-zip-code");
    const button = getByTestId("submit");

    //assert
    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(form).toContainElement(input);
    expect(form).toContainElement(button);
  });

  it("should be a valid zip code", async () => {
    const { getByTestId } = render(Home, {
      global: {
        plugins: [router],
      },
    });
    //Pegando o elemento:
    const inputText = getByTestId("input-text-zip-code");

    //Eventos
    await fireEvent.update(inputText, "");
    await fireEvent.update(inputText, "aaaaabbccdd");
    await fireEvent.update(inputText, "aaabb123132ccdd");
    await fireEvent.update(inputText, "????@@@@$$%%%");

    //assert
    expect(inputText).toHaveValue("");

    //Evento
    await fireEvent.update(inputText, "57015040");

    //assert
    expect(inputText).toHaveValue("57015-040");
    expect(inputText.value).toHaveLength(9);
  });
});
