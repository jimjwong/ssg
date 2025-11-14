const courseIdInput = document.getElementById('courseId');
const buttonsSection = document.getElementById('buttonsSection');
const qrButton = document.getElementById('qrButton');
const attendanceButton = document.getElementById('attendanceButton');

// Only allow numeric input
courseIdInput.addEventListener('input', function(e) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Check if we have 6 digits
    if (this.value.length === 6) {
        showButtons();
        updateButtonLinks(this.value);
    } else {
        hideButtons();
    }
});

// Handle paste events
courseIdInput.addEventListener('paste', function(e) {
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const numericOnly = pastedText.replace(/[^0-9]/g, '').substring(0, 6);
    this.value = numericOnly;
    
    if (numericOnly.length === 6) {
        showButtons();
        updateButtonLinks(numericOnly);
    } else {
        hideButtons();
    }
});

function showButtons() {
    buttonsSection.style.display = 'flex';
}

function hideButtons() {
    buttonsSection.style.display = 'none';
}

function updateButtonLinks(digits) {
    const courseRunCode = `RA${digits}`;
    
    const qrUrl = `https://www.myskillsfuture.gov.sg/spface/splogin/select-session?course-run-code=${courseRunCode}`;
    const attendanceUrl = `https://www.myskillsfuture.gov.sg/api/take-attendance/${courseRunCode}`;
    
    qrButton.onclick = () => {
        window.open(qrUrl, '_blank');
    };
    
    attendanceButton.onclick = () => {
        window.open(attendanceUrl, '_blank');
    };
}

// Focus on input when page loads
window.addEventListener('load', () => {
    courseIdInput.focus();
});

