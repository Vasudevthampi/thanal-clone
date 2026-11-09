# Landscape Design Studio

A landscape design website featuring an interactive project estimator, a garden planner, a before/after slider, and a filterable photo portfolio.

---

## 🚀 Quickstart: Running in Visual Studio Code

### 1. Prerequisites
- **Node.js** (v20.19 or newer). Download from [nodejs.org](https://nodejs.org).
- **Visual Studio Code**. Download from [code.visualstudio.com](https://code.visualstudio.com).

### 2. Open Project in VS Code
1. Clone or download this project repository.
2. Open VS Code, click **File > Open Folder...**, and select this project directory.
3. Open the integrated terminal in VS Code:
   - Shortcut: `Ctrl + \`` (Windows/Linux) or `Cmd + \`` (macOS)
   - Or click menu: **Terminal > New Terminal**

### 3. Install Dependencies & Run
In the VS Code terminal:

**On Windows (PowerShell - default in VS Code on Windows):**
Create a local environment file and add your Gemini API key to it. Keep the key
private; the server reads it and it is never sent as a frontend environment
variable.
```powershell
Copy-Item .env.example .env
notepad .env
npm install
npm run dev
```

**On macOS / Linux / Git Bash / Command Prompt:**
```bash
cp .env.example .env
# Add GEMINI_API_KEY to .env before starting the app.
npm install
npm run dev
```

The Node server starts the Vite development app and server-side AI endpoints:
```text
Landscape studio development listening on port 3000
```
Press `Ctrl + click` (or `Cmd + click` on macOS) on `http://localhost:3000/` or open it in your browser.

The garden assistant sends a Gemini request when a visitor asks a question and
requires a valid `GEMINI_API_KEY`; configure it in `.env` locally and in your
host's secret manager in production. Never put it in a `VITE_` variable or
browser code. The Garden Planner collects project details and sends them to the
local project brief; it does not generate images or send data to a business.

### 4. Run Automated Unit Tests
To verify the pure landscape estimation logic and pricing calculation:
```bash
npx tsx --test src/utils/estimator.test.ts
```

---

## 📸 Adding Photos & Logo

You have two ways to add photos and a logo:

### Option A: In the Live Website (Zero Code)
1. Open the website.
2. Click the **"Upload Photos/Logo"** button in the top bar or footer.
3. Upload a logo (PNG/SVG/WebP) and project photography.
4. The site updates instantly and persists in your browser!

### Option B: Permanent File Replacement in VS Code
Place your media files directly in the `/public` folder:
- **Company Logo**: `/public/images/logo.png` (or `/public/images/logo.svg`)
- **Main Hero Banner**: `/public/images/hero.jpg` (16:9 ratio recommended)
- **Project Showcase Photos**: `/public/images/projects/villa1.jpg`, etc.

Any file placed inside `/public` is automatically served at the root URL (e.g. `/images/logo.png`) without requiring any build step or code modifications.

---

## 🌐 Steps to Deploy Live to Production

### Deploy to Vercel and share a link

1. Push the project to a GitHub repository. Do not commit `.env` or share API
   keys.
2. In Vercel, choose **Add New → Project** and import the GitHub repository.
3. Use `npm run build` as the build command and `dist` as the output directory.
   Vercel detects the `api/` directory for the Garden Assistant endpoint.
4. In Vercel project settings, add `GROQ_API_KEY` or `GEMINI_API_KEY` as an
   environment variable. Store it as a secret; never use a `VITE_` variable or
   put it in frontend code.
5. Deploy the project and share the generated `*.vercel.app` URL with your
   client. Future pushes to GitHub will trigger deployments automatically.

If the provider key is not configured, the website and quotation form still
work, but the Garden Assistant will be unavailable.

### Option 3: Push to GitHub
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Landscape Design Website"
   ```
2. Create a repository on [github.com](https://github.com) and push:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repository>.git
   git branch -M main
   git push -u origin main
   ```
3. Import the GitHub repository into Vercel for automatic deployments on every future commit.

---

## 🛠️ Project Structure
```text
├── index.html
├── package.json
├── server/
│   └── index.js                # Node server, Vite development middleware, and private Gemini endpoints
├── public/
│   └── images/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   │   ├── LandscapeStudio.tsx # Garden planner and quotation handoff
│   │   └── GardenAssistant.tsx # Gemini-powered garden help chat
│   └── utils/
│       └── estimator.ts
```

---

## 🌿 Design Approach
The site presents landscape ideas with accessible semantic HTML and responsive layouts.
