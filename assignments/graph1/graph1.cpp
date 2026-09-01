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

        for (int i = 0; i < SIZE; i++) {
            nodes[i] = Node('A' + i);
        }

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

    bool isMultigraph() {
        for (int i = 0; i < edgeCount; i++) {
            for (int j = i + 1; j < edgeCount; j++) {
                if (edges[i].from == edges[j].from &&
                    edges[i].to == edges[j].to) {
                    return true;
                }
            }
        }
        return false;
    }

    bool isPseudograph() {
        for (int i = 0; i < SIZE; i++) {
            if (matrix[i][i] != 0) {
                return true;
            }
        }
        return false;
    }

    bool isDigraph() {
        for (int i = 0; i < SIZE; i++) {
            for (int j = i + 1; j < SIZE; j++) {
                if (matrix[i][j] != matrix[j][i]) {
                    return true;
                }
            }
        }
        return false;
    }

    bool isWeighted() {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                if (matrix[i][j] != 0 && matrix[i][j] != 1) {
                    return true;
                }
            }
        }
        return false;
    }

    bool isComplete() {
        for (int i = 0; i < SIZE; i++) {
            for (int j = i + 1; j < SIZE; j++) {
                if (matrix[i][j] == 0 && matrix[j][i] == 0) {
                    return false;
                }
            }
        }
        return true;
    }

    bool isDisjointed() {
        for (int i = 0; i < SIZE; i++) {
            bool isolated = true;

            for (int j = 0; j < SIZE; j++) {
                if (matrix[i][j] != 0 || matrix[j][i] != 0) {
                    isolated = false;
                }
            }

            if (isolated) {
                return true;
            }
        }
        return false;
    }
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

    cout << boolalpha << endl;
    cout << "Multigraph: " << graph.isMultigraph() << endl;
    cout << "Pseudograph: " << graph.isPseudograph() << endl;
    cout << "Digraph: " << graph.isDigraph() << endl;
    cout << "Weighted graph: " << graph.isWeighted() << endl;
    cout << "Complete graph: " << graph.isComplete() << endl;
    cout << "Disjointed graph: " << graph.isDisjointed() << endl;

    return 0;
}
