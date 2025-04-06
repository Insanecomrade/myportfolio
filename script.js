// Wait for document to load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const modal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalBody = document.querySelector('.modal-body');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const categoryBtns = document.querySelectorAll('.category-btn');
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
  
  // Scroll to top button
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Portfolio filtering
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryBtns.forEach(btn => btn.classList.remove('active'));
      // Add active class to current button
      this.classList.add('active');
      
      // Get category to filter
      const category = this.getAttribute('data-category');
      
      // Filter portfolio items
      portfolioItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Modal functionality
  portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
      // Get portfolio item details
      const title = item.querySelector('h3').textContent;
      const category = item.getAttribute('data-category');
      const description = item.querySelector('.portfolio-description').textContent;
      const imageSrc = item.querySelector('img').src;
      
      // Populate modal content
      modalBody.innerHTML = `
        <div class="modal-image">
          <img src="${imageSrc}" alt="${title}">
        </div>
        <div class="modal-info">
          <h3>${title}</h3>
          <p class="modal-category">${category}</p>
          <p class="modal-description">${description}</p>
          
          <div class="modal-details">
            <h4>Technical Details</h4>
            <div class="modal-tags">
              <span>Blender</span>
              <span>ZBrush</span>
              <span>Substance Painter</span>
              <span>Unity</span>
            </div>
          </div>
        </div>
      `;
      
      // Show modal
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
  
  // Close modal on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  
  // Form submission (prevent default for demo)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('This is a demo form. In a real application, this would send your message.');
    });
  }
  
  // Animation for elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.section-title, .section-subtitle, .about-text h3, .about-text p, .skills-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.9) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initial call and scroll event
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});