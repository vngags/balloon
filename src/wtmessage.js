export default function wtMessage(message, x, y, color, WTGM) {
  this.message = message;
  this.color = color;
  this.x = x;
  this.y = y;
  this.remove = 0;
  this.insertTime = new Date().getTime();


  this.draw = function (context) {
    WTGM.Draw.text(this.message, this.x, this.y, 24, this.color);
  };

  this.update = function () {
    const time = new Date().getTime();
    if (time - this.insertTime > 700) {
      this.remove = 1;
    }
  };

  this.isInside = function (x, y) {
    return false;
  };
}
