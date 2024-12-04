export const generateId = () => {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      return "dots";
    case 1:
      return "lines";
    case 2:
      return "bars";
    default:
      return "pattern";
  }
};

export const isAuthenticated = () => {
  const res = localStorage.getItem("token");

  if(res) return true;
  return false;
};