#include <Arduino.h>

// void flagPost(){
//   stopGettingData = true;
// }

// void postar(double pot){
void postar(){
  String dateTime = updateHoraAtual();
  delay(10);
  // JSON = "[{\"serial\": \"" + serial + "\", \"data_hora\": \"" + dateBuffer + "\", \"pulso\": " + pot + "}]";
  JSON = "[{\"serial\": \"" + serial + "\", \"data_hora\": \"" + dateTime + "\", \"pulso\":13}]";
  const char* resposta = JSON.c_str();
  socket.emit(eventoEmit, resposta);
  Serial.println("\n Postou agr");
  // stopGettingData = false;
}
