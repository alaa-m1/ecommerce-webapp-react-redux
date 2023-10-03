export const useCheckOneDayPassed = () => {
  var date = new Date().toLocaleDateString();

  if (localStorage.yourapp_date === date) return false;

  localStorage.yourapp_date = date;
  return true;
};
