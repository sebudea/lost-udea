# Software Requirements Specification

## Lost UdeA - Sistema de Gestión de Objetos Perdidos

### Versión 1.0

## Historial de Revisiones

| Fecha   | Versión | Descripción                   | Autor       |
| ------- | ------- | ----------------------------- | ----------- |
| [Fecha] | 1.0     | Versión inicial del documento | [Tu nombre] |

## Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [Descripción General](#2-descripción-general)
3. [Requisitos Específicos](#3-requisitos-específicos)
4. [Restricciones del Sistema](#4-restricciones-del-sistema)
5. [Historias de Usuario](#5-historias-de-usuario)

## 1. Introducción

### 1.1 Propósito

Este documento tiene como objetivo definir los requisitos funcionales y no funcionales para el sistema "Lost UdeA", una aplicación web diseñada para gestionar objetos perdidos y encontrados en la Universidad de Antioquia.

### 1.2 Alcance

El sistema facilita dos flujos principales: un proceso simple y rápido con autenticación de Google para reportar objetos encontrados, y un proceso más estructurado para usuarios que buscan objetos perdidos, quienes deberán registrarse completamente para acceder a la información detallada y realizar reclamos.

### 1.3 Definiciones, Acrónimos y Abreviaturas

- **UdeA**: Universidad de Antioquia
- **Usuario Finder**: Usuario que encuentra y reporta objetos (registro rápido con Google)
- **Usuario Seeker**: Usuario que busca objetos perdidos (registro completo)
- **Match**: Coincidencia potencial entre un objeto perdido y uno encontrado
- **Punto de Recolección**: Ubicación oficial dentro de la universidad designada para la custodia de objetos encontrados
- **Personal de Custodia**: Personal autorizado en los puntos de recolección

## 2. Descripción General

### 2.1 Perspectiva del Producto

Lost UdeA será una aplicación web independiente que funcionará como punto central para la gestión de objetos perdidos en la universidad. La aplicación será accesible desde cualquier navegador web y estará optimizada para dispositivos móviles.

### 2.2 Funcionalidades del Producto

- Reporte rápido de objetos encontrados
- Registro de usuarios para búsqueda de objetos perdidos
- Sistema inteligente de coincidencias (matching)
- Gestión de puntos de recolección
- Verificación presencial de propiedad
- Sistema de confirmación de entregas

### 2.3 Características de los Usuarios

1. **Usuarios Finder (Encuentran Objetos)**

   - Registro rápido con Google
   - Proceso simple de reporte
   - Solo necesitan reportar y entregar el objeto
   - No requieren acceso a funciones adicionales

2. **Usuarios Seeker (Buscan Objetos)**

   - Registro completo con correo institucional
   - Pueden crear reportes de objetos perdidos
   - Acceden al sistema de coincidencias
   - Deben verificar presencialmente

3. **Personal de Puntos de Recolección**

   - Acceso al sistema de gestión de objetos
   - Verifican la propiedad de objetos
   - Gestionan entregas

### 2.4 Restricciones

- La aplicación debe funcionar en navegadores web modernos
- Debe cumplir con las políticas de privacidad de la universidad
- Debe ser accesible solo para miembros de la comunidad universitaria
- Debe seguir los lineamientos de imagen institucional de la UdeA

## 3. Requisitos Específicos

### 3.1 Requisitos Funcionales

#### RF1: Reporte de Objetos Encontrados (Registro Rápido)

- RF1.1: Autenticación rápida con Google
- RF1.2: Formulario simple para reportar objetos encontrados
- RF1.3: Captura de información básica (tipo de objeto, lugar, fecha)
- RF1.4: Opción para subir foto del objeto
- RF1.5: Generación de código único del reporte
- RF1.6: Indicación clara del punto de recolección más cercano
- RF1.7: Mensaje de agradecimiento y confirmación

#### RF2: Gestión de Usuarios que Buscan

- RF2.1: Registro obligatorio con correo institucional
- RF2.2: Perfil de usuario con información básica
- RF2.3: Historial de objetos perdidos y encontrados
- RF2.4: Sistema de reputación basado en objetos reportados/encontrados

#### RF3: Sistema de Matching

- RF3.1: Búsqueda inteligente de coincidencias
- RF3.2: Mostrar información limitada en coincidencias iniciales (tipo y ubicación)
- RF3.3: Revelación de detalles completos solo tras verificación presencial
- RF3.4: Sistema de confirmación de match exitoso
- RF3.5: Notificaciones de posibles coincidencias

### 3.2 Requisitos No Funcionales

#### RNF1: Usabilidad

- RNF1.1: La interfaz debe ser intuitiva y fácil de usar
- RNF1.2: El sistema debe ser responsive para diferentes dispositivos
- RNF1.3: Los tiempos de carga no deben superar los 3 segundos
- RNF1.4: Debe seguir principios de diseño accesible

#### RNF2: Seguridad

- RNF2.1: Autenticación segura de usuarios
- RNF2.2: Encriptación de datos sensibles
- RNF2.3: Protección contra ataques comunes (XSS, CSRF)
- RNF2.4: Registro de actividades del sistema

#### RNF3: Rendimiento

- RNF3.1: Soporte para múltiples usuarios concurrentes
- RNF3.2: Optimización de imágenes y recursos
- RNF3.3: Tiempo de respuesta máximo de 2 segundos
- RNF3.4: Disponibilidad del sistema 24/7

#### RNF4: Mantenibilidad

- RNF4.1: Código documentado y mantenible
- RNF4.2: Sistema modular y escalable
- RNF4.3: Logs detallados para debugging
- RNF4.4: Backups automáticos de la base de datos

## 4. Restricciones del Sistema

### 4.1 Restricciones Técnicas

- Frontend: React + TypeScript + Material-UI
- Backend: Firebase (Realtime Database, Storage, Authentication)
- Hosting: Vercel
- Debe seguir principios de diseño responsive
- Debe ser compatible con los últimos navegadores web

### 4.2 Restricciones de Negocio

- Solo usuarios con correo institucional pueden registrarse
- El sistema debe cumplir con las políticas de privacidad institucionales
- La información personal debe ser tratada según normativas vigentes

## 5. Historias de Usuario

### HU1 - Registro para quien perdió un objeto

Como persona que ha perdido un objeto en la universidad,
quiero registrarme en la plataforma utilizando mi correo electrónico (institucional),
para poder gestionar mis publicaciones, recibir notificaciones y aumentar la posibilidad de recuperar mi pertenencia.

### HU2 - Reporte rápido para quien encuentra un objeto

Como persona que encontró un objeto en la universidad,
quiero poder reportarlo de forma rápida y sencilla sin necesidad de un registro completo,
para facilitar mi proceso de entrega y colaboración sin complicaciones.

### HU3 - Publicación de objeto perdido

Como persona que ha perdido un objeto en la universidad,
quiero poder publicar una descripción detallada con datos como categoría, color, fecha de pérdida, ubicación y opcionalmente una foto,
para que el sistema me sugiera coincidencias con objetos encontrados y pueda identificar si el mío fue reportado y dónde reclamarlo.

### HU4 - Sugerencias automáticas para objetos perdidos

Como persona que ha reportado un objeto perdido,
quiero que el sistema me sugiera automáticamente coincidencias con objetos encontrados según mi descripción,
para aumentar las posibilidades de recuperarlo sin exponer la información de otros objetos a usuarios no autorizados.

### HU5 - Notificaciones de sugerencias

Como persona que ha reportado un objeto perdido,
quiero recibir notificaciones automáticas cuando el sistema encuentre objetos similares al que reporté,
para poder revisarlos y verificar si alguno corresponde al mío.

### HU6 - Historial de publicaciones

Como usuario,
quiero acceder a un historial de mis publicaciones y actualizaciones,
para hacer seguimiento a mis objetos perdidos o encontrados.

### HU7 - Visualización de estadísticas del sistema

Como administrador de la universidad,
quiero acceder a estadísticas detalladas sobre los objetos reportados,
para identificar patrones, tomar decisiones informadas y diseñar estrategias de prevención y mejora en el campus.

### HU8 - Match objeto perdido/objeto encontrado

Como persona que ha identificado una posible coincidencia con mi objeto perdido,
quiero poder verificar presencialmente en el punto de recolección si corresponde al mío,
para confirmar y recuperar mi pertenencia de forma segura.
