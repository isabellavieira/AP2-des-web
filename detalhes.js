document.addEventListener('DOMContentLoaded', async () => {
    const detalhesContainer = document.getElementById('detalhes-content');
    const btnVoltar = document.getElementById('btnVoltar');

    // Exibir detalhes do localStorage
    await exibirDetalhes();

    // Adicionar evento de clique para o botão "Voltar"
    btnVoltar.addEventListener('click', () => {
        window.location.href = 'home.html'; // Substitua 'index.html' pelo caminho correto da sua página principal
    });
});

const exibirDetalhes = async () => {
    const detalhesContainer = document.getElementById('detalhes-content');

    // Obter detalhes do localStorage
    const detalhesAtleta = {
        id: localStorage.getItem('id'),
        nome: localStorage.getItem('nome_completo'),
        nascimento: localStorage.getItem('nascimento'),
        altura: localStorage.getItem('altura'),
        descricao: localStorage.getItem('descricao'), // Adicione a linha para obter a descrição
        imagem: localStorage.getItem('imagem'), // Adicione a linha para obter a URL da imagem
        // Adicione mais detalhes conforme necessário
    };

    // Exibir detalhes do jogador
    detalhesContainer.innerHTML = `
        <h2>Nome: ${detalhesAtleta.nome}</h2>
        <h2>Nascimento: ${detalhesAtleta.nascimento}</h2>
        <h2>Altura: ${detalhesAtleta.altura}</h2>
        <h2>Descrição: ${detalhesAtleta.descricao}</h2>
        <img src="${detalhesAtleta.imagem}" alt="Imagem de ${detalhesAtleta.nome}">
        <!-- Adicione mais detalhes conforme necessário -->
    `;
};

const handleClick = async (e) => {
    const artigo = e.target.closest('article');

    document.cookie = `id=${artigo.dataset.id}`;
    document.cookie = `altura=${artigo.dataset.altura}`;
    document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
    document.cookie = `nascimento=${artigo.dataset.nascimento}`;
    document.cookie = `altura=${artigo.dataset.altura}`;
    document.cookie = `descricao=${artigo.dataset.descricao}`; // Adicione a linha para armazenar a descrição
    document.cookie = `imagem=${artigo.dataset.imagem}`; // Adicione a linha para armazenar a URL da imagem

    // localStorage
    localStorage.setItem('id', artigo.dataset.id);
    localStorage.setItem('nome_completo', artigo.dataset.nome_completo);
    localStorage.setItem('nascimento', artigo.dataset.nascimento);
    localStorage.setItem('altura', artigo.dataset.altura);
    localStorage.setItem('descricao', artigo.dataset.descricao); // Adicione a linha para armazenar a descrição
    localStorage.setItem('imagem', artigo.dataset.imagem); // Adicione a linha para armazenar a URL da imagem

    console.log(acha_cookie('id'));
    console.log(localStorage.getItem('nome_completo'));

    // Atualizar os detalhes na tela
    await exibirDetalhes();

    window.location.href = `detalhes.html?id=${artigo.dataset.id}`;
};

// Restante do código
