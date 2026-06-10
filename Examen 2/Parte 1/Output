#pragma once
#include "types.h"
#include "kmeans.h"
#include <vector>
#include <string>
#include <fstream>
#include <iomanip>
#include <stdexcept>

// Genera clasificados.csv : x,y,z,Label
void escribir_clasificados(const std::string& archivo,
                           const std::vector<Coord_3D>& datos,
                           const std::vector<int>& etiquetas,
                           int k) {
    std::ofstream f(archivo);
    if (!f.is_open())
        throw std::runtime_error("No se pudo crear: " + archivo);

    f << std::fixed << std::setprecision(6);
    for (size_t i = 0; i < datos.size(); i++) {
        char label = 'A' + etiquetas[i];  // 0->A, 1->B, ...
        f << datos[i].x << ","
          << datos[i].y << ","
          << datos[i].z << ","
          << label << "\n";
    }
}

// Genera summary.txt : Label: N, (x, y, z), MD
void escribir_summary(const std::string& archivo,
                      const std::vector<Coord_3D>& datos,
                      const std::vector<int>& etiquetas,
                      const std::vector<Coord_3D>& centroides,
                      int k) {
    std::ofstream f(archivo);
    if (!f.is_open())
        throw std::runtime_error("No se pudo crear: " + archivo);

    f << std::fixed << std::setprecision(6);

    for (int c = 0; c < k; c++) {
        // Recolectar puntos de este cluster
        std::vector<Coord_3D> pts;
        for (size_t i = 0; i < datos.size(); i++)
            if (etiquetas[i] == c)
                pts.push_back(datos[i]);

        double md = dispersion(pts, centroides[c]);
        char label = 'A' + c;

        f << label << ": "
          << pts.size() << ", ("
          << centroides[c].x << ", "
          << centroides[c].y << ", "
          << centroides[c].z << "), "
          << md << "\n";
    }
}
