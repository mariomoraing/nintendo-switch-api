class GameDTO {
    constructor(game) {
        this.id = game.id;
        this.title = game.title;
        this.genre = game.genre;
        this.releaseDate = game.release_date;
        this.publisher = game.publisher;
    }
}

module.exports = GameDTO;