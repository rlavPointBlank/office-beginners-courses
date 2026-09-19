/* Shared engine for the "<App> for Treasurers" course series.
   A course HTML file loads this, then defines `const CH = [...]` and calls runCourse(config).
   config: { storageKey, title, homeIntro (html), suiteLinks (html, optional), CH }
*/

/* ---------- preview-mockup helpers (used inside chapter screen bodies) ---------- */
function grid(rows,opts={}){
  const cols=rows[0].length;
  let h='<table class="grid"><tr><th></th>';
  for(let c=0;c<cols;c++) h+='<th>'+String.fromCharCode(65+c)+'</th>';
  h+='</tr>';
  rows.forEach((r,ri)=>{
    h+='<tr><th>'+(ri+1)+'</th>';
    r.forEach((v,ci)=>{
      const ref=String.fromCharCode(65+ci)+(ri+1);
      let cls=[];
      if(opts.sel===ref) cls.push('s');
      if(opts.head && ri===0) cls.push('h');
      if(opts.yellow && opts.yellow.includes(ref)) cls.push('y');
      if(typeof v==='number'||/^\$?[\d,.\-]+$/.test(String(v))) cls.push('n');
      h+='<td class="'+cls.join(' ')+'">'+(v===null||v===undefined?'':v)+'</td>';
    });
    h+='</tr>';
  });
  h+='</table>';
  if(opts.fbar) h='<div class="fbar"><b>'+opts.sel+'</b> &nbsp;<span style="border:1px solid var(--line);padding:.1rem .6rem;background:#fff">'+opts.fbar+'</span></div>'+h;
  return h;
}
function mailMock(fields,body){
  let h='<div class="mock"><div class="bar"><span>Message</span></div><div class="body">';
  fields.forEach(f=>{ h+=`<div class="field"><b>${f[0]}</b><span>${f[1]}</span></div>`; });
  if(body) h+=`<div style="padding-top:.8rem;font-size:.9rem">${body}</div>`;
  h+='</div></div>';
  return h;
}
function slideMock(title,bullets){
  return `<div class="mock" style="max-width:26em"><div class="bar"><span>Slide</span></div><div class="body"><div class="slide"><h4>${title}</h4><ul>${bullets.map(b=>`<li>${b}</li>`).join('')}</ul></div></div></div>`;
}
function docMock(lines){
  return `<div class="mock"><div class="bar"><span>Document</span></div><div class="body">${lines.map(l=>`<p style="margin:.3em 0">${l}</p>`).join('')}</div></div>`;
}

