if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log("Service Worker registered successfully with scope: " + registration.scope);
            }).catch(regError => {
                console.log(regError);
            });
    });
} else {
    console.log('No Service Worker capability 😔');
}