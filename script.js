document.addEventListener('DOMContentLoaded', function() {
    // 创建飘落的爱心效果
    createFallingHearts();
    
    // 点击表白按钮事件
    const heartButton = document.getElementById('heart-button');
    const loveModal = document.getElementById('love-modal');
    const closeModal = document.querySelector('.close');
    
    heartButton.addEventListener('click', function() {
        loveModal.classList.add('show');
        createHeartAnimation();
        createFireworks();
    });
    
    closeModal.addEventListener('click', function() {
        loveModal.classList.remove('show');
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === loveModal) {
            loveModal.classList.remove('show');
        }
    });
    
    // 照片的交互效果
    const photoFrame = document.querySelector('.photo-frame');
    const photo = document.querySelector('.photo');
    
    photoFrame.addEventListener('mouseover', function() {
        anime({
            targets: photo,
            scale: 1.05,
            duration: 800,
            easing: 'easeOutElastic(1, .5)'
        });
    });
    
    photoFrame.addEventListener('mouseout', function() {
        anime({
            targets: photo,
            scale: 1,
            duration: 600,
            easing: 'easeOutElastic(1, .5)'
        });
    });
    
    // 创建页脚浮动爱心
    createFloatingHearts();
    
    // 添加点击页面出现"爱你"文字的效果
    document.addEventListener('click', function(event) {
        // 避免点击按钮和模态框时也触发效果
        if (event.target.closest('.heart-button') || event.target.closest('.modal-content') || event.target === loveModal || 
            event.target.closest('.music-player') || event.target.closest('.click-tip') || event.target.closest('.back-button')) {
            return;
        }
        
        createLoveText(event.pageX, event.pageY);
    });
    
    // 音乐播放器控制
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const backgroundMusic = document.getElementById('background-music');
    
    // 接收欢迎页面传递的音乐播放状态
    const shouldPlayMusic = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = parseFloat(localStorage.getItem('musicCurrentTime') || '0');
    
    // 如果从欢迎页面来并且音乐正在播放，则继续播放
    if (shouldPlayMusic && document.referrer.includes('index.html')) {
        backgroundMusic.currentTime = musicCurrentTime;
        playMusic();
    }
    
    // 尝试播放音乐的函数
    function playMusic() {
        backgroundMusic.play()
            .then(() => {
                playPauseIcon.classList.remove('fa-play');
                playPauseIcon.classList.add('fa-pause');
            })
            .catch(error => {
                console.error("播放音乐失败:", error);
            });
    }
    
    // 音乐播放暂停控制
    playPauseBtn.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            playMusic();
        } else {
            backgroundMusic.pause();
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        }
    });
    
    // 处理音乐播放结束事件
    backgroundMusic.addEventListener('ended', function() {
        // 因为设置了loop属性，这个事件可能不会触发
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    });
    
    // 用户首次点击页面自动播放音乐（如果不是从欢迎页面来的）
    if (!shouldPlayMusic && !document.referrer.includes('index.html')) {
        document.addEventListener('click', function initAudio() {
            playMusic();
            document.removeEventListener('click', initAudio);
        }, { once: true });
    }
    
    // 返回按钮点击事件，保存音乐状态
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认行为
            
            // 保存音乐播放状态
            localStorage.setItem('musicPlaying', !backgroundMusic.paused);
            localStorage.setItem('musicCurrentTime', backgroundMusic.currentTime);
            
            // 添加返回动画效果
            anime({
                targets: '.container',
                opacity: [1, 0],
                scale: [1, 0.95],
                duration: 400,
                easing: 'easeInOutQuad',
                complete: function() {
                    // 动画完成后返回欢迎页面
                    window.location.href = 'index.html';
                }
            });
        });
    }
});

