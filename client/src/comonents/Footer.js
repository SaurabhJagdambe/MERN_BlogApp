import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#f8f8f8',
        padding: '20px',
        textAlign: 'center',
        position: 'fixed',
        bottom: '0',
        width: '100%',
        marginTop: '20px', // Add some space between content and footer
        
      }}
    >
      <p style={{ margin: '0' }}>© 2023 Saurabh. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
