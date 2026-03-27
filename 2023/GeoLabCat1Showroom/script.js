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
