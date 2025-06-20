// EasyERP Chrome Extension - Auto Login Script with Debugging & Fixes
(function () {
  const storageKey = "easyerp_credentials";

  // Add debugging to see if script is loading
  console.log("🚀 EasyERP AutoLogin script loaded!");

  function createLoginPrompt() {
    console.log("📝 Prompting for credentials...");

    // Check if we're on the right page
    if (!window.location.href.includes("erp.iitkgp.ac.in")) {
      console.log("❌ Not on ERP site, skipping credential prompt");
      return;
    }

    const loginId = prompt("🔐 EasyERP AutoLogin\n\nEnter your Login ID:");
    if (!loginId) {
      console.log("❌ No login ID provided, cancelling setup");
      return;
    }

    const password = prompt("🔐 EasyERP AutoLogin\n\nEnter your Password:");
    if (!password) {
      console.log("❌ No password provided, cancelling setup");
      return;
    }

    const questions = {};

    const q1 = prompt(
      "🔐 EasyERP AutoLogin\n\nEnter your FIRST security question:"
    );
    if (!q1) {
      console.log("❌ No security questions provided, cancelling setup");
      return;
    }
    const a1 = prompt(`🔐 EasyERP AutoLogin\n\nAnswer to: "${q1}"`);
    if (!a1) {
      console.log("❌ No answer provided, cancelling setup");
      return;
    }
    questions[q1] = a1;

    const q2 = prompt(
      "🔐 EasyERP AutoLogin\n\nEnter your SECOND security question:"
    );
    if (!q2) {
      console.log("❌ No second security question provided, cancelling setup");
      return;
    }
    const a2 = prompt(`🔐 EasyERP AutoLogin\n\nAnswer to: "${q2}"`);
    if (!a2) {
      console.log("❌ No answer provided, cancelling setup");
      return;
    }
    questions[q2] = a2;

    const q3 = prompt(
      "🔐 EasyERP AutoLogin\n\nEnter your THIRD security question:"
    );
    if (!q3) {
      console.log("❌ No third security question provided, cancelling setup");
      return;
    }
    const a3 = prompt(`🔐 EasyERP AutoLogin\n\nAnswer to: "${q3}"`);
    if (!a3) {
      console.log("❌ No answer provided, cancelling setup");
      return;
    }
    questions[q3] = a3;

    const creds = { loginId, password, questions };

    console.log("💾 Saving credentials to storage...");
    chrome.storage.local.set({ [storageKey]: creds }, () => {
      if (chrome.runtime.lastError) {
        console.error("❌ Error saving credentials:", chrome.runtime.lastError);
        alert("❌ Error saving credentials. Please try again.");
      } else {
        console.log("✅ Credentials saved successfully!");
        alert(
          "✅ Credentials saved! Please reload the page to start auto-login."
        );
      }
    });
  }
  function fillLoginForm(creds) {
    console.log("🚀 Starting auto-login process...");

    const loginField = document.querySelector('input[name="user_id"]');
    const passwordField = document.querySelector('input[name="password"]');
    const otpField = document.querySelector('input[name="email_otp"]');

    if (!loginField || !passwordField) {
      console.error("❌ Login or password field not found on page");
      console.log(
        "🔍 Available input fields:",
        document.querySelectorAll("input")
      );
      return;
    }

    console.log("✅ Login fields found, proceeding with auto-fill");
    console.log("👤 Step 1: Filling login ID...");
    loginField.focus();
    loginField.value = creds.loginId;
    loginField.dispatchEvent(new Event("input", { bubbles: true }));
    loginField.dispatchEvent(new Event("change", { bubbles: true }));

    // Give time for ERP JS to handle login ID entry
    setTimeout(() => {
      console.log("🔑 Step 2: Filling password...");
      passwordField.focus();
      passwordField.value = creds.password;
      passwordField.dispatchEvent(new Event("input", { bubbles: true }));
      passwordField.dispatchEvent(new Event("change", { bubbles: true }));

      // Trigger blur to potentially reveal security question
      passwordField.blur();

      console.log("❓ Step 3: Waiting for security question to appear...");

      // Wait and observe for the security question
      const observer = new MutationObserver(() => {
        const secQField = document.querySelector('input[name="answer"]');
        const secQLabel = document.querySelector("label#question");

        if (secQField && secQLabel && secQField.offsetParent !== null) {
          const question = secQLabel.textContent.trim();
          const answer = creds.questions[question];

          if (!answer) {
            console.warn("⚠️ No answer found for question:", question);
            const userAnswer = prompt(
              `❓ Security Question:\n\n${question}\n\nPlease provide the answer:`
            );
            if (userAnswer) {
              // Save the new answer for future use
              creds.questions[question] = userAnswer;
              chrome.storage.local.set({ [storageKey]: creds });
            }
            answer = userAnswer;
          }

          if (answer) {
            console.log(`✅ Step 4: Filling security answer for: ${question}`);
            secQField.focus();
            secQField.value = answer;
            secQField.dispatchEvent(new Event("input", { bubbles: true }));
            secQField.dispatchEvent(new Event("change", { bubbles: true }));
            secQField.blur();

            observer.disconnect();

            const sendOtpBtn = document.querySelector("#getotp");
            if (sendOtpBtn) {
              console.log("📱 Step 5: Clicking Send OTP...");
              sendOtpBtn.click();
            } else {
              console.warn("⚠️ Send OTP button not found");
            }

            setTimeout(() => {
              const userOtp = prompt(
                "📱 EasyERP AutoLogin\n\nStep 6: Enter the 6-digit OTP sent to your email:"
              );
              if (otpField && userOtp) {
                console.log("🔢 Step 7: Filling OTP...");
                otpField.value = userOtp;
                otpField.dispatchEvent(new Event("input", { bubbles: true }));
                otpField.dispatchEvent(new Event("change", { bubbles: true }));

                const loginBtn = document.querySelector(
                  "#loginFormSubmitButton"
                );
                if (loginBtn) {
                  console.log("🚀 Step 8: Clicking Login button...");
                  loginBtn.click();
                } else {
                  console.warn("⚠️ Login submit button not found");
                }
              } else {
                console.log("❌ OTP entry cancelled or field not found");
              }
            }, 2000);
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      // Stop observing after 30 seconds to prevent infinite observation
      setTimeout(() => {
        observer.disconnect();
        console.log("⏰ Security question observer timed out after 30 seconds");
      }, 30000);
    }, 1200); // wait for login ID input to settle
  } // Initialize the extension with better debugging
  function initializeExtension() {
    console.log("🔍 Checking for stored credentials...");

    chrome.storage.local.get([storageKey], (result) => {
      if (chrome.runtime.lastError) {
        console.error("❌ Error accessing storage:", chrome.runtime.lastError);
        return;
      }

      console.log("📦 Storage result:", result);

      if (
        !result[storageKey] ||
        Object.keys(result[storageKey] || {}).length === 0
      ) {
        console.log("📝 No credentials found, prompting user...");
        // Add a small delay to ensure page is loaded
        setTimeout(() => {
          createLoginPrompt();
        }, 1000);
      } else {
        console.log("✅ Credentials found, starting auto-login...");
        console.log("🔑 Stored credentials:", {
          loginId: result[storageKey].loginId ? "***" : "missing",
          password: result[storageKey].password ? "***" : "missing",
          questions:
            Object.keys(result[storageKey].questions || {}).length +
            " questions",
        });

        // Add a small delay to ensure page is loaded
        setTimeout(() => {
          fillLoginForm(result[storageKey]);
        }, 500);
      }
    });
  }

  // Expose functions to window for manual debugging
  window.EasyERPAutoLogin = {
    setupCredentials: createLoginPrompt,
    clearCredentials: () => {
      chrome.storage.local.remove([storageKey], () => {
        console.log("🗑️ Credentials cleared!");
        alert("Credentials cleared! Reload page to set up new credentials.");
      });
    },
    viewCredentials: () => {
      chrome.storage.local.get([storageKey], (result) => {
        if (result[storageKey]) {
          console.log("🔑 Current credentials:", {
            loginId: result[storageKey].loginId,
            password: "***HIDDEN***",
            questions: result[storageKey].questions,
          });
        } else {
          console.log("❌ No credentials stored");
        }
      });
    },
  };

  console.log("🎮 Debug commands available:");
  console.log("- EasyERPAutoLogin.setupCredentials() - Setup new credentials");
  console.log(
    "- EasyERPAutoLogin.clearCredentials() - Clear stored credentials"
  );
  console.log(
    "- EasyERPAutoLogin.viewCredentials() - View current credentials"
  );

  // Wait for page to be ready before initializing
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeExtension);
  } else {
    // DOM is already loaded
    initializeExtension();
  }
})();
