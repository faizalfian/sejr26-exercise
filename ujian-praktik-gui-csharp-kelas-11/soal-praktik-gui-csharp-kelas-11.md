# BANK SOAL UJIAN PRAKTIK PEMROGRAMAN GUI DESKTOP (.NET C#)
**Tingkat / Jurusan :** Kelas XI / Rekayasa Perangkat Lunak (RPL)  
**Mata Pelajaran :** Pemrograman Perangkat Bergerak & Desktop (Windows Forms)  
**Waktu Pengerjaan :** 90 – 120 Menit  
**Fokus Evaluasi :** Perancangan Tampilan GUI (*Layouting*, Kontrol Standar, *TabIndex*, & *Anchor*)

---

## 📦 DAFTAR PAKET SOAL UJIAN

1. **Paket A : GreenSchool — Sistem Bank Sampah Digital**
2. **Paket B : LabTrack — Sistem Peminjaman Fasilitas & Alat Lab Komputer**
3. **Paket C : SmartCanteen — Sistem Kasir Pemesanan Kantin Digital Sekolah**

---

# 📦 PAKET A: GREENSCHOOL — BANK SAMPAH DIGITAL

### Form 1: Login Petugas Loket (`FrmLogin.cs`)

#### 1. Tata Letak (Wireframe Layout)
```text
+--------------------------------------------------------------+
| [X] Login Petugas — GreenSchool Bank Sampah             _  X |
+--------------------------------------------------------------+
|                                                              |
|        [ ICON / LOGO ECO BANK GREEN ]                        |
|           GREENSCHOOL BANK SAMPAH                            |
|     "Kelola Sampah, Wujudkan Lingkungan Bersih"              |
|  ----------------------------------------------------------  |
|                                                              |
|   Nama Pengguna (Username):                                  |
|   [ txtUsername                                            ] |
|                                                              |
|   Kata Sandi (Password):                                     |
|   [ txtPassword                                            ] |
|                                                              |
|   Peran / Hak Akses:                                         |
|   [ cmbRole  (V Petugas Loket Penimbangan)                 ] |
|                                                              |
|   [x] Ingat Akun Saya pada Perangkat Ini (chkIngatSaya)      |
|                                                              |
|   [      MASUK SISTEM      ]   [      BATAL      ]           |
|         (btnLogin)                    (btnBatal)             |
|                                                              |
|   Lupa kata sandi? Hubungi Pembina Lab GreenTech (lblBantuan)|
|                                                              |
+--------------------------------------------------------------+
```

#### 2. Perintah Pengerjaan Form 1
1. **Nama Form :** `FrmLogin.cs`
2. **Properti Form :**
   - `Text = "Login Petugas — GreenSchool Bank Sampah"`
   - `Size = 420, 500`
   - `StartPosition = CenterScreen`
   - `FormBorderStyle = FixedDialog`
   - `MaximizeBox = False`, `MinimizeBox = True`
   - `AcceptButton = btnLogin`, `CancelButton = btnBatal`
3. **Kontrol & Pengaturan :**
   - `picLogo` (PictureBox): `SizeMode = Zoom`, ikon daur ulang.
   - `txtUsername` (TextBox): `MaxLength = 30`.
   - `txtPassword` (TextBox): `UseSystemPasswordChar = True`.
   - `cmbRole` (ComboBox): `DropDownStyle = DropDownList` (*Petugas Loket Penimbangan, Koordinator Bank Sampah, Administrator Sekolah*).
   - `chkIngatSaya` (CheckBox): `Text = "Ingat Akun Saya pada Perangkat Ini"`.
   - `btnLogin` (Button): `Text = "Masuk Sistem"` (warna hijau).
   - `btnBatal` (Button): `Text = "Batal"`, `DialogResult = Cancel`.
   - `lblBantuan` (LinkLabel): Teks bantuan lupa kata sandi.
4. **Urutan TabIndex :** `txtUsername (1) -> txtPassword (2) -> cmbRole (3) -> chkIngatSaya (4) -> btnLogin (5) -> btnBatal (6) -> lblBantuan (7)`.

---

### Form 2: Form CRUD Data Setoran Sampah (`FrmDataSetoran.cs`)

