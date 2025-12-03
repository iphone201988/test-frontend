const API_BASE_URL ="http://localhost:2000"
console.log("1")
document.getElementById("logoutbtn").addEventListener("click",()=>{
    localStorage.removeItem("token");
    window.location.href = "signin.html";
})
document.getElementById("createProductForm").addEventListener("submit", async(e) => {
    e.preventDefault();
    console.log("2")
    const productName = document.getElementById("productName").value.trim()
    const productDetails = document.getElementById("productDetails").value.trim()
    const productPrice = document.getElementById("productPrice").value.trim()
    const productImage = document.getElementById("productImages")
    const token = localStorage.getItem("token")

    if (!productName || !productDetails || !productPrice) {
        alert("Please fill Product Name  and Product Details");
        return;
      }
    
      if (!token) {
        alert("You must be logged in to create a product");
        window.location.href = "signin.html";
        return;
      }

    const formData =new FormData()
    formData.append('productName',productName)
    formData.append('productDetails',productDetails)
    formData.append('productPrice', productPrice)
    console.log("3")
    if(productImage.files && productImage.files[0]){
        formData.append('images',productImage.files[0])
    }

    try{
        const response = await fetch(`${API_BASE_URL}/product/createProduct`,{
            method:'POST',
            headers:{
                Authorization:`Bearer ${token}`,
            },
            body:formData,
        })
        const data = await response.json()
        if (!response.ok) {
            alert(data.message || "Failed to create project");
            return;
          }
      
          alert(data.message || "Project created successfully!");
          window.location.href = "product.html";
        } catch (err) {
          console.error(err);
          alert("Network error. Please try again.");
        }
    });