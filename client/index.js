const messageContainer = document.querySelector(".message-container");
const nameInput = document.querySelector(".input-name");
const messageInput = document.querySelector(".input-message");
const submitBtn = document.querySelector(".submit");

const formatDate = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const getAllMessage = async () => {
  try {
    const {
      data: { allMessages },
    } = await axios.get("/home");
    // get the messages and populate the container
    const messages = allMessages
      .map((msg) => {
        return `<div class="messages-message d-flex align-items-center gap-3 p-4">
        <div class="d-flex align-items-center flex-column position-relative">
          <div class="position-absolute info-container d-flex gap-4 start-0">
            <p class="info-text info-text-1">${msg.name}</p>
            <p class="info-text info-text-2">${formatDate(
              new Date(msg.at)
            ).slice(0, -3)}</p>
          </div>
          <img class="user-img" src="./user.png" alt="user" />
        </div>
        <p class="bg-info p-3 msg rounded-5">${msg.message}</p>
      </div>`;
      })
      .join(" ");
    messageContainer.innerHTML = messages;
  } catch (error) {
    console.log(error);
  }
};

const postNewMessage = async () => {
  if (!nameInput.value || !messageInput.value) return;
  try {
    await axios.post("/home/new", {
      name: nameInput.value,
      message: messageInput.value,
    });
    getAllMessage();
  } catch (error) {
    console.log(error);
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  postNewMessage();
  nameInput.value = "";
  messageInput.value = "";
});

getAllMessage();
