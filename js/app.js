/**
 * StudyHub - Modern Student Companion JavaScript
 * Features:
 *  1. Welcome Date & Daily Quotes
 *  2. Subject Notes (Search, Filter, Read Modal, Add Note with LocalStorage)
 *  3. Previous Question Papers (Subject & Year Filter, Preview Modal, Download)
 *  4. Daily Study Tasks / To-Do List (Add, Complete, Filter, Progress, LocalStorage)
 *  5. Interactive Study Timetable (Weekly Schedule, Day Selector, Add Slots)
 *  6. Focus Pomodoro Timer with Audio Chime
 *  7. Mobile Navigation & Interactive Toast System
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  initDateAndQuotes();
  initMobileMenu();
  initScrollSpy();
  initNotesModule();
  initPapersModule();
  initTasksModule();
  initTimetableModule();
  initTimerModule();
  initModalBackdropClose();
}

/* ===================================================================
   1. DATE, GREETING & MOTIVATIONAL QUOTES
   =================================================================== */
function initDateAndQuotes() {
  const dateElement = document.getElementById('current-day-date');
  const quoteTextElement = document.getElementById('quote-text');
  const quoteAuthorElement = document.getElementById('quote-author');

  // Format current date: e.g. "Wednesday, Oct 28, 2026"
  const now = new Date();
  const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
  if (dateElement) {
    dateElement.textContent = now.toLocaleDateString('en-US', options);
  }

  // Curated list of inspirational student quotes
  const quotes = [
    { text: "Small daily improvements over time lead to stunning results.", author: "— Robin Sharma" },
    { text: "Success is the sum of small efforts, repeated day in and day out.", author: "— Robert Collier" },
    { text: "The secret to getting ahead is getting started.", author: "— Mark Twain" },
    { text: "It always seems impossible until it's done.", author: "— Nelson Mandela" },
    { text: "Focus on progress, not perfection.", author: "— Bill Phillips" },
    { text: "Believe you can and you're halfway there.", author: "— Theodore Roosevelt" }
  ];

  // Pick a random quote on each page load
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  if (quoteTextElement && quoteAuthorElement) {
    quoteTextElement.textContent = `"${randomQuote.text}"`;
    quoteAuthorElement.textContent = randomQuote.author;
  }
}

/* ===================================================================
   2. MOBILE NAVIGATION MENU & SCROLL SPY
   =================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile menu when clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Add subtle shadow to navbar on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   3. SUBJECT NOTES MODULE
   =================================================================== */
