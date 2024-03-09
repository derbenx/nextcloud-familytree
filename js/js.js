/*
 TO DO

 bar doesn't work chrome
 canvas doesn't resize with screen

 NextCloud
  figure out min width?
 
 GED Delete issue
  gedcom555.GED
  recursive deleting? find other id lines matching ID
 
 zoom
  half boxes, 3 lines txt?
  or actual scale zoom?

 Sort GED files
  -any better?
  
 export GED files? - https://www.gedcom.org/validators.html

*/

//Global Variables ***
ver="1.3.5"; //VERSION
document.getElementById('ver').innerHTML="Ver "+ver;

//define json structure
const newdata='{ "pan":[ { "x":0,"y":0 } ], "tree":"My Family", "select":0, "people":[ ], "lines":[ ] }';

const dbg=0;
const box={w:160,h:100};
const ac=document.getElementById('app-content');
const imp = document.getElementById('imp');
const inp = document.getElementById('inp');
//const exp = document.getElementById('exp');
const lng = document.getElementById('lang');
const cent = document.getElementById('cent');
const aPer = document.getElementById('addPer');
const uPer = document.getElementById('updPer');
const dPer = document.getElementById('delPer');
const so = document.getElementById('sos');
const mu = document.getElementById('t22');
const fu = document.getElementById('fu');
const hd = document.getElementById('sh');
const bg = document.getElementById('bg');
const ln = document.getElementById('ln');
const hp = document.getElementById('hp');
const st = document.getElementById('st');
const lt = document.getElementById('lt');
const hr = document.getElementById('hr');
const tr = document.getElementById('t');
const gn = document.getElementById('g');
const fn = document.getElementById('f');
const sx = document.getElementById('s');
const br = document.getElementById('b');
const oi = document.getElementById('o');
const dt = document.getElementById('d');
const rl = document.getElementById('r');
const can=document.getElementById('can');
const ctx = can.getContext("2d");
const offs=ac.getBoundingClientRect().top;
//console.log('offset',offs);
var data=newdata;
var fobur="blur";
var bdrg=0; //bar drag
var tim; //pan timer
var row=[0,1]; //row lengths GED import
var ged=[]; // GED tree sort data
var ckged=[]; //GED check again/last
var sex=['pink','cyan','#552255','grey'];
var aw=window.innerWidth;
var ah=window.innerHeight;
var hsChld=[]; //delete helper
var fs=1,hole,json,drag=0,selc=[-1],rstim; //scrn resize timer;
var p={x:10,y:15}; //drag pan previous
var k={x:0,y:0}; //key pan plus drag
//bar length
hr.style.width=ac.getBoundingClientRect().width+'px';
inp.style.height=inp.getBoundingClientRect().height+'px'; //set height
hd.style.top=parseInt(inp.style.height)+20+'px';
bg.selectedIndex=0;
ln.style.height='200px';
hp.style.height='200px';
document.getElementById('addPer').disabled=false;
document.getElementById('updPer').disabled=true;
document.getElementById('delPer').disabled=true;


//setup translate
for (a in lng.lines) { ln.options.remove(0); } //clear
for(let i=0;i<tran.length;i++){
 var op = document.createElement("option");
 op.text = tran[i][0];
 op.value=i;
 lng.add(op);
}


