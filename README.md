Run SMLAD project README

```bash
cd api/
```

###Create .env file 

example
```bash
PORT=3000
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=yourUsername
DB_PASSWORD=yourPassword
DB_DATABASE_NAME=yourDatabase
JWT_SECRET=putRandomString
JWT_EXPIRE_TIME=3600000000
Collapse
```

###Create ormconfig.json file

example 

```bash
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "yourUsername",
    "password": "yourPassword",
    "database": "yourDatabase",
    "entities": [
        "src/database/entities/**/*.ts"
    ],
    "migrations": [
        "src/database/migration/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/database/entities",
        "migrationsDir": "src/database/migration"
    }
}
```
next 
```bash
npm i
```
next
```bash
npm run typeorm:migrate Inital 
```
next
```bash
npm run typeorm:run
```
next
```bash
npm run start:dev
```

next
```bash
npm run seed
```

Go to client 
```bash
cd ../client 
```

```bash
npm i 
```

```bash
ng s 
```

You can use mock DB from db folder

Voala 