const DEFAULT_NOTES = [
  {
    id: 'note-1',
    subject: 'Computer Science',
    title: 'Data Structures: Binary Search Trees (BST)',
    readTime: '6 min read',
    date: 'Oct 24, 2026',
    summary: 'Core properties of Binary Search Trees, traversal orders (Inorder, Preorder, Postorder), and time complexity analysis.',
    content: `
      <h4>1. Definition of a Binary Search Tree (BST)</h4>
      <p>A Binary Search Tree is a node-based binary tree data structure with the following fundamental properties:</p>
      <ul>
        <li>The left subtree of a node contains only nodes with keys lesser than the node's key.</li>
        <li>The right subtree of a node contains only nodes with keys greater than the node's key.</li>
        <li>Both left and right subtrees must also be binary search trees.</li>
      </ul>

      <h4>2. Time Complexity Summary</h4>
      <ul>
        <li><strong>Search:</strong> Average O(log N), Worst Case O(N) when unbalanced/skewed.</li>
        <li><strong>Insertion:</strong> Average O(log N), Worst Case O(N).</li>
        <li><strong>Deletion:</strong> Average O(log N), Worst Case O(N).</li>
      </ul>

      <h4>3. Tree Traversals</h4>
      <ol>
        <li><strong>In-Order (Left, Root, Right):</strong> Produces sorted, ascending order of keys!</li>
        <li><strong>Pre-Order (Root, Left, Right):</strong> Great for creating a copy or prefix expression.</li>
        <li><strong>Post-Order (Left, Right, Root):</strong> Used for deleting trees and postfix expressions.</li>
      </ol>
    `
  },
  {
    id: 'note-2',
    subject: 'Mathematics',
    title: 'Differential Calculus: Derivatives & Chain Rule',
    readTime: '5 min read',
    date: 'Oct 22, 2026',
    summary: 'Essential differentiation rules: Product rule, Quotient rule, and step-by-step applications of the Chain Rule.',
    content: `
      <h4>1. Core Differentiation Formulas</h4>
      <ul>
        <li><strong>Power Rule:</strong> d/dx [x^n] = n * x^(n - 1)</li>
        <li><strong>Exponential:</strong> d/dx [e^x] = e^x, and d/dx [a^x] = a^x * ln(a)</li>
        <li><strong>Logarithm:</strong> d/dx [ln(x)] = 1/x</li>
      </ul>

      <h4>2. Product and Quotient Rules</h4>
      <ul>
        <li><strong>Product Rule:</strong> (u · v)' = u'·v + u·v'</li>
        <li><strong>Quotient Rule:</strong> (u / v)' = (u'·v - u·v') / v^2</li>
      </ul>

      <h4>3. The Chain Rule</h4>
      <p>If y = f(g(x)), then the derivative with respect to x is:</p>
      <p><strong>dy/dx = f'(g(x)) · g'(x)</strong></p>
      <p><em>Example:</em> For y = sin(3x^2), let u = 3x^2. Then dy/dx = cos(3x^2) · (6x) = 6x · cos(3x^2).</p>
    `
  },
  {
    id: 'note-3',
    subject: 'Physics',
    title: 'Electromagnetism: Faraday & Lenz Laws',
    readTime: '7 min read',
    date: 'Oct 19, 2026',
    summary: 'Magnetic flux definitions, electromagnetic induction formulas, and the physical interpretation of Lenz\'s law of opposing currents.',
    content: `
      <h4>1. Magnetic Flux (Φ)</h4>
      <p>Magnetic flux through a surface of area A in a uniform magnetic field B is defined as:</p>
      <p><strong>Φ = B · A · cos(θ)</strong></p>
      <p>Where θ is the angle between magnetic field lines and the normal to the surface. Unit: Weber (Wb).</p>

      <h4>2. Faraday's Law of Induction</h4>
      <p>The magnitude of the induced electromotive force (EMF, ε) in a circuit is proportional to the time rate of change of magnetic flux through the circuit:</p>
      <p><strong>ε = -N · (dΦ / dt)</strong></p>
      <p>Where N is the number of turns in the coil.</p>

      <h4>3. Lenz's Law</h4>
      <p>The negative sign in Faraday's formula indicates that the induced current always flows in such a direction that its own magnetic field opposes the original change in flux that produced it (Conservation of Energy).</p>
    `
  },
  {
    id: 'note-4',
    subject: 'Chemistry',
    title: 'Organic Chemistry: SN1 vs SN2 Mechanisms',
    readTime: '8 min read',
    date: 'Oct 15, 2026',
    summary: 'Direct comparison between Unimolecular (SN1) and Bimolecular (SN2) nucleophilic substitutions: kinetics, solvents, and stereochemistry.',
    content: `
      <h4>1. Mechanism Comparison</h4>
      <ul>
        <li><strong>SN1 (Unimolecular):</strong> 2-step process involving a carbocation intermediate. Rate = k[Substrate].</li>
        <li><strong>SN2 (Bimolecular):</strong> 1-step concerted mechanism with a transition state. Rate = k[Substrate][Nucleophile].</li>
      </ul>

      <h4>2. Substrate Favorability</h4>
      <ul>
        <li><strong>SN1 Favors:</strong> 3° > 2° >> 1° (due to carbocation stability).</li>
        <li><strong>SN2 Favors:</strong> Methyl > 1° > 2° >> 3° (due to minimal steric hindrance).</li>
      </ul>

      <h4>3. Stereochemical Outcome</h4>
      <ul>
        <li><strong>SN1:</strong> Racemization occurs (inversion + retention) because attack can occur from either side of the planar carbocation.</li>
        <li><strong>SN2:</strong> Complete Walden inversion occurs (backside attack).</li>
      </ul>
    `
  },
  {
    id: 'note-5',
    subject: 'Computer Science',
    title: 'Web Dev: Modern JavaScript ES6+ Essentials',
    readTime: '6 min read',
    date: 'Oct 12, 2026',
    summary: 'Arrow functions, destructuring, promises, async/await, template literals, and modern array methods (map, filter, reduce).',
    content: `
      <h4>1. Key Modern Syntax</h4>
      <ul>
        <li><strong>Let & Const:</strong> Block-scoped variables replacing var to avoid variable hoisting pitfalls.</li>
        <li><strong>Arrow Functions:</strong> Compact function syntax with lexical binding of 'this'.</li>
        <li><strong>Destructuring:</strong> Clean extraction of values from objects and arrays: <code>const { name, age } = student;</code></li>
      </ul>

      <h4>2. Asynchronous JavaScript</h4>
      <p>Modern apps use <code>async / await</code> syntax to handle promises cleanly without callback hell:</p>
      <pre style="background:#f1f5f9; padding: 0.8rem; border-radius: 6px; font-family: monospace;">
async function fetchStudyData() {
  try {
    const res = await fetch('/api/notes');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to load notes', err);
  }
}</pre>
    `
  },
  {
    id: 'note-6',
    subject: 'English',
    title: 'Academic Writing: Persuasive Essay Framework',
    readTime: '4 min read',
    date: 'Oct 10, 2026',
    summary: 'The 5-paragraph academic essay architecture: hook, thesis statement, evidence synthesis, counter-arguments, and conclusion.',
    content: `
      <h4>1. The Introduction</h4>
      <ul>
        <li><strong>Hook:</strong> An engaging question, statistic, or thought-provoking quote.</li>
        <li><strong>Bridge:</strong> Contextual background on the topic.</li>
        <li><strong>Thesis Statement:</strong> A concise, single sentence stating your main argument and previewing reasons.</li>
      </ul>

      <h4>2. Body Paragraph Structure (P-E-E-L)</h4>
      <ul>
        <li><strong>P (Point):</strong> Clear topic sentence.</li>
        <li><strong>E (Explanation):</strong> Deepen the claim.</li>
        <li><strong>E (Evidence):</strong> Citations, data, or illustrative examples.</li>
        <li><strong>L (Link):</strong> Connect the argument back to the overall thesis statement.</li>
      </ul>

      <h4>3. The Conclusion</h4>
      <p>Restate the thesis in fresh words, synthesize main points without repeating verbatim, and leave a final lasting impression.</p>
    `
  }
];

