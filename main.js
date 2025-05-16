const buttons = document.querySelectorAll('.btn-primary');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        // 如果已經有 .focus-shadow，代表第二次點，移除它
        if (btn.classList.contains('focus-shadow')) {
            btn.classList.remove('focus-shadow');
            btn.blur();
        } else {
            // 第一次點，加上陰影
            btn.classList.add('focus-shadow');
        }
    });
});

document.querySelectorAll('.card.collapse').forEach(card => {
    const cardBody = card.querySelector('.card-body');

    card.addEventListener('show.bs.collapse', () => {
        card.style.height = '0px';
        card.style.boxShadow = 'rgba(211, 210, 210, 0)';

        // 展開時先隱藏捲軸
        if (cardBody) cardBody.style.overflow = 'hidden';

        setTimeout(() => {
            card.style.height = '120px';
            card.style.boxShadow = '-4px 4px 2px 2px rgba(211, 210, 210, 1)';
        }, 10);
    });

    card.addEventListener('shown.bs.collapse', () => {
        // 動畫結束，讓捲軸出現
        if (cardBody) cardBody.style.overflow = 'auto';

        card.style.height = '120px';
        card.style.boxShadow = '-4px 4px 2px 2px rgba(211, 210, 210, 1)';
    });

    card.addEventListener('hide.bs.collapse', () => {
        // 收起前維持高度和陰影
        card.style.height = '120px';
        card.style.boxShadow = '-4px 4px 2px 2px rgba(211, 210, 210, 1)';

        // 收起時先隱藏捲軸
        if (cardBody) cardBody.style.overflow = 'hidden';

        setTimeout(() => {
            card.style.height = '0px';
            card.style.boxShadow = 'rgba(211, 210, 210, 0)';
        }, 10);
    });

    card.addEventListener('hidden.bs.collapse', () => {
        // 收起完成後清除樣式
        card.style.height = '';
        card.style.boxShadow = '';

        // 收起後捲軸依然隱藏
        if (cardBody) cardBody.style.overflow = 'hidden';
    });
});

const bgTexts = document.querySelectorAll('.bg-text');
const sections = {
    info: document.getElementById('info'),
    intro: document.getElementById('intro'),
    portfolio: document.getElementById('portfolio'),
};

function onScroll() {
    const viewportHeight = window.innerHeight;
    const centerY = viewportHeight / 2;

    let activeSection = null;
    let minDistance = Infinity;

    // 找出離視窗中央最近的區塊
    for (const [key, section] of Object.entries(sections)) {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(centerY - sectionCenter);

        if (distance < minDistance) {
            minDistance = distance;
            activeSection = key;
        }
    }

    // 根據距離決定文字縮放和透明度
    bgTexts.forEach((el) => {
        if (el.dataset.section === activeSection) {
            // 越接近中心，scale 越大
            const rect = sections[activeSection].getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(centerY - sectionCenter);

            // 計算縮放，距離0時scale最大1.5，距離越遠最低1
            const maxScale = 1.5;
            const minScale = 1;
            const maxOpacity = 1;
            const minOpacity = 0;

            // 最大距離取 viewportHeight / 2 讓縮放有範圍
            const maxDistance = viewportHeight / 2;
            let scale = maxScale - ((distance / maxDistance) * (maxScale - minScale));
            scale = Math.max(minScale, Math.min(maxScale, scale));

            let opacity = maxOpacity - ((distance / maxDistance) * (maxOpacity - minOpacity));
            opacity = Math.max(minOpacity, Math.min(maxOpacity, opacity));

            el.style.transform = `scale(${scale})`;
            el.style.opacity = opacity;
        } else {
            // 非活動區塊縮小且透明
            el.style.transform = 'scale(1)';
            el.style.opacity = 0;
        }
    });
}

// 頁面載入與滾動時觸發
window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);