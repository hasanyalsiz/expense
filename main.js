//? HTML'den gelen elemanlar
const nameInput = document.getElementById("name-input");
const pricetInput = document.getElementById("price-input");
const addBtn = document.querySelector("#add-btn");
const listArea = document.getElementById("list");
const statusCheckbox = document.getElementById("status-check");
const sumInfo = document.getElementById("sum-info");
const deleteBtn = document.getElementById("delete");
const userInput = document.getElementById("user-input");
const select = document.querySelector("select");

//? izlediğimiz olaylar
addBtn.addEventListener("click", addExpense);
listArea.addEventListener("click", handleUpdate);
userInput.addEventListener("input", saveUser);
document.addEventListener("DOMContentLoaded", getUser);
select.addEventListener("change", handlFilitre);

//toplam değeri burada tutacağız
let sum = 0;
function updateSum(price) {
  //js deki toplam değeri güncelle
  sum += Number(price);

  // html deki toplam alanını güncelleme
  sumInfo.innerHTML = sum;
}

//eventListener ile çalıştırılan fonksiyonlar
//olay hakkında bilgileri içeren bir parametre gider.
function addExpense(event) {
  //sayfayı yenilemeyi engelle
  event.preventDefault();

  //inputların birinin değeri bile boş ise fonksiyonu durdur

  if (!nameInput.value || !pricetInput.value) {
    alert("boş olamaz");
    return;
  }

  //? inputlar dolu ise bir card olustur ve html gönder
  //a-div oluşturma
  const expenseDiv = document.createElement("div");

  //b- dive class ekleme
  expenseDiv.classList.add("expense");

  //eğer ki odendi checbox tıklandı ise ödendi claas ı ekle

  if (statusCheckbox.checked === true) {
    expenseDiv.classList.add("payed");
  }

  //c- iceriği html belirleme
  expenseDiv.innerHTML = `
      <h2 class="name">${nameInput.value}</h2>
      <h2 class="price">${pricetInput.value}</h2>
      <div class="btns">
        <img  id="edit" src="images/pay-icon.png" >
        <img id="delete" src="images/delete-icon.png" >
       </div>
 `;

  //d- oluşan elamanı HTML gönderme
  listArea.appendChild(expenseDiv);

  // toplam alanı güncellem
  updateSum(pricetInput.value);

  // ? formu temizle
  nameInput.value = "";
  pricetInput.value = "";
  statusCheckbox.checked = false;
}

//? listedeki elamana tıklayınca çalışır

function handleUpdate(event) {
  //tıklanılan elemen
  const ele = event.target;

  //yanlızca silme işleminde çalışacak kod

  //silme resminin kapsayıcısına erişme

  const parent = ele.parentElement.parentElement;

  if (ele.id == "delete") {
    //elementi silme
    parent.remove();

    //TOPLAM BİLGİSİNİ GÜNCELLEME
    const price = parent.querySelector(".price").textContent;
    updateSum(Number(price * -1));
  }

  //elemanın id si edit ise tersine cevir
  if (ele.id === "edit") {
    parent.classList.toggle("payed");
  }
}

//? kullanıcıyı local e kaydetme

function saveUser(event) {
  localStorage.setItem("username", event.target.value);
}

//?kullanıcı local de varsa onu alma

function getUser() {
  //local de ismi al /kaydedilmemiş ise null yrine " olsun"
  const username = localStorage.getItem("username") || "";

  //kullanıcı ismini inputa aktar
  userInput.value = username;
}

// filtreleme kısmı
function handlFilitre(event) {
  const selected = event.target.value;
  const items = list.childNodes;

  // bütün elemanları dönme
  items.forEach((item) => {
    // selecetd alabilceği değerleri izleme
    switch (selected) {
      case 'all':
        // hepsini göster
        item.style.display = 'flex';
        break;

      case 'payed':
        //  elema payed class'ına sahipse onu göster değilse gizle
        if (item.classList.contains('payed')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
        break;

      case 'not-payed':
        //  elema payed class'ına sahip değilse onu göster değilse gizle
        if (!item.classList.contains('payed')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
        break;
    }
  });
}