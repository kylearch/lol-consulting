/*
 * Privates Dashboard - Complete JavaScript Application
 * Professional secrets management interface with Privates branding
 */

class PrivatesDashboard {
  constructor() {
    this.currentSection = 'dashboard';
    this.theme = localStorage.getItem('theme') || 'light';
    this.secrets = this.loadMockSecrets();
    this.team = this.loadMockTeam();
    this.activity = this.loadMockActivity();
    
    this.init();
  }

  init() {
    this.initializeTheme();
    this.bindEvents();
    this.updateStats();
    this.renderRecentActivity();
  }

  // Mock Data
  loadMockSecrets() {
    return [
      {
        id: 1,
        name: "Stripe API Key",
        type: "API Key",
        created: "2025-09-15",
        expires: "2025-12-15",
        status: "Active",
        shared: true,
        tags: ["payment", "production"]
      },
      {
        id: 2,
        name: "Database Password",
        type: "Password",
        created: "2025-08-22",
        expires: "2026-02-22",
        status: "Active",
        shared: false,
        tags: ["database", "production"]
      },
      {
        id: 3,
        name: "JWT Secret",
        type: "Token",
        created: "2025-09-01",
        expires: "2025-10-15",
        status: "Expiring Soon",
        shared: true,
        tags: ["auth", "backend"]
      },
      {
        id: 4,
        name: "SSH Private Key",
        type: "SSH Key",
        created: "2025-07-10",
        expires: "2025-11-10",
        status: "Active",
        shared: false,
        tags: ["server", "access"]
      },
      {
        id: 5,
        name: "OAuth Client Secret",
        type: "OAuth",
        created: "2025-06-05",
        expires: "2025-04-01",
        status: "Expired",
        shared: false,
        tags: ["oauth", "deprecated"]
      }
    ];
  }

  loadMockTeam() {
    return [
      {
        name: "John Doe",
        email: "john@company.com",
        role: "Admin",
        lastActive: "2 hours ago",
        avatar: "JD"
      },
      {
        name: "Sarah Wilson",
        email: "sarah@company.com",
        role: "Member",
        lastActive: "1 day ago",
        avatar: "SW"
      },
      {
        name: "Mike Chen",
        email: "mike@company.com",
        role: "Viewer",
        lastActive: "3 days ago",
        avatar: "MC"
      },
      {
        name: "Emma Rodriguez",
        email: "emma@company.com",
        role: "Member",
        lastActive: "5 hours ago",
        avatar: "ER"
      }
    ];
  }

  loadMockActivity() {
    return [
      {
        action: "Secret stashed",
        details: "Redis Password added to production environment",
        timestamp: "1 day ago",
        user: "Emma Rodriguez",
        icon: "fas fa-archive",
        color: "text-brand-main"
      },
      {
        action: "Access granted",
        details: "Stripe API Key shared with Sarah Wilson",
        timestamp: "2 hours ago",
        user: "John Doe",
        icon: "fas fa-user-plus",
        color: "text-green-600"
      },
      {
        action: "Team member added",
        details: "Mike Chen joined the trusted circle",
        timestamp: "2 days ago",
        user: "John Doe",
        icon: "fas fa-users",
        color: "text-blue-600"
      },
      {
        action: "Secret expired",
        details: "OAuth Client Secret automatically expired",
        timestamp: "3 days ago",
        user: "System",
        icon: "fas fa-exclamation-triangle",
        color: "text-orange-600"
      }
    ];
  }

