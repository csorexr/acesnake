controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    turnHead(0)
})
function moveForward () {
    if (direction == 0) {
        SHead.y += -5
    } else if (direction == 1) {
        SHead.x += -5
    } else if (direction == 2) {
        SHead.y += 5
    } else if (direction == 3) {
        SHead.x += 5
    } else {
    	
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    turnHead(1)
})
function checkOutOfScreen () {
    if (SHead.x < 0 || SHead.x > 160 || (SHead.y < 0 || SHead.y > 120)) {
        game.over(false)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    turnHead(3)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    turnHead(2)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    replaceFood()
})
function replaceFood () {
    Cherry.setPosition(randint(0, 31) * 5 + 2, randint(0, 23) * 5 + 2)
}
function turnHead (dir: number) {
    if (Math.abs(dir - direction) != 2) {
        direction = dir
    }
    if (direction == 0) {
        SHead.setImage(img`
            . . 5 . . 
            . 5 5 5 . 
            5 5 5 5 5 
            5 f 5 f 5 
            5 5 5 5 5 
            `)
    } else if (direction == 1) {
        SHead.setImage(img`
            . . 5 5 5 
            . 5 5 f 5 
            5 5 5 5 5 
            . 5 5 f 5 
            . . 5 5 5 
            `)
    } else if (direction == 2) {
        SHead.setImage(img`
            5 5 5 5 5 
            5 f 5 f 5 
            5 5 5 5 5 
            . 5 5 5 . 
            . . 5 . . 
            `)
    } else if (direction == 3) {
        SHead.setImage(img`
            5 5 5 . . 
            5 f 5 5 . 
            5 5 5 5 5 
            5 f 5 5 . 
            5 5 5 . . 
            `)
    } else {
    	
    }
}
let direction = 0
let Cherry: Sprite = null
let SHead: Sprite = null
scene.setBackgroundColor(15)
SHead = sprites.create(img`
    5 5 5 . . 
    5 f 5 5 . 
    5 5 5 5 5 
    5 f 5 5 . 
    5 5 5 . . 
    `, SpriteKind.Player)
SHead.setPosition(57, 57)
Cherry = sprites.create(img`
    . 2 2 2 . 
    2 2 2 2 2 
    2 2 2 2 2 
    2 2 4 4 2 
    . 2 2 2 . 
    `, SpriteKind.Food)
replaceFood()
direction = 3
let Speed = 200
game.onUpdateInterval(Speed, function () {
    moveForward()
    checkOutOfScreen()
})
