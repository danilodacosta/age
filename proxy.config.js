const proxy = [
  {
    context: '/api/*',
    target: 'http://www.mscfilho.net',
    secure: false
  }
];
module.exports = proxy;

