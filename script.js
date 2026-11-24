document.getElementById('ticker-close').addEventListener('click', function(){
  document.getElementById('ticker').style.display = 'none';
  var m = document.getElementById('market-ticker');
  if (m) m.style.display = 'none';
  document.body.classList.add('ticker-off');
});

// Live news headlines — Google News Nigeria, via the free rss2json
// service (no key). Headlines of what is happening in the country
// that day, not a repeat of the opportunities on the page.
(function(){
  var track = document.getElementById('news-track');
  if (!track) return;
  var esc = function(s){
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  var fallback = function(){
    track.innerHTML = '<span><b>CLOSING SOON:</b> NNPC / SNEPCo Scholarship ends 30 November 2026</span><span><b>CLOSING SOON:</b> WAAW Foundation Scholarship ends 18 December 2026</span><span>Today\u2019s headlines are unavailable right now — check back shortly</span>';
  };
  fetch('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://news.google.com/rss/search?q=Nigeria&hl=en-NG&gl=NG&ceid=NG:en'))
    .then(function(r){ if (!r.ok) throw new Error('news ' + r.status); return r.json(); })
    .then(function(d){
      var items = (d.items || []).slice(0, 8);
      if (!items.length) throw new Error('no headlines');
      var html = items.map(function(it){
        return '<span><a href="' + esc(it.link) + '" target="_blank" rel="noopener">' + esc(it.title) + '</a></span>';
      }).join('');
      track.innerHTML = html + html;
    })
    .catch(fallback);
})();

// Live FX rates — free, no-key Open ER-API, daily rates, CORS-enabled.
// No NGX price is hard-coded: NGX needs a free API key, which must not
// ship in a public page, so the ticker links out to the live NGX terminal.
(function(){
  var track = document.getElementById('market-track');
  if (!track) return;
  fetch('https://open.er-api.com/v6/latest/USD')
    .then(function(r){ if (!r.ok) throw new Error('rates ' + r.status); return r.json(); })
    .then(function(d){
      var rates = d.rates || {};
      if (!rates.NGN) throw new Error('no NGN rate');
      var fmt = function(n){ return n.toLocaleString('en-NG', {maximumFractionDigits: 2}); };
      var usdNgn = rates.NGN;
      var eurNgn = rates.EUR ? usdNgn / rates.EUR : null;
      var gbpNgn = rates.GBP ? usdNgn / rates.GBP : null;
      var date = (d.time_last_update_utc || '').slice(5, 16);
      var items = [
        '<b>$1 = ₦' + fmt(usdNgn) + '</b>',
        eurNgn ? '<b>€1 = ₦' + fmt(eurNgn) + '</b>' : null,
        gbpNgn ? '<b>£1 = ₦' + fmt(gbpNgn) + '</b>' : null,
        '<a href="https://koboterminal.com/" target="_blank" rel="noopener"><b>NGX ASI:</b> live on Kobo Terminal →</a>',
        'Rates: ExchangeRate-API, daily — ' + date
      ].filter(Boolean);
      var html = items.map(function(s){ return '<span>' + s + '</span>'; }).join('');
      track.innerHTML = html + html;
    })
    .catch(function(){
      track.innerHTML = '<span>Today\u2019s FX rates are unavailable right now — check back shortly</span><span><b>NGX ASI:</b> live on Kobo Terminal — koboterminal.com</span>';
    });
})();

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
