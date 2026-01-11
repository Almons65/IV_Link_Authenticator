
document.addEventListener('DOMContentLoaded', function() {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        
        let curTab = tabs[0];
        let curUrl = curTab.url; 
        
        const urlInput = document.getElementById('url-input');
        if (urlInput) {
             urlInput.value = curUrl;
        }

        const scanBtn = document.getElementById('scan-btn');
        if (scanBtn) {
            scanBtn.addEventListener('click', function() {
                const urlCheck = urlInput.value
                analyzeLink(urlCheck);
            });
        }
    });
});

function analyzeLink(urlScan) {
    document.getElementById('per-text').textContent = "Analyzing...";
    document.getElementById('result-area').style.display = "block";

    document.getElementById('per-text').className = "percentage-box";

    console.log("Sending URL to Algorithm:", urlScan);

    setTimeout(async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/checkURL", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: urlScan })
            });
            
            const data = await response.json();
            displayResult(data.RiskLevel);
            
        } catch (error) {
            console.log("Error : Status Code 500");
            document.getElementById('per-text').textContent = "Error";
            document.getElementById('per-text').classList.add('danger');
        }
        
    }, 1000)
}

function displayResult(riskPer) {
    const PerBox = document.getElementById('per-text');
    
    PerBox.classList.remove('safe', 'moderate', 'highrisk', 'danger');

    let label = "";

    if (riskPer <= 30) {
        label = "Low Threat";
        PerBox.classList.add('safe');

    } else if (riskPer <= 70) {
        label = "Medium Threat";
        PerBox.classList.add('moderate');

    } else if (riskPer <= 90){
        label = "High Threat";
        PerBox.classList.add('highrisk');

    } else {
        label = "DANGER";
        PerBox.classList.add('danger');
    }

    PerBox.textContent = `${label} (${riskPer}% Risk)`;
}