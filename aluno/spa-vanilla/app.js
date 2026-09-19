const rotas = {
    '#': exibirInicio,
    '#sobre': exibirSobre,
    '#contato': exibirContato,
    '#usuarios': exibirUsuarios
};

function exibirInicio() {
    return `
		<h1>Bem-vindo</h1>
		<p>Esta é a página inicial do nosso SPA</p>
	`;
}

function exibirSobre() {
    return `
		<h1>Sobre</h1>
		<p>Esta é nossa aula de Programação Dinâmica para Web e estamos aprendendo sobre SPAs</p>
	`;
}

function exibirContato() {
    return `
		<h1>Contato</h1>
		<p>Entre em contato conosco: (11) 0000-0000</p>
	`;
}

async function exibirUsuarios() {
    document.getElementById('app').innerHTML = "<h2>Carregando usuários...</h2>"

    try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
        const usuarios = await resposta.json();

        let listaHTML = '<h1>Lista de Usuários</h1><ul>';
        usuarios.forEach(usuario => {
            listaHTML += `<li><strong>${usuario.name}</strong> - ${usuario.email}</li>`;
        });
        listaHTML += '</ul>';

        return listaHTML;
    } catch (erro) {
        return '<h1>Erro ao carregar usuários</h1>'
    }
}

async function gerenciarRota() {
	// 1. Definimos como rota padrão, caso nenhuma definida
    let hash = window.location.hash || '#';
	
    if (rotas[hash]){
        let conteudo = await rotas[hash]();
        document.getElementById('app').innerHTML = conteudo;
    } else {
        document.getElementById('app').innerHTML = '<h1>Página não encontrada</h1>';
    }

}


// Ouvinte para o evento hashchange
window.addEventListener('hashchange', gerenciarRota);

window.addEventListener('load', gerenciarRota);