# Autarky

Liberating disk space from node_modules

<div style="text-align:center; filter: drop-shadow(0px 0px 10px #222);">
<img style="width:80%" src='https://raw.githubusercontent.com/pranshuchittora/autarky/master/docs/assets/demo.gif'/>
</div>

### Installation

> npm i -g autarky

### Usage

> autarky

### Motivation

It's 2019 and I got ran out of storage in my laptop after a thorough analysis I found out that the majority of the storage is occupied by `node_modules`. As each project have a separate node_modules (duplication in spite of the same version).

I also have a few projects which I touch once in a blue moon, hence they end up eating a lot of space. On the other hand, picking & removing `node_modules` manually is a tedious process. So I thought why not automate it.

<div style="text-align:center; filter: drop-shadow(0px 0px 10px #222);">
<img style="width:80%;max-width:520px" src='https://raw.githubusercontent.com/pranshuchittora/autarky/master/docs/assets/heavy.png'/>
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
