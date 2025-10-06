// LOL.css Framework Demo JavaScript

// Rainbow colors mapping for letters
const rainbowColors = {
  'c': '#FFB3BA', // Coral
  'o': '#FFDFBA', // Peach  
  'n': '#D9FFB3', // Lime
  's': '#BAFFC9', // Mint
  'u': '#BAE1FF', // Sky
  'l': '#C9BAFF', // Lavender
  't': '#FFBAFF', // Magenta
  'i': '#FFB3D9', // Rose
  'g': '#B3D9FF'  // Periwinkle
};

// Color usage examples
const colorUsageExamples = {
  coral: {
    name: 'Coral',
    hex: '#FFB3BA',
    examples: [
      { type: 'Button', class: 'btn-coral', color: '#FFB3BA' },
      { type: 'Background', class: 'bg-coral', color: '#FFB3BA' },
      { type: 'Text', class: 'text-coral', color: '#FFB3BA' },
      { type: 'Border', class: 'border-coral', color: '#FFB3BA' }
    ]
  },
  peach: {
    name: 'Peach',
    hex: '#FFDFBA',
    examples: [
      { type: 'Button', class: 'btn-peach', color: '#FFDFBA' },
      { type: 'Background', class: 'bg-peach', color: '#FFDFBA' },
      { type: 'Text', class: 'text-peach', color: '#FFDFBA' },
      { type: 'Border', class: 'border-peach', color: '#FFDFBA' }
    ]
  },
  lime: {
    name: 'Lime',
    hex: '#D9FFB3',
    examples: [
      { type: 'Button', class: 'btn-lime', color: '#D9FFB3' },
      { type: 'Background', class: 'bg-lime', color: '#D9FFB3' },
      { type: 'Text', class: 'text-lime', color: '#D9FFB3' },
      { type: 'Border', class: 'border-lime', color: '#D9FFB3' }
    ]
  },
  mint: {
    name: 'Mint',
    hex: '#BAFFC9',
    examples: [
      { type: 'Button', class: 'btn-mint', color: '#BAFFC9' },
      { type: 'Background', class: 'bg-mint', color: '#BAFFC9' },
      { type: 'Text', class: 'text-mint', color: '#BAFFC9' },
      { type: 'Border', class: 'border-mint', color: '#BAFFC9' }
    ]
  },
  sky: {
    name: 'Sky',
    hex: '#BAE1FF',
    examples: [
      { type: 'Button', class: 'btn-sky', color: '#BAE1FF' },
      { type: 'Background', class: 'bg-sky', color: '#BAE1FF' },
      { type: 'Text', class: 'text-sky', color: '#BAE1FF' },
      { type: 'Border', class: 'border-sky', color: '#BAE1FF' }
    ]
  },
  lavender: {
    name: 'Lavender',
    hex: '#C9BAFF',
    examples: [
      { type: 'Button', class: 'btn-lavender', color: '#C9BAFF' },
      { type: 'Background', class: 'bg-lavender', color: '#C9BAFF' },
      { type: 'Text', class: 'text-lavender', color: '#C9BAFF' },
      { type: 'Border', class: 'border-lavender', color: '#C9BAFF' }
    ]
  },
  magenta: {
    name: 'Magenta',
    hex: '#FFBAFF',
    examples: [
      { type: 'Button', class: 'btn-magenta', color: '#FFBAFF' },
      { type: 'Background', class: 'bg-magenta', color: '#FFBAFF' },
      { type: 'Text', class: 'text-magenta', color: '#FFBAFF' },
      { type: 'Border', class: 'border-magenta', color: '#FFBAFF' }
    ]
  },
  rose: {
    name: 'Rose',
    hex: '#FFB3D9',
    examples: [
      { type: 'Button', class: 'btn-rose', color: '#FFB3D9' },
      { type: 'Background', class: 'bg-rose', color: '#FFB3D9' },
      { type: 'Text', class: 'text-rose', color: '#FFB3D9' },
      { type: 'Border', class: 'border-rose', color: '#FFB3D9' }
    ]
  },
  periwinkle: {
    name: 'Periwinkle',
    hex: '#B3D9FF',
    examples: [
      { type: 'Button', class: 'btn-periwinkle', color: '#B3D9FF' },
      { type: 'Background', class: 'bg-periwinkle', color: '#B3D9FF' },
      { type: 'Text', class: 'text-periwinkle', color: '#B3D9FF' },
      { type: 'Border', class: 'border-periwinkle', color: '#B3D9FF' }
    ]
  }
};

