//This file contains a function that determines the order of two faces relative to eachother
//(Which is front)
//cent and norm are the centers and normals of each face, ol is the key overlap points between each face

//function to decide which face is more forward facing:
var frontFace = function (cent1, norm1, cent2, norm2, ol) {
  var a1, a2, b1, b2, c1, c2, d1, d2, x1, x2, y1, y2, z1, z2;
  //solve for plane parameters
  x1 = cent1.x;
  x2 = cent2.x;
  y1 = cent1.y;
  y2 = cent2.y;
  z1 = cent1.z;
  z2 = cent2.z;

  a1 = norm1.x;
  a2 = norm2.x;
  b1 = norm1.y;
  b2 = norm2.y;
  c1 = norm1.z;
  c2 = norm2.z;

  d1 = a1 * x1 + b1 * y1 + c1 * z1;
  d2 = a2 * x2 + b2 * y2 + c2 * z2;

  var zOut1 = 999999999;
  var zOut2 = 999999999;

  var sum1 = 0;
  var sum2 = 0;
  for (var lap = 0; lap < ol.length; lap++) {
    var x = ol[lap].x;
    var y = ol[lap].y;

    var z01 = (a1 * x + b1 * y - d1) / -c1;
    var z02 = (a2 * x + b2 * y - d2) / -c2;

    if (z01 < zOut1) zOut1 = z01;
    if (z02 < zOut2) zOut2 = z02;
  }

  //if the first plane is infront
  if (zOut1 <= zOut2) {
    return true;
  } else {
    return false;
  }
};