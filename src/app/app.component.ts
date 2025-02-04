import { Component, computed, effect, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'signals-playground';
  numberCount = signal(0);
  colorsArray = signal(['Red', 'Green']);

  length = signal(20);
  breadth = signal(40);
  computedArea = computed(() => this.length() * this.breadth());

  // Example without signals
  a = 10;
  b = 20;
  c = this.a + this.b;

  // with signals
  aa = signal(10);
  bb = signal(20);
  cc = computed(() => this.aa() + this.bb());

  constructor() {
    effect(() => {
      console.log("Effect due to numberCount signal is triggered", this.numberCount());
    });
    effect(() => {
      console.log("Effect due to colorsArray signal is triggered", this.colorsArray());
    });
  }

  ngOnInit(): void {
    // console.log(this.numberCount());
    
    // example without signals
    console.log("without signals " + this.c); // 30
    this.a = 50;
    console.log("without signals " + this.c); // also 30, 
    // becauce not reactive calculated - the value of c was calculated before the value of a was changed
    // example with signals
    console.log("with signals " + this.cc()); // 30
    this.aa.set(50);
    console.log("with signals " + this.cc()); // 70, because reactive calculation
    
  }

  increase() {
    // Update a number
    // this.count = this.count + 1;
    // this.count.set(7);
    // this.count.set(this.count() +1);
    this.numberCount.update((value) => value + 1); // angular documentation!

    // Update an array
    // this.colors.mutate(values => values.push("Blue")); // only angular 16
    this.colorsArray.update((values) => [...values, 'Blue']);
    // console.log(this.colorsArray());

    // Update computed Signal
    this.length.set(30);

    // Effects (always run at least once)
    // if you want to log something when a signal is changed, you can use effects
    // Don´t update any signals inside effects = trigger infinite circular updates
  }
}
