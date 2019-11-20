# Autarky

Liberating disk space from node_modules

![npm](https://img.shields.io/npm/v/autarky)
![downloads](https://img.shields.io/npm/dm/autarky?style=flat)
![NPM](https://img.shields.io/npm/l/autarky)
![GitHub stars](https://img.shields.io/github/stars/pranshuchittora/autarky?style=social)

<div align="center" style="filter: drop-shadow(0px 0px 10px #222);">
<img src='https://raw.githubusercontent.com/pranshuchittora/autarky/master/docs/assets/demo.gif'/>
</div>

### Installation

> npm i -g autarky

### Usage

> autarky

### Motivation

It's 2019 and I got ran out of storage in my laptop after a thorough analysis I found out that the majority of the storage is occupied by `node_modules`. As each project have a separate node_modules (duplication in spite of the same version).

I also have a few projects which I touch once in a blue moon, hence they end up eating a lot of space. On the other hand, picking & removing `node_modules` manually is a tedious process. So I thought why not automate it.

<div  align="center" style="filter: drop-shadow(0px 0px 10px #222);">
<img width="50%"  src='https://raw.githubusercontent.com/pranshuchittora/autarky/master/docs/assets/heavy.png'/>
</div>

### Installation

> npm i -g autarky

### Usage

> autarky

### How it works

Autarky works by traversing all the child directories recursively relative to the current working directory (the place where you are executing autarky).

1. Enter the time in months. Node modules older than the given time will be sowed.
2. Select the `node_modules` which you want to delete.
3. Confirm deletion.
4. 200 😉

---

License MIT

Author: Pranshu Chittora

[Github](https://github.com/pranshuchittora/)
[Twitter](https://twitter.com/pranshuchittora)
