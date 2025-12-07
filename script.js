// script.js
// Implements step-by-step progress with 5 circles (ids circle-1 ... circle-5)
// Buttons: next (id="next"), prev (id="prev")
// Progress fill element: id="progress-fill"

(function () {
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const fillEl = document.getElementById('progress-fill');

  // collect circles in order
  const circles = [
    document.getElementById('circle-1'),
    document.getElementById('circle-2'),
    document.getElementById('circle-3'),
    document.getElementById('circle-4'),
    document.getElementById('circle-5')
  ];

  const totalSteps = circles.length;

  // currentActive counts how many circles are active (initially 1)
  let currentActive = 1;

  // update UI according to currentActive
  function updateUI() {
    // set active class for first currentActive circles
    circles.forEach((c, idx) => {
      if (idx < currentActive) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    // progress fill: percent = (currentActive - 1) / (totalSteps - 1) * 100
    const percent = ((currentActive - 1) / (totalSteps - 1)) * 100;
    fillEl.style.width = `${percent}%`;

    // buttons enable/disable
    prevBtn.disabled = (currentActive === 1);
    nextBtn.disabled = (currentActive === totalSteps);
  }

  // On Next click: move forward by one (no skipping)
  nextBtn.addEventListener('click', function () {
    if (currentActive < totalSteps) {
      currentActive += 1;
      updateUI();
    }
  });

  // On Prev click: move back by one
  prevBtn.addEventListener('click', function () {
    if (currentActive > 1) {
      currentActive -= 1;
      updateUI();
    }
  });

  // Defensive: prevent rapid double changes causing invalid states.
  // Here the checks inside listeners ensure no skipping, so rapid clicks are safe.
  // Initialize UI
  updateUI();
})();
