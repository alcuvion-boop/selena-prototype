import test from 'node:test';
import assert from 'node:assert/strict';
import {validDate,zodiac,numerology,dayKey,dailyIndex,drawCards,birthLimit,shiftDay} from './domain.js';
test('calendar dates and future dates',()=>{assert.equal(validDate('2000-02-29'),true);assert.equal(validDate('2001-02-29'),false);assert.equal(validDate('2000-13-01'),false);assert.equal(validDate('2999-01-01'),false);assert.equal(validDate(''),false)});
test('birth limit is yesterday not today',()=>{assert.equal(shiftDay('2026-09-11',-1),'2026-09-10');assert.equal(validDate('2026-09-11','2026-09-10'),false);assert.equal(validDate('1994-03-21',birthLimit('UTC')),true)});
test('zodiac boundaries',()=>{assert.equal(zodiac('1994-03-21'),'Овен');assert.equal(zodiac('1994-03-20'),'Рыбы');assert.equal(zodiac('1994-12-25'),'Козерог');assert.equal(zodiac('1994-01-20'),'Водолей')});
test('numerology reduces all digits and rejects invalid date',()=>{assert.equal(numerology('1994-03-21').number,2);assert.equal(numerology('2000-01-01').number,4);assert.throws(()=>numerology('2001-02-29'))});
test('local day follows timezone at midnight',()=>{const date=new Date('2026-09-11T22:00:00Z');assert.equal(dayKey('Europe/Moscow',date),'2026-09-12');assert.equal(dayKey('UTC',date),'2026-09-11')});
test('daily index stable and spreads unique',()=>{assert.equal(dailyIndex('2026-09-11','a'),dailyIndex('2026-09-11','a'));for(let i=0;i<25;i++){const draw=drawCards();assert.equal(draw.length,3);assert.equal(new Set(draw).size,3);assert.ok(draw.every(x=>x>=0&&x<9))}});
