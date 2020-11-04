var righe = [
  document.querySelector(
    "body > div.calcolo > table > tbody > tr:nth-child(1) > td:nth-child(2)"
  ),
  document.querySelector(
    "body > div.calcolo > table > tbody > tr:nth-child(2) > td:nth-child(2)"
  ),
  document.querySelector(
    "body > div.calcolo > table > tbody > tr:nth-child(3) > td:nth-child(2)"
  ),
  document.querySelector(
    "body > div.calcolo > table > tbody > tr:nth-child(4) > td:nth-child(2)"
  ),
  document.querySelector(
    "body > div.calcolo > table > tbody > tr:nth-child(5) > td:nth-child(2)"
  ),
  document.querySelector(
    "body > div.calcolo > table > tbody > tr:nth-child(6) > td:nth-child(2)"
  ),
  document.querySelector(
    "body > div.calcolo > table > tbody > tr:nth-child(7) > td:nth-child(2)"
  ),
  document.querySelector(
    "body > div.calcolo > table > tbody > tr:nth-child(8) > td:nth-child(2)"
  ),
  document.querySelector(
    "body > div.calcolo > table > tbody > tr:nth-child(9) > td:nth-child(2)"
  ),
  document.querySelector(
    "body > div.calcolo > table > tbody > tr:nth-child(10) > td:nth-child(2)"
  ),
];

function fattoriale(n) {
  n = BigInt(n);
  let potenza = (a, b) => {
    let ris = 1n,
      B = a;
    while (true) {
      if (b % 2n) ris *= B;
      b /= 2n;
      if (b == 0) break;
      B *= B;
    }
    return ris;
  };
  let odd = (a) => {
    let prodotto = 1n;
    let limiteI = BigInt(Math.floor(Math.sqrt(Number(a))));
    for (let i = 0n; i <= limiteI; i++) {
      let limiteJ = a / potenza(2n, i);
      for (let j = 3n; j <= limiteJ; j += 2n) prodotto *= j;
    }
    return prodotto;
  };
  let bits = (a) => {
    let b = 0n;
    while (a > 0n) {
      b += a % 2n;
      a /= 2n;
    }
    return b;
  };
  return potenza(2n, n - bits(n)) * odd(n);
}

function J(a, x) {
  let s = 0;
  for (let n = 0; n < 100; n++)
    s +=
      ((n % 2 ? -1 : 1) * Math.pow(x / 2, 2 * n + a)) /
      Number(fattoriale(n) * fattoriale(a + n));
  return s;
}

function calcola(m) {
  for (let i = 0; i < 10; i++) righe[i].innerText = J(i, m).toPrecision(10);
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error(err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => {},
    (err) => {
      console.error(err);
    }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  calcola(0);
  document.querySelector("#m").addEventListener("keyup", () => {
    let m = document.querySelector("#m").value;
    if (m != "") calcola(+m);
  });
  righe.forEach((el) => {
    el.addEventListener("click", () => {
      copyTextToClipboard(el.innerText);
    });
  });
});
