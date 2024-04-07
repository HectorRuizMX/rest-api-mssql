# rest-api-mssql
Esto es un framework para crear un API Restful para usarlo con sql

## Referencias API

#### Get todos los items de un catálogo

```http
  GET /api/catalogo
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | **Required**. Tu token de sesión |

#### Get item

```http
  GET /api/catalogo/${tk}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Tu token de sesión |
| `tk`         | `string` | **Required**. El token del item |

#### Post item

```http
  POST /api/catalogo/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Tu token de sesión |
| `campos`     | `object` | Todo los campos requeridos por el item **Ver en la documentación** |

#### Put item

```http
  PUT /api/catalogo/${tk}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Tu token de sesión |
| `tk`         | `string` | **Required**. El token del item |
| `campos`     | `object` | Todo los campos que se modificaran a el item **Ver en la documentación** |


#### Delete item

```http
  DELETE /api/catalogo/${tk}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Tu token de sesión |
| `tk`         | `string` | **Required**. El token del item |

## Documentación

[Rutas API](https://github.com/HectorRuizMX/rest-api-mssql/blob/master/doc/api-routes.md)


## Correr localmente

Clonar el proyecto

```bash
  git clone https://github.com/HectorRuizMX/rest-api-mssql
```

Ir al directorio

```bash
  cd rest-api-mssql
```

Instalar dependencias

```bash
  npm install
```

Correr el server

```bash
  npm run dev
```


## Variables de entorno

Para correr el proyecto es necesario agregar las siguientes variables de entorno al archivo .env en la carpeta raíz

`PORT`: Puerto para correr el servicio. **Ejemplo:** 3000



## Autores

- [@HectorRuizMx](https://www.github.com/HectorRuizMX)


## License

[MIT](https://choosealicense.com/licenses/mit/)

