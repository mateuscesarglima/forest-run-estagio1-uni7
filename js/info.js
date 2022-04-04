class Info extends Phaser.scene {
  constructor() {
    super("Info");
  }

  preload() {
    this.load.image("background", "./assets/infoBackground.img");
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
  }
}
