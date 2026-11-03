/* A small, independent demonstration. Values do not represent the game. */
(function(root){
 'use strict';
 const examples={high:[20,1],pair:[35,2],twoPair:[45,2],three:[50,3],straight:[65,4],flush:[70,4],fullHouse:[80,5],four:[90,6],straightFlush:[110,8]};
 function evaluate(cards){
  if(!Array.isArray(cards)||cards.length<1||cards.length>5)throw new RangeError('Select one to five cards.');
  const ids=new Set();
  for(const c of cards){if(!c||!Number.isInteger(c.rank)||c.rank<2||c.rank>14||!['S','H','D','C'].includes(c.suit))throw new TypeError('Invalid card.');const id=`${c.rank}${c.suit}`;if(ids.has(id))throw new TypeError('Duplicate card.');ids.add(id);}
  const counts=new Map();for(const c of cards)counts.set(c.rank,(counts.get(c.rank)||0)+1);
  const groups=[...counts.values()].sort((a,b)=>b-a),ranks=[...counts.keys()].sort((a,b)=>a-b);
  const straight=cards.length===5&&ranks.length===5&&(ranks[4]-ranks[0]===4||ranks.join(',')==='2,3,4,5,14');
  const flush=cards.length===5&&cards.every(c=>c.suit===cards[0].suit);
  const type=straight&&flush?'straightFlush':groups[0]===4?'four':groups[0]===3&&groups[1]===2?'fullHouse':flush?'flush':straight?'straight':groups[0]===3?'three':groups[0]===2&&groups[1]===2?'twoPair':groups[0]===2?'pair':'high';
  const [chips,multiplier]=examples[type];return {type,chips,multiplier,score:chips*multiplier};
 }
 const api={evaluate};if(typeof module==='object'&&module.exports)module.exports=api;else root.DemoScore=api;
})(globalThis);
