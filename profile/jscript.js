
document.addEventListener("DOMContentLoaded", () => {
  function expandContent($clickedBox, hiddenContent) {
    if (window.innerWidth > 768){
  	   $clickedBox.style.width = '46%';
    } else {
      $clickedBox.style.width = '98%';
    }
    // $clickedBox.style.opacity = '1';
    //reveals the hidden content in each box; a timeout for this one matches css
  	setTimeout( () => {document.getElementById(hiddenContent).style.display='block';}, 500);
  	resetWidth($clickedBox);
  };

  function resetWidth ($clickedBox) {
    const winWid = window.innerWidth
  	for (let i = 1; i < 8; i++) {
  		let boxNumber = `box${i}`
      let $eachBox = document.getElementById(boxNumber);
      //makes sure that all are reset except for current item
  		if ($eachBox != $clickedBox) {
        if (winWid > 768) {
  			$eachBox.style.width = '22%';
      } else {
        $eachBox.style.width = '48%';
      }
  			document.getElementById(`hidden${i}`).style.display = 'none';
  		};
  	};
  };

  for (let i = 1; i < 8; i++) {
    let $box = document.getElementById(`box${i}`);
    $box.addEventListener('click', () => expandContent($box, `hidden${i}`));
  };
});
