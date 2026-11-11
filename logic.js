// 회의실 예약의 순수 업무 규칙. 화면/DOM 코드와 분리합니다.
function toMinute(t){const x=/^(\d{2}):(\d{2})$/.exec(t||'');if(!x)return NaN;const h=Number(x[1]),m=Number(x[2]);return h<24&&m<60?h*60+m:NaN}
function validBooking(b){if(!b||!b.room||!b.date||!b.name?.trim())return false;return Number.isFinite(toMinute(b.start))&&Number.isFinite(toMinute(b.end))&&toMinute(b.start)<toMinute(b.end)}
function overlap(a,b){return a.room===b.room&&a.date===b.date&&a.status!=='취소'&&b.status!=='취소'&&toMinute(a.start)<toMinute(b.end)&&toMinute(b.start)<toMinute(a.end)}
function canBook(bookings,candidate){if(!validBooking(candidate))return {ok:false,message:'회의실·날짜·시간·예약자를 정확히 입력하세요.'};if(bookings.some(b=>overlap(b,candidate)))return {ok:false,message:'같은 회의실에 겹치는 예약이 있습니다.'};return {ok:true,message:'예약 가능합니다.'}}
function stats(bookings){return {all:bookings.filter(x=>x.status!=='취소').length,rooms:new Set(bookings.filter(x=>x.status!=='취소').map(x=>x.room)).size,cancelled:bookings.filter(x=>x.status==='취소').length}}
