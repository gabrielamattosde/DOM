// Promise que retorna a lista de herois
const getHeroes = async () => {
    const response = await fetch('https://api.opendota.com/api/heroes');
    return response.json();
}

(async () => {
    // recupera a lista de herois
    const heroes = await getHeroes();

    // captura a UL da árvore DOM
    const ul = document.getElementById('lista-heroes');

    function preencherLista (nomeDoHeroi) {
        let filteredHeroes = heroes;

        // limpa o conteudo interno da UL
        ul.innerHTML = '';

        if (nomeDoHeroi) {
            // filtra a lista de herois pelo nome
            filteredHeroes = heroes.filter((hero) => {
                return hero
                    .localized_name
                    .toLowerCase()
                    .indexOf(nomeDoHeroi.toLowerCase()) >= 0;
            })
        }

        // Varre cada heroi e insere na UL
        for (const index in filteredHeroes) {
            const hero = filteredHeroes[index];
            // console.log(hero);
            // cria um elemento de tag name LI
            const li = document.createElement('li');
            const a = document.createElement('a');

            // insere o nome do heroi dentro do LI
            a.innerText = hero.localized_name;
            a.href = "heroi.html?id=" + hero.id;

            li.appendChild(a);

            // anexa o elemento recem criado no final da UL
            ul.appendChild(li);
        }
    }

    // Preenche a lsta completa (sem filtro)
    preencherLista();

    // captura o elemento de ID filter
    const input = document.getElementById('filter');

    // observa o evento "input"
    input.addEventListener('input', (event) => {
        // pega o valor inserido dentro do input
        const filterString = input.value;

        // preencher a lista com o nome do heroi que veio do input
        preencherLista(filterString);
    }, false);
})();


