
document.addEventListener("DOMContentLoaded", () => {
  function expandContent($clickedBox, hiddenContent) {
  	$clickedBox.style.width = '46%';
    // $clickedBox.style.opacity = '1';
    //reveals the hidden content in each box; a timeout for this one matches css
  	setTimeout( () => {document.getElementById(hiddenContent).style.display='block';}, 500);
  	resetWidth($clickedBox);
  };

  function resetWidth ($clickedBox) {
  	for (let i = 1; i < 8; i++) {
  		let boxNumber = `box${i}`
      let $eachBox = document.getElementById(boxNumber);
      //makes sure that all are reset except for current item
  		if ($eachBox != $clickedBox) {
  			$eachBox.style.width = '22%';
  			document.getElementById(`hidden${i}`).style.display = 'none';
  		};
  	};
  };

  for (let i = 1; i < 8; i++) {
    let $box = document.getElementById(`box${i}`);
    $box.addEventListener('click', () => expandContent($box, `hidden${i}`));
  };
});
