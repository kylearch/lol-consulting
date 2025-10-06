// TherapySpeed Application JavaScript

class TherapySpeedApp {
    constructor() {
        this.currentUser = null;
        this.currentView = 'landingView';
        this.currentSession = null;
        this.currentTherapistIndex = 0;
        this.sessionTimer = null;
        this.sessionRatings = [];
        this.isAuthenticated = false;
        this.currentRating = null;
        this.currentRatingTherapist = null;
        
        // Application data
        this.therapists = [
            {
                "id": 1,
                "name": "Dr. Sarah Chen",
                "specialty": "Anxiety & Depression",
                "experience": 8,
                "bio": "Specializing in cognitive behavioral therapy and mindfulness-based approaches for anxiety and depression management.",
                "rating": 4.8,
                "location": "San Francisco, CA",
                "photo": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
                "languages": ["English", "Mandarin"],
                "approach": "CBT, Mindfulness",
                "availability": ["Monday", "Wednesday", "Friday"]
            },
            {
                "id": 2,
                "name": "Dr. Marcus Johnson",
                "specialty": "Relationship Counseling",
                "experience": 12,
                "bio": "Expert in couples therapy and family dynamics with a focus on communication and conflict resolution.",
                "rating": 4.9,
                "location": "Austin, TX",
                "photo": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
                "languages": ["English", "Spanish"],
                "approach": "Family Systems, EFT",
                "availability": ["Tuesday", "Thursday", "Saturday"]
            },
            {
                "id": 3,
                "name": "Dr. Emily Rodriguez",
                "specialty": "Trauma & PTSD",
                "experience": 10,
                "bio": "Trauma-informed therapist using EMDR and somatic approaches to help clients heal from past experiences.",
                "rating": 4.7,
                "location": "Denver, CO",
                "photo": "https://images.unsplash.com/photo-1594824388853-2c5dc7900395?w=300&h=300&fit=crop&crop=face",
                "languages": ["English", "Spanish"],
                "approach": "EMDR, Somatic Therapy",
                "availability": ["Monday", "Tuesday", "Friday"]
            },
            {
                "id": 4,
                "name": "Dr. Alex Thompson",
                "specialty": "Life Transitions",
                "experience": 6,
                "bio": "Helping clients navigate major life changes including career transitions, divorce, and personal growth.",
                "rating": 4.6,
                "location": "Seattle, WA",
                "photo": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
                "languages": ["English"],
                "approach": "Humanistic, Solution-Focused",
                "availability": ["Wednesday", "Thursday", "Saturday"]
            },
            {
                "id": 5,
                "name": "Dr. Priya Patel",
                "specialty": "Stress Management",
                "experience": 9,
                "bio": "Integrative approach combining traditional therapy with wellness practices for comprehensive stress management.",
                "rating": 4.8,
                "location": "Boston, MA",
                "photo": "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&h=300&fit=crop&crop=face",
                "languages": ["English", "Hindi", "Gujarati"],
                "approach": "Integrative, Wellness-Based",
                "availability": ["Monday", "Wednesday", "Thursday"]
            },
            {
                "id": 6,
                "name": "Dr. James Wilson",
                "specialty": "Addiction & Recovery",
                "experience": 15,
                "bio": "Specialized treatment for substance abuse and behavioral addictions with evidence-based recovery approaches.",
                "rating": 4.9,
                "location": "Phoenix, AZ",
                "photo": "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&h=300&fit=crop&crop=face",
                "languages": ["English"],
                "approach": "12-Step, Motivational Interviewing",
                "availability": ["Tuesday", "Thursday", "Friday"]
            }
        ];

        this.sessions = [
            {
                "id": 1,
                "title": "General Therapy Speed Dating",
                "date": "2025-10-10",
                "time": "7:00 PM",
                "duration": "90 minutes",
                "maxClients": 12,
                "currentClients": 8,
                "therapistIds": [1, 2, 3, 4, 5, 6],
                "sessionLength": 7,
                "status": "open",
                "description": "Meet 6 different therapists in quick 7-minute sessions to find your perfect match."
            },
            {
                "id": 2,
                "title": "Anxiety & Depression Focus",
                "date": "2025-10-12",
                "time": "6:30 PM",
                "duration": "75 minutes",
                "maxClients": 10,
                "currentClients": 6,
                "therapistIds": [1, 3, 5],
                "sessionLength": 8,
                "status": "open",
                "description": "Specialized session with therapists who focus on anxiety and depression treatment."
            },
            {
                "id": 3,
                "title": "Relationship & Family Therapy",
                "date": "2025-10-15",
                "time": "7:30 PM",
                "duration": "60 minutes",
                "maxClients": 8,
                "currentClients": 5,
                "therapistIds": [2, 4, 6],
                "sessionLength": 6,
                "status": "open",
                "description": "Connect with therapists specializing in couples, family, and relationship counseling."
            }
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadUserData();
        this.showView('landingView');
    }

    bindEvents() {
        // Navigation events
        document.getElementById('navLogin').addEventListener('click', () => this.showLogin());
        document.getElementById('navSignup').addEventListener('click', () => this.showSignup());
        document.getElementById('navLogout').addEventListener('click', () => this.logout());
        
        // Landing page events
        document.getElementById('heroGetStarted').addEventListener('click', () => this.showSignup());
        document.getElementById('heroLearnMore').addEventListener('click', () => this.scrollToFeatures());
        
        // Auth events
        document.getElementById('authForm').addEventListener('submit', (e) => this.handleAuth(e));
        document.getElementById('authSwitchBtn').addEventListener('click', () => this.toggleAuthMode());
        
        // Dashboard events
        document.getElementById('browseSessions').addEventListener('click', () => this.showSessionBrowser());
        document.getElementById('dashboardPrimary').addEventListener('click', () => this.handleDashboardPrimary());
        document.getElementById('backToDashboard').addEventListener('click', () => this.showDashboard());
        document.getElementById('backToDashboardFromResults').addEventListener('click', () => this.showDashboard());
        document.getElementById('findMoreSessions').addEventListener('click', () => this.showSessionBrowser());
        
        // Session events
        document.getElementById('nextBtn').addEventListener('click', () => this.nextTherapist());
        document.getElementById('muteBtn').addEventListener('click', () => this.toggleMute());
        document.getElementById('videoBtn').addEventListener('click', () => this.toggleVideo());
        document.getElementById('exitBtn').addEventListener('click', () => this.exitSession());
        
        // Rating events
        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', (e) => this.setRating(e));
            star.addEventListener('mouseover', (e) => this.highlightStars(e));
        });
        document.getElementById('starsRating').addEventListener('mouseleave', () => this.resetStars());
        document.getElementById('submitRating').addEventListener('click', () => this.submitRating());
        document.getElementById('skipRating').addEventListener('click', () => this.skipRating());
    }

    // Authentication
    showLogin() {
        this.showView('authView');
        this.setAuthMode('login');
    }

    showSignup() {
        this.showView('authView');
        this.setAuthMode('signup');
    }

    setAuthMode(mode) {
        const isLogin = mode === 'login';
        const title = document.getElementById('authTitle');
        const subtitle = document.getElementById('authSubtitle');
        const nameGroup = document.getElementById('nameGroup');
        const roleGroup = document.getElementById('roleGroup');
        const submitBtn = document.getElementById('authSubmit');
        const switchText = document.getElementById('authSwitchText');
        const switchBtn = document.getElementById('authSwitchBtn');
        const nameInput = document.getElementById('authName');

        title.textContent = isLogin ? 'Welcome Back' : 'Create Account';
        subtitle.textContent = isLogin ? 'Sign in to your account' : 'Join TherapySpeed today';
        nameGroup.style.display = isLogin ? 'none' : 'block';
        roleGroup.style.display = isLogin ? 'none' : 'block';
        submitBtn.textContent = isLogin ? 'Sign In' : 'Create Account';
        switchText.textContent = isLogin ? "Don't have an account?" : "Already have an account?";
        switchBtn.textContent = isLogin ? 'Sign up' : 'Sign in';
        nameInput.required = !isLogin;
        
        this.authMode = mode;
    }

    toggleAuthMode() {
        const newMode = this.authMode === 'login' ? 'signup' : 'login';
        this.setAuthMode(newMode);
    }

    handleAuth(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email') || document.getElementById('authEmail').value;
        const password = formData.get('password') || document.getElementById('authPassword').value;
        const name = document.getElementById('authName').value;
        const role = document.querySelector('input[name="userRole"]:checked')?.value || 'client';

        if (this.authMode === 'signup') {
            this.register(email, password, name, role);
        } else {
            this.login(email, password);
        }
    }

    register(email, password, name, role) {
        const userData = {
            email,
            name,
            role,
            id: Date.now(),
            joinedAt: new Date().toISOString(),
            ratings: [],
            sessions: []
        };
        
        this.currentUser = userData;
        this.isAuthenticated = true;
        this.saveUserData();
        this.updateNavigation();
        this.showDashboard();
    }

    login(email, password) {
        // Simulate login - in real app would validate against backend
        const userData = this.loadStoredUser(email) || {
            email,
            name: email.split('@')[0],
            role: 'client',
            id: Date.now(),
            joinedAt: new Date().toISOString(),
            ratings: [],
            sessions: []
        };
        
        this.currentUser = userData;
        this.isAuthenticated = true;
        this.saveUserData();
        this.updateNavigation();
        this.showDashboard();
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.updateNavigation();
        this.showView('landingView');
        localStorage.removeItem('currentUser');
    }

    // Navigation and Views
    showView(viewId) {
        document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
        document.getElementById(viewId).classList.remove('hidden');
        this.currentView = viewId;
        
        // Clear any active timers when switching views
        this.clearTimer();
    }

    updateNavigation() {
        const navActions = document.getElementById('navActions');
        const navUser = document.getElementById('navUser');
        const navWelcome = document.getElementById('navWelcome');

        if (this.isAuthenticated && this.currentUser) {
            navActions.classList.add('hidden');
            navUser.classList.remove('hidden');
            navWelcome.textContent = `Welcome, ${this.currentUser.name}`;
        } else {
            navActions.classList.remove('hidden');
            navUser.classList.add('hidden');
        }
    }

    showDashboard() {
        this.showView('dashboardView');
        this.updateDashboard();
    }

    updateDashboard() {
        if (!this.currentUser) return;

        const isClient = this.currentUser.role === 'client';
        const clientDashboard = document.getElementById('clientDashboard');
        const therapistDashboard = document.getElementById('therapistDashboard');
        const dashboardTitle = document.getElementById('dashboardTitle');
        const dashboardPrimary = document.getElementById('dashboardPrimary');

        if (isClient) {
            clientDashboard.classList.remove('hidden');
            therapistDashboard.classList.add('hidden');
            dashboardTitle.textContent = 'Client Dashboard';
            dashboardPrimary.textContent = 'Browse Sessions';
            
            document.getElementById('availableSessionsCount').textContent = this.sessions.length;
            document.getElementById('pastMatchesCount').textContent = this.currentUser.ratings?.length || 0;
        } else {
            clientDashboard.classList.add('hidden');
            therapistDashboard.classList.remove('hidden');
            dashboardTitle.textContent = 'Therapist Dashboard';
            dashboardPrimary.textContent = 'Create Session';
        }
    }

    handleDashboardPrimary() {
        if (this.currentUser?.role === 'client') {
            this.showSessionBrowser();
        } else {
            // Therapist create session - simplified for MVP
            alert('Session creation feature coming soon!');
        }
    }

    // Session Browser
    showSessionBrowser() {
        this.showView('sessionBrowserView');
        this.renderSessions();
    }

    renderSessions() {
        const sessionsGrid = document.getElementById('sessionsGrid');
        sessionsGrid.innerHTML = '';

        this.sessions.forEach(session => {
            const sessionCard = this.createSessionCard(session);
            sessionsGrid.appendChild(sessionCard);
        });
    }

    createSessionCard(session) {
        const card = document.createElement('div');
        card.className = 'session-card';
        
        const sessionTherapists = session.therapistIds.map(id => 
            this.therapists.find(t => t.id === id)
        ).filter(Boolean);

        const capacityPercent = (session.currentClients / session.maxClients) * 100;

        card.innerHTML = `
            <div class="session-card__header">
                <h3 class="session-card__title">${session.title}</h3>
                <p>${session.description}</p>
            </div>
            <div class="session-card__meta">
                <span>📅 ${this.formatDate(session.date)}</span>
                <span>⏰ ${session.time}</span>
                <span>⏳ ${session.duration}</span>
            </div>
            <div class="session-card__therapists">
                <h4>Participating Therapists:</h4>
                <div class="session-card__therapist-list">
                    ${sessionTherapists.map(t => `<span class="therapist-tag">${t.name}</span>`).join('')}
                </div>
            </div>
            <div class="session-card__capacity">
                <span>${session.currentClients}/${session.maxClients}</span>
                <div class="capacity-bar">
                    <div class="capacity-fill" style="width: ${capacityPercent}%"></div>
                </div>
                <span>${Math.round(capacityPercent)}% full</span>
            </div>
            <button class="btn btn--primary btn--full-width" onclick="app.joinSession(${session.id})">
                Join Session
            </button>
        `;

        return card;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // Active Session
    joinSession(sessionId) {
        const session = this.sessions.find(s => s.id === sessionId);
        if (!session) return;

        this.currentSession = session;
        this.currentTherapistIndex = 0;
        this.sessionRatings = [];
        
        this.showView('activeSessionView');
        this.startSession();
    }

    startSession() {
        const therapistIds = this.currentSession.therapistIds;
        const currentTherapistId = therapistIds[this.currentTherapistIndex];
        const therapist = this.therapists.find(t => t.id === currentTherapistId);
        
        this.updateSessionUI(therapist);
        this.updateSessionProgress();
        this.startTimer(this.currentSession.sessionLength * 60); // Convert to seconds
        
        // Update next button text based on progress
        const nextBtn = document.getElementById('nextBtn');
        const isLastTherapist = this.currentTherapistIndex >= this.currentSession.therapistIds.length - 1;
        nextBtn.textContent = isLastTherapist ? 'Finish Session' : 'Next Therapist →';
        nextBtn.style.display = 'inline-flex'; // Ensure button is visible
    }

    updateSessionUI(therapist) {
        document.getElementById('currentTherapistName').textContent = therapist.name;
        document.getElementById('currentTherapistSpecialty').textContent = therapist.specialty;
        document.getElementById('therapistAvatar').src = therapist.photo;
        document.getElementById('therapistVideoLabel').textContent = therapist.name;
    }

    updateSessionProgress() {
        const progress = document.getElementById('sessionProgress');
        const current = this.currentTherapistIndex + 1;
        const total = this.currentSession.therapistIds.length;
        progress.textContent = `Therapist ${current} of ${total}`;
    }

    startTimer(seconds) {
        this.clearTimer();
        let timeLeft = seconds;
        
        const updateTimer = () => {
            const minutes = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            
            document.getElementById('timerMinutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('timerSeconds').textContent = secs.toString().padStart(2, '0');
            
            const progress = ((seconds - timeLeft) / seconds) * 100;
            document.getElementById('timerProgress').style.width = `${100 - progress}%`;
            
            if (timeLeft <= 0) {
                this.clearTimer();
                this.timeUp();
                return;
            }
            
            timeLeft--;
        };

        updateTimer();
        this.sessionTimer = setInterval(updateTimer, 1000);
    }

    clearTimer() {
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
            this.sessionTimer = null;
        }
    }

    timeUp() {
        this.showRatingView();
    }

    nextTherapist() {
        this.clearTimer();
        this.showRatingView();
    }

    exitSession() {
        if (confirm('Are you sure you want to exit the session? Your progress will be lost.')) {
            this.clearTimer();
            this.currentSession = null;
            this.sessionRatings = [];
            this.showDashboard();
        }
    }

    toggleMute() {
        const btn = document.getElementById('muteBtn');
        const isMuted = btn.textContent.includes('Unmute');
        btn.textContent = isMuted ? '🎤 Mute' : '🔇 Unmute';
    }

    toggleVideo() {
        const btn = document.getElementById('videoBtn');
        const isOff = btn.textContent.includes('Turn On');
        btn.textContent = isOff ? '📹 Video' : '📹 Turn On';
    }

    // Rating System
    showRatingView() {
        const therapistIds = this.currentSession.therapistIds;
        const currentTherapistId = therapistIds[this.currentTherapistIndex];
        const therapist = this.therapists.find(t => t.id === currentTherapistId);
        
        document.getElementById('ratingTherapistName').textContent = therapist.name;
        this.currentRatingTherapist = therapist;
        this.currentRating = null;
        this.resetStars();
        document.getElementById('ratingFeedback').value = '';
        
        this.showView('ratingView');
    }

    setRating(e) {
        const rating = parseInt(e.target.dataset.rating);
        this.currentRating = rating;
        this.updateStars(rating);
    }

    highlightStars(e) {
        const rating = parseInt(e.target.dataset.rating);
        this.updateStars(rating);
    }

    updateStars(rating) {
        document.querySelectorAll('.star').forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }

    resetStars() {
        if (this.currentRating) {
            this.updateStars(this.currentRating);
        } else {
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('active');
            });
        }
    }

    submitRating() {
        if (!this.currentRating) {
            alert('Please select a rating');
            return;
        }

        const feedback = document.getElementById('ratingFeedback').value;
        
        const rating = {
            therapistId: this.currentRatingTherapist.id,
            therapistName: this.currentRatingTherapist.name,
            rating: this.currentRating,
            feedback: feedback,
            timestamp: new Date().toISOString()
        };

        this.sessionRatings.push(rating);
        this.continueOrFinishSession();
    }

    skipRating() {
        const rating = {
            therapistId: this.currentRatingTherapist.id,
            therapistName: this.currentRatingTherapist.name,
            rating: 3, // Default neutral rating
            feedback: '',
            timestamp: new Date().toISOString()
        };

        this.sessionRatings.push(rating);
        this.continueOrFinishSession();
    }

    continueOrFinishSession() {
        this.currentRating = null;
        this.currentTherapistIndex++;
        
        if (this.currentTherapistIndex >= this.currentSession.therapistIds.length) {
            this.finishSession();
        } else {
            this.showView('activeSessionView');
            this.startSession();
        }
    }

    finishSession() {
        // Save ratings to user data
        if (!this.currentUser.ratings) {
            this.currentUser.ratings = [];
        }
        this.currentUser.ratings.push(...this.sessionRatings);
        this.saveUserData();
        
        this.showResults();
    }

    // Results
    showResults() {
        this.showView('resultsView');
        this.renderResults();
    }

    renderResults() {
        const matchesGrid = document.getElementById('matchesGrid');
        matchesGrid.innerHTML = '';

        // Sort ratings by score (highest first)
        const sortedRatings = [...this.sessionRatings].sort((a, b) => b.rating - a.rating);
        
        sortedRatings.forEach((rating, index) => {
            const therapist = this.therapists.find(t => t.id === rating.therapistId);
            const matchCard = this.createMatchCard(therapist, rating, index === 0);
            matchesGrid.appendChild(matchCard);
        });
    }

    createMatchCard(therapist, rating, isTop) {
        const card = document.createElement('div');
        card.className = `match-card ${isTop ? 'match-card--top' : ''}`;
        
        const stars = '★'.repeat(rating.rating) + '☆'.repeat(5 - rating.rating);
        
        card.innerHTML = `
            <img src="${therapist.photo}" alt="${therapist.name}" class="match-card__avatar">
            <h3 class="match-card__name">${therapist.name}</h3>
            <p class="match-card__specialty">${therapist.specialty}</p>
            <div class="match-card__rating">
                <span class="match-card__stars">${stars}</span>
                <span>${rating.rating}/5</span>
            </div>
            ${rating.feedback ? `<div class="match-card__feedback">"${rating.feedback}"</div>` : ''}
            <button class="btn btn--primary btn--full-width" onclick="app.bookFollowUp(${therapist.id})">
                Book Follow-up Session
            </button>
        `;
        
        return card;
    }

    bookFollowUp(therapistId) {
        const therapist = this.therapists.find(t => t.id === therapistId);
        alert(`Follow-up booking with ${therapist.name} will be available soon! You can contact them directly for now.`);
    }

    // Utility functions
    scrollToFeatures() {
        document.querySelector('.features').scrollIntoView({ behavior: 'smooth' });
    }

    saveUserData() {
        if (this.currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            // Also save to a users array for multi-user support
            const users = JSON.parse(localStorage.getItem('therapySpeedUsers') || '[]');
            const userIndex = users.findIndex(u => u.email === this.currentUser.email);
            if (userIndex >= 0) {
                users[userIndex] = this.currentUser;
            } else {
                users.push(this.currentUser);
            }
            localStorage.setItem('therapySpeedUsers', JSON.stringify(users));
        }
    }

    loadUserData() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.isAuthenticated = true;
            this.updateNavigation();
            this.showDashboard();
        }
    }

    loadStoredUser(email) {
        const users = JSON.parse(localStorage.getItem('therapySpeedUsers') || '[]');
        return users.find(u => u.email === email);
    }
}

// Initialize the application
const app = new TherapySpeedApp();

// Global functions for event handlers
window.app = app;