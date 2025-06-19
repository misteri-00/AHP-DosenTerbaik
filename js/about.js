function switchTab(tabIdToShow) {
    // Hide all tab content elements
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    // Deactivate all tab buttons by removing the 'active' class
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Show the content of the specified tab
    document.getElementById(tabIdToShow).classList.remove("hidden");
    // Activate the corresponding tab button
    const buttonId = `tab-${tabIdToShow.replace('-tab', '')}`;
    const activeButton = document.getElementById(buttonId);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// --- About Section Dynamic Content Generation ---

/**
 * Creates an HTML string for a single team member card with modern styling.
 * @param {string} name - The name of the team member.
 * @param {string} npm - The NPM (student ID) of the team member.
 * @param {string} colorClass - Tailwind CSS gradient classes (e.g., "from-indigo-500 via-purple-500 to-pink-500").
 * @param {string} imgSrc - The source URL for the profile image (e.g., "adi.jpg").
 * @returns {string} The HTML string for the team member card.
 */
function createTeamMemberCard(name, npm, colorClass, imgSrc) {
    // Extract the base color from the first part of the gradient class for icon styling
    const baseColorMatch = colorClass.match(/from-([a-z]+)-(\d+)/);
    const baseColorName = baseColorMatch ? baseColorMatch[1] : 'blue'; // Default to blue
    const baseColorShade = baseColorMatch ? parseInt(baseColorMatch[2]) : 500;
    // Determine a slightly darker shade for the icon for better contrast
    const iconColorClass = `text-${baseColorName}-${Math.min(baseColorShade + 100, 800)}`; // e.g., indigo-600 from indigo-500

    return `
        <div class="relative bg-gradient-to-br ${colorClass} shadow-xl rounded-2xl p-6 hover:-translate-y-2 transition duration-300 font-sans transform hover:scale-105 group">
            <div class="absolute top-4 right-4 z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                <img src="https://fh.upgris.ac.id/wp-content/uploads/2020/05/cropped-logo-upgris1-6.png" alt="Universitas PGRI Semarang Logo" class="h-12 w-12 object-contain">
            </div>
            <div class="flex flex-col items-center text-center pt-4">
                <div class="rounded-full bg-white p-2 shadow-xl mb-4 transform group-hover:rotate-6 transition duration-300 overflow-hidden">
                    <img src="${imgSrc}" alt="${name} Profile" class="h-20 w-20 object-cover rounded-full">
                </div>
                <h3 class="mt-2 text-2xl font-extrabold text-white tracking-wide">${name}</h3>
                <p class="text-md text-gray-200 opacity-90 mt-1">NPM: ${npm}</p>
                <div class="mt-5 border-t border-white border-opacity-30 pt-3 w-full">
                    <span class="text-sm text-gray-300">Inovasi & Kolaborasi</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renders all content for the 'About' tab, including team members and descriptive sections.
 */
function renderAboutContent() {
    // Define team members data
    const teamMembers = [
        { name: "Adi Kurniawan", npm: "23670150", color: "from-indigo-500 via-purple-500 to-pink-500", imgSrc: "https://blogger.googleusercontent.com/img/a/AVvXsEjh7HJfxBAUKixBOIT7hi3_ErZoXmIl2T1SG5w3or8Q0TcZSt3l-n3OByhH-n5QrNx7SxywNwKug6fb5DCu05EmBM0qND3gtfOeuKue6DTnttHIbfnNnc_SZuhburoUtDIa4v_sHwQHpmZC9LRa2qzgW369MpYSqbCxvE1oaFIEiIOucjQmoohwt8D31UU=s16000" }, // Example placeholder URL
        { name: "M Fadli Anwar", npm: "23670162", color: "from-green-400 via-teal-500 to-blue-600", imgSrc: "https://blogger.googleusercontent.com/img/a/AVvXsEj4e9nKGAyrWZe4gh3Sl9F-lyxhXToJqiIbL-SC0KWHpTBDDNugINpxCWkOu0IgXE8Ow3_MFCaF_00FtYFel2-yDl0BHQZKJaQdI6cisdSiss4v3NcaDd-zGrtuxvhgExng4nB-MCS78NeNiv-ksqDG_u9u5s3UtGsy9YKvDhfUhs-EZDUOzQ30G8rtPbs=s16000" }, // Example placeholder URL
        { name: "Art Fazil", npm: "23670145", color: "from-purple-500 via-pink-500 to-red-500", imgSrc: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEib70hyphenhyphennuxblwPKEGqaMOzftfXWp3lZ-f0Uds1kYPzDkpQ70A9FMJMUWbCVFxpcrGibY0H4okHlvD7dxVDKR08-me_dDa0pqgtGC8-tCq3kgJ3qOya9Hxwwevoy1P8xMswgomqb7j5rMZVBlrOkEXrburpwJ5_Epd53LoJmKmm51sbwvymoayVgwkoG__k/s16000/WhatsApp%20Image%202025-06-19%20at%2022.10.43_f7c1d8fb.jpg" }, // Example placeholder URL
        { name: "Wafa Rosyadi", npm: "23670144", color: "from-yellow-500 via-orange-500 to-red-500", imgSrc: "https://static.thenounproject.com/png/561365-200.png" }, // Example placeholder URL
    ];

    const aboutTab = document.getElementById("about-tab");
    // Generate HTML for all team member cards
    const teamCards = teamMembers.map(member =>
        createTeamMemberCard(member.name, member.npm, member.color, member.imgSrc)
    ).join("");

    // Populate the 'about-tab' with generated content
    aboutTab.innerHTML = `
        <div class="bg-gradient-to-br from-blue-700 to-indigo-800 text-white rounded-2xl p-10 shadow-2xl mb-12 font-sans animate-fade-in">
            <h2 class="text-4xl font-extrabold mb-6 text-center tracking-tight">Selamat Datang di Sistem AHP Kami!</h2>
            <p class="text-xl leading-relaxed text-blue-100 text-center max-w-3xl mx-auto">
                Platform ini dirancang untuk mempermudah proses pengambilan keputusan multi-kriteria
                menggunakan metode Analytical Hierarchy Process (AHP).
                Kami bersemangat untuk menyajikan solusi inovatif dalam menentukan Dosen Terbaik STMIK Primakara
                dengan transparansi dan akurasi.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-6">
            ${teamCards}
        </div>

        <div class="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white rounded-2xl p-10 shadow-2xl mt-12 font-sans animate-fade-in">
            <h2 class="text-4xl font-extrabold mb-6 text-center">SISTEM PENDUKUNG KEPUTUSAN PENENTUAN
                DOSEN TERBAIK MENGGUNAKAN METODE
                ANALYTICAL HIERARCHY PROCESS (AHP)
                PADA STMIK PRIMAKARA
            </h2>
            <p class="text-lg leading-relaxed text-gray-200">
                Penelitian ini membahas mengenai penerapan metode Analytical Hierarchy Process (AHP) sebagai sistem pendukung keputusan dengan studi kasus menentukan dosen terbaik. Selain itu dalam penelitian ini juga dilakukan perhitungan terhadap nilai konsistensi rasio dengan menggunakan beberapa nilai indeks random yang telah
                ditemukan oleh para peneliti. Nilai indeks random yang digunakan dalam penelitian ini meliputi nilai indeks random dari Saaty, Noble, Oak Ridge, Golden Wang, Tumala Wan, Aguaron, dan Alonso Lamata. Dalam kasus ini terdapat
                empat kriteria yang digunakan yaitu Pendidikan, Penelitian, Pengabdian Masyarakat, dan Penunjang. Masing – masing kriteria memiliki bobot awal yaitu Pendidikan 40%,
                Penelitian 25%, Pengabdian Masyarakat 25% dan Penunjang 10%. Penelitian dilakukan di  kampus STMIK Primakara, Jalan Tukad Badung No. 135 Renon, Denpasar
                Bali. Tujuan dari penelitian ini yaitu melakukan perhitungan menggunakan metode Analytical Hierarchy Process (AHP) dan juga mengukur berapa nilai konsistensi rasio yang dihasilkan dengan menggunakan nilai indeks random dari Saaty, Noble, Oak Ridge, Golden Wang, Tumala Wan, Aguaron, dan Alonso Lamata dalam penentuan dosen terbaik. Sehingga, hasil dari penelitian ini berupa perangkingan dosen terbaik dan juga seberapa besar nilai konsistensi keputusan yang didapatkan berdasarkan hasil perhitungan konsistensi rasio dari metode Analytical Hierarchy Process dengan menggunakan nilai indeks random dari beberapa peneliti.  
            </p>
        </div>

        <div class="flex flex-wrap justify-center gap-y-8 md:gap-x-12 lg:gap-x-16 bg-white shadow-xl rounded-2xl p-8 mt-12 font-sans animate-fade-in">
            <div class="flex flex-col items-center p-4 min-w-0 flex-1 basis-full sm:basis-auto bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div class="bg-indigo-600 p-4 rounded-full shadow-lg mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </div>
                <h3 class="text-5xl font-extrabold text-indigo-700 drop-shadow-lg">4</h3>
                <p class="text-gray-700 text-lg mt-2">Anggota</p>
            </div>

            <div class="flex flex-col items-center p-4 min-w-0 flex-1 basis-full sm:basis-auto bg-green-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div class="bg-teal-600 p-4 rounded-full shadow-lg mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </div>
                <h3 class="text-5xl font-extrabold text-green-700 drop-shadow-lg">2025</h3>
                <p class="text-gray-700 text-lg mt-2">Tahun</p>
            </div>

            <div class="flex flex-col items-center p-4 min-w-0 flex-1 basis-full sm:basis-auto bg-purple-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div class="bg-pink-600 p-4 rounded-full shadow-lg mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                        <path d="M12 2v20"></path>
                        <path d="M17.5 12H22"></path>
                        <path d="M2 12h4.5"></path>
                        <path d="M12 6.5V2"></path>
                        <path d="M12 17.5V22"></path>
                        <path d="M6.5 12H2"></path>
                        <path d="M17.5 12H22"></path>
                        <path d="M12 6.5V2"></path>
                        <path d="M12 17.5V22"></path>
                    </svg>
                </div>
                <h3 class="text-5xl font-extrabold text-pink-700 drop-shadow-lg">AHP</h3>
                <p class="text-gray-700 text-lg mt-2">Metode</p>
            </div>
        </div>
    `;
}

// --- Event Listeners and Initial Setup ---
document.addEventListener("DOMContentLoaded", () => {
    // Attach event listeners to all tab buttons for switching tabs
    document.getElementById("tab-about").addEventListener("click", () => {
        switchTab("about-tab");
    });
    document.getElementById("tab-setup").addEventListener("click", () => {
        switchTab("setup-tab");
    });
    document.getElementById("tab-criteria").addEventListener("click", () => {
        switchTab("criteria-tab");
    });
    document.getElementById("tab-alternatives").addEventListener("click", () => {
        switchTab("alternatives-tab");
    });
    document.getElementById("tab-results").addEventListener("click", () => {
        switchTab("results-tab");
    });

    // Initially display the "About" tab and render its content
    switchTab("about-tab");
    renderAboutContent();
});