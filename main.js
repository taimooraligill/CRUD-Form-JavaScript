// Select All necessary elements
const form = document.querySelector("form")
const submitBtn = document.querySelector("#submit__btn")
const alert__msg = document.querySelector("#alert__msg")
const tableBody = document.querySelector("table tbody")
let prevData = null;


// Show Alert Message
const showAlert = (msg, type) => {
    alert__msg.innerText = msg
    alert__msg.classList.add(type)
    
    setTimeout(() => {
        alert__msg.innerText = ""
        alert__msg.classList.remove(type)
    }, 3000)
}


// Clear all fields
const clearFields = () => {
    form.name.value = ""
    form.age.value = ""
    form.email.value = ""
    form.address.value = ""
}

// Delete Data
tableBody.addEventListener("click", (e) => {

    let target = e.target
    
    if(target.classList.contains("delete")) {
        target.parentElement.parentElement.remove()
        showAlert("Data deleted successfully!", "success")

    }
})


form.addEventListener("submit", (e) => {
    e.preventDefault()


    const name = form.name.value
    const age = form.age.value
    const email = form.email.value
    const address = form.address.value

    // validate the form input
    if(name.trim() == "" || age.trim() == "" || email.trim() == "" || address.trim() == ""){
        showAlert("All fields are required!", "error")
        clearFields()
        return false;
    } else {
        
        const row = document.createElement("tr")

        if(prevData == null) {
            
            row.innerHTML += `
                <td>${name}</td>
                <td>${age}</td>
                <td>${email}</td>
                <td>${address}</td>
                <td class="action__btn">
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            `
    
            prevData = null
            tableBody.appendChild(row)
            showAlert("Info submitted successfully!", "success")
            clearFields()
        } else {

            prevData.children[0].innerText = name    
            prevData.children[1].innerText = age    
            prevData.children[2].innerText = email    
            prevData.children[3].innerText = address   
        }


    }

})

// Edit Data
tableBody.addEventListener("click", (e) => {
    let target = e.target;
    
    if (target.classList.contains("edit")) {
      submitBtn.innerText = "Update Info";
      submitBtn.style.backgroundColor = "green";
      
      prevData = target.parentElement.parentElement;
      form.name.value = prevData.children[0].innerText;
      form.age.value = prevData.children[1].innerText;
      form.email.value = prevData.children[2].innerText;
      form.address.value = prevData.children[3].innerText;
      prevData.style.textDecoration = 'line-through';
    }
  });
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = form.name.value;
    const age = form.age.value;
    const email = form.email.value;
    const address = form.address.value;
    prevData.style.textDecoration = '';
    
    // validate the form input
    if (name.trim() == "" || age.trim() == "" || email.trim() == "" || address.trim() == "") {
      showAlert("All fields are required!", "error");
      clearFields();
      return false;
    } else {
      if (prevData !== null) {
        // Update existing row
        prevData.children[0].innerText = name;
        prevData.children[1].innerText = age;
        prevData.children[2].innerText = email;
        prevData.children[3].innerText = address;
        showAlert("Info updated successfully!", "success");
        clearFields();
        prevData = null;

        // Reset submit button
      submitBtn.innerText = "Submit";
      submitBtn.style.backgroundColor = "";
      
      } else {
        // Create new row
        const row = document.createElement("tr");
        row.innerHTML += `
          <td>${name}</td>
          <td>${age}</td>
          <td>${email}</td>
          <td>${address}</td>
          <td class="action__btn">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
        showAlert("Info submitted successfully!", "success");
        clearFields();
      }
    }
  });