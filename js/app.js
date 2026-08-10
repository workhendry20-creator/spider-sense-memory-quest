/**
 * Spider-Sense Memory Quest: Brand New Day Edition
 * Core Game Controller & User Journey Manager with 7 Ultimate Surprise Features
 */

class MemoryQuestApp {
  constructor() {
    this.data = window.MEMORY_QUEST_DATA;
    this.sound = window.soundEngine;
    this.currentCapsuleIndex = 0;
    this.unlockedCount = 0;
    this.totalCapsules = this.data.capsules.length;
    this.isCandleExtinguished = false;

    this.initDOM();
    this.initGlobalWebShooter();
    this.initKeyboardListeners();
    this.checkCountdownStatus();
    this.bindEvents();
    this.renderProgressTracker();

    // Auto Marvel Studios intro sequence on startup
    setTimeout(() => {
      this.triggerMarvelAutoIntroSequence();
    }, 400);
  }

  initDOM() {
    // Views
    this.landingView = document.getElementById('landing-view');
    this.gameView = document.getElementById('game-view');
    this.finaleView = document.getElementById('finale-view');
    this.countdownView = document.getElementById('countdown-view');

    // Controls & Buttons
    this.btnStartMission = document.getElementById('btn-start-mission');
    this.btnOpenStarkLetter = document.getElementById('btn-open-stark-letter');
    this.modalStarkBriefing = document.getElementById('modal-stark-briefing');
    this.btnAcceptStarkMission = document.getElementById('btn-accept-stark-mission');
    this.btnTriggerSense = document.getElementById('btn-trigger-sense');
    this.radarTrigger = document.getElementById('radar-trigger');
    this.btnAudioToggle = document.getElementById('btn-audio-toggle');
    this.audioIcon = document.getElementById('audio-icon');
    this.issueBadge = document.getElementById('issue-badge');

    // Countdown Elements
    this.clockDays = document.getElementById('clock-days');
    this.clockHours = document.getElementById('clock-hours');
    this.clockMinutes = document.getElementById('clock-minutes');
    this.clockSeconds = document.getElementById('clock-seconds');
    this.btnBypassLock = document.getElementById('btn-bypass-lock');

    // Overlays & Progress
    this.spidersenseOverlay = document.getElementById('spidersense-overlay');
    this.progressTrackerBar = document.getElementById('progress-tracker-bar');
    this.progressCounterText = document.getElementById('progress-counter-text');
    this.missionStatusText = document.getElementById('mission-status-text');

    // Quiz & MiniGame Modal Elements
    this.modalQuiz = document.getElementById('modal-quiz');
    this.quizTag = document.getElementById('quiz-tag');
    this.quizQuestion = document.getElementById('quiz-question');
    this.quizOptions = document.getElementById('quiz-options');
    this.quizHintBox = document.getElementById('quiz-hint-box');
    this.btnShowHint = document.getElementById('btn-show-hint');

    this.modalMiniGame = document.getElementById('modal-minigame');
    this.miniGameViewport = document.getElementById('minigame-viewport');

    // Polaroid Unlock Modal Elements
    this.modalPolaroid = document.getElementById('modal-polaroid');
    this.polaroidPhoto = document.getElementById('polaroid-photo');
    this.scratchCanvas = document.getElementById('scratch-canvas');
    this.polaroidDateLabel = document.getElementById('polaroid-date-label');
    this.polaroidNoteHeading = document.getElementById('polaroid-note-heading');
    this.polaroidNoteText = document.getElementById('polaroid-note-text');
    this.btnContinueMission = document.getElementById('btn-continue-mission');

    // Finale Elements
    this.finaleHeroName = document.getElementById('finale-hero-name');
    this.finaleSubheading = document.getElementById('finale-subheading');
    this.finaleGallery = document.getElementById('finale-gallery');
    this.finaleRomanticLetter = document.getElementById('finale-romantic-letter');
    this.giftBoxWrapper = document.getElementById('gift-box-wrapper');
    this.giftClueBox = document.getElementById('gift-clue-box');
    this.giftClueText = document.getElementById('gift-clue-text');

    // Cake & Communicator Widgets
    this.cakeWidget = document.getElementById('birthday-cake-widget');
    this.btnBlowCandle = document.getElementById('btn-blow-candle');
    this.micStatusBadge = document.getElementById('mic-status-badge');
    this.btnPlayVoiceMemo = document.getElementById('btn-play-voice-memo');
    this.voiceMemoAudio = document.getElementById('voice-memo-audio');
    this.voiceSignalLed = document.getElementById('voice-signal-led');

    // Certificate & Easter Egg Modals
    this.btnOpenCertificate = document.getElementById('btn-open-certificate');
    this.modalCertificate = document.getElementById('modal-certificate');
    this.btnDownloadCert = document.getElementById('btn-download-cert');
    this.btnCloseCert = document.getElementById('btn-close-cert');
    this.modalEasterEgg = document.getElementById('modal-easter-egg');
    this.btnCloseEasterEgg = document.getElementById('btn-close-easter-egg');

    // Lightbox Modal Elements
    this.modalPhotoLightbox = document.getElementById('modal-photo-lightbox');
    this.lightboxFullImg = document.getElementById('lightbox-full-img');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.btnCloseLightbox = document.getElementById('btn-close-lightbox');
    this.polaroidImgContainer = document.getElementById('polaroid-img-container');
    this.easterEggImgContainer = document.getElementById('easter-egg-img-container');
  }

