// ============================================================
//  SEMUA KONTEN UNDANGAN ADA DI SINI — cukup edit file ini.
//  Foto: taruh di public/images/ lalu sesuaikan path-nya.
//  Foto yang belum ada otomatis tampil sebagai placeholder.
//  (Isi di bawah adalah data CONTOH — ganti dengan data asli.)
// ============================================================
window.INVITATION = {
  // Wordmark merah di intro, layar profil & navbar
  brand: 'WEDDINGFLIX',

  couple: {
    short: ['Raka', 'Nadia'], // judul besar di billboard & penutup
    groom: {
      name: 'Raka Pratama Aditya, S.Kom.',
      parents: 'Putra kedua dari Bapak Hendra Wijaya & Ibu Sri Lestari',
      photo: 'img-undangan/61d0d79a7753b69f3e143795836a8153.jpg',
    },
    bride: {
      name: 'Nadia Putri Maharani, S.Psi.',
      parents: 'Putri pertama dari Bapak Agus Santoso & Ibu Dewi Kartika',
      photo: 'img-undangan/a843abd1f4f511a3b717402a0b48a006.jpg',
    },
  },

  // Tanggal utama (dipakai countdown "tayang perdana") — format ISO lokal
  date: '2026-12-12T08:00:00+07:00',
  dateLabel: '12 · 12 · 2026',

  cover: {
    defaultGuest: 'Tamu Undangan', // dipakai bila tidak ada ?to=Nama di URL
  },

  hero: {
    photo: 'img-undangan/45c3f0078259ab963014c4d835a8c48e.jpg',
    label: 'SERIES',                       // teks di samping huruf merah di atas judul
    rank: 'No. 1 di Pernikahan Hari Ini',  // badge Top 10 — '' untuk menyembunyikan
    match: '99% Cocok',
    year: '2026',
    rating: 'SU',
    seasons: '1 Musim',
    tagline: 'Berawal dari satu pesan, berlanjut menjadi selamanya. Saksikan kisah kami menuju episode terbaiknya. Kali ini, Anda juga ada di dalam ceritanya.',
  },

  // Panel detail di bawah billboard
  details: {
    genres: ['Romantis', 'Drama Keluarga', 'Komedi'],
    moods: ['Mengharukan', 'Hangat', 'Bikin Senyum'],
  },

  quote: {
    text: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum: 21',
  },

  // Kisah cinta = daftar episode. photo opsional (thumbnail 16:9).
  season: 'Musim 1: Kisah Kita',
  story: [
    {
      title: 'Pilot: Salah Kirim Pesan',
      year: '2019',
      photo: 'img-undangan/d0defbbc7f6b72c5f8f8f7620ad5691a.jpg',
      text: 'Semua berawal dari pesan yang salah kirim di grup kepanitiaan kampus. Bukannya canggung, obrolan itu justru berlanjut sampai larut malam.',
    },
    {
      title: 'Kopi Pertama',
      year: '2020',
      photo: 'img-undangan/a751177140d9a863db5f558a5c12d23a.jpg',
      text: 'Pertemuan pertama di sebuah kedai kopi kecil. Rencananya satu jam, kenyataannya lima jam — dan kami sama-sama tahu ini bukan pertemuan terakhir.',
    },
    {
      title: 'Jarak Bukan Alasan',
      year: '2022',
      photo: 'img-undangan/0a400eaa1f10a7e4a12e079a7f321df1.jpg',
      text: 'Pekerjaan memisahkan kota kami. Panggilan video setiap malam menjadi saksi bahwa rindu bisa dirawat, dan percaya bisa dijaga.',
    },
    {
      title: 'Season Finale: Lamaran',
      year: '2026',
      photo: 'img-undangan/0a2085c735ff185d105bef9eb93f3b47.jpg',
      text: 'Dengan restu kedua keluarga, kami resmi melangkah ke babak baru. Episode berikutnya? Seumur hidup — dan kami ingin kamu ikut menyaksikannya.',
    },
  ],

  events: [
    {
      label: 'Akad Nikah',
      date: 'Sabtu, 12 Desember 2026',
      time: '08.00 – 10.00 WIB',
      // start / end dipakai tombol "Ingatkan Saya" (Google Calendar) — kosongkan untuk menyembunyikan
      start: '2026-12-12T08:00:00+07:00',
      end: '2026-12-12T10:00:00+07:00',
      venue: 'Masjid Agung Al-Azhar',
      address: 'Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan',
      // Lokasi untuk preview peta: alamat, nama tempat, atau koordinat "lat,lng"
      mapQuery: 'Masjid Agung Al-Azhar Jakarta',
      // Link tombol "Lihat Lokasi" (opsional — kosongkan agar otomatis dari mapQuery)
      map: '',
    },
    {
      label: 'Resepsi',
      date: 'Sabtu, 12 Desember 2026',
      time: '11.00 – 14.00 WIB',
      start: '2026-12-12T11:00:00+07:00',
      end: '2026-12-12T14:00:00+07:00',
      venue: 'Balai Kartini',
      address: 'Jl. Gatot Subroto Kav. 37, Kuningan, Jakarta Selatan',
      mapQuery: 'Balai Kartini Jakarta',
      map: '',
    },
  ],

  // Galeri tampil sebagai baris "Top 10" (poster 2:3)
  gallery: [
    'img-undangan/45c3f0078259ab963014c4d835a8c48e.jpg',
    'img-undangan/d0defbbc7f6b72c5f8f8f7620ad5691a.jpg',
    'img-undangan/a751177140d9a863db5f558a5c12d23a.jpg',
    'img-undangan/6fe3e4aa5d48be2166de719e3831f568.jpg',
    'img-undangan/a843abd1f4f511a3b717402a0b48a006.jpg',
    'img-undangan/af8229644236640067d2be790fe9a79a.jpg',
    'img-undangan/0a400eaa1f10a7e4a12e079a7f321df1.jpg',
    'img-undangan/0a2085c735ff185d105bef9eb93f3b47.jpg',
    'img-undangan/61d0d79a7753b69f3e143795836a8153.jpg',
    'img-undangan/d0defbbc7f6b72c5f8f8f7620ad5691a.jpg',
  ],
  galleryCaptions: ['Di Dekatmu', 'Langkah Bersama', 'Saling Menggenggam', 'Janji Kita', 'Hari Bahagia', 'Rumah Itu Kamu', 'Perjalanan Kita', 'Selamanya', 'Di Bawah Langit', 'Awal yang Baru'],

  gift: {
    // Rekening & e-wallet — tambah / hapus baris sesuai kebutuhan.
    // type: 'bank' (Bank transfer) atau 'ewallet' (E-wallet)
    // logo: gambar di public/images/ (png/jpg/svg) — kosongkan untuk tanpa logo
    accounts: [
      { type: 'bank', name: 'BCA', number: '1234 5678 90', holder: 'Raka Pratama Aditya', logo: '' },
      { type: 'bank', name: 'Mandiri', number: '1370 0123 4567 8', holder: 'Nadia Putri Maharani', logo: '' },
      { type: 'ewallet', name: 'GoPay', number: '0812 3456 7890', holder: 'Nadia Putri Maharani', logo: '' },
    ],
    qris: '', // isi 'images/qris.png' bila sudah ada gambar QRIS
    address: 'Jl. Melati No. 12, Kebayoran Baru, Jakarta Selatan 12110',
    addressRecipient: 'Nadia Putri Maharani',
  },

  closing: 'Terima kasih sudah menonton sampai akhir. Kehadiran dan doa restu Anda adalah bagian terbaik dari kisah kami.',

  // Tag WhatsApp di footer — nomor format bebas (0812…, +62 812…, 62812…).
  // Kosongkan whatsapp ('') untuk menyembunyikan tag.
  contact: {
    whatsapp: '085920063749',
    message: 'Halo HEAVEN, saya tertarik membuat undangan digital.',
  },

  // Taruh file musik di public/audio/ (mis. 'audio/theme.mp3') — '' untuk menonaktifkan
  music: '',
};
