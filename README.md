# 💰 CashFlow - Aplikasi Pencatatan Keuangan Pribadi

> Aplikasi web mobile-friendly untuk mencatat pemasukan & pengeluaran, melihat saldo, diagram, dan riwayat transaksi dengan dukungan tema gelap.

---

## 🇮🇩 Bahasa Indonesia

### Deskripsi
CashFlow adalah alat pencatatan keuangan pribadi berbasis web yang dirancang khusus untuk perangkat mobile. Aplikasi ini memungkinkan Anda mencatat setiap transaksi (pemasukan/pengeluaran), melihat saldo langsung (hijau jika positif, merah jika negatif), menganalisis data melalui diagram lingkaran & batang (per tanggal & per bulan), serta mengelola riwayat dengan fitur edit, hapus, dan filter.

### Fitur Utama
- ✅ **Tambah / Edit / Hapus transaksi** – dengan validasi input (keterangan wajib, jumlah bulat positif)
- 💰 **Saldo dinamis** – otomatis berubah, warna indikator sesuai kondisi
- 📊 **3 mode diagram** (tombol switch) – lingkaran (perbandingan + persen), batang per tanggal, batang per bulan
- 📜 **Riwayat lengkap** – menampilkan jenis, keterangan, jumlah (format Rupiah), waktu (hari, tanggal, bulan, tahun, jam)
- 🔍 **Filter history** – berdasarkan jenis (semua, pemasukan, pengeluaran)
- 🌙 **Tema gelap** – toggle dengan penyimpanan preferensi
- 💾 **Penyimpanan lokal (LocalStorage)** – data tetap tersedia meskipun halaman di-refresh
- 📱 **Mobile-first & responsif** – nyaman digunakan di ponsel

### Teknologi yang Digunakan
- HTML5, CSS3 (Flexbox, Grid, Media Queries)
- JavaScript (ES6)
- [Chart.js](https://www.chartjs.org/) (v3.9.1) – untuk diagram
- [Font Awesome 6](https://fontawesome.com/) – ikon
- LocalStorage API

### Cara Menjalankan
1. Unduh semua file: `index.html`, `style.css`, `script.js`.
2. Pastikan ketiga file berada dalam folder yang sama.
3. Buka file `index.html` menggunakan browser modern (Chrome, Firefox, Safari, Edge).
4. Aplikasi siap digunakan offline (setelah muatan awal CDN berhasil sekali).

> **Catatan**: Koneksi internet diperlukan saat pertama kali membuka untuk mengambil library Chart.js dan Font Awesome. Setelah itu, aplikasi dapat berjalan offline.

### Struktur Proyek
cashflow/
├── index.html      # Kerangka HTML
├── style.css       # Semua gaya (termasuk dark mode & responsif)
└── script.js       # Logika aplikasi (CRUD, diagram, localStorage)

### Contoh Penggunaan
1. **Menambah pemasukan**: Pilih "Pemasukan" → isi keterangan "Gaji" → jumlah 5000000 → klik "Tambah Transaksi". Saldo langsung berubah hijau.
2. **Menambah pengeluaran**: Pilih "Pengeluaran" → keterangan "Makan" → jumlah 75000 → klik "Tambah Transaksi".
3. **Melihat diagram**: Gunakan tombol switch di atas diagram untuk beralih tampilan lingkaran atau batang.
4. **Mengedit transaksi**: Klik ikon pensil di history → ubah data → klik "Update Transaksi".
5. **Menghapus**: Klik ikon tempat sampah → konfirmasi "OK".
6. **Filter**: Pilih "Pemasukan saja" di dropdown filter history.
7. **Tema gelap**: Klik ikon bulan di pojok kanan atas.

### Kontribusi
Silakan lakukan fork atau modifikasi sesuai kebutuhan. Jika menemukan bug, laporkan melalui issue (jika repositori publik).

### Lisensi
MIT License – bebas digunakan, dimodifikasi, dan didistribusikan.

---

## 🇬🇧 English

### Description
CashFlow is a mobile-friendly web application for recording personal income and expenses. It allows you to track every transaction, view your current balance (green if positive, red if negative), analyze data through pie and bar charts (by date & month), and manage transaction history with edit, delete, and filter features.

### Key Features
- ✅ **Add / Edit / Delete transactions** – with input validation (description required, positive integer amount)
- 💰 **Dynamic balance** – updates automatically, color‑coded indicator
- 📊 **3 chart modes** (switch buttons) – pie (comparison + percentages), bar by date, bar by month
- 📜 **Full history** – shows type, description, amount (Rupiah formatted), timestamp (day, date, month, year, time)
- 🔍 **History filter** – by type (all, income, expense)
- 🌙 **Dark theme** – toggle with preference saved in LocalStorage
- 💾 **LocalStorage persistence** – data remains after page refresh
- 📱 **Mobile‑first & responsive** – comfortable to use on phones

### Technologies Used
- HTML5, CSS3 (Flexbox, Grid, Media Queries)
- JavaScript (ES6)
- [Chart.js](https://www.chartjs.org/) (v3.9.1) – for charts
- [Font Awesome 6](https://fontawesome.com/) – icons
- LocalStorage API

### How to Run
1. Download all files: `index.html`, `style.css`, `script.js`.
2. Make sure the three files are in the same folder.
3. Open `index.html` with a modern browser (Chrome, Firefox, Safari, Edge).
4. The app is ready to use offline (after initial CDN loading).

> **Note**: An internet connection is required on first launch to fetch Chart.js and Font Awesome. After that, the app works offline.

### Project Structure
cashflow/
├── index.html      # HTML structure
├── style.css       # All styles (dark mode & responsive)
└── script.js       # App logic (CRUD, charts, localStorage)

### Usage Example
1. **Add income**: Select "Pemasukan" → description "Salary" → amount 5000000 → click "Tambah Transaksi". Balance turns green.
2. **Add expense**: Select "Pengeluaran" → description "Lunch" → amount 75000 → click "Tambah Transaksi".
3. **View charts**: Use the switch buttons above the chart area to toggle between pie, date bar, or month bar view.
4. **Edit transaction**: Click the pencil icon in history → modify data → click "Update Transaksi".
5. **Delete**: Click the trash icon → confirm "OK".
6. **Filter**: Choose "Pemasukan saja" (only income) from the history filter dropdown.
7. **Dark theme**: Click the moon icon in the top right corner.

### Contribution
Feel free to fork or modify as needed. If you find a bug, please open an issue (if a public repository).

### License
MIT License – free to use, modify, and distribute.

---

✨ *Happy tracking your cash flow!* ✨
