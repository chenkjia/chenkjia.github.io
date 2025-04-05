// 初始化AOS动画库
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: false
});

// DOM元素
const progress = document.querySelector('.progress');
const cursor = document.querySelector('.cursor');
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const html = document.documentElement;
const body = document.body;
const textRevealElements = document.querySelectorAll('.text-reveal');
const heroTitle = document.querySelector('.hero-title');
const heroSlogan = document.querySelector('.hero-slogan');
const heroCta = document.querySelector('.hero-cta');
const languageToggle = document.querySelectorAll('.lang-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-menu');
const overlay = document.querySelector('.overlay');
const mobileLangBtns = document.querySelectorAll('.mobile-language-toggle .lang-btn');
const valueProgressFills = document.querySelectorAll('.value-progress-fill');

// 滚动进度条
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;
  progress.style.width = scrollPercent * 100 + '%';
});

// 页面加载后显示进度条动画
window.addEventListener('DOMContentLoaded', () => {
  // 文字显示动画
  startHeroAnimations();
  
  // 显示核心价值进度条
  setTimeout(() => {
    valueProgressFills.forEach((fill) => {
      fill.style.width = fill.getAttribute('style').replace('width: ', '');
    });
  }, 1000);
});

// 自定义鼠标
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  
  // 鼠标悬停在按钮和链接上时的效果
  const target = e.target;
  if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.btn')) {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursor.style.opacity = '0.5';
  } else {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.opacity = '1';
  }
});

// 页面滚动时导航栏样式变化
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 文字显示动画
function startHeroAnimations() {
  // 使用GSAP动画库实现文字展示效果
  const tl = gsap.timeline({defaults: {ease: 'power3.out'}});
  
  // 标题动画
  tl.to(heroTitle.querySelector('.text-reveal:first-child'), {
    y: 0,
    opacity: 1,
    duration: 0.8
  })
  .to(heroTitle.querySelector('.text-reveal:last-child'), {
    y: 0,
    opacity: 1,
    duration: 0.8
  }, '-=0.5')
  .to(heroSlogan, {
    y: 0,
    opacity: 1,
    duration: 0.8
  }, '-=0.5')
  .to(heroCta, {
    y: 0,
    opacity: 1,
    duration: 0.8
  }, '-=0.5');
  
  // 设置初始样式
  gsap.set([heroTitle.querySelectorAll('.text-reveal'), heroSlogan, heroCta], {
    y: 50,
    opacity: 0
  });
  
  // 启动动画
  tl.play();
}

// 为水果轨道创建3D效果
const fruitOrbit = document.querySelector('.fruit-orbit');
const fruits = document.querySelectorAll('.fruit');

document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  
  fruitOrbit.style.transform = `translate(-50%, -50%) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// 滚动触发动画效果
gsap.registerPlugin(ScrollTrigger);

// 滚动进度指示器
gsap.to('body', {
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      document.documentElement.style.setProperty('--scroll', self.progress.toFixed(3));
    }
  }
});

// 核心价值卡片动画
gsap.utils.toArray('.value-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 80%',
      toggleActions: 'play none none reset'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.2
  });
  
  // 进度条动画
  const progressFill = card.querySelector('.value-progress-fill');
  gsap.from(progressFill, {
    scrollTrigger: {
      trigger: card,
      start: 'top 70%',
      toggleActions: 'play none none reset'
    },
    width: '0%',
    duration: 1.5,
    delay: i * 0.2 + 0.5,
    ease: 'power2.out'
  });
});

// 图片视差效果
// gsap.utils.toArray('.image-container').forEach(container => {
//   const image = container.querySelector('img');
  
//   gsap.to(image, {
//     scrollTrigger: {
//       trigger: container,
//       start: 'top bottom',
//       end: 'bottom top',
//       scrub: true
//     },
//     y: -50,
//     ease: 'none'
//   });
// });

// 语言切换功能
languageToggle.forEach(btn => {
  btn.addEventListener('click', () => {
    const currentLang = btn.dataset.lang;
    
    // 移除所有按钮的active类
    languageToggle.forEach(b => b.classList.remove('active'));
    
    // 添加当前按钮的active类
    btn.classList.add('active');
    
    // 实现语言切换逻辑
    toggleLanguage(currentLang);
  });
});

// 语言切换实现
function toggleLanguage(lang) {
  document.querySelectorAll('[data-lang-zh], [data-lang-en]').forEach(element => {
    if (lang === 'zh') {
      if (element.hasAttribute('data-lang-zh')) {
        element.innerHTML = element.getAttribute('data-lang-zh');
      }
      document.documentElement.lang = 'zh-CN';
    } else {
      if (element.hasAttribute('data-lang-en')) {
        element.innerHTML = element.getAttribute('data-lang-en');
      }
      document.documentElement.lang = 'en';
    }
  });
  
  // 保存用户选择的语言到本地存储
  localStorage.setItem('preferredLanguage', lang);
}

// 移动端菜单逻辑
// 菜单切换逻辑
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  overlay.classList.add('active');
  body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// 移动导航链接点击关闭菜单
const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  overlay.classList.remove('active');
  body.style.overflow = '';
}

// 移动端语言切换
mobileLangBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const currentLang = btn.dataset.lang;
    
    // 移除所有按钮的active类
    mobileLangBtns.forEach(b => b.classList.remove('active'));
    languageToggle.forEach(b => b.classList.remove('active'));
    
    // 添加当前按钮的active类
    btn.classList.add('active');
    
    // 同步顶部语言切换按钮
    languageToggle.forEach(b => {
      if (b.dataset.lang === currentLang) {
        b.classList.add('active');
      }
    });
    
    // 实现语言切换逻辑
    toggleLanguage(currentLang);
  });
});

// 使用IntersectionObserver优化滚动体验
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      
      // 移除所有链接的激活状态
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // 移除移动导航链接的激活状态
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
      mobileNavLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // 添加当前部分链接的激活状态
      const activeDesktopLink = document.querySelector(`.nav-link[href="#${id}"]`);
      const activeMobileLink = document.querySelector(`.mobile-nav-link[href="#${id}"]`);
      
      if (activeDesktopLink) activeDesktopLink.classList.add('active');
      if (activeMobileLink) activeMobileLink.classList.add('active');
    }
  });
}, observerOptions);

// 观察所有部分
sections.forEach(section => {
  observer.observe(section);
});

// 为图片添加延迟加载
const lazyLoadImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    imageObserver.observe(img);
  });
};

// 页面加载完成后初始化
window.addEventListener('load', () => {
  lazyLoadImages();
  
  // 从本地存储中获取用户之前选择的语言
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) {
    // 找到对应的语言按钮并触发点击事件
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.dataset.lang === savedLanguage) {
        btn.click();
      }
    });
  }
  
  // 如果URL中有锚点，平滑滚动到目标位置
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    }
  }
});

// 导航链接平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // 使用平滑滚动到目标部分
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
}); 