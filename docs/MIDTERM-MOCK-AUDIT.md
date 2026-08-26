# Midterm Mock Audit

## Scope and source policy

This audit applies only to the **new Midterm Mock**. Existing ALGO lessons, assignments, definitions, examples, answers, code, algorithms, and module order remain read-only.

Source order used for verification:

1. Existing ALGO course-aligned console material
2. Supplied lecture/course material
3. `Algo Practice.pdf`
4. Existing ALGO assignments
5. Existing Tree Mastery
6. `MockQuestions-Midterm.pdf` for exact question wording, diagrams, and values
7. `MockAnswers-Midterm.pdf` as a candidate answer only
8. `[Matty] Algorithms for ISNE (1).pdf` as supplementary terminology/scope notes only

`MockQuestions-Midterm.pdf` defines the mock version implemented here.

## Audit summary

- Supplied question groups: **9**
- Supplied sub-prompts implemented: **42 / 42**
- CONFIRMED: **36**
- CORRECTED: **2**
- MISMATCHED SOURCE: **4**
- MANUAL REVIEW: **0**

`MISMATCHED SOURCE` means a candidate answer/reference is for a different question variant. The implementation follows the exact supplied mock question instead.

## Question-by-question audit

| Question ID | Exact mock task | Status | Verification / source |
|---|---|---|---|
| BST-1 | Construct the complete, balanced BST from the supplied array | **CONFIRMED** | Exact BST values from `MockQuestions-Midterm.pdf`; operation convention checked against current ALGO material and `Algo Practice.pdf`. |
| BST-2 | Describe the array-to-balanced-BST algorithm | **CONFIRMED** | Exact BST values from `MockQuestions-Midterm.pdf`; operation convention checked against current ALGO material and `Algo Practice.pdf`. |
| BST-3 | INSERT 15 | **CONFIRMED** | Exact BST values from `MockQuestions-Midterm.pdf`; operation convention checked against current ALGO material and `Algo Practice.pdf`. |
| BST-4 | DELETE 7 | **CONFIRMED** | Exact BST values from `MockQuestions-Midterm.pdf`; operation convention checked against current ALGO material and `Algo Practice.pdf`. |
| BST-5 | DELETE 14 | **CONFIRMED** | Exact BST values from `MockQuestions-Midterm.pdf`; operation convention checked against current ALGO material and `Algo Practice.pdf`. |
| BST-6 | DELETE 35 | **CONFIRMED** | Exact BST values from `MockQuestions-Midterm.pdf`; operation convention checked against current ALGO material and `Algo Practice.pdf`. |
| BST-7 | SEARCH 38 | **CONFIRMED** | Exact BST values from `MockQuestions-Midterm.pdf`; operation convention checked against current ALGO material and `Algo Practice.pdf`. |
| BST-8 | Why balance a BST? | **CONFIRMED** | Exact BST values from `MockQuestions-Midterm.pdf`; operation convention checked against current ALGO material and `Algo Practice.pdf`. |
| BST-9 | Demonstrate DSW balancing | **CONFIRMED** | Exact BST values from `MockQuestions-Midterm.pdf`; operation convention checked against current ALGO material and `Algo Practice.pdf`. |
| TRAV-1 | Identify what the exact recursive function does | **MISMATCHED SOURCE** | Exact mock uses `print(p->data)`; `MockAnswers-Midterm.pdf` contains a different `function2(p)` variant. The mock implementation follows `print(p->data)`. |
| TRAV-2 | State efficiency / space behavior | **CONFIRMED** | `MockQuestions-Midterm.pdf`; verified against current ALGO course material and/or `Algo Practice.pdf`. |
| TRAV-3 | Compare at least two alternatives | **CONFIRMED** | `MockQuestions-Midterm.pdf`; verified against current ALGO course material and/or `Algo Practice.pdf`. |
| TRAV-4 | Show output from the latest BST | **CONFIRMED** | `MockQuestions-Midterm.pdf`; verified against current ALGO course material and/or `Algo Practice.pdf`. |
| AVL-1 | How self-balancing differs from a separate balancing algorithm | **CONFIRMED** | Exact initial tree/operations from `MockQuestions-Midterm.pdf`; balance-factor convention follows current ALGO course content. |
| AVL-2 | Extra AVL management rules | **CONFIRMED** | Exact initial tree/operations from `MockQuestions-Midterm.pdf`; balance-factor convention follows current ALGO course content. |
| AVL-3 | Insert 18 | **CONFIRMED** | Exact initial tree/operations from `MockQuestions-Midterm.pdf`; balance-factor convention follows current ALGO course content. |
| AVL-4 | Insert 15 | **CONFIRMED** | Exact initial tree/operations from `MockQuestions-Midterm.pdf`; balance-factor convention follows current ALGO course content. |
| AVL-5 | Insert 14 | **CONFIRMED** | Exact initial tree/operations from `MockQuestions-Midterm.pdf`; balance-factor convention follows current ALGO course content. |
| SPLAY-1 | Purpose of self-adjusting trees | **CONFIRMED** | Exact initial tree from rendered `MockQuestions-Midterm.pdf`; terminology and rotations follow current ALGO material. |
| SPLAY-2 | Access 4 on the supplied tree | **MISMATCHED SOURCE** | Exact mock/rendered question is **access 4**; candidate MockAnswers uses **Access 15** in another version. Exact supplied mock is used. |
| SPLAY-3 | Insert 16 after the access operation | **MISMATCHED SOURCE** | Exact mock/rendered question is **insert 16**; candidate MockAnswers uses **Insert 49** in another version. Exact supplied mock is used. |
| HEAP-1 | Max heap definition + one example | **CONFIRMED** | `MockQuestions-Midterm.pdf`; verified against current ALGO course material and/or `Algo Practice.pdf`. |
| HEAP-2 | Min heap definition + one example | **CONFIRMED** | `MockQuestions-Midterm.pdf`; verified against current ALGO course material and/or `Algo Practice.pdf`. |
| BTREEOPS-1 | Suggest a B-Tree use case | **CONFIRMED** | Exact order-5 B-Tree from `MockQuestions-Midterm.pdf`; operation checked against `Algo Practice.pdf`. |
| BTREEOPS-2 | SEARCH 52 | **CONFIRMED** | Exact order-5 B-Tree from `MockQuestions-Midterm.pdf`; operation checked against `Algo Practice.pdf`. |
| BTREEOPS-3 | SEARCH 60 | **CONFIRMED** | Exact order-5 B-Tree from `MockQuestions-Midterm.pdf`; operation checked against `Algo Practice.pdf`. |
| BTREEOPS-4 | INSERT 7 | **CONFIRMED** | Exact order-5 B-Tree from `MockQuestions-Midterm.pdf`; operation checked against `Algo Practice.pdf`. |
| BTREEOPS-5 | INSERT 34 | **CONFIRMED** | Exact order-5 B-Tree from `MockQuestions-Midterm.pdf`; operation checked against `Algo Practice.pdf`. |
| BTREEOPS-6 | DELETE 81 | **MISMATCHED SOURCE** | Exact mock and `Algo Practice.pdf` use **DELETE 81**; candidate MockAnswers uses **DELETE 8**. DELETE 81 is implemented. |
| MULTI-1 | When a B-Tree gains height | **CORRECTED** | Candidate answer mixed gaining height with losing height. Course-aligned answer used: a B-Tree gains height when the **root splits**, creating a new root. |
| MULTI-2 | Difference between B-Tree, B*-Tree and B**-Tree | **CONFIRMED** | `MockQuestions-Midterm.pdf`; verified against current ALGO course material and/or `Algo Practice.pdf`. |
| MULTI-3 | B+ Tree and its advantage over a normal B-Tree | **CORRECTED** | Candidate answer was too vague. Course-aligned B+ properties are used: actual values at leaves, internal nodes as indexes, linked leaves supporting ordered/range traversal. |
| INDEX-1 | What is a Prefix B+ Tree? | **CONFIRMED** | `MockQuestions-Midterm.pdf`; verified against current ALGO course material and/or `Algo Practice.pdf`. |
| INDEX-2 | What is Trie? | **CONFIRMED** | `MockQuestions-Midterm.pdf`; verified against current ALGO course material and/or `Algo Practice.pdf`. |
| GRAPH-1 | Construct the graph from the supplied matrix | **CONFIRMED** | Exact matrix from `MockQuestions-Midterm.pdf`; classification and Dijkstra result independently computed from that matrix. |
| GRAPH-2 | Is it a multigraph? | **CONFIRMED** | Exact matrix from `MockQuestions-Midterm.pdf`; classification and Dijkstra result independently computed from that matrix. |
| GRAPH-3 | Is it a pseudograph? | **CONFIRMED** | Exact matrix from `MockQuestions-Midterm.pdf`; classification and Dijkstra result independently computed from that matrix. |
| GRAPH-4 | Is it a digraph? | **CONFIRMED** | Exact matrix from `MockQuestions-Midterm.pdf`; classification and Dijkstra result independently computed from that matrix. |
| GRAPH-5 | Is it a weighted graph? | **CONFIRMED** | Exact matrix from `MockQuestions-Midterm.pdf`; classification and Dijkstra result independently computed from that matrix. |
| GRAPH-6 | Is it a complete graph? | **CONFIRMED** | Exact matrix from `MockQuestions-Midterm.pdf`; classification and Dijkstra result independently computed from that matrix. |
| GRAPH-7 | Is it disjointed / does it have isolated vertices? | **CONFIRMED** | Exact matrix from `MockQuestions-Midterm.pdf`; classification and Dijkstra result independently computed from that matrix. |
| GRAPH-8 | Dijkstra shortest paths from F to every vertex | **CONFIRMED** | Exact matrix from `MockQuestions-Midterm.pdf`; classification and Dijkstra result independently computed from that matrix. |

