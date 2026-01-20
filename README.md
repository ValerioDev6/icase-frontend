# 🛍️ Frontend Sistema de Ventas e Inventario - iCases Store

Aplicación web moderna para la gestión integral de tiendas retail, desarrollada con Angular 17 y NG-ZORRO (Ant Design). Sistema completo de punto de venta (POS), control de inventario, gestión de compras y reportes avanzados.

## 📋 Descripción

Interfaz de usuario profesional y responsive que proporciona una experiencia completa para la administración de tiendas retail, incluyendo sistema POS, control de inventario en tiempo real, gestión de ventas y compras, análisis de datos con gráficos interactivos, y generación de reportes en PDF/Excel.

## 🚀 Tecnologías

- **Angular 17** - Framework principal
- **TypeScript** - Lenguaje de programación
- **NG-ZORRO (Ant Design)** - Biblioteca de componentes UI
- **RxJS** - Programación reactiva
- **SCSS** - Preprocesador CSS
- **Chart.js / Apache ECharts** - Gráficos y visualizaciones
- **Google reCAPTCHA** - Seguridad
- **File-Saver / ExcelJS** - Exportación de archivos

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── app.component.ts            # Componente raíz
│   ├── app.config.ts               # Configuración de la app
│   ├── app.routes.ts               # Rutas principales
│   │
│   ├── core/                       # Módulos y servicios core
│   │   ├── config/                 # Configuraciones
│   │   │   └── api/
│   │   │       └── config.url.ts   # URLs del API
│   │   │
│   │   ├── constants/              # Constantes
│   │   │   └── endpoints.api.ts    # Endpoints del backend
│   │   │
│   │   ├── directives/             # Directivas personalizadas
│   │   │   └── permission.directive.ts
│   │   │
│   │   ├── guards/                 # Guards de rutas
│   │   │   ├── auth.guard.ts
│   │   │   ├── permission.guard.ts
│   │   │   └── role.guard.ts
│   │   │
│   │   ├── interceptors/           # Interceptores HTTP
│   │   │   └── api.interceptor.ts
│   │   │
│   │   ├── interfaces/             # Interfaces TypeScript
│   │   │   ├── login-response.interface.ts
│   │   │   ├── producto.interface.ts
│   │   │   ├── ventas.interface.ts
│   │   │   ├── compras.interface.ts
│   │   │   ├── inventario.interface.ts
│   │   │   ├── kardex.interface.ts
│   │   │   ├── cliente.interface.ts
│   │   │   ├── proveedores.interface.ts
│   │   │   ├── personal.interface.ts
│   │   │   ├── roles.interface.ts
│   │   │   └── ... (45+ interfaces)
│   │   │
│   │   ├── services/               # Servicios principales
│   │   │   ├── common/
│   │   │   │   └── auth.service.ts
│   │   │   ├── storage/
│   │   │   │   ├── local-storage.service.ts
│   │   │   │   └── storage.ts
│   │   │   ├── reports/
│   │   │   │   ├── reportes-pdf.service.ts
│   │   │   │   └── reportes-excel.service.ts
│   │   │   ├── productos.service.ts
│   │   │   ├── ventas.service.ts
│   │   │   ├── compras.service.ts
│   │   │   ├── inventario.service.ts
│   │   │   ├── kardex.service.ts
│   │   │   ├── cliente.service.ts
│   │   │   ├── proveedores.service.ts
│   │   │   ├── personal.service.ts
│   │   │   ├── roles.service.ts
│   │   │   ├── chat-gpt.service.ts
│   │   │   ├── reniec.service.ts
│   │   │   └── ... (30+ servicios)
│   │   │
│   │   └── types/                  # Tipos y enums
│   │       ├── persona.types.ts
│   │       └── roles.enum.ts
│   │
│   ├── modules/                    # Módulos funcionales
│   │   │
│   │   ├── admin/                  # Layout administrativo
│   │   │   ├── layout/
│   │   │   │   └── main-layout/    # Layout principal
│   │   │   └── admin.routes.ts
│   │   │
│   │   ├── auth/                   # Autenticación
│   │   │   ├── components/
│   │   │   │   └── recapcha/
│   │   │   ├── pages/
│   │   │   │   └── login-page/
│   │   │   └── auth.routes.ts
│   │   │
│   │   ├── dashboard/              # Dashboard principal
│   │   │   ├── components/
│   │   │   │   ├── cards/          # Tarjetas de resumen
│   │   │   │   ├── charts-data/    # Gráficos de ventas
│   │   │   │   ├── charts-data-purchase/ # Gráficos de compras
│   │   │   │   └── table-info/     # Tablas informativas
│   │   │   ├── pages/
│   │   │   │   └── dashboard-page/
│   │   │   └── dashboard.routes.ts
│   │   │
│   │   ├── productos/              # Gestión de productos
│   │   │   ├── components/
│   │   │   │   └── upload-producto/ # Carga masiva
│   │   │   ├── pages/
│   │   │   │   ├── productos-page/
│   │   │   │   ├── crear-productos/
│   │   │   │   ├── actualizar-productos/
│   │   │   │   └── producto-individual/
│   │   │   └── productos.routes.ts
│   │   │
│   │   ├── categorias/             # Categorías
│   │   │   ├── components/
│   │   │   │   ├── crear-categorie/
│   │   │   │   └── actualizar-categorie/
│   │   │   ├── pages/
│   │   │   │   └── categoria-list/
│   │   │   └── categorias.routes.ts
│   │   │
│   │   ├── marcas/                 # Marcas
│   │   │   ├── components/
│   │   │   │   ├── crear-marca/
│   │   │   │   └── update-marca/
│   │   │   ├── pages/
│   │   │   │   └── marcas-lista/
│   │   │   └── marcas.routes.ts
│   │   │
│   │   ├── ventas/                 # Sistema de ventas POS
│   │   │   ├── components/
│   │   │   │   ├── table-producto-venta-modal/
│   │   │   │   └── upload-excel/
│   │   │   ├── pages/
│   │   │   │   ├── ventas-lista/
│   │   │   │   ├── crear-venta/
│   │   │   │   └── venta-detalles/
│   │   │   └── ventas.routes.ts
│   │   │
│   │   ├── compras/                # Gestión de compras
│   │   │   ├── components/
│   │   │   │   └── table-compras-modal/
│   │   │   ├── pages/
│   │   │   │   ├── compras-lista/
│   │   │   │   ├── crear-compra/
│   │   │   │   └── compra-detalles/
│   │   │   └── compras.routes.ts
│   │   │
│   │   ├── inventario/             # Control de inventario
│   │   │   ├── pages/
│   │   │   │   ├── inventario-lista/
│   │   │   │   ├── crear-registro-inventario/
│   │   │   │   └── editar-registro-inventario/
│   │   │   └── inventario.routes.ts
│   │   │
│   │   ├── kardex/                 # Kardex
│   │   │   ├── pages/
│   │   │   │   └── kardex-lista/
│   │   │   └── kardex.routes.ts
│   │   │
│   │   ├── ajuste/                 # Ajustes de inventario
│   │   │   ├── pages/
│   │   │   │   ├── ajuste-inventario/
│   │   │   │   └── create-ajuste-inventario/
│   │   │   └── ajuste.routes.ts
│   │   │
│   │   ├── clientes/               # Gestión de clientes
│   │   │   ├── components/
│   │   │   │   ├── crear-cliente/
│   │   │   │   └── editar-cliente/
│   │   │   ├── pages/
│   │   │   │   ├── clientes-lista/
│   │   │   │   └── cliente-detalles/
│   │   │   └── clientes.routes.ts
│   │   │
│   │   ├── proveedor/              # Gestión de proveedores
│   │   │   ├── components/
│   │   │   │   ├── crear-proveedor/
│   │   │   │   └── actualziar-proveedor/
│   │   │   ├── pages/
│   │   │   │   ├── proveedores-lista/
│   │   │   │   └── info-proveedor/
│   │   │   └── proveedores.route.ts
│   │   │
│   │   ├── personal/               # Gestión de personal
│   │   │   ├── components/
│   │   │   │   ├── personal-modal-editar/
│   │   │   │   └── change-password-personal/
│   │   │   ├── pages/
│   │   │   │   ├── personal-list/
│   │   │   │   ├── create-personal/
│   │   │   │   ├── editar-personal/
│   │   │   │   ├── perfil-personal/
│   │   │   │   ├── info-personal/
│   │   │   │   ├── configuracion-personal/
│   │   │   │   └── cambiar-password/
│   │   │   └── personal.routes.ts
│   │   │
│   │   ├── personas/               # Gestión de personas
│   │   │   ├── pages/
│   │   │   │   ├── listado-personas/
│   │   │   │   ├── crear-personas/
│   │   │   │   └── update-personas/
│   │   │   └── personas.routes.ts
│   │   │
│   │   ├── roles/                  # Roles y permisos
│   │   │   ├── components/
│   │   │   │   ├── crear-roles/
│   │   │   │   ├── actualiza-rol/
│   │   │   │   ├── actualizar-permisos/
│   │   │   │   └── agregar-permisos-modal/
│   │   │   ├── pages/
│   │   │   │   └── roles-lista/
│   │   │   └── roles.routes.ts
│   │   │
│   │   ├── sucursal/               # Sucursales
│   │   │   ├── components/
│   │   │   │   ├── crear-sucursal/
│   │   │   │   └── actualizar-sucursal/
│   │   │   ├── pages/
│   │   │   │   └── sucursal-page-lista/
│   │   │   └── sucursal.routes.ts
│   │   │
│   │   ├── graficos/               # Gráficos y reportes visuales
│   │   │   ├── components/
│   │   │   │   ├── ventas-anuales/
│   │   │   │   ├── compras-anuales/
│   │   │   │   ├── dounought-ventas/
│   │   │   │   └── dounought-compras/
│   │   │   ├── pages/
│   │   │   │   └── graficos-page/
│   │   │   └── graficos.routes.ts
│   │   │
│   │   ├── informes/               # Informes por período
│   │   │   ├── pages/
│   │   │   │   ├── ventas-informes/
│   │   │   │   └── compras-informes/
│   │   │   └── informes.routes.ts
│   │   │
│   │   │
│   │   ├── recomendaciones/        # Sistema de recomendaciones
│   │   │   ├── pages/
│   │   │   │   ├── recomendaciones-page/
│   │   │   │   └── crear-encuesta/
│   │   │   └── recomendaciones.routes.ts
│   │   │
│   │   ├── instrucciones/          # Manuales de usuario
│   │   │   ├── components/
│   │   │   │   ├── producto-modal/
│   │   │   │   ├── ventas-intruccion/
│   │   │   │   ├── compras-instruccion/
│   │   │   │   ├── clientes-instruccion/
│   │   │   │   ├── usuarios-instruccion/
│   │   │   │   ├── sucursales-instruccion/
│   │   │   │   ├── informes-instruccion/
│   │   │   │   └── recomendaciones-instruccion/
│   │   │   ├── pages/
│   │   │   │   └── instrucciones-page/
│   │   │   └── instrucciones.routes.ts
│   │   │
│   │   └── sexo/                   # Datos maestros - Género
│   │       ├── pages/
│   │       │   └── sexo-lista/
│   │       └── sexo.routes.ts
│   │
│   └── shared/                     # Recursos compartidos
│       ├── components/             # Componentes reutilizables
│       │   └── persona-formulario/
│       ├── pipes/                  # Pipes personalizados
│       │   ├── fecha.pipe.ts
│       │   └── pipe-currency.pipe.ts
│       └── services/               # Servicios compartidos
│           ├── delete-entity.service.ts
│           └── notificacion.service.ts
│
├── assets/                         # Recursos estáticos
│   ├── audios/                     # Sonidos de notificación
│   │   ├── alerta.mp3
│   │   └── sucess.mp3
│   ├── excel/                      # Plantillas Excel
│   │   └── productos.csv
│   ├── pdf/                        # Manuales en PDF
│   │   ├── manual_productos.pdf
│   │   ├── manual_ventas.pdf
│   │   ├── manual_compras.pdf
│   │   ├── manual_clientes.pdf
│   │   ├── manual_usuarios.pdf
│   │   ├── manual_sucursales.pdf
│   │   ├── manual_informes.pdf
│   │   └── manual_recomendaciones.pdf
│   ├── icase-logo.jpeg
│   └── login_picture.svg
│
└── environments/                   # Configuración de entornos
    ├── environment.development.ts
    └── environment.ts
