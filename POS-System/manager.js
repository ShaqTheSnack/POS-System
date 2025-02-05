var db = new PouchDB('ProductList');
const userPassword = '';

addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("PasswordBtn").click();
    }
});

document.getElementById("PasswordBtn").addEventListener("click", function () {
    const userInput = document.getElementById("myInput").value;

    if (userInput === userPassword) {
        document.getElementById("PBox").style.display = "none";
        document.getElementById("VBox").style.display = "contents";
        document.getElementById("AddBtn").style.display = "contents";
    } else {
        alert("Incorrect Password");
    }
});

async function addProduct() {
    const vBox = document.getElementById('VBox');
    const newGroup = document.createElement('div');
    newGroup.classList.add('group');

    const groupId = `group-${Date.now()}`;
    newGroup.setAttribute('data-id', groupId);

    newGroup.innerHTML = `
        <select name="category">
            <option value="" disabled selected>Vælg en kategori</option>
            <option value="Food">Food</option>
            <option value="Beverage">Beverage</option>
            <option value="Drink">Drink</option>
            <option value="Goody">Goody</option>
            <option value="Misc">Misc</option>
        </select>
        <input type="text" minlength="2" placeholder="Name" class="group-input">
        <input type="number" name="price" min="1" placeholder="Price" class="group-input">
        <input type="number" name="amount" min="1" placeholder="Amount" class="group-input">
        <input type="checkbox" name="isHidden">
        <label class="hidden"> Hidden</label><br>
        <button class="RemoveButton">Slet</button>
    `;

    vBox.appendChild(newGroup);

    newGroup.querySelector('.RemoveButton').addEventListener('click', function () {
        removeProduct(newGroup);
    });
}

async function saveProduct() {
    const vBox = document.getElementById("VBox");
    let doc = null;

    try {
        doc = await db.get('product');
    } catch (e) {
        console.log("Could not fetch the Products document");
        doc = {
            _id: "product",
            products: []
        };
    }

    vBox.querySelectorAll('.group').forEach(group => {
        const category = group.querySelector('select[name="category"]').value;
        const itemName = group.querySelector('input[type="text"]').value.trim();
        const itemPrice = group.querySelector('input[name="price"]').value;
        const itemAmount = group.querySelector('input[name="amount"]').value;
        const isHidden = group.querySelector('input[name="isHidden"]').checked;

        if (itemName && itemPrice && itemAmount) {
            const index = Array.from(vBox.children).indexOf(group);
            if (index !== -1) {
                doc.products[index] = {
                    "Category": category,
                    "Name": itemName,
                    "Price": itemPrice,
                    "Amount": itemAmount,
                    "Hidden": isHidden
                };
            }
        }
    });

    console.log("Loaded revision " + doc._rev);

    try {
        const result = await db.put(doc);
        console.log("Products saved successfully with revision: " + result.rev);
    } catch (e) {
        console.error("Error saving document:", e);
    }
}

async function retrieveAndDisplayProducts() {
    try {
        const doc = await db.get('product');
        const products = doc.products || [];

        const container = document.getElementById('VBox');
        container.innerHTML = '';

        products.forEach((product, index) => {
            const newGroup = document.createElement('div');
            newGroup.classList.add('group');

            newGroup.innerHTML = `
                <select name="category">
                    <option value="" disabled>Select a category</option>
                    <option value="Food" ${product.Category === "Food" ? "selected" : ""}>Food</option>
                    <option value="Beverage" ${product.Category === "Beverage" ? "selected" : ""}>Beverage</option>
                    <option value="Drink" ${product.Category === "Drink" ? "selected" : ""}>Drink</option>
                    <option value="Goody" ${product.Category === "Goody" ? "selected" : ""}>Goody</option>
                    <option value="Misc" ${product.Category === "Misc" ? "selected" : ""}>Misc</option>
                </select>
                <input type="text" minlength="2" placeholder="Name" class="group-input" value="${product.Name}">
                <input type="number" name="price" min="1" placeholder="Price" class="group-input" value="${product.Price}">
                <input type="number" name="amount" min="1" placeholder="Amount" class="group-input" value="${product.Amount}">
                <input type="checkbox" name="isHidden" ${product.Hidden ? "checked" : ""}>
                <label class="hidden"> Hidden</label>
                <button class="RemoveButton">Slet</button>
            `;

            container.appendChild(newGroup);

            newGroup.querySelector('.RemoveButton').addEventListener('click', function () {
                removeProduct(newGroup);
            });
        });

    } catch (e) {
        console.error("Error retrieving the document:", e);
    }
}

async function removeProduct(productGroup) {
    try {
        const doc = await db.get('product');
        const container = document.getElementById('VBox');
        const index = Array.from(container.children).indexOf(productGroup);

        if (index !== -1) {
            doc.products.splice(index, 1);

            await db.put(doc);
            console.log('Product removed successfully');

            productGroup.remove();
        }
    } catch (error) {
        console.error('Error removing product:', error);
    }
}

window.onload = retrieveAndDisplayProducts;
