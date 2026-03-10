/**
 * ═══════════════════════════════════════════════════════════
 *  KL UNIVERSITY — COURSE REGISTRATION PORTAL
 *  script.js
 *
 *  DSA Concepts Implemented:
 *  ① Arrays / List  — Course catalogue storage & traversal
 *  ② Linked List    — Enrolled course chain traversal
 *  ③ Stack (LIFO)   — Undo / history of enrollments
 *  ④ Queue (FIFO)   — Enrollment processing order
 *  ⑤ Linear Search  — Search course by code
 *  ⑥ Binary Search  — Search course by credits (sorted array)
 *  ⑦ Bubble Sort    — Sort by credits
 *  ⑧ Selection Sort — Sort by course code
 *  ⑨ Insertion Sort — Sort by title
 *  ⑩ Merge Sort     — Sort by max BTL
 *  ⑪ Quick Sort     — Sort by credits (partition)
 * ═══════════════════════════════════════════════════════════
 */

"use strict";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ① COURSE DATA — Array of Objects (Array/List)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const COURSES = [
  {
    id: "dsa",
    code: "CSE2102",
    category: "dsa",
    title: "Data Structures & Algorithms",
    credits: 4,
    cos: [
      {
        no: "CO1", btl: 4,
        po: "PO2,PO3,PO5,PO1",
        desc: "Analyze problem statements and reason about algorithmic efficiency using asymptotic notation (Big-O, Ω, Θ), recurrence relations, and empirical measurements of time and space complexity, in order to compare alternative solutions. Implement and analyze classical searching and sorting algorithms in Java (including linear search, binary search, bubble, selection, insertion, merge, quick), and justify the choice of algorithm for different input characteristics and constraints."
      },
      {
        no: "CO2", btl: 4,
        po: "PO1,PO2,PO3,PO5",
        desc: "Design and implement Abstract Data Types (ADTs) using arrays and linked lists (singly, doubly, circular), perform typical operations (insert, delete, search, traverse, reverse, detect cycles), and reason about their trade-offs for different use cases."
      },
      {
        no: "CO3", btl: 3,
        po: "PO1,PO2,PO3,PO5",
        desc: "Apply stacks and queues (including circular queues and deques) to model real-world workflows, selecting appropriate implementations (array-based or linked) based on performance considerations. Implement heaps and priority queues, and use them in scenarios that require prioritized processing, analyzing their performance compared to other linear data structures."
      },
      {
        no: "CO4", btl: 4,
        po: "PO3,PO5,PO2,PO1",
        desc: "Design and implement hash-based data structures (hash tables with chaining and open addressing) and leverage Java Collections (List, Queue, Deque, Map) to build efficient, scalable solutions to realistic problems that demand fast lookup and updates."
      },
      {
        no: "CO5", btl: 4,
        po: "PO1,PO2,PO3,PO5,PO9,PO11",
        desc: "Design, Develop and evaluate common practical applications for linear Data Structures."
      },
      {
        no: "CO6", btl: 5,
        po: "PO1,PO2,PO3,PO5,PO9,PO11",
        desc: "Skill the students in such a way that students will be able to develop and create programs as well as applications in Data Structures."
      }
    ]
  },
  {
    id: "web",
    code: "CSE2201",
    category: "web",
    title: "Full Stack Web Development",
    credits: 4,
    cos: [
      {
        no: "CO1", btl: 3,
        po: "PO3,PO9,PSO1",
        desc: "Apply Internet Fundamentals, HTML & Introductory CSS Styling to build structured, semantically correct, and visually styled web pages."
      },
      {
        no: "CO2", btl: 3,
        po: "PO3,PO9,PSO1",
        desc: "Apply HTML Forms, Semantic Tags & Comprehensive CSS Layouts including Flexbox and Grid to design accessible, standards-compliant web interfaces."
      },
      {
        no: "CO3", btl: 3,
        po: "PO3,PO9,PSO1",
        desc: "Apply JavaScript Programming Essentials including variables, control structures, functions, and event-driven programming to add interactivity to web pages."
      },
      {
        no: "CO4", btl: 3,
        po: "PO3,PO9,PSO1",
        desc: "Apply JavaScript Interactivity and DOM manipulation techniques to create dynamic, responsive, and user-friendly web applications."
      },
      {
        no: "CO5", btl: 3,
        po: "PO3,PO9,PSO1",
        desc: "Apply Advanced Web Development & Deployment techniques including frameworks, version control, and cloud hosting to publish production-ready web applications."
      }
    ]
  },
  {
    id: "js",
    code: "CSE2202",
    category: "js",
    title: "JavaScript Programming",
    credits: 4,
    cos: [
      {
        no: "CO1", btl: 3,
        po: "PO3,PO9,PSO1",
        desc: "Apply JavaScript fundamentals including variables (var, let, const), data types, type coercion, operators, and control flow structures (if/else, switch, loops) to write interactive scripts."
      },
      {
        no: "CO2", btl: 4,
        po: "PO3,PO5,PO9,PSO1",
        desc: "Analyze JavaScript functions including declarations, expressions, arrow functions, closures, higher-order functions (map, filter, reduce), and callbacks to modularize and reuse logic effectively."
      },
      {
        no: "CO3", btl: 4,
        po: "PO3,PO5,PO9,PSO1",
        desc: "Analyze the Document Object Model (DOM) and Browser Object Model (BOM) to dynamically select, create, modify, and delete HTML elements; handle user events; and manipulate CSS styles programmatically."
      },
      {
        no: "CO4", btl: 4,
        po: "PO3,PO5,PO9,PSO1",
        desc: "Design and implement Object-Oriented JavaScript using ES6 classes, inheritance (extends/super), prototypal chains, getters/setters, and encapsulation principles to build structured, reusable applications."
      },
      {
        no: "CO5", btl: 5,
        po: "PO3,PO5,PO9,PO11,PSO1",
        desc: "Evaluate asynchronous JavaScript concepts including the event loop, Promises (resolve, reject, chaining), async/await, and Fetch API to build non-blocking programs that consume REST APIs and handle errors gracefully."
      },
      {
        no: "CO6", btl: 6,
        po: "PO1,PO3,PO5,PO9,PO11,PSO1",
        desc: "Create full-featured JavaScript applications integrating ES6+ features (destructuring, spread/rest, modules, template literals), browser storage (localStorage, sessionStorage), and modern tooling to develop production-quality interactive web solutions."
      }
    ]
  },
  {
    id: "react",
    code: "CSE2203",
    category: "js",
    title: "React.js & Modern Frontend",
    credits: 3,
    cos: [
      {
        no: "CO1", btl: 3,
        po: "PO3,PO9,PSO1",
        desc: "Apply React fundamentals including JSX syntax, component architecture (functional & class), props, state, and the virtual DOM to build structured user interface components."
      },
      {
        no: "CO2", btl: 4,
        po: "PO3,PO5,PO9,PSO1",
        desc: "Analyze React Hooks (useState, useEffect, useContext, useRef, useMemo, useCallback) to manage component lifecycle, side effects, and performance optimization in functional components."
      },
      {
        no: "CO3", btl: 4,
        po: "PO3,PO5,PO9,PSO1",
        desc: "Design and implement React Router for single-page application (SPA) navigation, dynamic routing, nested routes, and protected routes with authentication guards."
      },
      {
        no: "CO4", btl: 5,
        po: "PO3,PO5,PO9,PO11,PSO1",
        desc: "Evaluate state management solutions (Context API, Redux Toolkit) to architect scalable, predictable data flow in complex React applications with asynchronous API integration."
      },
      {
        no: "CO5", btl: 6,
        po: "PO1,PO3,PO5,PO9,PO11,PSO1",
        desc: "Create and deploy complete React applications with component libraries, custom hooks, testing (Jest/React Testing Library), build optimization, and CI/CD pipelines."
      }
    ]
  },
  {
    id: "os",
    code: "CSE2103",
    category: "dsa",
    title: "Operating Systems",
    credits: 3,
    cos: [
      {
        no: "CO1", btl: 3,
        po: "PO1,PO2,PO3",
        desc: "Understand and explain fundamental OS concepts including process management, CPU scheduling algorithms, and inter-process communication mechanisms."
      },
      {
        no: "CO2", btl: 4,
        po: "PO1,PO2,PO4",
        desc: "Analyze memory management strategies including paging, segmentation, and virtual memory to optimize system performance and utilization."
      },
      {
        no: "CO3", btl: 4,
        po: "PO1,PO3,PO5",
        desc: "Design and evaluate file system structures and storage management techniques for reliable and efficient data access."
      },
      {
        no: "CO4", btl: 3,
        po: "PO2,PO3,PO5",
        desc: "Apply synchronization mechanisms such as semaphores, monitors, and deadlock avoidance algorithms in concurrent environments."
      }
    ]
  },
  {
    id: "dbms",
    code: "CSE2104",
    category: "web",
    title: "Database Management Systems",
    credits: 4,
    cos: [
      {
        no: "CO1", btl: 3,
        po: "PO1,PO2,PO3",
        desc: "Apply relational database design concepts including ER modeling, normalization (1NF–3NF/BCNF), and schema design for real-world applications."
      },
      {
        no: "CO2", btl: 4,
        po: "PO1,PO3,PO5",
        desc: "Analyze and write complex SQL queries involving joins, subqueries, views, indexes, triggers, and stored procedures for data retrieval and manipulation."
      },
      {
        no: "CO3", btl: 4,
        po: "PO2,PO3,PO5",
        desc: "Design and implement transaction management techniques including ACID properties, concurrency control (locking, MVCC), and recovery mechanisms."
      },
      {
        no: "CO4", btl: 5,
        po: "PO1,PO2,PO9,PO11",
        desc: "Evaluate and deploy NoSQL databases and compare their architecture, performance, and appropriate use cases versus relational models."
      }
    ]
  }
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ② LINKED LIST — For enrolled course chain
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
class ListNode {
  constructor(courseId) {
    this.courseId = courseId;
    this.next = null;
  }
}

class LinkedList {
  constructor() { this.head = null; this.size = 0; }

  append(courseId) {
    const node = new ListNode(courseId);
    if (!this.head) { this.head = node; }
    else {
      let cur = this.head;
      while (cur.next) cur = cur.next;
      cur.next = node;
    }
    this.size++;
  }

  remove(courseId) {
    if (!this.head) return false;
    if (this.head.courseId === courseId) { this.head = this.head.next; this.size--; return true; }
    let cur = this.head;
    while (cur.next) {
      if (cur.next.courseId === courseId) { cur.next = cur.next.next; this.size--; return true; }
      cur = cur.next;
    }
    return false;
  }

  toArray() {
    const arr = []; let cur = this.head;
    while (cur) { arr.push(cur.courseId); cur = cur.next; }
    return arr;
  }

  traverse() {
    const result = [];
    let cur = this.head, idx = 0;
    while (cur) {
      result.push({ index: idx, courseId: cur.courseId });
      cur = cur.next; idx++;
    }
    return result;
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ③ STACK — LIFO (Enrollment history / undo)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
class Stack {
  constructor() { this.items = []; }

  push(item) { this.items.push(item); }
  pop()      { return this.items.length ? this.items.pop() : null; }
  peek()     { return this.items.length ? this.items[this.items.length - 1] : null; }
  isEmpty()  { return this.items.length === 0; }
  size()     { return this.items.length; }
  toArray()  { return [...this.items]; }
  display()  { return [...this.items].reverse(); } // top first
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ④ QUEUE — FIFO (Enrollment processing order)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
class Queue {
  constructor() { this.items = []; }

  enqueue(item) { this.items.push(item); }
  dequeue()     { return this.items.length ? this.items.shift() : null; }
  front()       { return this.items.length ? this.items[0] : null; }
  isEmpty()     { return this.items.length === 0; }
  size()        { return this.items.length; }
  toArray()     { return [...this.items]; }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⑤–⑥ SEARCHING ALGORITHMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/** Linear Search — O(n) — search by course code */
function linearSearch(arr, targetCode) {
  console.log(`\n🔍 LINEAR SEARCH — Searching for code: "${targetCode}"`);
  console.log("─".repeat(50));
  for (let i = 0; i < arr.length; i++) {
    console.log(`  Checking index [${i}]: ${arr[i].code}`);
    if (arr[i].code === targetCode) {
      console.log(`  ✅ FOUND at index ${i}! Course: ${arr[i].title}`);
      return { index: i, course: arr[i] };
    }
  }
  console.log("  ❌ NOT FOUND");
  return { index: -1, course: null };
}

/** Binary Search — O(log n) — on sorted-by-credits array */
function binarySearch(sortedArr, targetCredits) {
  console.log(`\n🔍 BINARY SEARCH — Searching for credits: ${targetCredits}`);
  console.log("─".repeat(50));
  let lo = 0, hi = sortedArr.length - 1, comparisons = 0;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    comparisons++;
    console.log(`  [${comparisons}] lo=${lo}, hi=${hi}, mid=${mid} → credits=${sortedArr[mid].credits}`);
    if (sortedArr[mid].credits === targetCredits) {
      console.log(`  ✅ FOUND at index ${mid}: ${sortedArr[mid].title} (${comparisons} comparisons)`);
      return { index: mid, course: sortedArr[mid] };
    } else if (sortedArr[mid].credits < targetCredits) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  console.log(`  ❌ NOT FOUND (${comparisons} comparisons)`);
  return { index: -1, course: null };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⑦ BUBBLE SORT — Sort by credits O(n²)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function bubbleSort(arr) {
  const a = arr.map(c => ({ ...c }));
  const n = a.length;
  let swaps = 0, comparisons = 0;
  console.log(`\n🔀 BUBBLE SORT — by Credits (ascending)`);
  console.log("─".repeat(50));
  console.log("  Before:", a.map(c => `${c.code}(${c.credits})`).join(" → "));
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++;
      if (a[j].credits > a[j + 1].credits) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        swapped = true;
      }
    }
    console.log(`  Pass [${i + 1}]: `, a.map(c => `${c.code}(${c.credits})`).join(" "));
    if (!swapped) { console.log(`  ⚡ Early exit — array sorted!`); break; }
  }
  console.log(`  ✅ Done! Comparisons: ${comparisons}, Swaps: ${swaps}`);
  console.log("  Result:", a.map(c => `${c.title}(${c.credits}cr)`).join(", "));
  return a;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⑧ SELECTION SORT — Sort by course code O(n²)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function selectionSort(arr) {
  const a = arr.map(c => ({ ...c }));
  const n = a.length;
  let swaps = 0, comparisons = 0;
  console.log(`\n🔀 SELECTION SORT — by Course Code (alphabetical)`);
  console.log("─".repeat(50));
  console.log("  Before:", a.map(c => c.code).join(", "));
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      if (a[j].code < a[minIdx].code) minIdx = j;
    }
    if (minIdx !== i) { [a[i], a[minIdx]] = [a[minIdx], a[i]]; swaps++; }
    console.log(`  Step [${i + 1}] placed: ${a[i].code} →`, a.map(c => c.code).join(", "));
  }
  console.log(`  ✅ Done! Comparisons: ${comparisons}, Swaps: ${swaps}`);
  console.log("  Result:", a.map(c => `${c.code}: ${c.title}`).join(" | "));
  return a;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⑨ INSERTION SORT — Sort by title O(n²)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function insertionSort(arr) {
  const a = arr.map(c => ({ ...c }));
  const n = a.length;
  let shifts = 0, comparisons = 0;
  console.log(`\n🔀 INSERTION SORT — by Title (alphabetical)`);
  console.log("─".repeat(50));
  console.log("  Before:", a.map(c => c.title.split(" ")[0]).join(", "));
  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j].title > key.title) {
      comparisons++;
      a[j + 1] = a[j];
      j--;
      shifts++;
    }
    a[j + 1] = key;
    console.log(`  Insert "${key.title.split(" ")[0]}" → [${a.map(c => c.title.split(" ")[0]).join(", ")}]`);
  }
  console.log(`  ✅ Done! Comparisons: ${comparisons}, Shifts: ${shifts}`);
  console.log("  Result:", a.map(c => c.title).join(" → "));
  return a;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⑩ MERGE SORT — Sort by max BTL O(n log n)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function mergeSort(arr, depth = 0) {
  if (depth === 0) {
    console.log(`\n🔀 MERGE SORT — by Max BTL (ascending) O(n log n)`);
    console.log("─".repeat(50));
    console.log("  Before:", arr.map(c => `${c.code}(BTL${getMaxBTL(c)})`).join(", "));
  }
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid), depth + 1);
  const right = mergeSort(arr.slice(mid), depth + 1);
  const merged = mergeSortedArrays(left, right, depth);
  if (depth === 0) {
    console.log("  ✅ Result:", merged.map(c => `${c.code}(BTL${getMaxBTL(c)})`).join(" → "));
  }
  return merged;
}

