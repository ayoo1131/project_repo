// StatusDropdownPortal.js
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const portalRoot = document.getElementById('portal-root');
  return portalRoot ? createPortal(children, portalRoot) : null;
};

export default Portal;