#### 1. Tata Letak (Wireframe Layout)
```text
+--------------------------------------------------------------------------------------------------+
| [X] Kelola Data Setoran Sampah Siswa — GreenSchool Bank Sampah                          _ [] X   |
+--------------------------------------------------------------------------------------------------+
| [Menu: File | Transaksi | Laporan | Bantuan]                                                     |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| [ GroupBox: Formulir Entri Data Setoran Sampah (grpEntriData) ]                                  |
| +----------------------------------------------------------------------------------------------+ |
| | Kode Setor : [ txtKodeSetor (ReadOnly) ] Tanggal Setor : [ dtpTanggalSetor (DateTimePicker)] | |
| | NIS Siswa  : [ txtNIS                  ] Jenis Sampah  : [ cmbJenisSampah (Dropdown)       ] | |
| | Nama Siswa : [ txtNamaSiswa            ] Berat (Kg)    : [ numBerat (NumericUpDown 0.5-50) ] | |
| | Kelas      : [ cmbKelas (Dropdown)     ] Total Nilai   : [ txtTotalNilai (ReadOnly, Right) ] | |
| |                                                                                              | |
| | Opsi Penyaluran Dana:                                                                        | |
| | (o) Disimpan ke Buku Tabungan Siswa (rdoTabungan)                                            | |
| | ( ) Disedekahkan ke Kas Donasi Sekolah (rdoDonasi)                                           | |
| +----------------------------------------------------------------------------------------------+ |
|                                                                                                  |
| [ Panel Aksi Tombol (pnlAksi) ]                                                                  |
| [ + TAMBAH BARU ]   [ SIMPAN DATA ]   [ UBAH ]   [ HAPUS ]   [ BATAL / BERSIHKAN ]               |
|   (btnTambah)         (btnSimpan)     (btnUbah)  (btnHapus)       (btnBatal)                     |
|                                                                                                  |
| [ GroupBox: Riwayat Transaksi & Pencarian Data (grpTabel) ]                                      |
| +----------------------------------------------------------------------------------------------+ |
| | Cari Data: [ txtCari                 ]  Kategori: [ cmbFilterKategori ]  [ CARI ]            | |
| |                                                                          (btnCari)           | |
| | [ DataGridView: dgvSetoranSampah ]                                                           | |
| | +-----+----------+------------+--------+------------+---------------+--------+---------+---+ | |
| | | No  | Kode     | Tanggal    | NIS    | Nama Siswa | Jenis Sampah  | Berat  | Total Rp|Ops| | |
| | +-----+----------+------------+--------+------------+---------------+--------+---------+---+ | |
| | | 1   | BS-001   | 05/10/2026 | 102401 | Rizky P.   | Botol Plastik | 3.5 kg | 10.500  |Tab| | |
| | | 2   | BS-002   | 05/10/2026 | 102415 | Siti A.    | Kardus Bekas  | 8.0 kg | 16.000  |Don| | |
| | | 3   | BS-003   | 05/10/2026 | 102422 | Budi S.    | Minyak Jelanta| 2.0 kg | 14.000  |Tab| | |
| | +-----+----------+------------+--------+------------+---------------+--------+---------+---+ | |
| +----------------------------------------------------------------------------------------------+ |
|                                                                                                  |
| [ StatusStrip: Petugas: Ahmad Fauzi | Status: Siap Melayani | 05/10/2026 | v1.0 ]                |
+--------------------------------------------------------------------------------------------------+
```

#### 2. Perintah Pengerjaan Form 2
1. **Nama Form :** `FrmDataSetoran.cs`
2. **Properti Form :** `Text = "Kelola Data Setoran Sampah Siswa — GreenSchool Bank Sampah"`, `Size = ~980, 680`, `StartPosition = CenterScreen`.
3. **Navigasi & Kontainer :**
   - `menuStrip1`: Menu File, Transaksi, Laporan, Bantuan.
   - `grpEntriData`: GroupBox form input.
   - `pnlAksi`: Panel wadah tombol aksi CRUD.
   - `grpTabel`: GroupBox tabel dan pencarian.
   - `statusStrip1`: 4 item status label.
