import React from 'react';

export type DrawerToggleMenu = (shouldBeOpen?: false | true | undefined) => (event: (React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>)) => undefined
