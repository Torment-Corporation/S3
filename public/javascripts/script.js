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
    img_content: `${tweet.includes.media[0].url}`,
  };
  const tweetEl = document.createElement("div");
  tweetEl.className = "col-12 col-md-6 col-lg-4";
  tweetEl.innerHTML = `
    <div class="card bg-dark my-4 text-light">
      <h5 class="card-header">
        <img src="${tweetData.img_profile}" class="rounded-circle d-inline-block me-2">
        <a href="https://twitter.com/${tweetData.username}" target="_blank" class="d-inline-block title_card">${tweetData.username}</a>
      </h5>
      <a href="https://twitter.com/${tweetData.username}/status/${tweetData.id}" target="_blank">
        <img src="${tweetData.img_content}" class="w-100">
      </a>
      <div class="card-body">
        <p class="card-text line_break">${tweetData.text}</p>
        <p class="card-text">${tweetData.source}</p>
        <a class="btn btn-primary mt-3 mx-auto d-table px-5" target="_blank" href="https://twitter.com/${tweetData.username}/status/${tweetData.id}">Go</a>
      </div>
    </div>
  `;
  tweetStream.appendChild(tweetEl);
});
