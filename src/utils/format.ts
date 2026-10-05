export const formatMetical = (amount: number): string => {
  // Format with thousand separator like 2.850 MT
  return new Intl.NumberFormat('pt-MZ').format(amount) + ' MT';
};
