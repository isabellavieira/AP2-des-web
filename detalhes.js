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
  
    // Adicionar listener de redimensionamento
    window.addEventListener('resize', () => {
        ajustarResponsividade(detalhesContainer);
        ajustarBotoesOuSelect();
    });
  
    // Ajustar a responsividade inicial
    ajustarResponsividade(detalhesContainer);
    ajustarBotoesOuSelect();
});

const ajustarBotoesOuSelect = () => {
    const larguraJanela = window.innerWidth;
    const botoesSection = document.getElementById('botoesSection');
  
    if (larguraJanela <= 768) {
        // Menos de 768px, usar o menu suspenso
        botoesSection.innerHTML = `
            <label for="selecionar">Selecionar:</label>
            <select id="selecionar" onchange="selecionarOpcao(this.value)">
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="TODOS">Ver Todos</option>
            </select>
        `;
    } else {
        // Mais de 768px, usar os botões
        botoesSection.innerHTML = `
            <button class="botoes-jog" onclick="filtrarJogadores('MASCULINO')">MASCULINO</button>
            <button class="botoes-jog" onclick="filtrarJogadores('FEMININO')">FEMININO</button>
            <button class="botoes-jog" onclick="filtrarJogadores('TODOS')">VER TODOS</button>
        `;
    }
};

const selecionarOpcao = (opcao) => {
    // Função para ser chamada quando uma opção for selecionada no menu suspenso
    filtrarJogadores(opcao);
};

const exibirDetalhes = async () => {
    const detalhesContainer = document.getElementById('detalhes-content');
  
    // Obter detalhes do localStorage
    const detalhesAtleta = {
        id: localStorage.getItem('id'),
        nome: localStorage.getItem('nome_completo'),
        nascimento: localStorage.getItem('nascimento'),
        altura: localStorage.getItem('altura'),
        descricao: localStorage.getItem('descricao'),
        imagem: localStorage.getItem('imagem'),
        // Adicione mais detalhes conforme necessário
    };
  
    // Exibir detalhes do jogador com estilos
    detalhesContainer.innerHTML = `
        <img src="${detalhesAtleta.imagem}" alt="Imagem de ${detalhesAtleta.nome}" style="max-width: 200px; border-radius: 8px; padding: 50px ">
        <div class="info-jogador">
            <h2 style="font-size: 24px; color: #333; margin-bottom: 10px;">Nome: ${detalhesAtleta.nome}</h2>
            <h3 style="font-size: 18px; color: #333; margin-bottom: 8px;">Nascimento: ${detalhesAtleta.nascimento}</h3>
            <h3 style="font-size: 18px; color: #333; margin-bottom: 8px;">Altura: ${detalhesAtleta.altura}</h3>
            <h4 style="font-size: 17px; color: #333; margin-bottom: 12px; width: 500px">Descrição: ${detalhesAtleta.descricao}</h4>
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
    document.cookie = `descricao=${artigo.dataset.descricao}`;
    document.cookie = `imagem=${artigo.dataset.imagem}`;
  
    // localStorage
    localStorage.setItem('id', artigo.dataset.id);
    localStorage.setItem('nome_completo', artigo.dataset.nome_completo);
    localStorage.setItem('nascimento', artigo.dataset.nascimento);
    localStorage.setItem('altura', artigo.dataset.altura);
    localStorage.setItem('descricao', artigo.dataset.descricao);
    localStorage.setItem('imagem', artigo.dataset.imagem);
  
    console.log(acha_cookie('id'));
    console.log(localStorage.getItem('nome_completo'));
  
    // Atualizar os detalhes na tela
    await exibirDetalhes();
  
    window.location.href = `detalhes.html?id=${artigo.dataset.id}`;
};

// Restante do seu código...
