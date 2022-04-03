let btnPlay;
let btnOptions;
let audioHome;
let audioClick;

class HomeGame extends Phaser.Scene {
  constructor() {
    super("HomeGame");
  }

  preload() {
    this.load.image("background", "./assets/backgroundHome.png");
    this.load.image("placa", "./assets/ForestRunLogo.png");
    this.load.image("btnPlay", "./assets/play_button.png");
    this.load.image("btnOptions", "./assets/options_button.png");
    this.load.image("instrucoes", "./assets/instrucoes.png");
    this.load.audio("audioHome", "./assets/floresta.mp3");
    this.load.audio("click", "./assets/click.wav");
  }

  create() {
    //Background image
    this.add.image(0, 0, "background").setOrigin(0, 0);

    // Placa de madeira
    this.add.image(400, 200, "placa");

    //AUDIOS
    audioHome = this.sound.add("audioHome");
    audioClick = this.sound.add("click");

    audioHome.play();

    //Botão de play
    btnPlay = this.add.image(400, 400, "btnPlay");
    // Instanciando a interação com o botão play
    btnPlay.setInteractive({cursor: "pointer"});
    // Ao clicar o botão play irá levar ao jogo
    btnPlay.on("pointerdown", () => {
      this.scene.start("PlayGame");
      audioClick.play();
      audioHome.pause();
    });

    // btnPlay.on("pointerdown", () => audioClick.play());
    // btnPlay.on("pointerdown", () => audioHome.pause());

    btnOptions = this.add.image(400, 500, "btnOptions");

    btnOptions.setInteractive({ cursor: "pointer" });
    btnOptions.on("pointerdown", () => {
      this.scene.start("Options");
      audioClick.play().repeat();
      audioHome.pause();
    });

    // btnOptions.on("pointerdown", () => audioClick.play())
    // btnOptions.on("pointerdown", () => audioHome.pause())
  }
}
