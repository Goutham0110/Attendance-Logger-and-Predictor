var xArray = [1, 2, 3, 4];
var yArray = [100, 120, 90, 98];

// Calculate Sums
var xSum = 0,
  ySum = 0,
  xxSum = 0,
  xySum = 0;
var count = xArray.length;
for (var i = 0, len = count; i < count; i++) {
  xSum += xArray[i];
  ySum += yArray[i];
  xxSum += xArray[i] * xArray[i];
  xySum += xArray[i] * yArray[i];
}

// Calculate slope and intercept
var slope = (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum);
var intercept = ySum / count - (slope * xSum) / count;

let today = xArray.length + 1;
let predicedVal = today * slope + intercept;

console.log(predicedVal);
