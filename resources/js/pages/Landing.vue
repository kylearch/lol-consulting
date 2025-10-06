<script setup lang="ts">
import { ref, computed } from 'vue';
import { router, useForm, usePage } from '@inertiajs/vue3';

const page = usePage();
const flashMessage = computed(() => page.props.flash as { success?: string; error?: string });

// Sub-apps configuration (hardcoded as requested)
const subApps = [
  {
    name: 'privates.lol',
    description: 'A secrets manager built specifically for developers and teams. Secure, simple, and designed with developer workflows in mind.',
    features: [
      'Developer-friendly interface',
      'Team collaboration',
      'Enterprise security'
    ],
    url: 'https://privates.lol',
    previewUrl: '/preview/privates',
    status: 'Live'
  },
  {
    name: 'brandr.lol',
    description: 'A brand content manager for solo founders. Store, organize, and adapt your brand materials for different formats and audiences.',
    features: [
      'Content library management',
      'Multi-format adaptation',
      'Solo founder focused'
    ],
    url: 'https://brandr.lol',
    previewUrl: '/preview/brandr',
    status: 'Live'
  },
  {
    name: 'therapy.lol',
    description: 'Mental wellness platform for developers and tech professionals.',
    features: [
      'Wellness tracking',
      'Professional support',
      'Developer-focused'
    ],
    url: '#',
    previewUrl: '/preview/therapy',
    status: 'Preview'
  },
  {
    name: 'todos.lol',
    description: 'Simple, beautiful todo management for focused work.',
    features: [
      'Clean interface',
      'Task organization',
      'Productivity focused'
    ],
    url: '#',
    previewUrl: '/preview/todos',
    status: 'Preview'
  }
];

const services = [
  {
    title: 'MVP Development',
    description: 'Build and launch your micro-saas MVP with core features to validate your idea in the market.',
    timeline: '3-6 months',
    range: '$50k-150k'
  },
  {
    title: 'Micro-SaaS Consulting',
    description: 'Strategic guidance on product planning, market validation, and technical architecture decisions.',
    timeline: '2-4 weeks',
    range: '$5k-15k'
  },
  {
    title: 'Technical Architecture',
    description: 'Database design, API development, and scalable system architecture for your SaaS platform.',
    timeline: '4-8 weeks',
    range: '$15k-30k'
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered design specifically crafted for SaaS products and developer tools.',
    timeline: '4-6 weeks',
    range: '$10k-25k'
  },
  {
    title: 'Full-Stack Development',
    description: 'Complete frontend and backend development with deployment and CI/CD pipeline setup.',
    timeline: '8-16 weeks',
    range: '$40k-100k'
  }
];

const pricingTiers = [
  {
    title: 'Micro MVP',
    price: '$25k-50k',
    timeline: '2-4 months',
    description: 'Perfect for validating your micro-saas idea with core features and basic functionality.',
    features: [
      'Basic micro-saas MVP',
      'Core features only',
      'User authentication',
      'Basic dashboard',
      'Database setup',
      '3 months support'
    ],
    featured: false
  },
  {
    title: 'Full Platform',
    price: '$50k-100k',
    timeline: '4-6 months',
    description: 'Complete SaaS platform with advanced features, integrations, and scalable architecture.',
    features: [
      'Complete SaaS platform',
      'Advanced features',
      'Third-party integrations',
      'Scalable architecture',
      'Admin dashboard',
      '6 months support'
    ],
    featured: true
  },
  {
    title: 'Enterprise Ready',
    price: '$100k+',
    timeline: '6+ months',
    description: 'Enterprise-grade platform with custom requirements and white-glove service throughout.',
    features: [
      'Enterprise-grade platform',
      'Custom requirements',
      'Advanced security',
      'Multi-tenant architecture',
      'Analytics & reporting',
      '12 months support'
    ],
    featured: false
  }
];

const form = useForm({
  name: '',
  email: '',
  projectType: '',
  budget: '',
  description: ''
});

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = 80;
    const targetPosition = element.offsetTop - navHeight - 20;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

