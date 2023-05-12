SortVisualizer sortVisualizer;

void setup() {
  size(1080, 720);
  BubbleSort bs = new BubbleSort(generateArray(width));
  sortVisualizer = new SortVisualizer(bs);
}

void draw() {
  background(255);
  sortVisualizer.draw();
}

int[] generateArray(int n) {
  int[] array = new int[n];

  for (int i = 0; i < array.length; i++) {
    array[i] = int(random(height));
  }

  return array;
}

// void keyPressed() {
//   if (key == '1') {
//     sortVisualizer.toggleBubbleSort();
//   } else if (key == '2') {
//     sortVisualizer.toggleQuickSort();
//   } else if (key == 'r' || key == 'R') {
    
//   }
// }

class SortVisualizer {
  private ISort sorter;

  SortVisualizer(ISort sorter) {
    this.sorter = sorter;
  }

  // void toggleBubbleSort() {
  //   isBubbleSorting = !isBubbleSorting;
  //   if (isBubbleSorting) {
  //     isQuickSorting = false;
  //     index = 0;
  //   }
  // }

  // void toggleQuickSort() {
  //   isQuickSorting = !isQuickSorting;
  //   if (isQuickSorting) {
  //     isBubbleSorting = false;
  //     quickSort(0, array.length - 1);
  //   }
  // }

  // void update() {
  //   if (isBubbleSorting && index < array.length - 1) {
  //     bubbleSortStep();
  //   }
  // }

  void draw() {
    ChangedArray res = sorter.NextSortStep();

    while (res != null) { 
      for (int i = 0; i < res.array.length; i++) {
        stroke(0);

        if (i == res.swaped_element_index_1 || i == res.swaped_element_index_2) {
          stroke(150);
        }

        line(i, height, i, height - res.array[i]);
      }

      res = sorter.NextSortStep();
    }
  }

  // void bubbleSortStep() {
  //   for (int j = 0; j < array.length - index - 1; j++) {
  //     if (array[j] > array[j + 1]) {
  //       swap(j, j + 1);
  //     }
  //   }
  //   index++;
  // }

  // void quickSort(int low, int high) {
  //   if (low < high) {
  //     int pivotIndex = partition(low, high);
  //     quickSort(low, pivotIndex - 1);
  //     quickSort(pivotIndex + 1, high);
  //   }
  // }

  // int partition(int low, int high) {
  //   int pivot = array[high];
  //   int i = low - 1;

  //   for (int j = low; j < high; j++) {
  //     if (array[j] < pivot) {
  //       i++;
  //       swap(i, j);
  //     }
  //   }

  //   swap(i + 1, high);
  //   return i + 1;
  // }

  // void swap(int a, int b) {
  //   int temp = array[a];
  //   array[a] = array[b];
  //   array[b] = temp;
  // }
}
