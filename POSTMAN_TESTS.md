# 🎮 API GhostPlay - Pruebas en Postman

## 📋 Rutas Disponibles

### 🔐 Autenticación (`/auth`)

#### 1. **Registrar Usuario**
- **Método**: `POST`
- **URL**: `http://localhost:3012/auth/register`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
  ```json
  {
    "username": "gamer123",
    "email": "gamer123@email.com",
    "password": "123456",
    "favoriteConsole": "PlayStation 5"
  }
  ```
- **Respuesta Exitosa** (201):
  ```json
  {
    "message": "✅ Usuario registrado exitosamente."
  }
  ```

#### 2. **Iniciar Sesión**
- **Método**: `POST`
- **URL**: `http://localhost:3012/auth/login`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
  ```json
  {
    "username": "gamer123",
    "password": "123456"
  }
  ```
- **Respuesta Exitosa** (200):
  ```json
  {
    "message": "✅ Autenticación satisfactoria."
  }
  ```

#### 3. **Obtener Perfil de Usuario (Público)**
- **Método**: `GET`
- **URL**: `http://localhost:3012/auth/profile/gamer123`
- **Headers**: No requiere
- **Respuesta Exitosa** (200):
  ```json
  {
    "message": "✅ Perfil obtenido exitosamente",
    "user": {
      "username": "gamer123",
      "email": "gamer123@email.com",
      "favoriteConsole": "PlayStation 5",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

#### 4. **Obtener Mi Perfil (Autenticado)**
- **Método**: `POST`
- **URL**: `http://localhost:3012/auth/my-profile`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
  ```json
  {
    "username": "gamer123",
    "password": "123456"
  }
  ```
- **Respuesta Exitosa** (200):
  ```json
  {
    "message": "✅ Perfil obtenido exitosamente",
    "user": {
      "username": "gamer123",
      "email": "gamer123@email.com",
      "favoriteConsole": "PlayStation 5",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

### 📝 Posts y Comentarios (`/posts`)

#### 1. **Crear un Post**
- **Método**: `POST`
- **URL**: `http://localhost:3012/posts`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
  ```json
  {
    "title": "Mi experiencia con God of War Ragnarök",
    "description": "Acabo de terminar el juego y quiero compartir mi opinión...",
    "author": "gamer123",
    "category": "Reviews",
    "game": "God of War Ragnarök"
  }
  ```
- **Respuesta Exitosa** (201):
  ```json
  {
    "message": "✅ Post creado exitosamente",
    "post": {
      "_id": "...",
      "title": "Mi experiencia con God of War Ragnarök",
      "description": "Acabo de terminar el juego y quiero compartir mi opinión...",
      "author": "gamer123",
      "category": "Reviews",
      "game": "God of War Ragnarök",
      "likes": 0,
      "comments": [],
      "date": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

#### 2. **Obtener Todos los Posts**
- **Método**: `GET`
- **URL**: `http://localhost:3012/posts`
- **Query Params** (opcionales):
  - `category=Reviews`
  - `game=God of War Ragnarök`
  - `author=gamer123`
- **Respuesta Exitosa** (200):
  ```json
  {
    "message": "✅ Posts obtenidos exitosamente",
    "count": 1,
    "posts": [...]
  }
  ```

#### 3. **Obtener un Post Específico**
- **Método**: `GET`
- **URL**: `http://localhost:3012/posts/POST_ID`
- **Respuesta Exitosa** (200):
  ```json
  {
    "message": "✅ Post obtenido exitosamente",
    "post": {...}
  }
  ```

#### 4. **Agregar Comentario**
- **Método**: `POST`
- **URL**: `http://localhost:3012/posts/POST_ID/comments`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
  ```json
  {
    "username": "gamer456",
    "content": "¡Excelente review! Estoy de acuerdo contigo."
  }
  ```
- **Respuesta Exitosa** (201):
  ```json
  {
    "message": "✅ Comentario agregado exitosamente",
    "comment": {
      "username": "gamer456",
      "content": "¡Excelente review! Estoy de acuerdo contigo.",
      "date": "2024-01-15T11:00:00.000Z"
    },
    "post": {...}
  }
  ```

#### 5. **Obtener Comentarios de un Post**
- **Método**: `GET`
- **URL**: `http://localhost:3012/posts/POST_ID/comments`
- **Respuesta Exitosa** (200):
  ```json
  {
    "message": "✅ Comentarios obtenidos exitosamente",
    "count": 1,
    "comments": [...]
  }
  ```

#### 6. **Dar Like a un Post**
- **Método**: `POST`
- **URL**: `http://localhost:3012/posts/POST_ID/like`
- **Respuesta Exitosa** (200):
  ```json
  {
    "message": "✅ Like agregado exitosamente",
    "likes": 1,
    "post": {...}
  }
  ```

## 🧪 Casos de Prueba

### ✅ **Flujo Exitoso - Autenticación**
1. Registrar un nuevo usuario
2. Iniciar sesión con las credenciales
3. Obtener el perfil público del usuario
4. Obtener el perfil autenticado del usuario

### ✅ **Flujo Exitoso - Posts y Comentarios**
1. Crear un nuevo post
2. Obtener todos los posts
3. Obtener un post específico
4. Agregar comentarios al post
5. Obtener comentarios del post
6. Dar like al post

### ❌ **Casos de Error - Autenticación**
1. **Usuario no existe**: `GET /auth/profile/usuario_inexistente`
2. **Credenciales incorrectas**: `POST /auth/login` con password incorrecto
3. **Usuario ya registrado**: `POST /auth/register` con username existente
4. **Campos faltantes**: `POST /auth/register` sin email

### ❌ **Casos de Error - Posts**
1. **Post no encontrado**: `GET /posts/POST_ID_INEXISTENTE`
2. **Campos faltantes**: `POST /posts` sin título o autor
3. **Categoría inválida**: `POST /posts` con categoría no válida
4. **Comentario sin contenido**: `POST /posts/POST_ID/comments` sin contenido

## 📝 Notas Importantes

### 🔐 Autenticación
- **Seguridad**: Las contraseñas se almacenan en texto plano (pendiente de mejorar)
- **Validación**: Se valida que todos los campos obligatorios estén presentes
- **Unicidad**: Username y email deben ser únicos
- **Fecha**: Se incluye la fecha de creación del usuario automáticamente

### 📝 Posts y Comentarios
- **Categorías**: General, Reviews, Noticias, Tutoriales, Discusión
- **Filtros**: Se pueden filtrar posts por categoría, juego y autor
- **Comentarios**: Se almacenan dentro de cada post
- **Likes**: Contador simple de likes por post
- **Ordenamiento**: Los posts se ordenan por fecha (más recientes primero)

## 🚀 Próximos Pasos

1. ✅ Perfil de usuario
2. ✅ Posts y comentarios
3. 🔄 Favoritos (guardar/obtener)
4. 🔒 Mejorar seguridad (hash de contraseñas)
5. 🎫 Implementar JWT para autenticación 