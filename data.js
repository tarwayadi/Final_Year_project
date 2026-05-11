// ===== Shared Data & Chart Helpers for EATSD Visualizer =====

const LABELS5 = [20, 40, 60, 80, 100];
const WLABELS = ['1K', '5K', '8K', '12K', '20K'];

const C = {
  FCFS: '#9CA3AF',
  EDF: '#3B82F6',
  'DEELDPQ-SAPSO': '#F59E0B',
  EATSD: '#0D9488',
  'SA-PSO': '#F87171',
  'NEW_ALGO': '#8B5CF6',
  custom: '#8B5CF6'
};

const DASH = {
  FCFS: [],
  EDF: [6, 3],
  'DEELDPQ-SAPSO': [2, 2],
  EATSD: [],
  'SA-PSO': [8, 4],
  'NEW_ALGO': [5, 5]
};

const D = {
  makespan: {
    FCFS: [1900, 2800, 3800, 5100, 6500],
    EDF: [1600, 2400, 3300, 4400, 5600],
    'DEELDPQ-SAPSO': [1400, 2000, 2800, 3700, 4700],
    EATSD: [1200, 1700, 2400, 3200, 4000],
    'NEW_ALGO': [1100, 1550, 2200, 2950, 3700]
  },
  energy: {
    FCFS: [500, 900, 1800, 2800, 4000],
    EDF: [350, 650, 1200, 2000, 2800],
    'DEELDPQ-SAPSO': [250, 450, 900, 1400, 2000],
    EATSD: [150, 280, 550, 850, 1200],
    'NEW_ALGO': [130, 240, 480, 750, 1050]
  },
  resource: {
    FCFS: [.05, .08, .12, .16, .21],
    EDF: [.07, .10, .14, .19, .25],
    'DEELDPQ-SAPSO': [.10, .15, .22, .29, .36],
    EATSD: [.12, .18, .26, .34, .40],
    'NEW_ALGO': [.14, .20, .29, .37, .43]
  }
};

const EXEC = {
  s1: {
    'SA-PSO': [56, 150, 198, 260, 403],
    FCFS: [93, 270, 390, 511, 840],
    EDF: [68, 192, 250, 322, 521],
    'DEELDPQ-SAPSO': [44, 114, 140, 173, 250],
    EATSD: [37, 88, 103, 121, 172]
  },
  s2: {
    'SA-PSO': [44.8, 120, 158.4, 208, 322.4],
    FCFS: [74.4, 216, 312, 408.8, 672],
    EDF: [54.4, 153.6, 200, 257.6, 416.8],
    'DEELDPQ-SAPSO': [33, 85.5, 105, 129.75, 187.5],
    EATSD: [25.9, 61.6, 72.1, 84.7, 120.4]
  }
};

const SCALE = {
  s1: {
    'SA-PSO': [.536, .825, .875, .930],
    FCFS: [.581, .903, .874, .986],
    EDF: [.565, .814, .859, .971],
    'DEELDPQ-SAPSO': [.518, .768, .824, .867],
    EATSD: [.476, .732, .783, .853]
  },
  s2: {
    'SA-PSO': [.544, .822, .858, .895],
    FCFS: [.602, .903, .920, .964],
    EDF: [.568, .765, .874, .941],
    'DEELDPQ-SAPSO': [.530, .761, .775, .800],
    EATSD: [.528, .729, .762, .784]
  }
};

const SPELABELS1 = ['(10,15)', '(15,20)', '(20,25)', '(25,30)'];
const SPELABELS2 = ['(15,20)', '(20,25)', '(25,30)', '(30,35)'];
const ALGOS4 = ['FCFS', 'EDF', 'DEELDPQ-SAPSO', 'EATSD'];
const ALGOS5 = ['SA-PSO', 'FCFS', 'EDF', 'DEELDPQ-SAPSO', 'EATSD'];

let charts = {};

// Chart helpers
function mkDataset(name, data, color, opts = {}) {
  return {
    label: name, data, borderColor: color, backgroundColor: color + '22',
    borderWidth: opts.bold ? 3 : 2, pointRadius: opts.bold ? 5 : 3,
    pointBackgroundColor: color, borderDash: opts.dash || [], tension: .3,
    fill: false, ...opts
  };
}

function mkGhost(name, data) {
  return mkDataset(name, data, '#D1D5DB', { borderWidth: 1, pointRadius: 2, borderDash: [4, 4], bold: false });
}

function chartOpts(yLabel, xLabel = 'Number of Tasks') {
  return {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, position: 'bottom',
        labels: { usePointStyle: true, padding: 12, font: { family: 'Inter', size: 11 } }
      }
    },
    scales: {
      x: {
        title: { display: true, text: xLabel, font: { family: 'Inter', weight: '600', size: 12 } },
        grid: { color: 'rgba(0,0,0,.04)' }
      },
      y: {
        title: { display: true, text: yLabel, font: { family: 'Inter', weight: '600', size: 12 } },
        grid: { color: 'rgba(0,0,0,.06)' }, beginAtZero: true
      }
    }
  };
}

function makeChart(id, labels, datasets, yLabel, xLabel) {
  if (charts[id]) charts[id].destroy();
  charts[id] = new Chart(document.getElementById(id), {
    type: 'line', data: { labels, datasets }, options: chartOpts(yLabel, xLabel)
  });
  return charts[id];
}
