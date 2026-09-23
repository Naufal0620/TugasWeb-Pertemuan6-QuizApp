const rawQuizData = [
  {
    category: 'HTML',
    question: 'Apa kepanjangan dari HTML?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlink Text Mode Language'
    ],
    correct: 0,
    explanation: 'HTML adalah singkatan dari Hyper Text Markup Language untuk menstrukturkan halaman web.'
  },
  {
    category: 'HTML',
    question: 'Elemen HTML mana yang tepat untuk menyematkan dokumen JavaScript eksternal?',
    options: [
      '<script>',
      '<javascript>',
      '<js>',
      '<link>'
    ],
    correct: 0,
    explanation: 'Tag <script src="..."> digunakan untuk memuat file JavaScript eksternal.'
  },
  {
    category: 'HTML',
    question: 'Atribut HTML apa yang digunakan untuk mendefinisikan teks alternatif pada gambar jika gagal dimuat?',
    options: [
      'title',
      'alt',
      'src',
      'description'
    ],
    correct: 1,
    explanation: 'Atribut alt menyediakan teks alternatif yang penting untuk aksesibilitas dan SEO.'
  },
  {
    category: 'CSS',
    question: 'Properti CSS apa yang digunakan untuk mengubah warna latar belakang sebuah elemen?',
    options: [
      'color',
      'background-color',
      'bgcolor',
      'border-color'
    ],
    correct: 1,
    explanation: 'background-color digunakan untuk menentukan warna latar belakang elemen.'
  },
  {
    category: 'CSS',
    question: 'Model tata letak CSS mana yang dirancang khusus untuk layout satu dimensi (baris atau kolom)?',
    options: [
      'CSS Grid',
      'Flexbox',
      'Float',
      'Table Layout'
    ],
    correct: 1,
    explanation: 'Flexbox berfokus pada pengaturan layout satu dimensi, sedangkan CSS Grid untuk dua dimensi.'
  },
  {
    category: 'CSS',
    question: 'Bagaimana cara memilih elemen dengan class "btn-primary" di CSS?',
    options: [
      '#btn-primary',
      '.btn-primary',
      'btn-primary',
      '*btn-primary'
    ],
    correct: 1,
    explanation: 'Tanda titik (.) digunakan sebagai penanda class selector di CSS.'
  },
  {
    category: 'JavaScript',
    question: 'Kata kunci mana yang digunakan untuk mendeklarasikan variabel yang nilainya tidak dapat diubah (konstan)?',
    options: [
      'let',
      'var',
      'const',
      'static'
    ],
    correct: 2,
    explanation: 'const membuat variabel bersifat read-only setelah diinisialisasi.'
  },
  {
    category: 'JavaScript',
    question: 'Apa hasil evaluasi dari ekspresi: typeof null di JavaScript?',
    options: [
      '"null"',
      '"undefined"',
      '"object"',
      '"number"'
    ],
    correct: 2,
    explanation: 'typeof null mengembalikan "object", ini merupakan perilaku bawaan JavaScript sejak versi awal.'
  },
  {
    category: 'JavaScript',
    question: 'Metode array mana yang digunakan untuk membuat array baru berisi hasil pemanggilan fungsi pada setiap elemennya?',
    options: [
      'forEach()',
      'map()',
      'filter()',
      'reduce()'
    ],
    correct: 1,
    explanation: 'map() melakukan iterasi dan mengembalikan array baru berdasarkan return value fungsi callback.'
  },
  {
    category: 'DOM Selection & Manipulation',
    question: 'Metode DOM mana yang mengembalikan NodeList dari semua elemen yang cocok dengan selektor CSS tertentu?',
    options: [
      'document.querySelector()',
      'document.querySelectorAll()',
      'document.getElementsByClassName()',
      'document.getElementById()'
    ],
    correct: 1,
    explanation: 'querySelectorAll() mengembalikan daftar NodeList dari seluruh elemen yang sesuai.'
  },
  {
    category: 'DOM Selection & Manipulation',
    question: 'Mengapa textContent lebih disarankan daripada innerHTML untuk menampilkan teks input dari pengguna?',
    options: [
      'Mengurangi pemakaian memori browser secara drastis',
      'Mencegah risiko serangan Cross-Site Scripting (XSS)',
      'Membuat teks otomatis berubah menjadi format tebal',
      'Hanya textContent yang didukung oleh browser saat ini'
    ],
    correct: 1,
    explanation: 'textContent memperlakukan input murni sebagai teks dan tidak mengeksekusi tag skrip HTML.'
  },
  {
    category: 'DOM Selection & Manipulation',
    question: 'Metode apa yang digunakan untuk membuat node elemen HTML baru melalui JavaScript?',
    options: [
      'document.createElement()',
      'document.newElement()',
      'document.appendNode()',
      'document.generateElement()'
    ],
    correct: 0,
    explanation: 'document.createElement(tagName) membuat elemen baru yang siap ditambahkan ke DOM tree.'
  },
  {
    category: 'Event Handling',
    question: 'Apa keuntungan utama dari teknik Event Delegation?',
    options: [
      'Mengurangi jumlah event listener dengan memanfaatkan event bubbling ke elemen induk',
      'Menghentikan jalannya peramban saat event terjadi',
      'Mencegah pengguna menekan tombol klik kanan mouse',
      'Membuat proses render CSS berjalan lebih cepat'
    ],
    correct: 0,
    explanation: 'Event delegation menempatkan satu listener pada elemen parent untuk mengelola banyak child element.'
  },
  {
    category: 'Event Handling',
    question: 'Metode pada objek event yang digunakan untuk membatalkan perilaku bawaan (default behavior) dari sebuah form submission adalah...',
    options: [
      'e.stopPropagation()',
      'e.preventDefault()',
      'e.cancelBubble()',
      'e.stopImmediatePropagation()'
    ],
    correct: 1,
    explanation: 'e.preventDefault() menghentikan aksi bawaan browser, seperti reload saat submit form.'
  },
  {
    category: 'Web Storage',
    question: 'Apa perbedaan utama antara LocalStorage dan SessionStorage?',
    options: [
      'LocalStorage memiliki kapasitas 1MB, SessionStorage 50MB',
      'Data LocalStorage tetap tersimpan setelah tab/browser ditutup, sedangkan SessionStorage dihapus saat sesi tab berakhir',
      'SessionStorage mengenkripsi data secara otomatis, LocalStorage tidak',
      'LocalStorage hanya dapat menyimpan angka, SessionStorage hanya teks'
    ],
    correct: 1,
    explanation: 'LocalStorage bersifat persisten, sedangkan SessionStorage hanya bertahan selama sesi tab aktif.'
  },
  {
    category: 'Web Storage',
    question: 'Fungsi bawaan JavaScript apa yang harus digunakan sebelum menyimpan objek JavaScript ke dalam LocalStorage?',
    options: [
      'JSON.parse()',
      'JSON.stringify()',
      'Object.toString()',
      'Storage.serialize()'
    ],
    correct: 1,
    explanation: 'LocalStorage hanya menyimpan string (key-value), sehingga objek harus diubah menjadi string JSON terlebih dahulu.'
  }
];
