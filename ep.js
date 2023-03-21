async function saveToLocalStorage(event) {
    event.preventDefault();
    const expenseValue = event.target.exp.value;
    const description = event.target.descr.value;
    const category = event.target.categ.value;
    const obj = {
      expenseValue: expenseValue,
      description: description,
      category: category,
    };
    try {
      let response = await axios.post(
        "https://crudcrud.com/api/68c1e5581398491b8cf89473e6c5a03d/expenseTrackerData",
        obj
      );
      showOnScreen(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  window.addEventListener("DOMContentLoaded", async () => {
    try {
      let response = await axios.get(
        "https://crudcrud.com/api/68c1e5581398491b8cf89473e6c5a03d/expenseTrackerData"
      );
      console.log(response);
      for (let i = 0; i < response.data[i]; i++) {
        showOnScreen(response.data[i]);
      }
    } catch (error) {
      console.log(error);
    }
  });
  function showOnScreen(user) {
    const parentNode = document.getElementById("listOfUser");
    const childHTML = `<li id=${user._id}> ${user.expenseValue} - ${user.description} - ${user.category} 
    <button onclick=editUserDeatils('${user.description}','${user.expenseValue}','${user.category}','${user._id}')>Edit Expense</button> <button onclick=deleteUser('${user._id}')>Delete Expense</button> </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }  
  function editUserDeatils(descr, exp, categ, userId) {
    console.log(descr, categ, userId);
    document.getElementById("descr").value = descr;
    document.getElementById("exp").value = exp;
    document.getElementById("categ").value = categ;
    deleteUser(userId);
  }  
  async function deleteUser(userId) {
    try {
      let response = await axios.delete(
        `https://crudcrud.com/api/68c1e5581398491b8cf89473e6c5a03d/expenseTrackerData/${userId}`
      );
      removeUserFromScreen(userId);
    } catch (error) {
      console.log(error);
    }
  }  
  function removeUserFromScreen(descr) {
    const parentNode = document.getElementById("listOfUser");
    const childNodeToBeDeleted = document.getElementById(descr);
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }