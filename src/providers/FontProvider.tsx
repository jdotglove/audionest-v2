import { Fraunces } from 'next/font/google';
import React, { ReactNode } from 'react';

// If loading a variable font, you don't need to specify the font weight
const fraunces = Fraunces({
  display: 'swap',
  subsets: ['latin'],
});

class FontProvider extends React.PureComponent<{
  children: ReactNode
}> {
  render() {
    return (
      <span className={fraunces.className}>{this.props.children}</span>
    );
  }
}

export default FontProvider;
