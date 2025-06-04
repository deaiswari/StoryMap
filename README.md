# StoryMap App Project

## Deskripsi
**StoryMap** adalah aplikasi berbasis web yang memungkinkan pengguna membagikan cerita berdasarkan lokasi geografis melalui peta interaktif. Aplikasi ini menampilkan daftar cerita dari API, serta memungkinkan pengguna menambahkan cerita baru lengkap dengan gambar, koordinat lokasi, dan deskripsi.

## Prasyarat

- Node.js (disarankan versi terbaru)
- npm

## Struktur Proyek

```plaintext
storyMap App
├── package.json            # Informasi dependensi proyek
├── package-lock.json       # File lock untuk dependensi
├── README.md               # Dokumentasi proyek
├── webpack.common.js       # Konfigurasi Webpack (umum)
├── webpack.dev.js          # Konfigurasi Webpack (development)
├── webpack.prod.js         # Konfigurasi Webpack (production)
└── src                     # Direktori utama untuk kode sumber
    ├── index.html          # Berkas HTML utama
    ├── public              # Direktori aset publik
    │   ├── favicon.png     # Ikon situs
    │   └── images          # Gambar yang digunakan dalam proyek
    ├── scripts             # Direktori untuk kode JavaScript
    │   ├── data            # Folder untuk API atau sumber data
    │   ├── pages           # Halaman-halaman utama
    │   ├── routes          # Pengaturan routing
    │   ├── utils           # Helper dan utilitas
    │   ├── templates.js    # Template HTML dinamis
    │   ├── config.js       # Konfigurasi proyek
    │   └── index.js        # Entry point aplikasi
    └── styles              # File CSS
        ├── responsives.css # Gaya untuk responsivitas
        └── styles.css      # Gaya umum
```
