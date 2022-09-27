<template>
  <section>
    <nav>
      <ul>
        <li>
          <a
            data-testid="linkedin-maikaodev"
            href="https://www.linkedin.com/in/maikaodev/"
            target="_blank"
          >
            <font-awesome-icon class="icon" icon="fa-brands fa-linkedin" />
          </a>
        </li>
        <li>
          <a
            data-testid="github-maikaodev"
            href="https://github.com/maikaodev"
            target="_blank"
          >
            <font-awesome-icon class="icon" icon="fa-brands fa-square-github" />
          </a>
        </li>
      </ul>
    </nav>
    <p>Developer by &copy maikaodev</p>
  </section>
</template>
<script>
export default {
  name: "SocialMedia",
  data() {
    return {};
  },
};
</script>
<style src="./style.sass" lang="sass" scoped />
