# ALGO Content Integrity Report

## Canonical baseline

The educational-content baseline is the existing `Zann208/algo` console plus the newly supplied **Week 7** source deck.

The Week 7 update is additive. Existing Weeks 1, 2, 3, 4 and 6 material, assignments, Tree Mastery, Midterm Definitions and Midterm Mock remain intact.

## Week 7 source integration

The main console now includes a dedicated **Week 7 — Graphs** module based on the supplied Week 7 deck.

Coverage added to `index.html`:

- graph definitions: simple graph, digraph, multigraph, pseudograph
- path, circuit, cycle, weighted graph and complete graph
- adjacency list, adjacency linked list and adjacency matrix
- graph traversal and visited-node marking
- depth-first search (DFS)
- breadth-first search (BFS)
- shortest paths and Dijkstra's algorithm
- all-to-all shortest paths using the WFI algorithm
- cycle detection
- union-find
- spanning trees and Kruskal's algorithm
- topological sort
- networks with source, sink and capacity
- Eulerian trails/cycles and the Chinese Postman problem
- Hamiltonian cycles/graphs
- Travelling Salesman Problem approaches presented in the source

The Week 7 material is also represented in:

- sidebar topic navigation
- home learning-path summary
- Cheat Sheet
- Flashcards
- Quiz
- README learning coverage

## Midterm boundary

The dedicated midterm pages remain limited to the currently posted midterm scope: **Weeks 1, 2, 3, 4 and 6**.

Week 7 has **not** been silently added to `midterm.html` or the Midterm Mock because the supplied Week 7 deck establishes new learning material but does not state that the existing midterm scope changed.

## Source fidelity

The Week 7 module preserves the terminology, algorithms and framing of the supplied deck. Where the source presents a learner question without giving the answer—for example the Big-O prompt for the WFI algorithm—the main console keeps it as a learner task rather than silently inserting an external answer.

The source slide deck itself is not redistributed in the repository.

## Weeks 10, 12 and 13, Assignment 4 and the Final area

Added to `index.html` as new pages, without changing existing lessons:

- **Week 10**: agents, rationality, task environments, agent programs, problem formulation, uninformed search, heuristic search, local search
- **Week 12**: game theory, minimax, alpha-beta pruning, cut-off and the horizon effect, decision theory, probability, Bayes' law, Wumpus World
- **Week 13**: prefix property, code optimisation, Huffman coding, adaptive Huffman, run-length encoding
- **Assignment 4**: minimum spanning tree with Kruskal and Prim (`assignment4.js` draws the graph and the two walkthroughs)
- **Final**: `final.html` definition bank and an in-console practice page, both scoped to Weeks 7, 10, 12 and 13

The same weeks are represented in the sidebar, home page, Cheat Sheet, Flashcards and Quiz. The midterm pages are unchanged.

Where a slide asks a question without answering it, the console now gives a worked answer and says what it assumes (for example the Wumpus World pit probability uses a pit prior of 0.2).

## Existing material retained

- `legacy.html`
- `tree-mastery.js`
- `tree-mastery-upgrade.js`
- `tree-mastery-learn-expanded.js`
- `assignment3.js`
- `midterm.html`
- `midterm-mock.html`
- existing Weeks 1, 2, 3, 4 and 6 lessons
- existing assignment and mastery progress behavior

## Integrity statement

- Existing lessons removed: **NO**
- Existing assignments removed: **NO**
- Existing midterm scope changed: **NO**
- Existing answers rewritten by the Week 7 update: **NO**
- Week 7 added to main learning console: **YES**
- Week 7 added to general Flashcards / Quiz / Cheat Sheet: **YES**
- Week 7 incorrectly marked as midterm material: **NO**
