if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./scripts/sw.js").then(
        (registration) => {
            console.log("Service worker registration succeeded:", registration);
        },
        (error) => {
            console.error(`Service worker registration failed: ${error}`);
        },
    );
} else {
    console.error("Service workers are not supported.");
    console.error("Update your browser!")
    console.error("Have latest version of chromium/firefox? report an issue: https://www.github.com/ifirsttealover/pozz/issues")
}