const submitContactForm = () => {
  form.post('/contact', {
    preserveScroll: true,
    onSuccess: () => {
      form.reset();
    },
  });
};
</script>

<template>
  <div class="landing-page">
    <!-- Navigation -->
    <nav class="lol-nav">
      <div class="lol-container">
        <div class="lol-nav__content">
          <div class="lol-nav__brand">
            <span class="lol-brand-name">lol.consulting</span>
          </div>
          <div class="lol-nav__links">
            <a href="#products" @click.prevent="scrollToSection('products')" class="lol-nav__link">Products</a>
            <a href="#services" @click.prevent="scrollToSection('services')" class="lol-nav__link">Services</a>
            <a href="#process" @click.prevent="scrollToSection('process')" class="lol-nav__link">Process</a>
            <a href="#pricing" @click.prevent="scrollToSection('pricing')" class="lol-nav__link">Pricing</a>
            <a href="#contact" @click.prevent="scrollToSection('contact')" class="lol-nav__link">Contact</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="lol-hero">
      <div class="lol-container">
        <div class="lol-hero__content">
          <h1 class="lol-hero__title">Building Micro-SaaS Tools for Solo Founders</h1>
          <p class="lol-hero__subtitle">
            We build and manage a suite of micro-saas platforms while offering custom development services to help other founders launch their ideas.
          </p>
          <div class="lol-hero__actions">
            <button @click="scrollToSection('products')" class="lol-btn lol-btn--primary lol-btn--lg">View Our Products</button>
            <button @click="scrollToSection('contact')" class="lol-btn lol-btn--outline lol-btn--lg">Get Custom Development</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Showcase -->
    <section id="products" class="lol-products">
      <div class="lol-container">
        <div class="lol-section__header">
          <h2 class="lol-section__title">Our Products</h2>
          <p class="lol-section__description">We've built and launched our own micro-saas platforms, proving our ability to deliver results.</p>
        </div>
        <div class="lol-products__grid">
          <div v-for="app in subApps" :key="app.name" class="lol-product-card">
            <div class="lol-product-card__header">
              <h3 class="lol-product-card__title">{{ app.name }}</h3>
              <div :class="['lol-status', app.status === 'Live' ? 'lol-status--success' : 'lol-status--info']">
                {{ app.status }}
              </div>
            </div>
            <p class="lol-product-card__description">{{ app.description }}</p>
            <ul class="lol-product-card__features">
              <li v-for="feature in app.features" :key="feature">{{ feature }}</li>
            </ul>
            <div class="lol-product-card__actions">
              <a :href="app.previewUrl" target="_blank" class="lol-btn lol-btn--outline lol-btn--full-width">
                Preview
              </a>
              <a v-if="app.url !== '#'" :href="app.url" target="_blank" rel="noopener noreferrer" class="lol-btn lol-btn--primary lol-btn--full-width">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="lol-services">
      <div class="lol-container">
        <div class="lol-section__header">
          <h2 class="lol-section__title">Custom Micro-SaaS Development</h2>
          <p class="lol-section__description">We build custom micro-saas solutions for other founders who want to launch their ideas with technical excellence.</p>
        </div>
        <div class="lol-services__grid">
          <div v-for="service in services" :key="service.title" class="lol-service-card">
            <h3 class="lol-service-card__title">{{ service.title }}</h3>
            <p class="lol-service-card__description">{{ service.description }}</p>
            <div class="lol-service-card__meta">
              <span class="lol-service-meta">Timeline: {{ service.timeline }}</span>
              <span class="lol-service-meta">Range: {{ service.range }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section id="process" class="lol-process">
      <div class="lol-container">
        <div class="lol-section__header">
          <h2 class="lol-section__title">How We Work</h2>
          <p class="lol-section__description">Our proven 4-step process ensures your project is delivered on time and exceeds expectations.</p>
        </div>
        <div class="lol-process__steps">
          <div class="lol-process-step">
            <div class="lol-process-step__number">1</div>
            <div class="lol-process-step__content">
              <h3 class="lol-process-step__title">Discovery & Strategy</h3>
              <p class="lol-process-step__description">Understanding your vision, market needs, and technical requirements through detailed consultation.</p>
            </div>
          </div>
          <div class="lol-process-step">
            <div class="lol-process-step__number">2</div>
            <div class="lol-process-step__content">
              <h3 class="lol-process-step__title">Design & Planning</h3>
              <p class="lol-process-step__description">UI/UX design creation and comprehensive technical architecture planning with regular feedback loops.</p>
            </div>
          </div>
          <div class="lol-process-step">
            <div class="lol-process-step__number">3</div>
            <div class="lol-process-step__content">
              <h3 class="lol-process-step__title">Development & Testing</h3>
              <p class="lol-process-step__description">Full-stack development with regular progress updates, testing, and iterative improvements.</p>
            </div>
          </div>
          <div class="lol-process-step">
            <div class="lol-process-step__number">4</div>
            <div class="lol-process-step__content">
              <h3 class="lol-process-step__title">Launch & Support</h3>
              <p class="lol-process-step__description">Production deployment, monitoring setup, and ongoing maintenance and support options.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="lol-pricing">
      <div class="lol-container">
        <div class="lol-section__header">
          <h2 class="lol-section__title">Pricing Tiers</h2>
          <p class="lol-section__description">Choose the package that fits your project scope and budget. All pricing is starting from and depends on final project requirements.</p>
        </div>
        <div class="lol-pricing__grid">
          <div v-for="tier in pricingTiers" :key="tier.title" :class="['lol-pricing-card', { 'lol-pricing-card--featured': tier.featured }]">
            <div v-if="tier.featured" class="lol-pricing-card__badge">Most Popular</div>
            <div class="lol-pricing-card__header">
              <h3 class="lol-pricing-card__title">{{ tier.title }}</h3>
              <div class="lol-pricing-card__price">{{ tier.price }}</div>
              <div class="lol-pricing-card__timeline">{{ tier.timeline }}</div>
            </div>
            <p class="lol-pricing-card__description">{{ tier.description }}</p>
            <ul class="lol-pricing-card__features">
              <li v-for="feature in tier.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="lol-contact">
      <div class="lol-container">
        <div class="lol-section__header">
          <h2 class="lol-section__title">Get In Touch</h2>
          <p class="lol-section__description">Ready to build your micro-saas? Let's discuss your project and see how we can help.</p>
        </div>
        <div class="lol-contact__content">
          <div class="lol-contact__info">
            <h3>Let's Start a Conversation</h3>
            <p>We respond to all inquiries within 24 hours. Share your project details and we'll get back to you with next steps.</p>
            <div class="lol-contact__direct">
              <strong>Direct Email:</strong> <a href="mailto:hello@lol.consulting" class="lol-contact__email">hello@lol.consulting</a>
            </div>
          </div>
          <form @submit.prevent="submitContactForm" class="lol-contact-form">
            <!-- Flash Messages -->
            <div v-if="flashMessage?.success" class="lol-alert lol-alert--success">
              {{ flashMessage.success }}
            </div>
            <div v-if="flashMessage?.error" class="lol-alert lol-alert--error">
              {{ flashMessage.error }}
            </div>

            <div class="lol-form-group">
              <label for="name" class="lol-form-label">Name</label>
              <input v-model="form.name" type="text" id="name" class="lol-form-control" required>
              <div v-if="form.errors.name" class="lol-form-error">{{ form.errors.name }}</div>
            </div>
            <div class="lol-form-group">
              <label for="email" class="lol-form-label">Email</label>
              <input v-model="form.email" type="email" id="email" class="lol-form-control" required>
              <div v-if="form.errors.email" class="lol-form-error">{{ form.errors.email }}</div>
            </div>
            <div class="lol-form-group">
              <label for="projectType" class="lol-form-label">Project Type</label>
              <select v-model="form.projectType" id="projectType" class="lol-form-control">
                <option value="">Select project type</option>
                <option value="mvp">MVP Development</option>
                <option value="consulting">Micro-SaaS Consulting</option>
                <option value="architecture">Technical Architecture</option>
                <option value="design">UI/UX Design</option>
                <option value="fullstack">Full-Stack Development</option>
                <option value="other">Other</option>
              </select>
              <div v-if="form.errors.projectType" class="lol-form-error">{{ form.errors.projectType }}</div>
            </div>
            <div class="lol-form-group">
              <label for="budget" class="lol-form-label">Budget Range</label>
              <select v-model="form.budget" id="budget" class="lol-form-control">
                <option value="">Select budget range</option>
                <option value="under-25k">Under $25k</option>
                <option value="25k-50k">$25k - $50k</option>
                <option value="50k-100k">$50k - $100k</option>
                <option value="100k-plus">$100k+</option>
              </select>
              <div v-if="form.errors.budget" class="lol-form-error">{{ form.errors.budget }}</div>
            </div>
            <div class="lol-form-group">
              <label for="description" class="lol-form-label">Project Description</label>
              <textarea v-model="form.description" id="description" class="lol-form-control" rows="4" placeholder="Tell us about your project idea, goals, and any specific requirements..."></textarea>
              <div v-if="form.errors.description" class="lol-form-error">{{ form.errors.description }}</div>
            </div>
            <button type="submit" class="lol-btn lol-btn--primary lol-btn--full-width lol-btn--lg" :disabled="form.processing">
              {{ form.processing ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="lol-footer">
      <div class="lol-container">
        <div class="lol-footer__content">
          <div class="lol-footer__brand">
            <div class="lol-brand-name">lol.consulting</div>
            <p>Building micro-saas tools for solo founders</p>
          </div>
          <div class="lol-footer__links">
            <div class="lol-footer__section">
              <h4>Products</h4>
              <ul>
                <li v-for="app in subApps" :key="app.name">
                  <a :href="app.url" target="_blank" rel="noopener noreferrer">{{ app.name }}</a>
                </li>
              </ul>
            </div>
            <div class="lol-footer__section">
              <h4>Services</h4>
              <ul>
                <li><a href="#services" @click.prevent="scrollToSection('services')">MVP Development</a></li>
                <li><a href="#services" @click.prevent="scrollToSection('services')">Consulting</a></li>
                <li><a href="#services" @click.prevent="scrollToSection('services')">Full-Stack Development</a></li>
              </ul>
            </div>
            <div class="lol-footer__section">
              <h4>Company</h4>
              <ul>
                <li><a href="#process" @click.prevent="scrollToSection('process')">Process</a></li>
                <li><a href="#contact" @click.prevent="scrollToSection('contact')">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="lol-footer__bottom">
          <p>&copy; 2025 lol.consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Landing page specific styles using the design system */
.landing-page {
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-family-base);
  min-height: 100vh;
}

/* Navigation */
.lol-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.lol-nav__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-16) 0;
}

