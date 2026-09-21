
        // Navigation Mobile Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuIcon = document.getElementById('menuIcon');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });

        // Resume Modal Controls
        function openResumeModal() {
            document.getElementById('resumeModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeResumeModal() {
            document.getElementById('resumeModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        document.getElementById('resumeModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeResumeModal();
            }
        });

        function downloadMockPDF() {
            const printContent = document.getElementById('printableResume').innerHTML;
            const printWindow = window.open('', '', 'height=800,width=900');
            printWindow.document.write('<html><head><title>Nelbert_Tare_CV</title>');
            printWindow.document.write('<script src="https://cdn.tailwindcss.com"><\/script>');
            printWindow.document.write('</head><body class="bg-slate-900 text-white p-8">');
            printWindow.document.write(printContent);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            
            setTimeout(() => {
                printWindow.print();
            }, 500);
        }

        // Contact Form Handler
        function handleFormSubmit(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const successBanner = document.getElementById('formSuccess');

            submitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> <span>Sending Message...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                successBanner.classList.remove('hidden');
            }, 900);
        }

        function resetContactForm() {
            document.getElementById('contactForm').reset();
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Send Project Message</span>';
            submitBtn.disabled = false;
            document.getElementById('formSuccess').classList.add('hidden');
        }

        // Category Filtering & Live Keyword Search
        let currentCategory = 'all';

        function setCategoryFilter(category, btnElement) {
            currentCategory = category;
            
            // Highlight active filter button
            document.querySelectorAll('#filterBtnContainer .filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            btnElement.classList.add('active');

            filterProjects();
        }

        function filterProjects() {
            const searchQuery = document.getElementById('projectSearch').value.toLowerCase().trim();
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const cardSearchTitle = card.getAttribute('data-title').toLowerCase();
                const cardText = card.innerText.toLowerCase();

                const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
                const matchesSearch = searchQuery === '' || cardSearchTitle.includes(searchQuery) || cardText.includes(searchQuery);

                if (matchesCategory && matchesSearch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    