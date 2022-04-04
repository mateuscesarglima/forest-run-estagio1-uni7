var endGameSound;
let playAgainText;
let replayText;
let menu;

class EndGame extends Phaser.Scene {
  constructor() {
    super("EndGame");
  }

  preload() {
    this.load.image("backgroundImg", "./assets/endGame.png");
    this.load.audio("endGameAudio", "./assets/endGameSound.wav");
    this.load.audio("click", "./assets/click.wav");
  }

  create() {
    this.add.image(0, 0, "backgroundImg").setOrigin(0, 0);

    this.sound.add("click");
    endGameSound = this.sound.add("endGameAudio");
    endGameSound.play();

    playAgainText = this.add.text(250, 400, "Play Again", {
      fontFamily: "Georgia",
      fontSize: "30px",
      fill: "White",
      resolution: "10",
    });

    replayText = this.add.text(450, 400, "Menu", {
      fontFamily: "Georgia",
      fontSize: "30px",
      fill: "White",
      resolution: "10",
    });

    playAgainText.setInteractive({ cursor: "pointer" });
    playAgainText.on("pointerdown", () => {
      this.sound.play("click");
      this.scene.start("PlayGame");
      endGameSound.pause();
    });

    replayText.setInteractive({ cursor: "pointer" });
    replayText.on("pointerdown", () => {
      this.sound.play("click");
      this.scene.start("HomeGame");
      endGameSound.pause();
    });

    // this.add.text(200, 100, "GAME OVER", { fontSize: '30px', fill: 'white', backgroundColor: "black" })
  }
}
