# CoffeeHaven ☕

CoffeeHaven is a responsive Angular web application built as a practical project for the **Client-Side Development** module of a Vocational Education and Training (VET) program (Formación Profesional - DAW). It simulates an online coffee shop where users can browse products, manage orders, and navigate through an intuitive interface.

## 🚀 Features

- Component-based structure using Angular
- Routing and navigation between pages
- User authentication with route guards
- Services for API communication and business logic
- Modular folder organization (`components`, `services`, `models`, etc.)
- Responsive UI with custom CSS

## 🛠️ Tech Stack

- **Angular** 19 (Angular CLI)
- TypeScript
- HTML & CSS

## 📦 Getting Started

### Prerequisites

- Node.js and npm installed
- Angular CLI installed globally

```bash
npm install -g @angular/cli
```

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Running the Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/` to view the app in your browser. The app will auto-reload if you make changes to the source files.


## 📁 Project Structure

- `src/app/components`: Angular components
- `src/app/services`: Business logic and API services
- `src/app/models`: Interfaces and data types
- `src/app/guards`: Route protection logic
- `src/app/app.routes.ts`: Routing configuration

## 📦 Deployment (Docker + Nginx)

This project includes a Dockerfile to build and serve the Angular application using Nginx, optimized for single-page applications (SPA).

### 🐳 Build the Docker image

```bash
docker build -t coffeehaven-angular .
```

### 🚀 Run the container

```bash
docker run -d \
  --name coffeehaven-web \
  -p 8080:80 \
  --restart unless-stopped \
  coffeehaven-angular
```

Once the container is running, you can access the app at:

- `http://localhost:8080` (if local)
- Or your configured subdomain.

### 📁 Nginx configuration

The container uses a custom `nginx.conf` file to handle SPA routing (try_files $uri $uri/ /index.html).
This ensures deep links and client-side routes work as expected.

---

## 👨‍💻 Author

**Roger Navarro**  
Student at [La Salle FP Online](https://lasallefponline.sallenet.org/) – Vocational Education Program (DAW - Client-Side Development)  
🔗 GitHub: [https://github.com/Roger486](https://github.com/Roger486)

Project developed for academic purposes.

## 📄 License

This project is for educational purposes and is not intended for production use.

---

### 👨‍🎓 Created for FP DAW — Client-Side Development

Developed as part of a Vocational Training program to demonstrate modern front-end architecture using Angular.
