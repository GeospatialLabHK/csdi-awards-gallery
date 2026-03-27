// Listen to button clicks
document.querySelectorAll(".read-more-button").forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        const url = this.getAttribute("data-link");
        showIframe(url);
    });
});

function showIframe(url) {
    var iframeContainer = document.getElementById('iframe-container');
    var iframe = iframeContainer.querySelector('iframe');
    iframe.src = url;
    
    // Show the dark overlay
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    gsap.to(overlay, { opacity: 1, duration: 1.8 });
    
    iframeContainer.style.display = 'flex';

    // GSAP animation to smoothly expand only the iframe
    gsap.fromTo(iframe, 
        { opacity: 0, scale: 0.1 }, 
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    );

    document.querySelector('.cards-container').classList.add('blur-background');
}

function hideIframe() {
    var iframe = document.getElementById('iframe-container').querySelector('iframe');
    
    // Hide the dark overlay
    var overlay = document.getElementById('overlay');
    gsap.to(overlay, {
        opacity: 0, duration: 1.8, onComplete: function() {
            overlay.style.display = 'none';
        }
    });
    
    // GSAP animation to smoothly hide the iframe
    gsap.to(iframe, {
        opacity: 0, scale: 0.7, duration: 1.5, ease: "power2.in",
        onComplete: function() {
            document.getElementById('iframe-container').style.display = 'none';
            document.querySelector('.cards-container').classList.remove('blur-background');
        }
    });
}

// Adding event listener to the <p> element inside #iframe-container to close the iframe when the message is clicked
document.querySelector('#iframe-container p1').addEventListener('click', function() {
    hideIframe();
});

// Adding event listener to the iframe-container to close the iframe when the background area is clicked
document.getElementById('iframe-container').addEventListener('click', function(event) {
    if (event.target === event.currentTarget) {
        hideIframe();
    }
});

// Adding event listener to the <p1> element to close the modal when it's clicked
document.querySelector('p1').addEventListener('click', function() {
    modal.style.display = "none";
});
// Explanation for the <p1> element inside #info-modal
// The <p1> element provides a flashing alert message to instruct users to click
// outside the modal to close it. The flashing animation enhances its visibility.

// Get the modal and its components
var modal = document.getElementById("info-modal");
var infoIcon = document.getElementById("info-icon");
var closeButton = document.getElementsByClassName("close-button")[0];

// Show the modal when the info icon is clicked
infoIcon.onclick = function() {
    modal.style.display = "block";
}

// Hide the modal when the close button is clicked
closeButton.onclick = function() {
    modal.style.display = "none";
}

// Hide the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Language translations
const translations = {
    en: {
        "page-title": "CSDI Awards 2023 🏆",
        "page-caption": "Secondary Category",
        "page-description": "Our showroom features StoryMaps from S1 to S3 students who have been recognized in the Category 2 awards. This year's theme is \"Environmental, Social, and Governance\" (ESG), which addresses crucial issues for our city's sustainable future. Students applied ESG principles to suggest improvements for our city in areas of sustainability, resilience, and diversity. The ESG themes touch upon environmental care, social inclusivity, and resource access, demonstrating the potential of spatial data in problem-solving."
    },
    zh: {
        "page-title": "CSDI 2023 年獎項 🏆",
        "page-caption": "次要類別",
        "page-description": "我們的展廳展出了在第2類獎項中被認可的S1到S3學生的StoryMaps。今年的主題是「環境、社會和治理」(ESG)，該主題涉及我們城市可持續未來的關鍵問題。學生應用了ESG原則，建議改善我們城市在可持續性、恢復力和多樣性方面的問題。ESG主題涉及環境保護、社會包容性和資源訪問，展示了空間數據在解決問題中的潛力。"
    }
};

// Language toggle event listener
document.getElementById("language-toggle").addEventListener("change", function() {
    if (this.checked) {
        window.location.href = "index_zh.html";
    } else {
        window.location.href = "index.html";
    }
});

function applyTranslation(lang) {
    for (const key in translations[lang]) {
        document.getElementById(key).innerText = translations[lang][key];
    }
}
