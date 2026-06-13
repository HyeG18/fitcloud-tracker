# --- Etapa 1: Construcción (Build) ---
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

# Copiar los archivos de configuración de Maven y el Wrapper de tu proyecto
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Dar permisos de ejecución al Maven Wrapper (¡Aquí está el cambio!)
RUN chmod +x mvnw

# Descargar las dependencias de forma separada para aprovechar la caché de Docker
RUN ./mvnw dependency:go-offline -B

# Copiar el código fuente y compilar el proyecto saltando los tests para acelerar el proceso
COPY src ./src
RUN ./mvnw clean package -DskipTests

# --- Etapa 2: Ejecución (Runtime) ---
FROM eclipse-temurin:25-jre
WORKDIR /app

# Copiar únicamente el archivo .jar generado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto en el que corre Spring Boot
EXPOSE 8080

# Comando para ejecutar la aplicación dentro del contenedor
ENTRYPOINT ["java", "-jar", "app.jar"]