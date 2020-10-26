import L from 'leaflet';
import { Textinput, textinput } from './control';

L.Util.extend(Textinput);
export default Textinput;

L.Util.extend(L.Control, {
  Textinput: Textinput,
  textinput: textinput
});
