babel-preset-kkt
---

This package includes the [Babel](https://babeljs.io) preset used by kkt.

## Install

```bash
npm i babel-preset-kkt
```

## Usage Outside of kkt

If you want to use this Babel preset in a project not built with `kkt`, you can install it with following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then create a file named `.babelrc` with following contents in the root folder of your project:

```js
{
  "presets": ["kkt"]
}
```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/), which assumes that `Object.assign` is available or polyfilled.