//Functions ***
function draw(cl=0){
 //draw data from JSON
 if (cl==1){ ctx.clearRect(0, 0, can.width, can.height); }

 var aw=window.innerWidth+box.w,ah=window.innerHeight+box.h;
 lx=-box.w;ly=-box.h; //lower draw limit ^^ upper draw limit
 var yyy=parseInt(can.style.top); //can offset

 //lines
 for(let i=0;i<json.lines.length;i++){
  var o=json.lines[i].id.split('-');
  //console.log(o, o[0],o[1]);
  //if (o[0]!="" && o[1]!=""){
   var sx=json.people[o[0]].x+json.pan[0].x+(json.people[o[0]].w)/2;
   var sy=-yyy+json.people[o[0]].y+json.pan[0].y+(json.people[o[0]].h)/2;
   var ex=json.people[o[1]].x+json.pan[0].x+(json.people[o[1]].w)/2;
   var ey=-yyy+json.people[o[1]].y+json.pan[0].y+(json.people[o[1]].h)/2;
   //if (i==2) { console.log(sx,sy,ex,ey) }
   if (sx>lx && sy>ly && ex>lx && ey>ly && sx<aw && sy<ah && ex<aw && ey<ah){
    if (json.lines[i].rl==0 && bg.selectedIndex==1){
     tmp='black';
    } else {
     //tmp=rel[json.lines[i].rl]
     tmp=tran[0][26+json.lines[i].rl]; //don't translate colours here
    }
    ctx.strokeStyle=tmp;
    //console.log(json.lines[i].rl);
    ctx.beginPath();
    ctx.lineWidth="3";
    ctx.moveTo(sx, sy); ctx.lineTo(ex,ey);
    ctx.stroke();
   }
  //}
 }

 //People
 //console.log(json.people.length);
 for(let i=0;i<json.people.length;i++){
 //console.log(json.people[i].gn);
 
//check if outside canvas, skip

 //check if null
  if (json.people[i]!=null){
   
   sx=json.people[i].x+json.pan[0].x;
   sy=-yyy+json.people[i].y+json.pan[0].y;
   ex=sx+json.people[i].w; //just needed for check
   ey=-yyy+sy+json.people[i].h; //just needed for check
   
   if (sx>lx && sy>ly && ex>lx && ey>ly && sx<aw && sy<ah && ex<aw && ey<ah){
    ctx.fillStyle=sex[json.people[i].sx];
    ctx.beginPath();
    ctx.rect(sx,sy,json.people[i].w,json.people[i].h);
    ctx.fill();
   //console.log(selc,selc.includes(i.toString()));
    if (selc[0]>-1 && selc.includes(i)) {
     ctx.strokeStyle="orange";
     ctx.lineWidth = 8;
     ctx.stroke();
    }
    font=16; mc=16;
    ctx.fillStyle="#000";
    ctx.font = font+"px monospace";
    ctx.fillText('id:'+json.people[i].id, sx+10, sy+(font));
    tmp=json.people[i].gn.substr(0,mc);
    ctx.fillText(tmp, sx+10,sy+(font*2));
    tmp=json.people[i].fn.substr(0,mc);
    ctx.fillText(tmp, sx+10,sy+(font*3));
    if (json.people[i].br){
     tmp=json.people[i].br.substr(0,mc-4);
     ctx.fillText('Br: '+tmp, sx+10,sy+(font*4));
    }
    if (json.people[i].dt){
     tmp=json.people[i].dt.substr(0,mc-4);
     ctx.fillText('Dt: '+tmp, sx+10,sy+(font*5));
    }
   }
  }
 }
}

function pan(xx,yy,cl=1,ab=0){
 if (cl==1){ ctx.clearRect(0, 0, can.width, can.height); }
 //console.log(xx,xx.currentTarget.cen);
 // console.log(typeof xx);
 if (typeof xx != 'number') { //zero
  json.pan[0].x=0;
  json.pan[0].y=0;
 } else if (ab==1) { // move to exact
  json.pan[0].x=xx;
  json.pan[0].y=yy;
 } else { // increment pan
  json.pan[0].x=json.pan[0].x+xx;
  json.pan[0].y=json.pan[0].y+yy;
 }
 //console.log(json.pan[0].x,json.pan[0].y);
 draw();
}
//max=1;min=-1;setInterval( function(){pan(Math.random() * (max - min) + min,Math.random() * (max - min) + min)},100); //pan test

function clku(evn){
 drag=0;
 hp.value='';
 //console.log('up',evn);
}

function clkd(evn){
 drag=1;
 hp.value='';
 rl.selectedIndex=0;
 p.x=evn.clientX;
 p.y=evn.clientY;
 tmp=chk(p.x,p.y);
 //console.log(json.people[tmp]);
 if (tmp!=-1 && mu.classList[0]) { //multiple select mode
  if (selc.includes(tmp)) {
   selc = selc.filter(item => ![tmp].includes(item));
  }  else { selc.push(tmp); }
  //console.log('selc',selc);
  drag=0; draw(1); return;
 }
 if (!mu.classList[0]) { //normal mode
  selc=[tmp];
  if (selc[0]<1 || hsChld[selc[0]] && hsChld[selc[0]].length>0) {
   //only enable if no sublinks
   document.getElementById('delPer').disabled=true;
  } else {
   document.getElementById('delPer').disabled=false;
  }
 //console.log(selc,json.people.length);
 if (json.people.length==0 || selc[0]>-1){
  document.getElementById('addPer').disabled=false;
 } else {
  document.getElementById('addPer').disabled=true;
 }
 if (selc[0]>-1){
  document.getElementById('updPer').disabled=false;
  gn.value=json.people[selc[0]].gn;
  fn.value=json.people[selc[0]].fn;
  sx.selectedIndex=json.people[selc[0]].sx;
  br.value=json.people[selc[0]].br;
  dt.value=json.people[selc[0]].dt;
  oi.value=json.people[selc[0]].oi || "";
  tr.value=json.tree;
 } else {
  //document.getElementById('delPer').disabled=true;
  document.getElementById('updPer').disabled=true;
 }
 }
 draw(1);
 //console.log('down',evn);
}

