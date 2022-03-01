


var game;

// quando ler a janela da pagina html executa uma função
window.onload = function() {
    let gameConfig = {
        scale: {
            width: 800,
            height: 600,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: [PlayGame]
    }

    game = new Phaser.Game(gameConfig)
    window.focus()
}