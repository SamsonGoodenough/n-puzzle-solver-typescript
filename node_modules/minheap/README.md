# A Simple Min Heap

This is a simple min heap implementation.

## Install

Using npm

```
npm install minheap
```

## API

## Heap(compare)
Instantiate a heap using the compare function. If compare function is not
given it falls back to a simple number comparison.

Required compare function should be similar to the function passed into [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

### Heap.push(value)

Pushes the value to the heap

### Heap.top()

Returns the value on top of the heap. This is the min value. If max value is
required the compare function need to be altered accordingly.

### Heap.pop()

Removes the top element from the heap and returns that value.

## Example

Following example finds the Kth smallest number of a number list in
O(NlogK) time. This is efficient compared to sorting entire
list which takes O(NlogN) time, given that K << N.

```javascript

 var Heap = require('minheap');
 // Max heap
 var heap = new Heap(function(a,b) {
  return b - a;
 });
 var N = 1<<20;
 var MAX_VAL = 1<<29;
 var K = 10
 var arr = [];

 // Generate random list
 for (var i=0; i<N; ++i) {
  arr[i] = Math.floor(Math.random() * MAX_VAL);
 }

 // Finding Kth smallest in O(N log K) using the heap
 for (var i=0; i<N; ++i) {
  if (i < K) {
   heap.push(arr[i]);
  } else {
   if (arr[i] < heap.top()) {
    heap.pop();
    heap.push(arr[i]);
   }
  }
 }

 console.log("10th smallest using heap: " + heap.top());

 // Finding Kth smallest in O(N log N) by sorting the entire list
 arr.sort(function(a,b) {
  return a - b;
 });
 console.log("10th smallest using sort: " + arr[K-1]);

```
