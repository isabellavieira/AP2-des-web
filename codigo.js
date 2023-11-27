const url = "https://botafogo-atletas.mange.li/all";
const urlmasc = "https://botafogo-atletas.mange.li/masculino";
const urlfem = "https://botafogo-atletas.mange.li/feminino";

const verificarAcessoListagem = () => {
    const senhaInserida = localStorage.getItem('coiso');

    if (!senhaInserida) {
        // Senha não foi inserida, redirecione para a página de login
        alert('Não foi possível completar a operação. Faça login primeiro.');
        window.location.href = 'index.html';
    }
};
verificarAcessoListagem();

const body = document.body;
body.classList.add('flex-container');

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
    container.dataset.imagem = atleta.imagem;

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

    jogadoresContainer.appendChild(container);
    saibaMaisButton.addEventListener('click', () => redirecionarParaDetalhes(atleta))
};

document.addEventListener('DOMContentLoaded', () => {
    ajustarResponsividade();
    ajustarBotoesOuSelect();

    window.addEventListener('resize', () => {
        ajustarResponsividade();
        ajustarBotoesOuSelect();
    });
});

const ajustarResponsividade = () => {
    const larguraJanela = window.innerWidth;
    const detalhesContainer = document.getElementById('detalhes-content');
    const imagemJogador = detalhesContainer ? detalhesContainer.querySelector('img') : null;

    if (larguraJanela <= 768 && detalhesContainer && imagemJogador) {
        detalhesContainer.style.flexDirection = 'column';
        imagemJogador.style.order = -1;
    } else if (detalhesContainer && imagemJogador) {
        detalhesContainer.style.flexDirection = 'row';
        imagemJogador.style.order = 0;
    }
};


const ajustarBotoesOuSelect = () => {
    const larguraJanela = window.innerWidth;
    const botoesSection = document.getElementById('botoesSection');

    if (larguraJanela <= 768) {
        // Menos de 768px, usar o menu suspenso e adicionar classe
        botoesSection.innerHTML = `
            <label for="selecionar"></label>
            <select id="selecionar" class="selectEstilizado" onchange="selecionarOpcao(this.value)">
                <option value="" selected disabled>Selecione...</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="TODOS">Ver Todos</option>
            </select>
        `;
        // Adicione a classe para estilização
        botoesSection.classList.add('menorSessao');
    } else {
        // Mais de 768px, usar os botões e remover classe
        botoesSection.innerHTML = `
            <button class="botoes-jog" onclick="filtrarJogadores('MASCULINO')">MASCULINO</button>
            <button class="botoes-jog" onclick="filtrarJogadores('FEMININO')">FEMININO</button>
            <button class="botoes-jog" onclick="filtrarJogadores('TODOS')">VER TODOS</button>
        `;
        // Remova a classe
        botoesSection.classList.remove('menorSessao');
    }
};

const selecionarOpcao = (opcao) => {
    // Função para ser chamada quando uma opção for selecionada no menu suspenso
    filtrarJogadores(opcao);
};


const handleClick = (e) => {
    const artigo = e.target.closest('article');

    document.cookie = `id=${artigo.dataset.id}`;
    document.cookie = `altura=${artigo.dataset.altura}`;
    document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
    document.cookie = `nascimento=${artigo.dataset.nascimento}`;
    document.cookie = `altura=${artigo.dataset.altura}`;
    document.cookie = `descricao=${artigo.dataset.descricao}`;

    //localStorage
    localStorage.setItem('id', artigo.dataset.id);
    localStorage.setItem('nome_completo', artigo.dataset.nome_completo);
    localStorage.setItem('nascimento', artigo.dataset.nascimento);
    localStorage.setItem('altura', artigo.dataset.altura);
    localStorage.setItem('descricao', artigo.dataset.descricao);
    localStorage.setItem('imagem', artigo.dataset.imagem);

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