
document.addEventListener('DOMContentLoaded', function() {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        
        let curTab = tabs[0];
        let curUrl = curTab.url; 
        
        const urlDisplay = document.getElementById('url-display');
        if (urlDisplay) {
             urlDisplay.textContent = curUrl;
        }

        const scanBtn = document.getElementById('scan-btn');
        if (scanBtn) {
            scanBtn.addEventListener('click', function() {
                analyzeLink(curUrl);
            });
        }
    });
});

function analyzeLink(url) {
    document.getElementById('per-text').textContent = "Analyzing...";
    document.getElementById('rseult-area').style.display = "block";

    console.log("Sending URL to Algorithm:", url);

    
    setTimeout(() => {
        const mockRiskScore = Math.floor(Math.random() * 100); 
        
        displayResult(mockRiskScore);
    }, 1000);
}

function displayResult(num) {
    const PerBox = document.getElementById('per-text');
    const msg = document.getElementById('status-message');
    
    PerBox.textContent = num + "%";
    
    PerBox.classList.remove('safe', 'moderate', 'danger');

    if (num <= 30) {
        PerBox.classList.add('safe');
        msg.textContent = "Safe";
    } else if (num <= 70) {
        PerBox.classList.add('moderate');
        msg.textContent = "Warning: Proceed with caution.";
    } else {
        PerBox.classList.add('danger');
        msg.textContent = "DANGER!";
    }
}