  // Theme Management
  initializeTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
      themeToggle.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
    
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
      themeToggle.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Navigation
  switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });

    const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeNavItem) {
      activeNavItem.classList.add('active');
    }

    this.currentSection = sectionName;

    // Load section-specific data
    this.loadSectionData(sectionName);
  }

  loadSectionData(sectionName) {
    switch (sectionName) {
      case 'stash':
        this.renderSecretsTable();
        break;
      case 'circle':
        this.renderTeamGrid();
        break;
      case 'activity':
        this.renderActivityTimeline();
        break;
      case 'preferences':
        this.loadPreferences();
        break;
    }
  }

  // Event Binding
  bindEvents() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        this.switchSection(section);
      });
    });

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    // Action buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-action]')) {
        e.preventDefault();
        const action = e.target.closest('[data-action]').getAttribute('data-action');
        this.handleAction(action, e.target.closest('[data-action]'));
      }
    });

    // Search functionality
    const searchInput = document.querySelector('.header__search input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }

    // Modal events
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop') || 
          e.target.closest('.modal-close')) {
        this.closeModal();
      }
    });
  }

  // Stats Management
  updateStats() {
    const stats = {
      totalSecrets: this.secrets.length,
      activeShares: this.secrets.filter(s => s.shared).length,
      teamMembers: this.team.length,
      expiringSoon: this.secrets.filter(s => s.status === 'Expiring Soon').length
    };

    // Update stat cards
    const statCards = document.querySelectorAll('.stat-card__number');
    if (statCards.length >= 4) {
      statCards[0].textContent = stats.totalSecrets;
      statCards[1].textContent = stats.activeShares;
      statCards[2].textContent = stats.teamMembers;
      statCards[3].textContent = stats.expiringSoon;
    }
  }

  // Activity Rendering
  renderRecentActivity() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;

    const recentActivities = this.activity.slice(0, 3);
    activityList.innerHTML = recentActivities.map(activity => `
      <div class="activity-item">
        <div class="activity-icon">
          <i class="${activity.icon} ${activity.color}"></i>
        </div>
        <div class="activity-content">
          <p><strong>${activity.action}</strong></p>
          <p class="text-muted">${activity.details}</p>
          <time class="activity-time">${activity.timestamp}</time>
        </div>
      </div>
    `).join('');
  }

  // Secrets Table
  renderSecretsTable() {
    // This would populate the secrets table dynamically
    // For now, it's static in HTML
    console.log('Rendering secrets table with', this.secrets.length, 'secrets');
  }

  // Team Grid
  renderTeamGrid() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;

    teamGrid.innerHTML = this.team.map(member => `
      <div class="team-card">
        <div class="team-card__avatar">
          <span class="avatar avatar-lg">${member.avatar}</span>
        </div>
        <div class="team-card__info">
          <h3>${member.name}</h3>
          <p class="text-muted">${member.email}</p>
          <span class="badge ${member.role === 'Admin' ? 'badge-primary' : 'badge-secondary'}">${member.role}</span>
        </div>
        <div class="team-card__meta">
          <p class="text-sm text-muted">Active ${member.lastActive}</p>
        </div>
      </div>
    `).join('');
  }

  // Activity Timeline
  renderActivityTimeline() {
    const timeline = document.querySelector('.activity-timeline');
    if (!timeline) return;

    timeline.innerHTML = this.activity.map(activity => `
      <div class="activity-item">
        <div class="activity-time">${activity.timestamp}</div>
        <div class="activity-icon">
          <i class="${activity.icon} ${activity.color}"></i>
        </div>
        <div class="activity-content">
          <p><strong>${activity.action}</strong></p>
          <p class="text-muted">${activity.details}</p>
        </div>
      </div>
    `).join('');
  }

  // Action Handlers
  handleAction(action, element) {
    const loadingMessages = {
      'stash-secret': 'Stashing securely...',
      'share-secret': 'Granting access...',
      'export-data': 'Preparing export...',
      'invite-member': 'Sending invitation...',
      'copy-secret': 'Copying to clipboard...'
    };

    const successMessages = {
      'stash-secret': 'Secret stashed safely!',
      'share-secret': 'Access granted successfully!',
      'export-data': 'Export completed!',
      'invite-member': 'Invitation sent!',
      'copy-secret': 'Copied to clipboard!'
    };

    switch (action) {
      case 'stash-secret':
        this.showModal('Stash New Secret', this.getStashSecretForm());
        break;
      
      case 'share-secret':
        this.showLoading(loadingMessages[action]);
        setTimeout(() => {
          this.hideLoading();
          this.showNotification(successMessages[action], 'success');
        }, 1500);
        break;
      
      case 'copy-secret':
        // Simulate copying to clipboard
        this.showNotification('Copied to clipboard!', 'success');
        break;
      
      case 'invite-member':
        this.showModal('Invite Team Member', this.getInviteMemberForm());
        break;
      
      default:
        console.log('Action:', action);
    }
  }

  // Modal Management
  showModal(title, content) {
    const modal = document.getElementById('modal-backdrop');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalFooter = document.getElementById('modal-footer');

    if (modal && modalTitle && modalBody) {
      modalTitle.textContent = title;
      modalBody.innerHTML = content;
      modalFooter.innerHTML = `
        <button class="btn btn-outline modal-close">Cancel</button>
        <button class="btn btn-primary">Save</button>
      `;
      modal.classList.remove('hidden');
    }
  }

  closeModal() {
    const modal = document.getElementById('modal-backdrop');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  // Loading States
  showLoading(message = 'Securing your privates...') {
    const loading = document.getElementById('loading');
    const loadingText = document.getElementById('loading-text');
    
    if (loading && loadingText) {
      loadingText.textContent = message;
      loading.classList.remove('hidden');
    }
  }

  hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.add('hidden');
    }
  }

  // Notifications
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    // Add styles for notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--green-100)' : 'var(--blue-100)'};
      color: ${type === 'success' ? 'var(--green-800)' : 'var(--blue-800)'};
      padding: var(--space-4) var(--space-6);
      border-radius: var(--rounded-lg);
      box-shadow: var(--shadow-lg);
      z-index: 1001;
      display: flex;
      align-items: center;
      gap: var(--space-3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Search Functionality
  handleSearch(query) {
    console.log('Searching for:', query);
    // Implement search logic here
  }

  // Preferences
  loadPreferences() {
    // Load user preferences
    console.log('Loading privacy preferences');
  }

  // Modal Forms
  getStashSecretForm() {
    return `
      <form class="stash-secret-form">
        <div class="form-group">
          <label class="form-label">Secret Name</label>
          <input type="text" class="form-control" placeholder="e.g., Production API Key" required>
        </div>
        
        <div class="form-group">
          <label class="form-label">Secret Type</label>
          <select class="form-control" required>
            <option value="">Select type...</option>
            <option value="api-key">API Key</option>
            <option value="password">Password</option>
            <option value="ssh-key">SSH Key</option>
            <option value="token">Token</option>
            <option value="oauth">OAuth</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">Secret Value</label>
          <textarea class="form-control" rows="4" placeholder="Enter your secret..." required></textarea>
        </div>
        
        <div class="form-group">
          <label class="form-label">Expiration Date</label>
          <input type="date" class="form-control">
        </div>
        
        <div class="form-group">
          <label class="form-label">Tags</label>
          <input type="text" class="form-control" placeholder="production, api, payment">
          <p class="text-muted text-xs">Separate tags with commas</p>
        </div>
      </form>
    `;
  }

  getInviteMemberForm() {
    return `
      <form class="invite-member-form">
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-control" placeholder="colleague@company.com" required>
        </div>
        
        <div class="form-group">
          <label class="form-label">Role</label>
          <select class="form-control" required>
            <option value="">Select role...</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">Message (Optional)</label>
          <textarea class="form-control" rows="3" placeholder="Personal message for the invitation..."></textarea>
        </div>
      </form>
    `;
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.privatesDashboard = new PrivatesDashboard();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PrivatesDashboard;
}