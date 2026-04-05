let l = new Array(8).fill(false)
let t = 0
let z = false;

function a(b) { l[b] = true }

setInterval(() => {
    if (l.every(status => status === true)) {
        if (!z) {
            console.success("FINISHED LOADING!")

            z = true
            startUp()
            document.querySelector(".load-screen").classList.add("done")
            setTimeout(() => {
                document.querySelector(".load-screen").remove()
            }, 200);
        }
    } else { t += .500 }
}, 500)