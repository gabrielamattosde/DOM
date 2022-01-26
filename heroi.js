// Promise que retorna a lista de herois
const getHero = async (heroId) => {
    if (!heroId) {
        throw new Error("heroId não recebido!")
    }

    const response = await fetch('https://www.dota2.com/datafeed/herodata?language=portuguese&hero_id='+heroId);
    const json = await response.json();

    return json.result.data.heroes[0]
}


const setAvatar = (hero) => {
    const shortName = hero.name.replace('npc_dota_hero_', '')
    const avatarUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${shortName}.png`;

    const img = document.getElementById('hero-avatar');
    img.src = avatarUrl;
    img.alt = hero.name_loc;
}

const setName = (hero) => {
    const title = document.getElementById('hero-name');
    title.innerText = hero.name_loc;
}

const setAnimation = (hero) => {
    const shortName = hero.name.replace('npc_dota_hero_', '')
    
    const posterUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${shortName}.png`;
    const videoUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${shortName}.webm`;

    const video = document.getElementById('hero-animation');
    video.poster = posterUrl;
    const source = document.createElement('source');

    source.type = 'video/webm';
    source.src = videoUrl;
    video.appendChild(source);
}

/*
    <div class="card border-white" style="width: 15rem;">
        <div class="card-body">
            <h5 class="card-title">Lâmina laguna</h5>
            <hr />
            <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/lina_laguna_blade.png"
            class="rounded-circle">
            <p class="card-text pt-2">Dispara um raio em uma única unidade inimiga, causando dano massivo.</p>
        </div>
    </div>
*/

const setAbilities = (hero) => {
    const abititiesWrapper = document.getElementById('hero-abilities');

    for (const index in hero.abilities) {
        const ability = hero.abilities[index];

        const card = document.createElement('div');
        card.classList.add('card', 'border-white');
        card.style = 'min-width: 200px;';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.innerText = ability.name_loc;

        const hr = document.createElement('hr');

        const img = document.createElement('img');
        img.classList.add('rounded-circle');
        img.src = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${ability.name}.png`;

        const description = document.createElement('p');
        description.classList.add('card-text', 'pt-2');
        description.innerHTML = ability.desc_loc;

        cardBody.appendChild(title);
        cardBody.appendChild(hr);
        cardBody.appendChild(img);
        cardBody.appendChild(description);

        card.appendChild(cardBody);

        abititiesWrapper.appendChild(card);
    }
}

(async () => {
    const params = new URLSearchParams(window.location.search);
    const heroid = params.get('id');

    const hero = await getHero(heroid);
    setAvatar(hero);
    setName(hero);
    setAnimation(hero);
    setAbilities(hero);

    console.log('hero', hero);
})();
