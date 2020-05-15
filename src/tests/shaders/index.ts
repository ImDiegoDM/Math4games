import frag from "./frag";
import vert from "./vertex";
import redFrag from "./redFrag"

export default {
  frag:{
    'baseFrag': frag,
    'redFrag': redFrag
  },
  vertex:{
    'baseVertex': vert
  }
}