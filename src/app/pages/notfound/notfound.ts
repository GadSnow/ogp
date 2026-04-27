import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from '@/app/layout/service/layout.service';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [RouterModule],
    template: `
        <div class="flex flex-col items-center justify-center">
            <svg class="stroke-surface-950 dark:stroke-surface-0 max-w-[406px] w-full h-auto" viewBox="0 0 406 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6688_24290)">
                    <path d="M21.9805 144.591H66.0786" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M76.6704 144.591H86.0801" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.9912 132.179H92.9428" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.48582 132.179H0.989746" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.9912 120.39H40.2046" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M47.2227 120.39H102.27" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M333.728 243.052H380.932" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M388.601 243.052H395.426" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M343.156 230.64H405.01" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M338.446 230.64H333.728" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M333.728 218.851H362.167" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M367.252 218.851H388.601" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M155.97 207.933H143.958V229.046H114.859V207.933H71.356V186.297L116.728 119.978H143.967V185.921H155.979V207.933H155.97ZM114.849 185.921V173.234C114.849 170.844 114.932 167.628 115.106 163.571C115.28 159.522 115.417 157.388 115.518 157.195H114.694C112.999 161.024 111.084 164.606 108.949 167.94L96.8638 185.921H114.849Z"
                        stroke=""
                        stroke-width="3.27"
                        stroke-miterlimit="10"
                    />
                    <path
                        d="M242.453 174.654C242.453 193.954 239.219 208.088 232.75 217.065C226.282 226.042 216.386 230.53 203.055 230.53C189.724 230.53 180.195 225.84 173.58 216.47C166.965 207.099 163.657 193.157 163.657 174.654C163.657 156.151 166.892 141.037 173.36 131.978C179.829 122.928 189.724 118.402 203.055 118.402C216.386 118.402 225.851 123.111 232.494 132.536C239.136 141.962 242.453 155.995 242.453 174.645V174.654ZM192.977 174.654C192.977 186.993 193.746 195.466 195.295 200.092C196.834 204.717 199.427 207.026 203.055 207.026C206.683 207.026 209.331 204.635 210.852 199.863C212.373 195.09 213.125 186.681 213.125 174.645C213.125 162.609 212.355 154.09 210.816 149.244C209.276 144.399 206.683 141.971 203.055 141.971C199.427 141.971 196.834 144.307 195.295 148.979C193.755 153.65 192.977 162.206 192.977 174.645V174.654Z"
                        stroke=""
                        stroke-width="3.27"
                        stroke-miterlimit="10"
                    />
                    <path
                        d="M335.056 207.933H323.044V229.046H293.945V207.933H250.442V186.297L295.814 119.978H323.054V185.921H335.065V207.933H335.056ZM293.936 185.921V173.234C293.936 170.844 294.018 167.628 294.202 163.571C294.376 159.522 294.513 157.388 294.614 157.195H293.789C292.094 161.024 290.179 164.606 288.044 167.94L275.959 185.921H293.945H293.936Z"
                        stroke=""
                        stroke-width="3.27"
                        stroke-miterlimit="10"
                    />
                    <path d="M354.324 141.907V131.794" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M347.27 144.829L340.114 137.675" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M344.347 151.882H334.231" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M347.27 158.945L340.114 166.09" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M354.324 161.867V171.979" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M361.389 158.945L368.544 166.09" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M364.311 151.882H374.426" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M361.389 144.829L368.544 137.675" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M37.1069 192.251V184.941" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M32.0038 194.367L26.8271 189.2" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M29.8872 199.469H22.5757" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M32.0038 204.571L26.8271 209.737" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M37.1069 206.687V213.996" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M42.2104 204.571L47.378 209.737" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M44.3179 199.469H51.6294" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M42.2104 194.367L47.378 189.2" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M234.939 41.2842V33.9745" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M229.836 43.4001L224.668 38.2247" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M227.72 48.5023H220.408" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M229.836 53.6044L224.668 58.7706" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M234.939 55.7112V63.0209" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M240.043 53.6044L245.211 58.7706" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M242.15 48.5023H249.462" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M240.043 43.4001L245.211 38.2247" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M324.227 244.307H73.3994V283.787H324.227V244.307Z" stroke="" stroke-width="2.42" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M92.9424 102.601V70.9811H257.406V141.257" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <g filter="url(#filter0_dddd_6688_24290)">
                        <path
                            class="fill-primary-active"
                            d="M150.317 208.345H138.305V229.459H109.206V208.345H65.7031V186.709L111.075 120.39H138.314V186.333H150.326V208.345H150.317ZM109.206 186.342V173.656C109.206 171.265 109.288 168.05 109.462 163.992C109.636 159.943 109.774 157.809 109.875 157.617H109.05C107.355 161.446 105.44 165.027 103.305 168.361L91.2201 186.342H109.206Z"
                        />
                        <path
                            d="M236.8 175.076C236.8 194.376 233.566 208.51 227.097 217.486C220.629 226.463 210.733 230.952 197.402 230.952C184.071 230.952 174.542 226.262 167.927 216.891C161.312 207.52 158.004 193.579 158.004 175.076C158.004 156.572 161.239 141.458 167.707 132.399C174.176 123.349 184.071 118.824 197.402 118.824C210.733 118.824 220.198 123.532 226.841 132.958C233.483 142.383 236.8 156.417 236.8 175.066V175.076ZM187.333 175.076C187.333 187.414 188.103 195.887 189.651 200.513C191.19 205.139 193.783 207.447 197.411 207.447C201.04 207.447 203.688 205.056 205.209 200.284C206.73 195.512 207.481 187.103 207.481 175.066C207.481 163.03 206.711 154.511 205.172 149.666C203.633 144.82 201.04 142.393 197.411 142.393C193.783 142.393 191.19 144.728 189.651 149.409C188.112 154.081 187.333 162.636 187.333 175.076Z"
                            class="fill-primary-active"
                        />
                        <path
                            d="M329.403 208.345H317.392V229.459H288.292V208.345H244.79V186.709L290.161 120.39H317.401V186.333H329.413V208.345H329.403ZM288.292 186.342V173.656C288.292 171.265 288.375 168.05 288.558 163.992C288.732 159.943 288.869 157.809 288.97 157.617H288.146C286.451 161.446 284.536 165.027 282.401 168.361L270.316 186.342H288.301H288.292Z"
                            class="fill-primary-active"
                        />
                    </g>
                    <path d="M199.436 48.5023V88.1011H308.495V106.119" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M96.8732 106.531C96.8732 108.702 95.114 110.452 92.9517 110.452C90.7894 110.452 89.0303 108.693 89.0303 106.531C89.0303 104.369 90.7894 102.611 92.9517 102.611C95.114 102.611 96.8732 104.369 96.8732 106.531Z"
                        stroke=""
                        stroke-width="2.16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M199.436 48.4932C201.602 48.4932 203.358 46.7379 203.358 44.5727C203.358 42.4075 201.602 40.6522 199.436 40.6522C197.27 40.6522 195.515 42.4075 195.515 44.5727C195.515 46.7379 197.27 48.4932 199.436 48.4932Z"
                        stroke=""
                        stroke-width="2.16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M312.416 110.452C312.416 112.623 310.657 114.372 308.495 114.372C306.332 114.372 304.573 112.613 304.573 110.452C304.573 108.29 306.332 106.531 308.495 106.531C310.657 106.531 312.416 108.29 312.416 110.452Z"
                        stroke=""
                        stroke-width="2.16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M261.327 145.828C261.327 147.999 259.568 149.748 257.406 149.748C255.244 149.748 253.484 147.989 253.484 145.828C253.484 143.666 255.244 141.907 257.406 141.907C259.568 141.907 261.327 143.666 261.327 145.828Z"
                        stroke=""
                        stroke-width="2.16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path d="M67.3703 224.402L58.0889 233.681" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M58.0889 224.402L67.3703 233.681" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M72.0157 89.6034L62.7251 98.8825" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M62.7251 89.6034L72.0157 98.8825" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M373.181 194.825L363.899 204.113" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M363.899 194.825L373.181 204.113" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M109.673 36.6217C106.714 36.6217 104.002 37.6843 101.894 39.4522C99.7411 32.9852 93.6573 28.3136 86.4649 28.3136C78.4112 28.3136 71.7502 34.1669 70.44 41.843C69.5879 41.5956 68.6992 41.4582 67.7738 41.4582C62.423 41.4582 58.0801 45.8001 58.0801 51.1495C58.0801 56.0685 61.7542 60.1264 66.5094 60.7492V60.8408H109.673C116.361 60.8408 121.786 55.4181 121.786 48.7313C121.786 42.0445 116.361 36.6217 109.673 36.6217Z"
                        stroke=""
                        stroke-width="2.26"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M334.277 98.223C336.43 98.223 338.4 98.9924 339.93 100.275C341.488 95.5757 345.913 92.1865 351.145 92.1865C356.991 92.1865 361.837 96.4368 362.781 102.015C363.395 101.841 364.046 101.74 364.724 101.74C368.608 101.74 371.769 104.891 371.769 108.784C371.769 112.357 369.103 115.306 365.64 115.755V115.819H334.286C329.43 115.819 325.481 111.881 325.481 107.017C325.481 102.153 329.421 98.2138 334.286 98.2138L334.277 98.223Z"
                        stroke=""
                        stroke-width="2.16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M377.505 264.661C375.7 264.661 374.051 265.311 372.768 266.383C371.458 262.444 367.747 259.595 363.368 259.595C358.466 259.595 354.398 263.158 353.61 267.839C353.097 267.693 352.547 267.61 351.988 267.61C348.727 267.61 346.079 270.257 346.079 273.518C346.079 276.514 348.314 278.987 351.219 279.362V279.417H377.514C381.592 279.417 384.899 276.111 384.899 272.034C384.899 267.958 381.592 264.651 377.514 264.651L377.505 264.661Z"
                        stroke=""
                        stroke-width="2.16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M20.6062 249.089C22.7594 249.089 24.7293 249.858 26.2594 251.14C27.817 246.441 32.2424 243.052 37.474 243.052C43.3196 243.052 48.1665 247.302 49.1102 252.881C49.724 252.707 50.3746 252.606 51.0526 252.606C54.9374 252.606 58.0984 255.757 58.0984 259.65C58.0984 263.222 55.4322 266.172 51.9688 266.621V266.685H20.6062C15.7502 266.685 11.8013 262.746 11.8013 257.882C11.8013 253.018 15.7411 249.079 20.6062 249.079V249.089Z"
                        stroke=""
                        stroke-width="2.16"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path d="M121.794 30.8052C121.794 30.8052 177.171 -14.3263 252.412 6.46698C331.446 28.3136 347.27 84.657 347.27 84.657" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3.27 7.62" />
                    <path d="M38.1793 162.004C16.7121 165.329 5.91887 210.882 30.0707 228.964" stroke="" stroke-width="2.02" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3.05 7.11" />
                    <path d="M308.495 293.432C308.495 293.432 345.272 309.508 361.389 287.084" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3.27 7.62" />
                    <path d="M133.541 110.452V87.231" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M127.933 110.452V98.8824" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M218.896 115.819V98.8458" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M212.52 114.372V107.337" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M206.875 114.372V102.601" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M138.928 110.452V98.8458" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M292.854 113.685V108.491" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M287.248 113.685V101.035" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M298.242 113.685V104.644" stroke="" stroke-width="2.16" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <filter id="filter0_dddd_6688_24290" x="54.7031" y="116.824" width="285.709" height="152.128" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="2" />
                        <feGaussianBlur stdDeviation="2" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6688_24290" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="7" />
                        <feGaussianBlur stdDeviation="3.5" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
                        <feBlend mode="normal" in2="effect1_dropShadow_6688_24290" result="effect2_dropShadow_6688_24290" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="15" />
                        <feGaussianBlur stdDeviation="4.5" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0" />
                        <feBlend mode="normal" in2="effect2_dropShadow_6688_24290" result="effect3_dropShadow_6688_24290" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="27" />
                        <feGaussianBlur stdDeviation="5.5" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0" />
                        <feBlend mode="normal" in2="effect3_dropShadow_6688_24290" result="effect4_dropShadow_6688_24290" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_6688_24290" result="shape" />
                    </filter>
                    <clipPath id="clip0_6688_24290">
                        <rect width="406" height="300" fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <h1 class="mt-8 text-4xl md:text-6xl font-semibold text-center mx-auto leading-[125%]">Not Found</h1>
            <p class="text-lg text-surface-500 leading-6 mt-4 text-center mx-auto">Something gone wrong!</p>
            <a routerLink="/" class="landing-button-primary w-fit px-8 mt-8">Go to Home</a>
        </div>
    `
})
export class Notfound {
    layoutService = inject(LayoutService);

    isDarkTheme = computed(() => this.layoutService.isDarkTheme());

    imageSrc = computed(() => '/demo/images/landing/' + (this.isDarkTheme() ? '404-dark.png' : '404.png'));
}
