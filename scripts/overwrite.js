const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

let previousText;
let previousElement;
let previousType;

function createConsoleOverride(originalFn, label, color) {
    return function (...args) {
        const text = args.join(" ");

        if (originalFn) {
            originalFn.apply(console, args);
        }

        if (previousText === text && previousType === label) {
            const matches = previousElement.innerHTML.match(/\((\d+)\)$/);

            if (matches) {
                const num = parseInt(matches[1]) + 1;
                previousElement.innerHTML =
                    previousElement.innerHTML.replace(/\(\d+\)$/, `(${num})`);
            } else {
                previousElement.innerHTML += " (2)";
            }

            return;
        }

        const consoleDiv = document.querySelector(".console");
        const element = document.createElement("h3");

        if (label === "FATAL_LINK") {
            const link = document.createElement("a");
            link.href = "https://github.com/ifirsttealover/pozz/issues";
            link.textContent = `[${label}] ` + text;
            link.target = "_blank";
            link.style.color = "darkred";
            link.style.textDecoration = "underline";

            element.appendChild(link);
        } else {
            element.textContent = `[${label}] ` + text;
        }

        element.style.margin = "0";
        element.style.color = color;

        previousText = text;
        previousElement = element;
        previousType = label;

        consoleDiv.appendChild(element);
    };
}

console.log = createConsoleOverride(originalLog, "LOG", "white");
console.warn = createConsoleOverride(originalWarn, "WARN", "orange");
console.error = createConsoleOverride(originalError, "ERROR", "red");

console.success = createConsoleOverride(null, "SUCCESS", "lime");
console.fatal = createConsoleOverride(null, "FATAL", "darkred");
console.fatalLink = createConsoleOverride(null, "FATAL_LINK", "darkred");

window.addEventListener("error", (event) => {
    const consoleDiv = document.querySelector(".console")
    console.fatal(event.message);
    console.fatal("Caused by " + event.filename)
    console.fatalLink("Report the issue")
    consoleDiv.style.zIndex = "99999999999999999999999999"
    consoleDiv.style.display = "block"
});
