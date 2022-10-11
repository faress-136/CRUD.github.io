var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCat = document.getElementById("productCat")
var productDesc = document.getElementById("productDesc")


var mainBtn = document.getElementById("mainBtn")
var updateBtn = document.getElementById("updateBtn")

var ProductList
var searchList 

if (localStorage.getItem("list") != null) {
    ProductList = JSON.parse(localStorage.getItem("list"))
    DisplayProduct(ProductList)
}
else{
    ProductList = []

}

function AddProduct(){

    if (validateInput()){
        var Product = {
            name: productName.value, 
            price: productPrice.value,
            category: productCat.value,
            description: productDesc.value
        }

        document.getElementById("successMsg").classList.remove("d-none")
        ProductList.push(Product)
        setToLocalStorage()
        DisplayProduct(ProductList)

    }
    else{
        alert("Incorrect Inputs")
    }
    
}

function validateInput(){
    var regexName = /^[A-Z]([a-z]){3,8}$/gm
    var regexPrice = /^([1-9][0-9][0-9][0-9]|10000)$/gm
    var regexCat = /^(TV|mobile|device)$/mig
    var regexDesc = /^.{5,500}$/mgi
    var nameCheck = true
    var priceCheck = true
    var catCheck = true
    var descCheck = true

    if(regexName.test(productName.value)){
        document.getElementById("inputTest").classList.add("d-none")
       
    }
    else{
        nameCheck = false
        if(productName.value != ""){
            document.getElementById("inputTest").classList.remove("d-none")
           
        }
    }

    if(regexPrice.test(productPrice.value)){
        document.getElementById("priceTest").classList.add("d-none")
    }
    else{
        priceCheck = false

        if(productPrice.value != ""){
            document.getElementById("priceTest").classList.remove("d-none")
        }
    }

    if(regexCat.test(productCat.value)){
        document.getElementById("catTest").classList.add("d-none")
    }
    else{
        catCheck = false

        if(productCat.value != ""){
            // document.getElementById("successMsg").classList.add("d-none")
            document.getElementById("catTest").classList.remove("d-none")
        }
       
    }

    if(regexDesc.test(productDesc.value)){
        document.getElementById("descTest").classList.add("d-none")
    }
    else{
        descCheck = false
        if(productDesc.value != ""){
            // document.getElementById("successMsg").classList.add("d-none")
            document.getElementById("descTest").classList.remove("d-none")
        }
       
    }


    if(nameCheck && priceCheck && catCheck && descCheck){
        return true
    }
    else{
        document.getElementById("successMsg").classList.add("d-none")
        return false
    }

}

function clearForm(){
    productName.value = ''
    productPrice.value = ''
    productCat.value = ''
    productDesc.value = ''
    changeButtons()
}

function deleteItem(index){
    if (test != ""){
        searchList.splice(index,1)
        ProductList.splice(mainIndex,1)
        setToLocalStorage()
        DisplayProduct(searchList)

    }
    else{
    ProductList.splice(index,1)
    setToLocalStorage()
    DisplayProduct(ProductList)}
   
}

function changeButtons(){
    updateBtn.classList.add("d-none")
    mainBtn.classList.replace("d-none", "d-inline-block")
}

function setToLocalStorage(){
    localStorage.setItem("list", JSON.stringify(ProductList))
}


function update(){
    if (validateInput()){

    if (test != ""){
        // hanghyar fy al search list 

        searchList[sharedIndex].name = productName.value
        searchList[sharedIndex].price = productPrice.value
        searchList[sharedIndex].category = productCat.value
        searchList[sharedIndex].description = productDesc.value
    
        setToLocalStorage(searchList)
        DisplayProduct(searchList)
        search(test)
        clearForm()
        changeButtons()
        alert("Updated Successfully")
    }

    else{
        ProductList[sharedIndex].name = productName.value
        ProductList[sharedIndex].price = productPrice.value
        ProductList[sharedIndex].category = productCat.value
        ProductList[sharedIndex].description = productDesc.value
    
        setToLocalStorage(ProductList)
        DisplayProduct(ProductList)
        clearForm()
        changeButtons()
        alert("Updated Successfully")

    }
}
    
}

var sharedIndex =0

function showItemData(index){
    // When i add product then click update remove success message 
    document.getElementById("successMsg").classList.add("d-none")
    sharedIndex = index
    console.log(index)
    if (test != ""){
        // show item data using search list index
    productName.value = searchList[index].name
    productPrice.value = searchList[index].price
    productCat.value = searchList[index].category
    productDesc.value = searchList[index].description

    mainBtn.classList.add("d-none")
    updateBtn.classList.replace("d-none", "d-inline-block")
    }

    //else using product list index 
    else{
       
    productName.value = ProductList[index].name
    productPrice.value = ProductList[index].price
    productCat.value = ProductList[index].category
    productDesc.value = ProductList[index].description

    mainBtn.classList.add("d-none")
    updateBtn.classList.replace("d-none", "d-inline-block")
    }

}

var test = ""
var mainIndex
function search(keyword){
    test = keyword
    searchList = []
    for(var i = 0; i < ProductList.length; i++){
       if(ProductList[i].name.toLowerCase().includes(keyword.toLowerCase())){
        mainIndex = i
        searchList.push(ProductList[i])
        
       }
    }
    DisplayProduct(searchList)
}



function DisplayProduct (list){
    var cartona = ``
    for(var i = 0; i<list.length; i++){
       cartona += `  <tr>
       <td>${i+1}</td>
       <td>${list[i].name}</td>
       <td>${list[i].price}</td>
       <td>${list[i].category}</td>
       <td>${list[i].description}</td>
       <td><button class="btn btn-warning" onclick = "showItemData(${i})">Update</button></td>
       <td><button class="btn btn-danger" onclick = "deleteItem(${i})">Delete</button></td>
   </tr>`  
    }
    
   document.getElementById("tableData").innerHTML = cartona

}