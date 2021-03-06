export const calculateSum = () => {
  let sum = 0;
  const sumItems = document.querySelectorAll('.order__item-price');
  sumItems.forEach(item => {
    const price = +item?.dataset.price;
    if (!isNaN(price)) {
      sum += price;
    }
  });

  return sum;
};

export const updateSum = (sum) => {
  const totalSum = document.querySelector('.order__total');
  if (!totalSum) {
    return;
  }
  totalSum.dataset.total = sum;
};

export const removeFromCart = (btn) => {
  const row = btn.closest('.order__item');
  row.classList.add('order__item--collapse');
  console.log('row: ', row);
  row.addEventListener('transitionend', () => {
    row.remove();
    updateSum(calculateSum());
  }, {once: true});
};
