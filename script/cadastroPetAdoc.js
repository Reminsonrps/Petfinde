// Ao carregar a página, exibe os pets salvos
window.addEventListener('DOMContentLoaded', () => {
  const dadosSalvos = JSON.parse(localStorage.getItem('dadosPet')) || [];
  exibirPets(dadosSalvos);
});

// Cadastro de pet
document.getElementById('cadastroPet').addEventListener('submit', function(event) {
  event.preventDefault();

  const dados = new FormData(event.target);
  const dadosObj = {
    id: 'pet-' + Date.now(),
    nomePet: dados.get('nomePet'),
    idadePet: dados.get('idadePet'),
    tipoPet: dados.get('tipoPet'),
    racaPet: dados.get('racaPet'),
    sexoPet: dados.get('sexoPet'),
    portePet: dados.get('portePet'),
    descricaoPet: dados.get('descricaoPet'),
    vacinaPet: dados.get('vacinaPet') ? true : false,
    castradoPet: dados.get('castradoPet') ? true : false
  };

  const arquivoFoto = dados.get('fotoPet');

  if (
    !dadosObj.nomePet || !dadosObj.idadePet || !dadosObj.tipoPet ||
    !dadosObj.racaPet || !dadosObj.sexoPet || !dadosObj.portePet ||
    !arquivoFoto || !dadosObj.descricaoPet
  ) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  if (!arquivoFoto.type.startsWith('image/')) {
    alert('Por favor, envie uma imagem válida do pet.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    dadosObj.fotoPet = e.target.result;

    const pets = JSON.parse(localStorage.getItem('dadosPet')) || [];
    pets.push(dadosObj);
    localStorage.setItem('dadosPet', JSON.stringify(pets));

    document.getElementById('mensagem-sucesso').style.display = 'block';
    event.target.reset();

    console.log('Pet cadastrado:', dadosObj);

    // Atualiza galeria sem recarregar
    exibirPets(pets);
  };

  reader.readAsDataURL(arquivoFoto);
});

// Exibe os pets cadastrados
function exibirPets(pets) {
  const galeria = document.getElementById('galeriaPets');
  galeria.innerHTML = '';

  if (pets.length === 0) {
    galeria.innerHTML = '<p>Nenhum pet cadastrado ainda.</p>';
    return;
  }

  pets.forEach(pet => {
    const card = document.createElement('div');
    card.classList.add('pet-card');
    card.style.width = '220px';
    card.style.margin = '10px';
    card.style.padding = '10px';
    card.style.border = '1px solid #ccc';
    card.style.borderRadius = '8px';
    card.style.boxShadow = '0 0 6px rgba(0,0,0,0.1)';
    card.style.display = 'inline-block';
    card.style.verticalAlign = 'top';
    card.style.backgroundColor = '#fff';
    card.style.textAlign = 'center';

    const img = document.createElement('img');
    img.src = pet.fotoPet;
    img.alt = `Foto de ${pet.nomePet}`;
    img.style.width = '100%';
    img.style.height = '140px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '6px';

    const info = document.createElement('div');
    info.innerHTML = `
      <p><strong>ID:</strong> ${pet.id}</p>
      <h3>${pet.nomePet}</h3>
      <p><strong>Tipo:</strong> ${pet.tipoPet}</p>
      <p><strong>Raça:</strong> ${pet.racaPet}</p>
      <p><strong>Sexo:</strong> ${pet.sexoPet}</p>
      <p><strong>Porte:</strong> ${pet.portePet}</p>
      <p><strong>Vacinado:</strong> ${pet.vacinaPet ? 'Sim' : 'Não'}</p>
      <p><strong>Castrado:</strong> ${pet.castradoPet ? 'Sim' : 'Não'}</p>
    `;

    const btnEditar = document.createElement('button');
    btnEditar.textContent = '✏️ Editar';
    btnEditar.style.margin = '5px';
    btnEditar.style.backgroundColor = '#4CAF50';
    btnEditar.style.color = '#fff';
    btnEditar.style.border = 'none';
    btnEditar.style.borderRadius = '4px';
    btnEditar.style.padding = '6px 10px';
    btnEditar.onclick = () => editarPet(pet.id);

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = '🗑️ Excluir';
    btnExcluir.style.margin = '5px';
    btnExcluir.style.backgroundColor = '#f44336';
    btnExcluir.style.color = '#fff';
    btnExcluir.style.border = 'none';
    btnExcluir.style.borderRadius = '4px';
    btnExcluir.style.padding = '6px 10px';
    btnExcluir.onclick = () => excluirPet(pet.id);

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(btnEditar);
    card.appendChild(btnExcluir);
    galeria.appendChild(card);
  });
}

// Excluir pet
function excluirPet(id) {
  const pets = JSON.parse(localStorage.getItem('dadosPet')) || [];
  const atualizados = pets.filter(pet => pet.id !== id);
  localStorage.setItem('dadosPet', JSON.stringify(atualizados));
  exibirPets(atualizados);
}

// Editar pet (simples: preenche o formulário e remove o antigo)
function editarPet(id) {
  const pets = JSON.parse(localStorage.getItem('dadosPet')) || [];
  const pet = pets.find(p => p.id === id);
  if (!pet) return;

  document.querySelector('[name="nomePet"]').value = pet.nomePet;
  document.querySelector('[name="idadePet"]').value = pet.idadePet;
  document.querySelector('[name="tipoPet"]').value = pet.tipoPet;
  document.querySelector('[name="racaPet"]').value = pet.racaPet;
  document.querySelector('[name="sexoPet"]').value = pet.sexoPet;
  document.querySelector('[name="portePet"]').value = pet.portePet;
  document.querySelector('[name="descricaoPet"]').value = pet.descricaoPet;
  document.querySelector('[name="vacinaPet"]').checked = pet.vacinaPet;
  document.querySelector('[name="castradoPet"]').checked = pet.castradoPet;

  const atualizados = pets.filter(p => p.id !== id);
  localStorage.setItem('dadosPet', JSON.stringify(atualizados));
}