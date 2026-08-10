/**
 * Spider-Sense Memory Quest: Brand New Day Edition
 * Interactive Mini-Games Suite (Target Practice, Web Decoder, Memory Match, Illusion QTE)
 */

// Helper to safely play SFX without throwing unhandled exceptions
function safeAudio(fnName) {
  try {
    if (window.soundEngine && typeof window.soundEngine[fnName] === 'function') {
      window.soundEngine[fnName]();
    }
  } catch (err) {
    // Ignore audio errors gracefully
  }
}

// Helper to bind touch and click handlers reliably across all mobile & desktop browsers
function bindTouchClick(element, callback) {
  if (!element) return;
  let lastTrigger = 0;
  const handler = (e) => {
    const now = Date.now();
    if (now - lastTrigger < 220) return;
    lastTrigger = now;
    callback(e);
  };

  element.addEventListener('click', handler);
  element.addEventListener('touchend', handler, { passive: true });
}

class TargetArcadeGame {
  constructor(container, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.hits = 0;
    this.targetCount = 5;
    this.active = false;
  }

  start() {
    this.hits = 0;
    this.active = true;
    this.render();
    setTimeout(() => this.spawnTargets(), 100);
  }

  render() {
    this.container.innerHTML = `
      <div class="minigame-header">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="comic-stamp" style="background: var(--comic-red);">MISSION 1: SPIDEY TARGET PRACTICE</div>
          <button type="button" id="btn-skip-mg-1" class="btn-skip-minigame" style="background: var(--comic-yellow); border: 2px solid #101010; font-family: var(--font-header); font-size: 0.95rem; padding: 4px 10px; cursor: pointer; box-shadow: 2px 2px 0 #101010;">
            ⚡ UNLOCK MEMORY CAPSULE #01
          </button>
        </div>
        <h3 class="minigame-title">🎯 SPIDEY TARGET PRACTICE</h3>
        <p class="minigame-sub">Tap the correct target icons! Beware of explosive traps!</p>
        <div class="minigame-score-badge">SPIDEY HITS: <span id="target-counter">0</span> / 5</div>
      </div>
      <div id="target-arcade-arena" class="arcade-arena">
        <div class="arcade-instruction">Find & hit the targets! Learn which icons are safe and which ones explode!</div>
      </div>
    `;

    this.arena = this.container.querySelector('#target-arcade-arena');
    this.counterEl = this.container.querySelector('#target-counter');

    const btnSkip = this.container.querySelector('#btn-skip-mg-1');
    bindTouchClick(btnSkip, () => {
      this.active = false;
      if (typeof this.onComplete === 'function') this.onComplete();
    });
  }

  spawnTargets() {
    if (!this.active || this.hits >= this.targetCount) return;

    const activeTargets = this.arena.querySelectorAll('.floating-target:not(.hit)').length;
    const needed = Math.min(3 - activeTargets, this.targetCount - this.hits);

    for (let i = 0; i < needed; i++) {
      this.createSingleTarget();
    }
  }

