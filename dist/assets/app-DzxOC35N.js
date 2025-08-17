import{C as u,r as h}from"./vendor-Co7ClN-s.js";async function g(e,t){try{const o=await fetch(`https://api.exchangerate-api.com/v4/latest/${e}`);if(!o.ok)throw new Error(`API 요청 실패: ${o.status} ${o.statusText}`);const r=(await o.json()).rates[t];if(!r)throw new Error(`지원하지 않는 통화: ${t}`);return r}catch(o){throw console.error("환율 조회 실패:",o),o}}u.register(...h);function m(e){const t=document.getElementById(e);if(!t)throw new Error(`컨테이너를 찾을 수 없습니다: ${e}`);t.innerHTML="";const o=document.createElement("div");o.style.cssText=`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 300px 300px;
    gap: 20px;
    width: 100%;
    height: 620px;
    overflow: hidden;
  `,[{code:"USD",color:"#007BFF",name:"미국 달러"},{code:"EUR",color:"#28A745",name:"유럽 유로"},{code:"JPY",color:"#FFC107",name:"일본 엔"},{code:"CNY",color:"#DC3545",name:"중국 위안"}].forEach((r,a)=>{const i=document.createElement("div");i.style.cssText=`
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      background: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      height: 100%;
    `;const d=document.createElement("h3");d.textContent=`${r.name} (${r.code})`,d.style.cssText=`
      margin: 0 0 10px 0;
      color: ${r.color};
      font-size: 16px;
      flex-shrink: 0;
    `;const c=document.createElement("div");c.style.cssText=`
      flex: 1;
      width: 100%;
      position: relative;
      overflow: hidden;
    `;const s=document.createElement("canvas");s.id=`chart-${r.code}`,s.width=400,s.height=250,s.style.cssText=`
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    `,c.appendChild(s),i.appendChild(d),i.appendChild(c),o.appendChild(i);const p=[{date:"2025-08-15",rate:1380+Math.random()*20},{date:"2025-08-16",rate:1385+Math.random()*20},{date:"2025-08-17",rate:1387.78+Math.random()*20}];new u(s,{type:"line",data:{labels:p.map(l=>l.date),datasets:[{label:`${r.code} → KRW 환율`,data:p.map(l=>l.rate),borderColor:r.color,backgroundColor:`${r.color}20`,borderWidth:2,pointBackgroundColor:r.color,pointBorderColor:"#fff",pointBorderWidth:2,pointRadius:4}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!1,grid:{color:"rgba(0,0,0,0.1)"}},x:{grid:{color:"rgba(0,0,0,0.1)"}}},plugins:{legend:{display:!1}}}})}),t.appendChild(o)}function f(e,t,o){x(e,t,o);const{purchaseValue:n,difference:r}=v(e,t,o);return w(r,n)}function x(e,t,o){if(e<=0)throw new Error("매입 환율은 0보다 커야 합니다");if(t<=0)throw new Error("환전 금액은 0보다 커야 합니다");if(o<=0)throw new Error("현재 환율은 0보다 커야 합니다")}function v(e,t,o){const n=e*t,r=o*t,a=r-n;return{purchaseValue:n,currentValue:r,difference:a}}function w(e,t){return e>0?b(e,t):e<0?E(e,t):$()}function b(e,t){const o=e/t*100;return{profit:Math.round(e),profitRate:Math.round(o*100)/100,loss:0,lossRate:0,status:"profit",message:`👍 이익: ${Math.round(e).toLocaleString()}원 (${Math.round(o*100)/100}%)`}}function E(e,t){const o=Math.abs(e)/t*100;return{profit:0,profitRate:0,loss:Math.round(Math.abs(e)),lossRate:Math.round(o*100)/100,status:"loss",message:`👎 손해: ${Math.round(Math.abs(e)).toLocaleString()}원 (${Math.round(o*100)/100}%)`}}function $(){return{profit:0,profitRate:0,loss:0,lossRate:0,status:"break-even",message:"⚖️ 손익분기: 이익도 손해도 없습니다"}}window.testExchangeRate=async function(){const e=document.getElementById("exchangeRateResult");e.innerHTML="환율 조회 중...";try{const t=await g("USD","KRW");e.innerHTML=`
            💱 USD → KRW 환율: ${t.toFixed(2)}<br>
            📅 조회 시간: ${new Date().toLocaleString()}
        `}catch(t){e.innerHTML=`❌ 오류: ${t.message}`}};window.renderChartGrid=async function(){const e=document.getElementById("chartContainer");e.innerHTML="USD, EUR, JPY, CNY 환율 차트 렌더링 중...";try{m("chartContainer");const t=document.createElement("div");t.innerHTML="✅ 4개 통화 환율 차트가 2x2 그리드로 표시되었습니다!",t.style.color="green",t.style.marginTop="10px",e.appendChild(t)}catch(t){console.error("그리드 차트 렌더링 오류:",t),e.innerHTML=`❌ 그리드 차트 렌더링 실패: ${t.message}`}};window.runTests=async function(){const e=document.getElementById("testResults");if(!e){console.error("testResults 요소를 찾을 수 없습니다");return}e.innerHTML="테스트 실행 중...";try{const t=await g("USD","KRW");t&&typeof t=="number"&&t>0?e.innerHTML=`
                ✅ 테스트 통과!<br>
                USD → KRW 환율: ${t.toFixed(2)}<br>
                📅 테스트 시간: ${new Date().toLocaleString()}
            `:e.innerHTML="❌ 테스트 실패: 예상과 다른 결과"}catch(t){console.error("테스트 실행 오류:",t),e.innerHTML=`❌ 테스트 실패: ${t.message}`}};window.calculateProfitLoss=async function(){const e=parseFloat(document.getElementById("purchaseRate").value),t=parseFloat(document.getElementById("amount").value),o=document.getElementById("profitLossResult");if(!e||!t){o.innerHTML='<div style="color: #DC3545; padding: 15px; background: #F8D7DA; border-radius: 6px;">❌ 매입 환율과 환전 금액을 모두 입력해주세요.</div>';return}try{const n=await g("USD","KRW"),r=f(e,t,n);let a="";r.status==="profit"?a=`<div style="color: #28A745; font-size: 18px; font-weight: bold; padding: 15px; background: #D4EDDA; border-radius: 6px; text-align: center;">${r.message}</div>`:r.status==="loss"?a=`<div style="color: #DC3545; font-size: 18px; font-weight: bold; padding: 15px; background: #F8D7DA; border-radius: 6px; text-align: center;">${r.message}</div>`:a=`<div style="color: #6C757D; font-size: 18px; font-weight: bold; padding: 15px; background: #E2E3E5; border-radius: 6px; text-align: center;">${r.message}</div>`,a+=`
            <div style="margin-top: 15px; padding: 20px; background: #F8F9FA; border-radius: 6px; border: 1px solid #E9ECEF;">
                <h4 style="margin-top: 0; color: #495057;">📊 계산 상세 정보</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                    <div><strong>매입 환율:</strong> ${e.toLocaleString()}원</div>
                    <div><strong>환전 금액:</strong> ${t.toLocaleString()}달러</div>
                    <div><strong>현재 환율:</strong> ${n.toLocaleString()}원</div>
                    <div><strong>매입 가치:</strong> ${(e*t).toLocaleString()}원</div>
                    <div><strong>현재 가치:</strong> ${(n*t).toLocaleString()}원</div>
                    <div><strong>차이:</strong> ${Math.abs((n-e)*t).toLocaleString()}원</div>
                </div>
            </div>
        `,o.innerHTML=a}catch(n){o.innerHTML=`<div style="color: #DC3545; padding: 15px; background: #F8D7DA; border-radius: 6px;">❌ 오류: ${n.message}</div>`}};
