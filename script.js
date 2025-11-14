/* --- 監聽 DOM 載入完成 --- */
document.addEventListener("DOMContentLoaded", function() {

    /* --- 語言切換選單 (Language Dropdown) --- */
    
    // 獲取按鈕和選單內容
    var langBtn = document.querySelector('.lang-dropbtn');
    var langContent = document.getElementById('langDropdownContent');

    // 檢查元素是否存在
    if (langBtn && langContent) {
        
        // 1. 點擊按鈕時，切換選單的 .show class (顯示/隱藏)
        langBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // 防止點擊事件冒泡到 window
            langContent.classList.toggle('show');
        });

        // 2. 點擊頁面其他任何地方時，關閉選單
        window.addEventListener('click', function(event) {
            // 檢查點擊的目標是否不是按鈕，也不是選單內容的一部分
            if (!langBtn.contains(event.target)) { 
                if (langContent.classList.contains('show')) {
                    langContent.classList.remove('show');
                }
            }
        });
    }

    /* --- [新功能] 手機版的漢堡選單 (Mobile Navigation Toggle) --- */

    // 1. 獲取 漢堡按鈕 和 包含選單的 <nav> 容器
    var navToggleBtn = document.querySelector('.nav-toggle');
    var navContainer = document.querySelector('.navbar nav'); // <nav> 元素

    // 2. 檢查元素是否存在
    if (navToggleBtn && navContainer) {
        
        // 3. 監聽漢堡按鈕的點擊事件
        navToggleBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // 防止冒泡
            
            // 切換 <nav> 上的 .nav-active class
            navContainer.classList.toggle('nav-active');
            
            // (提升可訪問性) 同步更新 aria-expanded 屬性
            var isExpanded = navContainer.classList.contains('nav-active');
            navToggleBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    /* --- [新功能-優化] 點擊手機選單連結時，自動關閉選單 --- */
    
    // 獲取所有主選單的連結
    var navLinks = document.querySelectorAll('.nav-menu a');

    // 檢查 navContainer 是否存在 (避免 RWD 邏輯在 JS 出錯)
    if (navContainer) {
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // 檢查是否在手機模式 (nav-active 存在)
                if (navContainer.classList.contains('nav-active')) {
                    // 移除 active class (關閉選單)
                    navContainer.classList.remove('nav-active');
                    // 重設漢堡按鈕的 ARIA 狀態
                    if (navToggleBtn) {
                        navToggleBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }

});