SCHOOL MANAGER

Descripción del Proyecto
School Manager es una aplicación web pensada para administrar estudiantes y cursos. Permite crear, editar, eliminar y visualizar estudiantes, así como asignarlos o quitarlos de cursos específicos.
La aplicación consume una API REST propia y se desarrolló en React utilizando Context, Hooks y servicios separados para cumplir con buenas prácticas y lineamientos de la consigna.

Objetivos del Proyecto

Implementar un CRUD completo de estudiantes.

Asignar y quitar estudiantes de diferentes cursos.

Consumir una API externa usando fetch.

Manejar estados globales con Context.

Implementar un custom hook propio.

Renderizado condicional y componentes reutilizables.

Manejo de mensajes reales enviados por el backend.

Diseño responsive utilizando Tailwind CSS.

Confirmaciones de acciones y notificaciones mediante Material UI.

Tecnologías Utilizadas

React

React Router DOM

Context API

JavaScript

Custom Hooks

Tailwind CSS

Material UI

Vite

Node.js (Backend externo del TP)

Requerimientos Previos

Node.js v18 o superior

Tener configurado el archivo .env con la URL de la API:

VITE_API_URL=https://school-manager-orcin.vercel.app/api/students

Instalación

Clonar el repositorio:
git clone https://github.com/FranciscoBourquin/school-manager-frontend

Instalar dependencias:
npm install

Crear archivo .env con variable VITE_API_URL

Ejecutar en modo desarrollo:
npm run dev

Estructura del Proyecto

src/
|
├── assets/
│ └── courses/
|
├── components/
│ ├── Button.jsx
│ ├── Header.jsx
│ ├── Footer.jsx
│ └── StudentFormModal.jsx
|
├── context/
│ └── StudentsContext.jsx
|
├── hooks/
│ └── useStudents.js
|
├── pages/
│ ├── Home.jsx
│ ├── Students.jsx
│ ├── StudentDetails.jsx
│ ├── Courses.jsx
│ └── CourseDetails.jsx
|
└── services/
├── students.getAll.js
├── students.getById.js
├── students.create.js
├── students.update.js
├── students.delete.js
└── students.findByCourse.js

Funcionamiento General

Gestión de Estudiantes:

Listado de todos los estudiantes.

Creación mediante formulario dentro de un modal.

Eliminación con confirmación.

Detalles completos del estudiante.

Redirección automática después de eliminar.

Notificaciones de éxito o error.

Gestión de Cursos:

Vista de cursos representados por imágenes.

Detalle de cada curso con estudiantes anotados y disponibles.

Botón para agregar o quitar estudiantes del curso.

Mensajes obtenidos directamente desde el backend.

Mensajes del Backend
Toda la aplicación muestra:

Mensajes de éxito (creado, eliminado, actualizado).

Mensajes de lista vacía.

Mensajes de error.
Todos provienen directamente del backend.

Contexto Global
La aplicación utiliza StudentsContext para almacenar:

Lista de estudiantes

Mensaje del backend

Error del backend

Estados de carga

Funciones CRUD

Custom Hook
useStudents()
Este hook facilita acceder al contexto global desde cualquier componente.

Servicios
Cada servicio realiza una llamada fetch separada:

Obtener estudiantes

Obtener por ID (detalles de estudiante)

Crear

Actualizar

Eliminar

Buscar por curso

Todos retornan:
{ message, data }

Deploy
El deploy se realizó utilizando Vercel mediante Vercel CLI. La carpeta generada por Vercel no se sube al repositorio.
La aplicación está disponible en vercel: https://school-manager-frontend.vercel.app/

Autor
Francisco Bourquin
