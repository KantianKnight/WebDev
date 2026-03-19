// This function defines the Bomb module.
// - `ctx` - A canvas context for drawing
// - `x` - The x position of the bomb
// - `y` - The y position of the bomb
const Bomb = function(ctx, x, y) {
    // This is the sprite sequences of the bomb
    const sequence = { x: 64, y: 112, width: 16, height: 16, count: 9, timing: 200, loop: true };

    // This is the sprite object of the bomb created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the bomb sprite here.
    sprite.setSequence(sequence)
          .setScale(2)
          .setShadowScale({ x: 0.75, y: 0.2 })
          .useSheet("object_sprites.png");

    // The methods are returned as an object here.
    return {
        draw: sprite.draw,
        update: sprite.update
    };
};