// 创建飘落的爱心
function createFallingHearts() {
    const container = document.querySelector('.falling-hearts');
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        createHeart(container);
    }
    
    // 持续创建新的爱心
    setInterval(() => {
        createHeart(container);
    }, 3000);
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // 随机大小
    const size = Math.random() * 20 + 10;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    
    // 随机位置
    const left = Math.random() * 100;
    heart.style.left = `${left}%`;
    
    // 随机颜色
    const hue = Math.random() * 60 + 320; // 粉色到紫色的范围
    const saturation = 80 + Math.random() * 20;
    const lightness = 70 + Math.random() * 20;
    heart.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`;
    
    container.appendChild(heart);
    
    // 动画
    const duration = Math.random() * 5 + 5;
    const rotation = Math.random() * 360;
    const delay = Math.random() * 2;
    
    anime({
        targets: heart,
        translateY: [
            { value: window.innerHeight + 100, duration: duration * 1000, delay: delay * 1000 }
        ],
        translateX: [
            { value: (Math.random() - 0.5) * 200, duration: duration * 1000 }
        ],
        rotate: [
            { value: rotation, duration: duration * 500 }
        ],
        opacity: [
            { value: 0.8, duration: 500, delay: delay * 1000 },
            { value: 0, duration: 1000, delay: (delay + duration - 1) * 1000 }
        ],
        easing: 'linear',
        complete: function() {
            heart.remove();
        }
    });
}

// 模态框中的心跳动画
function createHeartAnimation() {
    const heartContainer = document.querySelector('.heart-animation');
    heartContainer.innerHTML = '';
    
    const heart = document.createElement('div');
    heart.style.width = '80px';
    heart.style.height = '80px';
    heart.style.backgroundColor = '#e91e63';
    heart.style.transform = 'rotate(45deg)';
    heart.style.position = 'relative';
    
    const before = document.createElement('div');
    before.style.content = '';
    before.style.position = 'absolute';
    before.style.width = '80px';
    before.style.height = '80px';
    before.style.backgroundColor = '#e91e63';
    before.style.borderRadius = '50%';
    before.style.top = '-40px';
    before.style.left = '0';
    
    const after = document.createElement('div');
    after.style.content = '';
    after.style.position = 'absolute';
    after.style.width = '80px';
    after.style.height = '80px';
    after.style.backgroundColor = '#e91e63';
    after.style.borderRadius = '50%';
    after.style.top = '0';
    after.style.left = '-40px';
    
    heart.appendChild(before);
    heart.appendChild(after);
    heartContainer.appendChild(heart);
    
    anime({
        targets: heart,
        scale: [
            { value: 1.1, duration: 800, easing: 'easeOutElastic(1, .8)' },
            { value: 1, duration: 800, easing: 'easeInElastic(1, .8)' }
        ],
        loop: true
    });
}

// 创建页脚浮动爱心
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartCount = 10;
    
    for (let i = 0; i < heartCount; i++) {
        createFloatingHeart(container);
    }
}

function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // 随机大小
    const size = Math.random() * 15 + 5;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    
    // 随机位置
    const left = Math.random() * 100;
    heart.style.left = `${left}%`;
    heart.style.top = `${Math.random() * 100}%`;
    
    // 随机颜色
    const hue = Math.random() * 60 + 320;
    const saturation = 80 + Math.random() * 20;
    const lightness = 70 + Math.random() * 20;
    heart.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`;
    
    container.appendChild(heart);
    
    // 动画
    const duration = Math.random() * 3 + 3;
    
    anime({
        targets: heart,
        translateY: [
            { value: -30, duration: duration * 1000 },
            { value: 0, duration: duration * 1000 }
        ],
        scale: [
            { value: 1.2, duration: duration * 500 },
            { value: 1, duration: duration * 500 }
        ],
        opacity: [
            { value: 0.8, duration: 500 },
            { value: 0.3, duration: duration * 1500 }
        ],
        loop: true,
        easing: 'easeInOutQuad',
        delay: Math.random() * 3000
    });
}

// 创建烟花效果
function createFireworks() {
    const container = document.querySelector('.falling-hearts');
    const fireworksCount = 5;
    
    for (let i = 0; i < fireworksCount; i++) {
        setTimeout(() => {
            createFirework(container);
        }, i * 300);
    }
}

