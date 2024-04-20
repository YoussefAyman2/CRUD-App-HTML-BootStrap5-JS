var productNameInput=document.getElementById("productName");
var productPriceInput=document.getElementById("productPrice");
var productCategoryInput=document.getElementById("productCategory");
var productDescInput=document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var inputs=document.getElementsByClassName("form-control");
var searchInput = document.getElementById("searchInput");
var products=[];
var currentIndex;
if(localStorage.getItem('productList')!=null){
    products=JSON.parse(localStorage.getItem('productList'));
    displayData();
}
searchInput.onkeyup=function(){
    var searchInputValue=searchInput.value.toLowerCase();
    var container='';
    for(var i = 0; i < products.length; i++){
        if(products[i].name.toLowerCase().includes(searchInputValue)){
            container += `
            <tr><td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].desc}</td>
            <td><button onclick='getProductInfo(${i})'  class= 'btn btn-warning'>Update</button></td>
            <td><button onclick='deleteProduct(${i})'  class= 'btn btn-danger'>Delete</button></td></tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=container;
}
function addProducts(){
    var product={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value
    }
    products.push(product);
    localStorage.setItem('productList',JSON.stringify(products))
}
addBtn.addEventListener('click',function(){
    if(!checkFields()){

        if(addBtn.innerHTML =='add product'){
            addProducts();
        }else{
            updateProduct();
        }
        displayData();
        clearForm();
    }else{
        alert("Please Enter All Fields.");
    }
});
function checkFields(){
    return productNameInput.value==''||productPriceInput.value==''||productDescInput.value==''||productCategoryInput.value=='';
}
function displayData(){
    var container='';
    for(var i = 0; i < products.length; i++){
       container += `
                    <tr><td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].category}</td>
                    <td>${products[i].desc}</td>
                    <td><button onclick='getProductInfo(${i})'  class= 'btn btn-warning'>Update</button></td>
                    <td><button onclick='deleteProduct(${i})'  class= 'btn btn-danger'>Delete</button></td></tr>`
    }
    document.getElementById("tableBody").innerHTML=container;
}
function clearForm(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value='';
    }
}
function deleteProduct(index){
    products.splice(index,1);
    localStorage.setItem('productList',JSON.stringify(products));
    displayData();
}
function getProductInfo(index){
     currentIndex=index;
     productNameInput.value=products[index].name;
     productPriceInput.value=products[index].price;
     productCategoryInput.value=products[index].category;
     productDescInput.value=products[index].desc;
     addBtn.innerHTML='update product'
    
}
function updateProduct(){
    var product={
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value    
    }
    products[currentIndex]=product;
    localStorage.setItem('productList', JSON.stringify(products));
    addBtn.innerHTML="add product";

}
function validateInput(inputValue,regExp){
    return regExp.test(inputValue.value);
}
var nameAlert=document.getElementById('nameAlert');
var NameRegjex=/^[A-Z][a-z]{2,8}$/;
productNameInput.onkeyup=function(){
    if(validateInput(productNameInput,NameRegjex)){
        addBtn.removeAttribute('disabled');
        productNameInput.classList.remove('is-invalid');
        productNameInput.classList.add('is-valid');
        nameAlert.classList.add('d-none');
    }else{
       addBtn.disabled='true';
       productNameInput.classList.remove('is-valid');
       productNameInput.classList.add('is-invalid');
       nameAlert.classList.remove('d-none');
    }
}