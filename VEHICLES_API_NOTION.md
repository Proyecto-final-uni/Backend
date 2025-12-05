# 🚐 API Documentation - Vehicles Module

---

## 📍 Base URL

```
http://localhost:3001
```

---

## 🔐 Autenticación

Todos los endpoints requieren token JWT en el header:

```
Authorization: Bearer {token}
```

---

# 1️⃣ Crear Vehículo

## POST `/vehicles`

Crea un nuevo vehículo en el sistema.

### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {token}"
}
```

### Body

| Campo | Tipo | Descripción | Valores Permitidos | Requerido |
|-------|------|-------------|--------------------|-----------|
| `plate` | string | Placa del vehículo | ABC-123 | ✅ |
| `brand` | string | Marca del vehículo | Toyota, Volvo, Mercedes, etc. | ✅ |
| `model` | string | Modelo del vehículo | Hiace, 9700, Sprinter, etc. | ✅ |
| `capacity` | number | Capacidad de pasajeros | 10, 20, 40, etc. | ✅ |
| `state` | string | Estado del vehículo | `operational`, `inactive`, `maintenance` | ✅ |
| `features` | string (JSON) | Características adicionales | JSON string | ❌ |

### Ejemplo Request

```json
{
  "plate": "ABC-123",
  "brand": "Toyota",
  "model": "Hiace",
  "capacity": 15,
  "state": "operational",
  "features": "{\"air_conditioning\": true, \"wifi\": false, \"usb_ports\": 4}"
}
```

### Ejemplo Request - Sin características

```json
{
  "plate": "XYZ-789",
  "brand": "Volvo",
  "model": "9700",
  "capacity": 40,
  "state": "operational"
}
```

### Ejemplo Request - En mantenimiento

```json
{
  "plate": "DEF-456",
  "brand": "Mercedes",
  "model": "Sprinter",
  "capacity": 20,
  "state": "maintenance",
  "features": "{\"air_conditioning\": true, \"wifi\": true, \"gps\": true}"
}
```

### Response 201 - Success

```json
{
  "id": "vehicle-uuid-123",
  "plate": "ABC-123",
  "brand": "Toyota",
  "model": "Hiace",
  "capacity": 15,
  "state": "operational",
  "features": "{\"air_conditioning\": true, \"wifi\": false, \"usb_ports\": 4}",
  "created_at": "2025-12-05T10:30:00.000Z"
}
```

### Response 400 - Error de validación

```json
{
  "statusCode": 400,
  "message": [
    "state must be one of the following values: operational, inactive, maintenance"
  ],
  "error": "Bad Request"
}
```

### Response 401 - Sin token

```json
{
  "statusCode": 401,
  "message": "Missing authorization header",
  "error": "Unauthorized"
}
```

---

# 2️⃣ Listar Vehículos

## GET `/vehicles`

Obtiene lista de todos los vehículos.

### Headers

```json
{
  "Authorization": "Bearer {token}"
}
```

### Response 200 - Success

```json
[
  {
    "id": "vehicle-uuid-123",
    "plate": "ABC-123",
    "brand": "Toyota",
    "model": "Hiace",
    "capacity": 15,
    "state": "operational",
    "features": "{\"air_conditioning\": true, \"wifi\": false}",
    "created_at": "2025-12-05T10:30:00.000Z"
  },
  {
    "id": "vehicle-uuid-456",
    "plate": "XYZ-789",
    "brand": "Volvo",
    "model": "9700",
    "capacity": 40,
    "state": "inactive",
    "features": null,
    "created_at": "2025-12-05T11:00:00.000Z"
  },
  {
    "id": "vehicle-uuid-789",
    "plate": "DEF-456",
    "brand": "Mercedes",
    "model": "Sprinter",
    "capacity": 20,
    "state": "maintenance",
    "features": "{\"air_conditioning\": true, \"wifi\": true, \"gps\": true}",
    "created_at": "2025-12-05T12:00:00.000Z"
  }
]
```

### Response 401 - Sin token

```json
{
  "statusCode": 401,
  "message": "Invalid token",
  "error": "Unauthorized"
}
```

---

# 3️⃣ Obtener Vehículo por ID

## GET `/vehicles/:id`

Obtiene información de un vehículo específico.

### Headers

```json
{
  "Authorization": "Bearer {token}"
}
```

### URL Parameters

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | UUID | ID del vehículo |

### Ejemplo Request

```
GET /vehicles/vehicle-uuid-123
```

### Response 200 - Success

```json
{
  "id": "vehicle-uuid-123",
  "plate": "ABC-123",
  "brand": "Toyota",
  "model": "Hiace",
  "capacity": 15,
  "state": "operational",
  "features": "{\"air_conditioning\": true, \"wifi\": false, \"usb_ports\": 4}",
  "created_at": "2025-12-05T10:30:00.000Z",
  "updated_at": "2025-12-05T14:00:00.000Z"
}
```

### Response 404 - No encontrado

```json
{
  "statusCode": 404,
  "message": "Cant found the vehicle, Error: No rows found"
}
```

---

# 4️⃣ Actualizar Vehículo

## PATCH `/vehicles/:id`

Actualiza información de un vehículo.

### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {token}"
}
```

