# 🎂 Decotortas Yamila - E-commerce de Repostería

Plataforma web completa de comercio electrónico especializada en tortas y productos de repostería artesanales, desarrollada como proyecto académico para la **Tecnicatura en Desarrollo de Software**.

**🟢 Estado del Proyecto:** Finalizado

---

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
- [Licencia](#-licencia)  
- [Agradecimientos](#-agradecimientos)  

---

## 📖 Descripción

**Decotortas Yamila** es una aplicación web **full-stack** que permite a los usuarios explorar, filtrar y comprar productos de repostería artesanal.  
Incluye un **panel administrativo completo** para la gestión de productos, categorías y pedidos.

El proyecto integra **autenticación con Google**, **notificaciones por email**, **chatbot con IA (Google Gemini)** y **carga de imágenes**, demostrando el uso de tecnologías modernas de desarrollo web.

---

## ✨ Características Principales

### 👩‍🍳 Para Usuarios
- 🔍 **Búsqueda y Filtrado Avanzado** por categoría o nombre  
- 🛒 **Carrito de Compras** persistente con `localStorage`  
- 🔐 **Login con Google (Firebase)**  
- 💬 **Chatbot con IA (Gemini)** para asistencia automatizada  
- 📧 **Formulario de Contacto** con envío de correo automático  
- 📱 **Diseño Responsive**, adaptable a móviles y tablets  
- 🎨 **Interfaz Moderna** con MUI + Tailwind CSS  

### 🧁 Para Administradores
- 📊 **Dashboard de Administración** completo  
- 🖼️ **Gestión de Productos** con carga de imágenes (drag & drop)  
- 🏷️ **Gestión de Categorías**  
- 📦 **Gestión de Pedidos** con control de estados  
- 🔒 **Rutas Privadas** con validación de acceso  

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18**  
- **Vite**  
- **React Router DOM**  
- **Axios**  
- **Material-UI (MUI)**  
- **Tailwind CSS**  
- **Firebase Auth (Google)**  
- **Swiper**  

### Backend
- **Node.js** + **Express**  
- **Sequelize (ORM)**  
- **MySQL**  
- **Multer** (carga de archivos)  
- **Nodemailer** (emails automáticos)  
- **dotenv**, **CORS**  

### Inteligencia Artificial y Servicios Externos
- 🤖 **Google Gemini AI** — Asistente virtual inteligente  
- 🎨 **OpenAI DALL·E (opcional)** — Generación de imágenes  

---

## 📦 Requisitos Previos

Antes de comenzar, asegurate de tener instalado:

- **Node.js** v16 o superior  
- **MySQL** v8 o superior  
- **Git**  
- Una cuenta de **Gmail** (para envío de emails)  
- Una cuenta en **Google Cloud / Firebase** (para autenticación y Gemini AI)

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/adriangoll/decotortas-yamila.git
cd decotortas-yamila 

2. Instalar dependencias del Backend

cd backend
npm install
3. Instalar dependencias del Frontend
bash
Copiar código
cd ../frontend
npm install
4. Crear la base de datos MySQL
sql
Copiar código
CREATE DATABASE decotortas_db;
⚙️ Configuración
Backend (backend/.env)
env
Copiar código
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
EMAIL_PASS=tu_contraseña_de_aplicacion
EMAIL_RECEIVER=destinatario@gmail.com

# API Keys
GEMINI_API_KEY=tu_gemini_api_key
OPENAI_API_KEY=tu_openai_api_key
Frontend (frontend/src/firebase/firebaseConfig.js)
Completar con tus credenciales de Firebase Auth (Google Sign-In).

💻 Uso
Iniciar el Backend
bash
Copiar código
cd backend
npm start
Servidor disponible en:
👉 http://localhost:3000

Iniciar el Frontend
bash
Copiar código
cd frontend
npm run dev
Aplicación disponible en:
👉 http://localhost:5173

Credenciales de Administrador
makefile
Copiar código
Usuario: admin
Contraseña: 1234
📁 Estructura del Proyecto
pgsql
Copiar código
decotortas/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── uploads/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── admin/
│   │   └── firebase/
│   └── index.html
│
└── chatbot/
    └── API-chatbot/
🎯 Funcionalidades
👥 Usuarios
✅ Registro e inicio de sesión con Google

✅ Búsqueda y filtrado de productos

✅ Carrito con persistencia

✅ Chat con IA Gemini

✅ Formulario de contacto con envío automático

🛠️ Administradores
✅ CRUD completo de productos y categorías

✅ Gestión de imágenes

✅ Gestión de pedidos

✅ Panel de control protegido

🌐 API Endpoints
Productos
bash
Copiar código
GET    /api/producto
GET    /api/producto/:id
POST   /api/producto
PUT    /api/producto/:id
DELETE /api/producto/:id
Categorías
bash
Copiar código
GET    /api/categoria
POST   /api/categoria
PUT    /api/categoria/:id
DELETE /api/categoria/:id
Contacto
bash
Copiar código
POST   /api/contacto
📸 Capturas de Pantalla
📷 Próximamente se agregarán imágenes de la interfaz de usuario (Home, Admin y Carrito).

👨‍💻 Autor
Adrián Sosa

GitHub: @adriangoll

LinkedIn: Marcelo Adrián Sosa

📄 Licencia
Proyecto desarrollado con fines educativos como parte de la Tecnicatura en Desarrollo de Software.
Uso libre con fines académicos y demostrativos.

🙏 Agradecimientos
Docentes de la Tecnicatura

Documentación oficial de React, Node.js y Firebase

Compañeros y amigos de estudio