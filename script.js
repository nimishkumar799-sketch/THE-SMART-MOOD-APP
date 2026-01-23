// 1. Run this immediately when the page loads
window.onload = function() {
    setGreeting();
    loadTasks(); // Add this line!
    const datePara = document.getElementById('date-display');
    datePara.innerText = new Date().toDateString();
};
// 2. Updated Save Function
function saveGoal() {
    const input = document.getElementById('goalInput');
    const display = document.getElementById('activeGoal');
    
    if (input.value !== "") {
        const fullGoal = "Today's Goal: " + input.value;
        
        // Save to screen
        display.innerText = fullGoal;
        
        // Save to browser memory (The Magic Part!)
        localStorage.setItem('userGoal', fullGoal);
        
        input.value = ""; 
    } else {
        alert("Please type something first!");
    }
}

// 3. Mood Function
function updateMood(mood) {
    const contentBox = document.getElementById('content-box');
    if (mood === 'productive') {
        contentBox.innerHTML = `
            <h3 style="color: #3b82f6;">🚀 Focus Mode On</h3>
            <p>Ready to crush Semester 2?</p>
            <button class="btn" style="margin-top:10px; background:#222; border:1px solid #3b82f6" onclick="window.open('https://linkedin.com')">Open LinkedIn</button>
        `;
    } else {
        contentBox.innerHTML = `<h3 style="color: #10b981;">☕ Chill Vibes</h3><p>Time to recharge, Dear.</p>`;
    }
}
function clearGoal() {
    // 1. Remove from Browser Memory
    localStorage.removeItem('userGoal');
    
    // 2. Remove from Screen
    document.getElementById('activeGoal').innerText = "";
    
    alert("Goal cleared! What's next?");
}
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    // This makes sure 9 seconds looks like "09"
    document.getElementById('timer-display').innerText = 
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    // Prevent multiple timers from running at once
    clearInterval(timer);
    
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            function startTimer() {
    clearInterval(timer);
    
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            // This is the new line to play the sound!
            document.getElementById('alarm-sound').play(); 
            alert("Time's up! Great session, Nimish. Take a break!");
        }
    }, 1000);
}
            
            clearInterval(timer);
            alert("Time's up! Take a 5-minute break, Nimish.");
        }
    }, 1000); // 1000 milliseconds = 1 second
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 25 * 60;
    updateTimerDisplay();
}
function addTask() {
    const input = document.getElementById('taskInput');
    const list = document.getElementById('taskList');
    
    if (input.value.trim() !== "") {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text" onclick="toggleTask(this)">${input.value}</span>
            <button onclick="this.parentElement.remove(); updateProgress();" 
                    style="background:none; border:none; color:#ef4444; font-size:18px; cursor:pointer;">
                &times;
            </button>
        `;
        list.appendChild(li);
        input.value = ""; 
        
        // --- TRIGGER PROGRESS UPDATE ---
        updateProgress(); 
    }
}
function clearCompleted() {
    // 1. Find all tasks that have the 'completed' class
    const completedTasks = document.querySelectorAll('.completed');
    
    // 2. Loop through them and remove them from the screen
    completedTasks.forEach(task => {
        // We remove the 'li' (the parent of the span text)
        task.parentElement.remove();
    });

    // 3. Update the progress ring/text since tasks are gone
    if (typeof updateProgress === "function") {
        updateProgress();
    }
}

function toggleTask(element) {
    element.classList.toggle('completed');
    
    // --- TRIGGER PROGRESS UPDATE ---
    updateProgress(); 
}
// 1. Dynamic Greeting
function setGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.getElementById('greeting');
    if (hour < 12) greetingElement.innerText = "Good Morning, Nimish";
    else if (hour < 18) greetingElement.innerText = "Good Afternoon, Nimish";
    else greetingElement.innerText = "Good Evening, Nimish";
}

// 2. Update Progress Circle
function updateProgress() {
    const tasks = document.querySelectorAll('.task-text');
    const completed = document.querySelectorAll('.completed');
    const percent = tasks.length > 0 ? Math.round((completed.length / tasks.length) * 100) : 0;
    
    // Update text
    document.getElementById('progress-percent').innerText = percent + "%";
    
    // Update Ring (Circle circumference is ~157)
    const circle = document.getElementById('progress-bar');
    const offset = 157.08 - (percent / 100 * 157.08);
    circle.style.strokeDashoffset = offset;
}

// Call these inside your existing addTask and toggleTask functions!
// Just add updateProgress(); at the end of those functions.

window.onload = function() {
    setGreeting();
    // ... rest of your existing window.onload code
};
function toggleDeepWork() {
    const body = document.body;
    const btn = document.getElementById('focus-mode-btn');
    const music = document.getElementById('zen-audio');
    
    body.classList.toggle('deep-work-active');
    
    if (body.classList.contains('deep-work-active')) {
        btn.innerText = "✕ Exit Focus";
        
        // Advanced: Start quiet and set volume
        music.volume = 0.4; 
        music.play();
        
        // Visual feedback: Change button to a "Zen" red
        btn.style.borderColor = "#ef4444";
        btn.style.color = "#ef4444";
    } else {
        btn.innerText = "✨ Enter Deep Work";
        btn.style.borderColor = "#3b82f6";
        btn.style.color = "#3b82f6";
        
        // Pause music instantly when leaving
        music.pause();
    }
}
// Function to Save all tasks to LocalStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').innerText,
            completed: li.querySelector('.task-text').classList.contains('completed')
        });
    });
    localStorage.setItem('nimishTasks', JSON.stringify(tasks));
}

// Function to Load tasks when the page opens
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('nimishTasks'));
    if (savedTasks) {
        const list = document.getElementById('taskList');
        savedTasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-text ${task.completed ? 'completed' : ''}" onclick="toggleTask(this)">${task.text}</span>
                <button onclick="this.parentElement.remove(); saveTasks(); updateProgress();" 
                        style="background:none; border:none; color:#ef4444; font-size:18px; cursor:pointer;">
                    &times;
                </button>
            `;
            list.appendChild(li);
        });
        updateProgress();
    }
}
function updateStreak() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisitDate');
    let streak = parseInt(localStorage.getItem('studyStreak')) || 0;

    if (lastVisit !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastVisit === yesterday.toDateString()) {
            // You came back exactly one day later!
            streak++;
        } else if (lastVisit === null || new Date(lastVisit) < yesterday) {
            // First time ever, or you missed a day
            streak = 1;
        }
        
        localStorage.setItem('studyStreak', streak);
        localStorage.setItem('lastVisitDate', today);
    }

    document.getElementById('streak-count').innerText = streak;
}
function updateAura(state) {
    const aura = document.getElementById('main-aura');
    // Remove old states
    aura.classList.remove('flow-state', 'break-state');
    
    if (state === 'flow') {
        aura.classList.add('flow-state');
    } else if (state === 'break') {
        aura.classList.add('break-state');
    }
}

