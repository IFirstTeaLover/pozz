let l = new Array(8).fill(false)
let t = 0
let z = false;

function a(b) { l[b] = true }

let state = 'spinning';
let t1 = 0, angleCw = 0, angleCcw = 0;
let arcOuter = 90, arcInner = 90;
let fillProgress = 0;
let doTick = true;

const ro = document.getElementById('spinner-outer');
const ri = document.getElementById('spinner-inner');
const oc = document.getElementById('spinner-oc');
const ic = document.getElementById('spinner-ic');
const fillEl = document.getElementById('spinner-fill');

function conic(angleDeg, arcDeg, color) {
    return `conic-gradient(from ${angleDeg}deg, transparent 0deg, ${color} 10deg, ${color} ${arcDeg}deg, transparent ${arcDeg}deg)`;
}

function easeInOut(x) {
    return x < 0.5 ? 2*x*x : 1 - Math.pow(-2*x+2, 2)/2;
}

if (new URLSearchParams(location.search).get('vscode-livepreview') === 'true') {
    document.querySelector('.load-screen')?.remove();
    l.fill(true); // skip loading checks too if you want
    doTick = false;
}

(function tick() {
    if (!doTick) return
    t1 += 0.04;

    if (state === 'spinning') {
        angleCw  += 3.6;
        angleCcw -= 2.8;
        arcOuter = 60 + 80 * ((Math.sin(t1)           + 1) / 2);
        arcInner = 60 + 80 * ((Math.sin(t1 + Math.PI) + 1) / 2);
        ro.style.background = conic(angleCw,  arcOuter, '#faca8b');
        ri.style.background = conic(angleCcw, arcInner, '#fa7a60');

    } else if (state === 'closing') {
        angleCw  += 3.6;
        angleCcw -= 2.8;
        arcOuter = Math.min(arcOuter + 3, 360);
        arcInner = Math.min(arcInner + 3, 360);
        ro.style.background = arcOuter >= 360
            ? `conic-gradient(#faca8b, #fa7a60)`
            : conic(angleCw, arcOuter, '#faca8b');
        ri.style.background = arcInner >= 360
            ? `conic-gradient(#fa7a60, #faca8b)`
            : conic(angleCcw, arcInner, '#fa7a60');
        if (arcOuter >= 360 && arcInner >= 360) state = 'filling';

    } else if (state === 'filling') {
        fillProgress = Math.min(fillProgress + 0.025, 1);
        const e = easeInOut(fillProgress);
        oc.style.inset = `${3  + e * 22}px`;
        ic.style.inset = `${10 + e * 22}px`;
        fillEl.style.opacity = '1';
        fillEl.style.transform = `scale(${e})`;
        fillEl.style.background = `radial-gradient(circle, #eab35a ${e*50}%, #f8a981 ${e*75}%, #f6413b 100%)`;
        if (fillProgress >= 1) {
            state = 'done';
            document.querySelector('.load-screen').classList.add('done');
            setTimeout(() => document.querySelector('.load-screen').remove(), 200);
        }
    }

    requestAnimationFrame(tick);
})();

setInterval(() => {
    if (l.every(status => status === true)) {
        if (!z) {
            console.success("FINISHED LOADING!")
            z = true;
            startUp();
            state = 'closing';
        }
    } else { t += 0.500 }
}, 1000)