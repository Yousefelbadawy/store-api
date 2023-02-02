# Storefront Backend Project

## Prepare env
- add a `.env` file in the root directory and set the missing `###` environment parameters
```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=3030
POSTGRES_PORT_TEST=3030
POSTGRES_DB=storefront
POSTGRES_USER=###
POSTGRES_PASSWORD=###
BCRYPT_PASSWORD=###
SALT_ROUNDS=10
TOKEN_SECRET=###
```
## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER shopping_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE shopping;`
    - `CREATE DATABASE shopping_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c shopping`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`
    - Grant for test database
        - `\c shopping_test`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;`
        
## Set up the server


- `npm install` to install all dependencies
- `npm run db-up` to set up the database and get access via http://127.0.0.1:3030
- `npm run build` to build the app

## Start the app
- `npm run start` to start the app and get access via http://127.0.0.1:3000


## Test the app
- add a `database.json` file in the root directory and set the missing `###` parameters
```
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "port": 3030,
    "database": "storefront",
    "user": "###",
    "password": "###"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "port": 3030,
    "database": "storefront",
    "user": "###",
    "password": "###"
  }
}
```
- `npm run test` to run all tests
