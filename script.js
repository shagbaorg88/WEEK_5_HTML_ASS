// ===== PART 1: Variable declarations and conditionals =====

// Declare variables
const themeToggle = document.getElementById('theme-toggle');
const calculateExperienceBtn = document.getElementById('calculate-experience');
const showFactBtn = document.getElementById('show-fact');
const printResumeBtn = document.getElementById('print-resume');
const experienceResult = document.getElementById('experience-result');
const experienceOutput = document.getElementById('experience-output');
const factBox = document.getElementById('fact-box');
const factText = document.getElementById('fact-text');
const skills = document.querySelectorAll('.skill');

// Check for saved theme preference or use preferred color scheme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

// Apply saved theme or system preference
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'Toggle Light Mode';
}

// ===== PART 2: Custom functions =====

// Function to calculate total years of experience
function calculateTotalExperience() {
    const startYear = 2016; // Year MBBS was completed
    const currentYear = new Date().getFullYear();
    const baseExperience = currentYear - startYear;
    
    // Add additional experience based on roles
    let additionalMonths = 0;
    
    // Senior Registrar role (May 2022 - Present)
    const registrarStart = new Date(2022, 4); // May 2022 (month is 0-indexed)
    const today = new Date();
    const registrarMonths = (today.getFullYear() - registrarStart.getFullYear()) * 12 + 
                           (today.getMonth() - registrarStart.getMonth());
    additionalMonths += Math.max(0, registrarMonths);
    
    // Lecturer role (Dec 2022 - Present)
    const lecturerStart = new Date(2022, 11); // Dec 2022
    const lecturerMonths = (today.getFullYear() - lecturerStart.getFullYear()) * 12 + 
                         (today.getMonth() - lecturerStart.getMonth());
    additionalMonths += Math.max(0, lecturerMonths);
    
    // Medical Coordinator role (2019 - 2022, approx 3 years)
    additionalMonths += 36; // 3 years * 12 months
    
    // Convert additional months to years (assuming some overlap in roles)
    const additionalYears = additionalMonths / 12;
    
    // Calculate total experience (base + additional, but don't double count)
    const totalExperience = baseExperience + (additionalYears / 2);
    
    return totalExperience.toFixed(1);
}

// Function to show a random fact
function showRandomFact() {
    const facts = [
        "Dr. Shagbaor has expertise in both medical practice and data analysis—a rare combination!",
        "He is proficient in three languages: English, Tiv, and Hausa.",
        "Dr. Shagbaor has experience with global university admission systems in the UK, US, and Canada.",
        "He has contributed to public education campaigns on science and health topics.",
        "Dr. Shagbaor is currently pursuing a Master of Public Health degree.",
        "He has received a Leadership Award for Rural Health & Science Advocacy.",
        "Dr. Shagbaor has certifications in Data Analytics from Alison and Unicaf/Unithena.",
        "He has experience with digital tools like Tableau, Power BI, Python, and SQL."
    ];
    
    // Get a random fact from the array
    const randomIndex = Math.floor(Math.random() * facts.length);
    return facts[randomIndex];
}

// ===== PART 3: Loop examples =====

// Loop through skills and add click event listeners
skills.forEach(skill => {
    skill.addEventListener('click', () => {
        alert(`You selected: ${skill.textContent}\nDr. Shagbaor has expertise in this area.`);
    });
});

// Loop to log all section headings to console (for demonstration)
const sectionHeadings = document.querySelectorAll('h2');
console.log("Resume Sections:");
for (let i = 0; i < sectionHeadings.length; i++) {
    console.log(`${i + 1}. ${sectionHeadings[i].textContent}`);
}

// ===== PART 4: DOM interactions =====

// DOM Interaction 1: Theme toggle
themeToggle.addEventListener('click', () => {
    // Toggle dark mode class
    document.body.classList.toggle('dark-mode');
    
    // Update button text based on current theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// DOM Interaction 2: Calculate experience
calculateExperienceBtn.addEventListener('click', () => {
    const experience = calculateTotalExperience();
    experienceOutput.textContent = `Dr. Shagbaor has approximately ${experience} years of professional experience across clinical practice, education, and program development.`;
    experienceResult.classList.remove('hidden');
});

// DOM Interaction 3: Show random fact
showFactBtn.addEventListener('click', () => {
    factText.textContent = showRandomFact();
    factBox.classList.remove('hidden');
});

// DOM Interaction 4: Print resume
printResumeBtn.addEventListener('click', () => {
    window.print();
});