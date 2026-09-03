(function () {
	'use strict';

	/* Loader */
	var loader = document.querySelector('[data-loader]');
	if (loader) {
		window.addEventListener('load', function () {
			setTimeout(function () {
				loader.classList.add('hidden');
			}, 400);
		});
	}

	/* Scroll Progress */
	var scrollProgress = document.querySelector('[data-scroll-progress]');
	function updateScrollProgress() {
		if (!scrollProgress) return;
		var scrollTop = window.scrollY;
		var docHeight = document.documentElement.scrollHeight - window.innerHeight;
		var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
		scrollProgress.style.width = progress + '%';
	}
	window.addEventListener('scroll', updateScrollProgress, { passive: true });
	updateScrollProgress();

	/* Theme Toggle */
	var themeToggle = document.querySelector('[data-theme-toggle]');
	var themeIcon = document.querySelector('[data-theme-icon]');
	var storedTheme = null;
	try {
		storedTheme = localStorage.getItem('portfolio-theme');
	} catch (e) {}
	var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	var currentTheme = storedTheme || (systemDark ? 'dark' : 'light');

	var moonPath = 'M21.75 15.5a.75.75 0 0 1-.1.9 9.75 9.75 0 0 1-13.5 0 .75.75 0 0 1 .8-1.2 8.25 8.25 0 0 0 11.8 0 .75.75 0 0 1 1 .3Zm-1.05-6.3a.75.75 0 0 0 1.05 0 .75.75 0 0 0 0-1.05l-1.5-1.5a.75.75 0 0 0-1.05 1.05l1.5 1.5Zm.3 3.45a.75.75 0 0 0 .75-.75.75.75 0 0 0-.75-.75h-2.1a.75.75 0 0 0 0 1.5h2.1ZM12 6.75a.75.75 0 0 0 .75-.75V3.9a.75.75 0 0 0-1.5 0v2.1c0 .41.34.75.75.75Zm0 10.5a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 0 1 0 10.5Zm6.6-4.35a.75.75 0 0 0-1.05 1.05l1.5 1.5a.75.75 0 0 0 1.05-1.05l-1.5-1.5Zm-13.2 0-1.5 1.5a.75.75 0 0 0 1.05 1.05l1.5-1.5a.75.75 0 0 0-1.05-1.05Zm-1.5-3.3a.75.75 0 0 0 .75.75h2.1a.75.75 0 0 0 0-1.5H4.65a.75.75 0 0 0-.75.75Zm5.4-3a.75.75 0 1 0-1.05-1.05l-1.5 1.5a.75.75 0 0 0 1.05 1.05l1.5-1.5Z';
	var sunPath = 'M12 4.5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm0 11a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm8-3a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1ZM6.5 12.5a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1Zm11.6-5.4a1 1 0 0 1 0 1.4l-1.4 1.4a1 1 0 1 1-1.4-1.4l1.4-1.4a1 1 0 0 1 1.4 0ZM8.7 15.3a1 1 0 0 1 0 1.4l-1.4 1.4a1 1 0 1 1-1.4-1.4l1.4-1.4a1 1 0 0 1 1.4 0Zm9.8 0a1 1 0 0 1-1.4 0l-1.4-1.4a1 1 0 1 1 1.4-1.4l1.4 1.4a1 1 0 0 1 0 1.4ZM8.7 8.7a1 1 0 0 1-1.4 0L5.9 7.3a1 1 0 0 1 1.4-1.4l1.4 1.4a1 1 0 0 1 0 1.4ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z';

	function applyTheme(theme) {
		if (theme === 'light') {
			document.documentElement.setAttribute('data-theme', 'light');
			if (themeIcon) themeIcon.querySelector('path').setAttribute('d', sunPath);
		} else {
			document.documentElement.removeAttribute('data-theme');
			if (themeIcon) themeIcon.querySelector('path').setAttribute('d', moonPath);
		}
		try {
			localStorage.setItem('portfolio-theme', theme);
		} catch (e) {}
	}

	applyTheme(currentTheme);

	if (themeToggle) {
		themeToggle.addEventListener('click', function () {
			var isLight = document.documentElement.getAttribute('data-theme') === 'light';
			applyTheme(isLight ? 'dark' : 'light');
		});
	}

	/* Mobile Nav Toggle */
	var navToggle = document.querySelector('[data-nav-toggle]');
	var siteNav = document.querySelector('[data-nav]');
	if (navToggle && siteNav) {
		navToggle.addEventListener('click', function () {
			var isOpen = siteNav.classList.toggle('open');
			navToggle.classList.toggle('active');
			navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		});

		siteNav.querySelectorAll('a').forEach(function (link) {
			link.addEventListener('click', function () {
				siteNav.classList.remove('open');
				navToggle.classList.remove('active');
				navToggle.setAttribute('aria-expanded', 'false');
			});
		});
	}

	/* Back to Top */
	var backToTop = document.querySelector('[data-back-to-top]');
	function updateBackToTop() {
		if (!backToTop) return;
		if (window.scrollY > 500) {
			backToTop.classList.add('visible');
		} else {
			backToTop.classList.remove('visible');
		}
	}
	window.addEventListener('scroll', updateBackToTop, { passive: true });
	updateBackToTop();

	if (backToTop) {
		backToTop.addEventListener('click', function () {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	/* Scroll Reveal */
	var revealElements = document.querySelectorAll('.section-reveal');
	if ('IntersectionObserver' in window) {
		var revealObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					revealObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

		revealElements.forEach(function (el) {
			revealObserver.observe(el);
		});
	} else {
		revealElements.forEach(function (el) {
			el.classList.add('visible');
		});
	}

	/* Contact Form */
	var contactForm = document.querySelector('[data-contact-form]');
	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();
			var submitBtn = contactForm.querySelector('button[type="submit"]');
			var originalText = submitBtn.textContent;
			submitBtn.textContent = 'Sending...';
			submitBtn.disabled = true;

			var formData = new FormData(contactForm);
			fetch(contactForm.action, {
				method: 'POST',
				body: formData,
				headers: { 'Accept': 'application/json' }
			})
			.then(function (response) {
				if (response.ok) {
					contactForm.reset();
					submitBtn.textContent = 'Message Sent!';
					setTimeout(function () {
						submitBtn.textContent = originalText;
						submitBtn.disabled = false;
					}, 3000);
				} else {
					throw new Error('Form submission failed');
				}
			})
			.catch(function () {
				submitBtn.textContent = 'Error — Try Again';
				submitBtn.disabled = false;
				setTimeout(function () {
					submitBtn.textContent = originalText;
				}, 3000);
			});
		});
	}

	/* Header shadow on scroll */
	var siteHeader = document.querySelector('[data-header]');
	function updateHeaderShadow() {
		if (!siteHeader) return;
		if (window.scrollY > 10) {
			siteHeader.style.boxShadow = '0 2px 12px rgba(0,0,0,0.3)';
		} else {
			siteHeader.style.boxShadow = 'none';
		}
	}
	window.addEventListener('scroll', updateHeaderShadow, { passive: true });
	updateHeaderShadow();

	/* Smooth scroll for anchor links */
	document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
		anchor.addEventListener('click', function (e) {
			var targetId = anchor.getAttribute('href');
			if (targetId === '#') return;
			var target = document.querySelector(targetId);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});
})();
