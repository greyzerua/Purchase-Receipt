let productCounter = 1;
let totalSum = 0;

const allProducts = [];

let block = document.createElement('div')
let productTable;
let productTableBody;

block.classList.add('main-block')
document.body.append(block)

let mainTitle = document.createElement('h1')
mainTitle.textContent = 'Чек покупки'
mainTitle.classList.add('main-title')

function getInput(placeholder, type, classIpnut) {
    let input = document.createElement('input')
    input.placeholder = placeholder
    input.type = type
    input.classList = classIpnut
    return input
}

function getBlock(className) {
    let blockInp = document.createElement('div')
    blockInp.classList.add(className);
    return blockInp
}

function getBtn(btnName, classBtn) {
    let btn = document.createElement('button')
    btn.textContent = btnName
    btn.classList = classBtn
    return btn
}

const getTableBody = () => {
    return document.createElement('tbody')
};

const createProduct = () => {
    let nameValue = productNameInput.value.trim()
    let quantityValue = Number(quantityInput.value.trim())
    let priceValue = Number(priceInput.value.trim())
    let newProduct = {
        name: nameValue,
        quantity: quantityValue,
        price: priceValue
    };
    if (!nameValue ||  !quantityValue || !priceValue) {
        return
    }
    
    allProducts.push(newProduct);
    console.log(allProducts);

    renderTable(allProducts);

    productNameInput.value = ''
    quantityInput.value = ''
    priceInput.value = ''
   
};

function getTable() {
    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let tr = document.createElement('tr')

    let numberTd = document.createElement('td')
    numberTd.textContent = '№'
    numberTd.classList.add('cell-name')

    let nameTd = document.createElement('td')
    nameTd.textContent = 'Назва'
    nameTd.classList.add('cell-name')

    let quantityTd = document.createElement('td')
    quantityTd.textContent = 'Кіль-сть'
    quantityTd.classList.add('cell-name')
    let priceTd = document.createElement('td')
    priceTd.textContent = 'Ціна'
    priceTd.classList.add('cell-name')
    let totalPriceTd = document.createElement('td')
    totalPriceTd.textContent = 'Загальна сума'
    totalPriceTd.classList.add('cell-name')
    let settingsTd = document.createElement('td')
    settingsTd.textContent = 'Налаштування'
    settingsTd.classList.add('cell-name')
    tr.append(numberTd, nameTd, quantityTd, priceTd, totalPriceTd, settingsTd)
    thead.append(tr)
    table.append(thead)
    block.append(table)
    
    return table
}

function deleteItem(index) {
    allProducts.splice(index, 1)
    renderTable(allProducts)
}
const changeItem = (index) => {
    allProducts[index] = {
        name: prompt("Введіть назву товару"),
        quantity: Number(prompt("Введіть кількість товару")),
        price: Number(prompt("Введіть ціну товару"))
    };
    renderTable(allProducts);
    console.log('changed', allProducts);
};

function getProductTr(index, product) {
    let tr = document.createElement('tr')
    let numberTd = document.createElement('td') // Создаем ячейку для номера
    numberTd.classList.add('cell-product')
    numberTd.textContent = index + 1; // Устанавливаем номер продукта
    let nameTd = document.createElement('td')
    nameTd.classList.add('cell-product')
    let quantityTd = document.createElement('td')
    quantityTd.classList.add('cell-product')
    let priceTd = document.createElement('td')
    priceTd.classList.add('cell-product')
    let totalPriceTd = document.createElement('td')
    totalPriceTd.classList.add('cell-product')
    let settingsTd = document.createElement('td')
    settingsTd.classList.add('cell-product')
    let changeButton = getBtn('Змінити', 'table-btn')
    let deleteButton = getBtn('Видалити', 'table-btn__color')
    settingsTd.append(changeButton, deleteButton);
    nameTd.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1);
    quantityTd.textContent = product.quantity
    priceTd.textContent = product.price +' грн'
    totalPriceTd.textContent = product.price * product.quantity + ` грн`
    changeButton.onclick = () => {
        changeItem(index);
    }
    deleteButton.onclick = () => {
        deleteItem(index);
    }
    tr.append(numberTd, nameTd, quantityTd, priceTd, totalPriceTd, settingsTd)
    
    return tr
}
let productNameInput = getInput('Назва товару', 'text', 'main-input')
let quantityInput = getInput('Кількість', 'number', 'main-input')
let priceInput = getInput('Ціна', 'number', 'main-input')
let createButton = getBtn('Додати', 'main-btn')
let blockInp = getBlock('block-input')

block.append(mainTitle, blockInp)
blockInp.append(productNameInput, quantityInput, priceInput, createButton)

productNameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        createProduct();
    }
});
quantityInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        createProduct();
    }
});
priceInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        createProduct();
    }
});

const renderTable = (products) => {
    if (products.length > 0) {
        if (typeof productTable === 'undefined') {
            productTable = getTable();
        }
        if (productTableBody) {
            productTableBody.remove();
        }
        productTableBody = getTableBody();

        for (let i = 0; i < products.length; i++) {
            const productRow = getProductTr(i, products[i]);
            productTableBody.append(productRow)
        }
        productTable.append(productTableBody);
    } else {
        productTableBody.remove();
        productTable.remove();
        productTableBody = undefined;
        productTable = undefined;
    }
};

createButton.onclick = () => {
    createProduct();
}