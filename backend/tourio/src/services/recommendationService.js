const KNN = require('ml-knn');

let knn;

// Simple training dataset: [price, days] => class
// class 0: budget tour, class 1: premium tour
const features = [
  [100, 2],
  [150, 3],
  [200, 3],
  [350, 5],
  [400, 6],
  [800, 7],
  [1200, 10]
];
const labels = [0, 0, 0, 1, 1, 1, 1];

function trainModel() {
  knn = new KNN(features, labels);
}

function predict(price, days) {
  if (!knn) {
    trainModel();
  }
  const result = knn.predict([[price, days]]);
  return result[0] === 0 ? 'budget' : 'premium';
}

module.exports = { predict };
