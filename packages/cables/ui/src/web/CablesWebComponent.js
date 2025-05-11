import { html, css, LitElement } from "lit";

export class CablesWebComponent extends LitElement {
  static styles = css`
    @charset "UTF-8";
    :root {
      --color-13: #ffffff;
      --color-12: #eeeeee;
      --color-11: #cccccc;
      --color-10: #bbbbbb;
      --color-09: #aaaaaa;
      --color-08: #969696;
      --color-07: #888888;
      --color-06: #555555;
      --color-05: #444444;
      --color-04: #333333;
      --color-03: #222222;
      --color-02: #1a1a1a;
      --color-01: #010101;
      --text-color: var(--color-10);
      --color-special: #07f78c;
      --color-error: #dc5751;
      --color-warning: #ec9213;
      --color-hint: #bbb;
      --color-bg-error: #760a05;
      --color-bg-warning: #734401;
      --color-bg-hint: #555555;
      --linkline-default: 1.5;
      --linkline-thin: 1;
      --text-color-textOpselect: var(--color-10);
      --text-color-textOpselectSelected: var(--color-13);
      --patch-bg-color: #404040;
      --color-blueprint: #5dc0fda5;
      --textedit-default: var(--color-10);
      --textedit-numeric: #4adab5;
      --textedit-string: #d57272;
      --textedit-comment: #5cb59e;
      --textedit-function: #eeeeee;
      --textedit-keyword: #f0d165;
      --numberinput-bg: #444444;
      --numberinput-bar: #5a5a5a;
    }

    :root {
      --color_op_bg: var(--color-04);
      --color_op_bg_active: var(--color-05);
      --color_op_text: var(--color-12);
      --color_op_text_active: var(--color-13);
      --color_blueprint: #005bc0;
      --color_op_handle_default: #5dc0fd;
      --color_op_handle_gl: #c0e04d;
      --color_op_handle_audio: #db88ff;
      --color_op_handle_devices: #f59259;
      --color_op_handle_html: #61bbf1;
      --color_op_handle_math: #44d4c8;
      --color_op_handle_user: #cccccc;
      --color_port_function: #f0d165;
      --color_port_trigger: var(--color_port_function);
      --color_port_value: #5cb59e;
      --color_port_number: var(--color_port_value);
      --color_port_object: #ab5a94;
      --color_port_array: #8084d4;
      --color_port_dynamic: #fff6e5;
      --color_port_string: #d57272;
      --color-bg-error: #aa0000;
      --color-bg-warning: #995100;
      --color-bg-hint: #555555;
      --color_link_function: var(--color_port_function);
      --color_link_value: var(--color_port_value);
      --color_link_object: var(--color_port_object);
      --color_link_array: var(--color_port_array);
      --color_link_dynamic: var(--color_port_dynamic);
      --color_link_string: var(--color_port_string);
      --color-splitter: var(--color-01);
      --color-button-text: var(--color_op_text);
      --color-button-bg: var(--color_op_bg_active);
      --color-button-bg-active: var(--color-07);
      --color-button-bg-hover: var(--color-06);
    }

    body.bright {
      --color-13: #111111;
      --color-12: #1a1a1a;
      --color-11: #222222;
      --color-10: #333333;
      --color-09: #444444;
      --color-08: #555555;
      --color-07: #888888;
      --color-06: #888888;
      --color-05: #bbbbbb;
      --color-04: #bbbbbb;
      --color-03: #cccccc;
      --color-02: #eeeeee;
      --color-01: #ffffff;
      --text-color: var(--color-13);
      --color_op_bg: var(--color-13);
      --color_op_bg_active: var(--color-06);
      --color_op_text: var(--color-01);
      --color_op_text_active: var(--color-01);
      --color_port_function: #8a7f00;
      --color_link_function: #8a7f00;
      --color-splitter: var(--color-13);
      --text-color-textOpselect: var(--color-12);
      --text-color-textOpselectSelected: var(--color-01);
      --linkline-default: 3;
      --linkline-thin: 2;
    }

    :root {
      --font-size-off: 0px;
      --font-size-small: calc(12px + var(--font-size-off));
      --font-size-default: calc(14px + var(--font-size-off));
      --font-size-bigger: calc(16px + var(--font-size-off));
      --font-size-big: calc(18px + var(--font-size-off));
    }

    @font-face {
      font-family: "SourceCodePro";
      src: url("../fonts/SourceCodePro-Regular.ttf");
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: "SourceSansPro";
      src: url("../fonts/SourceSansPro-Regular.ttf");
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: "SourceSansPro";
      src: url("../fonts/SourceSansPro-Bold.ttf");
      font-weight: 800;
      font-style: normal;
    }
    .icon-_triple-dot {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Ccircle cx='3.5' cy='12' r='2.5'/%3E%3Ccircle cx='12' cy='12' r='2.5'/%3E%3Ccircle cx='20.5' cy='12' r='2.5'/%3E%3C/svg%3E");
    }

    .icon-aperture {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-aperture'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m14.31 8 5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16 3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94'/%3E%3C/svg%3E");
    }

    .icon-blueprint {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.95 23.95'%3E%3Cdefs%3E%3Cstyle%3E.cls-1{fill:none}.blue{fill:%235dc0fd}.cls-1{stroke:%235dc0fd;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M6.01 11.84h9.5'/%3E%3Crect class='cls-1' x='1.95' y='5.84' width='20' height='12' rx='2'/%3E%3Cpath class='blue' d='M5.39 14.49h3.22v2.54H5.39zM10.35 14.49h3.22v2.54h-3.22zM15.3 14.49h3.22v2.54H15.3zM5.39 6.66h3.22V9.2H5.39zM10.35 6.66h3.22V9.2h-3.22z'/%3E%3Cpath style='fill:none' d='M0 0h23.95v23.95H0z'/%3E%3C/svg%3E");
    }

    .icon-cables {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M902 0h-54.8c-10.5 0-19.1 8.3-19.5 18.8-5.4 130.1-67 223-153.6 301.9-99-96.2-257.3-93.9-353.5 5.1-74 76.2-91.8 190.8-44.4 285.8C167.8 703.7 84.8 815.5 78.5 979.8c-.4 10.8 8 19.8 18.8 20.2h55.5c10.5 0 19.1-8.2 19.5-18.7 5.8-126.8 71-217.1 161-295 45.8 41.1 105.2 63.8 166.7 63.7 137.8 0 251-114 250-251.8-.2-34.7-7.6-69-21.9-100.6 105.2-93.7 187.3-210.4 193.4-377.4.4-10.8-8-19.8-18.8-20.2h-.7zM656.3 500c0 86.2-70.1 156.2-156.2 156.2-32.7 0-64.5-10.2-91-29.3-41-29.3-65.3-76.6-65.2-126.9 0-86.2 70.1-156.2 156.2-156.2 86.2-.1 156.1 69.8 156.2 156.2 0-.1 0 0 0 0z' fill='%23fff'/%3E%3C/svg%3E");
    }

    .icon-cables_editor {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3Cpath class='cls-2' d='M5.64 6.93h4.74M5.64 10.31h4.74M5.64 13.7h4.74M5.64 17.08h4.74'/%3E%3Crect class='cls-2' x='2' y='2.92' width='20' height='18.17' rx='2'/%3E%3Cpath class='cls-2' d='M21.44 10.28H14.5M13.75 20.98V3.19'/%3E%3C/svg%3E");
    }

    .icon-canvas_max {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3Cstyle%3E.cls-1{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M12.03 15.9H8.09M8 11.86v3.94M8 3H5a2 2 0 0 0-2 2v3m13 13h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3M11.97 8.1h3.94M16 12.14V8.2'/%3E%3Cpath class='cls-1' d='M16 21h3a2 2 0 0 0 2-2v-3M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3'/%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3C/svg%3E");
    }

    .icon-canvas_patchbg {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.95 23.95'%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath style='fill:none' d='M0 0h23.95v23.95H0z'/%3E%3Cpath class='cls-2' d='M6.7 6.47h3.06M6.7 9.98h3.06M14.3 13.79h3.06M14.24 17.3h3.07M14.27 13.79h3.06M11.14 12.73l-4.55 4.55M10.57 17.32H6.63M6.54 13.28v3.93'/%3E%3Cpath class='cls-2' d='M8 3H5a2 2 0 0 0-2 2v3m13 13h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3' transform='translate(-.02 -.02)'/%3E%3Crect class='cls-2' x='13.52' y='3.08' width='7.43' height='6.83' rx='2'/%3E%3C/svg%3E");
    }

    .icon-check {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");
    }

    .icon-ease-absolut {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M980.8 81.6c-16-30.4-48-49.6-84.8-49.6-52.8 0-96 43.2-96 96 0 36.8 20.8 68.8 49.6 84.8v638.4H211.2c-16-30.4-48-49.6-84.8-49.6s-68.8 20.8-84.8 49.6H-1.6v91.2h43.2c16 30.4 48 49.6 84.8 49.6s68.8-20.8 84.8-49.6h729.6V212.8c16-9.6 30.4-22.4 38.4-38.4h43.2V83.2h-41.6zM896 176c-22.4 0-40-14.4-46.4-33.6-1.6-4.8-1.6-9.6-1.6-14.4s1.6-9.6 1.6-14.4c4.8-16 16-27.2 32-32 4.8-1.6 9.6-1.6 14.4-1.6s9.6 1.6 14.4 1.6c19.2 6.4 33.6 24 33.6 46.4 0 27.2-20.8 48-48 48z'/%3E%3C/svg%3E");
    }

    .icon-ease-bezier {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M980.8 81.6c-16-30.4-48-49.6-84.8-49.6-52.8 0-96 43.2-96 96 0 19.2 6.4 36.8 16 52.8-121.6 214.4-376 585.6-611.2 657.6C187.2 816 160 800 128 800c-36.8 0-68.8 20.8-84.8 49.6H0v91.2h43.2c16 30.4 48 49.6 84.8 49.6 41.6 0 76.8-25.6 89.6-62.4 9.6-3.2 19.2-6.4 30.4-9.6h350.4c8 14.4 24 24 41.6 24 27.2 0 48-20.8 48-48s-20.8-48-48-48c-17.6 0-33.6 9.6-41.6 24H347.2C592 721.6 808 376 896 222.4c36.8 0 68.8-20.8 84.8-49.6h43.2V81.6h-43.2zM944 128c0 27.2-20.8 48-48 48s-48-20.8-48-48c0-3.2 0-6.4 1.6-8 1.6-9.6 6.4-17.6 12.8-25.6 4.8-6.4 12.8-9.6 20.8-12.8 4.8-1.6 9.6-1.6 14.4-1.6s9.6 1.6 14.4 1.6c17.6 6.4 32 24 32 46.4z'/%3E%3C/svg%3E");
    }

    .icon-ease-cub-in {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M896 32c-52.8 0-96 43.2-96 96 0 25.6 11.2 49.6 27.2 67.2-60.8 176-241.6 595.2-619.2 649.6-17.6-27.2-46.4-44.8-81.6-44.8-36.8 0-68.8 20.8-84.8 49.6H-1.6v91.2h43.2c16 30.4 48 49.6 84.8 49.6 38.4 0 72-22.4 88-56 219.2-28.8 409.6-164.8 555.2-400 73.6-120 120-238.4 145.6-313.6 27.2-6.4 51.2-24 64-48h43.2V81.6h-43.2C964.8 52.8 932.8 32 896 32zm48 96c0 27.2-20.8 48-48 48-25.6 0-46.4-20.8-48-46.4V128c0-9.6 3.2-17.6 6.4-24 6.4-9.6 16-17.6 27.2-20.8 4.8-1.6 9.6-1.6 14.4-1.6s9.6 1.6 14.4 1.6C929.6 88 944 105.6 944 128z'/%3E%3C/svg%3E");
    }

    .icon-ease-cub-out {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M896 32c-38.4 0-72 22.4-88 56-216 28.8-404.8 164.8-552 400-75.2 120-121.6 238.4-148.8 313.6-28.8 6.4-52.8 24-65.6 48H-1.6v91.2h43.2c16 30.4 48 49.6 84.8 49.6 52.8 0 96-43.2 96-96 0-25.6-11.2-49.6-27.2-67.2C256 651.2 440 232 814.4 177.6c17.6 27.2 46.4 44.8 81.6 44.8 36.8 0 68.8-20.8 84.8-49.6h43.2V81.6h-43.2c-16-28.8-48-49.6-84.8-49.6zm48 96c0 22.4-14.4 40-33.6 46.4-4.8 1.6-9.6 1.6-14.4 1.6s-8-1.6-12.8-1.6c-20.8-6.4-35.2-24-35.2-46.4 0-20.8 14.4-38.4 32-44.8 4.8-1.6 9.6-3.2 16-3.2 4.8 0 9.6 1.6 14.4 1.6 19.2 6.4 33.6 24 33.6 46.4z'/%3E%3C/svg%3E");
    }

    .icon-ease-cubic {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M896 32c-40 0-73.6 24-88 57.6-212.8 41.6-278.4 233.6-336 404.8C416 659.2 366.4 804.8 208 840c-17.6-25.6-46.4-41.6-80-41.6-36.8 0-68.8 20.8-84.8 49.6H0v91.2h43.2c16 30.4 48 49.6 84.8 49.6 40 0 73.6-24 88-57.6 217.6-41.6 283.2-235.2 342.4-408C612.8 360 662.4 216 817.6 180.8c17.6 25.6 46.4 41.6 80 41.6 36.8 0 68.8-20.8 84.8-49.6h43.2V81.6h-43.2C964.8 52.8 932.8 32 896 32zm48 96c0 22.4-14.4 40-33.6 46.4-4.8 1.6-9.6 1.6-14.4 1.6s-8-1.6-12.8-1.6c-20.8-6.4-35.2-24-35.2-46.4 0-20.8 14.4-38.4 33.6-44.8 4.8-1.6 9.6-3.2 14.4-3.2s9.6 1.6 14.4 1.6c19.2 6.4 33.6 24 33.6 46.4z'/%3E%3C/svg%3E");
    }

    .icon-ease-exp-in {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M896 32c-52.8 0-96 43.2-96 96 0 36.8 20.8 67.2 49.6 84.8C843.2 318.4 812.8 505.6 680 648 571.2 766.4 412.8 833.6 209.6 848c-16-28.8-48-48-83.2-48-36.8 0-68.8 20.8-84.8 49.6H-1.6v91.2h43.2c16 30.4 48 49.6 84.8 49.6 38.4 0 70.4-22.4 86.4-52.8 228.8-14.4 408-91.2 534.4-228.8 153.6-166.4 187.2-379.2 193.6-497.6 16-9.6 30.4-22.4 38.4-38.4h43.2V81.6h-43.2C964.8 52.8 932.8 32 896 32zm48 96c0 27.2-20.8 48-48 48-20.8 0-38.4-12.8-44.8-32-1.6-4.8-3.2-11.2-3.2-16 0-3.2 0-6.4 1.6-11.2 3.2-17.6 16-30.4 33.6-35.2 4.8-1.6 9.6-1.6 14.4-1.6s9.6 1.6 14.4 1.6c17.6 6.4 32 24 32 46.4z'/%3E%3C/svg%3E");
    }

    .icon-ease-exp-out {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M896 32c-38.4 0-70.4 22.4-86.4 52.8-220.8 14.4-396.8 89.6-521.6 224-156.8 168-195.2 382.4-203.2 500.8-17.6 9.6-30.4 22.4-40 40H1.6v91.2h43.2c16 30.4 48 49.6 84.8 49.6 52.8 0 96-43.2 96-96 0-35.2-19.2-67.2-48-83.2 8-107.2 43.2-297.6 179.2-441.6C465.6 254.4 619.2 188.8 816 174.4c16 28.8 48 48 83.2 48 36.8 0 68.8-20.8 84.8-49.6h43.2V81.6H984C964.8 52.8 932.8 32 896 32zm48 96c0 22.4-14.4 40-33.6 46.4-4.8 1.6-9.6 1.6-14.4 1.6s-9.6-1.6-12.8-1.6c-20.8-6.4-35.2-24-35.2-46.4 0-20.8 14.4-40 33.6-44.8 4.8-1.6 9.6-3.2 14.4-3.2s9.6 1.6 14.4 1.6c19.2 6.4 33.6 24 33.6 46.4z'/%3E%3C/svg%3E");
    }

    .icon-ease-expo {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M896 32c-38.4 0-70.4 22.4-86.4 54.4-140.8 12.8-235.2 57.6-288 136-56 83.2-56 188.8-56 289.6 0 91.2 0 177.6-40 238.4-36.8 54.4-107.2 86.4-216 96-16-27.2-48-46.4-81.6-46.4-36.8 0-68.8 20.8-84.8 49.6H0v91.2h43.2c16 30.4 48 49.6 84.8 49.6 38.4 0 70.4-22.4 86.4-54.4 140.8-12.8 235.2-57.6 288-136 56-83.2 56-188.8 56-289.6 0-91.2 0-177.6 40-238.4 36.8-54.4 107.2-86.4 216-96 16 27.2 48 46.4 81.6 46.4 36.8 0 68.8-20.8 84.8-49.6h43.2V81.6h-43.2c-16-28.8-48-49.6-84.8-49.6zm48 96c0 22.4-14.4 40-33.6 46.4-4.8 1.6-9.6 1.6-14.4 1.6s-9.6-1.6-12.8-1.6c-20.8-6.4-35.2-24-35.2-46.4 0-20.8 14.4-40 33.6-44.8 4.8-1.6 9.6-3.2 14.4-3.2s9.6 1.6 14.4 1.6c19.2 6.4 33.6 24 33.6 46.4z'/%3E%3C/svg%3E");
    }

    .icon-ease-linear {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath d='M896 32c-52.8 0-96 43.2-96 96 0 9.6 1.6 19.2 3.2 27.2l-649.6 648c-8-3.2-17.6-3.2-27.2-3.2-35.2 0-67.2 19.2-83.2 49.6H-1.6v91.2h43.2c16 30.4 48 51.2 84.8 51.2 52.8 0 96-43.2 96-96 0-9.6-1.6-19.2-4.8-28.8l649.6-648c8 3.2 17.6 4.8 27.2 4.8 36.8 0 68.8-20.8 84.8-49.6h43.2V83.2h-43.2C964.8 52.8 932.8 32 896 32zm48 96c0 27.2-20.8 48-48 48s-48-20.8-48-48c0-8 1.6-16 6.4-22.4 4.8-8 11.2-14.4 19.2-19.2 3.2-1.6 6.4-3.2 9.6-3.2 4.8-1.6 9.6-1.6 14.4-1.6s9.6 1.6 14.4 1.6c17.6 4.8 32 22.4 32 44.8z'/%3E%3C/svg%3E");
    }

    .icon-ease-sin-in {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1019 1024'%3E%3Cpath d='M891.2 32c-52.8 0-96 43.2-96 96 0 19.2 6.4 38.4 16 52.8C692.8 395.2 443.2 768 200 838.4c-17.6-24-44.8-38.4-76.8-38.4-36.8 0-68.8 20.8-84.8 49.6H0v91.2h38.4c16 30.4 48 49.6 84.8 49.6 41.6 0 75.2-25.6 89.6-62.4 305.6-76.8 579.2-524.8 680-705.6 35.2 0 67.2-20.8 83.2-49.6h43.2V81.6H976C958.4 52.8 926.4 32 891.2 32zm48 96c0 27.2-20.8 48-48 48s-48-20.8-48-48c0-3.2 0-4.8 1.6-8 1.6-9.6 6.4-17.6 12.8-25.6 6.4-6.4 12.8-11.2 20.8-12.8 4.8-1.6 9.6-1.6 14.4-1.6s9.6 1.6 14.4 1.6c17.6 6.4 32 24 32 46.4z'/%3E%3C/svg%3E");
    }

    .icon-ease-sin-out {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1019 1024'%3E%3Cpath d='M891.2 32c-41.6 0-76.8 25.6-89.6 62.4-299.2 78.4-576 524.8-678.4 705.6-36.8 0-68.8 20.8-84.8 49.6H0v91.2h38.4c16 30.4 48 49.6 84.8 49.6 52.8 0 96-43.2 96-96 0-19.2-6.4-36.8-16-52.8C323.2 627.2 576 254.4 814.4 184c17.6 22.4 44.8 38.4 76.8 38.4 36.8 0 68.8-20.8 84.8-49.6h43.2V81.6H976C958.4 52.8 926.4 32 891.2 32zm48 96c0 22.4-14.4 40-33.6 46.4-4.8 1.6-9.6 1.6-14.4 1.6s-8 0-11.2-1.6c-20.8-4.8-36.8-24-36.8-46.4 0-20.8 14.4-38.4 33.6-44.8 4.8-1.6 9.6-3.2 14.4-3.2s9.6 1.6 14.4 1.6c19.2 6.4 33.6 24 33.6 46.4z'/%3E%3C/svg%3E");
    }

    .icon-ease-sin {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1019 1024'%3E%3Cpath d='M891.2 32c-41.6 0-76.8 27.2-89.6 64-156.8 48-244.8 222.4-328 392-78.4 156.8-152 305.6-273.6 348.8-17.6-22.4-44.8-36.8-75.2-36.8C88 800 56 820.8 40 849.6H1.6v91.2H40c16 30.4 48 49.6 84.8 49.6 41.6 0 76.8-25.6 89.6-62.4 164.8-48 254.4-227.2 340.8-400C630.4 376 704 232 817.6 187.2c17.6 22.4 44.8 36.8 75.2 36.8 36.8 0 68.8-20.8 84.8-49.6h43.2V83.2h-43.2C958.4 52.8 926.4 32 891.2 32zm48 96c0 22.4-14.4 40-33.6 46.4-4.8 1.6-9.6 1.6-14.4 1.6s-8 0-12.8-1.6c-20.8-4.8-35.2-24-35.2-46.4 0-20.8 14.4-38.4 32-44.8 4.8-1.6 9.6-3.2 16-3.2 4.8 0 9.6 1.6 14.4 1.6 19.2 6.4 33.6 24 33.6 46.4z'/%3E%3C/svg%3E");
    }

    .icon-exit {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg viewBox='0 0 15 15' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h15v15H0z' fill='none'/%3E%3Cpath d='M5.8 13H3.6c-.4 0-.8-.2-1.1-.5s-.5-.7-.5-1.1V3.6c0-.4.2-.8.5-1.1S3.2 2 3.6 2h2.2c.3 0 .5.2.5.5s-.2.5-.5.5H3.6c-.1 0-.3.1-.4.2s-.2.3-.2.4v7.7c0 .2.1.3.2.4.1.2.3.3.4.3h2.2c.3 0 .5.2.5.5s-.2.5-.5.5zM9.7 10.8c-.1 0-.3 0-.4-.1-.2-.2-.2-.5 0-.7l2.4-2.4-2.3-2.5c-.2-.2-.2-.5 0-.7s.5-.2.7 0l2.8 2.8c.2.2.2.5 0 .7l-2.8 2.8c-.1 0-.3.1-.4.1z'/%3E%3Cpath d='M12.5 8H5.8c-.2 0-.5-.2-.5-.5s.3-.5.5-.5h6.6c.3 0 .6.2.6.5s-.3.5-.5.5z'/%3E%3C/svg%3E");
    }

    .icon-list-plus {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-list-plus'%3E%3Cpath d='M11 12H3M16 6H3M16 18H3M18 9v6M21 12h-6'/%3E%3C/svg%3E");
    }

    .icon-mouse-cursor {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15 15' style='enable-background:new 0 0 15 15' xml:space='preserve'%3E%3Cpath style='fill:none' d='M0 0h15v15H0z'/%3E%3Cpath d='M8.9 8.6h-.7l.3.6 1.3 3.1c.1.2 0 .5-.2.6l-1.4.6c-.2.1-.5 0-.6-.2L6.5 10l-.2-.6-.5.5L4.6 11c-.3.3-.7.1-.7-.3V1.9c0-.4.5-.6.7-.3L11 8c.3.3.1.7-.3.7l-1.8-.1z' style='fill:none;stroke:%23000;stroke-linejoin:round'/%3E%3C/svg%3E");
    }

    .icon-op {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.95 23.95'%3E%3Cdefs%3E%3Cstyle%3E.cls-1{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M6.01 11.84h9.5'/%3E%3Crect class='cls-1' x='1.95' y='5.84' width='20' height='12' rx='2'/%3E%3Cpath d='M5.39 14.49h3.22v2.54H5.39zM10.35 14.49h3.22v2.54h-3.22zM15.3 14.49h3.22v2.54H15.3zM5.39 6.66h3.22V9.2H5.39zM10.35 6.66h3.22V9.2h-3.22z'/%3E%3Cpath style='fill:none' d='M0 0h23.95v23.95H0z'/%3E%3C/svg%3E");
    }

    .icon-ops {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.95 23.95'%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath style='fill:none' d='M0 0h23.95v23.95H0z'/%3E%3Cpath class='cls-2' d='M14.07 15.5h8.05v4.4h-8.05zM1.84 15.5h8.05v4.4H1.84zM1.84 4.05h8.05v4.4H1.84zM3.65 9.42v5.16'/%3E%3Cpath class='cls-2' d='M8 9a2.6 2.6 0 0 0 .27 2.1c1.4 2 6.09 0 7.51 2a2.68 2.68 0 0 1 .32 2' transform='translate(-.02 -.05)'/%3E%3C/svg%3E");
    }

    .icon-remoteviewer {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' viewBox='0 0 15 15' style='enable-background:new 0 0 15 15' xml:space='preserve'%3E%3Cstyle%3E.st1{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}%3C/style%3E%3Cpath style='fill:none' d='M0 0h15v15H0z'/%3E%3Cpath class='st1' d='M5.4 13.2h4.2M6.1 13.2l.3-2.5M8.9 13.2l-.3-2.5M12.7 10.6H2.3c-.3 0-.5-.2-.5-.5V2.3c0-.3.2-.5.5-.5h10.5c.3 0 .5.2.5.5v7.8c0 .3-.3.5-.6.5zM1.9 7.9h11.3'/%3E%3C/svg%3E");
    }

    .icon-skull {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.95 23.95'%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath style='fill:none' d='M0 0h23.95v23.95H0z'/%3E%3Cpath class='cls-2' d='M7.22 17.7a5.71 5.71 0 0 1-3.49-5.24v-4a5.71 5.71 0 0 1 5.69-5.71h5.16a5.71 5.71 0 0 1 5.69 5.69v4a5.72 5.72 0 0 1-3.38 5.2' transform='translate(-.02 -.02)'/%3E%3Cpath class='cls-2' d='M9.49 18.01v3.22M11.94 18.01v3.22M14.47 18.01v3.22'/%3E%3Cpath class='cls-2' d='M8.85 14.38a1.48 1.48 0 0 1-1.46-1.5v-3a1.46 1.46 0 1 1 2.92 0v3a1.48 1.48 0 0 1-1.46 1.5ZM15.11 14.38a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 3 0v3a1.5 1.5 0 0 1-1.5 1.5Z' transform='translate(-.02 -.02)'/%3E%3C/svg%3E");
    }

    .icon-subpatch {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.95 23.95'%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath style='fill:none' d='M0 0h23.95v23.95H0z'/%3E%3Crect class='cls-2' x='1.98' y='2.98' width='20' height='18.17' rx='2'/%3E%3Cpath class='cls-2' d='M8.34 20.34v-4.56h13.21M15.48 3.7v4.4H3.14'/%3E%3Cpath class='cls-2' d='M6.29 9.41a2.46 2.46 0 0 0 .58 2.26c1.72 2 6.44-.23 8 1.7a2.93 2.93 0 0 1 .27 2.71' transform='translate(-.02 -.31)'/%3E%3C/svg%3E");
    }

    .icon-timeline {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.95 23.95'%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath style='fill:none' d='M0 0h23.95v23.95H0z'/%3E%3Cpath class='cls-2' d='M2.11 21.42h19.58M6.11 18.61v2.32M2.11 16.61v4.81M10.02 18.61v2.32M13.93 18.61v2.32M17.84 18.61v2.32M21.84 16.61v4.81'/%3E%3Ccircle class='cls-2' cx='12.43' cy='8.31' r='5.78'/%3E%3Cpath class='cls-2' d='M14.71 10.53 12.5 8.31M13.66 7.14l-1 1.01'/%3E%3C/svg%3E");
    }

    .icon-triple-dot {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg data-name='Ebene 1' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor'%3E%3Ccircle cx='12' cy='3.5' r='2.5'/%3E%3Ccircle data-name='Oval-2' cx='12' cy='12' r='2.5'/%3E%3Ccircle data-name='Oval-2' cx='12' cy='20.5' r='2.5'/%3E%3C/svg%3E");
    }

    .icon-undev {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 202.6 53.8' style='enable-background:new 0 0 202.6 53.8' xml:space='preserve'%3E%3Cpath d='M202.1.5h-61.6c-8.9 0-16.4 5.7-19.2 13.5-2.6-7.5-9.7-13-18.2-13.4V.5h-22v15.4H81C79.2 7.3 71.7.7 62.6.1V0H0V33.3C0 44.2 9.1 53 20.3 53c10 0 18.3-7.1 20-16.4v16.7H103v-.1c8.5-.3 15.6-5.8 18.3-13.3 2.7 7.8 10.3 13.5 19.2 13.5H162.3V36.1L181.9 53l19.9-17h.3V.5zM121.4 27s0-.1-.1-.1l.1.1z' style='fill:%236b6b6b'/%3E%3C/svg%3E");
    }

    .icon-accept {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3Ccircle cx='12' cy='12' r='10.8' style='fill:none;stroke:%23000;stroke-width:2'/%3E%3Cpath d='m16 9-5.5 5.5L8 12' style='fill:none;stroke:%23000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round'/%3E%3C/svg%3E");
    }

    .icon-activity {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-activity'%3E%3Cpath d='M22 12h-4l-3 9L9 3l-3 9H2'/%3E%3C/svg%3E");
    }

    .icon-alert-triangle {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-alert-triangle'%3E%3Cpath d='M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01'/%3E%3C/svg%3E");
    }

    .icon-align-justify {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10H3M21 6H3M21 14H3M21 18H3'/%3E%3C/svg%3E");
    }

    .icon-align-left {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 10H3M21 6H3M21 14H3M17 18H3'/%3E%3C/svg%3E");
    }

    .icon-arrow-down-left {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-arrow-down-left'%3E%3Cpath d='M18 6 6 18M15 18H6V9'/%3E%3C/svg%3E");
    }

    .icon-arrow-down-right {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-arrow-down-right'%3E%3Cpath d='m6 6 12 12M9 18h9V9'/%3E%3C/svg%3E");
    }

    .icon-arrow-down {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-arrow-down'%3E%3Cpath d='M12 4v16M18 14l-6 6-6-6'/%3E%3C/svg%3E");
    }

    .icon-arrow-left {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-arrow-left'%3E%3Cpath d='M20 12H4M10 18l-6-6 6-6'/%3E%3C/svg%3E");
    }

    .icon-arrow-right {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-arrow-right'%3E%3Cpath d='M4 12h16M14 6l6 6-6 6'/%3E%3C/svg%3E");
    }

    .icon-arrow-up-left {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-arrow-up-left'%3E%3Cpath d='M18 18 6 6M15 6H6v9'/%3E%3C/svg%3E");
    }

    .icon-arrow-up-right {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-arrow-up-right'%3E%3Cpath d='M6 18 18 6M9 6h9v9'/%3E%3C/svg%3E");
    }

    .icon-arrow-up {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-arrow-up'%3E%3Cpath d='M12 20V4M6 10l6-6 6 6'/%3E%3C/svg%3E");
    }

    .icon-award {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='8' r='7'/%3E%3Cpath d='M8.21 13.89 7 23l5-3 5 3-1.21-9.12'/%3E%3C/svg%3E");
    }

    .icon-ban {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-ban'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m4.9 4.9 14.2 14.2'/%3E%3C/svg%3E");
    }

    .icon-bluesky {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg width='600' height='530' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.613 9.997 86.535 9.997 68.825c0-88.687 77.742-60.816 125.72-24.795z' fill='%231185fe'/%3E%3C/svg%3E");
    }

    .icon-book-open {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-book-open'%3E%3Cpath d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/%3E%3C/svg%3E");
    }

    .icon-bookmark-filled {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath d='m19 21-7-5-7 5V5c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v16z'/%3E%3C/svg%3E");
    }

    .icon-bookmark {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-bookmark'%3E%3Cpath d='m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");
    }

    .icon-box-select {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 2a2 2 0 0 0-2 2M8 2h2M14 2h2M4 22a2 2 0 0 1-2-2M22 8v2M22 14v2M22 20a2 2 0 0 1-2 2M14 22h2M8 22h2M20 2a2 2 0 0 1 2 2M2 14v2M2 8v2'/%3E%3C/svg%3E");
    }

    .icon-cc-by {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' stroke='currentColor' stroke-width='0' viewBox='5.5 -3.5 64 64' xml:space='preserve'%3E%3Ccircle fill='none' cx='37.637' cy='28.806' r='28.276' stroke='none'/%3E%3Cpath d='M37.443-3.5c8.988 0 16.57 3.085 22.742 9.257C66.393 11.967 69.5 19.548 69.5 28.5c0 8.991-3.049 16.476-9.145 22.456-6.476 6.363-14.113 9.544-22.912 9.544-8.649 0-16.153-3.144-22.514-9.43C8.644 44.784 5.5 37.262 5.5 28.5c0-8.761 3.144-16.342 9.429-22.742C21.101-.415 28.604-3.5 37.443-3.5zm.114 5.772c-7.276 0-13.428 2.553-18.457 7.657-5.22 5.334-7.829 11.525-7.829 18.572 0 7.086 2.59 13.22 7.77 18.398 5.181 5.182 11.352 7.771 18.514 7.771 7.123 0 13.334-2.607 18.629-7.828 5.029-4.838 7.543-10.952 7.543-18.343 0-7.276-2.553-13.465-7.656-18.571-5.104-5.104-11.276-7.656-18.514-7.656zm8.572 18.285v13.085h-3.656v15.542h-9.944V33.643h-3.656V20.557c0-.572.2-1.057.599-1.457.401-.399.887-.6 1.457-.6h13.144c.533 0 1.01.2 1.428.6.417.4.628.886.628 1.457zm-13.087-8.228c0-3.008 1.485-4.514 4.458-4.514s4.457 1.504 4.457 4.514c0 2.971-1.486 4.457-4.457 4.457s-4.458-1.486-4.458-4.457z' stroke='none'/%3E%3C/svg%3E");
    }

    .icon-cc-cc {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='5.5 -3.5 64 64' fill='currentColor' stroke='currentColor' stroke-width='0' xml:space='preserve'%3E%3Cg stroke='none'%3E%3Ccircle fill='none' cx='37.785' cy='28.501' r='28.836'/%3E%3Cpath d='M37.441-3.5c8.951 0 16.572 3.125 22.857 9.372 3.008 3.009 5.295 6.448 6.857 10.314 1.561 3.867 2.344 7.971 2.344 12.314 0 4.381-.773 8.486-2.314 12.313-1.543 3.828-3.82 7.21-6.828 10.143-3.123 3.085-6.666 5.448-10.629 7.086-3.961 1.638-8.057 2.457-12.285 2.457s-8.276-.808-12.143-2.429c-3.866-1.618-7.333-3.961-10.4-7.027-3.067-3.066-5.4-6.524-7-10.372S5.5 32.767 5.5 28.5c0-4.229.809-8.295 2.428-12.2 1.619-3.905 3.972-7.4 7.057-10.486C21.08-.394 28.565-3.5 37.441-3.5zm.116 5.772c-7.314 0-13.467 2.553-18.458 7.657-2.515 2.553-4.448 5.419-5.8 8.6a25.204 25.204 0 0 0-2.029 9.972c0 3.429.675 6.734 2.029 9.913 1.353 3.183 3.285 6.021 5.8 8.516 2.514 2.496 5.351 4.399 8.515 5.715a25.652 25.652 0 0 0 9.943 1.971c3.428 0 6.75-.665 9.973-1.999 3.219-1.335 6.121-3.257 8.713-5.771 4.99-4.876 7.484-10.99 7.484-18.344 0-3.543-.648-6.895-1.943-10.057-1.293-3.162-3.18-5.98-5.654-8.458-5.146-5.143-11.335-7.715-18.573-7.715zm-.401 20.915-4.287 2.229c-.458-.951-1.019-1.619-1.685-2-.667-.38-1.286-.571-1.858-.571-2.856 0-4.286 1.885-4.286 5.657 0 1.714.362 3.084 1.085 4.113.724 1.029 1.791 1.544 3.201 1.544 1.867 0 3.181-.915 3.944-2.743l3.942 2c-.838 1.563-2 2.791-3.486 3.686-1.484.896-3.123 1.343-4.914 1.343-2.857 0-5.163-.875-6.915-2.629-1.752-1.752-2.628-4.19-2.628-7.313 0-3.048.886-5.466 2.657-7.257 1.771-1.79 4.009-2.686 6.715-2.686 3.963-.002 6.8 1.541 8.515 4.627zm18.457 0-4.229 2.229c-.457-.951-1.02-1.619-1.686-2-.668-.38-1.307-.571-1.914-.571-2.857 0-4.287 1.885-4.287 5.657 0 1.714.363 3.084 1.086 4.113.723 1.029 1.789 1.544 3.201 1.544 1.865 0 3.18-.915 3.941-2.743l4 2c-.875 1.563-2.057 2.791-3.541 3.686a9.233 9.233 0 0 1-4.857 1.343c-2.896 0-5.209-.875-6.941-2.629-1.736-1.752-2.602-4.19-2.602-7.313 0-3.048.885-5.466 2.658-7.257 1.77-1.79 4.008-2.686 6.713-2.686 3.962-.002 6.783 1.541 8.458 4.627z'/%3E%3C/g%3E%3C/svg%3E");
    }

    .icon-cc-nc {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' stroke='currentColor' stroke-width='0' viewBox='5.5 -3.5 64 64' xml:space='preserve'%3E%3Ccircle fill='none' cx='37.47' cy='28.736' r='29.471' stroke='none'/%3E%3Cpath d='M37.442-3.5c8.99 0 16.571 3.085 22.743 9.256C66.393 11.928 69.5 19.509 69.5 28.5c0 8.992-3.048 16.476-9.145 22.458C53.88 57.32 46.241 60.5 37.442 60.5c-8.686 0-16.19-3.162-22.513-9.485C8.644 44.728 5.5 37.225 5.5 28.5c0-8.762 3.144-16.343 9.429-22.743C21.1-.414 28.604-3.5 37.442-3.5zM12.7 19.872c-.952 2.628-1.429 5.505-1.429 8.629 0 7.086 2.59 13.22 7.77 18.4 5.219 5.144 11.391 7.715 18.514 7.715 7.201 0 13.409-2.608 18.63-7.829 1.867-1.79 3.332-3.657 4.398-5.602l-12.056-5.371c-.421 2.02-1.439 3.667-3.057 4.942-1.622 1.276-3.535 2.011-5.744 2.2v4.915h-3.714v-4.915c-3.543-.036-6.782-1.312-9.714-3.827l4.4-4.457c2.094 1.942 4.476 2.913 7.143 2.913 1.104 0 2.048-.246 2.83-.743.78-.494 1.172-1.312 1.172-2.457 0-.801-.287-1.448-.858-1.943L37.9 31.127l-3.771-1.715-5.086-2.229L12.7 19.872zM37.557 2.214c-7.276 0-13.428 2.571-18.457 7.714a30.623 30.623 0 0 0-3.543 4.287L27.786 19.7c.533-1.676 1.542-3.019 3.029-4.028 1.484-1.009 3.218-1.571 5.2-1.686V9.071h3.715v4.915c2.934.153 5.6 1.143 8 2.971l-4.172 4.286c-1.793-1.257-3.619-1.885-5.486-1.885-.991 0-1.876.191-2.656.571-.781.381-1.172 1.029-1.172 1.943 0 .267.095.533.285.8l4.057 1.83 2.8 1.257 5.144 2.285 16.397 7.314a29.51 29.51 0 0 0 .801-6.857c0-7.353-2.552-13.543-7.656-18.573-5.067-5.143-11.241-7.714-18.515-7.714z' stroke='none'/%3E%3C/svg%3E");
    }

    .icon-cc-nd {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' stroke='currentColor' stroke-width='0' viewBox='0 0 64 64' xml:space='preserve'%3E%3Ccircle fill='none' cx='32.065' cy='31.788' r='29.013' stroke='none'/%3E%3Cpath d='M31.944 0c8.953 0 16.533 3.106 22.744 9.315C60.894 15.486 64 23.044 64 32s-3.049 16.457-9.146 22.514C48.419 60.838 40.78 64 31.944 64c-8.65 0-16.153-3.143-22.514-9.43C3.144 48.286 0 40.762 0 32.001c0-8.724 3.144-16.285 9.43-22.685C15.64 3.106 23.144 0 31.943 0zm.117 5.771c-7.276 0-13.43 2.57-18.459 7.715-5.22 5.297-7.83 11.468-7.83 18.514 0 7.125 2.59 13.257 7.77 18.4 5.182 5.182 11.353 7.77 18.517 7.77 7.123 0 13.332-2.607 18.627-7.827 5.028-4.876 7.543-10.99 7.543-18.343 0-7.313-2.554-13.484-7.657-18.514-5.067-5.144-11.238-7.715-18.512-7.715zm12.056 18.685v5.485H20.86v-5.485h23.257zm0 10.287v5.481H20.86v-5.48h23.257z' stroke='none'/%3E%3C/svg%3E");
    }

    .icon-cc-pd {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='5.5 -3.5 64 64' fill='currentColor' stroke='currentColor' stroke-width='0' xml:space='preserve'%3E%3Ccircle fill='none' cx='37.471' cy='28.424' r='28.553' stroke='none'/%3E%3Cpath d='M37.443-3.5c8.988 0 16.58 3.096 22.77 9.286C66.404 11.976 69.5 19.547 69.5 28.5c0 8.954-3.049 16.437-9.145 22.456-6.437 6.363-14.076 9.544-22.912 9.544-8.687 0-16.182-3.144-22.486-9.43C8.651 44.784 5.5 37.262 5.5 28.5c0-8.761 3.144-16.342 9.429-22.742C21.101-.415 28.604-3.5 37.443-3.5zm.086 5.772c-7.257 0-13.401 2.553-18.428 7.657-5.22 5.296-7.829 11.486-7.829 18.572s2.59 13.22 7.771 18.398c5.181 5.182 11.352 7.771 18.514 7.771 7.162 0 13.371-2.607 18.629-7.828 5.029-4.877 7.543-10.991 7.543-18.343 0-7.314-2.553-13.504-7.656-18.571-5.106-5.104-11.288-7.656-18.544-7.656zM22.471 37.186V19.472h8.8c4.342 0 6.514 1.999 6.514 6 0 .686-.105 1.342-.314 1.972-.209.629-.572 1.256-1.086 1.886-.514.629-1.285 1.143-2.314 1.543-1.028.399-2.247.6-3.656.6h-3.486v5.714h-4.458zm4.4-14.401v5.372h3.771c.914 0 1.6-.258 2.058-.772.458-.513.687-1.152.687-1.915 0-1.79-.953-2.686-2.858-2.686h-3.657v.001zm12.113 14.401V19.472h6.859c2.818 0 5.027.724 6.629 2.171 1.598 1.448 2.398 3.677 2.398 6.686 0 3.01-.801 5.24-2.398 6.686-1.602 1.447-3.811 2.171-6.629 2.171h-6.859zm4.403-14v10.287h2.57c1.562 0 2.695-.466 3.4-1.401.705-.933 1.057-2.179 1.057-3.742 0-1.562-.352-2.809-1.057-3.743-.705-.933-1.857-1.399-3.457-1.399l-2.513-.002z' stroke='none'/%3E%3C/svg%3E");
    }

    .icon-cc-sa {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' stroke='currentColor' stroke-width='0' viewBox='5.5 -3.5 64 64' xml:space='preserve'%3E%3Ccircle fill='none' cx='36.944' cy='28.631' r='29.105' stroke='none'/%3E%3Cpath d='M37.443-3.5c8.951 0 16.531 3.105 22.742 9.315C66.393 11.987 69.5 19.548 69.5 28.5c0 8.954-3.049 16.457-9.145 22.514-6.437 6.324-14.076 9.486-22.912 9.486-8.649 0-16.153-3.143-22.514-9.429C8.644 44.786 5.5 37.264 5.5 28.501c0-8.723 3.144-16.285 9.429-22.685C21.138-.395 28.643-3.5 37.443-3.5zm.114 5.772c-7.276 0-13.428 2.572-18.457 7.715-5.22 5.296-7.829 11.467-7.829 18.513 0 7.125 2.59 13.257 7.77 18.4 5.181 5.182 11.352 7.771 18.514 7.771 7.123 0 13.334-2.609 18.629-7.828 5.029-4.876 7.543-10.99 7.543-18.343 0-7.313-2.553-13.485-7.656-18.513-5.067-5.145-11.239-7.715-18.514-7.715zM23.271 23.985c.609-3.924 2.189-6.962 4.742-9.114 2.552-2.152 5.656-3.228 9.314-3.228 5.027 0 9.029 1.62 12 4.856 2.971 3.238 4.457 7.391 4.457 12.457 0 4.915-1.543 9-4.627 12.256-3.088 3.256-7.086 4.886-12.002 4.886-3.619 0-6.743-1.085-9.371-3.257-2.629-2.172-4.209-5.257-4.743-9.257H31.1c.19 3.886 2.533 5.829 7.029 5.829 2.246 0 4.057-.972 5.428-2.914 1.373-1.942 2.059-4.534 2.059-7.771 0-3.391-.629-5.971-1.885-7.743-1.258-1.771-3.066-2.657-5.43-2.657-4.268 0-6.667 1.885-7.2 5.656h2.343l-6.342 6.343-6.343-6.343 2.512.001z' stroke='none'/%3E%3C/svg%3E");
    }

    .icon-chart-gantt {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-chart-gantt-icon lucide-chart-gantt'%3E%3Cpath d='M10 6h8M12 16h6M3 3v16a2 2 0 0 0 2 2h16M8 11h7'/%3E%3C/svg%3E");
    }

    .icon-chart-spline {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-chart-spline'%3E%3Cpath d='M3 3v16a2 2 0 0 0 2 2h16'/%3E%3Cpath d='M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7'/%3E%3C/svg%3E");
    }

    .icon-check-square {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check-square'%3E%3Cpath d='m9 11 3 3L22 4'/%3E%3Cpath d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'/%3E%3C/svg%3E");
    }

    .icon-check {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-check-icon lucide-check'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");
    }

    .icon-chevron-down {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    }

    .icon-chevron-left {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m15 18-6-6 6-6'/%3E%3C/svg%3E");
    }

    .icon-chevron-right {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m9 18 6-6-6-6'/%3E%3C/svg%3E");
    }

    .icon-chevron-up {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m18 15-6-6-6 6'/%3E%3C/svg%3E");
    }

    .icon-chevrons-down-up {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-chevrons-down-up-icon lucide-chevrons-down-up'%3E%3Cpath d='m7 20 5-5 5 5M7 4l5 5 5-5'/%3E%3C/svg%3E");
    }

    .icon-chevrons-left-right {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-chevrons-left-right-icon lucide-chevrons-left-right'%3E%3Cpath d='m9 7-5 5 5 5M15 7l5 5-5 5'/%3E%3C/svg%3E");
    }

    .icon-chevrons-right-left {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-chevrons-right-left-icon lucide-chevrons-right-left'%3E%3Cpath d='m20 17-5-5 5-5M4 17l5-5-5-5'/%3E%3C/svg%3E");
    }

    .icon-chevrons-up-down {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-chevrons-up-down-icon lucide-chevrons-up-down'%3E%3Cpath d='m7 15 5 5 5-5M7 9l5-5 5 5'/%3E%3C/svg%3E");
    }

    .icon-circle {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-circle'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E");
    }

    .icon-clock {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-clock'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 6v6l3 3'/%3E%3C/svg%3E");
    }

    .icon-cloud-upload {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-cloud-upload'%3E%3Cpath d='M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9'/%3E%3Cpath d='m16 16-4-4-4 4'/%3E%3C/svg%3E");
    }

    .icon-code {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-code'%3E%3Cpath d='m16 18 6-6-6-6M8 6l-6 6 6 6'/%3E%3C/svg%3E");
    }

    .icon-code_editor {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.95 23.95'%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath style='fill:none' d='M0 0h23.95v23.95H0z'/%3E%3Cpath class='cls-2' d='M10.94 4.06h-7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' transform='translate(-.02 -.02)'/%3E%3Cpath class='cls-2' d='M18.44 2.56a2.12 2.12 0 0 1 3 3L16.7 10.3l-4 1 1-4Z' transform='translate(-.02 -.02)'/%3E%3Cpath class='cls-2' d='M5.55 8.39h3.93M5.55 12.85h4.42M5.55 17.32h10.4'/%3E%3C/svg%3E");
    }

    .icon-coffee {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-coffee'%3E%3Cpath d='M10 2v2M14 2v2M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1M6 2v2'/%3E%3C/svg%3E");
    }

    .icon-command {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-command'%3E%3Cpath d='M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z'/%3E%3C/svg%3E");
    }

    .icon-copy {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-copy'%3E%3Crect x='9' y='9' width='13' height='13' rx='2' ry='2'/%3E%3Cpath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/%3E%3C/svg%3E");
    }

    .icon-copyright {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M15 9.354a4 4 0 1 0 0 5.292'/%3E%3C/svg%3E");
    }

    .icon-corner-down-left {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-corner-down-left'%3E%3Cpath d='m9 10-5 5 5 5'/%3E%3Cpath d='M20 4v7a4 4 0 0 1-4 4H4'/%3E%3C/svg%3E");
    }

    .icon-corner-down-right {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-corner-down-right'%3E%3Cpath d='m15 10 5 5-5 5'/%3E%3Cpath d='M4 4v7a4 4 0 0 0 4 4h12'/%3E%3C/svg%3E");
    }

    .icon-cube {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-box'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/%3E%3Cpath d='M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12'/%3E%3C/svg%3E");
    }

    .icon-cursor {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12.1 19.2V4.6m-1.8 6.9h3.5m-6.2-9h1.1C10.5 2.5 12 4 12 5.7v12.5c0 1.8-1.4 3.2-3.2 3.2H7.6m8.8.1h-1.1c-1.8 0-3.2-1.4-3.2-3.2V5.7c0-1.8 1.4-3.2 3.2-3.2h1.1' style='fill:none;stroke:%23000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round'/%3E%3C/svg%3E");
    }

    .icon-decline {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cstyle%3E.st2{fill:none;stroke:%23000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}%3C/style%3E%3Cg id='Layer_1_1_'%3E%3Cpath style='fill:none' d='M0 0h24v24H0z' id='Layer_2_1_'/%3E%3C/g%3E%3Ccircle cx='12' cy='12' r='10.8' style='fill:none;stroke:%23000;stroke-width:2'/%3E%3Cpath class='st2' d='m15 9-6 6M9 9l6 6'/%3E%3C/svg%3E");
    }

    .icon-diamond-plus {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-diamond-plus-icon lucide-diamond-plus'%3E%3Cpath d='M12 8v8M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0zM8 12h8'/%3E%3C/svg%3E");
    }

    .icon-diamond {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-diamond-icon lucide-diamond'%3E%3Cpath d='M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z'/%3E%3C/svg%3E");
    }

    .icon-discord {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg width='24' height='24' viewBox='0 -28.5 256 256' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid'%3E%3Cpath d='M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z' fill='%23fff'/%3E%3C/svg%3E");
    }

    .icon-download {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M8 12l4 4 4-4M12 2v14'/%3E%3C/svg%3E");
    }

    .icon-edit {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-edit-2'%3E%3Cpath d='m16 3 5 5L8 21H3v-5L16 3z'/%3E%3C/svg%3E");
    }

    .icon-edit2 {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cstyle%3E.st1{fill:none;stroke:%23000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}%3C/style%3E%3Cg id='Layer_1'%3E%3Cpath style='fill:none' d='M0 0h24v24H0z' id='Layer_2_1_'/%3E%3Cpath class='st1' d='M10.9 3.5H3.4c-.6 0-1.1.2-1.5.6-.5.4-.7 1-.7 1.5v15c0 .6.2 1.1.6 1.5s.9.6 1.5.6h15c.6 0 1.1-.2 1.5-.6s.6-.9.6-1.5v-7.5'/%3E%3Cpath class='st1' d='M18.9 1.9c.4-.4 1-.7 1.6-.7s1.2.2 1.6.7c.4.4.7 1 .7 1.6s-.2 1.2-.7 1.6L11.9 15.3l-4.3 1.1 1.1-4.3L18.9 1.9z'/%3E%3C/g%3E%3C/svg%3E");
    }

    .icon-editbox {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-edit'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E");
    }

    .icon-electron {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' fill='%2347848f' fill-rule='evenodd'%3E%3Cpath d='M23.3 13.756c-8.363-1.523-14.976.07-17.612 4.636-1.967 3.406-1.405 7.923 1.363 12.75a.86.86 0 0 0 1.171.317.86.86 0 0 0 .317-1.171c-2.493-4.35-2.978-8.247-1.366-11.04 2.2-3.792 8.088-5.214 15.82-3.806a.86.86 0 0 0 .997-.69.86.86 0 0 0-.69-.997zM11.4 37c3.382 3.716 7.775 7.202 12.786 10.095C36.328 54.1 49.243 55.98 55.6 51.64a.86.86 0 0 0 .225-1.192.86.86 0 0 0-1.192-.225c-5.697 3.884-17.966 2.106-29.6-4.605-4.86-2.806-9.115-6.182-12.375-9.764a.86.86 0 0 0-1.212-.057.86.86 0 0 0-.057 1.212zm42.178-1.033c5.476-6.47 7.388-12.976 4.758-17.53-1.935-3.352-6.026-5.122-11.464-5.192a.86.86 0 0 0-.869.846.86.86 0 0 0 .846.869c4.9.064 8.415 1.588 10 4.335 2.185 3.784.48 9.586-4.582 15.566a.86.86 0 0 0 .1 1.209.86.86 0 0 0 1.209-.1zM39.504 14.04c-4.95 1.06-10.222 3.135-15.283 6.057C11.697 27.327 3.527 38 4.66 45.72a.86.86 0 0 0 .973.724.86.86 0 0 0 .724-.973c-1.007-6.864 6.737-16.97 18.72-23.9 4.9-2.835 10.013-4.843 14.785-5.866a.86.86 0 0 0 .659-1.018.86.86 0 0 0-1.018-.659z'/%3E%3Cpath d='M19.215 51.082C22.078 59.077 26.762 64 32.03 64c3.842 0 7.396-2.62 10.167-7.23a.86.86 0 0 0-.293-1.177.86.86 0 0 0-1.177.293c-2.5 4.143-5.55 6.397-8.697 6.397-4.375 0-8.553-4.4-11.2-11.78a.86.86 0 0 0-1.097-.518.86.86 0 0 0-.518 1.097zm26.153-1.564c1.482-4.737 2.278-10.2 2.278-15.895 0-14.208-4.973-26.456-12.056-29.6a.86.86 0 0 0-1.132.436.86.86 0 0 0 .436 1.132C41.212 8.395 45.93 20.02 45.93 33.624c0 5.524-.77 10.816-2.2 15.383a.86.86 0 0 0 .562 1.075.86.86 0 0 0 1.075-.562zm16.152-.84c0-2.267-1.838-4.105-4.105-4.105S53.3 46.4 53.3 48.678s1.838 4.105 4.105 4.105 4.105-1.838 4.105-4.105zm-1.715 0a2.39 2.39 0 0 1-2.389 2.389 2.39 2.39 0 0 1-2.389-2.389 2.39 2.39 0 0 1 2.389-2.389 2.39 2.39 0 0 1 2.389 2.389z'/%3E%3Cpath d='M6.584 52.783a4.105 4.105 0 0 0 0-8.21 4.1 4.1 0 1 0 .001 8.21zm0-1.715a2.39 2.39 0 0 1-2.389-2.389 2.39 2.39 0 0 1 2.389-2.389 2.39 2.39 0 0 1 2.389 2.389 2.39 2.39 0 0 1-2.389 2.389zM32.03 8.2c2.267 0 4.105-1.838 4.105-4.105S34.296 0 32.03 0s-4.105 1.838-4.105 4.105S29.763 8.2 32.03 8.2zm0-1.715a2.39 2.39 0 0 1-2.389-2.389 2.39 2.39 0 0 1 2.389-2.389 2.39 2.39 0 0 1 2.389 2.389 2.39 2.39 0 0 1-2.389 2.389zm.626 30.04a2.97 2.97 0 1 1-1.254-5.806 2.97 2.97 0 1 1 1.254 5.806z'/%3E%3C/svg%3E");
    }

    .icon-external {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-external-link'%3E%3Cpath d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3'/%3E%3C/svg%3E");
    }

    .icon-eye-off {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22'/%3E%3C/svg%3E");
    }

    .icon-eye {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-eye'%3E%3Cpath d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E");
    }

    .icon-facebook {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-facebook'%3E%3Cpath d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'/%3E%3C/svg%3E");
    }

    .icon-fast-forward {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-fast-forward'%3E%3Cpath d='m13 19 9-7-9-7v14zM2 19l9-7-9-7v14z'/%3E%3C/svg%3E");
    }

    .icon-file-audio-2 {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-file-audio-2'%3E%3Cpath d='M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4'/%3E%3Ccircle cx='3' cy='17' r='1'/%3E%3Cpath d='M2 17v-3a4 4 0 0 1 8 0v3'/%3E%3Ccircle cx='9' cy='17' r='1'/%3E%3C/svg%3E");
    }

    .icon-file-box {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-file-box'%3E%3Cpath d='M14.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4M3 13.1a2 2 0 0 0-1 1.76v3.24a2 2 0 0 0 .97 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01ZM7 17v5'/%3E%3Cpath d='M11.7 14.2 7 17l-4.7-2.8'/%3E%3C/svg%3E");
    }

    .icon-file-code {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-file-code'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4M10 13l-2 2 2 2M14 17l2-2-2-2'/%3E%3C/svg%3E");
    }

    .icon-file-image {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-file-image'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4'/%3E%3Ccircle cx='10' cy='12' r='2'/%3E%3Cpath d='m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22'/%3E%3C/svg%3E");
    }

    .icon-file-json {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-file-json'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1'/%3E%3C/svg%3E");
    }

    .icon-file-plus {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-file-plus'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/%3E%3Cpath d='M14 2v6h6M12 18v-6M9 15h6'/%3E%3C/svg%3E");
    }

    .icon-file-spreadsheet {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-file-spreadsheet'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4M8 13h2M14 13h2M8 17h2M14 17h2'/%3E%3C/svg%3E");
    }

    .icon-file-symlink {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v7'/%3E%3Cpath d='M14 2v6h6M10 18l3-3-3-3'/%3E%3Cpath d='M4 18v-1a2 2 0 0 1 2-2h6'/%3E%3C/svg%3E");
    }

    .icon-file-text {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-file-text'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8'/%3E%3C/svg%3E");
    }

    .icon-file-type {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-file-type'%3E%3Cpath d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4M9 13v-1h6v1M12 12v6M11 18h2'/%3E%3C/svg%3E");
    }

    .icon-file-video-2 {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-file-video-2'%3E%3Cpath d='M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4'/%3E%3Cpath d='M14 2v4a2 2 0 0 0 2 2h4'/%3E%3Crect width='8' height='6' x='2' y='12' rx='1'/%3E%3Cpath d='m10 15.5 4 2.5v-6l-4 2.5'/%3E%3C/svg%3E");
    }

    .icon-file {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'/%3E%3Cpath d='M13 2v7h7'/%3E%3C/svg%3E");
    }

    .icon-files {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-files'%3E%3Cpath d='M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z'/%3E%3Cpath d='M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8M15 2v5h5'/%3E%3C/svg%3E");
    }

    .icon-film {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-film'%3E%3Crect x='2' y='2' width='20' height='20' rx='2.18' ry='2.18'/%3E%3Cpath d='M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5'/%3E%3C/svg%3E");
    }

    .icon-fold-horizontal {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-fold-horizontal-icon lucide-fold-horizontal'%3E%3Cpath d='M2 12h6M22 12h-6M12 2v2M12 8v2M12 14v2M12 20v2M19 9l-3 3 3 3M5 15l3-3-3-3'/%3E%3C/svg%3E");
    }

    .icon-fold-vertical {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-fold-vertical-icon lucide-fold-vertical'%3E%3Cpath d='M12 22v-6M12 8V2M4 12H2M10 12H8M16 12h-2M22 12h-2M15 19l-3-3-3 3M15 5l-3 3-3-3'/%3E%3C/svg%3E");
    }

    .icon-folder {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-folder'%3E%3Cpath d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");
    }

    .icon-git-commit-horizontal {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-git-commit-horizontal'%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3Cpath d='M3 12h6M15 12h6'/%3E%3C/svg%3E");
    }

    .icon-git-commit-vertical {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-git-commit-vertical'%3E%3Cpath d='M12 3v6'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3Cpath d='M12 15v6'/%3E%3C/svg%3E");
    }

    .icon-github {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-github'%3E%3Cpath d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'/%3E%3Cpath d='M9 18c-4.51 2-5-2-7-2'/%3E%3C/svg%3E");
    }

    .icon-gizmo {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath class='st0' d='M20.7 19.6 12 14.5l-8.7 5.1M12 4.4v10.1'/%3E%3Ccircle class='st1' cx='12' cy='4.4' r='1.9'/%3E%3Ccircle class='st1' cx='3.3' cy='19.6' r='1.9'/%3E%3Ccircle class='st1' cx='20.7' cy='19.6' r='1.9'/%3E%3C/svg%3E");
    }

    .icon-globe {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-globe'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20'/%3E%3C/svg%3E");
    }

    .icon-grid {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-grid'%3E%3Cpath d='M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z'/%3E%3C/svg%3E");
    }

    .icon-grip {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-grip'%3E%3Ccircle cx='12' cy='5' r='1'/%3E%3Ccircle cx='19' cy='5' r='1'/%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3Ccircle cx='12' cy='12' r='1'/%3E%3Ccircle cx='19' cy='12' r='1'/%3E%3Ccircle cx='5' cy='12' r='1'/%3E%3Ccircle cx='12' cy='19' r='1'/%3E%3Ccircle cx='19' cy='19' r='1'/%3E%3Ccircle cx='5' cy='19' r='1'/%3E%3C/svg%3E");
    }

    .icon-hash {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-hash'%3E%3Cpath d='M4 9h16M4 15h16M10 3 8 21M16 3l-2 18'/%3E%3C/svg%3E");
    }

    .icon-headphones {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-headphones'%3E%3Cpath d='M3 18v-6a9 9 0 0 1 18 0v6'/%3E%3Cpath d='M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z'/%3E%3C/svg%3E");
    }

    .icon-heart-fill {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' class='feather feather-heart'%3E%3Cpath fill='currentColor' d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3C/svg%3E");
    }

    .icon-heart {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-heart'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3C/svg%3E");
    }

    .icon-help {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-help-circle'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01'/%3E%3C/svg%3E");
    }

    .icon-image {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpath d='m21 15-5-5L5 21'/%3E%3C/svg%3E");
    }

    .icon-info {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-info'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 16v-4M12 8h0'/%3E%3C/svg%3E");
    }

    .icon-instagram {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-instagram'%3E%3Crect x='2' y='2' width='20' height='20' rx='5' ry='5'/%3E%3Cpath d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h0'/%3E%3C/svg%3E");
    }

    .icon-keyframe_next {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath d='M10.7 10.7 7.3 7.2c-.3-.4-.8-.6-1.2-.6-.6 0-1.1.2-1.5.6l-3.4 3.4c-.4.3-.6.7-.6 1.2s.2 1.1.6 1.5l3.4 3.5c.4.4.9.6 1.4.6.5 0 1-.2 1.4-.6l3.4-3.4c.4-.3.6-.7.6-1.2 0-.6-.2-1.1-.7-1.5zM15.6 8.6l3 1.7 3 1.7-3 1.7-3 1.7V8.6m0-2c-1 0-2 .8-2 2v6.8c0 1.2 1 2 2 2 .3 0 .7-.1 1-.3l3-1.7 3-1.7c1.3-.8 1.3-2.7 0-3.5l-3-1.7-3-1.7c-.3-.1-.7-.2-1-.2z'/%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3C/svg%3E");
    }

    .icon-keyframe_previous {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath d='m13.3 13.3 3.4 3.4c.3.4.7.6 1.2.6s1.1-.2 1.5-.6l3.4-3.4c.4-.3.6-.7.6-1.2s-.2-1.1-.6-1.5l-3.4-3.5c-.4-.4-.9-.6-1.4-.6-.5 0-1 .2-1.4.6l-3.4 3.4c-.4.3-.6.7-.6 1.2 0 .7.2 1.2.7 1.6zM8.4 15.4l-3-1.7-3-1.7 3-1.7 3-1.7v6.8m0 2c1 0 2-.8 2-2V8.6c0-1.2-1-2-2-2-.3 0-.7.1-1 .3l-3 1.7-3 1.7c-1.3.8-1.3 2.7 0 3.5l3 1.7 3 1.7c.3.1.7.2 1 .2z'/%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3C/svg%3E");
    }

    .icon-laptop {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='12' rx='2' ry='2'/%3E%3Cpath d='M2 20h20'/%3E%3C/svg%3E");
    }

    .icon-link {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-external-link'%3E%3Cpath d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3'/%3E%3C/svg%3E");
    }

    .icon-list-minus {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-list-minus-icon lucide-list-minus'%3E%3Cpath d='M11 12H3M16 6H3M16 18H3M21 12h-6'/%3E%3C/svg%3E");
    }

    .icon-list-plus {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-list-plus-icon lucide-list-plus'%3E%3Cpath d='M11 12H3M16 6H3M16 18H3M18 9v6M21 12h-6'/%3E%3C/svg%3E");
    }

    .icon-list {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-list'%3E%3Cpath d='M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0'/%3E%3C/svg%3E");
    }

    .icon-loader {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 12a9 9 0 1 1-6.219-8.56'/%3E%3C/svg%3E");
    }

    .icon-lock {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-lock'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E");
    }

    .icon-logs {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-logs'%3E%3Cpath d='M13 12h8M13 18h8M13 6h8M3 12h1M3 18h1M3 6h1M8 12h1M8 18h1M8 6h1'/%3E%3C/svg%3E");
    }

    .icon-mastodon {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M3.018 12.008c-.032-1.26-.012-2.448-.012-3.442 0-4.338 2.843-5.61 2.843-5.61 1.433-.658 3.892-.935 6.45-.956h.062c2.557.02 5.018.298 6.451.956 0 0 2.843 1.272 2.843 5.61 0 0 .036 3.201-.396 5.424-.275 1.41-2.457 2.955-4.963 3.254-1.306.156-2.593.3-3.965.236-2.243-.103-4.014-.535-4.014-.535 0 .218.014.426.04.62.084.633.299 1.095.605 1.435.766.85 2.106.93 3.395.974 1.82.063 3.44-.449 3.44-.449l.076 1.646s-1.274.684-3.542.81c-1.25.068-2.803-.032-4.612-.51-1.532-.406-2.568-1.29-3.27-2.471-1.093-1.843-1.368-4.406-1.431-6.992zm3.3 4.937v-2.548l2.474.605a20.54 20.54 0 0 0 1.303.245c.753.116 1.538.2 2.328.235 1.019.047 1.901-.017 3.636-.224 1.663-.199 3.148-1.196 3.236-1.65.082-.422.151-.922.206-1.482a33.6 33.6 0 0 0 .137-2.245c.015-.51.02-.945.017-1.256v-.059c0-1.43-.369-2.438-.963-3.158a3.008 3.008 0 0 0-.584-.548c-.09-.064-.135-.089-.13-.087-1.013-.465-3.093-.752-5.617-.773h-.046c-2.54.02-4.62.308-5.65.782.023-.01-.021.014-.112.078a3.008 3.008 0 0 0-.584.548c-.594.72-.963 1.729-.963 3.158 0 .232 0 .397-.003.875a77.483 77.483 0 0 0 .014 2.518c.054 2.197.264 3.835.7 5.041.212.587.472 1.07.78 1.45a5.7 5.7 0 0 1-.18-1.505zM8.084 6.37a1.143 1.143 0 1 1 0 2.287 1.143 1.143 0 0 1 0-2.287z'/%3E%3C/svg%3E");
    }

    .icon-maximize {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'/%3E%3C/svg%3E");
    }

    .icon-maximize2 {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-maximize-2'%3E%3Cpath d='M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7'/%3E%3C/svg%3E");
    }

    .icon-menu {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-menu'%3E%3Cpath d='M3 12h18M3 6h18M3 18h18'/%3E%3C/svg%3E");
    }

    .icon-message-square-text {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-message-square-text'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM13 8H7M17 12H7'/%3E%3C/svg%3E");
    }

    .icon-message {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3Cpath d='M20.9 18.4h-8.3l-6.3 4.2v-4.2H3.1c-1.1 0-2-.9-2-2v-13c0-1.1.9-2 2-2h17.8c1.1 0 2 .9 2 2v13c0 1.1-.9 2-2 2z' style='fill:none;stroke:%23000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round'/%3E%3C/svg%3E");
    }

    .icon-minimize2 {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-minimize-2'%3E%3Cpath d='M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7'/%3E%3C/svg%3E");
    }

    .icon-minus {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-minus'%3E%3Cpath d='M5 12h14'/%3E%3C/svg%3E");
    }

    .icon-monitor {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='3' width='20' height='14' rx='2' ry='2'/%3E%3Cpath d='M8 21h8M12 17v4'/%3E%3C/svg%3E");
    }

    .icon-moon {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'/%3E%3C/svg%3E");
    }

    .icon-more-horizontal {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cstyle%3E.st1{fill:none;stroke:%23000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}%3C/style%3E%3Cpath style='fill:none' d='M0 0h24v24H0z' id='Layer_2'/%3E%3Cg id='Layer_1'%3E%3Ccircle class='st1' cx='12' cy='12' r='1'/%3E%3Ccircle class='st1' cx='19' cy='12' r='1'/%3E%3Ccircle class='st1' cx='5' cy='12' r='1'/%3E%3C/g%3E%3C/svg%3E");
    }

    .icon-more-vertical {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cstyle%3E.st1{fill:none;stroke:%23000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}%3C/style%3E%3Cpath style='fill:none' d='M0 0h24v24H0z' id='Layer_2'/%3E%3Cg id='Layer_1'%3E%3Ccircle class='st1' cx='12' cy='12' r='1'/%3E%3Ccircle class='st1' cx='12' cy='19' r='1'/%3E%3Ccircle class='st1' cx='12' cy='5' r='1'/%3E%3C/g%3E%3C/svg%3E");
    }

    .icon-mouse_lmb {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3Cpath d='M13.3.5h-.1c-.5 0-1 .4-1.1.9 0 .6.4 1 .9 1.1h.1c2.9.3 5 2.6 5 5.5v8c0 3-2.5 5.5-5.5 5.5h-1.2c-3 0-5.5-2.5-5.5-5.5v-4c0-.6-.4-1-1-1s-1 .4-1 1v4c0 4.1 3.4 7.5 7.5 7.5h1.2c4.1 0 7.5-3.4 7.5-7.5V8c0-3.9-2.9-7.1-6.8-7.5z'/%3E%3Cpath d='M4.9 9h4.2c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7V1.9c0-.3-.2-.6-.4-.8-.3-.2-.7-.2-1-.1-2.8 1.1-4.8 3.9-4.8 7 0 .6.5 1 1 1z'/%3E%3C/svg%3E");
    }

    .icon-mouse_lmb_drag {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3Cpath d='M19.9.9c-.3-.5-.9-.6-1.4-.2-.4.3-.5.9-.2 1.4 1.2 1.7 1.8 3.7 1.8 5.8v8c0 .6.4 1 1 1s1-.4 1-1v-8c0-2.5-.7-4.9-2.2-7zM11.3.5h-.1c-.5 0-1 .4-1.1.9 0 .6.4 1 .9 1.1h.1c2.9.3 5 2.6 5 5.5v8c0 3-2.5 5.5-5.5 5.5H9.4c-3 0-5.5-2.5-5.5-5.5v-4c0-.6-.4-1-1-1s-1 .4-1 1v4c0 4.1 3.4 7.5 7.5 7.5h1.2c4.1 0 7.5-3.4 7.5-7.5V8c0-3.9-2.9-7.1-6.8-7.5z'/%3E%3Cpath d='M2.9 9h4.2c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7V1.9c0-.3-.2-.6-.4-.8-.3-.2-.7-.2-1-.1-2.9 1.1-4.8 3.9-4.8 7 0 .6.5 1 1 1z'/%3E%3C/svg%3E");
    }

    .icon-mouse_mmb {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12.6 23.5h-1.2c-4.1 0-7.5-3.4-7.5-7.5V8c0-1.9.7-3.8 2.1-5.2C7.4 1.3 9.4.5 11.4.5h1.2c2 0 4 .8 5.4 2.3 1.4 1.4 2.1 3.3 2.1 5.2v8c0 4.1-3.4 7.5-7.5 7.5zm-1.2-21c-1.5 0-2.9.6-4 1.7-1 1-1.5 2.4-1.5 3.8v8c0 3 2.5 5.5 5.5 5.5h1.2c3 0 5.5-2.5 5.5-5.5V8c0-1.4-.5-2.8-1.5-3.8-1-1.1-2.4-1.7-3.9-1.7h-1.3z'/%3E%3Cpath d='M12 8.6c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2s2 .9 2 2v4.1c0 1-.9 1.9-2 1.9z'/%3E%3C/svg%3E");
    }

    .icon-mouse_mmb_drag {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath d='M0 0h24v24H0V0z' style='fill:none'/%3E%3Cpath d='M19.9.9c-.3-.5-.9-.6-1.4-.2-.4.3-.5.9-.2 1.4 1.2 1.7 1.8 3.7 1.8 5.8v8c0 .6.4 1 1 1s1-.4 1-1v-8c0-2.5-.7-4.9-2.2-7zM10.6 23.5H9.4c-4.1 0-7.5-3.4-7.5-7.5V8c0-1.9.7-3.8 2.1-5.2C5.4 1.3 7.4.5 9.4.5h1.2c2 0 4 .8 5.4 2.3 1.4 1.4 2.1 3.3 2.1 5.2v8c0 4.1-3.4 7.5-7.5 7.5zm-1.2-21c-1.5 0-2.9.6-4 1.7-1 1-1.5 2.4-1.5 3.8v8c0 3 2.5 5.5 5.5 5.5h1.2c3 0 5.5-2.5 5.5-5.5V8c0-1.4-.5-2.8-1.5-3.8-1-1.1-2.4-1.7-3.9-1.7H9.4z'/%3E%3Cpath d='M10 8.6c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2s2 .9 2 2v4.1c0 1-.9 1.9-2 1.9z'/%3E%3C/svg%3E");
    }

    .icon-mouse_rmb {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3Cpath d='M10.7.5h.1c.5 0 1 .4 1.1.9 0 .6-.4 1-.9 1.1h-.1c-2.9.3-5 2.6-5 5.5v8c0 3 2.5 5.5 5.5 5.5h1.2c3 0 5.5-2.5 5.5-5.5v-4c0-.6.4-1 1-1s1 .4 1 1v4c0 4.1-3.4 7.5-7.5 7.5h-1.2c-4.1 0-7.5-3.4-7.5-7.5V8C3.9 4.1 6.8.9 10.7.5z'/%3E%3Cpath d='M19.1 9h-4.2c-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7V1.9c0-.3.2-.6.4-.8.3-.2.7-.2 1-.1 2.9 1.1 4.8 3.9 4.8 7 0 .6-.5 1-1 1z'/%3E%3C/svg%3E");
    }

    .icon-mouse_rmb_drag {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3Cpath d='M19.9.9c-.3-.5-.9-.6-1.4-.2-.4.3-.5.9-.2 1.4 1.2 1.7 1.8 3.7 1.8 5.8v8c0 .6.4 1 1 1s1-.4 1-1v-8c0-2.5-.7-4.9-2.2-7zM8.7.5h.1c.5 0 1 .4 1.1.9 0 .6-.4 1-.9 1.1h-.1c-2.9.3-5 2.6-5 5.5v8c0 3 2.5 5.5 5.5 5.5h1.2c3 0 5.5-2.5 5.5-5.5v-4c0-.6.4-1 1-1s1 .4 1 1v4c0 4.1-3.4 7.5-7.5 7.5H9.4c-4.1 0-7.5-3.4-7.5-7.5V8C1.9 4.1 4.8.9 8.7.5z'/%3E%3Cpath d='M17.1 9h-4.2c-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7V1.9c0-.3.2-.6.4-.8.3-.2.7-.2 1-.1 2.9 1.1 4.8 3.9 4.8 7 0 .6-.5 1-1 1z'/%3E%3C/svg%3E");
    }

    .icon-mouse_wheel {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12.6 23.5h-1.2c-4.1 0-7.5-3.4-7.5-7.5V8C3.9 3.9 7.3.5 11.4.5h1.2c4.1 0 7.5 3.4 7.5 7.5v8c0 4.1-3.4 7.5-7.5 7.5zm-1.2-21C8.4 2.5 5.9 5 5.9 8v8c0 3 2.5 5.5 5.5 5.5h1.2c3 0 5.5-2.5 5.5-5.5V8c0-3-2.5-5.5-5.5-5.5h-1.2z'/%3E%3Cpath d='M12 11.6c-1.1 0-2-.9-2-2V6.5c0-1.1.9-2 2-2s2 .9 2 2v3.1c0 1.1-.9 2-2 2z'/%3E%3C/svg%3E");
    }

    .icon-move-h {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cstyle%3E.st1{fill:none;stroke:%23000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}%3C/style%3E%3Cpath style='fill:none' d='M0 0h24v24H0z' id='Layer_2'/%3E%3Cg id='Layer_1'%3E%3Cpath class='st1' d='m19 9 3 3-3 3M5 15l-3-3 3-3M22 12H2'/%3E%3C/g%3E%3C/svg%3E");
    }

    .icon-move-v {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='enable-background:new 0 0 24 24' xml:space='preserve'%3E%3Cstyle%3E.st1{fill:none;stroke:%23000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}%3C/style%3E%3Cpath style='fill:none' d='M0 0h24v24H0z' id='Layer_2'/%3E%3Cg id='Layer_1'%3E%3Cpath class='st1' d='m9 5 3-3 3 3M15 19l-3 3-3-3M12 2v20'/%3E%3C/g%3E%3C/svg%3E");
    }

    .icon-os-apple {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg height='56.693' width='56.693' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M41.777 30.517c-.062-6.232 5.082-9.221 5.312-9.372-2.891-4.227-7.395-4.807-8.998-4.873-3.83-.389-7.477 2.256-9.42 2.256-1.939 0-4.941-2.199-8.117-2.143-4.178.062-8.029 2.43-10.179 6.17-4.339 7.527-1.11 18.682 3.118 24.791 2.067 2.986 4.532 6.346 7.766 6.223 3.117-.123 4.293-2.016 8.061-2.016s4.826 2.016 8.123 1.953c3.352-.061 5.477-3.043 7.527-6.041 2.373-3.469 3.35-6.828 3.408-6.998-.073-.034-6.534-2.509-6.601-9.95zM35.582 12.229c1.715-2.082 2.877-4.975 2.561-7.855-2.475.1-5.471 1.645-7.248 3.725-1.592 1.846-2.984 4.785-2.611 7.613 2.761.214 5.577-1.405 7.298-3.483z'/%3E%3C/svg%3E");
    }

    .icon-os-linux {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg height='30' width='30' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-rule='evenodd' fill-rule='evenodd'%3E%3Cpath d='M25.019 20.877c.646.277.914.816 1.034 1.438.129.664.327 1.285.829 1.771.067.064.115.15.167.23.618.939.477 1.602-.49 2.162-.433.252-.891.461-1.338.686a5.618 5.618 0 0 0-1.765 1.348c-.636.73-1.413 1.256-2.392 1.439-1.171.219-2.2-.293-2.7-1.387-.107-.234-.228-.305-.48-.318-.621-.037-1.242-.1-1.858-.191-1.085-.16-2.127.107-3.184.262-.418.061-.709.199-.986.555-.546.701-1.372.881-2.204.771-.675-.09-1.368-.26-1.98-.549-.892-.418-1.815-.611-2.775-.715a10.654 10.654 0 0 1-1.084-.164c-.963-.209-1.42-.834-1.164-1.779.211-.779.24-1.521.14-2.316-.143-1.135.201-1.668 1.328-1.988.902-.256 1.245-1.037 1.797-1.627.043-.047.035-.156.028-.234-.157-1.541.303-2.947.949-4.307.708-1.49 1.657-2.825 2.686-4.108 1.119-1.395 1.572-3 1.458-4.777-.085-1.338-.199-2.678.123-4.006.42-1.74 1.616-2.844 3.394-3.012.759-.072 1.556-.104 2.295.045 1.727.346 2.545 1.613 2.931 3.223.303 1.264.342 2.553.286 3.84-.055 1.242.231 2.365.979 3.359.538.715 1.128 1.391 1.632 2.129.632.928 1.274 1.86 1.775 2.86.834 1.663 1.152 3.323.569 5.36zM11.33 24.633c.435.732.932 1.324 1.756 1.607 1.837.633 3.51.25 5.096-.74.177-.109.36-.332.396-.527.168-.943.287-1.896.422-2.848.126-.893.308-1.754 1.223-2.219.079-.041.118-.186.149-.289.168-.549.438-.813.991-.727 1.104.172 2.2.418 2.577 1.764.226-.375.112-.697-.124-.938-.268-.275-.58-.539-.923-.701-.436-.203-.591-.402-.551-.941.137-1.842-.721-3.307-1.951-4.593-.026-.027-.074-.035-.112-.051 1.25 1.479 2.077 3.052 1.493 5.054-.656-.049-.665-.047-.724-.334-.246-1.195-.733-2.295-1.269-3.383a38.216 38.216 0 0 1-1.211-2.788c-.325-.824-.586-1.678-.868-2.496-.308.203-.597.418-.908.596-.394.225-.811.406-1.205.631-.997.566-1.807.49-2.679-.26-.239-.207-.504-.383-.812-.613-.149 1.578-.68 2.939-1.274 4.282a95.439 95.439 0 0 1-.823 1.811c-.532 1.137-.817 2.336-.927 3.672-.479-.693-.612-1.377-.565-2.105.06-.941.401-1.793.836-2.615.165-.313.311-.633.467-.952l-.091-.041c-.689 1.088-1.312 2.211-1.562 3.492-.326 1.668.228 2.766 1.679 3.627.911.539 1.743 1.199 2.233 2.18.395.785.14 1.273-.739 1.445zm-1.918 4.08c.843-.063 1.447-.176 1.793-.793.346-.615.231-1.213-.14-1.773-.234-.355-.507-.686-.743-1.041-.442-.668-.875-1.344-1.302-2.021-.308-.49-.559-1.02-.907-1.477-.517-.68-1.411-.99-2.092.072a2.62 2.62 0 0 1-1.52 1.143c-.686.207-.873.613-.816 1.336.042.547.124 1.129-.008 1.645-.305 1.193-.102 1.574 1.121 1.699 1.11.115 2.193.291 3.212.814.482.246 1.06.304 1.402.396zm11.278-7.754c-.163.207-.37.383-.459.607a3.812 3.812 0 0 0-.286 1.098c-.096 1.156-.208 2.303-.6 3.404-.08.225-.126.461-.169.695-.134.719-.063 1.389.549 1.887.603.494 1.294.51 1.953.191.484-.232.974-.537 1.335-.928.64-.693 1.384-1.195 2.225-1.588.323-.15.642-.32.936-.52.339-.23.405-.502.225-.873a2.958 2.958 0 0 0-.448-.684c-.318-.35-.483-.758-.581-1.207-.062-.279-.127-.563-.244-.82-.278-.621-1.081-.758-1.628-.359a4.333 4.333 0 0 1-1.162.596c-.52.176-.978-.029-1.247-.506-.161-.284-.249-.608-.399-.993zm-6.282-10.48c.155-.041.431-.068.667-.182.612-.287 1.208-.609 1.806-.926.112-.059.214-.141.31-.225.642-.572.539-1.207-.244-1.553a73.85 73.85 0 0 1-1.674-.756c-.73-.338-1.436-.357-2.099.15-.427.326-.844.666-1.26 1.006-.249.201-.308.457-.181.756.201.471 1.813 1.648 2.334 1.701.075.01.151.014.341.029zm2.157-3.369c.148.064.264.104.366.164.337.201.564.066.626-.268.091-.498.213-1.018.148-1.508-.107-.818-.719-1.375-1.358-1.408-.768-.037-1.407.598-1.546 1.531-.107.717-.088.744.611.908.075-.299.104-.621.243-.885.09-.172.343-.363.517-.357.174.004.409.211.498.389.234.466.155.946-.105 1.434zm4.688 13.349c.024.4.109.84.544 1.045.413.197.784-.023 1.12-.268.083-.061.16-.135.227-.213.239-.275.236-.604-.064-.811a3.717 3.717 0 0 0-.917-.465c-.609-.202-.914.04-.91.712zM13.159 6.647c.2-.158.511-.283.529-.443.068-.594-.086-1.16-.547-1.588-.403-.373-.884-.316-1.233.121-.561.699-.47 2.047.196 2.703l.354-.264c-.33-.363-.396-.779-.298-1.199.042-.178.242-.316.37-.473.145.123.339.221.421.377.109.208.131.46.208.766z'/%3E%3Cpath d='M12.789 10.696c.083.07.167.137.247.211.788.73 1.405.816 2.355.314.274-.145.537-.313.811-.461a.644.644 0 0 1 .343-.07c-.781.41-1.452 1.1-2.443.963-.592-.082-.998-.461-1.385-.861a4 4 0 0 0 .072-.096z'/%3E%3C/g%3E%3C/svg%3E");
    }

    .icon-os-win {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg height='56.693' width='56.693' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m3.765 46.362 19.836 2.873V30.257H3.765v16.105zm0-18.816h19.836V8.566L3.765 11.439v16.107zm22.547 22.082 26.616 3.855V30.257H26.312v19.371zm0-41.456v19.374h26.616V4.319L26.312 8.172z'/%3E%3C/svg%3E");
    }

    .icon-patch_center {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath style='fill:none' d='M0 0h24v24H0z'/%3E%3Cpath class='cls-2' d='M8 3H5a2 2 0 0 0-2 2v3m13 13h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3M21 8V5a2 2 0 0 0-2-2h-3M3.05 11.99h6.43M6.7 9.15l2.78 2.78M6.69 14.85l2.78-2.78M20.95 12.01h-6.43M17.3 14.85l-2.78-2.78M17.31 9.15l-2.78 2.78'/%3E%3C/svg%3E");
    }

    .icon-pause {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-pause'%3E%3Cpath d='M6 4h4v16H6zM14 4h4v16h-4z'/%3E%3C/svg%3E");
    }

    .icon-pen-tool {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-pen-tool'%3E%3Cpath d='m12 19 7-7 3 3-7 7-3-3z'/%3E%3Cpath d='m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586'/%3E%3Ccircle cx='11' cy='11' r='2'/%3E%3C/svg%3E");
    }

    .icon-picker {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cdefs%3E%3Cstyle%3E.cls-1{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='m9.22 13.59 5.32-5.31-2.95-2.95-7.3 7.3a.71.71 0 0 0 0 1l1.94 1.94a.73.73 0 0 0 1 0ZM12.42 4.5l2.85-2.85a2.09 2.09 0 0 1 2.95 0h0a2.09 2.09 0 0 1 0 2.95l-2.85 2.84M10.38 4.12l5.36 5.36M5.01 14.86l-2.1 2.09M12.04 10.8H6.15M1.92 18.97h0'/%3E%3Cpath style='fill:none' d='M0 0h20v20H0z'/%3E%3C/svg%3E");
    }

    .icon-pie-chart {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-pie-chart'%3E%3Cpath d='M21.21 15.89A10 10 0 1 1 8 2.83'/%3E%3Cpath d='M22 12A10 10 0 0 0 12 2v10z'/%3E%3C/svg%3E");
    }

    .icon-pin-filled {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' xml:space='preserve'%3E%3Cpath d='M511.5 205.7c-.7-3.2-2.9-5.8-5.9-7-26.6-10.6-54.8-16-83.8-16-45.2 0-80.1 12.9-93.6 18.8L184.6 79.2c5-44.1-18.8-74.3-19.8-75.6-1.7-2.1-4.3-3.4-7-3.6-2.7-.1-5.4.9-7.4 2.8L3.1 150.1c-2 1.9-3 4.6-2.8 7.4.2 2.7 1.5 5.3 3.6 7 21.1 16.7 46.8 20.2 64.6 20.2 4 0 7.4-.2 10-.4l122.9 144.4c-8.4 21.5-34 99.2-3 177.1 1.2 3 3.8 5.2 7 5.9.6.1 1.3.2 2 .2 2.5 0 5-1 6.8-2.8l140.7-140.7L486 499.5c1.9 1.9 4.4 2.8 6.8 2.8 2.5 0 4.9-.9 6.8-2.8 3.8-3.8 3.8-9.9 0-13.7l-131-131 140.3-140.3c2.3-2.3 3.3-5.6 2.6-8.8z' style='fill:%23fff'/%3E%3C/svg%3E");
    }

    .icon-pin-off {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-pin-off'%3E%3Cpath d='m2 2 20 20M12 17v5M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h12M15 9.34V6h1a2 2 0 0 0 0-4H7.89'/%3E%3C/svg%3E");
    }

    .icon-pin-outline {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' xml:space='preserve'%3E%3Cpath d='M511.5 205.7c-.7-3.2-2.9-5.8-5.9-7-82.8-33-156.2-6.4-177.3 2.8L184.6 79.2c5-44.1-18.8-74.3-19.8-75.6-1.7-2.1-4.3-3.4-7-3.6-2.7-.1-5.4.9-7.4 2.8L3.1 150.1c-2 1.9-3 4.6-2.8 7.4.2 2.7 1.5 5.3 3.6 7 26.8 21.3 61.3 20.9 74.6 19.8l122.9 144.4c-8.4 21.5-34 99.2-3 177.1 1.2 3 3.8 5.2 7 5.9.6.1 1.3.2 2 .2 2.5 0 5-1 6.8-2.8L355 368.5l131 131c1.9 1.9 4.4 2.8 6.8 2.8 2.5 0 4.9-.9 6.8-2.8 3.8-3.8 3.8-9.9 0-13.7l-131-131 140.3-140.3c2.3-2.3 3.3-5.6 2.6-8.8zM341.1 355 211.4 484.7c-23.5-77.3 9.6-152.9 9.9-153.7 1.5-3.4 1-7.4-1.4-10.2L89.9 168c-1.8-2.2-4.6-3.4-7.4-3.4-.5 0-1 0-1.5.1-.3.1-30.6 4.6-56-9.2L155.5 25.1c5.8 11.2 13.4 31.5 9.3 56.5-.6 3.3.7 6.7 3.3 8.9l152.5 129.7c3 2.5 7.2 3 10.7 1.2.7-.4 71.3-35.7 153.3-9.8L341.1 355z' style='fill:%23fff'/%3E%3C/svg%3E");
    }

    .icon-pin {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-pin'%3E%3Cpath d='M12 17v5M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z'/%3E%3C/svg%3E");
    }

    .icon-play-circle {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-play-circle'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='m10 8 6 4-6 4V8z'/%3E%3C/svg%3E");
    }

    .icon-play {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-play'%3E%3Cpath d='m5 3 14 9-14 9V3z'/%3E%3C/svg%3E");
    }

    .icon-plus-circle {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-plus-circle'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 8v8M8 12h8'/%3E%3C/svg%3E");
    }

    .icon-plus {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 5v14M5 12h14'/%3E%3C/svg%3E");
    }

    .icon-pointer {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 14a8 8 0 0 1-8 8M18 11v-1a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1M10 9.5V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10'/%3E%3Cpath d='M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15'/%3E%3C/svg%3E");
    }

    .icon-reddit {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28.901 28.901' style='enable-background:new 0 0 28.901 28.901' xml:space='preserve'%3E%3Cpath style='fill:%23030104' d='M28.901 13.375v.183c0 .66-.2 1.261-.598 1.803a3.734 3.734 0 0 1-1.405 1.191 4.4 4.4 0 0 1 .051.387c.013.14.021.278.021.425 0 1.431-.481 2.723-1.443 3.879a9.791 9.791 0 0 1-3.068 2.498 16.093 16.093 0 0 1-3.77 1.415c-.71.146-1.416.262-2.123.353-.702.091-1.408.137-2.117.137-1.082 0-2.147-.095-3.194-.282a17.132 17.132 0 0 1-3.047-.838 14.608 14.608 0 0 1-2.94-1.533 8.185 8.185 0 0 1-2.31-2.347 5.946 5.946 0 0 1-.74-1.586 5.894 5.894 0 0 1-.254-1.695c0-.121.008-.249.019-.389.014-.138.028-.267.055-.387-.59-.325-1.048-.725-1.371-1.191C.245 14.831.021 14.24 0 13.629c0-.445.097-.868.297-1.273.199-.403.458-.767.783-1.091.348-.324.73-.577 1.147-.757a3.342 3.342 0 0 1 1.359-.271H3.912c.494 0 .962.073 1.405.217.423.144.807.343 1.157.596a4.053 4.053 0 0 1 .359-.146 12.545 12.545 0 0 1 3.328-1.235 24.885 24.885 0 0 1 3.545-.512c0-.544.049-1.089.146-1.642a4.414 4.414 0 0 1 .595-1.569c.24-.423.553-.78.939-1.076a3.503 3.503 0 0 1 1.315-.621h.036a5.79 5.79 0 0 1 1.101-.107c.964 0 1.938.196 2.923.595.397-.587.947-1.024 1.662-1.299h.033a4.759 4.759 0 0 1 1.265-.184c.494 0 .927.085 1.298.254h.038a3.262 3.262 0 0 1 1.479 1.1c.396.542.591 1.126.579 1.749 0 .146-.014.254-.036.327-.049.42-.169.795-.362 1.127a3.457 3.457 0 0 1-2.995 1.685h-.413a3.273 3.273 0 0 1-2.131-.989 3.469 3.469 0 0 1-.665-.93 2.564 2.564 0 0 1-.254-1.146v-.11a18.21 18.21 0 0 0-1.193-.388 4.486 4.486 0 0 0-1.225-.172h-.325c-.686.071-1.167.381-1.443.922a3.374 3.374 0 0 0-.423 1.208 8.625 8.625 0 0 0-.103 1.299c1.184.072 2.339.246 3.476.523 1.137.274 2.225.685 3.255 1.227l.037.036c.047 0 .098.023.145.072.194-.146.355-.247.486-.306.611-.398 1.316-.59 2.112-.579.301 0 .62.036.956.109h.036c.731.193 1.377.57 1.93 1.135.54.554.849 1.212.921 1.968zM4.885 12.076a10.692 10.692 0 0 1-.476-.144 1.599 1.599 0 0 0-.496-.071h-.18c-.445.048-.866.22-1.262.523-.352.322-.54.703-.579 1.137v.108c0 .3.085.546.254.74.118.216.259.376.415.486a7.654 7.654 0 0 1 .998-1.499c.392-.456.836-.882 1.326-1.28zM25.129 17.4c0-.494-.087-.968-.262-1.427a6.078 6.078 0 0 0-.693-1.298 7.765 7.765 0 0 0-2.257-1.969 12.233 12.233 0 0 0-2.814-1.189l-.578-.145-.559-.143a15.61 15.61 0 0 0-1.741-.272 17.326 17.326 0 0 0-1.738-.091 16.55 16.55 0 0 0-4.656.65c-.988.278-1.92.68-2.807 1.209a8.211 8.211 0 0 0-2.263 1.983 4.23 4.23 0 0 0-.956 2.726c0 .397.047.739.144 1.029.219.758.615 1.459 1.193 2.11a11.497 11.497 0 0 0 1.945 1.55l.272.127.254.146c1.034.541 2.136.936 3.309 1.181 1.172.247 2.36.37 3.564.37h.612c.201 0 .409-.01.612-.037a16.785 16.785 0 0 0 3.536-.667 11.91 11.91 0 0 0 3.211-1.515 7.097 7.097 0 0 0 1.623-1.552c.495-.613.819-1.269.976-1.967.047-.12.072-.247.072-.378l.001-.431zm-15.714.179c.169.071.354.107.56.107.468 0 .891-.156 1.263-.47.398-.323.596-.721.596-1.188V15.918c0-.443-.187-.822-.559-1.135-.396-.325-.832-.488-1.3-.488-.145 0-.267.011-.359.037a1.652 1.652 0 0 0-.857.388c-.249.21-.418.466-.516.768a.4.4 0 0 0-.073.233v.236c0 .396.109.744.327 1.046.239.289.544.48.918.576zm10.103 2.185c-.189-.098-.353-.146-.486-.146-.143 0-.297.036-.451.11a8.76 8.76 0 0 1-4.276 1.117c-1.154 0-2.225-.222-3.211-.667-.143-.049-.319-.162-.522-.343-.049-.024-.102-.046-.161-.071-.061-.024-.123-.049-.183-.071a1.128 1.128 0 0 0-.325-.075c-.071 0-.181.026-.324.075h-.04c-.144.047-.28.153-.413.323a.875.875 0 0 0-.107.451c0 .144.036.294.107.449a.752.752 0 0 0 .326.289 8.386 8.386 0 0 0 4.545 1.301h.269c.794 0 1.565-.076 2.31-.226a9.687 9.687 0 0 0 2.167-.712 4.99 4.99 0 0 1 .308-.146c.107-.047.222-.107.34-.179a.817.817 0 0 0 .311-.217.743.743 0 0 0 .215-.381.377.377 0 0 0 .038-.179c0-.071-.025-.181-.076-.325a.658.658 0 0 0-.361-.377zm1.134-4.315c.075.193.11.374.11.541 0 .373-.11.711-.326 1.013-.299.323-.606.516-.919.576h-.053a1.502 1.502 0 0 1-.505.107c-.449 0-.843-.131-1.191-.395a1.349 1.349 0 0 1-.635-.958v-.036a1.15 1.15 0 0 1-.033-.308c0-.372.115-.691.343-.955.216-.301.5-.51.848-.633.216-.07.428-.107.631-.107.374 0 .728.098 1.065.29.35.23.572.517.665.865zm1.41-9.128v.071c0 .398.156.729.468.994.329.275.687.414 1.083.414h.108a1.57 1.57 0 0 0 1.065-.414 1.59 1.59 0 0 0 .522-.994v-.071c0-.421-.173-.769-.522-1.046a1.429 1.429 0 0 0-1.102-.432c-.167 0-.306.01-.415.035-.349.071-.63.241-.845.504a1.296 1.296 0 0 0-.362.939zm4.979 7.237c0-.218-.063-.453-.181-.705-.169-.301-.428-.547-.776-.741a2.444 2.444 0 0 0-1.065-.251c-.349 0-.671.071-.971.216.492.397.938.823 1.332 1.28.398.458.729.968.994 1.535.169-.146.317-.32.452-.522.144-.244.215-.513.215-.812z'/%3E%3C/svg%3E");
    }

    .icon-redo {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 7v6h-6'/%3E%3Cpath d='M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7'/%3E%3C/svg%3E");
    }

    .icon-refresh {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-refresh-cw'%3E%3Cpath d='M23 4v6h-6M1 20v-6h6'/%3E%3Cpath d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'/%3E%3C/svg%3E");
    }

    .icon-repeat {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-repeat'%3E%3Cpath d='m17 1 4 4-4 4'/%3E%3Cpath d='M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4'/%3E%3Cpath d='M21 13v2a4 4 0 0 1-4 4H3'/%3E%3C/svg%3E");
    }

    .icon-reset_render_size {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xml:space='preserve' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round'%3E%3Cpath d='M3 7V5c0-1.097.903-2 2-2h2M17 3h2c1.097 0 2 .903 2 2v2M21 17v2c0 1.097-.903 2-2 2h-2M7 21H5c-1.097 0-2-.903-2-2v-2' style='fill:none;fill-rule:nonzero;stroke:%23000;stroke-width:2px'/%3E%3Cpath d='M13 5h6v6' style='fill:none;fill-rule:nonzero;stroke:%23000;stroke-width:1.85px' transform='matrix(0 -1.07143 1.07143 0 1.429 29.143)'/%3E%3Cpath d='M13 5h6v6' style='fill:none;fill-rule:nonzero;stroke:%23000;stroke-width:1.85px' transform='matrix(0 1.07143 -1.07143 0 22.571 -5.143)'/%3E%3C/svg%3E");
    }

    .icon-resize-window {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg width='15' height='15' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23000' stroke-width='2' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m2 1 12 12M2 7l6 6M2 13h0'/%3E%3C/g%3E%3C/svg%3E");
    }

    .icon-resize_canvas {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.95 23.95'%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath style='fill:none' d='M0 0h23.95v23.95H0z'/%3E%3Cpath class='cls-2' d='M8 3H5a2 2 0 0 0-2 2v3m13 13h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3' transform='translate(-.02 -.02)'/%3E%3Cpath class='cls-2' d='M11.21 16.79H7.27M7.18 12.75v3.94M16.96 13.07h-5.92M10.9 7v5.92M14.91 2.98h5.93M20.98 9.05V3.13M11.04 13.07l8.48-8.48'/%3E%3C/svg%3E");
    }

    .icon-rewind {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-rewind'%3E%3Cpath d='m11 19-9-7 9-7v14zM22 19l-9-7 9-7v14z'/%3E%3C/svg%3E");
    }

    .icon-rss {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-rss'%3E%3Cpath d='M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16'/%3E%3Ccircle cx='5' cy='19' r='1'/%3E%3C/svg%3E");
    }

    .icon-save {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'/%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 21v-8H7v8M7 3v5h8'/%3E%3C/svg%3E");
    }

    .icon-scale_canvas {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xml:space='preserve' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round'%3E%3Cpath d='M8 3H5c-1.097 0-2 .903-2 2v3m18 0V5c0-1.097-.903-2-2-2h-3m0 18h3c1.097 0 2-.903 2-2v-3M3 16v3c0 1.097.903 2 2 2h3' style='fill:none;fill-rule:nonzero;stroke:%23000;stroke-width:2px'/%3E%3Cpath d='M19 5 5 19' style='fill:none;fill-rule:nonzero;stroke:%23000;stroke-width:3.2px' transform='matrix(.625 0 0 .625 4.5 4.5)'/%3E%3Ccircle cx='6.5' cy='6.5' r='2.5' style='fill:none;stroke:%23000;stroke-width:2.4px' transform='matrix(.625 0 0 .625 4.5 4.5)'/%3E%3Ccircle cx='17.5' cy='17.5' r='2.5' style='fill:none;stroke:%23000;stroke-width:2.4px' transform='matrix(.625 0 0 .625 4.5 4.5)'/%3E%3C/svg%3E");
    }

    .icon-scaling {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-scaling'%3E%3Cpath d='M21 3 9 15M12 3H3v18h18v-9M16 3h5v5'/%3E%3Cpath d='M14 15H9v-5'/%3E%3C/svg%3E");
    }

    .icon-search {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-search'%3E%3Ccircle cx='10.5' cy='10.5' r='7.5'/%3E%3Cpath d='m21 21-5.2-5.2'/%3E%3C/svg%3E");
    }

    .icon-settings {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='3' fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'/%3E%3Cpath d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' fill='none' stroke='%23fff' stroke-miterlimit='10' stroke-width='2'/%3E%3C/svg%3E");
    }

    .icon-skip-back {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-skip-back'%3E%3Cpath d='M19 20 9 12l10-8v16zM5 19V5'/%3E%3C/svg%3E");
    }

    .icon-slack {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-slack'%3E%3Cpath d='M22.08 9C19.81 1.41 16.54-.35 9 1.92S-.35 7.46 1.92 15 7.46 24.35 15 22.08 24.35 16.54 22.08 9zM12.57 5.99l3.58 10.4M7.85 7.61l3.58 10.4M16.39 7.85l-10.4 3.58M18.01 12.57l-10.4 3.58'/%3E%3C/svg%3E");
    }

    .icon-smartphone {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='5' y='2' width='14' height='20' rx='2' ry='2'/%3E%3Cpath d='M12 18h.01'/%3E%3C/svg%3E");
    }

    .icon-spreadsheet {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.95 23.95'%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath style='fill:none' d='M0 0h23.95v23.95H0z'/%3E%3Crect class='cls-2' x='1.98' y='2.89' width='20' height='18.17' rx='2'/%3E%3Cpath class='cls-2' d='M1.99 8.84h19.98M1.99 15.11h19.98M6.95 3.56V20.4M11.98 3.56V20.4M17 3.56V20.4'/%3E%3C/svg%3E");
    }

    .icon-square {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3C/svg%3E");
    }

    .icon-star {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E");
    }

    .icon-sun {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-sun'%3E%3Ccircle cx='12' cy='12' r='5'/%3E%3Cpath d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'/%3E%3C/svg%3E");
    }

    .icon-terminal {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-terminal'%3E%3Cpath d='m4 17 6-6-6-6M12 19h8'/%3E%3C/svg%3E");
    }

    .icon-text-cursor-input {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-text-cursor-input'%3E%3Cpath d='M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7M9 7v10'/%3E%3C/svg%3E");
    }

    .icon-three-dots {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' style='enable-background:new 0 0 512 512' xml:space='preserve' width='512' height='512'%3E%3Cg fill='%23FFF'%3E%3Ccircle cx='256' cy='256' r='64'/%3E%3Ccircle cx='256' cy='448' r='64'/%3E%3Ccircle cx='256' cy='64' r='64'/%3E%3C/g%3E%3C/svg%3E");
    }

    .icon-tool {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-tool'%3E%3Cpath d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'/%3E%3C/svg%3E");
    }

    .icon-trash {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6'/%3E%3C/svg%3E");
    }

    .icon-twitter {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-twitter'%3E%3Cpath d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'/%3E%3C/svg%3E");
    }

    .icon-type {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-type'%3E%3Cpath d='M4 7V4h16v3M9 20h6M12 4v16'/%3E%3C/svg%3E");
    }

    .icon-undo {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-undo-2'%3E%3Cpath d='M9 14 4 9l5-5'/%3E%3Cpath d='M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11'/%3E%3C/svg%3E");
    }

    .icon-unfold-horizontal {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-unfold-horizontal-icon lucide-unfold-horizontal'%3E%3Cpath d='M16 12h6M8 12H2M12 2v2M12 8v2M12 14v2M12 20v2M19 15l3-3-3-3M5 9l-3 3 3 3'/%3E%3C/svg%3E");
    }

    .icon-unfold-vertical {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-unfold-vertical-icon lucide-unfold-vertical'%3E%3Cpath d='M12 22v-6M12 8V2M4 12H2M10 12H8M16 12h-2M22 12h-2M15 19l-3 3-3-3M15 5l-3-3-3 3'/%3E%3C/svg%3E");
    }

    .icon-unplug {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-unplug'%3E%3Cpath d='m19 5 3-3M2 22l3-3M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4ZM7.5 13.5 10 11M10.5 16.5 13 14M12 6l6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z'/%3E%3C/svg%3E");
    }

    .icon-upload {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-upload'%3E%3Cpath d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12'/%3E%3C/svg%3E");
    }

    .icon-user {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-user'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E");
    }

    .icon-users {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-users'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E");
    }

    .icon-volume-2 {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-volume-2'%3E%3Cpath d='M11 5 6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07'/%3E%3C/svg%3E");
    }

    .icon-volume-x {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-volume-x'%3E%3Cpath d='M11 5 6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6'/%3E%3C/svg%3E");
    }

    .icon-x {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 6 6 18M6 6l12 12'/%3E%3C/svg%3E");
    }

    .icon-youtube {
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-youtube'%3E%3Cpath d='M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z'/%3E%3Cpath d='m9.75 15.02 5.75-3.27-5.75-3.27v6.54z'/%3E%3C/svg%3E");
    }

    .cablesCssUi .button-icon .icon {
      vertical-align: bottom;
      margin-right: 0px !important;
    }
    .cablesCssUi .button-small.button-icon {
      padding-top: 1px !important;
    }
    .cablesCssUi .button-small .icon,
    .cablesCssUi .button .icon {
      vertical-align: middle;
      margin-right: 5px;
    }
    .cablesCssUi .iconbutton {
      padding: 3px;
      background-color: var(--color-button-bg);
      border-radius: 8px;
      padding-left: 8px;
      padding-right: 7px;
      padding-top: 8px;
      margin-right: 4px;
      cursor: pointer;
    }
    .cablesCssUi .iconbutton:hover {
      background-color: var(--color-button-bg-hover);
    }
    .cablesCssUi .iconbutton:hover .icon {
      background-color: var(--color-special) !important;
    }
    .cablesCssUi .iconbutton:active {
      background-color: var(--color-button-bg-active) !important;
    }
    .cablesCssUi .iconbutton .icon {
      pointer-events: none;
    }
    .cablesCssUi .icon {
      display: inline-block;
      width: calc(16px + var(--font-size-off));
      height: calc(16px + var(--font-size-off));
      mask-repeat: no-repeat;
      -webkit-mask-repeat: no-repeat;
      mask-size: 100%;
      -webkit-mask-size: 100%;
      background-color: var(--color-13);
    }
    .cablesCssUi .icon-empty {
      background-color: transparent;
    }
    .cablesCssUi .icon-active {
      background-color: var(--color-special);
    }
    .cablesCssUi .iconhover {
      cursor: pointer;
    }
    .cablesCssUi .iconhover:hover,
    .cablesCssUi .iconhover:focus-visible {
      background-color: var(--color-special) !important;
    }
    .cablesCssUi .iconToggleActive {
      background-color: var(--color-special) !important;
    }
    .cablesCssUi .icon-2x {
      width: calc(32px + 2 * var(--font-size-off));
      height: calc(32px + 2 * var(--font-size-off));
    }
    .cablesCssUi .icon-4x {
      width: calc(64px + 4 * var(--font-size-off));
      height: calc(64px + 4 * var(--font-size-off));
    }
    .cablesCssUi .icon-1_5x {
      width: calc(24px + 1.5 * var(--font-size-off));
      height: calc(24px + 1.5 * var(--font-size-off));
    }
    .cablesCssUi .icon-0_75x {
      width: calc(12px + 0.75 * var(--font-size-off));
      height: calc(12px + 0.75 * var(--font-size-off));
    }
    .cablesCssUi .button-small .icon {
      width: calc(15px + 0.75 * var(--font-size-off)) !important;
      height: calc(15px + 0.75 * var(--font-size-off)) !important;
    }
    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .cablesCssUi .icon-loader {
      animation: rotating 2s linear infinite;
      vertical-align: sub;
    }
    .cablesCssUi .icon-empty {
      background-color: transparent !important;
    }

    .cablesCssUi #meta,
    .cablesCssUi #options {
      z-index: -2;
    }
    .cablesCssUi .menubar,
    .cablesCssUi #subpatch_nav,
    .cablesCssUi #bgpreviewButtonsContainer,
    .cablesCssUi #bgpreview,
    .cablesCssUi .cbl_iconbarContainer {
      z-index: 30;
    }

    .gluiPreviewLayer {
      z-index: 29;
    }

    .introjs-overlay {
      position: absolute;
      box-sizing: content-box;
      z-index: 39;
      background-color: #000;
      opacity: 0;
      background: -moz-radial-gradient(
        center,
        ellipse farthest-corner,
        rgba(0, 0, 0, 0.4) 0,
        rgba(0, 0, 0, 0.9) 100%
      );
      background: -webkit-gradient(
        radial,
        center center,
        0px,
        center center,
        100%,
        color-stop(0%, rgba(0, 0, 0, 0.4)),
        color-stop(100%, rgba(0, 0, 0, 0.9))
      );
      background: -webkit-radial-gradient(
        center,
        ellipse farthest-corner,
        rgba(0, 0, 0, 0.4) 0,
        rgba(0, 0, 0, 0.9) 100%
      );
      background: -o-radial-gradient(
        center,
        ellipse farthest-corner,
        rgba(0, 0, 0, 0.4) 0,
        rgba(0, 0, 0, 0.9) 100%
      );
      background: -ms-radial-gradient(
        center,
        ellipse farthest-corner,
        rgba(0, 0, 0, 0.4) 0,
        rgba(0, 0, 0, 0.9) 100%
      );
      background: radial-gradient(
        center,
        ellipse farthest-corner,
        rgba(0, 0, 0, 0.4) 0,
        rgba(0, 0, 0, 0.9) 100%
      );
      filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#66000000',endColorstr='#e6000000',GradientType=1)";
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
      filter: alpha(opacity=50);
      -webkit-transition: all 0.3s ease-out;
      -moz-transition: all 0.3s ease-out;
      -ms-transition: all 0.3s ease-out;
      -o-transition: all 0.3s ease-out;
      transition: all 0.3s ease-out;
    }

    .introjs-fixParent {
      z-index: auto !important;
      opacity: 1 !important;
      -webkit-transform: none !important;
      -moz-transform: none !important;
      -ms-transform: none !important;
      -o-transform: none !important;
      transform: none !important;
    }

    .introjs-showElement,
    tr.introjs-showElement > td,
    tr.introjs-showElement > th {
      z-index: 40 !important;
    }

    .introjs-disableInteraction {
      z-index: 40 !important;
      position: absolute;
      background-color: white;
      opacity: 0;
      filter: alpha(opacity=0);
    }

    .introjs-relativePosition,
    tr.introjs-showElement > td,
    tr.introjs-showElement > th {
      position: relative;
    }

    .introjs-helperLayer {
      box-sizing: content-box;
      position: absolute;
      z-index: 40;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.9);
      border: 1px solid #777;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
      -webkit-transition: all 0.3s ease-out;
      -moz-transition: all 0.3s ease-out;
      -ms-transition: all 0.3s ease-out;
      -o-transition: all 0.3s ease-out;
      transition: all 0.3s ease-out;
    }

    .introjs-tooltipReferenceLayer {
      box-sizing: content-box;
      position: absolute;
      visibility: hidden;
      z-index: 41;
      background-color: transparent;
      -webkit-transition: all 0.3s ease-out;
      -moz-transition: all 0.3s ease-out;
      -ms-transition: all 0.3s ease-out;
      -o-transition: all 0.3s ease-out;
      transition: all 0.3s ease-out;
    }

    .introjs-helperLayer *,
    .introjs-helperLayer *:before,
    .introjs-helperLayer *:after {
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      -ms-box-sizing: content-box;
      -o-box-sizing: content-box;
      box-sizing: content-box;
    }

    .introjs-helperNumberLayer {
      box-sizing: content-box;
      position: absolute;
      visibility: visible;
      top: -16px;
      left: -16px;
      z-index: 40 !important;
      padding: 2px;
      font-family: Arial, verdana, tahoma;
      font-size: 13px;
      font-weight: bold;
      color: white;
      text-align: center;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
      background: #ff3019; /* Old browsers */
      background: -webkit-linear-gradient(
        top,
        #ff3019 0%,
        #cf0404 100%
      ); /* Chrome10+,Safari5.1+ */
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(0%, #ff3019),
        color-stop(100%, #cf0404)
      ); /* Chrome,Safari4+ */
      background: -moz-linear-gradient(
        top,
        #ff3019 0%,
        #cf0404 100%
      ); /* FF3.6+ */
      background: -ms-linear-gradient(
        top,
        #ff3019 0%,
        #cf0404 100%
      ); /* IE10+ */
      background: -o-linear-gradient(
        top,
        #ff3019 0%,
        #cf0404 100%
      ); /* Opera 11.10+ */
      background: linear-gradient(
        to bottom,
        #ff3019 0%,
        #cf0404 100%
      ); /* W3C */
      width: 20px;
      height: 20px;
      line-height: 20px;
      border: 3px solid white;
      border-radius: 50%;
      filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff3019', endColorstr='#cf0404', GradientType=0)"; /* IE6-9 */
      filter: "progid:DXImageTransform.Microsoft.Shadow(direction=135, strength=2, color=ff0000)"; /* IE10 text shadows */
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
    }

    .introjs-arrow {
      border: 5px solid transparent;
      content: "";
      position: absolute;
    }

    .introjs-arrow.top {
      top: -10px;
      border-bottom-color: white;
    }

    .introjs-arrow.top-right {
      top: -10px;
      right: 10px;
      border-bottom-color: white;
    }

    .introjs-arrow.top-middle {
      top: -10px;
      left: 50%;
      margin-left: -5px;
      border-bottom-color: white;
    }

    .introjs-arrow.right {
      right: -10px;
      top: 10px;
      border-left-color: white;
    }

    .introjs-arrow.right-bottom {
      bottom: 10px;
      right: -10px;
      border-left-color: white;
    }

    .introjs-arrow.bottom {
      bottom: -10px;
      border-top-color: white;
    }

    .introjs-arrow.bottom-right {
      bottom: -10px;
      right: 10px;
      border-top-color: white;
    }

    .introjs-arrow.bottom-middle {
      bottom: -10px;
      left: 50%;
      margin-left: -5px;
      border-top-color: white;
    }

    .introjs-arrow.left {
      left: -10px;
      top: 10px;
      border-right-color: white;
    }

    .introjs-arrow.left-bottom {
      left: -10px;
      bottom: 10px;
      border-right-color: white;
    }

    .introjs-tooltip {
      box-sizing: content-box;
      position: absolute;
      visibility: visible;
      padding: 10px;
      background-color: white;
      min-width: 200px;
      max-width: 300px;
      border-radius: 3px;
      box-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
      -webkit-transition: opacity 0.1s ease-out;
      -moz-transition: opacity 0.1s ease-out;
      -ms-transition: opacity 0.1s ease-out;
      -o-transition: opacity 0.1s ease-out;
      transition: opacity 0.1s ease-out;
    }

    .introjs-tooltipbuttons {
      text-align: right;
      white-space: nowrap;
    }

    /*
 Buttons style by http://nicolasgallagher.com/lab/css3-github-buttons/
 Changed by Afshin Mehrabani
*/
    .introjs-button {
      box-sizing: content-box;
      position: relative;
      overflow: visible;
      display: inline-block;
      padding: 0.3em 0.8em;
      border: 1px solid #d4d4d4;
      margin: 0;
      text-decoration: none;
      text-shadow: 1px 1px 0 #fff;
      font: 11px / normal sans-serif;
      color: #333;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      background-color: #ececec;
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 100%,
        from(#f4f4f4),
        to(#ececec)
      );
      background-image: -moz-linear-gradient(#f4f4f4, #ececec);
      background-image: -o-linear-gradient(#f4f4f4, #ececec);
      background-image: linear-gradient(#f4f4f4, #ececec);
      -webkit-background-clip: padding;
      -moz-background-clip: padding;
      -o-background-clip: padding-box;
      /*background-clip: padding-box;*/ /* commented out due to Opera 11.10 bug */
      -webkit-border-radius: 0.2em;
      -moz-border-radius: 0.2em;
      border-radius: 0.2em;
      /* IE hacks */
      *display: inline;
      margin-top: 10px;
    }

    .introjs-button:hover {
      border-color: #bcbcbc;
      text-decoration: none;
      box-shadow: 0px 1px 1px #e3e3e3;
    }

    .introjs-button:focus,
    .introjs-button:active {
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 100%,
        from(#ececec),
        to(#f4f4f4)
      );
      background-image: -moz-linear-gradient(#ececec, #f4f4f4);
      background-image: -o-linear-gradient(#ececec, #f4f4f4);
      background-image: linear-gradient(#ececec, #f4f4f4);
    }

    /* overrides extra padding on button elements in Firefox */
    .introjs-button::-moz-focus-inner {
      padding: 0;
      border: 0;
    }

    .introjs-skipbutton {
      box-sizing: content-box;
      margin-right: 5px;
      color: #7a7a7a;
    }

    .introjs-prevbutton {
      -webkit-border-radius: 0.2em 0 0 0.2em;
      -moz-border-radius: 0.2em 0 0 0.2em;
      border-radius: 0.2em 0 0 0.2em;
      border-right: none;
    }

    .introjs-prevbutton.introjs-fullbutton {
      border: 1px solid #d4d4d4;
      -webkit-border-radius: 0.2em;
      -moz-border-radius: 0.2em;
      border-radius: 0.2em;
    }

    .introjs-nextbutton {
      -webkit-border-radius: 0 0.2em 0.2em 0;
      -moz-border-radius: 0 0.2em 0.2em 0;
      border-radius: 0 0.2em 0.2em 0;
    }

    .introjs-nextbutton.introjs-fullbutton {
      -webkit-border-radius: 0.2em;
      -moz-border-radius: 0.2em;
      border-radius: 0.2em;
    }

    .introjs-disabled,
    .introjs-disabled:hover,
    .introjs-disabled:focus {
      color: #9a9a9a;
      border-color: #d4d4d4;
      box-shadow: none;
      cursor: default;
      background-color: #f4f4f4;
      background-image: none;
      text-decoration: none;
    }

    .introjs-hidden {
      display: none;
    }

    .introjs-bullets {
      text-align: center;
    }

    .introjs-bullets ul {
      box-sizing: content-box;
      clear: both;
      margin: 15px auto 0;
      padding: 0;
      display: inline-block;
    }

    .introjs-bullets ul li {
      box-sizing: content-box;
      list-style: none;
      float: left;
      margin: 0 2px;
    }

    .introjs-bullets ul li a {
      box-sizing: content-box;
      display: block;
      width: 6px;
      height: 6px;
      background: #ccc;
      border-radius: 10px;
      -moz-border-radius: 10px;
      -webkit-border-radius: 10px;
      text-decoration: none;
      cursor: pointer;
    }

    .introjs-bullets ul li a:hover {
      background: #999;
    }

    .introjs-bullets ul li a.active {
      background: #999;
    }

    .introjs-progress {
      box-sizing: content-box;
      overflow: hidden;
      height: 10px;
      margin: 10px 0 5px 0;
      border-radius: 4px;
      background-color: #ecf0f1;
    }

    .introjs-progressbar {
      box-sizing: content-box;
      float: left;
      width: 0%;
      height: 100%;
      font-size: 10px;
      line-height: 10px;
      text-align: center;
      background-color: #08c;
    }

    .introjsFloatingElement {
      position: absolute;
      height: 0;
      width: 0;
      left: 50%;
      top: 50%;
    }

    .introjs-fixedTooltip {
      position: fixed;
    }

    .introjs-hint {
      box-sizing: content-box;
      position: absolute;
      background: transparent;
      width: 20px;
      height: 15px;
      cursor: pointer;
    }

    .introjs-hint:focus {
      border: 0;
      outline: 0;
    }

    .introjs-hidehint {
      display: none;
    }

    .introjs-fixedhint {
      position: fixed;
    }

    .introjs-hint:hover > .introjs-hint-pulse {
      border: 5px solid rgba(60, 60, 60, 0.57);
    }

    .introjs-hint-pulse {
      box-sizing: content-box;
      width: 10px;
      height: 10px;
      border: 5px solid rgba(60, 60, 60, 0.27);
      -webkit-border-radius: 30px;
      -moz-border-radius: 30px;
      border-radius: 30px;
      background-color: rgba(136, 136, 136, 0.24);
      z-index: 10;
      position: absolute;
      -webkit-transition: all 0.2s ease-out;
      -moz-transition: all 0.2s ease-out;
      -ms-transition: all 0.2s ease-out;
      -o-transition: all 0.2s ease-out;
      transition: all 0.2s ease-out;
    }

    .introjs-hint-no-anim .introjs-hint-dot {
      -webkit-animation: none;
      -moz-animation: none;
      animation: none;
    }

    .introjs-hint-dot {
      box-sizing: content-box;
      border: 10px solid rgba(146, 146, 146, 0.36);
      background: transparent;
      -webkit-border-radius: 60px;
      -moz-border-radius: 60px;
      border-radius: 60px;
      height: 50px;
      width: 50px;
      -webkit-animation: introjspulse 3s ease-out;
      -moz-animation: introjspulse 3s ease-out;
      animation: introjspulse 3s ease-out;
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
      position: absolute;
      top: -25px;
      left: -25px;
      z-index: 1;
      opacity: 0;
    }

    @-webkit-keyframes introjspulse {
      0% {
        -webkit-transform: scale(0);
        opacity: 0;
      }
      25% {
        -webkit-transform: scale(0);
        opacity: 0.1;
      }
      50% {
        -webkit-transform: scale(0.1);
        opacity: 0.3;
      }
      75% {
        -webkit-transform: scale(0.5);
        opacity: 0.5;
      }
      100% {
        -webkit-transform: scale(1);
        opacity: 0;
      }
    }
    @-moz-keyframes introjspulse {
      0% {
        -moz-transform: scale(0);
        opacity: 0;
      }
      25% {
        -moz-transform: scale(0);
        opacity: 0.1;
      }
      50% {
        -moz-transform: scale(0.1);
        opacity: 0.3;
      }
      75% {
        -moz-transform: scale(0.5);
        opacity: 0.5;
      }
      100% {
        -moz-transform: scale(1);
        opacity: 0;
      }
    }
    @keyframes introjspulse {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      25% {
        transform: scale(0);
        opacity: 0.1;
      }
      50% {
        transform: scale(0.1);
        opacity: 0.3;
      }
      75% {
        transform: scale(0.5);
        opacity: 0.5;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
    .gluiPatchBg {
      z-index: 1;
    }

    .op-svg-shortname {
      font-size: 15px !important;
    }

    .cursor_pointer {
      cursor: pointer;
    }

    .cursor_wait {
      cursor: progress;
    }

    .cursor_auto {
      cursor: auto;
    }

    .cursor_copy {
      cursor: copy;
    }

    #drop-op-cursor {
      position: absolute;
      width: 75px;
      height: 20px;
      z-index: 30;
      background-image: url(data:image;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAfCAQAAAC7DqDdAAABpUlEQVR4Ad3BO24bVxQA0HM5l6YUqbBV+FMEiJtsJa0b7yMrMwJVqbKMVAFS+wsHMEUNqXk3GMsT2ohq0Zxz8tc/Hz3ZfSqBwgO937zzwnNrlDBKg0vvvXShV8KttHPpo5X71XvkF50B3fnV67w4+8nm3BdlZWNh57Hn/rG3stYMHvvR2t4DvU5z35rOMytbYenDWW5d6Y1KoFwrC1sb1yhhNOiFsLVxbVQCg145hNIrO9zYSkIhhP8rgfK1Ugjh8MokU1oalcDSTiid1AmTpRuUtLS0t9QcTphkKYUSGpoyKqWUSdOMmqYJhVCa5nDKJC+lQgmj0PQe+t0fmkkJZeMHr6RSRqEENk4cRpjkW4OwV8Kp9M4gfOvUwhtN2Cvh1EI5rDxxl+bEXcqpu5RDCqQZKKRZKGkWQpqJNBNpJtJMpJlIM5FmIh2xUibpiIUwSbNQ0iyEdNTKJLcG4VsrC+UYhFEgf3ZmsLcw+MtW5/tXbhXyqQs7JZRA2vlb0/n+hb28duVGIYw6O+X4pM9CKaEQjlH6Tzg+ZZLWzn2CcqscnXPrfwGXq56tCOJVBgAAAABJRU5ErkJggg==);
      background-size: 100% 100%;
      pointer-events: none;
    }

    .port_text_color_trigger,
    .port_text_color_function {
      color: var(--color_port_function);
    }

    .port_text_color_value,
    .port_text_color_number {
      color: var(--color_port_value);
    }

    .port_text_color_object {
      color: var(--color_port_object);
    }

    .port_text_color_array {
      color: var(--color_port_array);
    }

    .port_text_color_dynamic {
      color: var(--color_port_dynamic);
    }

    .port_text_color_string {
      color: var(--color_port_string);
    }

    .port_color_function {
      fill: var(--color_port_function);
      stroke: var(--color_port_function);
    }

    .port_color_value {
      fill: var(--color_port_value);
      stroke: var(--color_port_value);
    }

    .port_color_object {
      fill: var(--color_port_object);
      stroke: var(--color_port_object);
    }

    .port_color_array {
      fill: var(--color_port_array);
      stroke: var(--color_port_array);
    }

    .port_color_dynamic {
      fill: var(--color_port_dynamic);
      stroke: var(--color_port_dynamic);
    }

    .port_color_string {
      fill: var(--color_port_string);
      stroke: var(--color_port_string);
    }

    .port_color_unknown {
      fill: #0f0;
    }

    .glpatchcontainer {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
    }

    #patch .op_handle_default,
    #opselect-layout .op_handle_default {
      fill: var(--color_op_handle_default);
    }
    #patch .op_handle_gl,
    #opselect-layout .op_handle_gl {
      fill: var(--color_op_handle_gl);
    }
    #patch .op_handle_audio,
    #opselect-layout .op_handle_audio {
      fill: var(--color_op_handle_audio);
    }
    #patch .op_handle_devices,
    #opselect-layout .op_handle_devices {
      fill: var(--color_op_handle_devices);
    }
    #patch .op_handle_html,
    #opselect-layout .op_handle_html {
      fill: var(--color_op_handle_html);
    }
    #patch .op_handle_math,
    #opselect-layout .op_handle_math {
      fill: var(--color_op_handle_math);
    }
    #patch .op_handle_user,
    #opselect-layout .op_handle_user {
      fill: var(--color_op_handle_user);
      text-decoration: underline;
    }

    .color-op-category-default {
      color: var(--color_op_handle_audio) !important;
    }

    .color-op-category-gl {
      color: var(--color_op_handle_gl) !important;
    }

    .color-op-category-audio {
      color: var(--color_op_handle_audio) !important;
    }

    .color-op-category-devices {
      color: var(--color_op_handle_devices) !important;
    }

    .color-op-category-html {
      color: var(--color_op_handle_html) !important;
    }

    .color-op-category-math {
      color: var(--color_op_handle_math) !important;
    }

    .color-op-category-user {
      color: var(--color_op_handle_user) !important;
    }

    #suggestionDialog {
      position: absolute;
      z-index: 50;
      bottom: 100px;
    }
    #suggestionDialog .suggestion {
      margin-bottom: 10px;
      padding: 3px;
      padding-top: 1px;
      padding-left: 5px;
      padding-right: 5px;
      text-overflow: ellipsis;
      position: absolute;
      font-size: 14px;
      min-width: 50px;
      white-space: nowrap;
      background-color: var(--color-01);
      border-radius: 4px;
    }
    #suggestionDialog .suggestion:hover {
      cursor: pointer !important;
      background-color: var(--color-06);
      color: var(--color-13);
    }
    #suggestionDialog .suggestion .icon {
      margin-left: 5px;
      margin-right: 5px;
      mask-position-y: 2px;
      vertical-align: bottom;
    }
    #suggestionDialog .recommended-suggestion {
      border-left: 10px solid white;
    }
    #suggestionDialog .opSelect {
      cursor: pointer;
      margin-left: -15px;
      margin-top: -15px;
      width: 30px;
      height: 30px;
      background-color: var(--color-13);
      color: var(--color-02);
      border-radius: 100px;
      text-align: center;
      font-size: 25px;
      font-weight: bold;
    }
    #suggestionDialog .opSelect:hover {
      cursor: pointer !important;
      background-color: var(--color-06);
      color: var(--color-13);
    }

    #restriction_container {
      cursor: pointer;
      position: absolute;
      z-index: 99999;
      transform: translate(-50%, 0);
      left: 50%;
      top: calc(100vh - 200px);
      color: var(--color_op_text_active);
      font-size: 15px;
      background-color: var(--color-04);
      padding: 15px 21px;
      border-radius: 4px;
      margin: 4px 8px 5px 5px;
      text-align: right;
    }
    #restriction_container #restriction_close {
      position: absolute;
      margin-top: -9px;
      margin-left: 3px;
      display: none;
    }
    #restriction_container:hover #restriction_close {
      display: inline-block;
    }
    #restriction_container #restriction_message {
      text-align: center;
    }

    #breadcrumb_nav {
      position: absolute;
    }

    #subpatch_nav {
      position: relative;
    }
    #subpatch_nav #subpatch_breadcrumb {
      float: left;
      color: var(--color_op_text_active);
      padding: 5px 10px 5px 0;
      margin-top: 4px;
    }
    #subpatch_nav #subpatch_breadcrumb .sparrow {
      font-size: 32px;
      font-weight: bold;
      position: absolute;
      line-height: 14px;
    }
    #subpatch_nav #subpatch_breadcrumb a {
      font-size: 15px;
      background-color: var(--color-03);
      color: var(--color_op_text_active);
      padding: 2px;
      padding-left: 8px;
      padding-right: 8px;
      border-radius: 4px;
      margin-right: 8px;
      margin-left: 20px;
    }
    #subpatch_nav #subpatch_breadcrumb a:first-child {
      margin-left: 5px;
    }
    #subpatch_nav #subpatch_breadcrumb a:hover {
      background-color: var(--color-06) !important;
      color: var(--color-special) !important;
    }
    #subpatch_nav #subpatch_breadcrumb a.blueprint h3,
    #subpatch_nav #subpatch_breadcrumb a.blueprint_subpatch h3,
    #subpatch_nav #subpatch_breadcrumb a.blueprint_subpatch2 h3 {
      border-right: 5px solid var(--color_op_handle_default);
    }

    #patchnavhelper,
    #patchnavhelperEmpty,
    #patchnavhelperBounds {
      z-index: 9;
      color: var(--text-color);
      background-color: var(--color-04);
      padding: 20px;
      bottom: 40px;
      border-radius: 5px;
      position: absolute;
      pointer-events: none;
      cursor: pointer;
      margin-left: 120px;
      text-align: center;
    }

    /*
*
* Cute Grids v1.0.1
* Copyright 2014 Darren Newberry
* http://www.cutegrids.com
* Free to use under the MIT Licence
* http://www.opensource.org/licenses/mit-license.php
*

WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS
WARNING: CONTAINS SLIGHT MODIFICATIONS

*/
    [class*="cute-"],
    [class*="cute-"]:after,
    [class*="cute-"]:before,
    .row:after,
    .row:before {
      margin: 0;
      padding: 0;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }

    /* Set the width of the row to what you like */
    .row {
      width: 100%;
      max-width: 90rem; /* max Width of row, Change to what you like */
      margin: 0 auto;
    }

    /* Nested row 1 level down */
    /* Change the gutter if you like, currently set as 0.65em */
    .row .row {
      margin-left: -0.65rem; /* minus left gutter for nested rows */
      margin-right: -0.65rem; /* minus Right gutter for nested rows */
      width: auto;
    }

    [class*="cute-"] {
      float: left;
      position: relative;
      padding: 0.65rem; /* top, bottom, left and right padding for columns */
      width: 100%;
    }

    /* Remove this if you want the columns to float left when they overflow the row */
    [class*="cute-"]:last-of-type {
      float: right;
    }

    /* Clearfix */
    .row:after,
    .group:after,
    .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }

    .left {
      float: left !important;
    }

    .right {
      float: right !important;
    }

    /* Grid classes for phone screen widths  */
    @media only screen {
      .cute-1-phone {
        width: 8.3333333333%;
      }
      .cute-2-phone {
        width: 16.6666666667%;
      }
      .cute-3-phone {
        width: 25%;
      }
      .cute-4-phone {
        width: 33.3333333333%;
      }
      .cute-5-phone {
        width: 41.6666666667%;
      }
      .cute-6-phone {
        width: 50%;
      }
      .cute-7-phone {
        width: 58.3333333333%;
      }
      .cute-8-phone {
        width: 66.6666666667%;
      }
      .cute-9-phone {
        width: 75%;
      }
      .cute-10-phone {
        width: 83.3333333333%;
      }
      .cute-11-phone {
        width: 91.6666666667%;
      }
      .cute-12-phone {
        width: 100%;
      }
      /* offset for phone size */
      .cute-0-phone-offset {
        margin: 0;
      }
      .cute-1-phone-offset {
        margin-left: 8.3333333333%;
      }
      .cute-2-phone-offset {
        margin-left: 16.6666666667%;
      }
      .cute-3-phone-offset {
        margin-left: 25%;
      }
      .cute-4-phone-offset {
        margin-left: 33.3333333333%;
      }
      .cute-5-phone-offset {
        margin-left: 41.6666666667%;
      }
      .cute-6-phone-offset {
        margin-left: 50%;
      }
      .cute-7-phone-offset {
        margin-left: 58.3333333333%;
      }
      .cute-8-phone-offset {
        margin-left: 66.6666666667%;
      }
      .cute-9-phone-offset {
        margin-left: 75%;
      }
      .cute-10-phone-offset {
        margin-left: 83.3333333333%;
      }
      .cute-11-phone-offset {
        margin-left: 91.6666666667%;
      }
      .cute-1-phone-push {
        left: 8.3333333333%;
      }
      .cute-2-phone-push {
        left: 16.6666666667%;
      }
      .cute-3-phone-push {
        left: 25%;
      }
      .cute-4-phone-push {
        left: 33.3333333333%;
      }
      .cute-5-phone-push {
        left: 41.6666666667%;
      }
      .cute-6-phone-push {
        left: 50%;
      }
      .cute-7-phone-push {
        left: 58.3333333333%;
      }
      .cute-8-phone-push {
        left: 66.6666666667%;
      }
      .cute-9-phone-push {
        left: 75%;
      }
      .cute-10-phone-push {
        left: 83.3333333333%;
      }
      .cute-11-phone-push {
        left: 91.6666666667%;
      }
      .cute-1-phone-pull {
        right: 8.3333333333%;
      }
      .cute-2-phone-pull {
        right: 16.6666666667%;
      }
      .cute-3-phone-pull {
        right: 25%;
      }
      .cute-4-phone-pull {
        right: 33.3333333333%;
      }
      .cute-5-phone-pull {
        right: 41.6666666667%;
      }
      .cute-6-phone-pull {
        right: 50%;
      }
      .cute-7-phone-pull {
        right: 58.3333333333%;
      }
      .cute-8-phone-pull {
        right: 66.6666666667%;
      }
      .cute-9-phone-pull {
        right: 75%;
      }
      .cute-10-phone-pull {
        right: 83.3333333333%;
      }
      .cute-11-phone-pull {
        right: 91.6666666667%;
      }
      .center-phone {
        margin-left: auto;
        margin-right: auto;
        float: none !important;
      }
      .uncenter-phone {
        margin-left: 0;
        margin-right: 0;
        float: left !important;
      }
      .uncenter-phone.right {
        float: right !important;
      }
      [class*="cute-"].phone-reset {
        margin-left: 0;
        margin-right: 0;
        left: auto;
        right: auto;
        float: left;
      }
    }
    /* Grid classes for tablet screen widths  */
    @media only screen and (min-width: 48em) {
      .cute-1-tablet {
        width: 8.3333333333%;
      }
      .cute-2-tablet {
        width: 16.6666666667%;
      }
      .cute-3-tablet {
        width: 25%;
      }
      .cute-4-tablet {
        width: 33.3333333333%;
      }
      .cute-5-tablet {
        width: 41.6666666667%;
      }
      .cute-6-tablet {
        width: 50%;
      }
      .cute-7-tablet {
        width: 58.3333333333%;
      }
      .cute-8-tablet {
        width: 66.6666666667%;
      }
      .cute-9-tablet {
        width: 75%;
      }
      .cute-10-tablet {
        width: 83.3333333333%;
      }
      .cute-11-tablet {
        width: 91.6666666667%;
      }
      .cute-12-tablet {
        width: 100%;
      }
      /* offset for tablet screen widths */
      .cute-0-tablet-offset {
        margin: 0;
      }
      .cute-1-tablet-offset {
        margin-left: 8.3333333333%;
      }
      .cute-2-tablet-offset {
        margin-left: 16.6666666667%;
      }
      .cute-3-tablet-offset {
        margin-left: 25%;
      }
      .cute-4-tablet-offset {
        margin-left: 33.3333333333%;
      }
      .cute-5-tablet-offset {
        margin-left: 41.6666666667%;
      }
      .cute-6-tablet-offset {
        margin-left: 50%;
      }
      .cute-7-tablet-offset {
        margin-left: 58.3333333333%;
      }
      .cute-8-tablet-offset {
        margin-left: 66.6666666667%;
      }
      .cute-9-tablet-offset {
        margin-left: 75%;
      }
      .cute-10-tablet-offset {
        margin-left: 83.3333333333%;
      }
      .cute-11-tablet-offset {
        margin-left: 91.6666666667%;
      }
      .cute-1-tablet-push {
        left: 8.3333333333%;
      }
      .cute-2-tablet-push {
        left: 16.6666666667%;
      }
      .cute-3-tablet-push {
        left: 25%;
      }
      .cute-4-tablet-push {
        left: 33.3333333333%;
      }
      .cute-5-tablet-push {
        left: 41.6666666667%;
      }
      .cute-6-tablet-push {
        left: 50%;
      }
      .cute-7-tablet-push {
        left: 58.3333333333%;
      }
      .cute-8-tablet-push {
        left: 66.6666666667%;
      }
      .cute-9-tablet-push {
        left: 75%;
      }
      .cute-10-tablet-push {
        left: 83.3333333333%;
      }
      .cute-11-tablet-push {
        left: 91.6666666667%;
      }
      .cute-1-tablet-pull {
        right: 8.3333333333%;
      }
      .cute-2-tablet-pull {
        right: 16.6666666667%;
      }
      .cute-3-tablet-pull {
        right: 25%;
      }
      .cute-4-tablet-pull {
        right: 33.3333333333%;
      }
      .cute-5-tablet-pull {
        right: 41.6666666667%;
      }
      .cute-6-tablet-pull {
        right: 50%;
      }
      .cute-7-tablet-pull {
        right: 58.3333333333%;
      }
      .cute-8-tablet-pull {
        right: 66.6666666667%;
      }
      .cute-9-tablet-pull {
        right: 75%;
      }
      .cute-10-tablet-pull {
        right: 83.3333333333%;
      }
      .cute-11-tablet-pull {
        right: 91.6666666667%;
      }
      .center-tablet {
        margin-left: auto;
        margin-right: auto;
        float: none !important;
      }
      .uncenter-tablet {
        margin-left: 0;
        margin-right: 0;
        float: left !important;
      }
      .uncenter-tablet.right {
        float: right !important;
      }
      [class*="cute-"].tablet-reset {
        margin-left: 0;
        margin-right: 0;
        left: auto;
        right: auto;
        float: left;
      }
    }
    /* Grid classes for wide Tablet / Laptop to Small Desktop Size */
    @media only screen and (min-width: 62em) {
      .cute-1-laptop {
        width: 8.3333333333%;
      }
      .cute-2-laptop {
        width: 16.6666666667%;
      }
      .cute-3-laptop {
        width: 25%;
      }
      .cute-4-laptop {
        width: 33.3333333333%;
      }
      .cute-5-laptop {
        width: 41.6666666667%;
      }
      .cute-6-laptop {
        width: 50%;
      }
      .cute-7-laptop {
        width: 58.3333333333%;
      }
      .cute-8-laptop {
        width: 66.6666666667%;
      }
      .cute-9-laptop {
        width: 75%;
      }
      .cute-10-laptop {
        width: 83.3333333333%;
      }
      .cute-11-laptop {
        width: 91.6666666667%;
      }
      .cute-12-laptop {
        width: 100%;
      }
      /* offset for tablet laptop widths */
      .cute-0-laptop-offset {
        margin: 0;
      }
      .cute-1-laptop-offset {
        margin-left: 8.3333333333%;
      }
      .cute-2-laptop-offset {
        margin-left: 16.6666666667%;
      }
      .cute-3-laptop-offset {
        margin-left: 25%;
      }
      .cute-4-laptop-offset {
        margin-left: 33.3333333333%;
      }
      .cute-5-laptop-offset {
        margin-left: 41.6666666667%;
      }
      .cute-6-laptop-offset {
        margin-left: 50%;
      }
      .cute-7-laptop-offset {
        margin-left: 58.3333333333%;
      }
      .cute-8-laptop-offset {
        margin-left: 66.6666666667%;
      }
      .cute-9-laptop-offset {
        margin-left: 75%;
      }
      .cute-10-laptop-offset {
        margin-left: 83.3333333333%;
      }
      .cute-11-laptop-offset {
        margin-left: 91.6666666667%;
      }
      .cute-1-laptop-push {
        left: 8.3333333333%;
      }
      .cute-2-laptop-push {
        left: 16.6666666667%;
      }
      .cute-3-laptop-push {
        left: 25%;
      }
      .cute-4-laptop-push {
        left: 33.3333333333%;
      }
      .cute-5-laptop-push {
        left: 41.6666666667%;
      }
      .cute-6-laptop-push {
        left: 50%;
      }
      .cute-7-laptop-push {
        left: 58.3333333333%;
      }
      .cute-8-laptop-push {
        left: 66.6666666667%;
      }
      .cute-9-laptop-push {
        left: 75%;
      }
      .cute-10-laptop-push {
        left: 83.3333333333%;
      }
      .cute-11-laptop-push {
        left: 91.6666666667%;
      }
      .cute-1-laptop-pull {
        right: 8.3333333333%;
      }
      .cute-2-laptop-pull {
        right: 16.6666666667%;
      }
      .cute-3-laptop-pull {
        right: 25%;
      }
      .cute-4-laptop-pull {
        right: 33.3333333333%;
      }
      .cute-5-laptop-pull {
        right: 41.6666666667%;
      }
      .cute-6-laptop-pull {
        right: 50%;
      }
      .cute-7-laptop-pull {
        right: 58.3333333333%;
      }
      .cute-8-laptop-pull {
        right: 66.6666666667%;
      }
      .cute-9-laptop-pull {
        right: 75%;
      }
      .cute-10-laptop-pull {
        right: 83.3333333333%;
      }
      .cute-11-laptop-pull {
        right: 91.6666666667%;
      }
      .center-laptop {
        margin-left: auto;
        margin-right: auto;
        float: none !important;
      }
      .uncenter-laptop {
        margin-left: 0;
        margin-right: 0;
        float: left !important;
      }
      .uncenter-laptop.right {
        float: right !important;
      }
      [class*="cute-"].laptop-reset {
        margin-left: 0;
        margin-right: 0;
        left: auto;
        right: auto;
        float: left;
      }
    }
    /* Grid Classes for Large Desktop Size */
    .show-desktop {
      display: none;
    }

    @media only screen and (min-width: 75em) {
      .cute-1-desktop {
        width: 8.3333333333%;
      }
      .cute-2-desktop {
        width: 16.6666666667%;
      }
      .cute-3-desktop {
        width: 25%;
      }
      .cute-4-desktop {
        width: 33.3333333333%;
      }
      .cute-5-desktop {
        width: 41.6666666667%;
      }
      .cute-6-desktop {
        width: 50%;
      }
      .cute-7-desktop {
        width: 58.3333333333%;
      }
      .cute-8-desktop {
        width: 66.6666666667%;
      }
      .cute-9-desktop {
        width: 75%;
      }
      .cute-10-desktop {
        width: 83.3333333333%;
      }
      .cute-11-desktop {
        width: 91.6666666667%;
      }
      .cute-12-desktop {
        width: 100%;
      }
      /* offset for tablet laptop widths */
      .cute-0-desktop-offset {
        margin: 0;
      }
      .cute-1-desktop-offset {
        margin-left: 8.3333333333%;
      }
      .cute-2-desktop-offset {
        margin-left: 16.6666666667%;
      }
      .cute-3-desktop-offset {
        margin-left: 25%;
      }
      .cute-4-desktop-offset {
        margin-left: 33.3333333333%;
      }
      .cute-5-desktop-offset {
        margin-left: 41.6666666667%;
      }
      .cute-6-desktop-offset {
        margin-left: 50%;
      }
      .cute-7-desktop-offset {
        margin-left: 58.3333333333%;
      }
      .cute-8-desktop-offset {
        margin-left: 66.6666666667%;
      }
      .cute-9-desktop-offset {
        margin-left: 75%;
      }
      .cute-10-desktop-offset {
        margin-left: 83.3333333333%;
      }
      .cute-11-desktop-offset {
        margin-left: 91.6666666667%;
      }
      .cute-1-desktop-push {
        left: 8.3333333333%;
      }
      .cute-2-desktop-push {
        left: 16.6666666667%;
      }
      .cute-3-desktop-push {
        left: 25%;
      }
      .cute-4-desktop-push {
        left: 33.3333333333%;
      }
      .cute-5-desktop-push {
        left: 41.6666666667%;
      }
      .cute-6-desktop-push {
        left: 50%;
      }
      .cute-7-desktop-push {
        left: 58.3333333333%;
      }
      .cute-8-desktop-push {
        left: 66.6666666667%;
      }
      .cute-9-desktop-push {
        left: 75%;
      }
      .cute-10-desktop-push {
        left: 83.3333333333%;
      }
      .cute-11-desktop-push {
        left: 91.6666666667%;
      }
      .cute-1-desktop-pull {
        right: 8.3333333333%;
      }
      .cute-2-desktop-pull {
        right: 16.6666666667%;
      }
      .cute-3-desktop-pull {
        right: 25%;
      }
      .cute-4-desktop-pull {
        right: 33.3333333333%;
      }
      .cute-5-desktop-pull {
        right: 41.6666666667%;
      }
      .cute-6-desktop-pull {
        right: 50%;
      }
      .cute-7-desktop-pull {
        right: 58.3333333333%;
      }
      .cute-8-desktop-pull {
        right: 66.6666666667%;
      }
      .cute-9-desktop-pull {
        right: 75%;
      }
      .cute-10-desktop-pull {
        right: 83.3333333333%;
      }
      .cute-11-desktop-pull {
        right: 91.6666666667%;
      }
      .center-desktop {
        margin-left: auto;
        margin-right: auto;
        float: none !important;
      }
      .uncenter-desktop {
        margin-left: 0;
        margin-right: 0;
        float: left !important;
      }
      .uncenter-desktop.right {
        float: right !important;
      }
      [class*="cute-"].desktop-reset {
        margin-left: 0;
        margin-right: 0;
        left: auto;
        right: auto;
        float: left;
      }
    }
    @media only screen and (max-width: 30em) {
      .cute-100 {
        width: 100%;
      }
    }
    /* Make visible or hidden block elements */
    .show-phone,
    .show-tablet,
    .show-laptop,
    .show-desktop {
      display: none !important;
    }

    .hide-phone {
      display: block !important;
    }

    @media only screen and (max-width: 47.938em) {
      .phone {
        width: 100%;
      }
      .hide-phone {
        display: none !important;
      }
      .show-phone {
        display: block !important;
      }
    }
    @media only screen and (min-width: 48em) and (max-width: 61.938em) {
      .hide-tablet {
        display: none !important;
      }
      .show-tablet {
        display: block !important;
      }
    }
    @media only screen and (min-width: 62em) and (max-width: 74.938em) {
      .hide-laptop {
        display: none !important;
      }
      .show-laptop {
        display: block !important;
      }
    }
    @media only screen and (min-width: 75em) {
      .hide-desktop {
        display: none !important;
      }
      .show-desktop {
        display: block !important;
      }
    }
    /* make images responsive */
    .responsive-img {
      display: block;
      height: auto;
      max-width: 100%;
    }

    /* Optional Extras */
    /* something to keep tables horizontal with scroll when on small screen
*  Useful if table is wide. Set media query to point where table needs it
*/
    /*
@media only screen and (max-width: 47.938em) {
  .table-respond {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
}
}
*/
    :root {
      --font-size-off: 0px;
      --font-size-small: calc(12px + var(--font-size-off));
      --font-size-default: calc(14px + var(--font-size-off));
      --font-size-bigger: calc(16px + var(--font-size-off));
      --font-size-big: calc(18px + var(--font-size-off));
    }

    @font-face {
      font-family: "SourceCodePro";
      src: url("../fonts/SourceCodePro-Regular.ttf");
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: "SourceSansPro";
      src: url("../fonts/SourceSansPro-Regular.ttf");
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: "SourceSansPro";
      src: url("../fonts/SourceSansPro-Bold.ttf");
      font-weight: 800;
      font-style: normal;
    }
    .introjs-helperLayer {
      background: rgba(255, 255, 255, 0.2) !important;
      background-color: transparent !important;
      border-radius: 0 !important;
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      border: 1px solid var(--color-special) !important;
    }

    .introjs-overlay {
      background-color: rgba(0, 0, 0, 0.25);
    }

    .introjs-tooltip {
      font-family: "SourceSansPro", sans-serif;
      background-color: var(--color-01) !important;
      border: 1px solid var(--color-special) !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      padding: 20px !important;
    }

    .introjs-tooltipReferenceLayer {
      border: none !important;
      border-radius: 0 !important;
      z-index: 40 !important;
    }

    .introjs-tooltiptext {
      font-family: "SourceSansPro", sans-serif;
      color: #eee !important;
    }

    .introjs-helperNumberLayer {
      padding: 20px !important;
      display: none !important;
      background-color: black !important;
      background: black !important;
      text-shadow: none !important;
      color: white !important;
      box-shadow: none !important;
      border-radius: 1px solid var(--color-special) !important;
      left: -13px !important;
      top: -13px !important;
    }

    .introjs-tooltipbuttons {
      margin-top: 16px;
    }

    .introjs-button {
      font-family: "SourceSansPro", sans-serif;
      padding: 8px 14px !important;
      text-shadow: none !important;
      box-shadow: none !important;
      border: none;
      border-radius: 20px !important;
      cursor: pointer !important;
      background-image: none !important;
      background-color: var(--color-05) !important;
      color: var(--color-10) !important;
    }
    .introjs-button:hover {
      background-color: var(--color-07) !important;
      color: var(--color-13) !important;
    }
    .introjs-button.introjs-disabled {
      cursor: not-allowed !important;
      color: var(--color-07) !important;
      background-color: var(--color-03) !important;
    }
    .introjs-button.introjs-disabled:hover {
      color: var(--color-07) !important;
      background-color: var(--color-03) !important;
    }

    .introjs-skipbutton {
      color: var(--color-03);
      float: left;
    }
    .introjs-skipbutton:after {
      clear: both;
    }

    .introjs-progress {
      margin: 23px 0 5px 0 !important;
      background-color: var(--color-04);
    }

    .introjs-progressbar {
      background-color: var(--color-special);
    }

    .introjs-showElement {
      z-index: 40 !important;
    }

    .introjs-arrow.right {
      border-left-color: var(--color-special) !important;
    }
    .introjs-arrow.left {
      border-right-color: var(--color-special) !important;
    }
    .introjs-arrow.top {
      border-bottom-color: var(--color-special) !important;
    }
    .introjs-arrow.bottom {
      border-top-color: var(--color-special) !important;
    }

    .cablesCssUi {
      display: inline;
    }

    .cablesCssUi .findToggle {
      user-select: none;
      padding: 8px;
      padding-bottom: 3px;
      padding-top: 3px;
      margin-right: 4px;
      border-radius: 4px;
      margin-top: 3px;
      background-color: var(--color-04);
      font-size: var(--font-size-small);
      opacity: 0.5;
      display: inline-block;
    }
    .cablesCssUi .findToggleActive {
      opacity: 1;
      background-color: var(--color-05);
      color: var(--color-special);
    }

    @keyframes flash {
      from {
        background: rgba(0, 255, 255, 0.8);
      }
      to {
        background: rgba(0, 255, 255, 0);
      }
    }
    .cblUiHtmlEleOverlay {
      animation: flash 0.25s ease-in-out 0s;
      pointer-events: none;
      z-index: 99999999;
      position: absolute;
      border: 1px solid var(--color-special);
    }

    .nomargin {
      margin: 0px !important;
    }

    html,
    body {
      position: fixed;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      overscroll-behavior: none;
      overscroll-behavior-x: none;
    }

    body {
      padding: 0px;
      margin: 0px;
      background-color: var(--color-02);
      overflow: hidden;
      font-family: "SourceSansPro", sans-serif;
      font-size: var(--font-size-default);
    }

    .cablesCssUi *,
    .cablesCssUi *:hover {
      -webkit-touch-callout: none;
      -webkit-tap-highlight-color: transparent;
    }
    .cablesCssUi * {
      color: var(--text-color);
    }
    .cablesCssUi h3,
    .cablesCssUi h2 {
      font-weight: normal;
      margin-bottom: 4px;
    }
    .cablesCssUi h3 {
      font-size: 1.17em !important;
    }
    .cablesCssUi h2 {
      font-size: 1.5em !important;
      color: var(--color-13);
    }
    .cablesCssUi h1 {
      font-size: 2em !important;
    }
    .cablesCssUi .hljs {
      margin: 0 !important;
    }
    .cablesCssUi p {
      font-style: normal;
      font-weight: 400;
    }
    .cablesCssUi hr {
      border: none;
      border-top: 1px solid var(--color-01);
      height: 1px;
    }
    .cablesCssUi canvas {
      -webkit-user-select: none;
      user-select: none;
    }
    .cablesCssUi .noselect {
      user-select: none;
    }
    .cablesCssUi .selectable {
      user-select: text !important;
    }
    .cablesCssUi .selectable * {
      user-select: text !important;
    }
    .cablesCssUi .clickable {
      cursor: pointer;
    }
    .cablesCssUi .clear {
      clear: both;
    }
    .cablesCssUi .fleft {
      float: left;
    }
    .cablesCssUi .fright {
      float: right !important;
    }
    .cablesCssUi .mainColor {
      color: var(--color-13);
    }
    .cablesCssUi .SourceCodePro,
    .cablesCssUi monospace,
    .cablesCssUi .monospace {
      font-family: SourceCodePro, monospace;
    }
    .cablesCssUi .padded {
      padding: 15px;
    }
    .cablesCssUi .text-center {
      text-align: center;
    }
    .cablesCssUi .text-right {
      text-align: right;
    }
    .cablesCssUi a.link {
      text-decoration: underline !important;
    }
    .cablesCssUi a.link:hover {
      color: var(--color-special);
    }
    .cablesCssUi a {
      color: var(--color-11);
      text-decoration: none;
      cursor: pointer;
    }
    .cablesCssUi input {
      background-color: var(--color-07);
      color: var(--color-13);
      border: none;
    }
    .cablesCssUi input.invalid {
      border: 1px solid red;
    }
    .cablesCssUi input[type="text"] {
      padding: 10px 12px;
      height: 18px;
      font-size: var(--font-size-default);
      border-radius: 0;
    }
    .cablesCssUi textarea {
      width: 500px;
      height: 300px;
    }
    .cablesCssUi input[type="text"] {
      background-color: var(--color-05);
      border-radius: 4px;
      padding: 0px;
      padding-left: 4px;
      border: 1px solid var(--text-color);
      margin-bottom: 3px;
      border-radius: 0;
      border: none;
    }
    .cablesCssUi .valuetext {
      overflow: hidden;
      text-overflow: ellipsis;
      float: left;
      min-width: 80%;
      margin-right: 5px;
      min-height: 18px;
    }
    .cablesCssUi .valuetext.inspectable {
      min-width: 60%;
    }
    .cablesCssUi input.medium,
    .cablesCssUi .opsearchInput,
    .cablesCssUi input[type="text"],
    .cablesCssUi input[type="search"],
    .cablesCssUi #commentTextarea {
      background-color: var(--color-05);
      color: var(--color-13);
      border: 1px solid transparent !important;
      border-radius: 2px;
    }
    .cablesCssUi input.medium:focus,
    .cablesCssUi .opsearchInput:focus,
    .cablesCssUi input[type="text"]:focus,
    .cablesCssUi input[type="search"]:focus,
    .cablesCssUi #commentTextarea:focus {
      background-color: var(--color-05);
      color: var(--color-13);
    }
    .cablesCssUi input.medium {
      font-size: 18px;
      padding: 5px;
      width: 100%;
    }
    .cablesCssUi input[type="search"]::-webkit-search-cancel-button {
      -webkit-appearance: none;
      color: red;
      width: 20px;
      height: 20px;
      background-image: url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 6L6 18M6 6l12 12'/%3E%3C/svg%3E");
      cursor: pointer;
    }
    .cablesCssUi input[type="text"],
    .cablesCssUi input[type="search"] {
      padding: 8px 9px !important;
      width: 100%;
    }
    .cablesCssUi input[type="text"]::-webkit-input-placeholder,
    .cablesCssUi input[type="search"]::-webkit-input-placeholder {
      color: var(--color-09);
    }
    .cablesCssUi input[type="text"]:-moz-placeholder,
    .cablesCssUi input[type="search"]:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: var(--color-09);
      opacity: 1;
    }
    .cablesCssUi input[type="text"]::-moz-placeholder,
    .cablesCssUi input[type="search"]::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: var(--color-09);
      opacity: 1;
    }
    .cablesCssUi input[type="text"]:-ms-input-placeholder,
    .cablesCssUi input[type="search"]:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: var(--color-09);
    }
    .cablesCssUi input[type="text"]::-ms-input-placeholder,
    .cablesCssUi input[type="search"]::-ms-input-placeholder {
      /* Microsoft Edge */
      color: var(--color-09);
    }
    .cablesCssUi input[type="text"]:hover,
    .cablesCssUi input[type="search"]:hover {
      background-color: var(--color-05);
      color: var(--color-13);
      border: 1px solid var(--color-13);
    }
    .cablesCssUi input[type="search"].big-search {
      font-size: 20px;
    }
    .cablesCssUi .list a {
      color: var(--color-11);
    }
    .cablesCssUi .list td {
      border-bottom: 1px solid var(--color-02);
      padding-bottom: 4px;
      padding-top: 4px;
    }
    .cablesCssUi .list .filename {
      display: block;
      float: left;
      max-width: 180px;
      overflow: hidden;
    }
    .cablesCssUi ::selection,
    .cablesCssUi::selection {
      background: #00ff85 !important;
      color: black !important;
    }
    .cablesCssUi ::-webkit-scrollbar,
    .cablesCssUi::-webkit-scrollbar {
      height: 12px;
      width: 12px;
      background: transparent;
      opacity: 0.5;
    }
    .cablesCssUi ::-webkit-scrollbar-thumb,
    .cablesCssUi::-webkit-scrollbar-thumb {
      background: #2a2a2a;
      -webkit-border-radius: 1px;
      border-radius: 6px;
    }
    .cablesCssUi ::-webkit-scrollbar-corner,
    .cablesCssUi::-webkit-scrollbar-corner {
      background: transparent;
    }
    .cablesCssUi body,
    .cablesCssUi div {
      scrollbar-color: #2a2a2a transparent;
    }
    .cablesCssUi .help a {
      text-decoration: underline;
    }
    .cablesCssUi .help a:before {
      font-family: arial;
      content: "\f08e";
      margin-right: 5px;
      display: inline-block;
    }
    .cablesCssUi .help table {
      width: 100%;
    }
    .cablesCssUi .help table tr {
      border-bottom: var(--color-03);
    }
    .cablesCssUi .help table tr td {
      vertical-align: top;
      border-bottom: 1px solid var(--color-02);
      padding-bottom: 7px;
      padding-left: 6px;
      padding-right: 6px;
    }
    .cablesCssUi .help table tr th {
      color: white;
      text-align: left;
      font-weight: normal;
      padding-top: 13px;
      padding-bottom: 13px;
      font-size: var(--font-size-default);
    }
    .cablesCssUi .splitter {
      background-color: var(--color-splitter);
      z-index: 40;
      position: absolute;
      display: block;
    }
    .cablesCssUi #splitterBottomTabs {
      height: 4px;
      cursor: ns-resize;
      z-index: 30;
    }
    .cablesCssUi #splitterRendererWH {
      height: 15px !important;
      width: 15px !important;
      z-index: 40;
      cursor: ne-resize;
    }
    .cablesCssUi #splitterRenderer {
      height: 4px;
      right: 0px;
      cursor: ns-resize;
      z-index: 0;
    }
    .cablesCssUi #splitterPatch,
    .cablesCssUi #splitterEditor,
    .cablesCssUi #splitterMaintabs,
    .cablesCssUi .splitterTimeline {
      z-index: 40;
      width: 4px;
      height: 100%;
      cursor: ew-resize;
    }
    .cablesCssUi #splitterPatch {
      background-color: transparent;
    }
    .cablesCssUi .clone {
      background-color: var(--color-02);
      max-width: 720px;
      padding: 0px;
      font-size: var(--font-size-default);
      color: var(--color-10);
      height: 38px;
      line-height: 40px;
      text-align: right;
      display: flex;
    }
    .cablesCssUi .clone span {
      margin-top: 10px;
    }
    .cablesCssUi .clone input,
    .cablesCssUi .clone select {
      font-size: var(--font-size-default);
    }
    .cablesCssUi .clone select {
      padding-left: 10px;
      border: 1px solid transparent !important;
      border-radius: 10px;
      margin-right: 10px;
      max-width: 300px;
    }
    .cablesCssUi #opNameDialogConsequences,
    .cablesCssUi #opNameDialogHints,
    .cablesCssUi #opcreateerrors {
      padding: 10px !important;
      background-color: var(--color-03) !important;
      margin-bottom: 10px;
    }
    .cablesCssUi #opNameDialogConsequences h3,
    .cablesCssUi #opNameDialogHints h3,
    .cablesCssUi #opcreateerrors h3 {
      margin: 0px;
    }
    .cablesCssUi #opcreateerrors {
      border-left: 5px solid red;
    }
    .cablesCssUi #opNameDialogConsequences {
      border-left: 5px solid #5cb59e;
    }
    .cablesCssUi #opNameDialogHints {
      border-left: 5px solid #eba605;
    }
    .cablesCssUi #notify {
      position: absolute;
      top: 55px;
      right: 20px;
      background-color: var(--color-03);
      padding: 10px;
      opacity: 0.8;
      border-radius: 5px;
      z-index: 50;
      display: none;
    }
    .cablesCssUi #delayed {
      position: absolute;
      top: 20px;
      background-color: var(--color-03);
      padding: 10px;
      border-radius: 5px;
      z-index: 30;
      display: block;
    }
    .cablesCssUi input::placeholder {
      color: var(--color-09);
    }
    .cablesCssUi .underline {
      text-decoration: underline;
    }
    .cablesCssUi .underline:hover {
      color: var(--color-special);
    }
    .cablesCssUi #undev {
      position: absolute;
      right: 8px;
      bottom: 4px;
      width: 68px;
      height: 19px;
      background-color: var(--color-07);
      mask-repeat: no-repeat;
      display: block;
      z-index: 0;
    }
    .cablesCssUi .shaderErrorCode {
      user-select: text !important;
    }
    .cablesCssUi .uploadarea {
      text-align: center;
      background-color: var(--color-01);
      border: 2px dashed var(--color-04);
      width: 100%;
      padding-top: 100px;
      padding-bottom: 100px;
      border-radius: 15px;
      margin-bottom: 20px;
    }
    .cablesCssUi #uploaddialog {
      max-width: 720px;
    }
    .cablesCssUi .uploadareaActive {
      border: 2px dashed var(--color-09) !important;
      color: var(--color-special);
    }
    .cablesCssUi .tip {
      background-color: var(--color-01);
    }
    .cablesCssUi .tip p {
      line-height: 25px;
    }
    .cablesCssUi .tip code {
      background-color: var(--color-04);
      border: 1px solid var(--color-06);
      border-radius: 4px;
      padding: 2px;
      padding-left: 4px;
      padding-right: 4px;
    }
    .cablesCssUi #uiperfcontainer {
      max-height: 50%;
      overflow: scroll;
      z-index: 40;
      padding: 20px;
      position: absolute;
      background-color: #000;
      bottom: 0px;
      display: none;
      font-family: monospace;
    }
    .cablesCssUi #uiperf td {
      color: #fff;
    }
    .cablesCssUi #uiperf .highlighted td {
      color: var(--color-special) !important;
      background-color: #444;
    }
    .cablesCssUi #uiperf .col_inactive {
      color: #777;
    }
    .cablesCssUi #uiperf .col_recent {
      color: #bbb;
    }
    .cablesCssUi #uiperf .col_active {
      color: #fff;
    }
    .cablesCssUi #bgpreviewButtonsContainer {
      position: absolute;
    }
    .cablesCssUi #bgpreviewButtons {
      display: block;
    }
    .cablesCssUi #bgpreviewButtons {
      margin-right: 10px;
      margin-top: 10px;
    }
    .cablesCssUi #bgpreview {
      display: none;
      position: absolute;
      pointer-events: none;
      transform: scale(1, -1);
    }
    .cablesCssUi .colorButton {
      color: black;
      padding-left: 5px;
      padding-right: 5px;
    }
    .cablesCssUi .patch_summary {
      padding: 10px !important;
    }
    .cablesCssUi .nobreak {
      white-space: nowrap;
    }
    .cablesCssUi .portType_0_background {
      background-color: var(--color_link_value) !important;
    }
    .cablesCssUi .portType_1_background {
      background-color: var(--color_link_function) !important;
    }
    .cablesCssUi .portType_2_background {
      background-color: var(--color_link_object) !important;
    }
    .cablesCssUi .portType_3_background {
      background-color: var(--color_link_array) !important;
    }
    .cablesCssUi .portType_4_background {
      background-color: var(--color_port_dynamic) !important;
    }
    .cablesCssUi .portType_5_background {
      background-color: var(--color_link_string) !important;
    }

    .formtable select {
      padding: 5px !important;
      background-color: var(--color-04) !important;
      color: var(--color-11);
    }
    .formtable input {
      background-color: var(--color-05);
      color: var(--color-11);
      padding: 5px !important;
      padding-left: 10px !important;
    }

    .dragList div {
      list-style-type: none;
      background-color: #444;
      padding: 5px;
      margin-bottom: 2px;
      border-radius: 2px;
    }
    .dragList .ghost,
    .dragList .dragActive {
      background-color: #666;
    }
    .dragList .dragActive {
      opacity: 0.2 !important;
    }
    .dragList .handle {
      float: right;
      width: 20px;
      cursor: grab;
      margin-right: 10px;
    }

    #searchbox,
    #cmdpalette {
      position: absolute;
      top: 31px;
      z-index: 50;
      background-color: var(--color-02);
      border-radius: 4px;
      padding: 0px;
    }
    #searchbox .inputcontainer,
    #cmdpalette .inputcontainer {
      padding: 10px;
    }
    #searchbox #searchresult_cmd,
    #cmdpalette #searchresult_cmd {
      max-height: 30vh;
      overflow-y: auto;
    }

    #searchbox input,
    #cmdpalette input,
    .tabsearchbox input {
      -webkit-appearance: none;
      -webkit-user-select: auto;
      margin-bottom: 15px;
      background-color: var(--color-06);
      border: 1px solid transparent;
    }
    #searchbox input:focus,
    #cmdpalette input:focus,
    .tabsearchbox input:focus {
      border-color: var(--color-13);
    }

    #searchbox,
    .tabSearchResultsContainer {
      -webkit-appearance: none;
    }
    #searchbox .inputcontainer,
    .tabSearchResultsContainer .inputcontainer {
      background-color: var(--color-01);
    }
    #searchbox .inputcontainer .icon,
    .tabSearchResultsContainer .inputcontainer .icon {
      margin-left: 5px;
    }
    #searchbox .inputcontainer input,
    .tabSearchResultsContainer .inputcontainer input {
      -webkit-appearance: none;
      -webkit-user-select: auto;
      background-color: var(--color-06) !important;
    }

    .warning-error-level2,
    .warning-error-level0,
    .warning-error-level1 {
      padding: 3px !important;
      padding-left: 8px !important;
      padding-right: 8px !important;
      margin-top: 10px;
      border-radius: 4px;
      border-bottom: 0;
      border: 1px solid #222;
    }

    #searchresult div,
    .tabSearchResultsContainer div {
      border-bottom: 1px solid var(--color-05);
    }
    #searchresult .highlight,
    .tabSearchResultsContainer .highlight {
      color: var(--color-special);
    }

    #searchresult,
    #searchresult_cmd,
    .list,
    .tabSearchResultsContainer {
      background-color: var(--color-03);
      padding: 0px;
    }
    #searchresult h3,
    #searchresult_cmd h3,
    .list h3,
    .tabSearchResultsContainer h3 {
      margin: 0px;
    }
    #searchresult div,
    #searchresult_cmd div,
    .list div,
    .tabSearchResultsContainer div {
      padding: 10px;
      cursor: pointer;
      overflow-x: hidden;
      border-left: 2px solid transparent;
    }
    #searchresult div:hover,
    #searchresult_cmd div:hover,
    .list div:hover,
    .tabSearchResultsContainer div:hover {
      cursor: pointer;
      background-color: var(--color_op_bg_active);
    }
    #searchresult .lastClicked,
    #searchresult_cmd .lastClicked,
    .list .lastClicked,
    .tabSearchResultsContainer .lastClicked {
      background-color: var(--color-05);
    }
    #searchresult .blueprint,
    #searchresult .blueprint_subpatch,
    #searchresult .blueprintSub,
    #searchresult_cmd .blueprint,
    #searchresult_cmd .blueprint_subpatch,
    #searchresult_cmd .blueprintSub,
    .list .blueprint,
    .list .blueprint_subpatch,
    .list .blueprintSub,
    .tabSearchResultsContainer .blueprint,
    .tabSearchResultsContainer .blueprint_subpatch,
    .tabSearchResultsContainer .blueprintSub {
      opacity: 0.666;
    }
    #searchresult .blueprint h3,
    #searchresult .blueprint_subpatch h3,
    #searchresult .blueprint_subpatch2 h3,
    #searchresult_cmd .blueprint h3,
    #searchresult_cmd .blueprint_subpatch h3,
    #searchresult_cmd .blueprint_subpatch2 h3,
    .list .blueprint h3,
    .list .blueprint_subpatch h3,
    .list .blueprint_subpatch2 h3,
    .tabSearchResultsContainer .blueprint h3,
    .tabSearchResultsContainer .blueprint_subpatch h3,
    .tabSearchResultsContainer .blueprint_subpatch2 h3 {
      border-right: 5px solid var(--color_op_handle_default);
    }
    #searchresult .selected,
    #searchresult_cmd .selected,
    .list .selected,
    .tabSearchResultsContainer .selected {
      border-left: 2px solid var(--color-07);
    }
    #searchresult .resultError,
    #searchresult_cmd .resultError,
    .list .resultError,
    .tabSearchResultsContainer .resultError {
      border: 0;
      background-color: black;
    }

    #searchresult .highlight {
      font-weight: bold;
      text-decoration: underline;
    }

    .resultHiddenOp {
      opacity: 0.5;
    }

    #opsearchmodal {
      z-index: 50;
      position: absolute;
      left: 15%;
      top: 5%;
      padding: 0;
    }

    #opselect_replaceVar,
    #opselect_createTrigger {
      padding-bottom: 5px;
    }

    .opsearch {
      background-color: var(--color-02);
      border-radius: 12px;
      width: 830px;
      height: 580px;
      overflow: hidden;
    }
    .opsearch .opselectclose {
      position: absolute;
      right: 20px;
      top: 20px;
    }
    .opsearch header {
      width: 420px;
      background-color: var(--color-03);
      padding: 15px;
      padding-top: 15px;
      padding-bottom: 25px;
    }
    .opsearch header input {
      -webkit-user-select: auto;
      -webkit-appearance: none;
      font-size: 20px;
      width: 100%;
    }
    .opsearch .insertbutton {
      display: inline-block !important;
      background-size: 50%;
      padding: 10px;
      background-position: center;
      border-radius: 20px;
      margin-top: 3px;
      position: relative;
      right: -7px;
    }
    .opsearch .op-doc .op-summary {
      font-style: italic;
      font-size: 20px;
    }
    .opsearch #opselect-layout {
      min-width: 200px;
      min-height: 40px;
      display: inline-block;
      width: 100%;
    }
    .opsearch .opOptions {
      padding: 5px;
      padding-left: 15px;
      text-align: center;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }
    .opsearch .opOptions .warning {
      background-color: var(--color-warning);
      color: #000;
      font-weight: bold;
      padding-left: 10px;
      padding-right: 10px;
    }
    .opsearch .searchbrowserContainer {
      width: 450px;
      height: 521px;
      background-color: var(--color-03);
    }
    .opsearch .shortname {
      font-weight: bold;
    }
    .opsearch .shortname i {
      text-decoration: underline;
      font-style: normal;
      color: white;
    }
    .opsearch .searchresult {
      font-size: 16px;
      padding: 10px 15px;
      border-bottom: 1px solid var(--color-01);
      background-color: var(--color-03);
    }
    .opsearch .searchresult .icon {
      -webkit-mask-position-y: 2px;
      mask-position-y: 2px;
    }
    .opsearch .searchbrowser {
      height: 465px;
      overflow: auto;
    }
    .opsearch .searchbrowser .addbutton {
      margin-right: 0px;
    }
    .opsearch .searchbrowser .not-usable .addbutton {
      display: none;
    }
    .opsearch .searchbrowser .collection {
      border: 2px solid var(--color-07);
      margin-bottom: 3px;
    }
    .opsearch .searchinfo {
      margin-top: 60px;
      border-bottom: 30px solid var(--color-02);
      border-top: 30px solid var(--color-02);
      margin-left: 450px;
      position: absolute;
      width: 350px;
      padding: 0 15px;
      overflow-x: hidden;
      overflow-y: auto;
      height: 460px;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
      /* enable text selection on all elements except svg */
    }
    .opsearch .searchinfo * {
      -webkit-user-select: text;
      -khtml-user-select: text;
      -moz-user-select: text;
      -o-user-select: text;
      user-select: text;
    }
    .opsearch .searchinfo .opLayoutButton {
      display: inline-block;
      margin-bottom: 3px;
      border-radius: 5px;
      opacity: 0.7;
    }
    .opsearch .searchinfo .opLayoutButton:hover {
      opacity: 1;
    }
    .opsearch .searchinfo .opLayoutButton svg {
      margin: 0px;
    }
    .opsearch .searchinfo .open-docs-button {
      float: right;
      margin-top: 7px;
    }
    .opsearch .searchinfo .opTitleSvg {
      margin-top: 0px;
      position: absolute;
      margin-top: -33px;
      font-size: 19px;
      margin-left: 10px;
    }
    .opsearch .searchinfo .op-svg-shortname {
      font-size: 18px;
      font-family: "SourceSansPro", sans-serif;
    }
    .opsearch .searchinfo .namespace-wrapper {
      margin-top: 30px;
    }
    .opsearch .searchinfo #opselect-layout {
      min-height: 40px;
    }
    .opsearch .score {
      color: var(--text-color);
    }
    .opsearch .selected {
      background-color: var(--color_op_bg_active);
    }
    .opsearch .selected a {
      color: white;
    }
    .opsearch .selected .insertbutton {
      color: var(--color-11);
      background-color: var(--color_op_bg);
    }
    .opsearch .selected .insertbutton:hover {
      background-color: var(--color-02);
    }
    .opsearch .selected .insertbutton:hover * {
      background-color: var(--color-special) !important;
    }
    .opsearch .selected .summary {
      color: var(--text-color-textOpselectSelected);
    }
    .opsearch .selected .summary i {
      text-decoration: underline;
      font-style: normal;
      color: var(--color-03);
    }
    .opsearch .selected .op_color_default {
      color: var(--color-13);
    }
    .opsearch .selected .namespace {
      color: var(--text-color-textOpselectSelected);
    }
    .opsearch .selected .namespace i {
      text-decoration: underline;
      font-style: normal;
    }
    .opsearch .selected .namespace:hover {
      color: white;
    }
    .opsearch .selected .namespace:hover i {
      text-decoration: underline;
      font-style: bold;
      color: white;
    }
    .opsearch .namespace {
      font-size: 11px;
      font-style: normal;
      color: var(--color-08);
    }
    .opsearch .namespace:hover {
      color: var(--color-11);
    }
    .opsearch .namespace i {
      text-decoration: underline;
      font-style: normal;
    }
    .opsearch .summary {
      color: var(--text-color-textOpselect);
      font-size: 13px;
      font-style: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
      overflow: hidden;
    }
    .opsearch .summary i {
      text-decoration: underline;
      font-style: normal;
    }

    .opsearch.minimal {
      opacity: 0.9;
      width: 428px;
      height: 590px;
    }
    .opsearch.minimal input {
      padding: 4px !important;
      padding-left: 8px;
    }
    .opsearch.minimal .button {
      display: none;
    }
    .opsearch.minimal .searchresult {
      border: 0;
      border-bottom: 1px solid black;
      white-space: nowrap;
    }
    .opsearch.minimal #realsearch,
    .opsearch.minimal .namespace,
    .opsearch.minimal .insertbutton,
    .opsearch.minimal .searchinfo {
      display: none !important;
    }
    .opsearch.minimal input:focus {
      border: 1px solid black;
      border-radius: 2px;
    }
    .opsearch.minimal .summary {
      display: inline;
    }
    .opsearch.minimal header {
      padding: 4px;
      border-radius: 0px;
    }
    .opsearch.minimal .searchable {
      padding: 5px 10px;
    }

    .searchbrowser .item_color_default {
      border-left: 15px solid var(--color_op_handle_default);
    }
    .searchbrowser .item_color_gl {
      border-left: 15px solid var(--color_op_handle_gl);
    }
    .searchbrowser .item_color_audio {
      border-left: 15px solid var(--color_op_handle_audio);
    }
    .searchbrowser .item_color_devices {
      border-left: 15px solid var(--color_op_handle_devices);
    }
    .searchbrowser .item_color_html {
      border-left: 15px solid var(--color_op_handle_html);
    }
    .searchbrowser .item_color_math {
      border-left: 15px solid var(--color_op_handle_math);
    }
    .searchbrowser .item_color_user {
      border-left: 15px solid var(--color_op_handle_user);
    }

    #modalbg {
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 49;
      background-color: var(--color-05);
      animation: animModalBgFadeIn 0.15s normal forwards ease-out;
      animation-iteration-count: 1;
    }

    .modalbgtransparent {
      background-color: transparent !important;
    }

    @keyframes animModalBgFadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 0.45;
      }
    }
    .nopadding {
      padding: 0px !important;
    }
    .nopadding .top {
      padding: 20px;
      background-color: var(--color-01);
    }
    .nopadding .top h3 {
      margin-top: 0px;
    }
    .nopadding .top a {
      color: var(--color-13);
      text-decoration: underline;
    }
    .nopadding .bottom {
      padding: 20px;
    }

    .modalcontainer,
    #modalcontainer {
      border-radius: 12px;
      position: absolute;
      display: block;
      left: 50%;
      transform: translate(-50%, 0);
      top: 10%;
      width: auto;
      height: auto;
      min-width: 720px;
      max-width: 75%;
      max-height: 75%;
      overflow: auto;
      z-index: 50;
      background-color: var(--color-02);
      min-height: 100px;
      -webkit-box-shadow: -1px 1px 34px -6px rgba(0, 0, 0, 0.68);
      -moz-box-shadow: -1px 1px 34px -6px rgba(0, 0, 0, 0.68);
      box-shadow: -1px 1px 34px -6px rgba(0, 0, 0, 0.68);
    }
    .modalcontainer .modalclose,
    #modalcontainer .modalclose {
      right: 15px;
      margin-top: 5px;
      background-color: transparent;
      position: absolute;
      cursor: pointer;
      display: none;
    }
    .modalcontainer .modalclose .fa,
    #modalcontainer .modalclose .fa {
      font-size: 23px;
    }
    .modalcontainer #modalpromptinput,
    #modalcontainer #modalpromptinput {
      margin-bottom: 10px;
    }
    .modalcontainer .modallist ul,
    #modalcontainer .modallist ul {
      padding-left: 20px;
    }
    .modalcontainer .modallist ul li,
    #modalcontainer .modallist ul li {
      margin-bottom: 0.5em;
    }
    .modalcontainer.transparent,
    #modalcontainer.transparent {
      background-color: transparent !important;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
    }
    .modalcontainer a,
    #modalcontainer a {
      color: var(--color-special);
    }
    .modalcontainer input[type="checkbox"],
    #modalcontainer input[type="checkbox"] {
      place-content: center;
      width: 24px !important;
      height: 24px !important;
      appearance: none;
      background-color: #444444 !important;
      border: 4px solid #444444;
      margin-right: 5px;
    }
    .modalcontainer input[type="checkbox"]:checked,
    #modalcontainer input[type="checkbox"]:checked {
      background-color: #8c8c8c !important;
      border: 4px solid #8c8c8c;
    }
    .modalcontainer input[type="checkbox"]::before,
    #modalcontainer input[type="checkbox"]::before {
      content: "";
      transform: scale(0);
      width: 16px !important;
      height: 16px !important;
      display: block;
    }
    .modalcontainer input[type="checkbox"]:checked::before,
    #modalcontainer input[type="checkbox"]:checked::before {
      transform: scale(1);
      width: 16px !important;
      height: 16px !important;
      display: block;
      background-color: #dbdbdb;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }
    .modalcontainer .checkbox_group .checkbox_group_title,
    #modalcontainer .checkbox_group .checkbox_group_title {
      margin-bottom: 10px;
      margin-top: 10px;
    }

    @media only screen and (max-width: 47.938em) {
      .modalcontainer,
      #modalcontainer {
        min-width: 0 !important;
      }
    }
    #modalcontent {
      padding: 15px;
      font-size: var(--font-size-bigger);
      user-select: text;
      -webkit-user-select: text; /* Chrome all / Safari all */
      -moz-user-select: text; /* Firefox all */
      -ms-user-select: text; /* IE 10+ */
    }
    #modalcontent pre {
      max-width: 700px;
      overflow: auto;
    }

    #modalheader {
      color: var(--color-13);
      text-align: center;
      font-size: 17px;
      padding: 5px;
      text-transform: uppercase;
    }

    .shaderErrorCode,
    .code {
      font-family: SourceCodePro, monospace;
      white-space: pre;
      background-color: var(--color-03);
      padding: 10px;
      max-height: 600px;
      overflow: auto;
      user-select: text;
      -webkit-user-select: text; /* Chrome all / Safari all */
      -moz-user-select: text; /* Firefox all */
      -ms-user-select: text; /* IE 10+ */
      max-width: 800px;
    }
    .shaderErrorCode .error,
    .code .error {
      background-color: #400;
      width: 100%;
    }

    .shaderErrorCodeContainer {
      font-family: SourceCodePro, monospace;
      background-color: var(--color-03);
      white-space: pre;
      padding: 10px;
      user-select: text;
      -webkit-user-select: text; /* Chrome all / Safari all */
      -moz-user-select: text; /* Firefox all */
      -ms-user-select: text; /* IE 10+ */
      max-width: 800px;
      max-height: 600px;
      overflow: auto;
    }
    .shaderErrorCodeContainer .shaderErrorCode {
      padding: 0;
      overflow: visible;
      max-height: unset;
      margin-top: 10px;
    }

    .modalScrollContent {
      user-select: text;
      clear: both;
      background-color: var(--color-03);
      max-height: 500px;
      overflow-y: scroll;
      padding: 20px;
    }

    .cablesCssUi #cmdpalette {
      position: absolute;
      width: 500px;
      left: 50%;
      margin-left: -250px;
      top: 100px;
      border-radius: 12px;
    }
    .cablesCssUi #cmdpalette .input-container {
      padding: 20px;
    }
    .cablesCssUi #cmdpalette .input-container input {
      margin-bottom: 0px;
      padding-left: 10px;
    }
    .cablesCssUi #cmdpalette .input-container .icon-x {
      position: relative;
      right: -11px;
    }
    .cablesCssUi #cmdpalette .result {
      padding-right: 20px;
    }
    .cablesCssUi #cmdpalette .result .title {
      position: relative;
      top: -3px;
      font-size: 20px;
      color: var(--color-13);
    }
    .cablesCssUi #cmdpalette .result .category {
      position: relative;
      top: -5px;
    }
    .cablesCssUi #cmdpalette .result .icon {
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 5px;
    }
    .cablesCssUi #cmdpalette .result .icon.bookmark {
      float: right;
    }
    .cablesCssUi #cmdpalette .result .hotkey {
      position: relative;
      top: 4px;
      color: var(--color-07);
      text-transform: uppercase;
      float: right;
      font-family: monospace;
    }
    .cablesCssUi #cmdpalette .result.selected {
      background-color: var(--color-05);
    }
    .cablesCssUi #cmdpalette .dyn .title {
      color: var(--color-special) !important;
    }

    .projectsettings textarea,
    .projectsettings input {
      background-color: var(--color-05);
      width: 100%;
    }

    .settings_content {
      background-color: var(--color-03);
      padding: 20px;
      min-height: 540px;
    }
    .settings_content textarea {
      height: 150px !important;
      border: none;
    }
    .settings_content .taginputcontainer {
      margin-top: 5px;
      border: 7px solid var(--color-05);
      border-bottom: 3px solid var(--color-05);
    }
    .settings_content h2 {
      text-transform: uppercase;
    }

    .settings_tabs {
      background-color: var(--color-02);
      padding-left: 30px;
      padding-right: 30px;
      min-height: 580px;
    }
    .settings_tabs a {
      display: block;
      padding: 4px;
      padding-left: 5px;
    }
    .settings_tabs .active {
      color: var(--color-special);
    }

    #settings_error b {
      color: white;
    }
    #settings_error ul,
    #settings_error li {
      color: var(--color-error);
      margin-bottom: 0px;
    }

    .cablesCssUi #timelineui {
      padding-right: 10px;
    }
    .cablesCssUi .menubar,
    .cablesCssUi #timelineui {
      position: absolute;
      background-color: var(--color-03);
      overflow: hidden;
    }
    .cablesCssUi .menubar .warning,
    .cablesCssUi #timelineui .warning {
      color: var(--color-warning);
    }
    .cablesCssUi .menubar li.main,
    .cablesCssUi #timelineui li.main {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      min-height: 21px;
    }
    .cablesCssUi .menubar li,
    .cablesCssUi #timelineui li {
      color: var(--text-color);
    }
    .cablesCssUi .menubar li:hover,
    .cablesCssUi #timelineui li:hover {
      color: var(--color-13);
    }
    .cablesCssUi .menubar .button,
    .cablesCssUi #timelineui .button {
      background-color: transparent;
    }
    .cablesCssUi .menubar:hover {
      overflow: visible;
    }
    .cablesCssUi #loggedin,
    .cablesCssUi #loggedout {
      float: right;
      display: none;
    }
    .cablesCssUi .menubar .button,
    .cablesCssUi #timing .button {
      display: block;
      float: left;
      padding: 5px;
      padding-left: 5px;
      margin-left: 4px;
      margin-top: 3px;
    }
    .cablesCssUi .menubar .button.fa:before,
    .cablesCssUi #timing .button.fa:before {
      margin-right: 0px;
    }
    .cablesCssUi .menubar .button:hover,
    .cablesCssUi #timing .button:hover {
      background-color: var(--color-02) !important;
      color: var(--color-special);
    }
    .cablesCssUi .menubar .button:active,
    .cablesCssUi #timing .button:active {
      background-color: var(--color-02);
    }
    .cablesCssUi .menubar {
      overflow: hidden;
      display: block;
      margin-top: 10px;
      border: 5px solid var(--color-03);
      border-radius: 5px;
    }
    .cablesCssUi .blinking {
      animation: blinkingText 0.8s infinite;
    }
    @keyframes blinkingText {
      0% {
        color: var(--color-special);
      }
      25% {
        color: var(--color-12);
      }
      50% {
        color: var(--color-special);
      }
      75% {
        color: var(--color-12);
      }
    }
    .cablesCssUi #patchname {
      margin-top: 1px;
      user-select: none;
    }
    .cablesCssUi .cables-logo {
      position: absolute;
      text-align: center;
      height: 20px;
      width: 80px;
      height: 80px;
      background-color: var(--color-03);
      top: 0px;
      left: 0px;
    }
    .cablesCssUi .cables-logo .icon-cables {
      margin-top: 15px;
      width: 40px;
      height: 60px;
      background-color: var(--color-13);
    }
    .cablesCssUi nav {
      user-select: none;
      float: left;
      /* sub-sub-menu, e.g. New from template -> 2d, 3d, ... */
    }
    .cablesCssUi nav .main .icon {
      margin-top: 2px;
    }
    .cablesCssUi nav li {
      font-family: "SourceSansPro", arial;
      font-weight: 400;
      vertical-align: top;
    }
    .cablesCssUi nav a {
      color: var(--text-color) !important;
    }
    .cablesCssUi nav ul {
      text-align: left;
      display: block;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .cablesCssUi nav ul li {
      display: inline-block;
      position: relative;
      cursor: pointer;
      margin-right: -4px;
      padding-left: 10px;
      padding-top: 5px;
      padding-bottom: 3px;
      padding-right: 10px;
    }
    .cablesCssUi nav ul li.inactive {
      color: var(--color-06);
    }
    .cablesCssUi nav ul li .shortcut {
      float: right;
    }
    .cablesCssUi nav ul li .shortcut p {
      padding: 0;
      margin: 0;
    }
    .cablesCssUi nav ul li .shortcut code {
      margin-right: 3px;
    }
    .cablesCssUi nav ul li .icon {
      margin-left: 0 !important;
    }
    .cablesCssUi nav ul li:hover {
      background: var(--color-06);
      color: var(--color-13);
    }
    .cablesCssUi nav ul li:hover a {
      color: var(--color-13);
    }
    .cablesCssUi nav .nav-greyout {
      color: #555;
    }
    .cablesCssUi nav .nav-submenu {
      z-index: 50;
      padding: 0;
      position: absolute;
      top: 20px;
      border-top: 10px solid transparent;
      left: 0;
      width: 235px;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      display: none;
      opacity: 0;
      visibility: hidden;
      -webkit-transiton: opacity 0.1s;
      -moz-transition: opacity 0.1s;
      -ms-transition: opacity 0.1s;
      -o-transition: opacity 0.1s;
      transition: opacity 0.1s;
    }
    .cablesCssUi nav ul li ul li {
      padding: 5px 10px;
      background: var(--color-03);
      display: block;
      color: var(--color-13);
    }
    .cablesCssUi nav ul li ul li:hover {
      background: var(--color-06);
      cursor: pointer;
    }
    .cablesCssUi nav ul li:hover > ul {
      display: block;
      opacity: 1;
      visibility: visible;
    }
    .cablesCssUi nav .divide {
      padding: 0px;
      border-bottom: 1px solid var(--color-04);
    }
    .cablesCssUi nav a:hover {
      color: var(--color-13);
    }
    .cablesCssUi nav ul li:hover {
      background: var(--color-04);
      color: var(--color-13);
    }
    .cablesCssUi nav ul li:hover a {
      color: var(--color-13);
    }
    .cablesCssUi nav ul li ul {
      padding: 0;
      position: absolute;
      top: 28px;
      left: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      display: none;
      opacity: 0;
      visibility: hidden;
      -webkit-transiton: opacity 0.1s;
      -moz-transition: opacity 0.1s;
      -ms-transition: opacity 0.1s;
      -o-transition: opacity 0.1s;
      transition: opacity 0.1s;
    }
    .cablesCssUi nav ul li ul li {
      background: var(--color-03);
      display: block;
      color: var(--color-13);
    }
    .cablesCssUi nav ul li ul li:hover {
      background: var(--color-06);
      cursor: pointer;
    }
    .cablesCssUi nav ul li:hover > ul {
      display: block;
      opacity: 1;
      visibility: visible;
    }
    .cablesCssUi nav .divide {
      padding: 0px;
      border-bottom: 1px solid var(--color-04);
    }
    .cablesCssUi nav .nav-sub-submenu .icon {
      background-color: var(--color-10);
      float: right;
      position: relative;
      right: -3px;
    }
    .cablesCssUi nav .nav-sub-submenu .icon:after {
      clear: both;
    }
    .cablesCssUi nav .nav-sub-submenu ul {
      position: absolute;
      left: 204px;
      visibility: hidden;
      z-index: 9;
    }
    .cablesCssUi nav .nav-sub-submenu ul li {
      position: relative;
      right: 0;
      top: -28px;
      padding: 0;
      white-space: nowrap;
    }
    .cablesCssUi nav .nav-sub-submenu ul li a {
      display: block;
      padding: 5px 10px;
    }
    .cablesCssUi nav .checked,
    .cablesCssUi nav .unchecked {
      margin-bottom: -3px;
      width: 14px;
      height: 14px;
      margin-right: 8px;
    }
    .cablesCssUi nav .unchecked {
      opacity: 0;
    }
    .cablesCssUi #multiplayerbar {
      display: none;
    }
    .cablesCssUi #multiplayerbar.syncing .sc-options .start-button,
    .cablesCssUi #multiplayerbar.syncing .sc-options .join-button,
    .cablesCssUi #multiplayerbar.syncing .sc-options .leave-button {
      display: none !important;
    }
    .cablesCssUi #multiplayerbar.syncing .sc-options .loading-button {
      display: inline-block !important;
    }
    .cablesCssUi .nav-clientlist {
      padding-left: 3px;
      padding-right: 3px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .cablesCssUi .nav-clientlist .sc-userlist {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 2px;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .more-options {
      margin-bottom: 5px;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .item {
      display: inline-block;
      height: 100%;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .item .avatar {
      color: black;
      text-align: center;
      width: 24px;
      height: 24px;
      border-radius: 100px;
      overflow: hidden;
      display: inline-block;
      background-size: contain;
      margin-left: 2px;
      margin-right: 2px;
      pointer-events: none;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .item.remote-client .avatar {
      color: white;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .item .avatar {
      opacity: 0.5;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .item.me .avatar {
      opacity: 1;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .item .piloticon,
    .cablesCssUi .nav-clientlist .sc-userlist .item .followicon,
    .cablesCssUi .nav-clientlist .sc-userlist .item .followingicon {
      display: none;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .item.following .followingicon {
      position: absolute;
      display: block !important;
      width: 24px;
      height: 24px;
      margin-top: -24px;
      margin-left: 6px;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .item.pilot .piloticon,
    .cablesCssUi .nav-clientlist .sc-userlist .item.follower .followicon,
    .cablesCssUi .nav-clientlist .sc-userlist .item .greyicon {
      position: absolute;
      border-radius: 100%;
      background-color: #444;
      color: white;
      width: 17px;
      height: 17px;
      margin-top: -20px;
      z-index: 99;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .item.pilot .piloticon .icon,
    .cablesCssUi .nav-clientlist .sc-userlist .item.follower .followicon .icon,
    .cablesCssUi .nav-clientlist .sc-userlist .item .greyicon .icon {
      margin-left: 2px;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .item.pilot .piloticon,
    .cablesCssUi .nav-clientlist .sc-userlist .item.follower .followicon {
      display: block !important;
    }
    .cablesCssUi .nav-clientlist .sc-userlist .item.me.pilot-request .avatar {
      animation: animLogoFadein 2s infinite;
    }
    .cablesCssUi .nav-clientlist .sc-options {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 10px;
    }
    .cablesCssUi .nav-clientlist .sc-options .button-small {
      display: none !important;
      margin-top: 0;
    }
    .cablesCssUi .nav-clientlist .sc-options .button-small.visible {
      display: inline-block !important;
    }
    .cablesCssUi #nav-logo {
      margin-top: 0px !important;
    }
    .cablesCssUi .nav_logo {
      padding-left: 7px;
    }
    .cablesCssUi .nav_support {
      background-color: #72100e;
    }
    .cablesCssUi #nav-logo_idle {
      background-image: url(data:image;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAQAAAAm93DmAAABu0lEQVR4Ac3BP0jUcRjH8Y9nWZCFNwktojTIiXAQQRFhf5bLJtGWjsYyIZAIrnaDmoSGxLmrJagIiZoauqglEDoIh2hqKa6gH3F24N07Hh7OjusXfA++g6+XdhwuUKHCLcXCfcx7xcI65rniYC8NzF3FwRncRcXBKqbJQcVAlgTzWnFwB1dUDEzyG/OJ3eoF/UxQYJo8A9rGIFXcrMIxygo12hLKTEoSu3iGe6RwLFKn2xa32cND3GeyCsUy//MF94u8QjFP2xozjDFCgTJb/NXgrEIxTILZZE4dOMF3XJ1zCscSrqgunKSJeaJesIGpKAUPMAkDCkWWFuaKUlDA5RWKHG5KKRjBTSsU47hTSsEYrqBQ7KeJuaYUzOAmFI51TJWM/sEapka/wlHCldSFOdyKwjHIC1yTG2S0jSKbmDqjCsUQ7+hU5TqnmWKBCm2LCsU+3uIatEi3rFBkeIr7wXFm+Ua3hHmFo4SrkZckhrjJB1qYFhssMaxw5Ghg6hxVBw4wTo6sesVL3CXFwBHcK/oUA6u4Y4qBDF8xbxQHh3ELioOruEOKg3uYn/QpDh5jPioWzlOmzGXtNH8AqmJyrxV/UAsAAAAASUVORK5CYII=);
      background-size: auto 100%;
      width: 20px;
      height: 20px;
      display: block;
      position: absolute;
      z-index: 100;
    }
    .cablesCssUi #nav-loading {
      background: url("data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJFbXB0eV80MHg0MF9CRyIgZGF0YS1uYW1lPSJFbXB0eSA0MHg0MCBCRyI+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiLz48L2c+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjcuNDEsMjYuNTNsLTIuNzctMi40NEE2LjE2LDYuMTYsMCwwLDEsMjAsMjYuMTksNi4wNyw2LjA3LDAsMCwxLDE2LjM5LDI1YTQuNTQsNC41NCwwLDAsMS0uNDgtLjM5bC0yLjQ2LDIuOGE5Ljg2LDkuODYsMCwwLDAsMTQtLjkxWiIvPjwvc3ZnPg==");
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      animation: bkg 0.333s linear infinite;
      transition: none;
      position: absolute;
      z-index: 90;
    }
    @keyframes bkg {
      100% {
        transform: rotate(360deg);
      }
    }
    .cablesCssUi .logoFadein {
      animation: animLogoFadein 0.2s normal forwards ease-out;
      animation-iteration-count: 1;
    }
    @keyframes animLogoFadein {
      0% {
        opacity: 0.3;
      }
      100% {
        opacity: 1;
      }
    }
    .cablesCssUi .logoFadeout {
      animation: animLogoFadeout 0.2s normal forwards ease-out;
      animation-iteration-count: 1;
    }
    @keyframes animLogoFadeout {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0.3;
      }
    }

    #uploadprogresscontainer {
      position: absolute;
      background-color: var(--color-06);
      z-index: 50;
      overflow: hidden;
      left: 2px;
      top: 30px;
      width: 28px;
      height: 2px;
    }

    #uploadprogress {
      background-color: var(--color-special);
      width: 50%;
      height: 100%;
    }

    #library {
      display: none;
      position: absolute;
      background-color: var(--color-03);
      z-index: 30;
    }
    #library .suffix {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.8);
      padding-top: 2px;
      padding-bottom: 2px;
      padding-left: 0px;
      padding-right: 4px;
      font-family: monospace;
    }
    #library .file-icon-container {
      background-color: var(--color-01);
      margin-top: 10px;
      margin-left: 10px;
    }
    #library .libleft {
      width: 70%;
      float: left;
    }
    #library .libright {
      float: right;
      width: 30%;
      overflow: scroll;
      max-height: 100%;
      overflow-x: hidden;
      background-color: #1b1b1b;
    }
    #library .libContentContainer {
      overflow: hidden;
      height: 440px;
    }
    #library .previewImage {
      background-color: 0;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% auto;
      width: 60%;
      padding-top: 60%;
    }
    #library #lib_preview {
      padding-top: 10px;
      margin-left: 10px;
      min-height: 100%;
    }
    #library .iconcontainer {
      width: 120px;
      height: 140px;
      float: left;
      cursor: pointer;
    }
    #library .iconcontainer:hover {
      background-color: var(--color-01);
    }
    #library .iconcontainer:hover .filename {
      color: var(--color-13);
    }
    #library .iconcontainer .filename {
      overflow: hidden;
      font-size: 11px;
      text-transform: none;
      text-overflow: ellipsis;
      max-width: 100px;
      margin-left: 10px;
      text-align: center;
      padding-top: 4px;
      padding-bottom: 4px;
    }
    #library .iconcontainer .library-file-icon,
    #library .iconcontainer i {
      background-repeat: no-repeat;
      background-size: 100% auto;
      width: 100px;
      height: 100px;
      background-position: center center;
    }
    #library .iconcontainer i {
      height: 70px;
      padding-top: 30px;
      text-align: center;
      vertical-align: middle;
    }
    #library .iconcontainer_dir i {
      background-color: var(--color-01);
      opacity: 0.5;
    }
    #library .uploadFile {
      text-align: center;
      opacity: 0.5;
      border: 2px dashed white;
      border-radius: 10px;
    }
    #library .library-file-list {
      padding: 4px;
      cursor: pointer;
    }
    #library .library-file-list i {
      margin-right: 3px;
    }
    #library .library-file-list:hover {
      background-color: var(--color-03);
      color: var(--color-13);
    }
    #library #lib_head .tabs {
      height: 40px;
      overflow: hidden;
      clear: both;
      background-color: var(--color-03);
    }
    #library #lib_head .tabs .tab {
      float: left;
      padding-top: 13px;
      padding-bottom: 9px;
      padding-left: 20px;
      padding-right: 20px;
      background-color: transparent;
      margin-right: 5px;
      margin-bottom: 10px;
      cursor: pointer;
      max-height: 100%;
      color: var(--text-color);
      border-bottom: 1px solid transparent;
    }
    #library #lib_head .tabs .tab:hover {
      color: var(--color-13);
    }
    #library #lib_head .tabs .active {
      background-color: var(--color-02);
      border-bottom: 1px solid var(--color-special);
    }
    #library #lib_files {
      height: 100%;
      overflow: auto;
      font-size: 12px;
      padding-left: 5px;
      padding-top: 5px;
      position: relative;
    }
    #library #lib_files .lvl1 {
      margin-left: 20px;
    }
    #library #lib_files .lvl2 {
      margin-left: 40px;
    }
    #library #lib_files .lvl3 {
      margin-left: 60px;
    }
    #library #lib_files .unselectable {
      color: var(--color-06);
    }
    #library #lib_files .filename {
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      padding-top: 5px !important;
    }
    #library #lib_files .selectable {
      text-overflow: ellipsis;
      color: var(--color-13);
    }
    #library #lib_files .selectable:hover {
      text-decoration: underline;
      background-color: var(--color-02);
      color: white;
    }
    #library #lib_files .type_image,
    #library #lib_files .type_mesh,
    #library #lib_files .type_audio {
      cursor: pointer;
    }

    .filename {
      cursor: pointer;
      text-overflow: ellipsis;
      word-wrap: break-word;
      padding-left: 4px !important;
      padding-right: 0px !important;
      padding-top: 0px !important;
      padding-bottom: 0px !important;
      margin-bottom: 3px;
    }
    .filename:hover {
      color: white;
    }

    #editorminimized,
    #editormaximized {
      z-index: 30;
      top: 10px;
      cursor: pointer;
      padding: 10px;
      background-color: var(--color-03);
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      position: absolute;
    }

    .editorminimized_changed {
      background-color: var(--color-06) !important;
    }

    #editor {
      margin: 0;
      top: 0;
      bottom: 0;
      left: 0;
      position: absolute;
    }
    #editor .warning {
      background: rgba(200, 10, 10, 0.5);
      position: absolute;
      width: 100% !important;
      left: 0 !important;
    }
    #editor #editorbar,
    #editor .tabBar {
      position: absolute;
      background-color: var(--color-02);
    }
    #editor #editorbar .tabs,
    #editor .tabBar .tabs {
      width: 100%;
      margin-bottom: 7px;
      height: 32px;
      overflow: hidden;
      background-color: var(--color-03);
    }
    #editor #editorbar .tabs .tab,
    #editor .tabBar .tabs .tab {
      float: left;
      font-size: 13px;
      padding: 4px;
      padding-top: 3px;
      cursor: pointer;
      padding-left: 8px;
      padding-right: 8px;
      margin-top: 7px;
    }
    #editor #editorbar .tabs .tab.active,
    #editor .tabBar .tabs .tab.active {
      background-color: var(--color-02);
      color: var(--color-13);
      font-weight: bold;
      border-bottom: 1px solid var(--color-special);
    }
    #editor #editorbar .tabs .tab:hover,
    #editor .tabBar .tabs .tab:hover {
      color: var(--color-13);
    }
    #editor .iconbar {
      padding-left: 10px;
    }
    #editor .iconbar a {
      margin-bottom: 4px;
    }
    #editor #editorstatus {
      padding-left: 10px;
    }
    #editor #ace_editors .ace_content {
      -webkit-font-smoothing: subpixel-antialiased;
    }

    .ace_search_field,
    .ace_button,
    .ace_search_counter,
    .ace_searchbtn {
      color: #000 !important;
    }

    .editor_spreadsheet table {
      border-spacing: 0px;
      border-collapse: separate;
      width: 100%;
    }
    .editor_spreadsheet td,
    .editor_spreadsheet tr {
      border: 0px;
      padding: 0px;
    }
    .editor_spreadsheet td {
      border-bottom: 1px solid var(--color-02);
    }
    .editor_spreadsheet tr:hover td {
      border-bottom: 1px solid var(--color-12);
    }
    .editor_spreadsheet .colname {
      margin-bottom: 3px;
      background-color: var(--color-04);
      border-bottom: 1px solid var(--color-special);
      font-weight: bold;
      padding: 4px;
    }
    .editor_spreadsheet .rownum,
    .editor_spreadsheet .colnum,
    .editor_spreadsheet .rownumleft {
      background-color: var(--color-04);
      color: var(--color-11);
      text-align: right;
      font-family: monospace;
      padding-right: 5px;
      padding-left: 5px;
      user-select: none;
    }
    .editor_spreadsheet .rownumleft {
      text-align: left;
    }
    .editor_spreadsheet .colnum {
      border-right: 1px solid var(--color-02);
      text-align: left;
    }
    .editor_spreadsheet input,
    .editor_spreadsheet span {
      font-family: monospace;
      border: 0px;
      padding: 5px;
      border-left: 1px solid var(--color-02);
      background-color: var(--color-05);
      color: var(--color-11);
      width: 100%;
    }
    .editor_spreadsheet input:focus,
    .editor_spreadsheet span:focus {
      background-color: var(--color-06);
      color: var(--color-11);
    }
    .editor_spreadsheet span {
      display: block;
      width: 100%;
      height: 100%;
    }

    .cablesCssUi .tlTitle {
      position: absolute;
      background-color: black;
      white-space: nowrap;
      padding-right: 5px;
      padding-left: 5px;
      border-left: 3px solid transparent;
      width: 100%;
    }
    .cablesCssUi .tlTitle.hasSelectedKeys {
      border-left: 3px solid yellow;
    }
    .cablesCssUi .tlTitle span {
      cursor: pointer;
      padding-right: 10px;
      padding-left: 5px;
      color: var(--color-07);
    }
    .cablesCssUi .tlTitle span.current {
      color: var(--color-12);
    }
    .cablesCssUi .tlTitle .button-small {
      padding: 3px !important;
      padding-top: 0px !important;
      padding-bottom: 0px !important;
      margin: 1px !important;
    }
    .cablesCssUi .tlTitle .button-small .icon {
      width: 3px !important;
    }
    .cablesCssUi .filterInput {
      top: 81px;
      left: 31px;
      position: absolute;
    }
    .cablesCssUi .timelineminimize {
      position: absolute;
      right: 1px;
    }
    .cablesCssUi .cblgltimelineEle {
      z-index: 9;
    }
    .cablesCssUi .tltimedisplay {
      position: absolute;
      top: 40px;
      left: 10px;
      z-index: 99;
      background-color: var(--color-02);
    }
    .cablesCssUi .keyOverlay {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background-color: var(--color-02);
      width: 300px;
      height: 165px;
      z-index: 99;
    }
    .cablesCssUi .keyOverlay .iconbutton {
      margin-right: 1px;
    }

    .cablesCssUi .changelog .log {
      clear: both;
      background-color: var(--color-03);
      max-height: 500px;
      overflow-y: scroll;
    }
    .cablesCssUi .changelog .icon-cables {
      transition: all 0.5s ease-in-out;
      animation: blinke normal 1.5s infinite ease-in-out;
    }
    .cablesCssUi .changelog .item {
      margin-bottom: 10px;
      border-bottom: 1px solid #444;
      padding-top: 10px;
      padding-bottom: 10px;
      color: white;
      line-height: 22px;
    }
    .cablesCssUi .changelog .item:last-child {
      border: none !important;
    }
    .cablesCssUi .changelog .item .date {
      padding-right: 20px;
    }
    .cablesCssUi .changelog .item em {
      font-weight: bold;
    }
    .cablesCssUi .changelog .item a {
      text-decoration: underline;
    }
    .cablesCssUi .changelog .item code {
      background-color: #444;
      padding-left: 5px;
      padding-right: 5px;
    }

    /* mixin for multiline from http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/*/
    .cablesCssUi #infoAreaToggle {
      position: absolute;
      bottom: 3px;
      right: 90px;
      cursor: pointer;
      text-align: center;
      z-index: 22;
    }
    .cablesCssUi #infoAreaParam {
      z-index: 21;
      position: absolute;
      min-width: 200px;
      height: 25px;
      bottom: 0px;
      background-color: black;
      padding-left: 5px;
    }
    .cablesCssUi #infoArea {
      width: 100%;
      height: 100px;
      position: absolute;
      background-color: var(--color-02);
      color: var(--text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 17px;
      bottom: 0;
      opacity: 0.9;
      user-select: none;
      z-index: 0;
    }
    .cablesCssUi #infoArea h2 {
      font-size: 15px !important;
    }
    .cablesCssUi #infoArea .icon {
      margin-top: 2px;
      width: 20px;
      height: 20px;
      vertical-align: sub;
      margin-right: 5px;
    }
    .cablesCssUi #infoArea .infoareaContent {
      padding: 0px;
      position: absolute;
      padding-top: 1px !important;
      padding-left: 20px !important;
    }
    .cablesCssUi #infoArea .infoareaContent h2,
    .cablesCssUi #infoArea .infoareaContent li,
    .cablesCssUi #infoArea .infoareaContent ul,
    .cablesCssUi #infoArea .infoareaContent p {
      display: inline;
      margin: 0px;
      padding: 0px;
      margin-right: 15px;
      background-color: transparent;
      min-height: 100%;
    }
    .cablesCssUi #infoArea .infoareaContent h2 {
      font-size: 16px;
      color: var(--color-13);
      padding-top: 3px;
      display: inline;
    }
    .cablesCssUi .key_updown:after {
      font-size: 14px;
      content: "↑↓";
      vertical-align: top;
    }
    .cablesCssUi .key_up:after {
      font-size: 14px;
      content: "↑";
      vertical-align: top;
    }
    .cablesCssUi .key_left:after {
      font-size: 14px;
      content: "←";
      vertical-align: top;
    }
    .cablesCssUi .key_right:after {
      font-size: 14px;
      content: "→";
      vertical-align: top;
    }
    .cablesCssUi .key_down:after {
      font-size: 14px;
      content: "↓";
      vertical-align: top;
    }
    .cablesCssUi .key_option:after {
      font-size: 19px;
      content: "⌥";
    }
    .cablesCssUi .key_shift:after {
      font-size: 14px;
      content: "⇧";
      vertical-align: top;
    }
    .cablesCssUi #infoArea .key_shift:after {
      margin-top: -3px;
      margin-left: 5px;
    }
    .cablesCssUi .key_cmd:after {
      content: "⌘";
    }
    .cablesCssUi .tooltip_nopadding {
      padding-left: 4px !important;
      padding-right: 4px !important;
    }
    .cablesCssUi .tooltip {
      position: absolute;
      z-index: 51;
      background-color: var(--color-03);
      border-radius: 5px;
      white-space: nowrap;
      color: var(--color-13);
      padding: 5px;
      padding-left: 14px;
      padding-right: 14px;
      border-radius: 5px;
    }
    .cablesCssUi .tooltip .tooltip_value {
      text-transform: none !important;
    }
    .cablesCssUi .tooltip:hover {
      display: none;
    }
    .cablesCssUi .tooltip b {
      font-weight: bold;
      color: var(--color-13);
      font-size: 14px;
    }
    .cablesCssUi .tooltip i {
      color: var(--color-13);
    }
    .cablesCssUi .tooltip .multiline-string-port {
      display: block;
      overflow: hidden;
      position: relative;
      line-height: 1.2em;
      max-height: 3.6em;
      text-align: justify;
      padding-right: 1.2em;
      padding-bottom: 1.2em;
      max-width: 500px;
    }
    .cablesCssUi .tooltip .code {
      background-color: transparent;
    }
    .cablesCssUi .tooltip .tooltip_port {
      color: black;
      margin-right: 10px;
    }
    .cablesCssUi .tooltip .tooltip_value {
      margin-left: 10px;
      font-family: SourceCodePro, monospace;
      background-color: black;
    }
    .cablesCssUi .tooltip .tooltip_objtype {
      background-color: #444;
      margin-right: 10px;
    }
    .cablesCssUi .tooltip .tooltip_port,
    .cablesCssUi .tooltip .tooltip_value,
    .cablesCssUi .tooltip .tooltip_objtype {
      border-radius: 3px;
      padding: 2px;
      padding-left: 5px;
      padding-right: 5px;
      text-transform: capitalize;
    }
    .cablesCssUi .key,
    .cablesCssUi .infoareaContent code,
    .cablesCssUi .shortcut code {
      margin-right: 3px;
      text-transform: uppercase;
      border-radius: 3px;
      border-bottom: 4px solid var(--color-06);
      padding: 0px;
      padding-left: 5px;
      padding-right: 5px;
      border: 1px solid var(--color-05);
      background-color: var(--color-04);
      font-size: 14px;
      font-family: monospace;
    }

    .meta_content *,
    .meta_content div,
    .params_op_head,
    pre {
      pointer-events: all !important;
      user-select: initial !important;
      -webkit-user-select: initialm !important;
    }

    #meta {
      position: absolute;
      overflow: hidden;
      background-color: var(--color-02);
    }
    #meta_content {
      overflow: auto;
      padding: 10px;
    }

    #doc_op {
      padding: 10px;
      padding-top: 0px;
      overflow: auto;
      /* enable text selection */
    }
    #doc_op * {
      -webkit-user-select: text;
      -khtml-user-select: text;
      -moz-user-select: text;
      -o-user-select: text;
      user-select: text;
    }
    #doc_op li {
      padding-left: 0px;
    }
    #doc_op ul {
      padding-left: 20px;
    }
    #doc_op a {
      text-decoration: underline;
    }
    #doc_op .button {
      text-decoration: none;
    }

    #preview_img_container {
      user-select: none !important;
    }
    #preview_img_container canvas {
      user-select: none !important;
      background-position: left bottom;
    }

    .bgPatternDark,
    img.dark {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAACACAMAAADkrB1gAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzNDFDMzY4NjU5QzExRTdBREE2QTdCMDFEMTc1MzEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzNDFDMzY5NjU5QzExRTdBREE2QTdCMDFEMTc1MzEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDE1OEY0N0Y2NTlDMTFFN0FEQTZBN0IwMUQxNzUzMTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE1OEY0ODA2NTlDMTFFN0FEQTZBN0IwMUQxNzUzMTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7tdDZ3AAAABlBMVEUzMzMAAAAjllnVAAAAY0lEQVR42uzVIQ4AQAgDwfL/T5/BEPQFMzjUJDWb6kvf7z9AIHCBpgUC70FTAoF6CAQC9RAI1EMgEKiHQKAeAoFAPQQC9RAIBOohEKiHQCBQD4FAPQQCgXoIBOohEAgc/xNgAGbZHAEWJgt2AAAAAElFTkSuQmCC);
      background-repeat: repeat;
    }

    .bgPatternBright {
      background-repeat: repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAACACAMAAADkrB1gAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzNDFDMzZDNjU5QzExRTdBREE2QTdCMDFEMTc1MzEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzNDFDMzZENjU5QzExRTdBREE2QTdCMDFEMTc1MzEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDM0MUMzNkE2NTlDMTFFN0FEQTZBN0IwMUQxNzUzMTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDM0MUMzNkI2NTlDMTFFN0FEQTZBN0IwMUQxNzUzMTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6WVZM7AAAABlBMVEX////MzMw46qqDAAAAYklEQVR42uzVoQkAAAhFQd1/aYsgLqDlbD8dWF5EX/ZdbSAQONsrgcB/0GuBQD0EAoF6CATqIRAI1EMgUA+BQKAeAoF6CAQC9RAI1EMgEKiHQKAeAoFAPQQC9RAIBK5dAgwAZtkcARn2MKsAAAAASUVORK5CYII=);
    }

    .bgPatternBlack {
      background-color: black;
      background-image: none;
    }

    .bgPatternWhite {
      background-color: white;
      background-image: none;
    }

    .bgPatternBlue {
      background-color: blue;
      background-image: none;
    }

    .bgPatternRed {
      background-color: red;
      background-image: none;
    }

    .bgPatternGrey {
      background-color: rgb(128, 128, 128);
      background-image: none;
    }

    .doc-panel img {
      max-height: 256px;
      max-width: 100%;
    }

    #progresscontainer {
      background-color: var(--color-03);
      min-height: 20px;
      width: 100%;
    }
    #progresscontainer .progress {
      background-color: var(--color-05);
      height: 20px;
      min-width: 0px;
    }

    #meta_content .table {
      max-width: 400px;
    }

    .table {
      border: 0;
      padding: 0;
      border-spacing: 0px;
      margin-bottom: 20px;
      width: 100%;
    }
    .table th {
      background-color: var(--color-01);
      text-align: left;
    }
    .table tr:hover,
    .table tr td:hover {
      background-color: var(--color-05);
      color: #fff;
    }
    .table td,
    .table th {
      padding-top: 3px !important;
      padding-bottom: 3px;
      padding-left: 5px;
      padding-right: 5px;
    }

    #keypresenter {
      position: absolute;
      left: 90px;
      bottom: 20px;
      width: 500px;
      height: 170px;
      z-index: 51;
      pointer-events: none;
    }
    #keypresenter .kp-line {
      margin: 0;
      padding: 0;
      opacity: 0;
      animation: fadeOut 4s linear;
    }
    #keypresenter .kp-ele {
      background-color: black;
      border-radius: 8px;
      margin: 2px;
      padding: 10px;
      padding-left: 15px;
      padding-right: 15px;
      font-size: 20px;
      pointer-events: none;
      display: inline-block;
    }
    #keypresenter .kp-ele .icon {
      mask-size: 100%;
      mask-repeat: no-repeat;
      mask-position: center center;
      display: inline-block;
      background-color: white;
      min-width: 20px;
      min-height: 20px;
    }
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    .cables_contextmenu {
      z-index: 50;
      border: 1px solid #444;
      background-color: #000;
      position: absolute;
      padding: 0px !important;
    }
    .cables_contextmenu .cm_item {
      padding: 6px;
      padding-left: 10px;
      padding-right: 10px;
      cursor: pointer;
      list-style-type: none;
    }
    .cables_contextmenu .cm_item:hover {
      background-color: #444;
      color: #fff;
    }
    .cables_contextmenu .cm_icon {
      margin-right: 7px;
      margin-top: 2px;
    }

    .cables_contextmenu_modal {
      position: absolute;
      background-color: red;
      opacity: 0;
      z-index: 49;
      width: 100vw;
      height: 100vh;
      top: 0px;
      left: 0px;
    }

    .cablesCssUi .numberinput-value {
      position: absolute;
      border: none;
      background-color: transparent !important;
      padding: 0px;
      width: 100%;
    }
    .cablesCssUi .numberinput-value:hover {
      background-color: transparent !important;
    }
    .cablesCssUi .numberinput,
    .cablesCssUi .numberinput-value {
      padding-left: 5px;
      padding-right: 5px;
      height: 18px;
      width: 140px;
      border-radius: 2px;
      font-family: monospace;
      font-size: var(--font-size-default);
    }
    .cablesCssUi .numberinput-value {
      overflow: hidden;
      color: var(--color-13);
      margin-left: -5px;
    }
    .cablesCssUi .numberinput {
      background-color: var(--color-05);
      color: var(--color-11);
      user-select: none;
      cursor: ew-resize;
    }
    .cablesCssUi .valueinputtype-string {
      cursor: pointer !important;
    }

    .cablesCssUi .treetable tr:nth-child(odd) td {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      padding-left: 5px;
      background-color: #262626;
    }
    .cablesCssUi .treetable tr:nth-child(even) td {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      padding-left: 5px;
      background-color: #1e1e1e;
    }
    .cablesCssUi .treetable .treebutton {
      background-color: var(--color-04);
      border-radius: 4px;
      padding: 1 px;
      padding-left: 8px;
      padding-right: 8px;
    }
    .cablesCssUi .treetable .treebutton:hover {
      color: var(--color-special);
    }
    .cablesCssUi .treetable .treebutton.object {
      background-color: var(--color_port_object);
      color: black;
    }
    .cablesCssUi .treetable .treebutton.string {
      background-color: var(--color_port_string);
      color: black;
    }
    .cablesCssUi .treetable .treebutton.number {
      background-color: var(--color_port_number);
      color: black;
    }
    .cablesCssUi .treetable .treebutton.array {
      background-color: var(--color_port_array);
      color: black;
    }
    .cablesCssUi .treetable .node-hidden {
      opacity: 0.25;
    }
    .cablesCssUi .treetable td {
      white-space: nowrap;
      vertical-align: top;
    }
    .cablesCssUi .treetable .ident {
      width: 7px;
      background-size: contain;
    }
    .cablesCssUi .treetable .identBgLevel0 {
      background-size: contain;
    }
    .cablesCssUi .treetable .identBg {
      background-size: contain;
    }
    .cablesCssUi .treetable tr.active td {
      background-color: var(--color-05);
    }
    .cablesCssUi .treetable tr.active td a {
      color: var(--color-special);
    }

    .cablesCssUi #metatabpanel .tabs,
    .cablesCssUi #metatabpanel .tabpanel {
      height: 0px !important;
      max-height: 30px !important;
      overflow: hidden;
    }
    .cablesCssUi #opparams .button-small {
      margin-top: 0px !important;
    }
    .cablesCssUi .optitle {
      font-size: 23px;
    }
    .cablesCssUi .optitle .editbutton {
      opacity: 0;
    }
    .cablesCssUi .optitle:hover .editbutton {
      opacity: 1;
    }
    .cablesCssUi .reset_hidden {
      pointer-events: none;
      opacity: 0 !important;
    }
    .cablesCssUi .param_reset {
      opacity: 0;
      cursor: pointer;
      vertical-align: middle;
      opacity: 0.5;
    }
    .cablesCssUi .param_reset:hover {
      opacity: 1 !important;
    }
    .cablesCssUi .panel_head {
      background-color: var(--color-01);
      padding-bottom: 15px;
    }
    .cablesCssUi #options_meta .warning,
    .cablesCssUi #options_meta .warning-experimental,
    .cablesCssUi #options_meta .warning-error {
      margin-top: 10px;
      border: 3px solid;
      padding: 2px;
    }
    .cablesCssUi #options_meta .warning a,
    .cablesCssUi #options_meta .warning-experimental a,
    .cablesCssUi #options_meta .warning-error a {
      text-decoration: underline;
    }
    .cablesCssUi #options_meta .hint {
      padding: 10px;
      background-color: transparent;
      border: 1px solid;
      display: none;
    }
    .cablesCssUi #options_meta .warning,
    .cablesCssUi #options_meta .warning-experimental,
    .cablesCssUi #options_meta .warning a,
    .cablesCssUi #options_meta .warning-experimental a {
      border-color: var(--color-warning);
      font-size: var(--font-size-bigger);
    }
    .cablesCssUi #options_meta .warning-error p {
      margin: 0px;
    }
    .cablesCssUi #options_meta .warning-error,
    .cablesCssUi #options_meta .warning-error {
      margin-top: 10px;
      text-align: left;
      border-color: transparent;
      font-size: var(--font-size-bigger);
      border-radius: 5px;
      margin-bottom: 3px;
    }
    .cablesCssUi #options_meta .hint {
      background-color: var(--color-03);
    }
    .cablesCssUi .params .op-contextmenu {
      position: absolute;
      top: 9px;
      right: 10px;
    }
    .cablesCssUi .params .toggle-bookmark-button {
      position: absolute;
      top: 9px;
      right: 34px;
    }
    .cablesCssUi .params .icon-link {
      position: relative;
      top: 4px;
    }
    .cablesCssUi .params .params_op_head #opname {
      width: 77%;
      background-color: transparent;
      margin-bottom: 0;
    }
    .cablesCssUi .params .params_op_head #opname:hover {
      background-color: var(--color-06);
    }
    .cablesCssUi .params .params_op_head .summary {
      font-size: var(--font-size-bigger);
      padding: 2px;
      margin: 10px 0;
    }
    .cablesCssUi .params .params_op_head input {
      margin-bottom: 5px;
      padding-bottom: 3px;
    }
    .cablesCssUi .warning-error-level1 {
      background: var(--color-bg-warning);
      color: white;
    }
    .cablesCssUi .warning-error-level2 {
      background: var(--color-bg-error) !important;
      color: white;
    }
    .cablesCssUi .warning-error-level0,
    .cablesCssUi .warning-error-level3 {
      background: var(--color-bg-hint);
    }
    .cablesCssUi .paramsPortTitleClickable {
      cursor: pointer;
      user-select: none;
    }
    .cablesCssUi .paramsPortTitleClickable:hover {
      background-color: #444;
    }
    .cablesCssUi .paramsPortLink {
      text-decoration: underline;
      margin-right: 5px;
      cursor: pointer;
    }
    .cablesCssUi .paramsPortLink:hover {
      color: var(--color-13);
    }
    .cablesCssUi .panel {
      overflow: auto;
      padding: 10px;
    }
    .cablesCssUi .panel .colorbutton {
      width: 20px;
      height: 20px;
      display: block;
      border: 3px solid var(--color-01);
      color: var(--color-01);
      float: left;
      display: block;
    }
    .cablesCssUi .panel hr {
      background-color: var(--color-05);
      margin-top: 10px;
      margin-bottom: 10px;
      height: 2px;
    }
    .cablesCssUi .panel .invalid {
      border: 1px solid var(--color-error);
      background-color: var(--color-error) !important;
    }
    .cablesCssUi .panel .nonDefaultValue {
      color: var(--color-13);
    }
    .cablesCssUi .panel .icon {
      background-color: var(--color-10);
    }
    .cablesCssUi .panel .numberinput-display {
      display: inline-block;
      width: 95%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cablesCssUi .panel tr.greyedout {
      opacity: 0.3 !important;
      pointer-events: none;
    }
    .cablesCssUi .panel tr.greyedout .numberinput-display {
      color: transparent;
    }
    .cablesCssUi .panel .hide {
      display: none;
    }
    .cablesCssUi .panel td.port {
      padding-left: 5px;
      text-transform: capitalize;
      align: top;
      text-overflow: ellipsis;
      max-width: 135px;
      overflow: hidden;
      vertical-align: top;
    }
    .cablesCssUi .panel td.port i {
      text-transform: none;
    }
    .cablesCssUi .panel td.portType_0 {
      box-shadow: inset 6px 0 0 -1px var(--color_link_value) !important;
    }
    .cablesCssUi .panel td.portType_1 {
      box-shadow: inset 6px 0 0 -1px var(--color_link_function) !important;
    }
    .cablesCssUi .panel td.portType_2 {
      box-shadow: inset 6px 0 0 -1px var(--color_link_object) !important;
    }
    .cablesCssUi .panel td.portType_3 {
      box-shadow: inset 6px 0 0 -1px var(--color_link_array) !important;
    }
    .cablesCssUi .panel td.portType_4 {
      box-shadow: inset 6px 0 0 -1px var(--color_port_dynamic) !important;
    }
    .cablesCssUi .panel td.portType_5 {
      box-shadow: inset 6px 0 0 -1px var(--color_link_string) !important;
    }
    .cablesCssUi .panel td.portType_0_linked {
      box-shadow: inset 12px 0 0 -1px var(--color_link_value) !important;
    }
    .cablesCssUi .panel td.portType_1_linked {
      box-shadow: inset 12px 0 0 -1px var(--color_link_function) !important;
    }
    .cablesCssUi .panel td.portType_2_linked {
      box-shadow: inset 12px 0 0 -1px var(--color_link_object) !important;
    }
    .cablesCssUi .panel td.portType_3_linked {
      box-shadow: inset 12px 0 0 -1px var(--color_link_array) !important;
    }
    .cablesCssUi .panel td.portType_4_linked {
      box-shadow: inset 12px 0 0 -1px var(--color_port_dynamic) !important;
    }
    .cablesCssUi .panel td.portType_5_linked {
      box-shadow: inset 12px 0 0 -1px var(--color_link_string) !important;
    }
    .cablesCssUi .panel td.disp_switch {
      box-shadow: inset 6px 0 0 -1px var(--color_link_value) !important;
    }
    .cablesCssUi .panel td.disp_multiport {
      box-shadow: inset 6px 0 0 -1px transparent !important;
    }
    .cablesCssUi .panel textarea {
      background-color: var(--color-05);
      border: 1px solid var(--color-03);
      width: 95% !important;
    }
    .cablesCssUi .panel textarea,
    .cablesCssUi .panel input {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
    }
    .cablesCssUi .panel input.value,
    .cablesCssUi .panel .linkedValue {
      background-color: var(--color-05);
      float: left;
      font-family: SourceCodePro, monospace;
      font-size: var(--font-size-default);
      -moz-appearance: textfield;
    }
    .cablesCssUi .panel input.value:focus,
    .cablesCssUi .panel .linkedValue:focus {
      background-color: var(--color-06);
    }
    .cablesCssUi .panel input.value::-webkit-outer-spin-button,
    .cablesCssUi .panel input.value::-webkit-inner-spin-button,
    .cablesCssUi .panel .linkedValue::-webkit-outer-spin-button,
    .cablesCssUi .panel .linkedValue::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    .cablesCssUi .panel .linkedValue {
      background-color: var(--color-01);
      margin-top: 4px;
    }
    .cablesCssUi .panel .ccheckbox {
      cursor: pointer;
    }
    .cablesCssUi .panel .checkbox-active,
    .cablesCssUi .panel .checkbox-inactive {
      border-radius: 4px;
      display: block;
      width: 20px;
      height: 20px;
    }
    .cablesCssUi .panel .checkbox-active .icon,
    .cablesCssUi .panel .checkbox-inactive .icon {
      background-color: white;
      margin-top: 1px;
      width: 16px;
      height: 16px;
    }
    .cablesCssUi .panel .checkbox-active {
      background-color: var(--color-07);
      width: 20px;
      height: 20px;
    }
    .cablesCssUi .panel .checkbox-inactive {
      border-radius: 4px;
      background-color: var(--color-05);
    }
    .cablesCssUi .panel .checkbox-inactive .icon {
      opacity: 0;
    }
    .cablesCssUi .panel .value {
      width: 120px;
      display: block;
      padding-top: 2px !important;
      padding-bottom: 2px !important;
      padding-left: 7px !important;
    }
    .cablesCssUi .panel .objType {
      border-radius: 4px;
      background-color: var(--color-04) !important;
      padding: 2px;
      font-size: 12px;
      padding-left: 4px;
      padding-right: 4px;
      font-style: italic;
    }
    .cablesCssUi .panel table {
      width: 100%;
      border-spacing: 0px;
      border-collapse: separate;
    }
    .cablesCssUi .panel table th {
      font-weight: bold;
      text-align: left;
      padding: 5px;
      padding-left: 10px;
      padding-top: 20px;
      padding-bottom: 10px;
      font-size: 14px;
      color: var(--color-13);
    }
    .cablesCssUi .panel table td {
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 3px;
    }
    .cablesCssUi select {
      border: 1px solid var(--color-02);
      background-color: var(--color-05);
      padding: 2px;
      border: 1px solid transparent;
    }
    .cablesCssUi .contextmenuarea {
      min-width: 15px;
      text-align: right;
    }
    .cablesCssUi #options {
      position: absolute;
      overflow: auto;
      overflow-x: hidden;
      background-color: var(--color-02);
    }
    .cablesCssUi #options td {
      vertical-align: top;
    }
    .cablesCssUi #options.readonly .panel {
      opacity: 0.6;
      pointer-events: none !important;
      user-select: none !important;
    }
    .cablesCssUi #options.readonly .panel input {
      pointer-events: none !important;
      user-select: none !important;
    }
    .cablesCssUi .valueDragger {
      margin-left: -1px;
      height: 17px;
      background-color: var(--color-04);
      padding-left: 5px;
      margin-top: 1px;
      padding-right: 6px;
      padding-top: 5px;
    }
    .cablesCssUi #options td,
    .cablesCssUi #meta td {
      padding-top: 4px;
    }
    .cablesCssUi #options td,
    .cablesCssUi #meta td,
    .cablesCssUi #options input {
      line-height: 18px !important;
      border-bottom: 1px solid var(--color-02);
    }
    .cablesCssUi #options input[type="text"] {
      padding: 0px;
      padding-left: 5px;
    }
    .cablesCssUi #options input:hover {
      background-color: var(--color-05);
    }
    .cablesCssUi #options input[type="range"] {
      background-color: var(--color-05);
      --slider-height: 18px;
      height: var(--slider-height);
      border-radius: 0;
      margin: 0;
    }
    .cablesCssUi #options input[type="range"]::-moz-range-track {
      background-color: transparent;
      border: none;
      height: var(--slider-height);
    }
    .cablesCssUi #options input[type="range"]::-moz-range-thumb {
      border: none;
      border-radius: 0;
      background-color: var(--color-09);
      height: var(--slider-height);
      width: var(--slider-height);
    }
    .cablesCssUi #options .axisX:after {
      color: rgb(255, 0, 0);
      content: "•";
      font-weight: bold;
    }
    .cablesCssUi #options .axisY:after {
      color: rgb(0, 255, 0);
      content: "•";
      font-weight: bold;
    }
    .cablesCssUi #options .axisZ:after {
      color: rgb(0, 0, 255);
      content: "•";
      font-weight: bold;
    }
    .cablesCssUi td.head {
      background-color: var(--color-01);
    }
    .cablesCssUi .groupSpacer,
    .cablesCssUi .groupSpacer h3 {
      color: var(--color-13);
      margin-top: 0px;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
    .cablesCssUi .groupSpacer {
      user-select: none;
      font-size: 15px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) calc(50% - 0px),
        var(--color-04) 50%,
        rgba(0, 0, 0, 0) calc(50% + 2px)
      );
      text-shadow:
        -6px 0px 1px var(--color-02),
        -5px 0px 1px var(--color-02),
        -4px 0px 1px var(--color-02),
        -3px 0px 1px var(--color-02),
        -2px 0px 1px var(--color-02),
        -1px 0px 1px var(--color-02),
        6px 0px 1px var(--color-02),
        5px 0px 1px var(--color-02),
        4px 0px 1px var(--color-02),
        3px 0px 1px var(--color-02),
        2px 0px 1px var(--color-02),
        1px 0px 1px var(--color-02);
      padding-left: 14px;
      margin-top: 10px;
      margin-bottom: 8px;
      line-height: 20px;
      min-height: 10px;
    }
    .cablesCssUi .groupSpacer .icon-chevron-down,
    .cablesCssUi .groupSpacer .icon-chevron-up {
      vertical-align: middle;
      margin-right: 5px;
    }
    .cablesCssUi .port2previewbutton {
      padding: 5px 10px;
    }
    .cablesCssUi .port2previewbutton::before {
      margin: 0px !important;
    }
    .cablesCssUi .radioToggle {
      border-radius: 4px;
      display: inherit;
      background-color: var(--color-05);
    }
    .cablesCssUi .radioToggle label {
      float: left;
      border-right: 1px solid var(--color-02);
      cursor: pointer;
      user-select: none;
    }
    .cablesCssUi .radioToggle label:last-child {
      border: 0;
    }
    .cablesCssUi .radioToggle label span {
      padding: 3px;
      padding-top: 2px;
      padding-left: 6px;
      padding-right: 6px;
      text-align: center;
      display: block;
      border-radius: 0px;
    }
    .cablesCssUi .radioToggle label input {
      display: none;
    }
    .cablesCssUi .radioToggle input:checked + span {
      color: var(--color-13);
      background-color: var(--color-07);
    }
    .cablesCssUi .radioToggle label:last-child span {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .cablesCssUi .radioToggle label:first-child span {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    .cablesCssUi .panel.patch_summary {
      padding: 0;
      height: 100%;
    }
    .cablesCssUi .panel.patch_summary .iframe {
      width: 100%;
      height: 320px;
      border: none;
      overflow-x: hidden;
    }
    .cablesCssUi .subpatchlist div {
      padding: 3px;
    }
    .cablesCssUi .subpatchlist .lostsubpatch {
      background-color: var(--color-bg-error) !important;
      color: white !important;
    }

    .projectsearch {
      height: auto;
      width: 830px;
    }
    .projectsearch .icon {
      background-color: var(--color-10);
    }
    .projectsearch .projectsearchresults {
      height: 600px;
      overflow: auto;
      background-color: var(--color-03);
      padding: 20px;
    }
    .projectsearch .projectsearchresults .thumbcont .title {
      background-color: #222;
      padding: 10px;
    }
    .projectsearch .projectsearchresults .searchresult {
      width: 180px;
      height: 130px;
      float: left;
      cursor: pointer;
      margin: 7px;
      margin-bottom: 15px;
      text-align: center;
    }
    .projectsearch .projectsearchresults .thumbcont {
      border: none !important;
    }
    .projectsearch .projectsearchresults .searchresult img {
      max-width: 180px;
      max-height: 100px;
    }

    .paco-iframe {
      z-index: 99999999;
      position: absolute;
      border: 2px solid red;
    }

    .transformSpot {
      border: 2px solid var(--color-special);
      background: rgba(255, 255, 255, 0.3);
      border-radius: 100%;
      width: 12px;
      height: 12px;
      position: absolute;
      margin-left: -10px;
      margin-top: -10px;
      z-index: 11111;
      cursor: pointer;
    }

    .transformSpot:hover {
      background-color: white;
    }

    .gizmoline {
      z-index: 30;
      position: absolute;
      pointer-events: none;
    }

    .gizmo {
      position: absolute;
      z-index: 30;
      border-radius: 100%;
      width: 12px;
      height: 12px;
      margin-left: -6px;
      margin-top: -6px;
      cursor: pointer;
    }
    .gizmo:hover {
      border: 1px solid white;
    }

    #canvasicons {
      user-select: none;
      color: var(--color-13);
      position: absolute;
      overflow: hidden;
      z-index: 0;
      background-color: var(--color-01);
      display: inline-block;
    }
    #canvasicons #canvasIconBar {
      white-space: nowrap;
      padding-right: 5px;
      overflow: hidden;
    }
    #canvasicons .threedotcanvas {
      position: absolute;
      right: 3px;
      background-color: var(--color-01);
      border-radius: 3px !important;
    }
    #canvasicons .threedotcanvas:hover {
      background-color: var(--color-04);
    }
    #canvasicons a {
      margin-right: 10px;
      position: relative;
      top: -5px;
    }
    #canvasicons .icon-resize-window {
      position: absolute;
      width: 10px;
      height: 10px;
      top: 12px;
      left: 3px;
      display: block;
      opacity: 0.4;
      cursor: nesw-resize;
    }
    #canvasicons .cbl_iconbar {
      background-color: transparent !important;
      margin-left: 25px;
    }
    #canvasicons .canvasInfo span,
    #canvasicons .cbl_iconbar span {
      vertical-align: middle;
      font-family: monospace;
    }
    #canvasmodal {
      pointer-events: none;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background-color: #000;
      opacity: 0.3;
      z-index: 0;
    }

    #cablescanvas {
      z-index: 0;
      overflow: hidden;
      position: absolute;
    }

    #glcanvas {
      position: absolute;
      top: 0px;
      z-index: 0;
    }
    #glcanvas.maximized:focus {
      border-bottom: none;
    }

    #canvasflash {
      pointer-events: none;
      position: absolute;
      z-index: 99999;
    }

    .flash {
      animation: flashAnim 0.3s infinite ease-out;
      animation-iteration-count: 1;
    }

    @keyframes flashAnim {
      0% {
        background-color: var(--color-13);
      }
      10% {
        background-color: var(--color-13);
      }
      100% {
        background-color: transparent;
      }
    }
    #inspectHtmlOverlay {
      box-sizing: border-box;
      background-color: var(--color-special);
      opacity: 0.5;
      position: absolute;
      z-index: 99999;
      border: 2px solid black;
      display: inline-block;
    }

    .gluiPreviewLayer {
      position: absolute;
      left: 0;
      pointer-events: none;
    }

    #canvasInfoOverlay {
      background-color: var(--color-04);
      font-family: monospace;
      z-index: 9999;
      position: absolute;
      padding: 20px;
      transform: translate(-50%);
    }

    /*
 * GENERAL STYLES
 */
    /*
  * PORT COLORS - BACKGROUND COLOR
  */
    .bg-color-port-function {
      background-color: var(--color_port_function);
    }

    .bg-color-port-value {
      background-color: var(--color_port_value);
    }

    .bg-color-port-object {
      background-color: var(--color_port_object);
    }

    .bg-color-port-array {
      background-color: var(--color_port_array);
    }

    .bg-color-port-dynamic {
      background-color: var(--color_port_dynamic);
    }

    /*
  * PORT COLORS - COLOR
  */
    .color-port-function {
      color: var(--color_port_function);
    }

    .color-port-value {
      color: var(--color_port_value);
    }

    .color-port-object {
      color: var(--color_port_object);
    }

    .color-port-array {
      color: var(--color_port_array);
    }

    .color-port-dynamic {
      color: var(--color_port_dynamic);
    }

    /*
 * OP DOC SPECIFIC
 */
    .op-doc {
      /* Rules for markdown formatted elements in description and port description */
    }
    .op-doc .op-doc__port-bullet {
      display: inline-block;
      width: 11px;
      height: 11px;
    }
    .op-doc .op-doc__port-list {
      list-style: none;
      padding: 0;
    }
    .op-doc .op-doc__headline {
      font-size: 16px;
      margin-top: 30px;
      margin-bottom: 13px;
      font-weight: bold;
      color: var(--color-11);
    }
    .op-doc .op-doc__namespace {
      margin-top: 4px;
      color: var(--color-07);
    }
    .op-doc .op-doc__name {
      margin-top: 0;
      display: none; /* only show in meta-tab */
    }
    .op-doc .op-doc__summary {
      margin-bottom: 15px;
    }
    .op-doc .op-doc__summary,
    .op-doc .op-doc__summary p {
      color: var(--color-11);
      font-style: italic;
      font-size: 18px;
      line-height: 1.2em;
      margin-top: 15px;
    }
    .op-doc .op-doc__summary::first-letter,
    .op-doc .op-doc__summary p::first-letter {
      text-transform: capitalize;
    }
    .op-doc .op-doc__summary p,
    .op-doc .op-doc__summary p p {
      margin-bottom: 0px;
    }
    .op-doc .op-doc__summary p::first-letter,
    .op-doc .op-doc__summary p p::first-letter {
      text-transform: capitalize;
    }
    .op-doc .op-doc__summary code,
    .op-doc .op-doc__summary pre,
    .op-doc .op-doc__summary p code,
    .op-doc .op-doc__summary p pre {
      color: white;
      font-family: SourceCodePro, monospace;
    }
    .op-doc .op-doc__screenshot {
      margin-bottom: 0;
      margin-top: 11px;
      max-width: 100%;
      max-height: 200px;
    }
    .op-doc .op-doc__screenshot + .op-doc__description {
      margin-top: 32px;
    }
    .op-doc .op-doc__description p:last-child {
      margin-bottom: 0;
    }
    .op-doc .op-doc__description p:first-child {
      margin-top: 6px;
    }
    .op-doc .op-doc__port + .op-doc__port {
      margin-top: 10px;
    }
    .op-doc .op-doc__port-name {
      color: var(--color-11);
      text-transform: capitalize;
      font-size: 13px;
      margin-left: 4px;
      font-weight: bold;
    }
    .op-doc .op-doc__port-doc {
      margin-top: 5px;
      padding-left: 17px;
    }
    .op-doc .op-doc__port-doc p:first-child {
      margin-top: 0;
    }
    .op-doc .op-doc__port-doc p:last-child {
      margin-bottom: 0;
    }
    .op-doc .op-doc__port-doc p::first-letter,
    .op-doc .op-doc__description p::first-letter {
      text-transform: capitalize;
    }
    .op-doc .op-doc__port-doc a,
    .op-doc .op-doc__description a {
      text-decoration: underline;
      text-decoration-color: var(--color-06);
    }
    .op-doc .op-doc__port-doc a:hover,
    .op-doc .op-doc__description a:hover {
      color: var(--color-special);
      text-decoration-color: var(--color-special);
    }
    .op-doc .op-doc__port-doc code,
    .op-doc .op-doc__port-doc pre,
    .op-doc .op-doc__description code,
    .op-doc .op-doc__description pre {
      font-family: SourceCodePro, monospace;
      font-size: 11px;
      background-color: var(--color-04);
      padding: 1px 2px;
    }

    /* special rules for the docs in the meta-tab */
    #meta_content_doc .op-doc .op-doc__name {
      display: block;
      color: var(--color-13);
      font-size: 18px;
    }
    #meta_content_doc .op-doc .op-doc__namespace {
      display: none;
    }

    /*
* iziToast | v1.1.4
* http://izitoast.marcelodolce.com
* by Marcelo Dolce.
*/
    .iziToast-capsule {
      font-size: 0;
      height: 0;
      max-height: 1000px;
      width: 100%;
      transform: translateZ(0);
      backface-visibility: hidden;
      transition:
        transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1),
        height 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
      z-index: 50;
    }

    .iziToast {
      display: inline-block;
      clear: both;
      position: relative;
      font-family: "Lato", arial;
      font-size: 14px;
      padding: 8px 42px 9px 0;
      background: rgba(238, 238, 238, 0.9);
      border-color: rgba(238, 238, 238, 0.9);
      width: 100%;
      pointer-events: all;
      cursor: default;
      transform: translateX(0);
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .iziToast > .iziToast-progressbar {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 1;
      background: rgba(255, 255, 255, 0.2);
    }

    .iziToast > .iziToast-progressbar > div {
      height: 2px;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 0 0 3px 3px;
    }

    .iziToast.iziToast-balloon:before {
      content: "";
      position: absolute;
      right: 8px;
      left: auto;
      width: 0px;
      height: 0px;
      top: 100%;
      border-right: 0px solid transparent;
      border-left: 15px solid transparent;
      border-top: 10px solid #000;
      border-top-color: inherit;
      border-radius: 0;
    }

    .iziToast.iziToast-balloon .iziToast-progressbar {
      top: 0;
      bottom: auto;
    }

    .iziToast.iziToast-balloon > div {
      border-radius: 0 0 0 3px;
    }

    .iziToast > .iziToast-cover {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      margin: 0;
      background-size: 100%;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-color: rgba(0, 0, 0, 0.1);
    }

    .iziToast > .iziToast-close {
      position: absolute;
      right: 0;
      top: 0;
      border: 0;
      padding: 0;
      opacity: 0.6;
      width: 42px;
      height: 100%;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAJPAAACTwBcGfW0QAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAD3SURBVFiF1ZdtDoMgDEBfdi4PwAX8vLFn0qT7wxantojKupmQmCi8R4tSACpgjC2ICCUbEBa8ingjsU1AXRBeR8aLN64FiknswN8CYefBBDQ3whuFESy7WyQMeC0ipEI0A+0FeBvHUFN8xPaUhAH/iKoWsnXHGegy4J0yxialOfaHJAz4bhRzQzgDvdGnz4GbAonZbCQMuBm1K/kcFu8Mp1N2cFFpsxsMuJqqbIGExGl4loARajU1twskJLLhIsID7+tvUoDnIjTg5T9DPH9EBrz8rxjPzciAl9+O8SxI8CzJ8CxKFfh3ynK8Dyb8wNHM/XDqejx/AtNyPO87tNybAAAAAElFTkSuQmCC")
        no-repeat 50% 50%;
      background-size: 8px;
      cursor: pointer;
      outline: none;
    }

    .iziToast > .iziToast-close:hover {
      opacity: 1;
    }

    .iziToast > .iziToast-body {
      position: relative;
      padding: 0 0 0 10px;
      min-height: 36px;
      margin: 0 0 0 15px;
    }

    .iziToast > .iziToast-body::after {
      content: "";
      display: table;
      clear: both;
    }

    .iziToast > .iziToast-body > .iziToast-buttons {
      min-height: 17px;
      display: inline-block;
      margin: 0 -2px;
    }

    .iziToast > .iziToast-body > .iziToast-buttons > button,
    .iziToast > .iziToast-body > .iziToast-buttons > a {
      display: inline-block;
      margin: 6px 2px;
      border-radius: 2px;
      border: 0;
      padding: 5px 10px;
      font-size: 12px;
      letter-spacing: 0.02em;
      cursor: pointer;
      background: rgba(0, 0, 0, 0.1);
      color: #000;
    }

    .iziToast > .iziToast-body > .iziToast-buttons > button:hover,
    .iziToast > .iziToast-body > .iziToast-buttons > a:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    .iziToast > .iziToast-body > .iziToast-icon {
      height: 100%;
      position: absolute;
      left: 0;
      top: 50%;
      display: table;
      font-size: 23px;
      line-height: 24px;
      margin-top: -12px;
      color: #000;
    }

    .iziToast > .iziToast-body > .iziToast-icon.ico-info {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAflBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCtoPsAAAAKXRSTlMA6PsIvDob+OapavVhWRYPrIry2MxGQ97czsOzpJaMcE0qJQOwVtKjfxCVFeIAAAI3SURBVFjDlJPZsoIwEETnCiGyb8q+qmjl/3/wFmGKwjBROS9QWbtnOqDDGPq4MdMkSc0m7gcDDhF4NRdv8NoL4EcMpzoJglPl/KTDz4WW3IdvXEvxkfIKn7BMZb1bFK4yZFqghZ03jk0nG8N5NBwzx9xU5cxAg8fXi20/hDdC316lcA8o7t16eRuQvW1XGd2d2P8QSHQDDbdIII/9CR3lUF+lbucfJy4WfMS64EJPORnrZxtfc2pjJdnbuags3l04TTtJMXrdTph4Pyg4XAjugAJqMDf5Rf+oXx2/qi4u6nipakIi7CsgiuMSEF9IGKg8heQJKkxIfFSUU/egWSwNrS1fPDtLfon8sZOcYUQml1Qv9a3kfwsEUyJEMgFBKzdV8o3Iw9yAjg1jdLQCV4qbd3no8yD2GugaC3oMbF0NYHCpJYSDhNI5N2DAWB4F4z9Aj/04Cna/x7eVAQ17vRjQZPh+G/kddYv0h49yY4NWNDWMMOMUIRYvlTECmrN8pUAjo5RCMn8KoPmbJ/+Appgnk//Sy90GYBCGgm7IAskQ7D9hFKW4ApB1ei3FSYD9PjGAKygAV+ARFYBH5BsVgG9kkBSAQWKUFYBRZpkUgGVinRWAdUZQDABBQdIcAElDVBUAUUXWHQBZx1gMAGMprM0AsLbVXHsA5trZe93/wp3svQ0YNb/jWV3AIOLsMtlznSNOH7JqjOpDVh7z8qCZR10ftvO4nxeOvPLkpSuvfXnxzKtvXr7j+v8C5ii0e71At7cAAAAASUVORK5CYII=")
        no-repeat 50% 50%;
      background-size: 85%;
      width: 24px;
      height: 24px;
    }

    .iziToast > .iziToast-body > .iziToast-icon.ico-warning {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAkFBMVEUAAAAAAAABAAIAAAABAAIAAAMAAAABAAIBAAIBAAIAAAIAAAABAAIAAAABAAICAAICAAIAAAIAAAAAAAAAAAABAAIBAAIAAAMAAAABAAIBAAMBAAECAAIAAAIAAAIAAAABAAIBAAIBAAMBAAIBAAEAAAIAAAMAAAAAAAABAAECAAICAAIAAAIAAAMAAAQAAAE05yNAAAAAL3RSTlMAB+kD7V8Q+PXicwv7I9iYhkAzJxnx01IV5cmnk2xmHfzexsK4eEw5L7Gei39aRw640awAAAHQSURBVFjD7ZfJdoJAEEWJgCiI4oDiPM8m7///LidErRO7sHrY5u7YXLr7vKqu9kTC0HPmo9n8cJbEQOzqqAdAUHeUZACQuTkGDQBoDJwkHZR0XBz9FkpafXuHP0SJ09mGeJLZ5wwlTmcbA0THPmdEK7XPGTG1zxmInn3OiJ19zkB0jSVTKExMHT0wjAwlWzC0fSPHF1gWRpIhWMYm7fYTFcQGlbemf4dFfdTGg0B/KXM8qBU/3wntbq7rSGqvJ9kla6IpueFJet8fxfem5yhykjyOgNaWF1qSGd5JMNNxpNF7SZQaVh5JzLrTCZIEJ1GyEyVyd+pClMjdaSJK5O40giSRu5PfFiVyd1pAksjdKRnrSsbVdbiHrgT7yss315fkVQPLFQrL+4FHeOXKO5YRFEKv5AiFaMlKLlBpJuVCJlC5sJfvCgztru/3NmBYccPgGTxRAzxn1XGEMUf58pXZvjoOsOCgjL08+b53mtfAM/SVsZcjKLtysQZPqIy9HPP3m/3zKItRwT0LyQo8sTr26tcO83DIUMWIJjierHLsJda/tbNBFY0BP/bKtcM8HNIWCK3aYR4OMzgxo5w5EFLOLKDExXAm9gI4E3iAO94/Ct/lKWuM2LMGbgAAAABJRU5ErkJggg==")
        no-repeat 50% 50%;
      background-size: 85%;
      width: 24px;
      height: 24px;
    }

    .iziToast > .iziToast-body > .iziToast-icon.ico-error {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAeFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVyEiIAAAAJ3RSTlMA3BsB98QV8uSyWVUFz7+kcWMM2LuZioBpTUVBNcq2qaibj4d1azLZZYABAAACZElEQVRYw7WX25KCMAyGAxUoFDkpiohnV97/DXeGBtoOUprZ2dyo1K82fxKbwJJVp+KQZ7so2mX5oThVQLKwjDe9YZu4DF3ptAn6rxY0qQPOEq9fNC9ha3y77a22ba24v+9Xbe8v8x03dPOC2/NdvB6xeSreLfGJpnx0TyotKqLm2s7Jd/WO6ivXNp0tCy02R/aFz5VQ5wUPlUL5fIfj5KIlVGU0nWHm/5QtoTVMWY8mzIVu1K9O7XH2JiU/xnOOT39gnUfj+lFHddx4tFjL3/H8jjzaFCy2Rf0c/fdQyQszI8BDR973IyMSKa4krjxAiW/lkRvMP+bKK9WbYS1ASQg8dKjaUGlYPwRe/WoIkz8tiQchH5QAEMv6T0k8MD4mUyWr4E7jAWqZ+xWcMIYkXvlwggJ3IvFK+wIOcpXAo8n8P0COAaXyKH4OsjBuZB4ew0IGu+H1SebhNazsQBbWm8yj+hFuUJB5eMsN0IUXmYendAFFfJB5uEkRMYwxmcd6zDGRtmQePEykAgubymMRFmMxCSIPCRbTuFNN5OGORTjmNGc0Po0m8Uv0gcCry6xUhR2QeLii9tofbEfhz/qvNti+OfPqNm2Mq6105FUMvdT4GPmufMiV8PqBMkc+DdT1bjYYbjzU/ew23VP4n3mLAz4n8Jtv/Ui3ceTT2mzz5o1mZt0gnBpmsdjqRqVlmplcPdqa7X23kL9brdm2t/uBYDPn2+tyu48mtIGD10JTuUrukVrbCFiwDzcHrPjxKt7PW+AZQyT/WESO+1WL7f3o+WLHL2dYMSZsg6dg/z360ofvP4//v1NPzgs28WlWAAAAAElFTkSuQmCC")
        no-repeat 50% 50%;
      background-size: 80%;
      width: 24px;
      height: 24px;
    }

    .iziToast > .iziToast-body > .iziToast-icon.ico-check {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt0UjBAAAACnRSTlMApAPhIFn82wgGv8mVtwAAAKVJREFUSMft0LEJAkEARNFFFEw1NFJb8CKjAy1AEOzAxNw+bEEEg6nyFjbY4LOzcBwX7S/gwUxoTdIn+Jbv4Lv8bx446+kB6VsBtK0B+wbMCKxrwL33wOrVeeChX28n7KTOTjgoEu6DRSYAgAAAAkAmAIAAAAIACQIkMkACAAgAIACAyECBKAOJuCagTJwSUCaUAEMAABEBRwAAEQFLbCJgO4bW+AZKGnktR+jAFAAAAABJRU5ErkJggg==")
        no-repeat 50% 50%;
      background-size: 85%;
      width: 24px;
      height: 24px;
    }

    .iziToast > .iziToast-body > strong {
      padding: 0 10px 0 0;
      margin: 10px 0 -10px 0;
      line-height: 16px;
      font-size: 14px;
      text-align: left;
      float: left;
      color: #000;
    }

    .iziToast > .iziToast-body > p {
      padding: 0;
      margin: 10px 0;
      font-size: 14px;
      line-height: 16px;
      text-align: left;
      float: left;
      color: rgba(0, 0, 0, 0.6);
    }

    .iziToast.iziToast-animateInside p,
    .iziToast.iziToast-animateInside strong,
    .iziToast.iziToast-animateInside .iziToast-icon,
    .iziToast.iziToast-animateInside .iziToast-buttons * {
      opacity: 0;
    }

    .iziToast-target {
      position: relative;
      width: 100%;
      margin: 0 auto;
    }

    .iziToast-target .iziToast-capsule {
      overflow: hidden;
    }

    .iziToast-target .iziToast-capsule:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }

    .iziToast-target .iziToast-capsule .iziToast {
      width: 100%;
      float: left;
    }

    .iziToast-wrapper {
      z-index: 60;
      position: fixed;
      width: 100%;
      pointer-events: none;
      display: flex;
      flex-direction: column;
    }

    .iziToast-wrapper .iziToast.iziToast-balloon:before {
      border-right: 0 solid transparent;
      border-left: 15px solid transparent;
      border-top: 10px solid #000;
      border-top-color: inherit;
      right: 8px;
      left: auto;
    }

    .iziToast-wrapper-bottomLeft {
      left: 0;
      bottom: 0;
    }

    .iziToast-wrapper-bottomLeft .iziToast.iziToast-balloon:before {
      border-right: 15px solid transparent;
      border-left: 0 solid transparent;
      right: auto;
      left: 8px;
    }

    .iziToast-wrapper-bottomRight {
      right: 0;
      bottom: 0;
      text-align: right;
    }

    .iziToast-wrapper-topLeft {
      left: 0;
      top: 0;
    }

    .iziToast-wrapper-topLeft .iziToast.iziToast-balloon:before {
      border-right: 15px solid transparent;
      border-left: 0 solid transparent;
      right: auto;
      left: 8px;
    }

    .iziToast-wrapper-topRight {
      top: 0;
      right: 0;
      text-align: right;
    }

    .iziToast-wrapper-topCenter {
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
    }

    .iziToast-wrapper-bottomCenter {
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
    }

    .iziToast-wrapper-center {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      justify-content: center;
      flex-flow: column;
      align-items: center;
    }

    .iziToast-rtl {
      direction: rtl;
      padding: 8px 0 9px 50px;
    }

    .iziToast-rtl .iziToast-cover {
      left: auto;
      right: 0;
    }

    .iziToast-rtl .iziToast-close {
      right: auto;
      left: 0;
    }

    .iziToast-rtl .iziToast-body {
      padding: 0 10px 0 0;
      margin: 0 16px 0 0;
    }

    .iziToast-rtl .iziToast-body strong {
      padding: 0 0 0 10px;
    }

    .iziToast-rtl .iziToast-body strong,
    .iziToast-rtl .iziToast-body p {
      float: right;
      text-align: right;
    }

    .iziToast-rtl .iziToast-body .iziToast-icon {
      left: auto;
      right: 0;
    }

    @media only screen and (min-width: 568px) {
      .iziToast-wrapper {
        padding: 10px 15px;
      }
      .iziToast-cover {
        border-radius: 3px 0 0 3px;
      }
      .iziToast {
        margin: 5px 0;
        border-radius: 3px;
        width: auto;
      }
      .iziToast::after {
        content: "";
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 3px;
        box-shadow:
          inset 0 -10px 20px -10px rgba(0, 0, 0, 0.2),
          inset 0 0 5px rgba(0, 0, 0, 0.1),
          0 8px 8px -5px rgba(0, 0, 0, 0.25);
      }
      .iziToast.iziToast-color-dark::after {
        box-shadow:
          inset 0 -10px 20px -10px rgba(255, 255, 255, 0.3),
          0 10px 10px -5px rgba(0, 0, 0, 0.25);
      }
      .iziToast.iziToast-balloon .iziToast-progressbar {
        background: transparent;
      }
      .iziToast.iziToast-balloon::after {
        box-shadow:
          0 10px 10px -5px rgba(0, 0, 0, 0.25),
          inset 0 10px 20px -5px rgba(0, 0, 0, 0.25);
      }
      .iziToast-target .iziToast::after {
        box-shadow:
          inset 0 -10px 20px -10px rgba(0, 0, 0, 0.2),
          inset 0 0 5px rgba(0, 0, 0, 0.1);
      }
    }
    .iziToast.iziToast-theme-dark {
      background: var(--color-06);
      border-color: var(--color-06);
    }

    .iziToast.iziToast-theme-dark strong {
      color: #fff;
    }

    .iziToast.iziToast-theme-dark a {
      color: #fff;
    }

    .iziToast.iziToast-theme-dark p {
      color: rgba(255, 255, 255, 0.7);
      font-weight: 300;
    }

    .iziToast.iziToast-theme-dark .iziToast-close {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfgCR4OIQIPSao6AAAAwElEQVRIx72VUQ6EIAwFmz2XB+AConhjzqTJ7JeGKhLYlyx/BGdoBVpjIpMJNjgIZDKTkQHYmYfwmR2AfAqGFBcO2QjXZCd24bEggvd1KBx+xlwoDpYmvnBUUy68DYXD77ESr8WDtYqvxRex7a8oHP4Wo1Mkt5I68Mc+qYqv1h5OsZmZsQ3gj/02h6cO/KEYx29hu3R+VTTwz6D3TymIP1E8RvEiiVdZfEzicxYLiljSxKIqlnW5seitTW6uYnv/Aqh4whX3mEUrAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA5LTMwVDE0OjMzOjAyKzAyOjAwl6RMVgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wOS0zMFQxNDozMzowMiswMjowMOb59OoAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC")
        no-repeat 50% 50%;
      background-size: 8px;
    }

    .iziToast.iziToast-theme-dark .iziToast-icon {
      color: #fff;
    }

    .iziToast.iziToast-theme-dark .iziToast-icon.ico-info {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAflBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////vroaSAAAAKXRSTlMA6PsIvDob+OapavVhWRYPrIry2MxGQ97czsOzpJaMcE0qJQOwVtKjfxCVFeIAAAI3SURBVFjDlJPZsoIwEETnCiGyb8q+qmjl/3/wFmGKwjBROS9QWbtnOqDDGPq4MdMkSc0m7gcDDhF4NRdv8NoL4EcMpzoJglPl/KTDz4WW3IdvXEvxkfIKn7BMZb1bFK4yZFqghZ03jk0nG8N5NBwzx9xU5cxAg8fXi20/hDdC316lcA8o7t16eRuQvW1XGd2d2P8QSHQDDbdIII/9CR3lUF+lbucfJy4WfMS64EJPORnrZxtfc2pjJdnbuags3l04TTtJMXrdTph4Pyg4XAjugAJqMDf5Rf+oXx2/qi4u6nipakIi7CsgiuMSEF9IGKg8heQJKkxIfFSUU/egWSwNrS1fPDtLfon8sZOcYUQml1Qv9a3kfwsEUyJEMgFBKzdV8o3Iw9yAjg1jdLQCV4qbd3no8yD2GugaC3oMbF0NYHCpJYSDhNI5N2DAWB4F4z9Aj/04Cna/x7eVAQ17vRjQZPh+G/kddYv0h49yY4NWNDWMMOMUIRYvlTECmrN8pUAjo5RCMn8KoPmbJ/+Appgnk//Sy90GYBCGgm7IAskQ7D9hFKW4ApB1ei3FSYD9PjGAKygAV+ARFYBH5BsVgG9kkBSAQWKUFYBRZpkUgGVinRWAdUZQDABBQdIcAElDVBUAUUXWHQBZx1gMAGMprM0AsLbVXHsA5trZe93/wp3svQ0YNb/jWV3AIOLsMtlznSNOH7JqjOpDVh7z8qCZR10ftvO4nxeOvPLkpSuvfXnxzKtvXr7j+v8C5ii0e71At7cAAAAASUVORK5CYII=")
        no-repeat 50% 50%;
      background-size: 85%;
    }

    .iziToast.iziToast-theme-dark .iziToast-icon.ico-warning {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAAllBMVEUAAAD////+//3+//3+//3///////z+//3+//3+//3////////////9//3////+//39//3///3////////////+//3+//39//3///z+//z+//7///3///3///3///3////////+//3+//3+//3+//z+//3+//7///3///z////////+//79//3///3///z///v+//3///+trXouAAAAMHRSTlMAB+j87RBf+PXiCwQClSPYhkAzJxnx05tSyadzcmxmHRbp5d7Gwrh4TDkvsYt/WkdQzCITAAAB1UlEQVRYw+3XaXKCQBCGYSIIighoxCVqNJrEPfly/8vFImKXduNsf/Mc4K1y7FnwlMLQc/bUbj85R6bA1LXRDICg6RjJcZa7NQYtnLUGTpERSiOXxrOPkv9s30iGKDmtbYir3H7OUHJa2ylAuvZzRvzUfs7Ii/2cgfTt54x82s8ZSM848gJmYtroQzA2jHwA+LkBIEuMGt+QIng1igzlyMrkuP2CyOi47axRaYTL5jhDJehoR+aovC29s3iIyly3Eb+hRCvZo2qsGTnhKr2cLDS+J73GsqBI9W80UCmWWpEuhIjh6ZRGjyNRarjzKGJ2Ou2himCvjHwqI+rTqQdlRH06TZQR9ek0hiqiPp06mV4ke7QPX6ERUZxO8Uo3sqrfhxvoRrCpvXwL/UjR9GRHMIvLgke4d5QbiwhM6JV2YKKF4vIl7XIBkwm4keryJVmvk/TfwcmPwQNkUQuyA2/sYGwnXL7GPu4bW1jYsmevrNj09/MGZMOEPXslQVqO8hqykD17JfPHP/bmo2yGGpdZiH3IZvzZa7B3+IdDjjpjesHJcvbs5dZ/e+cddVoDdvlq7x12Nac+iN7e4R8OXTjp0pw5CGnOLNDEzeBs5gVwFniAO+8f8wvfeXP2hyqnmwAAAABJRU5ErkJggg==")
        no-repeat 50% 50%;
      background-size: 85%;
    }

    .iziToast.iziToast-theme-dark .iziToast-icon.ico-error {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAeFBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GqOSsAAAAJ3RSTlMA3BsB98QV8uSyWVUFz6RxYwzYvbupmYqAaU1FQTXKv7abj4d1azKNUit3AAACZElEQVRYw7WXaZOCMAyGw30UORRQBLxX/v8/3BkaWjrY2szO5otKfGrzJrEp6Kw6F8f8sI+i/SE/FucKSBaWiT8p5idlaEtnXTB9tKDLLHAvdSatOan3je93k9F2vRF36+mr1a6eH2NFNydoHq/ieU/UXcWjjk9XykdNWq2ywtp4tXL6Wb2T/MqtzzZutsrNyfvA51KoQROhVCjfrnASIRpSVUZiD5v4RbWExjRdJzSmOsZFvzYz59kRSr6V5zE+/QELHkNdb3VRx45HS1b1u+zfkkcbRAZ3qJ9l/A4qefHUDMShJe+6kZKJDD2pLQ9Q4lu+5Q7rz7Plperd7AtQEgIPI6o2dxr2D4GXvxqCiKcn8cD4gxIAEt7/GYkHL16KqeJd0NB4gJbXfgVnzCGJlzGcocCVSLzUvoAj9xJ4NF7/R8gxoVQexc/hgBpSebjPjgPs59cHmYfn7NkDb6wXmUf1I1ygIPPw4gtgCE8yDw8eAop4J/PQcBExjQmZx37MsZB2ZB4cLKQCG5vKYxMWSzMxIg8pNtOyUkvkocEmXGo69mh8FgnxS4yBwMvDrJSNHZB4uC3ayz/YkcIP4lflwVIT+OU07ZSjrbTkZQ6dTPkYubZ8GC/Cqxu6WvJZII93dcCw46GdNqdpTeF/tiMOuDGB9z/NI6NvyWetGPM0g+bVNeovBmamHXWj0nCbEaGeTMN2PWrqd6cM26ZxP2DeJvj+ph/30Zi/GmRbtlK5SptI+nwGGnvH6gUruT+L16MJHF+58rwNIifTV0vM8+hwMeOXAb6Yx0wXT+b999WXfvn+8/X/F7fWzjdTord5AAAAAElFTkSuQmCC")
        no-repeat 50% 50%;
      background-size: 80%;
    }

    .iziToast.iziToast-theme-dark .iziToast-icon.ico-check {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEUAAAD////////////////////////////////////////PIev5AAAACnRSTlMApAPhIFn82wgGv8mVtwAAAKVJREFUSMft0LEJAkEARNFFFEw1NFJb8CKjAy1AEOzAxNw+bEEEg6nyFjbY4LOzcBwX7S/gwUxoTdIn+Jbv4Lv8bx446+kB6VsBtK0B+wbMCKxrwL33wOrVeeChX28n7KTOTjgoEu6DRSYAgAAAAkAmAIAAAAIACQIkMkACAAgAIACAyECBKAOJuCagTJwSUCaUAEMAABEBRwAAEQFLbCJgO4bW+AZKGnktR+jAFAAAAABJRU5ErkJggg==")
        no-repeat 50% 50%;
      background-size: 85%;
    }

    .iziToast.iziToast-theme-dark strong {
      font-weight: 500;
    }

    .iziToast.iziToast-theme-dark .iziToast-buttons button,
    .iziToast.iziToast-theme-dark .iziToast-buttons a {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    .iziToast.iziToast-theme-dark .iziToast-buttons button:hover,
    .iziToast.iziToast-theme-dark .iziToast-buttons a:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .iziToast.iziToast-color-red {
      background: rgba(224, 81, 85, 0.9);
      border-color: rgba(224, 81, 85, 0.9);
    }

    .iziToast.iziToast-color-yellow {
      background: rgba(228, 142, 4, 0.9);
      border-color: rgba(228, 142, 4, 0.9);
    }

    .iziToast.iziToast-color-blue {
      background: rgba(181, 225, 249, 0.9);
      border-color: rgba(181, 225, 249, 0.9);
    }

    .iziToast.iziToast-color-green {
      background: rgba(180, 241, 196, 0.9);
      border-color: rgba(180, 241, 196, 0.9);
    }

    .iziToast.iziToast-layout2 .iziToast-body > p {
      width: 100%;
    }

    .iziToast.revealIn,
    .iziToast .revealIn {
      -webkit-animation: iziT-revealIn 1s cubic-bezier(0.25, 1.6, 0.25, 1) both;
      -moz-animation: iziT-revealIn 1s cubic-bezier(0.25, 1.6, 0.25, 1) both;
      animation: iziT-revealIn 1s cubic-bezier(0.25, 1.6, 0.25, 1) both;
    }

    .iziToast.slideIn,
    .iziToast .slideIn {
      -webkit-animation: iziT-slideIn 1s cubic-bezier(0.16, 0.81, 0.32, 1) both;
      -moz-animation: iziT-slideIn 1s cubic-bezier(0.16, 0.81, 0.32, 1) both;
      animation: iziT-slideIn 1s cubic-bezier(0.16, 0.81, 0.32, 1) both;
    }

    .iziToast.bounceInLeft {
      -webkit-animation: iziT-bounceInLeft 0.7s ease-in-out both;
      animation: iziT-bounceInLeft 0.7s ease-in-out both;
    }

    .iziToast.bounceInRight {
      -webkit-animation: iziT-bounceInRight 0.85s ease-in-out both;
      animation: iziT-bounceInRight 0.85s ease-in-out both;
    }

    .iziToast.bounceInDown {
      -webkit-animation: iziT-bounceInDown 0.7s ease-in-out both;
      animation: iziT-bounceInDown 0.7s ease-in-out both;
    }

    .iziToast.bounceInUp {
      -webkit-animation: iziT-bounceInUp 0.7s ease-in-out both;
      animation: iziT-bounceInUp 0.7s ease-in-out both;
    }

    .iziToast.fadeIn {
      -webkit-animation: iziT-fadeIn 0.5s ease both;
      animation: iziT-fadeIn 0.5s ease both;
    }

    .iziToast.fadeInUp {
      -webkit-animation: iziT-fadeInUp 0.7s ease both;
      animation: iziT-fadeInUp 0.7s ease both;
    }

    .iziToast.fadeInDown {
      -webkit-animation: iziT-fadeInDown 0.7s ease both;
      animation: iziT-fadeInDown 0.7s ease both;
    }

    .iziToast.fadeInLeft {
      -webkit-animation: iziT-fadeInLeft 0.85s cubic-bezier(0.25, 0.8, 0.25, 1)
        both;
      animation: iziT-fadeInLeft 0.85s cubic-bezier(0.25, 0.8, 0.25, 1) both;
    }

    .iziToast.fadeInRight {
      -webkit-animation: iziT-fadeInRight 0.85s cubic-bezier(0.25, 0.8, 0.25, 1)
        both;
      animation: iziT-fadeInRight 0.85s cubic-bezier(0.25, 0.8, 0.25, 1) both;
    }

    .iziToast.flipInX {
      -webkit-animation: iziT-flipInX 0.85s cubic-bezier(0.35, 0, 0.25, 1) both;
      animation: iziT-flipInX 0.85s cubic-bezier(0.35, 0, 0.25, 1) both;
    }

    .iziToast.fadeOut {
      -webkit-animation: iziT-fadeOut 0.7s ease both;
      animation: iziT-fadeOut 0.7s ease both;
    }

    .iziToast.fadeOutDown {
      -webkit-animation: iziT-fadeOutDown 0.7s
        cubic-bezier(0.4, 0.45, 0.15, 0.91) both;
      animation: iziT-fadeOutDown 0.7s cubic-bezier(0.4, 0.45, 0.15, 0.91) both;
    }

    .iziToast.fadeOutUp {
      -webkit-animation: iziT-fadeOutUp 0.7s cubic-bezier(0.4, 0.45, 0.15, 0.91)
        both;
      animation: iziT-fadeOutUp 0.7s cubic-bezier(0.4, 0.45, 0.15, 0.91) both;
    }

    .iziToast.fadeOutLeft {
      -webkit-animation: iziT-fadeOutLeft 0.5s ease both;
      animation: iziT-fadeOutLeft 0.5s ease both;
    }

    .iziToast.fadeOutRight {
      -webkit-animation: iziT-fadeOutRight 0.5s ease both;
      animation: iziT-fadeOutRight 0.5s ease both;
    }

    .iziToast.flipOutX {
      -webkit-backface-visibility: visible !important;
      backface-visibility: visible !important;
      -webkit-animation: iziT-flipOutX 0.7s cubic-bezier(0.4, 0.45, 0.15, 0.91)
        both;
      animation: iziT-flipOutX 0.7s cubic-bezier(0.4, 0.45, 0.15, 0.91) both;
    }

    @-webkit-keyframes iziT-revealIn {
      0% {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 1);
      }
      100% {
        opacity: 1;
      }
    }
    @-moz-keyframes iziT-revealIn {
      0% {
        opacity: 0;
        -moz-transform: scale3d(0.3, 0.3, 1);
      }
      100% {
        opacity: 1;
      }
    }
    @-webkit-keyframes iziT-slideIn {
      0% {
        opacity: 0;
        -webkit-transform: translateX(50px);
      }
      100% {
        opacity: 1;
        -webkit-transform: translateX(0);
      }
    }
    @-moz-keyframes iziT-slideIn {
      0% {
        opacity: 0;
        -moz-transform: translateX(50px);
      }
      100% {
        opacity: 1;
        -moz-transform: translateX(0);
      }
    }
    @-webkit-keyframes iziT-bounceInLeft {
      0% {
        opacity: 0;
        -webkit-transform: translateX(280px);
      }
      50% {
        opacity: 1;
        -webkit-transform: translateX(-20px);
      }
      70% {
        -webkit-transform: translateX(10px);
      }
      100% {
        -webkit-transform: translateX(0);
      }
    }
    @-webkit-keyframes iziT-bounceInRight {
      0% {
        opacity: 0;
        -webkit-transform: translateX(-280px);
      }
      50% {
        opacity: 1;
        -webkit-transform: translateX(20px);
      }
      70% {
        -webkit-transform: translateX(-10px);
      }
      100% {
        -webkit-transform: translateX(0);
      }
    }
    @-webkit-keyframes iziT-bounceInDown {
      0% {
        opacity: 0;
        -webkit-transform: translateY(-200px);
      }
      50% {
        opacity: 1;
        -webkit-transform: translateY(10px);
      }
      70% {
        -webkit-transform: translateY(-5px);
      }
      100% {
        -webkit-transform: translateY(0);
      }
    }
    @-webkit-keyframes iziT-bounceInUp {
      0% {
        opacity: 0;
        -webkit-transform: translateY(200px);
      }
      50% {
        opacity: 1;
        -webkit-transform: translateY(-10px);
      }
      70% {
        -webkit-transform: translateY(5px);
      }
      100% {
        -webkit-transform: translateY(0);
      }
    }
    @-webkit-keyframes iziT-fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @-webkit-keyframes iziT-fadeInUp {
      from {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-webkit-keyframes iziT-fadeInDown {
      from {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-webkit-keyframes iziT-fadeInLeft {
      from {
        opacity: 0;
        -webkit-transform: translate3d(300px, 0, 0);
        transform: translate3d(300px, 0, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-webkit-keyframes iziT-fadeInRight {
      from {
        opacity: 0;
        -webkit-transform: translate3d(-300px, 0, 0);
        transform: translate3d(-300px, 0, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-webkit-keyframes iziT-flipInX {
      from {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        opacity: 0;
      }
      40% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      }
      60% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
        opacity: 1;
      }
      80% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
        transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
      }
      to {
        -webkit-transform: perspective(400px);
        transform: perspective(400px);
      }
    }
    @-webkit-keyframes iziT-fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-webkit-keyframes iziT-fadeOutDown {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
      }
    }
    @-webkit-keyframes iziT-fadeOutUp {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
    }
    @-webkit-keyframes iziT-fadeOutLeft {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(-200px, 0, 0);
        transform: translate3d(-200px, 0, 0);
      }
    }
    @-webkit-keyframes iziT-fadeOutRight {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(200px, 0, 0);
        transform: translate3d(200px, 0, 0);
      }
    }
    @-webkit-keyframes iziT-flipOutX {
      from {
        -webkit-transform: perspective(400px);
        transform: perspective(400px);
      }
      30% {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
        opacity: 1;
      }
      to {
        -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
        opacity: 0;
      }
    }
    @-moz-keyframes iziT-revealIn {
      0% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 1);
      }
      100% {
        opacity: 1;
      }
    }
    @-webkit-keyframes iziT-revealIn {
      0% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 1);
      }
      100% {
        opacity: 1;
      }
    }
    @-o-keyframes iziT-revealIn {
      0% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 1);
      }
      100% {
        opacity: 1;
      }
    }
    @keyframes iziT-revealIn {
      0% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 1);
      }
      100% {
        opacity: 1;
      }
    }
    @-moz-keyframes iziT-slideIn {
      0% {
        opacity: 0;
        transform: translateX(50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @-webkit-keyframes iziT-slideIn {
      0% {
        opacity: 0;
        transform: translateX(50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @-o-keyframes iziT-slideIn {
      0% {
        opacity: 0;
        transform: translateX(50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @keyframes iziT-slideIn {
      0% {
        opacity: 0;
        transform: translateX(50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    @-moz-keyframes iziT-fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @-webkit-keyframes iziT-fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @-o-keyframes iziT-fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @keyframes iziT-fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @-moz-keyframes iziT-fadeInUp {
      from {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-webkit-keyframes iziT-fadeInUp {
      from {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-o-keyframes iziT-fadeInUp {
      from {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @keyframes iziT-fadeInUp {
      from {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-moz-keyframes iziT-fadeInDown {
      from {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-webkit-keyframes iziT-fadeInDown {
      from {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-o-keyframes iziT-fadeInDown {
      from {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @keyframes iziT-fadeInDown {
      from {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-moz-keyframes iziT-fadeInLeft {
      from {
        opacity: 0;
        -webkit-transform: translate3d(300px, 0, 0);
        transform: translate3d(300px, 0, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-webkit-keyframes iziT-fadeInLeft {
      from {
        opacity: 0;
        -webkit-transform: translate3d(300px, 0, 0);
        transform: translate3d(300px, 0, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-o-keyframes iziT-fadeInLeft {
      from {
        opacity: 0;
        -webkit-transform: translate3d(300px, 0, 0);
        transform: translate3d(300px, 0, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @keyframes iziT-fadeInLeft {
      from {
        opacity: 0;
        -webkit-transform: translate3d(300px, 0, 0);
        transform: translate3d(300px, 0, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-moz-keyframes iziT-fadeInRight {
      from {
        opacity: 0;
        -webkit-transform: translate3d(-300px, 0, 0);
        transform: translate3d(-300px, 0, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-webkit-keyframes iziT-fadeInRight {
      from {
        opacity: 0;
        -webkit-transform: translate3d(-300px, 0, 0);
        transform: translate3d(-300px, 0, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-o-keyframes iziT-fadeInRight {
      from {
        opacity: 0;
        -webkit-transform: translate3d(-300px, 0, 0);
        transform: translate3d(-300px, 0, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @keyframes iziT-fadeInRight {
      from {
        opacity: 0;
        -webkit-transform: translate3d(-300px, 0, 0);
        transform: translate3d(-300px, 0, 0);
      }
      to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }
    @-moz-keyframes iziT-fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-webkit-keyframes iziT-fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-o-keyframes iziT-fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @keyframes iziT-fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-moz-keyframes iziT-fadeOutDown {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
      }
    }
    @-webkit-keyframes iziT-fadeOutDown {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
      }
    }
    @-o-keyframes iziT-fadeOutDown {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
      }
    }
    @keyframes iziT-fadeOutDown {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
      }
    }
    @-moz-keyframes iziT-fadeOutUp {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
    }
    @-webkit-keyframes iziT-fadeOutUp {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
    }
    @-o-keyframes iziT-fadeOutUp {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
    }
    @keyframes iziT-fadeOutUp {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
    }
    @-moz-keyframes iziT-fadeOutLeft {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(-200px, 0, 0);
        transform: translate3d(-200px, 0, 0);
      }
    }
    @-webkit-keyframes iziT-fadeOutLeft {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(-200px, 0, 0);
        transform: translate3d(-200px, 0, 0);
      }
    }
    @-o-keyframes iziT-fadeOutLeft {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(-200px, 0, 0);
        transform: translate3d(-200px, 0, 0);
      }
    }
    @keyframes iziT-fadeOutLeft {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(-200px, 0, 0);
        transform: translate3d(-200px, 0, 0);
      }
    }
    @-moz-keyframes iziT-fadeOutRight {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(200px, 0, 0);
        transform: translate3d(200px, 0, 0);
      }
    }
    @-webkit-keyframes iziT-fadeOutRight {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(200px, 0, 0);
        transform: translate3d(200px, 0, 0);
      }
    }
    @-o-keyframes iziT-fadeOutRight {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(200px, 0, 0);
        transform: translate3d(200px, 0, 0);
      }
    }
    @keyframes iziT-fadeOutRight {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        -webkit-transform: translate3d(200px, 0, 0);
        transform: translate3d(200px, 0, 0);
      }
    }
    pre code.hljs {
      display: block;
      overflow-x: auto;
      padding: 1em;
      background-color: #222;
    }

    code.hljs {
      padding: 3px 5px;
    }

    .hljs {
      background: #23241f;
      color: #f8f8f2;
    }

    .hljs-subst,
    .hljs-tag {
      color: #f8f8f2;
    }

    .hljs-emphasis,
    .hljs-strong {
      color: #a8a8a2;
    }

    .hljs-bullet,
    .hljs-link,
    .hljs-literal,
    .hljs-number,
    .hljs-quote,
    .hljs-regexp {
      color: #5cb59e;
    }

    .hljs-code,
    .hljs-section,
    .hljs-selector-class,
    .hljs-title {
      color: #a6e22e;
    }

    .hljs-strong {
      font-weight: 700;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-attr,
    .hljs-keyword,
    .hljs-name,
    .hljs-selector-tag {
      color: #e6db74;
    }

    .hljs-attribute,
    .hljs-symbol {
      color: #66d9ef;
    }

    .hljs-class .hljs-title,
    .hljs-params,
    .hljs-title.class_ {
      color: #f8f8f2;
    }

    .hljs-addition,
    .hljs-built_in,
    .hljs-selector-attr,
    .hljs-selector-id,
    .hljs-selector-pseudo,
    .hljs-string,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable {
      color: #d57272;
    }

    .hljs-comment,
    .hljs-deletion,
    .hljs-meta {
      color: #75715e;
    }

    .tabContentScrollContainer {
      height: 100%;
      overflow-y: auto;
    }

    .tabtoolbar {
      padding: 5px;
      padding-left: 5px;
      min-height: 20px;
    }
    .tabtoolbar .button-small {
      margin-top: 0px !important;
    }

    .toolbar {
      background-color: var(--color-01);
    }

    .tabpanel {
      background-color: var(--color-02);
    }
    .tabpanel .tabs {
      padding: 0px;
      padding-left: 4px;
      width: 100%;
      overflow-x: auto;
      overflow-y: none;
      background-color: var(--color-03);
      white-space: nowrap;
    }
    .tabpanel .tabs .tabcontainer {
      user-select: none;
      display: inline-block;
    }
    .tabpanel .tabs .taboptions {
      position: absolute;
      min-width: 20px;
      max-width: 20px !important;
      right: 0px;
      padding: 4px;
      padding-top: 10px;
      padding-bottom: 8px;
      background-color: var(--color-03);
      z-index: 2;
    }
    .tabpanel .tabs .tab {
      float: left;
      font-size: 13px;
      padding: 4px;
      padding-top: 3px;
      cursor: pointer;
      padding-left: 8px;
      padding-right: 8px;
      margin-top: 7px;
      min-width: 70px !important;
      opacity: 0.8;
      color: var(--color-13);
      background-color: var(--color-02);
      border-bottom: 1px solid transparent;
    }
    .tabpanel .tabs .tab:hover {
      opacity: 0.6;
      border-bottom: 1px solid var(--color-08);
    }
    .tabpanel .tabs .tab.active {
      opacity: 1;
      background-color: var(--color-01);
      border-bottom: 1px solid var(--color-special);
    }
    .tabpanel .tabs .tab.active:hover {
      opacity: 1;
    }
    .tabpanel .tabs .tab .tabicon {
      pointer-events: none !important;
    }
    .tabpanel .tabs .unsaved {
      color: var(--color-warning);
    }

    .contentcontainer {
      position: relative;
      overflow-y: hidden;
      overflow-x: hidden;
      height: 100%;
    }
    .contentcontainer .tabcontent-scroll {
      height: 100%;
      overflow-x: auto;
      overflow-y: auto;
    }
    .contentcontainer .tabRows {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .contentcontainer .tabRows .tabRow {
      margin-bottom: 10px;
    }
    .contentcontainer .tabRows .tabRowExpand {
      display: flex;
      flex-grow: 1;
      flex: 1 1 auto;
      overflow-y: auto;
      margin-bottom: 10px;
    }
    .contentcontainer .tabRows .hljs {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
    .contentcontainer .padding {
      padding-left: 10px;
    }
    .contentcontainer .closetabx {
      margin-top: 4px;
      margin-right: 10px;
      float: right;
      position: absolute;
      right: 0px;
    }
    .contentcontainer .tabcontent {
      background-color: var(--color-02);
      max-height: 100%;
      height: auto;
    }
    .contentcontainer .tabcontent.readonly {
      opacity: 0.6;
      pointer-events: none !important;
      user-select: none !important;
    }
    .contentcontainer .tabcontent.readonly input {
      pointer-events: none !important;
      user-select: none !important;
    }
    .contentcontainer .tabcontent h1,
    .contentcontainer .tabcontent h2,
    .contentcontainer .tabcontent h3,
    .contentcontainer .tabcontent h4 {
      color: var(--color-13);
    }
    .contentcontainer .tabcontent hr {
      margin-top: 20px;
      border-top: 2px solid var(--color-05);
    }

    #metatabpanel .contentcontainer {
      overflow-y: auto;
    }

    .dependencytabs .contentcontainer,
    .dependencytabs .contentcontainer .tabcontent {
      max-height: 220px;
    }
    .dependencytabs .addopdependency {
      background-color: var(--color-01);
      min-height: 150px;
      padding: 15px;
    }
    .dependencytabs .addopdependency .depSrc.upload {
      width: 75%;
    }
    .dependencytabs .addopdependency select {
      padding: 4px;
    }
    .dependencytabs .addopdependency input,
    .dependencytabs .addopdependency .bigsel {
      margin-top: 10px;
      margin-bottom: 10px !important;
      max-width: 500px;
    }
    .dependencytabs .libselect select {
      padding: 8px 9px !important;
      width: 100%;
      margin-bottom: 3px;
    }
    .dependencytabs .libselect.inactive {
      opacity: 0.5;
    }

    #bottomtabs .tabpanel {
      display: none;
    }

    #maintabs,
    #bottomtabs {
      background-color: var(--color-02);
      margin: 0;
      z-index: 30;
      position: absolute;
      overflow: hidden;
    }
    #maintabs .ace_gutter-active-line,
    #bottomtabs .ace_gutter-active-line {
      background-color: #696a6b;
    }
    #maintabs .ace_content *,
    #bottomtabs .ace_content * {
      font-family: sourceCodePro;
      -webkit-font-smoothing: subpixel-antialiased;
    }
    #maintabs .ace_selection,
    #bottomtabs .ace_selection {
      background-color: #188eac !important;
      border: 0 !important;
    }
    #maintabs .ace_selected-word,
    #bottomtabs .ace_selected-word {
      background-color: #14748b !important;
      border: 0 !important;
    }

    .tabSubtab {
      padding-left: 15px;
      padding-right: 15px;
      padding: 5px;
      border-bottom: 1px solid transparent;
    }

    .tabActiveSubtab {
      border-bottom: 1px solid var(--color-special);
    }

    .tabManageOp .visibilityString {
      color: var(--color-08);
    }
    .tabManageOp .visibilityString a {
      color: var(--color-08);
    }

    .fileTypeColor_gl {
      color: var(--color_port_function);
    }

    .fileTypeColor_js {
      color: var(--color_port_value);
    }

    .fileTypeColor_css {
      color: var(--color_port_array);
    }

    .logList {
      height: 100%;
      overflow: scroll;
      display: flex;
      flex-direction: column-reverse;
    }
    .logList .logLineCode {
      background-color: rgba(0, 0, 0, 0.75);
      padding-left: 10px;
      padding-right: 10px;
    }
    .logList .logLine {
      margin-top: 2px;
      background-color: #222;
      font-family: monospace;
    }
    .logList .logLine * {
      color: #aaa;
    }
    .logList .logLine .outerInitiator {
      color: #777;
    }
    .logList .logLine .initiator,
    .logList .logLine a {
      color: #ecce64;
    }
    .logList .logLine a {
      text-decoration: underline;
    }
    .logList .logLine b {
      font-weight: normal;
      color: #fff;
    }
    .logList .logLine:hover {
      background-color: #333;
    }
    .logList .initiator_gui {
      color: var(--color_port_value);
    }
    .logList .logLevel1 {
      background-color: rgb(48, 48, 3);
    }
    .logList .logLevel1:hover {
      background-color: rgb(61, 61, 4);
    }
    .logList .logLevel2 {
      background-color: rgb(52, 9, 9);
    }
    .logList .logLevel2:hover {
      background-color: rgb(74, 13, 13);
    }
    .logList .logLevel99 {
      background-color: transparent;
    }
    .logList .logLevel99 a {
      text-decoration: none;
      font-family: "SourceSansPro", sans-serif;
    }
    .logList .logLevel99:hover {
      background-color: transparent;
    }
    .logList .loglineSpacer {
      margin-bottom: 8px;
    }

    .item_manager {
      width: 100%;
    }
    .item_manager .item-container {
      width: 110px;
      height: 135px;
      text-align: center;
      float: left;
      padding: 5px;
      margin-right: 5px;
      margin-top: 5px;
      border-radius: 10px;
      overflow: hidden;
      border: 2px solid transparent;
    }
    .item_manager .item:hover {
      background-color: var(--color-05);
    }
    .item_manager .item.selected {
      border: 2px solid var(--color-special) !important;
    }
    .item_manager .listitem {
      padding: 2px;
      border: 2px solid transparent;
      padding-left: 5px;
      word-break: break-all;
      text-overflow: ellipsis;
    }
    .item_manager .preview {
      background-repeat: no-repeat;
      background-size: 100% auto;
      width: 100px;
      height: 100px;
      background-position: center center;
      margin-left: 5%;
    }
    .item_manager .filemanager-detail-element {
      float: left;
      width: 33%;
    }
    .item_manager .filemanager-detail-element .iconbutton {
      display: inline-block;
      margin-bottom: 4px;
    }
    .item_manager .fileManagerSource {
      padding-left: 15px;
      padding-right: 15px;
      padding: 5px;
      border-bottom: 1px solid transparent;
    }
    .item_manager .activeFileManagerSource {
      border-bottom: 1px solid var(--color-special);
    }
    .item_manager .filename {
      text-overflow: ellipsis;
      margin-top: 5px;
      font-size: 12px;
    }

    .switch {
      background-color: var(--color-05);
      padding-left: 6px;
      padding-right: 6px;
      padding-top: 10px;
      padding-bottom: 4px;
      cursor: pointer;
      user-select: none;
      display: inline-block;
      margin-bottom: 1px;
    }

    .switch-text {
      padding-top: 4px;
    }

    .switch-active {
      background-color: var(--color-07);
      color: var(--color-13);
    }

    .switch-left {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    .switch-right {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    #item_details {
      width: 100%;
      height: 200px;
      overflow-y: auto;
      padding: 10px;
      background-color: var(--color-03);
      position: absolute;
      bottom: 0px;
    }

    #itemmanager_header {
      width: 100%;
      margin-bottom: 10px;
    }

    .filelistcontainer {
      height: calc(100% - 360px);
      width: 100%;
      overflow-y: auto;
      position: absolute;
    }

    .filemanager_header {
      user-select: none;
    }
    .filemanager_header .divider {
      padding: 13px;
      padding-top: 0px;
      padding-bottom: 2px;
    }

    .cbl_iconbarContainer {
      position: absolute;
    }

    .cbl_iconbar_hor {
      padding-bottom: 2px !important;
      display: inline-block;
    }
    .cbl_iconbar_hor .item {
      display: inline-block;
      margin-bottom: 0px !important;
    }

    .cbl_iconbar {
      border-radius: 5px;
      background-color: var(--color-03);
      color: white;
      padding: 4px;
      user-select: none;
    }
    .cbl_iconbar .item {
      cursor: pointer;
      padding: 5px;
      padding-bottom: 3px;
      border-radius: 3px;
      margin-bottom: 3px;
    }
    .cbl_iconbar .item:hover {
      background-color: var(--color-04);
    }
    .cbl_iconbar .item:hover .icontext {
      display: block;
    }
    .cbl_iconbar .item:active {
      background-color: var(--color-button-bg-active) !important;
    }
    .cbl_iconbar .item.textButton {
      background-color: var(--color-04);
      padding-left: 5px;
      padding-right: 5px;
      margin-right: 3px;
      margin-left: 3px;
    }
    .cbl_iconbar .item.textButton:hover {
      background-color: var(--color-06);
      color: var(--color-special);
    }
    .cbl_iconbar .item.nonInteractive {
      margin-right: 3px;
      margin-left: 3px;
      background-color: var(--color-02);
      cursor: default;
    }
    .cbl_iconbar .item.nonInteractive:hover {
      background-color: var(--color-02);
    }
    .cbl_iconbar .icontext {
      position: absolute;
      display: none;
      background-color: var(--color-03);
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
      padding: 5px;
      padding-left: 10px;
      padding-right: 10px;
      white-space: nowrap;
      margin-left: 27px;
    }

    #iconbar_sidebar_bottom {
      bottom: 10px;
      right: 300px;
    }

    #iconbar_sidebar_timeline {
      bottom: 10px;
      left: 100px;
      transform: translate(-50%);
    }

    .colorRick_dialog {
      --width: 256px;
      --height: 256px;
      --width-hue: 15px;
      --width-opacity: 15px;
      --pad-opacity: 10px;
      --pad: 10px;
      --colorblock-height: 20px;
      --inputcontainer-height: 120px;
      background-color: #333;
      width: calc(
        var(--width) + var(--pad-opacity) + 3 * var(--pad) + var(--width-hue) +
          var(--width-opacity)
      );
      height: calc(
        var(--height) + var(--colorblock-height) + 30px +
          var(--inputcontainer-height)
      );
      position: absolute;
      border-radius: 10px;
      overflow: hidden;
      z-index: 999999;
    }

    .colorRick_dialog * {
      font-size: 13px;
    }

    .colorRick_area {
      width: var(--width);
      height: var(--height);
      left: var(--pad);
      top: var(--pad);
      background: linear-gradient(
        to right,
        rgb(255, 255, 255),
        rgb(0, 255, 11)
      );
      position: absolute;
      cursor: pointer;
    }

    .colorRick_brightness {
      background: linear-gradient(hsla(0, 0%, 100%, 0), #000);
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .colorRick_eyeDrop {
      cursor: pointer;
      top: calc(var(--pad) + var(--pad) + var(--height));
      margin-top: 3px;
      height: var(--width-hue);
      width: var(--width-hue);
      background-color: #aaa;
      mask: url("data:image/svg+xml;charset=utf8, %3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cdefs%3E%3Cstyle%3E.cls-1{fill:none;stroke:%23000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='m9.22 13.59 5.32-5.31-2.95-2.95-7.3 7.3a.71.71 0 0 0 0 1l1.94 1.94a.73.73 0 0 0 1 0ZM12.42 4.5l2.85-2.85a2.09 2.09 0 0 1 2.95 0h0a2.09 2.09 0 0 1 0 2.95l-2.85 2.84M10.38 4.12l5.36 5.36M5.01 14.86l-2.1 2.09M12.04 10.8H6.15M1.92 18.97h0'/%3E%3Cpath style='fill:none' d='M0 0h20v20H0z'/%3E%3C/svg%3E");
      position: absolute;
      left: calc(var(--width) + var(--pad) + var(--pad));
    }

    .colorRick_eyeDrop:hover {
      background-color: #fff;
    }

    .colorRick_hue {
      cursor: pointer;
      top: var(--pad);
      background: linear-gradient(
        red,
        #f0f 17%,
        #00f 34%,
        #0ff 50%,
        #0f0 67%,
        #ff0 84%,
        red
      );
      height: var(--height);
      width: var(--width-hue);
      position: absolute;
      left: calc(var(--width) + var(--pad) + var(--pad));
    }

    .colorRick_opacity {
      cursor: pointer;
      top: var(--pad);
      background: linear-gradient(rgb(255, 255, 255), rgba(255, 255, 255, 0));
      height: var(--height);
      width: var(--width-opacity);
      position: absolute;
      left: calc(
        var(--width) + var(--pad) + var(--pad) + var(--pad) + var(--width-hue)
      );
    }

    .colorRick_preview {
      position: absolute;
      width: calc(var(--width) / 10 * 9);
      height: var(--colorblock-height);
      top: calc(var(--height) + 20px);
      margin-left: 10px;
    }

    .colorRick_preview_orig {
      margin-left: calc(var(--width) / 10 * 9 + 10px);
      width: calc(var(--width) / 10);
      cursor: pointer;
    }

    .colorRick_cursor {
      width: 4px;
      height: 4px;
      border: 1px solid transparent;
      background-color: white;
      position: absolute;
      pointer-events: none;
      border-radius: 100%;
    }

    .colorRick_cursor_hue,
    .colorRick_cursor_opacity {
      position: absolute;
      width: 19px;
      margin-left: -2px;
      height: 0px;
      border-top: 1px solid white;
      border-bottom: 1px solid white;
      position: absolute;
      pointer-events: none;
    }

    .colorRick_inputcontainer {
      position: absolute;
      height: var(--inputcontainer-height);
      /* top:250px; */
      top: calc(var(--height) + 20px + 20px + 10px);
      left: 0px;
      width: 100%;
      background-color: #000;
      padding: 10px;
    }

    .colorRick_inputcontainer table {
      width: var(--width);
    }

    .colorRick_inputcontainer,
    .colorRick_inputcontainer table {
      color: #999;
    }

    .colorRick_input {
      background-color: #444;
      border: 0px solid transparent;
      opacity: 1;
      color: #ddd;
    }

    .colorRick_input_small {
      width: 60px;
      margin-left: 8px;
    }

    .colorRick_input_hex {
      width: 60px;
    }

    .opacity_title {
      width: 60px;
      display: inline-block;
      margin-left: 6px;
    }

    .colorRick_invalid {
      opacity: 0.5;
    }

    .colorRick_inputcontainer table {
      /* width:90%; */
    }

    .colorRick_inputcontainer table,
    .colorRick_inputcontainer table td,
    .colorRick_inputcontainer table tr {
      /* pointer-events: none; */
      user-select: none;
      vertical-align: top;
    }

    .colorRick_inputcontainer table td.right {
      text-align: right;
      height: 30px;
    }

    .cablesCssUi .collapsable {
      user-select: none;
      font-size: 18px;
      cursor: pointer;
      padding-left: 14px;
      margin-top: 10px;
      margin-bottom: 8px;
      line-height: 20px;
      min-height: 10px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) calc(50% - 0px),
        var(--color-04) 50%,
        rgba(0, 0, 0, 0) calc(50% + 2px)
      );
      text-shadow:
        -6px 0px 1px var(--color-02),
        -5px 0px 1px var(--color-02),
        -4px 0px 1px var(--color-02),
        -3px 0px 1px var(--color-02),
        -2px 0px 1px var(--color-02),
        -1px 0px 1px var(--color-02),
        6px 0px 1px var(--color-02),
        5px 0px 1px var(--color-02),
        4px 0px 1px var(--color-02),
        3px 0px 1px var(--color-02),
        2px 0px 1px var(--color-02),
        1px 0px 1px var(--color-02);
    }
    .cablesCssUi .collapsable .icon-chevron-down,
    .cablesCssUi .collapsable .icon-chevron-up,
    .cablesCssUi .collapsable .icon-chevron-right {
      vertical-align: middle;
      margin-right: 5px;
    }
    .cablesCssUi .collapsable:hover {
      color: white;
      cursor: pointer;
    }

    .gradientEditorContainer {
      z-index: 9999;
      background-color: #111;
      position: absolute;
      width: 640px;
      border-radius: 10px;
    }

    #gradienteditorbar {
      width: 512px;
      height: 100px;
      overflow: hidden;
      cursor: pointer;
      background-color: transparent;
    }

    #gradientEditorCanvas {
      transform: scale(1, 100);
      transform-origin: top left;
      position: absolute;
    }

    #gradientEditorCanvasCurve {
      position: absolute;
    }

    #gradienteditorKeys {
      position: absolute;
    }

    #gradientColorInput {
      position: absolute;
      left: 550px;
      width: 48px;
      height: 48px;
      border-radius: 5px;
      border: 1px solid #aaaaaa;
    }

    .cablesCssUi .button,
    .cablesCssUi .button-small {
      display: inline-block;
      user-select: none;
      cursor: pointer;
      color: var(--color-12);
      background-color: var(--color-04) !important;
    }
    .cablesCssUi .button:hover,
    .cablesCssUi .button-small:hover {
      background-color: var(--color-button-bg-hover) !important;
      color: var(--color-special) !important;
    }
    .cablesCssUi .button:hover *,
    .cablesCssUi .button-small:hover * {
      background-color: var(--color-special) !important;
    }
    .cablesCssUi .button:active,
    .cablesCssUi .button-small:active {
      background-color: var(--color-button-bg-active) !important;
    }
    .cablesCssUi .button-small {
      background-size: 50%;
      padding: 8px;
      padding-bottom: 3px;
      padding-top: 3px;
      margin-right: 4px;
      background-position: center;
      border-radius: 4px;
      margin-top: 3px;
      font-size: var(--font-size-default);
    }
    .cablesCssUi .button,
    .cablesCssUi .redbutton,
    .cablesCssUi .bluebutton {
      padding: 5px 16px;
      margin-right: 10px;
      border-radius: 5px;
      text-align: center;
      margin-bottom: 2px;
    }
    .cablesCssUi .button.warn,
    .cablesCssUi .redbutton.warn,
    .cablesCssUi .bluebutton.warn {
      background-color: var(--color-warning);
    }
    .cablesCssUi .bluebutton {
      color: var(--color-02);
      background-color: var(--color-special) !important;
    }
    .cablesCssUi .bluebutton:hover {
      color: var(--color-04) !important;
      background-color: #06da7a !important;
    }
    .cablesCssUi .bluebutton:active {
      background-color: white !important;
    }
    .cablesCssUi .redbutton {
      color: var(--color-01);
      background-color: var(--color-error) !important;
    }
    .cablesCssUi .redbutton:hover {
      color: white !important;
    }
    .cablesCssUi .button_colorpick {
      width: 15px;
      height: 8px;
      padding: 5px !important;
      border-radius: 4px;
      border: 1px solid var(--color-09);
    }
    .cablesCssUi .button-left {
      margin-right: 1px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    .cablesCssUi .button-right {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
    .cablesCssUi .button-active {
      background-color: var(--color-button-bg-active) !important;
    }
    .cablesCssUi .button-inactive {
      opacity: 0.5;
      pointer-events: none;
    }

    .userPreferences .valinput {
      font-family: monospace;
      background-color: var(--color-05);
    }
    .userPreferences h3 {
      margin-bottom: 3px;
    }
    .userPreferences h1 {
      margin-top: 0px;
    }
    .userPreferences .prefRow {
      border-bottom: 1px solid var(--color-04);
    }
    .userPreferences .prefRow:hover {
      background-color: var(--color-03);
    }
    .userPreferences .prefRow div {
      padding-bottom: 15px;
    }
    .userPreferences .prefLeft {
      padding-top: 10px;
      text-align: right;
    }
    .userPreferences .prefRight h3 {
      margin-top: 0px;
    }
    .userPreferences .title h2 {
      margin-top: 0px;
      font-weight: bold;
    }

    .cablesCssUi .hidden {
      display: none !important;
    }
    .cablesCssUi .portSuggest0 {
      border-left: 4px solid var(--color_link_value) !important;
    }
    .cablesCssUi .portSuggest1 {
      border-left: 4px solid var(--color_link_function) !important;
    }
    .cablesCssUi .portSuggest2 {
      border-left: 4px solid var(--color_link_object) !important;
    }
    .cablesCssUi .portSuggest3 {
      border-left: 4px solid var(--color_link_array) !important;
    }
    .cablesCssUi .portSuggest4 {
      border-left: 4px solid var(--color_port_dynamic) !important;
    }
    .cablesCssUi .portSuggest5 {
      border-left: 4px solid var(--color_link_string) !important;
    }
    .cablesCssUi .portSuggest0Linked {
      border-left: 10px solid var(--color_link_value) !important;
      color: #888;
    }
    .cablesCssUi .portSuggest1Linked {
      border-left: 10px solid var(--color_link_function) !important;
      color: #888;
    }
    .cablesCssUi .portSuggest2Linked {
      border-left: 10px solid var(--color_link_object) !important;
      color: #888;
    }
    .cablesCssUi .portSuggest3Linked {
      border-left: 10px solid var(--color_link_array) !important;
      color: #888;
    }
    .cablesCssUi .portSuggest4Linked {
      border-left: 10px solid var(--color_port_dynamic) !important;
      color: #888;
    }
    .cablesCssUi .portSuggest5Linked {
      border-left: 10px solid var(--color_link_string) !important;
      color: #888;
    }
    .cablesCssUi .scrollPage {
      overflow: auto;
    }
    .cablesCssUi .scrollPage #mainContainer {
      position: fixed;
      width: 100%;
      height: 100%;
    }
    .cablesCssUi .scrollPage #cablescanvas {
      z-index: 9999 !important;
    }
    .cablesCssUi .scrollPage #cablescanvas,
    .cablesCssUi .scrollPage #meta {
      position: fixed !important;
      right: 15px !important;
    }
    .cablesCssUi .cursorAvatar {
      width: 20px;
      height: 20px;
      z-index: 1000;
      position: absolute;
      border-radius: 100%;
      border: 2px solid black;
      pointer-events: none;
    }
    .cablesCssUi .patchfield {
      border: 0px solid transparent;
      outline: 0px !important;
      position: absolute;
    }
    .cablesCssUi *:focus-visible {
      outline: 2px solid var(--color-special) !important;
    }
    .cablesCssUi canvas:focus-visible {
      outline: none !important;
    }
  `;

  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <script>
  window.nodeRequire = window.require;

  if (parent !== window) {
    window.addEventListener("hashchange", (event) => {
      parent.postMessage(
        { type: "hashchange", data: window.location.hash },
        "*",
      );
    });
  }
</script>

<style media="screen">
  body {
    background-color: #282828;
    color: #aaa;
    position: fixed;
    overflow: hidden;
  }
  #loadingstatusBar {
    background-color: #999;
    height: 100%;
    width: 0px;
    margin-bottom: 10px;
    z-index: 10000;
  }
  #loadingstatus {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 4px;
    width: 100%;
    z-index: 10000;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes scaleout {
    0% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    100% {
      transform: scale(1);
      -webkit-transform: scale(1);
      opacity: 0;
    }
  }

  .loading,
  .workingindicator {
    background-color: #aaa;
    animation: scaleout 1s infinite ease-in-out;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    min-width: 40px !important;
    min-height: 40px !important;
    max-width: 40px !important;
    max-height: 40px !important;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .startUpError {
    padding: 30px;
    font-family: monospace;
  }
</style>

<div class="cablesCssUi">
  <div id="loadingstatus">
    <div id="loadingstatusBar"></div>
    <div id="loadingInfo"></div>
    <div class="loading" style="margin-top: 50px"></div>
  </div>
  <div
    id="loadingstatusLog"
    style="font-family: monospace; padding: 30px"
  ></div>
</div>

<div
  id="cablescanvas"
  class="bgpatternDark hidden"
  style="width: 640px; height: 300px; right: 0px"
>
  <canvas id="glcanvas" width="0" height="0"></canvas>
</div>

<div class="cablesCssUi">
  <div id="mainContainer" class="hidden cablesCssUi"></div>

  <div id="cmdpalette" class="hidden">
    <div class="input-container">
      <input
        class="medium info"
        id="cmdinput"
        autocomplete="off"
        oninput="gui.cmdPallet.doSearch(this.value);"
        placeholder="search"
        style="width: 85%; float: left"
      />
      <div style="width: 10%; float: left">
        <a class="icon-x icon icon-2x" onclick="gui.cmdPallet.close();"></a>
      </div>
      <div class="clear"></div>
    </div>
    <div id="searchresult_cmd"></div>
  </div>
</div>

<script id="bookmarks" type="text/x-handlebars-template">
  {{#if bookmarks}}
    <div class="panel" id="bookmarkpanel">
      <h3>Bookmarks</h3>

      {{#each bookmarks}}
        <div class="list">
          <div onclick="gui.bookmarks.goto('{{id}}');">
            <h3 class="op_color_{{class}}">{{name}}</h3>
            {{objName}}
            <a
              class="icon icon-x fright tt"
              data-tt="remove bookmark"
              onclick="gui.bookmarks.remove('{{id}}');"
            ></a>
          </div>
        </div>
      {{/each}}
      <br />
    </div>
  {{/if}}
  <br />
</script>

<div class="cablesCssUi">
  <div id="chat" class="hidden">
    <div class="chat-messages"></div>
    <div class="chat-controls">
      <input
        type="text"
        class="message-input"
        placeholder="type here"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      />
      <button class="send">Send</button>
    </div>
  </div>
</div>

<script id="clonepatch" type="text/x-handlebars-template">
  <div class="panel list">
    <h3>You do not own this patch</h3>
    You can play around but not overwrite it. But you can clone it:
    <br /><br />
    <a
      class="bluebutton"
      onclick="CABLES.CMD.PATCH.saveAs();"
      style="color:black;"
    >Clone patch</a>
  </div>
</script>

<script id="dialog_createport" type="text/x-handlebars-template">

  <h2>Edit Port</h2>

  <input id="createPortId" value="{{portId}}" class="hidden"/>

  <br/>

  <table class="formtable">
      <tr>
          <td>
              Direction
          </td>
          <td>
              <select id="createPortDir">
                  <option value="0">Input</option>
                  <option value="1" {{#if port.dir}}selected{{/if}}>Output</option>
              </select>
          </td>
      </tr>
      <tr>
          <td>
              Type
          </td>
          <td>
              <select id="createPortType">
                  <option value="Number - Float">Number - Float</option>
                  <option value="Number - Float Slider" {{#compare port.uiDisplay '==' 'range'}}selected{{/compare}}>Number - Float Slider</option>
                  <option value="Number - Integer" {{#compare port.uiDisplay '==' 'int'}}selected{{/compare}}>Number - Integer</option>
                  <option value="Boolean" {{#compare port.uiDisplay '==' 'bool'}}selected{{/compare}}>Boolean</option>
                  <option value="String" {{#compare port.type '==' 5}}selected{{/compare}}>String</option>
                  <option value="String - URL" {{#compare port.uiDisplay '==' 'file'}}selected{{/compare}}>String - URL</option>
                  <option value="String - Editor" {{#compare port.uiDisplay '==' 'editor'}}selected{{/compare}}>String - Editor</option>
                  <option value="String - Switch" {{#compare port.uiDisplay '==' 'switch'}}selected{{/compare}}>String - Switch</option>
                  <option value="String - Dropdown" {{#compare port.uiDisplay '==' 'dropdown'}}selected{{/compare}}>String - Dropdown</option>
                  <option value="Array" {{#compare port.type '==' 3}}selected{{/compare}}>Array</option>
                  <option value="Object" {{#compare port.type '==' 2}}selected{{/compare}}>Object</option>
                  <option value="Object - Texture" {{#compare port.objType '==' 'texture'}}selected{{/compare}}>Object - Texture</option>
                  <option value="Object - Element" {{#compare port.objType '==' 'element'}}selected{{/compare}}>Object - Element</option>
                  <option value="Object - Geometry" {{#compare port.objType '==' 'geometry'}}selected{{/compare}}>Object - Geometry</option>
                  <option value="Object - AudioNode" {{#compare port.objType '==' 'audioNode'}}selected{{/compare}}>Object - AudioNode</option>
                  <option value="Object - Gradient" {{#compare port.objType '==' 'gradient'}}selected{{/compare}}>Object - Gradient</option>
                  <option value="Trigger" {{#compare port.type '==' 1}}selected{{/compare}}>Trigger</option>
                  <option value="Trigger - Button" {{#compare port.uiDisplay '==' 'button'}}selected{{/compare}}>Trigger - Button</option>
              </select>
          </td>
      </tr>
      <tr>
          <td>
              Title
          </td>
          <td>
              <input id="createPortName" value="{{port.title}}"/>
          </td>
      </tr>
      <tr>
          <td>
              Default Value
          </td>
          <td>
              <input id="createPortValue" value="{{port.value}}"/>
          </td>
      </tr>
      <tr>
          <td>
              Switch/Dropdown options (comma seperated)
          </td>
          <td>
              <input id="createPortUiAttrValues" value="{{port.values}}"/>
          </td>
      </tr>
      <tr>
          <td>
              Additional uiattribs
          </td>
          <td>
              <input id="createPortAddUiAttribs" value="{{json port.addUiAttribs}}"/>
          </td>
      </tr>
  </table>

  <br/>
  <br/>
  <a class="button bluebutton" id="createPortSubmit">Save</a>
  <a class="button"onclick="gui.closeModal();">Cancel</a>
</script>

<script id="dialog_upload" type="text/x-handlebars-template">
  <div id="uploaddialog">

    <div
      class="uploadarea"
      id="uploadarea"
      onclick="CABLES.CMD.PATCH.uploadFile()"
    >
      Drop files to upload!
    </div>

    <span>
      By uploading data to cables, you warrant and represent that you own or
      otherwise control all of the rights to the uploaded data, including all
      the rights necessary for you to provide, post, upload, input or submit the
      data. Do not upload illegal or offensive material.
      <br /><br />
    </span>

    <a class="button bluebutton" onclick="CABLES.CMD.PATCH.uploadFile()">Select
      file</a>
    <a class="button" onclick="gui.closeModal();">Cancel</a>
  </div>
</script>

<script id="GradientEditor" type="text/x-handlebars-template">
  <div style="padding:20px;padding-top:0px;">

    <h3>{{name}} Editor</h3>

    <div id="gradientColorInput"></div>
    <a
      class="iconbutton"
      style="position:absolute;left:550px;top:117px;"
      id="gradientColorDelete"
    ><span class="icon icon-x"></span></a>

    <canvas id="gradientEditorCanvas" width="512" height="1"></canvas>
    <canvas id="gradientEditorCanvasCurve" width="512" height="100"></canvas>

    <div id="gradienteditorbar"></div>

    <br />

    <div id="gradienteditorKeys"></div>

    <br /><br />
    <a id="gradientSaveButton" class="bluebutton">Save</a>
    <a id="gradientCancelButton" class="button">Cancel</a>

  </div>
</script>

<script id="iconbar" type="text/x-handlebars-template">

  <div class="cbl_iconbar">
      {{#each items}}
          <div class="item tt info" data-info="{{infotext}}" data-tt="{{cmd}}" onmouseover="gui.showInfo(CABLES.UI.TEXTS['{{infotext}}'])" onclick="CABLES.CMD.exec('{{cmd}}');">
              {{#if vertical}}<span class="icontext">{{cmd}}</span>{{/if}}
              <span class="icon tt info icon-{{#if icon}}{{icon}}{{else}}square{{/if}} icon-1_25x " data-tt="{{cmd}}" data-info="{{cmd}}"></span>
          </div>
      {{/each}}
  </div>
</script>

<div class="cablesCssUi" id="maincomponents" style="display: none">
  <div id="library">
    <div id="lib_head"></div>
    <div style="clear: both"></div>

    <div class="libContentContainer">
      <div class="libleft">
        <div id="lib_files"></div>
      </div>
      <div class="libright">
        <div id="lib_preview"></div>
      </div>
      <div style="clear: both"></div>
    </div>
  </div>

  <div id="inspectHtmlOverlay" class="hidden"></div>

  <div id="breadcrumb_nav">
    <div id="subpatch_nav">
      <div id="subpatch_breadcrumb"></div>
    </div>
  </div>

  <div id="restriction_container" class="hidden">
    <span id="restriction_close" class="icon icon-x"></span>
    <div id="restriction_message"></div>
  </div>

  <div id="drop-op-cursor" class="hidden"></div>

  <div id="suggestionDialog" class="hidden"></div>
  <div id="modalbg" onclick="gui.pressedEscape();" style="display: none"></div>
  <div id="modalcontainer" class="cablesCssUi" style="display: none">
    <div id="modalclose" class="modalclose">
      <a class="icon-x icon icon-1_5x" onclick="gui.pressedEscape();"></a>
    </div>

    <div id="modalheader"></div>
    <div id="modalcontent"></div>
  </div>
  <div id="opsearchmodal" class="hidden cablesCssUi"></div>

  <div id="canvasflash" class="hidden"></div>
  <div id="canvasmodal" class="hidden"></div>
  <div id="canvasicons">
    <div
      class="tt icon icon-resize-window"
      id="splitterRendererWH"
      class="splitter"
      data-tt="drag to resize"
    ></div>
    <div id="canvasIconBar" class="cbl_iconbar cbl_iconbar_hor">
      <span onclick="CABLES.CMD.RENDERER.popoutCanvas()" class="item"
        ><span
          class="tt info icon icon-external icon-1_25x"
          data-tt="popout canvas"
          data-info="renderer_popout"
        ></span
      ></span>

      <span onclick="CABLES.CMD.UI.toggleMaxRenderer()" class="item"
        ><span
          class="tt info icon icon-canvas_max icon-1_25x"
          data-tt="maximize canvas"
          data-info="renderer_maximize"
        ></span
      ></span>
      <span onclick="CABLES.CMD.UI.togglePatchBgRenderer()" class="item"
        ><span
          class="tt info icon icon-canvas_patchbg icon-1_25x"
          data-tt="patch background"
          data-info="renderer_patchbg"
        ></span
      ></span>

      <span onclick="CABLES.CMD.RENDERER.screenshot()" class="item"
        ><span
          class="tt info icon icon-image icon-1_25x"
          data-tt="save screenshot"
          data-info="save_screenshot"
        ></span
      ></span>
      <span onclick="CABLES.CMD.UI.toggleMute();" class="item"
        ><span
          class="tt info icon icon-volume-2 icon-1_25x"
          id="timelineVolume"
          data-tt="Toggle Sound"
          data-info="toggle_sound"
        ></span
      ></span>
      <span onclick="CABLES.CMD.UI.canvasLens()" class="item"
        ><span
          class="tt info icon icon-picker icon-1_25x"
          id="canvasLens"
          data-tt="Pixel Magnifier"
          data-info="canvas_lens"
        ></span
      ></span>
      <span onclick="gui.helperContextMenu(this);" class="item"
        ><span
          class="tt info icon icon-gizmo icon-1_25x"
          id="canvUitoggleOverlay"
          data-tt="[o] Toggle Overlays"
          data-info="toggle_helper"
        ></span
      ></span>

      <span
        onclick="gui.canvasManager.menu(this)"
        class="item textButton info"
        data-info="canvas_switch"
        id="canvasCtxSwitcher"
        >-</span
      >
      <span
        onclick="CABLES.CMD.RENDERER.changeSize()"
        class="item textButton info"
        data-info="canvas_size"
        id="canvasInfoSize"
      ></span>
      <span
        onclick="gui.rendererAspectMenu(this)"
        class="item textButton info"
        data-info="canvas_aspect"
        id="canvasInfoAspect"
        >Aspect</span
      >
      <span
        class="item nonInteractive info"
        data-info="canvas_version"
        id="canvasInfoVersion"
      ></span>
      <span
        class="item nonInteractive info"
        data-info="canvas_fps"
        id="canvasInfoFPS"
        >?? FPS</span
      >
      <span
        class="item nonInteractive info"
        data-info="canvas_ms"
        id="canvasInfoMS"
        >? MS</span
      >

      <span onclick="gui.rendererContextMenu(this)" class="item threedotcanvas"
        ><span class="icon icon-three-dots icon-1_25x"></span
      ></span>
    </div>
  </div>
  <div id="canvasInfoOverlay" class="hidden"></div>
  <div id="notify"></div>

  <div id="maintabs"></div>
  <div id="bottomtabs"></div>

  <div
    id="editormaximized"
    class="info"
    onclick="gui.maintabPanel.toggle(true);gui.setLayout();"
    data-info="minimize_tabpanel"
  >
    <span class="icon icon-chevron-left" style="pointer-events: none"></span>
  </div>

  <div
    id="editorminimized"
    onclick="gui.maintabPanel.toggle(true);gui.setLayout();"
    data-info="minimize_tabpanel"
  >
    <span class="icon icon-chevron-right"></span>
  </div>

  <canvas
    id="bgpreview"
    data-info="texpreview"
    class="info"
    style="border: 1px solid #222"
  >
  </canvas>

  <div
    id="bgpreviewButtonsContainer"
    class="hidden cbl_iconbarContainer cbl_iconbar_hor"
  >
    <div id="bgpreviewButtons" class="cbl_iconbar cbl_iconbar_hor">
      <span
        class="item nonInteractive"
        style="float: left"
        id="bgpreviewInfo"
        onclick="gui.metaTexturePreviewer.gotoOp();"
      >
      </span>

      <span
        class="item"
        id="texprevSize"
        onclick="gui.metaTexturePreviewer.toggleSize(-1);"
        style="padding-right: 0px !important; margin-right: 0px !important"
      >
        <span
          id="bgpreviewToggleSize"
          class="icon icon-1_25x fright iconhover icon-minus"
        ></span>
      </span>
      <span
        class="item"
        id="texprevSize2"
        onclick="gui.metaTexturePreviewer.toggleSize(1);"
        style="padding-left: 0px !important; margin-left: 0px !important"
      >
        <span
          id="bgpreviewToggleSize"
          class="icon icon-1_25x fright iconhover icon-plus"
        ></span>
      </span>

      <span
        class="item hidden"
        id="bgpreviewMax"
        onclick="CABLES.UI.userSettings.set('bgpreviewMax',true);"
      >
        <span class="icon icon-1_25x fright iconhover icon-chevron-left"></span>
      </span>
      <span
        class="item"
        id="bgpreviewMin"
        onclick="CABLES.UI.userSettings.set('bgpreviewMax',false);"
      >
        <span
          class="icon icon-1_25x fright iconhover icon-chevron-right"
        ></span>
      </span>
    </div>
  </div>

  <div id="patchviews">
    <div id="patch" tabindex="1" class="visible"></div>
  </div>

  <div id="timing"></div>

  <div id="splitterPatch" class="splitter"></div>
  <div id="splitterRenderer" class="splitter"></div>
  <div id="splitterMaintabs" class="splitter"></div>
  <div id="splitterBottomTabs" class="splitter"></div>

  <div id="uploadprogresscontainer" class="hidden">
    <div id="uploadprogress"></div>
  </div>

  <div id="menubar" class="hidden menubar" style="-webkit-app-region: drag">
    <!-- handle to drag the window in electron -->
    <nav style="-webkit-app-region: no-drag">
      <!-- disable window dragging here to regain control -->
      <ul>
        <li class="nav_logo main" id="nav_logo_area">
          <span id="nav-logo" class="icon-empty icon">
            <div id="nav-logo_idle"></div>
            <div id="nav-loading"></div>
          </span>

          <ul class="nav-submenu" id="nav_recentpatches"></ul>
        </li>

        <li class="main">
          <div id="patchname" onclick="CABLES.CMD.UI.settings();"></div>
          <ul class="nav-submenu">
            <div id="savestates"></div>

            <li
              id="nav_patch_settings"
              class="nav_patch_settings"
              onclick="CABLES.CMD.UI.settings();"
            >
              Patch settings<span class="shortcut">[cmd_ctrl],</span>
            </li>

            <li class="divide"></li>
            <li id="nav_createBackup">Create Backup</li>
            <li id="nav_viewBackups">Backups</li>

            <li class="divide"></li>
            <li id="nav_patch_save">
              Save <span class="shortcut">[cmd_ctrl]S</span>
            </li>
            <li id="nav_patch_saveas">
              Clone Patch<span class="shortcut">[cmd_ctrl][shift]S</span>
            </li>
            <li id="nav_patch_export">Export</li>
            <li id="nav_patch_export_patch">Export - Patch</li>

            <li class="divide"></li>

            <li id="nav_patch_page" class="nav-sub-submenu nav_patch_page">
              View Patch Page
              <span class="icon icon-chevron-right"></span>
              <ul>
                <li><a id="nav_viewProjectLink">Open in new window</a></li>
                <li class="divide"></li>
                <li>
                  <a>Open on mobile:</a>
                  <div
                    id="patch_view_qr"
                    style="border: 10px solid white"
                  ></div>
                </li>
              </ul>
            </li>

            <li class="nav-sub-submenu nav_remote_viewer hidden">
              Remote Viewer
              <span class="icon icon-chevron-right"></span>
              <ul>
                <li><a id="nav_remoteViewerLink">Open in new window</a></li>
                <li class="divide"></li>
                <li>
                  <a>Open on mobile:</a>
                  <div
                    id="remote_view_qr"
                    style="border: 10px solid white"
                  ></div>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li class="nav_cables main">
          <span class="icon icon-1_25x icon-user"></span>
          <ul class="nav-submenu">
            <li id="nav_preferences">My Editor Preferences</li>
            <li id="nav_op_createOp">Code a new op</li>
            <li id="nav_op_patchOp">Patch a new op</li>
            <li class="divide"></li>
            <li id="nav_patch_add_opdir" class="hidden">
              Manage Op Directories
            </li>
          </ul>
        </li>

        <li class="main">
          <span class="icon icon-1_25x icon-cables_editor"></span>

          <ul class="nav-submenu">
            <li id="nav_welcome" class="hidden">Welcome</li>
            <li id="nav_filemanager">Files</li>
            <li id="nav_timeline">Timeline</li>
            <li id="nav_profiler">Profiler</li>
            <li id="nav_log">Log Console</li>
            <li id="nav_gpuprofiler">GPU Profiler</li>
            <li id="nav_patchanalysis">Patch Analysis</li>
            <li id="nav_uploadfile">Upload file</li>
            <li id="nav_search">
              Search <span class="shortcut">[cmd_ctrl]F</span>
            </li>
            <li id="nav_cmdplt">
              Command Palette <span class="shortcut">[cmd_ctrl]P</span>
            </li>
            <li id="nav_buildinfo">Build Info</li>
          </ul>
        </li>

        <li class="nav-item-help main">
          <span class="icon icon-1_25x icon-help"></span>

          <ul class="nav-submenu">
            <li id="nav_help_documentation">Documentation</li>
            <li id="nav_help_introduction">Introduction</li>
            <li id="nav_help_video">Video Tutorials</li>
            <li id="nav_help_tips">Tips</li>
            <li id="nav_help_keys">Keyboard shortcuts</li>

            <li class="divide"></li>
            <li id="nav_changelog">View Changelog</li>
          </ul>
        </li>

        <li id="nav-item-activity" class="main hidden">
          <span
            class="dot hidden"
            style="
              border-radius: 100%;
              width: 6px;
              height: 6px;
              background-color: red;
              z-index: 100;
              position: absolute;
              margin-left: -6px;
              margin-top: 0px;
            "
          ></span>
          <span class="icon icon-activity icon-1_25x"></span>
        </li>

        <li class="nav-item-offline hidden" id="nav-item-offline">
          <span
            class="icon-unplug icon tt"
            style="display: inherit; margin: -3px; background-color: red"
            data-tt="Connection problems detected"
          ></span>
        </li>

        <li
          class="nav-item-error hidden"
          id="nav-item-error"
          onclick="gui.find(':attention');gui.patchView.checkPatchErrors();"
        >
          <span
            id="nav-item-error-icon"
            class="icon-alert-triangle icon"
            style="display: inherit; margin: -3px"
          ></span
          >&nbsp;
        </li>
        <!-- <li class="nav-item-log " id="nav-item-log" onclick="CABLES.CMD.DEBUG.logConsole()" >
                    <span id="nav-item-log-icon" class="icon-logs icon" style="display:inherit;margin:-3px;"></span>&nbsp;
                </li> -->
        <li class="nav-item-bpReload hidden" id="nav-item-bpReload">
          <span
            id="nav-item-bpReload-icon"
            class="icon-refresh icon"
            style="
              display: inherit;
              margin: -3px;
              background-color: var(--color_port_array);
            "
          ></span
          >&nbsp;
        </li>
      </ul>
    </nav>
  </div>

  <div id="multiplayerbar" class="menubar" style="cursor: pointer">
    <div class="nav-clientlist" id="nav-clientlist"></div>
  </div>

  <div id="meta">
    <div id="metatabpanel" style="width: 100%; min-height: 400px"></div>

    <!-- <div id="splitterMeta" class="splitter">
            <a class="icon-x icon fright iconhover" style="position: absolute;z-index: 9999;right: 10px;margin-top: 10px;" onclick="gui.closeInfo();">.</a>
        </div> -->
  </div>

  <div id="options"></div>

  <div id="infoAreaContainer">
    <div id="infoArea" class=""></div>
  </div>

  <div id="infoAreaParam" class=""></div>

  <div id="infoAreaToggle" onclick="gui.bottomInfoArea.toggle();">
    <span class="icon icon-chevron-down"></span>
  </div>

  <form id="hiddenupload" class="hidden">
    <input
      id="hiddenfileElem"
      type="file"
      multiple
      accept="*"
      style="display: none"
      onchange="CABLES.fileUploader.handleFileInputUpload(this.files)"
    />
  </form>

  <form id="hiddenreupload" class="hidden">
    <input
      id="hiddenfileElemReupload"
      type="file"
      multiple
      accept="*"
      style="display: none"
      onchange="CABLES.fileUploader.handleFileInputReUpload(this.files)"
    />
  </form>

  <div class="tooltip hidden" id="cbltooltip"></div>

  <div id="uiperfcontainer">
    <a onclick="gui.uiProfiler.clear();" class="button">reset</a>
    <input
      id="uiPerfFilter"
      class="medium"
      placeholder="Filter"
      style="width: 50%"
      type="search"
      oninput="gui.uiProfiler.filter(this.value)"
    />
    <a onclick="gui.uiProfiler.hide();" class="button">close</a>
    <div id="uiperf"></div>
  </div>

  <div id="patchnavhelperBounds" class="hidden" onclick=""></div>
  <div id="patchnavhelperEmpty" class="hidden"></div>
</div>

<script id="meta_preview" type="text/x-handlebars-template">
  <style>
    .previewcontainer {
      cursor: pointer;
      padding: 10px;
      border-left: 1px solid #000;
      margin-bottom: 5px;
      position: relative;
      width: 100%;
    }

    .previewcontainer.paused canvas {
      opacity: 0.25;
    }

    .previewcontainer.paused:before {
      position: absolute;
      content: "paused";
      font-size: 20px;
      padding: 10px;
      color: red;
      z-index: 99999;
    }

    .activePreview {
      border-left: 1px solid #07f78c;
    }

    .previewcontainer canvas {
      transform: scale(1, -1);
    }

    .previewcontainer canvas {
      max-height: 200px;
    }

    .previewcontainer:hover {
      background-color: #000;
    }
  </style>

  <h3>Texture Preview {{numTextures}}</h3>

  <div
    style="display:flex;flex-flow: column-reverse;"
    id="meta_preview_textures"
  ></div>
</script>

<script id="meta_preview_texture" type="text/x-handlebars-template">
  <div
    id="preview{{tex.id}}"
    onclick="gui.patchView.centerSelectOp('{{tex.opid}}');"
    class="previewcontainer tt"
    data-tt="{{tex.title}} {{tex.size}}"
    data-sort="0"
  >
    <canvas
      id="preview_img_{{tex.id}}"
      style="transform:scale(1 -1)"
      class="bgPatternBright"
    ></canvas>
    <div>
      {{tex.title}}
      |
      <span id="activity{{tex.id}}"></span>
    </div>
  </div>
</script>

<script id="meta_profiler" type="text/x-handlebars-template">
  <div class="tabContentScrollContainer">
    <div>
      <h2>Profiler</h2>

      <a class="button" id="profilerstartbutton"><span
          class="icon icon-pie-chart"
        ></span>Start</a>

      <div id="profilerui" style="display:none" class="editor_spreadsheet">

        <a
          class="button-small"
          onclick="gui.corePatch().profiler.clear();gui.corePatch().cgl.profileData.heavyEvents=[];"
        >Reset</a>
        <a
          class="button-small"
          id="profiler_pause"
          onclick="gui.corePatch().profiler.togglePause();"
        >Pause</a>

        <br />
        <br />
        <div class="text-center">
          <a
            id="profilerTabOpsCum"
            class="tabActiveSubtab"
            data-info="file_source_patch"
          >Cumulated Ops</a>
          <a
            id="profilerTabOps"
            class="tabSubtab"
            data-info="file_source_patch"
          >Individual Ops</a>
          <a
            id="profilerTabSubpatches"
            class="tabSubtab"
            data-info="file_source_patch"
          >Subpatches</a>
          <a
            id="profilerTabPeaks"
            class="tabSubtab"
            data-info="file_source_patch"
          >Peaks</a>
          <a
            id="profilerTabEvents"
            class="tabSubtab"
            data-info="file_source_patch"
          >Events</a>
        </div>
        <br /><br />

        <div id="profilerdata"></div>
        <div id="profilerbar"></div>

        <div
          id="profilerlist"
          style="font-family:monospace;font-size:12px;"
        ></div>

        <br />
      </div>
    </div>
  </div>
</script>

<script id="uiDebug" type="text/x-handlebars-template">
  <h3>WebGL</h3>

  <table>
    <tr>
      <td valign="top">version:</td>
      <td>{{gl_ver}}</td>
    </tr>
    <tr>
      <td valign="top">renderer:</td>
      <td>{{gl_renderer}}</td>
    </tr>
  </table>
  <br /><br />

  <h3>SVG</h3>

  numOps:{{numOps}}
  <br />
  numSvgElements:{{numSvgElements}}
  <br />
  numVisibleOps:{{numVisibleOps}}
  <br />
  <br />

  <h3>Canvas</h3>
  <table>
    {{#each canvass}}
      <tr>
        <td>{{name}}</td>
        <td>{{width}}x{{height}}</td>
      </tr>
    {{/each}}
  </table>
  <br />
  <br />

  <h3>startup times</h3>
  <table>
    {{#each startup}}
      <tr>
        <td>{{time}}s</td>
        <td>{{title}}</td>
      </tr>
    {{/each}}
  </table>
</script>

<script id="op-doc-template" type="text/x-handlebars-template">
  <div class="op-doc">
    <base target="_blank" />
    <!-- open links in new window -->
    {{#if opDoc}}
      <p class="op-doc__name">{{opDoc.shortNameDisplay}}</p>
      <p class="">
        {{opDoc.name}}
        {{#if opDoc.oldVersion}} OLD {{/if}}
      </p>

      {{#if opDoc.summary}}
        <div class="op-doc__summary">{{md opDoc.summary}}</div>
      {{/if}}
      {{#if opDoc.hasScreenshot}}
        <img
          class="op-doc__screenshot"
          src="{{cablesUrl}}/op/screenshot/{{opDoc.name}}.png"
        />
      {{/if}}
      {{#if opDoc.content}}
        <div class="op-doc__description">
          {{md opDoc.content true "_blank"}}
        </div>
      {{/if}}
    {{/if}}
    <br /><br />
  </div>
</script>
<script
  id="op-doc-collection-template-extension"
  type="text/x-handlebars-template"
>
  <div id="opselect-layout" class="collection extension">
      {{#compare collectionInfo.numOps '==' 0}}
          <h2><i class="icon icon-book-open"></i>&nbsp;{{collectionInfo.shortName}} Extension</h2>
      {{else}}
          <h2><i class="icon icon-book-open"></i>&nbsp;{{collectionInfo.shortName}} Extension - {{collectionInfo.numOps}} ops</h2>
      {{/compare}}
      {{#if collectionInfo.teamName}}
          Maintained by Team <a target="_blank" href="{{cablesUrl}}{{collectionInfo.teamLink}}">{{collectionInfo.teamName}}</a><br/>
      {{/if}}
      {{#if opDoc.summary}}
          <div class="op-doc__summary">{{md opDoc.summary}}</div>
      {{/if}}
      {{#if opDoc.description}}
          <div class="op-doc__description">{{md opDoc.description}}</div>
      {{/if}}
      {{#if collectionInfo.teamLink}}
          <a target=\"_blank\" href="{{cablesUrl}}{{collectionInfo.teamLink}}" class="button-small">View team</a>
      {{/if}}
      <a target="_blank" href="{{cablesUrl}}/ops/{{collectionInfo.name}}" class="button-small">View ops in this namespace</a>
      {{#if collectionInfo.ops.length}}
          <br/><br/>
          {{#each collectionInfo.ops}}
              <img src="{{../cablesUrl}}/api/op/layout/{{.}}"/>
          {{/each}}
      {{/if}}
  </div>
</script>
<script
  id="op-doc-collection-template-teamnamespace"
  type="text/x-handlebars-template"
>
  <div id="opselect-layout" class="collection teamnamespace">
      {{#compare collectionInfo.numOps '==' 0}}
          <h2><i class="icon icon-book-open"></i>&nbsp;{{collectionInfo.shortName}}</h2>
      {{else}}
          <h2><i class="icon icon-book-open"></i>&nbsp;{{collectionInfo.shortName}} - {{collectionInfo.numOps}} ops</h2>
      {{/compare}}
      {{#if collectionInfo.teamName}}
          Maintained by Team <a target="_blank" href="{{cablesUrl}}{{collectionInfo.teamLink}}">{{collectionInfo.teamName}}</a><br/>
      {{/if}}
      {{#if opDoc.summary}}
          <div class="op-doc__summary">{{md opDoc.summary}}</div>
      {{/if}}
      {{#if opDoc.description}}
          <div class="op-doc__description">{{md opDoc.description}}</div>
      {{/if}}
      {{#if collectionInfo.teamLink}}
          <a target=\"_blank\" href="{{cablesUrl}}{{collectionInfo.teamLink}}" class="button-small">View team</a>
      {{/if}}
      <a target="_blank" href="{{cablesUrl}}/ops/{{collectionInfo.name}}" class="button-small">View ops in this namespace</a>
      {{#if collectionInfo.ops.length}}
          <br/><br/>
          {{#each collectionInfo.ops}}
              <img src="{{../cablesUrl}}/api/op/layout/{{.}}"/>
          {{/each}}
      {{/if}}
  </div>
</script>

<script id="op_add_dependency_file" type="text/x-handlebars-template">
  <div id="addopdependency_file_{{viewId}}" class="addopdependency">
    Upload a javascript library to use it in your op&nbsp;&nbsp;&nbsp;<a
      class="button-small"
      target="_blank"
      href="{{docsUrl}}/docs/5_writing_ops/dev_libraries/dev_libraries"
    ><span class="nomargin icon icon-1_25x icon-help"></span></a><br />
    <input type="hidden" name="depType" value="commonjs" />
    <input class="depSrc upload" type="text" readonly disabled />
    <a class="button upload"><span
        class="icon icon-plus-circle icon-1_25x"
      ></span>Select file</a><br />
    <div class="exportName hidden">Export as:
      <input type="text" value="" /></div>
    Type of library:
    <select name="type" class="type">
      <option value="commonjs">Common JS</option>
      <option value="module">JS Module</option>
    </select><br />
    <a class="button add">Add</a>
    <input class="hidden" type="file" accept=".js,application/javascript" />
  </div>
</script>
<script id="op_add_dependency_url" type="text/x-handlebars-template">
  <div id="addopdependency_url_{{viewId}}" class="addopdependency">
    Load a javascript library via URL to use in your op&nbsp;&nbsp;&nbsp;<a
      class="button-small"
      target="_blank"
      href="{{docsUrl}}/docs/5_writing_ops/dev_libraries/dev_libraries"
    ><span class="nomargin icon icon-1_25x icon-help"></span></a><br />
    <input type="hidden" name="depType" value="commonjs" />
    <input class="depSrc" type="text" />
    <div class="exportName hidden">Export as:
      <input type="text" value="" /></div>
    <br />
    Type of library:
    <select name="type" class="type">
      <option value="commonjs">Common JS</option>
      <option value="module">JS Module</option>
    </select><br />
    <a class="button add">Add</a>
  </div>
</script>
<script id="op_add_dependency_npm" type="text/x-handlebars-template">
  <div id="addopdependency_npm_{{viewId}}" class="addopdependency">
    Add any NPM to your op&nbsp;&nbsp;&nbsp;<a
      class="button-small"
      target="_blank"
      href="{{docsUrl}}/docs/5_writing_ops/dev_libraries/dev_libraries"
    ><span class="nomargin icon icon-1_25x icon-help"></span></a><br />
    <input type="hidden" name="depType" value="npm" />
    <input class="depSrc" type="text" placeholder="@cables/cables" />
    <a class="button add">Add</a>
  </div>
</script>
<script id="op_add_dependency_op" type="text/x-handlebars-template">
  <div id="addopdependency_op_{{viewId}}" class="addopdependency">
    <div class="warning-error warning-error-level1 hidden">Invalid op-name</div>
    Make you op inherit dependencies from another op&nbsp;&nbsp;&nbsp;<a
      class="button-small"
      target="_blank"
      href="{{docsUrl}}/docs/5_writing_ops/dev_libraries/dev_libraries"
    ><span class="nomargin icon icon-1_25x icon-help"></span></a><br />
    <input type="hidden" name="depType" value="op" />
    <input class="depSrc" type="text" placeholder="Ops.Gl.MainLoop" />
    <a class="button add">Add</a>
  </div>
</script>
<script id="op_add_dependency_corelib" type="text/x-handlebars-template">
  <div id="addopdependency_corelib_{{viewId}}" class="libselect addopdependency">
      Add a cables core library to your op&nbsp;&nbsp;&nbsp;<a class="button-small" target="_blank" href="{{docsUrl}}/docs/5_writing_ops/dev_libraries/dev_libraries"><span class="nomargin icon icon-1_25x icon-help"></span></a><br/>
      <input type="hidden" name="depType" value="corelib"/>
      <select class="bigsel depSrc" id="{{viewId}}_addcorelib">
          <option value="">---</option>
          {{#each coreLibs}}
              <option value="{{.}}">{{.}}</option>
          {{/each}}
      </select><br/>
      <a class="button add">Add</a>
  </div>
</script>
<script id="op_add_dependency_lib" type="text/x-handlebars-template">
  <div id="addopdependency_lib_{{viewId}}" class="libselect addopdependency">
    Add a lib from the cables library to your op&nbsp;&nbsp;&nbsp;<a
      class="button-small"
      target="_blank"
      href="{{docsUrl}}/docs/5_writing_ops/dev_libraries/dev_libraries"
    ><span class="nomargin icon icon-1_25x icon-help"></span></a><br />
    <input type="hidden" name="depType" value="lib" />
    <select class="bigsel depSrc" id="{{viewId}}_addoplib">
      <option value="">---</option>
      {{#each libs}}
        <option value="{{url}}">{{#if isAssetLib}}patch file -
          {{/if}}{{name}}</option>
      {{/each}}
    </select><br />
    <a class="button add">Add</a>
  </div>
</script>

<script id="op_select" type="text/x-handlebars-template">
  <div class="opsearch">
    <!-- <div id="optree" class="optree"></div> -->
    <div id="searchinfo" class="searchinfo"></div>
    <!-- <div id="closearea" onclick="gui.closeModal();" style="width:100px;height:50px;position: absolute;left:500px;height:100px;width:500px;"></div> -->

    <div class="opselectclose">
      <a class="icon-x icon icon-1_5x" onclick="gui.pressedEscape();"></a>
    </div>

    <header>
      <input
        id="opsearch"
        class="opsearchInput notIgnoreEscape"
        placeholder="Search for op"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        type="search"
      />
      <br />
      <span
        style="margin-top:6px;position:absolute;font-size:13px;opacity:0.35;"
        id="realsearch"
      ></span>
    </header>

    <style id="search_style"></style>

    <div class="searchbrowserContainer" id="searchbrowserContainer">
    </div>
  </div>
</script>

<script id="op_select_ops" type="text/x-handlebars-template">

  <div class="searchbrowser">

      {{#each ops}}
      <div id="result_{{id}}"
          class="searchresult clickable hidden searchable {{#if notUsable}}not-usable{{/if}} {{#if isCollection }}collection{{/if}}"
          data-opname="{{name}}"
          data-item-type="{{type}}"
          onclick="gui.opSelect().selectOp('{{ name }}')"
          ondblclick="gui.opSelect().addOp('{{name}}', false, '{{type}}');"
          style="{{#if old}}opacity:0.5{{/if}}">
              <div class="button fright addbutton" style="margin-top:10px;" >{{buttonText}}</div>

              <a>
                  {{#if notUsable}}
                      <span class="icon icon-x"></span>
                  {{else}}
                      {{#if userOp }}<span class="icon icon-user"></span>{{/if}}
                      {{#if devOp }}<span class="icon icon-tool"></span>{{/if}}
                      {{#if patchOp }}<span class="icon icon-op"></span>{{/if}}
                      {{#if isTeamNamespace }}<span class="icon icon-users"></span>{{/if}}
                      {{#if isExtension }}<span class="icon icon-book-open"></span>{{/if}}
                  {{/if}}
                  <span class="shortname {{ nscolor }}">{{shortName}}</span>
                  {{oldState}}
                  {{#if old}}OLD{{/if}}
                  <span class="namespace" onClick="gui.opSelect().searchFor('{{nameSpace}}');">{{nameSpace}}
                  </span>{{isFunction}}

                  {{#if notUsable}}<div class="summary warning">NOT USABLE - {{#each notUsableReasons}}{{.}}{{/each}}</div>{{else}}<div class="summary">{{summary}}&nbsp;</div>{{/if}}
              </a>
          </div>
      {{/each}}


    <div id="search_startType" class="hidden">
        <div class="padded text-center">
            <br/>
            {{{texts.opselect_intro}}}
            {{#if patchOps}}
              <br/><br/>
              <a class="button button-small" onclick="gui.opSelect().searchFor('Ops.Patch.P'+gui.project().shortId);">{{patchOps}} patch ops</a>
            {{/if}}
        </div>
    </div>

    <div id="search_startTypeMore" class="hidden">
        <div class="padded text-center">
            <br/>
            {{{texts.opselect_typemore}}}
        </div>
    </div>

    <div id="search_noresults" class="hidden">
        <div class="padded text-center">
            <br/>
            {{{texts.opselect_notfound}}}
        </div>
    </div>
  </div>
  <div id="opOptions" class="opOptions">.</div>
</script>

<script id="op_select_sugggest" type="text/x-handlebars-template">

  <h2 style="margin-top:0px;">Suggestions</h2>


  {{#if ops}}
  <h3>Ops</h3>
      {{#each ops}}
          <a class="opLayoutButton" onclick="gui.opSelect().addOp('{{.}}');">
              {{opLayout .}}
          </a><br/>
      {{/each}}
  {{/if}}

  {{#if vizops}}
      <h3>Visualize</h3>
      {{#each vizops}}
          <a class="opLayoutButton" onclick="gui.opSelect().addOp('{{.}}');">
              {{opLayout .}}
              </a><br/>
      {{/each}}
  {{/if}}


  {{#if link}}
  <br/>

      <a class="button button-icon" onclick="CABLES.CMD.PATCH.addLinkReroute();">
          <span class="icon icon-git-commit-horizontal"></span>Reroute
      </a>

  {{/if}}

  <h3>Variables</h3>

  <span id="opselect_createTrigger">
      <a class="button-small" onclick="CABLES.CMD.PATCH.createTriggerSendReceive();">Create trigger send/receive</a>
      <br/>
      <a class="button-small" id="replaceLinkTriggerExists" onclick="CABLES.CMD.PATCH.replaceLinkTriggerReceiveExist();">Receive existing trigger send!</a>
      <br/>
  </span>

  <span id="opselect_createTriggerExists">
      <a class="button-small" id="createLinkTriggerExists" onclick="CABLES.CMD.PATCH.createTriggerSendReceiveExist();">TRIGGER SEND OR RECEIVE</a>
      <br/>
  </span>

  {{#compare port.direction '==' '0' }}
  <span id="opselect_createVar">
      <a class="button-small" onclick="CABLES.CMD.PATCH.createAutoVariable();">Create a variable</a>
      <br/>
      <a class="button-small" id="createLinkVariableExists" onclick="CABLES.CMD.PATCH.createLinkVariableExist();">Get variable</a>
      <br/>
  </span>
  {{/compare}}

  {{#compare port.direction '==' '1' }}
  <span id="opselect_createVar">
      <a class="button-small" onclick="CABLES.CMD.PATCH.createAutoVariable();">Create a variable</a>
      <br/>
      <a class="button-small" id="createLinkVariableExists" onclick="CABLES.CMD.PATCH.createLinkVariableExist();">Set variable</a>
      <br/>
      <a class="button-small" id="createLinkTriggerVariable" onclick="CABLES.CMD.PATCH.createLinkVariableExist(true);">Trigger variable</a>
      <br/>
  </span>
  {{/compare}}

  <span id="opselect_replaceVar">
      Replace link with:
      <a class="button-small" onclick="CABLES.CMD.PATCH.replaceLinkVariable();">New variable</a>
      <br/>
      <a class="button-small" id="replaceLinkVariableExists" onclick="CABLES.CMD.PATCH.replaceLinkVariableExist();">Existing variable</a>
      <br/>
  </span>

  <br/>
</script>

<script id="params_convert" type="text/x-handlebars-template">
  <div class="panel">

    <h2>{{converterName}}</h2>
    <br />
    <i id="converterprogress" class="hidden">Working....</i>

    <form id="converterform" onsubmit="return false;">

      {{#compare converterId "==" "duplicate"}}
        <div>
          <table>
            <tr>
              <td>New Filename</td>
              <td>
                <input
                  style="width: 60%"
                  type="text"
                  name="newName"
                  value="{{fileName}}"
                  autofocus
                />
              </td>
            </tr>
          </table>
        </div>
        <br />
      {{/compare}}

      {{#compare converterId "==" "rename"}}
        <div>
          <table>
            <tr>
              <td>New Filename</td>
              <td>
                <input
                  style="width: 60%"
                  type="text"
                  name="newName"
                  value="{{fileName}}"
                  autofocus
                />
              </td>
            </tr>
          </table>
        </div>
        <br />
      {{/compare}}

      {{#compare converterId "==" "gltf2draco"}}

        <table>
          <tr>
            <td>Compression Level [0-10]<br /><br /></td>
            <td><input name="compressionLevel" value="6" /></td>
          </tr>

          <tr>
            <td>Quantize Position Bits</td>
            <td><input name="quantizePositionBits" value="14" /></td>
          </tr>
          <tr>
            <td>Quantize Normal Bits</td>
            <td><input name="quantizeNormalBits" value="10" /></td>
          </tr>
          <tr>
            <td>Quantize Texcoord Bits</td>
            <td><input name="quantizeTexcoordBits" value="12" /></td>
          </tr>
          <tr>
            <td>Quantize Color Bits</td>
            <td><input name="quantizeColorBits" value="8" /></td>
          </tr>
          <tr>
            <td>Quantize Generic Bits</td>
            <td><input name="quantizeGenericBits" value="12" /></td>
          </tr>
          <tr>
            <td>Unified Quantization</td>
            <td>
              <select name="unifiedQuantization">
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </td>
          </tr>
        </table>

        <br />

      {{/compare}}

      {{#compare converterId "==" "pcconv"}}

        <div>
          <table>
            <tr>
              <td>Center Points</td>
              <td>
                <select name="doCenter">
                  <option value="false">false</option>
                  <option value="true">true</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Reduce Points Num</td>
              <td>
                <input name="reduce" value="0" />
                <br />0 - do not reduce
              </td>
            </tr>
          </table>
        </div>

      {{/compare}}

      <a
        class="button"
        onclick="gui.converterStart('{{projectId}}','{{fileId}}','{{converterId}}')"
      ><span class="icon icon-refresh"></span>Start: {{converterName}}</a>
      <br /><br />

    </form>

  </div>
  <div class="modalScrollContent hidden" id="converteroutput">

  </div>
  <br />
  <a id="modalClose" class="hidden bluebutton">Close</a>
</script>

<script id="params_keys" type="text/x-handlebars-template">
  <div class="panel">

    <a
      class="button-small icon-linear"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_LINEAR);"
    >&nbsp;Linear</a>
    <a
      class="button-small icon-absolut"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_ABSOLUTE);"
    >&nbsp;Absolute</a>

    {{numKeys}}
    keys

    <br /><br />

    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_SIN_IN);"
    ><span class="icon icon-ease-cub-in"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_CUBIC_IN);"
    ><span class="icon icon-ease-cub-in"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_QUART_IN);"
    ><span class="icon icon-ease-cub-in"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_QUINT_IN);"
    ><span class="icon icon-ease-cub-in"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_EXPO_IN);"
    ><span class="icon icon-ease-cub-in"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_BACK_IN);"
    ><span class="icon icon-ease-cub-in"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_ELASTIC_IN);"
    ><span class="icon icon-ease-exp-in"></span></a>

    <br /><br />

    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_SIN_INOUT);"
    ><span class="icon icon-ease-cubic"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_CUBIC_INOUT);"
    ><span class="icon icon-ease-cubic"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_QUART_INOUT);"
    ><span class="icon icon-ease-cubic"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_QUINT_INOUT);"
    ><span class="icon icon-ease-cubic"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_EXPO_INOUT);"
    ><span class="icon icon-ease-cubic"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_BACK_INOUT);"
    ><span class="icon icon-ease-cubic"></span></a>

    <br /><br />

    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_SIN_OUT);"
    ><span class="icon icon-ease-cub-out"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_CUBIC_OUT);"
    ><span class="icon icon-ease-cub-out"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_QUART_OUT);"
    ><span class="icon icon-ease-cub-out"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_QUINT_OUT);"
    ><span class="icon icon-ease-cub-out"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_EXPO_OUT);"
    ><span class="icon icon-ease-cub-out"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_BACK_OUT);"
    ><span class="icon icon-ease-cub-out"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_ELASTIC_OUT);"
    ><span class="icon icon-ease-exp-out"></span></a>
    <a
      class="iconbutton"
      onclick="gui.timeLine().setSelectedKeysEasing(CABLES.EASING_BOUNCE_OUT);"
    ><span class="icon icon-ease-exp-out"></span></a>

  </div>
</script>

<script id="params_op_head" type="text/x-handlebars-template">

      <div class="selectable params">

          <a onclick="gui.opParams.opContextMenu(this)" class="tt icon icon-three-dots iconhover op-contextmenu info" data-info="More Options"></a>
          {{#if isBookmarked}}
              <a onclick="gui.bookmarks.add('{{op.id}}')" class="icon iconhover icon-bookmark-filled info toggle-bookmark-button" data-info="Add Bookmark"></a>
          {{else}}
              <a onclick="gui.bookmarks.add('{{op.id}}')" class="icon iconhover icon-bookmark info toggle-bookmark-button" data-info="Add Bookmark"></a>
          {{/if}}

          <div class="panel params_op_head panel_head">
              <!-- <span style="padding-left: 2px;font-size: 20px;font-weight: bold;">Op</span> -->
              <!-- <input class="medium info" id="opname" oninput="gui.opParams.setCurrentOpTitle(this.value);" value="{{optitle}}" type="search" data-info="op_title"> -->

              <a class="optitle" onclick="{{#if canEditOp}}CABLES.CMD.OP.renameOp(){{else}}CABLES.CMD.PATCH.setOpTitle(){{/if}}"><b>Op</b> {{optitle}} {{#if canEditOp}}<span class="editbutton"><i class="icon icon-edit"></i><span style="font-size:12px;">rename</span>{{/if}}</a>
  			<br/>
              <div style="max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:5px;">
              <a href="{{cablesDocsUrl}}/op/{{op.objName}}" class="{{colorClass}}" target="_blank"></i>&nbsp;{{op.objName}}</a>

              {{#if oldVersion}}
                  <a href="{{cablesDocsUrl}}/op/{{op.objName}}">- newer version available</a>
                  <a class="button-small" onclick="gui.patchView.replaceOpCheck('{{op.id}}','{{newestVersion.name}}')">Upgrade</a>
                  <br/>
              {{else}}
                  {{#if op.summary}} - {{op.summary}}{{/if}}
              {{/if}}
          </div>


          {{#if minified}}
          {{:else}}
              <div class="summary selectable">
              </div>
          {{/if}}


          <a href="{{cablesDocsUrl}}/op/{{op.objName}}" class="button-small"  target="_blank"> Documentation</a>
          {{#if hasExample}}
              <a href="{{cablesDocsUrl}}/op/example/{{op.objName}}" class="button-small"  target="_blank">Example</a>
          {{/if}}

          <a class="button-small button-icon tt" data-tt="manage op" id="parampanel_manage_op"><span class="icon icon-op"></span></a>

          {{#if canEditOp}}
              <a class="button-small button-icon tt info" data-info="[e] - edit op" data-tt="[e] - edit op " id="parampanel_edit_op"><span class="icon icon-edit"></span></a>
          {{/if}}




          {{#if op.crashed }}
              OP CRASHED
          {{/if}}

          {{#if op.isDeprecated }}
              <div class="warning" id="">
                  This operator is outdated.
                  {{#if op.isDeprecatedAlternative }}
                  <br/>
                  we recommend to use the new version: <a onclick="gui.scene().addOp('{{op.isDeprecatedAlternative}}');">{{ op.isDeprecatedAlternative }}</a>
                  {{/if}}
              </div>
              <br/><br/>
          {{/if}}

          {{#if opChanged}}
              <div>
                  op was changed on server
                  <a class="button-small button-icon tt" data-tt="manage op" id="parampanel_loadchangedop_{{op.opId}}"><span class="icon icon-refresh"></span> Reload</a>
              </div>
          {{/if}}

          {{#if op.uiAttribs.error }}

              <div class="warning-error warning-error-level2" id="options_error"  >
                  OLD ERROR MSG<br/>
                  <i>Error:</i> {{op.uiAttribs.error}}
              </div>
          {{/if}}

          {{#if op.uiAttribs.errors }}
              {{#each op.uiAttribs.errors}}
                  <div class="warning-error warning-error-level2" id="options_error"  >
                      OLD ERROR MSG<br/>
                      {{.}}<br/>
                  </div>
              {{/each}}
          {{/if}}

          <div id="op_params_uierrors"></div>

          {{#if op.enabled}}{{else}}
          <div id="uierror__disabled" class="warning-error warning-error-level0"><b>Hint: </b>Op is disabled</div>
      {{/if}}

          {{#if op.isExperimental }}
              <div class="warning-experimental" id=""><b>Warning: This operator is Experimental.</b><br/> You can play around with it, but a lot will change and it might stop working for you.</div>
          {{/if}}

          {{#if op.uiAttribs.warning }}
              <div class="warning" id="options_warning" >
                  <i>Warning:</i> {{op.uiAttribs.warning}}
              </div>
          {{/if}}

          {{#if op.uiAttribs.hint }}
              <div class="hint" id="options_hint" >
                  <i>Hint:</i> {{op.uiAttribs.hint}}
              </div>
          {{/if}}



      </div>
  </div>

  <div id="opparams" class="panel" style="padding:0px;
          {{#if op.enabled }}{{else}}opacity:0.3;{{/if}}
          ">
      <table>
</script>

<script id="params_op_foot" type="text/x-handlebars-template">

      </table>

  <div class="info " id="options_info" style="padding:0px;">
      {{op.uiAttribs.info}}
  </div>

  <br/>
  <div class="groupSpacer"><h3>Misc</h3></div>

  <div class="panel" >
      Comment:
      <textarea id="commentTextarea" style="height:60px;width:100%;" onInput="gui.opParams.setCurrentOpComment(this.value);" >{{op.uiAttribs.comment}}</textarea>

      <br/>
      <a onclick="gui.patchView.setOpColor('#07F78C')" style="background-color:#07F78C;" class="colorbutton"></a>
      <a onclick="gui.patchView.setOpColor('#F0D165')" style="background-color:#F0D165;" class="colorbutton"></a>
      <a onclick="gui.patchView.setOpColor('#f59259')" style="background-color:#f59259;" class="colorbutton"></a>
      <a onclick="gui.patchView.setOpColor('#dc5751')" style="background-color:#dc5751;" class="colorbutton"></a>
      <a onclick="gui.patchView.setOpColor('#db88ff')" style="background-color:#db88ff;" class="colorbutton"></a>
      <a onclick="gui.patchView.setOpColor('#5dc0fd')" style="background-color:#5dc0fd;" class="colorbutton"></a>
      <a onclick="gui.patchView.setOpColor(null)" style="background-color:#fff;" class="colorbutton icon-x icon"></a>

  </div>
  {{#if showDevInfos}}
      <br/>
      <div class="groupSpacer"><h3>Dev</h3></div>
      <div class="panel" >

          <table>
              <tr>
                  <td>op id</td>
                  <td><code>{{op.opId}}</code></td>
              </tr>
              <tr>
                  <td>op instance id </td>
                  <td><code>{{op.id}}</code></td>
              </tr>
              <tr>
                  <td>storage ref</td>
                  <td><code>{{op.storage.ref}}</code></td>
              </tr>
              <tr>
                  <td>subpatch</td>
                  <td><code>{{op.uiAttribs.subPatch}}</code></td>
              </tr>
              <tr>
                  <td>ui translate</td>
                  <td><code>{{op.uiAttribs.translate.x}},{{op.uiAttribs.translate.y}}</code></td>
              </tr>

              <!-- <tr>
                  <td>num instances</td>
                  <td><code>?</code></td>
              </tr> -->

          </table>

      </div>

      <div class="groupSpacer"><h3>Watch</h3></div>
      <div class="panel" >
          <span id="watchOpSerialized" tabindex="0" class="button">Serialized</span>
          <span id="watchOpUiAttribs" tabindex="0" class="button">UiAttribs</span>
          <span id="watchOpDocsJson" tabindex="0" class="button">OpDocs</span>

      </div>
  {{/if}}


  <br/><br/><br/>
</script>

<script id="params_ops" type="text/x-handlebars-template">
  <div class="panel">

    {{#if numOps}}
      <h3><a
          onclick="new CABLES.UI.FindTab(gui.mainTabs, ':selected');"
        >{{numOps}} ops selected</a></h3>
      {{#if mulSubs}}
        in multiple subpatches!
        <br />
      {{/if}}

      <hr />

      <a
        onclick="CABLES.CMD.PATCH.createOpFromSelection()"
        class="icon-button button-small"
        style="color: var(--color-special) !important;"
      ><span class="icon icon-subpatch icon-1_25x"></span>Create Op From
        Selection
      </a>
      <!-- <a onclick="CABLES.CMD.PATCH.createSubPatchFromSelection()" class="icon-button button-small "><span class="icon icon-subpatch icon-1_25x"></span>Create Subpatch</a> -->
      <br />
      <a
        onclick="CABLES.CMD.PATCH.createAreaFromSelection()"
        class="icon-button button-small"
      ><span class="icon icon-square icon-1_25x"></span>Create Area Around
        Selection</a>

      <hr />

      <a
        onclick="CABLES.CMD.PATCH.alignOpsLeft()"
        class="icon-button button-small info"
        data-info="Press A to align left"
      ><span class="icon icon-align-left icon-1_25x"></span>Align Left</a>
      <br />
      <a
        onclick="CABLES.CMD.PATCH.compressOps()"
        class="icon-button button-small info"
        data-info="Press shift+A to Compress Vertically"
      ><span class="icon icon-align-justify icon-1_25x"></span>Compress
        Vertically
      </a>
      <br />

      <hr />

      <a
        onclick="CABLES.CMD.PATCH.addSpaceX()"
        class="icon-button button-small"
      ><span class="icon icon-subpatch icon-1_25x"></span>Add space X</a>
      <br />
      <a
        onclick="CABLES.CMD.PATCH.addSpaceY()"
        class="icon-button button-small"
      ><span class="icon icon-square icon-1_25x"></span>Add space Y</a>

      {{#compare numOps "==" 2}}
        <br />
        <hr />
        <br />
        <a
          id="link_two_ops"
          onclick="CABLES.CMD.PATCH.linkTwoSelectedOps()"
          class="icon-button button-small"
        ><span class="icon icon-op icon-1_25x"></span><span
            class="icon icon-op icon-1_25x"
          ></span>Link two ops</a>
      {{/compare}}
      <br />

      <hr />
      Colorize:
      <br />
      <div style="margin-top:10px;">
        <a
          onclick="gui.patchView.setOpColor('#07F78C')"
          style="background-color:#07F78C;"
          class="colorbutton"
        ></a>
        <a
          onclick="gui.patchView.setOpColor('#F0D165')"
          style="background-color:#F0D165;"
          class="colorbutton"
        ></a>
        <a
          onclick="gui.patchView.setOpColor('#f59259')"
          style="background-color:#f59259;"
          class="colorbutton"
        ></a>
        <a
          onclick="gui.patchView.setOpColor('#dc5751')"
          style="background-color:#dc5751;"
          class="colorbutton"
        ></a>
        <a
          onclick="gui.patchView.setOpColor('#db88ff')"
          style="background-color:#db88ff;"
          class="colorbutton"
        ></a>
        <a
          onclick="gui.patchView.setOpColor('#5dc0fd')"
          style="background-color:#5dc0fd;"
          class="colorbutton"
        ></a>
        <a
          onclick="gui.patchView.setOpColor(null)"
          style="background-color:#fff;"
          class="colorbutton icon-x icon"
        ></a>
      </div>
      <br /><br /><br />

      {{#if showDevInfos}}{{/if}}

      <!-- <a onclick="CABLES.CMD.PATCH.deleteSelectedOps()" class="icon-button button-small info" data-info="Press del to delete ops"><span class="icon icon-trash icon-1_25x"></span>Delete Ops </a> -->

    {{else}}
      <h2>no ops selected</h2>
    {{/if}}

  </div>
</script>

<script id="params_ports_head" type="text/x-handlebars-template">
  <tr>
    <td colspan="11" class="panelhead" data-panelselector=".opports_{{dirStr}}">
      <div class="groupSpacer"><h3>{{title}}</h3></div>
    </td>
  </tr>
</script>

<script id="params_port_general" type="text/x-handlebars-template">

  {{#if port.uiAttribs.spaceBefore }}
      <tr>
          <td></td>
      </tr>
  {{/if}}

  {{#if groupSpacer}}
      <tr>
          <td colspan="11" >
              <div class="groupSpacer">
                  {{startGroup}}
              </div>
          </td>
      </tr>
  {{/if}}

  <tr id="tr_{{ dirStr }}_{{ portnum }}" class="paramport_{{panelid}}_{{port.id}} {{#if port.uiAttribs.hideParam}}hide {{/if}}{{#if port.uiAttribs.greyout }}greyedout{{/if}} {{#if port.uiAttribs.group}}op-port-group{{/if}} opportgroup_{{port.uiAttribs.group}} opports_{{ dirStr }}" data-portname="{{port.name}}"   onmouseover="gui.opDocs.showPortDoc('{{op.objName}}','{{port.name}}');">


      {{#if port.uiAttribs.multiPort}}
          <td></td>
      {{else}}
          <td class="portType_{{ port.type }} disp_{{port.uiAttribs.display}}">
              {{#if port.uiAttribs.isAnimated}}&nbsp;&nbsp;&nbsp;<span class="icon icon-diamond icon-0_75x"></span>{{/if}}
              {{#if port.uiAttribs.expose}}<span>&nbsp;&nbsp;E{{port.uiAttribs.order}}</span>{{/if}}
              {{#if port.uiAttribs.boundToVar}}<span>&nbsp;&nbsp;V</span>{{/if}}
          </td>
      {{/if}}
      <td class="port {{#if port.links}}_linked{{/if}}" style="{{#if port.uiAttribs.hidePort }}box-shadow:none !important;{{/if}}" id="portLineTitle_{{ dirStr }}_{{ portnum }}"  data-portname="{{port.name}}" >







          <span id="portTitle_{{ dirStr }}_{{ portnum }}" data-opid="{{op.id}}" data-portname="{{port.name}}" class="{{#if port.uiAttribs.hidePort}}{{else}}paramsPortTitleClickable{{/if}} {{#if port.uiAttribs.axis}}axis{{ port.uiAttribs.axis }}{{/if}}">
              {{#compare port.uiAttribs.display '==' 'buttons' }}
              {{else}}
                  {{#compare port.uiAttribs.display '==' 'button' }}
                  {{else}}
                      {{#if port.uiAttribs.title }}
                      <i>{{port.uiAttribs.title}}</i>
                      {{else}}
                          {{port.name}}


                      {{/if}}
                  {{/compare}}
              {{/compare}}
          </span>

          {{#compare port.type '!=' '1' }}
              <span id="portTitle_{{ dirStr }}_{{ portnum }}_reset" class="param_reset reset_hidden  clickable" data-click="resetOpValues" data-opid="{{op.id}}" data-portname="{{port.name}}" >
                  <span class="icon icon-undo icon-0_75x"></span>
              </span>
          {{/compare}}

          <!-- numberinput-val -->

          {{#if port.uiAttribs.colorPick }}
              <div class="button_colorpick fright" tabindex="0" id="watchcolorpick_{{ dirStr }}_{{ portnum }}_{{ panelid }}"></div>
          {{/if}}

      </td>
      <td class="">
          {{#if port.links}}
              {{#if port.direction }}
              </td><td  style="overflow: hidden;text-overflow:ellipsis">
                  <table>
                  {{#each port.links}}
                      <tr>
                          <td>
                              <a class="info icon-x icon iconhover" data-info="{{ ../texts.portUnlink }}" id="portdelete_{{ ../dirStr }}_{{ ../portnum }}" style="vertical-align:bottom"></a>
                              <a class="clickable paramsPortLink" data-click="centerSelectOp" data-op="{{portIn.op.id}}" >{{ portIn.op.name }}</a><br/>
                          </td>
                      </tr>
                  {{/each}}
                  </table>
                  {{else}}
                      </td><td>
                  {{#each port.links}}
                      <a class="info icon-x icon iconhover" data-info="{{ ../texts.portUnlink }}" id="portdelete_{{ ../dirStr }}_{{ ../portnum }}" style="vertical-align:bottom"></a>
                      <a class="clickable paramsPortLink"  data-click="centerSelectOp" data-op="{{portOut.op.id}}" >{{ portOut.op.name }}</a><br/>
                  {{/each}}
              {{/if}}
          {{/if}}
</script>

<script id="params_port_general_end" type="text/x-handlebars-template">

  </td>

  <td class="contextmenuarea">
  <!-- animation/variable button -->

  {{#if isInput}}
      {{#if port.links}}
      {{else}}
          {{#compare port.type '==' 1 }}
          {{else}}

              {{#compare port.uiAttribs.display '==' 'switch' }}
              {{else}}
                  {{#compare port.uiAttribs.display '==' 'dropdown' }}
                  {{else}}

                      {{#if port.uiAttribs.isAnimated}}
                          <span class="button-small button-icon info clickable" data-click="showAnim" data-opid="{{op.id}}" data-portname="{{port.name}}">
                              <span class="icon icon-timeline"></span>
                          </span>
                      {{/if}}

                  {{/compare}}
              {{/compare}}

          {{/compare}}

      {{/if}}


  {{/if}}

  <a class="icon-three-dots icon iconhover" style="opacity:0.6" id="port_contextmenu_{{dirStr}}_{{portnum}}_{{panelid}}" data-portid="{{port.id}}"></a>




  </td>
  </tr>
</script>

<script id="params_port_input" type="text/x-handlebars-template">




  {{#if port.uiAttribs.useVariable}}
          </td><td>
          Var
          <select id="portsetvar_{{ portnum }}" data-portid="{{port.id}}">
              {{#compare 'unknown' '==' port.uiAttribs.variableName }}
                  <option value="">UNKNOWN</option>
              {{/compare}}
              {{#each vars}}
                  <option {{#compare _name '==' ../port.uiAttribs.variableName }} SELECTED="SELECTED" {{/compare}} value="{{ _name }}">#{{_name}}</option>
              {{/each}}
          </select>

          {{#compare port.type '==' 5 }} <span class="value valuetext linkedValue monospace watchPort watchPortValue_{{ port.watchId }}_{{ panelid }}" >{{port.port.getValueForDisplay}}</span>{{/compare}}
          {{#compare port.type '==' 0 }} <span class="value valuetext linkedValue monospace watchPort watchPortValue_{{ port.watchId }}_{{ panelid }}" >{{port.port.getValueForDisplay}}</span>{{/compare}}
      </td>

      {{else}}
      {{#if port.links}}

          {{#compare port.type '==' 5 }} <span class="value valuetext linkedValue monospace watchPort watchPortValue_{{ port.watchId }}_{{ panelid }}" >{{port.port.getValueForDisplay}}</span>{{/compare}}
          {{#compare port.type '==' 0 }} <span class="value valuetext linkedValue monospace watchPort watchPortValue_{{ port.watchId }}_{{ panelid }}" >{{port.port.getValueForDisplay}}</span>{{/compare}}

          {{#compare port.uiAttribs.display '==' 'button' }}
              <span class="{{#if port.uiAttribs.buttonTitleClass }}{{port.uiAttribs.buttonTitleClass}}{{else}}button button-small{{/if}}" id="portbutton_{{ portnum }}_{{ panelid }}" >
                  {{#if port.uiAttribs.buttonTitle }}
                      {{port.uiAttribs.buttonTitle}}
                  {{else}}
                      {{#if port.uiAttribs.title }}{{port.uiAttribs.title}}{{else}}{{port.name}}{{/if}}
                  {{/if}}
              </span>
          {{/compare}}

      {{else}}

              {{#if port.uiAttribs.multiPort}}
                  </td><td>

                      {{#if port.uiAttribs.multiPort}}Multiport {{/if}}

                      <span class="button-small" id="multiport_toggleauto_{{op.id}}_{{port.name}}">Toggle</span>

                      {{#if port.uiAttribs.multiPortManual}}
                          manual
                          <span class="button-small button-icon" id="multiport_dec_{{op.id}}_{{port.name}}">-</span>
                          <span class="button-small button-icon" id="multiport_inc_{{op.id}}_{{port.name}}">+</span>
                      {{else}}
                          auto
                      {{/if}}
                  </td>
              {{/if}}

              {{#if port.uiAttribs.display}}

                  {{#compare port.uiAttribs.display '==' 'bool' }}
              </td><td>
                          <span id="portcheckbox_{{ portnum }}_{{ panelid }}" class="checkbox-container {{#compare port.value '==' true }}checkbox-active{{/compare}}{{#compare port.value '==' false }}checkbox-inactive{{/compare}}">
                              <span style="height:20px;width:20px;" class="ccheckbox icon icon-check"></span>
                          </span>
                      <input autocomplete="off" class="value hidden" id="portval_{{ portnum }}_{{ panelid }}" value="{{#if port.value }}true{{else}}false{{/if}}" style="display:none;"/>
                  {{/compare}}

                  {{#compare port.uiAttribs.display '==' 'buttons' }}
                      </td><td>
                          {{#each port.value}}
                              <span tabindex="0" class="button-small" id="portbutton_{{ ../portnum }}_{{ ../panelid }}_{{@key}}" data-title="{{.}}">{{.}}</span>
                          {{/each}}
                  {{/compare}}

                  {{#compare port.uiAttribs.display '==' 'button' }}
                  </td><td>
                      <span tabindex="0"  class="{{#if port.uiAttribs.buttonTitleClass }}{{port.uiAttribs.buttonTitleClass}}{{else}}button{{/if}}" id="portbutton_{{ portnum }}_{{ panelid }}" >
                          {{#if port.uiAttribs.buttonTitle }}
                              {{port.uiAttribs.buttonTitle}}
                          {{else}}
                              {{#if port.uiAttribs.title }}{{port.uiAttribs.title}}{{else}}{{port.name}}{{/if}}
                          {{/if}}
                      </span>
                  {{/compare}}
                  {{#compare port.uiAttribs.display '==' 'editor' }}
                  </td><td>
                      <a class="button-small" id="portedit_{{ dirStr }}_{{ portnum }}_{{ panelid }}" ><span class="icon icon-edit"></span>Edit</a>
                  {{/compare}}
                  {{#compare port.uiAttribs.display '==' 'spreadsheet' }}
                  </td><td>
                      <a class="button-small" id="portspreadsheet_{{ dirStr }}_{{ portnum }}_{{ panelid }}" ><span class="icon icon-edit"></span>Edit</a>
                  {{/compare}}


                  {{#compare port.uiAttribs.display '==' 'range' }}
                      </td><td>
                      <!-- new value input2 !!! -->
                      <div
                          class="numberinput valuesliderinput tabable"
                          id="portval_{{ portnum }}_{{ panelid }}-container"
                          data-portnum="{{ portnum }}"
                          data-panelid="{{ panelid }}"
                          data-opid="{{op.id}}"
                          data-portname="{{ port.name }}"
                          onmouseover="gui.showInfo(CABLES.UI.TEXTS.valueChangerHover);"
                          tabindex="0"
                          {{#if port.uiAttribs.min}}data-min="{{port.uiAttribs.min}}"{{/if}} {{#if port.uiAttribs.max}}data-max="{{port.uiAttribs.max}}"{{/if}}>

                          <span class="numberinput-display" id="numberinputDisplay_{{ port.watchId }}_{{ panelid }}">{{ port.value }}</span>
                          <input autocomplete="off" data-portname="{{port.name}}" class="numberinput-value hidden watchPort watchPortValue_{{ port.watchId }}_{{ panelid }}" id="portval_{{ portnum }}_{{ panelid }}" value="{{ port.value }}"/>
                      </div>
                  {{/compare}}

                  {{#compare port.uiAttribs.display '==' 'dropdown' }}
                      </td><td>
                          <select oninput="ele.byId('portval_{{ portnum }}_{{ panelid }}').value=this.value;ele.byId('portval_{{ portnum }}_{{ panelid }}').dispatchEvent(new Event('input'));">
                              {{#compare '' '==' port.value }}
                                  <option value="">...</option>
                              {{/compare}}

                              {{#each port.uiAttribs.values}}
                                  <option {{#compare this '==' ../port.value }} SELECTED="SELECTED" {{/compare}} value="{{ this }}">{{#if ../port.uiAttribs.showIndex}}{{@key}} - {{/if}}{{ this }}</option>
                              {{/each}}
                          </select>
                          <input type="hidden" class="value" id="portval_{{ portnum }}_{{ panelid }}" value="{{ port.value }}" />
                  {{/compare}}

                  {{#compare port.uiAttribs._variableSelect '==' true }}

                      {{#if port.value}}
                      &nbsp;
                          <a class="button-small button-icon" onclick="gui.find('#{{port.value}}')"><span class="icon icon-search"></span></a>

                          {{#compare port.uiAttribs._variableSelectGet '==' true }}
                              <a class="button-small button-icon" onclick="gui.find('set #{{port.value}}')"><span class="icon icon-search"></span>Set</a>
                          {{/compare}}
                      {{/if}}
                  {{/compare}}
                  {{#compare port.uiAttribs._triggerSelect '==' true }}

                      {{#if port.value}}
                          &nbsp;
                          <a class="button-small button-icon" onclick="gui.find('trigger {{port.value}}')"><span class="icon icon-search"></span></a>
                      {{/if}}
                  {{/compare}}

                  {{#compare port.uiAttribs.display '==' 'switch' }}
                      </td><td>
                          <input class="value hide" type="hidden" id="portval_{{ portnum }}_{{ panelid }}" style="width:40px;" value="{{port.value}}"/>
                          <div class="radioToggle" id="portSwitch_{{ portnum }}_{{ panelid }}">
                              {{#each port.uiAttribs.values}}
                                  <label tabindex="0" id="label_{{ @index }}">
                                      <input type="radio" name="radio_portval_{{ ../portnum }}_{{ ../panelid }}" value="{{ this }}"{{#compare this '==' ../port.value }} CHECKED="CHECKED" {{/compare}}>
                                      <span>{{ this }}</span>
                                  </label>
                              {{/each}}
                          </div>

                          {{#if port.uiAttribs.info}}
                          <br/>
                              {{port.uiAttribs.info}}
                          {{/if}}

                  {{/compare}}
                  {{#compare port.uiAttribs.display '==' 'readonly' }}
                  </td>
                  <td>
                      <span class="value monospace valuetext linkedValue">{{ port.value }}</span>
                  {{/compare}}
                  {{#compare port.uiAttribs.display '==' 'gradient' }}
                      </td>
                      <td>
                          <span class="button gradienteditbutton" onclick="const ge=new CABLES.GradientEditor('{{op.id}}','{{port.name}}',{'openerEle':this});ge.show();">
                              <span class="icon icon-edit"></span>Edit</span>
                  {{/compare}}
                  {{#compare port.uiAttribs.display '==' 'texture' }}
                      </td>
                      <td>
                          <a class="button-small button-icon clickable" data-click="addOpAndLink" data-opid="{{op.id}}" data-portname="{{port.name}}" ><span class="icon icon-plus-circle"></span></a>

                          {{#if port.uiAttribs.objType}}
                              <span class="objType tt" data-tt="Object type {{port.uiAttribs.objType}}">{{port.uiAttribs.objType}}</span>
                          {{/if}}

                      </td>
                  {{/compare}}
                  {{#compare port.uiAttribs.display '==' 'sg_vec' }}
                      </td>
                      <td>
                          <a class="button-small button-icon" onclick="gui.patchView.addOpAndLink('Ops.Team.ShaderGraph.Input','{{op.id}}','{{port.name}}');"><span class="icon icon-plus-circle"></span></a>
                      </td>
                  {{/compare}}
                  {{#compare port.uiAttribs.display '==' 'file' }}
                          {{#if openLocalFiles}}
                              <a class="icon icon-folder iconhover" onclick="CABLES.CMD.ELECTRON.openFileManager('{{port.value}}')"></a>
                          {{else}}
                              <a class="icon icon-external iconhover" href="{{ cablesUrl }}/asset/patches/?filename={{ port.value }}" target="_blank"></a>
                          {{/if}}
                          <a class="icon icon-download iconhover" href="{{ port.value }}" target="_blank" download></a>
                          <a class="icon icon-text-cursor-input iconhover" onclick="ele.byId('portFilenameButton_{{ portnum }}').classList.toggle('hidden');ele.byId('fileInputContainer_{{ portnum }}').classList.toggle('hidden');" target="_blank" ></a>
                      </td>
                      <td>
                          <span id="portFilenameButton_{{ portnum }}">
                              <span
                                  id="portFilename_{{ portnum }}"
                                  onclick="document.getElementById('portFilename_{{ portnum }}_src').innerHTML='';document.getElementById('fileInputContainer_{{ portnum }}').classList.remove('hidden');this.classList.add('hidden');CABLES.platform.showFileSelect('.portFileVal_{{ portnum }}',{{#if port.uiAttribs.filter}}{{json port.uiAttribs.filter}}{{else}}null{{/if}},'{{ port.op.id }}','portFileVal_{{ portnum }}_preview');"
                                  style="cursor:pointer;">[???]</span>

                              <span id="portFilename_{{ portnum }}_src"></span>
                          </span>

                          <span id="fileInputContainer_{{ portnum }}" class="hidden">
                              <input autocomplete="off" class="value filevalue portFileVal_{{ portnum }} watchPort watchPortValue_{{ port.watchId }}_{{ panelid }}" id="portval_{{ portnum }}_{{ panelid }}" value="{{ port.value }}" style="width:90%;display:inline-block;"/>
                          </span>


                  {{/compare}}
                  {{#compare port.uiAttribs.display '==' 'text' }}
                      </td><td>
                          <textarea class="value watchPort watchPortValue_{{ port.watchId }}_{{ panelid }} info" id="portval_{{ portnum }}_{{ panelid }}">{{port.value}}</textarea>
                  {{/compare}}
              {{else}}
                  {{#compare port.type '==' '5' }}
                          </td>
                      <td>
                      <!-- string -->
                      <input spellcheck="false" class="tabable value watchPort watchPortValue_{{ port.watchId }}_{{ panelid }}" data-portnum="{{ portnum }}" data-panelid="{{ panelid }}" id="portval_{{ portnum }}_{{ panelid }}" value="{{port.value}}" style="width:90%;"/>
                  {{/compare}}

                  {{#compare port.type '==' '1' }} </td><td>[trigger]
                  {{/compare}}
                  {{#compare port.type '==' 0 }}
                      </td><td>
                              <!-- new value input2 -->
                              <div
                                  tabindex="0"
                                  class="numberinput tabable valueinputtype-{{ port.uiAttribs.type }} {{#if port.uiAttribs.increment }}inc_int{{/if}}"
                                  data-portnum="{{ portnum }}"
                                  data-panelid="{{ panelid }}"
                                  data-opid="{{op.id}}"
                                  data-portname="{{ port.name }}"
                                  data-portname="{{ port.name }}"
                                  id="portval_{{ portnum }}_{{ panelid }}-container"

                                  onmouseover="gui.showInfo(CABLES.UI.TEXTS.valueChangerHover);">
                                  <span class="numberinput-display" id="numberinputDisplay_{{ port.watchId }}_{{ panelid }}">{{ port.value }}</span>
                                  <input autocomplete="off" class="numberinput-value hidden watchPort watchPortValue_{{ port.watchId }}_{{ panelid }} {{#if port.uiAttribs.increment }}inc_int{{/if}}" data-valuetype="{{ port.uiAttribs.type }}" id="portval_{{ portnum }}_{{ panelid }}" value="{{ port.value }}"/>
                              </div>
                          {{/compare}}
                          {{#compare port.type '==' 3}}
                              {{#if port.uiAttribs.multiPort}}
                              {{else}}
                                  </td><td>
                                      <span class="value valuetext watchPort watchPortValue_{{ port.watchId }}_{{ panelid }} inspectable" >Array{{#if port.uiAttribs.stride}}{{port.uiAttribs.stride}}{{/if}}</span>
                              {{/if}}
                          {{/compare}}
                          {{#compare port.type '==' 2}}
                      </td>
                      <td>
                          <span class="value valuetext watchPort watchPortValue_{{ port.watchId }}_{{ panelid }} inspectable" >
                              {{#if port.uiAttribs.objType}}
                                  <span class="objType tt" data-tt="Object type {{port.uiAttribs.objType}}">{{port.uiAttribs.objType}}</span>
                              {{/if}}
                          </span>
                  {{/compare}}
                  {{#compare port.type '==' 4}}

                  {{/compare}}
              {{/if}}
          {{/if}}
      {{/if}}
</script>

<script id="params_port_output" type="text/x-handlebars-template">

  <!--  --------- outputs ---------- -->
  {{#if port.links}}
      {{else}}
      </td><td>
  {{/if}}



  {{#compare port.type '==' 0 }}
      <span data-portname="{{port.name}}" data-opid="{{op.id}}" class="value valuetext portCopyClipboard watchPort linkedValue monospace watchPortValue_{{ port.watchId }}_{{ panelid }}" >
          {{port.port.getValueForDisplay}}
      </span>
  {{/compare}}

  {{#compare port.type '==' 5 }}
      <span data-portname="{{port.name}}" data-opid="{{op.id}}" class="value valuetext watchPort  portCopyClipboard linkedValue monospace watchPortValue_{{ port.watchId }}_{{ panelid }}">{{port.port.getValueForDisplay}}</span>
      <span class="button-small button-icon info" data-info="{{ texts.portObjectSnapshot }}" onclick="new CABLES.UI.TabPortObjectInspect('{{op.id}}','{{port.name}}');"><span class="icon icon-search"></span></span><br />
  {{/compare}}

  {{#compare port.type '==' 3 }}
      <span class="value valuetext watchPort watchPortValue_{{ port.watchId }}_{{ panelid }} inspectable" >Array </span>

      <span class="button-small button-icon info" data-info="{{ texts.portObjectSnapshot }}" onclick="gui.watchArray('{{op.id}}','{{port.name}}');"><span class="icon icon-align-justify"></span></span>

      <span class="button-small button-icon info" data-info="{{ texts.portObjectSnapshot }}" onclick="new CABLES.UI.TabPortObjectInspect('{{op.id}}','{{port.name}}');"><span class="icon icon-search"></span></span>
      <span class="button-small button-icon info" data-info="{{ texts.portObjectSnapshot }}" onclick="gui.opPortModal.showJsonStructure('{{op.id}}','{{port.name}}');"><span class="icon icon-settings"></span></span><br/>

      {{#if port.uiAttribs.multiPort}}
          <br>
          <span class="button-small" id="multiport_toggleauto_{{op.id}}_{{port.name}}">toggle</span>

          {{#if port.uiAttribs.multiPortManual}}
              manual
              <span class="button-small button-icon " id="multiport_dec_{{op.id}}_{{port.name}}">-</span>
              <span class="button-small button-icon " id="multiport_inc_{{op.id}}_{{port.name}}">+</span>
          {{else}}
              auto
          {{/if}}
      {{/if}}

  {{/compare}}
  {{#compare port.type '==' '2' }}

      {{#if port.links}}
          <br/>
          {{else}}
      {{/if}}

      {{#if port.uiAttribs.objType}}
          <span class="fleft" >
              <span class="objType tt" data-tt="Object type {{port.uiAttribs.objType}}">{{port.uiAttribs.objType}}</span>

          {{#compare port.uiAttribs.objType '==' 'texture' }}
              {{port.port.get.shortInfoString}}
              &nbsp;<span class="button-small button-icon info" data-info="Watch texture data" onclick="gui.watchArray('{{op.id}}','{{port.name}}');"><span class="icon icon-align-justify"></span></span>

              <a class="button-small button-icon"  onclick="gui.patchView.addOpAndLink(CABLES.UI.DEFAULTOPNAMES.defaultOpVizTexture,'{{op.id}}','{{port.name}}');"><span class="icon icon-eye"></span></a>
          {{/compare}}

          </span>
      {{/if}}

      {{#if port.uiAttribs.preview}}

      {{else}}
          <span class="value valuetext watchPort watchPortValue_{{ port.watchId }}_{{ panelid }} inspectable" >
          </span>
          <span class="button-small button-icon info" data-info="{{ texts.portObjectSnapshot }}" onclick="new CABLES.UI.TabPortObjectInspect('{{op.id}}','{{port.name}}');"><span class="icon icon-search"></span></span>
          <span class="button-small button-icon info" data-info="{{ texts.portObjectSnapshot }}" onclick="gui.opPortModal.showJsonStructure('{{op.id}}','{{port.name}}');"><span class="icon icon-settings"></span></span><br/>
      {{/if}}
  {{/compare}}
</script>

<script id="patch_summary" type="text/x-handlebars-template">
      <div class="panel params_op_head panel_head patch_summary">

          <h2 class="nomargin" style="margin-bottom:10px !important;">

              {{#if isTrustedPatch}}{{else}}<span class="icon icon-ban tt" data-tt="no write access"></span>{{/if}}

              {{#compare project.summary.visibility '==' 'unlisted'}}<span class="tt icon icon-eye" data-tt="unlisted patch"></span>{{/compare}}
              {{#compare project.summary.visibility '==' 'view_only'}}<span class="tt icon icon-eye" data-tt="view only patch"></span>{{/compare}}
              {{#compare project.summary.visibility '==' 'private'}}<span class="tt icon icon-lock" data-tt="private patch"></span>{{/compare}}
              {{#compare project.summary.visibility '==' 'public'}}<span class="tt icon icon-globe" data-tt="public patch"></span>{{/compare}}
              <b style="color:var(--color-13)">
                  {{#if frontendOptions.showSetProjectTitle }}
                      {{#if project.summary.allowEdit }}
                          <a onclick="gui.patchView.store.showModalTitleDialog()">{{project.summary.title}}</a>
                      {{else}}
                          {{project.summary.title}}
                      {{/if}}
                  {{else}}
                      {{project.summary.title}}
                  {{/if}}
              </b>{{#if project.summary.owner.username }} by <a target="_blank" href="{{cablesUrl}}/user/{{project.summary.owner.username}}">{{project.summary.owner.username}}{{/if}}</a>
          </h2>


          {{#if project.summary.description}}
              {{md project.summary.description}}
              <br/><br/>
          {{/if}}


          {{#if project.summary.licence}}
              {{#compare port.uiAttribs.display '!=' 'none' }}
                  {{#compare project.summary.licence.name '!=' 'No licence chosen' }}
                      <b>Licence</b>:
                      {{#if project.summary.licence.link}}
                          <a href="{{project.summary.licence.link}}" class="link" target="_blank">{{project.summary.licence.name}}</a>
                      {{else}}
                          {{project.summary.licence.name}}
                      {{/if}}
                      <br/>{{project.summary.licence.description}}
                      <br/><br/>
                  {{/compare}}
              {{/compare}}
          {{/if}}

          {{#if project.teams}}
              Teams:
              {{#each project.teams}}
                  {{#unless @first}}, {{/unless}}
                  <a href="{{../cablesUrl}}{{link}}" target="_blank" class="link">{{name}}</a>
              {{/each}}
              <br/><br/>
          {{/if}}
          {{#if project.summary.patchLists}}
              Lists:
              {{#each project.summary.patchLists}}
                  {{#unless @first}}, {{/unless}}
                  <a href="{{../cablesUrl}}{{link}}" target="_blank" class="link">{{name}}</a>
              {{/each}}
              <br/><br/>
          {{/if}}

          {{#if project.summary.exampleForOps }}
              Op Example patch for:<br/>
              {{#each project.summary.exampleForOps}}
                  <a target="_blank" href="{{../cablesUrl}}/op/{{.}}"> {{opLayout . }}</a>
              {{/each}}
              <br/><br/>
          {{/if}}


          {{#if project.summary.isTest }}
              <a target="_blank" href="{{cablesUrl}}/tests/{{project.shortId}}" class="button-small">Run Test </a>
              <br/><br/>
          {{/if}}

          <div>
              {{#if frontendOptions.hasCommunity}}
                  <a class="iconbutton info" aria-label="settings" id="btn_patch_settings" data-info="summary_settings"><span class="icon icon-settings"></span></a>
              {{/if}}
              <a class="iconbutton info" aria-label="analyze patch"  id="btn_analyze_patch" data-info="summary_analyze"><span class="icon icon-pie-chart"></span></a>

              {{#if frontendOptions.hasCommunity}}
                  <a class="iconbutton" id="btn_toggle_patch_like" aria-label="favs"><span class="icon icon-heart{{#if project.summary.isFav}}-fill{{/if}}"></span>{{project.summary.numFavs}}</a>
              {{/if}}
              {{#if frontendOptions.hasCommunity}}
                  <a class="iconbutton" target="_blank" aria-label="open in new window" href="{{cablesUrl}}/p/{{project.shortId}}"><span class="icon icon-external"></span></a>
              {{/if}}
              {{#if frontendOptions.openLocalFiles}}
                  <a class="iconbutton info" id="btn_patch_opendir" aria-label="open folder" data-info="electron_openfolder"><span class="icon icon-folder"></span></a>
              {{/if}}
          </div>

      </div>



  {{#if sameHost}}
  {{else}}
      <div class="warning-error warning-error-level0">
          Patch was last saved on a different environment: <a class="link" href="{{patchHost}}" target="top">{{patchHost}}</a>
      </div>
  {{/if}}
</script>

<script id="sc_userlist" type="text/x-handlebars-template">
  <div class="sc-userlist">
  {{#each clients}}
      {{#if isRemoteClient}}
          <div class="tt item remote-client" data-client-id="{{clientId}}" data-tt="{{username}}">
              <div style="background-image:url({{../cablesurl}}/api/avatar/{{userid}});" class="avatar"></div>
              {{#if platfrom}}
                  {{#if platform.isMobile}}
                      <div class="greyicon"><span class="icon icon-smartphone icon-0_75x"></span></div>
                  {{else}}
                      <div class="greyicon"><span class="icon icon-remoteviewer icon-0_75x"></span></div>
                  {{/if}}
              {{else}}
                  <div class="greyicon"><span class="icon icon-remoteviewer icon-0_75x"></span></div>
              {{/if}}
          </div>
      {{else}}
          <div class="tt item" data-client-id="{{clientId}}" data-tt="{{username}}">
              <!-- <div class="cursorcolor" style=""></div> -->

              <div style="background-image:url({{../cablesurl}}/api/avatar/{{userid}});" class="avatar"></div>
              <div class="piloticon"><span class="icon icon-edit icon-0_75x"></span></div>
              <div class="followicon"><span class="icon icon-eye icon-0_75x"></span></div>
              <div class="followingicon"><span class="icon icon-eye"></span></div>
          </div>
      {{/if}}
  {{/each}}
  </div>
  <div class="sc-options">
  {{#if multiplayerCapable}}
      <span class="tt button-small loading-button" data-tt="Waiting for patch synch">Loading...</span>
      <!--
      <span class="tt button-small start-button" data-tt="Start multiplayer session">Start Multiplayer</span>
      <span class="tt button-small join-button" data-tt="Join multiplayer session">Join</span>
      <span class="tt button-small leave-button" data-tt="Leave multiplayer session">Leave</span>
      -->
  {{/if}}
  {{#if showMoreOptions}}
      <a class="tt icon icon-three-dots iconhover more-options" data-tt="More Options"></a>
  {{/if}}
  </div>
</script>

<script id="select_project" type="text/x-handlebars-template">
  <div class="projectsearch">

    <div style="padding-left:25px;padding-right:25px;">
      <input
        id="projectsearch"
        class="medium info"
        placeholder="filter patches"
      />
    </div>

    <br />
    <style id="search_style"></style>

    <div class="projectsearchresults">
      {{#each projects}}
        <div
          class="thumbcont searchresult searchable"
          data-projid="{{_id}}"
          data-index="{{name}}"
          onclick="document.location.href='#/project/{{_id}}'"
        >
          <div
            style="background-color:black;width:180px;height:100px;background-image:url(/project/{{_id}}/screenshot.png);background-repeat:no-repeat;background-size:100%;background-position:center center;"
          ></div>
          <div class="title">
            {{name}}

            {{#if isPrivate}}
              &nbsp;<i class="icon icon-lock"></i>
            {{/if}}

          </div>
        </div>
      {{/each}}
    </div>

  </div>
</script>

<script id="suggestions" type="text/x-handlebars-template">

  {{#if showSelect}}<div id="suggestionOpSelect" class="opSelect" onclick="CABLES.UI.suggestions.showSelect();" >+</div>{{/if}}
  {{#each suggestions}}
      <div class="suggestion {{#if recommended}}recommended-suggestion{{/if}}" id="suggestion{{id}}" onClick="CABLES.UI.suggestions.action({{id}});" style="transform:rotate({{rot}}deg);margin-left:{{left}}px;margin-top:{{top}}px;transform-origin:center left;">

          {{#if classname}}
              <span class="{{classname}}">◼</span>
          {{/if}}

          {{shortName}}
          {{#if isBoundToVar}}[##]{{/if}}
          {{#if isAnimated}}[/\]{{/if}}
      </div>
  {{/each}}
</script>

<script id="tab_chat" type="text/x-handlebars-template">
  <div class="tabContentScrollContainer">

    <div id="netactivity">
      Traffic - In:
      <span id="netactivityIn"></span>
      - Out:
      <span id="netactivityOut"></span>
    </div>
    <h3>Clients</h3>
    <div id="chat-clientlist"></div>

    <hr />
    <h3>Chat</h3>
    <div id="chatmsgs"></div>
    <input type="text" id="newchatmsg" />
    <a
      onclick="gui.socket.chat.send(document.getElementById('newchatmsg').value);document.getElementById('newchatmsg').value='';"
      class="button"
    >send</a>
  </div>
</script>

<script id="chat_clientlist" type="text/x-handlebars-template">
  <table>
    {{#each clients}}
      {{#if isRemoteClient}}{{else}}
        <tr>
          <td>
            <span
              style="display:inline-block;width:12px;height:12px;border-radius:20px;background-color:rgb({{color.rb}},{{color.gb}},{{color.bb}});"
            ></span>
          </td>
          <td>
            {{username}}
          </td>
          <td>
            {{#if isMe}} (me) {{/if}}
            {{#if lost}}timeout??{{/if}}
          </td>
        </tr>
      {{/if}}
    {{/each}}
  </table>
</script>

<script id="tab_electron_opdirs" type="text/x-handlebars-template">
  <div class="tabContentScrollContainer">
    <h2>Op Directories</h2>
    Manage directories from where to pick Ops in this project.
    <br /><br />
    If multiple Ops with the same name exist,<br />
    the Op will be loaded from the directory higher on this list.
    <br /><br />
    <a
      id="addOpProjectDir"
      class="button-small button-icon tt info"
      data-info="add op dir"
      data-tt="add op dir"
    ><span class="icon icon-file-plus"></span>Add Directory</a>
    <a
      id="addOpPackage"
      class="button-small button-icon tt info"
      data-info="add op package"
      data-tt="add op package"
    ><span class="icon icon-file-plus"></span>Add Package</a>

    <br /><br />
    {{#if dirs}}
      <div id="dirlist" class="dragList draggable">
        {{#each dirs}}
          <div class="draggable" data-id="{{@index}}" data-dir="{{dir}}">
            {{#unless fixedPlace}}<span
                class="handle icon-grip icon icon-0_75x draggable"
                style="float: none;"
              ></span>{{/unless}}
            <span class="dir">{{dir}}</span>
            <div class="controls">
              using
              <span class="usedOps">{{numUsedOps}}</span>
              of
              <span class="ops">{{numOps}}</span>
              ops&nbsp;
              <a
                class="icon icon-folder icon-0_75x"
                onclick="CABLESUILOADER.talkerAPI.send('openDir', { 'dir': '{{dir}}'});"
              ></a>&nbsp;
              {{#unless fixedPlace}}<a
                  class="removeOpProjectDir icon icon-x icon-0_75x"
                  data-dir="{{dir}}"
                ></a>{{/unless}}
            </div>
          </div>
        {{/each}}
        <div class="highlightBlock info hidden" style="margin-top: 20px;"></div>
      </div>
    {{/if}}
  </div>
</script>

<script id="tab_find" type="text/x-handlebars-template">

  <div class="tabContentScrollContainer">

      <div id="tabsearchbox" class="tabsearchbox">
          <input class="medium notIgnoreEscape" id="{{inputid}}" autocomplete="off" style="margin:4px;width:95%;" type="search">
          <input class="hidden" id="{{inputid}}_toggles" autocomplete="off"  type="search">
      </div>

      <br/>
      Find Ops:&nbsp;

      {{#each toggles}}
          <a class="findToggle" data-togglestr=":{{.}}" id="{{../inputid}}_{{.}}" >{{.}}</a>
      {{/each}}

      {{#each colors}}
          &nbsp;<a onclick="gui.find(':color={{.}}')" style="background-color:{{.}};color:black;" class="button-small">color</a>
      {{/each}}

      <br/><br/>

      <div id="tabsearchresult" class="tabSearchResultsContainer"></div>
      <div id="ophistory" class=""></div>

  </div>
</script>

<script id="filemanager_header" type="text/x-handlebars-template">

  <div class="filemanager_header">
      <div style="width:1000px;overflow:hidden;padding:5px;">
          <span class="divider"></span>

          <a class="fileManagerSource {{#compare source '==' 'patch' }}activeFileManagerSource{{/compare}}" onclick="gui.fileManager.setSource('patch');" class="info" data-info="file_source_patch">Patch Files</a>
          <a class="fileManagerSource {{#compare source '==' 'lib' }}activeFileManagerSource{{/compare}}" onclick="gui.fileManager.setSource('lib');" class="info" data-info="file_source_lib">Library Files</a>

          <span class="divider"></span>

          <span class="iconbutton info" data-info="filemanager_file_refresh" onclick="gui.refreshFileManager();">
              <i class="icon icon-refresh"></i>
          </span>

          {{#if frontendOptions.showAssetUpload }}
              <span class="iconbutton info" data-info="filemanager_file_upload" onclick="CABLES.CMD.PATCH.uploadFileDialog();">
                  <i class="icon icon-upload"></i>
              </span>
          {{else}}
              <span class="iconbutton info" data-info="filemanager_file_add" onclick="CABLES.CMD.PATCH.uploadFileDialog();">
                  <i class="icon icon-file"></i>
              </span>
          {{/if}}

          <span class="iconbutton info" data-info="filemanager_file_create" onclick="CABLES.CMD.PATCH.createFile();">
              <i class="icon icon-file-plus"></i>
          </span>

          <span class="divider"></span>

          <span id="switch-display-icons" class="switch switch-left {{#compare display '==' 'icons' }}switch-active{{/compare}}">
              <i class="icon icon-grid"></i>
          </span>
          <span id="switch-display-list" class="switch switch-right {{#compare display '==' 'list' }}switch-active{{/compare}}">
              <i class="icon icon-menu"></i>
          </span>

          <span class="divider"></span>

          <input id="filefilter" type="search" class="medium" autocomplete="off" oninput="gui.fileManager.setFilter(this.value)" style="margin:0px;width:100px;border:1px solid #aaa;padding:4px !important;font-size:13px;" placeholder="Filter..." value="{{filter}}">
      </div>
  </div>

  {{#if fileSelectOp}}
      <span style="border:2px solid var(--color-special);padding:7px;border-radius:10px;cursor:pointer;display: block;margin-top: 20px;margin-bottom: 20px;text-align:center;" onclick="gui.fileManager.setFilePort(null);">
          Selection mode for: <b>{{fileSelectOp.objName}}</b>  {{#if filterType}} / {{filterType}} {{/if}}
          <span class="icon icon-x"></span>
      </span>
  {{/if}}
</script>

<script id="tab_itemmanager" type="text/x-handlebars-template">
  <div id="filemanagercontainer" style="height:99%">
      <div id="itemmanager_header" class=""></div>
      <div class="filelistcontainer">
          {{#each items}}
              {{#if divider}}
                  <div style="clear:both"></div>
                  <div style="border-bottom:1px solid var(--color-07);margin-bottom:5px;" class="text-center">
                      {{#if ../frontendOptions.openLocalFiles}}
                          <h2>{{divider}}{{#unless isLibraryFile}}&nbsp;<a onclick="CABLESUILOADER.talkerAPI.send('openDir', { 'dir': '{{p}}'});"><span class="icon icon-folder"></span></a>{{/unless}}</h2>
                      {{else}}
                          <h1>{{divider}}</h1>
                      {{/if}}
                  </div>
              {{else}}
                  <div class="tt info fileFilterable item item-container {{#if selected}} selected {{/if}} draggable {{#if isLibraryFile}} library{{/if}} " id="item{{id}}" draggable="true" ondragstart="CABLES.DragNDrop.startDragLibraryFile(event,'{{p}}');" data-info="dragfile" data-searchable="{{title}}" data-tt="{{title}}">

                      {{#if preview}}
                          <div class="preview bgPatternDark info" data-info="dragfile" style="width:90%;height:calc(90% - 22px);;background-color:#777;">
                              <div class="info" data-info="dragfile" style="background-image:url('{{preview}}');width:100%;height:100%;background-size:contain;background-repeat:no-repeat;background-position:center center;">
                              </div>
                          </div>
                      {{else}}
                          <div class="preview info text-center" data-info="dragfile" style="width:90%;height:calc(90% - 22px);;background-color:#555;">
                              <br/>
                              <span data-info="dragfile"  class="icon icon-{{icon}} icon-4x info"></span>
                          </div>
                      {{/if}}

                      {{#if isReference}}
                      <div style="position:absolute;width:12px;height:12px;margin-top:-18px;margin-left:6px;">
                          <span data-info="dragfile" class="icon icon-file-symlink info"></span>
                      </div>
                      {{/if}}


                      <div class="filename">{{{shortTitle}}}</div>
                  </div>
              {{/if}}
          {{/each}}
          <div style="clear:both"></div>
      </div>
      <div id="item_details"></div>
  </div>
</script>

<script id="tab_itemmanager_list" type="text/x-handlebars-template">
  <div id="itemmanager_header"></div>
  <div class="filelistcontainer">
      <table class="table">
          {{#if showHeader}}
          <tr>
              <th width="30" onclick="gui.fileManager.setOrder('type');" style="cursor:pointer;"><span class="icon icon-file"></span></th>
              <th onclick="gui.fileManager.setOrder('name');" style="cursor:pointer;">
                  Filename
                  {{#compare order '==' 'name' }}{{#if orderReverse}}<span class="icon icon-arrow-up "></span>{{else}}<span class="icon icon-arrow-down "></span>{{/if}}{{/compare}}
              </th>
              <th onclick="gui.fileManager.setOrder('size');" style="cursor:pointer;">
                  Size
                  {{#compare order '==' 'size' }}{{#if orderReverse}}<span class="icon icon-arrow-up "></span>{{else}}<span class="icon icon-arrow-down "></span>{{/if}}{{/compare}}
                  </th>
              <th onclick="gui.fileManager.setOrder('date');" style="cursor:pointer;">
                  Changed
                  {{#compare order '==' 'date' }}{{#if orderReverse}}<span class="icon icon-arrow-up "></span>{{else}}<span class="icon icon-arrow-down "></span>{{/if}}{{/compare}}
                  </th>
          </tr>
          {{/if}}
          {{#each items}}
              {{#if divider}}
                  <tr>
                      <td colspan="100">
                          <div style="border-bottom:1px solid var(--color-07);margin-bottom:5px;" class="text-center">
                              {{#if ../frontendOptions.openLocalFiles}}
                                  <h2>{{divider}}{{#unless isLibraryFile}}&nbsp;<a onclick="CABLESUILOADER.talkerAPI.send('openDir', { 'dir': '{{p}}'});"><span class="icon icon-folder"></span></a>{{/unless}}</h2>
                              {{else}}
                                  <h1>{{divider}}</h1>
                              {{/if}}
                          </div>
                      </td>
                  </tr>
              {{else}}
                  <tr class="fileFilterable" data-searchable="{{title}}" id="itemrow{{id}}">
                      <td><span class="icon icon-{{icon}} "></span></td>
                      <td><div id="item{{id}}" draggable="true" ondragstart="CABLES.DragNDrop.startDragLibraryFile(event,'{{p}}');" class="draggable listitem item {{#if selected}} selected {{/if}} {{#if isLibraryFile}} library{{/if}}">{{title}}</div>
                      </td>
                      <td>{{sizeKb}}</td>
                      <td>{{relativedate updated}}</td>
                      <td>{{#if isReference}}reference{{/if}}</td>

                  </tr>
              {{/if}}
          {{/each}}
      </table>
  </div>
  <div id="item_details"></div>
</script>

<script id="filemanager_details_lib" type="text/x-handlebars-template">
  <div class="filemanager-detail-element">
    <div>

      <a
        class="iconbutton info"
        data-info="filemanager_file_download"
        download
        href="{{filename}}"
      >
        <span class="icon icon-1x icon-download"></span>
      </a>
      <span
        class="iconbutton info"
        data-info="filemanager_file_search"
        onclick="gui.find('{{filename}}')"
      >
        <a class="icon icon-1x icon-search"></a>
      </span>

    </div>
  </div>

  <div class="filemanager-detail-element">
    <div style="padding:10px;">
      <div class=""><b>Author:</b> {{fileInfo.author}}</div>
      <div class=""><b>License:</b> {{fileInfo.license}}</div>
      {{#if fileInfo.originalUrl}}
        <div class=""><b>Original URL:</b>
          <a
            class="link"
            href="{{fileInfo.originalUrl}}"
            target="_blank"
          >{{fileInfo.originalUrl}}</a></div>
      {{/if}}
    </div>
  </div>
</script>

<script id="filemanager_details_lib_audio" type="text/x-handlebars-template">
  <div class="filemanager-detail-element">
    <div style="padding:10px;">

      <a
        class="iconbutton info"
        data-info="filemanager_file_download"
        download
        href="{{filename}}"
      >
        <span class="icon icon-1x icon-download"></span>
      </a>
      <span
        class="iconbutton info"
        data-info="filemanager_file_search"
        onclick="gui.find('{{filename}}')"
      >
        <a class="icon icon-1x icon-search"></a>
      </span>

    </div>
  </div>

  <div class="filemanager-detail-element">
    <div style="padding:10px;">
      <div class=""><b>Artist:</b> {{fileInfo.artist}}</div>
      <div class=""><b>Title:</b> {{fileInfo.title}}</div>
      <div class=""><b>Artist Page:</b> {{fileInfo.artistLink}}</div>
      <div class=""><b>License:</b> {{fileInfo.license}}</div>
      <div class=""><b>Original URL:</b> {{fileInfo.originalUrl}}</div>

      <div class=""><b>Length:</b> {{fileInfo.length}}</div>
      <div class=""><b>Bitrate:</b> {{fileInfo.bitrate}}</div>
      <div class=""><b>Type:</b> {{fileInfo.audioType}}</div>
    </div>
  </div>
</script>

<script id="filemanager_details" type="text/x-handlebars-template">

  <div class="filemanager-detail-element">

      {{#if file.imgPreview}}
          <img src="{{file.imgPreview}}" style="height:auto;max-width:100%;"/>
      {{else}}
          No preview!!
      {{/if}}

  </div>
  <div class="filemanager-detail-element">

      <div style="padding-left:10px;">

          <a class="iconbutton info" data-info="filemanager_file_download" download href="{{downloadUrl}}">
              <span class="icon icon-1x icon-download"></span>
          </a>
          {{#if frontendOptions.showAssetExternalLink}}
          <a class="iconbutton info" data-info="filemanager_file_open" target="_blank" href="{{assetPageUrl}}">
              <span class="icon icon-1x icon-external"></span>
          </a>
          {{/if}}

          {{#if frontendOptions.showLocalAssetDirOpen}}
          <a class="iconbutton info" data-info="filemanager_file_open" target="_blank" onclick="CABLES.CMD.ELECTRON.openFileManager('{{downloadUrl}}')">
              <span class="icon icon-1x icon-folder"></span>
          </a>
          {{/if}}

          <span class="iconbutton info" data-info="filemanager_file_search" onclick="gui.find('{{assetPath}}')">
              <a class="icon icon-1x icon-search"></a>
          </span>

          <span class="iconbutton info" data-info="filemanager_copy_file_url" id="filecopyurl{{file.fileDb._id}}">
              <a class="icon icon-1x icon-copy"></a>
          </span>

          {{#if isEditable}}
              <span class="iconbutton info" data-info="filemanager_edit_file" id="fileedit{{file.fileDb._id}}">
                  <a class="icon icon-1x icon-edit"></a>
              </span>
          {{/if}}

          <span class="iconbutton info" data-info="filemanager_reupload" id="fileReUpload{{file.fileDb._id}}" {{#if frontendOptions.isElectron}}data-file-path="{{file.fileDb.path}}"{{/if}} onclick="CABLES.CMD.PATCH.reuploadFile('{{file.fileDb._id}}', '{{file.fileDb.fileName}}');">
              <a class="icon icon-1x icon-upload"></a>
          </span>


          <br/><br/>

          {{#if isReference}}
          reference:
          {{/if}}
          <b style="word-break: break-all;">{{file.fileDb.fileName}}</b>

          <br/>



          {{#if isPlatformCommunity}}
              {{#if isReference}}
                  {{#if isLibraryFile}}{{else}}
                      <br/>
                      <a class="button-small" href="{{projectUrl}}" target="_blank"><span class="icon icon-file-symlink"></span>Original patch</b></a>
                  {{/if}}
              {{/if}}
          {{/if}}
          {{#if referenceCount}}
              <br/>
              <a class="button-small" href="{{assetPageUrl}}" target="_blank">
                  <span class="icon icon-file-symlink"></span>
                  Show referencing patches</a>
          {{/if}}

          {{#compare source '==' 'patch' }}
              <br/><br/>
              {{#if file.imgSizeWidth}}
                      {{file.fileDb.type}}: {{ file.imgSizeWidth }} x {{ file.imgSizeHeight }} ({{file.sizeReadable}})
                  {{else}}
                      {{file.fileDb.type}} ({{file.sizeReadable}})
              {{/if}}

              <br/><br/>
              last change: {{relativedate file.fileDb.updated}}<br/>

          {{/compare}}
      </div>
  </div>
  <div class="filemanager-detail-element">
      {{#if file.ops}}
          File Ops
          <br/><br/>
          {{#each file.ops}}
              <a class="button" onclick="gui.patchView.addAssetOpAuto('{{../assetPath}}')"><span class="icon icon-plus-circle"></span>add <b>{{.}}</b></a>
              <br/><br/>
          {{/each}}
      {{/if}}

      {{#if file.converters}}
          File Tools
          <br/><br/>
          {{#each file.converters}}
              <a class="button" onclick="gui.showConverter('{{ id }}','{{ ../file.fileDb.projectId }}','{{ ../file.fileDb._id }}','{{ name }}', '{{ ../file.fileDb.name }}');"><span class="icon icon-refresh"></span>{{ name }}</a>
              <br/>
          {{/each}}
      {{/if}}

      {{#compare source '==' 'patch' }}
      {{#if isReference}}
      {{else}}
      <br/><br/>
      <span class="button" data-info="filemanager_delete_file" id="filedelete{{file.fileDb._id}}">
          <a class="info icon icon-1x icon-trash"></a>Delete File

      </span>
      {{/if}}
  {{/compare}}
  </div>
  <div style="clear:both;"></div>
</script>

<script id="tab_jobs" type="text/x-handlebars-template">

  <style>
  </style>


  <div class="tabContentScrollContainer">

      <h2>Jobs</h2>

      <table>
          <tr>
              <th></th>
              <th></th>
              <th></th>
          </tr>
          {{#each list}}
              <tr>
                  <td>
                      {{#if finished}}
                      <span class="icon icon-check"></span>
                      {{else}}
                      <span class="icon icon-loader"></span>
                      {{/if}}
                  </td>
                  <td>
                      {{#if op}}
                          <a class="button-small" onclick="gui.patchView.centerSelectOp('{{op.id}}');">
                      {{/if}}
                          {{type}}
                      {{#if op}}
                      </a>
                      {{/if}}
                  </td>
                  <td>
                      {{name}}
                  </td>
              </tr>
          {{/each}}
      </table>

  </div>
</script>

<script id="tab_keys" type="text/x-handlebars-template">
  <style></style>

  <div class="tabcontent-scroll padding" style="padding-top: 0;">

    <h2>Keyboard shortcuts</h2>
    {{#if showDownloadButton}}
      <span class="button-small" onclick="gui.keys.download()"><i
          class="icon icon-lock"
        ></i>
        Download Markdown</span>
    {{/if}}
    <table>
      {{#each keys}}
        {{#if group}}
          <tr>
            <td></td>
            <td></td>
            <td>
              <br /><br />
              <h2 style="text-transform:capitalize;">{{group}}</h2>
            </td>
          </tr>
        {{/if}}
        <tr>
          <td class="keyline" style="text-align: right;">
            {{#if options.cmdCtrl}}<code class="key">CMD</code> + {{/if}}
            {{#if options.shiftKey}}<code class="key">SHIFT</code> + {{/if}}
          </td>
          <td class="keyline">
            <code class="key">{{key}}</code>
            &nbsp;
          </td>
          <td class="keyline">{{title}}</td>
        </tr>
      {{/each}}
    </table>
  </div>
</script>

<script id="tab_keys_markdown" type="text/x-handlebars-template">


  # Keyboard Shortcuts *[mod] is your operating system’s primary modifier key,
  on Mac OS X this is [cmd], on Windows [ctrl].*
  {{#each keys}}
    {{#if group}}

      ##
      {{toUpperCase group}}
    {{/if}}
    - {{#if options.cmdCtrl}}[mod] + {{/if}}{{#if options.shiftKey}}shift +
    {{/if}}{{key}}:
    {{title}}
  {{/each}}
</script>

<script id="tab_logging" type="text/x-handlebars-template">


  <style>
      .logShow
      {
          background-color: #006600;
      }
      .logHide
      {
          background-color: #660000;
      }
  </style>


  <div class="tabContentScrollContainer">


      <span class="button-small" onclick="CABLES.UI.logFilter.resetSettings()">Reset</span>

      <br/><br/>

      <table>
          <tr>
              <th></th>
              <th>Initiator Component</th>
              <th># </th>
          </tr>
          {{#each info}}
              <tr>
                  <td>
                      <span class="button-small {{#if print}}logShow{{else}}logHide{{/if}}" onclick="CABLES.UI.logFilter.toggleInitiator('{{initiator}}')">{{#if print}}visible{{else}}hidden{{/if}}</span>
                  </td>
                  <td>{{initiator}}</td>
                  <td>{{count}}</td>
              </tr>
          {{/each}}
      </table>

      <div id="loggingHtmlId" class="logList">

      </div>

  </div>
</script>

<script id="tab_manage_op" type="text/x-handlebars-template">

  <div class="tabContentScrollContainer tabManageOp">

      <br>
      {{#if opLayoutSvg}}
          {{{opLayoutSvg}}}
      {{else}}
          <img src="{{layoutUrl}}" style="margin-top:10px;">
      {{/if}}
      <br/>
      <h2>Op {{opDoc.shortName}}</h2>
      {{opname}}{{#if visibilityString}}<span class="visibilityString"> - {{{visibilityString}}}</span>{{/if}}

      {{#if opDoc.opDirFull}}
          <br/>
          <a class="link" onclick="CABLES.CMD.ELECTRON.openOpDir('{{opDoc.id}}', '{{opname}}')">{{opDoc.opDirFull}}</a>
      {{/if}}

      <br/>
      <div {{#if frontendOptions.editOpSummary}}onclick="CABLES.CMD.PATCH.editOpSummary('{{opDoc.id}}','{{opname}}', '{{summary}}');"{{/if}} class="summary selectable">
          <br/><b>{{summary}}</b>
      </div>
      <br/>

      <!-- <span class="button-small button-icon" onclick="gui.serverOps.edit('{{opname}}', {{readOnly}},null,true);">{{#if canEditOp}}<span class="icon icon-edit"></span>{{else}}<span class="icon icon-file"></span>{{/if}}</span> -->

      <a class="button-small" target="_blank" href="{{url}}/op/{{opname}}">Op Page / Documentation</a>

      <span class="button-small" onclick="gui.serverOps.cloneDialog('{{opname}}');">Clone op</span>
      {{#if canEditOp}}
          <a class="button-small" target="_blank" onclick="CABLES.CMD.OP.renameOp('{{opname}}')">Rename Op</a>
      {{/if}}

      {{#if canDeleteOp}}
          <a class="button-small button-delete" target="_blank" onclick="CABLES.CMD.PATCH.deleteOp('{{opname}}')">Delete Op</a>
      {{/if}}

      {{#if frontendOptions.showLocalOpDirButton}}
          <a class="button-small button-icon tt" data-tt="open folder" onclick="if (event.ctrlKey || event.metaKey) CABLES.CMD.ELECTRON.copyOpDirToClipboard('{{opDoc.id}}'); else CABLES.CMD.ELECTRON.openOpDir('{{opDoc.id}}', '{{opname}}');"><span class="icon icon-folder"></span></a>
      {{/if}}

      {{#if opDoc.hasPublicRepo}}
          <a class="button-small button-icon tt" href="{{url}}/op/{{opname}}/github" target="_blank"><span class="icon icon-github">open on github</span></a>
      {{/if}}

      <br/>
      <br/>

      {{#if warns}}
          <div class="groupSpacer"><h3>Warnings</h3></div>
          <div class="params">
              {{#each warns}}
                  <div class="warning-error warning-error-level1"><b>{{id}}</b> {{{text}}}</div>
                  <br/>
              {{/each}}
          </div>
      {{/if}}


      {{#if portJson}}
          <div class="groupSpacer"><h3>Ports</h3></div>

          {{#if subPatchSaved}}{{else}}
              <span class="error">Please save your subpatch to make changes to ports!</span>
          {{/if}}

          <table class="table" style="{{#if subPatchSaved}}{{else}}opacity:0.33;pointer-events:none;{{/if}}"">
              <tr>
                  <th>Inputs</th>
                  <th style="width:40%">Title</th>
                  <th>Attributes</th>
                  <th></th>
              </tr>
              {{#each portJson.ports}}

              {{#if divider}}
                  <tr>
                      <th>Outputs</th>
                      <th></th>
                      <th></th>
                      <th></th>
                  </tr>
              {{/if}}

              <tr>
                  <td>
                      &nbsp;&nbsp;&nbsp;
                      <span class="button-small button-icon" style="margin-right:0px;border-top-right-radius: 0;border-bottom-right-radius: 0;padding-left:5px;padding-right:2px;" id="{{../viewId}}_port_up_{{id}}"><span class="icon icon-chevron-up"></span></span><span class="button-small button-icon" style="margin-left:0px;border-top-left-radius: 0;border-bottom-left-radius: 0;padding-left:2px;padding-right:5px;" id="{{../viewId}}_port_down_{{id}}"><span class="icon icon-chevron-down"></span></span>
                      <span class="button-small button-icon" id="{{../viewId}}_port_title_{{id}}"><span class="icon icon-edit"></span></span>
                  </td>
                  <td>
                      <span class="portType_{{type}}_background">&nbsp;&nbsp;&nbsp;</span>&nbsp;
                      {{title}}
                  </td>
                  <td>
                      {{#if value}}
                          Default: {{value}}<br/>
                      {{/if}}

                      {{#if uiDisplay}}
                          Display: {{uiDisplay}}<br/>
                      {{/if}}
                      {{#if objType}}
                          Object Type: {{objType}}<br/>
                      {{/if}}
                      {{#if addUiAttribs}}
                          UiAttribs: {{json addUiAttribs}}<br/>
                      {{/if}}

                  </td>
                  <td>
                      <span class="button-small button-icon" id="{{../viewId}}_port_delete_{{id}}"><span class="icon icon-x"></span></span>
                  </td>
              </tr>

              {{/each}}
          </table>

          <a class="button" id="{{viewId}}_port_create"><span class="icon icon-plus-circle icon-1_25x"></span>Create Port</a>
          <br/><br/>
      {{/if}}

      {{#if portJson}}
      {{else}}
        <br/>
          <div class="groupSpacer"><h3>Files</h3></div>

          <table class="table">
              <tr>
                  <th>Filename</th>
                  <th>Type</th>
                  <th></th>
              </tr>
              <tr>
                  <td onclick="gui.serverOps.edit('{{opname}}', {{readOnly}},null,true);" style="cursor:pointer">
                      <a class="icon icon-edit iconhover" ></a>&nbsp;{{opname}}.js
                  </td>
                  <td>
                      Main Source File
                  </td>
                  <td></td>
              </tr>

              {{#if doc.attachmentFiles}}
                  {{#each doc.attachmentFiles}}
                      <tr>
                          <td onclick="gui.serverOps.editAttachment('{{../opname}}','{{original}}');" style="cursor:pointer">
                              <a class="icon icon-edit iconhover"></a>&nbsp; {{readable}}
                          </td>
                          <td>
                              Attachment
                          </td>
                          <td>
                              <a class="icon-x icon iconhover" style="text-align:right" onclick="gui.serverOps.deleteAttachment('{{../opname}}','{{../opid}}','{{original}}');"></a>
                          </td>
                      </tr>
                  {{/each}}
              {{/if}}
          </table>

          <a class="button" onclick="gui.serverOps.addAttachmentDialog('{{opname}}');"><span class="icon icon-plus-circle icon-1_25x"></span>Create Attachment</a>

          <br/><br/>

          {{#if hasDependencies}}
              <div class="groupSpacer"><h3>Dependencies</h3></div>
              <div class="opDependencyList">
                  <table class="table">
                      <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th> </th>
                      </tr>
                      {{#each opDoc.coreLibs}}
                          <tr>
                              <td>{{.}}</td>
                              <td>corelib</td>
                              <td>
                                  {{#if ../canEditOp}}
                                      <a class="icon icon-three-dots iconhover dependency-options" data-depsrc="{{.}}" data-deptype="corelib"></a>
                                  {{/if}}
                              </td>
                          </tr>
                      {{/each}}
                      {{#each opDoc.libs}}
                          <tr>
                              <td>{{.}}</td>
                              <td>lib</td>
                              <td>
                                  {{#if ../canEditOp}}
                                      <a class="icon icon-three-dots iconhover dependency-options" data-depsrc="{{.}}" data-deptype="lib"></a>
                                  {{/if}}
                              </td>
                          </tr>
                      {{/each}}
                      {{#each opDoc.dependencies}}
                          <tr>
                              <td>
                                  {{#compare type '==' 'npm'}}
                                      <a class="link" {{#if ../frontendOptions.isElectron}}target="_blank"{{/if}} href="https://www.npmjs.com/package/{{src}}">{{src}}</a>
                                  {{else}}
                                      {{#compare type '==' 'op'}}
                                          {{opName}}
                                      {{else}}
                                          {{src}}
                                      {{/compare}}
                                  {{/compare}}
                              </td>
                              <td>{{type}}{{#compare type '==' 'module' }} ({{export}}){{/compare}}</td>
                              <td>
                                  {{#if ../canEditOp}}
                                      <a class="icon icon-three-dots iconhover dependency-options" data-depsrc="{{src}}" data-deptype="{{type}}"></a>
                                  {{/if}}
                              </td>
                          </tr>
                      {{/each}}
                  </table>
              </div>
          {{/if}}

          {{#if canEditOp}}
              <div class="groupSpacer"><h3>Dependencies</h3></div>
              Add javascript libraries/modules to your op<br/><br/>
              <a class="button" onclick="ele.byId('{{viewId}}_dependencytabs').classList.toggle('hidden');this.classList.toggle('hidden')"><span class="icon icon-plus-circle icon-1_25x"></span>Add Dependencies</a>
              <div id="{{viewId}}_dependencytabs" class="dependencytabs hidden"></div>
          {{/if}}

      {{/if}}

      {{#if doc.changelog}}
          <br/><br/>
          <div class="groupSpacer"><h3>Changelog</h3></div>
          <table class="changelogtable" style="width:100%">
          {{#each doc.changelog}}
              <tr>
                  <td style="vertical-align: top">
                      <span style="font-size:11px">{{relativedate date}}</span>
                  </td>
                  <td style="vertical-align: top;font-size:11px ">
                      {{#if type}}
                          <span style="border-radius: 4px;text-transform: uppercase; background-color:#aaa;padding-left:4px;padding-right:4px;color:#000;" class="changelogtype-{{type}}">{{type}}</span>
                      {{/if}}
                  </td>
                  <td style="width:65%;;">
                      <span class="changelogText">- {{message}}</span>
                  </td>
              </tr>
          {{/each}}
          </table>
      {{/if}}
  </div>
</script>

<script id="tab_preferences" type="text/x-handlebars-template">
  <div
    class="tabcontent-scroll padding userPreferences"
    style="padding-top:0px;"
  >
    <h2>{{texts.title}}</h2>

    <style></style>

    <br /><br />

    <div class="row"><div class="title cute-7-phone cute-5-offset"><h2
        >{{texts.head_glpatch}}</h2></div></div>

    <div class="row">
      <div class="cute-5-phone text-right">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="linetype"
          data-value="curved"
        >Curved</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="linetype"
          data-value="straight"
        >Straight</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="linetype"
          data-value="simple"
        >Simple</span>
      </div>
      <div class="cute-5-phone left">
        {{texts.subtitle_glpatch_linetype}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="snapToGrid2"
          data-value="true"
        >On</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="snapToGrid2"
          data-value="false"
        >Off</span>
      </div>

      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_snapToGrid}}</h3>
        {{texts.subtitle_snapToGrid}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="noFadeOutCables"
          data-value="false"
        >On</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="noFadeOutCables"
          data-value="true"
        >Off</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_fadeOutCables}}</h3>
        {{texts.subtitle_fadeOutCables}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="canvasMode"
          data-value="default"
        >Default</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="canvasMode"
          data-value="patchbg"
        >Background</span>
      </div>

      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_canvaspos}}</h3>
        {{texts.subtitle_canvaspos}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="fontSizeOff"
          data-value="-2"
        >-2</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="fontSizeOff"
          data-value="-1"
        >-1</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="fontSizeOff"
          data-value="0"
        >Default</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="fontSizeOff"
          data-value="1"
        >+1</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="fontSizeOff"
          data-value="2"
        >+2</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="fontSizeOff"
          data-value="3"
        >+3</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="fontSizeOff"
          data-value="4"
        >+4</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_fontsize}}</h3>
        {{texts.subtitle_fontsize}}
      </div>
    </div>

    <br /><hr /><br />

    <div class="row"><div class="title cute-7-phone cute-5-offset"><h2>ACE Text
          Editor</h2></div></div>

    <div class="row">
      <div class="cute-5-phone text-right">
        <input
          class="numberinput valinput"
          data-setting="fontsize_ace"
          value="12"
        />
      </div>
      <div class="cute-5-phone left">
        {{texts.subtitle_fontsize_ace}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone text-right">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="wrapmode_ace"
          data-value="false"
        >Off</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="wrapmode_ace"
          data-value="true"
        >On</span>
      </div>
      <div class="cute-5-phone left">
        {{texts.subtitle_wrapmode_ace}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone text-right">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="formatcode"
          data-value="false"
        >Off</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="formatcode"
          data-value="true"
        >On</span>
      </div>
      <div class="cute-5-phone left">
        {{texts.subtitle_formatcode}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone text-right">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="ace_keymode"
          data-value=""
        >Default</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="ace_keymode"
          data-value="ace/keyboard/vim"
        >Vim</span>
      </div>
      <div class="cute-5-phone left">
        {{texts.subtitle_ace_keymode}}
      </div>
    </div>

    <br /><hr /><br />

    <div class="row">
      <div class="row"><div class="title cute-7-phone cute-5-offset"><h2>Ui
            Elements</h2></div></div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="hideCanvasUi"
          data-value="true"
        >Off</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="hideCanvasUi"
          data-value="false"
        >On</span>
      </div>

      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_hideCanvasUi}}</h3>
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="hideSizeBar"
          data-value="true"
        >Hide</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="hideSizeBar"
          data-value="false"
        >Show</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_hideSizeBar}}</h3>
        {{texts.subtitle_hideSizeBar}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="bgpreview"
          data-value="true"
        >On</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="bgpreview"
          data-value="false"
        >Off</span>

        <br /><br />

        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="texpreviewMode"
          data-value=""
        >mouse hover tooltip</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="texpreviewMode"
          data-value="corner"
        >Always in corner</span>

        <br /><br />

        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="texpreviewTransparent"
          data-value="false"
        >Opaque</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="texpreviewTransparent"
          data-value="true"
        >Transparent</span>

      </div>

      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_texpreviewSize}}</h3>
        {{texts.subtitle_texpreviewSize}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="bgpattern"
          data-value="bgPatternDark"
        >Dark</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="bgpattern"
          data-value="bgPatternBright"
        >Bright</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="bgpattern"
          data-value="bgPatternBlack"
        >0</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="bgpattern"
          data-value="bgPatternGrey"
        >0.5</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="bgpattern"
          data-value="bgPatternWhite"
        >1</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="bgpattern"
          data-value="bgPatternRed"
        >R</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="bgpattern"
          data-value="bgPatternBlue"
        >B</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_bgpattern}}</h3>
        {{texts.subtitle_bgpattern}}
      </div>

    </div>

    <br /><hr /><br />

    <div class="row"><div class="title cute-7-phone cute-5-offset"><h2
        >Input</h2></div></div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="quickLinkLongPress"
          data-value="true"
        >On</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="quickLinkLongPress"
          data-value="false"
        >Off</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_quickLinkLongPress}}</h3>
        {{texts.subtitle_quickLinkLongPress}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="quickLinkMiddleMouse"
          data-value="true"
        >On</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="quickLinkMiddleMouse"
          data-value="false"
        >Off</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_quickLinkMiddleMouse}}</h3>
        {{texts.subtitle_quickLinkMiddleMouse}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="doubleClickAction"
          data-value="parentSub"
        >Parent Subpatch</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="doubleClickAction"
          data-value="addOp"
        >Add Op</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="doubleClickAction"
          data-value="centerPatch"
        >Center Patch</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_doubleClickAction}}</h3>
        {{texts.subtitle_doubleClickAction}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone text-right">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="patch_button_scroll"
          data-value="1"
        >Left</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="patch_button_scroll"
          data-value="4"
        >Middle</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="patch_button_scroll"
          data-value="2"
        >Right</span>
      </div>
      <div class="cute-5-phone left">
        {{texts.subtitle_scroll_button}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="patch_allowCableDrag"
          data-value="true"
        >On</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="patch_allowCableDrag"
          data-value="false"
        >Off</span>
      </div>
      <div class="cute-5-phone left">
        {{texts.subtitle_allow_cable_drag}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="patch_wheelmode"
          data-value="zoom"
        >Zoom</span>
        <span
          class="prefswitch switch switch-text switch-middle"
          data-setting="patch_wheelmode"
          data-value="pan"
        >Pan</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="patch_wheelmode"
          data-value="auto"
        >Auto</span>
      </div>
      <div class="cute-5-phone left prefRight">
        <h3>Scroll Method</h3>
        {{{texts.subtitle_wheelmode}}}
      </div>
    </div>
    <div class="row">
      <div class="cute-5-phone prefLeft">
        <input
          class="numberinput valinput"
          data-setting="wheelmultiplier"
          value="1"
        />
      </div>
      <div class="cute-7-phone prefRight">
        {{texts.subtitle_wheelmultiplier}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <input
          class="numberinput valinput"
          data-setting="patch_panspeed"
          value="0.25"
        />
      </div>
      <div class="cute-7-phone prefRight">
        {{texts.subtitle_panspeed}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <input class="valinput" data-setting="keybind_escape" value="Escape" />
      </div>
      <div class="cute-7-phone prefRight">
        {{texts.subtitle_keybind_escape}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="escape_closetabs"
          data-value="true"
        >On</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="escape_closetabs"
          data-value="false"
        >Off</span>
      </div>
      <div class="cute-7-phone prefRight">
        {{texts.subtitle_escape_closetabs}}
      </div>
    </div>

    <br /><hr /><br />

    <div class="row"><div class="title cute-7-phone cute-5-offset"><h2
        >Misc</h2></div></div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="idlemode"
          data-value="false"
        >Off</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="idlemode"
          data-value="true"
        >On</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_idlemode}}</h3>
        {{texts.subtitle_idlemode}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="showTipps"
          data-value="true"
        >Show</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="showTipps"
          data-value="false"
        >Hide</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_tipps}}</h3>
        {{texts.subtitle_tipps}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="presentationmode"
          data-value="false"
        >Off</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="presentationmode"
          data-value="true"
        >On</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_presentationmode}}</h3>
        {{texts.subtitle_presentationmode}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="nobrowserWarning"
          data-value="false"
        >Off</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="nobrowserWarning"
          data-value="true"
        >On</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_nobrowserWarning}}</h3>
        {{texts.subtitle_nobrowserWarning}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="introCompleted"
          data-value="true"
        >Hide</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="introCompleted"
          data-value="false"
        >Show Again</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_introCompleted}}</h3>
        {{texts.subtitle_introCompleted}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="randomizePatchName"
          data-value="false"
        >Off</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="randomizePatchName"
          data-value="true"
        >On</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_randomizePatchName}}</h3>
        {{texts.subtitle_randomizePatchName}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="helperMode"
          data-value="true"
        >Show</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="helperMode"
          data-value="false"
        >Hide</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_helperMode}}</h3>
        {{texts.subtitle_helperMode}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="notlocalizeNumberformat"
          data-value="true"
        >Off</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="notlocalizeNumberformat"
          data-value="false"
        >On</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_notlocalizeNumberformat}}</h3>
        {{texts.subtitle_notlocalizeNumberformat}}
      </div>
    </div>

    {{#if frontendOptions.isElectron}}
      <br /><hr /><br />

      <div class="row"><div class="title cute-7-phone cute-5-offset"><h2
          >Standalone</h2></div></div>

      <div class="row">
        <div class="cute-5-phone prefLeft">
          <span
            class="prefswitch switch switch-text switch-left"
            data-setting="openlastproject"
            data-value="false"
          >Off</span>
          <span
            class="prefswitch switch switch-text switch-right"
            data-setting="openlastproject"
            data-value="true"
          >On</span>
        </div>
        <div class="cute-7-phone prefRight">
          <h3>{{texts.title_openlastproject}}</h3>
          {{texts.subtitle_openlastproject}}
        </div>
      </div>
      <div class="row">
        <div class="cute-5-phone prefLeft">
          <span
            class="prefswitch switch switch-text switch-left"
            data-setting="openfullscreen"
            data-value="false"
          >Off</span>
          <span
            class="prefswitch switch switch-text switch-right"
            data-setting="openfullscreen"
            data-value="true"
          >On</span>
        </div>
        <div class="cute-7-phone prefRight">
          <h3>{{texts.title_openfullscreen}}</h3>
          {{texts.subtitle_openfullscreen}}
        </div>
      </div>
      <div class="row">
        <div class="cute-5-phone prefLeft">
          <span
            class="prefswitch switch switch-text switch-left"
            data-setting="maximizerenderer"
            data-value="false"
          >Off</span>
          <span
            class="prefswitch switch switch-text switch-right"
            data-setting="maximizerenderer"
            data-value="true"
          >On</span>
        </div>
        <div class="cute-7-phone prefRight">
          <h3>{{texts.title_maximizerenderer}}</h3>
          {{texts.subtitle_maximizerenderer}}
        </div>
      </div>
      <div class="row">
        <div class="cute-5-phone prefLeft">
          <input class="valinput" data-setting="authorName" value="" />
        </div>
        <div class="cute-7-phone prefRight">
          <h3>{{texts.title_authorName}}</h3>
          {{texts.subtitle_authorName}}
        </div>
      </div>
      <div class="row">
        <div class="cute-5-phone prefLeft">
          <span id="usersetting_downloadPath"><span
              class="icon icon-folder"
            ></span>
            <span class="value"></span></span>
          <input
            type="text"
            class="valinput hidden"
            data-setting="downloadPath"
            value=""
          />
        </div>
        <div class="cute-7-phone prefRight">
          <h3>{{texts.title_downloadPath}}</h3>
          {{texts.subtitle_downloadPath}}
        </div>
      </div>
    {{/if}}

    <br /><hr /><br />

    <div class="row"><div class="title cute-7-phone cute-5-offset"><h2
        >Advanced</h2></div></div>

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="devinfos"
          data-value="true"
        >On</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="devinfos"
          data-value="false"
        >Off</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_devinfos}}</h3>
        {{texts.subtitle_devinfos}}
      </div>
    </div>

    <!-- <div class="row">
        <div class="cute-5-phone prefLeft">
            <span class="prefswitch switch switch-text switch-left" data-setting="forceWebGl1" data-value="true">On</span>
            <span class="prefswitch switch switch-text switch-right" data-setting="forceWebGl1" data-value="false">Off</span>
        </div>
        <div class="cute-7-phone prefRight">
            <h3>{{texts.title_forceWebGl1}}</h3>
            {{texts.subtitle_forceWebGl1}}
        </div>
    </div> -->

    <div class="row">
      <div class="cute-5-phone prefLeft">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="miniopselect"
          data-value="true"
        >Minimal</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="miniopselect"
          data-value="false"
        >Full</span>
      </div>
      <div class="cute-7-phone prefRight">
        <h3>{{texts.title_miniopselect}}</h3>
        {{texts.subtitle_miniopselect}}
      </div>
    </div>

    <div class="row">
      <div class="cute-5-phone text-right">
        <span
          class="prefswitch switch switch-text switch-left"
          data-setting="glpatch_cursor"
          data-value="true"
        >Off</span>
        <span
          class="prefswitch switch switch-text switch-right"
          data-setting="glpatch_cursor"
          data-value="false"
        >On</span>
      </div>
      <div class="cute-5-phone left">
        {{texts.subtitle_glpatch_cursor}}
      </div>
    </div>

    <br /><hr /><br />

    <div class="row"><div class="title cute-7-phone cute-5-offset"><h2>Reset
          preferences</h2></div></div>

    <div class="row">
      <div class="cute-5-phone text-right">
        <input class="button" value="Reset preferences" id="resetPrefs" />
      </div>
      <div class="cute-5-phone left">
        resetting or changing some settings need a reload of the editor!
      </div>
    </div>

    <br /><br /><br /><br /><br /><br />

  </div>
</script>

<script id="tabpanel_bar" type="text/x-handlebars-template">

  <div class="tabs" style="position:relative;">


      {{#each tabs}}
          <div class="tabcontainer">
              <div id="editortab{{id}}" data-id="{{id}}" class="tab {{#if options.wasChanged}} unsaved {{/if}} {{#if options.closable}} closable {{/if}} {{#if active}} active {{/if}}{{#if options.infotext}} info {{/if}}" style="{{#if options.showTitle}}{{else}} min-width:19px !important;max-width:19px !important;padding-left: 10px; {{/if}}" {{#if options.infotext}} data-info="{{options.infotext}}"{{/if}}>
                  {{#if icon }} <span class="tabicon icon-{{icon}} icon fleft"></span> &nbsp;{{/if}}
                  {{#if icon }}{{else}}{{#if options.type }}{{else}} <span class="tabicon icon-file icon fleft"></span> &nbsp;{{/if}}{{/if}}

                  {{#compare options.type '==' 'glsl' }}<span class="fileTypeColor_gl">GL</span>&nbsp; {{/compare}}
                  {{#compare options.type '==' 'js' }}<span class="fileTypeColor_js">JS</span>&nbsp; {{/compare}}
                  {{#compare options.type '==' 'css' }}<span class="fileTypeColor_css">CSS</span>&nbsp; {{/compare}}

                  {{#if options.showTitle }}{{title}}{{/if}}
                  {{#if unsaved }} ! {{/if}}
              </div>
          </div>
      {{/each}}
      <div style="clear:both;"></div>
  </div>

  <div id="editortabList{{id}}" style="display:none;position: absolute;z-index: 99;width: 30px;height: 34px;left: 0px;top: 0px;background-color:var(--color-02);cursor:pointer;">
      <div class="tt icon icon-menu" style="margin-top:10px;margin:7px;margin-right:12px;" onclick="" data-tt=""></div>
  </div>
</script>

<script id="tabpanel_toolbar" type="text/x-handlebars-template">
  <div class="tabtoolbar" id="toolbarContent{{id}}" style="float:left;"></div>

  {{#if options.closable}}
    <button
      tabindex="0"
      onkeypress="ele.keyClick(event,this)"
      id="closetab{{id}}"
      data-id="{{id}}"
      class="icon-x icon icon-1_5x fright iconhover closetabx"
    ></button>
  {{/if}}
  <div style="clear:both;"></div>
</script>

<script id="uiperformance" type="text/x-handlebars-template">


  <table class="table">
      <tr>
          <th>name</th>
          <th>count</th>
          <th>last</th>
          <th>avg</th>
      </tr>

      {{#each measures}}
          <tr onclick="gui.uiProfiler.highlight('{{name}}')" class="{{#if highlight}}highlighted{{/if}}" >
              <td class="{{color}}">{{name}}</td>
              <td class="{{color}}">{{count}}</td>
              <td class="{{color}}">{{last}}</td>
              <td class="{{color}}">{{avg}}</td>
          </tr>
      {{/each}}
  </table>
</script>

<script id="tab_welcome" type="text/x-handlebars-template">

  <h2>welcome to cables</h2>
  {{version}} <span id="platformaltversion"></span>

  <br><br>

  <a class="icon-button button" onclick="CABLESUILOADER.talkerAPI.send('newPatch');"><span class=" icon-file-plus icon-2x icon"></span>New patch</a>
  <a class="icon-button button" onclick="CABLESUILOADER.talkerAPI.send('gotoPatch');"><span class=" icon-file icon-2x icon"></span>Open patch</a>
  <a class="icon-button button" href="https://cables.gl" target="_blank"><span class=" icon-cables icon-2x icon"></span>cables.gl </a>

  <hr>

  {{#if patches}}
      <h3>Recent Patches</h3>

      <div style="clear:both" class="item_manager">
          {{#each patches}}

              <div style="float:left;cursor:pointer;" class="item item-container text-center" onclick="CABLESUILOADER.talkerAPI.send('gotoPatch', { 'id': '{{shortId}}' });">
                  <img src="{{../url}}{{thumbnail}}" style="width:99px;"/>
                  <br/>
                  {{name}}
              </div>

          {{/each}}
      </div>
      <div style="clear:both"></div>

      <hr>

  {{/if}}

  <h3>Help</h3>

  <a href="https://cables.gl/docs" target="_blank" class="button">Documentation</a>
  <br>
  <a href="https://cables.gl/docs" target="_blank" class="button">Video tutorials</a>
  <br>
  <a href="https://cables.gl/docs" target="_blank" class="button">Github discussions and issues</a>
  <br>
  <a href="https://discord.gg/cablesgl" target="_blank" class="button">Join cables discord community</a>

  <hr>

  <h3>Events</h3>

  <div id="welcome_events">loading...</div>
</script>

<script id="tab_welcome_events" type="text/x-handlebars-template">
  {{#each events}}

    <a
      href="{{link}}"
      target="_blank"
      style="background-color: var(--color-05);display:block;padding:10px;border-radius: 5px;margin:5px;"
    >
      <h3 class="nomargin">{{title}}</h3>
      {{displaydateNoTime eventdate}}
    </a>
  {{/each}}
</script>


        <div class="cablesCssUi">
            <a id="undev" data-info="undevLogo" class="icon-undev info" target="_blank" href="http://www.undev.de"></a>
        </div>
    </div>
<script>
    "use strict";
    var CABLESUILOADER = CABLESUILOADER || {};

    CABLESUILOADER.GlobalVarTester = (function ()
    {
        var fields = {};
        var before = function (w)
        {
            for (var field in w)
                fields[field] = true;
        };

        var after = function (w)
        {
            for (var field in w)
                if (!fields[field])
                    console.log(field + " has been added");
        };
        return {
            before: before,
            after: after
        };
    }());

    CABLESUILOADER.preload = {};
    CABLESUILOADER.GlobalVarTester.before(window);

    CABLESUILOADER.uiLoadStart = performance.now();
    CABLESUILOADER.startup = {};
    CABLESUILOADER.startup.log = [];
    CABLESUILOADER.startup.maxEvents = 15 - 1;
    CABLESUILOADER.startup.numEvents = 0;

    CABLESUILOADER.buildInfo = {};

    function incrementStartup()
    {
        CABLESUILOADER.startup.numEvents++;
        // if(CABLESUILOADER.startup.numEvents>CABLESUILOADER.startup.maxEvents)console.warn("too many cables startup events!",CABLESUILOADER.startup.numEvents,CABLESUILOADER.startup.maxEvents)
        const loadingBarEle = document.getElementById("loadingstatusBar");
        if (loadingBarEle) loadingBarEle.style.width = (CABLESUILOADER.startup.numEvents / CABLESUILOADER.startup.maxEvents) * 100 + "%";
    }

    function logStartup(title)
    {
        if(window.gui && gui.finishedLoading()) return;

        const timeUsed = Math.round((performance.now() - CABLESUILOADER.uiLoadStart) / 1000 * 100) / 100;

        CABLESUILOADER.startup.log.push(
            {
                "title": title,
                "time": timeUsed
            });

        if (!window.CABLES || !CABLES.platform || !CABLES.platform.isDevEnv()) return;
        document.getElementById("loadingstatusLog").innerHTML += title + " (" + timeUsed + ") <br/>";
    }

    CABLESUILOADER.noCacheUrl = function (url)
    {
        if(window.CABLES && CABLES.platform) return CABLES.platform.noCacheUrl(url);
        return url;
    };

    CABLESUILOADER.builtVersionUrl = function (component, url)
    {
        let ncUrl = CABLESUILOADER.noCacheUrl(url);
        if (CABLESUILOADER.buildInfo)
        {
            if (CABLESUILOADER.buildInfo[component])
            {
                ncUrl = url;// + "?nc=" + CABLESUILOADER.buildInfo[component].timestamp;
            }
        }
        return ncUrl;
    };

    incrementStartup();
    if (window.logStartup) logStartup("start ui");

    CABLESUILOADER.loadAll = function (cfg)
    {
        CABLESUILOADER.cfg = cfg;
        if (!window.hasOwnProperty("loadjs"))
        {
            setTimeout(CABLESUILOADER.loadAll, 100);
            console.log("wait for loadjs...");
            return;
        }

        logStartup("loaded minimum libs / starting up...");

        incrementStartup();
        loadjs([CABLESUILOADER.builtVersionUrl("core", "js/cables.js")], "cables_core");

        loadjs.ready("cables_core", function ()
        {
            logStartup("loaded cables core");
            incrementStartup();

            loadjs([CABLESUILOADER.builtVersionUrl("ui", "js/cables-ui.js")], "cablesuinew");

            loadjs.ready("cablesuinew", function ()
            {
                let platformClass = "PlatformCommunity";
                if(cfg && cfg.platformClass) {
                    if(CABLES.hasOwnProperty(cfg.platformClass)) {
                        platformClass = cfg.platformClass;
                        console.info("using sandbox from", platformClass);
                    }else{
                        console.error("could not find class for sandbox", cfg.platformClass, "using", platformClass);
                    }

                }
                CABLES.platform = new CABLES[platformClass](cfg);

                incrementStartup();
                logStartup("loaded ui");

                CABLESUILOADER.talkerAPI.send("getOpDocsAll", { "projectId": cfg.patchId }, (err, _data) =>
                {

                    if (err)
                    {
                        console.error("preloading error", err);
                    }
                    else
                    {
                        CABLESUILOADER.preload.opDocsAll = _data;
                    }
                }, (response) =>
                {
                    console.error("preloading error", response);
                });

                loadjs([CABLESUILOADER.noCacheUrl(CABLES.platform.getUrlOpsCode()), CABLESUILOADER.noCacheUrl(CABLES.platform.getUrlProjectOpsCode(cfg.patchId))], 'all_ops', { "before": (path, scriptEl) => { scriptEl.setAttribute("crossorigin", "use-credentials"); } });
                loadjs.ready('all_ops', () =>
                {
                    incrementStartup();
                    logStartup('loaded cables ops');

                    waitForAce();
                });
            });
        });
    };

    function waitForAce()
    {
        if (!CABLESUILOADER.preload.opDocsAll)
        {
            setTimeout(waitForAce, 100);
        }
        else
        {
            CABLESUILOADER.uiLoadFiles = performance.now() - CABLESUILOADER.uiLoadStart;

            CABLES.UI.startUi(CABLESUILOADER.cfg);
        }
    }

    document.addEventListener("DOMContentLoaded", function (event)
    {
        CABLESUILOADER.talkerAPI = new CABLESUILOADER.TalkerAPI(window.parent);

        const reqTimeout=setTimeout(()=>
        {
            document.getElementById("loadingstatus").style.display="none";
            document.getElementById("loadingstatusLog").innerHTML += "error: could not get response from talker api. editor not in iframe? <br/>";
        },1000);

        CABLESUILOADER.talkerAPI.send("requestPatchData", {}, function (response)
        {
            clearTimeout(reqTimeout);

            if (response.buildInfo)
            {
                CABLESUILOADER.buildInfo = response.buildInfo;
            }
            CABLESUILOADER.loadAll(response);
        });
    });

    if (!(function () { return !this; })()) console.log("not in strict mode: footer html");

</script>

<div class="preloading" style="font-family:SourceSansPro"></div>

<div id="testcontent"></div>

    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (process.client) {
      await import("../libs/index.js");
      await import("../ui/index.js");
    }
  }
}

customElements.define("cables-ui", CablesWebComponent);
