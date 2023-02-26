/* globals
game
*/

"use strict";

import { log } from "./util.js";
import { MODULE_ID } from "./const.js";

export const SETTINGS = {
  DEFAULT_WALLED: "default-to-walled",
  DEFAULT_SPREAD: "default-to-spread",
  DEFAULT_BOUNCE: "default-to-bounce",

  DIAGONAL_SCALING: {
    RAY: "diagonal-scaling-ray",
    CONE: "diagonal-scaling-cone",
    CIRCLE: "diagonal-scaling-circle"
  },

  AUTOTARGET: {
    ENABLED: "autotarget-enabled",
    MENU: "autotarget-menu",
    METHOD: "autotarget-method",
    AREA: "autotarget-area",
    CHOICES: {
      NO: "no",
      TOGGLE_OFF: "toggle-off",
      TOGGLE_ON: "toggle-on",
      YES: "yes"
    },

    METHODS: {
      CENTER: "center",
      OVERLAP: "overlap"
    }
  }
};

export function getSetting(settingName) {
  return game.settings.get(MODULE_ID, settingName);
}

export async function toggleSetting(settingName) {
  const curr = getSetting(settingName);
  return await game.settings.set(MODULE_ID, settingName, !curr);
}

export async function setSetting(settingName, value) {
  return await game.settings.set(MODULE_ID, settingName, value);
}

export function registerSettings() {
  log("Registering walled template switch");

  game.settings.register(MODULE_ID, SETTINGS.DEFAULT_WALLED, {
    name: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DEFAULT_WALLED}.Name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DEFAULT_WALLED}.Hint`),
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  game.settings.register(MODULE_ID, SETTINGS.DEFAULT_SPREAD, {
    name: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DEFAULT_SPREAD}.Name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DEFAULT_SPREAD}.Hint`),
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  game.settings.register(MODULE_ID, SETTINGS.DEFAULT_BOUNCE, {
    name: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DEFAULT_BOUNCE}.Name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DEFAULT_BOUNCE}.Hint`),
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  game.settings.register(MODULE_ID, SETTINGS.AUTOTARGET.ENABLED, {
    name: "Enable autotargeting",
    config: false,
    scope: "client",
    type: Boolean,
    default: false
  });

  const METHODS = SETTINGS.AUTOTARGET.METHODS;
  game.settings.register(MODULE_ID, SETTINGS.AUTOTARGET.METHOD, {
    name: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.METHOD}.Name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.METHOD}.Hint`),
    scope: "world",
    config: true,
    default: "center",
    type: String,
    choices: {
      [SETTINGS.AUTOTARGET.METHODS.CENTER]: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.METHOD}.Method.${METHODS.CENTER}`),
      [SETTINGS.AUTOTARGET.METHODS.OVERLAP]: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.METHOD}.Method.${METHODS.OVERLAP}`)
    }
  }); // See class TokenLayer.targetObjects

  game.settings.register(MODULE_ID, SETTINGS.AUTOTARGET.AREA, {
    name: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.AREA}.Name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.AREA}.Hint`),
    range: {
      max: 1,
      min: 0,
      step: 0.01
    },
    type: Number,
    default: 0,
    scope: "world",
    config: true
  });

  const CHOICES = SETTINGS.AUTOTARGET.CHOICES;
  game.settings.register(MODULE_ID, SETTINGS.AUTOTARGET.MENU, {
    name: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.MENU}.Name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.MENU}.Hint`),
    scope: "client",
    config: true,
    type: String,
    choices: {
      [SETTINGS.AUTOTARGET.CHOICES.NO]: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.MENU}.Choice.${CHOICES.NO}`),
      [SETTINGS.AUTOTARGET.CHOICES.TOGGLE_OFF]: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.MENU}.Choice.${CHOICES.TOGGLE_OFF}`),
      [SETTINGS.AUTOTARGET.CHOICES.TOGGLE_ON]: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.MENU}.Choice.${CHOICES.TOGGLE_ON}`),
      [SETTINGS.AUTOTARGET.CHOICES.YES]: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.AUTOTARGET.MENU}.Choice.${CHOICES.YES}`)
    },
    default: SETTINGS.AUTOTARGET.CHOICES.TOGGLE_OFF,
    onChange: value => setSetting(SETTINGS.AUTOTARGET.ENABLED,
      value === SETTINGS.AUTOTARGET.CHOICES.TOGGLE_ON
      || value === SETTINGS.AUTOTARGET.CHOICES.YES)
  });

  game.settings.register(MODULE_ID, SETTINGS.DIAGONAL_SCALING.RAY, {
    name: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DIAGONAL_SCALING.RAY}.Name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DIAGONAL_SCALING.RAY}.Hint`),
    type: Boolean,
    default: false,
    scope: "world",
    config: true
  });

  game.settings.register(MODULE_ID, SETTINGS.DIAGONAL_SCALING.CONE, {
    name: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DIAGONAL_SCALING.CONE}.Name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DIAGONAL_SCALING.CONE}.Hint`),
    type: Boolean,
    default: false,
    scope: "world",
    config: true
  });

  game.settings.register(MODULE_ID, SETTINGS.DIAGONAL_SCALING.CIRCLE, {
    name: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DIAGONAL_SCALING.CIRCLE}.Name`),
    hint: game.i18n.localize(`${MODULE_ID}.settings.${SETTINGS.DIAGONAL_SCALING.CIRCLE}.Hint`),
    type: Boolean,
    default: false,
    scope: "world",
    config: true
  });


  log("Done registering settings.");
}

export function debugPolygons() {
  return game.modules.get("_dev-mode")?.api?.getPackageDebugValue(MODULE_ID);
}