function mergeSortedArrays(left, right, depth) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (getMaxBTL(left[i]) <= getMaxBTL(right[j])) { result.push(left[i++]); }
    else { result.push(right[j++]); }
  }
  const merged = result.concat(left.slice(i)).concat(right.slice(j));
  if (depth <= 2) {
    console.log(`  Merge [depth ${depth}]:`, merged.map(c => `${c.code}(${getMaxBTL(c)})`).join(", "));
  }
  return merged;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⑪ QUICK SORT — Sort by credits O(n log n) avg
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function quickSort(arr, lo = 0, hi = -999, depth = 0) {
  if (hi === -999) hi = arr.length - 1;
  if (depth === 0) {
    console.log(`\n🔀 QUICK SORT — by Credits O(n log n) avg`);
    console.log("─".repeat(50));
    console.log("  Before:", arr.map(c => `${c.code}(${c.credits})`).join(", "));
  }
  if (lo < hi) {
    const pivotIdx = partition(arr, lo, hi, depth);
    quickSort(arr, lo, pivotIdx - 1, depth + 1);
    quickSort(arr, pivotIdx + 1, hi, depth + 1);
  }
  if (depth === 0) {
    console.log("  ✅ Result:", arr.map(c => `${c.code}(${c.credits}cr)`).join(" → "));
  }
  return arr;
}

