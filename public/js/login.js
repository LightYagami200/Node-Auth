document.querySelector('#login-form').addEventListener('submit', async e => {
  e.preventDefault();

  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;

  // Fetch
  const res = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const fRes = await res.json();

  if (fRes.msg === 'success') {
    location.href = '/';
  }
});
