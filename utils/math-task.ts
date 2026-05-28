export const getMathTask = (level: number) => {
  const rand = (min: number, max: number) => {
    let val;
    do {
      val = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (val >= 10 && val % 10 === 0); // Reject trivial multiples of 10
    return val;
  };
  let a, b, c, d, x;

  switch (level) {
    case 1: // Lvl 1: Easy Addition
      a = rand(11, 49);
      b = rand(11, 49);
      return { problem: `${a} + ${b}`, answer: a + b };
    case 2: // Lvl 2: Moderate Subtraction
      a = rand(40, 99);
      b = rand(11, a - 5);
      return { problem: `${a} - ${b}`, answer: a - b };
    case 3: // Lvl 3: Basic Multiplication
      a = rand(4, 12);
      b = rand(4, 12);
      return { problem: `${a} * ${b}`, answer: a * b };
    case 4: // Lvl 4: 2-Digit by 1-Digit Mult
      a = rand(13, 29);
      b = rand(3, 9);
      return { problem: `${a} * ${b}`, answer: a * b };
    case 5: // Lvl 5: Clean Division
      b = rand(4, 12);
      x = rand(7, 19);
      a = b * x;
      return { problem: `${a} / ${b}`, answer: x };
    case 6: // Lvl 6: Order of Ops
      a = rand(11, 45);
      b = rand(4, 9);
      c = rand(4, 9);
      return { problem: `${a} + ${b} * ${c}`, answer: a + b * c };
    case 7: // Lvl 7: Basic Algebra
      x = rand(5, 15);
      a = rand(3, 8);
      b = rand(5, 30);
      c = a * x + b;
      return { problem: `${a}x + ${b} = ${c}, x`, answer: x };
    case 8: // Lvl 8: Parentheses Math
      a = rand(3, 8);
      b = rand(7, 15);
      c = rand(6, 15);
      d = rand(10, 40);
      return {
        problem: `${a}(${b} + ${c}) - ${d}`,
        answer: a * (b + c) - d,
      };
    case 9: // Lvl 9: Squares
      x = rand(6, 15);
      a = rand(10, 50);
      b = x * x - a;
      return { problem: `x² - ${a} = ${b} (x > 0), x`, answer: x };
    case 10: // Lvl 10: Advanced Algebra
      x = rand(7, 18);
      a = rand(3, 8);
      b = rand(2, 9);
      c = rand(11, 40);
      d = a * (x - b) + c;
      return { problem: `${a}(x - ${b}) + ${c} = ${d}, x`, answer: x };
    default:
      return { problem: `1 + 1`, answer: 2 };
  }
};
