# tasks-app

App sencilla de tareas hecha con **Vue 3 + TypeScript + Vite** y estilos con
**PicoCSS**.

## Requisitos

- Node.js (recomendado: 18+)
- pnpm (hay `pnpm-lock.yaml`)

## Instalación

```bash
pnpm install
```

## Ejecutar en desarrollo

```bash
pnpm dev
```

## Build y preview

```bash
pnpm build
pnpm preview
```

## Scripts

- `pnpm dev`: servidor de desarrollo (Vite)
- `pnpm build`: typecheck (`vue-tsc`) + build (Vite)
- `pnpm preview`: previsualizar el build

## Estructura (principal)

- `src/main.ts`: arranque de la app e import de PicoCSS
- `src/App.vue`: layout principal
- `src/components/TaskForm.vue`: formulario de nueva tarea

## Alias `@`

El alias `@` apunta a `./src` (configurado en `vite.config.ts` y `tsconfig.json`), por
ejemplo:

```ts
import TaskForm from '@/components/TaskForm.vue'
```
