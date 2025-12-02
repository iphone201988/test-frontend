const API_BASE_URL="http://localhost:2000";
// console.log("h")
const token = localStorage.getItem("token")
if(token){
    window.location.href = "index.html"
}
document.getElementById("loginbtn").addEventListener("click", async function () {
    // console.log("hii")
    const email = document.getElementById("emailInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }
      localStorage.setItem("token",data.token)
     
      alert(data.message || "User Login successfully");

      window.location.href = "index.html";
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    }
  });

