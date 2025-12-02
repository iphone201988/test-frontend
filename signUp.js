const API_BASE_URL = "http://localhost:2000";

  document.getElementById("registerBtn").addEventListener("click", async function () {
    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const age = document.getElementById("ageInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();
    const role = document.getElementById("roleInput").value.trim();
    const termsChecked = document.getElementById("termsCheck").checked;

    if (!name || !email || !age || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    if (!termsChecked) {
      alert("Please accept the Terms of service");
      return;
    }

    const payload = {
      name,
      email,
      password,
      role,
      age,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/user/registerUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

     
      alert(data.message || "User registered successfully");

      window.location.href = "index.html";
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  });