  createSingleTarget() {
    if (!this.active || this.hits >= this.targetCount) return;

    const targetEl = document.createElement('div');
    targetEl.className = 'floating-target';
    
    // Various emojis shown on targets
    const icons = ['🕷️', '🕷️', '🕷️', '🎈', '⭐', '🎁', '🎃', '💎'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const isSpider = (randomIcon === '🕷️');

    targetEl.innerHTML = `<span>${randomIcon}</span><div class="target-crosshair"></div>`;
    if (!isSpider) {
      targetEl.setAttribute('data-trap', 'true');
    }

    const arenaRect = this.arena.getBoundingClientRect();
    const width = arenaRect.width || 320;
    const height = arenaRect.height || 240;
    const maxX = Math.max(10, width - 70);
    const maxY = Math.max(10, height - 70);

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    targetEl.style.left = `${x}px`;
    targetEl.style.top = `${y}px`;

    bindTouchClick(targetEl, () => {
      if (!this.active || targetEl.classList.contains('hit')) return;
      targetEl.classList.add('hit');

      if (isSpider) {
        // CORRECT TARGET CLICKED!
        safeAudio('playThwipSFX');
        this.hits++;
        if (this.counterEl) this.counterEl.innerText = Math.min(this.hits, this.targetCount);

        setTimeout(() => {
          if (targetEl.parentNode) targetEl.parentNode.removeChild(targetEl);
        }, 200);

        if (this.hits >= this.targetCount) {
          this.active = false;
          this.finishGame();
        } else {
          setTimeout(() => this.spawnTargets(), 200);
        }
      } else {
        // BOMB TRAP CLICKED! EXPLODE AND RESET TO 0!
        targetEl.innerHTML = `<span>💥</span>`;
        targetEl.style.background = '#FF3B30';
        safeAudio('playErrorSFX');

        this.arena.classList.add('shake');
        setTimeout(() => this.arena.classList.remove('shake'), 400);

        // Render animated comic fail notification overlay
        const notifOverlay = document.createElement('div');
        notifOverlay.className = 'comic-notif-overlay fail';
        notifOverlay.innerHTML = `
          <div class="notif-boom-icon">💣💥</div>
          <div class="notif-comic-bubble">KABOOM! TRAP EXPLODED!</div>
          <div class="notif-subtext">Oops! You hit a bomb trap. Target hits reset to 0!</div>
          <button type="button" class="notif-action-btn" id="btn-restart-mg1">
            🔄 RETRY NOW (RESET 0)
          </button>
        `;

        this.arena.appendChild(notifOverlay);

        // Reset score back to 0
        this.hits = 0;
        if (this.counterEl) this.counterEl.innerText = '0';

        const dismissFail = () => {
          if (notifOverlay.parentNode) notifOverlay.parentNode.removeChild(notifOverlay);
          const oldTargets = this.arena.querySelectorAll('.floating-target');
          oldTargets.forEach(t => t.remove());
          this.spawnTargets();
        };

        const btnRestart = notifOverlay.querySelector('#btn-restart-mg1');
        bindTouchClick(btnRestart, dismissFail);
        setTimeout(dismissFail, 2200);
      }
    });

    this.arena.appendChild(targetEl);

    setTimeout(() => {
      if (this.active && targetEl.parentNode && !targetEl.classList.contains('hit')) {
        targetEl.remove();
        this.spawnTargets();
      }
    }, 2200);
  }

  finishGame() {
    safeAudio('playSuccessSFX');
    if (window.confetti) window.confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

    this.arena.innerHTML = `
      <div class="arcade-success-banner">
        <div style="font-size: 2.8rem; margin-bottom: 5px;">🎉</div>
        <div style="font-family: var(--font-header); font-size: 1.8rem; color: #FCD705; text-shadow: 2px 2px 0 #101010; margin-bottom: 12px;">
          MISSION 1 ACCOMPLISHED!
        </div>
        <button type="button" id="btn-next-mission-1" class="btn-primary-comic" style="font-size: 1.3rem; padding: 12px 24px; width: 100%; justify-content: center;">
          ⚡ UNLOCK MEMORY CAPSULE #01
        </button>
      </div>
    `;

    const triggerNext = () => {
      if (typeof this.onComplete === 'function') this.onComplete();
    };

    const btnNext = this.arena.querySelector('#btn-next-mission-1');
    bindTouchClick(btnNext, triggerNext);

    setTimeout(triggerNext, 1000);
  }
}

class WebDecoderGame {
  constructor(container, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.targetCode = [2, 1, 1, 2];
    this.currentCode = [0, 0, 0, 0];
    this.resetTimeout = null;
  }

  start() {
    this.currentCode = [0, 0, 0, 0];
    this.render();
  }

  stepDigit(index, delta) {
    this.currentCode[index] = (this.currentCode[index] + delta + 10) % 10;
    const el = this.container.querySelector(`#dial-val-${index}`);
    if (el) el.innerText = this.currentCode[index];
    safeAudio('playPopSFX');
  }

  resetDials() {
    if (this.resetTimeout) clearTimeout(this.resetTimeout);
    this.currentCode = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      const el = this.container.querySelector(`#dial-val-${i}`);
      if (el) el.innerText = '0';
    }
    const statusEl = this.container.querySelector('#decoder-status');
    if (statusEl) {
      statusEl.className = 'decoder-status-badge';
      statusEl.innerHTML = `STANDBY • INPUT FREQUENCY CODE`;
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="minigame-header">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="comic-stamp" style="background: var(--comic-blue); color: #FFF;">MISSION 2: SPIDER-DECODER</div>
          <button type="button" id="btn-skip-mg-2" class="btn-skip-minigame" style="background: var(--comic-yellow); border: 2px solid #101010; font-family: var(--font-header); font-size: 0.95rem; padding: 4px 10px; cursor: pointer; box-shadow: 2px 2px 0 #101010;">
            ⚡ UNLOCK MEMORY CAPSULE #02
          </button>
        </div>
        <h3 class="minigame-title">🔐 SPIDER-TRACER FREQUENCY CIPHER</h3>
        <p class="minigame-sub">Use ▲ / ▼ buttons to spin dials & align the 4 secret frequency digits!</p>
      </div>

      <div class="decoder-dials-wrapper">
        ${[0, 1, 2, 3].map(i => `
          <div class="dial-card">
            <button type="button" class="btn-dial-nav" id="btn-up-${i}">▲</button>
            <div class="dial-val" id="dial-val-${i}">0</div>
            <button type="button" class="btn-dial-nav" id="btn-down-${i}">▼</button>
          </div>
        `).join('')}
      </div>

      <div id="decoder-status" class="decoder-status-badge">STANDBY • TUNING SPIDER-TRACER FREQUENCY</div>

      <button type="button" id="btn-submit-decoder" class="btn-primary-comic" style="width: 100%; justify-content: center; margin-top: 15px; font-size: 1.25rem;">
        ⚡ CRACK FREQUENCY NOW
      </button>
    `;

    // Skip top button
    const btnSkip = this.container.querySelector('#btn-skip-mg-2');
    bindTouchClick(btnSkip, () => {
      if (typeof this.onComplete === 'function') this.onComplete();
    });

    // Attach touch & click handlers directly to ▲, ▼, and dial values
    for (let i = 0; i < 4; i++) {
      const btnUp = this.container.querySelector(`#btn-up-${i}`);
      const btnDown = this.container.querySelector(`#btn-down-${i}`);
      const dialVal = this.container.querySelector(`#dial-val-${i}`);

      bindTouchClick(btnUp, () => this.stepDigit(i, 1));
      bindTouchClick(btnDown, () => this.stepDigit(i, -1));
      if (dialVal) {
        dialVal.style.cursor = 'pointer';
        bindTouchClick(dialVal, () => this.stepDigit(i, 1));
      }
    }

