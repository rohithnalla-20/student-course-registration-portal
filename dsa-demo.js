/**
 * ════════════════════════════════════════════════════════════════
 *  KL UNIVERSITY — COURSE REGISTRATION PORTAL
 *  dsa-module / dsa-demo.js
 *
 *  Standalone DSA demonstration module.
 *  Run this file independently OR open dsa-demo.html
 *  All output appears in browser DevTools console.
 *
 *  DSA Concepts Covered (CO Mapping):
 *  CO1 — Algorithm analysis (Big-O, time/space complexity)
 *  CO2 — Arrays, Linked Lists (ADTs)
 *  CO3 — Stacks, Queues, Priority Queue concepts
 *  CO4 — Hash-based lookups (Set/Map)
 *  CO5 — Practical applications
 *  CO6 — Complete program integration
 * ════════════════════════════════════════════════════════════════
 */

"use strict";

/* ── Sample Data ── */
const COURSE_DATA = [
  { id: "dsa",   code: "CSE2102", title: "Data Structures & Algorithms",  credits: 4, btl: 5, category: "dsa" },
  { id: "web",   code: "CSE2201", title: "Full Stack Web Development",     credits: 4, btl: 3, category: "web" },
  { id: "js",    code: "CSE2202", title: "JavaScript Programming",         credits: 4, btl: 6, category: "js"  },
  { id: "react", code: "CSE2203", title: "React.js & Modern Frontend",     credits: 3, btl: 6, category: "js"  },
  { id: "os",    code: "CSE2103", title: "Operating Systems",              credits: 3, btl: 4, category: "dsa" },
  { id: "dbms",  code: "CSE2104", title: "Database Management Systems",    credits: 4, btl: 5, category: "web" },
];

const hr  = (ch = "─", n = 60) => console.log(ch.repeat(n));
const hdr = (t) => { console.log("\n" + "═".repeat(60)); console.log(`  ${t}`); console.log("═".repeat(60)); };
const log = (m) => console.log(m);

/* ════════════════════════════════════════════════════════════════
   [1] ARRAY — Course Catalogue (CO2: ADTs using arrays)
════════════════════════════════════════════════════════════════ */
function demo_Array() {
  hdr("① ARRAY / LIST — Course Catalogue  [CO2]");
  log(`Array length: ${COURSE_DATA.length}  |  Indices: 0 to ${COURSE_DATA.length - 1}`);
  hr();
  log("Index │ Code      │ Title                              │ Credits │ Category");
  hr("─");
  COURSE_DATA.forEach((c, i) => {
    log(`  [${i}]  │ ${c.code}  │ ${c.title.padEnd(35)} │   ${c.credits}     │ ${c.category}`);
  });
  hr();
  log(`✅ Time Complexity — Access: O(1), Search: O(n), Insert/Delete: O(n)`);
  log(`✅ Space Complexity — O(n) where n = ${COURSE_DATA.length}`);
}

/* ════════════════════════════════════════════════════════════════
   [2] LINKED LIST — Singly linked enrollment chain (CO2)
════════════════════════════════════════════════════════════════ */
class Node {
  constructor(data) { this.data = data; this.next = null; }
}

class SinglyLinkedList {
  constructor() { this.head = null; this.length = 0; }

  insert(data) {
    const node = new Node(data);
    if (!this.head) { this.head = node; }
    else { let c = this.head; while (c.next) c = c.next; c.next = node; }
    this.length++;
  }

  delete(data) {
    if (!this.head) return false;
    if (this.head.data === data) { this.head = this.head.next; this.length--; return true; }
    let c = this.head;
    while (c.next) {
      if (c.next.data === data) { c.next = c.next.next; this.length--; return true; }
      c = c.next;
    }
    return false;
  }

  traverse() {
    const path = []; let c = this.head;
    while (c) { path.push(c.data); c = c.next; }
    return path;
  }

  search(data) {
    let c = this.head, idx = 0;
    while (c) { if (c.data === data) return idx; c = c.next; idx++; }
    return -1;
  }

  reverse() {
    let prev = null, cur = this.head;
    while (cur) { const nxt = cur.next; cur.next = prev; prev = cur; cur = nxt; }
    this.head = prev;
  }
}

