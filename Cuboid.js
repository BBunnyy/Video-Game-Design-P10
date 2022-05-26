// function to create a cuboid (modified to be vector based)

var createCuboid = function (col, x, y, z, w, h, d) {
  //color of the cuboid
  var color = []
  color = col 
  
  //nodes
  var n0 = new p5.Vector(x, y, z);
  var n1 = new p5.Vector(x, y, z + d);
  var n2 = new p5.Vector(x, y + h, z);
  var n3 = new p5.Vector(x, y + h, z + d);
  var n4 = new p5.Vector(x + w, y, z);
  var n5 = new p5.Vector(x + w, y, z + d);
  var n6 = new p5.Vector(x + w, y + h, z);
  var n7 = new p5.Vector(x + w, y + h, z + d);
  var nodes = [n0, n1, n2, n3, n4, n5, n6, n7];
  
  //edges
  var edges = [
    [n0, n1],
    [n1, n3],
    [n3, n2],
    [n2, n0],
    [n4, n5],
    [n5, n7],
    [n7, n6],
    [n6, n4],
    [n0, n4],
    [n1, n5],
    [n2, n6],
    [n3, n7],
  ];
  
  //faces (in terms of nodes)
  var faces = [
    [n0, n1, n3, n2], //R  left face
    [n0, n1, n5, n4], //O  top face
    [n0, n4, n6, n2], //Y  front face
    [n7, n5, n4, n6], //G  right face
    [n7, n3, n2, n6], //B  bottom face
    [n7, n5, n1, n3], //I  back face
  ];

  //center of faces
  var c0 = new p5.Vector(x, y + h / 2, z + d / 2);
  var c1 = new p5.Vector(x + w / 2, y, z + d / 2);
  var c2 = new p5.Vector(x + w / 2, y + h / 2, z);
  var c3 = new p5.Vector(x + w, y + h / 2, z + d / 2);
  var c4 = new p5.Vector(x + w / 2, y + h, z + d / 2);
  var c5 = new p5.Vector(x + w / 2, y + h / 2, z + d);
  var centers = [
    c0, //left face
    c1, //top face
    c2, //front face
    c3, //right face
    c4, //bottom face
    c5, //back face
  ];

  //normals to each face
  var m0 = new p5.Vector(-1, 0, 0);
  var m1 = new p5.Vector(0, -1, 0);
  var m2 = new p5.Vector(0, 0, -1);
  var m3 = new p5.Vector(1, 0, 0);
  var m4 = new p5.Vector(0, 1, 0);
  var m5 = new p5.Vector(0, 0, 1);
  var normals = [
    m0, //left face
    m1, //top face
    m2, //front face
    m3, //right face
    m4, //bottom face
    m5, //back face
  ];

  //return the data created
  return {
    nodes: nodes,
    edges: edges,
    faces: faces,
    centers: centers,
    normals: normals,
    color: color
  };
};