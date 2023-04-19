let game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
    preload: preload, create: create, update: update
});
function preload() {
    game.stage.backgroundColor = '#eee';
    game.load.image('ball', 'img/ball.jpg');
    game.text
}
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ball = game.add.sprite(20, 20, );
}
function update() { }