#include <Arduino.h>

void flagPost(){
  stopGettingData = true;
}

void postar(double potencia){
  JSON = "[{\"serial\": \"" + serial + "\", \"data_hora\": \"" + updateHoraAtual() + "\", \"pulso\": " + potencia + "}]";
  // JSON = "[{\"serial\": \"" + serial + "\", \"data_hora\": \"" + updateHoraAtual() + "\", \"pulso\":13}]";

  // socket.emit(eventoEmit, JSON.c_str());
  socket.emit(postLog, JSON.c_str());
  JSON = "";
  Serial.println("\n Postou agr");
  stopGettingData = false;
}
