// Datos del inventario
const inventoryData = [
    "CHAMOMILE BREEZE",
    "CURRANT DREAM",
    "EARL GREY FLORA", 
    "GINGER ZEST",
    "HAPPY FOREST", 
    "JASMINE PEARL",
    "MASALA CHAI", 
    "MOROCCAN NIGHTS",
    "PASSION FRUIT TEA",
    "PEPPERMINT TEA",
    "ROOIBOS HEEL",
    "ROYAL ASSAM",
    "ROYAL BREAKFAST", 
    "ROYAL DARJEELING",
    "SENCHA ZEN", 
    "TCHABA ROSE", 
    "ACQUA PANNA LARGE 1L",
    "ACQUA PANNA SMALL 250ML",
    "ACQUA PANNA SMALL 500ML",
    "ACQUA PANNA SMALL 750ML",
    "SAN PELLEGRINO SPARKLING  750ML",
    "SAN PELLEGRINO SPARKLING 1L",
    "SAN PELLEGRINO SPARKLING 250ML",
    "SAN PELLEGRINO SPARKLING 500ML",
    "PEPSI",
    "DIET PEPSI",
    "MIRANDA",
    "7UP",
    "DIET 7UP",
    "COKE", 
    "COKE DIET",
    "GINGER ALE",
    "GINGER BEER ( SENXUP)",
    "SICILIAN LEMONADE ( SENXUP)",
    "REDBULL",
    "REDBULL SUGAR FREE",
    "ROSE AND RASPBERRY LEMONADE",
    "BUD ZERO",
    "HEINEKEN",
    "SPARKLING WINE",
    "BELLA DREAM GOLD",
    "BELLA DREAM PINK",
    "BELLA DREAMwhite",
    "BELLA RED",
    "Lyre's Classico (Sparkling)",
    "EL LEGADO RED",
    "EL LEGADO WHITE",
    "BELLA GALMOUR",
    "LE PETIT MUSCAT",
    "LE PETIT BLANC DE BLANC",
    "LEGERO SMOOTH AND FRUITY",
    "LEGERO DELICATE AROMATIC",
    "LE PETIT BERET VIRGIN ROSE",
    "MANGO PUREE",
    "PASSION FRUIT PUREE",
    "BLOOD ORGANGE PUREE",
    "RASPBERRY PUREE",
    "PEACH PUREE",
    "PUREE YUZU",
    "MANGO PUREE",
    "PASSION FRUIT PUREE",
    "BLOOD ORGANGE PUREE",
    "RASPBERRY PUREE",
    "PEACH PUREE",
    "PUREE YUZU",
    "LYRE'S",
    "Lyre's American Malts",
    "Lyre's  DARK CANE",
    "Lyre's Coffee Original",
    "Lyre's London Dry",
    "Lyre's Ammareti",
    "LYRES ROSSO",
    "LYRES SPICE CANE",
    "Lyre's white cane",
    "Lyres's italian orange",
    "Lyre's italian spritz",
    "Monin hazelnut",
    "Monin granadine",
    "Monin raspberry",
    "Monin cranberry",
    "Monin Vanilla",
    "Monin Peach",
    "Monin Passion",
    "Monin Mango",
    "Monin Coconut",
    "Cranberry SYRUP",
    "HERSHEYS CARAMEL",
    "HERSHEYS Chocolate",
    "elderflower GIFARD",
    "Le fruits de Monin Coconut",
    "Le fruits de Monin Passion Fruits",
    "Le fruits de Monin Mango",
    "FULL FAT MILK  BARISTA",
    "LACTO FREE",
    "OAT MILK", 
    "ALMOND MILK", 
    "SOYA MILK LACTOSE",
    "SOYA UNSWEETENED",
    "WHIPPED CREAM",
    "LOW FAT",
    "SKIMMED  MILK",
    "COCONUT MILK", 
    "FULL FAT MILK",
    "ARABIC COFFEE",
    "CARDAMOM",
    "CHOCOLATE POWDER",
    "COFFEE ROSTING HOUSE",
    "DECAFFE COFFEE",
    "MATCHA BARISTA",
    "MATCHA POWDER",
    "TURKISH COFFEE",
    "DATES",
    "BROWN SUGAR ST REGIS LOGO",
    "BUTTER",
    "CONDENSED MILK",
    "EVPORATED MILK",
    "Honey",
    "KETCHUP",
    "MAYONAISE",
    "MUSTARD",
    "PEANUTBUTTER",
    "RASPBERRY JAM",
    "ROSE WATER",
    "SUGAR WHITE REGULAR",
    "SWEETENER",
    "TABASCO",
    "WHITE SUGAR STR LOGO",
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

    const ws = XLSX.utils.aoa_to_sheet([["Product", "Bar stock", "Storage stock"], ...productData]);
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
