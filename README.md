# Task App

> Aplicación de gestión de tareas moderna, construida con Vue 3, TypeScript y PicoCSS

## Descripción

Task App es una aplicación de gestión de tareas (To-Do) desarrollada con tecnologías web
modernas. Permite a los usuarios crear, filtrar, marcar como completadas y eliminar
tareas de forma intuitiva con una interfaz minimalista y responsiva.

## ✨ Características

- ✅ **Crear tareas** nuevas mediante un formulario validado
- ✏️ **Editar tareas** existentes con doble clic y autofocus
- 🔄 **Marcar tareas** como completadas o pendientes con un simple clic
- 🗑️ **Eliminar tareas** individualmente
- 🔍 **Filtrar tareas** por estado: todas, pendientes o completadas
- 📊 **Contador de progreso** que muestra el total de tareas completadas
- 💾 **Persistencia de datos** con LocalStorage (las tareas se guardan automáticamente)
- 🎨 **Animaciones suaves** al agregar/eliminar tareas usando TransitionGroup
- 📱 **Diseño responsivo** gracias a PicoCSS
- 🔧 **Composables reutilizables** siguiendo las mejores prácticas de Vue 3
- 🔐 **Type-safe** con TypeScript estricto
- 🧪 **Tests unitarios** completos con Vitest y @vue/test-utils
- 🚀 **CI/CD automatizado** con GitHub Actions
- 📏 **Linting automático** con ESLint para Vue 3 y TypeScript

## 🛠️ Stack Tecnológico

### Core

