// Datos del inventario
const inventoryData = [
    "WATER",
    "acqua panna large 1L",
    "acqua panna small 250ML",
    "acqua panna small 500ML",
    "acqua panna small 750ML",
    "san pellegrino sparkling 1L",
    "san pellegrino sparkling 250ML",
    "san pellegrino sparkling 500ML",
    "san pellegrino sparkling 750ML",
    "SOFT-DRINKS",
    "pepsi",
    "papsi diet",
    "mirinda",
    "7up",
    "7up diet",
    "7up can",
    "coke", 
    "coke diet",
    "ginger ale",
    "ginger beer (senxup)",
    "sicilian lemonade (senxup)",
    "redbull",
    "redbull sugar free",
    "rose and raspberry lemonade",
    "bud zero",
    "heineken",
    "SPARKLING WINE",
    "el Legado sparkling",
    "bella dream gold",
    "bella dream pink",
    "bella dream white",
    "bella dream red",
    "lyre's Classico (sparkling)",
    "el legado red",
    "el legado white",
    "bella glamour",
    "le petit muscat",
    "le petit blanc de blanc",
    "legero smooth and fruity",
    "legero delicate aromatic",
    "le petit beret virgin rose",
    "PUREE",
    "mango puree",
    "pasion friut puree",
    "blood orange puree",
    "raspberry puree",
    "peach puree",
    "yuzu puree",
    "LYRE'S",
    "lyre's american malts",
    "lyre's dark cane",
    "lyre's coffee original",
    "lyre's london dry",
    "lyre's ammareti",
    "lire's rosso",
    "lire's spiced cane",
    "lyre's white cane",
    "lyres's italian orange",
    "lyre's italian spritz",
    "SYRUPS",
    "monin hazelnut",
    "monin granadine",
    "monin raspberry",
    "monin cranberry",
    "monin Vanilla",
    "monin Peach",
    "monin Passion",
    "monin Mango",
    "monin Coconut",
    "cranberry syrup",
    "hersheys caramel",
    "hersheys chocolate",
    "elderflower gifard",
    "le fruits de monin coconut",
    "le fruits de monin passion fruits",
    "le fruits de monin mango",
    "MILK",
    "full fat barista",
    "lacto free",
    "oat milk", 
    "almond milk", 
    "soya milk lactose",
    "soya unsweetened",
    "whipped cream",
    "low fat",
    "skimmed milk",
    "coconut milk", 
    "full fat",
    "TEA",
    "chamomile breeze",
    "currant dream",
    "earl grey floral", 
    "ginger zest",
    "happy forest", 
    "jasmine pearl",
    "masala chai", 
    "moroccan nights",
    "passion fruit tea",
    "peppermint tea",
    "rooibos heel",
    "royal assam",
    "royal breakfast", 
    "royal darjeeling",
    "sencha zen", 
    "tchaba rose",
    "COFFEE",
    "arabic coffee",
    "cardamom",
    "chocolate powder",
    "coffee rosting house",
    "decaf coffee",
    "matcha barista",
    "matcha powder",
    "turkish coffee",
    "GROCERY",
    "dates",
    "brown sugar logo",
    "butter",
    "condensed milk",
    "evporated milk",
    "honey",
    "ketchup",
    "mayonaise",
    "mustard",
    "peanutbutter",
    "raspberry jam",
    "rose water",
    "sugar white",
    "sweetener",
    "tabasco",
    "white sugar logo",
    "take away cup small",
    "take away cup medium",
    "take away cup big",
    "take away cup big brown",
    "take away rounded",
    "take away square"
];

// Función para crear la lista de productos con inputs
function createProductList() {
    const productList = document.getElementById("product-list");

    inventoryData.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const productName = document.createElement("span");
        productName.textContent = product;

        let inBarInput, inStorageInput;

        // Verificar si el producto debe tener inputs
        if (shouldHaveInputs(product)) {
            inBarInput = document.createElement("input");
            inBarInput.type = "number";
            inBarInput.placeholder = "Bar";

            inStorageInput = document.createElement("input");
            inStorageInput.type = "number";
            inStorageInput.placeholder = "STG";
        } else {
            productName.style.fontWeight = "bold"; // Establecer negrita para productos sin inputs
        }

        if (inBarInput && inStorageInput) {
            productDiv.appendChild(productName);
            productDiv.appendChild(inBarInput);
            productDiv.appendChild(inStorageInput);
        } else {
            productDiv.appendChild(productName);
        }

        productList.appendChild(productDiv);
    });
}


// Función para obtener los datos de la lista de productos
function getProductData() {
    const products = document.querySelectorAll(".product");
    const productData = [];

    products.forEach(product => {
        const productName = product.querySelector("span").textContent;
        let inBarQuantity = '';
        let inStorageQuantity = '';

        // Verificar si el producto debe tener inputs
        if (shouldHaveInputs(productName)) {
            const inBarInput = product.querySelector("input[type='number']:nth-of-type(1)");
            const inStorageInput = product.querySelector("input[type='number']:nth-of-type(2)");

            // Verificar si los elementos existen antes de acceder a sus valores
            inBarQuantity = inBarInput ? inBarInput.value || 0 : 0;
            inStorageQuantity = inStorageInput ? inStorageInput.value || 0 : 0;
        }

        productData.push([productName, inBarQuantity, inStorageQuantity]);
    });

    return productData;
}

