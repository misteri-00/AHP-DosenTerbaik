Sistem Pendukung Keputusan AHP: Penentuan Dosen Terbaik STMIK Primakara
Sebuah aplikasi web sederhana yang mengimplementasikan metode Analytical Hierarchy Process (AHP) untuk membantu dalam pengambilan keputusan multi-kriteria dalam menentukan dosen terbaik di STMIK Primakara.

Tentang Proyek
Proyek ini adalah sistem pendukung keputusan berbasis web yang dirancang untuk mempermudah proses evaluasi dan penentuan dosen terbaik berdasarkan beberapa kriteria menggunakan metode AHP. Dengan antarmuka yang intuitif, pengguna dapat mendefinisikan tujuan, kriteria, dan alternatif, melakukan perbandingan berpasangan, menghitung bobot prioritas, dan melihat hasil ranking secara transparan dan akurat.

Tujuan utama dari sistem ini adalah menyediakan alat yang objektif dan terstruktur untuk mendukung pengambilan keputusan dalam proses penilaian dosen, memastikan konsistensi dalam penilaian.
Teknologi yang Digunakan
- HTML5: Struktur dasar halaman web.
- Tailwind CSS: Untuk styling dan antarmuka pengguna yang responsif.
- JavaScript: Logika inti untuk perhitungan AHP, manajemen data, interaksi UI, dan visualisasi.

Fitur
  Setup Hierarki:
    - Definisi tujuan keputusan (misal: "Menentukan Dosen Terbaik STMIK Primakara").
    - Manajemen kriteria penilaian (tambah, edit, hapus kriteria seperti Pendidikan, Penelitian, Pengabdian Masyarakat, Kegiatan Penunjang).
    - Manajemen alternatif (tambah, edit, hapus dosen sebagai alternatif).
    - Fungsionalitas Ekspor dan Impor data hierarki (dalam format JSON).
  
  Matriks Kriteria:
    - Input perbandingan berpasangan untuk kriteria berdasarkan skala Saaty.
    - Perhitungan otomatis kebalikannya.
    - Menampilkan hasil konsistensi (λ Max, CI, CR) dan status konsistensi.
  
  Matriks Alternatif:
    -Generasi otomatis matriks perbandingan berpasangan untuk setiap alternatif di bawah setiap kriteria.
    -Input nilai perbandingan untuk setiap pasangan alternatif.
    - Perhitungan konsistensi untuk setiap matriks alternatif.
  
  Hasil & Ranking:
    - Menampilkan bobot prioritas kriteria.
    - Menampilkan ranking akhir dosen berdasarkan perhitungan AHP.
    - Visualisasi hasil dalam bentuk grafik (jika diimplementasikan dengan library chart seperti Chart.js atau D3.js).
    
  Kontrol Utama:
    - Tombol untuk memuat data default.
    - Tombol untuk menghitung AHP secara keseluruhan.
    - Tombol untuk mereset matriks.
    - Tombol untuk memvalidasi hierarki.

Antarmuka Responsif: Dirancang dengan Tailwind CSS untuk tampilan yang baik di berbagai ukuran layar.

Ikuti langkah-langkah ini untuk menjalankan aplikasi di lingkungan lokal Anda.
Prasyarat
Hanya membutuhkan browser web modern.
Instalasi
1.	Clone repositori:
2.	git clone https://github.com/misteri-00/AHP-DosenTerbaik.git
3.	Buka file index.html di browser Anda.
   
Penggunaan
1.	Tab "About": Informasi proyek dan tim.
2.	Tab "Setup Hierarki": Definisikan tujuan, kelola kriteria dan alternatif. Bisa Ekspor/Impor.
3.	Tab "Matriks Kriteria": Input perbandingan kriteria. Hitung AHP untuk konsistensi.
4.	Tab "Matriks Alternatif": Input perbandingan alternatif untuk setiap kriteria.
5.	Tab "Hasil & Ranking": Lihat bobot prioritas kriteria dan ranking akhir dosen setelah perhitungan AHP.

