// checklistRules.js

/**
 * Checklist Rules Module
 * ======================
 * This file defines the rules for processing checklist items. Each rule is represented as
 * a function that takes the `externalData` object and returns a boolean indicating
 * whether the rule is passed or failed.
 *
 * Adding a New Rule:
 * - Add a new key to the `checklistRules` object where the key is the name of the checklist item.
 * - Define a function as the value that implements the rule logic.
 *
 * Example:
 * 'New Rule Name': data => { return data.someProperty === 'someValue'; }
 */

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