function movr(evn){
 if (drag) {
  //console.log('drag',evn,selc);
  //console.log('drag',evn.clientX,evn.clientY);
  if (selc[0]==-1) { //pan canvas
   pan(evn.clientX-p.x,evn.clientY-p.y);
  } else if (json.people[selc[0]]!=null) { //or move person
   //console.log(evn.clientX,evn.clientY);
   var bo=50,px=0,py=0;
   if (evn.clientX<bo) { px=2 }
   if (evn.clientX>aw-bo ) { px=-2 }
   if (evn.clientY<bo) { py=2 }
   if (evn.clientY>ah-bo ) { py=-2 }
   if (px || py) { pan(px,py); } //border panning
   //xy=[Math.round((evn.clientX-p.x)/ro)*ro,Math.round((evn.clientY-p.y)/ro)*ro];
   //console.log(json.pan[0].x,json.pan[0].y);
   for (var i=0;i<selc.length;i++){
    json.people[selc[i]].x+=evn.clientX-p.x-px-k.x;
    json.people[selc[i]].y+=evn.clientY-p.y-py-k.y;
   }
   k.x=0;k.y=0; //Clear key pan
   draw(1);
  }
  
  p.x=evn.clientX;
  p.y=evn.clientY;
 } //else {
  //hover if over person, highlight rectangle
  //if (selc[0]!=-1) {
   //draw();
  //}
 //}
}

function chk(xx,yy){
 //check if person at xx,yy
 //upgrade to return array to move many overlapping?
 //console.log('coor',xx,yy);
 var out=-1;
 for(let i=json.people.length;i>=0;i--){
  if (json.people[i]!=null){
   var tx=json.people[i].x+json.pan[0].x;
   var ty=json.people[i].y+json.pan[0].y;
   var tw=tx+json.people[i].w;
   var th=ty+json.people[i].h;
   //console.log('xywh',tx,ty,tw,th);
   if (xx>tx && xx<tw && yy>ty && yy<th) {
    out=i;
    break; //only pick topmost
   }
  }
 }
 //console.log(out);
 return out;
}

function scale(){
 //change/set w/h as screen changes
 aw=window.innerWidth;ah=window.innerHeight;
 //console.log('sc',aw,ah);
 hr.style.width=ac.getBoundingClientRect().width+'px';
 can.width=aw;can.height=ah;
 draw();
}

function hide(){
 //toggle data input menu
 if (inp.style.display=='none'){
  inp.style.display='block';
  console.log(inp.style.height);
  hr.style.top=parseInt(inp.style.height)+'px';
  hd.style.top=parseInt(inp.style.height)+10+'px';
  document.getElementById('sh').innerHTML=tran[lng.selectedIndex][45]; //'Hide';
 } else {
  inp.style.display='none';
  hr.style.top=0+'px';
  hd.style.top=10+'px';
  document.getElementById('sh').innerHTML=tran[lng.selectedIndex][46]; //'Show';
 }
}