function initNotesModule() {
  const notesGrid = document.getElementById('notes-grid');
  const searchInput = document.getElementById('notes-search-input');
  const filterPills = document.querySelectorAll('#notes-filter-pills .pill');
  const addNoteModalBtn = document.getElementById('btn-add-note-modal');
  const addNoteForm = document.getElementById('form-create-note');
  const statNotesCount = document.getElementById('stat-notes-count');

  // Load from LocalStorage or initialize with defaults
  let notes = JSON.parse(localStorage.getItem('studyhub_notes'));
  if (!notes || notes.length === 0) {
    notes = DEFAULT_NOTES;
    localStorage.setItem('studyhub_notes', JSON.stringify(notes));
  }

  // Active filters
  let currentFilter = 'all';
  let searchQuery = '';

  function renderNotes() {
    notesGrid.innerHTML = '';

    const filtered = notes.filter(note => {
      const matchesSubject = currentFilter === 'all' || note.subject.toLowerCase() === currentFilter.toLowerCase();
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            note.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            note.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSubject && matchesSearch;
    });

    if (statNotesCount) {
      statNotesCount.textContent = `${notes.length}+`;
    }

    if (filtered.length === 0) {
      notesGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: #64748b;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📝</div>
          <h3 style="color: #0f172a; margin-bottom: 0.25rem;">No notes found</h3>
          <p>Try searching for a different keyword or selecting another subject category.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(note => {
      const card = document.createElement('div');
      card.className = 'note-card';

      // Badge class based on subject
      let badgeClass = 'badge-general';
      const sub = note.subject.toLowerCase();
      if (sub.includes('computer')) badgeClass = 'badge-cs';
      else if (sub.includes('math')) badgeClass = 'badge-math';
      else if (sub.includes('physics')) badgeClass = 'badge-physics';
      else if (sub.includes('chem')) badgeClass = 'badge-chemistry';
      else if (sub.includes('english')) badgeClass = 'badge-english';

      card.innerHTML = `
        <div>
          <div class="note-card-top">
            <span class="badge ${badgeClass}">${escapeHtml(note.subject)}</span>
            <span class="note-read-time">${escapeHtml(note.readTime || '5 min read')}</span>
          </div>
          <h3 class="note-title">${escapeHtml(note.title)}</h3>
          <p class="note-summary">${escapeHtml(note.summary)}</p>
        </div>
        <div class="note-footer">
          <span class="note-date">${escapeHtml(note.date || 'Recently added')}</span>
          <button class="btn btn-secondary btn-sm btn-read-note" data-note-id="${note.id}">
            Read Note
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      `;

      notesGrid.appendChild(card);
    });

    // Attach click listeners to "Read Note" buttons
    document.querySelectorAll('.btn-read-note').forEach(btn => {
      btn.addEventListener('click', () => {
        const noteId = btn.getAttribute('data-note-id');
        openNoteModal(noteId);
      });
    });
  }

  // Filter button handlers
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      renderNotes();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderNotes();
    });
  }

  // Open "Add Note" Modal
  if (addNoteModalBtn) {
    addNoteModalBtn.addEventListener('click', () => {
      openModal('modal-add-note');
    });
  }

  // Save New Note form handler
  if (addNoteForm) {
    addNoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('new-note-title').value.trim();
      const subject = document.getElementById('new-note-subject').value;
      const summary = document.getElementById('new-note-summary').value.trim();
      const content = document.getElementById('new-note-content').value.trim();

      if (!title || !summary || !content) return;

      const newNote = {
        id: 'note-' + Date.now(),
        subject,
        title,
        readTime: `${Math.max(3, Math.ceil(content.split(' ').length / 80))} min read`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        summary,
        content: `
          <h4>${escapeHtml(title)}</h4>
          <p>${escapeHtml(content).replace(/\n/g, '<br>')}</p>
        `
      };

      notes.unshift(newNote);
      localStorage.setItem('studyhub_notes', JSON.stringify(notes));

      addNoteForm.reset();
      closeModal('modal-add-note');
      renderNotes();
      showToast('✨ Note saved successfully!');
    });
  }

  function openNoteModal(noteId) {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    document.getElementById('modal-note-title').textContent = note.title;
    document.getElementById('modal-note-subject').textContent = note.subject;
    document.getElementById('modal-note-body').innerHTML = note.content;

    openModal('modal-view-note');
  }

  // Initial render
  renderNotes();
}

/* ===================================================================
   4. PREVIOUS QUESTION PAPERS MODULE
   =================================================================== */
