#include <vector>
#include <cmath>

using namespace std;

int main(){
    return 0;
}

double mean(vector<double> v){
    double sum = 0;
    for(int i = 0; i < v.size(); i++){
        sum += v[i];
    }
    return sum / v.size();
}

double variance(vector<double> v){
    double m = mean(v);
    double sum = 0;
    for(int i = 0; i < v.size(); i++){
        sum += (v[i] - m) * (v[i] - m);
    }
    return sum / v.size();
}

double pearson_r(vector<double> A, vector<double> B){
    double mA = mean(A);
    double mB = mean(B);
    double num = 0.0;
    double dA = 0.0;
    double dB = 0.0;
    int n = (int)A.size();
    for (int i = 0; i < n; i++) {
        num += (A[i] - mA) * (B[i] - mB);
        dA  += (A[i] - mA) * (A[i] - mA);
        dB  += (B[i] - mB) * (B[i] - mB);
    }
    return num / sqrt(dA * dB);
}

vector<char> dec_to_septapus(int n){
    vector<char> result;
    if (n == 0) { result.push_back('0'); return result; }
    while (n > 0) {
        result.insert(result.begin(), '0' + (n % 7));
        n /= 7;
    }
    return result;
}

vector<char> dec_to_octopus(int n){
    vector<char> result;
    if (n == 0) { result.push_back('0'); return result; }
    while (n > 0) {
        result.insert(result.begin(), '0' + (n % 8));
        n /= 8;
    }
    return result;
}

vector<char> dec_to_hexakaidecapus(int n){
    vector<char> digits = {'0','1','2','3','4','5','6','7',
                           '8','9','A','B','C','D','E','F'};
    vector<char> result;
    if (n == 0) { result.push_back('0'); return result; }
    while (n > 0) {
        result.insert(result.begin(), digits[n % 16]);
        n /= 16;
    }
    return result;
}



int septapus_to_dec(vector<char> s){
    int result = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        result = result * 7 + (s[i] - '0');
    }
    return result;
}

int octopus_to_dec(vector<char> s){
    int result = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        result = result * 8 + (s[i] - '0');
    }
    return result;
}

int hexakaidecapus_to_dec(vector<char> s){
    int result = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        char c = s[i];
        int val = (c >= '0' && c <= '9') ? c - '0' : c - 'A' + 10;
        result = result * 16 + val;
    }
    return result;
}



vector<char> septapus_to_octopus(vector<char> s){
    return dec_to_octopus(septapus_to_dec(s));
}

vector<char> septapus_to_hexakaidecapus(vector<char> s){
    return dec_to_hexakaidecapus(septapus_to_dec(s));
}

vector<char> octopus_to_septapus(vector<char> s){
    return dec_to_septapus(octopus_to_dec(s));
}

vector<char> octopus_to_hexakaidecapus(vector<char> s){
    return dec_to_hexakaidecapus(octopus_to_dec(s));
}

vector<char> hexakaidecapus_to_septapus(vector<char> s){
    return dec_to_septapus(hexakaidecapus_to_dec(s));
}

vector<char> hexakaidecapus_to_octopus(vector<char> s){
    return dec_to_octopus(hexakaidecapus_to_dec(s));
}