// UPDATE YOUR EXISTING TOGGLE FUNCTION:
function toggleDeepWork() {
    const body = document.body;
    const btn = document.getElementById('focus-mode-btn');
    const music = document.getElementById('zen-audio');
    const aura = document.getElementById('main-aura');
    
    // Toggle the mode
    body.classList.toggle('deep-work-active');
    
    if (body.classList.contains('deep-work-active')) {
        btn.innerText = "✕ Exit Focus";
        
        // Play music if it exists
        if (music) {
            music.currentTime = 0;
            music.play().catch(e => console.log("Audio play blocked"));
        }
        
        // Update Aura if it exists
        if (aura) {
            aura.classList.add('flow-state');
        }
    } else {
        btn.innerText = "✨ Enter Deep Work";
        
        if (music) music.pause();
        if (aura) aura.classList.remove('flow-state');
    }
}
const canvas = document.getElementById('canvas-dots');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];
for (let i = 0; i < 50; i++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(59, 130, 246, 0.5)";
    
    dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw lines between nearby dots
        dots.forEach(otherDot => {
            let dx = dot.x - otherDot.x;
            let dy = dot.y - otherDot.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 100) {
                ctx.strokeStyle = `rgba(59, 130, 246, ${1 - dist/100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(otherDot.x, otherDot.y);
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(drawDots);
}
drawDots();
// Detect phone shake using DeviceMotion API
let lastX, lastY, lastZ;
let threshold = 15; // How hard you have to shake

window.addEventListener('devicemotion', (event) => {
    let acceleration = event.accelerationIncludingGravity;
    
    if (lastX !== null) {
        let deltaX = Math.abs(lastX - acceleration.x);
        let deltaY = Math.abs(lastY - acceleration.y);
        let deltaZ = Math.abs(lastZ - acceleration.z);

        if (((deltaX > threshold) && (deltaY > threshold)) || 
            ((deltaX > threshold) && (deltaZ > threshold)) || 
            ((deltaY > threshold) && (deltaZ > threshold))) {
            
            // SHAKE DETECTED
            if(confirm("Clear all completed tasks?")) {
                clearCompleted();
            }
        }
    }

    lastX = acceleration.x;
    lastY = acceleration.y;
    lastZ = acceleration.z;
});
function toggleReadingMode() {
    const body = document.body;
    body.classList.toggle('reading-mode');
    
    // Save preference to LocalStorage
    const isReading = body.classList.contains('reading-mode');
    localStorage.setItem('readingMode', isReading);
    
    // Haptic feedback (vibration) for mobile users
    if (window.navigator.vibrate) {
        window.navigator.vibrate(50); 
    }
}

// Add this inside your window.onload to remember the setting
if (localStorage.getItem('readingMode') === 'true') {
    document.body.classList.add('reading-mode');
}
let examInterval;

function setExamDate() {
    const dateInput = prompt("Enter Exam Date (YYYY-MM-DD HH:MM):", "2026-05-15 09:00");
    const labelInput = prompt("Exam Name:", "Final Math Exam");
    
    if (dateInput && labelInput) {
        localStorage.setItem('examDate', dateInput);
        localStorage.setItem('examLabel', labelInput);
        startCountdown();
    }
}

function startCountdown() {
    clearInterval(examInterval);
    const targetDate = new Date(localStorage.getItem('examDate')).getTime();
    const label = localStorage.getItem('examLabel');
    
    if (!targetDate) return;
    
    document.getElementById('exam-label').innerText = "Until: " + label;

    examInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-timer').innerHTML = 
            `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(examInterval);
            document.getElementById('countdown-timer').innerHTML = "EXAM DAY!";
        }
    }, 1000);
}