const DEFAULT_PAPERS = [
  {
    id: 'paper-1',
    subject: 'Computer Science',
    year: '2024',
    title: 'Data Structures & Algorithms Final Exam',
    term: 'Semester IV Final Examination',
    duration: '3 Hours',
    marks: '100 Marks',
    solutions: true,
    code: 'CS-402',
    instructions: 'Answer all questions from Section A, any three from Section B, and one from Section C.',
    sections: [
      {
        name: 'Section A (20 Marks) - Short Questions',
        questions: [
          'Differentiate between an array and a linked list with respect to memory allocation.',
          'Define Big-O notation and find the time complexity of binary search.',
          'What is a circular queue? How is the full queue condition detected?',
          'Explain the difference between BFS and DFS graph traversals.'
        ]
      },
      {
        name: 'Section B (50 Marks) - Core Problem Solving',
        questions: [
          'Write a complete algorithm to insert and delete a node in an AVL tree, explaining left and right rotations.',
          'Implement Dijkstra\'s algorithm step-by-step for the given weighted graph and state its runtime complexity.',
          'Explain QuickSort with a partition example on the array [29, 10, 14, 37, 13]. Analyze best and worst cases.'
        ]
      },
      {
        name: 'Section C (30 Marks) - Advanced Design',
        questions: [
          'Design an LRU (Least Recently Used) Cache using a Hash Map and Doubly Linked List. Provide pseudocode for get() and put() methods in O(1) time.'
        ]
      }
    ]
  },
  {
    id: 'paper-2',
    subject: 'Mathematics',
    year: '2024',
    title: 'Calculus and Linear Algebra Term Paper',
    term: 'Semester I Mid-Term Test',
    duration: '2 Hours',
    marks: '75 Marks',
    solutions: true,
    code: 'MATH-101',
    instructions: 'Scientific calculators are permitted. Show all working steps clearly.',
    sections: [
      {
        name: 'Section A - Fundamental Calculus (25 Marks)',
        questions: [
          'Evaluate the limit: lim(x -> 0) [sin(5x) / 3x].',
          'Find the derivative dy/dx for y = e^(2x) · ln(x^2 + 1).',
          'State Rolle\'s Theorem and verify it for f(x) = x^2 - 4x + 3 on [1, 3].'
        ]
      },
      {
        name: 'Section B - Linear Algebra & Integrals (50 Marks)',
        questions: [
          'Find the eigenvalues and eigenvectors of matrix A = [[4, 2], [1, 3]].',
          'Evaluate the definite integral of (3x^2 + 2x + 1) dx from 0 to 2.',
          'Solve the system of linear equations using Cramer\'s Rule.'
        ]
      }
    ]
  },
  {
    id: 'paper-3',
    subject: 'Physics',
    year: '2023',
    title: 'Electromagnetic Fields & Wave Theory',
    term: 'Annual Board Examination',
    duration: '3 Hours',
    marks: '100 Marks',
    solutions: true,
    code: 'PHY-201',
    instructions: 'Use of standard physical constants: c = 3.0 x 10^8 m/s, e = 1.6 x 10^-19 C.',
    sections: [
      {
        name: 'Section A - Conceptual Theory (30 Marks)',
        questions: [
          'State and explain Gauss\'s Law in electrostatics in integral and differential forms.',
          'Derive the relationship between electric field intensity E and electric potential V.',
          'Explain the physical significance of the Poynting vector.'
        ]
      },
      {
        name: 'Section B - Numerical Problems (70 Marks)',
        questions: [
          'Calculate the capacitance of a parallel plate capacitor with two dielectric slabs of constants k1 and k2.',
          'A circular coil of 100 turns and radius 10 cm carries a current of 2 A. Find the magnetic field at its center and at a point on its axis 15 cm away.',
          'Derive Maxwell\'s four equations from fundamental laws of electricity and magnetism.'
        ]
      }
    ]
  },
  {
    id: 'paper-4',
    subject: 'Chemistry',
    year: '2023',
    title: 'Physical & Organic Reaction Dynamics',
    term: 'Semester II Examination',
    duration: '3 Hours',
    marks: '100 Marks',
    solutions: false,
    code: 'CHEM-102',
    instructions: 'Illustrate answers with neat reaction mechanisms where appropriate.',
    sections: [
      {
        name: 'Section A - Organic Reactions (50 Marks)',
        questions: [
          'Explain the mechanism of Aldol Condensation with a balanced equation.',
          'Outline the steps involved in Markovnikov and Anti-Markovnikov addition across propene.',
          'Compare the stability of carbocations and free radicals.'
        ]
      },
      {
        name: 'Section B - Chemical Kinetics (50 Marks)',
        questions: [
          'Derive the integrated rate equation for a first-order chemical reaction.',
          'Explain the Arrhenius equation and the concept of activation energy.'
        ]
      }
    ]
  },
  {
    id: 'paper-5',
    subject: 'Computer Science',
    year: '2022',
    title: 'Database Management Systems & SQL',
    term: 'Semester III End-Term Exam',
    duration: '3 Hours',
    marks: '100 Marks',
    solutions: true,
    code: 'CS-305',
    instructions: 'Write syntactically correct SQL queries. Schema diagrams provided.',
    sections: [
      {
        name: 'Section A - Relational Concepts (40 Marks)',
        questions: [
          'What are ACID properties? Explain isolation levels with examples.',
          'Explain 1NF, 2NF, 3NF, and BCNF normalization with normalization anomalies.',
          'Differentiate between primary key, foreign key, and candidate key.'
        ]
      },
      {
        name: 'Section B - SQL Queries & Indexing (60 Marks)',
        questions: [
          'Write SQL queries to find employees earning more than their department\'s average salary.',
          'Explain B-Tree and B+ Tree indexing structures used in modern databases.'
        ]
      }
    ]
  },
  {
    id: 'paper-6',
    subject: 'Mathematics',
    year: '2022',
    title: 'Probability, Statistics & Numerical Methods',
    term: 'Annual Examination',
    duration: '3 Hours',
    marks: '100 Marks',
    solutions: true,
    code: 'MATH-202',
    instructions: 'Statistical tables will be provided on request.',
    sections: [
      {
        name: 'Section A - Probability Distributions (50 Marks)',
        questions: [
          'State Bayes\' theorem and solve the conditional probability problem for disease diagnosis.',
          'Derive the mean and variance for a Binomial and Poisson distribution.'
        ]
      },
      {
        name: 'Section B - Numerical Methods (50 Marks)',
        questions: [
          'Find a real root of x^3 - 2x - 5 = 0 using the Newton-Raphson method correct to 3 decimal places.',
          'Apply Simpson\'s 1/3rd Rule to evaluate the integral from 0 to 1 with step size h = 0.1.'
        ]
      }
    ]
  }
];