  // FEATURE #2: GLOBAL INTERACTIVE WEB SHOOTER
  initGlobalWebShooter() {
    this.webCanvas = document.getElementById('web-shooter-canvas');
    if (!this.webCanvas) return;

    this.webCtx = this.webCanvas.getContext('2d');

    const resizeWebCanvas = () => {
      this.webCanvas.width = window.innerWidth;
      this.webCanvas.height = window.innerHeight;
    };
    resizeWebCanvas();
    window.addEventListener('resize', resizeWebCanvas);

    document.addEventListener('click', (e) => {
      // Ignore clicks inside modals, inputs, minigames, or interactive forms
      if (
        e.target.closest('.comic-modal-backdrop') ||
        e.target.closest('.modal-comic-box') ||
        e.target.closest('.tts-wrapper') ||
        e.target.closest('.tts-cell') ||
        e.target.closest('button') ||
        e.target.closest('input')
      ) {
        return;
      }
      this.shootWebLine(e.clientX, e.clientY);
    });
  }

  shootWebLine(targetX, targetY) {
    this.sound.playThwipSFX();

    const startX = window.innerWidth / 2;
    const startY = window.innerHeight;

    const startTime = performance.now();
    const duration = 250;

    const animateWeb = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentX = startX + (targetX - startX) * progress;
      const currentY = startY + (targetY - startY) * progress;

      // Draw web line
      this.webCtx.beginPath();
      this.webCtx.moveTo(startX, startY);
      this.webCtx.lineTo(currentX, currentY);
      this.webCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      this.webCtx.lineWidth = 4;
      this.webCtx.shadowColor = '#0476F2';
      this.webCtx.shadowBlur = 6;
      this.webCtx.stroke();

      if (progress < 1) {
        requestAnimationFrame(animateWeb);
      } else {
        // Draw Web Starburst Decal at target
        this.drawWebDecal(targetX, targetY);

        // Clear canvas after 1 second
        setTimeout(() => {
          this.webCtx.clearRect(0, 0, this.webCanvas.width, this.webCanvas.height);
        }, 800);
      }
    };

