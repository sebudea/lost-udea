# Software Design Document (SDD)

## Lost UdeA - Sistema de Gestión de Objetos Perdidos

### Versión 1.0

## Historial de Revisiones

| Fecha   | Versión | Descripción                   | Autor       |
| ------- | ------- | ----------------------------- | ----------- |
| [Fecha] | 1.0     | Versión inicial del documento | [Tu nombre] |

## Tabla de Contenidos

1. [Arquitectura del Sistema](#1-arquitectura-del-sistema)
2. [Diagramas UML](#2-diagramas-uml)
3. [Diseño de Base de Datos](#3-diseño-de-base-de-datos)
4. [Interfaces de Usuario](#4-interfaces-de-usuario)
5. [Patrones de Diseño](#5-patrones-de-diseño)

## 1. Arquitectura del Sistema

### 1.1 Visión General

El sistema sigue una arquitectura basada en servicios utilizando React para el frontend y Firebase para los servicios backend.

### 1.2 Componentes Principales

1. **Frontend (Cliente)**

   - React + TypeScript
   - Material-UI para componentes
   - Gestión de estado con Context API/Redux
   - Routing con React Router

2. **Servicios (Firebase)**

   - Authentication: Gestión de usuarios y autenticación
   - Realtime Database: Almacenamiento de datos en tiempo real
   - Storage: Almacenamiento de imágenes
   - Cloud Functions (opcional): Para lógica del servidor

3. **Hosting**
   - Vercel para el frontend
   - Firebase para servicios backend

### 1.3 Flujo de Datos

```
[Cliente Web] ←→ [Firebase Auth] ←→ [Firebase Realtime DB]
                                  ←→ [Firebase Storage]
```

## 2. Diagramas UML

### 2.1 Diagrama de Casos de Uso

[Insertar diagrama que muestre la interacción entre usuarios y sistema]

### 2.2 Modelos de Datos

```typescript
interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
  // Campos opcionales específicos para seekers
  phoneNumber?: string; // Requerido solo para seekers
  idNumber?: string; // Cédula, requerido solo para seekers
}

interface FoundItem {
  id: string;
  type: string; // Tipo de objeto
  location: string; // Lugar donde se encontró
  foundDate: Date; // Fecha cuando se encontró
  description: string; // Descripción generada por IA
  image: string;
  status: "pending" | "delivered" | "matched";
  finderId: string; // ID del usuario que lo encontró
}

interface LostItem {
  id: string;
  type: string; // Tipo de objeto
  locations: string[]; // Array de posibles lugares (máximo 2)
  lostDate: Date; // Fecha cuando se perdió
  description: string; // Descripción proporcionada por el usuario
  imageUrl?: string; // URL de la imagen (opcional)
  status: "searching" | "found" | "closed";
  seekerId: string; // ID del usuario que lo perdió
}

interface Match {
  id: string;
  lostItemId: string; // ID del objeto perdido
  foundItemId: string; // ID del objeto encontrado
  status: "pending" | "verified" | "completed";
  matchDate: Date; // Fecha cuando se hizo el match
}

// Tipos auxiliares para mejor tipado
type ItemType =
  | "electronics"
  | "documents"
  | "clothing"
  | "accessories"
  | "other"; // Expandir según necesidades

type Location =
  | "Bloque 1 - Fac. Ciencias Exactas y Naturales"
  | "Bloque 2 - Fac. Ciencias Exactas y Naturales"
  | "Bloque 3 - Fac. Ciencias Farmacéuticas y Alimentarias"
  | "Bloque 4 - Fac. Ciencias Exactas y Naturales: Depto. de Matemáticas"
  | "Bloque 5 - Esc. Microbiología"
  | "Bloque 6 - Fac. Ciencias Exactas y Naturales: Inst. de Física"
  | "Bloque 7 - Fac. Ciencias Exactas y Naturales: Inst. de Biología"
  | "Bloque 8 - Biblioteca Central"
  | "Bloque 9 - Fac. de Educación"
  | "Bloque 10 - Auditorios"
  | "Bloque 11 - Aulas especiales"
  | "Bloque 12 - Esc. de Idiomas"
  | "Bloque 13 - Fac. de Comunicaciones y Filología"
  | "Bloque 14 - Fac. Ciencias Económicas"
  | "Bloque 15 - Museo Universitario MUUA"
  | "Bloque 16 - Bloque Administrativo"
  | "Bloque 17 - Capilla Universitaria"
  | "Bloque 18 - Fac. de Ingeniería (laboratorios)"
  | "Bloque 19 - Fac. de Ingeniería"
  | "Bloque 20 - Fac. de Ingeniería"
  | "Bloque 21 - Fac. de Ingeniería"
  | "Bloque 22 - Bienestar Universitario"
  | "Bloque 23 - Teatro Universitario Camilo Torres"
  | "Bloque 24 - Fac. de Artes"
  | "Bloque 25 - Fac. de Artes"
  | "Bloque 26 - Museo de Artes Visuales"
  | "Bloque 27 - Depto. Comercial"
  | "Bloque 28 - Depto. Documentación"
  | "Bloque 29 - Depto. de Sostenimiento"
  | "Otro";

// Ejemplo de uso de tipos:
interface ItemBase {
  type: ItemType;
  location: Location;
}
```

### 2.3 Reglas de Negocio para los Modelos

1. **Usuario (User)**:

   - El punto de entrada principal para todos los usuarios es la Landing Page con dos tabs:
     a) "Encontré un objeto": Para reportar objetos encontrados
     b) "Perdí un objeto": Para iniciar sesión/registrarse (usuarios nuevos y existentes)
   - Después de autenticarse, los usuarios acceden al Home donde pueden:
     a) Ver sus objetos reportados
     b) Acceder al formulario completo para reportar objetos perdidos
   - Los datos adicionales (phoneNumber, idNumber) solo se solicitan al completar el registro

2. **Flujos de Usuario**:

   a) Flujo de Finder (Reporte Rápido):

   - Usuario encuentra un objeto
   - Llena el formulario de reporte en la pestaña "Encontré un objeto"
   - Al enviar, se autentica con Google
   - Se crea un registro básico de usuario (id, email)
   - Se guarda el reporte del objeto encontrado

   b) Flujo de Seeker (Objeto Perdido):

   - Usuario accede a la pestaña "Perdí un objeto"
   - Se autentica con Google
   - Si es primera vez:
     - Completa formulario de registro con datos adicionales
     - Se redirige al home
   - Si ya está registrado:
     - Se redirige directamente al home
   - Puede reportar su objeto perdido

