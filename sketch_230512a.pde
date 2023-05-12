SortVisualizer sortVisualizer;

void setup() {
  size(1920, 1080);
  sortVisualizer = new SortVisualizer(width);
  sortVisualizer.generateArray();
}

void draw() {
  background(255);
  sortVisualizer.update();
  sortVisualizer.draw();
}

void keyPressed() {
  if (key == '1') {
    sortVisualizer.toggleBubbleSort();
  } else if (key == '2') {
    sortVisualizer.toggleQuickSort();
  }
}

class SortVisualizer {
  int[] array;
  int index;
  boolean isBubbleSorting;
  boolean isQuickSorting;

  SortVisualizer(int size) {
    array = new int[size];
    index = 0;
    isBubbleSorting = false;
    isQuickSorting = false;
  }

  void generateArray() {
    for (int i = 0; i < array.length; i++) {
      array[i] = int(random(height));
    }
  }

  void toggleBubbleSort() {
    isBubbleSorting = !isBubbleSorting;
    if (isBubbleSorting) {
      isQuickSorting = false;
      index = 0;
    }
  }

  void toggleQuickSort() {
    isQuickSorting = !isQuickSorting;
    if (isQuickSorting) {
      isBubbleSorting = false;
      quickSort(0, array.length - 1);
    }
  }

  void update() {
    if (isBubbleSorting && index < array.length - 1) {
      bubbleSortStep();
    }
  }

  void draw() {
    for (int i = 0; i < array.length; i++) {
      stroke(0);
      line(i, height, i, height - array[i]);
    }
  }

  void bubbleSortStep() {
    for (int j = 0; j < array.length - index - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(j, j + 1);
      }
    }
    index++;
  }

  void quickSort(int low, int high) {
    if (low < high) {
      int pivotIndex = partition(low, high);
      quickSort(low, pivotIndex - 1);
      quickSort(pivotIndex + 1, high);
    }
  }

  int partition(int low, int high) {
    int pivot = array[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        swap(i, j);
      }
    }

    swap(i + 1, high);
    return i + 1;
  }

  void swap(int a, int b) {
    int temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  }
}
