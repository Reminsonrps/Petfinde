function exibirPets() {
  const listaPets = JSON.parse(localStorage.getItem('pets')) || [];
  const container = document.querySelector('.container-cards');
  container.innerHTML = '';

  // 🔍 Filtra apenas os pets com status "encontrado"
  const encontrados = listaPets.filter(pet => pet.status === "encontrado");

  // 🔍 Captura os valores dos filtros
  let filtroId = document.getElementById('filtro-id')?.value.trim();
  if (filtroId.length > 4) filtroId = filtroId.slice(0, 4);

  const filtroNome = document.getElementById('filtro-nome')?.value.trim().toLowerCase();
  const filtroLocalizacao = document.getElementById('filtro-localizacao')?.value.trim().toLowerCase();
  const filtroEspecie = document.getElementById('filtro-especie')?.value.trim().toLowerCase();

  const especieMap = {
    'cão': ['cachorro', 'cão', 'dog', 'canino', 'vira-lata'],
    'gato': ['gato', 'felino'],
    'outro': ['coelho', 'pássaro', 'tartaruga', 'outro']
  };

  const petsFiltrados = encontrados.filter(pet => {
    const idMatch = !filtroId || pet.id.toString().includes(filtroId);
    const nomeMatch = !filtroNome || pet.nome.toLowerCase().includes(filtroNome);
    const localMatch = !filtroLocalizacao || pet.localiza.toLowerCase().includes(filtroLocalizacao);

    let especieMatch = true;
    if (filtroEspecie && especieMap[filtroEspecie]) {
      const racaPet = pet.raca?.toLowerCase() || '';
      especieMatch = especieMap[filtroEspecie].some(e => racaPet.includes(e));
    }

    return idMatch && nomeMatch && localMatch && especieMatch;
  });

  if (petsFiltrados.length === 0) {
    container.innerHTML = '<p>Nenhum pet encontrado com os filtros aplicados.</p>';
    return;
  }

  petsFiltrados.forEach(pet => {
    const card = document.createElement('div');
    card.className = 'pet-card';

    card.innerHTML = `
      <img src="${pet.imagem}" alt="Imagem do pet">
      <h3>${pet.nome}</h3>
      <p><strong>ID:</strong> ${pet.id}</p>
      <p><strong>Tipo:</strong> ${pet.raca}</p>
      <p><strong>Sexo:</strong> ${pet.sexo || 'Indefinido'}</p>
      <p><strong>Idade:</strong> ${pet.idade || 'Não informada'}</p>
      <p><strong>Última localização:</strong> ${pet.localiza}</p>
      <p><strong>Data:</strong> ${pet.data}</p>
      <p><strong>Contato:</strong> ${pet.contato}</p>
      <p>
        <a href="https://wa.me/55${pet.whatsapp?.replace(/\D/g, '')}" target="_blank" style="text-decoration: none; color: #25D366;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style="width:20px; vertical-align:middle; margin-right:5px;">
          Falar no WhatsApp
        </a>
      </p>
      <p><strong>Descrição:</strong> ${pet.descricao}</p>
      <p><strong>Status:</strong> <span style="color:green;"><strong>ENCONTRADO</strong></span></p>
    `;

    container.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', exibirPets);