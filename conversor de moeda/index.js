
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '12ce61abdbb2eec1144d6cf5 '; 
    const apiUrl = `https://v6.exchangerate-api.com/v6/12ce61abdbb2eec1144d6cf5/latest/USD`;

    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert-button');
    const resultDisplay = document.getElementById('result');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            populateCurrencySelect(fromCurrencySelect, currencies);
            populateCurrencySelect(toCurrencySelect, currencies);
        })
        .catch(error => console.error('Error fetching exchange rates:', error));

    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const fromRate = data.conversion_rates[fromCurrency];
                const toRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount / fromRate) * toRate;
                resultDisplay.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
            })
            .catch(error => console.error('Error converting currency:', error));
    });

    function populateCurrencySelect(selectElement, currencies) {
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            selectElement.appendChild(option);
        });
    }
});
