const test=require('node:test');
const assert=require('node:assert/strict');
const {evaluate}=require('./score.js');
const c=(rank,suit)=>({rank,suit});
test('sample hand classifier distinguishes pairs, two pairs, straight and flush',()=>{
 assert.equal(evaluate([c(14,'S'),c(14,'H')]).type,'pair');
 assert.equal(evaluate([c(14,'S'),c(14,'H'),c(13,'S'),c(13,'D')]).type,'twoPair');
 assert.equal(evaluate([c(10,'S'),c(11,'H'),c(12,'S'),c(13,'D'),c(14,'S')]).type,'straight');
 assert.equal(evaluate([c(2,'S'),c(5,'S'),c(8,'S'),c(10,'S'),c(14,'S')]).type,'flush');
 assert.equal(evaluate([c(10,'S'),c(11,'S'),c(12,'S'),c(13,'S'),c(14,'S')]).type,'straightFlush');
});
test('classification handles ace-low and rejects invalid input',()=>{
 assert.equal(evaluate([c(14,'S'),c(2,'H'),c(3,'S'),c(4,'D'),c(5,'S')]).type,'straight');
 assert.throws(()=>evaluate([]));assert.throws(()=>evaluate(Array(6).fill(c(2,'S'))));assert.throws(()=>evaluate([c(14,'S'),c(14,'S')]));
});
test('score is explicitly computed from demo-only base and multiplier',()=>{
 const hand=evaluate([c(14,'S'),c(14,'H')]);assert.equal(hand.score,hand.chips*hand.multiplier);assert.ok(hand.score>0);
});
