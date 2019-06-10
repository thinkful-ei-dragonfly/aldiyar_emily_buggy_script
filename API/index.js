const express = require('express');
const morgan = require('morgan');
const debug = require('debug');

const app = express();

app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  const c = parseFloat(req.query.a)+parseFloat(req.query.b)
  const responseText = `The sum of ${a} and ${b} is ${c}`

  res.send(responseText);
})

app.get('/cypher', (req, res) => {
  const text = req.query.text;
  const textArr = text.split('');
  const shift = parseFloat(req.query.shift);
  const encriptedText = textArr.map((char) => char.charCodeAt()+shift)
  const returnedArray = encriptedText.map(char => String.fromCharCode(char))
  const joinedMessage = returnedArray.join('')
  res.send(joinedMessage)
})

app.get('/lotto', (req, res) => {
  const numbersStringArray= req.query.numbers;
  function generateNumbers() {
    const generatedNumbers = [];
    for (let i = 0; i < 6; i++) {
      generatedNumbers.push(Math.floor(Math.random()*20))
    }
    return generatedNumbers;
  }
  const numbers = numbersStringArray.map(number => parseFloat(number));
  console.log(numbers)
  
  const generatedNumbers = generateNumbers();
  const matchedNumbersArray = numbers.map(number => {
    return generatedNumbers.find(generatedNumber => {
      return generatedNumber === number;
    }) 
  });

  const filteredMatchedNumbersArray = matchedNumbersArray.filter(number => {
    return !!number
  });



  let resultMessage = '';
  if (filteredMatchedNumbersArray.length < 4) {
    resultMessage = 'Sorry, you lose...'
  } else if (filteredMatchedNumbersArray.length < 5) {
    resultMessage='Congratulations, you win a free ticket'
  } else if (filteredMatchedNumbersArray.length < 6) {
    resultMessage='Congratulations, you win a $100'
  } else {
    resultMessage='Wow! Unbelievable! You could have won the mega millions!'
  }
  res.send(resultMessage);
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});