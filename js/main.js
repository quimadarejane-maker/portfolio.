(function(){
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var $=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var cl=function(x){return Math.max(0,Math.min(1,x))};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
function ph(t,k){t=String(t).slice(0,30);var h=165+((k%4+4)%4)*14;return 'data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl('+h+',60%,45%)"/><stop offset="1" stop-color="hsl('+(h+40)+',55%,28%)"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/><text x="200" y="146" text-anchor="middle" fill="#fff" font-family="Verdana,sans-serif" font-size="21" font-weight="700">'+esc(t)+'</text><text x="200" y="182" text-anchor="middle" fill="#fff" fill-opacity=".75" font-family="Verdana,sans-serif" font-size="14">Add your image here</text></svg>')}
function im(src,alt,k){return '<img data-k="'+k+'" data-a="'+esc(alt)+'" src="'+esc(src)+'" alt="'+esc(alt)+'" loading="lazy">'}
function fix(root){$('img[data-k]',root).forEach(function(i){var f=function(){if(i.dataset.d)return;i.dataset.d='1';var kk=+i.dataset.k;if(kk===-2){i.src=PHOTO}else if(kk<0){i.remove()}else{i.src=ph(i.dataset.a,kk)}};i.addEventListener('error',f);if(i.complete&&i.naturalWidth===0)f()})}
var ini=function(s){return s.split(/\s+/).slice(0,2).map(function(w){return w[0]}).join('').toUpperCase()};
/* photo + cv */
var photo=$('#photo')[0],phw=$('.ph')[0];(function(){var t=new Image();t.onload=function(){photo.src=t.src;phw.classList.add('cut')};t.onerror=function(){photo.addEventListener('error',function(){if(photo.src!==PHOTO)photo.src=PHOTO});if(photo.complete&&photo.naturalWidth===0)photo.src=PHOTO};t.src='images/profile.png'})();
/* timelines */
function tl(box,items){box.innerHTML=items.map(function(d,i){return '<div class="it'+(i?'':' on')+'"><div class="n">'+(i+1)+'</div><div><div class="hd"><span class="o"><span class="lg" data-i="'+ini(d.org)+'">'+(d.logo?im(d.logo,'',-1):'')+'</span>'+esc(d.org)+'</span><em>'+esc(d.date)+'</em></div><h3>'+esc(d.title)+'</h3><div class="sub">'+esc(d.sub)+(d.tag?'<span class="tag">'+esc(d.tag)+'</span>':'')+'</div>'+(d.desc?'<p>'+esc(d.desc)+'</p>':'')+'</div></div>'}).join('');fix(box)}
function tl2(box,items){box.innerHTML='<i class="fl"></i>'+items.map(function(d,i){return '<div class="it"><div class="n">'+(i+1)+'</div><div class="ic"><div class="hd"><span class="o"><span class="lg" data-i="'+ini(d.org)+'">'+(d.logo?im(d.logo,'',-1):'')+'</span>'+esc(d.org)+'</span><em>'+esc(d.date)+'</em></div><h3>'+esc(d.title)+'</h3><div class="sub">'+esc(d.sub)+(d.tag?'<span class="tag">'+esc(d.tag)+'</span>':'')+'</div>'+(d.desc?'<p>'+esc(d.desc)+'</p>':'')+'</div></div>'}).join('');fix(box)}
tl2($('#tl-edu')[0],DATA.education);tl2($('#tl-exp')[0],DATA.experience);
function focus(box){var br=box.getBoundingClientRect(),cy=br.top+br.height*.4,its=$('.it',box),best=null,bd=1e9;its.forEach(function(it){var r=it.getBoundingClientRect(),d=Math.abs(r.top+40-cy);if(d<bd){bd=d;best=it}});its.forEach(function(it){it.classList.toggle('on',it===best)})}
$('.tlbox').forEach(function(b){b.addEventListener('scroll',function(){focus(b)},{passive:true})});
/* categories */
var CATS=[{k:'projects',label:'Projects',icon:'<path d="m8 7-5 5 5 5M16 7l5 5-5 5"/>'},{k:'certificates',label:'Certificates',icon:'<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>'},{k:'awards',label:'Awards',icon:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>'}].filter(function(c){return DATA[c.k]&&DATA[c.k].length});
var svg=function(p){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'};
/* folders */
$('#fds')[0].innerHTML=CATS.map(function(c){var a=DATA[c.k];var sh=[0,1,2,3,4].map(function(i){var it=a[i%a.length];return '<span class="sh s'+(i+1)+'">'+im(it.img,it.title,i)+'</span>'}).join('');return '<button class="fd" data-t="'+c.k+'" aria-label="Open '+c.label+'"><span class="fb"></span>'+sh+'<span class="ff"><span><b>'+a.length+'</b><small>'+c.label+'</small></span><span class="dots" aria-hidden="true">···</span></span></button>'}).join('');fix($('#fds')[0]);
/* tabs + carousel */
var tabs=$('#tabs')[0],trk=$('#trk')[0],tab=null;
tabs.innerHTML='<i class="tp"></i>'+CATS.map(function(c){return '<button role="tab" data-t="'+c.k+'">'+svg(c.icon)+c.label+'</button>'}).join('');
function show(k){tab=k;$('button',tabs).forEach(function(b){var on=b.dataset.t===k;b.classList.toggle('on',on);b.setAttribute('aria-selected',on)});
trk.innerHTML=DATA[k].map(function(d,i){return k==='projects'?'<article class="cd">'+im(d.img,d.title,i)+'<div class="bd"><h3>'+esc(d.title)+'</h3><p>'+esc(d.desc)+'</p><div class="act"><button class="btn" data-i="'+i+'">Details</button>'+(d.link?'<a class="btn gh" href="'+esc(d.link)+'" target="_blank" rel="noopener">Visit site '+svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>')+'</a>':'')+'</div></div></article>':'<button class="cd c" data-i="'+i+'">'+im(d.img,d.title,i)+'<span class="btn vw">View</span><span class="t">'+esc(d.title)+'</span></button>'}).join('');fix(trk);trk.scrollLeft=0;$('.cd',trk).forEach(function(c,i){c.style.setProperty('--i',i);var dd=DATA[k][i];if(dd&&dd.fit){var g=$('img',c)[0];if(g){g.style.objectFit=dd.fit;if(dd.bg)g.style.background=dd.bg}}});tpl()}
if(CATS.length){show(CATS[0].k)}else{trk.innerHTML='<p class="empty">Nothing here yet.</p>'}
tabs.addEventListener('click',function(e){var b=e.target.closest('button');if(b)show(b.dataset.t)});
$('#prev')[0].addEventListener('click',function(){trk.scrollBy({left:-310,behavior:rm?'auto':'smooth'})});
$('#next')[0].addEventListener('click',function(){trk.scrollBy({left:310,behavior:rm?'auto':'smooth'})});
$('#fds')[0].addEventListener('click',function(e){var b=e.target.closest('.fd');if(!b)return;show(b.dataset.t);document.getElementById('portfolio').scrollIntoView({behavior:rm?'auto':'smooth'})});
/* modal */
var md=$('#md')[0],mp=$('#mp')[0],last=null;
function open(h){delete md.dataset.g;last=document.activeElement;mp.innerHTML='<button class="x" aria-label="Close">×</button>'+h;fix(mp);md.classList.add('open');$('.x',mp)[0].focus()}
function close(){delete md.dataset.g;md.classList.remove('open');if(last)last.focus()}
trk.addEventListener('click',function(e){var b=e.target.closest('[data-i]');if(!b)return;var d=DATA[tab][+b.dataset.i];
if(tab==='projects')open(im(d.img,d.title,+b.dataset.i)+'<div class="tx"><h3>'+esc(d.title)+'</h3><p>'+esc(d.desc)+'</p><ul>'+(d.details||[]).map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>'+(d.link?'<p class="vl"><a class="btn" href="'+esc(d.link)+'" target="_blank" rel="noopener">Visit website</a></p>':'')+'</div>');
else open(im(d.img,d.title,+b.dataset.i)+'<div class="tx"><h3>'+esc(d.title)+'</h3>'+(d.pdf?'<a class="btn" href="'+esc(d.pdf)+'" target="_blank" rel="noopener">Open PDF</a>':'')+'</div>')});
md.addEventListener('click',function(e){if(e.target===md||e.target.closest('.x'))close()});
addEventListener('keydown',function(e){if(e.key==='Escape'&&md.classList.contains('open'))close()});
/* contact */
var ic={m:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',p:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',l:'<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',k:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'};
function rw(i,t,sub,h,ext){return '<a class="lk" href="'+esc(h)+'"'+(ext?' target="_blank" rel="noopener"':'')+'><i>'+svg(i)+'</i><span><b>'+esc(t)+'</b><small>'+esc(sub)+'</small></span>'+(ext?svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'):'')+'</a>'}
$('#rows')[0].innerHTML=rw(ic.m,'Email',DATA.email,'mailto:'+DATA.email)+rw(ic.p,'Phone',DATA.phone,'tel:'+DATA.phoneLink)+'<div class="lk"><i>'+svg(ic.l)+'</i><span><b>Location</b><small>'+esc(DATA.location)+'</small></span></div>'+DATA.links.map(function(l){return rw(ic.k,l.label,l.url.replace(/^https?:\/\//,''),l.url,1)}).join('')+'<div class="cph">'+im('images/contact.jpg','Rejane Quimada',-2)+'</div>';fix($('#rows')[0]);
var fn=$('#fn')[0],fe=$('#fe')[0],fm=$('#fm')[0],snd=$('#send')[0];
function mk(){snd.href='mailto:'+DATA.email+'?subject='+encodeURIComponent('Message from '+(fn.value||'your portfolio'))+'&body='+encodeURIComponent(fm.value+'\n\nFrom: '+fn.value+(fe.value?' ('+fe.value+')':''))}
[fn,fe,fm].forEach(function(x){x.addEventListener('input',mk)});mk();
/* nav + scroll scenes */
var nav=$('#nav')[0],pill=$('#pill')[0],mas=$('#mascot')[0],eyes=$('#eyes')[0],links=$('#nav a'),cur=null,tick=false;
var wel=$('#wel')[0],wText=$('#wText')[0],wArt=$('#wArt')[0],wDark=$('#wDark')[0],ptr=$('#ptr')[0],pText=$('#pText')[0],pWipe=$('#pWipe')[0],about=$('#about')[0],contact=$('#contact')[0],cls=$('.cl'),wLn=$('#wText .ln>span'),wi=$('#wImg')[0];wi.addEventListener('load',function(){wi.hidden=false;wArt.style.display='none'});
function place(a){var l=a.offsetLeft,w=a.offsetWidth;pill.style.width=w+'px';pill.style.transform='translateX('+l+'px)';mas.style.transform='translateX('+(l+w/2-13)+'px)'}
function setActive(s){if(s===cur)return;cur=s;links.forEach(function(a){var on=a.getAttribute('data-s')===s;a.classList.toggle('act',on);if(on)place(a)})}
function update(){var vh=innerHeight;
var wr=wel.getBoundingClientRect(),p=cl(-wr.top/Math.max(1,wr.height-vh));
var tr=ptr.getBoundingClientRect(),span=Math.max(1,tr.height-vh),q=cl(-tr.top/span);
if(!rm){var ex=cl((p-.74)/.2);wText.style.transform='translate(-50%,calc(-50% - '+(ex*40)+'px)) scale('+(1+ex*.08)+')';wText.style.opacity=1-ex;wLn.forEach(function(l,i){var t=cl((p-.16-i*.09)/.16);t=1-Math.pow(1-t,3);l.style.transform='translateY('+((1-t)*105)+'%)'});var sc='scale('+(1+p*.1)+')';wArt.style.transform=sc;wi.style.transform=sc;var dd=1-cl(p/.4);cls.forEach(function(c){c.style.strokeDashoffset=dd});wDark.style.opacity=cl((p-.72)/.26);
var e0=cl(q/.4);e0=1-Math.pow(1-e0,3);pText.style.transform='translate(-50%,calc(-50% + '+((1-e0)*30)+'vh)) rotate('+(-q*7)+'deg) scale('+((.55+.45*e0)*(1+Math.pow(cl((q-.4)/.6),2)*5.5))+')';var a=100-cl((q-.4)/.45)*125;pWipe.style.clipPath='polygon('+a+'% 0,100% 0,100% 100%,'+(a+14)+'% 100%)'}
nav.classList.toggle('on-light',rm?tr.bottom<0:tr.top<=-span*.62);
var s='home';if(about.getBoundingClientRect().top<vh*.45)s='about';if(tr.top<vh*.45)s='portfolio';if(contact.getBoundingClientRect().top<vh*.6)s='contact';setActive(s);tlUpdate();gUpdate()}
function req(){if(!tick){tick=true;requestAnimationFrame(function(){tick=false;update()})}}
addEventListener('scroll',req,{passive:true});
addEventListener('resize',function(){var c=cur;cur=null;setActive(c||'home');req();$('.tlbox').forEach(focus)});
if(!rm)addEventListener('pointermove',function(e){var r=mas.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.max(1,Math.hypot(dx,dy));eyes.style.transform='translate('+(dx/d*2.5)+'px,'+(dy/d*2)+'px)'},{passive:true});
var SI={web:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',code:'<path d="m4 17 6-6-6-6M12 19h8"/>',db:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',tool:'<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-2.4-.6-.6-2.4z"/>'};
var flat=[];DATA.skills.forEach(function(g){g.items.forEach(function(x){flat.push(x)})});
var mc=flat.map(function(x){return '<span class="mc">'+esc(x)+'</span>'}).join('');$('#mqt')[0].innerHTML=mc+mc+mc+mc;
$('#sg')[0].innerHTML=DATA.skills.map(function(g){return '<div class="sk"><i class="si">'+svg(SI[g.icon]||SI.code)+'</i><h3>'+esc(g.group)+'</h3><div class="chips">'+g.items.map(function(x){return '<span>'+esc(x)+'</span>'}).join('')+'</div></div>'}).join('');
function tlUpdate(){var mid=innerHeight*.55;$('.tl').forEach(function(t){var its=$('.it',t);if(!its.length)return;var best=null,bd=1e9;its.forEach(function(it){var r=it.getBoundingClientRect(),d=Math.abs(r.top+r.height/2-mid);if(d<bd){bd=d;best=it}});its.forEach(function(it){var r=it.getBoundingClientRect();it.classList.toggle('on',it===best);it.classList.toggle('done',it!==best&&r.top+r.height/2<mid)});var tr=t.getBoundingClientRect(),fl=$('.fl',t)[0];if(fl)fl.style.height=Math.max(0,Math.min(tr.height-36,mid-tr.top-18))+'px'})}
function tpl(){var b=$('button.on',tabs)[0],p=$('.tp',tabs)[0];if(b&&p){p.style.width=b.offsetWidth+'px';p.style.transform='translateX('+b.offsetLeft+'px)'}}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;t.classList.add('vis');io.unobserve(t);if(t.classList.contains('rvl'))setTimeout(function(){t.classList.remove('rvl','vis');t.style.removeProperty('--d')},1400)})},{threshold:.12,rootMargin:'0px 0px -5% 0px'});
function rv(list,c){list.forEach(function(el,i){if(c){el.classList.add('rvl');el.style.setProperty('--d',(i%4)*90+'ms')}if(rm){el.classList.add('vis')}else io.observe(el)})}
rv($('.it'),0);rv($('.sh2,.ssub,.mq'),1);rv($('.sk'),1);rv($('.fd'),1);rv($('.port .big,.tabs,.car'),1);rv($('.contact .big,.cc,.ghead'),1);
addEventListener('resize',tpl);addEventListener('load',tpl);(document.fonts&&document.fonts.ready||Promise.resolve()).then(tpl);
/* gallery: layout adapts to however many photos are listed in data.js (up to 12) */
var gal=$('#gal')[0],gsec=$('#gallery')[0],lastY=scrollY,bt,rt,lt,GI=(DATA.gallery||[]).slice(0,12),gi=0;
var rnd=function(i,k){var x=Math.sin((i+1)*12.9898+k*78.233)*43758.5453;return x-Math.floor(x)};
gal.innerHTML=GI.map(function(g,i){var a=g.alt||'Photo '+(i+1);return '<button class="gc" data-i="'+i+'" aria-label="'+esc(a)+'"><span class="gi"><img data-k="'+i+'" data-a="'+esc(a)+'" src="'+esc(g.img)+'" alt="'+esc(a)+'" decoding="async"></span></button>'}).join('');fix(gal);
if(!GI.length)gsec.hidden=true;
var gcs=$('.gc',gal);
function gLayout(){var W=gsec.clientWidth,cols=W>1000?4:W>640?3:2,pad=Math.max(12,W*.04),cw=(W-pad*2)/cols,y=[],mx=0;
for(var c=0;c<cols;c++)y.push(20+(c%2?70:0));
gcs.forEach(function(el,i){var ar=+el.dataset.ar||(i%3===1?1.33:.8),w=Math.min(cw*(.8+rnd(i,1)*.14),280),h=w/ar,c=0;
for(var k=1;k<cols;k++)if(y[k]<y[c])c=k;
var x=pad+c*cw+(cw-w)/2+(rnd(i,2)-.5)*cw*.12,yy=y[c]+(rnd(i,3)-.5)*20;
y[c]=yy+h+44+rnd(i,4)*30;mx=Math.max(mx,yy+h);
el.style.left=x+'px';el.style.top=yy+'px';el.style.width=w+'px';el.style.height=h+'px';
var r=((rnd(i,5)-.5)*14).toFixed(1);el.dataset.r=r;el.style.setProperty('--r',r+'deg');el.dataset.sp=((rnd(i,6)-.35)*.26).toFixed(3)});
gal.style.height=(mx+90)+'px'}
function gSoon(){clearTimeout(lt);lt=setTimeout(function(){gLayout();gUpdate()},60)}
gcs.forEach(function(el){var im2=$('img',el)[0],ok=function(){if(im2.src.indexOf('data:image/svg')===0||!im2.naturalWidth)return;el.dataset.ar=Math.max(.66,Math.min(1.6,im2.naturalWidth/im2.naturalHeight));gSoon()};im2.addEventListener('load',ok);if(im2.complete)ok()});
gLayout();addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){gLayout();gUpdate()},120)});
function gShow(i){gi=(i+GI.length)%GI.length;var g=GI[gi],a=g.alt||'Photo '+(gi+1);mp.innerHTML='<button class="x" aria-label="Close">×</button>'+(GI.length>1?'<button class="nv p" aria-label="Previous photo">‹</button><button class="nv n" aria-label="Next photo">›</button>':'')+im(g.img,a,gi)+(g.alt?'<div class="tx"><h3>'+esc(g.alt)+'</h3></div>':'');fix(mp)}
gal.addEventListener('click',function(e){var b=e.target.closest('.gc');if(!b)return;last=document.activeElement;gShow(+b.dataset.i);md.dataset.g='1';md.classList.add('open');$('.x',mp)[0].focus()});
md.addEventListener('click',function(e){var n=e.target.closest('.nv');if(n&&md.dataset.g)gShow(gi+(n.classList.contains('n')?1:-1))});
addEventListener('keydown',function(e){if(md.classList.contains('open')&&md.dataset.g){if(e.key==='ArrowRight')gShow(gi+1);if(e.key==='ArrowLeft')gShow(gi-1)}});
function gUpdate(){var vh=innerHeight,r=gsec.getBoundingClientRect(),v=scrollY-lastY;lastY=scrollY;if(rm||r.bottom<-200||r.top>vh+200)return;var d=r.top+r.height/2-vh/2;gcs.forEach(function(c){c.style.transform='translate3d(0,'+(d*(+c.dataset.sp||0))+'px,0) rotate('+((+c.dataset.r||0)+d*.003)+'deg)'});gsec.style.setProperty('--bl',Math.min(4,Math.abs(v)*.06)+'px');clearTimeout(bt);bt=setTimeout(function(){gsec.style.setProperty('--bl','0px')},120)}
if(matchMedia('(hover:none)').matches){var fio=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('open',e.isIntersecting)})},{rootMargin:'-36% 0px -36% 0px'});$('.fd').forEach(function(f){fio.observe(f)})}
tpl();update();
(document.fonts&&document.fonts.ready||Promise.resolve()).then(function(){var c=cur;cur=null;setActive(c||'home')});
})();
