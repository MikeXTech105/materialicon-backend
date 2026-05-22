const startOfDay = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfWeek = (date = new Date()) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.getFullYear(), date.getMonth(), diff);
};

const startOfMonth = (date = new Date()) => new Date(date.getFullYear(), date.getMonth(), 1);

const monthsAgo = (count, date = new Date()) => new Date(date.getFullYear(), date.getMonth() - count, 1);

const daysAgo = (count, date = new Date()) => {
  const target = startOfDay(date);
  target.setDate(target.getDate() - count);
  return target;
};

module.exports = {
  daysAgo,
  monthsAgo,
  startOfDay,
  startOfWeek,
  startOfMonth
};
