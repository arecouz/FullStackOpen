import { useState, forwardRef, useImperativeHandle } from 'react';

const Toggleable = forwardRef(({ buttonLabel, children}, ref) => {
  const [toggle, setToggle] = useState(false);
  const switchToggle = () => {
    setToggle(!toggle);
  };
  useImperativeHandle(ref, () => {
    console.log('visibility toggled')
    return {
      switchToggle,
    };
  });
  return (
    <div>
      <div style={{ display: !toggle ? '' : 'none' }}>
        <button onClick={switchToggle}>{buttonLabel}</button>
      </div>
      <div style={{ display: toggle ? '' : 'none' }}>
        {children}
        <br></br>
        <button className="p-2 bg-gray-900 text-white w-40" onClick={switchToggle}>Cancel</button>
      </div>
    </div>
  );
});

export default Toggleable;


