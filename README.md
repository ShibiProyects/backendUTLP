# :construction: :book: Notas de Backend

> :construction_worker: :book: **Notas**
>
> - Recuerde usar **npm install** no se almacenan los archivos node_modules para evitar sobrecargar github con datos inútiles.
> - Todavía no modifico la base de datos por lo que la estructura de las SQL no es válido o no es como se espera
> - Falta ordenar el tema de las excepciones y el tratamiento global de estas, pensaba utilizar alguna librería para dejar registro de estas excepciones
> - Algunos EndPoints aún no han sido implementados como tal y falta definir su documentación con **swagger**
> - No toda la documentación de swagger es exacta :eye:
> - Falta arreglar algunas peticiones que devuelven códigos **HTTP** incorrectos
> - Los **update** están marcados como **PATCH** pero aun no se implementa correctamente el parcheo parcial de los datos.

:books: Swagger se encuentra en la URL **/apis/api-docs**

:warning: :books: **Recuerde configurar las variables de entorno**

Estructura del archivo **.env**

```plaintext
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

SERVER_PORT=
```

> :book: Recuerde que el archivo debe ser creado en la carpeta config que debería estar en src, si no se encuentra la carpeta o el archivo debe crearlo

:warning: Recuerde que no se almacena en el registro de git por motivos seguridad

## :construction_worker: Diagrama básico

Está bastante simplificado, pero asi está funcionando ahora mismo las rutas con authentication.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant Middleware
    participant RouteHandler

    Client->>Server: Enviar petición HTTP
    Server->>Middleware: Pasa al Middleware
    Middleware->>Middleware: Valida la petición
    Middleware-->>Server: Validación OK
    Server->>RouteHandler: Llama al controlador de la ruta
    RouteHandler-->>Server: Responde la petición
    Server-->>Client: Enviar respuesta HTTP
```

## JWT

Sitio web donde puede debug el token, recuerde que para validar la autenticidad del token debe usar **JWT_SECRET** definida en el archivo **.env**
<https://jwt.io/>

> :book: **Recuerde que este token probablemente este vencido por la fecha de creación.**

JWT de ejemplo.

```text

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiVGVhY2hlciIsIlN0dWRlbnQiXSwiaWF0IjoxNzMyNzQzMDk2LCJleHAiOjE3MzI3NTAyOTZ9.XbsGPeXW7vmg0vRdUac1HjBtJC975e2AOHty6FOSas8
```

## :lion: Sql Utilizada

Igualmente, el último update de la DB se encuentra en el archivo DB.sql (este archivo contiene algunos datos (están al final))

>:book: Falta crear un archivo seeds.sql que contenga datos de prueba.

falta añadir restricción de único en course status

### Arquitectura

Se utiliza una arquitectura de capas.
Controlador es el encargado de responder peticiones y derivar datos a los servicios.
Servicio encargado de validar reglas de negocio, validar datos obtenidos de db.
Repositorio encargado de la data almacenada.

