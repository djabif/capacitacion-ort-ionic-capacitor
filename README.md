# App Ionic con Vanilla JS y Capacitor

## Demo
https://capacitacion-ionic.web.app

## Requisitos
- Tener una versión actualizada de [node.js](https://nodejs.org/en/) y npm
- Instalar el CLI de Ionic
`$ npm install -g @ionic/cli`
- Instalar Android SDK Tools, Android SDK Platforms. [Seguir estos pasos](https://capacitorjs.com/docs/getting-started/environment-setup#android-sdk)


## Estructura inicial

- `$ ionic init`: crea el json de config de ionic
- `$ git init` para inicializarlo como repo git
- Crear un `package.json` básico.
    - Se puede crear usando el wizard con `$ npm init`

## Ejecutar la app local
Ejecutarla usando el live server de VS Code. Editar el `settings.json` con:

`{
    "liveServer.settings.root": "/www"
}`

<img src="https://drive.google.com/uc?id=1rgGJBUnotXfHwk2BX6qLeUhBKCrh7VDC" alt="initial app structure" width="400"/>

## Capacitor
- Ejecutar `$ ionic integrations enable capacitor --add`
- Agregar plataforma android: `$ ionic capacitor add android`
    - Crea `/android`. Es el proyecto nativo de android.
- Cada vez que hacemos un cambio y queremos sincronizarlo a la app de android: `$ npx cap sync`
- Correrlo en el emulador o dispositivo enchufado: `$ npx cap run android`

## Ionic
- [Componentes Visuales](https://ionicframework.com/docs/components)

## Capacitor
- [Getting Started](https://capacitorjs.com/docs/getting-started)

- [Config para que Capacitor funcione en vanilla js](https://capacitorjs.com/docs/web#using-capacitor-as-a-script-include)

- Camara plugin: `$ npm install @capacitor/camera --save`
    - [Documentación](https://capacitorjs.com/docs/apis/camera)

- [Capacitor JS Utilities](https://capacitorjs.com/docs/basics/utilities)