3. **Objeto Encontrado (FoundItem)**:

   - La descripción se genera automáticamente usando IA
   - Debe tener una ubicación específica
   - El status sigue el flujo: pending → delivered → matched

4. **Objeto Perdido (LostItem)**:

   - Puede tener hasta 2 posibles ubicaciones
   - Requiere descripción manual del usuario
   - El status sigue el flujo: searching → found → closed

5. **Match**:
   - Solo puede existir si hay un LostItem y un FoundItem válidos
   - La fecha de match se establece automáticamente
   - El status refleja el proceso de verificación

### 2.3 Diagrama de Secuencia

[Insertar diagramas de secuencia para los flujos principales]

## 3. Diseño de Base de Datos

### 3.1 Estructura Firebase Realtime Database

```javascript
{
  "users": {
    "$userId": {
      "email": string,
      "fullName": string,      // De Google Auth
      "createdAt": timestamp,
      "phoneNumber": string,   // Solo para seekers
      "idNumber": string      // Cédula, solo para seekers
    }
  },
  "foundItems": {
    "$itemId": {
      "type": string,         // Tipo de objeto
      "location": string,     // Uno de los bloques definidos
      "foundDate": timestamp,
      "description": string,  // Generado por IA
      "image": string,       // URL de la imagen
      "status": string,      // "pending" | "delivered" | "matched"
      "finderId": string     // ID del usuario que lo encontró
    }
  },
  "lostItems": {
    "$itemId": {
      "type": string,         // Tipo de objeto
      "locations": [          // Array de máximo 2 bloques
        string,
        string
      ],
      "lostDate": timestamp,
      "description": string,  // Descripción del usuario
      "imageUrl": string,    // URL de la imagen (opcional)
      "status": string,      // "searching" | "found" | "closed"
      "seekerId": string     // ID del usuario que lo perdió
    }
  },
  "matches": {
    "$matchId": {
      "lostItemId": string,   // ID del objeto perdido
      "foundItemId": string,  // ID del objeto encontrado
      "status": string,       // "pending" | "verified" | "completed"
      "matchDate": timestamp  // Fecha cuando se hizo el match
    }
  }
}
```

### 3.2 Reglas de Seguridad Firebase

