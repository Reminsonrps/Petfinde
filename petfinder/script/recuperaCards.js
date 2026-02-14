// ⏳ Debounce para evitar chamadas excessivas
let debounceTimer;

function exibirPets() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const listaPets = JSON.parse(localStorage.getItem('pets')) || [];
    const container = document.querySelector('.container-cards');
    container.innerHTML = '';

    // Captura os valores dos filtros
    const filtroNome = document.getElementById('filtro-nome').value.toLowerCase();
    const filtroLocalizacao = document.getElementById('filtro-localizacao').value.toLowerCase();
    const filtroEspecie = document.getElementById('filtro-especie').value;

    // Filtra os pets
    const petsFiltrados = listaPets.filter(pet => {
      const nomeMatch = pet.nome.toLowerCase().includes(filtroNome);
      const localMatch = pet.localiza.toLowerCase().includes(filtroLocalizacao);
      const especieMatch = filtroEspecie === '' || pet.raca === filtroEspecie;
      return nomeMatch && localMatch && especieMatch;
    });

    // Exibe os cards
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
        <p><strong>Raça:</strong> ${pet.raca}</p>
        <p><strong>Localização:</strong> ${pet.localiza}</p>
        <p><strong>Data:</strong> ${pet.data}</p>
        <p><strong>Contato:</strong> ${pet.contato}</p>
       <div class="descricao"><strong>Descrição:</strong> ${pet.descricao}</div>
        <div class="actions">
          <button class="edit" onclick="autenticarAcao('editar', ${pet.id})">✏️ Editar</button>
          <button class="delete" onclick="autenticarAcao('excluir', ${pet.id})">🗑️ Excluir</button>
        </div>

      `;


      container.appendChild(card);
    });
  }, 300);
}
function autenticarAcao(acao, id) {
  const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioLogado'));
  const listaPets = JSON.parse(localStorage.getItem('pets')) || [];

  const usuario = prompt("Digite seu usuário:").trim();
  const senha = prompt("Digite sua senha:").trim();

  if (
    !usuarioSalvo ||
    usuario.toLowerCase() !== usuarioSalvo.usuario.toLowerCase() ||
    senha !== usuarioSalvo.senha
  ) {
    alert("Usuário ou senha inválidos.");
    return;
  }

  if (acao === 'editar') {
    localStorage.setItem('petEditId', id);
    window.location.href = 'editar.html';
  } else if (acao === 'excluir') {
    const novaLista = listaPets.filter(p => p.id !== id);
    localStorage.setItem('pets', JSON.stringify(novaLista));
    alert("Pet excluído com sucesso!");
    exibirPets(); // Atualiza os cards
  }
}

// 🎯 Eventos de filtro dinâmico
document.getElementById('filtro-nome').addEventListener('input', exibirPets);
document.getElementById('filtro-localizacao').addEventListener('input', exibirPets);
document.getElementById('filtro-especie').addEventListener('change', exibirPets);

// 🚀 Exibe todos os pets ao carregar a página
window.addEventListener('DOMContentLoaded', exibirPets);

