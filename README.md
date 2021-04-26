# nlw5-plantmanager-reactNative
An app to remember to water plants 

# Project PlantManager

Project carried out during the Next Level Week (NLW) event, where the company Rocketseat offers study trails, so that the Dvs reach the next level in their careers.

Work with ReactNative, TypeScript and Json Server

---

<p align="center">
  <img width="300" src="src/assets/to_readme/planrmanager.gif">
</p>


## Getting Started


First, install all dependencies:

```bash
npm install
# or
yarn
```

Second, install and run json server:

Config scripts in your package.json with your IP in --host

```json
"server": "json-server ./src/services/server.json --host 192.168.0.20 --port 3333 --delay 700"
```

In src/services/api.ts add your ip in baseURL
```ts
baseURL: 'http://192.168.0.20:3333'
```

Install json-server and run
```bash
npm install -g json-server
yarn server
```

third, run the development server:

```bash
yarn start
```

Open [Run expo](https://docs.expo.io/)
