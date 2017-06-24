#include <Arduino.h>

String updateHoraAtual() {
  http.begin("http://192.168.1.51:3001/api/log/data-hora");
  int httpCode = http.GET(); //Retorna o código http, caso não conecte irá retornar -1
  dataAtual = http.getString();
  http.end();

  ano = dataAtual.substring(1, 5).toInt();
  mes = dataAtual.substring(6, 8).toInt();
  dia = dataAtual.substring(9, 11).toInt();
  hora = dataAtual.substring(12, 14).toInt();
  minuto = dataAtual.substring(15, 17).toInt();
  seg = dataAtual.substring(18, 20).toInt();
  sprintf(dateBuffer, "%04u-%02u-%02u %02u:%02u:%02u",  ano, mes, dia, hora, minuto, seg);
  return (String(dateBuffer));
}
