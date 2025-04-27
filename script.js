// Sample course data
const courses = [
    {
        id: 1,
        title: "Hindi Basics",
        description: "Learn basic Hindi vocabulary and grammar",
        level: "Beginner",
        duration: "4 weeks",
        language: "hindi",
        category: "indian"
    },
    {
        id: 2,
        title: "Bengali Conversation",
        description: "Master everyday Bengali conversations",
        level: "Intermediate",
        duration: "6 weeks",
        language: "bengali",
        category: "indian"
    },
    {
        id: 3,
        title: "Tamil Writing",
        description: "Learn to read and write in Tamil",
        level: "Beginner",
        duration: "8 weeks",
        language: "tamil",
        category: "indian"
    },
    {
        id: 4,
        title: "Spanish for Beginners",
        description: "Start your Spanish learning journey",
        level: "Beginner",
        duration: "6 weeks",
        language: "spanish",
        category: "international"
    },
    {
        id: 5,
        title: "Japanese Essentials",
        description: "Learn basic Japanese phrases and writing",
        level: "Beginner",
        duration: "8 weeks",
        language: "japanese",
        category: "international"
    }
];

// Sample quiz data
const quizzes = [
    {
        id: 1,
        title: "Hindi Vocabulary Quiz",
        questions: [
            {
                question: "What does 'नमस्ते' mean?",
                options: ["Hello", "Goodbye", "Thank you", "Please"],
                correct: 0
            },
            {
                question: "What is 'water' in Hindi?",
                options: ["पानी", "भूख", "खाना", "सोना"],
                correct: 0
            }
        ]
    }
];

// User progress data
let userProgress = {
    streak: 0,
    wordsLearned: 0,
    quizzesCompleted: 0,
    languagesLearning: 0
};

// DOM Elements
const courseContainer = document.getElementById('course-container');
const quizContainer = document.getElementById('quiz-container');
const languageSelector = document.getElementById('language-selector');
const streakCount = document.getElementById('streak-count');
const wordsCount = document.getElementById('words-count');
const quizzesCount = document.getElementById('quizzes-count');
const languagesCount = document.getElementById('languages-count');
const categoryButtons = document.querySelectorAll('.category-btn');

// Initialize the app
function init() {
    displayCourses();
    displayQuiz();
    updateProgress();
    setupEventListeners();
}

// Display available courses
function displayCourses(category = 'all') {
    const filteredCourses = category === 'all' 
        ? courses 
        : courses.filter(course => course.category === category);

    courseContainer.innerHTML = filteredCourses.map(course => `
        <div class="course-card">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="course-meta">
                <span>Level: ${course.level}</span>
                <span>Duration: ${course.duration}</span>
            </div>
            <button class="start-course" data-id="${course.id}">Start Course</button>
        </div>
    `).join('');
}

// Display current quiz
function displayQuiz() {
    const currentQuiz = quizzes[0];
    quizContainer.innerHTML = `
        <h3>${currentQuiz.title}</h3>
        <div class="quiz-questions">
            ${currentQuiz.questions.map((q, index) => `
                <div class="question">
                    <p>${index + 1}. ${q.question}</p>
                    <div class="options">
                        ${q.options.map((option, i) => `
                            <button class="option" data-question="${index}" data-option="${i}">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Update progress display
function updateProgress() {
    streakCount.textContent = `${userProgress.streak} days`;
    wordsCount.textContent = userProgress.wordsLearned;
    quizzesCount.textContent = userProgress.quizzesCompleted;
}

// Setup event listeners
function setupEventListeners() {
    // Language selector change
    languageSelector.addEventListener('change', (e) => {
        const selectedLanguage = e.target.value;
        // Here you would typically update the UI language
        console.log(`Language changed to: ${selectedLanguage}`);
    });

    // Course start buttons
    document.querySelectorAll('.start-course').forEach(button => {
        button.addEventListener('click', (e) => {
            const courseId = e.target.dataset.id;
            startCourse(courseId);
        });
    });

    // Quiz option buttons
    document.querySelectorAll('.option').forEach(button => {
        button.addEventListener('click', (e) => {
            const questionIndex = parseInt(e.target.dataset.question);
            const optionIndex = parseInt(e.target.dataset.option);
            checkAnswer(questionIndex, optionIndex);
        });
    });
}

// Start a course
function startCourse(courseId) {
    const course = courses.find(c => c.id === parseInt(courseId));
    if (course) {
        alert(`Starting course: ${course.title}`);
        // Here you would typically navigate to the course content
    }
}

// Check quiz answer
function checkAnswer(questionIndex, optionIndex) {
    const question = quizzes[0].questions[questionIndex];
    const isCorrect = optionIndex === question.correct;
    
    if (isCorrect) {
        alert('Correct!');
        userProgress.quizzesCompleted++;
        updateProgress();
    } else {
        alert('Incorrect. Try again!');
    }
}

// Voice recognition setup
function setupVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'hi-IN'; // Default to Hindi

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log('Voice input:', transcript);
            // Here you would typically process the voice input
        };

        recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
        };

        return recognition;
    }
    return null;
}

// Initialize voice recognition
const voiceRecognition = setupVoiceRecognition();

// Start the app
document.addEventListener('DOMContentLoaded', init); 