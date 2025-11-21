document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.add('mobile-open');
        });
    }
    
    // Sidebar Toggle Logic
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        
        // Update icon based on state
        const icon = sidebarToggle.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.classList.remove('ri-menu-fold-line');
            icon.classList.add('ri-menu-unfold-line');
        } else {
            icon.classList.remove('ri-menu-unfold-line');
            icon.classList.add('ri-menu-fold-line');
        }
    });

    // Theme Toggle Logic
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Navigation Logic
    const dashboardLink = document.getElementById('dashboard-link');
    const reportsLink = document.getElementById('reports-link');
    const settingsLink = document.getElementById('settings-link');
    const profileLink = document.getElementById('profile-link');
    
    const dashboardView = document.getElementById('dashboard-view');
    const reportsView = document.getElementById('reports-view');
    const settingsView = document.getElementById('settings-view');
    const profileView = document.getElementById('profile-view');
    
    const dashboardNavItem = document.getElementById('dashboard-nav-item');
    const reportsNavItem = document.getElementById('reports-nav-item');
    const settingsNavItem = document.getElementById('settings-nav-item');
    const profileNavItem = document.getElementById('profile-nav-item');
    
    const pageTitle = document.querySelector('.page-title');

    function switchTab(viewId) {
        // Hide all views
        dashboardView.style.display = 'none';
        reportsView.style.display = 'none';
        settingsView.style.display = 'none';
        profileView.style.display = 'none';
        
        // Remove active class from all nav items
        dashboardNavItem.classList.remove('active');
        reportsNavItem.classList.remove('active');
        settingsNavItem.classList.remove('active');
        profileNavItem.classList.remove('active');

        // Show selected view and activate nav item
        if (viewId === 'dashboard') {
            dashboardView.style.display = 'block';
            dashboardNavItem.classList.add('active');
            pageTitle.textContent = 'Dashboard';
        } else if (viewId === 'reports') {
            reportsView.style.display = 'block';
            reportsNavItem.classList.add('active');
            pageTitle.textContent = 'Reports';
        } else if (viewId === 'settings') {
            settingsView.style.display = 'block';
            settingsNavItem.classList.add('active');
            pageTitle.textContent = 'Settings';
        } else if (viewId === 'profile') {
            profileView.style.display = 'block';
            profileNavItem.classList.add('active');
            pageTitle.textContent = 'Profile';
        }
        
        // On mobile, close sidebar after selection
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('mobile-open');
        }
    }

    if (dashboardLink) {
        dashboardLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('dashboard');
        });
    }

    if (reportsLink) {
        reportsLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('reports');
        });
    }

    if (settingsLink) {
        settingsLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('settings');
        });
    }

    if (profileLink) {
        profileLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('profile');
        });
    }

    // Mobile Responsiveness
    // Close sidebar when clicking outside on mobile (simplified)
    // Mobile Responsiveness
    // Close sidebar when clicking outside on mobile (simplified)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            const isClickInsideSidebar = sidebar.contains(e.target);
            const isClickOnDesktopToggle = sidebarToggle && sidebarToggle.contains(e.target);
            const isClickOnMobileToggle = mobileMenuBtn && mobileMenuBtn.contains(e.target);

            if (!isClickInsideSidebar && !isClickOnDesktopToggle && !isClickOnMobileToggle && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
            }
        }
    });

    // Animation Logic
    const animatedElements = document.querySelectorAll('.stat-card, .chart-card, .table-section, .report-container, .settings-section, .profile-header-card, .detail-card');
    
    // Add initial hidden state
    animatedElements.forEach((el, index) => {
        el.classList.add('scroll-hidden');
        // Add staggered delay for initial view
        if (index < 6) {
            el.style.transitionDelay = `${index * 100}ms`;
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add click listeners to nav links to reset animations for the new view
    const navLinks = [dashboardLink, reportsLink, settingsLink, profileLink];
    navLinks.forEach(link => {
        if(link) {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    const activeView = document.querySelector('.content-view[style="display: block;"]');
                    if (activeView) {
                        const elements = activeView.querySelectorAll('.stat-card, .chart-card, .table-section, .report-container, .settings-section, .profile-header-card, .detail-card');
                        elements.forEach((el, index) => {
                            el.classList.remove('scroll-visible');
                            el.classList.add('scroll-hidden');
                            
                            // Force reflow
                            void el.offsetWidth;
                            
                            // Reset delay for staggered effect
                            el.style.transitionDelay = `${index * 100}ms`;
                            
                            el.classList.add('scroll-visible');
                        });
                    }
                }, 50);
            });
        }
    });
});
