
document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementsByTagName('header');
  header[0].style.height = `${window.innerHeight}px`;

  function buttonHandler() {
  const sendButton = document.querySelector('#send-button');
  sendButton.addEventListener('click', sendMail);
  // const museumButton = document.querySelector('#museum-button')
  // museumButton.onclick = () => location.href = 'http://www.nytimes.com/2012/12/01/arts/design/the-perot-museum-of-nature-and-science-in-dallas.html'
  }

   // simply checks forms for completion and validation
  function formValid(f) {
    // safari hates formData, so just going with DOM manipulation here
    let test = true;
    const form = {
      name: document.querySelector('input[name=name]').value,
      email: document.querySelector('input[name=_replyto]').value,
      body: document.querySelector('textarea[name=message]').value,
    };
    // regex email validator
    if (!(/^.+@.+$/.exec(form.email))) test = 'invalid email';
    // tests if the fields are empty
    for (let field in form) {
      if (form[field] === '') test = false;
    }
    return test;
  }

  // github pages do not support backend processes, so need a frontend mailer
  // submits mail via formspree, while blocking their annoying popup page.
  function sendMail(e) {
    e.preventDefault();
    const button = document.querySelector('#send-button');
    const form = new FormData(document.getElementById('send-message'));
    const isFilled = formValid(form);
    if (isFilled) {
      if (isFilled === 'invalid email') {
        button.innerHTML = 'Please enter a valid email';
        button.style.backgroundColor = '#FF4136';
      } else {
      const emails = ['taft82'];
      button.innerHTML = 'Sending...';
      // I like fetch, safari hates it. gonna try it anyway
      emails.forEach((i) => {
        try {
          fetch(`https://formspree.io/${i}@gmail.com`, {
            mode: 'no-cors',
            method: 'POST',
            body: form,
          })
          .then(r => submitSuccess())
          .catch((err) => {
            console.log(err)
            submitFail();
          });
        }
        catch (err) {
          console.log('fetch not supported; ', err);
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `https://formspree.io/${i}@gmail.com`, true);
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.responseType = 'document';
          // sets the state of the form depending on the status
          xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              xhr.abort();
              submitSuccess();
            }
            else {
              submitFail();
              console.log(xhr.status);
            }
          };
          xhr.send(form);
        }
      });

      function submitSuccess() {
        button.innerHTML = 'Thanks for contacting me!';
        button.style.backgroundColor = '#3b5998'
        button.removeEventListener('click', sendMail)
        if (e.path[1]) {
          for (i=0; i < e.path[1].length; i++) {
            e.path[1][i].value = '';
          }
        }
      }

      function submitFail() {
        button.innerHTML = 'Error with submission';
        button.style.backgroundColor = '#FF4136';
      }

    }
  } else {
    button.innerHTML = 'Please fill out all fields';
    button.style.backgroundColor = '#FF4136'
    }
  }

buttonHandler();

});
