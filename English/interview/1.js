/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  let directionDown = [1, 0];
  let directionRightUp = [-1, 1];
  let ary = new Array(numRows).fill(0).map(() => new Array());
  let vect = {
    x: 0,
    y: 0,
  };
  let direction = directionDown;

  for (let char of s) {
    if (ary[vect.x]) {
      ary[vect.x][vect.y] = char;
    } else if (!ary[vect.x] && direction === directionDown) {
      vect.x = vect.x - direction[0];
      vect.y = vect.y - direction[1];
      direction = directionRightUp;
      vect.x = vect.x + direction[0];
      vect.y = vect.y + direction[1];
      ary[vect.x][vect.y] = char;
    } else if (!ary[vect.x] && direction === directionRightUp) {
      vect.x = vect.x - direction[0];
      vect.y = vect.y - direction[1];
      direction = directionDown;
      vect.x = vect.x + direction[0];
      vect.y = vect.y + direction[1];
      ary[vect.x][vect.y] = char;
    }
    vect.x = vect.x + direction[0];
    vect.y = vect.y + direction[1];
    console.log(vect);
  }

  return ary.reduce((res, row) => {
    return res + row.join("");
  }, "");
};
convert("PAYPALISHIRING", 4);