## Source version mismatches

### 1. Recursive traversal function

`MockQuestions-Midterm.pdf` calls:

```cpp
print(p->data);
```

The candidate `MockAnswers-Midterm.pdf` contains another version calling `function2(p)`. The new mock answers the exact `print(p->data)` version.

### 2. Splay operations

The supplied mock asks for the rendered Splay tree to be processed with:

- access **4**
- then insert **16**

The candidate `MockAnswers-Midterm.pdf` instead contains **Insert 49** and **Access 15**. Those values were not imported into the new mock.

### 3. B-Tree delete operation

The exact supplied mock asks for **DELETE 81**. `Algo Practice.pdf` also works DELETE 81. The candidate `MockAnswers-Midterm.pdf` contains **DELETE 8**, so that candidate page belongs to a different version.

### 4. B-Tree height wording

The candidate answer says a B-Tree gains height when splitting a node during insertion, and also mentions losing a level during deletion. For the exact question *when would a B-Tree gain height?*, the course-aligned answer is narrower: **height increases when the root splits and a new root is created**.

### 5. B+ Tree advantage wording

The candidate answer says B+ allows faster searches. The existing ALGO course material is more specific, so the model answer uses its supported properties: internal nodes are indexes, actual values are stored in leaves, and linked leaves support ordered traversal.

