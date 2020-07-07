import React from 'react';

// import CameraAltIcon from '@material-ui/icons/CameraAlt';
import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CodeIcon from "@material-ui/icons/Code";

import history from '../../store/history';

const rightHandAccountMenu = [
  // {
  //   badgeContent: 0,
  //   ariaLabel: 'scan qr code',
  //   icon: <CameraAltIcon />,
  //   label: 'Scan QR Code',
  //   displaySmUp: true,
  // },
  {
    badgeContent: 0,
    ariaLabel: "home",
    icon: <HomeIcon />,
    label: "Home",
    onClick: () => {
      history.push("/");
    }
  },
  // {
  //   badgeContent: 0,
  //   ariaLabel: "keystore",
  //   icon: <VpnKeyIcon />,
  //   label: "Keystore",
  //   onClick: () => {
  //     history.push("/keystore");
  //   }
  // },
  {
    badgeContent: 0,
    label: "Source Code",
    ariaLabel: "source",
    icon: <CodeIcon />,
    onClick: () => {
      window.open("https://github.com/transmute-industries/wallet.interop.transmute.world", "_blank");
    }
  }
];

export default rightHandAccountMenu;