function initPapersModule() {
  const papersGrid = document.getElementById('papers-grid');
  const subjectFilter = document.getElementById('paper-subject-filter');
  const yearFilter = document.getElementById('paper-year-filter');
  const searchInput = document.getElementById('paper-search-input');
  const statPapersCount = document.getElementById('stat-papers-count');
  const downloadSimBtn = document.getElementById('btn-download-paper-sim');

  let activePaperForDownload = null;

  if (statPapersCount) {
    statPapersCount.textContent = `${DEFAULT_PAPERS.length}+`;
  }

  function renderPapers() {
    papersGrid.innerHTML = '';
    const selectedSubject = subjectFilter.value;
    const selectedYear = yearFilter.value;
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = DEFAULT_PAPERS.filter(paper => {
      const matchSub = selectedSubject === 'all' || paper.subject.toLowerCase() === selectedSubject.toLowerCase();
      const matchYear = selectedYear === 'all' || paper.year === selectedYear;
      const matchSearch = paper.title.toLowerCase().includes(query) ||
                          paper.subject.toLowerCase().includes(query) ||
                          paper.code.toLowerCase().includes(query);
      return matchSub && matchYear && matchSearch;
    });

    if (filtered.length === 0) {
      papersGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: #64748b;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📄</div>
          <h3 style="color: #0f172a; margin-bottom: 0.25rem;">No question papers found</h3>
          <p>Try resetting the subject or year filter to find more exam papers.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(paper => {
      const card = document.createElement('div');
      card.className = 'paper-card';

      card.innerHTML = `
        <div>
          <div class="paper-header">
            <div class="paper-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <div>
              <div class="paper-meta-pills">
                <span class="year-badge">${escapeHtml(paper.year)}</span>
                <span class="year-badge">${escapeHtml(paper.code)}</span>
                ${paper.solutions ? '<span class="solution-badge">✓ Solutions Included</span>' : ''}
              </div>
              <h3 class="paper-title">${escapeHtml(paper.title)}</h3>
            </div>
          </div>

          <div class="paper-details-list">
            <div class="paper-details-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${escapeHtml(paper.duration)} • ${escapeHtml(paper.marks)}</span>
            </div>
            <div class="paper-details-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/></svg>
              <span>${escapeHtml(paper.term)}</span>
            </div>
          </div>
        </div>

        <div class="paper-actions">
          <button class="btn btn-primary btn-sm btn-view-paper" data-paper-id="${paper.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            View Paper
          </button>
          <button class="btn btn-secondary btn-sm btn-quick-download" data-paper-id="${paper.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </button>
        </div>
      `;

      papersGrid.appendChild(card);
    });

    // Wire up actions
    document.querySelectorAll('.btn-view-paper').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-paper-id');
        openPaperModal(id);
      });
    });

    document.querySelectorAll('.btn-quick-download').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-paper-id');
        downloadPaperFile(id);
      });
    });
  }

  function openPaperModal(paperId) {
    const paper = DEFAULT_PAPERS.find(p => p.id === paperId);
    if (!paper) return;

    activePaperForDownload = paper;

    document.getElementById('modal-paper-title').textContent = paper.title;
    document.getElementById('modal-paper-badge').textContent = `${paper.subject} • ${paper.year}`;
    document.getElementById('modal-paper-meta').textContent = `${paper.term} | ${paper.code} | Duration: ${paper.duration} | Maximum Marks: ${paper.marks}`;

    let sectionsHtml = `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
        <strong>Instructions for Candidates:</strong>
        <p style="margin: 0.25rem 0 0; color: #475569;">${escapeHtml(paper.instructions)}</p>
      </div>
    `;

    paper.sections.forEach(sec => {
      sectionsHtml += `
        <h4>${escapeHtml(sec.name)}</h4>
        <ol>
          ${sec.questions.map(q => `<li>${escapeHtml(q)}</li>`).join('')}
        </ol>
      `;
    });

    if (paper.solutions) {
      sectionsHtml += `
        <div style="margin-top: 1.5rem; padding: 0.85rem; background: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px; font-size: 0.9rem; color: #065f46;">
          <strong>Answer Key & Marking Scheme:</strong> Detailed step-by-step model solutions and marking rubric are compiled inside the downloadable PDF file.
        </div>
      `;
    }

    document.getElementById('modal-paper-body').innerHTML = sectionsHtml;
    openModal('modal-view-paper');
  }

  function downloadPaperFile(paperId) {
    const paper = DEFAULT_PAPERS.find(p => p.id === paperId) || activePaperForDownload;
    if (!paper) return;

    // Create a cleanly formatted markdown/text representation for immediate student download
    let textContent = `==========================================================\n`;
    textContent += `STUDYHUB EXAM ARCHIVE - ${paper.title.toUpperCase()}\n`;
    textContent += `Subject: ${paper.subject} | Year: ${paper.year} | Code: ${paper.code}\n`;
    textContent += `Duration: ${paper.duration} | Max Marks: ${paper.marks}\n`;
    textContent += `Term: ${paper.term}\n`;
    textContent += `==========================================================\n\n`;
    textContent += `INSTRUCTIONS:\n${paper.instructions}\n\n`;

    paper.sections.forEach((sec, idx) => {
      textContent += `\n----------------------------------------------------------\n`;
      textContent += `${sec.name}\n`;
      textContent += `----------------------------------------------------------\n`;
      sec.questions.forEach((q, qIdx) => {
        textContent += `Q${qIdx + 1}. ${q}\n\n`;
      });
    });

    textContent += `\n[Generated via StudyHub - Happy Studying!]`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `${paper.subject}_${paper.year}_${paper.code}.txt`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);

    showToast(`📥 Downloaded "${paper.title}" successfully!`);
  }

  if (downloadSimBtn) {
    downloadSimBtn.addEventListener('click', () => {
      if (activePaperForDownload) {
        downloadPaperFile(activePaperForDownload.id);
      }
    });
  }

  // Filter listeners
  subjectFilter.addEventListener('change', renderPapers);
  yearFilter.addEventListener('change', renderPapers);
  if (searchInput) {
    searchInput.addEventListener('input', renderPapers);
  }

  renderPapers();
}

/* ===================================================================
   5. DAILY STUDY TASKS / TO-DO LIST MODULE
   =================================================================== */
