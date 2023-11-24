
```markdown
# Wetter

## Projektübersicht

Lazyweather ist eine dynamische Wetterabfrage-Anwendung mit einem Django-Backend und einem Nuxt/Vuetify.js-Frontend. Sie ermöglicht es Benutzern, einen Ort, ein Datum und eine Uhrzeit einzugeben, um Wetterdaten abzufragen, die dann über eine intuitive Schnittstelle angezeigt werden.

## Aktuelle Entwicklungen

### Frontend-Verbesserungen in WeatherQueryVueThree.vue

- **Validierungsregeln**: Neue Validierungsregeln für Datums- und Zeiteingaben wurden implementiert, um die Datenintegrität und benutzerfreundliche Fehlerbehandlung zu gewährleisten.
- **Datumsformat-Auswahl**: Die Anwendung ermöglicht es den Benutzern nun, zwischen dem amerikanischen ('mm/dd/yyyy') und dem europäischen ('dd.mm.yyyy') Datumsformat zu wählen.
- **Vuex Store Integration**: Vuex Stores wurden für ein effizientes Zustandsmanagement in der gesamten Anwendung eingeführt, einschließlich:
  - `alerts.js` für die Verwaltung von Toasts und Benachrichtigungen.
  - `controller.js` für die Aufrechterhaltung globaler Anwendungszustände.
- **Komponentenversion-Umschaltung**: Ein Umschaltmechanismus wurde entwickelt, um zwischen verschiedenen Komponentenversionen zu wechseln, wobei `WeatherQueryVueThree` die neueste Version ist.

### Testing

- **Unit Testing**: Die aktuellen Unit-Tests decken `WeatherQueryOne.vue` ab. Es wird daran gearbeitet, das Testing auf `WeatherQueryVueThree.vue` auszuweiten.
#### Jest-Testbefehle (mit Yarn)

| Befehl | Beschreibung |
| ------- | ----------- |
| `yarn jest` | Führt alle Jest-Tests im Projekt aus. |
| `yarn jest [test-file]` | Führt Jest-Tests in einer bestimmten Datei aus. |
| `yarn jest --watch` | Führt Jest im Überwachungsmodus aus, Tests werden bei Dateiänderungen erneut ausgeführt. |
| `yarn jest --coverage` | Führt Tests aus und erstellt einen Abdeckungsbericht. |
| `yarn jest WeatherQuery.spec.js --collectCoverageFrom="<rootDir>/components/WeatherQueryOne.vue"` | Einzeltest mit 'Überschreibung' ausführen |

## Nächste Schritte

- Verfeinerung und Testen der Funktionalitäten in `WeatherQueryVueThree.vue`.
- Sicherstellung einer nahtlosen Integration neuer Funktionen mit bestehenden Funktionalitäten.
- Durchführung gründlicher Tests für Stabilität und Zuverlässigkeit.
- Fortlaufende Aktualisierung der Dokumentation, um aktuelle Änderungen widerzuspiegeln.
- Planung weiterer Verbesserungen oder Funktionen nach Bedarf.

## Build-Setup

```bash
# Abhängigkeiten installieren
$ yarn install

# Server mit Hot Reload unter localhost:3000 starten
$ yarn dev

# Für die Produktion bauen und Server starten
$ yarn build
$ yarn start

# Statisches Projekt generieren
$ yarn generate


