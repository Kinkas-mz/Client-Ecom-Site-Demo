(function () {
  'use strict';

  // ── Config ──────────────────────────────────────────────────────────────
  const API = 'https://web-payments-prototype-production.up.railway.app';

  // ── Styles ──────────────────────────────────────────────────────────────
  const CSS = `
    .knk-overlay {
      position: fixed; inset: 0; z-index: 999999;
      background: rgba(0,0,0,0.45);
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      animation: knk-fade-in 0.18s ease;
    }
    @keyframes knk-fade-in { from { opacity: 0; } to { opacity: 1; } }

    .knk-modal {
      background: #fff;
      border-radius: 16px;
      width: 100%; max-width: 400px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(0,0,0,0.18);
      animation: knk-slide-up 0.22s cubic-bezier(0.32,0.72,0,1);
    }
    @keyframes knk-slide-up {
      from { transform: translateY(24px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    .knk-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .knk-header-left { display: flex; flex-direction: column; gap: 2px; }

    .knk-merchant {
      font-size: 16px; font-weight: 600; color: #111;
    }

    .knk-amount {
      font-size: 13px; color: #888;
    }

    .knk-close {
      width: 30px; height: 30px; border-radius: 50%;
      background: #f5f5f5; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; color: #666; transition: background 0.15s;
    }
    .knk-close:hover { background: #eee; }

    .knk-body { padding: 24px; }

    .knk-label {
      display: block; font-size: 11px; font-weight: 600;
      letter-spacing: 0.07em; text-transform: uppercase;
      color: #999; margin-bottom: 8px;
    }

    .knk-networks {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 8px; margin-bottom: 18px;
    }

    .knk-net {
      display: flex; align-items: center; justify-content: center;
      gap: 7px; padding: 11px 8px;
      border: 1.5px solid #e8e8e8; border-radius: 10px;
      cursor: pointer; font-size: 13px; font-weight: 500;
      color: #888; background: #fff; transition: all 0.15s;
    }
    .knk-net:hover { border-color: #ccc; color: #333; }
    .knk-net.knk-selected {
      border-color: #111; background: #111; color: #fff;
    }

    .knk-net-dot {
      width: 8px; height: 8px; border-radius: 50%;
    }

    .knk-input-wrap { position: relative; margin-bottom: 18px; }

    .knk-prefix {
      position: absolute; left: 14px; top: 50%;
      transform: translateY(-50%);
      font-size: 14px; color: #aaa; pointer-events: none;
    }

    .knk-input {
      width: 100%; padding: 13px 14px 13px 52px;
      border: 1.5px solid #e8e8e8; border-radius: 10px;
      font-size: 16px; font-family: inherit; color: #111;
      background: #fff; outline: none; transition: border-color 0.2s;
    }
    .knk-input:focus { border-color: #111; }
    .knk-input::placeholder { color: #bbb; }

    .knk-btn {
      width: 100%; padding: 15px;
      background: #111; color: #fff; border: none; border-radius: 10px;
      font-size: 15px; font-weight: 600; font-family: inherit;
      cursor: pointer; transition: all 0.2s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .knk-btn:hover { background: #333; }
    .knk-btn:active { transform: scale(0.99); }
    .knk-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

    .knk-error {
      background: #fff5f5; border: 1px solid #fecaca; border-radius: 8px;
      padding: 10px 14px; font-size: 13px; color: #dc2626;
      margin-bottom: 14px; display: none;
    }
    .knk-error.knk-show { display: block; }

    .knk-footer {
      display: flex; align-items: center; justify-content: center;
      gap: 6px; padding: 14px 24px;
      border-top: 1px solid #f5f5f5;
      font-size: 11px; color: #bbb;
    }
    .knk-footer strong { color: #888; font-weight: 600; }

    /* States */
    .knk-state { display: none; }
    .knk-state.knk-active { display: block; }

    .knk-center {
      text-align: center; padding: 32px 20px;
    }

    .knk-spinner {
      width: 36px; height: 36px; margin: 0 auto 16px;
      border: 2.5px solid #f0f0f0; border-top-color: #111;
      border-radius: 50%; animation: knk-spin 0.7s linear infinite;
    }
    @keyframes knk-spin { to { transform: rotate(360deg); } }

    .knk-state-title {
      font-size: 17px; font-weight: 600; color: #111; margin-bottom: 6px;
    }

    .knk-state-desc {
      font-size: 13px; color: #888; line-height: 1.6;
    }

    .knk-open-btn {
      display: inline-block; margin-top: 18px;
      padding: 12px 28px; background: #111; color: #fff;
      border: none; border-radius: 10px; font-size: 14px;
      font-weight: 600; font-family: inherit; cursor: pointer;
      transition: background 0.2s;
    }
    .knk-open-btn:hover { background: #333; }

    .knk-ref {
      display: inline-block; margin-top: 12px;
      padding: 5px 12px; border: 1px solid #e8e8e8; border-radius: 6px;
      font-size: 11px; font-family: monospace; color: #aaa;
    }

    .knk-check {
      width: 52px; height: 52px; margin: 0 auto 16px;
      border-radius: 50%; background: #f0fdf4;
      border: 1.5px solid #86efac;
      display: flex; align-items: center; justify-content: center;
    }

    .knk-back-btn {
      display: inline-block; margin-top: 12px;
      padding: 10px 24px; background: transparent; color: #888;
      border: 1px solid #e8e8e8; border-radius: 10px;
      font-size: 13px; font-family: inherit; cursor: pointer;
      transition: all 0.15s;
    }
    .knk-back-btn:hover { border-color: #ccc; color: #333; }
  `;

  // ── HTML template ────────────────────────────────────────────────────────
  function buildModal(merchant, amount, currency) {
    return `
      <div class="knk-overlay" id="knk-overlay">
        <div class="knk-modal">
          <div class="knk-header">
            <div class="knk-header-left">
              <div class="knk-merchant">${merchant}</div>
              <div class="knk-amount">${currency} ${Number(amount).toLocaleString()}</div>
            </div>
            <button class="knk-close" id="knk-close">×</button>
          </div>

          <div class="knk-body">

            <!-- FORM -->
            <div id="knk-state-form" class="knk-state knk-active">
              <div id="knk-error" class="knk-error"></div>

              <label class="knk-label">Rede móvel</label>
              <div class="knk-networks">
                <div class="knk-net knk-selected" data-network="MPESA">
                  <div class="knk-net-dot" style="background:#e60000"></div> M-Pesa
                </div>
                <div class="knk-net" data-network="EMOLA">
                  <div class="knk-net-dot" style="background:#00a651"></div> e-Mola
                </div>
              </div>

              <label class="knk-label">Número de dinheiro móvel</label>
              <div class="knk-input-wrap">
                <span class="knk-prefix">+258</span>
                <input class="knk-input" id="knk-phone" type="tel"
                  placeholder="84 123 4567" maxlength="12" inputmode="numeric">
              </div>

              <button class="knk-btn" id="knk-pay-btn">
                Pagar ${currency} ${Number(amount).toLocaleString()}
              </button>
            </div>

            <!-- PROCESSING -->
            <div id="knk-state-processing" class="knk-state">
              <div class="knk-center">
                <div class="knk-spinner"></div>
                <div class="knk-state-title">A processar</div>
                <div class="knk-state-desc">A enviar pedido ao seu telemóvel…</div>
              </div>
            </div>

            <!-- REDIRECT -->
            <div id="knk-state-redirect" class="knk-state">
              <div class="knk-center">
                <div class="knk-check" style="background:#fffbeb;border-color:#fde68a">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2">
                    <rect x="5" y="2" width="14" height="20" rx="2"/>
                    <circle cx="12" cy="17" r="1" fill="#d97706"/>
                  </svg>
                </div>
                <div class="knk-state-title">Confirme no telemóvel</div>
                <div class="knk-state-desc">Abra a página de pagamento e introduza o seu PIN M-Pesa.</div>
                <button class="knk-open-btn" id="knk-open-btn">Abrir página de pagamento</button>
                <br>
                <div class="knk-ref" id="knk-ref"></div>
              </div>
            </div>

            <!-- SUCCESS -->
            <div id="knk-state-success" class="knk-state">
              <div class="knk-center">
                <div class="knk-check">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div class="knk-state-title">Pagamento confirmado</div>
                <div class="knk-state-desc">Obrigado! O seu pagamento foi recebido com sucesso.</div>
                <div class="knk-ref" id="knk-success-ref"></div>
                <br>
                <button class="knk-back-btn" id="knk-done-btn">Fechar</button>
              </div>
            </div>

          </div>

          <div class="knk-footer">
            Processado por <strong>Kinkas</strong> · Pagamentos Seguros
          </div>
        </div>
      </div>
    `;
  }

  // ── Widget logic ─────────────────────────────────────────────────────────
  function initWidget(btn) {
    const amount     = btn.dataset.amount     || '0';
    const currency   = btn.dataset.currency   || 'MZN';
    const merchant   = btn.dataset.merchant   || document.title;
    const productId  = btn.dataset.productId  || null;
    const merchantId = btn.dataset.merchantId || null;

    let selectedNetwork = 'MPESA';
    let currentRef = null;
    let redirectUrl = null;
    let pollInterval = null;

    // Inject styles once
    if (!document.getElementById('knk-styles')) {
      const style = document.createElement('style');
      style.id = 'knk-styles';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    // Build and inject modal
    const wrapper = document.createElement('div');
    wrapper.innerHTML = buildModal(merchant, amount, currency);
    document.body.appendChild(wrapper);

    const overlay = document.getElementById('knk-overlay');

    // Close handlers
    function close() {
      wrapper.remove();
      if (pollInterval) clearInterval(pollInterval);
      document.body.style.overflow = '';
    }

    document.getElementById('knk-close').onclick = close;
    document.getElementById('knk-done-btn').onclick = close;
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    // Network selection
    overlay.querySelectorAll('.knk-net').forEach(el => {
      el.onclick = () => {
        overlay.querySelectorAll('.knk-net').forEach(n => n.classList.remove('knk-selected'));
        el.classList.add('knk-selected');
        selectedNetwork = el.dataset.network;
      };
    });

    // State switcher
    function showState(id) {
      overlay.querySelectorAll('.knk-state').forEach(s => s.classList.remove('knk-active'));
      document.getElementById('knk-state-' + id).classList.add('knk-active');
    }

    function showError(msg) {
      const el = document.getElementById('knk-error');
      el.textContent = msg;
      el.classList.add('knk-show');
    }

    function hideError() {
      document.getElementById('knk-error').classList.remove('knk-show');
    }

    function generateRef() {
      return 'KNK' + Date.now().toString(36).toUpperCase();
    }

    // Pay
    document.getElementById('knk-pay-btn').onclick = async function () {
      hideError();
      const phone = document.getElementById('knk-phone').value.replace(/\s/g, '');
      if (!phone || phone.length < 9) {
        showError('Por favor introduza um número válido.');
        return;
      }

      this.disabled = true;
      showState('processing');
      currentRef = generateRef();

      try {
        // Map Mozambique providers to Flutterwave params.
        // mobilemoneymoz is the correct charge type — MZN support pending on Flutterwave's end.
        // GHS fallback allows sandbox testing until MZN is live.
        // mobilemoneymoz not yet supported by Flutterwave — using mobilemoneygh as sandbox fallback.
        // Switch to mobilemoneymoz + MPESA/EMOLA once provider agreement is in place.
        const networkMap = {
          MPESA: { chargeType: 'mobilemoneygh', network: 'MTN' },
          EMOLA: { chargeType: 'mobilemoneygh', network: 'MTN' },
        };
        const { chargeType, network } = networkMap[selectedNetwork];

        const apiKey = window.KINKAS_API_KEY || '';
        if (!apiKey) {
          showState('form');
          document.getElementById('knk-pay-btn').disabled = false;
          showError('Configuração em falta. Contacte o suporte.');
          return;
        }

        const res = await fetch(`${API}/payments/charge`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
          body: JSON.stringify({
            phone,
            network,
            chargeType,
            amount: Number(amount),
            currency,
            reference: currentRef,
            email: 'cliente@widget.kinkas.io',
            name: 'Cliente',
          }),
        });

        const data = await res.json();

        if (!data.success) {
          showState('form');
          document.getElementById('knk-pay-btn').disabled = false;
          showError(data.error || 'Pagamento falhou. Tente novamente.');
          return;
        }

        redirectUrl = data.redirectUrl;
        document.getElementById('knk-ref').textContent = 'Ref: ' + currentRef;
        document.getElementById('knk-open-btn').onclick = () => {
          window.open(redirectUrl, '_blank');
          startPolling();
        };

        showState('redirect');

      } catch (err) {
        showState('form');
        document.getElementById('knk-pay-btn').disabled = false;
        showError('Erro de ligação. Tente novamente.');
      }
    };

    // Polling
    function startPolling() {
      if (pollInterval) clearInterval(pollInterval);
      pollInterval = setInterval(async () => {
        try {
          const res = await fetch(`${API}/payments/status/${currentRef}`, {
            headers: { 'Authorization': 'Bearer ' + (window.KINKAS_API_KEY || '') },
          });
          const data = await res.json();
          if (data.status === 'successful') {
            clearInterval(pollInterval);
            document.getElementById('knk-success-ref').textContent = 'Ref: ' + currentRef;
            showState('success');
          }
        } catch {}
      }, 3000);
      setTimeout(() => clearInterval(pollInterval), 300000);
    }

    document.body.style.overflow = 'hidden';
  }

  // ── Auto-init all [data-kinkas] buttons ──────────────────────────────────
  function init() {
    document.querySelectorAll('[data-kinkas]').forEach(btn => {
      btn.addEventListener('click', () => initWidget(btn));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
