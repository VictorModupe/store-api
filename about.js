// Mobile menu functionality (if needed in the future)
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  // Add click handlers for buttons
  const loginBtn = document.querySelector(".login-btn");
  const ctaBtn = document.querySelector(".cta-btn");

  loginBtn.addEventListener("click", function () {
    // Add your login functionality here
    console.log("Login button clicked");
  });

  ctaBtn.addEventListener("click", function () {
    // Add your join functionality here
    console.log("Join Us Now button clicked");
  });

  // Mobile menu toggle (for future implementation)
  mobileMenuBtn.addEventListener("click", function () {
    // Toggle mobile menu visibility
    console.log("Mobile menu button clicked");
  });

  // Smooth scroll for navigation links
  const navLinksElements = document.querySelectorAll(".nav-link");
  navLinksElements.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Navigation link clicked:", this.textContent);
    });
  });
});
































/**
 * MDTC Modern Trading Platform - Advanced JavaScript
 * Pixel-perfect animations and interactions from Figma design
 */

class MDTCAnimation {
  constructor() {
    this.isInitialized = false;
    this.observers = new Map();
    this.animations = new Map();
    this.performanceMetrics = {
      fps: 60,
      loadTime: 0,
      animationCount: 0,
    };

    // Device and browser detection
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    this.isTablet =
      /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    this.prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    this.supportsIntersectionObserver = "IntersectionObserver" in window;

    this.init();
  }

  /**
   * Initialize the animation system
   */
  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  /**
   * Main initialization when DOM is ready
   */
  onDOMReady() {
    console.log("🚀 MDTC Animation System Loading...");

    this.setupLoadingScreen();
    this.setupIntersectionObserver();
    this.setupCardInteractions();
    this.setupParallaxEffects();
    this.setupAccessibility();
    this.setupPerformanceMonitoring();
    this.setupResponsiveHandlers();
    this.setupFloatingElements();
    this.setupKeyboardNavigation();

    this.isInitialized = true;

    // Hide loading screen and show main app
    setTimeout(() => {
      this.hideLoadingScreen();
    }, 1000);

    console.log("✅ MDTC Animation System Ready");

    // Dispatch ready event
    this.dispatchEvent("mdtc:ready", {
      timestamp: Date.now(),
      performanceMetrics: this.performanceMetrics,
    });
  }

  /**
   * Setup and hide loading screen
   */
  setupLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    const mainApp = document.getElementById("main-app");

