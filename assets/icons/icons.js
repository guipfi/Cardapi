import React from 'react';
import Svg, {Path} from "react-native-svg";


// Icone da Home sem seleção
export const HomeOutline = () => {
    return (
      <Svg width={30} height={30} style={{position:'absolute',bottom:"35%"}}  fill="none" viewBox="0 0 30 20">
        <Path
          stroke="#141414"
          d="M11.4 17.962v-5.987h4.2v5.987h5.25V9.98H24L13.5 1 3 9.98h3.15v7.982h5.25z"
        />
      </Svg>
    );
}

// Icone da Lupa selecionada
export const Lupa = () =>{
    return (
        <Svg width={30} height={30} fill="none" viewBox="0 0 20 30">
          <Path
            fill="#141414"
            stroke="#141414"
            d="M13.5 12h-.79l-.28-.27A6.471 6.471 0 0014 7.5 6.5 6.5 0 107.5 14c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L18.49 17l-4.99-5v0zm-6 0C5.01 12 3 9.99 3 7.5S5.01 3 7.5 3 12 5.01 12 7.5 9.99 12 7.5 12z"
          />
        </Svg>
      );
}

// Icone do QRCODE sem seleção
export const QrCode = () => {
    return (
        <Svg width={20} height={20} style={{position:'absolute',bottom:'43.08%'}} fill="none" viewBox="0 0 20 20">
          <Path
            fill="#F1C552"
            d="M0 8.889h2.222v2.222H0V8.89zm8.889-6.667h2.222v4.445H8.89V2.222zM6.667 8.89h4.444v4.444H8.89v-2.222H6.667V8.89zm6.666 0h2.223v2.222h2.222V8.89H20v2.222h-2.222v2.222H20v4.445h-2.222V20h-2.222v-2.222H11.11V20H8.89v-4.444h4.444v-2.223h2.223v-2.222h-2.223V8.89zm4.445 8.889v-4.445h-2.222v4.445h2.222zM13.333 0H20v6.667h-6.667V0zm2.223 2.222v2.222h2.222V2.222h-2.222zM0 0h6.667v6.667H0V0zm2.222 2.222v2.222h2.222V2.222H2.222zM0 13.333h6.667V20H0v-6.667zm2.222 2.223v2.222h2.222v-2.222H2.222z"
          />
        </Svg>
      );
}