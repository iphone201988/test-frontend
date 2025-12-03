const API_BASE_URL ="http://localhost:2000"
console.log("1")
document.getElementById("logoutbtn").addEventListener("click",()=>{
    localStorage.removeItem("token");
    window.location.href = "signin.html";
})
document.getElementById("createAccessorieForm").addEventListener("submit", async(e) => {
    e.preventDefault();
    console.log("2")
    const accessorieName = document.getElementById("accessorieName").value.trim()
    const accessorieDetail = document.getElementById("accessorieDetail").value.trim()
    const accessoriePrice = document.getElementById("accessoriePrice").value.trim()
    const accessorieImage = document.getElementById("accessorieImage")
    const token = localStorage.getItem("token")

    if (!accessorieName || !accessorieDetail || !accessoriePrice) {
        alert("Please fill Accessorie Name  and Accessorie Details");
        return;
      }
    
      if (!token) {
        alert("You must be logged in to create a accessorie");
        window.location.href = "signin.html";
        return;
      }

    const formData =new FormData()
    formData.append('accessorieName',accessorieName)
    formData.append('accessorieDetail',accessorieDetail)
    formData.append('accessoriePrice', accessoriePrice)
    console.log("3")
    if(accessorieImage.files && accessorieImage.files[0]){
        formData.append('images',accessorieImage.files[0])
    }
console.log("4")
    try{
        const response = await fetch(`${API_BASE_URL}/accessorie/createAccessorie`,{
            method:'POST',
            headers:{
                Authorization:`Bearer ${token}`,
            },
            body:formData,
        })
        const data = await response.json()
        if (!response.ok) {
            alert(data.message || "Failed to create accessorie");
            return;
          }
      
          alert(data.message || "Project created successfully!");
          window.location.href = "accessorie.html";
        } catch (err) {
          console.error(err);
          alert("Network error. Please try again.");
        }
    });