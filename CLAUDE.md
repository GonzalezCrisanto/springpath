# CLAUDE.md

Master specification for this project. Read this fully before generating code.
Written in English; site content and example copy are in Spanish (the site's audience is Spanish-speaking).

---

## 1. Project overview

An interactive educational website about the **Spring ecosystem** — Spring Boot, Spring Security, and Spring Cloud. It serves a dual purpose:

1. **Portfolio** — demonstrates the author's technical depth to recruiters and technical interviewers.
2. **Learning path** — teaches Spring interactively to Java developers who already have some base and want to go deeper.

Both audiences reinforce each other: a recruiter who sees a technically solid, interactive site is already evaluating the author's level without needing an explanation.

The site is **content-driven**: lesson content lives in data/Markdown files, and the code only renders it. Adding a lesson must be as simple as creating one `.mdx` file and adding one line to `tracks.ts`.

**Tone:** minimalist, highly readable, calm. Clarity beats flashiness. This is educational software.

---

## 2. Tech stack (decided — do not substitute without asking)

- **Build/base:** React + Vite + **TypeScript**
- **Routing:** React Router (client-side; each track and lesson has its own URL)
- **Styling:** Tailwind CSS
- **UI components:** shadcn/ui (copied into the project, owned and themeable)
- **Content:** Markdown / **MDX** (lessons authored as `.mdx`, not hardcoded in components)
- **Code editor (playground):** Monaco Editor
- **Ecosystem map:** React Flow
- **Animations:** Framer Motion
- **Syntax highlighting (static snippets):** Shiki (preferred) or Prism
- **Persistence:** `localStorage` only — **no backend** in this phase
- **Deploy target:** Vercel (connected to GitHub)

### Playground constraint
The code playground is **simulated** — it does NOT execute real Java. The UI reacts to changes in config/annotations and shows the expected behavior/output in an intelligent way. Do not attempt to run Java in-browser or via a backend.

---

## 3. Architecture (content-driven)

```
src/
├── content/                    # ALL content lives here, separate from code
│   ├── tracks.ts               # single source of truth: 8 tracks + lesson metadata
│   └── lessons/                # one folder per track
│       ├── 01-fundamentos/
│       │   ├── ioc.mdx
│       │   ├── di-beans.mdx
│       │   └── ...
│       ├── 03-seguridad/
│       └── ...
│
├── components/
│   ├── layout/                 # Navbar, Sidebar, Footer, ThemeToggle
│   ├── lesson/                 # lesson renderer, prev/next nav, completion control
│   ├── interactive/            # Playground, EcosystemMap, AnimatedDiagram
│   └── quiz/                   # reusable quiz component
│
├── pages/
│   ├── Home.tsx                # landing with interactive ecosystem map
│   ├── TrackPage.tsx           # index of a single track
│   └── LessonPage.tsx          # a single lesson
│
├── hooks/                      # useProgress, useTheme, etc.
├── lib/                        # utilities
└── styles/
```

**Guiding principle:** never hardcode lesson content inside components. The sidebar, navigation, progress bars, and prev/next links are all generated automatically from `tracks.ts`.

---

## 4. Data model — `tracks.ts`

`tracks.ts` is the single source of truth for the whole site structure.

```typescript
export type Level = "dominas" | "nuevo";        // ✅ mastered | 🆕 new

export interface Lesson {
  id: string;          // slug, matches the .mdx filename
  title: string;
  level: Level;
  hasQuiz: boolean;
  estMinutes?: number;
}

export interface Track {
  id: string;          // slug, matches the lessons/NN-<id> folder
  title: string;
  order: number;
  lessons: Lesson[];
}

export const tracks: Track[] = [
  {
    id: "fundamentos",
    title: "Fundamentos de Spring Boot",
    order: 1,
    lessons: [
      { id: "ioc", title: "Inversión de Control (IoC)", level: "dominas", hasQuiz: true, estMinutes: 6 },
      { id: "di-beans", title: "Inyección de dependencias y contenedor de beans", level: "dominas", hasQuiz: false },
      // ...
    ],
  },
  // ...
];
```

---

## 5. Lesson anatomy (every lesson follows the SAME structure)

Predictability is key in educational UX — the user learns the pattern once and applies it across all 46 lessons.

1. **Header** — title, level badge (✅ dominás / 🆕 nuevo), estimated reading time
2. **Concept** — prose explanation, with diagrams where they add value
3. **Interactive visual** — when applicable (animation, map, schema)
4. **Code** — commented snippet with syntax highlighting
5. **Playground** — when applicable (simulated, see §2)
6. **Quiz** — 2–3 short self-assessment questions
7. **Navigation** — previous / next + "mark as completed"

---

## 6. Design system — palette "D" (neutral base + teal/emerald accent)

Dark mode is the **default**. Both modes must work. Accent (teal) is reserved for annotations and UI elements; code keeps its own color logic (types/classes in blue) so nothing competes visually.

### Dark mode tokens
```
--bg-page:          #0f110f
--bg-surface:       #161817
--bg-elevated:      #1f2220
--border:           #2b2e2d
--text-primary:     #e9eae8
--text-secondary:   #c6c8c5
--text-muted:       #7c807c

--accent:           #1D9E75   /* teal/emerald — buttons, progress, active */
--accent-soft:      #5DCAA5   /* hover, accent text on dark */
--accent-bg:        #04342C   /* badge background */

/* code syntax */
--code-bg:          #0f110f
--code-annotation:  #1D9E75   /* @Bean, @-annotations */
--code-type:        #85B7EB   /* class/type names (blue) */
--code-text:        #c6c8c5
```

### Light mode tokens (equivalents)
```
--bg-page:          #ffffff
--bg-surface:       #f7f8f7
--bg-elevated:      #eef0ee
--border:           #e0e2e0
--text-primary:     #161817
--text-secondary:   #44463f   /* WCAG-AA contrast on light surfaces */
--text-muted:       #6b6f6a

--accent:           #0F6E56
--accent-soft:      #1D9E75
--accent-bg:        #E1F5EE

--code-bg:          #f7f8f7
--code-annotation:  #0F6E56
--code-type:        #185FA5
--code-text:        #2c2f2d
```

### Level badges
- ✅ dominás → accent-bg background, accent-soft text
- 🆕 nuevo → neutral/amber background, used to signal "learning / breadth"

### Typography & spacing
- Limited text column width for comfortable reading (~65–75ch)
- Clear type hierarchy, generous whitespace
- Two font weights only: 400 regular, 500 medium. Avoid 600/700.
- Sentence case everywhere. No ALL CAPS, no Title Case.

---

## 7. Progress tracking (localStorage)

No backend. Persist in `localStorage`:
- completed lessons (set of lesson ids)
- quiz results per lesson
- theme preference (dark/light)

Expose via a `useProgress` hook. A visible per-track progress bar reinforces the sense of advancement (key for engagement).

---

## 8. Layout

Three-zone layout (the standard devs already know from Spring docs / courses):
- **Left:** navigation sidebar with collapsible tracks
- **Center:** lesson content, constrained reading width
- **Right (optional):** in-lesson table of contents

Plus: dark/light toggle, always-visible track progress.

---

## 9. Legal note (footer)

This is an independent educational site. Include a small footer disclaimer:
> "Sitio educativo independiente. No está afiliado ni avalado por Broadcom/VMware ni por el proyecto Spring."

Do **not** use the official Spring logo or any look-alike isotype. Mentioning the names "Spring", "Spring Boot", etc. for educational purposes is fine (nominative use). The teal/emerald accent is intentionally distinct from Spring's corporate green to avoid implying official affiliation.

---

## 10. First milestone — vertical slice

Build ONE complete, real, working lesson that touches every layer to be repeated 46 times:

- [ ] Project scaffolded (React + Vite + TS + Tailwind + shadcn/ui), palette D applied, dark mode working
- [ ] Three-zone layout working (sidebar + content + TOC)
- [ ] Content system working: one lesson rendered from an `.mdx` file (not hardcoded)
- [ ] Full lesson anatomy for that lesson (header + concept + code w/ highlighting + quiz)
- [ ] Prev/next navigation reading from `tracks.ts`
- [ ] Progress saved in localStorage ("mark as completed" persists)

Suggested slice lesson: **"Arquitectura de Spring Security"** (Track 3) — it's visual (filter chain), shows off a diagram + code + quiz nicely.

Once the slice is approved, adding the remaining 45 lessons is mechanical: write the `.mdx`, add one line to `tracks.ts`.

---

## 11. Full curriculum (8 tracks, 46 topics)

Levels: ✅ = mastered (defensible in an interview) · 🆕 = new (added to learn + show breadth)

### Track 1 — Fundamentos de Spring Boot
1. Qué es Spring y la inversión de control (IoC) ✅
2. Inyección de dependencias y el contenedor de beans ✅
3. Autoconfiguration y starters ✅
4. application.properties / yml y perfiles ✅
5. Ciclo de vida de un bean y scopes 🆕
6. Spring Boot Actuator (health, metrics, info) 🆕

### Track 2 — APIs REST con Spring Boot
1. Controllers, @RequestMapping y verbos HTTP ✅
2. DTOs y validación con Bean Validation ✅
3. Manejo global de errores (@ControllerAdvice) ✅/🆕
4. Persistencia con Spring Data JPA ✅
5. Documentación con OpenAPI / Swagger 🆕
6. Versionado de APIs 🆕

### Track 3 — Seguridad
1. Seguridad informática: amenazas y vulnerabilidades ✅
2. Autenticación vs Autorización · Stateful vs Stateless ✅
3. Arquitectura de Spring Security (filter chain) ✅
4. Usuarios, roles y permisos ✅
5. Encriptado de contraseñas (BCrypt) ✅
6. JWT: ciclo de vida e implementación ✅
7. OAuth2 con Google / GitHub ✅
8. CORS y CSRF en profundidad 🆕
9. Refresh tokens 🆕

### Track 4 — Introducción a Microservicios
1. Monolito vs Microservicios ✅
2. Cómo crear y estructurar microservicios ✅
3. Lombok y anotaciones útiles ✅
4. Comunicación síncrona: RestTemplate y Feign ✅
5. Comunicación asíncrona: mensajería con RabbitMQ / Kafka 🆕

### Track 5 — Patrones de Resiliencia y Arquitectura Distribuida
1. Service Registry y Discovery (Eureka) ✅
2. Load Balancing (Spring Cloud LoadBalancer) ✅
3. API Gateway (Spring Cloud Gateway) ✅
4. Config Server (configuración centralizada) ✅
5. Circuit Breaker (Resilience4j) ✅
6. Retry, Rate Limiter, Bulkhead, Time Limiter 🆕
7. Saga Pattern (transacciones distribuidas) — conceptual 🆕
8. CQRS y Event Sourcing — conceptual 🆕

### Track 6 — Observabilidad
1. Health checks con Actuator (retomado) 🆕
2. Métricas con Micrometer 🆕
3. Distributed Tracing (Micrometer Tracing + Zipkin) 🆕
4. Centralización de logs 🆕

### Track 7 — Testing
1. Tests unitarios con JUnit 5 + Mockito 🆕
2. Tests de controllers con MockMvc 🆕
3. @SpringBootTest (tests de integración) 🆕
4. Testcontainers (tests con DB real en contenedor) 🆕

### Track 8 — Despliegue
1. Qué es Docker y cómo funciona ✅
2. Dockerizar una app Spring Boot ✅
3. Docker Compose para varios microservicios 🆕
4. Deploy de aplicación segurizada ✅

---

## 12. Working conventions for Claude Code

- Keep content strictly separated from code (see §3).
- TypeScript everywhere; type the content model (§4) properly.
- Use CSS variables / Tailwind theme tokens for all colors (§6) — never hardcode hex in components, so dark/light both work.
- Prefer small, composable components.
- When adding a lesson, the only files touched should be: the new `.mdx` and `tracks.ts`.
- Ask before changing any decision recorded in this file (stack, palette, no-backend, simulated playground).
