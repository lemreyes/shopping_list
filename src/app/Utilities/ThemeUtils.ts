import { Themes } from "../Types/Enums";

export function getThemeClassName(theme: Themes) {
  let themeClassName = "";
  switch (theme) {
    case Themes.ThemeLight:
      themeClassName = "theme-light";
      break;
    case Themes.ThemeDark:
      themeClassName = "theme-dark";
      break;
    default:
      themeClassName = "theme-light";
  }

  return themeClassName;
}
