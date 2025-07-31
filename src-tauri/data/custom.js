// 炫酷控制台输出系统
class FancyConsole {
  constructor() {
    this.initTime = new Date();
    this.logTypes = {
      info: { color: '#4285F4', label: 'INFO' },
      success: { color: '#0F9D58', label: 'SUCCESS' },
      warning: { color: '#F4B400', label: 'WARNING' },
      error: { color: '#DB4437', label: 'ERROR' },
      debug: { color: '#9C27B0', label: 'DEBUG' }
    };
    this.initConsole();
  }

  // 初始化控制台
  initConsole() {
    this.printHeader();
    this.printSystemInfo();
    this.animateText('Console system initialized successfully', {
      color: 'linear-gradient(90deg, #4285F4, #0F9D58, #F4B400)',
      fontSize: '16px',
      fontWeight: 'bold'
    });
  }

  // 打印头部信息
  printHeader() {
    console.log(`%c
    ██████╗ ██████╗ ███████╗███████╗██████╗ ██╗   ██╗
    ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗╚██╗ ██╔╝
    ██████╔╝██████╔╝█████╗  █████╗  ██████╔╝ ╚████╔╝ 
    ██╔══██╗██╔══██╗██╔══╝  ██╔══╝  ██╔══██╗  ╚██╔╝  
    ██████╔╝██║  ██║███████╗███████╗██║  ██║   ██║   
    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝   
    `, 'color: #4285F4; font-family: monospace; font-size: 12px;');
    
    console.log(
      '%cBuild from onism： http://192.168.3.66:5000',
      'color: orangered; font-weight: bolder; font-size: 14px; text-shadow: 0 0 5px rgba(255,69,0,0.5);'
    );
  }

  // 打印系统信息
  printSystemInfo() {
    console.groupCollapsed('%cSystem Information', 'color: #666; font-weight: bold;');
    console.log(`%c⌚ Initialization time: ${this.initTime.toLocaleString()}`, 'color: #666;');
    console.log(`%c🌐 User Agent: ${navigator.userAgent}`, 'color: #666;');
    console.log(`%c🖥️ Screen: ${screen.width}x${screen.height}`, 'color: #666;');
    console.groupEnd();
  }

  // 通用日志方法
  log(message, type = 'info', extraStyle = '') {
    const logType = this.logTypes[type] || this.logTypes.info;
    const time = new Date().toLocaleTimeString();
    
    console.log(
      `%c[${time}] ${logType.label} %c${message}`,
      `background: ${logType.color}; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold;`,
      `color: ${logType.color}; ${extraStyle}`
    );
  }

  // 动画文本输出
  animateText(text, styles = {}, delay = 50) {
    let index = 0;
    const styleString = Object.entries(styles)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ');
      
    const interval = setInterval(() => {
      if (index < text.length) {
        console.clear(); // 清除上一次输出
        console.log(`%c${text.substring(0, index + 1)}`, styleString);
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);
  }

  // 打印分割线
  printDivider() {
    console.log(
      '%c============================================================',
      'color: #eee;'
    );
  }

  // 打印对象表格
  printTable(data, title) {
    if (title) console.log(`%c${title}`, 'color: #4285F4; font-weight: bold;');
    console.table(data);
  }
}

// 初始化炫酷控制台
const fancyConsole = new FancyConsole();

// 原有功能：控制链接跳转行为
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
  const origin = e.target.closest('a');
  const isBaseTargetBlank = document.querySelector('head base[target="_blank"]');
  
  fancyConsole.log(`Click event captured - Target: ${origin ? origin.href : 'none'}`, 'debug');
  
  if (
    (origin && origin.href && origin.target === '_blank') ||
    (origin && origin.href && isBaseTargetBlank)
  ) {
    e.preventDefault();
    fancyConsole.log(`Redirecting to: ${origin.href}`, 'info');
    location.href = origin.href;
  } else {
    fancyConsole.log(`Allowing default navigation: ${origin ? origin.href : 'none'}`, 'info');
  }
};

// 重写window.open方法
window.open = function (url, target, features) {
  fancyConsole.log(`Intercepted window.open - URL: ${url}, Target: ${target}`, 'warning');
  location.href = url;
  return null;
};

// 绑定点击事件
document.addEventListener('click', hookClick, { capture: true });

// 演示一些控制台输出效果
setTimeout(() => {
  fancyConsole.printDivider();
  fancyConsole.log('System ready for interactions', 'success');
  fancyConsole.log('This is a warning message', 'warning');
  fancyConsole.log('This is an error message', 'error');
  
  fancyConsole.printTable(
    [
      { feature: 'Link Interception', status: 'Active' },
      { feature: 'Window Open Override', status: 'Active' },
      { feature: 'Console Styling', status: 'Active' }
    ],
    'Active Features'
  );
}, 1500);