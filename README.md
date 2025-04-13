# 💘 心动表白网页

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/AnimeJS-FF1A1A?style=for-the-badge&logo=anime.js&logoColor=white" alt="AnimeJS"/>
  <br/>
  <img src="https://img.shields.io/badge/status-completed-brightgreen" alt="Status Completed"/>
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License"/>
  <img src="https://img.shields.io/github/stars/你的GitHub用户名/表白网页?style=social" alt="Stars"/>
</div>

## 📝 简介

嗨，大家好！我是一名计算机科学专业的学生，这个项目是我为好朋友特别定制的表白网页。秉持着"代码不止于实用，更要有温度"的理念，我将技术与浪漫完美结合，打造了这个充满创意的表白神器。

这个项目充分展示了前端技术如何为情感表达服务，希望它不仅能帮助我的朋友成功表白，也能为更多想要以特别方式表达爱意的人提供灵感和模板。
## 🚀 如何使用

1. 克隆仓库到本地
2. 在浏览器中打开`index.html`即可开始体验
3. 可以在`index.html`中修改标题、诗句、情书内容和表白内容，以及欢迎语。
4. 觉得不错就可以部署出去给你心爱的女孩看了
5. 希望可以给个star，表示你的爱
## ✨ 特色功能

- 🌈 **双页面结构**：优雅的欢迎页 + 内容丰富的主页面
- 🎵 **背景音乐**：自动播放周杰伦《稻香》，页面切换时保持连续播放
- 💝 **飘落爱心**：浪漫的动态飘落爱心背景效果
- 💌 **互动体验**：点击屏幕随机显示爱的表达，爱心特效
- 🎆 **烟花动画**：点击表白按钮触发绚丽烟花效果
- 📱 **响应式设计**：完美适配各种设备屏幕尺寸
- 🔄 **平滑过渡**：页面切换和元素显示的流畅动画效果

## 🔧 技术栈

- **前端基础**：HTML5 + CSS3 + JavaScript
- **动画库**：anime.js
- **字体图标**：Font Awesome
- **字体**：Google Fonts (Ma Shan Zheng, Noto Serif SC)
- **状态管理**：LocalStorage（用于音乐状态同步）
- **响应式设计**：媒体查询自适应

## 📂 项目结构

```
📁 表白网页/
│
├── 📄 index.html         // 欢迎页面
├── 📄 main.html          // 主内容页面
├── 📄 style.css          // 主样式表
├── 📄 welcome.css        // 欢迎页样式
├── 📄 script.js          // 主页面脚本
├── 📄 welcome.js         // 欢迎页脚本
├── 🎵 稻香-周杰伦-440613-128.mp3     // 背景音乐
└── 🖼️ 微信图片_20250411221401.jpg        // 照片
```

## 🌟 功能详解

### 1. 欢迎页 (index.html)

浪漫的入口页面，展示温馨欢迎语，并引导用户进入主页面。背景有飘落的爱心效果，右下角配有音乐播放器。

### 2. 主页面 (main.html)

包含多个精心设计的区域：
- 照片展示区（照片悬停有放大效果）
- 唯美诗句区（带有3D浮动效果）
- 情书区（表达真挚情感）
- 互动按钮（点击触发表白弹窗和特效）
- 点击页面任何位置，会随机出现"爱你"、"心动"等字样和爱心

### 3. 音乐体验

背景音乐在两个页面之间无缝衔接，保证音乐体验的连贯性，让表白氛围更加浪漫。

### 4. 动画效果

- 飘落的爱心背景
- 照片悬停放大效果
- 点击页面出现爱心和文字
- 烟花特效
- 心跳动画
- 平滑过渡动画

## 🚀 如何使用

### 基本使用

1. 克隆仓库到本地
   ```bash
   git clone https://github.com/你的用户名/表白网页.git
   ```

2. 在浏览器中打开`index.html`即可开始体验

### 个性化定制

这个表白网页设计为易于定制，你可以按照以下步骤进行个性化调整：

1. **更换照片**：将`微信图片_20250411221401.jpg`替换为你自己的照片（建议保持相似的尺寸比例）

2. **更换音乐**：替换`稻香-周杰伦-440613-128.mp3`为你喜欢的歌曲，并在HTML文件中相应修改音乐名称

3. **修改文字内容**：
   - 在`main.html`中修改标题、诗句、情书内容和表白内容
   - 在`index.html`中修改欢迎语

4. **调整样式**：
   - 修改`style.css`和`welcome.css`中的颜色、字体大小等参数
   - 可以根据个人喜好调整动画效果

5. **添加新功能**：
   - 如果你有JavaScript基础，可以在`script.js`中添加更多互动效果

## 📝 注意事项

- 由于浏览器自动播放策略限制，首次访问时可能需要用户点击页面才能播放音乐
- 建议使用现代浏览器访问（Chrome、Firefox、Edge、Safari等）以获得最佳体验
- 如果要部署到服务器，确保服务器支持播放音乐和其他媒体资源
- 制作个人表白网页时，请尊重他人的知识产权，特别是音乐和图片资源

## 🌈 贡献

欢迎提交问题和建议！如果你有任何改进想法，可以：

1. Fork 这个仓库
2. 创建新的分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## ⭐ 支持项目

如果这个项目对你有帮助，请给它一个星标！你的支持是我持续改进的动力。

[![给项目点赞](https://img.shields.io/github/stars/coolice-star/表白网页?style=social)](https://github.com/coolice-star/表白网页)

## 📄 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。

---

💖 用代码表达爱意，用技术传递温度。希望这个项目能为你的表白增添一份独特的浪漫！ 