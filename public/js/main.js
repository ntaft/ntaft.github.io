
document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementsByTagName('header');
  header[0].style.height = `${window.innerHeight}px`;

  function expandContent(clickedBox, hiddenContent) {
    if (window.innerWidth > 768){
  	   clickedBox.style.width = '46%';
    } else {
      clickedBox.style.width = '98%';
    }
    // clickedBox.style.opacity = '1';
    //reveals the hidden content in each box; a timeout for this one matches css
  	setTimeout( () => {document.getElementById(hiddenContent).style.display='block';}, 500);
  	resetWidth(clickedBox);
  };

  function resetWidth (clickedBox) {
    const winWid = window.innerWidth
  	for (let i = 1; i < 7; i++) {
  		let boxNumber = `box${i}`
      let eachBox = document.getElementById(boxNumber);
      //makes sure that all are reset except for current item
  		if (eachBox != clickedBox) {
        if (winWid > 768) {
  			eachBox.style.width = '33%';
      } else {
        eachBox.style.width = '99%';
      }
      document.getElementById(`hidden${i}`).style.display = 'none';
      };
  	}
  }

  for (let i = 1; i < 7; i++) {
    let box = document.getElementById(`box${i}`);
    box.addEventListener('click', () => expandContent(box, `hidden${i}`));
  };

  function buttonHandler() {
  const button = document.querySelector('button');
  button.onclick = sendMail
}

  function sendMail (e) {
  e.preventDefault();

  const mailPayload = {
    name: e.path[1][0].value,
    email: e.path[1][1].value,
    body: e.path[1][2].value,
    }
  console.log(mailPayload);
  for (i=0; i < e.path[1].length; i++) {
    e.path[1][i].value = "";
  }
  const button = document.querySelector('button');
  button.innerHTML = "Thanks for contacting me!";
  button.removeEventListener("click", sendMail)
  }

  buttonHandler();

});
