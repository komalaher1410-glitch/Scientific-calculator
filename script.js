const display = document.getElementById("display");

let isDegree = true;

/* BUTTON HANDLING */
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.innerText;

    // ❌ IGNORE UI BUTTONS (IMPORTANT FIX)
    if (btn.id === "modeToggle") return;
    if (btn.id === "themeToggle") return;

    // calculator actions
    if (val === "C") return clearDisplay();
    if (val === "DEL") return deleteLast();
    if (val === "=") return calculate();

    display.value += map(val);
  });
});

/* SYMBOL MAPPING */
function map(v){
  if(v === "π") return "pi";
  if(v === "√") return "sqrt(";
  return v;
}

/* CLEAR */
function clearDisplay(){
  display.value = "";
}

/* DELETE */
function deleteLast(){
  display.value = display.value.slice(0, -1);
}

/* CALCULATE */
function calculate(){
  try{
    let expr = display.value
      .replace(/pi/g, Math.PI)
      .replace(/e/g, Math.E)
      .replace(/\^/g, "**");

    const result = new Function(
      "sin","cos","tan","log","ln","sqrt","fact",
      `return ${expr}`
    )(
      sin, cos, tan, log, ln, sqrt, fact
    );

    addHistory(display.value + " = " + result);
    display.value = result;

  } catch(e){
    display.value = "Error";
  }
}

/* SCIENTIFIC FUNCTIONS */
function sin(v){ return Math.sin(isDegree ? v * Math.PI / 180 : v); }
function cos(v){ return Math.cos(isDegree ? v * Math.PI / 180 : v); }
function tan(v){ return Math.tan(isDegree ? v * Math.PI / 180 : v); }

function log(v){ return Math.log10(v); }
function ln(v){ return Math.log(v); }
function sqrt(v){ return Math.sqrt(v); }

function fact(n){
  let r = 1;
  for(let i = 2; i <= n; i++) r *= i;
  return r;
}

/* DEG / RAD TOGGLE */
document.getElementById("modeToggle").onclick = () => {
  isDegree = !isDegree;
  document.getElementById("modeToggle").innerText = isDegree ? "DEG" : "RAD";
};

/* DARK / LIGHT THEME TOGGLE */
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  document.getElementById("themeToggle").innerText = isDark ? "☀️" : "🌙";
};

/* HISTORY */
function addHistory(txt){
  const div = document.createElement("div");
  div.textContent = txt;
  document.getElementById("history").prepend(div);
}
