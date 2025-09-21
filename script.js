// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// UTM capture
const params = new URLSearchParams(window.location.search);
['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k=>{
  const el = document.getElementById(k);
  if(el) el.value = params.get(k) || '';
});

// Validation
function setErr(id,msg){
  const el = document.getElementById('err-'+id);
  if(el) el.textContent = msg || '';
}

const form = document.getElementById('leadForm');
const btn  = document.getElementById('submitBtn');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  btn.disabled = true;

  ['firstName','lastName','email','phone','address','coverage','dob','smoker','consent']
    .forEach(i=>setErr(i,''));

  // Honeypot
  if(document.getElementById('_honey').value){
    btn.disabled=false; return;
  }

  let ok = true;
  const reqIds = ['firstName','lastName','email','phone','address','coverage','dob','smoker'];
  reqIds.forEach(id=>{
    const v=document.getElementById(id);
    if(!v||!v.value.trim()){setErr(id,'Required'); ok=false;}
  });

  const email=document.getElementById('email').value.trim();
  if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setErr('email','Invalid email'); ok=false;}

  const phone=document.getElementById('phone').value;
  if((phone.match(/\d/g)||[]).length<10){setErr('phone','10-digit number'); ok=false;}

  if(!document.getElementById('consent').checked){setErr('consent','Required'); ok=false;}

  if(!ok){btn.disabled=false; return;}

  form.submit();
},false);
