document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }
});

function autenticarAcao(acao, id) {
  const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioLogado'));
  const listaPets = JSON.parse(localStorage.getItem('pets')) || [];

  const usuario = prompt("Digite seu usuário:");
  const senha = prompt("Digite sua senha:");

  if (!usuarioSalvo || usuario !== usuarioSalvo.usuario || senha !== usuarioSalvo.senha) {
    alert("Usuário ou senha inválidos.");
    return;
  }

  if (acao === 'editar') {
    window.location.href = `editar.html?id=${id}&acao=editar`;
  } else if (acao === 'excluir') {
    const novaLista = listaPets.filter(p => p.id !== id);
    localStorage.setItem('pets', JSON.stringify(novaLista));
    alert("Pet excluído com sucesso!");
    location.reload();
  }
}