const DEFAULT_TASKS = [
  { id: 'task-1', title: 'Review Binary Search Tree traversals', subject: 'Computer Science', priority: 'High', due: 'Today, 4:00 PM', completed: false },
  { id: 'task-2', title: 'Solve 10 Calculus differentiation problems', subject: 'Mathematics', priority: 'Medium', due: 'Today, 6:00 PM', completed: false },
  { id: 'task-3', title: 'Read Faraday\'s law and summarize in notebook', subject: 'Physics', priority: 'Low', due: 'Tonight, 8:30 PM', completed: true },
  { id: 'task-4', title: 'Revise SN1 vs SN2 reaction kinetics table', subject: 'Chemistry', priority: 'High', due: 'Tomorrow morning', completed: false }
];

function initTasksModule() {
  const taskListElement = document.getElementById('task-list-items');
  const addTaskForm = document.getElementById('add-task-form');
  const taskTitleInput = document.getElementById('task-title-input');
  const taskSubjectInput = document.getElementById('task-subject-input');
  const taskPriorityInput = document.getElementById('task-priority-input');
  const taskDueDateInput = document.getElementById('task-due-date');
  const filterPills = document.querySelectorAll('#task-filter-pills .sub-pill');
  const clearCompletedBtn = document.getElementById('btn-clear-completed');

  // Stats & Progress elements
  const countAll = document.getElementById('count-all');
  const countPending = document.getElementById('count-pending');
  const countDone = document.getElementById('count-done');
  const progressBar = document.getElementById('task-progress-bar');
  const progressPercent = document.getElementById('task-completion-percent');
  const encouragementText = document.getElementById('task-encouragement');
  const heroStatPending = document.getElementById('stat-tasks-pending');

  let tasks = JSON.parse(localStorage.getItem('studyhub_tasks'));
  if (!tasks) {
    tasks = DEFAULT_TASKS;
    localStorage.setItem('studyhub_tasks', JSON.stringify(tasks));
  }

  let activeFilter = 'all';

  function saveTasks() {
    localStorage.setItem('studyhub_tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function renderTasks() {
    taskListElement.innerHTML = '';

    const total = tasks.length;
    const completedCount = tasks.filter(t => t.completed).length;
    const pendingCount = total - completedCount;
    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    // Update counts & progress
    if (countAll) countAll.textContent = total;
    if (countPending) countPending.textContent = pendingCount;
    if (countDone) countDone.textContent = completedCount;
    if (heroStatPending) heroStatPending.textContent = pendingCount;

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressPercent) progressPercent.textContent = `${percent}%`;

    if (encouragementText) {
      if (total === 0) {
        encouragementText.textContent = 'No tasks yet. Add a task to start your study day!';
      } else if (percent === 100) {
        encouragementText.textContent = '🎉 Incredible job! All daily tasks are finished!';
      } else if (percent >= 50) {
        encouragementText.textContent = '⚡ You are more than halfway through your tasks!';
      } else {
        encouragementText.textContent = `${pendingCount} study ${pendingCount === 1 ? 'task' : 'tasks'} remaining today. Keep going!`;
      }
    }

    // Filter tasks
    const filteredTasks = tasks.filter(t => {
      if (activeFilter === 'pending') return !t.completed;
      if (activeFilter === 'completed') return t.completed;
      return true;
    });

    if (filteredTasks.length === 0) {
      taskListElement.innerHTML = `
        <li class="task-empty-state">
          <div class="empty-icon">🎯</div>
          <p>No ${activeFilter !== 'all' ? activeFilter : ''} study tasks found.</p>
        </li>
      `;
      return;
    }

    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;

      let priorityClass = 'priority-medium';
      if (task.priority === 'High') priorityClass = 'priority-high';
      if (task.priority === 'Low') priorityClass = 'priority-low';

      li.innerHTML = `
        <div class="task-left">
          <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-task-id="${task.id}" aria-label="Mark task as complete">
          <div class="task-details">
            <span class="task-text">${escapeHtml(task.title)}</span>
            <div class="task-meta">
              <span>📚 ${escapeHtml(task.subject)}</span>
              <span>⏰ ${escapeHtml(task.due || 'Flexible')}</span>
              <span class="task-priority-tag ${priorityClass}">${escapeHtml(task.priority)}</span>
            </div>
          </div>
        </div>
        <button class="btn-task-delete" data-task-id="${task.id}" title="Delete task">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
      `;

      taskListElement.appendChild(li);
    });

    // Checkbox toggle handlers
    document.querySelectorAll('.task-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.getAttribute('data-task-id');
        const targetTask = tasks.find(t => t.id === id);
        if (targetTask) {
          targetTask.completed = cb.checked;
          saveTasks();
          if (targetTask.completed) {
            showToast('✅ Task completed! Great focus!');
          }
        }
      });
    });

    // Delete task handlers
    document.querySelectorAll('.btn-task-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-task-id');
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        showToast('🗑️ Task removed');
      });
    });
  }

  // Add Task submit handler
  if (addTaskForm) {
    addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = taskTitleInput.value.trim();
      const subject = taskSubjectInput.value;
      const priority = taskPriorityInput.value;
      const due = taskDueDateInput.value.trim() || 'Flexible target';

      if (!title) return;

      const newTask = {
        id: 'task-' + Date.now(),
        title,
        subject,
        priority,
        due,
        completed: false
      };

      tasks.unshift(newTask);
      saveTasks();
      addTaskForm.reset();
      showToast('🎯 New task added to your list!');
    });
  }

  // Filter pills handler
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.getAttribute('data-task-filter');
      renderTasks();
    });
  });

  // Clear completed tasks
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', () => {
      const initialCount = tasks.length;
      tasks = tasks.filter(t => !t.completed);
      if (tasks.length < initialCount) {
        saveTasks();
        showToast('🧹 Cleared all finished tasks');
      }
    });
  }

  renderTasks();
}