4. **Kontrol Entri (`grpEntriData`) :**
   - `txtKodeSetor` (ReadOnly, warna abu-abu).
   - `txtNIS` (MaxLength 10) & `txtNamaSiswa` (MaxLength 50).
   - `cmbKelas` (DropDownList kelas).
   - `dtpTanggalSetor` (DateTimePicker format Short).
   - `cmbJenisSampah` (DropDownList jenis & tarif sampah).
   - `numBerat` (NumericUpDown desimal 1 digit, 0.1 - 100.0).
   - `txtTotalNilai` (ReadOnly, Right, Bold).
5. **Ketentuan & Ukuran Panel Tombol Aksi (`pnlAksi`) :**
   - **Tipe & Nama Kontrol:** `Panel`, `Name = pnlAksi`
   - **Ukuran (Size):** `940, 50` piksel (Lebar: 940 px, Tinggi: 50 px)
   - **Posisi (Location):** `X: 18, Y: 275`
   - **Properti:** `BorderStyle = FixedSingle`, `BackColor = SystemColors.ControlLight`, `Anchor = Top, Left, Right`
   - **Ukuran Tombol di Dalamnya:** `Size = 130, 32` piksel, jarak antar-tombol 8–10 piksel, tombol `btnBatal` diletakkan di sisi paling kanan panel.
   - **Daftar Tombol:** `btnTambah` (`"➕ Tambah Baru"`), `btnSimpan` (`"💾 Simpan Data"`), `btnUbah` (`"✏️ Ubah"`), `btnHapus` (`"🗑️ Hapus"`), `btnBatal` (`"🔄 Batal / Bersihkan"`).
6. **Tabel & Cari (`grpTabel`) :**
   - Pencarian: `txtCari`, `cmbFilterKategori`, `btnCari`.
   - `dgvSetoranSampah`: ReadOnly = True, FullRowSelect, AllowUserToAddRows = False, minimal 7-10 kolom, 3 baris sampel.
7. **TabIndex, Naming & Anchor :** Naming convention standar (`txt`, `btn`, `cmb`, `num`, `dtp`, `dgv`). TabIndex sekuensial. Anchor responsif pada GroupBox dan GridView.

---

# 🔬 PAKET B: LABTRACK — PEMINJAMAN ALAT LAB KOMPUTER

### Form 1: Login Petugas Lab (`FrmLoginPetugas.cs`)

#### 1. Tata Letak (Wireframe Layout)
```text
+--------------------------------------------------------------+
| [X] Login Petugas Lab — LabTrack Komputer               _  X |
+--------------------------------------------------------------+
|                                                              |
|        [ ICON HARDWARE / MIKROSKOP IT ]                      |
|           LABTRACK SYSTEM RPL                                |
|     "Pengelolaan Fasilitas & Alat Praktik Kejuruan"          |
|  ----------------------------------------------------------  |
|                                                              |
|   Nama Pengguna (Username Teknisi):                          |
|   [ txtUsername                                            ] |
|                                                              |
|   Kata Sandi (Password):                                     |
|   [ txtPassword                                            ] |
|                                                              |
|   Jadwal Tugas / Shift Kerja:                                |
|   [ cmbShift (V Sesi Pagi 07.00 - 12.00 WIB)               ] |
|                                                              |
|   [x] Saya telah memeriksa kondisi fisik lab (chkKondisiLab) |
|                                                              |
|   [      MASUK SISTEM      ]   [      BATAL      ]           |
|         (btnLogin)                    (btnBatal)             |
|                                                              |
|   Kendala akses akun? Hubungi Kepala Bengkel RPL (lblBantuan)|
|                                                              |
+--------------------------------------------------------------+
```

#### 2. Perintah Pengerjaan Form 1
1. **Nama Form :** `FrmLoginPetugas.cs`
2. **Properti Form :**
   - `Text = "Login Petugas Lab — LabTrack Komputer"`
   - `Size = 420, 500`
   - `StartPosition = CenterScreen`
   - `FormBorderStyle = FixedDialog`
   - `MaximizeBox = False`, `MinimizeBox = True`
   - `AcceptButton = btnLogin`, `CancelButton = btnBatal`