```

## 🔑 Características Principales

### 💼 Sistema de Ventas (POS)
- ✅ Punto de venta intuitivo y rápido
- ✅ Búsqueda rápida de productos
- ✅ Múltiples métodos de pago
- ✅ Generación de tickets
- ✅ Historial de ventas detallado
- ✅ Anulación de ventas

### 📦 Gestión de Inventario
- ✅ Control de stock en tiempo real
- ✅ Sistema Kardex completo
- ✅ Ajustes de inventario
- ✅ Alertas de stock bajo
- ✅ Movimientos detallados
- ✅ Carga masiva desde Excel

### 🛒 Gestión de Compras
- ✅ Registro de compras a proveedores
- ✅ Control de costos
- ✅ Historial de compras
- ✅ Análisis de proveedores

### 👥 Gestión de Clientes y Proveedores
- ✅ Base de datos completa
- ✅ Historial de transacciones
- ✅ Información detallada
- ✅ Integración con RENIEC (Perú)

### 📊 Reportes y Analytics
- ✅ Dashboard con KPIs en tiempo real
- ✅ Gráficos interactivos (ventas, compras)
- ✅ Exportación a PDF
- ✅ Exportación a Excel
- ✅ Informes personalizados por período
- ✅ Análisis de tendencias

### 🔐 Seguridad y Control
- ✅ Sistema de autenticación JWT
- ✅ Roles y permisos granulares
- ✅ Guards de rutas
- ✅ Protección con reCAPTCHA
- ✅ Control de acceso por funcionalidad

### 🎨 Interfaz de Usuario
- ✅ Diseño moderno y profesional
- ✅ Responsive (móvil, tablet, desktop)
- ✅ Componentes NG-ZORRO
- ✅ Notificaciones visuales y sonoras
- ✅ Modo oscuro (opcional)

### 🤖 Funcionalidades Avanzadas
- ✅ Chat con inteligencia artificial
- ✅ Sistema de recomendaciones
- ✅ Mensajería interna
- ✅ Manuales de usuario integrados
- ✅ Múltiples sucursales

## 🛠️ Instalación

### Prerrequisitos
- Node.js (v18 o superior)
- npm o pnpm
- Angular CLI

### Pasos de instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install
# o
pnpm install

# Configurar variables de entorno
# Editar src/environments/environment.ts y environment.development.ts

# Ejecutar en desarrollo
ng serve
# o
npm start
```

