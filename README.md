# Next.js OpenJira App
Para correr lcoalmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__

MongoDB URL Local:
```
    mongodb://localhost:27017/entriesdb
```

* Reconstruir los modulos de node y levantar Next
```
    yarn install
    yarn dev
```

## Configurar las variables de entorno
Rnombrar el archivo __.enx.template__ a __.env__

## Llenar la base de datos con informaicon de pruebas

Llamar a:
```
    http://localhost:3000/api/seed
```
