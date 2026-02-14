function autenticarAcao(acao, id) {
  const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioLogado'));
  const listaPets = JSON.parse(localStorage.getItem('pets')) || [];

  const usuario = prompt("Digite seu usuário:").trim().toLowerCase();
  const senha = prompt("Digite sua senha:").trim();

  if (
    !usuarioSalvo ||
    !usuarioSalvo.usuario ||
    !usuarioSalvo.senha ||
    usuario !== usuarioSalvo.usuario.trim().toLowerCase() ||
    senha !== usuarioSalvo.senha.trim()
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
    exibirPets();
  }
}