//This file contains functions that find overlap between faces
//key overlap points include places where edges cross, and corners that lie within the other face

//function to find the total points of interest (intersections and lies within)
function pointsIn(quad1, quad2) {
  var intersect = [];

  //check if each line in q1 overlaps with q2
  for (var l1 = 0; l1 < quad1.length; l1++) {
    for (var l2 = 0; l2 < quad2.length; l2++) {
      //for each line combination in the quads, check for overlap points
      intersect = intersect.concat(
        overlapPoints(
          quad1[l1],
          quad1[(l1 + 1) % 4],
          quad2[l2],
          quad2[(l2 + 1) % 4]
        )
      );
    }
  }

  //check if points in quad 2 are within quad 1
  for (var i = 0; i < quad2.length; i++) {
    if (pointContained(quad1, quad2[i])) {
      intersect.push(quad2[i]);
    }
  }
  //check if points in quad 1 are within quad 2
  for (var j = 0; j < quad1.length; j++) {
    if (pointContained(quad2, quad1[j])) {
      intersect.push(quad1[j]);
    }
  }

  return intersect;
}

//This function casts a semi infinite ray to determine if a point lies within a polygon
//derived from this algorithm:
//https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
//return 0 or 1. 0 = Not inside, 1 = Inside
function pointContained(quad, point) {
  var within = false;

  //cast semi-infinite ray
  for (let i = 0; i < 4; i++) {
    if (
      quad[i].y > point.y != quad[(i + 3) % 4].y > point.y &&
      point.x <
        ((quad[(i + 3) % 4].x - quad[i].x) * (point.y - quad[i].y)) /
          (quad[(i + 3) % 4].y - quad[i].y) +
          quad[i].x
    )
      //if it passes through an edge, flip polarity
      within = !within;
  }
  return within;
}

// Find overlapping points for line segments (if they exist)
function overlapPoints(p0, p1, p2, p3) {
  intersect = [];

  var x1 = p0.x;
  var y1 = p0.y;
  var x2 = p1.x;
  var y2 = p1.y;
  var x3 = p2.x;
  var y3 = p2.y;
  var x4 = p3.x;
  var y4 = p3.y;

  //check if lines are parallel
  var line1 = p1.copy().sub(p0);
  var line2 = p3.copy().sub(p2);

  var parallel = line1.cross(line2).mag();
  //check that lines are not parallel
  if (parallel <= 0.1) {
  } else {
    var den = (x2 - x1) * (y4 - y3) - (x4 - x3) * (y2 - y1);
    var a = x2 * y1 - x1 * y2;
    var b = x4 * y3 - x3 * y4;
    var x = (a * (x4 - x3) - b * (x2 - x1)) / den;
    var y = (a * (y4 - y3) - b * (y2 - y1)) / den;

    //ensure point lies on both line segments
    if (
      ((x1 < x && x < x2) || (x2 < x && x < x1)) &&
      ((x3 < x && x < x4) || (x4 < x && x < x3)) &&
      ((y1 < y && y < y2) || (y2 < y && y < y1)) &&
      ((y3 < y && y < y4) || (y4 < y && y < y3))
    )
      intersect.push(createVector(x, y));
  }

  //return the intersection, [] if no intersection
  return intersect;
}
