jest.setTimeout(20000);
const io = require("socket.io-client");

let socket;

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  socket = io.connect("http://localhost:3000");
  socket.on("connect", () => {
    console.log("connected!");
    done();
  });
});

/**
 *  Cleanup WS & HTTP servers
 */

afterAll((done) => {
  if (socket.connected) {
    socket.disconnect();
    console.log("disconnected");
  }
  done();
});

test("Socket connection test", (done) => {
  expect(socket.connected).toBe(true);
  done();
});

test("Socket message event test", (done) => {
  const message = "Hello, Socket.IO!";
  const username = "TEST_USER";
  const room = "JavaScript";

  socket.emit("joinRoom", (username, room));
  socket.on("message", (response) => {
    console.log(response.text);
    expect(response.text).toBe("Welcome to chatcord");
    done();
  });
});
