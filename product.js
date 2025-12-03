const API_BASE_URL = "http://localhost:2000";
// Sample product data
let products = [];

// Logout functionality
document.getElementById("logoutbtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "signin.html";
});

async function loadProduct() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API_BASE_URL}/product/getProduct`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    console.log(data);
    products = (data.product || []).map((p) => ({
      ...p,
      id: p._id || p.id,
    }));
    console.log(products[0].productName);
    renderProducts();
  } catch (error) {
    console.error(error);
    alert("Could not load products.");
  }
}
// Render products
function renderProducts(productsToRender = products) {
  const container = document.getElementById("productsContainer");
  const emptyState = document.getElementById("emptyState");
  if (productsToRender.length === 0) {
    container.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }
  console.log("kllklklklklklklklklklklkl", productsToRender);
  emptyState.style.display = "none";
  container.innerHTML = productsToRender
    .map(
      (product) => `
      <div class="col-md-4">
        <div class="card product-card h-100">
          <img src="${API_BASE_URL}/${product.productImage}" class="card-img-top product-image" alt="${product.productName}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.productName}</h5>
            <p class="card-text text-muted">${product.productDetails}</p>
            <div class="mt-auto">
              <div class="price-tag mb-3">${product.productPrice}</div>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary flex-fill" onclick="editProduct('${product._id}')">
                  Edit
                </button>
                <button class="btn btn-sm btn-outline-danger flex-fill" onclick="deleteProduct('${product._id}')">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = products.filter(
    (p) =>
      p.productName.toLowerCase().includes(searchTerm) ||
      p.productDetails.toLowerCase().includes(searchTerm)
  );
  renderProducts(filtered);
});
console.log("asdsa");
// Sort functionality
document.getElementById("sortSelect").addEventListener("change", (e) => {
  console.log("sds");
  const sorted = [...products];
  console.log("hjdsbfhsdbf", sorted);
  switch (e.target.value) {
    case "name":
      sorted.sort((a, b) => a.productName.localeCompare(b.productName));
      break;
    case "price-low":
      sorted.sort((a, b) => a.productPrice - b.productPrice);
      break;
    case "price-high":
      sorted.sort((a, b) => b.productPrice - a.productPrice);
      break;
    case "newest":
      sorted.sort((a, b) => b.id - a.id);
      break;
  }
  renderProducts(sorted);
});
console.log("1111");

// Edit product
function editProduct(id) {
  console.log("s555");
  const product = products.find((p) => p._id === id);
  console.log("sdas", product);
  document.getElementById("editProductId").value = product._id;
  document.getElementById("editName").value = product.productName;
  document.getElementById("editDescription").value = product.productDetails;
  document.getElementById("editPrice").value = product.productPrice;

  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
}

// Save edit
document.getElementById("saveEditBtn").addEventListener("click", async () => {
  const id = document.getElementById("editProductId").value;
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("productName", document.getElementById("editName").value);
  formData.append(
    "productDetails",
    document.getElementById("editDescription").value
  );
  formData.append("productPrice", document.getElementById("editPrice").value);

  const imageInput = document.getElementById("editImage");
  if (imageInput.files.length > 0) {
    for (let file of imageInput.files) {
      formData.append("images", file);
    }
  }

  try {
    const res = await fetch(`${API_BASE_URL}/product/updateProduct/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to update product");

    const data = await res.json();
    alert("Product Updated Successfully");

    loadProduct();

    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
  } catch (error) {
    console.error(error);
    alert("Error updating product");
  }
});

// Delete product
async function deleteProduct(id) {
  console.log("0000")
  if (confirm("Are you sure you want to delete this product?")) {
    const token = localStorage.getItem("token");
    console.log("000")
    try {
      const res = await fetch(`${API_BASE_URL}/product/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("00")
      if (!res.ok) throw new Error("Failed to delete product");
      console.log("0")
      alert("Product deleted Successfully");
      loadProduct();
    } catch (error) {
      console.error(error)
      alert("Error while deleting")
    }
  }
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  loadProduct();
});