.lol-brand-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.lol-nav__links {
  display: flex;
  gap: var(--space-24);
}

.lol-nav__link {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-standard);
  cursor: pointer;
}

.lol-nav__link:hover {
  color: var(--color-primary);
}

/* Container */
.lol-container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--space-16);
  padding-left: var(--space-16);
  max-width: var(--container-xl);
}

/* Hero */
.lol-hero {
  padding: calc(80px + var(--space-32)) 0 var(--space-32) 0;
  background: var(--color-bg-1);
  text-align: center;
}

.lol-hero__content {
  max-width: 800px;
  margin: 0 auto;
}

.lol-hero__title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--space-20);
  line-height: var(--line-height-tight);
}

.lol-hero__subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-32);
  line-height: var(--line-height-normal);
}

.lol-hero__actions {
  display: flex;
  gap: var(--space-16);
  justify-content: center;
  flex-wrap: wrap;
}

/* Sections */
.lol-section__header {
  text-align: center;
  margin-bottom: var(--space-32);
}

.lol-section__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--space-12);
}

.lol-section__description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-normal);
}

/* Products */
.lol-products {
  padding: var(--space-32) 0;
  background: var(--color-background);
}

.lol-products__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-24);
}

.lol-product-card {
  background: var(--color-surface);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  padding: var(--space-24);
  transition: transform var(--duration-normal) var(--ease-standard), box-shadow var(--duration-normal) var(--ease-standard);
}