    // Submit button
    const btnSubmit = this.container.querySelector('#btn-submit-decoder');
    bindTouchClick(btnSubmit, () => this.submitCode());
  }

  submitCode() {
    const isMatch = this.currentCode.every((val, idx) => val === this.targetCode[idx]);

    if (isMatch) {
      this.unlockSuccess();
    } else {
      safeAudio('playErrorSFX');
      
      const notifOverlay = document.createElement('div');
      notifOverlay.className = 'comic-notif-overlay fail';
      notifOverlay.innerHTML = `
        <div class="notif-boom-icon">❌🔐</div>
        <div class="notif-comic-bubble">FREQUENCY CODE MISMATCH!</div>
        <div class="notif-subtext">Signal combination misaligned. Dials reset to 0000!</div>
        <button type="button" class="notif-action-btn" id="btn-reset-notif-2">
          🔄 RETRY NOW (0000)
        </button>
      `;

      this.container.appendChild(notifOverlay);

      const dismissFail = () => {
        if (notifOverlay.parentNode) notifOverlay.parentNode.removeChild(notifOverlay);
        this.resetDials();
      };

      const btnReset = notifOverlay.querySelector('#btn-reset-notif-2');
      bindTouchClick(btnReset, dismissFail);

      if (this.resetTimeout) clearTimeout(this.resetTimeout);
      this.resetTimeout = setTimeout(dismissFail, 2500);
    }
  }

  unlockSuccess() {
    if (this.resetTimeout) clearTimeout(this.resetTimeout);
    safeAudio('playSuccessSFX');
    if (window.confetti) window.confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });

    const notifOverlay = document.createElement('div');
    notifOverlay.className = 'comic-notif-overlay success';
    notifOverlay.innerHTML = `
      <div class="notif-boom-icon">✨🔐✨</div>
      <div class="notif-comic-bubble">BOOM! FREQUENCY MATCHED!</div>
      <div class="notif-subtext">Awesome! Spider-Tracer signal connected perfectly! Unlocking Memory Capsule #02...</div>
      <button type="button" class="notif-action-btn" id="btn-next-success-2" style="background: var(--comic-yellow);">
        🚀 UNLOCK MEMORY CAPSULE #02
      </button>
    `;

    this.container.appendChild(notifOverlay);

    const triggerNext = () => {
      if (typeof this.onComplete === 'function') this.onComplete();
    };

    const btnNext = notifOverlay.querySelector('#btn-next-success-2');
    bindTouchClick(btnNext, triggerNext);

    setTimeout(triggerNext, 1200);
  }
}

class MemoryMatchGame {
  constructor(container, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.currentStage = 1;
    this.totalStages = 4;

    this.allIconsPool = [
      { id: 'spidey', icon: '🕷️', name: 'Spidey' },
      { id: 'heart', icon: '💖', name: 'Love' },
      { id: 'coffee', icon: '☕', name: 'Coffee' },
      { id: 'star', icon: '⭐', name: 'Star' },
      { id: 'gift', icon: '🎁', name: 'Gift' },
      { id: 'pumpkin', icon: '🎃', name: 'Pumpkin' },
      { id: 'diamond', icon: '💎', name: 'Diamond' },
      { id: 'pizza', icon: '🍕', name: 'Pizza' }
    ];

    this.stageConfigs = [
      { stage: 1, pairs: 2, title: "STAGE 1: 2 MEMORY CARD PAIRS (WARM UP)", peekTime: 2000, gridClass: "grid-cols-2" },
      { stage: 2, pairs: 3, title: "STAGE 2: 3 MEMORY CARD PAIRS (GETTING HOT)", peekTime: 2000, gridClass: "grid-cols-3" },
      { stage: 3, pairs: 5, title: "STAGE 3: 5 MEMORY CARD PAIRS (SPIDEY SPEED)", peekTime: 3000, gridClass: "grid-cols-5" },
      { stage: 4, pairs: 8, title: "STAGE 4: 8 MEMORY CARD PAIRS (ULTIMATE MASTER)", peekTime: 3000, gridClass: "grid-cols-4" }
    ];

    this.flippedCards = [];
    this.matchedPairs = 0;
    this.isChecking = false;
    this.isPreviewing = true;
    this.previewTimer = null;
  }

  start() {
    this.currentStage = 1;
    this.startStage(1);
  }

  startStage(stageNum) {
    this.currentStage = stageNum;
    const config = this.stageConfigs[stageNum - 1];

    const selectedIcons = this.allIconsPool.slice(0, config.pairs);
    
    const deck = [];
    selectedIcons.forEach(item => {
      deck.push({ ...item }, { ...item });
    });

    this.cards = deck.sort(() => Math.random() - 0.5);
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.isChecking = false;
    this.isPreviewing = true;

    this.renderStage(config);
    this.startPreview(config.peekTime);
  }

