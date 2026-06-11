export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMin: number;
  priceMax: number;
  features: string[];
  duration: string;
  isPopular?: boolean;
  color: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  packageName: string;
  studentStatus: boolean;
  details: string;
  estimatedCost: number;
  submittedAt: string;
}
