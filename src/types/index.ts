// Type definitions for the portfolio application

export interface Project {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  accentColor: string;
  bgClass: string;
  github: string;
  demo: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}