function poplst(cl=0){
 //clear
 for (a in json.lines) { ln.options.remove(0); } 
 if (cl==1) { return; }
 //populate list
 for(let i=0;i<json.lines.length;i++){
  var op = document.createElement("option");
  //var tmp = json.lines[i].id+'='+rel[json.lines[i].rl]+'='+json.lines[i].rl;
  var tmp=json.lines[i].id.split('-');
  a1= Number.isInteger(tmp[0]*1) ? tmp[0] : fpi(tmp[0]) ;
  a2= Number.isInteger(tmp[1]*1) ? tmp[1] : fpi(tmp[1]) ;
  if (json.lines[i].id != a1+'-'+a2) {
   json.lines[i].id = a1+'-'+a2;
  }
  var tmp = a1+'-'+a2+'='+tran[lng.selectedIndex][26+json.lines[i].rl];
  op.text = tmp;
  //console.log(tmp,json.lines[i].rl);
  op.value=json.lines[i].rl;
  ln.add(op);
 }
 return;
}
function addPer(){
 //console.log(selc,selc.length,json.people.length);
 if (selc.length<1) { return; }
 var a=selc[0];
 document.getElementById('delPer').disabled=true;
 //console.log(a,json.people.length);
 if (json.people.length>0 && a==-1){
  alert(tran[lng.selectedIndex][49]); return;
 }
 if (json.people.length==0) {
  selc = [0];
  document.getElementById('updPer').disabled=false;
 }
 
 var x,y;
 var b=hole.length>0 ? hole[0] : json.people.length;
 //console.log(a);
 if (a!=-1) {
  var ofx=Math.round(Math.random()*(box.w*2))-box.w;
  var ofy=box.h+10+Math.round(Math.random()*40);
  ofy=Math.round(Math.random()) ? ofy : -ofy;
  x=json.people[a].x+ofx;
  y=json.people[a].y+ofy;
 } else {
  x=400;y=400; 
 }
 var tmp={"id":b,"x":x,"y":y,"w":box.w,"h":box.h,"gn":gn.value,"fn":fn.value,"sx":sx.selectedIndex,"br":br.value,"dt":dt.value,"oi":oi.value};
 if (hole.length>0){
  //check for hole
  //console.log(hole);
  json.people[hole[0]]=tmp;
  hole.shift();
 } else {
  //add to end
  json.people.push(tmp);
 }
 
 if (a!=-1) {
  json.lines.push({"id":a+"-"+b,"rl":rl.selectedIndex});
 }
 //hsChld[a].push(b);
 bldHsCh();
 poplst();
 draw(1);
}
function updPer(){
 //console.log(selc);
 if (selc[0]!=-1) {
 json.people[selc[0]].gn=gn.value;
 json.people[selc[0]].fn=fn.value;
 json.people[selc[0]].br=br.value;
 json.people[selc[0]].dt=dt.value;
 json.people[selc[0]].oi=oi.value;
 json.people[selc[0]].sx=sx.selectedIndex;
 //console.log();
 draw(1);
 }
}
function delPer(){
 //console.log(selc,hsChld[selc]);
 if (selc[0]==0 || hsChld[selc[0]] && hsChld[selc[0]].length>0) {
  alert(tran[lng.selectedIndex][50]);
  return;    
 } else {
  //delete
   console.log(json.people[selc[0]],hsChld[selc[0]]);
   json.people[selc[0]]=null;
   //mark as hole for reuse;
   hole.push(selc[0]);
 }
 for (a in json.lines) { ln.options.remove(0); } //clear
 
 for(let i=0;i<json.lines.length;i++){
  var o=json.lines[i].id.split('-');
  //console.log(o[1],json.people[o[1]]);
  if (json.people[o[1]]==null) {
   //delete line
   json.lines.splice(i,1);
   break;
   //console.log(json.lines);
  }
 }
 //console.log(selc[0]);
 document.getElementById('addPer').disabled=true;
 document.getElementById('updPer').disabled=true;
 document.getElementById('delPer').disabled=true;
 bldHsCh();
 poplst();
 draw(1);
}

function bldHsCh(){  //rebuild hasChild
 hsChld=[];
 for(let i=0;i<json.lines.length;i++){
  var o=json.lines[i].id.split('-');
  //console.log(o[0],o[1]);
  //build del list
  if (hsChld[o[0]]==undefined){
   hsChld[o[0]]=[];
  }
  hsChld[o[0]].push(o[1]);
 }
}

function start(){
 document.getElementById('addPer').disabled=false;
 json = JSON.parse(data);
 tr.value=json.tree;//tree name
 hole=[];
 for(let i=0;i<json.people.length;i++){
  if (json.people[i]==null){
   hole.push(i);
  }
 }
 //console.log(hole);
 scale(); //scale screen
 bldHsCh(); //build has childern
 poplst(); //populate listbox
}

function updln(){
 //update lines relation from selection box
 if (selc.length!=2) { return; }
 //console.log(selc);
 json.lines[ln.selectedIndex].rl=rl.selectedIndex;
 selc=[-1];
 poplst();
 draw(1);
 document.getElementById('addPer').disabled=true;
 document.getElementById('updPer').disabled=true;
 document.getElementById('delPer').disabled=true;
}

