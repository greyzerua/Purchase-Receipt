
let productCounter = 1;
let totalSum = 0;
let allProducts = [];

let block = document.createElement('div')
let productTable;
let productTableBody  = document.createElement('div');
productTableBody.classList.add('table-container')

let textBlock;
let totalBlock;
block.classList.add('main-block')
document.body.append(block)

let mainTitle = document.createElement('h1')
mainTitle.textContent = 'Чек покупки'
mainTitle.classList.add('main-title')

function getInput(placeholder, type, ...classes) {
    let input = document.createElement('input')
    input.placeholder = placeholder
    input.type = type
    classes.forEach(className => {
        input.classList.add(className);
    });
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

    saveProductsToLocalStorage();
};

function getTableHeaders() {
    let numberTd = document.createElement('div')
    numberTd.textContent = '№'
    numberTd.classList.add('table-cell')

    let nameTd = document.createElement('div')
    nameTd.textContent = 'Назва'
    nameTd.classList.add('table-cell')

    let quantityTd = document.createElement('div')
    quantityTd.textContent = 'Кіль-сть'
    quantityTd.classList.add('table-cell')
    let priceTd = document.createElement('div')
    priceTd.textContent = 'Ціна'
    priceTd.classList.add('table-cell')
    let totalPriceTd = document.createElement('div')
    totalPriceTd.textContent = 'Загальна сума'
    totalPriceTd.classList.add('table-cell')
    let settingsTd = document.createElement('div')
    settingsTd.textContent = 'Налаштування'
    settingsTd.classList.add('table-cell')
    
    productTableBody.append(numberTd, nameTd, quantityTd, priceTd, totalPriceTd, settingsTd)

}

function deleteItem(index) {
    allProducts.splice(index, 1);
    saveProductsToLocalStorage();
    renderTable(allProducts);
}

const changeItem = (index) => {

   getModalWindow(index)
};
function getModalWindow(index) {
    let modalBlock = document.createElement('div')
    modalBlock.classList.add('modal-block', 'fade-in')
    let iconBlock = document.createElement('div')
    iconBlock.classList.add('icon-block');
    let closeIcon = document.createElement('i')
    closeIcon.classList.add('fas', 'fa-times');
    let overlay = document.createElement('div')
    overlay.classList.add('overlay', 'fade-in')

    let productToEdit = allProducts[index];

    let modalProductNameInput = getInput('Назва товару', 'text', 'main-input', '.modal-main__input')
    let modalQuantityInput = getInput('Кількість', 'number','main-input', '.modal-main__input')
    let modalPriceInput = getInput('Ціна', 'number', 'main-input', '.modal-main__input')
    let modalCreateButton = getBtn('Зберегти', 'main-btn', 'modal-main__input')
    let modalblockInp = getBlock('modal-block__input')

    modalProductNameInput.value = productToEdit.name;
    modalQuantityInput.value = productToEdit.quantity;
    modalPriceInput.value = productToEdit.price;

    modalCreateButton.onclick = () => {
    const editedProductName = modalProductNameInput.value.trim();
    const editedQuantity = Number(modalQuantityInput.value.trim());
    const editedPrice = Number(modalPriceInput.value.trim());

    allProducts[index].name = editedProductName;
    allProducts[index].quantity = editedQuantity;
    allProducts[index].price = editedPrice;

    
    renderTable(allProducts);
    
    modalBlock.classList.remove('show');
    overlay.classList.remove('show');
    setTimeout(() => {
        modalBlock.remove(); 
        overlay.remove();    
        document.body.classList.remove('modal-open');
    }, 100); 
    }
    setTimeout(() => {
        modalBlock.classList.add('show');
        overlay.classList.add('show')
    }, 10);
    closeIcon.onclick = () => {
        modalBlock.classList.remove('show');
        overlay.classList.remove('show');
        setTimeout(() => {
            modalBlock.remove(); 
            overlay.remove();    
            document.body.classList.remove('modal-open');
        }, 100); 
    }
    modalBlock.append(closeIcon,iconBlock, modalblockInp)
    modalblockInp.append(modalProductNameInput, modalQuantityInput, modalPriceInput, modalCreateButton)
    iconBlock.append(closeIcon)
    block.append(modalBlock)
    document.body.classList.add('modal-open');
    document.body.append(overlay)
}
function getTableMobile(index, product) {
    let card = document.createElement('div')
    card.classList.add('table-container__mobile')
    let numberTd = document.createElement('div')
    numberTd.textContent = '№:'
    numberTd.classList.add('table-cell__mobile')

    let nameTd = document.createElement('div')
    nameTd.textContent = 'Назва:'
    nameTd.classList.add('table-cell__mobile')

    let quantityTd = document.createElement('div')
    quantityTd.textContent = 'Кіль-сть:'
    quantityTd.classList.add('table-cell__mobile')

    let priceTd = document.createElement('div')
    priceTd.textContent = 'Ціна:'
    priceTd.classList.add('table-cell__mobile')

    let totalPriceTd = document.createElement('div')
    totalPriceTd.textContent = 'Загальна сума:'
    totalPriceTd.classList.add('table-cell__mobile')

    let settingsTd = document.createElement('div')
    settingsTd.classList.add('table-cell__mobile')

    let number = document.createElement('div') 
    number.classList.add('cell-product__mobile')
    number.textContent = index + 1;

    let name = document.createElement('div')
    name.classList.add('cell-product__mobile')

    let quantity = document.createElement('div')
    quantity.classList.add('cell-product__mobile')

    let price = document.createElement('div')
    price.classList.add('cell-product__mobile')

    let totalPrice = document.createElement('div')
    totalPrice.classList.add('cell-product__mobile')

    let settings = document.createElement('div')
    settings.classList.add('cell-product__mobile')
    settings.classList.add('cell-product__btn')
    let changeButton = getBtn('Змінити', 'table-btn')
    let deleteButton = getBtn('Видалити', 'table-btn__color')

    numberTd.append(number)
    nameTd.append(name)
    quantityTd.append(quantity)
    priceTd.append(price)
    totalPriceTd.append(totalPrice)
    settingsTd.append(settings)
    settings.append(changeButton, deleteButton);

    name.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1);
    quantity.textContent = product.quantity
    price.textContent = product.price +' грн'
    totalPrice.textContent = product.price * product.quantity + ` грн`
    changeButton.onclick = () => {
     changeItem(index);
    }
    deleteButton.onclick = () => {
        deleteItem(index);
    }

    card.append(numberTd, nameTd, quantityTd, priceTd, totalPriceTd, settingsTd)
    productTableBody.append(card)
}


