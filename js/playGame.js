var player;
var platforms;
var cursors;
var stars;
var scoreText;
var lifeText;
var bombs;
var rocks;
var audioJump;
var infoText;

class PlayGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
    this.vida;
    this.score;
  }

  preload() {
    this.load.image("sky", "./assets/sky.png");
    this.load.image("star", "./assets/star.png");
    this.load.image("ground", "./assets/ground.png");
    this.load.image("florest", "./assets/floresta.png");
    this.load.spritesheet("personagem", "./assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.image("wood", "./assets/chao.png");
    this.load.image("bomb", "./assets/bomb.png");
    this.load.image("rock", "./assets/rocha.png");
    this.load.audio("jump", "./assets/jump.wav");
  }

  create() {
    //FADEIN
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    //Backgroud image
    this.add.image(0, 0, "florest").setOrigin(0, 0);

    //SAINDO DA CENA
    this.physics.world.on("worldbounds", this.saiuDaCena);

    // Plataformas fisicas
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 575, "ground");
    platforms.create(700, 400, "wood");
    platforms.create(100, 300, "wood");
    platforms.create(750, 200, "wood");
    player = this.physics.add.sprite(100, 400, "personagem", 4);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // animações do personagem ao se movimentar
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("personagem", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "personagem", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("personagem", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Cursores para movimento
    cursors = this.input.keyboard.createCursorKeys();

    // Estrelas
    stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //BOMBAS
    bombs = this.physics.add.group();

    //PEDRAS
    rocks = this.physics.add.group({
      key: "rock",
      repeat: 4,
      collideWorldBounds: true,
      setXY: { x: 50, y: -100, stepX: 130 },
    });

    rocks.children.iterate(this.configuracaoFilho);

    // TEXTOS
    this.score = 0;
    scoreText = this.add.text(16, 16, "Score: " + this.score, {
      fontSize: "32px",
      fill: "#FFF",
      backgroundColor: "black",
    });

    this.vida = 2;
    lifeText = this.add.text(16, 50, "Vida: " + this.vida, {
      fontSize: "32px",
      fill: "#FFF",
      backgroundColor: "black",
    });

    // COLISÕES
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.overlap(player, rocks, hitRock, null, this);

    //AUDIOS
    audioJump = this.sound.add("jump");
  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
      audioJump.play();
    }

    if (cursors.space.isDown) {
      if (life == 0) {
        life = 5;
        this.scene.restart();
      }
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 10;
    scoreText.setText("Score: " + this.score);

    if (stars.countActive(true) === 0) {
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  configuracaoFilho(elemento) {
    elemento.body.onWorldBounds = true;
    elemento.x = Phaser.Math.Between(0, 800);
  }

  saiuDaCena(elemento) {
    elemento.x = Phaser.Math.Between(0, 800);
    elemento.y = Phaser.Math.Between(0, 30);
  }
}

function hitRock(player, rock) {
  if (this.vida > 0) {
    rock.disableBody(true, true);
    this.vida -= 1;
    lifeText.setText("Vida: " + this.vida);
  } else {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    this.cameras.main.fadeOut(500, 0, 0, 0);

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start("EndGame");
      }
    );
  }
}

function hitBomb(player, bomb) {
  if (this.vida > 0) {
    this.vida -= 1;
    lifeText.setText("Vida: " + life);
  } else {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    this.cameras.main.fadeOut(500, 0, 0, 0);

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start("EndGame");
      }
    );
  }
}
