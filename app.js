// --- 1. Inbuilt Categories (All Daily-Life Expense + Income Options in Clean English) ---
    const EXPENSE_CATEGORIES = [
      { id: 'groceries', name: 'Groceries', icon: '🛒', color: '#4f46e5', bg: '#eef2ff', desc: 'Milk, vegetables, fruits, daily staples' },
      { id: 'food', name: 'Food & Dining', icon: '🍽️', color: '#f97316', bg: '#fff7ed', desc: 'Restaurants, snacks, tea/coffee, food delivery' },
      { id: 'travel', name: 'Travel & Transport', icon: '🚕', color: '#0ea5e9', bg: '#f0f9ff', desc: 'Metro, cab, auto, petrol/fuel, tickets' },
      { id: 'house', name: 'House Expense & Rent', icon: '🏠', color: '#8b5cf6', bg: '#f5f3ff', desc: 'Rent, home maintenance, society fees, maid/help' },
      { id: 'bills', name: 'Utilities & Bills', icon: '💡', color: '#eab308', bg: '#fefce8', desc: 'Electricity, water, gas cylinder, Wi-Fi, mobile' },
      { id: 'shopping', name: 'Shopping & Lifestyle', icon: '🛍️', color: '#ec4899', bg: '#fdf2f8', desc: 'Clothing, electronics, personal care, home items' },
      { id: 'health', name: 'Health & Medical', icon: '💊', color: '#10b981', bg: '#ecfdf5', desc: 'Medicines, doctor visits, lab tests, fitness/gym' },
      { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#6366f1', bg: '#eef2ff', desc: 'Movies, OTT subscriptions, outings, hobbies' },
      { id: 'education', name: 'Education & Family', icon: '📚', color: '#14b8a6', bg: '#f0fdfa', desc: 'Books, courses, school/coaching, family care' },
      { id: 'emi', name: 'EMI & Insurance', icon: '🏦', color: '#64748b', bg: '#f8fafc', desc: 'Loan EMI, insurance premiums, SIP/tax' },
      { id: 'other', name: 'Other Expense', icon: '📦', color: '#94a3b8', bg: '#f1f5f9', desc: 'Gifts, emergency, miscellaneous daily costs' }
    ];

    const INCOME_CATEGORIES = [
      { id: 'salary', name: 'Monthly Salary', icon: '💼', color: '#059669', bg: '#ecfdf5', desc: 'Primary monthly salary or wages' },
      { id: 'freelance', name: 'Freelance / Business', icon: '💻', color: '#10b981', bg: '#ecfdf5', desc: 'Side income, business profit, consulting' },
      { id: 'investment', name: 'Investments / Rent', icon: '📈', color: '#0d9488', bg: '#f0fdfa', desc: 'Dividends, interest, rental income' },
      { id: 'other_income', name: 'Bonus / Other Income', icon: '🎁', color: '#34d399', bg: '#ecfdf5', desc: 'Cashback, festival bonus, gifts received' }
    ];

    const ALL_CATEGORIES_MAP = {};
    [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].forEach(c => {
      ALL_CATEGORIES_MAP[c.id] = c;
    });

    // --- 2. Default Realistic Sample Data (October 2026) ---
    function getSampleTransactions() {
      return [
        { id: 'tx_1', type: 'income', category: 'salary', amount: 65000, note: 'October Monthly Salary Credited', date: '2026-10-01', mode: 'Bank Transfer' },
        { id: 'tx_2', type: 'income', category: 'freelance', amount: 5000, note: 'Weekend Project Bonus', date: '2026-10-05', mode: 'UPI' },
        { id: 'tx_3', type: 'expense', category: 'house', amount: 15000, note: 'Monthly House Rent & Maintenance', date: '2026-10-02', mode: 'Bank Transfer' },
        { id: 'tx_4', type: 'expense', category: 'groceries', amount: 4200, note: 'Monthly Ration, Atta, Oil & Pulses', date: '2026-10-03', mode: 'UPI' },
        { id: 'tx_5', type: 'expense', category: 'bills', amount: 2450, note: 'Electricity & Fiber Internet Bill', date: '2026-10-05', mode: 'UPI' },
        { id: 'tx_6', type: 'expense', category: 'travel', amount: 1800, note: 'Metro Card Recharge & Office Commute', date: '2026-10-06', mode: 'UPI' },
        { id: 'tx_7', type: 'expense', category: 'food', amount: 1250, note: 'Weekend Family Dinner & Snacks', date: '2026-10-08', mode: 'Card' },
        { id: 'tx_8', type: 'expense', category: 'groceries', amount: 1150, note: 'Fresh Vegetables, Milk & Fruits', date: '2026-10-10', mode: 'Cash' },
        { id: 'tx_9', type: 'expense', category: 'health', amount: 900, note: 'Pharmacy & Multivitamins', date: '2026-10-11', mode: 'UPI' },
        { id: 'tx_10', type: 'expense', category: 'shopping', amount: 2600, note: 'Festive Clothes & Home Essentials', date: '2026-10-12', mode: 'Card' },
        { id: 'tx_11', type: 'expense', category: 'entertainment', amount: 599, note: 'Movie Tickets & OTT Subscription', date: '2026-10-13', mode: 'UPI' },
        { id: 'tx_12', type: 'expense', category: 'travel', amount: 650, note: 'Cab & Auto Rides', date: '2026-10-14', mode: 'UPI' },
        { id: 'tx_13', type: 'expense', category: 'food', amount: 480, note: 'Office Lunch & Evening Tea', date: '2026-10-15', mode: 'UPI' }
      ];
    }

    // --- 3. App State ---
    const STORAGE_KEY = 'expense_tracker_v2_english_state';
    let state = {
      currency: '₹',
      selectedMonth: '2026-10', // or 'all'
      formType: 'expense',      // 'expense' | 'income'
      selectedCategory: 'groceries',
      activeCategoryFilter: 'all',
      barChartMode: 'category', // 'category' | 'cashflow'
      transactions: []
    };

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.transactions)) {
            state.transactions = parsed.transactions;
            state.currency = parsed.currency || '₹';
            state.selectedMonth = parsed.selectedMonth || '2026-10';
            return;
          }
        }
      } catch (e) {
        // Ignore storage error in sandboxed context
      }
      state.transactions = getSampleTransactions();
    }

    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          currency: state.currency,
          selectedMonth: state.selectedMonth,
          transactions: state.transactions
        }));
      } catch (e) {
        // Ignore storage error
      }
    }

    // --- 4. Formatting Helpers ---
    function formatMoney(num) {
      const val = Number(num) || 0;
      const absFormatted = val.toLocaleString('en-IN', {
        minimumFractionDigits: val % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2
      });
      return state.currency + absFormatted;
    }

    function formatMonthLabel(ym) {
      if (ym === 'all') return 'All Time';
      const parts = ym.split('-');
      if (parts.length !== 2) return ym;
      const date = new Date(Number(parts[0]), Number(parts[1]) - 1, 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    function showToast(msg) {
      const banner = document.getElementById('toastBanner');
      const text = document.getElementById('toastMessage');
      text.textContent = msg;
      banner.classList.remove('hidden');
      banner.classList.add('flex');
      if (window._toastTimer) clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(() => {
        banner.classList.add('hidden');
        banner.classList.remove('flex');
      }, 2600);
    }

    // --- 5. Render Category Selector Pills in Form ---
    function renderCategoryPills() {
      const grid = document.getElementById('categoryPillsGrid');
      const label = document.getElementById('selectedCategoryLabel');
      const list = state.formType === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

      if (!list.some(c => c.id === state.selectedCategory)) {
        state.selectedCategory = list[0].id;
      }

      const currentObj = ALL_CATEGORIES_MAP[state.selectedCategory] || list[0];
      label.textContent = currentObj.icon + ' ' + currentObj.name;

      grid.innerHTML = '';
      list.forEach(cat => {
        const isSelected = cat.id === state.selectedCategory;
        const activeClass = isSelected
          ? (state.formType === 'expense' ? 'cat-pill-active' : 'cat-pill-income-active')
          : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100';

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `flex items-center gap-2 px-2.5 py-2 rounded-xl border text-left text-xs font-semibold transition cursor-pointer ${activeClass}`;
        btn.innerHTML = `
          <span class="text-base leading-none shrink-0">${cat.icon}</span>
          <span class="truncate">${cat.name}</span>
        `;
        btn.addEventListener('click', () => {
          state.selectedCategory = cat.id;
          renderCategoryPills();
        });
        grid.appendChild(btn);
      });
    }

    // --- 6. Switch Form Type (Expense vs Income) ---
    function setFormType(type) {
      state.formType = type;
      const expBtn = document.getElementById('typeExpenseBtn');
      const incBtn = document.getElementById('typeIncomeBtn');
      const submitBtn = document.getElementById('submitTransactionBtn');
      const submitText = document.getElementById('submitBtnText');
      const presetsBox = document.getElementById('quickPresetsContainer');
      const editingId = document.getElementById('editingTransactionId').value;

      if (type === 'expense') {
        expBtn.className = 'py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-1.5 bg-white text-rose-600 shadow-2xs';
        incBtn.className = 'py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900';
        submitBtn.className = 'w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition shadow-sm flex items-center justify-center gap-2 cursor-pointer';
        submitText.textContent = editingId ? 'Update Expense Entry' : 'Save Expense Entry';
        presetsBox.classList.remove('hidden');
      } else {
        incBtn.className = 'py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-1.5 bg-white text-emerald-600 shadow-2xs';
        expBtn.className = 'py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900';
        submitBtn.className = 'w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition shadow-sm flex items-center justify-center gap-2 cursor-pointer';
        submitText.textContent = editingId ? 'Update Income Entry' : 'Save Income Entry';
        presetsBox.classList.add('hidden');
      }
      renderCategoryPills();
    }

    // --- 7. Populate Category Filter Dropdown ---
    function populateCategoryFilterDropdown() {
      const sel = document.getElementById('filterCategorySelect');
      const currentVal = sel.value || 'all';
      sel.innerHTML = '<option value="all">All Categories</option>';

      const expGroup = document.createElement('optgroup');
      expGroup.label = 'Expense Categories';
      EXPENSE_CATEGORIES.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.icon} ${c.name}`;
        expGroup.appendChild(opt);
      });
      sel.appendChild(expGroup);

      const incGroup = document.createElement('optgroup');
      incGroup.label = 'Income Categories';
      INCOME_CATEGORIES.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.icon} ${c.name}`;
        incGroup.appendChild(opt);
      });
      sel.appendChild(incGroup);

      sel.value = currentVal;
    }

    // --- 8. Charts Initialization & Update ---
    let doughnutChart = null;
    let barChart = null;

    function updateCharts(categoryTotals, totalIncome, totalExpense, netSavings) {
      const dCtx = document.getElementById('categoryDoughnutChart').getContext('2d');
      const bCtx = document.getElementById('comparisonBarChart').getContext('2d');
      const emptyOverlay = document.getElementById('doughnutEmptyState');

      const activeExpenseCats = EXPENSE_CATEGORIES.filter(c => (categoryTotals[c.id]?.sum || 0) > 0);

      if (activeExpenseCats.length === 0) {
        emptyOverlay.classList.remove('hidden');
      } else {
        emptyOverlay.classList.add('hidden');
      }

      const dLabels = activeExpenseCats.map(c => c.name);
      const dData = activeExpenseCats.map(c => categoryTotals[c.id].sum);
      const dColors = activeExpenseCats.map(c => c.color);

      if (doughnutChart) {
        doughnutChart.destroy();
      }
      doughnutChart = new Chart(dCtx, {
        type: 'doughnut',
        data: {
          labels: dLabels,
          datasets: [{
            data: dData,
            backgroundColor: dColors,
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '64%',
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 12,
                padding: 12,
                font: { family: 'Inter', size: 11, weight: '500' }
              }
            },
            tooltip: {
              callbacks: {
                label: function(ctx) {
                  const val = ctx.parsed || 0;
                  const pct = totalExpense > 0 ? ((val / totalExpense) * 100).toFixed(1) : 0;
                  return ` ${ctx.label}: ${formatMoney(val)} (${pct}%)`;
                }
              }
            }
          }
        }
      });

      // Bar Chart: either Category Breakdown or Income vs Expense vs Savings
      if (barChart) {
        barChart.destroy();
      }

      if (state.barChartMode === 'category') {
        const sortedCats = [...EXPENSE_CATEGORIES].sort((a, b) => (categoryTotals[b.id]?.sum || 0) - (categoryTotals[a.id]?.sum || 0)).slice(0, 7);
        barChart = new Chart(bCtx, {
          type: 'bar',
          data: {
            labels: sortedCats.map(c => c.name.split(' ')[0]),
            datasets: [{
              label: 'Spent (' + state.currency + ')',
              data: sortedCats.map(c => categoryTotals[c.id]?.sum || 0),
              backgroundColor: sortedCats.map(c => c.color),
              borderRadius: 8,
              maxBarThickness: 38
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: ctx => ' ' + formatMoney(ctx.parsed.y)
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                ticks: { font: { family: 'Inter', size: 11 } }
              },
              x: {
                grid: { display: false },
                ticks: { font: { family: 'Inter', size: 11, weight: '500' } }
              }
            }
          }
        });
      } else {
        barChart = new Chart(bCtx, {
          type: 'bar',
          data: {
            labels: ['Total Income', 'Total Expenses', 'Net Savings'],
            datasets: [{
              label: 'Amount (' + state.currency + ')',
              data: [totalIncome, totalExpense, Math.max(0, netSavings)],
              backgroundColor: ['#10b981', '#f43f5e', '#4f46e5'],
              borderRadius: 10,
              maxBarThickness: 54
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: ctx => ' ' + formatMoney(ctx.parsed.y)
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                ticks: { font: { family: 'Inter', size: 11 } }
              },
              x: {
                grid: { display: false },
                ticks: { font: { family: 'Inter', size: 12, weight: '600' } }
              }
            }
          }
        });
      }
    }

    // --- 9. Master Calculation & UI Render Function ---
    function renderAll() {
      // Update currency symbols
      document.querySelectorAll('.currency-symbol').forEach(el => {
        el.textContent = state.currency;
      });
      document.getElementById('currencySelector').value = state.currency;

      // Update Period Selector UI
      const allBtn = document.getElementById('viewAllMonthsBtn');
      const monthInput = document.getElementById('monthSelector');
      if (state.selectedMonth === 'all') {
        allBtn.className = 'text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-600 text-white shadow-2xs transition';
      } else {
        allBtn.className = 'text-xs font-medium px-2.5 py-1 rounded-md text-slate-600 hover:text-slate-900 hover:bg-white transition';
        monthInput.value = state.selectedMonth;
      }
      document.getElementById('periodLabelBadge').textContent = formatMonthLabel(state.selectedMonth);

      // Filter transactions for the selected month (or all)
      const periodTransactions = state.transactions.filter(tx => {
        if (state.selectedMonth === 'all') return true;
        return (tx.date || '').startsWith(state.selectedMonth);
      });

      // Calculate Income, Expenses, Savings, and Per-Category Totals
      let totalIncome = 0;
      let incomeCount = 0;
      let totalExpense = 0;
      let expenseCount = 0;

      const categoryTotals = {};
      EXPENSE_CATEGORIES.forEach(c => {
        categoryTotals[c.id] = { sum: 0, count: 0 };
      });

      periodTransactions.forEach(tx => {
        const amt = Number(tx.amount) || 0;
        if (tx.type === 'income') {
          totalIncome += amt;
          incomeCount += 1;
        } else {
          totalExpense += amt;
          expenseCount += 1;
          const catId = categoryTotals[tx.category] ? tx.category : 'other';
          categoryTotals[catId].sum += amt;
          categoryTotals[catId].count += 1;
        }
      });

      const netSavings = totalIncome - totalExpense;
      const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100) : 0;
      const spendingRatio = totalIncome > 0 ? ((totalExpense / totalIncome) * 100) : 0;

      // Update Top Summary Cards
      document.getElementById('summaryIncomeAmount').textContent = formatMoney(totalIncome);
      document.getElementById('summaryIncomeSubtext').textContent = `${incomeCount} income ${incomeCount === 1 ? 'entry' : 'entries'}`;

      document.getElementById('summaryExpenseAmount').textContent = formatMoney(totalExpense);
      document.getElementById('summaryExpenseCount').textContent = `${expenseCount} ${expenseCount === 1 ? 'expense' : 'expenses'} recorded`;

      // Daily average calculation
      const daysDivisor = state.selectedMonth === '2026-10' ? 15 : 30;
      const dailyAvg = expenseCount > 0 ? (totalExpense / daysDivisor) : 0;
      document.getElementById('summaryDailyAverage').textContent = `Avg: ${formatMoney(Math.round(dailyAvg))}/day`;

      const savingsEl = document.getElementById('summarySavingsAmount');
      savingsEl.textContent = (netSavings < 0 ? '-' : '') + formatMoney(Math.abs(netSavings));
      savingsEl.className = `text-2xl sm:text-3xl font-extrabold mt-3 ${netSavings >= 0 ? 'text-indigo-700' : 'text-rose-600'}`;

      const rateBadge = document.getElementById('summarySavingsRateBadge');
      if (totalIncome > 0) {
        rateBadge.textContent = `${savingsRate.toFixed(1)}% saved`;
        rateBadge.className = `font-semibold px-2 py-0.5 rounded-md ${netSavings >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`;
      } else {
        rateBadge.textContent = 'Add income to track %';
        rateBadge.className = 'font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600';
      }

      document.getElementById('spendingRatioPercent').textContent = totalIncome > 0
        ? `${Math.min(999, spendingRatio).toFixed(1)}% of Income`
        : 'Set Income';

      const barEl = document.getElementById('spendingProgressBar');
      const clampedWidth = totalIncome > 0 ? Math.min(100, Math.max(0, spendingRatio)) : (totalExpense > 0 ? 100 : 0);
      barEl.style.width = `${clampedWidth}%`;
      if (spendingRatio > 90) {
        barEl.className = 'bg-rose-600 h-full rounded-full transition-all duration-300';
      } else if (spendingRatio > 75) {
        barEl.className = 'bg-amber-500 h-full rounded-full transition-all duration-300';
      } else {
        barEl.className = 'bg-indigo-600 h-full rounded-full transition-all duration-300';
      }

      // Find top expense category
      let topCat = null;
      let topSum = 0;
      EXPENSE_CATEGORIES.forEach(c => {
        if (categoryTotals[c.id].sum > topSum) {
          topSum = categoryTotals[c.id].sum;
          topCat = c;
        }
      });
      document.getElementById('topCategoryHighlight').textContent = topCat
        ? `Highest: ${topCat.icon} ${topCat.name} (${formatMoney(topSum)})`
        : 'Highest: None yet';
      document.getElementById('remainingSpendableText').textContent = netSavings >= 0
        ? `Saved: ${formatMoney(netSavings)}`
        : `Overspent: ${formatMoney(Math.abs(netSavings))}`;

      // Update Category-Wise Breakdown List (Every Category Separately + Grand Total)
      const breakdownContainer = document.getElementById('categoryBreakdownList');
      breakdownContainer.innerHTML = '';

      const sortedCategories = [...EXPENSE_CATEGORIES].sort((a, b) => {
        return categoryTotals[b.id].sum - categoryTotals[a.id].sum;
      });

      const clearFilterBtn = document.getElementById('clearCategoryFilterBtn');
      if (state.activeCategoryFilter !== 'all') {
        clearFilterBtn.classList.remove('hidden');
      } else {
        clearFilterBtn.classList.add('hidden');
      }

      sortedCategories.forEach(cat => {
        const info = categoryTotals[cat.id];
        const pct = totalExpense > 0 ? ((info.sum / totalExpense) * 100) : 0;
        const isFiltered = state.activeCategoryFilter === cat.id;

        const row = document.createElement('div');
        row.className = `p-3 rounded-xl border transition cursor-pointer ${
          isFiltered
            ? 'border-indigo-500 bg-indigo-50/60 ring-1 ring-indigo-300'
            : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
        }`;
        row.innerHTML = `
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0" style="background-color: ${cat.bg}">${cat.icon}</span>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <p class="text-xs sm:text-sm font-bold text-slate-900 truncate">${cat.name}</p>
                  <span class="text-[11px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">${info.count} ${info.count === 1 ? 'item' : 'items'}</span>
                </div>
                <p class="text-[11px] text-slate-400 truncate">${cat.desc}</p>
              </div>
            </div>
            <div class="text-right shrink-0">
              <p class="text-sm sm:text-base font-extrabold text-slate-900">${formatMoney(info.sum)}</p>
              <p class="text-[11px] font-semibold text-slate-500">${pct.toFixed(1)}% of expenses</p>
            </div>
          </div>
          <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div class="h-full rounded-full transition-all duration-300" style="width: ${Math.min(100, pct)}%; background-color: ${cat.color}"></div>
          </div>
        `;
        row.addEventListener('click', () => {
          state.activeCategoryFilter = state.activeCategoryFilter === cat.id ? 'all' : cat.id;
          document.getElementById('filterCategorySelect').value = state.activeCategoryFilter;
          renderAll();
        });
        breakdownContainer.appendChild(row);
      });

      // Update Unified Grand Total Footer inside Category Breakdown Card
      document.getElementById('tableTotalIncome').textContent = formatMoney(totalIncome);
      document.getElementById('tableTotalExpense').textContent = formatMoney(totalExpense);
      const netEl = document.getElementById('tableNetSavings');
      netEl.textContent = (netSavings < 0 ? '-' : '') + formatMoney(Math.abs(netSavings));
      netEl.className = `text-base sm:text-lg font-extrabold mt-0.5 block ${netSavings >= 0 ? 'text-indigo-700' : 'text-rose-600'}`;

      // Update Charts
      updateCharts(categoryTotals, totalIncome, totalExpense, netSavings);

      // Update Individual Transactions Table
      renderTransactionsTable(periodTransactions);
    }

    // --- 10. Render Filtered Transactions Table ---
    function renderTransactionsTable(periodTransactions) {
      const typeFilter = document.getElementById('filterTypeSelect').value;
      const catFilter = document.getElementById('filterCategorySelect').value;
      const sortOrder = document.getElementById('sortOrderSelect').value;
      const query = (document.getElementById('searchTransactionsInput').value || '').trim().toLowerCase();

      let filtered = periodTransactions.filter(tx => {
        if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
        if (catFilter !== 'all' && tx.category !== catFilter) return false;
        if (query) {
          const catObj = ALL_CATEGORIES_MAP[tx.category];
          const catName = catObj ? catObj.name.toLowerCase() : '';
          const noteStr = (tx.note || '').toLowerCase();
          const modeStr = (tx.mode || '').toLowerCase();
          if (!catName.includes(query) && !noteStr.includes(query) && !modeStr.includes(query)) {
            return false;
          }
        }
        return true;
      });

      filtered.sort((a, b) => {
        if (sortOrder === 'date-desc') return (b.date || '').localeCompare(a.date || '');
        if (sortOrder === 'date-asc') return (a.date || '').localeCompare(b.date || '');
        if (sortOrder === 'amount-desc') return (Number(b.amount) || 0) - (Number(a.amount) || 0);
        if (sortOrder === 'amount-asc') return (Number(a.amount) || 0) - (Number(b.amount) || 0);
        return 0;
      });

      const tbody = document.getElementById('transactionsTableBody');
      const emptyState = document.getElementById('transactionsEmptyState');
      tbody.innerHTML = '';

      let filteredInc = 0;
      let filteredExp = 0;

      if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
      } else {
        emptyState.classList.add('hidden');
      }

      filtered.forEach(tx => {
        const amt = Number(tx.amount) || 0;
        if (tx.type === 'income') filteredInc += amt;
        else filteredExp += amt;

        const cat = ALL_CATEGORIES_MAP[tx.category] || { name: 'Other', icon: '📦', bg: '#f1f5f9' };
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50/90 transition';
        tr.innerHTML = `
          <td class="py-3 px-3 whitespace-nowrap">
            <div class="inline-flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style="background-color: ${cat.bg}">${cat.icon}</span>
              <span class="font-semibold text-slate-800 text-xs sm:text-sm">${cat.name}</span>
            </div>
          </td>
          <td class="py-3 px-3 text-xs sm:text-sm text-slate-700 font-medium">${escapeHtml(tx.note || cat.name)}</td>
          <td class="py-3 px-3 whitespace-nowrap text-xs text-slate-500">${tx.date}</td>
          <td class="py-3 px-3 whitespace-nowrap">
            <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">${escapeHtml(tx.mode || 'UPI')}</span>
          </td>
          <td class="py-3 px-3 whitespace-nowrap text-right font-bold text-xs sm:text-sm ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}">
            ${tx.type === 'income' ? '+' : '-'}${formatMoney(amt)}
          </td>
          <td class="py-3 px-3 whitespace-nowrap text-right">
            <div class="inline-flex items-center gap-1">
              <button type="button" class="edit-tx-btn text-xs font-medium text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-md transition" data-id="${tx.id}">Edit</button>
              <button type="button" class="delete-tx-btn text-xs font-medium text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-md transition" data-id="${tx.id}">Delete</button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });

      // Attach Edit and Delete handlers
      tbody.querySelectorAll('.edit-tx-btn').forEach(btn => {
        btn.addEventListener('click', () => startEditTransaction(btn.getAttribute('data-id')));
      });
      tbody.querySelectorAll('.delete-tx-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteTransaction(btn.getAttribute('data-id')));
      });

      document.getElementById('filteredCountText').textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'}`;
      document.getElementById('filteredIncomeSum').textContent = `Filtered Income: ${formatMoney(filteredInc)}`;
      document.getElementById('filteredExpenseSum').textContent = `Filtered Expenses: ${formatMoney(filteredExp)}`;
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    // --- 11. Add, Edit & Delete Handlers ---
    function startEditTransaction(id) {
      const tx = state.transactions.find(t => t.id === id);
      if (!tx) return;

      document.getElementById('editingTransactionId').value = tx.id;
      document.getElementById('formHeading').textContent = 'Edit Entry';
      document.getElementById('cancelEditBtn').classList.remove('hidden');

      setFormType(tx.type);
      state.selectedCategory = tx.category;
      renderCategoryPills();

      document.getElementById('amountInput').value = tx.amount;
      document.getElementById('dateInput').value = tx.date;
      document.getElementById('noteInput').value = tx.note;
      document.getElementById('paymentModeInput').value = tx.mode || 'UPI';

      document.getElementById('amountInput').focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function resetFormState() {
      document.getElementById('editingTransactionId').value = '';
      document.getElementById('formHeading').textContent = 'Add New Entry';
      document.getElementById('cancelEditBtn').classList.add('hidden');
      document.getElementById('amountInput').value = '';
      document.getElementById('noteInput').value = '';
      setFormType(state.formType);
    }

    function deleteTransaction(id) {
      state.transactions = state.transactions.filter(t => t.id !== id);
      if (document.getElementById('editingTransactionId').value === id) {
        resetFormState();
      }
      saveState();
      renderAll();
      showToast('Entry deleted & totals recalculated.');
    }

    // --- 12. CSV Export ---
    function exportToCsv() {
      const rows = [
        ['Date', 'Type', 'Category', 'Description', 'Payment Mode', 'Amount (' + state.currency + ')']
      ];
      state.transactions.forEach(tx => {
        const cat = ALL_CATEGORIES_MAP[tx.category]?.name || tx.category;
        rows.push([
          tx.date,
          tx.type.toUpperCase(),
          cat,
          `"${String(tx.note || '').replace(/"/g, '""')}"`,
          tx.mode || 'UPI',
          tx.amount
        ]);
      });

      const csvContent = rows.map(r => r.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `expense_tracker_${state.selectedMonth}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Exported CSV report!');
    }

    // --- 13. Event Listeners Setup ---
    window.addEventListener('DOMContentLoaded', () => {
      loadState();
      populateCategoryFilterDropdown();
      setFormType('expense');
      renderAll();

      // Type Switcher
      document.getElementById('typeExpenseBtn').addEventListener('click', () => setFormType('expense'));
      document.getElementById('typeIncomeBtn').addEventListener('click', () => setFormType('income'));

      // Quick Set Income button on top KPI card
      document.getElementById('quickSetIncomeBtn').addEventListener('click', () => {
        setFormType('income');
        state.selectedCategory = 'salary';
        renderCategoryPills();
        document.getElementById('noteInput').value = 'Monthly Salary / Income';
        document.getElementById('amountInput').focus();
      });

      // 1-Click Quick Preset Chips
      document.querySelectorAll('.preset-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          setFormType('expense');
          state.selectedCategory = chip.getAttribute('data-preset-cat');
          renderCategoryPills();
          document.getElementById('noteInput').value = chip.getAttribute('data-preset-note') || '';
          document.getElementById('amountInput').focus();
        });
      });

      // Cancel Edit
      document.getElementById('cancelEditBtn').addEventListener('click', () => {
        resetFormState();
      });

      // Form Submit
      document.getElementById('transactionForm').addEventListener('submit', e => {
        e.preventDefault();
        const amt = parseFloat(document.getElementById('amountInput').value);
        if (isNaN(amt) || amt <= 0) {
          showToast('Please enter a valid positive amount.');
          return;
        }
        const dateVal = document.getElementById('dateInput').value || '2026-10-15';
        const catObj = ALL_CATEGORIES_MAP[state.selectedCategory];
        const noteVal = document.getElementById('noteInput').value.trim() || (catObj ? catObj.name : 'Entry');
        const modeVal = document.getElementById('paymentModeInput').value || 'UPI';
        const editingId = document.getElementById('editingTransactionId').value;

        if (editingId) {
          const idx = state.transactions.findIndex(t => t.id === editingId);
          if (idx !== -1) {
            state.transactions[idx] = {
              id: editingId,
              type: state.formType,
              category: state.selectedCategory,
              amount: amt,
              note: noteVal,
              date: dateVal,
              mode: modeVal
            };
          }
          showToast('Entry updated! All totals recalculated.');
        } else {
          state.transactions.unshift({
            id: 'tx_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            type: state.formType,
            category: state.selectedCategory,
            amount: amt,
            note: noteVal,
            date: dateVal,
            mode: modeVal
          });
          showToast(state.formType === 'income' ? 'Income added! Savings updated.' : 'Expense added! Totals updated.');
        }

        // Ensure selectedMonth matches the added entry's month if not viewing 'all'
        if (state.selectedMonth !== 'all' && dateVal.slice(0, 7) !== state.selectedMonth) {
          state.selectedMonth = dateVal.slice(0, 7);
        }

        resetFormState();
        saveState();
        renderAll();
      });

      // Month Selector & All Time button
      document.getElementById('monthSelector').addEventListener('change', e => {
        if (e.target.value) {
          state.selectedMonth = e.target.value;
          saveState();
          renderAll();
        }
      });

      document.getElementById('viewAllMonthsBtn').addEventListener('click', () => {
        state.selectedMonth = state.selectedMonth === 'all' ? (document.getElementById('monthSelector').value || '2026-10') : 'all';
        saveState();
        renderAll();
      });

      // Currency Selector
      document.getElementById('currencySelector').addEventListener('change', e => {
        state.currency = e.target.value;
        saveState();
        renderAll();
      });

      // Clear Category Filter Button
      document.getElementById('clearCategoryFilterBtn').addEventListener('click', () => {
        state.activeCategoryFilter = 'all';
        document.getElementById('filterCategorySelect').value = 'all';
        renderAll();
      });

      // Bar Chart Mode Switcher
      const barCatBtn = document.getElementById('barModeCategoryBtn');
      const barCashBtn = document.getElementById('barModeCashflowBtn');
      barCatBtn.addEventListener('click', () => {
        state.barChartMode = 'category';
        barCatBtn.className = 'px-2.5 py-1 text-xs font-semibold rounded-md bg-white text-slate-900 shadow-2xs transition';
        barCashBtn.className = 'px-2.5 py-1 text-xs font-semibold rounded-md text-slate-600 hover:text-slate-900 transition';
        renderAll();
      });
      barCashBtn.addEventListener('click', () => {
        state.barChartMode = 'cashflow';
        barCashBtn.className = 'px-2.5 py-1 text-xs font-semibold rounded-md bg-white text-slate-900 shadow-2xs transition';
        barCatBtn.className = 'px-2.5 py-1 text-xs font-semibold rounded-md text-slate-600 hover:text-slate-900 transition';
        renderAll();
      });

      // Table Filters
      document.getElementById('filterTypeSelect').addEventListener('change', () => renderAll());
      document.getElementById('filterCategorySelect').addEventListener('change', e => {
        state.activeCategoryFilter = e.target.value;
        renderAll();
      });
      document.getElementById('sortOrderSelect').addEventListener('change', () => renderAll());
      document.getElementById('searchTransactionsInput').addEventListener('input', () => renderAll());

      // Export CSV
      document.getElementById('exportCsvBtn').addEventListener('click', exportToCsv);


      // Install App Modal & PWA Install Prompt
      let deferredInstallPrompt = null;
      const installModal = document.getElementById('installAppModal');
      const nativeInstallBox = document.getElementById('nativeInstallPromptBox');

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredInstallPrompt = e;
        if (nativeInstallBox) {
          nativeInstallBox.classList.remove('hidden');
        }
      });

      document.getElementById('openInstallModalBtn').addEventListener('click', async () => {
        if (deferredInstallPrompt) {
          deferredInstallPrompt.prompt();
          const { outcome } = await deferredInstallPrompt.userChoice;
          if (outcome === 'accepted') {
            showToast('Expense Tracker installed successfully!');
            deferredInstallPrompt = null;
          }
          return;
        }
        installModal.classList.remove('hidden');
      });

      document.getElementById('triggerNativeInstallBtn').addEventListener('click', async () => {
        if (!deferredInstallPrompt) {
          showToast('Use your browser menu to Install or Add to Home Screen.');
          return;
        }
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        if (outcome === 'accepted') {
          showToast('Expense Tracker installed!');
          deferredInstallPrompt = null;
          nativeInstallBox.classList.add('hidden');
          installModal.classList.add('hidden');
        }
      });

      document.getElementById('closeInstallModalBtn').addEventListener('click', () => {
        installModal.classList.add('hidden');
      });
      document.getElementById('doneInstallModalBtn').addEventListener('click', () => {
        installModal.classList.add('hidden');
      });

      // Register Service Worker when hosted over HTTP/HTTPS (e.g. GitHub Pages)
      if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      }

      // Manage Data Modal
      const modal = document.getElementById('manageDataModal');
      document.getElementById('openResetModalBtn').addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
      document.getElementById('closeManageModalBtn').addEventListener('click', () => {
        modal.classList.add('hidden');
      });
      document.getElementById('cancelManageModalBtn').addEventListener('click', () => {
        modal.classList.add('hidden');
      });
      document.getElementById('confirmClearAllBtn').addEventListener('click', () => {
        state.transactions = [];
        saveState();
        renderAll();
        modal.classList.add('hidden');
        showToast('All entries cleared! Ready for your own entries.');
      });
      document.getElementById('confirmLoadSampleBtn').addEventListener('click', () => {
        state.transactions = getSampleTransactions();
        state.selectedMonth = '2026-10';
        saveState();
        renderAll();
        modal.classList.add('hidden');
        showToast('Sample monthly data loaded!');
      });
    });