function partition(arr, lo, hi, depth) {
  const pivot = arr[hi].credits;
  console.log(`  Partition [${lo}..${hi}] pivot=${pivot} (${arr[hi].code})`);
  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    if (arr[j].credits <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  return i + 1;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   APPLICATION STATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const enrolledSet  = new Set();          // fast O(1) lookup
const enrolledList = new LinkedList();   // linked list traversal
const enrollStack  = new Stack();        // LIFO history
const enrollQueue  = new Queue();        // FIFO processing order

let activeCategory = "all";
let sortMode       = "none"; // "none" | "name" | "credits" | "btl"
let activeCO       = {};     // { courseId: coNo }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HELPERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function getMaxBTL(course) {
  return Math.max(...course.cos.map(co => co.btl));
}

function getCourse(id) {
  return COURSES.find(c => c.id === id);
}

function getEnrolledCourses() {
  return enrolledList.toArray().map(id => getCourse(id)).filter(Boolean);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function showPage(name) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.page === name);
  });
  document.getElementById(`page-${name}`).classList.add("active");
  if (name === "enrolled") renderEnrolledPage();
  if (name === "dsa")      updateQueueViz();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FILTER & SORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function filterTab(cat) {
  activeCategory = cat;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(`tab-${cat}`).classList.add("active");
  renderCourseGrid();
}

