#include <Arduino.h>

void flagPost(){
  stopGettingData = true;
}

void postar(double potencia){
  String dateTime = updateHoraAtual();
  // JSON = "[{\"serial\": \"" + serial + "\", \"data_hora\": \"" + dateTime + "\", \"pulso\": " + potencia + "}]";
  JSON = "[{\"serial\": \"" + serial + "\", \"data_hora\": \"" + dateTime + "\", \"pulso\":13}]";
  const char* resposta = JSON.c_str();
  socket.emit(eventoEmit, resposta);
  Serial.println("\n Postou agr");
  stopGettingData = false;
  delay(10);
}
