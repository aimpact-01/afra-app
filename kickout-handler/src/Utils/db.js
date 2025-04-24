async function insertKickoutData() {
    const payload = {
        "description": "ClearBroker Is Missing",
        "priority": "Low",
        "kickout_type": "FTB_SETUP",
        "details": {
            "trader_name": "Test Trader",
            "trader_code": "TESTTRADER"
        }
    };

    try {
        const response = await fetch('https://ceefde25v6-vpce-00885819822df6078.execute-api.us-east-1.amazonaws.com/api/kickout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Insertion successful:', result);
        return result;
    } catch (error) {
        console.error('Failed to insert data:', error);
        throw error;
    }
};

module.exports = { insertKickoutData };

