# AHP-DosenTerbaik
Sistem Pendukung Keputusan AHP: Penentuan Dosen Terbaik STMIK Primakara
Sebuah aplikasi web sederhana yang mengimplementasikan metode Analytical Hierarchy Process (AHP) untuk membantu dalam pengambilan keputusan multi-kriteria dalam menentukan dosen terbaik di STMIK Primakara.

Tentang Proyek
Proyek ini adalah sistem pendukung keputusan berbasis web yang dirancang untuk mempermudah proses evaluasi dan penentuan dosen terbaik berdasarkan beberapa kriteria menggunakan metode AHP. Dengan antarmuka yang intuitif, pengguna dapat mendefinisikan tujuan, kriteria, dan alternatif, melakukan perbandingan berpasangan, menghitung bobot prioritas, dan melihat hasil ranking secara transparan dan akurat.

Tujuan utama dari sistem ini adalah menyediakan alat yang objektif dan terstruktur untuk mendukung pengambilan keputusan dalam proses penilaian dosen, memastikan konsistensi dalam penilaian.

Teknologi yang Digunakan
HTML5: Struktur dasar halaman web.

Tailwind CSS: Untuk styling dan antarmuka pengguna yang responsif.

JavaScript: Logika inti untuk perhitungan AHP, manajemen data, interaksi UI, dan visualisasi.

Fitur
Setup Hierarki:

Definisi tujuan keputusan (misal: "Menentukan Dosen Terbaik STMIK Primakara").

Manajemen kriteria penilaian (tambah, edit, hapus kriteria seperti Pendidikan, Penelitian, Pengabdian Masyarakat, Kegiatan Penunjang).

Manajemen alternatif (tambah, edit, hapus dosen sebagai alternatif).

Fungsionalitas Ekspor dan Impor data hierarki (dalam format JSON).

Matriks Kriteria:

Input perbandingan berpasangan untuk kriteria berdasarkan skala Saaty.

Perhitungan otomatis kebalikannya.

Menampilkan hasil konsistensi (λ Max, CI, CR) dan status konsistensi.

Matriks Alternatif:

Generasi otomatis matriks perbandingan berpasangan untuk setiap alternatif di bawah setiap kriteria.

Input nilai perbandingan untuk setiap pasangan alternatif.

Perhitungan konsistensi untuk setiap matriks alternatif.

Hasil & Ranking:

Menampilkan bobot prioritas kriteria.

Menampilkan ranking akhir dosen berdasarkan perhitungan AHP.

Visualisasi hasil dalam bentuk grafik (jika diimplementasikan dengan library chart seperti Chart.js atau D3.js).

Kontrol Utama:

Tombol untuk memuat data default.

Tombol untuk menghitung AHP secara keseluruhan.

Tombol untuk mereset matriks.

Tombol untuk memvalidasi hierarki.

Antarmuka Responsif: Dirancang dengan Tailwind CSS untuk tampilan yang baik di berbagai ukuran layar.

Mulai Cepat (Ringkas)
Ikuti langkah-langkah ini untuk menjalankan aplikasi di lingkungan lokal Anda.

Prasyarat
Hanya membutuhkan browser web modern.

Instalasi
Clone repositori:

git clone https://github.com/your-username/nama-repositori-anda.git

(Ganti https://github.com/your-username/nama-repositori-anda.git dengan URL repositori proyek Anda yang sebenarnya.)

Buka file index.html di browser Anda.

Penggunaan
Tab "About": Informasi proyek dan tim.

Tab "Setup Hierarki": Definisikan tujuan, kelola kriteria dan alternatif. Bisa Ekspor/Impor.

Tab "Matriks Kriteria": Input perbandingan kriteria. Hitung AHP untuk konsistensi.

Tab "Matriks Alternatif": Input perbandingan alternatif untuk setiap kriteria.

Tab "Hasil & Ranking": Lihat bobot prioritas kriteria dan ranking akhir dosen setelah perhitungan AHP.

Struktur Proyek
.
├── css/
│   └── styles.css          # Kustom styling (jika ada, selain Tailwind)
├── js/
│   ├── about.js            # Logika untuk bagian "About" (termasuk team cards)
│   ├── ahp.js              # Implementasi inti perhitungan AHP
│   ├── app.js              # Logika utama aplikasi, interaksi antar modul
│   ├── data.js             # Mungkin untuk data default atau manajemen data sederhana
│   ├── hierarchy.js        # Logika untuk manajemen kriteria dan alternatif di tab Setup
│   ├── matrix.js           # Logika untuk pembuatan dan pengelolaan matriks perbandingan
│   └── visualization.js    # Logika untuk visualisasi hasil (misal: grafik)
├── index.html              # Halaman HTML utama
├── README.md               # File ini
└── tailwind.config.js      # Konfigurasi kustom Tailwind CSS


Kontribusi
Kontribusi dalam bentuk laporan bug, saran fitur, atau pull request sangat dihargai.

Fork repositori.

Buat cabang fitur baru.

Lakukan perubahan.

Commit perubahan Anda.

Push ke cabang Anda.

Buka Pull Request.
