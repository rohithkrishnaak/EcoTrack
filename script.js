// Averages for calculation (Approximated for educational purposes)
// 1 mile driven ~ 0.4 kg CO2
// 1 hour heavy appliance ~ 0.5 kg CO2
// 1 meat meal ~ 2.5 kg CO2

const EMISSION_RATES = {
    transport: 0.4,
    electricity: 0.5,
    diet: 2.5
};

document.getElementById('carbon-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const transportVal = parseFloat(document.getElementById('transport').value);
    const electricityVal = parseFloat(document.getElementById('electricity').value);
    const dietVal = parseFloat(document.getElementById('diet').value);

    // Calculate emissions
    const transportCO2 = transportVal * EMISSION_RATES.transport;
    const electricityCO2 = electricityVal * EMISSION_RATES.electricity;
    const dietCO2 = dietVal * EMISSION_RATES.diet;

    const totalCO2 = transportCO2 + electricityCO2 + dietCO2;

    // Display Results
    document.getElementById('total-co2').innerText = totalCO2.toFixed(1);
    document.getElementById('results').style.display = 'block';

    // Generate Insights
    generateInsights(transportCO2, electricityCO2, dietCO2, totalCO2);
});

function generateInsights(transport, electricity, diet, total) {
    const insightText = document.getElementById('insight-text');
    const actionList = document.getElementById('action-list');
    
    // Clear previous actions
    actionList.innerHTML = '';
    
    let highestCategory = '';
    let highestVal = Math.max(transport, electricity, diet);

    if (highestVal === transport) highestCategory = 'Transportation';
    else if (highestVal === electricity) highestCategory = 'Electricity';
    else highestCategory = 'Diet';

    // Set Insight Paragraph
    if (total < 10) {
        insightText.innerHTML = `<strong>Great job!</strong> Your footprint of ${total.toFixed(1)} kg CO₂ is quite low today. However, your largest emission source was <strong>${highestCategory}</strong>.`;
    } else {
        insightText.innerHTML = `Your footprint today is <strong>${total.toFixed(1)} kg CO₂</strong>. Your biggest area for improvement is <strong>${highestCategory}</strong>. Here are some tailored actions you can take:`;
    }

    // Set Personalized Actions
    const actions = [];

    if (highestCategory === 'Transportation') {
        actions.push("Try carpooling, biking, or taking public transit tomorrow.");
        actions.push("Combine multiple errands into a single trip to save miles.");
    } else if (highestCategory === 'Electricity') {
        actions.push("Unplug heavy appliances when not in active use.");
        actions.push("Switch your thermostat by 2 degrees to save energy.");
    } else {
        actions.push("Try swapping one meat-based meal for a plant-based option tomorrow.");
        actions.push("Buy locally sourced food to reduce transportation emissions in your diet.");
    }

    // General good practice
    actions.push("Track your footprint daily to stay aware of your impact!");

    // Append to list
    actions.forEach(action => {
        let li = document.createElement('li');
        li.innerText = action;
        actionList.appendChild(li);
    });

    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}
