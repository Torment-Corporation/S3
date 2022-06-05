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
    created_at: tweet.data.created_at,
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
        <div class="text-center">
          <a class="btn btn-main mt-3 px-3 me-1" data-bs-toggle="modal" data-bs-target="#see_more"><i class="fa-solid fa-magnifying-glass-plus"></i> ข้อมูลเพิ่มเติม</a>
          <a class="btn btn-main mt-3 px-3 ms-1" target="_blank" href="https://twitter.com/${tweetData.username}/status/${tweetData.id}"><i class="fa-brands fa-twitter"></i> เข้าชมต้นฉบับ</a>
        </div>
      </div>
    </div>
    <div class="modal fade" id="see_more" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content bg-dark text_main">
          <div class="modal-header">
            <h4 class="modal-title">ข้อมูลทั้งหมด</h4>
            <a type="button" class="fa-solid fa-xmark text_main" data-bs-dismiss="modal"></a>
          </div>
          <div class="modal-body">
            <ul class="list-group list-group-flush bg-dark text_main">
              <li class="list-group-item">
                <p class="card-text data_source">${tweetData.source}</p>
              </li>
              <li class="list-group-item">
                <p class="card-text data_source"><i class="fa-regular fa-clock pe-2"></i> ${tweetData.created_at}</p>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
          <a class="btn btn-main" target="_blank" href="https://twitter.com/${tweetData.username}/status/${tweetData.id}"><i class="fa-brands fa-twitter"></i> เข้าชมต้นฉบับ</a>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">ปิด</button>
          </div>
        </div>
      </div>
    </div>
  `;
  tweetStream.appendChild(tweetEl);
  $("p.card-text.data_source:contains('Twitter for iPhone')").html("ใช้งานบน iPhone <i class='device_detect_icon fa-solid fa-mobile-screen-button'></i");
  $("p.card-text.data_source:contains('Twitter for iPad')").html("ใช้งานบน iPad <i class='device_detect_icon fa-solid fa-tablet-screen-button'></i>");
  $("p.card-text.data_source:contains('Twitter for Android')").html("ใช้งานบน Android <i class='device_detect_icon fa-brands fa-android'></i");
  $("p.card-text.data_source:contains('Twitter Web App')").html("ใช้งานบน Website <i class='device_detect_icon fa-solid fa-computer'></i");
});