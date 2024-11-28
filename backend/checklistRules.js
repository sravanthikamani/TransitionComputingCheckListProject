

const checklistRules = {
  'Valuation Fee Paid': data => data.isValuationFeePaid === true,
  'UK Resident': data => data.isUkResident === true,
  'Risk Rating Medium': data => data.riskRating === 'Medium',
  'LTV Below 60%': data => {
    const ltv = (data.loanRequired / data.purchasePrice) * 100;
    return ltv < 60;
  },
};

module.exports = checklistRules;
