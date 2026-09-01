#include <iostream>
using namespace std;

class Node {
public:
    char label;

    Node() {
        label = ' ';
    }

    Node(char l) {
        label = l;
    }
};

class Edge {
public:
    Node *from;
    Node *to;
    int weight;

    Edge() {
        from = 0;
        to = 0;
        weight = 0;
    }

    Edge(Node *f, Node *t, int w) {
        from = f;
        to = t;
        weight = w;
    }
};

class Graph {
public:
    static const int SIZE = 9;

    Node nodes[SIZE];
    Edge edges[SIZE * SIZE];
    int edgeCount;
    int matrix[SIZE][SIZE];

    Graph(int input[SIZE][SIZE]) {
        edgeCount = 0;

        // create nodes
        for (int i = 0; i < SIZE; i++) {
            nodes[i] = Node('A' + i);
        }

        // create edges
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                matrix[i][j] = input[i][j];

                if (input[i][j] != 0) {
                    edges[edgeCount] = Edge(&nodes[i], &nodes[j], input[i][j]);
                    edgeCount++;
                }
            }
        }
    }

    void showNodes() {
        cout << "Nodes: ";
        for (int i = 0; i < SIZE; i++) {
            cout << nodes[i].label << " ";
        }
        cout << endl;
    }

    void showEdges() {
        cout << "Edges:" << endl;
        for (int i = 0; i < edgeCount; i++) {
            cout << edges[i].from->label
                 << " -> "
                 << edges[i].to->label
                 << "  weight "
                 << edges[i].weight
                 << endl;
        }
    }

    bool isMultigraph();
    bool isPseudograph();
    bool isDigraph();
    bool isWeighted();
    bool isComplete();
    bool isDisjointed();
};

int main() {
    int matrix[9][9] = {
        {0, 2, 1, 7, 0, 0, 0, 0, 0},
        {2, 0, 5, 5, 0, 0, 0, 0, 0},
        {1, 5, 0, 4, 0, 9, 0, 0, 0},
        {7, 5, 4, 0, 8, 0, 0, 0, 0},
        {0, 0, 0, 8, 0, 3, 7, 0, 0},
        {0, 0, 9, 0, 3, 0, 5, 10, 0},
        {0, 0, 0, 0, 7, 5, 0, 11, 6},
        {0, 0, 0, 0, 0, 10, 11, 0, 3},
        {0, 0, 0, 0, 0, 0, 6, 3, 0}
    };

    Graph graph(matrix);

    graph.showNodes();
    graph.showEdges();

    return 0;
}
