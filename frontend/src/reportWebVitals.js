/**
 * "StAuth10244: I Alen Varghese Cheruvally Kunjumon, 000837873 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
 *
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
