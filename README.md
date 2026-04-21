# POPS
**Power. Oxygen. Posture. Stretch.**

POPS is a client-oriented Angular web application for Yoga and Pilates enthusiasts, allowing users to browse, create, and manage their own workout sessions with full authentication and CRUD functionality.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 17+, TypeScript |
| Routing | Angular Router |
| State Management | RxJS BehaviorSubject |
| HTTP | Angular HttpClient |
| Auth | Session-based authentication |
| Styling | Custom CSS, CSS Variables |

I am using the softUni back end with several modifications to fit my Angular app needs!

| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |

---

## Features

### Authentication
- User registration and login with session-based authentication
- Protected routes using Angular Route Guards
- Credentials sent with every request via `withCredentials: true`

### Browse Sessions
- Displays all sessions fetched from the REST API via `HttpClient` 
- Sessions stored and shared across components using a `BehaviorSubject` in `SessionService`
- Smart caching — data is fetched from the API once and served from the local cache on subsequent requests
- Each session rendered as a reusable `SessionItemComponent` receiving data via `@Input()` 
- Browse sessions filtered by goal (Flexibility, Strength, Recovery)

### Session Details
- Dynamic routing via Angular Router with route parameters (`/session-details/:id`)
- `ActivatedRoute` used to read the session ID from the URL
- Session fetched by ID — checks local cache first, falls back to API if not found
- Displays full session info: name, description, type, goal, subcategory, duration, exercises, and music link
- Exercises rendered via reusable `ExerciseItemComponent` with `@Input()`
- Music URL rendered as a clickable link with a fallback message if none provided

### Create Session — 7-Step Wizard
A multi-step form with animated progress bar and step-by-step navigation:

1. **Basic Info** — session name and description
2. **Type** — select Yoga or Pilates
3. **Goal** — select goal (Flexibility, Strength, Recovery, etc.)
4. **Subcategory** — dynamically filtered options based on selected type and goal combination
5. **Exercises** — slots that scale with session duration (1 exercise per minute, 4 minutes reserved); per-subcategory exercise dropdowns with duplicate prevention across slots
6. **Music** — Spotify or YouTube URL with validation
7. **Review** — full summary with validation before saving

### Services
- **`SessionService`** — manages session state with a `BehaviorSubject`, exposes `getAllSessions()`, `getSessionById()`, `createSession()`, `updateSession()`, `deleteSession()`
- **`ApiService`** — handles all HTTP communication with the Express REST API

### Component Architecture
- Smart (container) components handle data fetching and state
- Dumb (presentational) components receive data via `@Input()` and emit events via `@Output()`
- Reusable components: `SessionItemComponent`, `ExerciseItemComponent`

---


## Angular Concepts Demonstrated

| Concept | Where Used |
|---|---|
| Components & Templates | All UI building blocks |
| `@Input()` / `@Output()` | `SessionItemComponent`, `ExerciseItemComponent` |
| Angular Router | Navigation between pages |
| Route Parameters | Session details page (`/session-details/:id`) |
| Route Guards | Protecting authenticated routes |
| `HttpClient` | All API communication |
| RxJS `BehaviorSubject` | Session state management |
| RxJS `Observable`, `tap`, `of` | Async data flow and caching |
| `*ngFor` / `*ngIf` | Template directives |
| `ngModel` / Reactive Forms | Create session wizard |
| Dependency Injection | Services injected into components |
| Custom Directives | `appLiquidCard` visual effect |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
ng serve

# Navigate to
http://localhost:4200
```
