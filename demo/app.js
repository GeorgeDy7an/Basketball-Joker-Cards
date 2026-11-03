(function(){
 'use strict';
 const sample=[{rank:14,suit:'S'},{rank:14,suit:'H'},{rank:13,suit:'S'},{rank:13,suit:'D'},{rank:12,suit:'S'},{rank:11,suit:'S'},{rank:10,suit:'S'},{rank:8,suit:'H'}];
 const icons={S:'♠',H:'♥',D:'♦',C:'♣'};
 const words={
  zh:{brand:'记分牌失控',eyebrow:'球场 · 牌型 · 选择',title:'下一手，上场。',lede:'从手牌中选出组合，看看这一手会如何计分。',aside:'一段独立的交互示例\n源于篮球与牌型的组合',sample:'交互演示',choose:'选择你的手牌',selected:'张已选',helper:'选择 1–5 张牌，组合和分数会随之变化。',hand:'当前组合',formula:'示例基础分 × 示意倍率',yourCards:'你的手牌',tap:'点击选择或取消',play:'打出这一手',reset:'重新选择',disclaimer:'这是作品集中的独立简化示例，牌组与数值仅用于演示，不包含完整游戏。',offline:'无需登录 · 可离线运行',empty:'等待选择',emptyHint:'选择手牌查看组合',played:(value)=>`这一手得到 ${value} 分。`,cardNames:{S:'黑桃',H:'红桃',D:'方块',C:'梅花'},types:{high:'高牌',pair:'一对',twoPair:'两对',three:'三条',straight:'顺子',flush:'同花',fullHouse:'葫芦',four:'四条',straightFlush:'同花顺'},face:{11:'J',12:'Q',13:'K',14:'A'},card:'打法牌',page:'下一手，上场 · 玩法演示'},
  en:{brand:'Scoreboard Out of Control',eyebrow:'THE COURT · THE CARDS · YOUR CALL',title:'Play your next hand.',lede:'Select a combination and see how a hand can score.',aside:'A standalone interaction sample\nInspired by basketball and card hands',sample:'INTERACTIVE SAMPLE',choose:'Choose your hand',selected:'selected',helper:'Pick 1–5 cards. The combination and score update as you choose.',hand:'YOUR HAND',formula:'Sample base × example multiplier',yourCards:'Your cards',tap:'Tap to select or deselect',play:'Play hand',reset:'Clear selection',disclaimer:'A standalone portfolio example. The cards and values are illustrative and do not contain the full game.',offline:'No account · Works offline',empty:'Choose cards',emptyHint:'Select cards to see a hand',played:(value)=>`This hand scores ${value} points.`,cardNames:{S:'Spades',H:'Hearts',D:'Diamonds',C:'Clubs'},types:{high:'High card',pair:'Pair',twoPair:'Two pair',three:'Three of a kind',straight:'Straight',flush:'Flush',fullHouse:'Full house',four:'Four of a kind',straightFlush:'Straight flush'},face:{11:'J',12:'Q',13:'K',14:'A'},card:'PLAY',page:'Play your next hand · Demo'}
 };
 const $=id=>document.getElementById(id),selected=new Set([0,1]);let language='zh',lastScore=null;
 try{language=localStorage.getItem('portfolio-demo-language')==='en'?'en':'zh';}catch{}
 const rank=(card,w)=>w.face[card.rank]??String(card.rank);
 function draw(){
  const w=words[language];document.documentElement.lang=language==='en'?'en':'zh-CN';document.title=w.page;
  for(const el of document.querySelectorAll('[data-text]')){const value=w[el.dataset.text];if(value!==undefined)el.textContent=value;}
  for(const el of document.querySelectorAll('[data-lang]'))el.setAttribute('aria-pressed',String(el.dataset.lang===language));
  document.querySelector('.workbench').setAttribute('aria-label',w.sample);document.querySelector('#cards').setAttribute('aria-label',w.yourCards);
  $('cards').replaceChildren(...sample.map((card,i)=>{
   const node=document.createElement('button');node.type='button';node.className='card'+(['H','D'].includes(card.suit)?' red':'');node.setAttribute('aria-pressed',String(selected.has(i)));node.setAttribute('aria-label',`${rank(card,w)} ${w.cardNames[card.suit]}`);node.disabled=!selected.has(i)&&selected.size>=5;
   const a=document.createElement('span'),b=document.createElement('span'),c=document.createElement('span');a.className='card-rank';a.textContent=rank(card,w);b.className='card-suit';b.textContent=icons[card.suit];b.setAttribute('aria-hidden','true');c.className='card-bottom';c.textContent=w.card;node.append(a,b,c);node.addEventListener('click',()=>{selected.has(i)?selected.delete(i):selected.add(i);lastScore=null;draw();document.querySelectorAll('.card')[i]?.focus({preventScroll:true});});return node;
  }));
  $('chosen-count').textContent=String(selected.size);$('play').disabled=selected.size===0;
  if(selected.size){const result=DemoScore.evaluate([...selected].map(i=>sample[i]));$('hand-name').textContent=w.types[result.type];$('chips').textContent=result.chips;$('multiplier').textContent=result.multiplier;}
  else{$('hand-name').textContent=w.empty;$('chips').textContent='—';$('multiplier').textContent='—';}
  $('feedback').textContent=lastScore===null?(selected.size?'':w.emptyHint):w.played(lastScore);
 }
 for(const el of document.querySelectorAll('[data-lang]'))el.addEventListener('click',()=>{language=el.dataset.lang;try{localStorage.setItem('portfolio-demo-language',language);}catch{}draw();});
 $('play').addEventListener('click',()=>{if(!selected.size)return;lastScore=DemoScore.evaluate([...selected].map(i=>sample[i])).score;draw();});
 $('reset').addEventListener('click',()=>{selected.clear();lastScore=null;draw();});draw();
})();
