console.log("All The Data Here!")
var take_input=document.getElementById("take_input")
var take_input_key=document.getElementById("take_input_key")
var take_ttl=document.getElementById("take_ttl")
var save_value=document.getElementById("save_value")
var localstorage_value=document.getElementById("localstorage_value")
var error_value=document.getElementById("error_value")
var read_localstorage=document.getElementById("read_localstorage")
var delete_data=document.getElementById("delete_data")
var read_all_data=document.getElementById("read_all_data")
var localstorage_value=document.getElementById("localstorage_value")

save_value.addEventListener("click", () => {
    if(take_ttl.value == false){
        if(!(localStorage.getItem(take_input_key.value))){
            localStorage.setItem(take_input_key.value,JSON.stringify(take_input.value));
        }
        else{
            error_value.textContent = "Error: Key Already Exists"
        }
    }
    else{
         if(!(localStorage.getItem(take_input_key.value))){
                setWithExpiry(take_input_key.value, JSON.stringify(take_input.value), (take_ttl.value)*1000)
            }
        else{
                error_value.textContent = "Error: Key Already Exists"   
            }
    }
})

read_localstorage.addEventListener("click", () => {
    var value = getWithExpiry(take_input_key_read.value)
    localstorage_value.textContent = value
})

function getWithExpiry(key) {
    var itemStr = localStorage.getItem(key)
    if (!itemStr) {
        return "Key does not exist"
    }
    if(take_ttl.value == false){
        return itemStr
    }
    var item = JSON.parse(itemStr)
    var now = new Date()
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
        return "Item does not exist"
    }
    return item.value
}

delete_data.onclick=function(){
    if(!(localStorage.getItem(take_input_key_delete.value))){
        on_delete_value.textContent = "Key Does Not Exist"
    }
    else{
    localStorage.removeItem(take_input_key_delete.value)
    on_delete_value.textContent = "Key Deleted"
    }
}

function setWithExpiry(key, value, ttl) {
    const now = new Date()
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

read_all_data.onclick=function(){
    var keys=Object.keys(localStorage);
    console.log(keys);
    for(var key of keys){
        console.log("Key : "+key+" : Value : "+localStorage.getItem(key));
    }
}