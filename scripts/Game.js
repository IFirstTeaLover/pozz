const notification = {
    generic: {
        occupied: {
            slot: "This slot is already occupied.",
            abra: "This is test message!"
        }
    }
};

let hasNotifOngoing = false;
let notifDiv = document.querySelector(".notification")
notifDiv.remove()

class Game {
    static Notification(msg) {
        let newNotifDiv = notifDiv.cloneNode(true);

        document.querySelector(".notification-stack").append(newNotifDiv)

        newNotifDiv.offsetHeight;

        requestAnimationFrame(() => {
            newNotifDiv.classList.add("notified");
        });

        hasNotifOngoing = true;

        newNotifDiv.querySelector("h2").innerHTML = msg;

        let interval = setTimeout(() => {
            newNotifDiv.classList.remove("notified");
            let interval = setTimeout(() => {
                newNotifDiv.classList.add('removing');
                newNotifDiv.addEventListener('transitionend', () => newNotifDiv.remove(), { once: true });
            }, 350);
        }, 10000);
    }
}