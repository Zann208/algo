# ALGO — Algorithms Study Console

Offline, single-file study console for **269202 Algorithms for iSNE** at Chiang Mai University.

**→ [Live](https://zann208.github.io/algo/)** · part of [my semester consoles](https://zann208.github.io/study)

One HTML file. No framework, no build step, no dependencies, no network calls.

## What's inside

| Section | What it does |
|---|---|
| **Topics** | Four weeks of material rewritten in plain language, with commented C++ for every idea |
| **Worksheets** | Both assignments worked through step by step |
| **Flashcards** | 54 cards, filterable by week |
| **Quiz** | 32 questions, each wrong answer explained in one line |
| **Code practice** | 15 fill-in-the-blank C++ exercises in the same format as the exam |
| **Cheat sheet** | Every complexity, structure and rotation rule in one page |

Covers computational complexity (Big O, Ω, Θ), arrays and linked lists (singly, doubly, circular) and sparse tables, stacks and queues including the circular array, then trees: BSTs, traversal, insertion and deletion, balancing with DSW and AVL, splay trees, heaps and heapsort, and expression trees.

## Notable bits

- A small **C++ syntax highlighter** written from scratch, so code samples are readable without pulling in a library.
- **Tree diagrams drawn as SVG at runtime** from a compact text description, with nodes highlighted to show what a rotation or traversal is doing.
- Fill-in-the-blank exercises that grade each blank individually and reveal the answer key on request.

## Tech

Vanilla HTML · CSS custom properties for theming · plain JavaScript · SVG · localStorage. Light and dark themes, works offline.

```bash
git clone https://github.com/Zann208/algo.git && open algo/index.html
```

## Note on content

The explanations are my own restatement of the course material, written for comprehension. Lecture slides and worksheets belong to the course instructor and are not redistributed here.

---
Built by **Zann** — [portfolio](https://zann208.github.io) · [email](mailto:thuhtoozan_1@cmu.ac.th)