// Initialize the demo when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeRainbowText();
  initializeColorSwatches();
  initializeFormHandling();
  initializeScrollEffects();
  initializeButtonEffects();
  initializeUtilityDemos();
});

// Initialize rainbow text coloring
function initializeRainbowText() {
  const rainbowElements = document.querySelectorAll('[data-letters]');
  
  rainbowElements.forEach(element => {
    const text = element.getAttribute('data-letters');
    let coloredHTML = '';
    
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const color = rainbowColors[letter] || '#000';
      coloredHTML += `<span class="rainbow-letter" style="color: ${color}">${letter}</span>`;
    }
    
    element.innerHTML = coloredHTML;
  });
}

// Initialize color swatch interactions
function initializeColorSwatches() {
  const colorSwatches = document.querySelectorAll('.color-swatch');
  const colorUsage = document.getElementById('colorUsage');
  
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', function() {
      const color = this.getAttribute('data-color');
      showColorUsage(color, colorUsage);
      
      // Update active state
      colorSwatches.forEach(s => s.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// Show color usage examples
function showColorUsage(colorName, container) {
  const colorData = colorUsageExamples[colorName];
  
  if (!colorData) return;
  
  container.style.setProperty('--active-color', colorData.hex);
  container.classList.add('active');
  
  const usageHTML = `
    <h3>Usage Examples for ${colorData.name}</h3>
    <p>Color: ${colorData.hex}</p>
    <div class="usage-examples">
      ${colorData.examples.map(example => `
        <div class="usage-example">
          <h4>${example.type}</h4>
          <div class="example-item" style="background-color: ${example.color}">
            .${example.class}
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  container.innerHTML = usageHTML;
}

// Initialize form handling
function initializeFormHandling() {
  const demoForm = document.querySelector('.demo-form');
  
  if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const color = document.getElementById('color').value;
      const message = document.getElementById('message').value;
      
      // Show success message
      showFormFeedback('Thank you for your feedback! 🌈', 'success');
      
      // Reset form after delay
      setTimeout(() => {
        this.reset();
      }, 2000);
    });
    
    // Add real-time validation
    const formInputs = demoForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearValidation);
    });
  }
}

// Validate form field
function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  // Remove existing validation classes
  field.classList.remove('valid', 'invalid');
  
  // Basic validation
  let isValid = true;
  
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  } else if (field.required && !value) {
    isValid = false;
  }
  
  // Add validation class
  field.classList.add(isValid ? 'valid' : 'invalid');
}

// Clear field validation
function clearValidation(e) {
  const field = e.target;
  field.classList.remove('valid', 'invalid');
}

// Show form feedback
function showFormFeedback(message, type) {
  const existingFeedback = document.querySelector('.form-feedback');
  if (existingFeedback) {
    existingFeedback.remove();
  }
  
  const feedback = document.createElement('div');
  feedback.className = `form-feedback status status--${type}`;
  feedback.textContent = message;
  feedback.style.marginTop = '1rem';
  feedback.style.textAlign = 'center';
  
  const form = document.querySelector('.demo-form');
  form.appendChild(feedback);
  
  // Remove feedback after 3 seconds
  setTimeout(() => {
    feedback.remove();
  }, 3000);
}

// Initialize scroll effects
function initializeScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.brand-card, .color-swatch, .card, .component-group');
  animatedElements.forEach(el => observer.observe(el));
}

