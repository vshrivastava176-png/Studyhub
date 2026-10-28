# 🎓 StudyHub - Modern Student Companion

A modern, responsive, beginner-friendly web application tailored for students. Built with pure HTML5, CSS3, and JavaScript, featuring a clean **blue and white** aesthetic.

---

## 🌟 Key Features

1. **🏠 Home & Hero Dashboard**
   - Personalized welcome greeting with live calendar date and rotating motivational quotes.
   - Quick stats overview cards (Subject Notes, Question Papers, Active Tasks, Today's Classes).
   - Fast action shortcuts for instant navigation.

2. **📚 Subject Notes Section**
   - Pre-loaded with comprehensive high-yield summaries in **Computer Science**, **Mathematics**, **Physics**, **Chemistry**, and **English**.
   - Real-time search by keywords or topic.
   - Filter pills by subject category.
   - Full note reader modal with clean formatting, bullet points, and instant **Print / Save as PDF** support.
   - **Add Your Own Note**: Add custom lecture notes or formula sheets saved persistently in your browser's `localStorage`.

3. **📄 Previous Question Papers Archive**
   - Curated archive of semester exams, board exams, and midterms from **2024, 2023, 2022**.
   - Filterable by **Subject** and **Year** with a live search bar.
   - Complete question paper preview modal with instructions, question sections, and marking breakdown.
   - Instant **Download Exam Paper** button (exports cleanly formatted study text file).

4. **✅ Daily Study Tasks (To-Do List)**
   - Add study tasks with subject tagging, priority levels (🔥 High, ⚡ Medium, 🌱 Low), and target deadlines.
   - Dynamic progress bar showing your daily completion percentage with motivational feedback.
   - Interactive checkboxes with strike-through animations.
   - Filter between **All**, **Active**, and **Done** tasks.
   - "Clear Completed" button for quick maintenance.
   - Automatically saves and restores all your tasks via `localStorage`.

5. **📅 Interactive Study Timetable**
   - Visual day-by-day weekly schedule tabs (Monday through Sunday).
   - Automatically detects and highlights today's day of the week.
   - Shows time range, subject, session type (Lecture, Lab Practical, Revision, Self Study), and location/room notes.
   - **Add Schedule Slot**: Customize your personal timetable with a popup form.

6. **⏱️ Study Focus Timer (Pomodoro Technique)**
   - 25-minute study focus interval, 5-minute short break, and 15-minute long break modes.
   - Start, Pause, and Reset controls.
   - Built-in soothing synthesized audio chime (using the browser's native Web Audio API — works offline with no extra files!).

7. **📱 100% Responsive Design**
   - Handcrafted with modern vanilla CSS (no heavy external CSS frameworks needed).
   - Looks stunning on mobile phones, tablets, laptops, and ultra-wide desktop monitors.
   - Includes mobile drawer menu with smooth transitions.

---

## 📁 Project Structure

```text
Studyhub/
│
├── index.html          # Semantic HTML5 layout and modal dialogs
├── css/
│   └── style.css       # Blue and white theme styles, responsive grid, animations
├── js/
│   └── app.js          # Interactive JavaScript, LocalStorage managers, timers
└── README.md           # Documentation and run guide
```

---

## 🚀 How to Run the Website in Your Browser

You don't need to install any complex tools, servers, or packages! Because this website is built with standard HTML, CSS, and JavaScript, it runs directly in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari, etc.).

### Method 1: The Quickest Way (Double-Click)
1. Open your File Explorer and navigate to your folder:  
   `C:\Users\Vaishnavi\OneDrive\Desktop\Studyhub`
2. Find the file named **`index.html`**.
3. **Double-click** on `index.html` (or right-click → **Open with** → select **Google Chrome** or **Microsoft Edge**).
4. The website will open instantly in your browser!

### Method 2: Drag and Drop
1. Open your web browser (e.g. Chrome or Edge).
2. Open File Explorer to your `Studyhub` folder.
3. Drag the **`index.html`** file and drop it into an open browser tab.

### Method 3: Using VS Code Live Server (Optional Developer Way)
If you are using Visual Studio Code:
1. Open the `Studyhub` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey) if you haven't already.
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500/index.html` with automatic live reloading whenever you edit code!

---

## 💡 Tips for Customization
- **Change Default Notes**: Open [app.js](file:///c:/Users/Vaishnavi/OneDrive/Desktop/Studyhub/js/app.js) and look for `DEFAULT_NOTES` to edit or add pre-set notes.
- **Change Default Timetable**: In [app.js](file:///c:/Users/Vaishnavi/OneDrive/Desktop/Studyhub/js/app.js), edit `DEFAULT_TIMETABLE` to set your university/school course times.
- **Change Colors**: In [style.css](file:///c:/Users/Vaishnavi/OneDrive/Desktop/Studyhub/css/style.css), edit the `:root` section at the top to adjust the blue shades or accent colors.
