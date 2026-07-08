// ==========================================================================
// 1. SYSTEM GATEKEEPER & LOCK SYSTEM
// ==========================================================================
const CORRECT_PASSWORD = "gabre"; // Change this to the actual secret nickname (lowercase match)

const lockScreen = document.getElementById('lock-screen');
const mainContent = document.getElementById('main-content');
const passCodeInput = document.getElementById('passCode');
const unlockBtn = document.getElementById('unlockBtn');
const errorMsg = document.getElementById('error-msg');

unlockBtn.addEventListener('click', checkPassword);
passCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

function checkPassword() {
    const enteredText = passCodeInput.value.trim().toLowerCase();
    if (enteredText === CORRECT_PASSWORD) {
        // Correct Password Sequence
        lockScreen.classList.add('unlocked');
        mainContent.style.display = 'block';
        setTimeout(() => {
            lockScreen.style.display = 'none';
            triggerConfetti();
        }, 800);
    } else {
        // Wrong password action
        errorMsg.style.display = 'block';
        passCodeInput.classList.add('shake');
        setTimeout(() => passCodeInput.classList.remove('shake'), 500);
    }
}

// ==========================================================================
// 2. THEME CONTROLLER & GLOBAL DECORATORS
// ==========================================================================
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});

// Interactive Trail Particle Sparkles
const sparkleContainer = document.getElementById('sparkle-container');
window.addEventListener('mousemove', (e) => {
    if(Math.random() > 0.15) return; // Cap the spawn rate
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    
    // Set up randomized destination trajectories for animations
    const moveX = (Math.random() - 0.5) * 60;
    const moveY = (Math.random() - 0.5) * 60;
    sparkle.style.setProperty('--mdx', `${moveX}px`);
    sparkle.style.setProperty('--mdy', `${moveY}px`);
    
    sparkleContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
});

// ==========================================================================
// 3. HEART PROGRESS METER ENGINE
// ==========================================================================
const heroBtn = document.getElementById('heroBtn');
const loveFill = document.getElementById('loveFill');
const loveText = document.getElementById('loveText');

heroBtn.addEventListener('click', () => {
    heroBtn.disabled = true;
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        loveFill.style.width = progress + '%';
        loveText.textContent = progress + '% Loaded...';
        
        if(progress === 100) {
            clearInterval(interval);
            loveText.textContent = "1000000% Loaded! ❤️ My love for you is infinite!";
            triggerConfetti();
            // Scroll directly to the next section smoothly
            document.querySelector('.love-meter-section').scrollIntoView({ behavior: 'smooth' });
        }
    }, 25);
});

// ==========================================================================
// 4. GENERATIVE CONTEXTUAL MODULES (Random Messages & Letter Typist)
// ==========================================================================
const romanticQuotes = [
    "You are my today and all of my tomorrows. ❤️",
    "Distance means so little when someone means so much. ✈️💖",
    "Falling for you was the best thing I ever did. 🥰",
    "Your laugh is my absolute favorite sound in the world.",
    "Every day with you is a brand new page of my happiest fairy tale.",
    "You're not just my boyfriend; you are my home. 🏠💕"
];

const randomMsgBtn = document.getElementById('newMessage');
const randomMsgText = document.getElementById('randomMessage');

randomMsgBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * romanticQuotes.length);
    randomMsgText.style.opacity = 0;
    setTimeout(() => {
        randomMsgText.textContent = romanticQuotes[randomIndex];
        randomMsgText.style.opacity = 1;
    }, 200);
});

// Letter auto-typing engine
const letterText = `Hey Girri, 

Happy Birthday to the most amazing guy in the entire universe! 🎂✨

Even when things feel chaotic or far apart, talking to you instantly resets my day. I appreciate every little laugh, every late-night conversation, and every version of 'you' that you share with me. 

You deserve the entire world today and always. I love you so much! Always your sidekick. 💖`;

let typeIndex = 0;
const textElement = document.getElementById('typingText');
let typingStarted = false;

function typeLetter() {
    if (typeIndex < letterText.length) {
        textElement.textContent += letterText.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeLetter, 35);
    }
}

// Intersection Observer ensures the letter only types when visible on screen
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting && !typingStarted) {
            typingStarted = true;
            typeLetter();
        }
    });
}, { threshold: 0.2 });
observer.observe(document.querySelector('.letter-section'));

// ==========================================================================
// 5. CELEBRATION NODE - INTERACTIVE BIRTHDAY CAKE
// ==========================================================================
const flame = document.getElementById('flame');
const smoke = document.getElementById('smoke');
const cakeText = document.getElementById('cakeText');
const cutCakeBtn = document.getElementById('cutCake');
let candleBlown = false;

