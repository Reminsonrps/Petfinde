function redirecionarComAutenticacao(acao, id) {
  window.location.href = `editar.html?acao=${acao}&id=${id}`;
}

function exibirPets() {
  const galeria = document.querySelector('.container-cards');
  if (!galeria) {
    console.error("Elemento .container-cards não encontrado.");
    return;
  }

  galeria.innerHTML = '';

  const listaPets = JSON.parse(localStorage.getItem('pets')) || [];

  // 🔍 Captura os filtros
  const nomeFiltro = document.getElementById('filtro-nome')?.value.toLowerCase() || '';
  const localFiltro = document.getElementById('filtro-localizacao')?.value.toLowerCase() || '';
  const especieFiltro = document.getElementById('filtro-especie')?.value || '';

  // 🔎 Aplica os filtros
  const petsFiltrados = listaPets.filter(pet => {
    const nomeMatch = pet.nome.toLowerCase().includes(nomeFiltro);
    const localMatch = pet.localiza.toLowerCase().includes(localFiltro);
    const especieMatch = especieFiltro === '' || pet.raca === especieFiltro;
    return nomeMatch && localMatch && especieMatch;
  });

  if (petsFiltrados.length === 0) {
    galeria.innerHTML = '<p>Nenhum pet encontrado com os filtros aplicados.</p>';
    return;
  }

  petsFiltrados.forEach(pet => {
    const bloco = document.createElement('div');
    bloco.className = 'pet-card';
    bloco.innerHTML = `
      <img src="${pet.imagem}" alt="${pet.nome}" onerror="this.src='https://via.placeholder.com/150'">
      <p><strong>Nome:</strong> ${pet.nome}</p>
      <p><strong>Localização:</strong> ${pet.localiza}</p>
      <p><strong>Espécie:</strong> ${pet.raca}</p>
      <p><strong>Data:</strong> ${pet.data}</p>
      <p><strong>Contato:</strong> ${pet.contato}</p>
      <p><strong>Descrição:</strong> ${pet.descricao || 'Não informada'}</p>
      <button onclick="redirecionarComAutenticacao('editar', ${pet.id})">✏️ Editar</button>
      <button onclick="redirecionarComAutenticacao('excluir', ${pet.id})">🗑️ Excluir</button>
    `;
    galeria.appendChild(bloco);
  });
}

window.onload = exibirPets;