// Start it up on load
startCountdown();
function addResource() {
    const name = document.getElementById('resource-name').value;
    const url = document.getElementById('resource-url').value;
    const grid = document.getElementById('resource-grid');

    if (name && url) {
        let icon = "🔗"; // Default
        if (url.includes("youtube.com") || url.includes("youtu.be")) icon = "📺";
        if (url.includes(".pdf")) icon = "📄";
        if (url.includes("drive.google")) icon = "📁";

        const card = document.createElement('a');
        card.href = url;
        card.target = "_blank";
        card.className = "resource-card";
        card.innerHTML = `<span>${icon}</span> ${name}`;

        grid.appendChild(card);
        
        // Save to localStorage
        saveResources();
        
        document.getElementById('resource-name').value = "";
        document.getElementById('resource-url').value = "";
    }
}

function saveResources() {
    const grid = document.getElementById('resource-grid').innerHTML;
    localStorage.setItem('savedResources', grid);
}

// Load resources on startup
window.addEventListener('load', () => {
    const saved = localStorage.getItem('savedResources');
    if (saved) document.getElementById('resource-grid').innerHTML = saved;
});
function calculateRequired() {
    const current = parseFloat(document.getElementById('current-grade').value) / 100;
    const weight = parseFloat(document.getElementById('exam-weight').value) / 100;
    const target = parseFloat(document.getElementById('target-grade').value) / 100;
    const resultDisplay = document.getElementById('calc-result');

    if (current && weight && target) {
        // The Math: Calculating what you need on the final
        const required = (target - (current * (1 - weight))) / weight;
        const percent = (required * 100).toFixed(1);

        if (percent > 100) {
            resultDisplay.style.color = "#ef4444";
            resultDisplay.innerText = `You need ${percent}%... That's a tough one! Aim high! 🚀`;
        } else if (percent <= 0) {
            resultDisplay.innerText = `You've already passed! Relax and focus on other subjects. ✅`;
        } else {
            resultDisplay.style.color = "#10b981";
            resultDisplay.innerText = `To get ${target*100}%, you need ${percent}% on your final exam.`;
        }
    } else {
        alert("Please fill in all three fields!");
    }
}