## 📝 Variables de Entorno

**src/environments/environment.development.ts**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  recaptchaSiteKey: 'your_recaptcha_site_key'
};
```

**src/environments/environment.ts**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.icases-store.com/api',
  recaptchaSiteKey: 'your_recaptcha_site_key'
};
```

## 💻 Scripts Disponibles

```bash
# Desarrollo
ng serve                    # Inicia servidor de desarrollo
npm start                   # Alias para ng serve
ng serve --open            # Abre automáticamente en el navegador

# Producción
ng build                   # Build de desarrollo
ng build --configuration production  # Build de producción
npm run build             # Build de producción

# Linting
ng lint                   # Ejecuta linter
ng lint --fix            # Corrige errores automáticamente



## 🗺️ Rutas Principales

```
/auth/login                 - Login
/admin                      - Layout principal
  /dashboard                - Dashboard
  /productos                - Gestión de productos
    /lista                  - Lista de productos
    /crear                  - Crear producto
    /editar/:id            - Editar producto
    /:id                   - Detalle de producto
  /ventas                   - Gestión de ventas
    /lista                  - Lista de ventas
    /crear                  - Crear venta (POS)
    /detalle/:id           - Detalle de venta
  /compras                  - Gestión de compras
    /lista                  - Lista de compras
    /crear                  - Crear compra
    /detalle/:id           - Detalle de compra
  /inventario               - Control de inventario
  /kardex                   - Kardex
  /ajuste                   - Ajustes de inventario
  /clientes                 - Gestión de clientes
  /proveedores              - Gestión de proveedores
  /personal                 - Gestión de personal
  /roles                    - Roles y permisos
  /categorias               - Categorías
  /marcas                   - Marcas
  /sucursales               - Sucursales
  /graficos                 - Gráficos y reportes visuales
  /informes                 - Informes por período
  /chat                     - Chat con IA
  /instrucciones            - Manuales de usuario
