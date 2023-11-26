document.addEventListener('DOMContentLoaded', async () => {
    const detalhesContainer = document.getElementById('detalhes-content');
    const btnVoltar = document.getElementById('btnVoltar');

// Estilo para o botão de voltar
btnVoltar.style.borderRadius = '5px';
btnVoltar.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
btnVoltar.style.width = '70px';
btnVoltar.style.padding = '10px';
btnVoltar.style.cursor = 'pointer';

// Adicionar evento de hover
btnVoltar.addEventListener('mouseover', () => {
    btnVoltar.style.transform = 'scale(1.08)';
    btnVoltar.style.backgroundColor = '#c7c7c7';
});

// Adicionar evento de sair do hover
btnVoltar.addEventListener('mouseout', () => {
    btnVoltar.style.transform = 'scale(1)';
    btnVoltar.style.backgroundColor = ''; // Limpar a cor de fundo para voltar ao estado original
});

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
        descricao: localStorage.getItem('descricao'), // Obter a descrição do localStorage
        imagem: localStorage.getItem('imagem'), // Obter a URL da imagem do localStorage
        // Adicione mais detalhes conforme necessário
    };

    // Exibir detalhes do jogador com estilos
    detalhesContainer.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center;">
        <img src="${detalhesAtleta.imagem}" alt="Imagem de ${detalhesAtleta.nome}" style="max-width: 200px; border-radius: 8px; padding: 50px ">
        <div>
            <h2 style="font-size: 24px; color: #333; margin-bottom: 10px;">Nome: ${detalhesAtleta.nome}</h2>
            <h3 style="font-size: 18px; color: #333; margin-bottom: 8px;">Nascimento: ${detalhesAtleta.nascimento}</h3>
            <h3 style="font-size: 18px; color: #333; margin-bottom: 8px;">Altura: ${detalhesAtleta.altura}</h3>
            <h4 style="font-size: 17px; color: #333; margin-bottom: 12px; width: 500px">Descrição: ${detalhesAtleta.descricao}</h4>
        </div>
    </div>
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