// Función para determinar si un producto debe tener inputs
function shouldHaveInputs(product) {
    const categoriesWithoutInputs = [
        "WATER",
        "SOFT-DRINKS",
        "SPARKLING WINE",
        "PUREE",
        "LYRE'S",
        "SYRUPS",
        "MILK",
        "TEA",
        "COFFEE",
        "GROCERY"
    ];

    return !categoriesWithoutInputs.includes(product);
}

// Función para exportar los datos a Excel
function exportToExcel() {
    const productData = getProductData();

    const ws = XLSX.utils.aoa_to_sheet([["Product", "Bar stock", "Storage stock"], ...productData]);

    // Aplicar estilo en negrita a la primera fila (títulos)
    const boldStyle = { font: { bold: true } };
    const titleRange = XLSX.utils.decode_range(ws["!ref"]);
    for (let col = titleRange.s.c; col <= titleRange.e.c; ++col) {
        const cell = XLSX.utils.encode_cell({ r: titleRange.s.r, c: col });
        ws[cell].s = boldStyle;
    }

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

        // Verificar si los elementos existen antes de intentar acceder a sus valores
        if (inBarInput && inStorageInput) {
            localStorage.setItem(`${productName}_inBar`, inBarInput.value);
            localStorage.setItem(`${productName}_inStorage`, inStorageInput.value);
        }
    });
}

// Función para cargar los valores de los inputs desde el almacenamiento local
function loadInputValues() {
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const productName = product.querySelector("span").textContent;
        const inBarInput = product.querySelector("input[type='number']:nth-of-type(1)");
        const inStorageInput = product.querySelector("input[type='number']:nth-of-type(2)");

        // Verificar si los elementos existen antes de intentar establecer sus valores
        if (inBarInput && inStorageInput) {
            inBarInput.value = localStorage.getItem(`${productName}_inBar`) || '';
            inStorageInput.value = localStorage.getItem(`${productName}_inStorage`) || '';
        }
    });
}

// Función para reiniciar todos los valores de los inputs a cero manteniendo los placeholders
function resetInputValues() {
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const inBarInput = product.querySelector("input[type='number']:nth-of-type(1)");
        const inStorageInput = product.querySelector("input[type='number']:nth-of-type(2)");

        // Verificar si los elementos existen antes de intentar restablecer sus valores
        if (inBarInput && inStorageInput) {
            inBarInput.value = '';
            inStorageInput.value = '';

            // Guardar los nuevos valores en el almacenamiento local
            saveInputValues();
        }
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

        // Comprobar si los elementos existen antes de intentar acceder a ellos
        if (inBarInput) {
            inBarInput.value = '';
        }
        if (inStorageInput) {
            inStorageInput.value = '';
        }

        // Guardar los nuevos valores en el almacenamiento local
        saveInputValues();
    });
}


// Event listener para el botón de reinicio
document.getElementById("resetValuesBtn").addEventListener('click', resetInputValues);


// Función para crear la lista de productos con inputs
function createProductList() {
    const productList = document.getElementById("product-list");

    inventoryData.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const productName = document.createElement("span");
        productName.textContent = product;

        let inBarInput, inStorageInput;

        // Verificar si el producto debe tener inputs
        if (shouldHaveInputs(product)) {
            inBarInput = document.createElement("input");
            inBarInput.type = "number";
            inBarInput.placeholder = "Bar";

            inStorageInput = document.createElement("input");
            inStorageInput.type = "number";
            inStorageInput.placeholder = "STG";
        } else {
            productName.style.fontWeight = "bold"; // Establecer negrita para productos sin inputs
        }

        if (inBarInput && inStorageInput) {
            productDiv.appendChild(productName);
            productDiv.appendChild(inBarInput);
            productDiv.appendChild(inStorageInput);
        } else {
            productDiv.appendChild(productName);
        }

        productList.appendChild(productDiv);
    });
}

// Función para filtrar los productos por las letras ingresadas en el buscador
function filterProductsByLetters(letters) {
    const productList = document.querySelectorAll(".product");
    const searchValue = letters.toLowerCase();
    productList.forEach(product => {
        const productName = product.textContent.trim().toLowerCase();
        if (productName.startsWith(searchValue)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Event listener para el cambio en el campo de búsqueda
document.getElementById("search").addEventListener("input", function(event) {
    const searchValue = event.target.value.trim();
    if (searchValue.length > 0) {
        filterProductsByLetters(searchValue);
    } else {
        // Si no se ingresa ninguna letra, mostrar todos los productos
        const productList = document.querySelectorAll(".product");
        productList.forEach(product => {
            product.style.display = "block";
        });
    }
});
