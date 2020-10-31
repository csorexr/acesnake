controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 0
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
    direction = 1
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 3
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 2
})
let direction = 0
let SHead: Sprite = null
scene.setBackgroundColor(15)
SHead = sprites.create(img`
    5 5 5 . . 
    5 f 5 5 . 
    5 5 5 5 5 
    5 f 5 5 . 
    5 5 5 . . 
    `, SpriteKind.Player)
SHead.setPosition(45, 55)
let Cherry = sprites.create(img`
    . 2 2 2 . 
    2 2 2 2 2 
    2 2 2 2 2 
    2 2 4 4 2 
    . 2 2 2 . 
    `, SpriteKind.Food)
Cherry.setPosition(135, 80)
direction = 3
let Speed = 300
game.onUpdateInterval(Speed, function () {
    moveForward()
})
