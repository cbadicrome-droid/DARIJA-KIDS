
let currentAudio = null;
function playAudioSource(source) {
    try {
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
    } catch (err) {
        console.warn('Error stopping previous audio', err);
    }

    if (!source) return;

    if (typeof source === 'string') {
        currentAudio = new Audio(source);
    } else if (source instanceof HTMLAudioElement) {
        currentAudio = source;
    } else {
        return;
    }
    currentAudio.play().catch(error => {
        console.error('Errore nella riproduzione audio:', error);
    });
    currentAudio.addEventListener('ended', () => { currentAudio = null; });
}
function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null; 
    }
}
function stopAllAudio() {
    stopAudio();

    document.querySelectorAll('audio').forEach(a => {
        try {
            a.pause();
            a.currentTime = 0;
        } catch (err) {
            console.warn('Impossibile fermare un elemento audio:', err);
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const themesListContainer = document.querySelector('.themes-list-container');
    const themeBoxes = document.querySelectorAll('.theme-box');
    const themeDetails = document.querySelectorAll('.theme-details-container');
    const backButtons = document.querySelectorAll('.back-button');
    const sidebar = document.querySelector('.sidebar-nav');
    const modalLinks = document.querySelectorAll('.modal-link');
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetID = link.getAttribute('href');
            const targetElement = document.querySelector(targetID);
            if(targetElement) {
                targetElement.style.display = 'block';
            }
        })
        });         
    const toggleContent = (targetId, show) => {
        const targetElement = document.getElementById(targetId);
        if (show) {
            
            themeDetails.forEach(container => {
                container.classList.add('hidden');
            });
            themesListContainer.classList.add('hidden');
            if (targetElement) {
                targetElement.classList.remove('hidden');
                
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
            } else {
                themeDetails.forEach(container => {
                 container.classList.add('hidden');
            });
            themesListContainer.classList.remove('hidden');
        }
    };
    themeBoxes.forEach(box => {
        box.addEventListener('click', () => {
            stopAllAudio();
            const targetId = box.getAttribute('data-target');
            toggleContent(targetId, true);
        });
    });
    
    if (themesListContainer) {
        themesListContainer.addEventListener('click', (e) => {
            const box = e.target.closest('.theme-box');
            if (box) {
                stopAllAudio();
                const targetId = box.getAttribute('data-target');
                toggleContent(targetId, true);
            }
        });
    }
    document.querySelectorAll('.audio-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const audioSrc = button.getAttribute('data-audio-src');
            if (!audioSrc) {
                console.warn('File audio non disponibile');
                return;
            }
            playAudioSource(audioSrc);
        });
    });
    
    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            const a = e.target.closest('a');
            if (!a) return;
            stopAllAudio();
            
            if (a.classList.contains('modal-link')) {
                e.preventDefault();
                const target = a.dataset.target || a.getAttribute('href').replace('#','');
                const panel = document.getElementById(target);
                if (panel) {
                    panel.classList.add('active');
                }
                return;
            }
            if (a.classList.contains('theme-link')) {
                e.preventDefault();
                const targetId = a.dataset.target || a.getAttribute('href').replace('#','');
                toggleContent(targetId, true);
                return;
            }
            if (a.classList.contains('primary-link')) {
                e.preventDefault();
                const href = a.getAttribute('href');
                if (href === '#vocaboli') {
                    toggleContent(null, false);
                }
                const el = document.querySelector(href);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
        });
    }
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            stopAllAudio();
            const targetId = button.getAttribute('data-target');
    
            const targetContainer = document.getElementById(targetId);
            if (targetContainer && targetContainer.classList.contains('theme-details-container')) {
            
                themeDetails.forEach(container => {
                    container.classList.add('hidden');
                });
                themesListContainer.classList.remove('hidden');
            } else {

                if (targetContainer) {
                    targetContainer.classList.add('hidden');
                }
                if (themesListContainer) themesListContainer.classList.remove('hidden');
            }
        });
    });
});

        const themesListContainer = document.querySelector('.themes-list-container');
        const themeDetails = document.querySelectorAll('.theme-details-container');
        const dialoghiGrid = document.querySelector('.dialoghi-section');
        const dialoghi = document.getElementById('dialoghi');
        const vocaboli = document.querySelector('#vocaboli');
        const chiSiamo = document.getElementById('chi-siamo');
        const contatti = document.getElementById('contatti');
        
        function nascondiTutteLeSezioni() {
            const sezioni = [
                '#home-welcome',
                '#vocaboli',
                '#dialoghi',
                '#chi-siamo',
                '#contatti',
                '.themes-list-container',
            ];
            sezioni.forEach(selector => {
                const el = document.querySelector(selector);
                if (el) {
                    el.classList.add('hidden');
                    if (selector === '#home-welcome') el.style.display = 'none';
                }
            });
            document.querySelectorAll('.theme-details-container').forEach(detail => {
                detail.classList.add('hidden');
            });
        }
        document.querySelectorAll('.kids-navbar a').forEach(link => {
            link.addEventListener('click', (e) => {
                stopAllAudio();
                const href = link.getAttribute('href');

        if (href === '#home') {
            e.preventDefault();
            nascondiTutteLeSezioni();
            const homeWelcome = document.getElementById('home-welcome');
            if (homeWelcome) {
                homeWelcome.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        else if (href === '#chi-siamo' || href === '#contatti') {
            e.preventDefault();
            nascondiTutteLeSezioni();
            const targetID = href.replace('#','');
            const targetElement = document.getElementById(targetID);
            if (targetElement) {
                targetElement.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        if (href === '#vocaboli') {
            e.preventDefault();
            nascondiTutteLeSezioni();
                if (vocaboli) { vocaboli.classList.remove('hidden');
            if (themesListContainer) themesListContainer.classList.remove('hidden');
            setTimeout(() => {
                vocaboli.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
            }
        }
        else if (href === '#dialoghi') {
            e.preventDefault();
            nascondiTutteLeSezioni();
            if (dialoghi) { dialoghi.classList.remove('hidden'); }
            setTimeout(() => {
                dialoghi.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
            });
        });
        
if (dialoghiGrid) {
    dialoghiGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.dialogo-card');
        if (card) {
            const targetId = card.getAttribute('data-target');
            const targetContainer = document.getElementById(targetId);

            if (targetContainer) {
                stopAllAudio();
                themesListContainer.classList.add('hidden');
                if (vocaboli) vocaboli.classList.add('hidden');
                document.querySelectorAll('.theme-details-container').forEach(container => {
                    container.classList.add('hidden');
                });
                targetContainer.classList.remove('hidden');
                
                setTimeout(() => {
                    targetContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        } 
    });
}

document.getElementById('play-dialogo-presentarsi')?.addEventListener('click', function() {
    var audioEl = document.getElementById('audio-presentarsi');
    if (audioEl) playAudioSource(audioEl);
});
document.getElementById('play-dialogo-ristorante')?.addEventListener('click', function() {
    var audioEl = document.getElementById('audio-ristorante');
    if (audioEl) playAudioSource(audioEl);
});
document.getElementById('play-dialogo-mercato')?.addEventListener('click', function() {
    var audioEl = document.getElementById('audio-mercato');
    if (audioEl) playAudioSource(audioEl);
});
document.getElementById('play-dialogo-casa')?.addEventListener('click', function() {
    var audioEl = document.getElementById('audio-casa');
    if (audioEl) playAudioSource(audioEl);
});
document.getElementById('play-dialogo-hammam')?.addEventListener('click', function() {
    var audioEl = document.getElementById('audio-hammam');
    if (audioEl) playAudioSource(audioEl);
});
document.getElementById('play-dialogo-giocare')?.addEventListener('click', function() {
    var audioEl = document.getElementById('audio-giocare');
    if (audioEl) playAudioSource(audioEl);
});

document.querySelectorAll('.close-info').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        stopAllAudio();
        
        const modal = e.target.closest('.hidden-info');
        if (modal) {
            modal.classList.remove('active');
        }

        const section = e.target.closest('section, .theme-details-container, .info-section');
        if (section) {
            section.classList.add('hidden');
        }

        const vocaboliEl = document.querySelector('#vocaboli');
        if (vocaboliEl) vocaboliEl.classList.remove('hidden');
    });
});

document.querySelectorAll('.info-section .close-info').forEach(btn => {
    btn.addEventListener('click', (e) => {
        stopAllAudio();
        
        const homeWelcome = document.getElementById('home-welcome');
        if (homeWelcome) {
            homeWelcome.style.display = 'block';
            homeWelcome.classList.remove('hidden');
        }

        const vocaboliEl = document.getElementById('vocaboli');
        if (vocaboliEl) vocaboliEl.classList.add('hidden');
        const dialoghiEl = document.getElementById('dialoghi');
        if (dialoghiEl) dialoghiEl.classList.add('hidden');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

function vaiAiVocaboli() {
            stopAllAudio();
            const homeWelcome = document.getElementById('home-welcome');
            if (homeWelcome) homeWelcome.style.display = 'none';

            const vocaboliSection = document.getElementById('vocaboli');
            if (vocaboliSection) {
                vocaboliSection.classList.remove('hidden');
                vocaboliSection.style.display = 'block';
            }
            const themesList = document.querySelector('.themes-list-container');
            if (themesList) {
                themesList.classList.remove('hidden');
            }
            const primoTema = document.querySelector('.theme-box');
            if (primoTema) {
                primoTema.click();
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
