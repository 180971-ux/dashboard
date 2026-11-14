/* Schermvergrendeling voor het privé-dashboard en de PGB-tool.
   Gebruikersnaam + wachtwoord worden alleen als PBKDF2-hash op dit apparaat bewaard.
   Let op: dit beschermt het scherm op dit apparaat, niet de broncode op GitHub. */
(function(){
  "use strict";
  var K = { lock:"pd-lock", until:"pd-unlock-until" };
  var IDLE_MIN = 15;
  function get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  function del(k){ try{ localStorage.removeItem(k); }catch(e){} }
  function conf(){ try{ return JSON.parse(get(K.lock)||"null"); }catch(e){ return null; } }
  function open(){ return +(get(K.until)||0) > Date.now(); }
  function touch(){ if(conf() && open()) set(K.until, String(Date.now()+IDLE_MIN*60000)); }
  var b64=function(u){ var s=""; u=new Uint8Array(u); for(var i=0;i<u.length;i++) s+=String.fromCharCode(u[i]); return btoa(s); };
  var unb64=function(s){ var b=atob(s), u=new Uint8Array(b.length); for(var i=0;i<b.length;i++) u[i]=b.charCodeAt(i); return u; };
  async function hash(user,pw,salt,iter){
    var key=await crypto.subtle.importKey("raw",new TextEncoder().encode(user.trim().toLowerCase()+"\u0000"+pw),"PBKDF2",false,["deriveBits"]);
    return b64(await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt:salt,iterations:iter},key,256));
  }

  /* direct verbergen tot er ontgrendeld is (geen flits van gegevens) */
  var hideCss=document.createElement("style");
  hideCss.textContent="body>*:not(#slot){visibility:hidden!important}";
  if(conf() && !open()) document.documentElement.appendChild(hideCss);

  var CSS="#slot{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:24px;"+
   "background:linear-gradient(135deg,#7a3f6a,#c0628a);font:16px/1.45 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#fff}"+
   "#slot form{width:min(360px,100%);background:rgba(255,255,255,.14);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border-radius:20px;padding:22px;display:grid;gap:12px}"+
   "#slot h1{margin:0;font-family:Fraunces,Georgia,serif;font-style:italic;font-weight:600;font-size:28px}"+
   "#slot p{margin:0;font-size:14px;opacity:.9}"+
   "#slot input{width:100%;font:inherit;font-size:16px;padding:11px 12px;border:0;border-radius:12px;color:#1b2430;background:#fff;box-sizing:border-box}"+
   "#slot button{font:inherit;font-weight:600;border:0;border-radius:12px;padding:12px;background:#fff;color:#6b3a5e;cursor:pointer;min-height:44px}"+
   "#slot .lnk{background:transparent;color:#fff;font-weight:400;font-size:14px;text-decoration:underline;min-height:0;padding:4px}"+
   "#slot .err{color:#ffe1e1;font-weight:600;min-height:1.2em}";

  function show(){
    if(document.getElementById("slot")) return;
    var st=document.createElement("style"); st.textContent=CSS; document.head.appendChild(st);
    if(!hideCss.isConnected) document.documentElement.appendChild(hideCss);
    var d=document.createElement("div"); d.id="slot";
    d.innerHTML='<form autocomplete="on"><h1>Privé dashboard</h1><p>Log in om verder te gaan.</p>'+
      '<input id="slotU" name="username" autocomplete="username" placeholder="Gebruikersnaam" autocapitalize="off" spellcheck="false">'+
      '<input id="slotP" name="password" type="password" autocomplete="current-password" placeholder="Wachtwoord">'+
      '<div class="err" id="slotE"></div><button type="submit">Ontgrendelen</button>'+
      '<button type="button" class="lnk" id="slotF">Wachtwoord vergeten?</button></form>';
    document.body.appendChild(d);
    var f=d.querySelector("form"), busy=false, fails=0;
    setTimeout(function(){ var u=document.getElementById("slotU"); var c=conf(); if(c&&c.u){ u.value=c.u; document.getElementById("slotP").focus(); } else u.focus(); },50);
    f.onsubmit=async function(e){
      e.preventDefault(); if(busy) return; busy=true;
      var c=conf(), u=document.getElementById("slotU").value, p=document.getElementById("slotP").value;
      var ok=false; try{ ok = !!c && (await hash(u,p,unb64(c.salt),c.iter))===c.hash; }catch(x){}
      if(ok){ set(K.until,String(Date.now()+IDLE_MIN*60000)); d.remove(); hideCss.remove(); }
      else{ fails++; document.getElementById("slotE").textContent="Gebruikersnaam of wachtwoord klopt niet."; document.getElementById("slotP").value="";
            await new Promise(function(r){ setTimeout(r, Math.min(8000, 600*fails)); }); }
      busy=false;
    };
    document.getElementById("slotF").onclick=function(){
      var t=prompt("Wachtwoord vergeten? Dan worden de gegevens op DIT apparaat gewist (uren, Spaans, instellingen) en kun je opnieuw beginnen. Zet daarna je back-up terug.\n\nTyp WISSEN om door te gaan.");
      if(t && t.trim().toUpperCase()==="WISSEN"){ try{ localStorage.clear(); sessionStorage.clear(); }catch(x){} location.reload(); }
    };
  }

  function check(){ if(conf() && !open()) show(); }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",check); else check();
  document.addEventListener("visibilitychange",function(){ if(document.visibilityState==="visible") check(); });
  ["pointerdown","keydown"].forEach(function(ev){ document.addEventListener(ev,touch,{passive:true}); });
  setInterval(check, 30000);

  /* voor het instellingenmenu */
  window.Slot={
    actief:function(){ return !!conf(); },
    gebruiker:function(){ var c=conf(); return c?c.u:""; },
    instellen:async function(u,p){
      u=String(u||"").trim(); if(u.length<2) throw new Error("Kies een gebruikersnaam van minstens 2 tekens.");
      if(String(p||"").length<6) throw new Error("Kies een wachtwoord van minstens 6 tekens.");
      var salt=crypto.getRandomValues(new Uint8Array(16)), iter=210000;
      set(K.lock,JSON.stringify({u:u,salt:b64(salt),iter:iter,hash:await hash(u,p,salt,iter)}));
      set(K.until,String(Date.now()+IDLE_MIN*60000));
    },
    controleer:async function(u,p){ var c=conf(); if(!c) return true; try{ return (await hash(u,p,unb64(c.salt),c.iter))===c.hash; }catch(e){ return false; } },
    uitzetten:function(){ del(K.lock); del(K.until); },
    vergrendel:function(){ del(K.until); show(); }
  };
})();
