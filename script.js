const gameApp = {};

gameApp.clientId = `G3733FStWX`
gameApp.endPoint = `https://api.boardgameatlas.com/api/search`

gameApp.init = () => {
    gameApp.getGame()
}

gameApp.getGame = () => {
    const atlasUrl = new URL(gameApp.endPoint)

    atlasUrl.search = new URLSearchParams({
        limit: 100,
        client_id: gameApp.clientId
    })
    fetch(atlasUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            gameApp.displayGames(data.games)
            // console.log(data.games[1].name)
        });
}

const playerAmount = document.querySelector('select[name=players]').value;
const timeLimit = document.querySelector('select[name=time]').value;

gameApp.displayGames = (gameArray) => {
    const playerFilter = gameArray.filter(function (games) {
        return games.max_players >= playerAmount && games.max_playtime <= timeLimit;
    })
    console.log(playerFilter);
};

gameApp.getRandomItem = (array) => {
    const RandomIndex = Math.floor(Math.random() * array.length)
    return array[RandomIndex];
}












const test = document.querySelector('.test')
const gameDescription = document.createElement('p')
test.append(gameDescription);
gameDescription.innerHTML = `${selectedGame.description}`;



gameApp.init();