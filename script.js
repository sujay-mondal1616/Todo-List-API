//**project */
let mainContainer = document.querySelector(".mainContaner");

let taskInput = document.querySelector("#taskInput");

let addBtn = document.querySelector(".addBtn");

let todoContainer = document.querySelector(".todoContainer");

let todo = document.querySelector(".todo");

// let deleteBtn = document.querySelector(".delited");

let editBtn = document.querySelector(".edit");

let API = "https://6afef49f3a0e70bc8d544d6c.mockapi.io/todos";

addBtn.addEventListener("click", function () {
  postData();
});

async function fetechData() {
  let respons = await fetch(API);
  let deta = await respons.json();

  if (deta) {
    todoContainer.innerHTML = "";

    deta.forEach((obj) => {
      let div = document.createElement("div");
      div.className = "todo";
      div.innerHTML = `
 <p class ='paraText'>${obj.text}</p>
 <input id="editInput" type="text" placeholder="Enter your task... "  value ='${obj.text}'/>
 <div class="btnContner">
            <button class="delited">Deleted</button>
            <button class="edit">Edit</button>
          <button class="saveBtn" style="display: none;">Save</button>
</div>
`;

      let deletedBtn = div.querySelector(".delited");
      let edit = div.querySelector(".edit");
      let saveBtn = div.querySelector(".saveBtn");
      let paraText = div.querySelector(".paraText");
      let editInput = div.querySelector("#editInput");

      deletedBtn.addEventListener("click", () => {
        // console.log(obj.id)
        deletDeta(obj.id);
      });

      edit.addEventListener("click", () => {
        // console.log(obj.id)
        edit.style.display = "none";
        saveBtn.style.display = "inline";
        paraText.style.display = "none";
        editInput.style.display = "inline";
      });

      // saveBtn.addEventListener("click", async () => {
      //   // console.log(obj.id)
      //   let editValue = editInput.value;
      //   let respons = await updateData(obj.id, editValue);
      //   if (respons.status === 200) {
      //     edit.style.display = "inline";
      //     saveBtn.style.display = "none";
      //     paraText.style.display = "inline";
      //     editInput.style.display = "none";
      //     fetechData()
      //   }
      // });

      //*GPT

      saveBtn.addEventListener("click", async () => {
        let editValue = editInput.value;

        let respons = await updateData(obj.id, editValue);

        if (respons.status === 200) {
          fetechData();
        }
      });

      todoContainer.append(div);
    });
  }
}

async function postData() {
  let value = taskInput.value;
  // console.log(value)

  let objData = {
    text: value.trim(),
  };

  let respons = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objData),
  });
  //   let deta = await respons.json()
  // console.log(respons)

  if (respons.status === 200) {
    fetechData();
  }
}

async function updateData(id, value) {
  // let value = taskInput.value;
  console.log(id, value);

  let objData = {
    text: value.trim(),
  };

  let respons = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objData),
  });

  return respons;

  //   let deta = await respons.json()
  // console.log(respons)

  // if (respons.status === 200) {
  //   fetechData();
  // }
}

async function deletDeta(id) {
  // console.log(id)
  let respons = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (respons.status === 200) {
    fetechData();
  }
}
fetechData();
