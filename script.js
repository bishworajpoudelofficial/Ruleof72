document.addEventListener('DOMContentLoaded', function() {
    // Language content
    const languages = {
        en: {
            title: "Rule of 72 Calculator",
            description: "Enter your amount and annual interest rate to find out how many years it will take to double your money.",
            amountLabel: "Amount ($)",
            rateLabel: "Annual Interest Rate (%)",
            amountPlaceholder: "Enter amount",
            ratePlaceholder: "Enter interest rate",
            calculateBtn: "Calculate",
            resultTemplate: "Your {amount} will be doubled in {years} years at {rate}% interest rate.",
            amountError: "Please enter a valid amount greater than $0.",
            rateError: "Please enter a valid interest rate greater than 0%.",
            currency: "USD"
        },
        np: {
            title: "७२ को नियम क्यालकुलेटर",
            description: "तपाईंको रकम र वार्षिक ब्याज दर प्रविष्ट गर्नुहोस् र तपाईंको पैसा दोब्बर हुन कति वर्ष लाग्छ भनेर थाहा पाउनुहोस्।",
            amountLabel: "रकम (रू)",
            rateLabel: "वार्षिक ब्याज दर (%)",
            amountPlaceholder: "रकम प्रविष्ट गर्नुहोस्",
            ratePlaceholder: "ब्याज दर प्रविष्ट गर्नुहोस्",
            calculateBtn: "गणना गर्नुहोस्",
            resultTemplate: "तपाईंको {amount} {rate}% ब्याज दरमा {years} वर्षमा दोब्बर हुनेछ।",
            amountError: "कृपया $0 भन्दा ठूलो मान्य रकम प्रविष्ट गर्नुहोस्।",
            rateError: "कृपया 0% भन्दा ठूलो मान्य ब्याज दर प्रविष्ट गर्नुहोस्।",
            currency: "NPR"
        }
    };

    let currentLang = 'en';

    // DOM elements
    const langEnBtn = document.getElementById('lang-en');
    const langNpBtn = document.getElementById('lang-np');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const amountLabel = document.getElementById('amount-label');
    const rateLabel = document.getElementById('rate-label');
    const amountInput = document.getElementById('amount');
    const interestRateInput = document.getElementById('interest-rate');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    // Language switching functions
    function switchLanguage(lang) {
        currentLang = lang;
        updateUI();
        updateActiveButton();
    }

    function updateUI() {
        const lang = languages[currentLang];
        
        title.textContent = lang.title;
        description.textContent = lang.description;
        amountLabel.textContent = lang.amountLabel;
        rateLabel.textContent = lang.rateLabel;
        amountInput.placeholder = lang.amountPlaceholder;
        interestRateInput.placeholder = lang.ratePlaceholder;
        calculateBtn.textContent = lang.calculateBtn;
        
        // Clear previous results
        hideMessages();
    }

    function updateActiveButton() {
        langEnBtn.classList.toggle('active', currentLang === 'en');
        langNpBtn.classList.toggle('active', currentLang === 'np');
    }

    // Event listeners for language switching
    langEnBtn.addEventListener('click', () => switchLanguage('en'));
    langNpBtn.addEventListener('click', () => switchLanguage('np'));

    // Calculate button event listener
    calculateBtn.addEventListener('click', calculateYears);
    
    // Enter key support for both input fields
    amountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateYears();
        }
    });
    
    interestRateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateYears();
        }
    });

    function calculateYears() {
        // Hide previous results and errors
        hideMessages();
        
        // Get the input values
        const amount = parseFloat(amountInput.value);
        const interestRate = parseFloat(interestRateInput.value);
        
        // Validate amount
        if (isNaN(amount) || amount <= 0) {
            showError(languages[currentLang].amountError);
            return;
        }
        
        // Validate interest rate
        if (isNaN(interestRate) || interestRate <= 0) {
            showError(languages[currentLang].rateError);
            return;
        }
        
        // Calculate years using Rule of 72
        const years = 72 / interestRate;
        
        // Format amount with proper currency
        const formattedAmount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: languages[currentLang].currency
        }).format(amount);
        
        // Display result using template
        const resultMessage = languages[currentLang].resultTemplate
            .replace('{amount}', `<strong>${formattedAmount}</strong>`)
            .replace('{years}', `<strong>${years.toFixed(1)}</strong>`)
            .replace('{rate}', `<strong>${interestRate}</strong>`);
        
        showResult(resultMessage);
    }

    function showResult(message) {
        resultDiv.innerHTML = message;
        resultDiv.classList.remove('hidden');
        errorDiv.classList.add('hidden');
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        resultDiv.classList.add('hidden');
    }

    function hideMessages() {
        resultDiv.classList.add('hidden');
        errorDiv.classList.add('hidden');
    }

    // Initialize with English language
    updateUI();
});
