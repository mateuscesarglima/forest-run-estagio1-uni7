var backBtn;
var click;

class Options extends Phaser.Scene {
  constructor() {
    super("Options");
  }

  preload() {
    this.load.image("instrucoes", "./assets/instrucoes.png");
    this.load.image("backBtn", "./assets/arrow.png");
    this.load.audio("click", "./assets/click.wav");
  }

  create() {

    //Background Image
    this.add.image(0, 0, "instrucoes").setOrigin(0, 0);

    //AUDIO
    audioClick = this.sound.add("click");

    //BACK
    backBtn = this.add.image(50, 50, "backBtn");
    backBtn.setInteractive({ cursor: "pointer" });
    backBtn.on("pointerdown", () => {
      this.scene.start("HomeGame");
      audioClick.play();
    });
  }
}
