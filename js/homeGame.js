let btnPlay;
let btnIntruction;

class HomeGame extends Phaser.Scene{

    constructor(){
        super("HomeGame", "PlayGame")
    }

    preload(){
        this.load.image('background', './assets/backgroundHome.png')
        this.load.image('placa','./assets/ForestRunLogo.png')
        this.load.image('btnPlay', './assets/GreenPlayButton.png')
        this.load.image('btnIntruction','./assets/intrucoes.png')
    }

    create(){
        //Background image
        this.add.image(0, 0, 'background').setOrigin(0, 0)

        // Placa de madeira
        this.add.image(400, 200, 'placa')
        
        //Botão de play
        btnPlay = this.add.image(400, 400, 'btnPlay')
        // Instanciando a interação com o botão play
        btnPlay.setInteractive()
        // Ao clicar o botão play irá levar ao jogo
        btnPlay.on("pointerdown", () => this.scene.start("PlayGame"))
        
        
    }

    
}