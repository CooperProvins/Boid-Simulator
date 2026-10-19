const divs = [];

for (let i = 0; i < 20; i++) {
  var iDiv = document.createElement("div");
  iDiv.style.left = '200px';
  
  divs.push(iDiv);
  document.body.appendChild(iDiv);
}
