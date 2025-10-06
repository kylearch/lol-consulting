// BrandForge Application JavaScript

// Application Data
let appData = {
  brandFoundation: {
    name: "EcoFlow Packaging",
    tagline: "Sustainable solutions for modern brands",
    description: "We create innovative, eco-friendly packaging solutions that help brands reduce their environmental impact while maintaining product quality and customer satisfaction.",
    industry: "Sustainable Packaging",
    tone: "professional",
    targetAudience: "D2C brands and product companies"
  },
  contentLibrary: [
    {
      id: 1,
      type: "tagline",
      title: "Short Tagline",
      content: "Sustainable packaging, delivered.",
      purpose: "Social media bio",
      length: "29 characters",
      createdDate: "2024-10-01"
    },
    {
      id: 2,
      type: "description",
      title: "Elevator Pitch",
      content: "EcoFlow transforms how brands package their products. Our innovative, biodegradable solutions reduce environmental impact by 80% while maintaining product integrity. We've helped over 200 D2C companies make the switch to sustainable packaging.",
      purpose: "Investor meetings",
      length: "2 sentences, 280 characters",
      createdDate: "2024-10-02"
    },
    {
      id: 3,
      type: "social",
      title: "LinkedIn Post",
      content: "🌱 Excited to announce our new partnership with three sustainable D2C brands this month! Every package matters when it comes to our planet's future. Ready to make the switch? Let's talk sustainable packaging solutions. #Sustainability #EcoPackaging #GreenBusiness",
      purpose: "LinkedIn engagement",
      length: "LinkedIn post format",
      createdDate: "2024-10-03"
    }
  ],
  templates: [
    {
      id: 1,
      name: "Social Media Announcement",
      category: "Social Media",
      description: "Template for announcing partnerships or milestones",
      usage: 5
    },
    {
      id: 2,
      name: "Product Description",
      category: "E-commerce",
      description: "Standard format for describing packaging solutions",
      usage: 12
    }
  ],
  stats: {
    brandAssets: 24,
    generatedContent: 47,
    activeTemplates: 8,
    monthlyGeneration: 15
  },
  recentActivity: [
    {
      icon: "✨",
      title: "Generated LinkedIn post about sustainability",
      meta: "2 hours ago"
    },
    {
      icon: "💾",
      title: "Saved new tagline variation to library",
      meta: "4 hours ago"
    },
    {
      icon: "📋",
      title: "Created 'Partnership Announcement' template",
      meta: "1 day ago"
    },
    {
      icon: "🎯",
      title: "Updated brand foundation details",
      meta: "2 days ago"
    }
  ]
};

// Content generation templates for mock AI
const generationTemplates = {
  "Social Media Post": [
    "🌱 Exciting news from {brandName}! {context} Our commitment to {industry} continues to drive innovation. {hashtags}",
    "Did you know? {brandName} {achievement}. {callToAction} #Sustainability #Innovation",
    "Behind the scenes at {brandName}: {insight} This is why we're passionate about {industry}. {engagement}"
  ],
  "Email Subject Line": [
    "{brandName}: {urgency} - {benefit}",
    "Transform your {category} with {brandName}",
    "{achievement} - See how {brandName} is changing {industry}"
  ],
  "Product Description": [
    "{brandName} introduces {product}: {mainBenefit}. Our {industry} expertise ensures {qualityPromise}. Perfect for {targetAudience}.",
    "Discover {product} by {brandName}. {uniqueValue} designed specifically for {targetAudience}. {callToAction}."
  ],
  "VC Pitch Tagline": [
    "{brandName}: {vision} for {industry}",
    "Revolutionizing {industry} through {innovation}",
    "{impactMetric} improvement in {category} - {brandName}"
  ]
};

// DOM Elements
const sidebarLinks = document.querySelectorAll('.sidebar__link');
const sections = document.querySelectorAll('.section');
const brandFoundationForm = document.getElementById('brand-foundation-form');
const contentGeneratorForm = document.getElementById('content-generator-form');
const modal = document.getElementById('edit-modal');
const modalClose = document.getElementById('modal-close');
const modalCancel = document.getElementById('modal-cancel');
const modalSave = document.getElementById('modal-save');

// Current editing content
let currentEditingContent = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeStats();
  initializeRecentActivity();
  initializeBrandFoundation();
  initializeContentLibrary();
  initializeTemplates();
  initializeContentGenerator();
  initializeModal();
  initializeQuickActions();
});

// Navigation System
function initializeNavigation() {
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('data-section');
      
      // Update active link
      sidebarLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // Show target section
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetSection) {
          section.classList.add('active');
        }
      });
    });
  });
}