function mselc(e){ //ID pairs click
 //console.log(e.type);
 if (ln.length<1 || ln.selectedIndex==-1) { return }
 rl.selectedIndex=ln.value;
 var tmp=ln.options[ln.selectedIndex].label;
 tmp=tmp.split('=');
 tmp=tmp[0].split('-');
 selc=[ tmp[0]*1,tmp[1]*1 ]; //make selection
 pp= e.type!="dblclick" ? 0 : 1 ;
 if (tim!=undefined && tim[0]) {
  for (ii=0;ii<=pz;ii++) {
   clearTimeout(tim[ii]);
   tim[ii]=0;
  }
 }
 pz=25;tim = new Array(pz).fill(0);
 tx=(aw/2)-json.people[tmp[pp]].x;
 ty=(ah/2)-json.people[tmp[pp]].y+60;
 px = json.pan[0].x>tx ? -(json.pan[0].x-tx)/pz : (tx-json.pan[0].x)/pz;
 py = json.pan[0].y>ty ? -(json.pan[0].y-ty)/pz : (ty-json.pan[0].y)/pz;
 py = isNaN(py) ? 0 : py;
 px = isNaN(px) ? 0 : px;
 tx = isNaN(tx) ? 0 : tx;
 ty = isNaN(ty) ? 0 : ty;
 //console.log('st',json.pan[0].x,json.pan[0].y)
 for (i=0;i<=pz;i++) {
  //console.log(json.pan[0].x+px,json.pan[0].x+py)
  if (i==pz) {
   tim[i]=setTimeout( function(){ 
    for (ii=0;ii<pz;ii++) {
     tim[ii]=0;
    }
   },i*25);
  } else {
   tim[i]=setTimeout( function(){
    pan(px,py,1,0);
   },i*30);
  }
 }
 //console.log('en',tx,ty)
 //console.log(selc,pos);
 n1=json.people[tmp[0]].gn+" "+json.people[tmp[0]].fn;
 if (n1==" "){ n1="id:"+json.people[tmp[0]].id; }
 n2=json.people[tmp[1]].gn+" "+json.people[tmp[1]].fn;
 if (n2==" "){ n2="id:"+json.people[tmp[1]].id; }
 //console.log(rl.value,tran[lng.selectedIndex][14+rl.value]);
 if (rl.value=="0") {
  tmp=tran[lng.selectedIndex][47]+" > "; //undecided
 } else {
  tmp=tran[lng.selectedIndex][14+parseInt(rl.value)];
 }
 hp.value=tran[lng.selectedIndex][33]+n1+tran[lng.selectedIndex][34]+n2+" = < "+tmp+tran[lng.selectedIndex][35]
 draw(1);
}

function load(e){
 //get file
 //console.log('load')
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
   data = e.target.result;
   start();
  };
  reader.readAsText(file);
}

function openFD(a,c) {
 var inpt = document.createElement("input");
 inpt.type = "file";
 inpt.accept = a;
 inpt.addEventListener("change", c);
 inpt.click(); //inp.dispatchEvent(new MouseEvent("click"));
}

function newt(sk=0) {
 if (sk==1 || prompt(tran[lng.selectedIndex][48]+"\n yes ")=='yes') {
  document.getElementById('updPer').disabled=true;
  document.getElementById('delPer').disabled=true;
  poplst(1);
  selc=[-1];
  data=newdata;
  start();
 }
}

function save() {
 if (json.people.length==0) { return; }
 if (tr.value=='') {
  alert(tran[lng.selectedIndex][51]);
  return;
 }
 saved= JSON.stringify(json);
 var name=tr.value.replace(" ","_")+".json";
 var a = document.createElement('a');
 var file = new Blob([saved], {type: 'text/plain'});
 a.href = URL.createObjectURL(file);
 a.download = name;
 a.click();
}
function chbg() {
 //console.log(bg);
 if (bg.selectedIndex==0) { bc='black'; }
 if (bg.selectedIndex==1) { bc='white'; }
 console.log(bc,ac);
 ac.style.background=bc;
 draw();
}
function lang(){
 //console.log('lang',lng.selectedIndex);
 for(let i=1;i<=26;i++){
  var tmp=tran[lng.selectedIndex][i];
  if (tmp.substr(-2,1)==">") {
   tmp+=tran[lng.selectedIndex][i+12];
  }
  //console.log(i,tmp.substr(-2,1));
  document.getElementById("t"+i).innerHTML=tmp;
 }
 var i=36;
 aPer.innerHTML=tran[lng.selectedIndex][i++];
 uPer.innerHTML=tran[lng.selectedIndex][i++];
 dPer.innerHTML=tran[lng.selectedIndex][i++];
 //detect full screen apply right translation
 fu.innerHTML=tran[lng.selectedIndex][fs+i++];
 //console.log("fs",fs,tran[lng.selectedIndex][fs+i++]);
 i++; //skip Normal
 nt.innerHTML=tran[lng.selectedIndex][i++];
 st.innerHTML=tran[lng.selectedIndex][i++];
 lt.innerHTML=tran[lng.selectedIndex][i++];
 cent.innerHTML=tran[lng.selectedIndex][i++];
 hd.innerHTML=tran[lng.selectedIndex][i++];
 imp.innerHTML=tran[lng.selectedIndex][52];
 so.innerHTML=tran[lng.selectedIndex][64];
 poplst();
}
function fullscreen(){
 //console.log('fullscreen');
 if (fs==0){
  fs=1;
  //document.getElementById('fu').innerHTML='Normal';
    var elm=document.getElementById("app-content");
  elm.requestFullscreen();
 } else {
  fs=0;
  //document.getElementById('fu').innerHTML='Fullscreen';
  if (document.fullscreenElement?.nodeName!=undefined){
   document.exitFullscreen();
  }
 }
 fu.innerHTML=tran[lng.selectedIndex][39+fs];
 setTimeout(() => {
  var inx=inp.getBoundingClientRect();
  var tmp=inx.top + window.scrollY;
  //console.log(tmp,inp.top, window.scrollY);
  can.style.top=tmp+"px";
  ac.style.height=(window.innerHeight-tmp-10)+'px';
  //console.log('rs',tmp, ac.style.height);
  draw(1);
 }, "500");
}

