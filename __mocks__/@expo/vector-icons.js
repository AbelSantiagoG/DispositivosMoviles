import React from 'react';

const createIconSet = () => {
  return ({ name, size, color, ...props }) => (
    <div data-testid={`icon-${name}`} style={{ width: size, height: size, color }} {...props} />
  );
};

export const Ionicons = createIconSet();
export const FontAwesome5 = createIconSet();
export const Feather = createIconSet();
export const AntDesign = createIconSet();
export const FontAwesome = createIconSet(); 