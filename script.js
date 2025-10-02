// Base de datos de autos
const autos = [
    {
        id: 1,
        marca: "Toyota",
        modelo: "Corolla",
        año: 2023,
        precio: 25000,
        tipo: "sedan",
        imagen: "https://via.placeholder.com/350x250/0066cc/ffffff?text=Toyota+Corolla",
        descripcion: "Sedán compacto confiable y eficiente en combustible.",
        caracteristicas: ["Automático", "4 Cilindros", "Bluetooth", "Cámara Trasera"],
        combustible: "Gasolina",
        transmision: "Automática",
        disponible: true
    },
    {
        id: 2,
        marca: "Honda",
        modelo: "CR-V",
        año: 2023,
        precio: 32000,
        tipo: "suv",
        imagen: "https://via.placeholder.com/350x250/cc0000/ffffff?text=Honda+CR-V",
        descripcion: "SUV espaciosa perfecta para familias.",
        caracteristicas: ["AWD", "Turbo", "Apple CarPlay", "Sensores de Parking"],
        combustible: "Gasolina",
        transmision: "CVT",
        disponible: true
    },
    {
        id: 3,
        marca: "Ford",
        modelo: "Mustang",
        año: 2023,
        precio: 45000,
        tipo: "deportivo",
        imagen: "https://via.placeholder.com/350x250/ff6600/ffffff?text=Ford+Mustang",
        descripcion: "Muscle car icónico con potencia excepcional.",
        caracteristicas: ["V8", "Manual", "Modo Sport", "Escape Deportivo"],
        combustible: "Gasolina",
        transmision: "Manual",
        disponible: true
    },
    {
        id: 4,
        marca: "BMW",
        modelo: "Serie 3",
        año: 2023,
        precio: 48000,
        tipo: "sedan",
        imagen: "https://via.placeholder.com/350x250/000066/ffffff?text=BMW+Serie+3",
        descripcion: "Lujo alemán con tecnología de vanguardia.",
        caracteristicas: ["Turbo", "Automático", "Navegación", "Asientos de Cuero"],
        combustible: "Gasolina",
        transmision: "Automática",
        disponible: false
    },
    {
        id: 5,
        marca: "Volkswagen",
        modelo: "Golf",
        año: 2023,
        precio: 24000,
        tipo: "hatchback",
        imagen: "https://via.placeholder.com/350x250/009900/ffffff?text=VW+Golf",
        descripcion: "Hatchback versátil ideal para la ciudad.",
        caracteristicas: ["Turbo", "DSG", "Digital Cockpit", "Parking Assist"],
        combustible: "Gasolina",
        transmision: "DSG",
        disponible: true
    },
    {
        id: 6,
        marca: "Mazda",
        modelo: "CX-5",
        año: 2023,
        precio: 29000,
        tipo: "suv",
        imagen: "https://via.placeholder.com/350x250/cc3366/ffffff?text=Mazda+CX-5",
        descripcion: "SUV elegante con excelente manejo.",
        caracteristicas: ["AWD", "Skyactiv", "Bose Audio", "Head-Up Display"],
        combustible: "Gasolina",
        transmision: "Automática",
        disponible: true
    },
    {
        id: 7,
        marca: "Chevrolet",
        modelo: "Camaro",
        año: 2023,
        precio: 42000,
        tipo: "deportivo",
        imagen: "https://via.placeholder.com/350x250/ffcc00/000000?text=Chevrolet+Camaro",
        descripcion: "Deportivo americano con diseño agresivo.",
        caracteristicas: ["V6 Turbo", "Manual", "Modo Track", "Suspensión Deportiva"],
        combustible: "Gasolina",
        transmision: "Manual",
        disponible: true
    },
    {
        id: 8,
        marca: "Audi",
        modelo: "A4",
        año: 2023,
        precio: 46000,
        tipo: "sedan",
        imagen: "https://via.placeholder.com/350x250/333333/ffffff?text=Audi+A4",
        descripcion: "Sedán premium con tecnología quattro.",
        caracteristicas: ["Quattro AWD", "Turbo", "Virtual Cockpit", "Bang & Olufsen"],
        combustible: "Gasolina",
        transmision: "S tronic",
        disponible: true
    }
];

let autosFiltrados = [...autos];
let filtroActivo = 'todos';

// Función para inicializar la aplicación
function inicializarApp() {
    mostrarAutos(autos);
    configurarEventListeners();
}

