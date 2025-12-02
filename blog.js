const API_BASE_URL = "http://localhost:2000";

document.getElementById("logoutbtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "signin.html";
});


async function loadBlogs() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to view blogs");
    window.location.href = "signin.html";
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/blog/getBlog`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to fetch blogs");
      return;
    }

    const output = document.getElementById("blogList");

    data.blog.forEach((b, i) => {
      output.innerHTML += `
        <hr>
        <p><b>Blog ${i + 1}</b></p>
        <p>Title: ${b.title}</p>
        <p>Description: ${b.description}</p>
        ${
          b.uploads && b.uploads.length > 0
            ? `<img src="${API_BASE_URL}/${b.uploads[0]}" width="200"/>`
            : `<p>No Image</p>`
        }
      `;
    });
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
}

document.addEventListener("DOMContentLoaded", loadBlogs);