### URL Parameters

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | UUID | ID del vehículo |

### Body

Todos los campos son opcionales. Solo envía los que deseas actualizar.

| Campo | Tipo | Descripción | Valores Permitidos |
|-------|------|-------------|--------------------|
| `state` | string | Estado del vehículo | `operational`, `inactive`, `maintenance` |
| `capacity` | number | Capacidad de pasajeros | Número entero positivo |
| `features` | string (JSON) | Características adicionales | JSON string |

### Ejemplo Request - Cambiar estado

```
PATCH /vehicles/vehicle-uuid-123
```

```json
{
  "state": "maintenance"
}
```

### Ejemplo Request - Actualizar capacidad y características

```json
{
  "capacity": 18,
  "features": "{\"air_conditioning\": true, \"wifi\": true, \"usb_ports\": 8, \"bluetooth\": true}"
}
```

### Ejemplo Request - Reactivar vehículo

```json
{
  "state": "operational"
}
```

### Response 200 - Success

```json
{
  "id": "vehicle-uuid-123",
  "plate": "ABC-123",
  "brand": "Toyota",
  "model": "Hiace",
  "capacity": 18,
  "state": "operational",
  "features": "{\"air_conditioning\": true, \"wifi\": true, \"usb_ports\": 8, \"bluetooth\": true}",
  "created_at": "2025-12-05T10:30:00.000Z",
  "updated_at": "2025-12-05T15:45:00.000Z"
}
```

### Response 400 - Valor inválido

```json
{
  "statusCode": 400,
  "message": [
    "state must be one of the following values: operational, inactive, maintenance"
  ],
  "error": "Bad Request"
}
```

### Response 404 - Vehículo no encontrado

```json
{
  "statusCode": 404,
  "message": "Cant update the vehicle data, Error: No rows found"
}
```

---

# 🧪 Flujo Completo de Pruebas

## Escenario 1: Crear y gestionar vehículos

### Paso 1: Login

```
POST http://localhost:3001/auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@transport.com",
  "password": "Admin123456"
}
```

**Guarda el `access_token` de la respuesta**

---

### Paso 2: Crear vehículo operacional

```
POST http://localhost:3001/vehicles
Content-Type: application/json
Authorization: Bearer {access_token}
```

```json
{
  "plate": "ABC-123",
  "brand": "Toyota",
  "model": "Hiace",
  "capacity": 15,
  "state": "operational",
  "features": "{\"air_conditioning\": true, \"wifi\": false, \"usb_ports\": 4}"
}
```

---

### Paso 3: Crear vehículo de alta capacidad

```json
{
  "plate": "BUS-001",
  "brand": "Volvo",
  "model": "9700",
  "capacity": 40,
  "state": "operational",
  "features": "{\"air_conditioning\": true, \"wifi\": true, \"bathroom\": true, \"reclining_seats\": true}"
}
```

---

### Paso 4: Listar todos los vehículos

```
GET http://localhost:3001/vehicles
Authorization: Bearer {access_token}
```

---

### Paso 5: Obtener vehículo específico

```
GET http://localhost:3001/vehicles/{vehicle-id}
Authorization: Bearer {access_token}
```

---

### Paso 6: Enviar vehículo a mantenimiento

```
PATCH http://localhost:3001/vehicles/{vehicle-id}
Content-Type: application/json
Authorization: Bearer {access_token}
```

```json
{
  "state": "maintenance"
}
```

---

### Paso 7: Reactivar vehículo

```
PATCH http://localhost:3001/vehicles/{vehicle-id}
Content-Type: application/json
Authorization: Bearer {access_token}
```

```json
{
  "state": "operational"
}
```

