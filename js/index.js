var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("search");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var myIndex;
var productList;

if (localStorage.getItem("products") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("products"));
  Display(productList);
}

function addProduct() {
  if (
    productNameInput.classList.contains("is-valid") &&
    productPriceInput.classList.contains("is-valid") &&
    productCategoryInput.classList.contains("is-valid") &&
    productDescriptionInput.classList.contains("is-valid")
  ) {
    var product = {
      code: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
      image: `images/${productImageInput.files[0].name}`,
      search: searchInput.value,
    };

    productList.push(product);
    localStorage.setItem("products", JSON.stringify(productList));
    Display(productList);
    console.log(productList);
    clearForm();
  } else {
    alert("Data are not valid");
  }
}

function clearForm() {
  (productNameInput.value = null),
    (productPriceInput.value = null),
    (productCategoryInput.value = null),
    (productDescriptionInput.value = null),
    (productImageInput.value = null);
}

function Display(arr) {
  var productBox = "";
  for (let i = 0; i < arr.length; i++) {
    productBox += `<div class="col-3">
        <div class="productOutline">
            <img src="${arr[i].image}" class="w-100" alt="">
            <h3 class="h6 pt-3">code: ${arr[i].code}</h3>
            <p>price: ${arr[i].price}</p>
            <p>category: ${arr[i].category}</p>
            <p>description: ${arr[i].description}</p>
            <button onclick = "deleteProduct(${i})" class="btn btn-outline-danger w-100 btn-sm">Delete<i class="fa fa-trash-can"></i></button>
            <button onclick = "setDataToInput(${i})" class="btn btn-outline-warning w-100 btn-sm mt-2">Update<i class="fa fa-pen"></i></button>
        </div>
    </div>`;
  }
  productRow.innerHTML = productBox;
}

function deleteProduct(deletedIndex) {
  productList.splice(deletedIndex, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  Display(productList);
  console.log(productList);
}

function search() {
  var product = [];
  var word = searchInput.value;
  console.log(word);

  for (var i = 0; i < productList.length; i++) {
    if (productList[i].code.toLowerCase().includes(word.toLowerCase())) {
      product.push(productList[i]);
      Display(product);
    } else if (product == "") {
      productRow.innerHTML = `<h1 class="bg-dark text-white p-5 text-center"> No Data </h1>`;
    }
  }
}

function validate(element) {
  var regex = {
    productName: /^[A-Z][a-z]{2,8}$/,
    productPrice: /^[1-9][0-9]{1,3}$/,
    productCategory: /^(tv|laptop|screen|mobile)$/i,
    productDescription: /^.{0,10}$/,
  };

  if (regex[element.id].test(element.value)) {
    console.log("Match");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    console.log("No Match");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
  }
}

function setDataToInput(index) {
  myIndex = index;

  (productNameInput.value = productList[index].code),
    (productPriceInput.value = productList[index].price),
    (productCategoryInput.value = productList[index].category),
    (productDescriptionInput.value = productList[index].description);
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");

  productNameInput.classList.add("is-valid");
  productPriceInput.classList.add("is-valid");
  productCategoryInput.classList.add("is-valid");
  productDescriptionInput.classList.add("is-valid");
}

function updateProduct() {
  if (
    productNameInput.classList.contains("is-valid") &&
    productPriceInput.classList.contains("is-valid") &&
    productCategoryInput.classList.contains("is-valid") &&
    productDescriptionInput.classList.contains("is-valid")
  ) {
    (productList[myIndex].code = productNameInput.value),
      (productList[myIndex].price = productPriceInput.value),
      (productList[myIndex].category = productCategoryInput.value),
      (productList[myIndex].description = productDescriptionInput.value);
    Display(productList);
    localStorage.setItem("products", JSON.stringify(productList));
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    clearForm();
  } else {
    alert("Data is not valid");
  }
}







