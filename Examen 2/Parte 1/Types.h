#pragma once
 
// Punto en espacio 3D
struct Coord_3D {
    double x;
    double y;
    double z;
};
 
// Punto etiquetado con su cluster
struct Labeled {
    Coord_3D coord;
    char label;
};
 
