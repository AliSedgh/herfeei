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
          <g filter="url(#filter0_i_2661_25865)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.794 7.79105C17.794 10.7281 15.4391 13.0831 12.5 13.0831C9.5619 13.0831 7.20601 10.7281 7.20601 7.79105C7.20601 4.85402 9.5619 2.5 12.5 2.5C15.4391 2.5 17.794 4.85402 17.794 7.79105ZM12.5 22.5C8.16237 22.5 4.5 21.795 4.5 19.075C4.5 16.3539 8.18538 15.6739 12.5 15.6739C16.8386 15.6739 20.5 16.3789 20.5 19.099C20.5 21.82 16.8146 22.5 12.5 22.5Z"
              fill="#0361FF"
            />
          </g>
          <defs>
            <filter
              id="filter0_i_2661_25865"
              x="4.5"
              y="2.5"
              width="17"
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
                result="effect1_innerShadow_2661_25865"
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.4849 15.8462C8.61731 15.8462 5.31445 16.431 5.31445 18.7729C5.31445 21.1148 8.59636 21.7205 12.4849 21.7205C16.3525 21.7205 19.6545 21.1348 19.6545 18.7938C19.6545 16.4529 16.3735 15.8462 12.4849 15.8462Z"
            stroke="#25283C"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.4849 12.5059C15.023 12.5059 17.0801 10.4478 17.0801 7.90969C17.0801 5.3716 15.023 3.31445 12.4849 3.31445C9.94679 3.31445 7.8887 5.3716 7.8887 7.90969C7.88013 10.4392 9.92394 12.4973 12.4525 12.5059H12.4849Z"
            stroke="#25283C"
            stroke-width="1.42857"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </>
  );
};

export default Icon;