function onSearch() {
  renderCourseGrid();
}

const SORT_MODES = ["none", "name", "credits", "btl"];
const SORT_LABELS = { none: "⇅ None", name: "⇅ Name", credits: "⇅ Credits", btl: "⇅ BTL" };

function cycleSortMode() {
  const idx = SORT_MODES.indexOf(sortMode);
  sortMode = SORT_MODES[(idx + 1) % SORT_MODES.length];
  document.getElementById("sortBtn").textContent = SORT_LABELS[sortMode];
  renderCourseGrid();
}

function getSortedCourses(courses) {
  const arr = [...courses];
  if (sortMode === "name")    return arr.sort((a, b) => a.title.localeCompare(b.title));
  if (sortMode === "credits") return arr.sort((a, b) => b.credits - a.credits);
  if (sortMode === "btl")     return arr.sort((a, b) => getMaxBTL(b) - getMaxBTL(a));
  return arr;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RENDER COURSE GRID
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function renderCourseGrid() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const grid = document.getElementById("courseGrid");

  // Filter
  let courses = COURSES.filter(c => {
    const catOk = activeCategory === "all" || c.category === activeCategory;
    if (!catOk) return false;
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.cos.some(co => co.desc.toLowerCase().includes(q) || co.no.toLowerCase().includes(q) || co.po.toLowerCase().includes(q))
    );
  });

  // Sort
  courses = getSortedCourses(courses);

  if (!courses.length) {
    grid.innerHTML = `<div class="no-results">No courses found for "<strong>${q}</strong>"</div>`;
    return;
  }

  grid.innerHTML = courses.map(buildCourseCard).join("");
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BUILD COURSE CARD HTML
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildCourseCard(c) {
  const isEnrolled = enrolledSet.has(c.id);
  const maxBtl     = getMaxBTL(c);
  const openCO     = activeCO[c.id] || null;
  const catLabel   = { dsa: "DSA", web: "Web Dev", js: "JavaScript" }[c.category] || c.category;
  const allPOs     = [...new Set(c.cos.flatMap(co => co.po.split(",")))].slice(0, 8);

  const coPills = c.cos.map(co =>
    `<span class="co-pill ${openCO === co.no ? "open" : ""}"
      onclick="toggleCO('${c.id}','${co.no}')">${co.no}</span>`
  ).join("");

  const coDetailRows = c.cos.map(co => `
    <div class="co-detail-row">
      <span class="co-no">${co.no}</span>
      <span class="co-text">${co.desc}</span>
      <span class="co-btl">BTL ${co.btl}</span>
    </div>
  `).join("");

  const showDetail = openCO ? "show" : "";

  return `
  <div class="course-card ${isEnrolled ? "enrolled" : ""}" id="card-${c.id}">
    <div class="card-top">
      <div class="card-left">
        <div class="card-meta">
          <span class="course-code">${c.code}</span>
          <span class="course-cat cat-${c.category}">${catLabel}</span>
        </div>
        <div class="course-title">${c.title}</div>
      </div>
      <div class="btl-badge btl-${maxBtl}" title="Max Bloom's Taxonomy Level">BTL${maxBtl}</div>
    </div>

    <div class="co-pills">${coPills}</div>

    <div class="co-detail ${showDetail}" id="co-detail-${c.id}">
      ${coDetailRows}
    </div>

    <div class="card-footer">
      <div>
        <div class="card-credits">Credits: <strong>${c.credits}</strong> &nbsp;|&nbsp; COs: <strong>${c.cos.length}</strong></div>
        <div class="po-list" style="margin-top:5px;">${allPOs.map(p => `<span class="po-tag">${p.trim()}</span>`).join("")}</div>
      </div>
      <button class="enroll-btn ${isEnrolled ? "remove" : "add"}"
        onclick="toggleEnroll('${c.id}')">
        ${isEnrolled ? "✕ Remove" : "+ Enroll"}
      </button>
    </div>
  </div>`;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CO TOGGLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function toggleCO(courseId, coNo) {
  activeCO[courseId] = (activeCO[courseId] === coNo) ? null : coNo;
  renderCourseGrid();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ENROLL / REMOVE  (uses Stack + Queue + LinkedList)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function toggleEnroll(courseId) {
  const course = getCourse(courseId);
  if (!course) return;

  if (enrolledSet.has(courseId)) {
    // Remove
    enrolledSet.delete(courseId);
    enrolledList.remove(courseId);
    enrollStack.push({ action: "REMOVE", courseId, title: course.title });
    showToast("🗑️", `"${course.title}" removed`);
    console.log(`\n[STACK] PUSH action → REMOVE "${course.title}"  (Stack size: ${enrollStack.size()})`);
  } else {
    // Add
    enrolledSet.add(courseId);
    enrolledList.append(courseId);
    enrollQueue.enqueue(courseId);
    enrollStack.push({ action: "ADD", courseId, title: course.title });
    showToast("✅", `"${course.title}" added!`);
    console.log(`\n[QUEUE] ENQUEUE → "${course.title}"  Front: "${getCourse(enrollQueue.front())?.title}"  (Queue size: ${enrollQueue.size()})`);
    console.log(`[STACK] PUSH action → ADD "${course.title}"  (Stack size: ${enrollStack.size()})`);
    console.log(`[LINKED LIST] APPEND → node "${courseId}"  (List size: ${enrolledList.size})`);
  }

  renderCourseGrid();
  updateCartHeader();
  updateQueueViz();
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   UPDATE CART HEADER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function updateCartHeader() {
  const courses     = getEnrolledCourses();
  const totalCr     = courses.reduce((s, c) => s + c.credits, 0);
  document.getElementById("hdr-courses").textContent = courses.length;
  document.getElementById("hdr-credits").textContent = totalCr;
  document.getElementById("submitHdrBtn").disabled   = courses.length === 0;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RENDER ENROLLED TABLE PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function renderEnrolledPage() {
  const courses = getEnrolledCourses();
  const tbody   = document.getElementById("enrolledTbody");
  const empty   = document.getElementById("enrolledEmpty");
  const tbl     = document.querySelector(".enrolled-table");

  const totalCr  = courses.reduce((s, c) => s + c.credits, 0);
  const dsaCount = courses.filter(c => c.category === "dsa").length;
  const webCount = courses.filter(c => c.category === "web").length;
  const jsCount  = courses.filter(c => c.category === "js").length;

  document.getElementById("sum-courses").textContent = courses.length;
  document.getElementById("sum-credits").textContent = totalCr;
  document.getElementById("sum-dsa").textContent     = dsaCount;
  document.getElementById("sum-web").textContent     = webCount;
  document.getElementById("sum-js").textContent      = jsCount;
  document.getElementById("sum-pct").textContent     = `${Math.min(Math.round(totalCr / 24 * 100), 100)}%`;
  document.getElementById("creditFill").style.width  = `${Math.min((totalCr / 24) * 100, 100)}%`;
  document.getElementById("submitFullBtn").disabled  = courses.length === 0;

  if (!courses.length) {
    tbody.innerHTML = "";
    empty.style.display = "block";
    tbl.style.display = "none";
    updateQueueViz();
    return;
  }

  empty.style.display = "none";
  tbl.style.display = "table";

  tbody.innerHTML = courses.map((c, i) => `
    <tr>
      <td class="row-num">${i + 1}</td>
      <td class="t-code">${c.code}</td>
      <td class="t-title">${c.title}</td>
      <td><span class="course-cat cat-${c.category}">${c.category.toUpperCase()}</span></td>
      <td class="t-credits">${c.credits}</td>
      <td class="t-co-count">${c.cos.length} COs</td>
      <td><span class="btl-badge btl-${getMaxBTL(c)}" style="margin:auto;">BTL${getMaxBTL(c)}</span></td>
      <td><button class="tbl-remove-btn" onclick="toggleEnroll('${c.id}');renderEnrolledPage()">Remove</button></td>
    </tr>
  `).join("");

  updateQueueViz();
}

/* Queue Visualization Widget */
function updateQueueViz() {
  const viz  = document.getElementById("queueViz");
  if (!viz) return;
  const items = enrollQueue.toArray();
  if (!items.length) {
    viz.innerHTML = `<span style="color:var(--muted);font-size:0.7rem;font-family:var(--font-mono);">Queue is empty</span>`;
    return;
  }
  viz.innerHTML = items.map((id, i) => {
    const c = getCourse(id);
    return `<span class="queue-node" title="${c ? c.title : id}">${c ? c.code : id}${i === 0 ? " ◀FRONT" : ""}</span>`;
  }).join("");
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SUBMIT REGISTRATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function submitRegistration() {
  const courses = getEnrolledCourses();
  if (!courses.length) return;

  // Process queue on submit
  console.log("\n═══════ PROCESSING REGISTRATION QUEUE ═══════");
  console.log(`[QUEUE] Processing ${enrollQueue.size()} items in FIFO order:`);
  const tempQueue = new Queue();
  const snapshot  = enrollQueue.toArray();
  snapshot.forEach((id, i) => {
    const c = getCourse(id);
    console.log(`  [${i + 1}] DEQUEUE → Registering: ${c ? c.title : id} (${c ? c.code : id})`);
    tempQueue.enqueue(id);
  });
  console.log("✅ All courses registered via Queue processing.");

  document.getElementById("modalCourseList").innerHTML = courses.map(c => `
    <div class="modal-row">
      <span class="modal-check">✓</span>
      <div>
        <strong>${c.title}</strong>
        <div style="font-size:0.68rem;color:var(--muted);font-family:var(--font-mono);">${c.code} · ${c.credits} Credits · ${c.cos.length} COs</div>
      </div>
    </div>
  `).join("");

  document.getElementById("modal").classList.add("show");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOAST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let toastTimer;
function showToast(icon, msg) {
  const el = document.getElementById("toast");
  document.getElementById("toastIcon").textContent = icon;
  document.getElementById("toastMsg").textContent  = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ─── DSA CONSOLE DEMO FUNCTIONS ───
   These run the actual DSA algorithms and
   display step-by-step output in the UI console
   AND in browser DevTools console.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const con = document.getElementById("consoleBody");

function clog(html) {
  if (con) con.innerHTML += html + "\n";
  con && (con.scrollTop = con.scrollHeight);
}

function clearConsole() {
  if (con) con.innerHTML = `<span class="c-info">[CLEARED] Console cleared. Ready for new output.</span>\n`;
  console.clear();
  console.log("Console cleared.");
}

function section(title) {
  clog(`<span class="c-section">▶ ${title}</span>`);
  console.log(`\n${"═".repeat(60)}\n  ${title}\n${"═".repeat(60)}`);
}

function info(msg)    { clog(`<span class="c-info">  ℹ ${msg}</span>`);    console.log(`  ℹ ${msg}`); }
function success(msg) { clog(`<span class="c-success">  ✅ ${msg}</span>`); console.log(`  ✅ ${msg}`); }
function warn(msg)    { clog(`<span class="c-warn">  ⚠ ${msg}</span>`);    console.log(`  ⚠ ${msg}`); }
function step(msg)    { clog(`<span class="c-step">${msg}</span>`);          console.log(`    ${msg}`); }
function data(msg)    { clog(`<span class="c-data">${msg}</span>`);          console.log(`      ${msg}`); }
function result(msg)  { clog(`<span class="c-result">  → ${msg}</span>`);   console.log(`  → ${msg}`); }
function divider()    { clog(`<span class="c-divider">${"─".repeat(60)}</span>`); }

/* ── ARRAY DEMO ── */
function demoArray() {
  section("① ARRAY / LIST — Course Catalogue Storage");
  info(`COURSES array has ${COURSES.length} elements. Indices 0 to ${COURSES.length - 1}.`);
  divider();
  COURSES.forEach((c, i) => {
    data(`[${i}] ${c.code}  |  "${c.title}"  |  ${c.credits} Credits  |  ${c.cos.length} COs  |  BTL-${getMaxBTL(c)}`);
    console.log(`  [${i}]`, c);
  });
  divider();
  success(`Array traversal complete. Total courses: ${COURSES.length}`);
  info(`Time Complexity: O(n)  |  Space: O(1)`);
}

/* ── LINKED LIST DEMO ── */
function demoLinkedList() {
  section("② LINKED LIST — Enrolled Course Chain Traversal");
  const courses = getEnrolledCourses();
  if (!courses.length) { warn("No courses enrolled. Please enroll some courses first."); return; }
  info(`Linked List size: ${enrolledList.size} nodes`);
  info(`Structure: HEAD → [Node1] → [Node2] → ... → NULL`);
  divider();
  const traversal = enrolledList.traverse();
  traversal.forEach(({ index, courseId }) => {
    const c = getCourse(courseId);
    const isLast = index === traversal.length - 1;
    step(`Node[${index}]: { courseId: "${courseId}", title: "${c?.title}", next: ${isLast ? "NULL" : `→ "${traversal[index+1]?.courseId}"`} }`);
  });
  divider();
  success(`Linked list traversal complete. ${enrolledList.size} nodes visited.`);
  result(`HEAD → ${traversal.map(n => n.courseId).join(" → ")} → NULL`);
}

/* ── STACK DEMOS ── */
function demoStackPush() {
  section("③ STACK (LIFO) — Push Operation");
  const unenrolled = COURSES.filter(c => !enrolledSet.has(c.id));
  if (!unenrolled.length) { warn("All courses already enrolled. Remove one first."); return; }
  const target = unenrolled[0];
  info(`PUSH: Adding "${target.title}" to Stack`);
  divider();
  step(`Before Push — Stack size: ${enrollStack.size()}`);
  step(`Top of stack: ${enrollStack.peek() ? enrollStack.peek().title : "EMPTY"}`);
  enrollStack.push({ action: "DEMO_PUSH", courseId: target.id, title: target.title });
  step(`After Push  — Stack size: ${enrollStack.size()}`);
  step(`New top    : ${enrollStack.peek().title}`);
  divider();
  success(`PUSH complete. Stack size: ${enrollStack.size()}`);
  result(`Stack (top→bottom): ${enrollStack.display().map(i => i.title).join(" | ")}`);
}

function demoStackPop() {
  section("③ STACK (LIFO) — Pop Operation");
  if (enrollStack.isEmpty()) { warn("Stack is empty. Enroll some courses first."); return; }
  info(`POP: Removing top element from Stack (LIFO order)`);
  divider();
  step(`Before Pop — Stack size: ${enrollStack.size()}`);
  step(`Top: "${enrollStack.peek()?.title}"`);
  const popped = enrollStack.pop();
  step(`After Pop  — Stack size: ${enrollStack.size()}`);
  step(`Popped: "${popped?.title}" (Action: ${popped?.action})`);
  step(`New top: ${enrollStack.peek() ? `"${enrollStack.peek().title}"` : "EMPTY (Stack underflow)"}`);
  divider();
  success(`POP complete. Popped: "${popped?.title}"`);
  info(`LIFO property: Last pushed "${popped?.title}" was first popped.`);
}

function demoStackAll() {
  section("③ STACK (LIFO) — Full State Snapshot");
  if (enrollStack.isEmpty()) { warn("Stack is empty. Enroll some courses first."); return; }
  info(`Stack size: ${enrollStack.size()}  |  LIFO order (top first):`);
  divider();
  const items = enrollStack.display();
  items.forEach((item, i) => {
    const label = i === 0 ? " ← TOP" : (i === items.length - 1 ? " ← BOTTOM" : "");
    step(`[${i}] Action: ${item.action}  |  Course: "${item.title}"${label}`);
  });
  divider();
  result(`Total entries: ${enrollStack.size()}  |  Peek (top): "${enrollStack.peek()?.title}"`);
  info(`Time: Push O(1), Pop O(1), Peek O(1)`);
}

/* ── QUEUE DEMOS ── */
function demoQueueEnqueue() {
  section("④ QUEUE (FIFO) — Enqueue Operation");
  const unenrolled = COURSES.filter(c => !enrolledSet.has(c.id));
  if (!unenrolled.length) { warn("All courses already in queue. Remove one first."); return; }
  const target = unenrolled[Math.floor(Math.random() * unenrolled.length)];
  info(`ENQUEUE: Adding "${target.title}" to rear of Queue`);
  divider();
  step(`Before Enqueue — Queue size: ${enrollQueue.size()}`);
  step(`Front: ${enrollQueue.front() ? `"${getCourse(enrollQueue.front())?.title}"` : "EMPTY"}`);
  enrollQueue.enqueue(target.id);
  step(`After Enqueue  — Queue size: ${enrollQueue.size()}`);
  step(`Rear (just added): "${target.title}"`);
  step(`Front unchanged: "${getCourse(enrollQueue.front())?.title}"`);
  divider();
  result(`Queue (front→rear): ${enrollQueue.toArray().map(id => getCourse(id)?.code || id).join(" → ")}`);
  success(`ENQUEUE complete.`);
}

function demoQueueDequeue() {
  section("④ QUEUE (FIFO) — Dequeue Operation");
  if (enrollQueue.isEmpty()) { warn("Queue is empty. Enroll some courses first."); return; }
  info(`DEQUEUE: Removing front element (FIFO order)`);
  divider();
  step(`Before Dequeue — Queue size: ${enrollQueue.size()}`);
  step(`Front: "${getCourse(enrollQueue.front())?.title}"`);
  const dequeued = enrollQueue.dequeue();
  const course   = getCourse(dequeued);
  step(`After Dequeue  — Queue size: ${enrollQueue.size()}`);
  step(`Dequeued: "${course?.title}" (${course?.code})`);
  step(`New front: ${enrollQueue.front() ? `"${getCourse(enrollQueue.front())?.title}"` : "Queue is now empty"}`);
  divider();
  success(`DEQUEUE complete. FIFO: First enrolled "${course?.title}" was first processed.`);
  result(`Remaining queue: ${enrollQueue.toArray().map(id => getCourse(id)?.code || id).join(" → ") || "EMPTY"}`);
}

function demoQueueAll() {
  section("④ QUEUE (FIFO) — Full State Snapshot");
  if (enrollQueue.isEmpty()) { warn("Queue is empty. Enroll some courses first."); return; }
  info(`Queue size: ${enrollQueue.size()}  |  FIFO order (front→rear):`);
  divider();
  enrollQueue.toArray().forEach((id, i) => {
    const c = getCourse(id);
    const label = i === 0 ? " ← FRONT (next to dequeue)" : (i === enrollQueue.size() - 1 ? " ← REAR" : "");
    step(`[${i}] ${c?.code}  |  "${c?.title}"  |  ${c?.credits} Credits${label}`);
  });
  divider();
  result(`Front: "${getCourse(enrollQueue.front())?.title}"  |  Size: ${enrollQueue.size()}`);
  info(`Time: Enqueue O(1), Dequeue O(1), Front O(1)`);
}

/* ── SEARCHING DEMOS ── */
function demoLinearSearch() {
  section("⑤ LINEAR SEARCH — Search by Course Code");
  const targets = ["CSE2102", "CSE2201", "CSE2104", "CSE9999"];
  const target  = targets[Math.floor(Math.random() * targets.length)];
  info(`Searching for course code: "${target}" in COURSES array`);
  info(`Algorithm: Compare each element sequentially — O(n)`);
  divider();
  let found = false;
  COURSES.forEach((c, i) => {
    const match = c.code === target;
    step(`[${i}] Comparing "${c.code}" == "${target}"? ${match ? "✅ MATCH!" : "❌"}`);
    if (match) {
      found = true;
      result(`FOUND: ${c.title} at index ${i}`);
    }
  });
  if (!found) warn(`Course code "${target}" NOT FOUND in array.`);
  divider();
  info(`Worst case: O(n) = ${COURSES.length} comparisons`);
  info(`Best case:  O(1) — first element matches`);

  // also run full fn for DevTools
  linearSearch(COURSES, target);
}

function demoBinarySearch() {
  section("⑥ BINARY SEARCH — Search by Credits (sorted array)");
  const sorted  = [...COURSES].sort((a, b) => a.credits - b.credits);
  const targets = [3, 4, 5];
  const target  = targets[Math.floor(Math.random() * targets.length)];
  info(`Array sorted by credits: ${sorted.map(c => `${c.code}(${c.credits})`).join(", ")}`);
  info(`Searching for credits = ${target} — O(log n)`);
  divider();
  let lo = 0, hi = sorted.length - 1, pass = 0;
  let found = false;
  while (lo <= hi) {
    pass++;
    const mid = Math.floor((lo + hi) / 2);
    step(`Pass ${pass}: lo=${lo}, hi=${hi}, mid=${mid} → ${sorted[mid].code}(${sorted[mid].credits}cr)`);
    if (sorted[mid].credits === target) {
      result(`FOUND at index ${mid}: "${sorted[mid].title}" (${target} credits) in ${pass} comparisons`);
      found = true;
      break;
    } else if (sorted[mid].credits < target) {
      step(`  ${sorted[mid].credits} < ${target} → search RIGHT half (lo = ${mid+1})`);
      lo = mid + 1;
    } else {
      step(`  ${sorted[mid].credits} > ${target} → search LEFT half (hi = ${mid-1})`);
      hi = mid - 1;
    }
  }
  if (!found) warn(`Credits=${target} NOT FOUND in ${pass} comparisons.`);
  divider();
  info(`Binary search: O(log ${COURSES.length}) = max ${Math.ceil(Math.log2(COURSES.length))} comparisons`);
  info(`vs Linear: O(n) = up to ${COURSES.length} comparisons`);

  binarySearch(sorted, target);
}

/* ── SORTING DEMOS ── */
function demoBubbleSort() {
  section("⑦ BUBBLE SORT — Sort by Credits (ascending) — O(n²)");
  info(`Input: ${COURSES.map(c => `${c.code}(${c.credits})`).join(", ")}`);
  info(`Algorithm: Repeatedly swap adjacent elements if out of order`);
  divider();
  const arr = [...COURSES].map(c => ({ ...c }));
  const n   = arr.length;
  let swaps = 0, comps = 0;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      comps++;
      if (arr[j].credits > arr[j+1].credits) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        swaps++; swapped = true;
      }
    }
    step(`Pass [${i+1}]: ${arr.map(c => `${c.code}(${c.credits})`).join(" ")}`);
    if (!swapped) { info(`Early termination at pass ${i+1} — already sorted!`); break; }
  }
  divider();
  success(`Bubble Sort complete! Comparisons: ${comps}, Swaps: ${swaps}`);
  result(arr.map(c => `${c.title}(${c.credits}cr)`).join(" → "));
  bubbleSort(COURSES);
}

function demoSelectionSort() {
  section("⑧ SELECTION SORT — Sort by Course Code — O(n²)");
  info(`Algorithm: Find minimum in unsorted part and place at beginning`);
  divider();
  const arr = [...COURSES].map(c => ({ ...c }));
  const n   = arr.length;
  let swaps = 0, comps = 0;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) { comps++; if (arr[j].code < arr[minIdx].code) minIdx = j; }
    if (minIdx !== i) { [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; swaps++; }
    step(`Step [${i+1}] Min selected: ${arr[i].code} → [${arr.map(c=>c.code).join(", ")}]`);
  }
  divider();
  success(`Selection Sort complete! Comparisons: ${comps}, Swaps: ${swaps}`);
  result(arr.map(c => c.code).join(" → "));
  selectionSort(COURSES);
}

function demoInsertionSort() {
  section("⑨ INSERTION SORT — Sort by Title (alphabetical) — O(n²)");
  info(`Algorithm: Build sorted array one element at a time by inserting into correct position`);
  divider();
  const arr = [...COURSES].map(c => ({ ...c }));
  const n   = arr.length;
  let shifts = 0;
  for (let i = 1; i < n; i++) {
    const key = arr[i]; let j = i - 1;
    while (j >= 0 && arr[j].title > key.title) { arr[j+1] = arr[j]; j--; shifts++; }
    arr[j+1] = key;
    step(`Insert "${key.title.substring(0,20)}..." → [${arr.map(c=>c.title.split(" ")[0]).join(", ")}]`);
  }
  divider();
  success(`Insertion Sort complete! Shifts: ${shifts}`);
  result(arr.map(c => c.title).join(" → "));
  insertionSort(COURSES);
}

function demoMergeSort() {
  section("⑩ MERGE SORT — Sort by Max BTL — O(n log n)");
  info(`Algorithm: Divide and conquer — split array, sort halves, merge`);
  info(`Input: ${COURSES.map(c => `${c.code}(BTL${getMaxBTL(c)})`).join(", ")}`);
  divider();
  const arr  = [...COURSES].map(c => ({ ...c }));
  const sorted = mergeSortUI(arr, 0);
  divider();
  success(`Merge Sort complete!`);
  result(sorted.map(c => `${c.code}(BTL${getMaxBTL(c)})`).join(" → "));
  mergeSort(COURSES);
}

function mergeSortUI(arr, depth) {
  if (arr.length <= 1) return arr;
  const mid   = Math.floor(arr.length / 2);
  const left  = mergeSortUI(arr.slice(0, mid), depth + 1);
  const right = mergeSortUI(arr.slice(mid), depth + 1);
  const merged = mergeUI(left, right);
  if (depth <= 1) step(`[depth ${depth}] Merged: ${merged.map(c=>`${c.code}(${getMaxBTL(c)})`).join(", ")}`);
  return merged;
}

function mergeUI(left, right) {
  const res = []; let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (getMaxBTL(left[i]) <= getMaxBTL(right[j])) res.push(left[i++]);
    else res.push(right[j++]);
  }
  return res.concat(left.slice(i)).concat(right.slice(j));
}

function demoQuickSort() {
  section("⑪ QUICK SORT — Sort by Credits — O(n log n) avg, O(n²) worst");
  info(`Algorithm: Pick pivot, partition array, recursively sort sub-arrays`);
  info(`Input: ${COURSES.map(c => `${c.code}(${c.credits})`).join(", ")}`);
  divider();
  const arr = [...COURSES].map(c => ({ ...c }));
  quickSortUI(arr, 0, arr.length - 1, 0);
  divider();
  success(`Quick Sort complete!`);
  result(arr.map(c => `${c.code}(${c.credits}cr)`).join(" → "));
  quickSort([...COURSES], 0, -999, 0);
}

function quickSortUI(arr, lo, hi, depth) {
  if (lo < hi) {
    const pivot = arr[hi];
    step(`[depth ${depth}] Pivot: ${pivot.code}(${pivot.credits}) | Range [${lo}..${hi}]`);
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      if (arr[j].credits <= pivot.credits) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; }
    }
    [arr[i+1], arr[hi]] = [arr[hi], arr[i+1]];
    const pi = i + 1;
    step(`  Partitioned: ${arr.map(c=>`${c.code}(${c.credits})`).join(",")} | Pivot at idx ${pi}`);
    quickSortUI(arr, lo, pi - 1, depth + 1);
    quickSortUI(arr, pi + 1, hi, depth + 1);
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
document.addEventListener("DOMContentLoaded", () => {
  renderCourseGrid();
  updateCartHeader();
  updateQueueViz();

  console.log("\n" + "═".repeat(65));
  console.log("  KL UNIVERSITY — COURSE REGISTRATION PORTAL");
  console.log("  DSA Implementation Active");
  console.log("═".repeat(65));
  console.log("\n  Data Structures in use:");
  console.log("  ① Array          — COURSES[6] catalogue storage");
  console.log("  ② Linked List    — Enrolled course chain");
  console.log("  ③ Stack (LIFO)   — Enrollment action history");
  console.log("  ④ Queue (FIFO)   — Enrollment processing order");
  console.log("  ⑤ Linear Search  — O(n) search by course code");
  console.log("  ⑥ Binary Search  — O(log n) search by credits");
  console.log("  ⑦ Bubble Sort    — O(n²) sort by credits");
  console.log("  ⑧ Selection Sort — O(n²) sort by course code");
  console.log("  ⑨ Insertion Sort — O(n²) sort by title");
  console.log("  ⑩ Merge Sort     — O(n log n) sort by BTL");
  console.log("  ⑪ Quick Sort     — O(n log n) sort by credits");
  console.log("\n  → Navigate to 'DSA Console' tab to run demos.");
  console.log("═".repeat(65) + "\n");
});
