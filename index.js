
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js';

const appSettings = {
    databaseURL: "FireBaseDBURLHere",
};


const app = initializeApp(appSettings);
const database = getDatabase(app);
const datainDB = ref(database, 'shopping-cart-data');
onValue(datainDB, function (data) {
    clearText();
    clearList();
    if (data.exists()) {
        const dataArray = Object.entries(data?.val());
        if (dataArray.length) {
            dataArray?.map(i => {
                addToList(i);
            });
        }
    } else {
        noItemsFoundError();
    }


});
const textBox = document.getElementById('shopping_list_item');
const button = document.getElementById('add_to_cart');
const list = document.getElementById('shopping-list');
button.addEventListener('click', () => {
    let textBoxValue = textBox.value;
    if (textBox.value !== '' && textBox.value !== null) {
        push(datainDB, textBoxValue);
    }

});


const addToList = (textBoxValue) => {
    let newElement = document.createElement('li');
    const key = textBoxValue[0];
    const val = textBoxValue[1];
    newElement.textContent = val;
    list.append(newElement);
    newElement.addEventListener('click', () => {
        const exactURLLocation = ref(database, `shopping-cart-data/${key}`);
        if (exactURLLocation) {
            remove(exactURLLocation);
        }

    });
};
const noItemsFoundError = () => {
    list.innerHTML = '<p class="center">No items here yet..</p>';
};

const clearText = () => {
    textBox.value = "";
};
const clearList = () => {
    list.innerHTML = '';
};