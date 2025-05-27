// Cache de elementos DOM frequentemente acessados
const elements = {};

// Função para obter elementos com cache
function getElement(id) {
    if (!elements[id]) {
        elements[id] = document.getElementById(id);
    }
    return elements[id];
}

// Função para alternar entre tema claro e escuro
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    updateThemeIcon(newTheme);
};

// Rendereização de ícones de tema com templates
const themeIcons = {
    dark: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    light: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
};

// Função para atualizar o ícone do tema
const updateThemeIcon = (theme) => {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.innerHTML = themeIcons[theme] || themeIcons.light;
    }
};

// Função para definir o tema inicial
const setInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
};

// Templates para texto de status
const statusTemplates = {
    waiting: 'Aguardando QR Code<span class="loading-dots"><span></span><span></span><span></span></span>',
    ready: 'QR Code pronto para leitura',
    error: 'Erro ao carregar QR Code'
};

// Função para buscar o QR code otimizada
function fetchQRCode() {
    const status = getElement('status');
    const qrcode = getElement('qrcode');

    // Mostrar animação de carregamento e spinner
    status.innerHTML = statusTemplates.waiting;
    qrcode.style.display = 'none';

    // Usar requestAnimationFrame para operações de UI
    requestAnimationFrame(() => {
        fetch('/qrcode')
            .then(response => response.json())
            .then(data => {
                if (data.qrcode) {
                    // Esconde o spinner e mostra o QR code
                    qrcode.style.display = 'block';
                    qrcode.src = data.qrcode;
                    status.innerHTML = statusTemplates.ready;

                    // Adicionar animação de sucesso
                    const container = getElement('qrcode-container');
                    container.classList.add('success');
                    setTimeout(() => {
                        container.classList.remove('success');
                    }, 1000);
                } else {
                    // Se o QR não estiver disponível, mantém o spinner
                    status.innerHTML = statusTemplates.error;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar QR code:', error);
                status.innerHTML = statusTemplates.error;
            });
    });
}

// Função para remover o pre-loader da página
function removePageLoader() {
    const loader = getElement('page-loader');
    // Adiciona a classe para fade out
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Definir tema inicial
    setInitialTheme();

    // Iniciar o carregamento do QR code
    fetchQRCode();

    // Configurar eventos de clique
    getElement('theme-toggle').addEventListener('click', toggleTheme);

    // Remover o loader após um pequeno atraso
    setTimeout(removePageLoader, 800);

    // Configurar atualização periódica do QR code
    setInterval(fetchQRCode, 60000); // Atualiza a cada 60 segundos

    // Verificar se o QR code está pronto a cada 5 segundos nos primeiros 30 segundos
    let checkCount = 0;
    const checkInterval = setInterval(() => {
        if (checkCount >= 6) {
            clearInterval(checkInterval);
            return;
        }
        fetchQRCode();
        checkCount++;
    }, 20000);
});

// Detecção de mudança de tema do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    // Só mudar automaticamente se o usuário não tiver definido um tema manualmente
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
    }
});

// Função para verificar o status da conexão
function checkConnectionStatus() {
    fetch('/connection-status')
        .then(response => response.json())
        .then(data => {
            const statusIndicator = document.querySelector('.status-indicator');
            const statusText = document.querySelector('.status-text');

            if (data.connected) {
                statusIndicator.classList.add('connected');
                statusText.textContent = 'CONECTADO';
                statusText.style.color = '#2ecc71';
            } else {
                statusIndicator.classList.remove('connected');
                statusText.textContent = 'NÃO CONECTADO';
                statusText.style.color = '#e74c3c';
            }
        })
        .catch(error => {
            console.error('Erro ao verificar status de conexão:', error);
        });
}

// No DOMContentLoaded, adicione a verificação de status
document.addEventListener('DOMContentLoaded', () => {
    // Verificar o status da conexão periodicamente
    checkConnectionStatus();
    setInterval(checkConnectionStatus, 1000); // Verificar a cada 1 segundos
});