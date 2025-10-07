# Wavelens - Página de Inicio

Una página web responsive y funcional para un sitio de viajes y aventuras, desarrollada con HTML5, Sass, JavaScript vanilla y siguiendo las mejores prácticas de accesibilidad web.

🔗 Demo: https://mcastrillosj.github.io/avoris-prueba-maquetacion-web/

## 🚀 Características Principales

- **Diseño Responsive**: Optimizado para escritorio, tablet y móvil
- **HTML5 Semántico**: Estructura semántica y accesible
- **Metodología BEM**: Nomenclatura consistente y mantenible
- **Sass/SCSS**: Preprocesador CSS con arquitectura modular
- **JavaScript Vanilla**: Interactividad sin dependencias externas
- **Accesibilidad WCAG**: Implementación de estándares de accesibilidad
- **Performance**: Carga rápida y optimizada

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica con elementos `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- **Sass/SCSS**: Preprocesador CSS con variables, mixins y arquitectura modular
- **CSS3**: Flexbox, Grid, animaciones y transiciones
- **JavaScript ES6+**: Vanilla JS con funciones modernas y manejo de eventos

### Herramientas de Desarrollo
- **Node.js**: Entorno de ejecución
- **npm**: Gestor de paquetes
- **Sass**: Compilación de estilos

## 📁 Estructura del Proyecto

```
proyecto-wavelens/
├── assets/
│   ├── icons/          # Iconos SVG
│   └── images/         # Imágenes optimizadas
├── css/
│   ├── main.css        # CSS compilado
│   └── main.css.map    # Source map
├── js/
│   └── main.js         # JavaScript principal
├── scss/
│   ├── abstracts/      # Variables y mixins
│   │   ├── _variables.scss
│   │   └── _mixins.scss
│   ├── base/           # Reset y tipografía
│   │   ├── _reset.scss
│   │   └── _typography.scss
│   ├── components/     # Componentes reutilizables
│   │   ├── _button.scss
│   │   ├── _card.scss
│   │   ├── _filters.scss
│   │   ├── _hero.scss
│   │   └── _modal.scss
│   ├── layout/         # Layout principal
│   │   ├── _header.scss
│   │   ├── _footer.scss
│   │   └── _main-content.scss
│   └── main.scss       # Archivo principal
├── index.html          # Página principal
├── package.json        # Configuración npm
└── README.md          # Este archivo
```

## 🎨 Decisiones de Diseño

### Metodología BEM
Se implementó la metodología BEM (Block, Element, Modifier) para mantener una nomenclatura consistente y escalable:

```scss
// Block
.card { }

// Element
.card__image { }
.card__title { }
.card__footer { }

// Modifier
.card--featured { }
.button--primary { }
.button--secondary { }
```

### Arquitectura Sass
Organización modular siguiendo el patrón 7-1:

- **Abstracts**: Variables, mixins y funciones
- **Base**: Reset CSS y estilos base
- **Components**: Componentes reutilizables
- **Layout**: Estructura principal de la página

### Responsive Design
Implementación de mobile-first con breakpoints:

```scss
// Móvil (por defecto)
.component { }

// Tablet
@media (min-width: 768px) { }

// Desktop
@media (min-width: 1200px) { }
```

## ♿ Accesibilidad (WCAG)

### Implementaciones Clave

1. **Estructura Semántica**
   - Uso correcto de elementos HTML5 semánticos
   - Jerarquía de encabezados (h1, h2, h3)
   - Etiquetas `<nav>`, `<main>`, `<section>`, `<article>`

2. **Navegación por Teclado**
   - Focus visible en todos los elementos interactivos
   - Navegación secuencial con Tab
   - Escape para cerrar modales

3. **ARIA Labels y Roles**
   ```html
   <button aria-label="Abrir menú de navegación" aria-expanded="false">
   <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
   ```

4. **Contraste y Legibilidad**
   - Ratios de contraste superiores a 4.5:1
   - Tamaños de fuente legibles (mínimo 16px)
   - Espaciado adecuado entre elementos

5. **Imágenes y Contenido**
   - Texto alternativo descriptivo para todas las imágenes
   - Iconos decorativos con `aria-hidden="true"`

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd proyecto-wavelens
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Compilar Sass**
   ```bash
   # Compilación única
   npm run build:css
   
   # Modo desarrollo (watch)
   npm run dev:css
   ```

4. **Abrir en el navegador**
   ```bash
   # Abrir index.html directamente o usar un servidor local
   python -m http.server 8000
   # O
   npx serve .
   ```

### Scripts Disponibles

```json
{
  "build:css": "sass scss/main.scss css/main.css --style=compressed",
  "dev:css": "sass scss/main.scss css/main.css --watch --style=expanded"
}
```

## 📱 Funcionalidades

### Slider Hero
- Navegación automática cada 5 segundos
- Controles manuales (anterior/siguiente)
- Indicadores de posición (dots)
- Actualización dinámica de contenido

### Panel de Filtros
- **Móvil**: Modal de pantalla completa que se desliza desde abajo
- **Tablet**: Panel lateral que se desliza desde la izquierda (296px de ancho)
- **Desktop**: Panel fijo en la columna izquierda

### Modal de Precios
- **Móvil**: Modal de pantalla completa con precio final integrado
- **Desktop**: Modal centrado con footer separado
- Cierre con Escape o botón de cerrar

### Menú Móvil
- Hamburger menu con animaciones
- Navegación accesible por teclado
- Prevención de scroll del body cuando está abierto

## 🎯 Optimizaciones de Performance

1. **CSS**
   - Compilación minificada para producción
   - Uso de `clamp()` para tipografía fluida
   - Optimización de selectores

2. **JavaScript**
   - Event delegation para mejor performance
   - Debounce en eventos de scroll
   - Lazy loading de imágenes (preparado)

3. **Imágenes**
   - Formatos optimizados (SVG para iconos)
   - Texto alternativo descriptivo
   - Responsive images con `srcset` (preparado)

## 🔧 Personalización

### Variables Sass
Todas las variables están centralizadas en `scss/abstracts/_variables.scss`:

```scss
// Colores
$color-primary: #5D37F3;
$color-secondary: #FF8F50;

// Breakpoints
$bp-tablet: 768px;
$bp-desktop: 1200px;

// Tipografía
$font-family-primary: system-ui, sans-serif;
$font-family-secondary: 'Nunito', sans-serif;
```

### Añadir Nuevos Componentes
1. Crear archivo en `scss/components/_nuevo-componente.scss`
2. Importar en `scss/main.scss`
3. Seguir metodología BEM para las clases

## 🧪 Testing y Validación

### Herramientas Recomendadas
- **Lighthouse**: Auditoría de performance y accesibilidad
- **WAVE**: Evaluación de accesibilidad web
- **HTML Validator**: Validación de HTML5
- **CSS Validator**: Validación de CSS3

### Checklist de Accesibilidad
- [x] Estructura semántica correcta
- [x] Navegación por teclado funcional
- [x] Contraste de colores adecuado
- [x] Texto alternativo en imágenes
- [x] ARIA labels implementados
- [x] Focus visible en elementos interactivos


## 👨‍💻 Autora Marta Castrillo

Desarrollado siguiendo las mejores prácticas de desarrollo web moderno, con enfoque en accesibilidad, performance y mantenibilidad del código.

---
