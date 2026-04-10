const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  chatWindow.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
  chatWindow.innerHTML += `<div><em>Thinking...</em></div>`;
  userInput.value = "";

  try {
    const response = await fetch(
      "https://snowy-sun-dd50.g2peterson.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a helpful L'Oréal Smart Product Advisor. Answer questions about L'Oréal products and provide personalized recommendations based on user preferences. dont answer questions about anything other than L'Oréal products.",
            },
            { role: "user", content: message },
          ],
        }),
      },
    );

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content || "No response received.";

    chatWindow.innerHTML += `<div><strong>Bot:</strong> ${reply}</div>`;
  } catch (error) {
    chatWindow.innerHTML += `<div><strong>Error:</strong> Could not reach server</div>`;
  }
});
