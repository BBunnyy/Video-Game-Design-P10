// Code for drawing a 3d table:
//Cuboids are assumed to have a L,W,H > 0

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  //l,w,h must be > 0
  //colors
  var checker1 = [73,54,37]
  var checker2 = [223,194,157]
  
  //checkerboard top pattern
  tableTop0 = createCuboid(checker1, -120, -60, -60, 59, 4, 59);
  tableTop1 = createCuboid(checker2, -120, -60, 0, 59, 4, 59);
  tableTop2 = createCuboid(checker2, -60, -60, -60, 59, 4, 59);
  tableTop3 = createCuboid(checker1, -60, -60, 0, 59, 4, 59);
  tableTop4 = createCuboid(checker1, 0, -60, -60, 59, 4, 59);
  tableTop5 = createCuboid(checker2, 0, -60, 0, 59, 4, 59);
  tableTop6 = createCuboid(checker2, 60, -60, -60, 59, 4, 59);
  tableTop7 = createCuboid(checker1, 60, -60, 0, 59, 4, 59);
  
  //Table Rim (long sides)
  tableTop8 = createCuboid(checker1, -125, -60, -65, 249, 10, 4);
  tableTop9 = createCuboid(checker1, -125, -60, 60, 249, 10, 4); 
  //(short sides)
  tableTop10 = createCuboid(checker1, -125, -60, -60, 4, 10, 119);
  tableTop11 = createCuboid(checker1, 120, -60, -60, 4, 10, 119);
  
  //table underside
  tableTop12 = createCuboid(checker2, -120, -55, -60, 239, 4, 119);
  
  //legs (front left)
  legFR = createCuboid(checker2, -120, -50, -60, 19, 79, 19);
  legFRFoot = createCuboid(checker1, -120, 30, -60, 19, 10, 19);
  //legs (back left)
  legBR = createCuboid(checker2, -120, -50, 40, 19, 79, 19);
  legBRFoot = createCuboid(checker1, -120, 30, 40, 19, 10, 19);
  //legs (front left)
  legFL = createCuboid(checker2, 100, -50, -60, 19, 79, 19);
  legFLFoot = createCuboid(checker1, 100, 30, -60, 19, 10, 19);
  //legs (back left)
  legBL = createCuboid(checker2, 100, -50, 40, 19, 79, 19);
  legBLFoot = createCuboid(checker1, 100, 30, 40, 19, 10, 19);

  //set the shapes
  shapes = [ tableTop11, tableTop0, tableTop1, tableTop2, tableTop3, tableTop4, tableTop5, tableTop6, tableTop7, tableTop8, tableTop9, tableTop10, tableTop12, legFR, legBR, legFL, legBL, legFRFoot, legBRFoot, legFLFoot, legBLFoot];
}

//draw the table
var draw = function () {
  background(255);
  
  // prepare for object details
  var nodes, edges, centers, normals;

  push();
  //center on canvas
  translate(200, 200);

  //eliminate faces that are not relevant (not visible)
  var faceList = [];
  var normList = [];
  var centList = [];
  var colorList = [];
  for (var s1 = 0; s1 < shapes.length; s1++) {
    //extract details
    faces = shapes[s1].faces;
    norms = shapes[s1].normals;
    cents = shapes[s1].centers;
    col = shapes[s1].color

    for (var f1 = 0; f1 < faces.length; f1++) {
      if (norms[f1].z < 0) {
        //if a face is visible, store it and it's details
        faceList.push(faces[f1]);
        normList.push(norms[f1]);
        centList.push(cents[f1]);
        colorList.push(col)
      }
    }
  }

  //sort faces to furthest away to closest
  for (var i = 0; i < faceList.length - 1; i++) {
    for (var j = 0; j < faceList.length - i - 1; j++) {
      //find overlapping points
      var overlaps = [];
      overlaps = pointsIn(faceList[j], faceList[j + 1]);
      //if surfaces don't overlap, swap and continue to check for overlap
      //or if there is an overlap, and the current face is infront, swap and continue to check
      if (overlaps.length == 0 || (overlaps.length > 0 &&
          frontFace(
            centList[j],
            normList[j],
            centList[j + 1],
            normList[j + 1],
            overlaps))) {
        //swap face and details
        var tempFace = faceList[j];
        faceList[j] = faceList[j + 1];
        faceList[j + 1] = tempFace;
        var tempNorm = normList[j];
        normList[j] = normList[j + 1];
        normList[j + 1] = tempNorm;
        var tempCent = centList[j];
        centList[j] = centList[j + 1];
        centList[j + 1] = tempCent;
        var tempColor = colorList[j];
        colorList[j] = colorList[j + 1];
        colorList[j + 1] = tempColor;
      }
    }
  }

  //draw faces of the table
  for (var f3 = 0; f3 < faceList.length; f3++) {
    var face = faceList[f3];
    
    //face corners
    var n0 = face[0];
    var n1 = face[1];
    var n2 = face[2];
    var n3 = face[3];

    //color the table, brightest when facing directly at viewer
    fill(
      colorList[f3][0] / 3 + 2 * (colorList[f3][0] / 3) * -normList[f3].z,
      colorList[f3][1] / 3 + 2 * (colorList[f3][1] / 3) * -normList[f3].z,
      colorList[f3][2] / 3 + 2 * (colorList[f3][2] / 3) * -normList[f3].z
    );
    stroke(0);
    //draw the face as a quad
    quad(n0.x, n0.y, n1.x, n1.y, n2.x, n2.y, n3.x, n3.y);
  }
};

//recalculate positions when mouse is dragged
mouseDragged = function () {
  var dx = mouseX - pmouseX;
  var dy = mouseY - pmouseY;

  for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
    var nodes = shapes[shapeNum].nodes;
    var centers = shapes[shapeNum].centers;
    var normals = shapes[shapeNum].normals;
    shapes[shapeNum].nodes = rotateY3D(dx, nodes);
    shapes[shapeNum].nodes = rotateX3D(dy, nodes);
    shapes[shapeNum].centers = rotateY3D(dx, centers);
    shapes[shapeNum].centers = rotateX3D(dy, centers);
    shapes[shapeNum].normals = rotateY3D(dx, normals);
    shapes[shapeNum].normals = rotateX3D(dy, normals);
  }
};