function uptrn() { //update tree name in json
 json.tree=tr.value;
 return;
}

function impged(e) {
 //alert(tran[lng.selectedIndex][53]);
 newt(1); ged={};
 var file = e.target.files[0];
 if (!file) { return; }
 var reader = new FileReader();
 reader.onload = function(e) {
  oi.value='';
  gn.value='';
  fn.value='';
  br.value='';
  dt.value='';
  //console.log(e.target.result);
  var blk=-1, skp=0, prev='', fam, xx=-1, yy=0,rawname,nf,ch;
  var rtmp=e.target.result.split("\n");
  //console.log(rtmp.length);
  //tmp.forEach(function(l,i){
  for (const [i, val] of rtmp.entries()) {
   if (i>4000000) { oi.value='Error, lines > '+(i-1); break; }
    //console.log(i,l);
    l=val.trim();
    var ll=l.split(" ");
    if (ll[0]=='0' && ll[2]=='INDI') {
     if (blk>=0 && rawname && json.people[blk].gn=='') {
      tmp=rawname.split("/");
      //console.log(tmp);
      json.people[blk].gn=tmp[0]==undefined ? "" : tmp[0];
     }
     if (blk>=0 && rawname && json.people[blk].fn=='') {
      tmp=rawname.split("/");
      //console.log(tmp);
      json.people[blk].fn=tmp[1]==undefined ? "" : tmp[1];
     }
     blk++; skp=0; xx++;
     if (xx>7) { xx=0;yy--; }
     var tmp={"id":blk,"x":false,"y":false,"w":box.w,"h":box.h,"gn":'',"fn":'',"sx":sx.selectedIndex,"br":'',"dt":'',"oi":'',"indi":l.split("@")[1],famc:'',fams:'',lvl:false};
     json.people.push(tmp);
     rawname='';
    }
    if (blk==-1 && l.includes('_TREE')) {
     tr.value=l.replace(/\w+.\w+./,"");
     uptrn();
    }
    //GED family list
    if (ll[0]=='0' && ll[2]=='FAM') {
     //console.log(ged[nf]);
     nf=l.split("@")[1]; //new family
     ged[nf]= {}; ch=0;wf=0;hb=0;
     skp=1; fam={h:-1,w:-1,c:-1};
    }
    if (skp==1 && blk>=0) {
     //setup lines
     if (l.includes('HUSB')) {
      //ged.push(l);
      tmp=l.split("@")[1];
      //console.log(nf,tmp);
      ged[nf]['h'+hb]=tmp;
      fam.h=fpi(tmp);
      hb++;
      //console.log(fam.h,fam.w);
      if (fam.w>-1) {
       json.lines.push({"id":fam.w+"-"+fam.h,"rl":1});
      }
     }
     if (l.includes('WIFE')) {
      //ged.push(l);
      tmp=l.split("@")[1];
      //console.log(nf,tmp);
      ged[nf]['w'+wf]=tmp;
      fam.w=fpi(tmp);
      wf++;
      //console.log(fam.h,fam.w);
      if (fam.h>-1) {
       json.lines.push({"id":fam.w+"-"+fam.h,"rl":1});
      }
     }
     if (l.includes('CHIL')) {
      //ged.push(l);
      tmp=l.split("@")[1];
      //console.log(nf,tmp);
      ged[nf]['c'+ch]=tmp;
      fam.c=fpi(tmp);
      ch++;
      //fam.c=fpi(l.split("@")[1]);
      var a= fam.w==-1 ? fam.h : fam.w;
      //console.log(a, fam);
      if (a>-1) {
       json.lines.push({"id":a+"-"+fam.c,"rl":2});
      } else {
       //broken lines
       //console.log(a, fam);
      }
     }
     //console.log(fam);
    }
    if (skp==0 && blk>=0) {
     //setup people
     //console.log(i,l);
     if (l.includes('NOTE')) {
      prev='n';
      json.people[blk].oi=json.people[blk].oi.trim()+"\n"+tran[lng.selectedIndex][61]+l.replace(/\w+.\w+./,"");
     }
     if (l.includes('ADOP')) { prev='a'; json.people[blk].oi=json.people[blk].oi.trim()+"\n"+tran[lng.selectedIndex][62]; }
     if (l.includes('TITL')) { json.people[blk].oi=json.people[blk].oi.trim()+"\n"+tran[lng.selectedIndex][63]+l.replace(/\w+.\w+./,""); }
     if (l.includes('CHR')) { prev='c'; }
     if (l.includes('CREM')) { prev='t'; }
     if (l.includes('BAPM')) { prev='r'; }
     if (l.includes('BURI')) { prev='g'; }
     if (l.includes('DEAT')) { prev='d'; }
     if (l.includes('BIRT')) { prev='b'; }
     if (l.includes('DATE') && prev!='') {
      if (prev=='b') {
       json.people[blk].br=l.replace(/\w+.\w+./,"").trim();
      }
      if (prev=='d') {
       json.people[blk].dt=l.replace(/\w+.\w+./,"").trim();
      }
     }
     if (prev && (l.includes('PLAC') || l.includes('CONT') || l.includes('DATE'))) {
      var xp='';
      if (l.replace(/\w+.\w+./,"").trim()!='') {
       if (prev=='n') { xp="\n"+tran[lng.selectedIndex][61]; }
       if (prev=='c') { xp="\n"+tran[lng.selectedIndex][55]; }
       if (prev=='t') { xp="\n"+tran[lng.selectedIndex][56]; }
       if (prev=='a') { xp="\n"+tran[lng.selectedIndex][54]; }
       if (prev=='r') { xp="\n"+tran[lng.selectedIndex][57]; }
       if (prev=='g') { xp="\n"+tran[lng.selectedIndex][58]; }
       if (prev=='b' && !l.includes('DATE')) { xp="\n"+tran[lng.selectedIndex][59]; }
       if (prev=='d' && !l.includes('DATE')) { xp="\n"+tran[lng.selectedIndex][60]; }
       if (xp) { json.people[blk].oi=json.people[blk].oi.trim()+xp+l.replace(/\w+.\w+./,""); }
      }
     }
     if (l.includes('NAME')) {
      //used as a backup for below values
      rawname=tmp=l.replace(/\w+.\w+./,"");
     }
     if (l.includes('GIVN')) {
      json.people[blk].gn=l.replace(/\w+.\w+./,"").trim();
     }
     if (l.includes('SURN')) {
      json.people[blk].fn=l.replace(/\w+.\w+./,"").trim();
     }
     if (l.includes('FAMC')) { //child of
      json.people[blk].famc=l.split("@")[1];
     }
     if (l.includes('FAMS')) { //parent of
      json.people[blk].fams=l.split("@")[1];
     }
     
     if (l.includes('SEX')) {
      var s=l.replace(/\d+.\w+./,"").toUpperCase()=='F' ? 0 : 1;
      json.people[blk].sx=s;
     }
    }
   //}); //end for
   }; //end for
   oi.value='Success, all lines loaded '+(rtmp.length);
   //sort tree, start with person 0
   var ch,hc;
   ckged=[];
   row=[0,1]; //row lengths
   json.people[0].lvl=1; //defaults for person 0
   json.people[0].x=box.w+50;
   json.people[0].y=box.h+50;
   //json.people.forEach(function(l,i){ pit(i,0); }); //child, has parents
   //json.people.forEach(function(l,i){ pit(i,1); }); //parents n child
   json.people.forEach(function(l,i){
    //add name to check last list.
    if (fre(i)==-1) { ckged.push(i); }
   }); // find lvl
   //console.log('ckged',ckged);
   //ckged.push(false);
   ckged.forEach(function(l,i){ fre(l); });

  poplst();
  bldHsCh();
  //draw();
  pan(0,500); //move canvas down
 };
 reader.readAsText(file);
}


