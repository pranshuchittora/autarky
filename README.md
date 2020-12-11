<div align="center">
<h1>Autarky</h1>
</div>

![npm](https://img.shields.io/npm/v/autarky)
![downloads](https://img.shields.io/npm/dm/autarky?style=flat)
![NPM](https://img.shields.io/npm/l/autarky)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)
[![Maintainability](https://api.codeclimate.com/v1/badges/ca50bed68e1c8f074c5f/maintainability)](https://codeclimate.com/github/pranshuchittora/autarky/maintainability)
![GitHub stars](https://img.shields.io/github/stars/pranshuchittora/autarky?style=social)

<div align="center">
<img align="center" width="200" src='https://raw.githubusercontent.com/pranshuchittora/autarky/master/docs/assets/logo/autarky_512.png'/>

<h5>Liberating disk space from node_modules</h5>
</div>

<div align="center" style="filter: drop-shadow(0px 0px 10px #222);">
<img width="90%" src='https://raw.githubusercontent.com/pranshuchittora/autarky/master/docs/assets/Demo.gif'/>
</div>

## Installation

```bash
# npm
npm i -g autarky

#yarn
yarn global add autarky
```

## Usage

```bash
$> autarky
```

## Why autarky

In today's world storage is comparatively costlier than compute. Majority of devs uses MacBooks and sadly MacBooks have pretty low storage (for base models). Hence filling up storage is quite often and we spend a lot of time picking stuff to be deleted.

### Motivation

It's 2019 and I got ran out of storage in my laptop after a thorough analysis I found out that the majority of the storage is occupied by `node_modules`. As each project have a separate node_modules (duplication despite the same version).

I also have a few projects which I touch once in a blue moon, hence they end up eating a lot of space. On the other hand, picking & removing `node_modules` manually is a tedious process. So I thought why not automate it.

<div  align="center" style="filter: drop-shadow(0px 0px 10px #222);">
<img width="40%"  src='https://raw.githubusercontent.com/pranshuchittora/autarky/master/docs/assets/heavy.png'/>
</div>

### How it works

Autarky works by traversing all the child directories recursively relative to the current working directory (the place where you are executing autarky).

1. Enter the time in months. Node modules older than the given time will be sowed.
2. Select the `node_modules` which you want to delete.
3. Confirm deletion.
4. Done! (No need to pay for more storage.)

---

## Internals

Autarky is build with latest open source technologies.

1. UI - The user unterface is written in React. Using the Ink's reconciler for rendering the react components.
2. State Management - The challenge of sharing data b/w UI and the process is achieved using Redux.
3. Heavy Computation - Large data crunching is done on child processes.

### Building Blocks

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Ink](https://github.com/vadimdemedes/ink)
- [moment](https://momentjs.com/)
- [rimraf](https://github.com/isaacs/rimraf)
- [chalk](https://github.com/chalk/chalk)

---

## Internals

Autarky is build with latest open source technologies.

1. UI - The user unterface is written in React. Using the Ink's reconciler for rendering the react components.
2. State Management - The challenge of sharing data b/w UI and the process is achieved using Redux.
3. Heavy Computation - Large data crunching is done on child processes.

### Building Blocks

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Ink](https://github.com/vadimdemedes/ink)
- [moment](https://momentjs.com/)
- [rimraf](https://github.com/isaacs/rimraf)
- [chalk](https://github.com/chalk/chalk)

--- 
Read [CONTRIBUTING Guide](./CONTRIBUTING.md)

License MIT

Author: Pranshu Chittora

[Github](https://github.com/pranshuchittora/)
[Twitter](https://twitter.com/pranshuchittora)
[LinkedIn](https://www.linkedin.com/in/pranshuchittora/)
