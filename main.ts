namespace SpriteKind {
    export const boss = SpriteKind.create()
    export const atk = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 . . . . . . . 
        . . . . . . 4 2 4 . . . . . . . 
        . . . . . . 4 2 4 . . . . . . . 
        . . . . . 4 4 2 4 4 . . . . . . 
        . . . . . 4 2 2 2 4 . . . . . . 
        . . . . . 4 2 2 2 4 . . . . . . 
        . . . . . 4 2 2 2 4 . . . . . . 
        . . . . . 4 2 2 2 4 . . . . . . 
        . . . . . 4 4 4 4 4 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, jugador, 0, -200)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.atk, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
})
info.onScore(10, function () {
    evento += 1
    jefe = sprites.create(img`
        . . . . . f c c c c f . . . . . 
        . . c c f b b 3 3 b b f c c . . 
        . c b 3 3 b b c c b b 3 3 b c . 
        . f 3 c c c b c c b c c c 3 f . 
        f c b b c c b c c b c c b b c f 
        c 3 c c b c c c c c c b c c 3 c 
        c 3 c c c c c c c c c c c c 3 c 
        . f b b c c c c c c c c b b f . 
        . . f b b 2 2 2 2 2 2 b b f . . 
        . . c c c 2 2 2 2 2 2 c c c . . 
        . c 3 f f 2 2 2 2 2 2 f f 3 c . 
        c 3 f f f 2 2 2 2 2 2 f f f 3 c 
        f 3 c c f 2 2 2 2 2 2 f c c 3 f 
        f b 3 c b b f b b f b b c 3 b f 
        . c b b 3 3 b 3 3 b 3 3 b b c . 
        . . f f f f f f f f f f f f . . 
        `, SpriteKind.boss)
    jefe.y = 30
    jefe.vx = 100
    jefe.setBounceOnWall(true)
    statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusbar.setColor(7, 2)
    statusbar.max = 200
    statusbar.value = 200
    statusbar.attachToSprite(jefe)
    music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.boss, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeScoreBy(10)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, jefe).value += -20
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
})
let disparo: Sprite = null
let enemigo: Sprite = null
let statusbar: StatusBarSprite = null
let jefe: Sprite = null
let projectile: Sprite = null
let jugador: Sprite = null
jugador = sprites.create(img`
    . . . f f f f f f f f f f . . . 
    . . f f 3 3 3 3 3 3 3 3 f f . . 
    . . f 3 3 3 3 3 3 3 3 3 3 f f . 
    . f 3 3 3 9 9 9 9 9 9 3 3 3 f f 
    f 3 3 3 3 9 9 9 9 9 9 3 3 3 3 f 
    f 3 3 3 3 9 9 9 9 9 9 3 3 3 3 f 
    f 3 3 f 3 3 3 3 3 3 3 3 f 3 3 f 
    f f f f 3 3 3 3 3 3 3 3 f f f f 
    . . . f 3 3 3 3 3 3 3 3 f . . . 
    . . . f 3 3 3 3 3 3 3 3 f . . . 
    . . f f 3 3 3 3 3 3 3 3 f f . . 
    . f f 3 f f f f f f f f 3 f f . 
    . f 3 f f 5 5 5 5 5 5 f f 3 f . 
    . f f f 5 4 4 4 4 4 4 5 f f f . 
    . 4 5 5 4 4 . . . . 4 4 5 5 4 . 
    . . 4 4 4 . . . . . . 4 4 4 . . 
    `, SpriteKind.Player)
controller.moveSprite(jugador, 150, 0)
jugador.y = 100
jugador.setStayInScreen(true)
effects.starField.startScreenEffect(500)
info.setScore(0)
info.setLife(10)
music.play(music.stringPlayable("C B E G G F B E ", 300), music.PlaybackMode.LoopingInBackground)
let evento = 0
game.onUpdateInterval(500, function () {
    if (evento == 0) {
        enemigo = sprites.create(img`
            . . . . . 2 2 2 2 2 2 . . . . . 
            . . . 2 2 4 4 4 4 4 4 2 2 . . . 
            . . 2 2 2 2 2 4 4 4 2 2 2 . . . 
            . . . 2 2 4 d 5 5 d d 4 4 . . . 
            . . 2 4 d d 5 5 5 5 d d 5 4 . . 
            . 2 d 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . 2 5 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . 4 5 5 1 1 5 1 1 5 5 d d d 4 . 
            . 4 d d 1 1 5 5 5 1 1 5 5 d 4 . 
            . 4 5 5 5 1 1 1 5 1 1 5 5 4 4 . 
            . . 4 5 5 1 1 1 d d 5 5 5 4 . . 
            . . 4 d 5 d 5 5 5 d d d 4 4 . . 
            . . . 4 4 4 5 5 5 d 4 4 4 4 . . 
            . . . . . 4 4 4 4 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        enemigo.x = randint(0, scene.screenWidth())
        enemigo.y = 0
        enemigo.vy = 75
    }
})
game.onUpdateInterval(300, function () {
    if (evento == 1) {
        disparo = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 5 4 . . . . . . . 
            . . . . . . 4 5 4 . . . . . . . 
            . . . . . . 4 5 4 . . . . . . . 
            . . . . . . 4 5 4 . . . . . . . 
            . . . . . . 4 5 4 . . . . . . . 
            . . . . 4 4 4 5 4 4 4 . . . . . 
            . . . . 4 5 5 5 5 5 4 . . . . . 
            . . . . 4 5 5 5 5 5 4 . . . . . 
            . . . . 4 5 5 5 5 5 4 . . . . . 
            . . . . 4 5 5 5 5 5 4 . . . . . 
            . . . . 4 5 5 5 5 5 4 . . . . . 
            . . . . 4 5 5 5 5 5 4 . . . . . 
            . . . . 4 4 4 4 4 4 4 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.atk)
        disparo.setPosition(jefe.x, jefe.y)
        disparo.vy = 150
        disparo.lifespan = 3000
    }
})
