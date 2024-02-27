// Datos del inventario
const inventoryData = [
    "C cardamom",
    "C Coffee beans",
    "C decaf",
    "C saudi coffee",
    "Heineken",
    "LYRES AMERICAN MALT",
    "LYRES APERITIF ROSSO",
    "LYRES COFFEE ORIGINALE",
    "LYRES DARK CANE",
    "LYRES DRY LONDON",
    "LYRES ITALIAN ORANGE",
    "LYRES ITALIAN SPRITZ",
    "LYRES SPICED CANE",
    "LYRES WHITE CANE",
    "M Almond barista",
    "M coconut",
    "M Cream",
    "M Full fat barista",
    "M lacto free",
    "M Low fat",
    "M skimmed",
    "M soya",
    "pureé blood orange",
    "pureé mango",
    "pureé pasion fruit",
    "pureé peach",
    "pureé raspberry",
    "pureé yuzu",
    "Rose water",
    "S Blue agave",
    "S elderflower",
    "S hazelnut sweetbird",
    "S HERSHEY'S CARAMEL",
    "S HERSHEY'S CHOCOLATE",
    "S Le Fruit de MONIN Coconut",
    "S MONIN caramel",
    "S MONIN Coconut",
    "S MONIN granadine",
    "S MONIN hazelnut",
    "S MONIN pasion fruit",
    "S MONIN peach",
    "S MONIN raspberry",
    "S MONIN vainilla",
    "SD 7up",
    "SD 7up can",
    "SD Aqua panna 500ml",
    "SD Aqua panna 750ml",
    "SD EIRA 400ml",
    "SD FEVER-TREE rose-raspberry",
    "SD Ginger Ale",
    "SD Mirinda",
    "SD Pepsi",
    "SD pepsi light",
    "SD Red Bull",
    "SD Red Bull no sugar",
    "SD san peregrino big",
    "SD san peregrino small",
    "SD Senxup ginger beer",
    "SD Senxup silicianlemon",
    "SW BELLA classy white",
    "SW Bella gold",
    "SW Bella red",
    "SW Bella rose",
    "SW El legado red grape",
    "SW El legado white",
    "SW Le Petit Béret Blanc de Blanc",
    "SW Le Petit Béret MUSCAT DOUX",
    "SW legero delicate aromatic",
    "SW legero smoothy fruity",
    "SW LYRES CLASIC",
    "SW PETIT BERET virgin rose",
    "SW vindara",
    "SW vindara rose",
    "tomato juice"
];

// Función para crear la lista de productos con inputs
function createProductList() {
    const productList = document.getElementById("product-list");

    inventoryData.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const productName = document.createElement("span");
        productName.textContent = product;

        const inBarInput = document.createElement("input");
        inBarInput.type = "number";
        inBarInput.placeholder = "Bar";

        const inStorageInput = document.createElement("input");
        inStorageInput.type = "number";
        inStorageInput.placeholder = "STG";

        productDiv.appendChild(productName);
        productDiv.appendChild(inBarInput);
        productDiv.appendChild(inStorageInput);

        productList.appendChild(productDiv);
    });
}

// Función para obtener los datos de la lista de productos
function getProductData() {
    const products = document.querySelectorAll(".product");
    const productData = [];

    products.forEach(product => {
        const productName = product.querySelector("span").textContent;
        const inBarQuantity = product.querySelector("input[type='number']:nth-of-type(1)").value || 0;
        const inStorageQuantity = product.querySelector("input[type='number']:nth-of-type(2)").value || 0;

        productData.push([productName, inBarQuantity, inStorageQuantity]);
    });

    return productData;
}

// Función para exportar los datos a Excel
function exportToExcel() {
    const productData = getProductData();

    const ws = XLSX.utils.aoa_to_sheet([["Producto", "Cantidad en el bar", "Cantidad en el depósito"], ...productData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventario");

    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "InventarioBar.xlsx");
}

// Event listener para el botón de exportar
document.getElementById("export-btn").addEventListener("click", exportToExcel);

// Llama a la función para crear la lista de productos al cargar la página
createProductList();

// Función para convertir una cadena a una matriz de bytes
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

// Función para guardar los valores de los inputs en el almacenamiento local
function saveInputValues() {
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const productName = product.querySelector("span").textContent;
        const inBarInput = product.querySelector("input[type='number']:nth-of-type(1)");
        const inStorageInput = product.querySelector("input[type='number']:nth-of-type(2)");

        localStorage.setItem(`${productName}_inBar`, inBarInput.value);
        localStorage.setItem(`${productName}_inStorage`, inStorageInput.value);
    });
}

// Función para cargar los valores de los inputs desde el almacenamiento local
function loadInputValues() {
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const productName = product.querySelector("span").textContent;
        const inBarInput = product.querySelector("input[type='number']:nth-of-type(1)");
        const inStorageInput = product.querySelector("input[type='number']:nth-of-type(2)");

        inBarInput.value = localStorage.getItem(`${productName}_inBar`) || '';
        inStorageInput.value = localStorage.getItem(`${productName}_inStorage`) || '';
    });
}

// Llama a la función para cargar los valores de los inputs al cargar la página
loadInputValues();

// Event listener para los inputs que guarda los valores al cambiar
document.querySelectorAll(".product input[type='number']").forEach(input => {
    input.addEventListener('input', saveInputValues);
});


// Función para reiniciar todos los valores de los inputs a cero manteniendo los placeholders
function resetInputValues() {
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const inBarInput = product.querySelector("input[type='number']:nth-of-type(1)");
        const inStorageInput = product.querySelector("input[type='number']:nth-of-type(2)");

        inBarInput.value = '';
        inStorageInput.value = '';

        // Guardar los nuevos valores en el almacenamiento local
        saveInputValues();
    });
}


// Event listener para el botón de reinicio
document.getElementById("resetValuesBtn").addEventListener('click', resetInputValues);
