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
let settingsSection = document.querySelector(".settings-section")
let settingsCheckmark = settingsSection.querySelector("div")
settingsCheckmark.remove()
settingsSection.remove()
notifDiv.remove()

class Game {
    static Notification(msg) {
        let newNotifDiv = notifDiv.cloneNode(true);

        document.querySelector(".notification-stack").append(newNotifDiv)

        newNotifDiv.offsetHeight;

        requestAnimationFrame(() => {
            newNotifDiv.classList.add("notified");
            let notif = audios[2].cloneNode(true);
            notif.play()
            notif.onended = () => {
                notif.remove();
            }
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

    static save() {
        let saveFile = {};
        let sf = saveFile;

        sf["money"] = money;
        sf["mupUnlocked"] = moneyUpgradeTreeUnlocked;
        sf["furnace"] = furnaceUnlocked;
        sf["drills"] = purchasedDrills
        sf["inventory"] = inventory;
        sf["furnaceSlots"] = furnace;
        sf["mupUpgrades"] = upgrades;

        sf = btoa(JSON.stringify(sf));

        saveFile = sf;

        console.log(saveFile)
    }

    static addZoneButton(icon, name, clickAction, buttonClass) {
        addButton(icon, name, clickAction, buttonClass)
    }

    static translate(key) {
        return window.GameLanguage.t(key)
    }
}

class Settings {
    static newSection(sectionName){
        let newSection = settingsSection.cloneNode(true);

        newSection.querySelector("p").innerHTML = sectionName

        document.querySelector(".settings").append(newSection)

        return newSection;
    }

    static newSetting(settingType, settingName, section){
        if (settingType == "checkmark"){
            let newCheckmark = settingsCheckmark.cloneNode(true);

            newCheckmark.querySelector("h3").innerHTML = settingName

            section.append(newCheckmark)

            return newCheckmark;
        }
    }
}