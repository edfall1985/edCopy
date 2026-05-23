# 🔄 Panduan Sinkronisasi Proyek via GitHub ke Localhost XAMPP (`edcopy`)

Dokumen ini memuat langkah-langkah lengkap untuk mengunggah kode Anda dari AI Studio ke penampung online **GitHub**, lalu mengambil dan menyinkronkannya (sync) secara realtime ke direktori XAMPP lokal (`C:\xampp\htdocs\edcopy`) menggunakan Terminal atau Command Prompt (CMD).

Dengan metode ini, Anda dapat memperbarui aplikasi Anda di lokal secara instan setiap kali ada perubahan pada repositori GitHub Anda.

---

## 🛠️ Bagian 1: Menyiapkan Repositori Baru di GitHub (Satu Kali Saja)

1. **Buat Akun / Masuk ke GitHub:**
   - Kunjungi [https://github.com](https://github.com) dan masuk ke akun Anda.
2. **Buat Repositori Baru:**
   - Klik tombol **"New"** atau ketuk lambang `+` di kanan atas lalu pilih **"New repository"**.
   - Beri nama repositori, contoh: `edcopy`
   - Biarkan repositori disetel sebagai **Public** atau **Private** (sesuai kenyamanan Anda).
   - **PENTING:** Jangan centang "Add a README file", "Add .gitignore", atau memilih lisensi apa pun (biarkan kosong).
   - Klik tombol **"Create repository"**.
3. **Salin URL Repositori Anda:**
   - Setelah dibuat, salin URL repositori HTTPS Anda. Formatnya berupa:
     `https://github.com/USERNAME_ANDA/edcopy.git`

---

## 📤 Bagian 2: Unggah Kode Pertama kali Dari Komputer Lokal (First Push)

Setelah Anda mengunduh paket ZIP dari Google AI Studio dan mengekstraknya di folder `C:\xampp\htdocs\edcopy\`, ikuti rangkaian perintah CMD/Terminal berikut untuk mendorong (push) seluruh aset kode Anda ke GitHub:

Buka terminal di dalam folder proyek Anda:
```bash
# 1. Pindah ke direktori proyek lokal
cd C:\xampp\htdocs\edcopy

# 2. Inisialisasi Git pada folder lokal Anda
git init

# 3. Daftarkan semua file untuk dikomit
git add .

# 4. Buat komit pertama Anda
git commit -m "Inisialisasi Pertama TulisinAI Pro"

# 5. Buat cabang utama (branch) rujukan bernama 'main'
git branch -M main

# 6. Hubungkan direktori lokal Anda dengan repositori GitHub yang baru dibuat
# (Ganti URL di bawah dengan URL yang Anda salin pada langkah Bagian 1 nomor 3)
git remote add origin https://github.com/USERNAME_ANDA/edcopy.git

# 7. Unggah seluruh kode
git push -u origin main
```

---

## 📥 Bagian 3: Sinkronisasi Otomatis (Mengambil Pembaruan dari GitHub di Masa Depan)

Apabila di kemudian hari Anda melakukan perubahan pada kode Anda di browser, mengedit file di AI Studio, atau ingin menyinkronkan data antar komputer, ikuti perintah ringkas ini lewat terminal lokal Anda.

### Cara Cepat Update Kode Lokal (Pull):
Setiap kali ada pembaruan di GitHub, cukup buka CMD/Terminal di komputer Anda dan jalankan perintah sekali ketuk ini:

```bash
cd C:\xampp\htdocs\edcopy
git pull origin main
```
*Sistem Git akan memindai berkas secara otomatis, menimpa file usang dengan file terbaru dalam hitungan detik.*

---

## 🚀 Perintah Ringkas Sekali Copas untuk Terminal (Cheat Sheet)

### Alur kerja harian Anda:

| Kebutuhan Anda | Perintah Terminal (Kopas & Jalankan) |
| :--- | :--- |
| **Memeriksa status file yang berubah** | `git status` |
| **Menyimpan perubahan lokal Anda** | `git add . && git commit -m "perbarui fitur"` |
| **Mengirim perubahan lokal ke GitHub** | `git push origin main` |
| **Mengambil kode terbaru dari GitHub** | `git pull origin main` |

---

## 📦 Menjalankan Server Anda di Lokal Sehabis Sync (npm run dev)
Ingat, karena aplikasi ini menggunakan database user lokal `users.json` dan Gemini API proxy yang aman, Anda harus selalu mengetikkan ini di CMD Anda:

```bash
cd C:\xampp\htdocs\edcopy
npm run dev
```
Buka browser Anda dan luncurkan: **`http://localhost:3000`**

---
*Kini sistem pengembangan Anda sudah profesional dan siap meluncurkan omzet penjualan tinggi!* 🚀