3. **Kontrol & Pengaturan :**
   - `picLogo` (PictureBox): `SizeMode = Zoom`, ikon hardware / laboratorium IT.
   - `txtUsername` (TextBox): `MaxLength = 30`.
   - `txtPassword` (TextBox): `UseSystemPasswordChar = True`.
   - `cmbShift` (ComboBox): `DropDownStyle = DropDownList` (*Sesi Pagi 07.00 - 12.00, Sesi Siang 12.30 - 16.00, Petugas Khusus Uji Kompetensi*).
   - `chkKondisiLab` (CheckBox): `Text = "Saya telah memeriksa kondisi fisik lab sebelum bertugas"`.
   - `btnLogin` (Button): `Text = "Masuk Sistem"` (warna biru/kontras).
   - `btnBatal` (Button): `Text = "Batal"`, `DialogResult = Cancel`.
   - `lblBantuan` (LinkLabel): Teks bantuan kontak Kepala Bengkel RPL.
4. **Urutan TabIndex :** `txtUsername (1) -> txtPassword (2) -> cmbShift (3) -> chkKondisiLab (4) -> btnLogin (5) -> btnBatal (6) -> lblBantuan (7)`.

---

### Form 2: Form CRUD Peminjaman Alat Lab (`FrmPeminjamanAlat.cs`)

#### 1. Tata Letak (Wireframe Layout)
```text
+--------------------------------------------------------------------------------------------------+
| [X] Peminjaman Alat Praktik Lab — LabTrack Komputer                                     _ [] X   |
+--------------------------------------------------------------------------------------------------+
| [Menu: File | Peminjaman | Inventaris | Bantuan]                                                 |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| [ GroupBox: Formulir Peminjaman Fasilitas & Alat Lab (grpEntriData) ]                            |
| +----------------------------------------------------------------------------------------------+ |
| | No Pinjam  : [ txtKodePinjam (ReadOnly)] Tanggal Pinjam : [ dtpTanggalPinjam (DateTimePicker)] |
| | NIS Siswa  : [ txtNIS                  ] Pilihan Alat   : [ cmbNamaAlat (Dropdown)         ] | |
| | Nama Siswa : [ txtNamaSiswa            ] Durasi (Jam)   : [ numDurasi (NumericUpDown 1-8 Jam)| |
| | Kelas      : [ cmbKelas (Dropdown)     ] Biaya/Jaminan  : [ txtBiayaJaminan (ReadOnly, Rp) ] | |
| |                                                                                              | |
| | Tujuan / Keperluan Praktik:                                                                  | |
| | (o) Praktik Tugas Mandiri (rdoPraktikMandiri)                                                | |
| | ( ) Proyek Tim / Kelompok (rdoTugasKelompok)                                                 | |
| +----------------------------------------------------------------------------------------------+ |
|                                                                                                  |
| [ Panel Aksi Tombol (pnlAksi) ]                                                                  |
| [ + TAMBAH BARU ]   [ SIMPAN DATA ]   [ UBAH ]   [ HAPUS ]   [ BATAL / BERSIHKAN ]               |
|   (btnTambah)         (btnSimpan)     (btnUbah)  (btnHapus)       (btnBatal)                     |
|                                                                                                  |
| [ GroupBox: Daftar Peminjaman Aktif & Pencarian Data (grpTabel) ]                                |
| +----------------------------------------------------------------------------------------------+ |
| | Cari Data: [ txtCari                 ]  Kategori: [ cmbFilterKategori ]  [ CARI ]            | |
| |                                                                          (btnCari)           | |
| | [ DataGridView: dgvPeminjamanAlat ]                                                          | |
| | +-----+----------+------------+--------+------------+---------------+--------+---------+---+ | |
| | | No  | No Pinjam| Tanggal    | NIS    | Peminjam   | Nama Alat     | Durasi | Biaya Rp|Kep| | |
| | +-----+----------+------------+--------+------------+---------------+--------+---------+---+ | |
| | | 1   | LAB-025  | 06/10/2026 | 102402 | Anisa R.   | Drawing Tablet| 2 Jam  | 10.000  |Mnd| | |
| | | 2   | LAB-026  | 06/10/2026 | 102418 | Bagas P.   | Arduino Kit   | 4 Jam  | 16.000  |Klp| | |
| | | 3   | LAB-027  | 06/10/2026 | 102431 | Cindy C.   | Mic Podcast   | 2 Jam  | 10.000  |Klp| | |
| | +-----+----------+------------+--------+------------+---------------+--------+---------+---+ | |
| +----------------------------------------------------------------------------------------------+ |
|                                                                                                  |
| [ StatusStrip: Teknisi: Hendro Wibowo | Status: Lab Normal | 06/10/2026 | v2.0 ]                 |
+--------------------------------------------------------------------------------------------------+
```

