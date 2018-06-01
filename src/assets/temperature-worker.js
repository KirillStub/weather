var xhr = new XMLHttpRequest();
xhr.open('GET', 'temperature.json', false);
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    self.temperatures = JSON.parse(xhr.responseText);
  }
};
xhr.send();

self.onmessage = function (e) {
  var startDate = new Date(e.data[0] + '-01-01');
  var endDate = new Date(e.data[1] + '-12-31');
  var result = [];
  self.temperatures.forEach(function(item) {
    if (new Date(item.t) >= startDate && new Date(item.t) <= endDate) {
      result.push([new Date(item.t), item.v]);
    }
  });
  self.postMessage(result);
}