/* ===================================================================
   6. STUDY TIMETABLE MODULE
   =================================================================== */
const DEFAULT_TIMETABLE = {
  Monday: [
    { id: 'slot-1', time: '09:00 AM - 10:30 AM', subject: 'Computer Science', type: 'Lecture', location: 'Lab 2 / Prof. Anderson' },
    { id: 'slot-2', time: '11:00 AM - 12:30 PM', subject: 'Mathematics', type: 'Lecture', location: 'Hall B / Calculus & Vectors' },
    { id: 'slot-3', time: '02:00 PM - 03:30 PM', subject: 'Physics', type: 'Lab Practical', location: 'Physics Center / Wave Optics' },
    { id: 'slot-4', time: '04:30 PM - 06:00 PM', subject: 'General Revision', type: 'Self Study', location: 'Library Silent Area' }
  ],
  Tuesday: [
    { id: 'slot-5', time: '09:30 AM - 11:00 AM', subject: 'Chemistry', type: 'Lecture', location: 'Room 104 / Reaction Dynamics' },
    { id: 'slot-6', time: '11:30 AM - 01:00 PM', subject: 'English', type: 'Lecture', location: 'Room 201 / Academic Writing' },
    { id: 'slot-7', time: '03:00 PM - 04:30 PM', subject: 'Computer Science', type: 'Lab Practical', location: 'Coding Hub / DSA Algorithms' }
  ],
  Wednesday: [
    { id: 'slot-8', time: '09:00 AM - 10:30 AM', subject: 'Mathematics', type: 'Lecture', location: 'Hall B / Linear Algebra' },
    { id: 'slot-9', time: '11:00 AM - 12:30 PM', subject: 'Physics', type: 'Lecture', location: 'Room 302 / Electromagnetism' },
    { id: 'slot-10', time: '02:30 PM - 04:00 PM', subject: 'Computer Science', type: 'Self Study', location: 'Web Projects & Practice' }
  ],
  Thursday: [
    { id: 'slot-11', time: '10:00 AM - 11:30 AM', subject: 'Chemistry', type: 'Lab Practical', location: 'Chem Lab 1 / Titrations' },
    { id: 'slot-12', time: '01:30 PM - 03:00 PM', subject: 'Mathematics', type: 'Revision', location: 'Practice Problem Solving' },
    { id: 'slot-13', time: '04:00 PM - 05:30 PM', subject: 'English', type: 'Self Study', location: 'Essay Draft Writing' }
  ],
  Friday: [
    { id: 'slot-14', time: '09:00 AM - 10:30 AM', subject: 'Computer Science', type: 'Lecture', location: 'DBMS & Database Queries' },
    { id: 'slot-15', time: '11:00 AM - 12:30 PM', subject: 'Physics', type: 'Revision', location: 'Exam Formula Revision' },
    { id: 'slot-16', time: '02:00 PM - 04:00 PM', subject: 'Weekly Mock Test', type: 'Self Study', location: 'Previous Question Papers' }
  ],
  Saturday: [
    { id: 'slot-17', time: '10:00 AM - 12:00 PM', subject: 'Self-Paced Study', type: 'Self Study', location: 'Review Week\'s Notes' },
    { id: 'slot-18', time: '02:00 PM - 03:30 PM', subject: 'Project Work', type: 'Lab Practical', location: 'Code Repository & Git' }
  ],
  Sunday: [
    { id: 'slot-19', time: '11:00 AM - 12:30 PM', subject: 'Weekly Planning', type: 'Revision', location: 'Organize Next Week Goals' },
    { id: 'slot-20', time: '04:00 PM - 05:30 PM', subject: 'Light Reading', type: 'Self Study', location: 'Scientific Journals / Articles' }
  ]
};

