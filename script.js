
//Earth temperature from 1880 to 2020

charting();
async function charting() {
  const data = await getData();
  const ctx = document.getElementById('chart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.xs,
      datasets: [{
        label: 'Combined Land-Surface Air and Sea-Surface Water Temperature C°',
        data: data.ys,
        fill: false,
        backgroundColor: 'rgba(255,0,190,0.2)',
        borderColor: 'rgb(255,182,7)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            callback: function(value, index, values) {
              return value + '°';
            }
          }
        }]
      }
    }
  });
}



async function getData() {
  const xs = [];
  const ys = [];
  const response = await fetch('ZonAnn.csv');
  const data = await response.text();

  const table = data.split('\n').slice(1);
  table.forEach(row => {
    const columns = row.split(',');
    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    ys.push(parseFloat(temp) + 14);
    const NHem = columns[2];
    console.log(year, ' | ', temp, ' | ', NHem);
  });
  return {xs, ys};
}

