function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();
console.log(generator);

// let first = generator.next(); { value: ?, done: true }
// console.log(JSON.stringify(first));

for (let value of generator) {
  console.log("val", value);
}

function* generateSequence2(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {
  yield* generateSequence2(48, 57);

  yield* generateSequence2(65, 90);

  yield* generateSequence2(97, 122);
}

let str = "";

for (let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

console.log("str", str);

function* gen3() {
  let ask1 = yield "2 + 2";

  console.log("ask1", ask1);

  let ask2 = yield "4 + 4";

  console.log("ask2", ask2);
}

let generator3 = gen3();

// let question = generator3.next().value;

// setTimeout(() => generator3.next(4), 1000);

console.log(generator3.next().value);

console.log(generator3.next(4).value);

console.log(generator3.next(8).value);

console.log(generator3.next());

function getSomething() {
  return fetch("route1")
    .then(JSON.parse)
    .then((data) => fetch("route2").then(JSON.parse).then());
}

function* generatorGetSomething() {
  const route1 = yield fetch("route1");
  const route1Data = yield route1.json();

  const route2 = yield fetch("route2");
  const route2Data = yield route2.json();

  return { route1: route1Data, route2: route2Data };
}

const fun4 = async () => {
  await route1();
  await route2();
};

const res4 = await fun4();

function exec(generator, yieldValue) {
  const next = generator.next(yieldValue);

  if (!next.done) {
    next.value.then((success) => exec(generator, yieldValue)),
      (err) => generator.throw();
  } else {
    console.log(next.value);
  }
}

exec(generatorGetSomething());