## Independently checked operation results

### BST sequence

Initial balanced root is 23. Operations are applied sequentially.

- INSERT 15: path `23 → 12 → 17 → 14`, insert as right child of 14.
- DELETE 7: leaf case.
- DELETE 14: one-child case, promote 15.
- DELETE 35: two-child copying case, using the course/practice successor convention; 38 replaces 35.
- SEARCH 38: path `23 → 38`, found.
- Latest inorder output: `1 5 12 15 17 21 23 25 28 33 38 45 58`.

### AVL sequence

Course balance-factor convention: `height(left) − height(right)`.

- INSERT 18: RR imbalance at 13 → left rotation.
- INSERT 15: no rotation.
- INSERT 14: RL imbalance at 13 → right rotation at 15, then left rotation at 13.

### Splay sequence

Exact mock tree is used.

- Access 4 follows `11 → 8 → 1 → 4`, then heterogeneous (zig-zag) and parent-root rotations bring 4 to the root.
- Insert 16 follows the result of the access operation and splays 16 to the root using homogeneous/zig-zig steps.

### B-Tree sequence

The exact populated nodes from the supplied order-5 tree are reconstructed in HTML; the supplied PDF image itself is not redistributed.

- SEARCH 52 reaches the leaf/index path containing 52.
- SEARCH 60 ends at the relevant leaf without a match.
- INSERT 7 fits in its target leaf without a split.
- INSERT 34 causes the leaf overflow described in `Algo Practice.pdf`, promotes 31, then causes a parent overflow and promotes 26.
- DELETE 81 causes the underfull leaf case described in `Algo Practice.pdf`; the affected leaf is merged using the separator from its parent.

### Graph / Dijkstra

The exact supplied weighted matrix was reconstructed from `MockQuestions-Midterm.pdf`. A builder transcription was corrected before publishing: **C–F = 9** and **D–E = 8**. From F, independently verified shortest paths are:

| Vertex | Distance | Previous | Path |
|---|---:|---|---|
| A | 10 | C | F → C → A |
| B | 12 | A | F → C → A → B |
| C | 9 | F | F → C |
| D | 11 | E | F → E → D |
| E | 3 | F | F → E |
| F | 0 | — | F |
| G | 5 | F | F → G |
| H | 10 | F | F → H |
| I | 11 | G | F → G → I |

Classification used in the mock: not a multigraph, not a pseudograph, not a digraph, weighted, not complete, and not disjoint/no isolated vertex. Dijkstra finalization order may vary for equal-distance ties (A/H at 10 and D/I at 11) without changing the shortest distances.

## Existing-course integrity

This feature adds new mock material and a presentation-only Tree Mastery expansion. It does **not** rewrite existing course material.

- Existing lessons changed: **NO**
- Existing assignments changed: **NO**
- Existing definitions changed: **NO**
- Existing examples changed: **NO**
- Existing answers changed: **NO**
- Existing course algorithms/formulas changed: **NO**
- Existing module order changed: **NO**
