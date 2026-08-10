/**
 * Spider-Sense Memory Quest: Brand New Day Edition
 * Data configuration for Jacklyn Tamara's Birthday Mission
 * 
 * Edit questions, options, correct answers, sweet notes, photo paths, and hints below.
 */

window.MEMORY_QUEST_DATA = {
  heroName: "Jacklyn Tamara",
  heroNickname: "Jacklyn",
  missionTitle: "BRAND NEW DAY: MEMORY QUEST",
  issueNumber: "#24",
  releaseDate: "SPECIAL BIRTHDAY EDITION",

  // STARK INDUSTRIES CONFIDENTIAL MISSION BRIEFING
  starkLetter: {
    protocolCode: "STARK-AVENGERS-PROTOCOL #2026-JT",
    recipient: "AGENT JACKLYN TAMARA",
    sender: "Tony Stark (Stark Industries HQ) & Peter Parker (Spider-Man)",
    subject: "SPECIAL BIRTHDAY MISSION: BRAND NEW DAY MEMORY QUEST",
    stampText: "STARK APPROVED • EYES ONLY",
    salutation: "DEAR AGENT JACKLYN TAMARA,",
    bodyParagraph1: "Radar Arc Reactor mendeteksi lonjakan energi ulang tahun luar biasa di koordinat hatimu hari ini!",
    bodyParagraph2: "Misi rahasia 'Brand New Day' resmi aktif. 5 Kapsul Memori Vital telah disembunyikan di sudut kota.",
    bodyParagraph3: "Sebagai Superhero Partner Spidey, pecahkan minigame & klaim hadiah fisikmu di dunia nyata. Ready to swing?",
    signatory: "— Hendry✍️",
    buttonText: "⚡ SAYA SIAP TERIMA MISI!"
  },
  
  // 1. COUNTDOWN LOCK SETTINGS
  enableCountdown: false, // Set to true to lock app until target date (Bypass available for testing)
  birthdayTargetDate: "2026-08-08T00:00:00+07:00",
  
  // 2. 4 MEMORY CAPSULES
  capsules: [
    {
      id: 1,
      code: "CAPSULE-ALPHA",
      title: "First Encounter & The Spark ⚡",
      badgeIcon: "⚡",
      badgeTitle: "The Awakening",
      question: "Ingat gak momen pertama kali kita beneran 'klik' dan ngobrol panjang lebar tanpa kerasa jam berputar cepet banget?",
      options: [
        "Nongkrong santai di coffee shop favorit sambil cerita hal-hal random",
        "Pas ngobrol di chat larut malam sampai ketiduran sendiri",
        "Pas lagi jalan sore nyari makanan enak sambil bercanda",
        "Semua momen di atas, soalnya obrolan bareng kamu tuh emang selalu seru & gak pernah bosenin!"
      ],
      correctIndex: 3, // 0-indexed (Option D)
      hint: "Petunjuk Spider-Sense: Percikan obrolan paling asyik selalu punya jawaban yang paling lengkap & manis!",
      photo: "assets/memory_1.png",
      dateLabel: "CAPSULE-ALPHA • FIRST ENCOUNTER & THE SPARK",
      noteHeading: "Semua Terasa Lebih Cerah Sejak Ada Kamu ☕❤️",
      noteText: "Sejak hari pertama kita mulai saling berbagi cerita, dunia Spidey yang penuh warna ini rasanya makin seru! Obrolan sama kamu tuh selalu jadi tempat paling nyaman untuk jadi diri sendiri. Makasih udah selalu bikin hariku makin cerah!"
    },
    {
      id: 2,
      code: "CAPSULE-BETA",
      title: "Starlight City Walk & Secret Radar 🌃",
      badgeIcon: "🌃",
      badgeTitle: "Night Crawler",
      question: "Kalau Spider-Man punya Spider-Sense untuk mendeteksi musuh, rahasia apa sih yang bikin aku selalu super peka kalau kamu lagi ngambek atau butuh mood booster?",
      options: [
        "Balasan chat-mu mendadak singkat dan pakai titik (.) yang penuh arti",
        "Nada bicaranya berubah jadi makin halus tapi misterius",
        "Tiba-tiba ada kode halus ngajak nyari es krim / boba",
        "Radar hatiku khusus di-tuning buat ngerti tiap jengkal perasaan Jacklyn!"
      ],
      correctIndex: 3,
      hint: "Petunjuk Spider-Sense: Sinyal ter-bucin Spidey selalu terhubung 24/7 khusus ke kamu!",
      photo: "assets/memory_2.png",
      dateLabel: "CAPSULE-BETA • STARLIGHT CITY WALK & SECRET RADAR",
      noteHeading: "Radar Hatiku Terhubung Khusus Buat Kamu! 🌌✨",
      noteText: "Mau seberapa capek atau riuhnya hari yang kita lalui, waktu malam ngobrol atau jalan bareng kamu di bawah angin kota tuh selalu bikin energi penuh lagi. You are my favorite chill spot across the Spider-Verse!"
    },
    {
      id: 3,
      code: "CAPSULE-GAMMA",
      title: "Carnival Magic & Laughter Explosion 🎡",
      badgeIcon: "🎡",
      badgeTitle: "Thrill Seeker",
      question: "Dari sekian banyak petualangan seru dan kejahilan yang pernah kita lewati berdua, mana momen yang paling ikonik menurut kita?",
      options: [
        "Keliling wahana permainan sambil jajan makanan favorit",
        "Berburu kulineran malam sampai perut kenyang banget",
        "Nonton film di bioskop sambil rebutan camilan",
        "Apapun kegiatannya, yang penting jalannya bareng kamu!"
      ],
      correctIndex: 3,
      hint: "Petunjuk Spider-Sense: Petualangan terbaik itu bukan soal wahananya, tapi siapa yang ada di sampingmu!",
      photo: "assets/memory_3.png",
      dateLabel: "CAPSULE-GAMMA • CARNIVAL MAGIC & LAUGHTER EXPLOSION",
      noteHeading: "Ketawa Bareng Kamu Itu Kebahagiaan Utama! 🎢🎈",
      noteText: "Setiap tawa ngakak, kejutan kecil, dan momen konyol bareng kamu tuh selalu jadi bagian favorit dari petualangan ini. Kamu selalu punya cara ajaib bikin hari biasa terasa kayak festival meriah!"
    },
    {
      id: 4,
      code: "CAPSULE-DELTA",
      title: "Brand New Day Birthday Surprise 🎂",
      badgeIcon: "🎂",
      badgeTitle: "The Grand Finale",
      question: "Hari ini hari paling istimewa buat Jacklyn Tamara! Apa doa dan harapan paling epic yang WAJIB terwujud di babak 'Brand New Day' ini?",
      options: [
        "Jacklyn makin sehat, makin sukses, dan dilimpahi kebahagiaan nonstop",
        "Semua cita-cita besar dan impian Jacklyn bisa tercapai satu per satu",
        "Kita makin makin kompak, makin romantis, dan saling support selamanya",
        "SEMUA DOA BAGUS DI ATAS WAJIB TERWUJUD 10000% TANPA SYARAT! 🎉"
      ],
      correctIndex: 3,
      hint: "Petunjuk Spider-Sense: Jangan ragu-ragu, pilih impian terbesar untuk ulang tahunmu!",
      photo: "assets/memory_4.png",
      dateLabel: "CAPSULE-DELTA • BRAND NEW DAY BIRTHDAY SURPRISE",
      noteHeading: "Happy Birthday to My Favorite Superhero! 🎉🎂",
      noteText: "Selamat ulang tahun, Jacklyn! Semoga di babak baru 'Brand New Day' ini kamu makin bersinar, makin bahagia, dan selalu ingat kalau aku bakal selalu standby jadi Web-Slinger pribadi yang siap nemenin & dukung kamu di setiap misi kehidupan!"
    },
    {
      id: 5,
      code: "CAPSULE-EPSILON",
      title: "Crossword Memory Challenge & Inside Jokes 🧩",
      badgeIcon: "✏️",
      badgeTitle: "TTS Master",
      question: "Setelah memecahkan Teka-Teki Silang (TTS) Spidey, apa hal utama yang paling kamu sukai saat kita menghabiskan waktu bersama?",
      options: [
        "Tawa ngakak dan obrolan tanpa henti yang selalu seru",
        "Perhatian dan kehangatan kecil yang bikin hati tenang",
        "Petualangan baru dan makanan enak yang kita coba berdua",
        "SEMUA HAL DI ATAS, karena bersamamu adalah momen terbaik di hidupku!"
      ],
      correctIndex: 3,
      hint: "Petunjuk Spider-Sense: Jawaban ter-sweet selalu mencakup semua kebahagiaan kita!",
      photo: "assets/easteregg.png",
      dateLabel: "CAPSULE-EPSILON • CROSSWORD MEMORY CHALLENGE",
      noteHeading: "You are My Favorite Partner Forever! 🧩❤️",
      noteText: "Luar biasa! Otak jenius dan Spider-Sense milikmu bener-bener gak ada tandingannya! Kamu berhasil memecahkan seluruh Teka-Teki Silang memori kita dengan sempurna. Happy Birthday, my superhero!"
    }
  ],

  // 3. GRAND FINALE & GIFT DETAILS
  grandFinale: {
    heroGreeting: "HAPPY BIRTHDAY, MY SUPERHERO JACKLYN TAMARA!",
    subheading: "🎉 MISSION ACCOMPLISHED! SELURUH KAPSUL MEMORI BERHASIL DI-THWIP! 🕸️",
    romanticMessage: `Makasih ya udah hadir dan selalu mewarnai hari-hariku dengan tawa, kehangatan, dan kebaikan hatimu yang luar biasa. Sama kayak Spider-Man yang selalu berjuang demi orang-orang tersayang, kamu tuh selalu jadi superhero terfavorit di hatiku! 

Semoga di usia baru ini, setiap harimu selalu dipenuhi banyak kejutan manis, keberhasilan besar, petualangan seru, dan senyuman yang nggak pernah pudar. I love you 3000 and across the Spider-Verse! ❤️🕷️✨`,
    giftHeadline: "🎁 MISI TERAKHIR: PETUNJUK KADO FISIK RAHASIA UNLOCKED!",
    giftClue: "NANTI AJA YAA KADO NYA PAS SC HEHE",
    giftSecretPasscode: "JACKLYN-SPIDEY-2026",
    giftImage: "assets/gift_box.png"
  },

  // 4. VOICE TRANSMISSION COMMUNICATOR SETTINGS
  voiceMemo: {
    audioPath: "assets/voice_memo.mp3",
    title: "SPIDER-COMMUNICATOR TRANSMISSION",
    sender: "Peter Parker (Your Web-Slinger)",
    transcript: "Selamat ulang tahun ya sayang! Makasih udah selalu ada, nemenin, dan bikin hariku penuh dengan tawa & kehangatan. Semoga kejutan kecil dari Web-Slinger pribadi ini bikin kamu tersenyum lebar seharian! Happy Birthday! ❤️"
  },

  // 5. SECRET EASTER EGG VAULT (#05)
  easterEgg: {
    code: "SECRET-VAULT-05",
    passcode: "SPIDEY",
    title: "The Secret Vault: Spidey's Ultimate Memory",
    photo: "assets/easteregg.png",
    dateLabel: "SECRET VAULT • UNLOCKED",
    noteHeading: "Misi Rahasia Terbuka! High-Five, Spidey Partner! 🕵️‍♂️❤️",
    noteText: "Waduh! Spider-Sense milikmu tajam banget sampai bisa nemuin brankas rahasia ini! Kamu bener-bener partner paling keren yang pernah ada. Makasih ya udah selalu buat hidupku terasa lengkap selamanya!"
  },

  // 6. OFFICIAL SUPERHERO PARTNER CERTIFICATE
  certificate: {
    title: "OFFICIAL SUPERHERO PARTNER CERTIFICATE",
    recipientName: "JACKLYN TAMARA",
    titleGiven: "MOST VALUABLE & FAVORITE SUPERHERO PARTNER OF THE SPIDER-VERSE",
    issueDate: "SPECIAL BIRTHDAY EDITION",
    certificateNumber: "SPIDEY-CERT-2026-JT",
    signatory: "Spider-Man & Spider-Sense HQ"
  }
};
