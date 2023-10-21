

// Function to replace all occurrences of 'v' with 'b' in a given text node
function replaceTextInNode(node) {
    

    if (node.nodeType === Node.TEXT_NODE) {
        //node.nodeValue = node.nodeValue.replace(/v/g, 'b');
        
        const opciones = {
            reemplazarVPorB: true,
            reemplazarCPorK: true,
            reemplazarQuPorK: true,
            reemplazarCPorZ: true,
            reemplazarLlPorY: true,
            reemplazarXPorKs: true,
            eliminarH: true,
            eliminarTildes: true,
            usarSoloMayusculas: false,
            usarSoloMinusculas: false
        };
        const texto = 'Vendemos hojarasca';
        kasteyanizado = kasteyaniza(texto, opciones);
        
        node.nodeValue = kasteyaniza(node.nodeValue, opciones);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (let i = 0; i < node.childNodes.length; i++) {
            replaceTextInNode(node.childNodes[i]);
        }
    }
}

// Function to replace all occurrences of 'v' with 'b' in the entire document
function replaceVsWithBs() {
    replaceTextInNode(document.body);
}

// Call the function to replace 'v' with 'b' when the content script is executed

replaceVsWithBs();

// Optional: You can also add an event listener to handle dynamic content
// MutationObserver to handle dynamically added content
const observer = new MutationObserver(replaceVsWithBs);

// Configuration of the MutationObserver
const config = {
    childList: true,
    subtree: true
};

// Start observing the document for changes and replace 'v' with 'b' in new content
observer.observe(document.body, config);

