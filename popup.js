document.addEventListener("DOMContentLoaded", () => {
  const loginId = document.getElementById("loginId");
  const password = document.getElementById("password");
  const questions = document.getElementById("questions");
  const saveBtn = document.getElementById("saveBtn");

  chrome.storage.local.get("easyerp_credentials", (data) => {
    if (data.easyerp_credentials) {
      loginId.value = data.easyerp_credentials.loginId || "";
      password.value = data.easyerp_credentials.password || "";
      questions.value = JSON.stringify(data.easyerp_credentials.questions, null, 2);
    }
  });

  saveBtn.onclick = () => {
    try {
      const creds = {
        loginId: loginId.value,
        password: password.value,
        questions: JSON.parse(questions.value)
      };
      chrome.storage.local.set({ easyerp_credentials: creds }, () => {
        alert("Credentials saved!");
      });
    } catch (e) {
      alert("Invalid JSON for security questions.");
    }
  };
});
