const verificarAcessoDetalhes = () => {
    const senhaInserida = localStorage.getItem('coiso');

    if (!senhaInserida) {
        // Senha não foi inserida, redirecione para a página de login
        alert('Não foi possível completar a operação. Faça login primeiro.');
        window.location.href = 'index.html';
    }
};

verificarAcessoDetalhes();

document.addEventListener('DOMContentLoaded', async () => {
    const detalhesContainer = document.getElementById('detalhes-content');
    const btnVoltar = document.getElementById('btnVoltar');

    // Exibir detalhes do localStorage
    await exibirDetalhes();

    // Adicionar evento de clique para o botão "Voltar"
    btnVoltar.addEventListener('click', () => {
        window.location.href = 'home.html'; 
    });

    // Adicionar listener de redimensionamento
    window.addEventListener('resize', () => {
        ajustarResponsividade(detalhesContainer);
        ajustarBotoesOuSelect();
    });
    const ajustarResponsividade = (container) => {

    // Ajustar a responsividade inicial
    ajustarResponsividade(detalhesContainer);
    ajustarBotoesOuSelect();}
});
const exibirDetalhes = async () => {
    const detalhesContainer = document.getElementById('detalhes-content');

    try {
        // Obter detalhes do localStorage
        const detalhesAtleta = {
            id: localStorage.getItem('id'),
            nome: localStorage.getItem('nome_completo'),
            nascimento: localStorage.getItem('nascimento'),
            altura: localStorage.getItem('altura'),
            descricao: localStorage.getItem('descricao'),
            imagem: localStorage.getItem('imagem'),
           
        };

        // Exibir detalhes do jogador
        detalhesContainer.innerHTML = `
            <img src="${detalhesAtleta.imagem}" alt="Imagem de ${detalhesAtleta.nome}">
            <div id="detalhes-textos">
                <h2>Nome: ${detalhesAtleta.nome}</h2>
                <h3>Nascimento: ${detalhesAtleta.nascimento}</h3>
                <h3>Altura: ${detalhesAtleta.altura}</h3>
                <h4>Descrição: ${detalhesAtleta.descricao}</h4>
            </div>
        `;
    } catch (error) {
        console.error('Erro ao obter detalhes:', error.message);
        // Exibir mensagem de erro na tela
        detalhesContainer.innerHTML = '<p>Ocorreu um erro ao obter os detalhes do jogador.</p>';
    }
};


const handleClick = async (e) => {
    const artigo = e.target.closest('article');

    document.cookie = `id=${artigo.dataset.id}`;
    document.cookie = `altura=${artigo.dataset.altura}`;
    document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
    document.cookie = `nascimento=${artigo.dataset.nascimento}`;
    document.cookie = `altura=${artigo.dataset.altura}`;
    document.cookie = `descricao=${artigo.dataset.descricao}`;
    document.cookie = `imagem=${artigo.dataset.imagem}`;

    // localStorage
    localStorage.setItem('id', artigo.dataset.id);
    localStorage.setItem('nome_completo', artigo.dataset.nome_completo);
    localStorage.setItem('nascimento', artigo.dataset.nascimento);
    localStorage.setItem('altura', artigo.dataset.altura);
    localStorage.setItem('descricao', artigo.dataset.descricao);
    localStorage.setItem('imagem', artigo.dataset.imagem);

    // Atualizar os detalhes na tela
    await exibirDetalhes();

    window.location.href = `detalhes.html?id=${artigo.dataset.id}`;
};
