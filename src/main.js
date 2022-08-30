import { createApp } from "vue";
import "./App/style.css";
import App from "./App/App.vue";
import router from "@/router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(faLinkedin, faGithubSquare);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
