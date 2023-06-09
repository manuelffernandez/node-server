# User management with Express

## Description

It's a backend App developed with Node and Express to manage users for a fictional web application.
The communication should be done via a **REST API (HTTP)**.

[MongoDB](https://www.mongodb.com/) cloud database is used to store the data.

## Run locally

#### NodeJS

For this project I used v18.14.2 of NodeJS. There is a _.nvmrc_ file to select the correct version with **nvm**.
To do this in Windows open a PowerShell terminal in the project directory and run `nvm use $(Get-Content .nvmrc)`.
In Linux or Mac, open a terminal in the project directory and run `nvm use`.

If you don't have nvm installed in your computer, ensure that you have that specific node version. You can check your Node version by running `node -v` in a terminal.

#### <sub>See [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) for more info.</sub>

#### Packages

Once you ensure that you have the correct Node version, open a terminal inside the projects root directory and run `npm install`

#### Environment variables

There is a _.env.example_ file within the root folder. This file serves as a template or sample file for configuring environment variables. To accomplish this, create a new file called '.env' inside the root folder and set up your own environment-specific configuration using '.env.example' as a guide. The [dotenv](https://www.npmjs.com/package/dotenv) package will do the rest.

#### Scripts

- **'dev'**: It's utilized during the development to run the TS code without need compile every each time you make changes on it.

- **'build'**: Run this to compile the TS code into new directory called _'build '_ and prepare it for production.

- **'start'**: Compile the TS code and run the code with `node` command.

## Contact me :arrow_down:

#### :email: [manufer6503@gmail.com](mailto:manufer6503@gmail.com)

#### :link: [linkedin](https://www.linkedin.com/in/manuelffernandez/)

#### :iphone: +54 9 294 4650354
