# Spring Interactivo

> Sitio web educativo e interactivo para aprender el ecosistema **Spring** — Spring Boot, Spring Security y Spring Cloud — de una forma amena, visual y práctica.

Proyecto con doble propósito: es una **herramienta de aprendizaje** para desarrolladores Java que quieren profundizar en Spring, y a la vez un **portfolio técnico** que demuestra dominio del ecosistema.

---

## 🚧 Estado del proyecto

**En desarrollo.** Actualmente construyendo el primer módulo de referencia (vertical slice). El temario completo abarca 8 tracks y 46 temas, desde fundamentos de Spring Boot hasta arquitectura distribuida, observabilidad y testing.

---

## ✨ Características

- **Aprendizaje interactivo** — diagramas animados, mapa visual del ecosistema y playground de código.
- **Contenido progresivo** — 8 tracks ordenados pedagógicamente, de fundamentos a temas avanzados.
- **Autoevaluación** — quizzes cortos al final de cada lección.
- **Seguimiento de progreso** — registro de lecciones completadas (guardado local en el navegador).
- **Modo claro y oscuro** — pensado para leer cómodo durante sesiones largas.

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Base | React + Vite + TypeScript |
| Estilos | Tailwind CSS + shadcn/ui |
| Routing | React Router |
| Contenido | Markdown / MDX |
| Editor de código | Monaco Editor |
| Diagramas | React Flow |
| Animaciones | Framer Motion |
| Resaltado de sintaxis | Shiki |
| Deploy | Vercel |

> El proyecto no tiene backend en esta etapa: el playground es simulado y el progreso se guarda en `localStorage`.

---

## 🚀 Cómo correrlo localmente

```bash
# Clonar el repositorio
git clone https://github.com/<tu-usuario>/spring-interactivo.git
cd spring-interactivo

# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
npm run dev
```

El sitio queda disponible en `http://localhost:5173` (puerto por defecto de Vite).

---

## 📚 Temario

El contenido se organiza en 8 tracks:

1. **Fundamentos de Spring Boot** — IoC, inyección de dependencias, autoconfiguration, Actuator
2. **APIs REST con Spring Boot** — controllers, validación, JPA, OpenAPI
3. **Seguridad** — Spring Security, JWT, OAuth2, CORS/CSRF, refresh tokens
4. **Introducción a Microservicios** — Feign, comunicación síncrona y asíncrona
5. **Patrones de Resiliencia y Arquitectura Distribuida** — Eureka, Gateway, Config Server, Resilience4j, Saga, CQRS
6. **Observabilidad** — Actuator, Micrometer, distributed tracing, logs
7. **Testing** — JUnit 5, Mockito, MockMvc, Testcontainers
8. **Despliegue** — Docker, Docker Compose, deploy de app segurizada

---

## 🔗 Demo

_Próximamente — link al sitio deployado._

---

## 📸 Capturas

_Próximamente._

---

## 📄 Licencia y aviso

Sitio educativo independiente. No está afiliado ni avalado por Broadcom/VMware ni por el proyecto Spring. Los nombres "Spring", "Spring Boot", "Spring Cloud" y relacionados son marcas de sus respectivos titulares y se utilizan únicamente con fines educativos y referenciales.