// Initialize Dashboard Stats
function initializeStats() {
  document.getElementById('brand-assets').textContent = appData.stats.brandAssets;
  document.getElementById('generated-content').textContent = appData.stats.generatedContent;
  document.getElementById('active-templates').textContent = appData.stats.activeTemplates;
  document.getElementById('monthly-generation').textContent = appData.stats.monthlyGeneration;
}

// Initialize Recent Activity
function initializeRecentActivity() {
  const activityList = document.getElementById('activity-list');
  activityList.innerHTML = '';
  
  appData.recentActivity.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
      <div class="activity-item__icon">${activity.icon}</div>
      <div class="activity-item__content">
        <p class="activity-item__title">${activity.title}</p>
        <p class="activity-item__meta">${activity.meta}</p>
      </div>
    `;
    activityList.appendChild(activityItem);
  });
}

// Brand Foundation Management
function initializeBrandFoundation() {
  const form = brandFoundationForm;
  const previewName = document.getElementById('preview-name');
  const previewTagline = document.getElementById('preview-tagline');
  const previewDescription = document.getElementById('preview-description');
  
  // Update preview in real-time
  function updatePreview() {
    const formData = new FormData(form);
    previewName.textContent = document.getElementById('brand-name').value || 'Your Brand Name';
    previewTagline.textContent = document.getElementById('brand-tagline').value || 'Your tagline here';
    previewDescription.textContent = (document.getElementById('brand-description').value || 'Your brand description...').substring(0, 100) + '...';
  }
  
  // Add event listeners for real-time preview
  form.addEventListener('input', updatePreview);
  
  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Update app data
    appData.brandFoundation = {
      name: document.getElementById('brand-name').value,
      tagline: document.getElementById('brand-tagline').value,
      description: document.getElementById('brand-description').value,
      industry: document.getElementById('brand-industry').value,
      tone: document.getElementById('brand-tone').value,
      targetAudience: document.getElementById('target-audience').value
    };
    
    // Show success message
    showSuccessMessage('Brand foundation updated successfully!');
    
    // Add to recent activity
    addRecentActivity('🎯', 'Updated brand foundation details', 'Just now');
  });
}

// Content Library Management
function initializeContentLibrary() {
  renderContentLibrary();
  initializeLibraryFilters();
}

function renderContentLibrary(filteredContent = null) {
  const contentGrid = document.getElementById('content-grid');
  const content = filteredContent || appData.contentLibrary;
  
  contentGrid.innerHTML = '';
  
  content.forEach(item => {
    const contentItem = document.createElement('div');
    contentItem.className = 'content-item';
    contentItem.innerHTML = `
      <div class="content-item__header">
        <span class="content-item__type">${item.type}</span>
        <div class="content-item__actions">
          <button class="content-item__action" onclick="editContent(${item.id})" title="Edit">✏️</button>
          <button class="content-item__action" onclick="duplicateContent(${item.id})" title="Duplicate">📋</button>
          <button class="content-item__action" onclick="deleteContent(${item.id})" title="Delete">🗑️</button>
        </div>
      </div>
      <h4 class="content-item__title">${item.title}</h4>
      <p class="content-item__content">${item.content.substring(0, 150)}${item.content.length > 150 ? '...' : ''}</p>
      <div class="content-item__meta">
        <span>${item.purpose}</span>
        <span>${item.createdDate}</span>
      </div>
    `;
    contentGrid.appendChild(contentItem);
  });
}

function initializeLibraryFilters() {
  const searchInput = document.getElementById('library-search');
  const typeFilter = document.getElementById('content-type-filter');
  const purposeFilter = document.getElementById('purpose-filter');
  
  function applyFilters() {
    let filtered = appData.contentLibrary;
    
    // Apply search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm) ||
        item.purpose.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply type filter
    const selectedType = typeFilter.value;
    if (selectedType) {
      filtered = filtered.filter(item => item.type === selectedType);
    }
    
    // Apply purpose filter
    const selectedPurpose = purposeFilter.value;
    if (selectedPurpose) {
      filtered = filtered.filter(item => item.purpose.includes(selectedPurpose));
    }
    
    renderContentLibrary(filtered);
  }
  
  searchInput.addEventListener('input', applyFilters);
  typeFilter.addEventListener('change', applyFilters);
  purposeFilter.addEventListener('change', applyFilters);
}

// Content Generation
function initializeContentGenerator() {
  const form = contentGeneratorForm;
  const generateBtn = document.getElementById('generate-btn');
  const btnText = generateBtn.querySelector('.btn-text');
  const btnLoading = generateBtn.querySelector('.btn-loading');
  const outputArea = document.getElementById('output-area');
  const outputActions = document.getElementById('output-actions');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    generateContent();
  });
  
  async function generateContent() {
    const contentType = document.getElementById('content-type').value;
    const purpose = document.getElementById('content-purpose').value;
    const length = document.getElementById('content-length').value;
    const context = document.getElementById('additional-context').value;
    
    if (!contentType || !purpose) {
      alert('Please select both content type and purpose.');
      return;
    }
    
    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    generateBtn.disabled = true;
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    // Generate content using templates
    const generatedContent = generateMockContent(contentType, purpose, length, context);
    
    // Display generated content
    outputArea.innerHTML = `<div class="generated-content">${generatedContent}</div>`;
    outputActions.classList.remove('hidden');
    
    // Reset button state
    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
    generateBtn.disabled = false;
    
    // Initialize output actions
    initializeOutputActions(generatedContent, contentType, purpose, length);
  }
}

function generateMockContent(type, purpose, length, context) {
  const templates = generationTemplates[type] || ["Generated content for {brandName}"];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  let content = template
    .replace(/{brandName}/g, appData.brandFoundation.name)
    .replace(/{industry}/g, appData.brandFoundation.industry)
    .replace(/{context}/g, context || 'our latest innovation')
    .replace(/{hashtags}/g, '#Innovation #Sustainability #EcoFriendly')
    .replace(/{achievement}/g, 'has helped over 200 companies reduce their environmental impact')
    .replace(/{callToAction}/g, 'Ready to make the switch?')
    .replace(/{engagement}/g, 'What sustainable practices does your company follow?')
    .replace(/{urgency}/g, 'Limited Time Offer')
    .replace(/{benefit}/g, 'Reduce Your Environmental Impact by 80%')
    .replace(/{category}/g, 'packaging solutions')
    .replace(/{product}/g, 'our latest eco-friendly packaging line')
    .replace(/{mainBenefit}/g, 'revolutionary biodegradable materials that maintain product integrity')
    .replace(/{qualityPromise}/g, 'durability without compromise')
    .replace(/{targetAudience}/g, appData.brandFoundation.targetAudience)
    .replace(/{uniqueValue}/g, 'Innovative, sustainable packaging solutions')
    .replace(/{vision}/g, 'Transforming sustainable packaging')
    .replace(/{innovation}/g, 'cutting-edge biodegradable technology')
    .replace(/{impactMetric}/g, '80%')
    .replace(/{insight}/g, 'Every decision we make considers environmental impact first');
  
  // Apply length constraints if specified
  if (length && length.toLowerCase().includes('character')) {
    const maxChars = parseInt(length.match(/\d+/)?.[0]) || 200;
    if (content.length > maxChars) {
      content = content.substring(0, maxChars - 3) + '...';
    }
  }
  
  return content;
}

function initializeOutputActions(content, type, purpose, length) {
  const regenerateBtn = document.getElementById('regenerate-btn');
  const editBtn = document.getElementById('edit-btn');
  const saveBtn = document.getElementById('save-btn');
  
  // Remove existing listeners
  regenerateBtn.replaceWith(regenerateBtn.cloneNode(true));
  editBtn.replaceWith(editBtn.cloneNode(true));
  saveBtn.replaceWith(saveBtn.cloneNode(true));
  
  // Get new references
  const newRegenerateBtn = document.getElementById('regenerate-btn');
  const newEditBtn = document.getElementById('edit-btn');
  const newSaveBtn = document.getElementById('save-btn');
  
  newRegenerateBtn.addEventListener('click', () => {
    document.getElementById('content-generator-form').dispatchEvent(new Event('submit'));
  });
  
  newEditBtn.addEventListener('click', () => {
    openEditModal({
      title: `Generated ${type}`,
      content: content,
      purpose: purpose,
      type: type.toLowerCase().replace(' ', ''),
      isNew: true
    });
  });
  
  newSaveBtn.addEventListener('click', () => {
    saveGeneratedContent(content, type, purpose, length);
  });
}

function saveGeneratedContent(content, type, purpose, length) {
  const newContent = {
    id: Date.now(),
    type: type.toLowerCase().replace(' ', ''),
    title: `Generated ${type}`,
    content: content,
    purpose: purpose,
    length: length || 'Auto-generated',
    createdDate: new Date().toISOString().split('T')[0]
  };
  
  appData.contentLibrary.unshift(newContent);
  appData.stats.generatedContent++;
  
  // Update stats display
  document.getElementById('generated-content').textContent = appData.stats.generatedContent;
  
  // Refresh content library if currently viewing
  const currentSection = document.querySelector('.section.active');
  if (currentSection && currentSection.id === 'library') {
    renderContentLibrary();
  }
  
  // Add to recent activity
  addRecentActivity('💾', `Saved new ${type.toLowerCase()} to library`, 'Just now');
  
  // Show success message
  showSuccessMessage('Content saved to library!');
}

// Templates Management
function initializeTemplates() {
  renderTemplates();
}

function renderTemplates() {
  const templatesGrid = document.getElementById('templates-grid');
  templatesGrid.innerHTML = '';
  
  appData.templates.forEach(template => {
    const templateCard = document.createElement('div');
    templateCard.className = 'template-card card';
    templateCard.innerHTML = `
      <div class="card__body">
        <div class="template-card__header">
          <span class="template-card__category">${template.category}</span>
          <span class="template-card__usage">${template.usage} uses</span>
        </div>
        <h4 class="template-card__title">${template.name}</h4>
        <p class="template-card__description">${template.description}</p>
        <div class="template-card__actions">
          <button class="btn btn--outline btn--sm">Use Template</button>
          <button class="btn btn--secondary btn--sm">Edit</button>
        </div>
      </div>
    `;
    templatesGrid.appendChild(templateCard);
  });
}

// Modal Management
function initializeModal() {
  modalClose.addEventListener('click', closeModal);
  modalCancel.addEventListener('click', closeModal);
  modal.querySelector('.modal__backdrop').addEventListener('click', closeModal);
  modalSave.addEventListener('click', saveEditedContent);
}

function openEditModal(contentData) {
  currentEditingContent = contentData;
  
  document.getElementById('edit-title').value = contentData.title;
  document.getElementById('edit-content').value = contentData.content;
  document.getElementById('edit-purpose').value = contentData.purpose;
  
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  currentEditingContent = null;
}

function saveEditedContent() {
  if (!currentEditingContent) return;
  
  const updatedContent = {
    ...currentEditingContent,
    title: document.getElementById('edit-title').value,
    content: document.getElementById('edit-content').value,
    purpose: document.getElementById('edit-purpose').value
  };
  
  if (currentEditingContent.isNew) {
    // Save as new content
    saveGeneratedContent(updatedContent.content, updatedContent.type, updatedContent.purpose, updatedContent.length);
  } else {
    // Update existing content
    const index = appData.contentLibrary.findIndex(item => item.id === currentEditingContent.id);
    if (index !== -1) {
      appData.contentLibrary[index] = updatedContent;
      renderContentLibrary();
    }
  }
  
  closeModal();
  showSuccessMessage('Content updated successfully!');
}

// Content Library Actions
function editContent(id) {
  const content = appData.contentLibrary.find(item => item.id === id);
  if (content) {
    openEditModal(content);
  }
}

function duplicateContent(id) {
  const content = appData.contentLibrary.find(item => item.id === id);
  if (content) {
    const duplicated = {
      ...content,
      id: Date.now(),
      title: content.title + ' (Copy)',
      createdDate: new Date().toISOString().split('T')[0]
    };
    appData.contentLibrary.unshift(duplicated);
    renderContentLibrary();
    showSuccessMessage('Content duplicated successfully!');
  }
}

function deleteContent(id) {
  if (confirm('Are you sure you want to delete this content?')) {
    appData.contentLibrary = appData.contentLibrary.filter(item => item.id !== id);
    renderContentLibrary();
    showSuccessMessage('Content deleted successfully!');
  }
}

// Quick Actions
function initializeQuickActions() {
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      handleQuickAction(action);
    });
  });
}

function handleQuickAction(action) {
  switch (action) {
    case 'generate':
      navigateToSection('generator');
      break;
    case 'upload':
      navigateToSection('library');
      break;
    case 'template':
      navigateToSection('templates');
      break;
  }
}

function navigateToSection(sectionId) {
  // Update active link
  sidebarLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    }
  });
  
  // Show target section
  sections.forEach(section => {
    section.classList.remove('active');
    if (section.id === sectionId) {
      section.classList.add('active');
    }
  });
}

// Utility Functions
function showSuccessMessage(message) {
  // Create and show a temporary success message
  const successDiv = document.createElement('div');
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--color-success);
    color: var(--color-btn-primary-text);
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 10000;
    font-weight: 500;
  `;
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

function addRecentActivity(icon, title, meta) {
  appData.recentActivity.unshift({ icon, title, meta });
  if (appData.recentActivity.length > 4) {
    appData.recentActivity.pop();
  }
  initializeRecentActivity();
}

// Export functions for global access
window.editContent = editContent;
window.duplicateContent = duplicateContent;
window.deleteContent = deleteContent;