//this file contains the methods for rotating nodes around the origin, same as class demo code, modified to work with vectors

// Rotate shape around the z-axis (modified for vectors)
var rotateZ3D = function (theta, nodes1) {
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);

  var nodes = nodes1;
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var x = node.x;
    var y = node.y;
    nodes[n].x = x * cosTheta - y * sinTheta;
    nodes[n].y = y * cosTheta + x * sinTheta;
  }
  return nodes;
};

// Rotate shape around the y-axis (modified for vectors)
var rotateY3D = function (theta, nodes1) {
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);

  var nodes = nodes1;
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var x = node.x;
    var z = node.z;
    nodes[n].x = x * cosTheta - z * sinTheta;
    nodes[n].z = z * cosTheta + x * sinTheta;
  }
  return nodes;
};

// Rotate shape around the x-axis (modified for vectors)
var rotateX3D = function (theta, nodes1) {
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);

  var nodes = nodes1;
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var y = node.y;
    var z = node.z;
    nodes[n].y = y * cosTheta - z * sinTheta;
    nodes[n].z = z * cosTheta + y * sinTheta;
  }
  return nodes;
};