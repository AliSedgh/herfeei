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
          <g filter="url(#filter0_i_2661_24132)">
            <path
              d="M9.63478 21.2733V18.2156C9.63478 17.4351 10.2722 16.8023 11.0584 16.8023H13.9326C14.3102 16.8023 14.6723 16.9512 14.9393 17.2163C15.2063 17.4813 15.3563 17.8408 15.3563 18.2156V21.2733C15.3539 21.5978 15.4821 21.9099 15.7124 22.1402C15.9427 22.3705 16.2561 22.5 16.5829 22.5H18.5438C19.4596 22.5023 20.3388 22.1428 20.9872 21.5008C21.6356 20.8588 22 19.987 22 19.0778V10.3669C22 9.63246 21.6721 8.93584 21.1046 8.46467L14.434 3.17587C13.2737 2.24856 11.6111 2.2785 10.4854 3.24698L3.96701 8.46467C3.37274 8.92195 3.01755 9.62064 3 10.3669V19.0689C3 20.9639 4.54738 22.5 6.45617 22.5H8.37229C9.05123 22.5 9.603 21.9562 9.60792 21.2822L9.63478 21.2733Z"
              fill="#0361FF"
            />
          </g>
          <defs>
            <filter
              id="filter0_i_2661_24132"
              x="3"
              y="2.5"
              width="20"
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
                result="effect1_innerShadow_2661_24132"
              />
            </filter>
          </defs>
        </svg>
      ) : (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_2661_23929"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="2"
            y="1"
            width="21"
            height="23"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2 1.50018H22.4998V23.0052H2V1.50018Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_2661_23929)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.717 15.7913C14.921 15.7913 15.901 16.7643 15.901 17.9603V21.0363C15.901 21.2933 16.107 21.4993 16.371 21.5053H18.277C19.779 21.5053 21 20.2993 21 18.8173V10.0933C20.993 9.58331 20.75 9.10331 20.333 8.78431L13.74 3.52631C12.855 2.82531 11.617 2.82531 10.729 3.52831L4.181 8.78231C3.748 9.11131 3.505 9.59131 3.5 10.1103V18.8173C3.5 20.2993 4.721 21.5053 6.223 21.5053H8.147C8.418 21.5053 8.638 21.2903 8.638 21.0263C8.638 20.9683 8.645 20.9103 8.657 20.8553V17.9603C8.657 16.7713 9.631 15.7993 10.826 15.7913H13.717ZM18.277 23.0053H16.353C15.251 22.9793 14.401 22.1143 14.401 21.0363V17.9603C14.401 17.5913 14.094 17.2913 13.717 17.2913H10.831C10.462 17.2933 10.157 17.5943 10.157 17.9603V21.0263C10.157 21.1013 10.147 21.1733 10.126 21.2413C10.018 22.2313 9.172 23.0053 8.147 23.0053H6.223C3.894 23.0053 2 21.1263 2 18.8173V10.1033C2.01 9.10931 2.468 8.19931 3.259 7.60031L9.794 2.35531C11.233 1.21531 13.238 1.21531 14.674 2.35331L21.256 7.60331C22.029 8.19231 22.487 9.10031 22.5 10.0823V18.8173C22.5 21.1263 20.606 23.0053 18.277 23.0053Z"
              fill="#212121"
            />
          </g>
        </svg>
      )}
    </>
  );
};

export default Icon;
