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

## 🧪 Casos de Prueba

### ✅ **Flujo Exitoso**
1. Registrar un nuevo usuario
2. Iniciar sesión con las credenciales
3. Obtener el perfil público del usuario
4. Obtener el perfil autenticado del usuario

### ❌ **Casos de Error**
1. **Usuario no existe**: `GET /auth/profile/usuario_inexistente`
2. **Credenciales incorrectas**: `POST /auth/login` con password incorrecto
3. **Usuario ya registrado**: `POST /auth/register` con username existente
4. **Campos faltantes**: `POST /auth/register` sin email

## 📝 Notas Importantes

- **Seguridad**: Las contraseñas se almacenan en texto plano (pendiente de mejorar)
- **Validación**: Se valida que todos los campos obligatorios estén presentes
- **Unicidad**: Username y email deben ser únicos
- **Fecha**: Se incluye la fecha de creación del usuario automáticamente

## 🚀 Próximos Pasos

1. ✅ Perfil de usuario
2. 🔄 Favoritos (guardar/obtener)
3. 💬 Comentarios (guardar/obtener)
4. 🔒 Mejorar seguridad (hash de contraseñas)
5. 🎫 Implementar JWT para autenticación 