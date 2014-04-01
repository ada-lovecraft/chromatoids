### Activated Power ups: 
  * Notes:
    * Using a spacebar activated power up causes a cool down to happen. Each power-up has it's own cool-down
    * Picking up one of these power-ups replaces the current power up and clears the cooldown timer
  * Types:
    * Bomb
      * Effect:
        * Places a randomly colored bomb at the players location. It will go off when the timer has run down, or a same-colored enemy runs into it. Explodes with "enemy death explosion" force of bullets
      * Duration:
        * 3 seconds
      * Cool Down: 
        * 5 seconds
    * Shield:
      * Effect: 
        * A 5 layered shield. The first shield layer is chromatic. Will block against all blocks, once. The next four shields are mono-chromatic in the following order: Yellow, Green, Red, Blue. Each shield protects against it's color once. When hit, destroys the offending block.
      * Cool Down: 
        * 15 seconds
      * Duration:
        * Until Destroyed
    * Death Blossom
      * Effect: 
        * The player block becomes momentarily stationary and indestructible and spins rapidly while firing all colors. The final spin fires chromatic bullets.
      * Duration:
        * 3 Seconds
      * Cool Down: 
        * 30 seconds 
    * Bullet Time
      * Effect:
        * All enemies slow down to 1/10 their speed, but the player continues to move and fire normally. 
      * Duration:
        * 5 Seconds
      * Cool Down: 
        * 10 seconds
    * Mirror Shot
      * Effect:
        * Bullets fired also fire in the opposite direction as the same color.
      * Duration:
        * 10 seconds
      * Cool Down:
        * 30 seconds
    * All The Same
      * Effect:
        * All enemies cycle through colors until they all land on the same one.
      * Duration:
        * Instantaneous
      * Cool Down:
        * 30 seconds

### Weapon Types Powerups:
  * Notes:
    * These replace the current weapon type
  * Types: 
    * Single Shot
      * Effect: 
        * Default bullet type.
      * Range: 
        * Medium
      * Damage:
        * 1 point
      * Fire Rate:
        * 100
    * Automatic
      * Effect:
        * Holding the direction key will automatically fire bullets at the fire rate
      * Range:
        * Medium
      * Fire Rate:
        * 100
    * Shotgun
      * Effect:
        * Blasts 5 bullets in a spray
      * Range:
        * Short
      * Damage: 
        * 1 point each bullet
      * Fire Rate:
        * 300
    * Gauss (Laser, tracer)
      * Effect: 
        * Instantly traverses the screen ripping through any enemy and continues going
      * Range:
        * Long
      * Damage: 
        * 10 points
      * Fire Rate: 
        * 750

### Bullet Powerups:
  * Notes:
    * These power-ups can stack
  * Types
    * Chromatic Bullets
      * Effect:
        * Kills any enemy
      * Display:
        * White bullets
    * Jumbo Bullets
      * Effect: 
        * Bullets are much larger
      * Display:
        * 4x sized bullets

### Boss Abilities:
  * Notes:
    * Brainstorming abilities for bosses
  * Types:
    * Confusion
      * Effect:
        * Rotates the player so that the colors, while still in the same -order-, start from a different point of origin. I.E., right is yellow, down is green, left is red, up is blue.

### Enemies:
  * Notes: 
    * Black can be destroyed by any color.
    * Chromatic must be hit by each color before being destroyed
  * Colors:
    * Yellow
    * Green
    * Red
    * Blue
    * Black
    * Chromatic
      * Display:
        * Rapidly Cycles through the other colors, until hit. Then begins the color rotation of Yello, Green, Red, Blue.
      * Notes:
        * Effectively alread has 5 hp. Should not be affected by the "more health" buff.
  * Basic Enemy:
    * Description:
      * Is a block of color
    * Movement:
      * Bounces around the stage slowly increasing its velocity.
  * More health (can modify any of the enemies below)
    * Effect:
      * Enemy has more health requiring more bullets to take down
    * Display:
      * Enemy's alpha is directly co-related to health
  * Seekers
    * Effect:
      * Enemy seeks the player
    * Display: 
      * Angles toward player
  * Sliders
    * Effect:
      * Every x ms, the slider moves either horizontally or vertically towards the player in a tween over the course of y ms
    * Display:
      * Trail
  * Plasma Bars
    * Effect:
      * A bar of color wipes across the screen, correlating to the direction the player should fire to destroy it. As it wipes across the screen, it also destroys blocks of the same color it hits.
    * Display:
      * 2 flashes on the side of the screen the bar is coming from. And then a wipe that takes 3 seconds to clear the screen
      * Plasma(?)

### Bugs:
  * Can still fire when dead

### Enhancements:
  * <del>firing direction indicators</del>