function initTimetableModule() {
  const dayTabs = document.querySelectorAll('#day-tabs .day-tab');
  const scheduleGrid = document.getElementById('schedule-grid');
  const activeDayTitle = document.getElementById('schedule-active-day-title');
  const activeSlotCount = document.getElementById('schedule-active-count');
  const addSlotModalBtn = document.getElementById('btn-add-slot-modal');
  const addSlotForm = document.getElementById('form-create-slot');
  const heroStatClasses = document.getElementById('stat-today-classes');

  // Load from LocalStorage or initialize with defaults
  let timetable = JSON.parse(localStorage.getItem('studyhub_timetable'));
  if (!timetable) {
    timetable = DEFAULT_TIMETABLE;
    localStorage.setItem('studyhub_timetable', JSON.stringify(timetable));
  }

  // Determine today's day of week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[new Date().getDay()];
  let currentSelectedDay = todayName;

  // Set the "Today" tab active initially
  dayTabs.forEach(tab => {
    if (tab.getAttribute('data-day') === currentSelectedDay) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }

    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentSelectedDay = tab.getAttribute('data-day');
      renderSchedule();
    });
  });

  function renderSchedule() {
    scheduleGrid.innerHTML = '';
    const daySlots = timetable[currentSelectedDay] || [];

    activeDayTitle.textContent = `${currentSelectedDay} Schedule`;
    activeSlotCount.textContent = `${daySlots.length} ${daySlots.length === 1 ? 'session' : 'sessions'} planned`;

    // Update today's session stat on hero
    if (heroStatClasses) {
      const todayCount = (timetable[todayName] || []).length;
      heroStatClasses.textContent = todayCount;
    }

    if (daySlots.length === 0) {
      scheduleGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: #64748b;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📅</div>
          <h3 style="color: #0f172a; margin-bottom: 0.25rem;">No classes or study sessions scheduled for ${currentSelectedDay}</h3>
          <p>Enjoy your free time or click "Add Schedule Slot" above to plan a session!</p>
        </div>
      `;
      return;
    }

    daySlots.forEach(slot => {
      const card = document.createElement('div');
      card.className = 'schedule-card';

      card.innerHTML = `
        <div>
          <div class="schedule-card-top">
            <span class="schedule-time">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${escapeHtml(slot.time)}
            </span>
            <span class="schedule-type-badge">${escapeHtml(slot.type)}</span>
          </div>
          <h4 class="schedule-subject">${escapeHtml(slot.subject)}</h4>
          <p class="schedule-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${escapeHtml(slot.location || 'General Study Session')}
          </p>
        </div>
        <div class="schedule-footer">
          <button class="btn-text-danger btn-delete-slot" data-slot-id="${slot.id}">
            Remove Session
          </button>
        </div>
      `;

      scheduleGrid.appendChild(card);
    });

    // Delete slot handlers
    document.querySelectorAll('.btn-delete-slot').forEach(btn => {
      btn.addEventListener('click', () => {
        const slotId = btn.getAttribute('data-slot-id');
        timetable[currentSelectedDay] = timetable[currentSelectedDay].filter(s => s.id !== slotId);
        localStorage.setItem('studyhub_timetable', JSON.stringify(timetable));
        renderSchedule();
        showToast('🗑️ Session removed from timetable');
      });
    });
  }

  // Open "Add Slot" Modal
  if (addSlotModalBtn) {
    addSlotModalBtn.addEventListener('click', () => {
      document.getElementById('slot-day-select').value = currentSelectedDay;
      openModal('modal-add-slot');
    });
  }

  // Save New Slot form handler
  if (addSlotForm) {
    addSlotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const day = document.getElementById('slot-day-select').value;
      const time = document.getElementById('slot-time-input').value.trim();
      const type = document.getElementById('slot-type-select').value;
      const subject = document.getElementById('slot-subject-input').value.trim();
      const location = document.getElementById('slot-location-input').value.trim();

      if (!time || !subject) return;

      const newSlot = {
        id: 'slot-' + Date.now(),
        time,
        type,
        subject,
        location: location || 'Campus / Home'
      };

      if (!timetable[day]) {
        timetable[day] = [];
      }
      timetable[day].push(newSlot);
      localStorage.setItem('studyhub_timetable', JSON.stringify(timetable));

      addSlotForm.reset();
      closeModal('modal-add-slot');
      currentSelectedDay = day;

      // Update active day tab highlight
      dayTabs.forEach(tab => {
        if (tab.getAttribute('data-day') === day) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      renderSchedule();
      showToast(`📅 Session added to ${day}'s timetable!`);
    });
  }

  renderSchedule();
}

/* ===================================================================
   7. FOCUS POMODORO TIMER MODULE
   =================================================================== */
function initTimerModule() {
  const timerDisplay = document.getElementById('timer-display');
  const timerStatusText = document.getElementById('timer-status-text');
  const btnStart = document.getElementById('btn-timer-start');
  const btnPause = document.getElementById('btn-timer-pause');
  const btnReset = document.getElementById('btn-timer-reset');
  const modeButtons = document.querySelectorAll('.timer-mode-btn');

  let defaultDuration = 1500; // 25 minutes in seconds
  let timeLeft = defaultDuration;
  let timerInterval = null;
  let isRunning = false;
  let currentModeName = 'Study Focus';

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function updateDisplay() {
    if (timerDisplay) {
      timerDisplay.textContent = formatTime(timeLeft);
    }
  }

  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    btnStart.disabled = true;
    btnPause.disabled = false;
    timerStatusText.textContent = `🎯 ${currentModeName} in progress...`;

    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        btnStart.disabled = false;
        btnPause.disabled = true;
        playTimerChime();
        timerStatusText.textContent = '🔔 Session Complete! Take a well-earned break!';
        showToast('🎉 Time is up! Fantastic work on your study session!');
      }
    }, 1000);
  }

  function pauseTimer() {
    if (!isRunning) return;
    clearInterval(timerInterval);
    isRunning = false;
    btnStart.disabled = false;
    btnPause.disabled = true;
    timerStatusText.textContent = '⏸️ Session Paused';
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = defaultDuration;
    btnStart.disabled = false;
    btnPause.disabled = true;
    updateDisplay();
    timerStatusText.textContent = `Ready for ${currentModeName}`;
  }

  // Synthesized Audio chime using Web Audio API (No external mp3 dependencies required!)
  function playTimerChime() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.log('Audio chime not supported or muted:', e);
    }
  }

  // Event Listeners for buttons
  if (btnStart) btnStart.addEventListener('click', startTimer);
  if (btnPause) btnPause.addEventListener('click', pauseTimer);
  if (btnReset) btnReset.addEventListener('click', resetTimer);

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      defaultDuration = parseInt(btn.getAttribute('data-time'), 10);
      currentModeName = btn.getAttribute('data-mode');
      resetTimer();
    });
  });

  updateDisplay();
}

/* ===================================================================
   8. MODALS & POPUP CONTROLS
   =================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function initModalBackdropClose() {
  // Close buttons with data-close-modal
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => {
      const targetId = el.getAttribute('data-close-modal');
      closeModal(targetId);
    });
  });

  // Click outside modal content to close
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        modal.classList.remove('open');
      });
      document.body.style.overflow = '';
    }
  });
}

/* ===================================================================
   9. INTERACTIVE TOAST NOTIFICATIONS
   =================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      if (toast.parentNode === container) {
        container.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

/* ===================================================================
   10. HELPER UTILITIES
   =================================================================== */
function escapeHtml(string) {
  if (typeof string !== 'string') return string;
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return string.replace(/[&<>"']/g, s => entityMap[s]);
}
