// stagewise-init.js
// 只在开发环境中初始化工具栏
(function() {
  // 检查是否为开发环境
  const isDevelopment = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.port !== '';
  
  if (isDevelopment) {
    // 创建工具栏配置
    const stagewiseConfig = {
      plugins: []
    };
    
    // 动态导入工具栏并初始化
    import('https://cdn.jsdelivr.net/npm/@stagewise/toolbar@latest/dist/index.js')
      .then(module => {
        const { initToolbar } = module;
        initToolbar(stagewiseConfig);
        console.log('Stagewise toolbar initialized in development mode');
      })
      .catch(error => {
        console.error('Failed to load Stagewise toolbar:', error);
      });
  }
})(); 