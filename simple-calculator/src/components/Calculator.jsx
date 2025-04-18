import { useState, useEffect } from 'react';

const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Use useEffect to log the result whenever it changes
  useEffect(() => {
    if (result !== null) {
      console.log('Current calculation result:', result);
    }
  }, [result]);

  const handleCalculate = (e) => {
    e.preventDefault();
    
    // Reset previous errors and results
    setError('');
    setResult(null);
    
    // Validate inputs
    if (firstNumber === '' || secondNumber === '') {
      setError('Please enter both numbers');
      return;
    }
    
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    
    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers');
      return;
    }
    
    // Perform calculation based on selected operation
    switch (operation) {
      case 'add':
        setResult(num1 + num2);
        break;
      case 'subtract':
        setResult(num1 - num2);
        break;
      case 'multiply':
        setResult(num1 * num2);
        break;
      case 'divide':
        if (num2 === 0) {
          setError('Can not divide by zero');
          return;
        }
        setResult(num1 / num2);
        break;
      default:
        setError('Invalid operation');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 border border-orange-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Simple Calculator</h2>
        
        <form onSubmit={handleCalculate} className="space-y-6">
          <div>
            <label For="firstNumber" className="block text-sm font-medium text-black mb-2">
              First Number
            </label>
            <input
              type="number"
              id="firstNumber"
              
              value={firstNumber}
              onChange={(e) => setFirstNumber(e.target.value)}
              className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder-black"
            />
          </div>
          
          <div>
            <label For="operation" className="block text-sm font-medium text-black mb-2">
              Operation
            </label>
            <select
              id="operation"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-orange-600"
            >
              <option value="add">Add (+)</option>
              <option value="subtract">Subtract (−)</option>
              <option value="multiply">Multiply (×)</option>
              <option value="divide">Divide (÷)</option>
            </select>
          </div>
          
          <div>
            <label For="secondNumber" className="block text-sm font-medium text-black mb-2">
              Second Number
            </label>
            <input
              type="number"
              id="secondNumber"
              
              value={secondNumber}
              onChange={(e) => setSecondNumber(e.target.value)}
              className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder-black"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300"
          >
            Calculate
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-orange-100 border border-orange-400 text-orange-700 rounded-lg text-center">
            {error}
          </div>
        )}
        
        {result !== null && !error && (
          <div className="mt-4 p-4 bg-white border border-orange-400 text-orange-600 rounded-lg text-center">
            <div className="font-medium">Result:</div>
            <div className="text-2xl font-bold text-black">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;