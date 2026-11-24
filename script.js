document.querySelectorAll('.filter').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('.filter').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    var f = btn.getAttribute('data-filter');
    var shown = 0;
    document.querySelectorAll('.card').forEach(function(card){
      var show = f === 'all' || card.getAttribute('data-cat') === f;
      card.style.display = show ? '' : 'none';
      if (show) shown++;
    });
    document.getElementById('empty').hidden = shown !== 0;
  });
});
document.getElementById('waitlist-form').addEventListener('submit', function(e){
  e.preventDefault();
  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var interest = document.getElementById('interest').value;
  try {
    var list = JSON.parse(localStorage.getItem('africhance-waitlist') || '[]');
    list.push({name: name, email: email, interest: interest, at: new Date().toISOString()});
    localStorage.setItem('africhance-waitlist', JSON.stringify(list));
  } catch (err) {}
  document.getElementById('form-note').textContent = 'Thanks, ' + name + ' — you are on the waitlist for ' + interest + '. We will email ' + email + ' when alerts launch.';
  e.target.reset();
});