  renderStage(config) {
    this.container.innerHTML = `
      <div class="minigame-header">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="comic-stamp" style="background: var(--comic-yellow); color: #101010;">MISSION 3: MEMORY MATCH</div>
          <button type="button" id="btn-skip-mg-3" class="btn-skip-minigame" style="background: var(--comic-yellow); border: 2px solid #101010; font-family: var(--font-header); font-size: 0.95rem; padding: 4px 10px; cursor: pointer; box-shadow: 2px 2px 0 #101010;">
            ⚡ UNLOCK MEMORY CAPSULE #03
          </button>
        </div>
        <h3 class="minigame-title">🃏 ${config.title}</h3>
        <p class="minigame-sub" id="memory-sub">👀 PEEKING AT CARDS (${config.peekTime/1000} SECONDS)... REMEMBER POSITIONS!</p>
        <div class="minigame-score-badge" id="memory-counter">MATCHED: <span id="pair-counter">0</span> / ${config.pairs} PAIRS</div>
      </div>

      <div class="memory-grid ${config.gridClass}" id="memory-cards-grid">
        ${this.cards.map((card, idx) => `
          <div class="memory-card flipped" data-index="${idx}" data-id="${card.id}">
            <div class="card-inner">
              <div class="card-front">🕸️</div>
              <div class="card-back">${card.icon}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <button type="button" id="btn-auto-match-cards" class="btn-primary-comic" style="width: 100%; justify-content: center; margin-top: 15px; font-size: 1.1rem; background: var(--comic-paper); color: #101010;">
        💡 MATCH ALL PAIRS & UNLOCK
      </button>
    `;

    const btnSkip = this.container.querySelector('#btn-skip-mg-3');
    bindTouchClick(btnSkip, () => {
      if (this.previewTimer) clearTimeout(this.previewTimer);
      if (typeof this.onComplete === 'function') this.onComplete();
    });

    const btnAutoMatch = this.container.querySelector('#btn-auto-match-cards');
    bindTouchClick(btnAutoMatch, () => {
      if (this.previewTimer) clearTimeout(this.previewTimer);
      this.finishGame();
    });

    this.bindEvents();
  }

  startPreview(peekDuration) {
    safeAudio('playSparkleSFX');
    if (this.previewTimer) clearTimeout(this.previewTimer);

    this.previewTimer = setTimeout(() => {
      this.isPreviewing = false;
      const cardEls = this.container.querySelectorAll('.memory-card');
      cardEls.forEach(el => el.classList.remove('flipped'));

      const config = this.stageConfigs[this.currentStage - 1];
      const subEl = this.container.querySelector('#memory-sub');
      if (subEl) subEl.innerHTML = `Flip 2 cards to match <b>${config.pairs} pairs of icons!</b>`;
      safeAudio('playThwipSFX');
    }, peekDuration);
  }

  bindEvents() {
    const cardEls = this.container.querySelectorAll('.memory-card');
    cardEls.forEach(cardEl => {
      bindTouchClick(cardEl, () => {
        if (this.isPreviewing || this.isChecking || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) {
          return;
        }

        const index = parseInt(cardEl.dataset.index);
        safeAudio('playPopSFX');
        cardEl.classList.add('flipped');
        this.flippedCards.push({ index, element: cardEl, id: cardEl.dataset.id });

        if (this.flippedCards.length === 2) {
          this.checkMatch();
        }
      });
    });
  }

  checkMatch() {
    this.isChecking = true;
    const [c1, c2] = this.flippedCards;
    const config = this.stageConfigs[this.currentStage - 1];

    if (c1.id === c2.id) {
      safeAudio('playSuccessSFX');
      c1.element.classList.add('matched');
      c2.element.classList.add('matched');
      this.matchedPairs++;
      this.flippedCards = [];
      this.isChecking = false;

      const counterEl = this.container.querySelector('#pair-counter');
      if (counterEl) counterEl.innerText = this.matchedPairs;

      if (this.matchedPairs >= config.pairs) {
        if (this.currentStage < this.totalStages) {
          setTimeout(() => {
            this.startStage(this.currentStage + 1);
          }, 800);
        } else {
          this.finishGame();
        }
      }
    } else {
      safeAudio('playErrorSFX');
      setTimeout(() => {
        c1.element.classList.remove('flipped');
        c2.element.classList.remove('flipped');
        this.flippedCards = [];
        this.isChecking = false;
      }, 700);
    }
  }

  finishGame() {
    if (this.previewTimer) clearTimeout(this.previewTimer);
    const cardEls = this.container.querySelectorAll('.memory-card');
    cardEls.forEach(el => el.classList.add('flipped', 'matched'));

    safeAudio('playSuccessSFX');
    if (window.confetti) window.confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });

    const notifOverlay = document.createElement('div');
    notifOverlay.className = 'comic-notif-overlay success';
    notifOverlay.innerHTML = `
      <div class="notif-boom-icon">🎉🃏🧠</div>
      <div class="notif-comic-bubble">ULTIMATE SPIDEY MEMORY MASTER!</div>
      <div class="notif-subtext">Outstanding! Your sharp Spidey memory cleared all 4 stages up to 8 card pairs! Unlocking Memory Capsule #03...</div>
      <button type="button" class="notif-action-btn" id="btn-next-success-3" style="background: var(--comic-yellow);">
        🚀 UNLOCK MEMORY CAPSULE #03
      </button>
    `;

    this.container.appendChild(notifOverlay);

    const triggerNext = () => {
      if (typeof this.onComplete === 'function') this.onComplete();
    };

    const btnNext = notifOverlay.querySelector('#btn-next-success-3');
    bindTouchClick(btnNext, triggerNext);

    setTimeout(triggerNext, 1200);
  }
}

class CrypticCipherGame {
  constructor(container, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.currentStage = 1;
    this.totalStages = 3;
    this.stages = [
      {
        id: 1,
        title: "STAGE 1: SPIDEY LOGIC EQUATION",
        sub: "Calculate the value of Spider-Sense symbols!",
        question: "⚖️ Given the logic equation:<br>• <b>1 Heart (💖) = 2 Spiders (🕷️)</b><br>• <b>1 Web (🕸️) = 3 Hearts (💖)</b><br><br>How many Spiders (🕷️) are needed to balance 1 Web (🕸️)?",
        options: [
          "A. 4 Spiders",
          "B. 5 Spiders",
          "C. 6 Spiders",
          "D. 8 Spiders"
        ],
        correctIndex: 2, // C. 6 Spiders (3 x 2 = 6)
        hint: "Hint: 1 Web = 3 Hearts, and each Heart = 2 Spiders. So 3 x 2 = 6!"
      },
      {
        id: 2,
        title: "STAGE 2: SPIDER-SENSE RIDDLE",
        sub: "Think about the logic of this secret riddle!",
        question: "🔮 <b>I am at the start of UP, in the middle of SUN, and at the end of YOU... But NOT in the month of AUGUST. What am I?</b>",
        options: [
          "A. Night Breeze",
          "B. The Letter U",
          "C. Shadow",
          "D. Time"
        ],
        correctIndex: 1, // B. Letter U
        hint: "Hint: Look at the first letter of UP, middle of SUN, and last letter of YOU!"
      },
      {
        id: 3,
        title: "STAGE 3: MASTER LOGIC CIPHER CODE",
        sub: "Deduce the 3 secret numbers of the final vault!",
        question: "🔐 <b>Crack the 3-Digit Vault Code:</b><br><br>" +
          "• <b>6 - 8 - 2</b> : 1 digit is correct & in the CORRECT position<br>" +
          "• <b>6 - 1 - 4</b> : 1 digit is correct but in the WRONG position<br>" +
          "• <b>2 - 0 - 6</b> : 2 digits are correct but in WRONG positions<br>" +
          "• <b>7 - 3 - 8</b> : Nothing is correct<br>" +
          "• <b>7 - 8 - 0</b> : 1 digit is correct but in the WRONG position<br><br>" +
          "<b>What is the 3-Digit Secret Code?</b>",
        options: [
          "A. 2 - 4 - 0",
          "B. 0 - 4 - 2",
          "C. 6 - 1 - 2",
          "D. 0 - 8 - 4"
        ],
        correctIndex: 1, // B. 0-4-2
        hint: "Hint: Elimination! 7, 3, 8 are wrong. Last digit is 2. First is 0. Middle is 4 = (0-4-2)!"
      }
    ];
  }

  start() {
    this.currentStage = 1;
    this.renderStage();
  }

  renderStage() {
    const stage = this.stages[this.currentStage - 1];

    this.container.innerHTML = `
      <div class="minigame-header">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="comic-stamp" style="background: var(--comic-purple); color: #FFF;">MISSION 4: CRYPTIC CIPHER</div>
          <button type="button" id="btn-skip-mg-4" class="btn-skip-minigame" style="background: var(--comic-yellow); border: 2px solid #101010; font-family: var(--font-header); font-size: 0.95rem; padding: 4px 10px; cursor: pointer; box-shadow: 2px 2px 0 #101010;">
            ⚡ UNLOCK MEMORY CAPSULE #04
          </button>
        </div>
        <h3 class="minigame-title">🧩 ${stage.title}</h3>
        <p class="minigame-sub">${stage.sub}</p>
        <div class="minigame-score-badge">LOGIC PROGRESS: STAGE ${this.currentStage} / 3</div>
      </div>

      <div style="background: #FFF; border: 4px solid var(--comic-dark); box-shadow: 6px 6px 0 var(--comic-dark); padding: 18px; border-radius: 8px; margin-bottom: 15px;">
        <div style="font-family: var(--font-body); font-size: 1.1rem; line-height: 1.5; color: #101010; margin-bottom: 15px;">
          ${stage.question}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;" id="cipher-options-grid">
          ${stage.options.map((opt, idx) => `
            <button type="button" class="btn-primary-comic cipher-opt-btn" data-index="${idx}" style="font-size: 1.05rem; padding: 10px 12px; justify-content: flex-start; text-align: left; background: var(--comic-paper); color: #101010;">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    const btnSkip = this.container.querySelector('#btn-skip-mg-4');
    bindTouchClick(btnSkip, () => {
      if (typeof this.onComplete === 'function') this.onComplete();
    });

    const optBtns = this.container.querySelectorAll('.cipher-opt-btn');
    optBtns.forEach(btn => {
      bindTouchClick(btn, () => {
        const idx = parseInt(btn.dataset.index);
        this.handleAnswer(idx, stage.correctIndex);
      });
    });
  }

  handleAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
      safeAudio('playSuccessSFX');
      if (window.confetti) window.confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });

      if (this.currentStage < this.totalStages) {
        this.currentStage++;
        this.renderStage();
      } else {
        this.finishGame();
      }
    } else {
      safeAudio('playErrorSFX');

      const notifOverlay = document.createElement('div');
      notifOverlay.className = 'comic-notif-overlay fail';
      notifOverlay.innerHTML = `
        <div class="notif-boom-icon">❌🧩</div>
        <div class="notif-comic-bubble">INCORRECT LOGIC ANSWER!</div>
        <div class="notif-subtext">Oops! Analyze carefully once more, follow the hints!</div>
        <button type="button" class="notif-action-btn" id="btn-retry-cipher">
          🔄 RETRY STAGE ${this.currentStage}
        </button>
      `;

      this.container.appendChild(notifOverlay);

      const btnRetry = notifOverlay.querySelector('#btn-retry-cipher');
      bindTouchClick(btnRetry, () => {
        if (notifOverlay.parentNode) notifOverlay.parentNode.removeChild(notifOverlay);
      });
    }
  }

  finishGame() {
    safeAudio('playSuccessSFX');
    if (window.confetti) window.confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });

    const notifOverlay = document.createElement('div');
    notifOverlay.className = 'comic-notif-overlay success';
    notifOverlay.innerHTML = `
      <div class="notif-boom-icon">🧠🧩🎉</div>
      <div class="notif-comic-bubble">GENIUS! CIPHER SOLVED!</div>
      <div class="notif-subtext">Brilliant! Your sharp mind solved all 3 logic riddles! Unlocking Memory Capsule #04...</div>
      <button type="button" class="notif-action-btn" id="btn-next-success-4" style="background: var(--comic-yellow);">
        🚀 UNLOCK MEMORY CAPSULE #04
      </button>
    `;

    this.container.appendChild(notifOverlay);

    const triggerNext = () => {
      if (typeof this.onComplete === 'function') this.onComplete();
    };

    const btnNext = notifOverlay.querySelector('#btn-next-success-4');
    bindTouchClick(btnNext, triggerNext);

    setTimeout(triggerNext, 1200);
  }
}

class CrosswordTTSGame {
  constructor(container, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.gridRows = 10;
    this.gridCols = 18;
    this.activeCell = { r: 0, c: 0 };
    this.selectedWordId = null;

    // 8 Verified Interlocked Personal Words
    this.words = [
      { id: 'm1', number: 1, type: 'across', title: '1 ACROSS', clue: 'Our favorite coffee? (9 letters)', answer: 'JANJIJIWA', r: 0, c: 0 },
      { id: 'm2', number: 2, type: 'across', title: '2 ACROSS', clue: 'Our favorite singer? (6 letters)', answer: 'JORDAN', r: 1, c: 3 },
      { id: 'm3', number: 3, type: 'across', title: '3 ACROSS', clue: 'Where we first met? (8 letters)', answer: 'NUTRIHUB', r: 2, c: 4 },
      { id: 'm4', number: 4, type: 'across', title: '4 ACROSS', clue: 'Our favorite sushi? (7 letters)', answer: 'BALISTA', r: 2, c: 11 },
      { id: 'm5', number: 5, type: 'across', title: '5 ACROSS', clue: 'Which cartoon character looks like you? (5 letters)', answer: 'LOOPY', r: 5, c: 4 },
      { id: 'd1', number: 1, type: 'down', title: '1 DOWN', clue: 'Our very first restaurant / eating spot? (9 letters)', answer: 'WARKOPADD', r: 0, c: 7 },
      { id: 'd2', number: 2, type: 'down', title: '2 DOWN', clue: 'Our first running event? (9 letters)', answer: 'SIERRARUN', r: 1, c: 14 },
      { id: 'd3', number: 3, type: 'down', title: '3 DOWN', clue: 'Brand event where I first approached you? (6 letters)', answer: 'POCARI', r: 4, c: 5 }
    ];

    this.userAnswers = {};
    this.solution = {};
    this.cellNumbers = {};

    this.initSolutionMap();
  }

  initSolutionMap() {
    this.words.forEach(w => {
      this.cellNumbers[`${w.r},${w.c}`] = w.number;
      for (let i = 0; i < w.answer.length; i++) {
        const r = w.type === 'across' ? w.r : w.r + i;
        const c = w.type === 'across' ? w.c + i : w.c;
        this.solution[`${r},${c}`] = w.answer[i];
      }
    });
  }

  start() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="minigame-header">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="comic-stamp" style="background: var(--comic-red); color: #FFF;">MISSION 5: SPIDEY CROSSWORD (TTS)</div>
          <button type="button" id="btn-skip-mg-5" class="btn-skip-minigame" style="background: var(--comic-yellow); border: 2px solid #101010; font-family: var(--font-header); font-size: 0.95rem; padding: 4px 10px; cursor: pointer; box-shadow: 2px 2px 0 #101010;">
            ⚡ UNLOCK MEMORY CAPSULE #05
          </button>
        </div>
        <h3 class="minigame-title">🧩 SPIDEY CROSSWORD PUZZLE</h3>
        <p class="minigame-sub">Tap cells or clues below to fill in letters!</p>
      </div>

      <div class="tts-wrapper">
        <!-- Hidden input to trigger native mobile/smartphone keyboard -->
        <input type="text" id="tts-hidden-input" autocomplete="off" autocapitalize="characters" spellcheck="false" inputmode="text" style="position: absolute; opacity: 0.01; font-size: 16px; border: 0; width: 100%; height: 1px; left: 0; bottom: 0; z-index: -1;">

        <div class="tts-grid-container" id="tts-grid">
          ${Array.from({ length: this.gridRows }).map((_, r) => `
            <div class="tts-grid-row">
              ${Array.from({ length: this.gridCols }).map((_, c) => {
                const key = `${r},${c}`;
                const isValid = !!this.solution[key];
                const num = this.cellNumbers[key] || '';
                const val = this.userAnswers[key] || '';
                if (!isValid) return `<div class="tts-cell blocked"></div>`;
                return `
                  <div class="tts-cell active-cell" data-r="${r}" data-c="${c}" id="tts-cell-${r}-${c}">
                    ${num ? `<span class="tts-cell-num">${num}</span>` : ''}
                    <span class="tts-cell-val">${val}</span>
                  </div>
                `;
              }).join('')}
            </div>
          `).join('')}
        </div>

        <div class="tts-clues-container">
          <div class="tts-clue-group">
            <h4 class="tts-clue-heading">➡️ ACROSS</h4>
            ${this.words.filter(w => w.type === 'across').map(w => `
              <div class="tts-clue-item" data-id="${w.id}">
                <b>${w.number}.</b> ${w.clue}
              </div>
            `).join('')}
          </div>
          <div class="tts-clue-group">
            <h4 class="tts-clue-heading">⬇️ DOWN</h4>
            ${this.words.filter(w => w.type === 'down').map(w => `
              <div class="tts-clue-item" data-id="${w.id}">
                <b>${w.number}.</b> ${w.clue}
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;">
        <button type="button" id="btn-tts-focus-kbd" class="btn-primary-comic" style="flex: 1; justify-content: center; font-size: 1rem; background: #00F0FF; color: #0A1128;">
          ⌨️ TYPE WITH PHONE KEYBOARD
        </button>
        <button type="button" id="btn-tts-hint" class="btn-icon" style="flex: 1; justify-content: center; background: #FFF;">
          💡 HINT
        </button>
        <button type="button" id="btn-tts-check" class="btn-primary-comic" style="flex: 1; justify-content: center; font-size: 1.05rem; background: var(--comic-yellow); color: #101010;">
          ⚡ CHECK ANSWERS
        </button>
      </div>
    `;

    const btnSkip = this.container.querySelector('#btn-skip-mg-5');
    bindTouchClick(btnSkip, () => {
      if (typeof this.onComplete === 'function') this.onComplete();
    });
  }

  bindEvents() {
    const hiddenInput = this.container.querySelector('#tts-hidden-input');

    if (hiddenInput) {
      hiddenInput.addEventListener('input', () => {
        const val = hiddenInput.value.toUpperCase();
        hiddenInput.value = '';
        if (val) {
          const lastChar = val.slice(-1);
          if (/^[A-Z]$/.test(lastChar)) {
            this.handleInputLetter(lastChar);
          }
        }
      });

      hiddenInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          this.handleBackspace();
        }
      });
    }

    const cells = this.container.querySelectorAll('.tts-cell.active-cell');
    cells.forEach(cell => {
      bindTouchClick(cell, () => {
        const r = parseInt(cell.dataset.r);
        const c = parseInt(cell.dataset.c);
        this.selectCell(r, c);
        this.focusHiddenInput();
      });
    });

    const clueItems = this.container.querySelectorAll('.tts-clue-item');
    clueItems.forEach(item => {
      bindTouchClick(item, () => {
        const wId = item.dataset.id;
        const w = this.words.find(word => word.id === wId);
        if (w) {
          this.selectedWordId = wId;
          this.selectCell(w.r, w.c);
          this.focusHiddenInput();
        }
      });
    });

    const btnKbd = this.container.querySelector('#btn-tts-focus-kbd');
    if (btnKbd) {
      bindTouchClick(btnKbd, () => this.focusHiddenInput());
    }

    const btnHint = this.container.querySelector('#btn-tts-hint');
    bindTouchClick(btnHint, () => this.giveHint());

    const btnCheck = this.container.querySelector('#btn-tts-check');
    bindTouchClick(btnCheck, () => this.checkAnswers());

    this.keyHandler = (e) => {
      if (!this.container || !this.container.offsetParent) return;
      if (e.target && e.target.tagName === 'INPUT') return;
      const k = e.key.toUpperCase();
      if (/^[A-Z]$/.test(k)) {
        this.handleInputLetter(k);
      } else if (e.key === 'Backspace') {
        this.handleBackspace();
      }
    };
    document.addEventListener('keydown', this.keyHandler);

    this.selectCell(0, 0);
  }

  focusHiddenInput() {
    const input = this.container.querySelector('#tts-hidden-input');
    if (input) {
      input.focus();
    }
  }

  selectCell(r, c) {
    this.activeCell = { r, c };
    const cells = this.container.querySelectorAll('.tts-cell.active-cell');
    cells.forEach(el => el.classList.remove('selected'));

    const currentCellEl = this.container.querySelector(`#tts-cell-${r}-${c}`);
    if (currentCellEl) currentCellEl.classList.add('selected');
  }

  handleInputLetter(letter) {
    const key = `${this.activeCell.r},${this.activeCell.c}`;
    if (!this.solution[key]) return;

    this.userAnswers[key] = letter;
    const valEl = this.container.querySelector(`#tts-cell-${this.activeCell.r}-${this.activeCell.c} .tts-cell-val`);
    if (valEl) valEl.innerText = letter;

    safeAudio('playPopSFX');
    this.moveToNextCell();
  }

  handleBackspace() {
    const key = `${this.activeCell.r},${this.activeCell.c}`;
    if (this.solution[key]) {
      this.userAnswers[key] = '';
      const valEl = this.container.querySelector(`#tts-cell-${this.activeCell.r}-${this.activeCell.c} .tts-cell-val`);
      if (valEl) valEl.innerText = '';
      safeAudio('playPopSFX');
    }
  }

  moveToNextCell() {
    let { r, c } = this.activeCell;
    let nextKey = `${r},${c + 1}`;

    if (this.solution[nextKey]) {
      this.selectCell(r, c + 1);
    } else {
      nextKey = `${r + 1},${c}`;
      if (this.solution[nextKey]) {
        this.selectCell(r + 1, c);
      }
    }
  }

  giveHint() {
    safeAudio('playSparkleSFX');
    const unfilledKeys = Object.keys(this.solution).filter(k => this.userAnswers[k] !== this.solution[k]);

    if (unfilledKeys.length > 0) {
      const randomKey = unfilledKeys[Math.floor(Math.random() * unfilledKeys.length)];
      const [r, c] = randomKey.split(',').map(Number);
      this.userAnswers[randomKey] = this.solution[randomKey];

      const valEl = this.container.querySelector(`#tts-cell-${r}-${c} .tts-cell-val`);
      if (valEl) {
        valEl.innerText = this.solution[randomKey];
        valEl.style.color = '#00F0FF';
      }
    }
  }

  checkAnswers() {
    let allCorrect = true;
    const totalKeys = Object.keys(this.solution).length;
    let correctCount = 0;

    Object.keys(this.solution).forEach(key => {
      const [r, c] = key.split(',').map(Number);
      const cellEl = this.container.querySelector(`#tts-cell-${r}-${c}`);
      if (this.userAnswers[key] === this.solution[key]) {
        correctCount++;
        if (cellEl) cellEl.classList.add('correct-answer');
      } else {
        allCorrect = false;
        if (cellEl) cellEl.classList.add('wrong-answer');
        setTimeout(() => {
          if (cellEl) cellEl.classList.remove('wrong-answer');
        }, 600);
      }
    });

    if (allCorrect && correctCount === totalKeys) {
      this.finishGame();
    } else {
      safeAudio('playErrorSFX');
    }
  }

  finishGame() {
    if (this.keyHandler) document.removeEventListener('keydown', this.keyHandler);
    safeAudio('playSuccessSFX');
    if (window.confetti) window.confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });

    const notifOverlay = document.createElement('div');
    notifOverlay.className = 'comic-notif-overlay success';
    notifOverlay.innerHTML = `
      <div class="notif-boom-icon">🧩✏️🎉</div>
      <div class="notif-comic-bubble">ULTIMATE CROSSWORD PUZZLE MASTER!</div>
      <div class="notif-subtext">Brilliant! Your genius mind completed all of Spidey's Memory Crossword! Unlocking Memory Capsule #05...</div>
      <button type="button" class="notif-action-btn" id="btn-next-success-5" style="background: var(--comic-yellow);">
        🚀 UNLOCK MEMORY CAPSULE #05
      </button>
    `;

    this.container.appendChild(notifOverlay);

    const triggerNext = () => {
      if (typeof this.onComplete === 'function') this.onComplete();
    };

    const btnNext = notifOverlay.querySelector('#btn-next-success-5');
    bindTouchClick(btnNext, triggerNext);

    setTimeout(triggerNext, 1400);
  }
}

window.MiniGames = {
  TargetArcadeGame,
  WebDecoderGame,
  MemoryMatchGame,
  IllusionQTEGame: CrypticCipherGame,
  CrypticCipherGame,
  CrosswordTTSGame
};
