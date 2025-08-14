![](./banner.png)

### A Chrome Extension that beautifies `<pre>` code blocks on minified JS code opened in the browser, injects a caret marker at a specific line + column.

## 🚀 Features

- Detects stack-trace style URLs ending with :line:column (eg `www.myapp.com/main.js:1:22323`)
- Formats default page `<pre>` content with Prettier
- Lazy loads a light weight browser editor (monaco)
- Injects a visual caret (👉) at the location of the stack trace
- Auto scrolls to the location


## 📦 Setup

1. Install dependencies

    `yarn install`

2. Run dev mode

    `yarn dev`

   This spins up Vite’s dev server and watches changes to source files.

3. Build extension

    `yarn build`

   Outputs to dist/ folder, ready to load into Chrome as an unpacked extension.

## Install

1. Build it: yarn build or download `package.zip` and unpack it
2. Go to chrome://extensions
3. Enable "Developer mode"
4. Load dist/ as an unpacked extension
5. Visit any `.js` page and append a line and column number to the URL eg.. `www.mydopeapp/static/js/main.1817bf41.chunk.js:2:35`