/* ---------- engine ---------- */
function runCourse(cfg){
  const CH = cfg.CH;
  const KEY = cfg.storageKey;
  let S={ unlocked:0, cur:{ch:0, screen:0, phase:'home'}, done:{}, cando:{}, scores:{}, badges:[], fs:19 };
  function load(){ try{ const j=localStorage.getItem(KEY); if(j) S=Object.assign(S,JSON.parse(j)); }catch(e){} }
  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} }
  load();
  document.documentElement.style.setProperty('--fs',S.fs+'px');

  const $=s=>document.querySelector(s);
  const chapterDone=i=>!!S.done[i];

  function renderSide(){
    let h='<div class="colhead"><span></span><span>Chapter</span></div>';
    CH.forEach((c,i)=>{
      const locked=i>S.unlocked, done=chapterDone(i), cur=S.cur.phase!=='home'&&S.cur.ch===i;
      h+=`<button class="rowbtn ${locked?'locked':''} ${done?'done':''} ${cur?'current':''} ${c.kind==='test'?'test':''}" ${locked?'disabled':''} onclick="goChapter(${i})">
        <span class="num">${i+1}</span><span class="lab">${c.title}${done?'<span class="tick">✓</span>':(locked?'<span class="lock">locked</span>':'')}</span></button>`;
    });
    h+=`<div style="padding:1rem 1.2rem 0"><button class="rowbtn" style="border:1px solid var(--line)" onclick="goHome()"><span class="num">⌂</span><span class="lab">Start page</span></button></div>`;
    if(cfg.suiteLinks) h+=`<div class="suite-nav">${cfg.suiteLinks}</div>`;
    $('#chapterList').innerHTML=h;
  }

  function goHome(){ S.cur.phase='home'; save(); render(); }
  function goChapter(i){ if(i>S.unlocked) return; S.cur={ch:i,screen:0,phase:'lesson'}; save(); render(); window.scrollTo(0,0); document.getElementById('side').classList.remove('open'); }
  function nextScreen(){ const c=CH[S.cur.ch]; if(S.cur.screen<c.screens.length-1){S.cur.screen++;} else if(c.kind==='test'){S.cur.phase='quiz'; Q={i:0,right:0,answered:false};} else {S.cur.phase='practice';} save(); render(); window.scrollTo(0,0); }
  function prevScreen(){ if(S.cur.phase==='practice'){S.cur.phase='lesson';} else if(S.cur.screen>0){S.cur.screen--;} save(); render(); window.scrollTo(0,0); }
  function startQuiz(){ S.cur.phase='quiz'; Q={i:0,right:0,answered:false}; save(); render(); window.scrollTo(0,0); }
  function skipAhead(){ const i=S.cur.ch; if(i===S.unlocked && i<CH.length-1){ S.unlocked=i+1; save(); goChapter(i+1);} }

  let Q={i:0,right:0,answered:false};
  function render(){
    renderSide();
    const m=$('#main');
    if(S.cur.phase==='home') return m.innerHTML=homeHTML();
    const c=CH[S.cur.ch];
    if(S.cur.phase==='lesson') return m.innerHTML=lessonHTML(c);
    if(S.cur.phase==='practice') return m.innerHTML=practiceHTML(c);
    if(S.cur.phase==='quiz') return m.innerHTML=quizHTML(c);
    if(S.cur.phase==='result') return m.innerHTML=resultHTML(c);
  }

  function homeHTML(){
    const total=CH.length, done=Object.keys(S.done).length;
    const resume=S.unlocked;
    return `<h1>${cfg.title}</h1>
    ${cfg.homeIntro}
    <div class="nav"><button class="btn" onclick="goChapter(${resume})">${done===0?'Begin chapter 1':'Continue where I left off'}</button></div>
    <h2 style="margin-top:2.5rem">Progress</h2>
    <p>${done} of ${total} chapters complete.</p>
    <div class="shelf">${CH.map((c,i)=>c.badge?`<span class="${S.badges.includes(i)?'':'off'}">${S.badges.includes(i)?'★ ':'☆ '}${c.badge.name}</span>`:'').join('')}</div>
    <div class="toolbar">
      <span class="textsize">Text size <button onclick="setFs(-1)">A−</button><button onclick="setFs(1)">A+</button></span>
      <button onclick="resetAll()">Start over (erase progress)</button>
    </div>`;
  }
  function setFs(d){ S.fs=Math.min(26,Math.max(15,S.fs+d)); document.documentElement.style.setProperty('--fs',S.fs+'px'); save(); }
  function resetAll(){ if(confirm('Erase all progress and start from chapter 1?')){ S={unlocked:0,cur:{ch:0,screen:0,phase:'home'},done:{},cando:{},scores:{},badges:[],fs:S.fs}; save(); render(); } }

  function lessonHTML(c){
    const sc=c.screens[S.cur.screen], n=c.screens.length, i=S.cur.screen;
    return `<div class="crumb">Chapter ${S.cur.ch+1} · page ${i+1} of ${n}</div>
    <h1>${c.title}</h1>
    <div class="dots">${c.screens.map((_,k)=>`<i class="${k<i?'on':k===i?'now':''}"></i>`).join('')}</div>
    <div class="screen"><h2>${sc.h}</h2>${sc.body}${sc.tip?`<div class="tip"><b>Tip:</b> ${sc.tip}</div>`:''}</div>
    <div class="nav">
      <button class="btn plain" onclick="prevScreen()" ${i===0?'disabled':''}>Back</button>
      <button class="btn" onclick="nextScreen()">${i===n-1?(c.kind==='test'?'Start the test':'Now try it'):'Next'}</button>
    </div>
    <div class="skip"><button onclick="goHome()">Back to start page</button></div>`;
  }

  function practiceHTML(c){
    const checked=!!S.cando[S.cur.ch];
    return `<div class="crumb">Chapter ${S.cur.ch+1} · practice</div>
    <h1>${c.title}</h1>
    <div class="tryit${c.live?' live':''}"><h3>${c.live?(cfg.liveLabel||'Try it — this uses the real thing'):(cfg.practiceLabel||'Try it in the practice file')}</h3>${c.live?`<p style="color:var(--amber);font-size:.9rem;margin-top:-.4rem"><b>Nothing here is a sandbox.</b> ${cfg.liveWarning||'These steps act on the real thing, not a practice copy.'}</p>`:''}${c.tryit}</div>
    <div class="checkrow"><input type="checkbox" id="cando" ${checked?'checked':''} onchange="S.cando[S.cur.ch]=this.checked;save();render()">
      <label for="cando">I can do this without looking<small>Tick this only when it's true. It's for you, not for anyone else.</small></label></div>
    <div class="nav">
      <button class="btn plain" onclick="prevScreen()">Back to the lesson</button>
      <button class="btn" onclick="startQuiz()" ${checked?'':'disabled'}>Take the quiz</button>
    </div>
    ${checked?'':'<p style="color:var(--muted);font-size:.9rem">The quiz opens once you tick the box.</p>'}
    <div class="skip"><button onclick="skipAhead()">Skip this chapter</button></div>`;
  }

  function quizHTML(c){
    const qs=c.quiz, q=qs[Q.i];
    return `<div class="crumb">${c.kind==='test'?'Test':'Quiz'} · question ${Q.i+1} of ${qs.length}</div>
    <h1>${c.title}</h1>
    <div class="q"><h2>${q.q}</h2>
    ${q.o.map((o,k)=>`<button class="opt" id="opt${k}" onclick="answer(${k})">${o}</button>`).join('')}
    <div id="fb"></div>
    <div class="nav" id="qnav" style="display:none"><button class="btn" onclick="nextQ()">${Q.i===qs.length-1?'See my score':'Next question'}</button></div>
    </div>`;
  }
  function answer(k){
    if(Q.answered) return; Q.answered=true;
    const q=CH[S.cur.ch].quiz[Q.i];
    const ok=k===q.a; if(ok) Q.right++;
    document.querySelectorAll('.opt').forEach((b,i)=>{ b.disabled=true; if(i===q.a) b.classList.add('right'); else if(i===k) b.classList.add('wrong'); });
    $('#fb').innerHTML=`<div class="feedback ${ok?'ok':'no'}"><b>${ok?'Correct.':'Not quite.'}</b> ${q.why}</div>`;
    $('#qnav').style.display='flex';
  }
  function nextQ(){
    const c=CH[S.cur.ch];
    if(Q.i<c.quiz.length-1){ Q.i++; Q.answered=false; render(); window.scrollTo(0,0); return; }
    const pass=Q.right>=c.pass;
    S.scores[S.cur.ch]={right:Q.right,of:c.quiz.length,pass};
    if(pass){ S.done[S.cur.ch]=true; if(S.cur.ch===S.unlocked && S.cur.ch<CH.length-1) S.unlocked=S.cur.ch+1; if(c.badge && !S.badges.includes(S.cur.ch)){ S.badges.push(S.cur.ch); S.newBadge=true; } }
    S.cur.phase='result'; save(); render(); window.scrollTo(0,0);
  }
  function resultHTML(c){
    const r=S.scores[S.cur.ch], last=S.cur.ch===CH.length-1;
    const badge=(r.pass&&c.badge)?`<div class="badge ${S.newBadge?'new':''}"><div class="ico">★</div><div><h3>${c.badge.name}</h3><p>${c.badge.msg}</p></div></div>`:'';
    S.newBadge=false;
    return `<div class="crumb">Chapter ${S.cur.ch+1} · result</div>
    <h1>${c.title}</h1>
    <div class="score">${r.right} out of ${r.of} correct</div>
    ${r.pass?`<p>That's a pass. Chapter ${S.cur.ch+1} is marked done.</p>${badge}`:`<p>You needed ${c.pass} correct to pass. That's not a judgement — it means one idea hasn't settled yet. Reread the lesson (it's short) and try again; the questions are the same, and that's on purpose.</p>`}
    <div class="nav">
      ${r.pass&&!last?`<button class="btn" onclick="goChapter(${S.cur.ch+1})">Go to chapter ${S.cur.ch+2}</button>`:''}
      ${r.pass&&last?`<button class="btn" onclick="goHome()">Back to the start page</button>`:''}
      <button class="btn quiet" onclick="S.cur.phase='lesson';S.cur.screen=0;save();render();window.scrollTo(0,0)">Reread the lesson</button>
      ${r.pass?'':`<button class="btn quiet" onclick="startQuiz()">Try the quiz again</button>`}
    </div>`;
  }

  /* expose the handlers the inline onclick= attributes call */
  window.goHome=goHome; window.goChapter=goChapter; window.nextScreen=nextScreen;
  window.prevScreen=prevScreen; window.startQuiz=startQuiz; window.skipAhead=skipAhead;
  window.setFs=setFs; window.resetAll=resetAll; window.answer=answer; window.nextQ=nextQ;
  window.save=save; window.render=render;
  window.S=S;

  render();
}
