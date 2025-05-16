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

const h1 = document.querySelectAll('h1');



window.addEventListener('scroll', () => {
    const windowCenter = window.innerHeight / 2;

    document.querySelectorAll('.section').forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(windowCenter - sectionCenter);

        // 計算縮放比例，離中心越近放大，離遠越小，介於1~1.5倍
        let scale = 1 + (1 - Math.min(distance / windowCenter, 1)) * 0.5;

        section.style.setProperty('--scale', scale);

        // 動態改變 ::before 的 transform scale
        section.style.setProperty('transform', 'none'); // 確保區塊本身不被影響

        const beforeStyle = `
        .section[data-bgword="${section.dataset.bgword}"]::before {
          transform: translate(-50%, -50%) scale(${scale});
        }
      `;

        // 移除之前可能存在的 style，避免累積
        let styleTag = document.getElementById('dynamic-style-' + section.dataset.bgword);
        if (styleTag) styleTag.remove();

        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-style-' + section.dataset.bgword;
        styleTag.innerHTML = beforeStyle;
        document.head.appendChild(styleTag);
    });
});