```javascript
{
  "rules": {
    "users": {
      "$userId": {
        // Solo el usuario puede leer/escribir sus propios datos
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid",
        // Validación de campos
        ".validate": "newData.hasChildren(['email', 'fullName', 'createdAt'])"
      }
    },
    "foundItems": {
      // Cualquiera puede leer objetos encontrados
      ".read": "auth != null",
      "$itemId": {
        // Solo el finder puede editar su reporte
        ".write": "auth != null && (!data.exists() || data.child('finderId').val() === auth.uid)",
        // Validación de campos obligatorios
        ".validate": "newData.hasChildren(['type', 'location', 'foundDate', 'description', 'image', 'status', 'finderId'])"
      }
    },
    "lostItems": {
      // Solo usuarios registrados pueden ver objetos perdidos
      ".read": "auth != null",
      "$itemId": {
        // Solo el seeker puede editar su reporte
        ".write": "auth != null && (!data.exists() || data.child('seekerId').val() === auth.uid)",
        // Validación de campos y array de locations
        ".validate": "newData.hasChildren(['type', 'locations', 'lostDate', 'description', 'status', 'seekerId']) && newData.child('locations').isArray() && newData.child('locations').val().length <= 2"
      }
    },
    "matches": {
      // Solo usuarios involucrados pueden ver matches
      ".read": "auth != null",
      "$matchId": {
        // Solo el sistema o usuarios involucrados pueden crear/actualizar matches
        ".write": "auth != null && (
          !data.exists() ||
          root.child('foundItems').child(newData.child('foundItemId').val()).child('finderId').val() === auth.uid ||
          root.child('lostItems').child(newData.child('lostItemId').val()).child('seekerId').val() === auth.uid
        )"
      }
    }
  }
}
```

### 3.3 Índices y Consultas

```javascript
// Índices para búsqueda eficiente
{
  "foundItems": {
    ".indexOn": ["type", "location", "foundDate", "status"]
  },
  "lostItems": {
    ".indexOn": ["type", "locations", "lostDate", "status"]
  },
  "matches": {
    ".indexOn": ["lostItemId", "foundItemId", "status", "matchDate"]
  }
}
```

### 3.4 Consultas Principales

1. **Búsqueda de coincidencias**:

   ```javascript
   // Buscar objetos encontrados que coincidan con un objeto perdido
   foundItems
     .orderByChild("type")
     .equalTo(lostItem.type)
     .orderByChild("foundDate")
     .startAt(lostItem.lostDate);
   ```

2. **Filtrado por ubicación**:

   ```javascript
   // Buscar objetos en ubicaciones específicas
   foundItems.orderByChild("location").equalTo(selectedLocation);
   ```

3. **Historial de usuario**:

   ```javascript
   // Objetos reportados por un usuario
   foundItems.orderByChild("finderId").equalTo(userId);
   lostItems.orderByChild("seekerId").equalTo(userId);
   ```

4. **Matches pendientes**:
   ```javascript
   // Buscar matches pendientes de verificación
   matches.orderByChild("status").equalTo("pending");
   ```

## 4. Interfaces de Usuario

### 4.1 Wireframes

[Aquí se insertarán los wireframes de las principales pantallas]

1. Página Principal
2. Formulario de Reporte Rápido
3. Dashboard de Usuario
4. Vista de Coincidencias
5. Panel de Administración

### 4.2 Flujos de Usuario

1. **Flujo de Finder**
   - Acceso → Reporte Rápido → Confirmación
2. **Flujo de Seeker**
   - Registro → Reporte → Búsqueda → Match → Verificación
3. **Flujo de Administrador**
   - Login → Dashboard → Gestión

## 5. Patrones de Diseño

### 5.1 Patrones Frontend

1. **Component Pattern**

   - Componentes reutilizables
   - Composición sobre herencia

2. **Container Pattern**

   - Separación de lógica y presentación
   - Containers para gestión de estado

3. **Provider Pattern**
   - Context API para estado global
   - Providers para servicios Firebase

### 5.2 Patrones de Estado

1. **Observer Pattern**
   - Para notificaciones en tiempo real
   - Suscripción a cambios en Firebase

### 5.3 Patrones de Diseño UI

1. **Material Design**
   - Consistencia visual
   - Componentes MUI
   - Responsive design

### 5.4 Patrones de Datos

1. **Repository Pattern**
   - Abstracción de acceso a datos
   - Servicios Firebase encapsulados
