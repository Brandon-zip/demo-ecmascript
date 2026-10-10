// 1. Referencias al DOM (HTML)
const btnCargar = document.getElementById('btn-cargar');
const contenedor = document.getElementById('contenedor-tarjetas');
const estado = document.getElementById('estado');

// API pública
const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Función asíncrona moderna
 */
async function obtenerDirectorio() {
  try {
    // Muestra mensaje de carga
    estado.textContent = 'Conectando con la base de datos...';
    btnCargar.disabled = true;
    contenedor.innerHTML = ''; 

    // Petición a la API usando ECMAScript moderno
    const respuesta = await fetch(API_URL);
    
    // Validación nativa de errores
    if (!respuesta.ok) throw new Error('Falla en la conexión al servidor');

    // Conversión de datos
    const usuarios = await respuesta.json();

    // Renderizado en pantalla
    renderizarUsuarios(usuarios);
    estado.textContent = 'Directorio cargado exitosamente.';

  } catch (error) {
    estado.textContent = `Error del sistema: ${error.message}`;
    console.error(error);
  } finally {
    btnCargar.disabled = false;
  }
}

/**
 * Función para generar el HTML usando características de ES6
 */
function renderizarUsuarios(usuarios) {
  const htmlTarjetas = usuarios.map((usuario) => {
    // ES6: Desestructuración para extraer solo lo que necesitamos
    const { name, email, phone, company } = usuario;
    
    // ES6: Template Literals (comillas invertidas) para código limpio
    return `
      <article class="card">
        <h3>${name}</h3>
        <p>📧 ${email}</p>
        <p>📞 ${phone.split(' ')[0]}</p>
        <div class="tag">🏢 ${company.name}</div>
      </article>
    `;
  }).join('');

  contenedor.innerHTML = htmlTarjetas;
}

// Evento que dispara la acción
btnCargar.addEventListener('click', obtenerDirectorio);