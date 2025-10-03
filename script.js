// 🌟 متغير واحد لتغيير API بسهولة
let AI_API_BASE = "https://alakreb.vercel.app/api/ai/gpt?q=";

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const quickReplies = document.getElementById("quick-replies");

// ⏺️ دالة لإضافة رسالة للمحادثة
function addMessage(content, type = "ai") {
  const message = document.createElement("div");
  message.className = type === "user" ? "user-message" : "ai-message";
  message.textContent = content;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ⏳ دالة لتحميل الرد من الـ API
async function fetchAIResponse(question) {
  try {
    addMessage("جاري التفكير...", "ai");

    const response = await fetch(AI_API_BASE + encodeURIComponent(question));
    const data = await response.json();

    // حذف رسالة "جاري التفكير..."
    const loadingMessages = chatBox.querySelectorAll(".ai-message");
    if (loadingMessages.length > 0) {
      chatBox.removeChild(loadingMessages[loadingMessages.length - 1]);
    }

    addMessage(data.response, "ai");
  } catch (err) {
    addMessage("حدث خطأ أثناء الاتصال بالخادم ❌", "ai");
  }
}

// ⌨️ إرسال من النموذج
chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = userInput.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  userInput.value = "";
  quickReplies.style.display = "none"; // إخفاء الاقتراحات بعد أول رسالة
  fetchAIResponse(text);
});

// 🎯 التعامل مع الأزرار الجاهزة
document.querySelectorAll(".reply-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const question = btn.textContent;
    addMessage(question, "user");
    quickReplies.style.display = "none";
    fetchAIResponse(question);
  });
});