- **[Vue 3](https://vuejs.org/)** (3.5.24) - Framework progresivo para interfaces de
  usuario
- **[TypeScript](https://www.typescriptlang.org/)** (5.9.3) - Superset tipado de
  JavaScript
- **[Vite](https://vitejs.dev/)** (7.2.4) - Build tool de nueva generación

### UI/Estilos

- **[PicoCSS](https://picocss.com/)** (2.1.1) - Framework CSS minimalista y semántico

### Testing

- **[Vitest](https://vitest.dev/)** (4.0.16) - Framework de testing ultrarrápido
- **[@vue/test-utils](https://test-utils.vuejs.org/)** (2.4.6) - Utilidades oficiales para testing de componentes Vue
- **[jsdom](https://github.com/jsdom/jsdom)** (27.3.0) - Simulación del DOM para tests

### Code Quality

- **[ESLint](https://eslint.org/)** (9.39.2) - Linter para mantener calidad de código
- **[@vue/eslint-config-typescript](https://github.com/vuejs/eslint-config-typescript)** (14.6.0) - Configuración de ESLint para Vue + TypeScript
- **eslint-plugin-vue** (10.6.2) - Reglas específicas para Vue 3

### Herramientas de Desarrollo

- **vue-tsc** (3.1.4) - Type-checking para archivos Vue SFC
- **@vitejs/plugin-vue** (6.0.1) - Plugin oficial de Vue para Vite

### CI/CD

- **GitHub Actions** - Pipeline automatizado de integración continua

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar](https://nodejs.org/)
- **pnpm** - Gestor de paquetes recomendado
  ```bash
  npm install -g pnpm
  ```

## 🚀 Inicio Rápido

### 1. Instalación

Clona el repositorio e instala las dependencias:

```bash
# Instalar dependencias
pnpm install
```

### 2. Desarrollo

Ejecuta el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

### 3. Build de Producción

Genera una versión optimizada para producción:

```bash
pnpm build
```

Los archivos compilados se generarán en la carpeta `dist/`

### 4. Preview del Build

Previsualiza la versión de producción localmente:

```bash
pnpm preview
```

## 📜 Scripts Disponibles

| Comando          | Descripción                                                    |
| ---------------- | -------------------------------------------------------------- |
| `pnpm dev`       | Inicia el servidor de desarrollo con hot-reload                |
| `pnpm build`     | Ejecuta type-checking con vue-tsc y genera el build optimizado |
| `pnpm preview`   | Sirve el build de producción localmente para pruebas           |
| `pnpm test`      | Ejecuta tests en modo watch (ideal para desarrollo)            |
| `pnpm test:run`  | Ejecuta tests una sola vez (usado en CI)                       |
| `pnpm lint`      | Verifica el código con ESLint                                  |
| `pnpm lint:fix`  | Corrige automáticamente problemas de linting                   |

## 📁 Estructura del Proyecto

```
tasks-app/
├── .github/
│   └── workflows/
│       └── ci.yml               # Pipeline de GitHub Actions (lint, build, test)
├── public/                      # Archivos estáticos
├── src/
│   ├── __test__/                # Tests unitarios
│   │   ├── useTasks.spec.ts    # Tests del composable useTasks (9 tests)
│   │   └── helpers.ts          # Utilidades para testing (withSetup)
│   ├── components/              # Componentes Vue
│   │   ├── TaskForm.vue        # Formulario para crear tareas
│   │   ├── TaskList.vue        # Lista de tareas con animaciones y edición
│   │   └── FilterButton.vue    # Botón de filtro reutilizable
│   ├── composables/             # Composables reutilizables
│   │   └── useTasks.ts         # Lógica de gestión de tareas y persistencia
│   ├── App.vue                  # Componente raíz con UI y filtros
│   ├── main.ts                  # Punto de entrada de la aplicación
│   ├── types.ts                 # Definiciones de tipos TypeScript
│   └── style.css                # Estilos globales personalizados
├── index.html                   # Template HTML
├── vite.config.ts               # Configuración de Vite
├── vitest.config.ts             # Configuración de Vitest
├── eslint.config.js             # Configuración de ESLint (flat config)
├── tsconfig.json                # Configuración de TypeScript
└── package.json                 # Dependencias y scripts
```

### Componentes y Composables

#### `App.vue`

Componente raíz que coordina la interfaz:

- Gestiona el estado de filtros (all, todo, done)
- Utiliza el composable `useTasks()` para la lógica de negocio
- Calcula tareas filtradas mediante computed properties
- Delega eventos a las funciones del composable

#### `composables/useTasks.ts`

Composable que encapsula toda la lógica de gestión de tareas:

- **Estado reactivo**: Array de tareas con `ref<Task[]>`
- **CRUD operations**: `addTask()`, `toggleDone()`, `removeTask()`, `editTask()`
- **Validación de entrada**: Verifica que las tareas no estén vacías antes de agregarlas
- **Generación de IDs únicos**: Usa `crypto.randomUUID()` para identificadores seguros
- **Computed values**: `totalDone` para el contador de progreso
- **Persistencia**: Carga y guarda automáticamente en LocalStorage
- **Manejo de errores**: Try-catch para datos corruptos en localStorage
- **Validación**: Verifica que los datos cargados sean un array válido

#### `TaskForm.vue`

Formulario controlado para crear nuevas tareas:

- Validación de entrada
- Emite eventos personalizados al componente padre
- Limpia el formulario después de agregar una tarea

#### `TaskList.vue`

Renderiza la lista de tareas con animaciones y funcionalidad de edición:

- Recibe tareas filtradas como props
- Implementa TransitionGroup para animaciones suaves (fade + slide, 500ms)
- **Edición inline**: Doble clic para activar modo edición
- **Directiva personalizada v-focus**: Autofocus en input de edición
- **Controles de teclado**: Enter para guardar, Escape para cancelar
- **Blur handling**: Guarda automáticamente al perder el foco
- Emite eventos para toggle, eliminación y edición

#### `FilterButton.vue`

Botón reutilizable de filtrado:

- Aplica estilos dinámicos según el filtro activo
- Recibe el tipo de filtro como prop
- Emite eventos de cambio de filtro

### Tipos TypeScript

```typescript
// src/types.ts
export interface Task {
  id: string // UUID generado con crypto.randomUUID()
  title: string // Texto de la tarea
  done: boolean // Estado de completado
}

export type TaskFilter = 'all' | 'todo' | 'done'
```

## ⚙️ Configuración

### Alias de Path

El proyecto está configurado con el alias `@` que apunta a `./src`:

```typescript
// Uso en imports
import TaskForm from '@/components/TaskForm.vue'
import type { Task } from '@/types'
```

Esta configuración se encuentra en:

- `vite.config.ts` - Para el build
- `tsconfig.json` - Para el type-checking de TypeScript

## 🎨 Estilos

El proyecto utiliza **PicoCSS**, un framework CSS que proporciona:

- Estilos semánticos sin clases utilitarias
- Tema oscuro/claro automático según preferencias del sistema
- Componentes nativos estilizados (botones, inputs, etc.)
- Sistema de grid responsivo

Los estilos personalizados se encuentran en componentes `<style scoped>` para evitar
conflictos.

## 🔄 Flujo de Datos

La aplicación sigue el patrón de flujo unidireccional de Vue con composables:

1. **Lógica de negocio**: Encapsulada en `useTasks()` composable
2. **Estado centralizado**: Consumido desde `App.vue` mediante destructuring
3. **Props down**: Los datos fluyen hacia componentes hijos
4. **Events up**: Los componentes emiten eventos que llaman a funciones del composable
5. **Computed properties**: Para valores derivados (filtrado, contadores)

```
useTasks() composable
    ↓ (retorna: tasks, addTask, toggleDone, removeTask, editTask, totalDone)
App.vue
    ↓ props
    ├─→ TaskForm (emite: add-task) → addTask()
    ├─→ FilterButton (emite: set-filter) → actualiza filtro local
    └─→ TaskList (emite: toggle-done, remove-task, edit-task)
            → toggleDone(), removeTask(), editTask()
```

### Persistencia Automática

El composable `useTasks` implementa un sistema de persistencia reactivo:

```typescript
// Carga inicial al montar
onMounted(() => {
  // Carga tareas desde localStorage con validación y manejo de errores
})

// Sincronización automática
watch(
  tasks,
  (newTasks) => {
    // Guarda en localStorage cada vez que cambian las tareas
  },
  { deep: true }
)
```

## 🧪 Testing

Este proyecto cuenta con una suite de tests completa para el composable `useTasks`:

### Configuración de Testing

- **Framework**: Vitest con entorno jsdom
- **Utilidades**: @vue/test-utils para testing de componentes Vue
- **Helper personalizado**: `withSetup()` para testear composables dentro de un componente

### Cobertura Actual

El archivo [useTasks.spec.ts](src/__test__/useTasks.spec.ts) incluye **9 tests** que verifican:

#### Estado Inicial
- ✅ Inicializa con un array vacío de tareas
- ✅ Inicializa totalDone en 0

#### Funcionalidad addTask
- ✅ Añade tareas correctamente
- ✅ Las tareas tienen la estructura correcta (id, title, done)
- ✅ Puede agregar múltiples tareas
- ✅ No añade tareas con título vacío
- ✅ Genera IDs únicos para cada tarea

#### Funcionalidad Adicional (Próximamente)
- ⏳ Tests para `toggleDone()`
- ⏳ Tests para `removeTask()`
- ⏳ Tests para `editTask()`
- ⏳ Tests para `totalDone` computed property

### Ejecutar Tests

```bash
# Modo watch (recomendado para desarrollo)
pnpm test

# Ejecución única (usado en CI)
pnpm test:run
```

## 🚀 CI/CD

El proyecto cuenta con un pipeline automatizado de GitHub Actions configurado en [.github/workflows/ci.yml](.github/workflows/ci.yml).

### Pipeline de Integración Continua

**Se ejecuta en**:
- Push a ramas `main` y `dev`
- Pull requests hacia `main`

**Etapas del pipeline**:

1. **Setup**: Configura Node.js 20 y pnpm con caché de dependencias
2. **Install**: Instala dependencias con pnpm
3. **Lint**: Verifica calidad de código con ESLint
4. **Build**: Ejecuta type-checking y compila la aplicación
5. **Test**: Ejecuta la suite completa de tests unitarios

Todas las etapas deben completarse exitosamente para que el pipeline pase.

## 📏 Code Quality

### ESLint

El proyecto usa **ESLint 9** con configuración flat (eslint.config.js):

**Plugins activos**:
- `eslint-plugin-vue` - Reglas específicas para Vue 3
- `typescript-eslint` - Soporte para TypeScript
- `@vue/eslint-config-typescript` - Configuración recomendada para Vue + TS

**Comandos**:
```bash
# Verificar código
pnpm lint

# Auto-fix de problemas
pnpm lint:fix
```

### TypeScript Strict Mode

El proyecto está configurado con TypeScript en modo estricto:

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true,
  "noUncheckedSideEffectImports": true
}
```

Esto garantiza máxima seguridad de tipos y detecta errores en tiempo de compilación.

## 🔧 Características Técnicas

- **Composition API**: Uso de `<script setup>` para mejor ergonomía y tree-shaking
- **Composables Pattern**: Lógica reutilizable y testeable mediante `useTasks()`
- **Reactivity System**: `ref()`, `computed()` y `watch()` para reactividad completa
- **Type Safety**: Props, eventos y composables completamente tipados con TypeScript estricto
- **Transitions**: Animaciones declarativas con `<TransitionGroup>` (fade + slide, 500ms)
- **Custom Directives**: `v-focus` para auto-focus en inputs de edición
- **Event Handling**: Sistema de eventos personalizados tipados
- **LocalStorage API**: Persistencia automática con manejo de errores robusto
- **Data Validation**: Validación de entrada y datos cargados desde localStorage
- **UUID Generation**: IDs únicos con `crypto.randomUUID()`
- **Unit Testing**: Suite completa con Vitest y @vue/test-utils
- **Continuous Integration**: Pipeline automatizado con GitHub Actions
- **Code Linting**: ESLint configurado para Vue 3 + TypeScript

## 📝 Roadmap de Mejoras

### ✅ Completado

- [x] Persistencia de datos (LocalStorage)
- [x] Composables reutilizables
- [x] Edición de tareas existentes
- [x] Tests unitarios (Vitest)
- [x] CI/CD con GitHub Actions
- [x] Linting con ESLint
- [x] TypeScript strict mode
- [x] Validación de entrada
- [x] Animaciones suaves

### 🔜 Próximas Mejoras

- [ ] Cobertura completa de tests (componentes)
- [ ] Tests E2E con Playwright
- [ ] Categorías o etiquetas para tareas
- [ ] Fechas de vencimiento y recordatorios
- [ ] Drag & drop para reordenar
- [ ] Sincronización con backend/API REST
- [ ] Exportar/Importar tareas (JSON/CSV)
- [ ] Modo oscuro manual (toggle)
- [ ] Búsqueda y filtrado avanzado por texto
- [ ] Estadísticas de productividad
- [ ] Prioridades para tareas
- [ ] Subtareas anidadas

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Instala las dependencias (`pnpm install`)
4. Escribe tests para tu feature
5. Asegúrate de que los tests pasen (`pnpm test:run`)
6. Verifica el linting (`pnpm lint`)
7. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
8. Push a la rama (`git push origin feature/AmazingFeature`)
9. Abre un Pull Request (el CI se ejecutará automáticamente)

---

**Desarrollado con ❤️ usando Vue 3 + TypeScript**
