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
    sender: "Tony Stark & Hendry",
    subject: "SPECIAL BIRTHDAY MISSION: BRAND NEW DAY MEMORY QUEST",
    stampText: "STARK APPROVED • EYES ONLY",
    salutation: "DEAR AGENT JACKLYN TAMARA,",
    bodyParagraph1: "Arc Reactor radar detected an extraordinary birthday energy surge at your heart's coordinates today!",
    bodyParagraph2: "The secret 'Brand New Day' mission is officially active. 5 Vital Memory Capsules are hidden across the city.",
    bodyParagraph3: "As Spidey's beloved Superhero Partner, decrypt the minigames & claim your real-world reward. Ready to swing?",
    signatory: "— Hendry✍️",
    buttonText: "⚡ I'M READY FOR THE MISSION!"
  },
  
  // 1. COUNTDOWN LOCK SETTINGS
  enableCountdown: false, // Set to true to lock app until target date (Bypass available for testing)
  birthdayTargetDate: "2026-08-08T00:00:00+07:00",
  
  // 2. 5 MEMORY CAPSULES
  capsules: [
    {
      id: 1,
      code: "CAPSULE-ALPHA",
      title: "First Encounter & The Spark ⚡",
      badgeIcon: "⚡",
      badgeTitle: "The Awakening",
      question: "Remember the first moment we truly clicked and talked for hours without realizing how fast time flew by?",
      options: [
        "Chilling at our favorite coffee shop sharing random fun stories",
        "Late-night chat conversations until falling asleep",
        "Wandering around on a cozy evening looking for delicious food while laughing",
        "All of the above, because talking with you is always exciting & never boring!"
      ],
      correctIndex: 3, // 0-indexed (Option D)
      hint: "Spider-Sense Hint: The sweetest spark of conversation always includes every precious moment!",
      photo: "assets/memory_1.png",
      dateLabel: "CAPSULE-ALPHA • FIRST ENCOUNTER & THE SPARK",
      noteHeading: "Everything Shines Brighter Since You Arrived ☕❤️",
      noteText: "Ever since the first day we started sharing our stories, this vibrant Spidey world has felt so much more exciting! Talking to you is always the most comfortable place to just be myself. Thank you for making every day brighter!"
    },
    {
      id: 2,
      code: "CAPSULE-BETA",
      title: "Starlight City Walk & Secret Radar 🌃",
      badgeIcon: "🌃",
      badgeTitle: "Night Crawler",
      question: "If Spider-Man has Spider-Sense to detect danger, what secret makes me super perceptive whenever you need a mood booster?",
      options: [
        "Your text replies suddenly get short with meaningful periods (.)",
        "Your voice tone becomes extra gentle yet mysterious",
        "A subtle hint for ice cream or boba suddenly appears",
        "My heart's radar is specially tuned 24/7 to understand your feelings!"
      ],
      correctIndex: 3,
      hint: "Spider-Sense Hint: Spidey's most affectionate signal is connected 24/7 exclusively to you!",
      photo: "assets/memory_2.png",
      dateLabel: "CAPSULE-BETA • STARLIGHT CITY WALK & SECRET RADAR",
      noteHeading: "My Heart's Radar Is Connected Exclusively To You! 🌌✨",
      noteText: "No matter how exhausting or noisy the day gets, spending late-night talks or strolling under the city breeze with you recharges my energy completely. You are my favorite chill spot across the Spider-Verse!"
    },
    {
      id: 3,
      code: "CAPSULE-GAMMA",
      title: "Carnival Magic & Laughter Explosion 🎡",
      badgeIcon: "🎡",
      badgeTitle: "Thrill Seeker",
      question: "Out of all our thrilling adventures and playful moments together, which one is the most iconic in our story?",
      options: [
        "Riding carnival attractions while eating our favorite snacks",
        "Late-night food hunting until our bellies are super full",
        "Watching movies together while playfully fighting over snacks",
        "Whatever we do, as long as I'm walking right beside you!"
      ],
      correctIndex: 3,
      hint: "Spider-Sense Hint: The best adventure isn't about the ride, it's about who's sitting next to you!",
      photo: "assets/memory_3.png",
      dateLabel: "CAPSULE-GAMMA • CARNIVAL MAGIC & LAUGHTER EXPLOSION",
      noteHeading: "Laughing With You Is My Ultimate Joy! 🎢🎈",
      noteText: "Every loud laugh, silly moment, and sweet surprise with you is my absolute favorite part of this journey. You always have a magical way of making an ordinary day feel like a grand festival!"
    },
    {
      id: 4,
      code: "CAPSULE-DELTA",
      title: "Brand New Day Birthday Surprise 🎂",
      badgeIcon: "🎂",
      badgeTitle: "The Grand Finale",
      question: "Today is the most special day for Jacklyn Tamara! What epic birthday wish MUST come true in this 'Brand New Day' chapter?",
      options: [
        "Jacklyn gets healthier, super successful, and filled with non-stop joy",
        "All of Jacklyn's biggest dreams and aspirations come true one by one",
        "We grow even closer, more romantic, and support each other forever",
        "ALL OF THE WONDERFUL WISHES ABOVE MUST COME TRUE 10000%! 🎉"
      ],
      correctIndex: 3,
      hint: "Spider-Sense Hint: Don't hold back, choose the grandest wish for your special day!",
      photo: "assets/memory_4.png",
      dateLabel: "CAPSULE-DELTA • BRAND NEW DAY BIRTHDAY SURPRISE",
      noteHeading: "Happy Birthday to My Favorite Superhero! 🎉🎂",
      noteText: "Happy Birthday, Jacklyn! May this 'Brand New Day' chapter bring you even more shine and happiness. Remember that I'll always be standing by as your personal Web-Slinger, ready to support you in every mission of life!"
    },
    {
      id: 5,
      code: "CAPSULE-EPSILON",
      title: "Crossword Memory Challenge & Inside Jokes 🧩",
      badgeIcon: "✏️",
      badgeTitle: "TTS Master",
      question: "After solving Spidey's Crossword Puzzle, what is your absolute favorite thing when we spend time together?",
      options: [
        "Unstoppable laughter and endless fun conversations",
        "Small caring gestures and warmth that bring peace to the heart",
        "New adventures and delicious food we discover together",
        "ALL OF THE ABOVE, because being with you is the best part of my life!"
      ],
      correctIndex: 3,
      hint: "Spider-Sense Hint: The sweetest answer covers all of our shared happiness!",
      photo: "assets/easteregg.png",
      dateLabel: "CAPSULE-EPSILON • CROSSWORD MEMORY CHALLENGE",
      noteHeading: "You Are My Favorite Partner Forever! 🧩❤️",
      noteText: "Outstanding! Your brilliant mind and Spider-Sense are truly unmatched! You solved all of Spidey's memory crossword puzzle flawlessly. Happy Birthday, my superhero!"
    }
  ],

  // 3. GRAND FINALE & GIFT DETAILS
  grandFinale: {
    heroGreeting: "HAPPY BIRTHDAY, MY SUPERHERO JACKLYN TAMARA!",
    subheading: "🎉 MISSION ACCOMPLISHED! ALL MEMORY CAPSULES UNLOCKED! 🕸️",
    romanticMessage: `Thank you for being here and constantly filling my days with laughter, warmth, and your extraordinary kindness. Just like Spider-Man who always fights for the ones he holds dear, you will always be the #1 superhero in my heart! 

May this new year of your life be filled with sweet surprises, grand achievements, thrilling adventures, and a smile that never fades. I love you 3000 and across the Spider-Verse! ❤️🕷️✨`,
    giftHeadline: "🎁 FINAL MISSION: SECRET PHYSICAL GIFT CLUE UNLOCKED!",
    giftClue: "NANTI AJA YAA KADO NYA PAS SC HEHE",
    giftSecretPasscode: "JACKLYN-SPIDEY-2026",
    giftImage: "assets/gift_box.png"
  },

  // 4. VOICE TRANSMISSION COMMUNICATOR SETTINGS
  voiceMemo: {
    audioPath: "assets/voice_memo.mp3",
    title: "SPIDER-COMMUNICATOR TRANSMISSION",
    sender: "Peter Parker (Your Web-Slinger)",
    transcript: "Happy Birthday, my love! Thank you for always being here, supporting me, and filling my days with warmth and laughter. I hope this little surprise from your personal Web-Slinger keeps you smiling all day long! Happy Birthday! ❤️"
  },

  // 5. SECRET EASTER EGG VAULT (#05)
  easterEgg: {
    code: "SECRET-VAULT-05",
    passcode: "SPIDEY",
    title: "The Secret Vault: Spidey's Ultimate Memory",
    photo: "assets/easteregg.png",
    dateLabel: "SECRET VAULT • UNLOCKED",
    noteHeading: "Secret Vault Unlocked! High-Five, Spidey Partner! 🕵️‍♂️❤️",
    noteText: "Whoa! Your Spider-Sense is so sharp that you uncovered this secret vault! You're truly the coolest partner ever. Thank you for always making my life complete forever!"
  },

  // 6. OFFICIAL SUPERHERO PARTNER CERTIFICATE
  certificate: {
    title: "OFFICIAL SUPERHERO PARTNER CERTIFICATE",
    recipientName: "JACKLYN TAMARA",
    titleGiven: "MOST VALUABLE & FAVORITE SUPERHERO PARTNER OF THE MULTIVERSE",
    issueDate: "SPECIAL BIRTHDAY EDITION",
    certificateNumber: "SPIDEY-CERT-2026-JT",
    signatory: "Peter Parker 🕷️ & Hendry ✍️"
  }
};
