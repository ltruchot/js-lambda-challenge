// utils
const identity = a => a;
const equals = a => b => b === a;
const makePair = a => b => f => f(a)(b);
const first = a => _ => a;
const second = _ => b => b;
const left = list => list(first);
const right = list => list(second);
const isFunction = f => typeof(f) === 'function';
const compose = f => g => a => f(g(a));
const add = a => b => b + a;
const inc = add(1);
const square = n => n * n;
const ifElse = cond => f => g => a => cond(a) ? f(a) : g(a);
const unless = cond => f => ifElse(cond)(identity)(f);

// lists
const emptyList = second;

const isEmptyList = compose(isFunction)(left);

const append = val => list => isEmptyList(list)
  ? makePair(val)(emptyList)
  : makePair(left(list))(append(val)(right(list)));

const prepend = val => list => isEmptyList(list)
  ? makePair(val)(emptyList)
  : makePair(val)(list);

const foreach = f => list => unless(isEmptyList)(
  () => f(left(list)) || foreach(f)(right(list)),
)(list);

const map = f => list => {
  const inner = accList => innerList => isEmptyList(innerList)
    ? accList
    : inner(append(f(left(innerList)))(accList))(right(innerList));
  return inner(emptyList)(list);
};

const repeat = (list) => (n) => (max) => equals(max)(n)
  ? append(n)(list)
  : repeat(append(n)(list))(inc(n))(max);

const range = (min) => (max) => repeat(emptyList)(min)(max);

const reverse = list => {
  const inner = accList => innerList => isEmptyList(innerList)
    ? accList
    : inner(prepend(left(innerList))(accList))(right(innerList));
  return inner(emptyList)(list);
};

// main program
const listRanged = range(1)(10);
const listSquared = map(square)(listRanged);
const listReversed = reverse(listSquared);
foreach(console.log)(listReversed);
