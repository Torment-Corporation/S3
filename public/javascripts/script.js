const socket = io();
socket.on("connect", () => {
  console.log("Connected to Server...");
});
socket.on("tweet", (tweet) => {
  console.log(tweet);
});
