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
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
            }
        }
    });
});