```

Für eine detaillierte Erklärung, wie alles funktioniert, siehe die [Nuxt.js-Dokumentation](https://nuxtjs.org).

## Spezielle Verzeichnisse

### `assets`

Enthält nicht kompilierte Assets wie Stylus- oder Sass-Dateien, Bilder oder Schriftarten.

[Mehr Informationen](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

Enthält Vue.js-Komponenten. Diese Komponenten bilden die verschiedenen Teile der Seite und können in Seiten, Layouts und andere Komponenten wiederverwendet und importiert werden.

[Mehr Informationen](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Hilft, das Aussehen und Gefühl der Nuxt-App zu ändern, einschließlich Sidebars oder unterschiedlicher Layouts für Mobilgeräte und Desktop.

[Mehr Informationen](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

Enthält Ansichten und Routen der Anwendung. Nuxt liest alle `*.vue`-Dateien in diesem Verzeichnis und richtet den Vue Router automatisch ein.

[Mehr Informationen](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

Enthält JavaScript-Plugins, die vor der Instanziierung der root Vue.js-Anwendung ausgeführt werden sollen. Dies umfasst Vue-Plugins und Funktionen oder Konstanten. Das `axios.js`-Plugin wurde global für HTTP-Anfragen implementiert.

[Mehr Informationen](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

Enthält statische Dateien. Jede Datei in diesem Verzeichnis wird auf `/` abgebildet.

[Mehr Informationen](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

Enthält Vuex Store-Dateien. Das Erstellen einer Datei in diesem Verzeichnis aktiviert Vuex automatisch. Der Store umfasst Module wie `alerts.js` für Benachrichtigungen und `controller.js` für das Zustandsmanagement.

[Mehr Informationen](https://nuxtjs.org/docs/2.x/directory-structure/store).
```

This translation should accurately reflect the content of your `README.md` in German. If you need any further adjustments or translations, feel free to ask!





```markdown
# Weather

## Project Overview

Lazyweather is a dynamic weather querying application featuring a Django backend and a Nuxt/Vuetify.js frontend. It enables users to input a location, date, and hour to query weather data, which is then displayed through an intuitive interface.

## Recent Developments

### Frontend Enhancements in WeatherQueryVueThree.vue

- **Validation Rules**: New validation rules for date and time inputs have been implemented to ensure data integrity and user-friendly error handling.
- **Date Format Selector**: The application now allows users to choose between American ('mm/dd/yyyy') and European ('dd.mm.yyyy') date formats.
- **Vuex Store Integration**: Vuex stores have been introduced for efficient state management across the application, including:
  - `alerts.js` for managing toasts and notifications.
  - `controller.js` for maintaining global application states.
- **Component Version Switching**: A switch mechanism has been developed to toggle between different component versions, with `WeatherQueryVueThree` as the latest version.

### Testing

- **Unit Testing**: The current unit tests cover `WeatherQueryOne.vue`. There are ongoing efforts to extend testing to `WeatherQueryVueThree.vue`.
#### Jest Testing Commands (with Yarn)

| Command | Description |
| ------- | ----------- |
| `yarn jest` | Runs all Jest tests in the project. |
| `yarn jest [test-file]` | Runs Jest tests in a specific file. |
| `yarn jest --watch` | Runs Jest in watch mode, re-running tests when files change. |
| `yarn jest --coverage` | Runs tests and generates a coverage report. |
| `yarn jest WeatherQuery.spec.js --collectCoverageFrom="<rootDir>/components/WeatherQueryOne.vue"` | Running a singlular test with 'overdride' |

## Next Steps

- Refining and testing the functionalities in `WeatherQueryVueThree.vue`.
- Ensuring seamless integration of new features with existing functionalities.
- Conducting thorough testing for stability and reliability.
- Continuing to update documentation to reflect recent changes.
- Planning further enhancements or features as required.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate


```

For a detailed explanation on how things work, check out the [Nuxt.js documentation](https://nuxtjs.org).

## Special Directories

### `assets`

Contains uncompiled assets such as Stylus or Sass files, images, or fonts.

[More information](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

Contains Vue.js components. These components make up the different parts of the page and can be reused and imported into pages, layouts, and other components.

[More information](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Helps change the look and feel of the Nuxt app, including sidebars or distinct layouts for mobile and desktop.

[More information](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

Contains application views and routes. Nuxt reads all the `*.vue` files in this directory and sets up Vue Router automatically.

[More information](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

Contains JavaScript plugins to run before instantiating the root Vue.js Application. This includes Vue plugins and functions or constants. The `axios.js` plugin has been implemented globally for HTTP requests.

[More information](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

Contains static files. Each file inside this directory is mapped to `/`.

[More information](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

Contains Vuex store files. Creating a file in this directory automatically activates Vuex. The store includes modules like `alerts.js` for notifications and `controller.js` for state management.

[More information](https://nuxtjs.org/docs/2.x/directory-structure/store).
```

