#pragma once
#include "types.h"
#include <vector>
#include <cmath>
#include <limits>
#include <cstdlib>
#include <ctime>
#include <numeric>

// ---------------------------------------------------------------------------
// Distancia Euclidiana entre dos puntos 3D
// ---------------------------------------------------------------------------
double distancia(const Coord_3D& a, const Coord_3D& b) {
    double dx = a.x - b.x;
    double dy = a.y - b.y;
    double dz = a.z - b.z;
    return std::sqrt(dx*dx + dy*dy + dz*dz);
}

// ---------------------------------------------------------------------------
// Condición de parada del algoritmo k-means
//
// Parámetros:
//   centroides_viejos : centroides de la iteración anterior
//   centroides_nuevos : centroides recalculados en esta iteración
//   epsilon           : tolerancia (umbral mínimo de movimiento)
//
// Retorna true (parar) cuando TODOS los centroides se movieron menos que
// epsilon.  Esto garantiza convergencia: si ningún centroide se desplazó
// de forma significativa, las asignaciones ya no van a cambiar y seguir
// iterando es inútil.  Un epsilon pequeño (1e-6) da precisión suficiente
// sin riesgo de bucle infinito, ya que k-means siempre converge en datos
// finitos.
// ---------------------------------------------------------------------------
bool convergio(const std::vector<Coord_3D>& viejos,
               const std::vector<Coord_3D>& nuevos,
               double epsilon = 1e-6) {
    for (size_t i = 0; i < viejos.size(); i++)
        if (distancia(viejos[i], nuevos[i]) > epsilon)
            return false;
    return true;
}

// ---------------------------------------------------------------------------
// Medida de dispersión de un cluster: RMSD (Root Mean Square Distance)
// respecto a su centroide.  Es la raíz cuadrada del promedio de los
// cuadrados de las distancias, análoga a la desviación estándar en 3D.
// Valores más bajos = cluster más compacto.
// ---------------------------------------------------------------------------
double dispersion(const std::vector<Coord_3D>& puntos, const Coord_3D& centroide) {
    if (puntos.empty()) return 0.0;
    double suma = 0.0;
    for (const auto& p : puntos) {
        double d = distancia(p, centroide);
        suma += d * d;
    }
    return std::sqrt(suma / puntos.size());
}

// ---------------------------------------------------------------------------
// Calcula el centroide (media aritmética) de un conjunto de puntos
// ---------------------------------------------------------------------------
Coord_3D calcular_centroide(const std::vector<Coord_3D>& puntos) {
    Coord_3D c{0, 0, 0};
    if (puntos.empty()) return c;
    for (const auto& p : puntos) {
        c.x += p.x;
        c.y += p.y;
        c.z += p.z;
    }
    size_t n = puntos.size();
    c.x /= n; c.y /= n; c.z /= n;
    return c;
}

// ---------------------------------------------------------------------------
// Algoritmo K-Means
//
// Entrada:
//   datos  : vector de puntos (no se modifica)
//   k      : número de clusters
//
// Salida:
//   etiquetas  : vector del mismo tamaño que datos; etiquetas[i] = índice
//                del cluster al que pertenece datos[i]  (0 .. k-1)
//   centroides : centroides finales de cada cluster
// ---------------------------------------------------------------------------
void kmeans(const std::vector<Coord_3D>& datos,
            int k,
            std::vector<int>& etiquetas,
            std::vector<Coord_3D>& centroides) {

    size_t n = datos.size();
    etiquetas.assign(n, 0);

    // Inicialización: elegir k puntos distintos al azar como centroides
    std::srand(42);  // semilla fija para reproducibilidad
    std::vector<size_t> indices(n);
    std::iota(indices.begin(), indices.end(), 0);
    // Fisher-Yates parcial
    for (int i = 0; i < k; i++) {
        size_t j = i + std::rand() % (n - i);
        std::swap(indices[i], indices[j]);
    }
    centroides.resize(k);
    for (int i = 0; i < k; i++)
        centroides[i] = datos[indices[i]];

    const int MAX_ITER = 1000;
    for (int iter = 0; iter < MAX_ITER; iter++) {

        // --- Paso 1: asignar cada punto al centroide más cercano ---
        for (size_t i = 0; i < n; i++) {
            double mejor = std::numeric_limits<double>::max();
            int mejor_k = 0;
            for (int c = 0; c < k; c++) {
                double d = distancia(datos[i], centroides[c]);
                if (d < mejor) { mejor = d; mejor_k = c; }
            }
            etiquetas[i] = mejor_k;
        }

        // --- Paso 2: recalcular centroides ---
        std::vector<Coord_3D> nuevos_centroides(k, {0,0,0});
        std::vector<int> conteo(k, 0);
        for (size_t i = 0; i < n; i++) {
            int c = etiquetas[i];
            nuevos_centroides[c].x += datos[i].x;
            nuevos_centroides[c].y += datos[i].y;
            nuevos_centroides[c].z += datos[i].z;
            conteo[c]++;
        }
        for (int c = 0; c < k; c++) {
            if (conteo[c] > 0) {
                nuevos_centroides[c].x /= conteo[c];
                nuevos_centroides[c].y /= conteo[c];
                nuevos_centroides[c].z /= conteo[c];
            } else {
                // Cluster vacío: reinicializar a punto aleatorio
                nuevos_centroides[c] = datos[std::rand() % n];
            }
        }

        // --- Paso 3: verificar convergencia ---
        if (convergio(centroides, nuevos_centroides))
            break;

        centroides = nuevos_centroides;
    }
}

// ---------------------------------------------------------------------------
// WCSS: Within-Cluster Sum of Squares
// Métrica global para evaluar qué tan compactos son los clusters.
// Se usa para el "método del codo": cuando añadir más clusters apenas
// reduce el WCSS, es señal de que ya tenemos suficientes.
// ---------------------------------------------------------------------------
double wcss(const std::vector<Coord_3D>& datos,
            const std::vector<int>& etiquetas,
            const std::vector<Coord_3D>& centroides) {
    double total = 0.0;
    for (size_t i = 0; i < datos.size(); i++) {
        double d = distancia(datos[i], centroides[etiquetas[i]]);
        total += d * d;
    }
    return total;
}
