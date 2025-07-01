![](./banner.png)

### A Chrome Extension that beautifies `<pre>` code blocks on minified JS code opened in the browser, injects a caret marker at a specific line + column.

## 🚀 Features

- Detects stack-trace style URLs ending with :line:column (eg `www.myapp.com/main.js:1:22323`)
- Formats default page `<pre>` content with Prettier
- Injects a visual caret (👇) at the exact cursor position
- Scrolls to the caret and shows a bouncing animation


## 📦 Setup

1. Install dependencies

    `yarn install`

2. Run dev mode

    `yarn dev`

   This spins up Vite’s dev server and watches changes to source files.

3. Build extension

    `yarn build`

   Outputs to dist/ folder, ready to load into Chrome as an unpacked extension.

## To test this extension:

1. Build it: yarn build or download `package.zip` and unpack it
2. Go to chrome://extensions
3. Enable "Developer mode"
4. Load dist/ as an unpacked extension
5. Visit a page with a `<pre>` tag and add ?line=3&column=10 or :3:10 to the URL

## Install
