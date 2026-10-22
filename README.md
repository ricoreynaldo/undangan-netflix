# undangan-netflix

Undangan pernikahan digital bertema Netflix. Arsitektur sama dengan `undangan-lintang`:
frontend vanilla di `public/`, server statis Express, RSVP & ucapan di Firebase Firestore.

## Alur tampilan

1. Intro monogram merah (gaya "ta-dum").
2. Layar **Siapa yang menonton?** — profil tamu (`?to=Nama`) + profil kedua mempelai.
3. Billboard sinematik (judul = nama mempelai, badge Top 10, meta, countdown "tayang perdana").
4. **Pilihan untuk tamu** (katalog horizontal), **Top 10 Momen** (galeri poster),
   detail (ayat, genre), **Pemeran** (mempelai), **Episode** (kisah cinta),
   **Jadwal Tayang** (acara + peta + Ingatkan Saya),
   **Ulasan** (RSVP + guestbook), **Kirim Hadiah**, penutup.

## Mengedit konten

Semua teks, tanggal, foto, rekening ada di `public/js/config.js`.
Foto ditaruh di `public/images/` — file yang belum ada tampil sebagai placeholder.
Foto contoh lokal sudah disertakan dari aset template undangan di workspace.
Ganti dengan foto mempelai; judul tiap poster bisa diatur lewat `galleryCaptions`.
Avatar di navbar membuka kembali pilihan profil. Setiap kartu katalog menuju
bagian undangan terkait; galeri mendukung tombol panah, Escape, dan navigasi keyboard.
Musik: taruh file di `public/audio/` lalu isi `music` di config.

## Firebase

1. Buat project Firebase + Firestore, salin config web ke `public/js/firebase-config.js`.
2. Publish `firestore.rules` (`firebase deploy --only firestore:rules`).

Selama `apiKey` masih `ISI_...`, RSVP berjalan dalam **mode demo** (tersimpan di
localStorage perangkat sendiri, tidak terlihat tamu lain).

## Menjalankan

```bash
npm install
npm start
```

Buka http://localhost:3052/?to=Budi+Santoso