// Initialize button effects
function initializeButtonEffects() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    // Add ripple effect on click
    button.addEventListener('click', function(e) {
      if (!this.querySelector('.ripple')) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      }
    });
    
    // Add loading state for demo purposes
    if (button.textContent.includes('Try Now') || button.textContent.includes('Submit')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;
        
        setTimeout(() => {
          this.textContent = originalText;
          this.disabled = false;
        }, 1500);
      });
    }
  });
}

// Initialize utility demonstrations
function initializeUtilityDemos() {
  // Add hover effects to ALL utility demo elements
  const utilityElements = document.querySelectorAll(
    '.button-demo-row .btn, .demo-box, .scale-box'
  );
  
  utilityElements.forEach(element => {
    // Show tooltip on hover for elements with title attribute
    element.addEventListener('mouseenter', function() {
      const title = this.getAttribute('title');
      if (title) {
        showTooltip(this, title);
      }
    });
    
    element.addEventListener('mouseleave', function() {
      hideTooltip();
    });
    
    // Add click effect for utility buttons (non-functional demo)
    if (element.classList.contains('btn')) {
      element.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Brief highlight effect
        this.style.transform = 'scale(0.95)';
        this.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
          this.style.transform = '';
        }, 100);
        
        // Show utility class info
        const utilityClass = this.textContent.trim();
        showUtilityInfo(utilityClass, this);
      });
    }
  });
  
  // Add hover effects to demo boxes and scale boxes
  const interactiveBoxes = document.querySelectorAll('.demo-box, .scale-box');
  
  interactiveBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    box.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// Show tooltip for utility elements
function showTooltip(element, text) {
  // Remove existing tooltip
  hideTooltip();
  
  const tooltip = document.createElement('div');
  tooltip.className = 'utility-tooltip';
  tooltip.textContent = text;
  tooltip.style.cssText = `
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-family: monospace;
    z-index: 1000;
    pointer-events: none;
    white-space: nowrap;
  `;
  
  document.body.appendChild(tooltip);
  
  // Position tooltip
  const rect = element.getBoundingClientRect();
  tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
}

// Hide tooltip
function hideTooltip() {
  const tooltip = document.querySelector('.utility-tooltip');
  if (tooltip) {
    tooltip.remove();
  }
}

// Show utility class information
function showUtilityInfo(utilityClass, button) {
  const utilityMap = {
    'p-0': 'padding: 0',
    'p-1': 'padding: 0.25rem',
    'p-2': 'padding: 0.5rem', 
    'p-3': 'padding: 0.75rem',
    'p-4': 'padding: 1rem',
    'p-6': 'padding: 1.5rem',
    'm-0': 'margin: 0',
    'm-2': 'margin: 0.5rem',
    'm-4': 'margin: 1rem',
    'm-6': 'margin: 1.5rem',
    'px-8 py-2': 'padding-left: 2rem; padding-right: 2rem; padding-top: 0.5rem; padding-bottom: 0.5rem',
    'px-2 py-6': 'padding-left: 0.5rem; padding-right: 0.5rem; padding-top: 1.5rem; padding-bottom: 1.5rem',
    'mx-4 my-1': 'margin-left: 1rem; margin-right: 1rem; margin-top: 0.25rem; margin-bottom: 0.25rem'
  };
  
  const cssRule = utilityMap[utilityClass];
  if (!cssRule) return;
  
  // Create temporary info display
  const info = document.createElement('div');
  info.className = 'utility-info';
  info.innerHTML = `
    <strong>.${utilityClass}</strong><br>
    <span style="font-size: 10px;">${cssRule}</span>
  `;
  info.style.cssText = `
    position: absolute;
    background: var(--color-surface);
    border: 2px solid var(--coral);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-family: monospace;
    z-index: 1001;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: fadeInUp 0.2s ease;
    max-width: 200px;
    word-wrap: break-word;
  `;
  
  // Add animation keyframes if not already present
  if (!document.querySelector('#utility-animations')) {
    const style = document.createElement('style');
    style.id = 'utility-animations';
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(info);
  
  // Position info box
  const rect = button.getBoundingClientRect();
  const infoRect = info.getBoundingClientRect();
  
  // Calculate position with boundary checks
  let left = rect.right + 10;
  let top = rect.top + (rect.height / 2) - (infoRect.height / 2);
  
  // Check if info box would go off screen
  if (left + infoRect.width > window.innerWidth) {
    left = rect.left - infoRect.width - 10;
  }
  
  if (top < 0) {
    top = 10;
  }
  
  if (top + infoRect.height > window.innerHeight) {
    top = window.innerHeight - infoRect.height - 10;
  }
  
  info.style.left = left + 'px';
  info.style.top = top + 'px';
  
  // Remove after 3 seconds
  setTimeout(() => {
    info.remove();
  }, 3000);
}

// Add some additional utility functions
function getRandomRainbowColor() {
  const colors = Object.values(rainbowColors);
  return colors[Math.floor(Math.random() * colors.length)];
}

function animateElement(element, animation) {
  element.style.animation = animation;
  element.addEventListener('animationend', () => {
    element.style.animation = '';
  }, { once: true });
}

// Add easter egg - konami code for rainbow mode
let konamiCode = [];
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
  konamiCode.push(e.code);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    activateRainbowMode();
    konamiCode = [];
  }
});

