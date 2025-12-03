const API_BASE_URL ="http://localhost:2000"

document.getElementById("logoutbtn").addEventListener("click",()=>{
    localStorage.removeItem("token");
    window.location.href = "signin.html";
})
document.getElementById("createBlogForm").addEventListener("submit", async(e) => {
    e.preventDefault();
    const title = document.getElementById("blogTitle").value.trim()
    const description = document.getElementById("blogDescription").value.trim()
    const imageInput = document.getElementById("blogImage")
    const token = localStorage.getItem("token")

    if (!title || !description) {
        alert("Please fill title and description");
        return;
      }
    
      if (!token) {
        alert("You must be logged in to create a blog");
        window.location.href = "signin.html";
        return;
      }

    const formData =new FormData()
    formData.append('title',title)
    formData.append('description',description)

    if(imageInput.files && imageInput.files[0]){
        formData.append('images',imageInput.files[0])
    }
    try{
        const response = await fetch(`${API_BASE_URL}/blog/createBlog`,{
            method:'POST',
            headers:{
                Authorization:`Bearer ${token}`,
            },
            body:formData,
        })
        const data = await response.json()
        if (!response.ok) {
            alert(data.message || "Failed to create blog");
            return;
          }
      console.log("5")
          alert(data.message || "Blog created successfully!");
          window.location.href = "blog.html";
        } catch (err) {
          console.error(err);
          alert("Network error. Please try again.");
        }
    });