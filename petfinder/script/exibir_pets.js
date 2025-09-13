function exibirPets() {
  const galeria = document.querySelector('.container-cards');
  if (!galeria) return;

  galeria.innerHTML = '';

  const listaPets = JSON.parse(sessionStorage.getItem('pets')) || [];

  // Filtros
  const filtroNome = document.getElementById('filtro-nome').value.toLowerCase();
  const filtroLocal = document.getElementById('filtro-localizacao').value.toLowerCase();
  const filtroEspecie = document.getElementById('filtro-especie').value;

  const petsFiltrados = listaPets.filter(pet => {
    const nomeMatch = pet.nome.toLowerCase().includes(filtroNome);
    const localMatch = pet.localiza.toLowerCase().includes(filtroLocal);
    const especieMatch = filtroEspecie === '' || pet.raca.toLowerCase() === filtroEspecie.toLowerCase();
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
      <p><strong>Última localização:</strong> ${pet.localiza}</p>
      <p><strong>Espécie:</strong> ${pet.raca}</p>
      <p><strong>Data:</strong> ${pet.data}</p>
      <p><strong>Contato:</strong> ${pet.contato}</p>
      <p><strong>Descrição:</strong> ${pet.descricao || 'Não informada'}</p>
    `;
    galeria.appendChild(bloco);
  });
}

// Exibir pets ao carregar a página
window.onload = exibirPets;

