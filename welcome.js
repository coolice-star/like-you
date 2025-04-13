document.addEventListener('DOMContentLoaded', function() {
    // 创建飘落的爱心效果
    createFallingHearts();
    
    // 按钮特效
    const enterButton = document.querySelector('.enter-button');
    const backgroundMusic = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseIcon = playPauseBtn.querySelector('i');
    
    // 检查是否支持自动播放
    let musicPlayed = false;
    
    // 接收主页面传递的音乐播放状态
    const shouldPlayMusic = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = parseFloat(localStorage.getItem('musicCurrentTime') || '0');
    
    // 如果从主页面返回来并且音乐正在播放，则继续播放
    if (shouldPlayMusic && document.referrer.includes('main.html')) {
        backgroundMusic.currentTime = musicCurrentTime;
        playMusic();
    }
    
    if (enterButton) {
        enterButton.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });
        
        enterButton.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });
        
        enterButton.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认行为，自己控制跳转
            
            // 尝试播放音乐
            playMusic();
            
            // 点击按钮时的动画效果
            anime({
                targets: '.welcome-content',
                opacity: [1, 0],
                scale: [1, 0.9],
                duration: 500,
                easing: 'easeInOutQuad',
                complete: function() {
                    // 动画完成后跳转到主页面
                    // 保存音乐播放状态到localStorage
                    localStorage.setItem('musicPlaying', !backgroundMusic.paused);
                    localStorage.setItem('musicCurrentTime', backgroundMusic.currentTime);
                    window.location.href = 'main.html';
                }
            });
        });
    }
    
    // 尝试播放音乐的函数
    function playMusic() {
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    musicPlayed = true;
                    playPauseIcon.classList.remove('fa-play');
                    playPauseIcon.classList.add('fa-pause');
                })
                .catch(error => {
                    console.error("播放音乐失败:", error);
                });
        }
    }
    
    // 音乐播放暂停控制
    playPauseBtn.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    playPauseIcon.classList.remove('fa-play');
                    playPauseIcon.classList.add('fa-pause');
                    musicPlayed = true;
                })
                .catch(error => {
                    console.error("播放音乐失败:", error);
                    alert("请尝试点击页面任意处，然后再播放音乐");
                });
        } else {
            backgroundMusic.pause();
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        }
    });
    
    // 用户首次交互后尝试播放音乐（如果不是从主页面返回的）
    if (!shouldPlayMusic && !document.referrer.includes('main.html')) {
        document.addEventListener('click', function initAudio() {
            playMusic();
            document.removeEventListener('click', initAudio);
        }, { once: true });
    }
    
    // 标题动画
    anime({
        targets: '.welcome-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1500,
        easing: 'easeOutElastic(1, .7)'
    });
    
    // 欢迎文字逐行显示
    anime({
        targets: '.welcome-message p',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 800,
        delay: anime.stagger(200, {start: 800})
    });
    
    // 按钮动画
    anime({
        targets: '.enter-button',
        opacity: [0, 1],
        translateY: [30, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 1500
    });
    
    // 皇冠动画
    anime({
        targets: '.crown-decoration',
        scale: [0, 1],
        opacity: [0, 1],
        easing: 'easeOutBack',
        duration: 1000,
        delay: 1200
    });
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