import React from "react";

const Icon = (props) => {
  return (
    <>
      {props.fill ? (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_i_2661_23919)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.31 2.5H16.691C19.78 2.5 21.5 4.28 21.5 7.33V17.66C21.5 20.76 19.78 22.5 16.691 22.5H8.31C5.27 22.5 3.5 20.76 3.5 17.66V7.33C3.5 4.28 5.27 2.5 8.31 2.5ZM8.58 7.16V7.15H11.569C12 7.15 12.35 7.5 12.35 7.929C12.35 8.37 12 8.72 11.569 8.72H8.58C8.149 8.72 7.8 8.37 7.8 7.94C7.8 7.51 8.149 7.16 8.58 7.16ZM8.58 13.24H16.42C16.85 13.24 17.2 12.89 17.2 12.46C17.2 12.03 16.85 11.679 16.42 11.679H8.58C8.149 11.679 7.8 12.03 7.8 12.46C7.8 12.89 8.149 13.24 8.58 13.24ZM8.58 17.81H16.42C16.819 17.77 17.12 17.429 17.12 17.03C17.12 16.62 16.819 16.28 16.42 16.24H8.58C8.28 16.21 7.99 16.35 7.83 16.61C7.67 16.86 7.67 17.19 7.83 17.45C7.99 17.7 8.28 17.85 8.58 17.81Z"
              fill="#0361FF"
            />
          </g>
          <defs>
            <filter
              id="filter0_i_2661_23919"
              x="3.5"
              y="2.5"
              width="19"
              height="21"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="1" dy="2" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_2661_23919"
              />
            </filter>
          </defs>
        </svg>
      ) : (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2161 16.7234H8.99609"
            stroke="#25283C"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.2161 12.5369H8.99609"
            stroke="#25283C"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.7511 8.36011H8.99609"
            stroke="#25283C"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.4085 3.24982C16.4085 3.24982 8.73149 3.25382 8.71949 3.25382C5.95949 3.27082 4.25049 5.08682 4.25049 7.85682V17.0528C4.25049 19.8368 5.97249 21.6598 8.75649 21.6598C8.75649 21.6598 16.4325 21.6568 16.4455 21.6568C19.2055 21.6398 20.9155 19.8228 20.9155 17.0528V7.85682C20.9155 5.07282 19.1925 3.24982 16.4085 3.24982Z"
            stroke="#25283C"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </>
  );
};

export default Icon;
