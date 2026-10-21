# Soham Orivkar - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing AI systems, RAG architectures, and full-stack development projects.

## 🚀 Features

- **Modern Design**: Clean, minimalist design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Performance Optimized**: Lightweight bundle with only essential dependencies
- **Type Safe**: Built with TypeScript for better development experience
- **Contact Form**: Integrated email functionality using EmailJS
- **SEO Ready**: Optimized for search engines

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **Email Service**: EmailJS
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/          # Main page sections
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Services.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── ui/               # Reusable UI components
├── pages/                # Route pages
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── styles/               # Global styles
├── types/                # TypeScript type definitions
└── constants/            # Application constants
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sohamvaghela
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📧 Email Configuration

To enable the contact form, update the EmailJS configuration in `src/constants/index.ts`:

```typescript
export const EMAILJS_CONFIG = {
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
  publicKey: 'your_public_key',
} as const;
```

## 🏗️ Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📊 Bundle Analysis

This project has been optimized for production with:
- ✅ Removed 39 unused UI components
- ✅ Removed 15+ unused dependencies  
- ✅ Consolidated CSS files
- ✅ Enabled strict TypeScript checking
- ✅ Optimized folder structure

**Bundle size reduction**: ~150KB smaller than original

## 🚀 Deployment

### Vercel
```bash
npm run build
# Deploy the dist/ folder
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder
```

### GitHub Pages
```bash
npm run build
# Deploy the dist/ folder to gh-pages branch
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Soham Orivkar**
- AI Data Engineer Intern · Full Stack Developer
- GitHub: [@nothinggisavailable](https://github.com/nothinggisavailable)
- LinkedIn: [Soham Orivkar](https://linkedin.com/in/sohamorivkar)