# ToDo

A simple To Do app with basic authentication.

## Libraries and Frameworks

### Vue 3

The app is built using the [Vue 3 framework](https://vuejs.org/), using the [Composition API](https://vuejs.org/guide/introduction.html).

### Pinia

The store library it uses is [Pinia](https://pinia.vuejs.org/introduction.html).

#### Pinia Plugin Persistedstate

For store persistance it uses [Pinia Plugin Persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)

### Tailwind CSS

It uses [Tailwind](https://tailwindcss.com/docs/installation), mainly to get to know it and see if I like it.

### VeeValidate & Yup

It uses [VeeValidate](https://vee-validate.logaretm.com/v4/) and [Yup](https://github.com/jquense/yup) for form validation.

### Firebase

#### Firebase/authentication

[Firebase Authentication](https://firebase.google.com/docs/auth) handles the authentication.

#### Firebase/Firestore

It uses [Cloud Firestore](https://firebase.google.com/docs/firestore) as its database.

### Vue-toastification

To simplify notifications it uses [Vue Toastification](https://openbase.com/js/vue-toastification)

### Font Awesome

Icons used are from [Font Awesome](https://fontawesome.com/docs/web/use-with/vue/)

### VueUse

It uses the `onClickOutside` directive from [VueUse](https://vueuse.org/) to simplify handling closing menus and dialogs when clicking outside the element.

## Scripts

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
