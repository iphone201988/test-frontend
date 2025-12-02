const API_BASE_URL="http://localhost:2000";

document.getElementById("resetPasswordBtn").addEventListener("click", async function () {
    const otp = document.getElementById("verifyOtp").value.trim();
    const email = localStorage.getItem("resetEmail")

    if (!otp) {
      alert("Please fill all fields");
      return;
    }
    if(!email){
        window.location.href="forget-password.html"
    }
    const payload = {
      otp,
      email
    };

    try {
      const response = await fetch(`${API_BASE_URL}/user/verifyotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Otp verification failed");
        return;
      }
      localStorage.setItem("otpVerified", "true")
    

      window.location.href = "reset-password.html";
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  });