.lol-product-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.lol-product-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-16);
}

.lol-product-card__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.lol-product-card__description {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-20);
  line-height: var(--line-height-normal);
}

.lol-product-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-24) 0;
}

.lol-product-card__features li {
  padding: var(--space-8) 0;
  position: relative;
  padding-left: var(--space-20);
  color: var(--color-text-secondary);
}

.lol-product-card__features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: var(--space-8);
  color: var(--color-success);
  font-weight: var(--font-weight-bold);
}

.lol-product-card__actions {
  display: flex;
  gap: var(--space-12);
  flex-direction: column;
}

/* Services */
.lol-services {
  padding: var(--space-32) 0;
  background: var(--color-bg-2);
}

.lol-services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-20);
}

.lol-service-card {
  background: var(--color-surface);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  padding: var(--space-20);
  transition: transform var(--duration-normal) var(--ease-standard);
}

.lol-service-card:hover {
  transform: translateY(-1px);
}

.lol-service-card__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-12);
}

.lol-service-card__description {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-16);
  line-height: var(--line-height-normal);
}

.lol-service-card__meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.lol-service-meta {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

/* Process */
.lol-process {
  padding: var(--space-32) 0;
  background: var(--color-background);
}

.lol-process__steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-24);
}

.lol-process-step {
  display: flex;
  align-items: flex-start;
  gap: var(--space-16);
}

