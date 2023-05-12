SortVisualizer sortVisualizer;

void setup() {
  size(1080, 720);
  BubbleSort bs = new BubbleSort(generateArray(width));
  sortVisualizer = new SortVisualizer(bs);
  frameRate(250);
}

void draw() {
  background(255);
  sortVisualizer.draw();
}

int[] generateArray(int n) {
  int[] array = new int[n];

  for (int i = 0; i < array.length; i++) {
    array[i] = int(random(height -  height * 0.001));
  }

  return array;
}

class SortVisualizer {
  private ISort sorter;
  private float horizontalBias;
  private int elementsCount;
  ChangedArray changedArray;

  SortVisualizer(ISort sorter) {
    this.sorter = sorter;
    this.elementsCount = this.sorter.GetArray().array.length;
    this.horizontalBias = width / this.elementsCount;
    strokeWeight(this.horizontalBias * 0.6);
    this.changedArray = this.sorter.GetArray();
  }


  void draw() {
    int counter = 0;
    if (this.changedArray != null) { 
      counter = counter + 1;
      this.drawArray(this.changedArray);
      this.changedArray = sorter.NextSortStep();
    }
  }
  
  void drawArray(ChangedArray changedArray){
    for (int i = 0; i < this.elementsCount; i++) {
        stroke(0);

        if (i == changedArray.swaped_element_index_1 || i == changedArray.swaped_element_index_2) {
           stroke(255, 0, 0);
        } 

        line(10 + i * this.horizontalBias, height,10 + i * this.horizontalBias, height - changedArray.array[i]);
      }
  }
}

  