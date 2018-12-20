// Для работы необходим NodeJS

const BigNumber = require('bignumber.js');
function endT(startTime, en=false){
  if (en)
    console.log('elapsed: ' + (new Date() - startTime) +'ms');
}

function H1(a,b,c){ 
  // Хэш-функция реализована с использованием библиотеки больших чисел
  // Математически криптостойкая
  // Коллизий второго рода нет
  const e = new BigNumber(Math.E);
  let r = e.pow(new BigNumber(100*a+10*b));
  r = r.plus(e.pow(new BigNumber(2)));
  r = r.plus(e.pow(new BigNumber(a)));
  r = r.plus(e.pow(new BigNumber(3)));
  r = r.plus(e.pow(new BigNumber(b)));
  r = r.plus(e.pow(new BigNumber(5)));
  r = r.plus(e.pow(new BigNumber(c)));
  return r;
}
function H11(a,b,c){
  // Хэш-функция реализована с использованием стандартных примитивов языка
  // Математически криптостойкая
  // Появляются коллиззии второго рода из-за недостаточной точности вычисления
  let r = Math.pow(Math.E, 100*a+10*b);
  r += Math.pow(Math.E, 2);
  r += Math.pow(Math.E, a);
  r += Math.pow(Math.E, 3);
  r += Math.pow(Math.E, b);
  r += Math.pow(Math.E, 5);
  r += Math.pow(Math.E, c);
  return r;
}

function H(a,b,c){
  let r = a * Math.pow(c, b) - Math.pow(b, a);
  return r * a;
}

function brute(fn, hash){
  let startTime = new Date();
  let set={};
  for (let i=1;i<10;i++)
  for (let j=0;j<10;j++)
  for (let k=0;k<10;k++){
    let t = fn(i,j, k);
    if (hash === t) {
      endT(startTime);
      return i*100+j*10+k;
    }
    let s = set[t];
    if (!s) 
      set[t]={count:1, abc:[]};
    else{
      s.count++;
    }
    set[t].abc.push(i*100+j*10+k);
  }

  for (let key of Object.getOwnPropertyNames(set)) {
    if (set[key].count <= 1)
      delete set[key];
  }
  endT(startTime);
  return set;
}

console.log(brute(H));
//console.log(brute(H, 150888)); // Поиск прообраза по образу
//console.log(brute(H1)); // Проверка реализации с библиотекой больших чисел
//console.log(brute(H11)); // Проверка реализации на основе стандартых примитивов