function demo_LinkedList() {
  hdr("② LINKED LIST — Enrollment Chain  [CO2]");
  const list = new SinglyLinkedList();

  log("── INSERT operations:");
  ["CSE2102", "CSE2201", "CSE2202", "CSE2203"].forEach(code => {
    list.insert(code);
    log(`  INSERT "${code}" → HEAD → ${list.traverse().join(" → ")} → NULL`);
  });

  hr();
  log(`── TRAVERSE (size = ${list.length}):`);
  log(`  HEAD → ${list.traverse().join(" → ")} → NULL`);

  hr();
  log("── SEARCH:");
  ["CSE2201", "CSE9999"].forEach(t => {
    const idx = list.search(t);
    log(`  search("${t}") → index ${idx}  ${idx >= 0 ? "✅ FOUND" : "❌ NOT FOUND"}`);
  });

  hr();
  log("── DELETE:");
  list.delete("CSE2201");
  log(`  After DELETE "CSE2201": HEAD → ${list.traverse().join(" → ")} → NULL`);

  hr();
  log("── REVERSE:");
  list.reverse();
  log(`  After REVERSE: HEAD → ${list.traverse().join(" → ")} → NULL`);

  hr();
  log(`✅ Time: Insert O(n), Delete O(n), Search O(n), Traverse O(n), Reverse O(n)`);
}

/* ════════════════════════════════════════════════════════════════
   [3] STACK — Enrollment undo history  (CO3: Stacks)
════════════════════════════════════════════════════════════════ */
class Stack {
  constructor(name = "Stack") { this.items = []; this.name = name; }
  push(x)   { this.items.push(x); }
  pop()     { return this.items.length ? this.items.pop() : "UNDERFLOW"; }
  peek()    { return this.items.length ? this.items[this.items.length-1] : "EMPTY"; }
  isEmpty() { return this.items.length === 0; }
  size()    { return this.items.length; }
  display() { log(`  ${this.name} [TOP→BTM]: ${[...this.items].reverse().map(i=>i.code||i).join(" | ")}`); }
}

function demo_Stack() {
  hdr("③ STACK (LIFO) — Enrollment History  [CO3]");
  const s = new Stack("EnrollmentStack");

  log("── PUSH operations (LIFO):");
  COURSE_DATA.slice(0, 4).forEach((c, i) => {
    s.push(c);
    log(`  PUSH [${i+1}]: "${c.code}" | Stack size: ${s.size()} | Top: "${s.peek().code}"`);
  });

  hr();
  s.display();
  log(`  Size: ${s.size()}  |  Is Empty: ${s.isEmpty()}`);

  hr();
  log("── POP operations (LIFO — last in, first out):");
  while (!s.isEmpty()) {
    const popped = s.pop();
    log(`  POP: "${popped.code}" — ${popped.title} | Remaining: ${s.size()}`);
  }
  log(`  Stack after all pops → ${s.peek()}`);

  hr();
  log(`✅ Time: Push O(1), Pop O(1), Peek O(1), IsEmpty O(1)`);
  log(`✅ Application: Undo last enrollment action`);
}

/* ════════════════════════════════════════════════════════════════
   [4] QUEUE — FIFO enrollment processing  (CO3: Queues)
════════════════════════════════════════════════════════════════ */
class Queue {
  constructor() { this.items = []; }
  enqueue(x)  { this.items.push(x); }
  dequeue()   { return this.items.length ? this.items.shift() : "UNDERFLOW"; }
  front()     { return this.items.length ? this.items[0] : "EMPTY"; }
  rear()      { return this.items.length ? this.items[this.items.length-1] : "EMPTY"; }
  isEmpty()   { return this.items.length === 0; }
  size()      { return this.items.length; }
  display()   { log(`  Queue [FRONT→REAR]: ${this.items.map(i=>i.code||i).join(" | ")}`); }
}