// Configurar event listeners
function configurarEventListeners() {
    // Filtros de categoría
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remover clase active de todos los botones
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            e.target.classList.add('active');
            
            filtroActivo = e.target.dataset.filter;
            aplicarFiltros();
        });
    });

    // Búsqueda
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    searchBtn.addEventListener('click', aplicarFiltros);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            aplicarFiltros();
        }
    });

    // Modal
    const modal = document.getElementById('car-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', cerrarModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

// Función para mostrar autos en el grid
function mostrarAutos(autosParaMostrar) {
    const grid = document.getElementById('cars-grid');
    
    if (autosParaMostrar.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #666; font-size: 1.2rem;">No se encontraron autos que coincidan con tu búsqueda.</div>';
        return;
    }
    
    grid.innerHTML = autosParaMostrar.map(auto => `
        <div class="car-card" onclick="abrirModal(${auto.id})">
            <div class="car-image" style="background-image: url('${auto.imagen}')">
                <div class="car-badge ${auto.disponible ? '' : 'sold'}">${auto.disponible ? 'Disponible' : 'Vendido'}</div>
            </div>
            <div class="car-info">
                <h3 class="car-title">${auto.marca} ${auto.modelo}</h3>
                <p class="car-description">${auto.descripcion}</p>
                <div class="car-details">
                    <span class="car-price">$${auto.precio.toLocaleString()}</span>
                    <span class="car-year">${auto.año}</span>
                </div>
                <div class="car-features">
                    ${auto.caracteristicas.slice(0, 3).map(feat => `<span class="feature-tag">${feat}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Función para aplicar filtros
function aplicarFiltros() {
    let autosFiltrados = [...autos];
    
    // Filtrar por categoría
    if (filtroActivo !== 'todos') {
        autosFiltrados = autosFiltrados.filter(auto => auto.tipo === filtroActivo);
    }
    
    // Filtrar por búsqueda
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    if (searchTerm) {
        autosFiltrados = autosFiltrados.filter(auto => 
            auto.marca.toLowerCase().includes(searchTerm) ||
            auto.modelo.toLowerCase().includes(searchTerm) ||
            auto.descripcion.toLowerCase().includes(searchTerm)
        );
    }
    
    mostrarAutos(autosFiltrados);
}

// Función para abrir modal con detalles del auto
function abrirModal(id) {
    const auto = autos.find(a => a.id === id);
    if (!auto) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
            <div>
                <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}" style="width: 100%; border-radius: 10px;">
            </div>
            <div>
                <h2 style="color: #333; margin-bottom: 1rem;">${auto.marca} ${auto.modelo} ${auto.año}</h2>
                <p style="color: #666; margin-bottom: 1.5rem; font-size: 1.1rem;">${auto.descripcion}</p>
                
                <div style="margin-bottom: 1rem;">
                    <h3 style="color: #007bff; font-size: 2rem; margin-bottom: 0.5rem;">$${auto.precio.toLocaleString()}</h3>
                    <span style="color: ${auto.disponible ? '#28a745' : '#dc3545'}; font-weight: bold;">
                        ${auto.disponible ? '✅ Disponible' : '❌ No Disponible'}
                    </span>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: #333; margin-bottom: 0.5rem;">Especificaciones:</h4>
                    <p><strong>Combustible:</strong> ${auto.combustible}</p>
                    <p><strong>Transmisión:</strong> ${auto.transmision}</p>
                    <p><strong>Tipo:</strong> ${auto.tipo.charAt(0).toUpperCase() + auto.tipo.slice(1)}</p>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: #333; margin-bottom: 0.5rem;">Características:</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${auto.caracteristicas.map(feat => `<span class="feature-tag">${feat}</span>`).join('')}
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem;">
                    <button class="btn-primary" onclick="contactarVendedor(${auto.id})" ${!auto.disponible ? 'disabled' : ''}>
                        ${auto.disponible ? 'Contactar Vendedor' : 'No Disponible'}
                    </button>
                    <button onclick="programarPrueba(${auto.id})" style="padding: 12px 20px; border: 2px solid #007bff; background: transparent; color: #007bff; border-radius: 5px; cursor: pointer;" ${!auto.disponible ? 'disabled' : ''}>
                        Programar Prueba
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('car-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar modal
function cerrarModal() {
    document.getElementById('car-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para contactar vendedor
function contactarVendedor(id) {
    const auto = autos.find(a => a.id === id);
    alert(`¡Gracias por tu interés en el ${auto.marca} ${auto.modelo}!\n\nNuestro equipo de ventas se pondrá en contacto contigo pronto.\n\n📞 Teléfono: +1 (555) 123-4567\n📧 Email: ventas@automax.com`);
}

// Función para programar prueba de manejo
function programarPrueba(id) {
    const auto = autos.find(a => a.id === id);
    alert(`¡Excelente elección!\n\nPara programar una prueba de manejo del ${auto.marca} ${auto.modelo}, por favor contactanos:\n\n📞 +1 (555) 123-4567\n📧 pruebas@automax.com\n\nHorarios disponibles: Lunes a Sábado 9:00 AM - 6:00 PM`);
}

// Función para scroll suave
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarApp);

// Agregar scroll listener para efectos adicionales
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
});
