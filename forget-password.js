const API_BASE_URL="http://localhost:2000";

document.getElementById("forgotBtn").addEventListener("click", async function () {
    const email = document.getElementById("forgotEmail").value.trim();

    if (!email) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      email,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/user/forgetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "OtpSent");
        return;
      }
      localStorage.setItem("resetEmail",payload.email)
     
      alert(data.message || "OTP SENT");

      window.location.href = "verify-otp.html";
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  });