function demo_Queue() {
  hdr("④ QUEUE (FIFO) — Course Registration Processing  [CO3]");
  const q = new Queue();

  log("── ENQUEUE operations (add to rear):");
  COURSE_DATA.forEach((c, i) => {
    q.enqueue(c);
    log(`  ENQUEUE [${i+1}]: "${c.code}" | Size: ${q.size()} | Front: "${q.front().code}" | Rear: "${q.rear().code}"`);
  });

  hr();
  q.display();

  hr();
  log("── DEQUEUE operations (remove from front — FIFO):");
  while (!q.isEmpty()) {
    const d = q.dequeue();
    log(`  DEQUEUE: "${d.code}" (${d.title}) | Remaining: ${q.size()}`);
  }
  log(`  Queue after all dequeues → ${q.front()}`);

  hr();
  log(`✅ Time: Enqueue O(1), Dequeue O(1), Front O(1)`);
  log(`✅ Application: Process student registrations in order of submission`);
}

/* ════════════════════════════════════════════════════════════════
   [5] LINEAR SEARCH — O(n)  (CO1: Searching algorithms)
════════════════════════════════════════════════════════════════ */
function demo_LinearSearch(targets = ["CSE2202", "CSE2104", "CSE9999"]) {
  hdr("⑤ LINEAR SEARCH — by Course Code  [CO1]");
  log(`Array: [${COURSE_DATA.map(c=>c.code).join(", ")}]`);
  log(`Time Complexity: O(n)  |  Space: O(1)`);

  targets.forEach(target => {
    hr("·");
    log(`\n  Searching for: "${target}"`);
    let found = false;
    for (let i = 0; i < COURSE_DATA.length; i++) {
      log(`  [${i}] Compare "${COURSE_DATA[i].code}" == "${target}"? ${COURSE_DATA[i].code === target ? "✅ MATCH" : "❌"}`);
      if (COURSE_DATA[i].code === target) {
        log(`  → FOUND at index ${i}: "${COURSE_DATA[i].title}" (${COURSE_DATA[i].credits} credits)`);
        found = true;
        break;
      }
    }
    if (!found) log(`  → NOT FOUND. Searched all ${COURSE_DATA.length} elements.`);
  });
}

/* ════════════════════════════════════════════════════════════════
   [6] BINARY SEARCH — O(log n)  (CO1: Searching algorithms)
════════════════════════════════════════════════════════════════ */
function demo_BinarySearch(targetCredits = 4) {
  hdr("⑥ BINARY SEARCH — by Credits (sorted array)  [CO1]");
  const sorted = [...COURSE_DATA].sort((a, b) => a.credits - b.credits);
  log(`Sorted array: [${sorted.map(c=>`${c.code}(${c.credits}cr)`).join(", ")}]`);
  log(`Searching for credits = ${targetCredits}`);
  log(`Time Complexity: O(log n)  |  Space: O(1)`);
  hr();

  let lo = 0, hi = sorted.length - 1, pass = 0;
  while (lo <= hi) {
    pass++;
    const mid = Math.floor((lo + hi) / 2);
    log(`  Pass ${pass}: lo=${lo}, hi=${hi}, mid=${mid} → ${sorted[mid].code}(${sorted[mid].credits}cr)`);
    if (sorted[mid].credits === targetCredits) {
      log(`  → FOUND "${sorted[mid].title}" at index ${mid} in ${pass} comparisons`);
      log(`  → Linear would need up to ${COURSE_DATA.length} comparisons`);
      return;
    } else if (sorted[mid].credits < targetCredits) {
      log(`  → ${sorted[mid].credits} < ${targetCredits}, search RIGHT`);
      lo = mid + 1;
    } else {
      log(`  → ${sorted[mid].credits} > ${targetCredits}, search LEFT`);
      hi = mid - 1;
    }
  }
  log(`  → NOT FOUND in ${pass} comparisons`);
}

/* ════════════════════════════════════════════════════════════════
   [7] BUBBLE SORT — O(n²)  (CO1: Sorting algorithms)
════════════════════════════════════════════════════════════════ */
function demo_BubbleSort() {
  hdr("⑦ BUBBLE SORT — by Credits (ascending)  [CO1]  O(n²)");
  const arr = [...COURSE_DATA].map(c=>({...c}));
  log(`Before: [${arr.map(c=>`${c.code}(${c.credits})`).join(", ")}]`);
  hr();

  const n = arr.length;
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
    log(`  Pass ${i+1}: [${arr.map(c=>`${c.code}(${c.credits})`).join(", ")}]  swaps so far: ${swaps}`);
    if (!swapped) { log(`  ⚡ Early exit at pass ${i+1}`); break; }
  }
  hr();
  log(`✅ Comparisons: ${comps}  |  Swaps: ${swaps}`);
  log(`   Result: [${arr.map(c=>`${c.title}(${c.credits}cr)`).join(", ")}]`);
  log(`   Time: O(n²) worst  |  O(n) best (already sorted)`);
}