.lol-process-step__number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: var(--color-primary);
  color: var(--color-btn-primary-text);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
}

.lol-process-step__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-8);
}

.lol-process-step__description {
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

/* Pricing */
.lol-pricing {
  padding: var(--space-32) 0;
  background: var(--color-background);
}

.lol-pricing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-24);
}

.lol-pricing-card {
  background: var(--color-surface);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  padding: var(--space-24);
  position: relative;
  transition: transform var(--duration-normal) var(--ease-standard), box-shadow var(--duration-normal) var(--ease-standard);
}

.lol-pricing-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.lol-pricing-card--featured {
  border-color: var(--color-primary);
  transform: scale(1.02);
}

.lol-pricing-card--featured:hover {
  transform: scale(1.02) translateY(-2px);
}

.lol-pricing-card__badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-primary);
  color: var(--color-btn-primary-text);
  padding: var(--space-4) var(--space-12);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.lol-pricing-card__header {
  text-align: center;
  margin-bottom: var(--space-20);
}

.lol-pricing-card__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--space-8);
}

.lol-pricing-card__price {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--space-4);
}

.lol-pricing-card__timeline {
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
}

.lol-pricing-card__description {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-20);
  line-height: var(--line-height-normal);
}

.lol-pricing-card__features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lol-pricing-card__features li {
  padding: var(--space-8) 0;
  position: relative;
  padding-left: var(--space-20);
  color: var(--color-text-secondary);
}

.lol-pricing-card__features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: var(--space-8);
  color: var(--color-success);
  font-weight: var(--font-weight-bold);
}

/* Contact */
.lol-contact {
  padding: var(--space-32) 0;
  background: var(--color-bg-4);
}

.lol-contact__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-32);
  align-items: start;
}

.lol-contact__info h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-16);
}

.lol-contact__info p {
  color: var(--color-text-secondary);
  margin-bottom: var(--space-20);
  line-height: var(--line-height-normal);
}

.lol-contact__direct {
  padding: var(--space-16);
  background: var(--color-surface);
  border-radius: var(--radius-base);
  border: 1px solid var(--color-card-border);
}

.lol-contact__email {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color var(--duration-fast) var(--ease-standard);
}

.lol-contact__email:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

.lol-contact-form {
  background: var(--color-surface);
  padding: var(--space-24);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-card-border);
}

