let btnPlay;
let btnOptions;
let audioHome;
let audioClick;
let infoImg;
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
    this.load.image("info", "./assets/info.png");
  }

  create() {
    //Background image
    this.add.image(0, 0, "background").setOrigin(0, 0);

    //info img
    infoImg = this.add.image(750, 550, "info");
    infoImg.setInteractive({ cursor: "pointer" });
    infoImg.on("pointerdown", () => {
      this.start.scene("Info");
      this.sound.play("click");
    })
    // Placa de madeira
    this.add.image(400, 200, "placa");

    //AUDIOS
    audioHome = this.sound.add("audioHome");
    audioClick = this.sound.add("click");

    audioHome.play();

    //Botão de play
    btnPlay = this.add.image(400, 400, "btnPlay");
    // Instanciando a interação com o botão play
    btnPlay.setInteractive({ cursor: "pointer" });
    // Ao clicar o botão play irá levar ao jogo
    btnPlay.on("pointerdown", () => {
      this.cameras.main.fadeOut(500,0,0,0)
      audioClick.play();
      audioHome.pause();
    });

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start("PlayGame");
    })

    btnOptions = this.add.image(400, 500, "btnOptions");

    btnOptions.setInteractive({ cursor: "pointer" });
    btnOptions.on("pointerdown", () => {
      this.scene.start("Options");
      audioClick.play();
      audioHome.pause();
    });
  }
}
