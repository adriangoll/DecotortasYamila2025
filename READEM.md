# 🎂 Decotortas Yamila - E-commerce de Repostería

Plataforma web completa de comercio electrónico especializada en tortas y productos de repostería artesanales, desarrollada como proyecto académico para la Tecnicatura en Desarrollo de Software.

Estado del Proyecto: Finalizado


## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [API Endpoints](#-api-endpoints)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Autor](#-autor)

---

## 📖 Descripción

**Decotortas Yamila** es una aplicación web full-stack que permite a los usuarios explorar, filtrar y comprar productos de repostería. Incluye un panel administrativo completo para la gestión de productos, categorías y pedidos.

El proyecto implementa autenticación con Google, notificaciones por email, chatbot con IA, y carga de imágenes, demostrando el uso de tecnologías modernas en desarrollo web.

---

## ✨ Características Principales

### Para Usuarios
- 🔍 **Búsqueda y Filtrado Avanzado**: Filtros por categoría, búsqueda por nombre
- 🛒 **Carrito de Compras**: Gestión completa con localStorage
- 🔐 **Autenticación con Google**: Login seguro mediante Firebase
- 💬 **Chatbot con IA**: Asistente virtual powered by Google Gemini
- 📧 **Formulario de Contacto**: Notificaciones automáticas por email
- 📱 **Diseño Responsive**: Optimizado para móviles y tablets
- 🎨 **Interfaz Moderna**: UI intuitiva con Material-UI y Tailwind CSS

### Para Administradores
- 📊 **Panel de Administración**: Dashboard completo
- 🖼️ **Gestión de Productos**: CRUD con carga de imágenes (drag & drop)
- 🏷️ **Gestión de Categorías**: CRUD completo
- 📦 **Gestión de Pedidos**: Seguimiento de estados
- 🔒 **Acceso Protegido**: Rutas privadas con validación

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación SPA
- **Axios** - Cliente HTTP
- **Material-UI (MUI)** - Componentes UI
- **Tailwind CSS** - Framework CSS utility-first
- **Firebase** - Autenticación con Google
- **Swiper** - Carrusel de imágenes

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **Sequelize** - ORM para SQL
- **MySQL** - Base de datos
- **Multer** - Manejo de archivos
- **Nodemailer** - Envío de emails
- **dotenv** - Variables de entorno
- **CORS** - Control de acceso

### IA y Servicios Externos
- **Google Gemini AI** - Chatbot inteligente
- **OpenAI DALL-E** - Generación de imágenes (opcional)

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v16 o superior ([Descargar](https://nodejs.org/))
- **MySQL** v8 o superior ([Descargar](https://dev.mysql.com/downloads/))
- **Git** ([Descargar](https://git-scm.com/))
- Cuenta de **Gmail** (para envío de emails)
- Cuenta de **Google Cloud** (para Firebase y Gemini)

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/decotortas-yamila.git
cd decotortas-yamila
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

### 4. Configurar la Base de Datos

Crear la base de datos en MySQL:

```sql
CREATE DATABASE decotortas_db;
```

---

## ⚙️ Configuración

### Backend (.env)

Crear archivo `backend/.env`:

```env
# Base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=decotortas_db
DB_DIALECT=mysql

# Servidor
PORT=3000
NODE_ENV=development

# Email (Gmail)
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_password_de_aplicacion
EMAIL_RECEIVER=destino@gmail.com

# API Keys
GEMINI_API_KEY=tu_gemini_api_key
OPENAI_API_KEY=tu_openai_api_key
```

### Frontend (Firebase)

Crear archivo `frontend/src/firebase/firebaseConfig.js` con tus credenciales de Firebase.

---

## 💻 Uso

### Iniciar el Backend

```bash
cd backend
npm start
```

El servidor estará disponible en `http://localhost:3000`

### Iniciar el Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Credenciales de Administrador

- **Usuario**: admin
- **Contraseña**: 1234

---

## 📁 Estructura del Proyecto

```
decotortas/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuraciones (DB, Email, Gemini)
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── models/          # Modelos Sequelize
│   │   ├── routes/          # Rutas de la API
│   │   └── middleware/      # Middlewares
│   ├── uploads/             # Imágenes subidas
│   └── index.js            # Punto de entrada
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── contexts/        # Context API (Auth, Cart)
│   │   ├── pages/           # Páginas principales
│   │   ├── admin/           # Panel de administración
│   │   └── firebase/        # Configuración Firebase
│   └── index.html
│
└── chatbot/                 # Chatbot IA (opcional)
    └── API-chatbot/
```

---

## 🎯 Funcionalidades

### Usuarios
- ✅ Registro y login con Google
- ✅ Explorar productos por categorías
- ✅ Buscar productos por nombre
- ✅ Agregar productos al carrito
- ✅ Ver detalles de productos
- ✅ Enviar consultas por formulario de contacto
- ✅ Chat con asistente virtual IA

### Administradores
- ✅ CRUD completo de productos
- ✅ CRUD completo de categorías
- ✅ Carga de imágenes con drag & drop
- ✅ Gestión de pedidos
- ✅ Panel de control

---

## 🌐 API Endpoints

### Productos
```
GET    /api/producto          - Obtener todos los productos
GET    /api/producto/:id      - Obtener producto por ID
POST   /api/producto          - Crear producto (Admin)
PUT    /api/producto/:id      - Actualizar producto (Admin)
DELETE /api/producto/:id      - Eliminar producto (Admin)
```

### Categorías
```
GET    /api/categoria         - Obtener todas las categorías
POST   /api/categoria         - Crear categoría (Admin)
PUT    /api/categoria/:id     - Actualizar categoría (Admin)
DELETE /api/categoria/:id     - Eliminar categoría (Admin)
```

### Contacto
```
POST   /api/contacto          - Enviar mensaje de contacto
```

---

## 📸 Capturas de Pantalla

### Homepage
![Homepage](docs/screenshots/home.png)

### Panel Admin
![Admin Panel](docs/screenshots/admin.png)

### Carrito
![Cart](docs/screenshots/cart.png)

---

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@gmail.com
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte de la Tecnicatura en Desarrollo de Software.

---

## 🙏 Agradecimientos

- Profesores de la Tecnicatura
- Documentación oficial de React y Node.js
- Comunidad de Stack Overflow

---

## 📝 Notas Adicionales

### Credenciales de Testing

Para probar el sistema, puedes usar:
- **Admin Panel**: `/admin/login`
  - Usuario: `admin`
  - Contraseña: `1234`

### Troubleshooting

**Error de conexión a la BD:**
- Verificar credenciales en `.env`
- Asegurar que MySQL esté corriendo

**Error de CORS:**
- Verificar que el frontend esté en `http://localhost:5173`
- Revisar configuración de CORS en `backend/index.js`

---

**⭐ Si te gustó el proyecto, no olvides darle una estrella en GitHub!**