/* Forms */
.lol-form-group {
  margin-bottom: var(--space-16);
}

.lol-form-label {
  display: block;
  margin-bottom: var(--space-8);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  color: var(--color-text);
}

.lol-form-control {
  display: block;
  width: 100%;
  padding: var(--space-8) var(--space-12);
  font-size: var(--font-size-md);
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  transition: border-color var(--duration-fast) var(--ease-standard),
    box-shadow var(--duration-fast) var(--ease-standard);
  font-family: var(--font-family-base);
}

.lol-form-control:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: var(--focus-ring);
}

/* Buttons */
.lol-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) var(--space-16);
  border-radius: var(--radius-base);
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-standard);
  border: none;
  text-decoration: none;
}

.lol-btn--primary {
  background: var(--color-primary);
  color: var(--color-btn-primary-text);
}

.lol-btn--primary:hover {
  background: var(--color-primary-hover);
}

.lol-btn--primary:active {
  background: var(--color-primary-active);
}

.lol-btn--outline {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.lol-btn--outline:hover {
  background: var(--color-secondary);
}

.lol-btn--lg {
  padding: var(--space-10) var(--space-20);
  font-size: var(--font-size-lg);
  border-radius: var(--radius-md);
}

.lol-btn--full-width {
  width: 100%;
}

.lol-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Status */
.lol-status {
  display: inline-flex;
  align-items: center;
  padding: var(--space-6) var(--space-12);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

.lol-status--success {
  background-color: rgba(var(--color-success-rgb), var(--status-bg-opacity));
  color: var(--color-success);
  border: 1px solid rgba(var(--color-success-rgb), var(--status-border-opacity));
}

.lol-status--info {
  background-color: rgba(var(--color-info-rgb), var(--status-bg-opacity));
  color: var(--color-info);
  border: 1px solid rgba(var(--color-info-rgb), var(--status-border-opacity));
}

/* Footer */
.lol-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: var(--space-32) 0 var(--space-16) 0;
}

.lol-footer__content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-32);
  margin-bottom: var(--space-24);
}

.lol-footer__brand p {
  color: var(--color-text-secondary);
}

.lol-footer__links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-20);
}

.lol-footer__section h4 {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: var(--space-12);
}

.lol-footer__section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lol-footer__section ul li {
  margin-bottom: var(--space-8);
}

.lol-footer__section ul li a {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color var(--duration-fast) var(--ease-standard);
  cursor: pointer;
}

.lol-footer__section ul li a:hover {
  color: var(--color-primary);
}

.lol-footer__bottom {
  text-align: center;
  padding-top: var(--space-16);
  border-top: 1px solid var(--color-border);
}

.lol-footer__bottom p {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
}

/* Alerts */
.lol-alert {
  padding: var(--space-16);
  border-radius: var(--radius-base);
  margin-bottom: var(--space-16);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
}

.lol-alert--success {
  background: rgba(var(--color-success-rgb), 0.1);
  color: var(--color-success);
  border: 1px solid var(--color-success);
}

.lol-alert--error {
  background: rgba(var(--color-error-rgb), 0.1);
  color: var(--color-error);
  border: 1px solid var(--color-error);
}

/* Form Errors */
.lol-form-error {
  color: var(--color-error);
  font-size: var(--font-size-xs);
  margin-top: var(--space-4);
  font-weight: var(--font-weight-medium);
}

/* Responsive */
@media (max-width: 768px) {
  .lol-nav__links {
    display: none;
  }

  .lol-hero__title {
    font-size: var(--font-size-3xl);
  }

  .lol-hero__subtitle {
    font-size: var(--font-size-lg);
  }

  .lol-hero__actions {
    flex-direction: column;
  }

  .lol-products__grid {
    grid-template-columns: 1fr;
  }

  .lol-contact__content {
    grid-template-columns: 1fr;
  }

  .lol-footer__content {
    grid-template-columns: 1fr;
  }

  .lol-footer__links {
    grid-template-columns: 1fr;
  }

  .lol-pricing-card--featured {
    transform: none;
  }
}
</style>
