// EasyERP Chrome Extension - Auto Login Script with Debugging & Fixes
(function () {
  const storageKey = "easyerp_credentials";

  function createLoginPrompt() {
    const loginId = prompt("Enter your Login ID:");
    const password = prompt("Enter your Password:");

    const questions = {};
    questions[prompt("Enter your first security question:")] = prompt(
      "Answer to first question:"
    );
    questions[prompt("Enter your second security question:")] = prompt(
      "Answer to second question:"
    );
    questions[prompt("Enter your third security question:")] = prompt(
      "Answer to third question:"
    );

    const creds = { loginId, password, questions };
    chrome.storage.local.set({ [storageKey]: creds }, () =>
      alert("Credentials saved! Reload page to login.")
    );
  }

  function fillLoginForm(creds) {
    const loginField = document.querySelector('input[name="user_id"]');
    const passwordField = document.querySelector('input[name="password"]');
    const otpField = document.querySelector('input[name="email_otp"]');

    if (!loginField || !passwordField) {
      console.error("Login or password field not found");
      return;
    }

    console.log("Step 1: Filling login ID...");
    loginField.focus();
    loginField.value = creds.loginId;
    loginField.dispatchEvent(new Event("input", { bubbles: true }));

    // Give time for ERP JS to handle login ID entry
    setTimeout(() => {
      console.log("Step 2: Filling password...");
      passwordField.focus();
      passwordField.value = creds.password;
      passwordField.dispatchEvent(new Event("input", { bubbles: true }));

      // Trigger blur to potentially reveal security question
      passwordField.blur();

      console.log("Step 3: Waiting for security question to appear...");

      // Wait and observe for the security question
      const observer = new MutationObserver(() => {
        const secQField = document.querySelector('input[name="answer"]');
        const secQLabel = document.querySelector("label#question");

        if (secQField && secQLabel && secQField.offsetParent !== null) {
          const question = secQLabel.textContent.trim();
          const answer =
            creds.questions[question] || prompt(`Answer for: ${question}`);

          console.log(`Step 4: Filling security answer for: ${question}`);
          secQField.focus();
          secQField.value = answer;
          secQField.dispatchEvent(new Event("input", { bubbles: true }));
          secQField.blur();

          observer.disconnect();

          const sendOtpBtn = document.querySelector("#getotp");
          if (sendOtpBtn) {
            console.log("Step 5: Clicking Send OTP...");
            sendOtpBtn.click();
          }

          setTimeout(() => {
            const userOtp = prompt(
              "Step 6: Enter the 6-digit OTP sent to your email:"
            );
            if (otpField) {
              otpField.value = userOtp;
              otpField.dispatchEvent(new Event("input", { bubbles: true }));

              const loginBtn = document.querySelector("#loginFormSubmitButton");
              if (loginBtn) {
                console.log("Step 6: Clicking Login button...");
                loginBtn.click();
              }
            }
          }, 2000);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    }, 1200); // wait for login ID input to settle
  }

  chrome.storage.local.get([storageKey], (result) => {
    if (!result[storageKey]) {
      console.log("No credentials found, prompting user...");
      createLoginPrompt();
    } else {
      console.log("Credentials found, starting login...");
      fillLoginForm(result[storageKey]);
    }
  });
})();
