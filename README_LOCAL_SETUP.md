# 📖 Panduan Instalasi Lokal (Localhost): `edcopy`
Aplikasi ini dikembangkan menggunakan arsitektur **Full-Stack (React + Node.js Express)**. 

Karena aplikasi ini menggunakan backend Node.js untuk menjaga keamanan **Gemini API Key**, Anda **tidak bisa** hanya menyalin file HTML biasa ke dalam Apache XAMPP tanpa menjalankan runtime Node.js.

Berikut adalah 2 opsi terbaik untuk menjalankan aplikasi ini di komputer lokal Anda (localhost) di folder `C:\xampp\htdocs\edcopy` (atau folder htdocs sistem operasi Anda):

---

## Opsi A: Menggunakan Runtime Node.js Penuh (SANGAT DIREKOMENDASIKAN)
Metode ini adalah cara termudah dan tercepat karena server backend Node.js internal kami yang menangani server web dan koneksi API Gemini secara terpadu.

### Langkah-langkah:
1. **Unduh Seluruh Kode Proyek:**
   Ekspor proyek ini dari Google AI Studio sebagai berkas ZIP, lalu ekstrak langsung ke dalam folder:
   `C:\xampp\htdocs\edcopy\`
   *(Pastikan file seperti `package.json`, `server.ts`, dan folder `src` terletak langsung di dalam folder tersebut).*

2. **Instal Node.js:**
   Pastikan Anda sudah menginstal Node.js di komputer Anda. Jika belum, unduh dan instal versi LTS dari:
   👉 [https://nodejs.org/](https://nodejs.org/)

3. **Buka Terminal / Command Prompt (CMD):**
   Arahkan terminal ke direktori proyek tersebut:
   ```bash
   cd C:\xampp\htdocs\edcopy
   ```

4. **Instal Dependensi NPM:**
   Jalankan perintah berikut untuk menginstal semua pustaka yang dibutuhkan:
   ```bash
   npm install
   ```

5. **Konfigurasi API Key Gemini (.env):**
   - Buat sebuah berkas baru dengan nama `.env` di dalam folder `C:\xampp\htdocs\edcopy\`
   - Masukkan baris berikut (Ganti dengan kunci API Gemini Anda dari Google AI Studio):
     ```env
     GEMINI_API_KEY="ISI_DENGAN_API_KEY_GEMINI_ANDA"
     ```

6. **Jalankan Server Development:**
   Mulai server web lokal berserta pendukung pengembangan:
   ```bash
   npm run dev
   ```
   Aplikasi Anda kini dapat diakses langsung melalui peramban (browser) di alamat:
   👉 **`http://localhost:3000`**

---

## Opsi B: Memasangkan dengan Apache XAMPP (Port 80)
Jika Anda bersikeras ingin mengakses aplikasi ini melalui URL bawaan XAMPP (`http://localhost/edcopy`), Anda harus membagi aplikasi menjadi dua bagian: **Vite Static Build** disajikan oleh Apache di Port 80, dan **Express Server** dijalankan di lokal untuk menangani API di Port 3000.

### Langkah-langkah:
1. **Bangun Versi Statis (React Build):**
   Pada folder `C:\xampp\htdocs\edcopy\`, jalankan perintah berikut untuk mengonversi kode React menjadi HTML/CSS statis:
   ```bash
   npm run build
   ```
   Ini akan menghasilkan folder baru bernama `dist/`.

2. **Salin Konten ke Apache htdocs:**
   - Salin semua file dari dalam folder `C:\xampp\htdocs\edcopy\dist\` langsung ke folder utama `C:\xampp\htdocs\edcopy\`.
   - File default XAMPP seperti `index.html` dari hasil build sekarang siap diakses melalui Apache.

3. **Pastikan Web Server Apache XAMPP Menyala:**
   Buka XAMPP Control Panel dan klik tombol **Start** pada modul **Apache**.

4. **Koneksi backend ke API:**
   Karena frontend HTML statis di `http://localhost/edcopy` perlu menembak server API Node.js di `http://localhost:3000`, pastikan Anda menyesuaikan alamat fetch API dalam kode frontend Anda dari `/api/generate` menjadi `http://localhost:3000/api/generate` (Jangan lupa aktifkan sistem CORS pada `server.ts` jika Anda menembak port yang berbeda).
   Jalankan server Node.js di background untuk melayani permintaan API:
   ```bash
   node dist/server.cjs
   ```

---

## 🔑 Cara Mendapatkan Kunci API (GEMINI_API_KEY) jika belum punya:
1. Kunjungi [Google AI Studio](https://aistudio.google.com/).
2. Masuk menggunakan akun Google Anda.
3. Klik tombol **"Get API Key"** di panel samping kiri.
4. Salin kunci unik tersebut dan simpan di file `.env` lokal Anda seperti yang dijelaskan di atas.

---
*Siap digunakan untuk melipatgandakan penghasilan copywriting brand lokal Anda!* 🚀
