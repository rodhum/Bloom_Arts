/**
 * BLOOM ART SUMMIT 2027 — DUAL FUNNEL APPLICATION LOGIC
 */

let currentView = 'summit';

document.addEventListener('DOMContentLoaded', () => {
    // Check URL parameters for view (e.g. ?view=artists)
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    if (viewParam === 'artists' || viewParam === 'artistas') {
        switchView('artists');
    } else {
        switchView('summit');
    }
});

/**
 * Switches between Summit Landing (Visitantes/Coleccionistas) and Artists Community
 * @param {'summit' | 'artists'} view 
 */
function switchView(view) {
    currentView = view;
    
    const summitViewEl = document.getElementById('summitView');
    const artistsViewEl = document.getElementById('artistsView');
    const tabSummit = document.getElementById('tabSummit');
    const tabArtists = document.getElementById('tabArtists');
    const navActionBtn = document.getElementById('navActionBtn');

    if (view === 'summit') {
        // Activate Summit
        summitViewEl.classList.add('active-view');
        artistsViewEl.classList.remove('active-view');
        
        tabSummit.classList.add('active');
        tabSummit.setAttribute('aria-selected', 'true');
        tabArtists.classList.remove('active');
        tabArtists.setAttribute('aria-selected', 'false');

        navActionBtn.innerText = 'Registro (Entrada Libre)';
        navActionBtn.className = 'btn btn-sm btn-outline';
        navActionBtn.onclick = () => openActionModal('summit');
    } else {
        // Activate Artists
        artistsViewEl.classList.add('active-view');
        summitViewEl.classList.remove('active-view');
        
        tabArtists.classList.add('active');
        tabArtists.setAttribute('aria-selected', 'true');
        tabSummit.classList.remove('active');
        tabSummit.setAttribute('aria-selected', 'false');

        navActionBtn.innerText = 'Únete Gratis';
        navActionBtn.className = 'btn btn-sm btn-pink';
        navActionBtn.onclick = () => openArtistRegisterModal();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Updates the Live Interactive Certificate Preview in real-time
 */
function updateCertPreview() {
    const artist = document.getElementById('demoArtist').value || 'Nombre del Artista';
    const title = document.getElementById('demoTitle').value || 'Título de la Obra';
    const tech = document.getElementById('demoTech').value || 'Técnica';
    const size = document.getElementById('demoSize').value || 'Dimensiones';
    const price = document.getElementById('demoPrice').value || '$0 MXN';

    document.getElementById('certArtistName').innerText = artist;
    document.getElementById('certArtworkTitle').innerText = title;
    document.getElementById('certTech').innerText = tech;
    document.getElementById('certSize').innerText = size;
    document.getElementById('certPrice').innerText = price;
}

/**
 * Modals & Registration Handling
 */
function openActionModal(type = 'summit') {
    if (type === 'artists' || currentView === 'artists') {
        openArtistRegisterModal();
    } else {
        document.getElementById('summitModal').classList.add('open');
    }
}

function openArtistRegisterModal() {
    document.getElementById('artistModal').classList.add('open');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('open');
}

function closeModalOnOverlay(e, modalId) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(modalId);
    }
}

function showToast(msg) {
    const toast = document.getElementById('toastNotice');
    document.getElementById('toastMsg').innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

function handleArtistSubmit(event) {
    event.preventDefault();
    closeModal('artistModal');
    showToast('¡Bienvenido a la Comunidad Bloom Art! Hemos enviado tus credenciales y acceso a herramientas a tu correo.');
    event.target.reset();
}

function handleSummitSubmit(event) {
    event.preventDefault();
    closeModal('summitModal');
    showToast('¡Registro confirmado exitosamente! Te esperamos en la inauguración de Bloom Art Summit.');
    event.target.reset();
}
