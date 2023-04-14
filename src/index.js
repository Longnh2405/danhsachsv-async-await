const api_students = "http://localhost:3000/students";
const api_classList = "http://localhost:3000/classList";
const list_student = document.querySelector("#list_student");
const addName = document.querySelector("#name");
const addClass = document.querySelector("#class");
const addBtn = document.querySelector("#AddBtn");
// axios
async function getstudent() {
  let student = await fetch(api_students).then((respone) => {
    return respone.json();
  });
  let class_list = await fetch(api_classList).then((respone) => {
    return respone.json();
  });
  renderStudent(student, class_list);
}
getstudent();
function renderStudent(students, class_list) {
  let html = students.map((student) => {
    let class_l = class_list.find((value) => {
      return value.id == student.classId;
    });
    console.log(class_l);
    return `
        <tr>
          <td>${student.id}</td>
          <td>${student.name}</td>
          <td>${class_l.name}</td>
          <td>
            <button id="updBtn" onclick="updBtn(${student.id}, '${student.name}', '${student.classId}')">Sửa</button> <br />
            <button id="deletBtn" onclick="deletBtn(${student.id})">Xoá</button>
          </td>
        </tr>
  `;
  });
  list_student.innerHTML = html.join("");
}
addBtn.onclick = async (e) => {
  data = {
    name: addName.value,
    classId: addClass.value,
  };
  option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(api_students, option).then((respone) => {
    return respone.json();
  });
};
async function deletBtn(id) {
  option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(api_students + "/" + id, option).then((respone) => {
    return respone.json();
  });
}

async function updBtn(id, name, class_) {
  addName.value = name;
  addClass.value = class_;
  addBtn.innerHTML = "Lưu";
  addBtn.onclick = async () => {
    let data = {
      name: addName.value,
      classId: addClass.value,
    };
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetch(api_students + "/" + id, options).then(function (response) {
      return response.json();
    });
  };
}