---

# 📊 Estados del Vehículo

| Estado | Descripción | Cuándo usar |
|--------|-------------|-------------|
| `operational` | Vehículo en funcionamiento | Disponible para asignar viajes |
| `inactive` | Vehículo inactivo | Fuera de servicio temporalmente |
| `maintenance` | En mantenimiento | Requiere reparación o revisión |

---

# 🔧 Estructura del Campo `features`

El campo `features` debe ser un **string JSON** con las características del vehículo.

### Ejemplo de características comunes:

```json
{
  "air_conditioning": true,
  "wifi": true,
  "usb_ports": 4,
  "bluetooth": true,
  "gps": true,
  "bathroom": false,
  "reclining_seats": true,
  "entertainment_system": false
}
```

### Cómo enviarlo en el request:

```json
{
  "features": "{\"air_conditioning\": true, \"wifi\": true, \"usb_ports\": 4}"
}
```

**Importante:** El JSON debe estar **escapado como string**.

---

# 📋 Ejemplos de Vehículos por Tipo

## Minibús (Capacidad pequeña)

```json
{
  "plate": "MIN-001",
  "brand": "Toyota",
  "model": "Hiace",
  "capacity": 15,
  "state": "operational",
  "features": "{\"air_conditioning\": true, \"wifi\": false, \"usb_ports\": 2}"
}
```

## Bus Mediano

```json
{
  "plate": "BUS-002",
  "brand": "Mercedes",
  "model": "Sprinter",
  "capacity": 20,
  "state": "operational",
  "features": "{\"air_conditioning\": true, \"wifi\": true, \"usb_ports\": 6, \"gps\": true}"
}
```

## Bus Grande (Interprovincial)

```json
{
  "plate": "BUS-003",
  "brand": "Volvo",
  "model": "9700",
  "capacity": 40,
  "state": "operational",
  "features": "{\"air_conditioning\": true, \"wifi\": true, \"bathroom\": true, \"reclining_seats\": true, \"entertainment_system\": true, \"usb_ports\": 40}"
}
```

---

# 🔢 Códigos de Estado HTTP

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| **200** | OK | Operación exitosa (GET, PATCH) |
| **201** | Created | Vehículo creado exitosamente (POST) |
| **400** | Bad Request | Datos inválidos (estado incorrecto, JSON mal formado) |
| **401** | Unauthorized | Token faltante o inválido |
| **404** | Not Found | Vehículo no existe |
| **500** | Internal Server Error | Error del servidor |

---

# ⚠️ Errores Comunes

## Error: "state must be one of the following values"

**Causa:** Intentas usar un estado que no está permitido

**Solución:** Usa solo: `operational`, `inactive`, o `maintenance`

---

## Error: "features must be a valid JSON string"

**Causa:** El JSON en `features` está mal formado

**Solución:** Asegúrate de escapar correctamente el JSON como string

```json
// ❌ MAL
{
  "features": {"wifi": true}
}

// ✅ BIEN
{
  "features": "{\"wifi\": true}"
}
```

---

## Error: "Cant found the vehicle"

**Causa:** El ID del vehículo no existe

**Solución:** Verifica el UUID del vehículo con GET `/vehicles`

---

# 🎯 Testing con RapidAPI Client

## Variables de entorno

```
baseUrl = http://localhost:3001
token = (se obtiene después del login)
vehicleId = (se obtiene después de crear un vehículo)
```

## Colección de Requests

### 1. Login
```
POST {{baseUrl}}/auth/login
```

### 2. Create Vehicle
```
POST {{baseUrl}}/vehicles
Authorization: Bearer {{token}}
```

### 3. List Vehicles
```
GET {{baseUrl}}/vehicles
Authorization: Bearer {{token}}
```

### 4. Get Vehicle by ID
```
GET {{baseUrl}}/vehicles/{{vehicleId}}
Authorization: Bearer {{token}}
```

### 5. Update Vehicle State
```
PATCH {{baseUrl}}/vehicles/{{vehicleId}}
Authorization: Bearer {{token}}
```

Body:
```json
{
  "state": "maintenance"
}
```

### 6. Update Vehicle Features
```
PATCH {{baseUrl}}/vehicles/{{vehicleId}}
Authorization: Bearer {{token}}
```

Body:
```json
{
  "features": "{\"air_conditioning\": true, \"wifi\": true, \"gps\": true}"
}
```

---

**Última actualización:** 5 de diciembre de 2025
