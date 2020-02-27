document.querySelector('#register-form').addEventListener('submit', async e => {
  console.log('REGISTER FUNCTION EXECUTED!');
  e.preventDefault();

  const username = document.querySelector('.username').value;
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;

  // Fetch
  const res = await fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const fRes = await res.json();

  if (fRes.msg === 'success') {
    location.href = '/';
  }
});