/* ════════════════════════════════════════════════════════════════
   [8] SELECTION SORT — O(n²)  (CO1: Sorting algorithms)
════════════════════════════════════════════════════════════════ */
function demo_SelectionSort() {
  hdr("⑧ SELECTION SORT — by Course Code  [CO1]  O(n²)");
  const arr = [...COURSE_DATA].map(c=>({...c}));
  log(`Before: [${arr.map(c=>c.code).join(", ")}]`);
  hr();

  const n = arr.length;
  let swaps = 0, comps = 0;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) { comps++; if (arr[j].code < arr[minIdx].code) minIdx = j; }
    if (minIdx !== i) { [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; swaps++; }
    log(`  Step ${i+1}: Placed ${arr[i].code} | [${arr.map(c=>c.code).join(", ")}]`);
  }
  hr();
  log(`✅ Comparisons: ${comps}  |  Swaps: ${swaps}`);
  log(`   Result: [${arr.map(c=>c.code).join(", ")}]`);
  log(`   Time: O(n²) — always same (no best/worst difference for comparisons)`);
}

/* ════════════════════════════════════════════════════════════════
   [9] INSERTION SORT — O(n²)  (CO1: Sorting algorithms)
════════════════════════════════════════════════════════════════ */
function demo_InsertionSort() {
  hdr("⑨ INSERTION SORT — by Title (alphabetical)  [CO1]  O(n²)");
  const arr = [...COURSE_DATA].map(c=>({...c}));
  log(`Before: [${arr.map(c=>c.title.split(" ")[0]).join(", ")}]`);
  hr();

  let shifts = 0;
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]; let j = i - 1;
    while (j >= 0 && arr[j].title > key.title) { arr[j+1] = arr[j]; j--; shifts++; }
    arr[j+1] = key;
    log(`  Insert "${key.title.split(" ")[0]}" at pos ${j+1}: [${arr.map(c=>c.title.split(" ")[0]).join(", ")}]`);
  }
  hr();
  log(`✅ Shifts: ${shifts}`);
  log(`   Result: [${arr.map(c=>c.title).join(", ")}]`);
  log(`   Time: O(n²) worst  |  O(n) best — efficient for nearly sorted data`);
}

/* ════════════════════════════════════════════════════════════════
   [10] MERGE SORT — O(n log n)  (CO1: Sorting algorithms)
════════════════════════════════════════════════════════════════ */
function demo_MergeSort() {
  hdr("⑩ MERGE SORT — by Max BTL  [CO1]  O(n log n)");
  const arr = [...COURSE_DATA].map(c=>({...c}));
  log(`Before: [${arr.map(c=>`${c.code}(BTL${c.btl})`).join(", ")}]`);
  hr();

  function merge(left, right, depth) {
    const res = []; let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i].btl <= right[j].btl) res.push(left[i++]);
      else res.push(right[j++]);
    }
    const merged = res.concat(left.slice(i)).concat(right.slice(j));
    if (depth <= 2) log(`  [depth ${depth}] Merge: [${left.map(c=>c.code).join(",")}] + [${right.map(c=>c.code).join(",")}] → [${merged.map(c=>c.code).join(",")}]`);
    return merged;
  }

  function ms(arr, depth = 0) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    return merge(ms(arr.slice(0, mid), depth+1), ms(arr.slice(mid), depth+1), depth);
  }

  const sorted = ms(arr);
  hr();
  log(`✅ Result: [${sorted.map(c=>`${c.code}(BTL${c.btl})`).join(", ")}]`);
  log(`   Time: O(n log n) — always  |  Space: O(n)  |  Stable: Yes`);
}