flame.addEventListener('click', () => {
    if(!candleBlown) {
        flame.style.display = 'none';
        smoke.style.display = 'block';
        cakeText.textContent = "Make your wish! Now let's cut it! 🍰";
        candleBlown = true;
        triggerConfetti();
    }
});

cutCakeBtn.addEventListener('click', () => {
    if(!candleBlown) {
        cakeText.textContent = "Blow out the flame first! 🕯️";
        return;
    }
    cakeText.textContent = "Yum! Piece of cake heading your way! 🍰❤️";
    triggerConfetti();
});

// ==========================================================================
// 6. ADDICTIVE MINI CATCH ENGINE (Catch the Heart Game)
// ==========================================================================
const movingHeart = document.getElementById('movingHeart');
const gameArea = document.getElementById('gameArea');
const scoreSpan = document.querySelector('#gameScore span');
let score = 0;

movingHeart.addEventListener('mouseover', relocateHeart);
movingHeart.addEventListener('click', () => {
    score++;
    scoreSpan.textContent = score;
    triggerConfetti();
    
    if(score >= 10) {
        movingHeart.style.display = 'none';
        document.getElementById('gameScore').innerHTML = "🎉 Completed! You caught my heart 10 times! 👑";
        checkGameMilestones();
    } else {
        relocateHeart();
    }
});

function relocateHeart() {
    const areaWidth = gameArea.clientWidth - 40;
    const areaHeight = gameArea.clientHeight - 40;
    
    const newX = Math.floor(Math.random() * areaWidth);
    const newY = Math.floor(Math.random() * areaHeight);
    
    movingHeart.style.left = newX + 'px';
    movingHeart.style.top = newY + 'px';
}

// ==========================================================================
// 7. SURPRISE GIFT MODULES & LUCKY RAFFLES
// ==========================================================================
window.openGift = function(giftNumber) {
    const giftBox = document.querySelectorAll('.gift-box')[giftNumber - 1];
    const message = document.getElementById(`giftMessage${giftNumber}`);
    
    if(!giftBox.classList.contains('open')) {
        giftBox.classList.add('open');
        message.classList.remove('hidden');
        triggerConfetti();
        checkGameMilestones();
    }
};

const luckyPrizes = [
    "🎫 Redeemable Ticket: One Giant Hug!",
    "🎬 Prize Unlocked: Free Movie Date Night Choice!",
    "🍕 Treat Coupon: Your Favorite Dinner On Me!",
    "☕ Gift Pass: Lazy Sunday Breakfast in Bed Voucher!"
];

window.luckyGift = function() {
    const resultElement = document.getElementById('luckyResult');
    // Randomize select reward allocation
    const randomIndex = Math.floor(Math.random() * luckyPrizes.length);
    resultElement.style.opacity = 0;
    
    setTimeout(() => {
        resultElement.textContent = luckyPrizes[randomIndex];
        resultElement.style.opacity = 1;
        triggerConfetti();
        checkGameMilestones();
    }, 250);
};

// ==========================================================================
// 8. ACHIEVEMENT SUB-ENGINES & FINALE HANDLERS
// ==========================================================================
let achievementReady = false;

function checkGameMilestones() {
    // Requires min activity across elements to confirm eligibility
    const openedGifts = document.querySelectorAll('.gift-box.open').length;
    const luckyPlayed = document.getElementById('luckyResult').textContent !== "";
    
    if(score >= 10 && openedGifts >= 3 && luckyPlayed) {
        achievementReady = true;
    }
}

window.unlockAchievement = function() {
    const badge = document.getElementById('achievementBadge');
    if(achievementReady) {
        badge.classList.remove('hidden');
        triggerConfetti();
    } else {
        alert("Finish all items first! (Catch 10 hearts, open 3 gifts, and try the Lucky Gift) 😉");
    }
};

// Big Celebration Trigger Button
document.getElementById('celebrateBtn').addEventListener('click', () => {
    // Heavy burst setting sequence
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
        confetti({ particleCount: 100, spread: 100, origin: { x: 0.3, y: 0.5 } });
        confetti({ particleCount: 100, spread: 100, origin: { x: 0.7, y: 0.5 } });
    }, 300);
});

// Recurring Toast System Popups
const toastQuote = document.getElementById('floatingQuote');
setInterval(() => {
    if(mainContent.style.display === 'block') {
        const index = Math.floor(Math.random() * romanticQuotes.length);
        toastQuote.textContent = romanticQuotes[index];
        toastQuote.classList.add('show');
        
        setTimeout(() => {
            toastQuote.classList.remove('show');
        }, 4000);
    }
}, 15000); // Triggers every 15 seconds

// Canvas Confetti integration function
function triggerConfetti() {
    confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
    });
}