#### 2. Perintah Pengerjaan Form 2
1. **Nama Form :** `FrmPeminjamanAlat.cs`
2. **Properti Form :** `Text = "Peminjaman Alat Praktik Lab — LabTrack Komputer"`, `Size = ~980, 680`, `StartPosition = CenterScreen`.
3. **Navigasi & Kontainer :**
   - `menuStrip1`: Menu File, Peminjaman, Inventaris, Bantuan.
   - `grpEntriData`: GroupBox form peminjaman.
   - `pnlAksi`: Panel wadah tombol aksi.
   - `grpTabel`: GroupBox tabel riwayat peminjaman & pencarian.
   - `statusStrip1`: 4 item status label di dasar form.
4. **Kontrol Entri (`grpEntriData`) :**
   - `txtKodePinjam` (ReadOnly, warna abu-abu).
   - `txtNIS` (MaxLength 10) & `txtNamaSiswa` (MaxLength 50).
   - `cmbKelas` (DropDownList kelas).
   - `dtpTanggalPinjam` (DateTimePicker format Short).
   - `cmbNamaAlat` (DropDownList: *Drawing Tablet Wacom, VR Headset Oculus, Arduino & Sensor Kit, Webcam & Mic Podcast, Laptop Asus ROG*).
   - `numDurasi` (NumericUpDown bulat, 1 - 8 jam).
   - `txtBiayaJaminan` (ReadOnly, Right, Bold).
5. **Ketentuan & Ukuran Panel Tombol Aksi (`pnlAksi`) :**
   - **Tipe & Nama Kontrol:** `Panel`, `Name = pnlAksi`
   - **Ukuran (Size):** `940, 50` piksel (Lebar: 940 px, Tinggi: 50 px)
   - **Posisi (Location):** `X: 18, Y: 275`
   - **Properti:** `BorderStyle = FixedSingle`, `BackColor = SystemColors.ControlLight`, `Anchor = Top, Left, Right`
   - **Ukuran Tombol di Dalamnya:** `Size = 130, 32` piksel, jarak antar-tombol 8–10 piksel, tombol `btnBatal` diletakkan di sisi paling kanan panel.
   - **Daftar Tombol:** `btnTambah` (`"➕ Tambah Baru"`), `btnSimpan` (`"💾 Simpan Data"`), `btnUbah` (`"✏️ Ubah"`), `btnHapus` (`"🗑️ Hapus"`), `btnBatal` (`"🔄 Batal / Bersihkan"`).
6. **Tabel & Cari (`grpTabel`) :**
   - Pencarian: `txtCari`, `cmbFilterKategori`, `btnCari`.
   - `dgvPeminjamanAlat`: ReadOnly = True, FullRowSelect, AllowUserToAddRows = False, minimal 7-10 kolom, 3 baris sampel.
7. **TabIndex, Naming & Anchor :** Naming convention standar (`txt`, `btn`, `cmb`, `num`, `dtp`, `dgv`). TabIndex sekuensial. Anchor responsif pada GroupBox dan GridView.

---

# 🍽️ PAKET C: SMARTCANTEEN — KASIR KANTIN DIGITAL

### Form 1: Login Kasir Kantin (`FrmLoginKasir.cs`)

#### 1. Tata Letak (Wireframe Layout)
```text
+--------------------------------------------------------------+
| [X] Login Kasir — SmartCanteen Sekolah                  _  X |
+--------------------------------------------------------------+
|                                                              |
|        [ ICON MAKANAN SEHAT / KANTIN ]                       |
|           SMARTCANTEEN SEKOLAH                               |
|     "Layanan Pemesanan Makanan Sehat & Higienis Siswa"       |
|  ----------------------------------------------------------  |
|                                                              |
|   Nama Pengguna (Username Kasir):                            |
|   [ txtUsername                                            ] |
|                                                              |
|   Kata Sandi (Password PIN):                                 |
|   [ txtPassword                                            ] |
|                                                              |
|   Pilihan Loket Penjualan:                                   |
|   [ cmbLoket (V Loket 1 — Makanan Utama & Nasi)            ] |
|                                                              |
|   [x] Aktifkan transaksi sesi istirahat (chkBukaSesi)        |
|                                                              |
|   [      MASUK SISTEM      ]   [      BATAL      ]           |
|         (btnLogin)                    (btnBatal)             |
|                                                              |
|   Kendala PIN kasir? Hubungi Manajer Koperasi (lblBantuan)   |
|                                                              |
+--------------------------------------------------------------+
```

