//LIBRARIES
//===================================================================================

#include <Arduino.h>
#include <Hash.h>
#include <WiFiManager.h>
#include <SocketIoClient.h>
#include <ESP8266HTTPClient.h>
#include <Ticker.h>

// #include <Time.h>
// #include <TimeLib.h>
// #include <Wire.h>
// #include <DNSServer.h>
// #include <ESP8266WebServer.h>
// #include <ESP8266mDNS.h>
// #include <WiFiUdp.h>
// #include <ESP8266WiFi.h>
// #include <ArduinoJson.h>

//===================================================================================
//DEFINES AND FOWARDS DECLARATIONS
//===================================================================================

#define eventoEmit "estado"
#define postLog "/post/log/tomada/"
// #define eventoOn "debug"
#define timeToPost 5
void flagPost();
String serial = "sensorCorrente";

//===================================================================================
//VARIABLES
//===================================================================================

// Constantes necessárias requisitadas pela biblioteca socket
extern String RID;
extern String Rname;
extern String Rcontent;

char host[] = "192.168.1.51"; //Host de envio
int port = 3001; //porta para envio
SocketIoClient socket;
HTTPClient http;
String ipStr;
String JSON;
Ticker sending;

int pos = 0; //Posição
int pinSensor = A0; //Porta onde os sinais estão sendo enviados
int sensorValue_aux = 0; //Valor auxiliar do sensor
double valueSensor = 0.0; //Valor do sensor
float valueCurrent = 0.0; //Valor da corrente
float voltsperBit = 0.00329; // 3.3/1023 proporção de uma unidade do adc pelo aumento de tensão do sinal
float sensibility = 0.185; //mv/A proporção do sensor saída/entrada
int power = 220; //Tensão que o circuito é submetido
int nData; //Número de medições feitas
double start, theEnd; //Medições de tempo

char dateBuffer[30];
int ano, mes, dia, hora, minuto, seg; //variáveis
bool stopGettingData = false; //flag para se parar de pegar dados
String dataAtual; //String com a data atual

// void event(const char * payload, size_t length) {
//   Serial.print("---- Chegou -- "); Serial.println(payload);
// }

//===================================================================================
//SETUP
//=================================================================================

void setup() {
  Serial.begin(115200); //inicia o serial
  pinMode(pinSensor, INPUT_PULLUP); //seta a porta de leitura
  sending.attach(timeToPost, flagPost); //interrupção
  delay(10);

  WiFiManager wifis;
  wifis.autoConnect();
  IPAddress ip = WiFi.localIP();
  ipStr = String(ip[0]) + String(".") + String(ip[1]) + String(".") + String(ip[2]) + String(".") + String(ip[3]);

  // socket.on(eventoOn, event);
  socket.begin(host, port);
  Serial.println("connected");
}

//===================================================================================
//LOOP
//===================================================================================

void loop() {
  socket.loop();
  nData = 0;
  // while(nData < 1000){
  start = millis();
  while(!stopGettingData){
    sensorValue_aux = analogRead(A0);
    // Serial.println(sensorValue_aux);
    sensorValue_aux = map(sensorValue_aux, 1, 722, 1, 512);
    sensorValue_aux -= 511; //METADE
    valueSensor += sensorValue_aux * sensorValue_aux;
    nData++;
    delay(10);
  }
  theEnd = millis();
  // Serial.print("Valores quadráticos = "); Serial.println(valueSensor);
  double potencia = rms(valueSensor, (theEnd - start));
  // Serial.print("Valor rms = "); Serial.println(potencia);
  // Serial.print("nData = "); Serial.println(nData);
  // delay(3000);
  postar(potencia);
}
