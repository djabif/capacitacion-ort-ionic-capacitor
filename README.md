# App Ionic con Vanilla JS y Capacitor

## Demo
https://capacitacion-ionic.web.app

## Requisitos
- Editor de texto: Visual Studio Code
- Tener una versión actualizada de [node.js](https://nodejs.org/en/) y npm
- Instalar el CLI de Ionic
`$ npm install -g @ionic/cli`
- Instalar Android SDK Tools y Android SDK Platforms. [Seguir estos pasos](https://capacitorjs.com/docs/getting-started/environment-setup#android-sdk)


## Estructura inicial
- Crear un `package.json` básico.
    - Se puede crear usando el wizard con `$ npm init`
- `$ ionic init`: crea el json de config de ionic
- `$ git init`: para agregar configuración de git al proyecto


## Ejecutar la app local
Ejecutarla usando el live server de VS Code. Editar el `settings.json` con:

`{
    "liveServer.settings.root": "/www"
}`

<img src="https://drive.google.com/uc?id=1rgGJBUnotXfHwk2BX6qLeUhBKCrh7VDC" alt="initial app structure" width="400"/>

## Ionic
- [Componentes Visuales](https://ionicframework.com/docs/components)

## Capacitor
Herramienta para crear aplicaciones web nativas. Sucesor de Cordova.

- Ejecutar `$ ionic integrations enable capacitor --add`
- Agregar plataforma android: `$ ionic capacitor add android`
    - Crea `/android`. Es el proyecto nativo de android.
- [Configuración necesaria para que Capacitor funcione en vanilla js](https://capacitorjs.com/docs/web#using-capacitor-as-a-script-include)
- [Documentación](https://capacitorjs.com/docs/getting-started)
- [Capacitor JS Utilities](https://capacitorjs.com/docs/basics/utilities)

### Workflow de desarrollo
- Cada vez que hacemos un cambio y queremos sincronizarlo a la app de android: `$ npx cap sync`
- Para correrlo en el emulador o dispositivo conectado: `$ npx cap run android`

### Capacitor Plugins 
Es lo que usamos para acceder a las capacidades del dispositivo.


- Camara plugin: `$ npm install @capacitor/camera `
    - [Setear configuraciones para Android](https://capacitorjs.com/docs/apis/camera#android)

- Geolocation plugin: `$ npm install @capacitor/geolocation`
    - [Setear configuraciones para Android](https://capacitorjs.com/docs/apis/geolocation#android) 
    - [Setear location en el emulador](https://developer.android.com/studio/run/emulator). [Video de cómo hacerlo](https://drive.google.com/file/d/1iLB5zil862iz_wRLZ_WglZwZovaomhyN/view?usp=sharing)   

- QR Scanner: `$ npm install @capacitor-community/barcode-scanner`
    - [Setear configuraciones para Android](https://github.com/capacitor-community/barcode-scanner#android)

