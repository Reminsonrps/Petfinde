document.querySelector('#formulario').addEventListener('submit', function(event) {
  event.preventDefault();

  const imagemInput = document.getElementById('imagem');
  const arquivoImagem = imagemInput.files[0];

  if (!arquivoImagem) {
    alert('Por favor, selecione uma imagem do pet.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const pet = {
      id: Date.now(), // Garante um ID único
      nome: document.getElementById('nome').value,
      localiza: document.getElementById('localizacao').value,
      raca: document.getElementById('especie').value,
      data: document.getElementById('data').value,
      contato: document.getElementById('contato').value,
      descricao: document.getElementById('descricao').value,
      imagem: e.target.result // base64 da imagem
    };

    // Validação simples
    if (Object.values(pet).some(valor => !valor && valor !== pet.descricao)) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const listaPets = JSON.parse(localStorage.getItem('pets')) || [];
    listaPets.push(pet);
    localStorage.setItem('pets', JSON.stringify(listaPets));

    alert('Pet cadastrado com sucesso!');
    document.getElementById('formulario').reset();

    // Redireciona após 1 segundo
    setTimeout(() => {
      window.location.href = "cadastrados.html";
    }, 1000);
  };

  reader.readAsDataURL(arquivoImagem);
});




