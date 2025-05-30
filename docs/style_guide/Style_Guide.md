# Guía de Estilo y Estándares - Lost UdeA

## Tabla de Contenidos

1. [Convenciones de Código](#1-convenciones-de-código)
2. [Guía de UI/UX](#2-guía-de-uiux)
3. [Estándares de Documentación](#3-estándares-de-documentación)
4. [Proceso de Control de Versiones](#4-proceso-de-control-de-versiones)

## 1. Convenciones de Código

### JavaScript/TypeScript

- **Formato**

  - Usar 2 espacios para indentación
  - Líneas máximo de 80 caracteres
  - Punto y coma al final de cada declaración
  - Comillas dobles para strings

- **Nombrado**

  ```typescript
  // Variables y funciones en camelCase
  const userData = {};
  function getUserData() {}

  // Interfaces y Types en PascalCase
  interface UserProps {}
  type LocationType = string;

  // Constantes en UPPER_SNAKE_CASE
  const API_BASE_URL = "https://api.example.com";

  // Componentes React en PascalCase
  function UserProfile() {}
  ```

- **Imports**
  ```typescript
  // Primero imports de React
  import React, { useState, useEffect } from "react";
  // Luego librerías externas
  import { Button } from "@mui/material";
  // Finalmente imports locales
  import { UserType } from "../types";
  ```

### CSS/Styling

- Usar CSS-in-JS con MUI styled components
- BEM para clases CSS cuando sea necesario
- Variables CSS para colores y medidas consistentes

## 2. Guía de UI/UX

### Paleta de Colores

```css
:root {
  /* Colores principales UdeA */
  --primary: #43b02a; /* Verde UdeA */
  --secondary: #4a1f68; /* Morado UdeA */

  /* Variaciones */
  --primary-light: #65c850;
  --primary-dark: #2a8015;
  --secondary-light: #6a3f88;
  --secondary-dark: #2a0f48;

  /* Grises */
  --gray-100: #f5f5f5;
  --gray-200: #eeeeee;
  --gray-300: #e0e0e0;
  --gray-400: #bdbdbd;
  --gray-500: #9e9e9e;

  /* Estados */
  --success: #4caf50;
  --warning: #ffc107;
  --error: #f44336;
  --info: #2196f3;
}
```

### Tipografía

```css
:root {
  --font-primary: "Roboto", sans-serif;
  --font-secondary: "Open Sans", sans-serif;

  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
}
```

### Espaciado y Layout

```css
:root {
  --spacing-xs: 0.25rem; /* 4px */
  --spacing-sm: 0.5rem; /* 8px */
  --spacing-md: 1rem; /* 16px */
  --spacing-lg: 1.5rem; /* 24px */
  --spacing-xl: 2rem; /* 32px */

  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}
```

### Componentes UI

- **Botones**

  - Primario: Verde UdeA para acciones principales
  - Secundario: Morado UdeA para acciones secundarias
  - Text: Para acciones terciarias
  - Disabled: Gris con opacidad reducida

- **Formularios**

  - Labels siempre visibles
  - Mensajes de error en rojo debajo del campo
  - Validación en tiempo real
  - Indicadores de campo requerido (\*)

- **Cards y Contenedores**
  - Sombras suaves para elevación
  - Bordes redondeados consistentes
  - Padding interno uniforme

## 3. Estándares de Documentación

### Documentación de Código

```typescript
/**
 * Componente que muestra un objeto perdido o encontrado
 * @param {ItemProps} props - Propiedades del componente
 * @param {string} props.type - Tipo de objeto
 * @param {string} props.location - Ubicación del objeto
 * @param {Date} props.date - Fecha del reporte
 * @returns {JSX.Element} Componente Item
 */
```

### Comentarios en Código

```typescript
// TODO: Implementar validación adicional
// FIXME: Corregir error en el manejo de fechas
// NOTE: Este componente requiere autenticación
```

### README y Documentación Técnica

- Estructura consistente:
  1. Descripción del proyecto
  2. Requisitos previos
  3. Instalación
  4. Configuración
  5. Uso
  6. API/Componentes
  7. Contribución
  8. Licencia

## 4. Proceso de Control de Versiones

### Estructura de Ramas

```
main           # Producción
├── develop    # Desarrollo
│   ├── feature/[nombre]  # Nuevas características
│   ├── bugfix/[nombre]   # Correcciones
│   └── refactor/[nombre] # Refactorización
└── release/[version]     # Preparación de release
```

### Convenciones de Commits

```
feat: nueva característica
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato
refactor: refactorización de código
test: añadir o modificar tests
chore: cambios en build o herramientas
```

### Ejemplo de Mensaje de Commit

```
feat(auth): implementar inicio de sesión con Google

- Agregar componente GoogleSignIn
- Configurar Firebase Auth
- Actualizar tipos de usuario
```

### Pull Requests

- Título descriptivo
- Descripción detallada de cambios
- Referencias a issues relacionados
- Checklist de revisión
- Screenshots (si aplica)