    if (loadingScreen && mainApp) {
      this.loadingScreen = loadingScreen;
      this.mainApp = mainApp;
    }
  }

  hideLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add("hidden");

      setTimeout(() => {
        this.loadingScreen.style.display = "none";
      }, 600);
    }
  }

  /**
   * Setup Intersection Observer for scroll-triggered animations
   */
  setupIntersectionObserver() {
    if (!this.supportsIntersectionObserver) {
      // Fallback for browsers without Intersection Observer
      this.fallbackScrollAnimation();
      return;
    }

    const observerOptions = {
      threshold: [0, 0.1, 0.5, 1],
      rootMargin: "0px 0px -10% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(".animate-on-scroll");
    animatableElements.forEach((element) => {
      observer.observe(element);
    });

    this.observers.set("scroll", observer);
  }

  /**
   * Animate element into view
   */
  animateElement(element) {
    if (element.classList.contains("animated")) return;

    const animationType = element.getAttribute("data-animation") || "fadeInUp";
    const delay = element.getAttribute("data-delay") || "0s";

    element.style.animationDelay = delay;
    element.classList.add("animated");

    this.performanceMetrics.animationCount++;

    // Track animation completion
    element.addEventListener(
      "animationend",
      () => {
        this.onAnimationComplete(element, animationType);
      },
      { once: true },
    );
  }

  /**
   * Handle animation completion
   */
  onAnimationComplete(element, animationType) {
    this.dispatchEvent("mdtc:animationComplete", {
      element,
      animationType,
      timestamp: Date.now(),
    });
  }

  /**
   * Fallback scroll animation for older browsers
   */
  fallbackScrollAnimation() {
    const animatableElements = document.querySelectorAll(".animate-on-scroll");

    const checkVisibility = () => {
      animatableElements.forEach((element) => {
        if (this.isElementInViewport(element)) {
          this.animateElement(element);
        }
      });
    };

    window.addEventListener("scroll", this.throttle(checkVisibility, 100), {
      passive: true,
    });
    checkVisibility(); // Initial check
  }

  /**
   * Check if element is in viewport
   */
  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Setup enhanced card interactions
   */
  setupCardInteractions() {
    const featureCards = document.querySelectorAll(".feature-card");

    featureCards.forEach((card, index) => {
      this.setupCardHoverEffects(card, index);
      this.setupCardClickEffects(card, index);
      this.setupCardTouchEffects(card, index);

      // Add card metadata
      card.setAttribute("data-card-index", index);
      card.setAttribute("aria-label", this.generateCardAriaLabel(card));
    });
  }

  /**
   * Generate ARIA label for card
   */
  generateCardAriaLabel(card) {
    const title = card.querySelector(".feature-title")?.textContent || "";
    const description =
      card.querySelector(".feature-description")?.textContent || "";
    return `Feature: ${title}. ${description}`;
  }

  /**
   * Setup card hover effects
   */
  setupCardHoverEffects(card, index) {
    const icon = card.querySelector(".feature-icon");
    const iconContainer = card.querySelector(".icon-container");
    const hoverEffect = card.querySelector(".card-hover-effect");

    let hoverTimeout;

    card.addEventListener("mouseenter", () => {
      if (this.prefersReducedMotion) return;

      clearTimeout(hoverTimeout);

      // Enhanced hover animation
      this.animateCardHover(card, icon, iconContainer, hoverEffect, true);

      // Track interaction
      this.trackInteraction("hover", "card", index);
    });

    card.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        this.animateCardHover(card, icon, iconContainer, hoverEffect, false);
      }, 50);
    });
  }

  /**
   * Animate card hover state
   */
  animateCardHover(card, icon, iconContainer, hoverEffect, isHovering) {
    if (isHovering) {
      // Hover in animation
      card.style.transform = "translateY(-12px) scale(1.02)";
      card.style.zIndex = "10";

      if (iconContainer) {
        iconContainer.style.transform = "translateY(-5px) scale(1.05)";
        iconContainer.style.boxShadow =
          "0px 12px 50px 0px rgba(34, 160, 42, 0.25)";
      }

      if (icon) {
        icon.style.transform = "scale(1.1) rotate(5deg)";
        icon.style.filter = "brightness(1.1)";
      }

      if (hoverEffect) {
        hoverEffect.style.width = "200px";
        hoverEffect.style.height = "200px";
        hoverEffect.style.opacity = "1";
      }

      // Add ripple effect
      this.createRippleEffect(card);
    } else {
      // Hover out animation
      card.style.transform = "translateY(0) scale(1)";
      card.style.zIndex = "auto";

      if (iconContainer) {
        iconContainer.style.transform = "translateY(0) scale(1)";
        iconContainer.style.boxShadow =
          "0px 8px 40px 0px rgba(34, 160, 42, 0.18)";
      }

      if (icon) {
        icon.style.transform = "scale(1) rotate(0deg)";
        icon.style.filter = "brightness(1)";
      }

      if (hoverEffect) {
        hoverEffect.style.width = "0";
        hoverEffect.style.height = "0";
        hoverEffect.style.opacity = "0";
      }
    }
  }

  /**
   * Create ripple effect
   */
  createRippleEffect(card) {
    const ripple = document.createElement("div");
    ripple.className = "ripple-effect";
    ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 182, 122, 0.3) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 1;
      animation: ripple 0.6s ease-out;
    `;

    // Add ripple keyframes if not exists
    if (!document.getElementById("ripple-styles")) {
      const style = document.createElement("style");
      style.id = "ripple-styles";
      style.textContent = `
        @keyframes ripple {
          to {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    card.style.position = "relative";
    card.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  /**
   * Setup card click effects
   */
  setupCardClickEffects(card, index) {
    card.addEventListener("click", (e) => {
      if (e.detail === 0) return; // Ignore keyboard activation

      this.animateCardClick(card);
      this.trackInteraction("click", "card", index);
    });
  }

  /**
   * Animate card click
   */
  animateCardClick(card) {
    card.style.animation = "pulse 0.6s ease-in-out";

    setTimeout(() => {
      card.style.animation = "";
    }, 600);
  }

  /**
   * Setup card touch effects for mobile
   */
  setupCardTouchEffects(card, index) {
    let touchStartTime = 0;
    let touchStartY = 0;

    card.addEventListener(
      "touchstart",
      (e) => {
        touchStartTime = Date.now();
        touchStartY = e.touches[0].clientY;

        card.classList.add("touch-active");

        // Immediate feedback
        card.style.transform = "translateY(-4px) scale(1.01)";
      },
      { passive: true },
    );

    card.addEventListener(
      "touchend",
      (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const touchDuration = Date.now() - touchStartTime;
        const touchDistance = Math.abs(touchEndY - touchStartY);

        card.classList.remove("touch-active");

        // Reset transform
        setTimeout(() => {
          card.style.transform = "";
        }, 100);

        // Detect tap vs scroll
        if (touchDuration < 500 && touchDistance < 10) {
          this.animateCardClick(card);
          this.trackInteraction("tap", "card", index);
        }
      },
      { passive: true },
    );

    card.addEventListener(
      "touchcancel",
      () => {
        card.classList.remove("touch-active");
        card.style.transform = "";
      },
      { passive: true },
    );
  }

  /**
   * Setup parallax effects
   */
  setupParallaxEffects() {
    if (this.prefersReducedMotion || this.isMobile) return;

    let ticking = false;
    let scrollY = 0;

    const updateParallax = () => {
      const floatingShapes = document.querySelectorAll(".floating-shape");
      const floatingParticles = document.querySelectorAll(".floating-particle");

      floatingShapes.forEach((shape, index) => {
        const speed = 0.3 + index * 0.1;
        const yPos = scrollY * speed;
        const rotation = scrollY * 0.1;

        shape.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
      });

      floatingParticles.forEach((particle, index) => {
        const speed = 0.5 + index * 0.2;
        const yPos = scrollY * speed;
        const xPos = Math.sin(scrollY * 0.01 + index) * 10;

        particle.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener(
      "scroll",
      () => {
        scrollY = window.pageYOffset;
        requestTick();
      },
      { passive: true },
    );
  }

  /**
   * Setup floating elements animations
   */
  setupFloatingElements() {
    const floatingShapes = document.querySelectorAll(".floating-shape");
    const floatingParticles = document.querySelectorAll(".floating-particle");

    // Add random variations to floating animations
    floatingShapes.forEach((shape, index) => {
      const delay = Math.random() * 2;
      const duration = 8 + Math.random() * 4;

      shape.style.animationDelay = `${delay}s`;
      shape.style.animationDuration = `${duration}s`;
    });

    floatingParticles.forEach((particle, index) => {
      const delay = Math.random() * 3;
      const duration = 6 + Math.random() * 3;

      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
    });
  }

  /**
   * Setup accessibility enhancements
   */
  setupAccessibility() {
    const featureCards = document.querySelectorAll(".feature-card");

    featureCards.forEach((card, index) => {
      // Enhanced ARIA attributes
      card.setAttribute("role", "article");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-describedby", `feature-${index}-desc`);

      // Add hidden description for screen readers
      const hiddenDesc = document.createElement("div");
      hiddenDesc.id = `feature-${index}-desc`;
      hiddenDesc.className = "sr-only";
      hiddenDesc.textContent = `Interactive feature card ${index + 1} of 8. Press Enter or Space to activate.`;

      card.appendChild(hiddenDesc);

      // Focus management
      card.addEventListener("focus", () => {
        card.style.outline = "3px solid #00B67A";
        card.style.outlineOffset = "4px";
      });

      card.addEventListener("blur", () => {
        card.style.outline = "";
        card.style.outlineOffset = "";
      });
    });

    // Add landmark to section
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.setAttribute(
        "aria-label",
        "Features: What Makes MDTC Different",
      );
    }
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    const featureCards = document.querySelectorAll(".feature-card");

    featureCards.forEach((card, index) => {
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();

          // Visual feedback
          card.style.transform = "translateY(-8px) scale(1.02)";
          card.style.outline = "3px solid #00B67A";

          this.trackInteraction("keyboard", "card", index);

          setTimeout(() => {
            card.style.transform = "";
            card.style.outline = "";
          }, 200);
        }

        // Arrow key navigation
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          const nextCard = featureCards[index + 1];
          if (nextCard) nextCard.focus();
        }

        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          const prevCard = featureCards[index - 1];
          if (prevCard) prevCard.focus();
        }
      });
    });
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    // Monitor FPS
    let lastTime = performance.now();
    let frames = 0;

    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        this.performanceMetrics.fps = Math.round(
          (frames * 1000) / (currentTime - lastTime),
        );

        if (this.performanceMetrics.fps < 30) {
          console.warn(
            `⚠️ Low FPS detected: ${this.performanceMetrics.fps}fps`,
          );
          this.optimizeForPerformance();
        }

        frames = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    if (!this.prefersReducedMotion) {
      requestAnimationFrame(measureFPS);
    }

    // Monitor load time
    window.addEventListener("load", () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType("navigation")[0];
        if (navigation) {
          this.performanceMetrics.loadTime =
            navigation.loadEventEnd - navigation.loadEventStart;
          console.log(
            `📊 Page load time: ${this.performanceMetrics.loadTime.toFixed(2)}ms`,
          );
        }
      }, 0);
    });
  }

  /**
   * Optimize for low-performance devices
   */
  optimizeForPerformance() {
    console.log("🔧 Optimizing for performance...");

    // Disable complex animations
    document.body.classList.add("low-performance");

    // Reduce animation complexity
    const style = document.createElement("style");
    style.textContent = `
      .low-performance * {
        transition-duration: 0.1s !important;
        animation-duration: 0.1s !important;
      }
      .low-performance .floating-bg {
        display: none !important;
      }
      .low-performance .feature-card:hover {
        transform: translateY(-4px) scale(1.01) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Setup responsive handlers
   */
  setupResponsiveHandlers() {
    let resizeTimeout;

    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.handleResize();
        }, 250);
      },
      { passive: true },
    );
  }

  /**
   * Handle window resize
   */
  handleResize() {
    console.log("📱 Viewport resized, adjusting animations");

    // Update mobile detection
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) || window.innerWidth < 768;

    // Adjust animations based on screen size
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card, index) => {
      const delay = this.isMobile ? index * 0.05 : index * 0.1;
      card.style.setProperty("--animation-delay", `${delay}s`);
    });
  }

  /**
   * Track user interactions
   */
  trackInteraction(type, element, index) {
    const interaction = {
      type,
      element,
      index,
      timestamp: Date.now(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    console.log(`📈 Interaction: ${type} on ${element} ${index}`, interaction);

    // Dispatch event for external tracking
    this.dispatchEvent("mdtc:interaction", interaction);

    // Integration point for analytics
    if (typeof gtag !== "undefined") {
      gtag("event", "interaction", {
        event_category: "engagement",
        event_label: `${element}_${index}`,
        interaction_type: type,
      });
    }
  }

  /**
   * Utility: Throttle function calls
   */
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  /**
   * Utility: Debounce function calls
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Dispatch custom events
   */
  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail: {
        ...detail,
        timestamp: Date.now(),
        source: "mdtc-animation-system",
      },
    });

    document.dispatchEvent(event);
  }

  /**
   * Public API: Animate specific card
   */
  animateCard(index) {
    const card = document.querySelector(`[data-card-index="${index}"]`);
    if (card) {
      this.animateCardClick(card);
    }
  }

  /**
   * Public API: Focus on specific feature
   */
  focusFeature(featureName) {
    const card = document.querySelector(`[data-feature="${featureName}"]`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.focus();
    }
  }

  /**
   * Public API: Get performance metrics
   */
  getPerformanceMetrics() {
    return { ...this.performanceMetrics };
  }

  /**
   * Cleanup and destroy
   */
  destroy() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.animations.clear();

    console.log("🧹 MDTC Animation System destroyed");
  }
}

// Initialize the animation system
const mdtcAnimation = new MDTCAnimation();

// Expose to global scope
window.MDTCAnimation = mdtcAnimation;

// Handle page visibility changes for performance
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.body.classList.add("page-hidden");
  } else {
    document.body.classList.remove("page-hidden");
  }
});

// Handle connection changes for performance optimization
if ("connection" in navigator) {
  const connection = navigator.connection;

  if (
    connection.effectiveType === "slow-2g" ||
    connection.effectiveType === "2g"
  ) {
    console.log("🐌 Slow connection detected, optimizing animations");
    document.body.classList.add("slow-connection");

    const style = document.createElement("style");
    style.textContent = `
      .slow-connection * {
        transition-duration: 0.1s !important;
        animation-duration: 0.1s !important;
      }
      .slow-connection .floating-bg {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("🚨 Application error:", e.error);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("🚨 Unhandled promise rejection:", e.reason);
});

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = MDTCAnimation;
}

