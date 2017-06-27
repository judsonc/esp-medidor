#include <Arduino.h>
#include <Hash.h>
#include <WiFiManager.h>
#include <SocketIoClient.h>
#include <Ticker.h>

//===================================================================================
// DEFINES
//===================================================================================

#define EMITPOSTLOG "/post/log/" //rota de envio
#define TIMETOEMIT 1 // tempo de envio em segundos
#define HOST "192.168.1.67" // host de envio
#define PORT 3001 // porta para envio
#define SENSORLUZ A0 // porta onde os sinais estao sendo recebidos
#define NOME "Luz da sala" // nome do dispositivo

//===================================================================================
// VARIABLES
//===================================================================================

SocketIoClient socket;
WiFiManager wifi;
Ticker sending;
String dado;

//===================================================================================
// FUNCTIONS
//===================================================================================

void toEmit(void) {
  dado = "{\"nome\": \"" + String(NOME) + "\", \"valor\": " + analogRead(SENSORLUZ) + "}";
  socket.emit(EMITPOSTLOG, dado.c_str());
}

//===================================================================================
// SETUP
//=================================================================================

void setup() {
  Serial.begin(115200); // inicia o serial
  pinMode(SENSORLUZ, INPUT_PULLUP); // seta a porta de leitura
  sending.attach(TIMETOEMIT, toEmit); // interrupcao por tempo
  wifi.autoConnect();
  socket.begin(HOST, PORT);
}

//===================================================================================
// LOOP
//===================================================================================

void loop() {
  socket.loop();
}
