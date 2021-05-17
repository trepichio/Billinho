<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="./assets/images/LogoMakr-0tvXQO.png" alt="Project logo"></a>
</p>

<h3 align="center">Billinho</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/trepichio/Billinho)](https://github.com/trepichio/Billinho/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/trepichio/Billinho)](https://github.com/trepichio/Billinho/pulls)

![GitHUb Repo Views](https://visitor-badge.glitch.me/badge?page_id=Billinho.visitor-badge) ![GitHub Repo stars](https://badgen.net/github/stars/trepichio/Billinho)
![GitHub top language](https://img.shields.io/github/languages/top/trepichio/Billinho?style=falt)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> It's a simple REST API built in NodeJS that allow users to enroll in courses of some kind of institution and manage their bills. It just has the minimum requirements of CRUD. Built for a job interview.
    <br>
</p>

## 📝 Table of Contents

- [About](#about)
- [Before you read further](#)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This is a simple REST API that demonstrate CRUD capabilities to manage Students' course enrollments and their bills, authenticate users, and persist data on any database supported by [Sequelize](http://sequelize.org/).

The purpose of doing this project was a requested exam from a company that I had a job interview, and also, sure, learn more about technologies and stack involved on it.

In this project, particularly, I've got a struggle to make 'delete on cascade' working as I did choose to use Paranoid (Sofdeletes). I'm glady that after reading a lot on web (Google, Stackoverflow and Medium are always helpful) it did work! 😄😎

I appreciated the opportunity of doing this small project and hope it will be useful somehow to anyone out there.

## ⚠️ Before you read further <a name = "before_read_further"></a>

I let all CRUD in the public routes INTENTIONALLY. This is for making easier and quickier an demonstration during job interview. That way I didn't need to worry about authenticating a user and needing to put the token in every request. Life is already hard enough, let this one make mine better. 🤣🤣

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes..

### Prerequisites

You need a database server installed and running on your local machine.
I've used [PostgreSQL](http://www.postgresql.org) on this project.

Then, you can use a default user `postgres` and database `postgres` or create and use your own. It's up to you.

After that, it's time to setup the project.

### Installing

Clone this repository to your local machine.

```
$ git clone https://github.com/trepichio/Billinho/Billinho.git
```

Enter the root folder of the cloned project.
Rename `.env.example` file to `.env` and input them as values of their respectives variables in the .env file

The variables are pretty much self-explanatory.

Install dependecies. In your terminal, run:

```
$ npm install
```

Now, you have to migrate the tables to database.
At the root of project folder, run:

```
$ node_modules/.bin/sequelize db:migrate
```

then, seed data to the tables.

```
$ node_modules/.bin/sequelize db:seed:all
```

### Running
You are ready to go:

```
$ npm start
```

Now, you can use any REST Client you like and consume any of API endpoints such as

```
GET http://localhost:3000/pub/instituicoes?page=1&limit=4 HTTP/1.1.
```

If you use Visual Code there is a very useful extension that works like a REST Client. See [here](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

In case, you decided to go and use this extension, enjoy the `request.rest` file I've already done for you. Enjoy! 😎

## 🔧 Running the tests <a name = "tests"></a>

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## ⛏️ Built Using <a name = "built_using"></a>

- [PostgreSQL](https://www.postgres.org/) - Relational Database
- [Sequelize](https://www.sequelize.org/) - promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Author <a name = "authors"></a>

| [<img alt="João Trepichio" src="https://avatars2.githubusercontent.com/u/11396817?s=460&u=085712d4f1296e6ad0a220ae7c0ea5278a9c40ed&v=4" width="100">](https://trepichio.github.io) |
|:--------------------------------------------------:|
| [João Trepichio](https://trepichio.github.io)    |