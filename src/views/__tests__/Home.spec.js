import { createRouter, createWebHistory } from "vue-router";
import { render, fireEvent } from "@testing-library/vue";
import Home from "../Home/Home.vue";
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
    const { findByTestId } = render(Home, {
      global: {
        plugins: [router],
      },
    });

    expect(findByTestId("form"));
    expect(findByTestId("input-text-zip-code"));
    expect(findByTestId("submit"));
  });

  it("should be a valid zip code", async () => {
    const { getByTestId } = render(Home, {
      global: {
        plugins: [router],
      },
    });
    const inputText = getByTestId("input-text-zip-code");

    await fireEvent.update(inputText, "");
    await fireEvent.update(inputText, "aaaaabbccdd");
    await fireEvent.update(inputText, "aaabb123132ccdd");
    await fireEvent.update(inputText, "????@@@@$$%%%");
    expect(inputText.value).toBe("");

    await fireEvent.update(inputText, "57015040");
    expect(inputText.value).toBe("57015-040");
    expect(inputText.value).toHaveLength(9);
  });
});