console.log("🎯 MDTC Animation Script Loaded");






































// FAQ Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item, index) => {
    const button = item.querySelector(".faq-button");
    const content = item.querySelector(".faq-content");

    button.addEventListener("click", function () {
      const isExpanded = item.getAttribute("data-expanded") === "true";

      // Close all other items
      faqItems.forEach((otherItem, otherIndex) => {
        if (otherIndex !== index) {
          otherItem.setAttribute("data-expanded", "false");
          const otherButton = otherItem.querySelector(".faq-button");
          otherButton.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current item
      if (isExpanded) {
        item.setAttribute("data-expanded", "false");
        button.setAttribute("aria-expanded", "false");
      } else {
        item.setAttribute("data-expanded", "true");
        button.setAttribute("aria-expanded", "true");
      }
    });

    // Keyboard accessibility
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Initialize with first item expanded
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    firstItem.setAttribute("data-expanded", "true");
    const firstButton = firstItem.querySelector(".faq-button");
    firstButton.setAttribute("aria-expanded", "true");
  }
});

// Smooth scrolling for better UX
function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add focus management for better accessibility
document.addEventListener("keydown", function (e) {
  // Escape key closes all expanded items
  if (e.key === "Escape") {
    const expandedItems = document.querySelectorAll(
      '.faq-item[data-expanded="true"]',
    );
    expandedItems.forEach((item) => {
      item.setAttribute("data-expanded", "false");
      const button = item.querySelector(".faq-button");
      button.setAttribute("aria-expanded", "false");
    });
  }
});

// Intersection Observer for animations (optional enhancement)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe FAQ items for entrance animations
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item, index) => {
    // Set initial state for animation
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

    // Observe for intersection
    observer.observe(item);
  });
});







