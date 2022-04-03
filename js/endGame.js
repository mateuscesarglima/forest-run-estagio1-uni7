var endGameSound;


class EndGame extends Phaser.Scene {
  constructor() {
    super("EndGame");
  }

  preload() {
    this.load.image("backgroundImg", "./assets/endGame.png");
    this.load.audio("endGameAudio", "./assets/endGameSound.wav")
  }

  create() {
    this.add.image(0, 0, "backgroundImg").setOrigin(0, 0);
    endGameSound = this.sound.add('endGameAudio')
    endGameSound.play()
  }
}