function getProductTr(index, product) {
    let numberTd = document.createElement('div') 
    numberTd.classList.add('cell-product')
    numberTd.textContent = index + 1; 
    let nameTd = document.createElement('div')
    nameTd.classList.add('cell-product')
    let quantityTd = document.createElement('div')
    quantityTd.classList.add('cell-product')
    let priceTd = document.createElement('div')
    priceTd.classList.add('cell-product')
    let totalPriceTd = document.createElement('div')
    totalPriceTd.classList.add('cell-product')
    let settingsTd = document.createElement('div')
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
    productTableBody.append(numberTd, nameTd, quantityTd, priceTd, totalPriceTd, settingsTd)
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

const getTotalElem = (allTotalPrice) => {
    let totalBlock = document.createElement('div')
    totalBlock.classList.add('total-block')
    let totalText = document.createElement('h2')
    totalText.classList.add('total-text')
    totalText.textContent = 'Підсумкова вартість : ';
    
    let totalPriceText = document.createElement('h2')
    totalPriceText.textContent = allTotalPrice  + ' грн'
    totalPriceText.classList.add('total-text')

    totalBlock.append(totalText, totalPriceText)
    return totalBlock;
}

const renderElements = (products) => {
    let allTotalPrice = 0;

    const isMobile = document.body.clientWidth <= 600;

    if (!isMobile) {
        getTableHeaders();
    }

    for (let i = 0; i < products.length; i++) {
        if (!isMobile) {
            getProductTr(i, products[i]);
        } else {
            getTableMobile(i, products[i]);
        }
        allTotalPrice += products[i].price * products[i].quantity;
    }

    totalBlock = getTotalElem(allTotalPrice);
    block.append(totalBlock)
};

const renderTable = (products) => {
    productTableBody.innerHTML = '';

    if (textBlock) {
        textBlock.remove();
        textBlock = undefined;
    }
    if (totalBlock) {
        totalBlock.remove();
        totalBlock = undefined;
    }
    if (products.length > 0) {
        renderElements(products)
    } else {
        textBlock = document.createElement('h2')
        textBlock.textContent = 'Товари не додані'
        textBlock.classList.add('text-block')
        block.append(textBlock)
    }
       
};

createButton.onclick = () => {
    createProduct();    
}

renderTable(allProducts);
block.append(productTableBody)

window.addEventListener("resize", () => {
    renderTable(allProducts);
});

// Загрузка списка продуктов из локального хранилища при загрузке страницы
window.addEventListener('load', () => {
    let savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        allProducts = JSON.parse(savedProducts);
        renderTable(allProducts);
    }
});

// Функция для сохранения списка продуктов в локальном хранилище
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(allProducts));
}
