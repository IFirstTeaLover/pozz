let l = new Array(6).fill(false)
let t = 0
let z = false;

function a(b) { l[b] = true }

setInterval(() => {
    if (l.every(status => status === true)) {
        if (!z) {
            console.success("FINISHED LOADING!")
            document.querySelector(".load-screen").remove()
            z = true
            startUp()
        }
    } else { t += .100 }
}, 500)