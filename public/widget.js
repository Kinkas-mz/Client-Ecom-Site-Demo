(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────────────────────────
  const PROXY = '';

  // ── Styles ──────────────────────────────────────────────────────────────
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

    .knk-overlay {
      position: fixed; inset: 0; z-index: 999999;
      background: rgba(44,47,49,0.50);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
      font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
      animation: knk-fade-in 0.18s ease;
    }
    @keyframes knk-fade-in { from { opacity: 0; } to { opacity: 1; } }

    .knk-modal {
      background: #fff;
      border-radius: 24px;
      width: 100%; max-width: 400px;
      overflow: hidden;
      box-shadow: 0 32px 80px rgba(44,47,49,0.18), 0 4px 16px rgba(44,47,49,0.08);
      animation: knk-slide-up 0.22s cubic-bezier(0.32,0.72,0,1);
    }
    @keyframes knk-slide-up {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    .knk-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px 16px;
      border-bottom: 0.5px solid rgba(171,173,175,0.18);
    }
    .knk-header-left { display: flex; flex-direction: column; gap: 3px; }
    .knk-merchant { font-size: 15px; font-weight: 700; color: #2c2f31; }
    .knk-amount   { font-size: 13px; color: #595c5e; font-weight: 500; }

    .knk-close {
      width: 30px; height: 30px; border-radius: 50%;
      background: #F5F7F9; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; color: #595c5e; transition: background 0.15s;
      flex-shrink: 0;
    }
    .knk-close:hover { background: rgba(171,173,175,0.25); }

    /* ── Tabs ── */
    .knk-tabs {
      display: flex; border-bottom: 0.5px solid rgba(171,173,175,0.18);
    }
    .knk-tab {
      flex: 1; padding: 12px 0; font-size: 12px; font-weight: 700;
      letter-spacing: 0.05em; text-transform: uppercase;
      color: #595c5e; background: none; border: none;
      cursor: pointer; transition: color 0.15s;
      font-family: 'Manrope', sans-serif;
      border-bottom: 2px solid transparent;
      margin-bottom: -0.5px;
    }
    .knk-tab:hover { color: #2c2f31; }
    .knk-tab.knk-tab-active {
      color: #006947;
      border-bottom-color: #006947;
    }

    .knk-body { padding: 20px 24px 24px; }

    .knk-label {
      display: block; font-size: 11px; font-weight: 700;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: #595c5e; margin-bottom: 8px;
    }

    /* ── Mobile networks ── */
    .knk-networks {
      display: grid; grid-template-columns: 1fr 1fr 1fr;
      gap: 8px; margin-bottom: 18px;
    }
    .knk-net {
      display: flex; align-items: center; justify-content: center;
      gap: 6px; padding: 10px 6px;
      border: 0.5px solid rgba(171,173,175,0.30); border-radius: 12px;
      cursor: pointer; font-size: 12px; font-weight: 600;
      color: #595c5e; background: #F5F7F9; transition: all 0.15s;
    }
    .knk-net:hover { border-color: rgba(0,105,71,0.30); color: #2c2f31; }
    .knk-net.knk-selected {
      border-color: #006947; background: rgba(0,105,71,0.08); color: #006947;
    }
    .knk-net-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

    /* ── Inputs ── */
    .knk-input-wrap { position: relative; margin-bottom: 14px; }
    .knk-prefix {
      position: absolute; left: 14px; top: 50%;
      transform: translateY(-50%);
      font-size: 14px; color: #595c5e; pointer-events: none; font-weight: 500;
    }
    .knk-input {
      width: 100%; padding: 13px 14px;
      border: 0.5px solid rgba(171,173,175,0.30); border-radius: 12px;
      font-size: 15px; font-family: 'Manrope', sans-serif; color: #2c2f31;
      background: #F5F7F9; outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .knk-input.knk-input-phone { padding-left: 52px; }
    .knk-input:focus {
      border-color: rgba(0,105,71,0.45);
      box-shadow: 0 0 0 3px rgba(0,105,71,0.07);
      background: #fff;
    }
    .knk-input::placeholder { color: #aab; }

    .knk-card-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
      margin-bottom: 14px;
    }
    .knk-card-row .knk-input-wrap { margin-bottom: 0; }

    /* ── Buttons ── */
    .knk-btn {
      width: 100%; padding: 15px;
      background: linear-gradient(135deg, #006947, #005c3d);
      color: #fff; border: none; border-radius: 100px;
      font-size: 14px; font-weight: 700; font-family: 'Manrope', sans-serif;
      cursor: pointer; letter-spacing: 0.01em;
      box-shadow: 0 4px 16px rgba(0,105,71,0.28);
      transition: opacity 0.15s, box-shadow 0.15s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      margin-top: 4px;
    }
    .knk-btn:hover { opacity: 0.92; box-shadow: 0 6px 24px rgba(0,105,71,0.36); }
    .knk-btn:active { transform: scale(0.99); }
    .knk-btn:disabled { opacity: 0.50; cursor: not-allowed; transform: none; box-shadow: none; }

    .knk-open-btn {
      display: inline-block; margin-top: 18px;
      padding: 12px 28px;
      background: linear-gradient(135deg, #006947, #005c3d);
      color: #fff; border: none; border-radius: 100px;
      font-size: 13px; font-weight: 700;
      font-family: 'Manrope', sans-serif; cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,105,71,0.28);
      transition: opacity 0.15s, box-shadow 0.15s;
    }
    .knk-open-btn:hover { opacity: 0.9; box-shadow: 0 6px 20px rgba(0,105,71,0.36); }

    .knk-back-btn {
      display: inline-block; margin-top: 12px;
      padding: 10px 24px;
      background: transparent; color: #595c5e;
      border: 0.5px solid rgba(171,173,175,0.30); border-radius: 100px;
      font-size: 13px; font-weight: 600;
      font-family: 'Manrope', sans-serif; cursor: pointer;
      transition: all 0.15s;
    }
    .knk-back-btn:hover { border-color: rgba(171,173,175,0.55); color: #2c2f31; }

    /* ── Error ── */
    .knk-error {
      background: rgba(179,27,37,0.06); border: 0.5px solid rgba(179,27,37,0.20);
      border-radius: 10px; padding: 10px 14px;
      font-size: 13px; color: #b31b25;
      margin-bottom: 14px; display: none;
    }
    .knk-error.knk-show { display: block; }

    /* ── Footer ── */
    .knk-footer {
      display: flex; align-items: center; justify-content: center;
      gap: 6px; padding: 12px 24px;
      border-top: 0.5px solid rgba(171,173,175,0.18);
      font-size: 11px; color: #aab;
    }
    .knk-footer-logo { font-size: 12px; font-weight: 800; color: #006947; letter-spacing: -0.02em; }

    /* ── States ── */
    .knk-panel { display: none; }
    .knk-panel.knk-active { display: block; }
    .knk-state { display: none; }
    .knk-state.knk-active { display: block; }

    .knk-center { text-align: center; padding: 28px 16px 8px; }

    .knk-spinner {
      width: 36px; height: 36px; margin: 0 auto 16px;
      border: 2.5px solid rgba(171,173,175,0.20);
      border-top-color: #006947;
      border-radius: 50%; animation: knk-spin 0.7s linear infinite;
    }
    @keyframes knk-spin { to { transform: rotate(360deg); } }

    .knk-state-title { font-size: 17px; font-weight: 700; color: #2c2f31; margin-bottom: 6px; }
    .knk-state-desc  { font-size: 13px; color: #595c5e; line-height: 1.6; }

    .knk-ref {
      display: inline-block; margin-top: 12px;
      padding: 5px 12px;
      border: 0.5px solid rgba(171,173,175,0.25); border-radius: 100px;
      font-size: 11px; font-family: monospace; color: #aab;
    }

    .knk-check {
      width: 52px; height: 52px; margin: 0 auto 16px; border-radius: 50%;
      background: rgba(0,105,71,0.08); border: 1.5px solid rgba(0,105,71,0.25);
      display: flex; align-items: center; justify-content: center;
    }
    .knk-x-icon {
      width: 52px; height: 52px; margin: 0 auto 16px; border-radius: 50%;
      background: rgba(179,27,37,0.06); border: 1.5px solid rgba(179,27,37,0.20);
      display: flex; align-items: center; justify-content: center;
    }
  `;

  // ── HTML template ────────────────────────────────────────────────────────
  function buildModal(merchant, amount, currency) {
    const amtDisplay = `${currency} ${Number(amount).toLocaleString()}`;
    return `
      <div class="knk-overlay" id="knk-overlay">
        <div class="knk-modal">

          <div class="knk-header">
            <div class="knk-header-left">
              <div class="knk-merchant">${merchant}</div>
              <div class="knk-amount">${amtDisplay}</div>
            </div>
            <button class="knk-close" id="knk-close" aria-label="Fechar">×</button>
          </div>

          <!-- ── Payment method tabs ── -->
          <div class="knk-tabs">
            <button class="knk-tab knk-tab-active" data-tab="mobile">Dinheiro Móvel</button>
            <button class="knk-tab" data-tab="card">Cartão</button>
          </div>

          <div class="knk-body">

            <!-- ════ FORM STATE ════ -->
            <div id="knk-state-form" class="knk-state knk-active">

              <!-- Mobile panel -->
              <div id="knk-panel-mobile" class="knk-panel knk-active">
                <div id="knk-error" class="knk-error"></div>
                <label class="knk-label">Rede móvel</label>
                <div class="knk-networks">
                  <div class="knk-net knk-selected" data-network="MPESA">
                    <div class="knk-net-dot" style="background:#e60000"></div> M-Pesa
                  </div>
                  <div class="knk-net" data-network="EMOLA">
                    <div class="knk-net-dot" style="background:#00a651"></div> e-Mola
                  </div>
                  <div class="knk-net" data-network="MKESH">
                    <div class="knk-net-dot" style="background:#003087"></div> mKesh
                  </div>
                </div>
                <label class="knk-label">Número de dinheiro móvel</label>
                <div class="knk-input-wrap">
                  <span class="knk-prefix">+258</span>
                  <input class="knk-input knk-input-phone" id="knk-phone" type="tel"
                    placeholder="84 123 4567" maxlength="12" inputmode="numeric">
                </div>
                <button class="knk-btn" id="knk-mobile-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>
                  Pagar ${amtDisplay}
                </button>
              </div>

              <!-- Card panel -->
              <div id="knk-panel-card" class="knk-panel">
                <div id="knk-card-error" class="knk-error"></div>
                <label class="knk-label">Número do cartão</label>
                <div class="knk-input-wrap">
                  <input class="knk-input" id="knk-card-number" type="text"
                    placeholder="1234 5678 9012 3456" maxlength="19" inputmode="numeric" autocomplete="cc-number">
                </div>
                <div class="knk-card-row">
                  <div class="knk-input-wrap">
                    <input class="knk-input" id="knk-card-expiry" type="text"
                      placeholder="MM/AA" maxlength="5" inputmode="numeric" autocomplete="cc-exp">
                  </div>
                  <div class="knk-input-wrap">
                    <input class="knk-input" id="knk-card-cvc" type="text"
                      placeholder="CVC" maxlength="4" inputmode="numeric" autocomplete="cc-csc">
                  </div>
                </div>
                <label class="knk-label">Nome no cartão</label>
                <div class="knk-input-wrap">
                  <input class="knk-input" id="knk-card-name" type="text"
                    placeholder="Nome Apelido" autocomplete="cc-name">
                </div>
                <button class="knk-btn" id="knk-card-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                  Pagar ${amtDisplay}
                </button>
              </div>

            </div>

            <!-- ════ PROCESSING ════ -->
            <div id="knk-state-processing" class="knk-state">
              <div class="knk-center">
                <div class="knk-spinner"></div>
                <div class="knk-state-title" id="knk-processing-title">A processar</div>
                <div class="knk-state-desc" id="knk-processing-desc">A enviar pedido ao seu telemóvel…</div>
              </div>
            </div>

            <!-- ════ REDIRECT (hosted auth page) ════ -->
            <div id="knk-state-redirect" class="knk-state">
              <div class="knk-center">
                <div class="knk-check" style="background:rgba(0,105,71,0.06);border-color:rgba(0,105,71,0.20)">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#006947" stroke-width="2">
                    <rect x="5" y="2" width="14" height="20" rx="2"/>
                    <circle cx="12" cy="17" r="1" fill="#006947"/>
                  </svg>
                </div>
                <div class="knk-state-title">Confirme no telemóvel</div>
                <div class="knk-state-desc">Abra a página de pagamento, introduza o seu PIN e volte aqui.</div>
                <button class="knk-open-btn" id="knk-open-btn">Abrir página de pagamento</button>
                <br><div class="knk-ref" id="knk-ref"></div>
              </div>
            </div>

            <!-- ════ PENDING (USSD push sent) ════ -->
            <div id="knk-state-pending" class="knk-state">
              <div class="knk-center">
                <div class="knk-spinner"></div>
                <div class="knk-state-title">A aguardar confirmação</div>
                <div class="knk-state-desc">Verifique a notificação no seu telemóvel e introduza o PIN.</div>
                <div class="knk-ref" id="knk-pending-ref"></div>
              </div>
            </div>

            <!-- ════ SUCCESS ════ -->
            <div id="knk-state-success" class="knk-state">
              <div class="knk-center">
                <div class="knk-check">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#006947" stroke-width="2.5" stroke-linecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div class="knk-state-title">Pagamento confirmado</div>
                <div class="knk-state-desc">Obrigado! O seu pagamento foi recebido com sucesso.</div>
                <div class="knk-ref" id="knk-success-ref"></div>
                <br><button class="knk-back-btn" id="knk-done-btn">Fechar</button>
              </div>
            </div>

            <!-- ════ FAILED ════ -->
            <div id="knk-state-failed" class="knk-state">
              <div class="knk-center">
                <div class="knk-x-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b31b25" stroke-width="2.5" stroke-linecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </div>
                <div class="knk-state-title">Pagamento não concluído</div>
                <div class="knk-state-desc" id="knk-fail-desc">O pagamento foi recusado ou cancelado.</div>
                <br><button class="knk-back-btn" id="knk-retry-btn">Tentar novamente</button>
              </div>
            </div>

          </div>

          <div class="knk-footer">
            Pagamentos seguros por <span class="knk-footer-logo">VUMA</span>
          </div>

        </div>
      </div>
    `;
  }

  // ── Widget logic ─────────────────────────────────────────────────────────
  function initWidget(btn, autoRef) {
    const stored = autoRef
      ? JSON.parse(sessionStorage.getItem('vuma_widget_pending') || 'null')
      : null;

    const _amount   = (stored && stored.amount)   || (btn && btn.dataset.amount)   || '0';
    const _currency = (stored && stored.currency) || (btn && btn.dataset.currency) || 'MZN';
    const _merchant = (stored && stored.merchant) || (btn && btn.dataset.merchant) || document.title;

    let selectedNetwork = 'MPESA';
    let currentRef = stored ? stored.ref : null;
    let activeTab  = 'mobile';
    let pollTimer  = null;

    // Inject styles once
    if (!document.getElementById('knk-styles')) {
      const style = document.createElement('style');
      style.id = 'knk-styles';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = buildModal(_merchant, _amount, _currency);
    document.body.appendChild(wrapper);

    const overlay = document.getElementById('knk-overlay');

    // ── Helpers ────────────────────────────────────────────
    function showState(id) {
      overlay.querySelectorAll('.knk-state').forEach(s => s.classList.remove('knk-active'));
      const el = document.getElementById('knk-state-' + id);
      if (el) el.classList.add('knk-active');
    }

    function showPanel(tab) {
      overlay.querySelectorAll('.knk-panel').forEach(p => p.classList.remove('knk-active'));
      document.getElementById('knk-panel-' + tab).classList.add('knk-active');
    }

    function showError(id, msg) {
      const el = document.getElementById(id);
      el.textContent = msg; el.classList.add('knk-show');
    }

    function hideError(id) {
      document.getElementById(id).classList.remove('knk-show');
    }

    function stopPolling() {
      if (pollTimer) { clearTimeout(pollTimer); pollTimer = null; }
    }

    function close() {
      stopPolling(); wrapper.remove(); document.body.style.overflow = '';
    }

    function generateRef() {
      return 'KNK' + Date.now().toString(36).toUpperCase();
    }

    // ── Close / retry ──────────────────────────────────────
    document.getElementById('knk-close').onclick    = close;
    document.getElementById('knk-done-btn').onclick = close;
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    document.getElementById('knk-retry-btn').onclick = () => {
      document.getElementById('knk-mobile-btn').disabled = false;
      document.getElementById('knk-card-btn').disabled   = false;
      hideError('knk-error'); hideError('knk-card-error');
      showState('form');
    };

    // ── Tab switching ──────────────────────────────────────
    overlay.querySelectorAll('.knk-tab').forEach(tab => {
      tab.onclick = () => {
        overlay.querySelectorAll('.knk-tab').forEach(t => t.classList.remove('knk-tab-active'));
        tab.classList.add('knk-tab-active');
        activeTab = tab.dataset.tab;
        showPanel(activeTab);
        hideError('knk-error'); hideError('knk-card-error');
      };
    });

    // ── Network selection ──────────────────────────────────
    overlay.querySelectorAll('.knk-net').forEach(el => {
      el.onclick = () => {
        overlay.querySelectorAll('.knk-net').forEach(n => n.classList.remove('knk-selected'));
        el.classList.add('knk-selected');
        selectedNetwork = el.dataset.network;
      };
    });

    // ── Card input formatting ──────────────────────────────
    const numInput    = document.getElementById('knk-card-number');
    const expiryInput = document.getElementById('knk-card-expiry');

    numInput.addEventListener('input', () => {
      let v = numInput.value.replace(/\D/g, '').slice(0, 16);
      numInput.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
    expiryInput.addEventListener('input', () => {
      let v = expiryInput.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
      expiryInput.value = v;
    });

    // ── Polling ────────────────────────────────────────────
    function poll(ref, attempts) {
      if (attempts > 40) {
        document.getElementById('knk-fail-desc').textContent =
          'Tempo esgotado. Verifica o teu extracto M-Pesa.';
        showState('failed');
        sessionStorage.removeItem('vuma_widget_pending');
        return;
      }
      pollTimer = setTimeout(async () => {
        try {
          const res  = await fetch(`${PROXY}/proxy/status/${ref}`);
          const data = await res.json();
          if (data.status === 'successful') {
            sessionStorage.removeItem('vuma_widget_pending');
            document.getElementById('knk-success-ref').textContent = 'Ref: ' + ref;
            showState('success');
          } else if (data.status === 'failed') {
            sessionStorage.removeItem('vuma_widget_pending');
            document.getElementById('knk-fail-desc').textContent =
              'O pagamento foi recusado ou o saldo é insuficiente.';
            showState('failed');
          } else {
            poll(ref, attempts + 1);
          }
        } catch { poll(ref, attempts + 1); }
      }, 5000);
    }

    // ── Auto-resume after page redirect ───────────────────
    if (autoRef && currentRef) {
      sessionStorage.removeItem('vuma_widget_pending');
      document.getElementById('knk-pending-ref').textContent = 'Ref: ' + currentRef;
      showState('pending');
      poll(currentRef, 0);
      document.body.style.overflow = 'hidden';
      return;
    }

    // ── Mobile pay ─────────────────────────────────────────
    document.getElementById('knk-mobile-btn').onclick = async function () {
      hideError('knk-error');
      const phone = document.getElementById('knk-phone').value.replace(/\s/g, '');
      if (!phone || phone.length < 9) {
        showError('knk-error', 'Por favor introduza um número válido (mínimo 9 dígitos).');
        return;
      }

      this.disabled = true;
      document.getElementById('knk-processing-title').textContent = 'A processar';
      document.getElementById('knk-processing-desc').textContent  = 'A enviar pedido ao seu telemóvel…';
      showState('processing');
      currentRef = generateRef();

      const networkMap = {
        MPESA: { chargeType: 'mobilemoneygh', network: 'MTN' },
        EMOLA: { chargeType: 'mobilemoneygh', network: 'MTN' },
        MKESH: { chargeType: 'mobilemoneygh', network: 'MTN' },
      };
      const { chargeType, network } = networkMap[selectedNetwork];

      try {
        const res = await fetch(`${PROXY}/proxy/charge`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone, network, chargeType,
            amount: Number(_amount), currency: _currency,
            reference: currentRef,
            email: 'cliente@widget.vuma.io', name: 'Cliente',
            redirect_url: window.location.href,
          }),
        });
        const data = await res.json();

        if (!data.success) {
          this.disabled = false;
          showState('form');
          showError('knk-error', data.error || 'Pagamento falhou. Tente novamente.');
          return;
        }

        if (data.redirectUrl) {
          sessionStorage.setItem('vuma_widget_pending', JSON.stringify({
            ref: currentRef, merchant: _merchant, amount: _amount, currency: _currency,
          }));
          document.getElementById('knk-ref').textContent = 'Ref: ' + currentRef;
          document.getElementById('knk-open-btn').onclick = () => {
            window.open(data.redirectUrl, '_blank');
            document.getElementById('knk-pending-ref').textContent = 'Ref: ' + currentRef;
            showState('pending');
            poll(currentRef, 0);
          };
          showState('redirect');
        } else {
          document.getElementById('knk-pending-ref').textContent = 'Ref: ' + currentRef;
          showState('pending');
          poll(currentRef, 0);
        }

      } catch {
        this.disabled = false;
        showState('form');
        showError('knk-error', 'Erro de ligação. Tente novamente.');
      }
    };

    // ── Card pay ───────────────────────────────────────────
    // NOTE: card charging is not yet live in the VUMA backend.
    // This simulates a successful payment for demo/testing purposes.
    // To go live: add a /proxy/charge-card endpoint backed by
    // Flutterwave's card charge API or their Inline SDK.
    document.getElementById('knk-card-btn').onclick = async function () {
      hideError('knk-card-error');

      const number = document.getElementById('knk-card-number').value.replace(/\s/g, '');
      const expiry = document.getElementById('knk-card-expiry').value.trim();
      const cvc    = document.getElementById('knk-card-cvc').value.trim();
      const name   = document.getElementById('knk-card-name').value.trim();

      if (number.length < 16) {
        showError('knk-card-error', 'Introduz um número de cartão válido (16 dígitos).'); return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        showError('knk-card-error', 'Introduz uma data de validade válida (MM/AA).'); return;
      }
      if (cvc.length < 3) {
        showError('knk-card-error', 'Introduz um CVC válido (3-4 dígitos).'); return;
      }
      if (!name) {
        showError('knk-card-error', 'Introduz o nome como aparece no cartão.'); return;
      }

      this.disabled = true;
      document.getElementById('knk-processing-title').textContent = 'A processar cartão';
      document.getElementById('knk-processing-desc').textContent  = 'A verificar os dados do cartão…';
      showState('processing');
      currentRef = generateRef();

      // Demo: simulate 2.2s processing then show success
      await new Promise(r => setTimeout(r, 2200));
      document.getElementById('knk-success-ref').textContent = 'Ref: ' + currentRef;
      showState('success');
    };

    document.body.style.overflow = 'hidden';
  }

  // ── Auto-init ────────────────────────────────────────────────────────────
  function init() {
    const stored = sessionStorage.getItem('vuma_widget_pending');
    if (stored) {
      try {
        const pending = JSON.parse(stored);
        if (pending && pending.ref) { initWidget(null, true); return; }
      } catch {}
    }
    document.querySelectorAll('[data-vuma], [data-kinkas]').forEach(btn => {
      btn.addEventListener('click', () => initWidget(btn, false));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