/* ════════════════════════════════════════════════════════════════
   [11] QUICK SORT — O(n log n) avg  (CO1: Sorting algorithms)
════════════════════════════════════════════════════════════════ */
function demo_QuickSort() {
  hdr("⑪ QUICK SORT — by Credits  [CO1]  O(n log n) avg");
  const arr = [...COURSE_DATA].map(c=>({...c}));
  log(`Before: [${arr.map(c=>`${c.code}(${c.credits})`).join(", ")}]`);
  hr();

  function partition(arr, lo, hi) {
    const pivot = arr[hi].credits;
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      if (arr[j].credits <= pivot) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; }
    }
    [arr[i+1], arr[hi]] = [arr[hi], arr[i+1]];
    return i + 1;
  }

  function qs(arr, lo, hi, depth = 0) {
    if (lo < hi) {
      const pivot = arr[hi];
      log(`  [depth ${depth}] Range [${lo}..${hi}] | Pivot: ${pivot.code}(${pivot.credits}cr)`);
      const pi = partition(arr, lo, hi);
      log(`  → After partition: [${arr.map(c=>`${c.code}(${c.credits})`).join(",")}] | Pivot idx: ${pi}`);
      qs(arr, lo, pi - 1, depth + 1);
      qs(arr, pi + 1, hi, depth + 1);
    }
  }

  qs(arr, 0, arr.length - 1);
  hr();
  log(`✅ Result: [${arr.map(c=>`${c.code}(${c.credits}cr)`).join(", ")}]`);
  log(`   Time: O(n log n) avg  |  O(n²) worst  |  Space: O(log n)  |  In-place: Yes`);
}

/* ════════════════════════════════════════════════════════════════
   [12] HASH MAP — O(1) lookup  (CO4: Hash-based structures)
════════════════════════════════════════════════════════════════ */
function demo_HashMap() {
  hdr("⑫ HASH MAP — Course Lookup by Code  [CO4]  O(1) avg");
  log(`Building HashMap from COURSE_DATA array...`);
  hr();

  const map = new Map();
  COURSE_DATA.forEach(c => {
    map.set(c.code, c);
    log(`  PUT ["${c.code}"] → { title: "${c.title}", credits: ${c.credits} }`);
  });

  hr();
  const targets = ["CSE2102", "CSE2203", "CSE9999"];
  log("LOOKUP operations:");
  targets.forEach(k => {
    const val = map.get(k);
    log(`  GET("${k}") → ${val ? `"${val.title}" ✅` : "undefined ❌"}`);
  });

  hr();
  log(`Map size: ${map.size}`);
  log(`Keys: [${[...map.keys()].join(", ")}]`);
  log(`✅ Time: Put O(1) avg, Get O(1) avg  |  Space: O(n)  |  No duplicate keys`);
  log(`✅ CO4 Application: Fast course lookup, registration validation`);
}

/* ════════════════════════════════════════════════════════════════
   RUN ALL DEMOS
════════════════════════════════════════════════════════════════ */
function runAllDemos() {
  console.clear();
  console.log("\n" + "█".repeat(65));
  console.log("  KL UNIVERSITY — DSA MODULE DEMONSTRATION");
  console.log("  Course Registration Portal — dsa-module/dsa-demo.js");
  console.log("  Student: Arjun Sharma  |  Roll: 2300031042  |  CSE - Sec A");
  console.log("█".repeat(65));

  demo_Array();
  demo_LinkedList();
  demo_Stack();
  demo_Queue();
  demo_LinearSearch(["CSE2202", "CSE9999"]);
  demo_BinarySearch(3);
  demo_BubbleSort();
  demo_SelectionSort();
  demo_InsertionSort();
  demo_MergeSort();
  demo_QuickSort();
  demo_HashMap();

  hdr("✅ ALL DSA DEMOS COMPLETE");
  log("  Concepts demonstrated:");
  log("  [CO1] Algorithm analysis + Searching (Linear, Binary) + Sorting (Bubble, Selection, Insertion, Merge, Quick)");
  log("  [CO2] Arrays, Linked Lists (insert, delete, search, traverse, reverse)");
  log("  [CO3] Stack (LIFO) + Queue (FIFO) — real-world workflow modeling");
  log("  [CO4] Hash Map — fast O(1) lookup and retrieval");
  log("  [CO5] Practical application: Course Registration System");
  log("  [CO6] Complete integration in a full-stack web project");
  console.log("═".repeat(60) + "\n");
}

/* Auto-run if opened directly */
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", runAllDemos);
} else {
  runAllDemos();
}