    requestAnimationFrame(animateWeb);
  }

  drawWebDecal(x, y) {
    this.webCtx.save();
    this.webCtx.translate(x, y);

    this.webCtx.strokeStyle = '#FFFFFF';
    this.webCtx.lineWidth = 2.5;

    // Concentric circles
    [8, 18, 28].forEach(r => {
      this.webCtx.beginPath();
      this.webCtx.arc(0, 0, r, 0, Math.PI * 2);
      this.webCtx.stroke();
    });

    // Radial spokes
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      this.webCtx.beginPath();
      this.webCtx.moveTo(0, 0);
      this.webCtx.lineTo(Math.cos(angle) * 32, Math.sin(angle) * 32);
      this.webCtx.stroke();
    }

    this.webCtx.restore();
  }

  // FEATURE #7: TIMED MISSION LOCK & COUNTDOWN
  checkCountdownStatus() {
    if (!this.data.enableCountdown) return;

    const targetTime = new Date(this.data.birthdayTargetDate).getTime();
    const nowTime = new Date().getTime();

    if (nowTime < targetTime) {
      this.landingView.style.display = 'none';
      this.countdownView.style.display = 'flex';

      this.countdownTimer = setInterval(() => {
        const current = new Date().getTime();
        const diff = targetTime - current;

        if (diff <= 0) {
          clearInterval(this.countdownTimer);
          this.countdownView.style.display = 'none';
          this.landingView.style.display = 'flex';
          this.sound.playFanfareSFX();
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((diff % (1000 * 60)) / 1000);

          this.clockDays.textContent = String(days).padStart(2, '0');
          this.clockHours.textContent = String(hours).padStart(2, '0');
          this.clockMinutes.textContent = String(mins).padStart(2, '0');
          this.clockSeconds.textContent = String(secs).padStart(2, '0');
        }
      }, 1000);
    }
  }

  toggleModal(modalElement, show) {
    if (!modalElement) return;
    if (show) {
      modalElement.classList.add('active');
      document.body.classList.add('modal-open');
    } else {
      modalElement.classList.remove('active');
      const anyActive = document.querySelector('.comic-modal-backdrop.active');
      if (!anyActive) {
        document.body.classList.remove('modal-open');
      }
    }
  }

  bindEvents() {
    // Global Mobile Audio Unlocker on First Touch/Tap
    const unlockAudioOnTouch = () => {
      if (this.sound) {
        this.sound.initContext();
        this.sound.startBgm();
      }
      window.removeEventListener('touchstart', unlockAudioOnTouch);
      window.removeEventListener('click', unlockAudioOnTouch);
    };
    window.addEventListener('touchstart', unlockAudioOnTouch, { once: true });
    window.addEventListener('click', unlockAudioOnTouch, { once: true });

    // Bypass Lock Button
    this.btnBypassLock.addEventListener('click', () => {
      if (this.countdownTimer) clearInterval(this.countdownTimer);
      this.countdownView.style.display = 'none';
      this.landingView.style.display = 'flex';
      this.sound.playClickSFX();
      this.triggerMarvelAutoIntroSequence();
    });

    // Stark Industries Briefing Letter Handlers
    if (this.btnOpenStarkLetter) {
      this.btnOpenStarkLetter.addEventListener('click', () => {
        this.triggerMarvelAutoIntroSequence();
      });
    }

    if (this.btnAcceptStarkMission) {
      this.btnAcceptStarkMission.addEventListener('click', () => {
        this.sound.playThwipSFX();
        this.toggleModal(this.modalStarkBriefing, false);
        this.startMission();
      });
    }

    // 1. Start Mission (Shows Marvel intro & Stark Briefing)
    this.btnStartMission.addEventListener('click', () => {
      this.triggerMarvelAutoIntroSequence();
    });

    // 2. Audio Toggle
    this.btnAudioToggle.addEventListener('click', () => {
      this.sound.initContext();
      const muted = this.sound.toggleMute();
      this.audioIcon.textContent = muted ? '🔇 MUTED' : '🔊 MUSIC';
    });

    // 3. Trigger Spider-Sense (Radar & Button)
    const triggerSenseAction = () => this.triggerSpiderSenseSequence();
    this.btnTriggerSense.addEventListener('click', triggerSenseAction);
    this.radarTrigger.addEventListener('click', triggerSenseAction);

    // 4. Show Hint
    this.btnShowHint.addEventListener('click', () => {
      this.sound.playClickSFX();
      this.quizHintBox.style.display = 'block';
    });

    // 5. Continue Mission after Polaroid Reveal
    this.btnContinueMission.addEventListener('click', () => {
      this.sound.playThwipSFX();
      this.toggleModal(this.modalPolaroid, false);

      if (this.unlockedCount >= this.totalCapsules) {
        this.showGrandFinale();
      } else {
        this.updateMissionStatusUI();
      }
    });

    // 6. Gift Unboxing Click
    this.giftBoxWrapper.addEventListener('click', () => {
      this.unboxPhysicalGift();
    });

    // FEATURE #1: CAKE CANDLE BLOWING
    this.btnBlowCandle.addEventListener('click', () => {
      this.extinguishCandles();
    });

    // FEATURE #3: VOICE MEMO PLAYER
    this.btnPlayVoiceMemo.addEventListener('click', () => {
      this.toggleVoiceMemoPlayer();
    });

    // FEATURE #4: CERTIFICATE MODAL
    this.btnOpenCertificate.addEventListener('click', () => {
      this.generateAndOpenCertificate();
    });
    this.btnCloseCert.addEventListener('click', () => {
      this.toggleModal(this.modalCertificate, false);
    });
    this.btnDownloadCert.addEventListener('click', () => {
      this.downloadCertificateImage();
    });

    // FEATURE #6: EASTER EGG DOUBLE TAP / CLICK BADGE
    let badgeClicks = 0;
    this.issueBadge.addEventListener('click', () => {
      badgeClicks++;
      if (badgeClicks >= 2) {
        badgeClicks = 0;
        this.openEasterEggModal();
      } else {
        setTimeout(() => { badgeClicks = 0; }, 800);
      }
    });
    this.btnCloseEasterEgg.addEventListener('click', () => {
      this.toggleModal(this.modalEasterEgg, false);
    });

    // Lightbox Photo Click Handlers
    const openLightbox = (imgSrc, captionText) => {
      if (!this.modalPhotoLightbox || !imgSrc) return;
      this.sound.playSparkleSFX();
      this.lightboxFullImg.src = imgSrc;
      this.lightboxCaption.textContent = captionText || 'MEMORI PHOTO';
      this.toggleModal(this.modalPhotoLightbox, true);
    };
    this.openLightbox = openLightbox;

    if (this.polaroidImgContainer) {
      this.polaroidImgContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(this.polaroidPhoto.src, this.polaroidDateLabel.textContent);
      });
    }

    if (this.easterEggImgContainer) {
      this.easterEggImgContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        const easterEggImg = document.getElementById('easter-egg-photo');
        openLightbox(easterEggImg ? easterEggImg.src : '', 'SECRET EASTER EGG MEMORY');
      });
    }

    if (this.btnCloseLightbox) {
      this.btnCloseLightbox.addEventListener('click', () => {
        this.sound.playClickSFX();
        this.toggleModal(this.modalPhotoLightbox, false);
      });
    }

    if (this.modalPhotoLightbox) {
      this.modalPhotoLightbox.addEventListener('click', (e) => {
        if (e.target === this.modalPhotoLightbox) {
          this.sound.playClickSFX();
          this.modalPhotoLightbox.classList.remove('active');
        }
      });
    }
  }

  // FEATURE #6: KEYBOARD LISTENER FOR "SPIDEY" SECRET PASSCODE
  initKeyboardListeners() {
    let keyBuffer = '';
    document.addEventListener('keydown', (e) => {
      keyBuffer += e.key.toUpperCase();
      if (keyBuffer.length > 10) {
        keyBuffer = keyBuffer.substring(keyBuffer.length - 10);
      }
      if (keyBuffer.includes(this.data.easterEgg.passcode)) {
        keyBuffer = '';
        this.openEasterEggModal();
      }
    });
  }

  triggerMarvelAutoIntroSequence() {
    const marvelOverlay = document.getElementById('marvel-intro-overlay');
    if (!marvelOverlay || this.data.enableCountdown) return;

    this.sound.playFanfareSFX();
    marvelOverlay.classList.add('active');

    setTimeout(() => {
      marvelOverlay.classList.remove('active');
      this.openStarkBriefingModal();
    }, 1700);
  }

  openStarkBriefingModal() {
    this.sound.playSparkleSFX();
    const letter = this.data.starkLetter;
    if (letter) {
      const codeEl = document.getElementById('stark-protocol-code');
      const recipEl = document.getElementById('stark-recipient');
      const salutEl = document.getElementById('stark-salutation');
      const b1 = document.getElementById('stark-body-1');
      const b2 = document.getElementById('stark-body-2');
      const b3 = document.getElementById('stark-body-3');

      if (codeEl) codeEl.textContent = letter.protocolCode;
      if (recipEl) recipEl.textContent = letter.recipient;
      if (salutEl) salutEl.textContent = letter.salutation;
      if (b1) b1.textContent = letter.bodyParagraph1;
      if (b2) b2.textContent = letter.bodyParagraph2;
      if (b3) b3.textContent = letter.bodyParagraph3;
    }
    this.toggleModal(this.modalStarkBriefing, true);
  }

  startMission() {
    this.sound.playClickSFX();
    this.sound.startBgm();
    this.landingView.style.display = 'none';
    this.gameView.style.display = 'flex';
    setTimeout(() => {
      this.triggerSpiderSenseSequence();
    }, 600);
  }

  openEasterEggModal() {
    this.sound.playSparkleSFX();
    const egg = this.data.easterEgg;
    document.getElementById('easter-egg-photo').src = egg.photo;
    document.getElementById('easter-egg-heading').textContent = egg.noteHeading;
    document.getElementById('easter-egg-text').textContent = egg.noteText;

    if (typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    }

    this.toggleModal(this.modalEasterEgg, true);
  }

  renderProgressTracker() {
    this.progressTrackerBar.innerHTML = '';
    for (let i = 0; i < this.totalCapsules; i++) {
      const capsule = this.data.capsules[i];
      const slot = document.createElement('div');
      slot.className = `capsule-badge-slot ${i < this.unlockedCount ? 'unlocked' : ''}`;
      slot.innerHTML = capsule.badgeIcon;
      slot.title = capsule.title;
      this.progressTrackerBar.appendChild(slot);
    }
    this.progressCounterText.textContent = `${this.unlockedCount}/${this.totalCapsules} CAPSULES`;
  }

  updateMissionStatusUI() {
    if (this.currentCapsuleIndex < this.totalCapsules) {
      const currentCapsule = this.data.capsules[this.currentCapsuleIndex];
      const statusStories = [
        `🚨 MISI 01: Sinyal Percikan Terdeteksi di Area Coffee Shop! (${currentCapsule.title})`,
        `🌃 MISI 02: Radar Bergetar Hebat di Langit Malam Kota! (${currentCapsule.title})`,
        `🎡 MISI 03: Sinyal Tawa & Carnival Terbaca di Radar HQ! (${currentCapsule.title})`,
        `🎂 MISI 04: Sinyal Ulang Tahun Brand New Day Active! (${currentCapsule.title})`,
        `🧩 MISI 05: Sinyal Teka-Teki Silang TTS Spidey Rahasia Active! (${currentCapsule.title})`
      ];
      this.missionStatusText.textContent = statusStories[this.currentCapsuleIndex] || `MISI AKTIF: DETEKSI ${currentCapsule.code}`;
    }
  }

  triggerSpiderSenseSequence() {
    if (this.currentCapsuleIndex >= this.totalCapsules) {
      this.showGrandFinale();
      return;
    }

    this.sound.playSpiderSenseSFX();
    document.getElementById('app-container').classList.add('shake-screen');
    this.spidersenseOverlay.classList.add('active');

    setTimeout(() => {
      document.getElementById('app-container').classList.remove('shake-screen');
      this.spidersenseOverlay.classList.remove('active');
      this.openQuizModal(this.currentCapsuleIndex);
    }, 1200);
  }

  openQuizModal(index) {
    if (!window.MiniGames) {
      this.openRomanticQuestionModal(index);
      return;
    }

    this.miniGameViewport.innerHTML = '';
    let completed = false;
    const onComplete = () => {
      if (completed) return;
      completed = true;
      this.toggleModal(this.modalMiniGame, false);
      
      // Proceed to the romantic memory question before unlocking the capsule!
      setTimeout(() => {
        this.openRomanticQuestionModal(this.currentCapsuleIndex);
      }, 300);
    };

    let gameInstance = null;
    switch (index) {
      case 0:
        gameInstance = new window.MiniGames.TargetArcadeGame(this.miniGameViewport, onComplete);
        break;
      case 1:
        gameInstance = new window.MiniGames.WebDecoderGame(this.miniGameViewport, onComplete);
        break;
      case 2:
        gameInstance = new window.MiniGames.MemoryMatchGame(this.miniGameViewport, onComplete);
        break;
      case 3:
        gameInstance = new window.MiniGames.CrypticCipherGame(this.miniGameViewport, onComplete);
        break;
      case 4:
        gameInstance = new window.MiniGames.CrosswordTTSGame(this.miniGameViewport, onComplete);
        break;
      default:
        gameInstance = new window.MiniGames.CrosswordTTSGame(this.miniGameViewport, onComplete);
    }

    this.toggleModal(this.modalMiniGame, true);
    gameInstance.start();
  }

  openRomanticQuestionModal(index) {
    const capsule = this.data.capsules[index];
    this.quizTag.textContent = `${capsule.code} • KUIS MEMORI`;
    this.quizQuestion.textContent = capsule.question;
    this.quizHintBox.textContent = capsule.hint;
    this.quizHintBox.style.display = 'none';

    this.quizOptions.innerHTML = '';
    const prefixes = ['A', 'B', 'C', 'D'];

    capsule.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `
        <span class="opt-prefix">${prefixes[optIdx]}</span>
        <span>${optText}</span>
      `;
      btn.addEventListener('click', () => this.handleAnswerSelect(optIdx, capsule.correctIndex));
      this.quizOptions.appendChild(btn);
    });

    this.toggleModal(this.modalQuiz, true);
  }

  handleAnswerSelect(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
      this.sound.playThwipSFX();

      if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      }

      this.toggleModal(this.modalQuiz, false);
      this.unlockCapsule(this.currentCapsuleIndex);
    } else {
      this.sound.playWrongSFX();
      this.modalQuiz.querySelector('.modal-comic-box').classList.add('shake-screen');
      setTimeout(() => {
        this.modalQuiz.querySelector('.modal-comic-box').classList.remove('shake-screen');
      }, 400);
    }
  }

  unlockCapsule(index) {
    const capsule = this.data.capsules[index];
    this.unlockedCount++;
    this.currentCapsuleIndex++;

    this.renderProgressTracker();

    this.polaroidPhoto.src = capsule.photo;
    this.polaroidPhoto.alt = capsule.title;
    this.polaroidDateLabel.textContent = capsule.dateLabel;
    this.polaroidNoteHeading.textContent = capsule.noteHeading;
    this.polaroidNoteText.textContent = capsule.noteText;

    if (this.unlockedCount >= this.totalCapsules) {
      this.btnContinueMission.innerHTML = `THWIP TO GRAND FINALE! 🎉`;
    } else {
      this.btnContinueMission.innerHTML = `THWIP TO NEXT CAPSULE 🕸️`;
    }

    // Hide note box & continue button initially until scratch canvas is fully completed!
    const noteBox = document.getElementById('polaroid-note-box');
    const promptBanner = document.getElementById('scratch-prompt-banner');
    if (noteBox) noteBox.style.display = 'none';
    if (this.btnContinueMission) this.btnContinueMission.style.display = 'none';
    if (promptBanner) promptBanner.style.display = 'block';

    this.isCurrentScratchComplete = false;

    // FEATURE #5: INIT SCRATCH-OFF FOIL CANVAS
    this.initScratchCanvas();

    this.toggleModal(this.modalPolaroid, true);
  }

  // FEATURE #5: SCRATCH-OFF CANVAS IMPLEMENTATION
  initScratchCanvas() {
    const canvas = this.scratchCanvas;
    const ctx = canvas.getContext('2d');

    canvas.style.display = 'block';
    canvas.style.opacity = '1';
    canvas.width = canvas.offsetWidth || 300;
    canvas.height = canvas.offsetHeight || 280;

    // Fill with silver comic halftone pattern
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Overlay text
    ctx.font = 'bold 20px Bangers, cursive';
    ctx.fillStyle = '#101010';
    ctx.textAlign = 'center';
    ctx.fillText("🕸️ GOSOK UNTUK BUKA MEMORI!", canvas.width / 2, canvas.height / 2);

    let isScratching = false;

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();
      this.checkScratchProgress(ctx, canvas);
    };

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    canvas.onmousedown = (e) => { isScratching = true; const pos = getPos(e); scratch(pos.x, pos.y); };
    canvas.onmousemove = (e) => { if (isScratching) { const pos = getPos(e); scratch(pos.x, pos.y); } };
    canvas.onmouseup = () => { isScratching = false; };

    const handleTouchStart = (e) => {
      if (e.cancelable) e.preventDefault();
      isScratching = true;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const handleTouchMove = (e) => {
      if (e.cancelable) e.preventDefault();
      if (isScratching) {
        const pos = getPos(e);
        scratch(pos.x, pos.y);
      }
    };

    const handleTouchEnd = () => {
      isScratching = false;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
  }

  checkScratchProgress(ctx, canvas) {
    if (this.isCurrentScratchComplete) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentCount = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparentCount++;
      }

      const percent = (transparentCount / (pixels.length / 4)) * 100;
      if (percent > 45 && canvas.style.opacity !== '0') {
        this.isCurrentScratchComplete = true;
        canvas.style.transition = 'opacity 0.5s ease';
        canvas.style.opacity = '0';
        setTimeout(() => { canvas.style.display = 'none'; }, 500);

        // Sound & celebratory effect
        this.sound.playFanfareSFX();
        this.sound.playSparkleSFX();
        if (typeof confetti === 'function') {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        }

        // Hide prompt banner and reveal note box & continue button!
        const promptBanner = document.getElementById('scratch-prompt-banner');
        const noteBox = document.getElementById('polaroid-note-box');
        if (promptBanner) promptBanner.style.display = 'none';

        if (noteBox) {
          noteBox.style.display = 'block';
          noteBox.style.animation = 'modalSlide 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }

        if (this.btnContinueMission) {
          this.btnContinueMission.style.display = 'flex';
          this.btnContinueMission.style.animation = 'modalSlide 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
      }
    } catch (e) {
      // Fallback for CORS or canvas read issues
    }
  }

  showGrandFinale() {
    this.sound.playFanfareSFX();
    this.gameView.style.display = 'none';
    this.finaleView.style.display = 'block';

    const finaleData = this.data.grandFinale;
    this.finaleHeroName.textContent = finaleData.heroGreeting;
    this.finaleSubheading.textContent = finaleData.subheading;
    this.finaleRomanticLetter.textContent = finaleData.romanticMessage;

    // Render 4 Photo Gallery Grid
    this.finaleGallery.innerHTML = '';
    this.data.capsules.forEach((cap) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.style.cursor = 'pointer';
      card.title = 'Klik untuk lihat foto versi penuh!';
      card.innerHTML = `
        <img src="${cap.photo}" alt="${cap.title}">
        <label>${cap.dateLabel}</label>
      `;
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof this.openLightbox === 'function') {
          this.openLightbox(cap.photo, cap.dateLabel);
        }
      });
      this.finaleGallery.appendChild(card);
    });

    // FEATURE #1: INIT MICROPHONE CANDLE BLOW SENSOR
    this.sound.initMicrophoneBlowListener(() => {
      this.extinguishCandles();
    });

    // Grand Celebration Confetti Fireworks
    if (typeof confetti === 'function') {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
      }, 350);
    }
  }

  // FEATURE #1: CANDLE EXTINGUISH LOGIC
  extinguishCandles() {
    if (this.isCandleExtinguished) return;
    this.isCandleExtinguished = true;

    this.sound.playWindBlowSFX();
    this.sound.playFanfareSFX();

    document.querySelectorAll('.candle-item').forEach(el => {
      el.classList.add('extinguished');
    });

    this.micStatusBadge.innerHTML = `🎉 LILIN BERHASIL DITIUP! HAPPY BIRTHDAY! 🎉`;
    this.micStatusBadge.style.background = '#FCD705';
    this.micStatusBadge.style.color = '#101010';

    if (typeof confetti === 'function') {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 } });
    }
  }

  // FEATURE #3: VOICE MEMO PLAYER TOGGLE
  toggleVoiceMemoPlayer() {
    if (this.voiceMemoAudio.paused) {
      this.voiceMemoAudio.play();
      this.voiceSignalLed.classList.add('active');
      this.btnPlayVoiceMemo.innerHTML = `⏸️ PAUSE TRANSMISSION`;
    } else {
      this.voiceMemoAudio.pause();
      this.voiceSignalLed.classList.remove('active');
      this.btnPlayVoiceMemo.innerHTML = `▶️ PLAY VOICE MEMO`;
    }
  }

  // FEATURE #4: CERTIFICATE GENERATOR & DOWNLOADER
  generateAndOpenCertificate() {
    this.sound.playSparkleSFX();
    const cert = this.data.certificate;
    const certCanvas = document.createElement('canvas');
    certCanvas.width = 1200;
    certCanvas.height = 840;
    const ctx = certCanvas.getContext('2d');

    // 1. Rich Vintage Parchment Background with Gold Warm Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 840);
    bgGrad.addColorStop(0, '#FFFDF4');
    bgGrad.addColorStop(0.5, '#FFFBF0');
    bgGrad.addColorStop(1, '#FFF5E0');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 840);

    // 2. Halftone Accent Dots along edges
    ctx.fillStyle = 'rgba(252, 215, 5, 0.12)';
    for (let x = 15; x < 1200; x += 30) {
      for (let y = 15; y < 840; y += 30) {
        if (x < 50 || x > 1150 || y < 50 || y > 790) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 3. Double Outer Frame (Thick Dark + Metallic Gold + Crimson Ribbon Accent)
    ctx.strokeStyle = '#101010';
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, 1160, 800);

    ctx.strokeStyle = '#FCD705';
    ctx.lineWidth = 6;
    ctx.strokeRect(34, 34, 1132, 772);

    ctx.strokeStyle = '#E62429';
    ctx.lineWidth = 3;
    ctx.strokeRect(44, 44, 1112, 752);

    // 4. Stylized Spider-Web Corner Accents (All 4 Corners)
    const drawCornerWeb = (cx, cy, dirX, dirY) => {
      ctx.save();
      ctx.strokeStyle = 'rgba(230, 36, 41, 0.4)';
      ctx.lineWidth = 2;
      for (let r = 20; r <= 80; r += 20) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI / 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + dirX * 90, cy);
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, cy + dirY * 90);
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + dirX * 65, cy + dirY * 65);
      ctx.stroke();
      ctx.restore();
    };
    drawCornerWeb(46, 46, 1, 1);
    drawCornerWeb(1154, 46, -1, 1);
    drawCornerWeb(46, 794, 1, -1);
    drawCornerWeb(1154, 794, -1, -1);

    // 5. Header Banner Badge
    ctx.font = '700 20px Montserrat, sans-serif';
    ctx.fillStyle = '#0476F2';
    ctx.textAlign = 'center';
    ctx.fillText("STARK INDUSTRIES • AVENGERS INITIATIVE • SPIDER-VERSE HQ", 600, 95);

    // Main Certificate Header
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.font = '900 52px Bangers, cursive';
    ctx.fillStyle = '#E62429';
    ctx.fillText(cert.title, 600, 155);
    ctx.restore();

    ctx.font = '700 22px Montserrat, sans-serif';
    ctx.fillStyle = '#444';
    ctx.fillText("THIS DIPLOMA IS PROUDLY CONFERRED UPON", 600, 215);

    // 6. Recipient Name Banner (JACKLYN TAMARA)
    ctx.save();
    ctx.shadowColor = 'rgba(230, 36, 41, 0.4)';
    ctx.shadowBlur = 12;
    ctx.font = '900 76px Bangers, cursive';

    // Gold fill with dark stroke
    ctx.fillStyle = '#FCD705';
    ctx.strokeStyle = '#101010';
    ctx.lineWidth = 4;
    ctx.strokeText(cert.recipientName, 600, 310);
    ctx.fillText(cert.recipientName, 600, 310);
    ctx.restore();

    // Golden Decorative Line under name
    ctx.strokeStyle = '#FCD705';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(350, 335);
    ctx.lineTo(850, 335);
    ctx.stroke();

    // 7. Title Granted
    ctx.font = '900 26px Montserrat, sans-serif';
    ctx.fillStyle = '#E62429';
    ctx.fillText(cert.titleGiven, 600, 395);

    // 8. Citation Text
    ctx.font = '700 italic 22px "Comic Neue", cursive, sans-serif';
    ctx.fillStyle = '#222';
    ctx.fillText("Certified across the Multiverse for bringing immense joy, endless warmth,", 600, 460);
    ctx.fillText("unforgettable memories, and unconditional love as the #1 Superhero Partner in Life.", 600, 495);

    // 9. Left Seal: 100% Official Gold Wax Medallion
    ctx.save();
    const sealX = 240;
    const sealY = 650;

    // Outer Scalloped Rays
    ctx.fillStyle = '#FCD705';
    ctx.strokeStyle = '#101010';
    ctx.lineWidth = 3;
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI) / 12;
      const x1 = sealX + Math.cos(angle) * 72;
      const y1 = sealY + Math.sin(angle) * 72;
      ctx.beginPath();
      ctx.arc(x1, y1, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Inner Circle
    ctx.beginPath();
    ctx.arc(sealX, sealY, 65, 0, Math.PI * 2);
    ctx.fillStyle = '#E62429';
    ctx.fill();
    ctx.strokeStyle = '#FCD705';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.font = '900 18px Bangers, cursive';
    ctx.fillStyle = '#FCD705';
    ctx.textAlign = 'center';
    ctx.fillText("OFFICIAL SEAL", sealX, sealY - 15);

    ctx.font = '900 28px Bangers, cursive';
    ctx.fillStyle = '#FFF';
    ctx.fillText("★ 100% ★", sealX, sealY + 12);

    ctx.font = '700 13px Montserrat, sans-serif';
    ctx.fillStyle = '#FCD705';
    ctx.fillText("SUPERHERO APPROVED", sealX, sealY + 35);
    ctx.restore();

    // 10. Right Signatures & Verification ID
    ctx.textAlign = 'center';

    // Signature 1
    ctx.font = '700 26px "Permanent Marker", cursive';
    ctx.fillStyle = '#101010';
    ctx.fillText("Peter Parker 🕷️ & Hendry ✍️", 860, 640);

    ctx.strokeStyle = '#101010';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(680, 655);
    ctx.lineTo(1040, 655);
    ctx.stroke();

    ctx.font = '700 16px Montserrat, sans-serif';
    ctx.fillStyle = '#555';
    ctx.fillText("AUTHORIZED SPIDER-VERSE SIGNATORIES", 860, 680);

    ctx.font = '900 15px monospace';
    ctx.fillStyle = '#0476F2';
    ctx.fillText(`VERIFICATION CODE: ${cert.certificateNumber}`, 860, 708);

    // Render Preview Canvas
    const previewCanvas = document.getElementById('certificate-canvas-preview');
    const pCtx = previewCanvas.getContext('2d');
    previewCanvas.width = certCanvas.width;
    previewCanvas.height = certCanvas.height;
    pCtx.drawImage(certCanvas, 0, 0);

    this.certCanvasData = certCanvas;
    this.toggleModal(this.modalCertificate, true);
  }

  downloadCertificateImage() {
    if (!this.certCanvasData) return;
    this.sound.playThwipSFX();

    const link = document.createElement('a');
    link.download = `Jacklyn_Tamara_Superhero_Certificate.png`;
    link.href = this.certCanvasData.toDataURL('image/png');
    link.click();
  }

  unboxPhysicalGift() {
    if (this.giftBoxWrapper.classList.contains('unboxed')) return;

    this.sound.playThwipSFX();
    this.sound.playFanfareSFX();

    this.giftBoxWrapper.classList.add('unboxed');

    if (typeof confetti === 'function') {
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.7 } });
    }

    setTimeout(() => {
      const gift = this.data.grandFinale;
      this.giftClueText.innerHTML = `
        <strong>${gift.giftHeadline}</strong><br><br>
        ${gift.giftClue}<br><br>
        <div style="background: #101010; color: #FCD705; padding: 10px; font-family: var(--font-header); font-size: 1.4rem; text-align: center; border: 3px solid #101010; border-radius: 4px; letter-spacing: 2px;">
          PASSCODE: ${gift.giftSecretPasscode}
        </div>
      `;
      this.giftClueBox.classList.add('active');
    }, 600);
  }
}

// Initialize Application safely regardless of DOM load state
const startMemoryQuestApp = () => {
  if (!window.app) {
    window.app = new MemoryQuestApp();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startMemoryQuestApp);
} else {
  startMemoryQuestApp();
}
