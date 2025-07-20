export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month === 1 && day === 1) return `${year}년`;
  if (day === 1) return `${year}년 ${month}월`;

  return `${year}년 ${month}월 ${day}일`;
};

export const setPageTitle = (title) => {
  const titleElement = document.getElementsByTagName('title')[0];
  titleElement.textContent = title || process.env.REACT_APP_NAME;
};
