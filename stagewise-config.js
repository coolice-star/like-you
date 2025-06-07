// stagewise-config.js
const stagewiseConfig = {
  plugins: []
};

// 只在开发环境中初始化工具栏
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  import('@stagewise/toolbar').then(({ initToolbar }) => {
    initToolbar(stagewiseConfig);
  });
}

export default stagewiseConfig; 