function fre(id) { //find relative with lvl
 var l=json.people[id];
 if (l.x!==false) { return; } // check x is unset
 //console.log('FRE:',l.id,l.gn);
 // check for marriage (or children) so set lvl
 if (l.fams!='') {
  hc=l.fams;
  //console.log('s',l.gn);
  Object.keys(ged[hc]).forEach(function(k,j){ // parse families
   //console.log(k,j,json.people[fpi(ged[hc][k])] );
   tmp=json.people[fpi(ged[hc][k])];
   if (l.lvl===false && tmp.lvl!==false) {
    //console.log('A',tmp.gn,k);
    json.people[id].lvl=k.substr(0,1)=='c' ? tmp.lvl-1 : tmp.lvl;
   }
  });
 }
 if (l.lvl===false && l.famc!='') {
  hc=l.famc;
  //console.log('c',l.gn);
  Object.keys(ged[hc]).forEach(function(k,j){ // parse families
   //console.log(k,j,json.people[fpi(ged[hc][k])] );
   tmp=json.people[fpi(ged[hc][k])];
   if (l.lvl===false && tmp.lvl!==false) {
    //console.log('B',tmp.gn,k);
    json.people[id].lvl=k.charAt(0)=='c' ? tmp.lvl : tmp.lvl+1;
    //console.log('B+',json.people[id].lvl,k,k.charAt(0));
   }
  });
 }
 if (json.people[id].lvl!==false) {
  //console.log(json.people[id].gn,json.people[id].lvl,row[json.people[id].lvl]);
  //console.log('srow',json.people[id].lvl,'val',row[json.people[id].lvl]);
  
  row[json.people[id].lvl]= row[json.people[id].lvl]===undefined ? 1 : row[json.people[id].lvl]+1;
  //console.log('erow',json.people[id].lvl,'val',row[json.people[id].lvl]);

  json.people[id].x=(50+box.w)*row[json.people[id].lvl];
  json.people[id].y=(50+box.h)*json.people[id].lvl;
  //console.log(json.people[id].gn,'x',json.people[id].x,'y',json.people[id].y,'lvl',json.people[id].lvl);
  return;
 } else { return -1; }
}

