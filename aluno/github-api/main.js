function callbackComAdiamento(funcaoParaExecutar, tempoEspera) {
    let temporizador; // essa variavel armazena a referencia do setTimeout

    return function() {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => {
            funcaoParaExecutar;
        }, tempoEspera);
    };
}

async function pegaUsuarioGitHub {
    const username = campoInput.value;
    if (!username) return;

    // para mostrar o preload na tela
    try{
        const resposta = await fetch(`http://api.github.com/users/${username}`);

        if(!resposta.ok) {
            throw new Error("Usuário não encontrado.")
        }

        const dados = await resposta.json();

        const conteiner = document.querySelector('main');

        conteiner.innerHTML = `
            <div class="cartao">
                <img src="${dados.avatar_url}" alt="avatar de ${dados.login}">
                <h2>${dados.name} // ${dados.login}</h2>
                <p>Repositórios públicos: ${dados.public_repos}</p>
            </div>
        `;

    } catch (erro) {
        console.error(erro);
    } finally {

    }
}

const campoInput = document.querySelector('input[name="username]"');
campoInput.addEventListener('input', callbackComAdiamento(pegaUsuarioGitHub, 500));

