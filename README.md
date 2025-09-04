
# DENSTORE BOT WHATSAPP

Bot ini saya ciptakan agar pedagang digital produk dapat menjual barangnya secara realtime menggunakan node js beserta database mongodb


## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


# DENSTORE BOT WHATSAPP

A brief description of what this project does and who it's for

# WhatsApp Store Bot

Bot WhatsApp untuk toko online yang memungkinkan pelanggan melihat daftar produk dan melakukan pemesanan melalui WhatsApp.

## Fitur

- ✅ Menampilkan daftar produk dengan command `list`
- ✅ Menampilkan detail produk dengan mengirim nama produk
- ✅ Admin dapat menambah produk dengan command `addproduk`
- ✅ Database MongoDB untuk penyimpanan data produk
- ✅ Autentikasi WhatsApp dengan session persistence

## Persyaratan

- Node.js (v14 atau lebih tinggi)
- MongoDB (local atau Atlas)
- Akun WhatsApp (untuk bot)

## Instalasi

1. Clone repository ini:
```bash
git clone <your-repo-url>
cd whatsapp-store-bot
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env
```
Edit file `.env` dengan konfigurasi Anda.

4. Jalankan aplikasi:
```bash
npm start
```

5. Scan QR code yang muncul dengan WhatsApp Anda.

## Konfigurasi

Edit file `.env` dengan konfigurasi Anda:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp-store
SESSION_NAME=whatsapp-store-session
ADMIN_NUMBERS=6281234567890,6289876543210
STORE_NAME=My WhatsApp Store
CURRENCY=Rp
```

## Cara Penggunaan

### Untuk Pelanggan:

1. **Lihat daftar produk**: Ketik `list`
2. **Lihat detail produk**: Ketik nama produk (contoh: `netflix`)

### Untuk Admin:

1. **Tambah produk**: 
```
addproduk nama_produk kategori harga
```
Contoh: 
```
addproduk netflix 1p1u 20000
```

## Struktur Project

```
whatsapp-store-bot/
├── config/
│   └── database.js
├── handlers/
│   ├── messageHandler.js
│   └── commandHandler.js
├── models/
│   └── Product.js
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Database Schema

### Product
```javascript
{
  name: String,        // Nama produk (lowercase)
  category: String,    // Kategori produk
  price: Number,       // Harga produk
  createdAt: Date,     // Tanggal dibuat
  updatedAt: Date      // Tanggal diupdate
}
```

## Command List

| Command | Description | Example |
|---------|-------------|---------|
| `list` | Menampilkan semua produk | `list` |
| `[nama produk]` | Menampilkan detail produk | `netflix` |
| `addproduk` | Menambah produk (admin only) | `addproduk netflix 1p1u 20000` |

## Troubleshooting

### QR Code tidak muncul
- Pastikan tidak ada aplikasi WhatsApp Web yang aktif di browser

### Gagal connect ke MongoDB
- Periksa connection string di file `.env`
- Pastikan MongoDB service berjalan

### Bot tidak merespon
- Pastikan session sudah terautentikasi
- Periksa log untuk error messages

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Kontak

Putra Mahardika - [@mhrdkaa._](https://instagram.com/mhrdkaa._) - admin@uta-project.site

Project Link: [https://github.com/username/repository](https://github.com/username/repository)

## Acknowledgments

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [Mongoose](https://mongoosejs.com/)
- [Node.js](https://nodejs.org/)


## Authors

- [@utatau](https://www.github.com/utatau)


## 🔗 Sosmed
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio.uta-project.com/)
[![linkedin](https://img.shields.io/badge/x-0A66C2?style=for-the-badge&logo=X&logoColor=white)](https://www.linkedin.com/)
[![instagram](https://img.shields.io/badge/instagram-1DA1F2?style=for-the-badge&logo=instagram&logoColor=red)](https://instagram.com/mhrdkaa._)


## Feedback

If you have any feedback, please reach out to us at admin@uta-project.site

