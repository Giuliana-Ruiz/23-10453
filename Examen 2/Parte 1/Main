#include "types.h"
#include "loader.h"
#include "kmeans.h"
#include "output.h"

#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <cstdlib>

int main(int argc, char* argv[]) {

    if (argc != 3) {
        std::cerr << "Uso: cluster <k> <datos.csv>\n";
        return 1;
    }

    int k = std::atoi(argv[1]);
    if (k < 1 || k > 6) {
        std::cerr << "Error: k debe estar entre 1 y 6.\n";
        return 1;
    }
    std::string archivo = argv[2];

    // --- Cargar datos ---
    std::vector<Coord_3D> datos;
    try {
        cargar_datos(archivo, datos);
    } catch (const std::exception& e) {
        std::cerr << "Error al cargar datos: " << e.what() << "\n";
        return 1;
    }
    std::cout << "Datos cargados: " << datos.size() << " puntos.\n";

    // --- K-Means ---
    std::vector<int> etiquetas;
    std::vector<Coord_3D> centroides;
    kmeans(datos, k, etiquetas, centroides);

    // --- Mostrar WCSS para ayudar a elegir k ---
    double w = wcss(datos, etiquetas, centroides);
    std::cout << "k=" << k << "  WCSS=" << std::fixed << std::setprecision(2) << w << "\n";

    // --- Generar archivos de salida ---
    try {
        escribir_clasificados("clasificados.csv", datos, etiquetas, k);
        escribir_summary("summary.txt", datos, etiquetas, centroides, k);
    } catch (const std::exception& e) {
        std::cerr << "Error al escribir salida: " << e.what() << "\n";
        return 1;
    }

    std::cout << "Archivos generados: clasificados.csv  summary.txt\n";
    return 0;
}
