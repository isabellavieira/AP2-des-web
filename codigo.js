const url = "https://botafogo-atletas.mange.li/all";
const urlmasc = "https://botafogo-atletas.mange.li/masculino";
const urlfem = "https://botafogo-atletas.mange.li/feminino";

const body = document.body;
body.style.display = 'flex';
body.style.gap = '.5em';
body.style.flexWrap = 'wrap';

const jogadoresContainer = document.getElementById('jogadores-container');
const carregandoElement = document.getElementById('carregando');

const preenche = (atleta) => {
    const container = document.createElement('article');
    const titulo = document.createElement('h3');
    const imagem = document.createElement('img');
    const saibaMaisButton = document.createElement('button');

    container.dataset.id = atleta.id;
    container.dataset.altura = atleta.altura;
    container.dataset.nome_completo = atleta.nome_completo;
    container.dataset.nascimento = atleta.nascimento;
    container.dataset.descricao = atleta.descricao;
    container.dataset.tipo = atleta.tipo;

    titulo.innerText = atleta.nome;
    imagem.src = atleta.imagem;
    imagem.alt = `Imagem de ${atleta.nome}`;

    saibaMaisButton.innerText = 'Saiba Mais';
    saibaMaisButton.classList.add('saiba-mais-btn'); 
    saibaMaisButton.onclick = handleClick;

    container.appendChild(titulo);
    container.appendChild(imagem);
    container.appendChild(saibaMaisButton);

    jogadoresContainer.appendChild(container);
};

const handleClick = (e) => {
    const artigo = e.target.closest('article');

    document.cookie = `id=${artigo.dataset.id}`;
    document.cookie = `altura=${artigo.dataset.altura}`;
    document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
    document.cookie = `nascimento=${artigo.dataset.nascimento}`;
    document.cookie = `altura=${artigo.dataset.altura}`;

    //localStorage
    localStorage.setItem('id', artigo.dataset.id);
    localStorage.setItem('nome_completo', artigo.dataset.nome_completo);
    localStorage.setItem('nascimento', artigo.dataset.nascimento);
    localStorage.setItem('altura', artigo.dataset.altura);

    console.log(acha_cookie('id')); 
    console.log(localStorage.getItem('nome_completo')); 

    window.location = `detalhes.html?id=${artigo.dataset.id}`;
}

const acha_cookie = (chave) => {
    const lista_de_cookies = document.cookie.split("; ");
    const procurado = lista_de_cookies.find(
        (e) => e.startsWith(chave));
    return procurado.split("=")[1];
}

const pegar_coisas = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const filtrarJogadores = async (tipo) => {
    // Limpar jogadores existentes
    document.getElementById('jogadores-container').innerHTML = '';

 // Exibir o elemento de carregando
 document.getElementById('carregando').style.display = 'block';


    // Obter jogadores do servidor
   
    if (tipo === 'MASCULINO') {
        apiUrl = urlmasc;
    } else if (tipo === 'FEMININO') {
        apiUrl = urlfem;
    } else if (tipo === 'TODOS') {
        apiUrl = url;
    } 
            

    // Caso específico (MASCULINO ou FEMININO)
    try {
        const entrada = await pegar_coisas(apiUrl);

        for (atleta of entrada) {
            preenche(atleta);
        }

    } catch (error) {
        console.error('Erro ao carregar jogadores:', error);
    } finally {
        // Ocultar o elemento de carregando
        document.getElementById('carregando').style.display = 'none';
    }
}

document.getElementById('btnSair').addEventListener('click', () => {
    window.location.href = 'index.html'; // Redireciona para o index.html
});


document.addEventListener('DOMContentLoaded', () => {
    const detalhesContainer = document.getElementById('detalhes-content');
    const btnVoltar = document.getElementById('btnVoltar');

    // Obter parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('id');
    const playerName = urlParams.get('nome_completo');
    const playerBirthdate = urlParams.get('nascimento');
    const playerHeight = urlParams.get('altura');

    // Exibir detalhes do jogador
    detalhesContainer.innerHTML = `
        <h2>ID: ${playerId}</h2>
        <h2>Nome: ${playerName}</h2>
        <h2>Nascimento: ${playerBirthdate}</h2>
        <h2>Altura: ${playerHeight}</h2>
        <!-- Adicione mais detalhes conforme necessário -->

    `;

    // Adicionar evento de clique para o botão "Voltar"
    btnVoltar.addEventListener('click', () => {
        window.location.href = 'index.html'; // Substitua 'index.html' pelo caminho correto da sua página principal
    });
});