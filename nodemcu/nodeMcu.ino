
#include <SocketIoClient.h>

const char* ssid     = "2Hats Logic Solutions";
const char* password = "2H@tslogic";

/// Socket.IO Settings ///
char host[] = "192.168.1.9"; // Socket.IO Server Address
int port = 3000; // Socket.IO Port Address
char path[] = "/socket.io/?transport=websocket"; // Socket.IO Base Path

int LEDPin = 16;


SocketIoClient webSocket;

//bool LEDState = false;

void current_status(const char * payload, size_t length) {
  String onState = String(payload);
  Serial.print("Current Status: ");
  if (onState.equals("ON")) {
    Serial.println(onState);
    digitalWrite(LEDPin, HIGH);
  } else {
    Serial.println(payload);
    digitalWrite(LEDPin, LOW);
  }
}


void setup() {
  Serial.begin(115200);
  delay(10);

  pinMode(LEDPin, OUTPUT);

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());


  webSocket.on("status", current_status);
  webSocket.begin(host, port, path);
}
void loop() {
  webSocket.loop();
}