function fpi(n){
 //find person id
 for(let i=0;i<json.people.length;i++){
  if (n==json.people[i].indi) { return i; }
 }
 return n;
}

function keyz(e){
 e = e || window.event;
 //console.log(fobur,e.code,e.key);
 if (fobur=="focus"){
  var tx=0,ty=0;
  if (e.code=="KeyW") { ty=10; }
  if (e.code=="KeyA") { tx=10; }
  if (e.code=="KeyD") { tx=-10; }
  if (e.code=="KeyS") { ty=-10; }
  if (e.code=="Space") { mmode(); } //toggle multi select

  if (ty||tx) {
   pan(tx,ty);
   if (drag) {
    k.x+=tx;
    k.y+=ty;
   }
  }
 }
}
function mmode(){
 console.log('mmode');
 mu.classList.toggle('active');
 if (mu.classList[0]) {
  selc=[];
  document.getElementById('delPer').disabled=true;
  document.getElementById('addPer').disabled=true;
  document.getElementById('updPer').disabled=true;
 } else {
  document.getElementById('addPer').disabled=false;
  selc=[-1];
 }
 draw(1);
}

function sos(){
 alert(help[lng.selectedIndex]);
}

function fucus(e){
 //console.log(e.type);
 fobur=e.type;
}

//Listeners ***
//window.onkeypress = keyz;
document.body.addEventListener('keydown', keyz);
window.addEventListener('resize', function(event) { rstim=setTimeout(scale,150); }, true);
can.onmousedown = clkd;
can.onmouseout= clku;
can.onmouseup = clku;
can.onmousemove = movr;
can.setAttribute('tabindex','0');
can.addEventListener("blur", fucus);
can.addEventListener("focus", fucus);
can.addEventListener("touchstart", clkd, {passive: true});
can.addEventListener("touchend", clku, false);
//spr.addEventListener("touchcancel", handleCancel, false);
can.addEventListener("touchmove", movr, {passive: true});
aPer.addEventListener('click', addPer);
uPer.addEventListener('click', updPer);
dPer.addEventListener('click', delPer);
cent.addEventListener('click', pan);
lng.addEventListener('change', lang);
so.addEventListener('click', sos);
st.addEventListener('click', save);
nt.addEventListener('click', newt);
ln.addEventListener('dblclick', mselc);
ln.addEventListener('click', mselc);
ln.addEventListener('keyup', mselc);
tr.addEventListener('change', uptrn);
rl.addEventListener('change', updln);
bg.addEventListener('change', chbg);
hd.addEventListener('click', hide);
fu.addEventListener('click', fullscreen);
mu.addEventListener('click', mmode);
hr.addEventListener('mousemove', () => { bdrg=1; });
document.onmousemove = (e) => {
 //console.log(e.clientY, e.buttons);
 if (bdrg==1 && e.buttons==1){
  var yyy=e.pageY-offs>0 ? e.pageY-offs : 0;
  window.getSelection().removeAllRanges();
  hr.style.top=(yyy)+'px';
  hd.style.top=(yyy+8)+'px';
  inp.style.height=(yyy)+'px';
  if (inp.style.display=='none') { hide(); }
 }
 if (e.buttons==0){ bdrg=0; }
}
addEventListener("resize", (e) => {
 hr.style.width=document.getElementById('app-content').getBoundingClientRect().width-2;
 //resize canvas too?
});

lt.onclick = function(){ openFD('.json',load) }
imp.onclick = function(){ openFD('.ged',impged) }
//exp.addEventListener('click', expged);
//ln.addEventListener('dblclick', updln);
json = JSON.parse(data);
cent.cen = 1;
pan(0,150); //move canvas down
fullscreen(); // Set up offset
start();