import { Component } from '@angular/core';
import { AnimatedBorder } from './animatedborder';

@Component({
    selector: 'landing-cta',
    standalone: true,
    imports: [AnimatedBorder],
    template: `
        <div class="landing-container !max-w-[56rem] py-24">
            <div class="w-full relative">
                <animated-border />
                <div class="overflow-hidden relative bg-surface-0 dark:bg-surface-950 rounded-3xl shadow-stroke p-14 pt-12">
                    <div class="lg:max-w-[28rem] max-w-none">
                        <h2 class="text-5xl font-medium leading-[125%]">Stay Tuned For The Best Strategies</h2>
                        <p class="mt-4 text-surface-500 leading-6">Increase conversions by guiding visitors to take the next step with clear and compelling calls to action.</p>
                        <div class="mt-8 border border-surface-200 dark:border-surface-800 rounded-full p-2">
                            <div
                                class="flex items-center gap-4 p-2 pl-4 rounded-full bg-surface-0 dark:bg-surface-950 shadow-[0px_42px_12px_0px_rgba(0,0,0,0.00),_0px_27px_11px_0px_rgba(0,0,0,0.01),_0px_15px_9px_0px_rgba(0,0,0,0.02),_0px_7px_7px_0px_rgba(0,0,0,0.03),_0px_2px_4px_0px_rgba(0,0,0,0.04)]"
                            >
                                <input type="email" placeholder="Enter your email" class="bg-transparent outline-none flex-1" />
                                <button class="landing-button-primary w-10 h-10 rounded-full flex items-center justify-center">
                                    <i class="pi pi-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <svg class="hidden lg:block absolute top-0 right-0 bottom-0 h-full [&_path]:fill-primary-active" width="370" height="350" viewBox="0 0 370 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dddddddd_204_2)">
                            <path
                                d="M142.387 117.082C117.254 144.553 97.5894 176.532 84.5163 211.195C71.4433 245.858 65.2178 282.526 66.1953 319.105C67.1728 355.684 75.3343 391.458 90.2135 424.384C105.093 457.309 126.399 486.743 152.914 511.003C179.43 535.263 210.637 553.875 244.752 565.776C278.868 577.677 315.224 582.634 351.746 580.365C388.267 578.095 424.239 568.642 457.606 552.547C490.973 536.452 521.083 514.029 546.217 486.559L142.387 117.082Z"
                            />
                        </g>
                        <g filter="url(#filter1_dddddddd_204_2)">
                            <path
                                d="M474.623 410.659C499.757 383.189 519.421 351.209 532.494 316.546C545.567 281.883 551.793 245.215 550.815 208.636C549.838 172.057 541.676 136.284 526.797 103.358C511.918 70.4318 490.612 40.9986 464.096 16.7384C437.58 -7.52182 406.374 -26.1338 372.258 -38.0349C338.143 -49.936 301.786 -54.8932 265.265 -52.6234C228.743 -50.3535 192.772 -40.9012 159.405 -24.806C126.037 -8.71086 95.9274 13.712 70.794 41.1821L474.623 410.659Z"
                            />
                        </g>
                        <defs>
                            <filter id="filter0_dddddddd_204_2" x="0.547043" y="95.233" width="611.218" height="594.915" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="0.546239" />
                                <feGaussianBlur stdDeviation="0.546239" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                                <feBlend mode="color-burn" in2="BackgroundImageFix" result="effect1_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="1.09248" />
                                <feGaussianBlur stdDeviation="0.819358" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                                <feBlend mode="color-burn" in2="effect1_dropShadow_204_2" result="effect2_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="2.18496" />
                                <feGaussianBlur stdDeviation="2.18496" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                                <feBlend mode="color-burn" in2="effect2_dropShadow_204_2" result="effect3_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="4.36991" />
                                <feGaussianBlur stdDeviation="3.27743" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                                <feBlend mode="color-burn" in2="effect3_dropShadow_204_2" result="effect4_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="8.73982" />
                                <feGaussianBlur stdDeviation="6.55487" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                <feBlend mode="color-burn" in2="effect4_dropShadow_204_2" result="effect5_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="13.1097" />
                                <feGaussianBlur stdDeviation="8.73982" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                                <feBlend mode="color-burn" in2="effect5_dropShadow_204_2" result="effect6_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dx="-8.73982" dy="30.5894" />
                                <feGaussianBlur stdDeviation="17.4796" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                <feBlend mode="plus-darker" in2="effect6_dropShadow_204_2" result="effect7_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="43.6991" />
                                <feGaussianBlur stdDeviation="32.7743" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                <feBlend mode="plus-darker" in2="effect7_dropShadow_204_2" result="effect8_dropShadow_204_2" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect8_dropShadow_204_2" result="shape" />
                            </filter>
                            <filter id="filter1_dddddddd_204_2" x="5.24535" y="-75.0087" width="611.218" height="594.915" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="0.546239" />
                                <feGaussianBlur stdDeviation="0.546239" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                                <feBlend mode="color-burn" in2="BackgroundImageFix" result="effect1_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="1.09248" />
                                <feGaussianBlur stdDeviation="0.819358" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                                <feBlend mode="color-burn" in2="effect1_dropShadow_204_2" result="effect2_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="2.18496" />
                                <feGaussianBlur stdDeviation="2.18496" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                                <feBlend mode="color-burn" in2="effect2_dropShadow_204_2" result="effect3_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="4.36991" />
                                <feGaussianBlur stdDeviation="3.27743" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                                <feBlend mode="color-burn" in2="effect3_dropShadow_204_2" result="effect4_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="8.73982" />
                                <feGaussianBlur stdDeviation="6.55487" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                <feBlend mode="color-burn" in2="effect4_dropShadow_204_2" result="effect5_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="13.1097" />
                                <feGaussianBlur stdDeviation="8.73982" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                                <feBlend mode="color-burn" in2="effect5_dropShadow_204_2" result="effect6_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dx="-8.73982" dy="30.5894" />
                                <feGaussianBlur stdDeviation="17.4796" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                <feBlend mode="plus-darker" in2="effect6_dropShadow_204_2" result="effect7_dropShadow_204_2" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="43.6991" />
                                <feGaussianBlur stdDeviation="32.7743" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                <feBlend mode="plus-darker" in2="effect7_dropShadow_204_2" result="effect8_dropShadow_204_2" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect8_dropShadow_204_2" result="shape" />
                            </filter>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    `
})
export class LandingCta {}