function createFirework(container) {
    const firework = document.createElement('div');
    firework.style.position = 'absolute';
    firework.style.width = '5px';
    firework.style.height = '5px';
    firework.style.borderRadius = '50%';
    firework.style.backgroundColor = '#e91e63';
    
    // 随机位置
    const left = 30 + Math.random() * 40;
    const top = 30 + Math.random() * 40;
    firework.style.left = `${left}%`;
    firework.style.top = `${top}%`;
    
    container.appendChild(firework);
    
    // 烟花爆炸效果
    const particleCount = 30;
    const particles = [];
    
    // 爆炸动画
    anime({
        targets: firework,
        scale: [
            { value: 1, duration: 0 },
            { value: 3, duration: 500 },
            { value: 0, duration: 300 }
        ],
        easing: 'easeOutExpo',
        complete: function() {
            // 创建粒子
            for (let i = 0; i < particleCount; i++) {
                createParticle(container, left, top, particles);
            }
            
            // 粒子动画
            anime({
                targets: particles,
                translateX: function() {
                    return anime.random(-100, 100);
                },
                translateY: function() {
                    return anime.random(-100, 100);
                },
                scale: [
                    { value: 1, duration: 0 },
                    { value: 0, duration: 1000 }
                ],
                easing: 'easeOutExpo',
                duration: 1000,
                complete: function() {
                    particles.forEach(particle => {
                        particle.remove();
                    });
                }
            });
            
            firework.remove();
        }
    });
}

function createParticle(container, left, top, particles) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.borderRadius = '50%';
    
    // 随机颜色
    const hue = Math.random() * 60 + 320;
    particle.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
    
    particle.style.left = `${left}%`;
    particle.style.top = `${top}%`;
    
    container.appendChild(particle);
    particles.push(particle);
}

// 创建点击出现的"爱你"文字
function createLoveText(x, y) {
    const container = document.querySelector('.falling-hearts');
    const loveText = document.createElement('div');
    
    // 随机选择爱的表达
    const loveTexts = ['爱你', '心动', '宝贝', '想你', '甜蜜', '温柔', '挚爱', '唯一'];
    const randomText = loveTexts[Math.floor(Math.random() * loveTexts.length)];
    
    loveText.innerText = randomText;
    loveText.style.position = 'absolute';
    loveText.style.left = `${x}px`;
    loveText.style.top = `${y}px`;
    loveText.style.fontFamily = "'Ma Shan Zheng', cursive";
    loveText.style.fontSize = '1.8rem';
    loveText.style.color = '#e91e63';
    loveText.style.textShadow = '0 0 5px rgba(255,255,255,0.8)';
    loveText.style.pointerEvents = 'none';
    loveText.style.zIndex = '10';
    loveText.style.userSelect = 'none';
    loveText.style.transform = 'translate(-50%, -50%)';
    
    container.appendChild(loveText);
    
    // 添加随机旋转效果
    const rotation = -15 + Math.random() * 30;
    
    // 文字动画
    anime({
        targets: loveText,
        translateY: -60,
        opacity: [
            { value: 1, duration: 0 },
            { value: 0, duration: 1500 }
        ],
        scale: [
            { value: 0, duration: 0 },
            { value: 1.2, duration: 300 },
            { value: 1, duration: 300 },
            { value: 1.1, duration: 200 },
            { value: 0.8, duration: 700 }
        ],
        rotate: rotation,
        easing: 'easeOutExpo',
        complete: function() {
            loveText.remove();
        }
    });
    
    // 同时添加小爱心效果
    createClickHearts(x, y);
}

// 点击时创建爱心特效
function createClickHearts(x, y) {
    const container = document.querySelector('.falling-hearts');
    const heartCount = 5;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // 随机大小
        const size = Math.random() * 15 + 5;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // 设置位置在点击位置
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.transform = `rotate(45deg) translate(-50%, -50%)`;
        
        // 随机颜色
        const hue = Math.random() * 60 + 320;
        const saturation = 80 + Math.random() * 20;
        const lightness = 70 + Math.random() * 20;
        heart.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
        heart.style.zIndex = '9';
        
        container.appendChild(heart);
        
        // 爱心动画 - 向四周散开
        const angle = Math.random() * Math.PI * 2; // 随机角度
        const distance = 30 + Math.random() * 80; // 随机距离
        const duration = 1000 + Math.random() * 1000;
        
        anime({
            targets: heart,
            translateX: Math.cos(angle) * distance,
            translateY: Math.sin(angle) * distance,
            scale: [
                { value: 0, duration: 0 },
                { value: 1, duration: 300 },
                { value: 0, duration: duration - 300 }
            ],
            opacity: [
                { value: 0.8, duration: 300 },
                { value: 0, duration: duration - 300 }
            ],
            easing: 'easeOutExpo',
            complete: function() {
                heart.remove();
            }
        });
    }
} 