#### 2. Perintah Pengerjaan Form 1
1. **Nama Form :** `FrmLoginKasir.cs`
2. **Properti Form :**
   - `Text = "Login Kasir — SmartCanteen Sekolah"`
   - `Size = 420, 500`
   - `StartPosition = CenterScreen`
   - `FormBorderStyle = FixedDialog`
   - `MaximizeBox = False`, `MinimizeBox = True`
   - `AcceptButton = btnLogin`, `CancelButton = btnBatal`
3. **Kontrol & Pengaturan :**
   - `picLogo` (PictureBox): `SizeMode = Zoom`, ikon kantin/makanan sehat.
   - `txtUsername` (TextBox): `MaxLength = 30`.
   - `txtPassword` (TextBox): `UseSystemPasswordChar = True`.
   - `cmbLoket` (ComboBox): `DropDownStyle = DropDownList` (*Loket 1 — Makanan Utama & Nasi, Loket 2 — Minuman Sehat & Jus, Loket 3 — Camilan Buah & Snack*).
   - `chkBukaSesi` (CheckBox): `Text = "Aktifkan transaksi sesi istirahat sekarang"`.
   - `btnLogin` (Button): `Text = "Masuk Sistem"` (warna toska).
   - `btnBatal` (Button): `Text = "Batal"`, `DialogResult = Cancel`.
   - `lblBantuan` (LinkLabel): Teks bantuan kontak manajer koperasi.
4. **Urutan TabIndex :** `txtUsername (1) -> txtPassword (2) -> cmbLoket (3) -> chkBukaSesi (4) -> btnLogin (5) -> btnBatal (6) -> lblBantuan (7)`.

---

### Form 2: Form CRUD Kasir Pemesanan Kantin (`FrmTransaksiKantin.cs`)

#### 1. Tata Letak (Wireframe Layout)
```text
+--------------------------------------------------------------------------------------------------+
| [X] Kasir Pemesanan Makanan — SmartCanteen Sekolah                                      _ [] X   |
+--------------------------------------------------------------------------------------------------+
| [Menu: File | Pemesanan | Daftar Menu | Bantuan]                                                 |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
| [ GroupBox: Formulir Entri Pesanan Siswa (grpEntriData) ]                                        |
| +----------------------------------------------------------------------------------------------+ |
| | No Struk   : [ txtNoStruk (ReadOnly)  ] Tanggal        : [ dtpTanggal (DateTimePicker)     ] | |
| | NIS Siswa  : [ txtNIS                 ] Menu Pesanan   : [ cmbMenu (Dropdown Makanan)      ] | |
| | Nama Siswa : [ txtNamaPembeli         ] Jumlah / Porsi : [ numPorsi (NumericUpDown 1-20)   ] | |
| | Kelas      : [ cmbKelas (Dropdown)    ] Total Bayar    : [ txtTotalBayar (ReadOnly, Rp)    ] | |
| |                                                                                              | |
| | Metode Pembayaran:                                                                           | |
| | (o) Saldo Kartu Pelajar / Non-Tunai (rdoKartuPelajar)                                        | |
| | ( ) Uang Tunai Langsung (rdoTunai)                                                           | |
| +----------------------------------------------------------------------------------------------+ |
|                                                                                                  |
| [ Panel Aksi Tombol (pnlAksi) ]                                                                  |
| [ + TAMBAH BARU ]   [ SIMPAN DATA ]   [ UBAH ]   [ HAPUS ]   [ BATAL / BERSIHKAN ]               |
|   (btnTambah)         (btnSimpan)     (btnUbah)  (btnHapus)       (btnBatal)                     |
|                                                                                                  |
| [ GroupBox: Rekapitulasi Pesanan Hari Ini & Pencarian Data (grpTabel) ]                          |
| +----------------------------------------------------------------------------------------------+ |
| | Cari Data: [ txtCari                 ]  Kategori: [ cmbFilterKategori ]  [ CARI ]            | |
| |                                                                          (btnCari)           | |
| | [ DataGridView: dgvPesananKantin ]                                                           | |
| | +-----+----------+------------+--------+------------+---------------+--------+---------+---+ | |
| | | No  | No Struk | Tanggal    | NIS    | Pembeli    | Menu Pesanan  | Porsi  | Total Rp|Met| | |
| | +-----+----------+------------+--------+------------+---------------+--------+---------+---+ | |
| | | 1   | STR-109  | 06/10/2026 | 102405 | Dimas A.   | Bento Teriyaki| 1      | 15.000  |Krt| | |
| | | 2   | STR-110  | 06/10/2026 | 102412 | Nadya P.   | Salad Yoghurt | 2      | 20.000  |Tun| | |
| | | 3   | STR-111  | 06/10/2026 | 102427 | Gilang R.  | Jus Buah Murni| 3      | 21.000  |Krt| | |
| | +-----+----------+------------+--------+------------+---------------+--------+---------+---+ | |
| +----------------------------------------------------------------------------------------------+ |
|                                                                                                  |
| [ StatusStrip: Kasir: Siti Rahmawati | Status: Melayani | 06/10/2026 | v1.2 ]                    |
+--------------------------------------------------------------------------------------------------+
```

