document.addEventListener('DOMContentLoaded', function() {
    // 元素引用
    const sendFlowersBtn = document.getElementById('sendFlowersBtn');
    const flowersContainer = document.getElementById('flowersContainer');
    const envelope = document.getElementById('envelope');
    const customizeBtn = document.getElementById('customizeBtn');
    const customizeSection = document.getElementById('customizeSection');
    const applyChangesBtn = document.getElementById('applyChangesBtn');
    const recipientNameInput = document.getElementById('recipientName');
    const customMessageInput = document.getElementById('customMessage');
    const cardThemeSelect = document.getElementById('cardTheme');
    const messageText = document.getElementById('messageText');
    const colorOptions = document.querySelectorAll('.color-option');
    const petals = document.querySelectorAll('.petal');
    
    // 送出花朵动画
    sendFlowersBtn.addEventListener('click', function() {
        // 创建多个漂浮花朵
        for (let i = 0; i < 20; i++) {
            createFloatingFlower();
        }
        
        // 改变按钮文本
        sendFlowersBtn.innerHTML = '<i class="fas fa-check"></i> 花朵已送出！';
        sendFlowersBtn.style.background = 'linear-gradient(to right, #4CAF50, #8BC34A)';
        
        // 3秒后恢复按钮
        setTimeout(() => {
            sendFlowersBtn.innerHTML = '<i class="fas fa-redo"></i> 再次送出花朵';
            sendFlowersBtn.style.background = 'linear-gradient(to right, #e75480, #ff6b9d)';
        }, 3000);
    });
    
    // 创建漂浮花朵
    function createFloatingFlower() {
        const flower = document.createElement('div');
        flower.classList.add('floating-flower');
        flower.innerHTML = '<i class="fas fa-heart" style="color:#ff6b9d;"></i>';
        
        // 随机位置
        const startX = Math.random() * 100;
        flower.style.left = `${startX}%`;
        
        // 随机延迟
        flower.style.animationDelay = `${Math.random() * 2}s`;
        
        // 随机大小
        const size = 0.8 + Math.random() * 1.2;
        flower.style.fontSize = `${size}rem`;
        
        flowersContainer.appendChild(flower);
        
        // 动画结束后移除元素
        setTimeout(() => {
            flower.remove();
        }, 5000);
    }
    
    // 信封点击效果
    envelope.addEventListener('click', function() {
        this.classList.toggle('open');
    });
    
    // 显示/隐藏自定义区域
    customizeBtn.addEventListener('click', function() {
        customizeSection.classList.toggle('hidden');
        
        if (customizeSection.classList.contains('hidden')) {
            customizeBtn.innerHTML = '<i class="fas fa-edit"></i> 自定义祝福语';
        } else {
            customizeBtn.innerHTML = '<i class="fas fa-times"></i> 关闭自定义';
        }
    });
    
    // 颜色选择
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有active类
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // 为当前选项添加active类
            this.classList.add('active');
            
            // 更改花瓣颜色
            const color1 = this.getAttribute('data-color1');
            const color2 = this.getAttribute('data-color2');
            
            petals.forEach(petal => {
                petal.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
            });
        });
    });
    
    // 应用更改
    applyChangesBtn.addEventListener('click', function() {
        const recipientName = recipientNameInput.value || '亲爱的';
        const customMessage = customMessageInput.value;
        const theme = cardThemeSelect.value;
        
        // 更新消息文本
        let newMessage = customMessage;
        
        // 如果消息中没有称呼，添加称呼
        if (!newMessage.includes(recipientName) && recipientName !== '亲爱的') {
            newMessage = `${recipientName}，${newMessage}`;
        }
        
        messageText.innerHTML = newMessage.replace(/\n/g, '<br>');
        
        // 应用主题
        applyTheme(theme);
        
        // 显示成功消息
        applyChangesBtn.innerHTML = '<i class="fas fa-check"></i> 已应用更改！';
        setTimeout(() => {
            applyChangesBtn.innerHTML = '<i class="fas fa-check"></i> 应用更改';
        }, 2000);
        
        // 关闭自定义区域
        customizeSection.classList.add('hidden');
        customizeBtn.innerHTML = '<i class="fas fa-edit"></i> 自定义祝福语';
    });
    
    // 应用主题
    function applyTheme(theme) {
        const card = document.querySelector('.card');
        const header = document.querySelector('.header h1');
        const messageArea = document.querySelector('.message-area');
        const buttons = document.querySelectorAll('.btn');
        
        // 重置样式
        card.style.borderColor = 'rgba(255, 182, 193, 0.3)';
        header.style.color = '#e75480';
        messageArea.style.borderLeftColor = '#e75480';
        
        // 根据主题更改颜色
        switch(theme) {
            case 'elegant':
                // 紫色主题
                card.style.borderColor = 'rgba(157, 78, 221, 0.3)';
                header.style.color = '#9d4edd';
                messageArea.style.borderLeftColor = '#9d4edd';
                buttons.forEach(btn => {
                    btn.style.background = 'linear-gradient(to right, #9d4edd, #c77dff)';
                    btn.style.boxShadow = '0 5px 15px rgba(157, 78, 221, 0.3)';
                });
                break;
                
            case 'sunshine':
                // 橙色主题
                card.style.borderColor = 'rgba(255, 154, 61, 0.3)';
                header.style.color = '#ff9a3d';
                messageArea.style.borderLeftColor = '#ff9a3d';
                buttons.forEach(btn => {
                    btn.style.background = 'linear-gradient(to right, #ff9a3d, #ffc074)';
                    btn.style.boxShadow = '0 5px 15px rgba(255, 154, 61, 0.3)';
                });
                break;
                
            case 'spring':
                // 绿色主题
                card.style.borderColor = 'rgba(76, 201, 240, 0.3)';
                header.style.color = '#4cc9f0';
                messageArea.style.borderLeftColor = '#4cc9f0';
                buttons.forEach(btn => {
                    btn.style.background = 'linear-gradient(to right, #4cc9f0, #90e0ef)';
                    btn.style.boxShadow = '0 5px 15px rgba(76, 201, 240, 0.3)';
                });
                break;
                
            default:
                // 默认浪漫粉红
                card.style.borderColor = 'rgba(255, 182, 193, 0.3)';
                header.style.color = '#e75480';
                messageArea.style.borderLeftColor = '#e75480';
                buttons.forEach(btn => {
                    btn.style.background = 'linear-gradient(to right, #e75480, #ff6b9d)';
                    btn.style.boxShadow = '0 5px 15px rgba(231, 84, 128, 0.3)';
                });
        }
    }
    
    // 初始创建一些漂浮花朵
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFloatingFlower();
        }, i * 1000);
    }
});