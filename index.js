const divs = [];

for (int i = 0; i < 20; i++) {
  var iDiv = document.createElement(div);
  iDiv.style.left = 10*i + 5;
  
  divs.push(iDiv);
}
