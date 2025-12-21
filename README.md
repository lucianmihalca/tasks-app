# Task App

> Aplicación de gestión de tareas moderna, construida con Vue 3, TypeScript y PicoCSS

## Descripción

Task App es una aplicación de gestión de tareas (To-Do) desarrollada con tecnologías web
modernas. Permite a los usuarios crear, filtrar, marcar como completadas y eliminar
tareas de forma intuitiva con una interfaz minimalista y responsiva.

## ✨ Características

- ✅ **Crear tareas** nuevas mediante un formulario validado
- 🔄 **Marcar tareas** como completadas o pendientes con un simple clic
- 🗑️ **Eliminar tareas** individualmente
- 🔍 **Filtrar tareas** por estado: todas, pendientes o completadas
- 📊 **Contador de progreso** que muestra el total de tareas completadas
- 💾 **Persistencia de datos** con LocalStorage (las tareas se guardan automáticamente)
- 🎨 **Animaciones suaves** al agregar/eliminar tareas usando TransitionGroup
- 📱 **Diseño responsivo** gracias a PicoCSS
- 🔧 **Composables reutilizables** siguiendo las mejores prácticas de Vue 3
- 🔐 **Type-safe** con TypeScript estricto

## 🛠️ Stack Tecnológico

### Core

- **[Vue 3](https://vuejs.org/)** (3.5.24) - Framework progresivo para interfaces de
  usuario
- **[TypeScript](https://www.typescriptlang.org/)** (5.9.3) - Superset tipado de
  JavaScript
- **[Vite](https://vitejs.dev/)** (7.2.4) - Build tool de nueva generación

### UI/Estilos

- **[PicoCSS](https://picocss.com/)** (2.1.1) - Framework CSS minimalista y semántico

### Herramientas de Desarrollo

- **vue-tsc** - Type-checking para archivos Vue SFC
- **@vitejs/plugin-vue** - Plugin oficial de Vue para Vite

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

| Comando        | Descripción                                                    |
| -------------- | -------------------------------------------------------------- |
| `pnpm dev`     | Inicia el servidor de desarrollo con hot-reload                |
| `pnpm build`   | Ejecuta type-checking con vue-tsc y genera el build optimizado |
| `pnpm preview` | Sirve el build de producción localmente para pruebas           |

## 📁 Estructura del Proyecto

```
tasks-app/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes Vue
│   │   ├── TaskForm.vue        # Formulario para crear tareas
│   │   ├── TaskList.vue        # Lista de tareas con animaciones
│   │   └── FilterButton.vue    # Botón de filtro reutilizable
│   ├── composables/     # Composables reutilizables
│   │   └── useTasks.ts         # Lógica de gestión de tareas y persistencia
│   ├── App.vue          # Componente raíz con UI y filtros
│   ├── main.ts          # Punto de entrada de la aplicación
│   └── types.ts         # Definiciones de tipos TypeScript
├── index.html           # Template HTML
├── vite.config.ts       # Configuración de Vite
├── tsconfig.json        # Configuración de TypeScript
└── package.json         # Dependencias y scripts
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
- **CRUD operations**: `addTask()`, `toggleDone()`, `removeTask()`
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

Renderiza la lista de tareas con animaciones:

- Recibe tareas filtradas como props
- Implementa TransitionGroup para animaciones suaves
- Emite eventos para toggle y eliminación

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
    ↓ (retorna: tasks, addTask, toggleDone, removeTask, totalDone)
App.vue
    ↓ props
    ├─→ TaskForm (emite: add-task) → addTask()
    ├─→ FilterButton (emite: set-filter) → actualiza filtro local
    └─→ TaskList (emite: toggle-done, remove-task) → toggleDone(), removeTask()
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

## 🧪 Características Técnicas

- **Composition API**: Uso de `<script setup>` para mejor ergonomía
- **Composables Pattern**: Lógica reutilizable y testeable mediante `useTasks()`
- **Reactivity System**: `ref()`, `computed()` y `watch()` para reactividad completa
- **Type Safety**: Props, eventos y composables completamente tipados con TypeScript
- **Transitions**: Animaciones declarativas con `<TransitionGroup>`
- **Event Handling**: Sistema de eventos personalizados tipados
- **LocalStorage API**: Persistencia automática con manejo de errores robusto
- **Data Validation**: Validación de datos al cargar desde localStorage

## 📝 Mejoras Futuras

Algunas ideas para extender la funcionalidad:

- [x] Persistencia de datos (LocalStorage) ✅
- [x] Composables reutilizables ✅
- [ ] Edición de tareas existentes
- [ ] Categorías o etiquetas para tareas
- [ ] Fechas de vencimiento
- [ ] Drag & drop para reordenar
- [ ] Sincronización con backend/API
- [ ] Exportar/Importar tareas (JSON)
- [ ] Modo oscuro manual
- [ ] Búsqueda de tareas
- [ ] Estadísticas de productividad
- [ ] Tests unitarios (Vitest)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**Desarrollado con ❤️ usando Vue 3 + TypeScript**
