namespace SpriteKind {
    export const Tail = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    turnHead(0)
})
function moveForward () {
    moveTail()
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Tail, function (sprite, otherSprite) {
    game.over(false)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    turnHead(1)
})
function checkOutOfScreen () {
    if (SHead.x < 0 || SHead.x > 160 || (SHead.y < 0 || SHead.y > 120)) {
        game.over(false)
    }
}
function initTail () {
    listTail = []
    tailBlock1 = sprites.create(img`
        4 4 4 4 4 
        4 5 5 5 4 
        4 5 5 5 4 
        4 5 5 5 4 
        4 4 4 4 4 
        `, SpriteKind.Tail)
    tailBlock1.setPosition(47, 57)
    listTail.unshift(tailBlock1)
    tailBlock2 = sprites.create(img`
        4 4 4 4 4 
        4 5 5 5 4 
        4 5 5 5 4 
        4 5 5 5 4 
        4 4 4 4 4 
        `, SpriteKind.Tail)
    tailBlock2.setPosition(52, 57)
    listTail.unshift(tailBlock2)
}
function growTail () {
    tpTailBlock = sprites.create(img`
        4 4 4 4 4 
        4 5 5 5 4 
        4 5 5 5 4 
        4 5 5 5 4 
        4 4 4 4 4 
        `, SpriteKind.Tail)
    tailBlock1 = listTail[listTail.length - 1]
    tpTailBlock.setPosition(tailBlock1.x, tailBlock1.y)
    listTail.push(tpTailBlock)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    turnHead(3)
})
function moveTail () {
    listTail.pop().destroy()
    tpTailBlock = sprites.create(img`
        4 4 4 4 4 
        4 5 5 5 4 
        4 5 5 5 4 
        4 5 5 5 4 
        4 4 4 4 4 
        `, SpriteKind.Tail)
    tpTailBlock.setPosition(SHead.x, SHead.y)
    listTail.unshift(tpTailBlock)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    turnHead(2)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    replaceFood()
    growTail()
    info.changeScoreBy(1)
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
let tpTailBlock: Sprite = null
let tailBlock2: Sprite = null
let tailBlock1: Sprite = null
let listTail: Sprite[] = []
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
initTail()
direction = 3
let Speed = 200
game.onUpdateInterval(Speed, function () {
    moveForward()
    checkOutOfScreen()
})
