const socket = io();
const tweetStream = document.getElementById("tweetStream");
const tweet = [];
socket.on("connect", () => {
  console.log("Connected to Server...");
});
socket.on("tweet", (tweet) => {
  console.log(tweet);
  const tweetData = {
    id: tweet.data.id,
    text: tweet.data.text,
    source: tweet.data.source,
    username: `@${tweet.includes.users[0].username}`,
    img_profile: `${tweet.includes.users[0].profile_image_url}`,
  };
  const tweetEl = document.createElement("div");
  tweetEl.className = "card bg-dark my-4";
  tweetEl.innerHTML = `
    <div class="card-body text-light">
      <p>${tweetData.text}</p>
      <p>${tweetData.source}</p>
      <p>${tweetData.username}</p>
      <img src="${tweetData.img_profile}" class="rounded-circle">
      <a class="btn btn-primary mt-3" target="_blank" href="https://twitter.com/${tweetData.username}/status/${tweetData.id}">Go</a>
    </div>
  `;
  tweetStream.appendChild(tweetEl);
});
