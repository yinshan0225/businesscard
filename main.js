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