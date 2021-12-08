/* globals
libWrapper
*/

'use strict';

// Patches

import { MODULE_ID } from "./const.js";
import { walledTemplateGetCircleShape } from "./getCircleShape.js";
import { walledTemplateGetConeShape } from "./getConeShape.js";
import { walledTemplateGetRectShape } from "./getRectShape.js";
import { walledTemplateGetRayShape }  from "./getRayShape.js";

export function registerWalledTemplates() {
  libWrapper.register(MODULE_ID, `MeasuredTemplate.prototype._getCircleShape`, walledTemplateGetCircleShape, `MIXED`);
  libWrapper.register(MODULE_ID, `MeasuredTemplate.prototype._getConeShape`, walledTemplateGetConeShape, `MIXED`);
  libWrapper.register(MODULE_ID, `MeasuredTemplate.prototype._getRectShape`, walledTemplateGetRectShape, `WRAPPER`);
  libWrapper.register(MODULE_ID, `MeasuredTemplate.prototype._getRayShape`, walledTemplateGetRayShape, `WRAPPER`);
}



/**
 * Add getter methods to retrieve coordinates from a normalized rectangle
 * Assists with adding walls for the rectangle and ray templates
 */
Object.defineProperty(NormalizedRectangle.prototype, "points", {
  get() { 
    const x_right  = this.x + this.width;
    const y_bottom = this.y + this.height;
    return {
      topLeft:     { x: this.x,  y: this.y },
      topRight:    { x: x_right, y: this.y },
      bottomRight: { x: x_right, y: y_bottom },
      bottomLeft:  { x: this.x,  y: y_bottom }
    };
  }
});