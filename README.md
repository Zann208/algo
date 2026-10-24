# ALGO — Algorithms Study Console

Study console for **Algorithms for iSNE** at Chiang Mai University.

**→ [Live](https://zann208.github.io/algo/)** · part of [my semester consoles](https://zann208.github.io/study)

Vanilla HTML/CSS/JavaScript with no framework or external runtime dependencies.

## What's inside

| Section | What it does |
|---|---|
| **Topics** | Weeks 1, 2, 3, 4, 6, 7, 10, 12 and 13 rewritten in plain language, with algorithms, commented C++ and diagrams |
| **Assignments** | Assignments 1–4 worked through step by step: BST, AVL, Splay Tree operations, and minimum spanning trees (Kruskal and Prim) |
| **Tree Mastery** | Full Week 4 + Week 6 Learn path, visual labs, assignment-mode drills and exam questions |
| **Midterm Mock** | Supplied mock questions with verified, concise model answers and tree/graph working |
| **Final** | Definition bank for Weeks 7, 10, 12 and 13, 20 exam-style practice problems, and a 70-mark mock exam with model answers and step-by-step walkthroughs (Dijkstra, Kruskal, Prim, traversal, AVL rotations) |
| **Final Prep Lab** | Visual practice for every graph and algorithm topic in Weeks 7, 10, 12 and 13. Watch each algorithm run step by step, or switch to Practice and click each decision yourself (next vertex, next edge, which leaves alpha-beta prunes, which two nodes Huffman joins). Includes Dijkstra, Kruskal, Prim, BFS/DFS, topological sort, Euler/Hamilton/Chinese Postman, search (BFS, DFS, IDDFS, uniform cost, greedy, A*), hill climbing vs simulated annealing, minimax/alpha-beta and Huffman, plus a progress checklist |
| **Flashcards** | Filterable recall practice by week |
| **Quiz** | Immediate feedback with explanations |
| **Code practice** | Fill-in-the-blank C++ exercises in the same style as course exercises |
| **Cheat sheet** | Complexity, structure and rotation rules in one reference page |

Current learning coverage includes computational complexity; arrays and linked lists; stacks, queues and priority queues; tree fundamentals, BSTs, traversal, insertion/deletion, DSW, AVL, splay trees, heaps/heapsort, expression trees, multiway trees, B-Trees, B*, B**, B+, Prefix B+, Bit Trees and Tries; plus Week 7 Graphs: representations, DFS/BFS, shortest paths, cycle detection, union-find, spanning trees/Kruskal, topological sort, networks, Eulerian/Hamiltonian graphs and TSP.

Week 10 adds intelligent agents, task environments, uninformed and heuristic search, A*, hill climbing and simulated annealing. Week 12 adds game theory, minimax, alpha-beta pruning, decision theory, joint probability and Bayes' law. Week 13 adds data compression: the prefix property, Huffman and adaptive Huffman coding, and run-length encoding.

The dedicated midterm pages remain limited to the currently posted midterm scope (Weeks 1, 2, 3, 4 and 6); Weeks 7, 10, 12 and 13 sit in the main learning console and the Final area, not in the midterm pages.

## Final Prep Lab

Open **Final → Final Prep Lab** in the sidebar. Each tab is one topic family:

- **Graph algorithms:** Dijkstra, Kruskal, Prim, BFS, DFS and topological sort on the Practice Q1, Assignment 4 and Mock Q1 graphs. In Practice mode ties are accepted in any order, as in the exam.
- **Euler · Hamilton · Postman:** degrees, Eulerian cycle/trail verdict, Chinese Postman repeats, and a click-to-build Hamiltonian tour checked against the shortest possible one.
- **Search:** breadth-first, depth-first, iterative deepening, uniform cost, greedy and A* on one small map.
- **Hill climbing:** local maximum vs simulated annealing (seeded, so a result can be reproduced).
- **Minimax · alpha-beta:** editable leaves, step-by-step α/β log, and a quiz mode where you mark the pruned leaves.
- **Huffman:** build the tree one join at a time, read codes, count bits, encode and decode.
- **Checklist:** what to be able to do from memory; ticks are saved in the browser.

Logic is in `final-prep-logic.js` (no DOM) and is checked by `node tests/final-prep-logic.test.js`; the interface is `final-prep.js`.

## Tree practice

- Assignment 1: BST construction and deletion.
- Assignment 2: AVL height, balance factor and rotations.
- Assignment 3: Splay Tree accesses 1 → 11 → 4, with step-by-step bottom-up splaying.
- Assignment 4: minimum spanning tree of a 10-vertex graph with Kruskal and with Prim from A, as two step-by-step walkthroughs.
- Tree Mastery includes a BST builder/traversal lab, AVL rotation trainer, B-Tree order trainer, Splay access walkthrough, assignment-style drills and persistent mastery tracking.

## Languages

The Final Prep Lab is English only (its labels are mostly algorithm terms, code and numbers). The **EN / MY** button in the header switches the final-scope material to Burmese: Weeks 7, 10, 12 and 13, the Final definition bank, the 20 practice problems, the Final Mock, the course home page, and the 69 flashcards and 49 quiz questions for those weeks. Code, pseudo-code, formulas and the step-by-step walkthrough widgets stay in English. Technical terms (graph, vertex, DFS, heuristic, Huffman…) are kept in English inside the Burmese text.

Translations live in `i18n/my.js` and load only when MY is selected; tagged elements carry `data-i18n` keys.

## Tech

Vanilla HTML · CSS custom properties · plain JavaScript · SVG · localStorage. Light and dark themes. The sidebar can be hidden and shown on desktop (button in the sidebar, or the `[` key).

## Note on content

The explanations are my own restatement of the course material, written for comprehension. Lecture slides and worksheets belong to the course instructor and are not redistributed here.

---
[Study Console](https://zann208.github.io/study/)
