# User management with Express

## Description

This project is based on a NodeJS tutorial of [Desarrollo Útil](https://www.youtube.com/@DesarrolloUtil) YouTube channel. It's a **REST API** that manage CRUD users for a fictional web app, and it's developed with NodeJS and Express.

## Features

- **MongoDB**: This DBMS has been chosen due to its flexibility and scalability. [MongoDB](https://www.mongodb.com/) is a document-oriented NoSQL database that allows efficient storage and retrieval of data.

- **Remote access**: The db is hosted in a remote environment. [Mongoose](https://mongoosejs.com/) package allows the app to communicate with it. To establish a remote connection proper configuration is required. It is essential to define the environment variables to successfully establish the connection. This is further explained later in this README.

- **Data model**: By the moment only one entity was created, the 'user'. This db is designed to store data related to the application users. It includes fields like name, surname, email, password, creation and update date. It could be extended as necessary.

- **CRUD**: It let perform CRUD operations over the user registers.

- **Auth**: The authentication was made by implementing the [JWT](https://jwt.io/) standard.

## Specifications

The user will be able to...

- Register in the application by entering the necessary information.
  - The email must be unique per user.
- Authenticate with the application using their email and password.
  - If the authentication is valid, the application will return an identifier that will serve to prove their identity to the application when they want to make changes to their data
- Obtain all of their data, excluding their password, by utilizing their identifier.
- Update their data by utilizing their identifier.
- Delete all of their data (unregister).

## Run locally

#### NodeJS

For this project I used v18.14.2 of NodeJS. There is a _.nvmrc_ file to select the correct version with **nvm**.
To do this in Windows open a PowerShell terminal in the projects root directory and run `nvm use $(Get-Content .nvmrc)`.
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
