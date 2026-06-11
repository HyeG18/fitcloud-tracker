# FitCloud Tracker 🏃‍♂️☁️

FitCloud Tracker es una aplicación web (estilo Strava) para el registro, seguimiento y análisis de actividades físicas. Este proyecto fue desarrollado para la asignatura de Computación en la Nube.

El proyecto está dividido en dos partes principales:
* **Frontend:** React gestionado con `pnpm`.
* **Backend:** API RESTful en Java (Spring Boot 3.x) con base de datos H2 en memoria para desarrollo local.

---

## 🛠️ Requisitos Previos

Para ejecutar el proyecto completo en tu entorno local necesitas tener instalado:
* **Java Development Kit (JDK) 25**
* **Node.js** (v18 o superior)
* **pnpm** (puedes instalarlo con `npm install -g pnpm` si ya tienes Node)

*Nota: No es necesario instalar una base de datos externa localmente. El backend está configurado para usar una base de datos en memoria (H2) durante la fase de desarrollo.*

---

## 🚀 Ejecución del Proyecto

Deberás abrir **dos terminales** distintas, una para el servidor backend y otra para el cliente frontend.

### 1. Levantar el Backend (Spring Boot)
1. Abre una terminal y navega a la carpeta del backend:
   ```bash
   cd backend
Ejecuta el servidor usando el wrapper de Maven:
En Windows: ./mvnw clean spring-boot:run
En Linux/Mac: ./mvnw clean spring-boot:run

El servidor estará corriendo en http://localhost:8080.
(Verificación: Ingresa a http://localhost:8080/api/health para ver el status).

2. Levantar el Frontend (React)
Abre una segunda terminal y navega a la carpeta del frontend:

Bash
cd frontend
Instala las dependencias (solo la primera vez o si hay cambios):

Bash
pnpm install
Inicia el servidor de desarrollo:

Bash
pnpm dev
La aplicación web estará disponible en http://localhost:5173 (o el puerto que indique Vite/React en la consola).