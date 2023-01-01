## Consulta CEP

🚧 API está offline, logo sua pesquisa pelo CEP não funcionará. Site de hospedagem não tem mais serviço gratuito 🚧

Mas por enquanto pode usar o [Encontre seu endereço](https://encontreseuendereco.netlify.app/) - [Repositório](https://github.com/maikaodev/zipcode)

## Menu

  * [Descrição](#Descrição)
  * [Deploy](#Deploy)
  * [Linkedin](#Linkedin)
  * [Aprendizados](#Aprendizados)
  * [Tecnologias](#Tecnologias)
  * [Pré-requisitos](#Pré-requisitos)
  * [Rodando o Front End](#rodando-o-front-end)


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/).
Além disso é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### Rodando o Front End

```bash
# Clone este repositório
$ git clone https://github.com/maikaodev/consulta_cep.git

# Acesse a pasta do projeto no terminal/cmd
$ cd consulta_cep

# Instalar as dependências
$ yarn install

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# E o servidor iniciará: - acesse <http://127.0.0.1:5173/>
```

### Deploy
https://maikaodev-consulta-cep.netlify.app/

### Linkedin

https://www.linkedin.com/in/maikaodev/

### Descrição

- Projeto desenvolvido para consultar endereço através do CEP. O CEP pesquisado fica armazenado na URL como query params, facilitando em casos de recarregar a página.

### Aprendizados 

 - Metodologia BEM para organizar classes;
 - Aprimoramento do Sass;
 - vue-the-mask: Utilizado nos inputs para dar um efeito visual. Ex.: telefones, cep, CPF;
 - Criar uma [API](https://github.com/maikaodev/consulta_cep_api) a partir de outra API.

### Tecnologias
 
 - [Vite](https://vitejs.dev/);
 - [Vitest](https://vitest.dev/);
 - [Vue.Js](https://vuejs.org/);
 - [Vue Router](https://router.vuejs.org/);
 - [Jest](https://jestjs.io/pt-BR/);
 - [Sass](https://sass-lang.com/);
 - [Testing Library](https://testing-library.com/);
 - [Cypress](https://www.cypress.io/);

