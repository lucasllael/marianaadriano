document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenuBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    
    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Read More Toggle for About Section
  const readMoreBtn = document.getElementById('read-more-btn');
  const shortBio = document.getElementById('short-bio');
  const fullBio = document.getElementById('full-bio');
  
  if (readMoreBtn && shortBio && fullBio) {
    readMoreBtn.addEventListener('click', function() {
      if (fullBio.classList.contains('hidden')) {
        fullBio.classList.remove('hidden');
        shortBio.classList.add('hidden');
        readMoreBtn.textContent = 'Mostrar menos';
      } else {
        fullBio.classList.add('hidden');
        shortBio.classList.remove('hidden');
        readMoreBtn.textContent = 'Saiba mais';
      }
    });
  }

  // Specialty Cards Toggle
  const specialtyCards = document.querySelectorAll('.specialty-card');
  
  specialtyCards.forEach(card => {
    const showMoreBtn = card.querySelector('.saiba-mais-btn');
    const closeBtn = card.querySelector('.fechar-btn');
    const description = card.querySelector('.specialty-desc');
    
    if (showMoreBtn && closeBtn && description) {
      showMoreBtn.addEventListener('click', function() {
        description.classList.remove('hidden');
        showMoreBtn.classList.add('hidden');
        closeBtn.classList.remove('hidden');
      });
      
      closeBtn.addEventListener('click', function() {
        description.classList.add('hidden');
        showMoreBtn.classList.remove('hidden');
        closeBtn.classList.add('hidden');
      });
    }
  });

  // Accordion for FAQ
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const content = this.nextElementSibling;
      
      // Toggle active class for the trigger
      this.classList.toggle('active');
      
      // Toggle active class for content
      content.classList.toggle('active');
      
      // Update max-height to create the accordion effect
      if (content.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    });
  });

  // Office Photo Gallery
  const thumbnailBtns = document.querySelectorAll('.thumbnail-btn');
  const mainPhoto = document.getElementById('main-office-photo');
  
  if (thumbnailBtns.length > 0 && mainPhoto) {
    thumbnailBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Update active class for thumbnails
        thumbnailBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update main photo
        mainPhoto.src = this.dataset.src;
        mainPhoto.alt = this.dataset.alt;
      });
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      
      // In a real implementation, you would send this data to a server
      console.log('Form submitted with:', { name, email, phone, message });
      
      // Display submission confirmation
      alert('Obrigado pela sua mensagem! Entraremos em contato em breve.');
      
      // Reset form
      contactForm.reset();
    });
  }


  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Offset for header height
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animation Handler - Similar to the React AnimationHandler.tsx component
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Add staggered animation for children elements
        if (entry.target.classList.contains('stagger-children')) {
          const children = entry.target.querySelectorAll('.stagger-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('in-view');
            }, 100 * index);
          });
        }
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.appear-animation, .stagger-children, .stagger-item');
  elements.forEach(el => observer.observe(el));

  // Update copyright year
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear().toString();
  }
});