#### 2. Perintah Pengerjaan Form 2
1. **Nama Form :** `FrmTransaksiKantin.cs`
2. **Properti Form :** `Text = "Kasir Pemesanan Makanan — SmartCanteen Sekolah"`, `Size = ~980, 680`, `StartPosition = CenterScreen`.
3. **Navigasi & Kontainer :**
   - `menuStrip1`: Menu File, Pemesanan, Daftar Menu, Bantuan.
   - `grpEntriData`: GroupBox formulir entri pesanan.
   - `pnlAksi`: Panel tombol aksi CRUD pesanan.
   - `grpTabel`: GroupBox riwayat pesanan & pencarian data.
   - `statusStrip1`: 4 item status label di bilah paling dasar form.
4. **Kontrol Entri (`grpEntriData`) :**
   - `txtNoStruk` (ReadOnly, warna abu-abu).
   - `txtNIS` (MaxLength 10) & `txtNamaPembeli` (MaxLength 50).
   - `cmbKelas` (DropDownList kelas).
   - `dtpTanggal` (DateTimePicker format Short).
   - `cmbMenu` (DropDownList: *Nasi Bento Ayam Teriyaki, Mie Sayur Sehat Spesial, Jus Buah Murni, Salad Buah Yoghurt*).
   - `numPorsi` (NumericUpDown bulat, 1 - 20 porsi).
   - `txtTotalBayar` (ReadOnly, Right, Bold).
5. **Ketentuan & Ukuran Panel Tombol Aksi (`pnlAksi`) :**
   - **Tipe & Nama Kontrol:** `Panel`, `Name = pnlAksi`
   - **Ukuran (Size):** `940, 50` piksel (Lebar: 940 px, Tinggi: 50 px)
   - **Posisi (Location):** `X: 18, Y: 275`
   - **Properti:** `BorderStyle = FixedSingle`, `BackColor = SystemColors.ControlLight`, `Anchor = Top, Left, Right`
   - **Ukuran Tombol di Dalamnya:** `Size = 130, 32` piksel, jarak antar-tombol 8–10 piksel, tombol `btnBatal` diletakkan di sisi paling kanan panel.
   - **Daftar Tombol:** `btnTambah` (`"➕ Tambah Baru"`), `btnSimpan` (`"💾 Simpan Data"`), `btnUbah` (`"✏️ Ubah"`), `btnHapus` (`"🗑️ Hapus"`), `btnBatal` (`"🔄 Batal / Bersihkan"`).
6. **Tabel & Cari (`grpTabel`) :**
   - Pencarian: `txtCari`, `cmbFilterKategori`, `btnCari`.
   - `dgvPesananKantin`: ReadOnly = True, FullRowSelect, AllowUserToAddRows = False, minimal 7-10 kolom, 3 baris sampel.
7. **TabIndex, Naming & Anchor :** Naming convention standar (`txt`, `btn`, `cmb`, `num`, `dtp`, `dgv`). TabIndex sekuensial. Anchor responsif pada GroupBox dan GridView.
