export type Level = "dominas" | "nuevo"

export interface Lesson {
  id: string
  title: string
  level: Level
  hasQuiz: boolean
  estMinutes?: number
}

export interface Track {
  id: string
  title: string
  order: number
  lessons: Lesson[]
}

export const tracks: Track[] = [
  {
    id: "fundamentos",
    title: "Fundamentos de Spring Boot",
    order: 1,
    lessons: [
      { id: "ioc", title: "Qué es Spring y la inversión de control (IoC)", level: "dominas", hasQuiz: true, estMinutes: 6 },
      { id: "di-beans", title: "Inyección de dependencias y el contenedor de beans", level: "dominas", hasQuiz: false, estMinutes: 8 },
      { id: "autoconfiguration", title: "Autoconfiguration y starters", level: "dominas", hasQuiz: true, estMinutes: 7 },
      { id: "properties", title: "application.properties / yml y perfiles", level: "dominas", hasQuiz: false, estMinutes: 5 },
      { id: "bean-lifecycle", title: "Ciclo de vida de un bean y scopes", level: "nuevo", hasQuiz: true, estMinutes: 8 },
      { id: "actuator", title: "Spring Boot Actuator (health, metrics, info)", level: "nuevo", hasQuiz: false, estMinutes: 6 },
    ],
  },
  {
    id: "apis-rest",
    title: "APIs REST con Spring Boot",
    order: 2,
    lessons: [
      { id: "controllers", title: "Controllers, @RequestMapping y verbos HTTP", level: "dominas", hasQuiz: true, estMinutes: 7 },
      { id: "dtos-validacion", title: "DTOs y validación con Bean Validation", level: "dominas", hasQuiz: true, estMinutes: 8 },
      { id: "error-handling", title: "Manejo global de errores (@ControllerAdvice)", level: "dominas", hasQuiz: false, estMinutes: 6 },
      { id: "spring-data-jpa", title: "Persistencia con Spring Data JPA", level: "dominas", hasQuiz: true, estMinutes: 10 },
      { id: "openapi", title: "Documentación con OpenAPI / Swagger", level: "nuevo", hasQuiz: false, estMinutes: 5 },
      { id: "versionado", title: "Versionado de APIs", level: "nuevo", hasQuiz: false, estMinutes: 6 },
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad",
    order: 3,
    lessons: [
      { id: "amenazas", title: "Seguridad informática: amenazas y vulnerabilidades", level: "dominas", hasQuiz: false, estMinutes: 7 },
      { id: "authn-authz", title: "Autenticación vs Autorización · Stateful vs Stateless", level: "dominas", hasQuiz: true, estMinutes: 8 },
      { id: "filter-chain", title: "Arquitectura de Spring Security (filter chain)", level: "dominas", hasQuiz: true, estMinutes: 9 },
      { id: "roles-permisos", title: "Usuarios, roles y permisos", level: "dominas", hasQuiz: true, estMinutes: 7 },
      { id: "bcrypt", title: "Encriptado de contraseñas (BCrypt)", level: "dominas", hasQuiz: false, estMinutes: 5 },
      { id: "jwt", title: "JWT: ciclo de vida e implementación", level: "dominas", hasQuiz: true, estMinutes: 10 },
      { id: "oauth2", title: "OAuth2 con Google / GitHub", level: "dominas", hasQuiz: false, estMinutes: 8 },
      { id: "cors-csrf", title: "CORS y CSRF en profundidad", level: "nuevo", hasQuiz: true, estMinutes: 9 },
      { id: "refresh-tokens", title: "Refresh tokens", level: "nuevo", hasQuiz: false, estMinutes: 7 },
    ],
  },
  {
    id: "microservicios",
    title: "Introducción a Microservicios",
    order: 4,
    lessons: [
      { id: "monolito-vs-micro", title: "Monolito vs Microservicios", level: "dominas", hasQuiz: false, estMinutes: 8 },
      { id: "estructura-micro", title: "Cómo crear y estructurar microservicios", level: "dominas", hasQuiz: false, estMinutes: 7 },
      { id: "lombok", title: "Lombok y anotaciones útiles", level: "dominas", hasQuiz: false, estMinutes: 5 },
      { id: "comunicacion-sincrona", title: "Comunicación síncrona: RestTemplate y Feign", level: "dominas", hasQuiz: true, estMinutes: 8 },
      { id: "mensajeria", title: "Comunicación asíncrona: mensajería con RabbitMQ / Kafka", level: "nuevo", hasQuiz: false, estMinutes: 10 },
    ],
  },
  {
    id: "resiliencia",
    title: "Patrones de Resiliencia y Arquitectura Distribuida",
    order: 5,
    lessons: [
      { id: "eureka", title: "Service Registry y Discovery (Eureka)", level: "dominas", hasQuiz: false, estMinutes: 7 },
      { id: "load-balancing", title: "Load Balancing (Spring Cloud LoadBalancer)", level: "dominas", hasQuiz: false, estMinutes: 6 },
      { id: "api-gateway", title: "API Gateway (Spring Cloud Gateway)", level: "dominas", hasQuiz: true, estMinutes: 8 },
      { id: "config-server", title: "Config Server (configuración centralizada)", level: "dominas", hasQuiz: false, estMinutes: 6 },
      { id: "circuit-breaker", title: "Circuit Breaker (Resilience4j)", level: "dominas", hasQuiz: true, estMinutes: 8 },
      { id: "retry-patterns", title: "Retry, Rate Limiter, Bulkhead, Time Limiter", level: "nuevo", hasQuiz: false, estMinutes: 8 },
      { id: "saga", title: "Saga Pattern (transacciones distribuidas)", level: "nuevo", hasQuiz: false, estMinutes: 9 },
      { id: "cqrs", title: "CQRS y Event Sourcing", level: "nuevo", hasQuiz: false, estMinutes: 9 },
    ],
  },
  {
    id: "observabilidad",
    title: "Observabilidad",
    order: 6,
    lessons: [
      { id: "health-checks", title: "Health checks con Actuator", level: "nuevo", hasQuiz: false, estMinutes: 5 },
      { id: "micrometer", title: "Métricas con Micrometer", level: "nuevo", hasQuiz: false, estMinutes: 7 },
      { id: "tracing", title: "Distributed Tracing (Micrometer Tracing + Zipkin)", level: "nuevo", hasQuiz: false, estMinutes: 8 },
      { id: "logs", title: "Centralización de logs", level: "nuevo", hasQuiz: false, estMinutes: 7 },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    order: 7,
    lessons: [
      { id: "junit-mockito", title: "Tests unitarios con JUnit 5 + Mockito", level: "nuevo", hasQuiz: false, estMinutes: 8 },
      { id: "mockmvc", title: "Tests de controllers con MockMvc", level: "nuevo", hasQuiz: false, estMinutes: 7 },
      { id: "spring-boot-test", title: "@SpringBootTest (tests de integración)", level: "nuevo", hasQuiz: false, estMinutes: 8 },
      { id: "testcontainers", title: "Testcontainers (tests con DB real en contenedor)", level: "nuevo", hasQuiz: false, estMinutes: 9 },
    ],
  },
  {
    id: "despliegue",
    title: "Despliegue",
    order: 8,
    lessons: [
      { id: "docker-intro", title: "Qué es Docker y cómo funciona", level: "dominas", hasQuiz: false, estMinutes: 7 },
      { id: "dockerizar", title: "Dockerizar una app Spring Boot", level: "dominas", hasQuiz: true, estMinutes: 8 },
      { id: "docker-compose", title: "Docker Compose para varios microservicios", level: "nuevo", hasQuiz: false, estMinutes: 8 },
      { id: "deploy-seguro", title: "Deploy de aplicación segurizada", level: "dominas", hasQuiz: false, estMinutes: 9 },
    ],
  },
]
