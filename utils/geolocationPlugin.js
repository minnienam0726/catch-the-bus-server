const numericalRange = (number) => {
  const minimum = Math.ceil(number * 1000) / 1000;
  const maximum = Math.floor(number * 1000) / 1000;
  const numbers = { minimum: minimum, maximum: maximum };

  return numbers;
}

module.exports = { numericalRange };