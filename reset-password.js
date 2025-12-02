const API_BASE_URL="http://localhost:2000";
console.log("h")
document.getElementById("submitResetBtn").addEventListener("click", async function () {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const email = localStorage.getItem("resetEmail")

  if (!newPassword || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
    const payload = {
      newPassword,
      email
    };

    try {
      const response = await fetch(`${API_BASE_URL}/user/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "something went wrong");
        return;
      }
    
      alert("Password reset successfully!")
      window.location.href = "signin.html";
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  });