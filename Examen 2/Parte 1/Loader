#pragma once
#include "types.h"
#include <vector>
#include <string>
#include <fstream>
#include <sstream>
#include <stdexcept>

// Carga los puntos del archivo CSV en un vector<Coord_3D>
// Formato esperado: x,y,z  (una línea por punto)
void cargar_datos(const std::string& archivo, std::vector<Coord_3D>& datos) {
    std::ifstream f(archivo);
    if (!f.is_open())
        throw std::runtime_error("No se pudo abrir el archivo: " + archivo);

    std::string linea;
    while (std::getline(f, linea)) {
        if (linea.empty()) continue;
        std::istringstream ss(linea);
        Coord_3D p;
        char coma;
        if (ss >> p.x >> coma >> p.y >> coma >> p.z)
            datos.push_back(p);
    }
}