function activateRainbowMode() {
  document.body.classList.add('rainbow-mode');
  
  // Add rainbow background animation
  const style = document.createElement('style');
  style.textContent = `
    .rainbow-mode {
      animation: rainbow-bg 3s ease-in-out infinite;
    }
    
    @keyframes rainbow-bg {
      0% { background: linear-gradient(45deg, #FFB3BA, #FFDFBA); }
      14% { background: linear-gradient(45deg, #FFDFBA, #D9FFB3); }
      28% { background: linear-gradient(45deg, #D9FFB3, #BAFFC9); }
      42% { background: linear-gradient(45deg, #BAFFC9, #BAE1FF); }
      57% { background: linear-gradient(45deg, #BAE1FF, #C9BAFF); }
      71% { background: linear-gradient(45deg, #C9BAFF, #FFBAFF); }
      85% { background: linear-gradient(45deg, #FFBAFF, #FFB3D9); }
      100% { background: linear-gradient(45deg, #FFB3D9, #FFB3BA); }
    }
  `;
  document.head.appendChild(style);
  
  // Show message
  showFormFeedback('🌈 Rainbow mode activated! Utility classes are working perfectly! 🌈', 'success');
  
  // Deactivate after 10 seconds
  setTimeout(() => {
    document.body.classList.remove('rainbow-mode');
    style.remove();
  }, 10000);
}

// Utility class demonstration functions
function demonstrateUtilityOverride() {
  const buttons = document.querySelectorAll('.button-demo-row .btn');
  
  buttons.forEach((button, index) => {
    setTimeout(() => {
      button.style.animation = 'pulse 0.6s ease';
      
      setTimeout(() => {
        button.style.animation = '';
      }, 600);
    }, index * 200);
  });
}

// Call demonstration periodically
setInterval(() => {
  if (Math.random() < 0.1) { // 10% chance every interval
    demonstrateUtilityOverride();
  }
}, 5000);

// Export functions for potential external use
window.LOLDemo = {
  initializeRainbowText,
  initializeColorSwatches,
  showColorUsage,
  getRandomRainbowColor,
  animateElement,
  initializeUtilityDemos,
  demonstrateUtilityOverride
};

// Add CSS for pulse animation
const pulseStyles = document.createElement('style');
pulseStyles.textContent = `
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 179, 186, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 179, 186, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 179, 186, 0);
    }
  }
`;
document.head.appendChild(pulseStyles);