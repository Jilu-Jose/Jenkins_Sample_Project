# Simple Task Manager

A minimalistic, lightweight, and responsive Task Manager (To-Do List) web application built purely with HTML, CSS, and JavaScript. The project demonstrates core frontend development without the use of any heavy frameworks, and serves as an excellent starting point for learning about containerization and CI/CD pipelines.

## Features
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Clean, modern UI with dark mode support

---

## 🐳 Docker Integration

The application is containerized using Docker and served with NGINX. 

### Understanding the Dockerfile
The `Dockerfile` is a set of instructions used to build the image for the application:
- `FROM nginx:alpine`: Uses the official, lightweight Alpine-based NGINX web server image as the foundation.
- `COPY ...`: Copies the static application files (`index.html`, `style.css`, `script.js`) from our local directory into NGINX's default public hosting directory (`/usr/share/nginx/html/`).
- `EXPOSE 80`: Exposes container port 80 to allow incoming web traffic to reach the NGINX server.

### Local Docker Commands
If you want to build and run the application manually without a pipeline, use the following commands across the terminal.

**1. Build the Docker image:**
```bash
docker build -t task-manager-app .
```
*(This tells Docker to build an image named "task-manager-app" using the `Dockerfile` located in the current directory `.`)*

**2. Run the Docker container:**
```bash
docker run -d -p 8080:80 --name my-task-app task-manager-app
```
*(This starts a container in detached mode (`-d`), mapping your machine's port 8080 to the container's port 80, and names the running instance "my-task-app". You can access the app at `http://localhost:8080`.)*

---

##  CI/CD Pipeline (Jenkins)

The project includes a `Jenkinsfile` to automate the process of building the Docker image and deploying the container whenever new code is pushed.

### Pipeline Stages (`Jenkinsfile`)
The pipeline executes the following stages sequentially:

1. **Checkout**: Jenkins downloads the latest version of the code directly from the GitHub repository.
2. **Build Docker Image**: Automatically runs `docker build` to create a fresh container image infused with the latest updates to the HTML/CSS/JS files.
3. **Deploy Container Locally**: 
    - Halts and removes any old instances of the container running from previous builds to prevent port collision.
    - Spins up a fresh container instance (`docker run`) on port 8080 serving the newly built image.

To utilize this CI/CD Pipeline:
- Push the repository to GitHub.
- Set up a Jenkins Pipeline project.
- Point the pipeline source at the GitHub repository URL to automatically execute the `Jenkinsfile` on every execution.
