// Seleciona os itens de cada categoria
const pratos = document.querySelectorAll('.prato1, .prato2, .prato3');
const bebidas = document.querySelectorAll('.bebida1, .bebida2, .bebida3');
const sobremesas = document.querySelectorAll('.sobremesa1, .sobremesa2, .sobremesa3');
const barraCinza = document.querySelector('.barra-cinza');
const modal = document.getElementById('modal');
const fecharModal = document.getElementById('fechar-modal');

// Variáveis para controle de seleção
let pratoSelecionado = null;
let bebidaSelecionada = null;
let sobremesaSelecionada = null;

// Função para verificar se todos os itens foram selecionados
function atualizarEstadoBotao() {
    if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
        barraCinza.style.backgroundColor = '#32B72F'; // Altera para verde
        barraCinza.querySelector('p').textContent = 'Fechar pedido'; // Altera o texto
        barraCinza.style.pointerEvents = 'auto'; // Habilita o botão
    } else {
        barraCinza.style.backgroundColor = '#CBCBCB'; // Retorna para cinza
        barraCinza.querySelector('p').textContent = 'Selecione os 3 itens para fechar o pedido'; // Retorna o texto original
        barraCinza.style.pointerEvents = 'none'; // Desabilita o botão
    }
}

// Função para selecionar o item clicado em uma categoria
function selecionarItem(categoriaItens, itemSelecionado) {
    // Remove a borda destacada de todos os itens da categoria
    categoriaItens.forEach(item => {
        item.style.borderColor = '#FFFFFF';
    });
    // Adiciona a borda destacada ao item selecionado
    itemSelecionado.style.borderColor = '#32B72F'; // Cor da borda selecionada

    // Atualiza a seleção
    if (categoriaItens === pratos) pratoSelecionado = itemSelecionado;
    if (categoriaItens === bebidas) bebidaSelecionada = itemSelecionado;
    if (categoriaItens === sobremesas) sobremesaSelecionada = itemSelecionado;

    // Atualiza o estado do botão
    atualizarEstadoBotao();
}

// Função para abrir o modal com as informações dos itens selecionados
function abrirModal() {
    if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
        // Captura o nome e o valor de cada item selecionado
        const nomePrato = pratoSelecionado.querySelector('.nome').textContent;
        const precoPrato = pratoSelecionado.querySelector('.preço').textContent;
        
        const nomeBebida = bebidaSelecionada.querySelector('.nome').textContent;
        const precoBebida = bebidaSelecionada.querySelector('.preço').textContent;
        
        const nomeSobremesa = sobremesaSelecionada.querySelector('.nome').textContent;
        const precoSobremesa = sobremesaSelecionada.querySelector('.preço').textContent;

        // Calcula o total
        const valorTotal = (
            parseFloat(precoPrato.replace('R$', '').replace(',', '.')) +
            parseFloat(precoBebida.replace('R$', '').replace(',', '.')) +
            parseFloat(precoSobremesa.replace('R$', '').replace(',', '.'))
        ).toFixed(2);

        // Atualiza o modal com os dados capturados
        document.getElementById('prato-selecionado').textContent = `Prato: ${nomePrato} - ${precoPrato}`;
        document.getElementById('bebida-selecionada').textContent = `Bebida: ${nomeBebida} - ${precoBebida}`;
        document.getElementById('sobremesa-selecionada').textContent = `Sobremesa: ${nomeSobremesa} - ${precoSobremesa}`;
        document.getElementById('valor-total').textContent = `Total: R$${valorTotal}`;

        // Exibe o modal
        modal.style.display = 'flex';
    }
}

// Função para reiniciar o estado do botão e as seleções
function reiniciarEstado() {
    pratoSelecionado = null;
    bebidaSelecionada = null;
    sobremesaSelecionada = null;
    barraCinza.style.backgroundColor = '#CBCBCB'; // Cor padrão
    barraCinza.querySelector('p').textContent = 'Selecione os 3 itens para fechar o pedido'; // Texto padrão
    barraCinza.style.pointerEvents = 'none'; // Desabilita o botão
    pratos.forEach(item => item.style.borderColor = '#FFFFFF'); // Reseta a borda dos pratos
    bebidas.forEach(item => item.style.borderColor = '#FFFFFF'); // Reseta a borda das bebidas
    sobremesas.forEach(item => item.style.borderColor = '#FFFFFF'); // Reseta a borda das sobremesas
}

// Adiciona o event listener para os itens da categoria "Pratos"
pratos.forEach(prato => {
    prato.addEventListener('click', (event) => {
        event.stopPropagation();
        selecionarItem(pratos, prato);
    });
});

// Adiciona o event listener para os itens da categoria "Bebidas"
bebidas.forEach(bebida => {
    bebida.addEventListener('click', (event) => {
        event.stopPropagation();
        selecionarItem(bebidas, bebida);
    });
});

// Adiciona o event listener para os itens da categoria "Sobremesas"
sobremesas.forEach(sobremesa => {
    sobremesa.addEventListener('click', (event) => {
        event.stopPropagation();
        selecionarItem(sobremesas, sobremesa);
    });
});

// Adiciona um event listener ao documento para detectar cliques fora dos itens
document.addEventListener('click', () => {
    pratos.forEach(item => item.style.borderColor = '#FFFFFF');
    bebidas.forEach(item => item.style.borderColor = '#FFFFFF');
    sobremesas.forEach(item => item.style.borderColor = '#FFFFFF');
});

// Adiciona event listener para o botão "Fechar pedido"
barraCinza.addEventListener('click', abrirModal);

// Fecha o modal ao clicar no botão "Fechar"
fecharModal.addEventListener('click', () => {
    modal.style.display = 'none'; // Oculta o modal
    reiniciarEstado(); // Reinicia o estado ao cancelar
});

// Função para enviar mensagem pelo WhatsApp
function enviarMensagem() {
    const prato = pratoSelecionado.querySelector('.nome').textContent;
    const precoPrato = pratoSelecionado.querySelector('.preço').textContent;

    const bebida = bebidaSelecionada.querySelector('.nome').textContent;
    const precoBebida = bebidaSelecionada.querySelector('.preço').textContent;

    const sobremesa = sobremesaSelecionada.querySelector('.nome').textContent;
    const precoSobremesa = sobremesaSelecionada.querySelector('.preço').textContent;

    const total = (
        parseFloat(precoPrato.replace('R$', '').replace(',', '.')) +
        parseFloat(precoBebida.replace('R$', '').replace(',', '.')) +
        parseFloat(precoSobremesa.replace('R$', '').replace(',', '.'))
    ).toFixed(2);

    const mensagem = `Olá, gostaria de fazer o pedido:\n- Prato: ${prato} - ${precoPrato}\n- Bebida: ${bebida} - ${precoBebida}\n- Sobremesa: ${sobremesa} - ${precoSobremesa}\nTotal: R$ ${total}`;
    const mensagemEncodada = encodeURIComponent(mensagem);
    
    const url = `https://api.whatsapp.com/send?text=${mensagemEncodada}`;
    
    window.open(url, '_blank');
}

// Adiciona o event listener para o botão "Tudo certo, pode pedir!"
document.querySelector('.confirma-pedido').addEventListener('click', () => {
    enviarMensagem(); // Envia a mensagem para o WhatsApp
    modal.style.display = 'none'; // Oculta o modal
    reiniciarEstado(); // Reinicia o estado ao confirmar o pedido
});