```

## 🎨 Componentes Principales

### Dashboard
- Tarjetas con KPIs (ventas, compras, productos, clientes)
- Gráficos de ventas anuales
- Gráficos de compras anuales
- Tabla de productos más vendidos

### Sistema POS (Punto de Venta)
- Búsqueda de productos
- Carrito de compra
- Cálculo automático de totales
- Selección de cliente
- Métodos de pago
- Impresión de tickets

### Gestión de Inventario
- Lista de productos con stock
- Filtros avanzados
- Control de movimientos
- Sistema Kardex (PEPS/UEPS)
- Ajustes de inventario

## 📊 Reportes Disponibles

### PDF
- Lista de productos
- Tickets de venta
- Reportes de kardex
- Lista de clientes
- Lista de proveedores
- Lista de personal

### Excel
- Exportación de productos
- Reporte de ventas
- Reporte de compras
- Kardex detallado
- Lista de clientes y proveedores

## 🔐 Sistema de Permisos

El sistema utiliza directivas y guards para controlar el acceso:

```typescript
// Directiva de permisos
<button *appPermission="'crear_producto'">Crear Producto</button>

// Guard en rutas
{
  path: 'productos/crear',
  canActivate: [PermissionGuard],
  data: { permission: 'crear_producto' }
}
```

## 🎵 Notificaciones

El sistema incluye notificaciones visuales y sonoras:
- Éxito (sonido de éxito)
- Error (sonido de alerta)
- Advertencia
- Información



## 👨‍💻 Desarrollado para

**iCases Store** - Sistema integral de gestión retail

---

Desarrollado con ❤️ usando Angular 17 y NG-ZORRO
