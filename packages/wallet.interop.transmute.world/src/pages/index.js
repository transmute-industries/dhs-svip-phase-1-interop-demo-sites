import HomePage from "./HomePage";
import KeystorePage from "./KeystorePage";
import ChapiWalletStore from "./chapi/wallet/store";
import ChapiWalletGet from "./chapi/wallet/get";

export const PAGES = [
  { path: "/", exact: true, component: HomePage },
  { path: "/chapi/wallet/store", exact: true, component: ChapiWalletStore },
  { path: "/chapi/wallet/get", exact: true, component: ChapiWalletGet },
  { path: "/keystore", exact: true, component: KeystorePage }
];
