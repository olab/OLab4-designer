import React from 'react';


export const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.45582 0.40382C7.62121 -0.134608 8.37879 -0.134606 8.54418 0.403822L10.0273 5.23206C10.101 5.47214 10.3217 5.63588 10.5715 5.63588H15.4293C15.9741 5.63588 16.208 6.33148 15.7751 6.6642L11.7966 9.72173C11.6069 9.86751 11.5277 10.1168 11.5982 10.3462L13.1061 15.2552C13.2698 15.7882 12.6568 16.2184 12.2162 15.8797L8.34577 12.9052C8.14163 12.7484 7.85837 12.7484 7.65423 12.9052L3.78383 15.8797C3.34316 16.2184 2.73016 15.7882 2.89389 15.2552L4.40179 10.3462C4.47227 10.1168 4.39306 9.86751 4.20337 9.72173L0.224918 6.6642C-0.208021 6.33148 0.0258681 5.63588 0.570682 5.63588H5.42854C5.67833 5.63588 5.89897 5.47214 5.97272 5.23205L7.45582 0.40382Z"
      fill="#FFEB39"
    />
  </svg>
);

export const AddIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0H6V6H0V8H6V14H8V8H14V6H8V0Z"
      fill="url(#paint0_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="8.72941"
        y1="57.0937"
        x2="-43.7917"
        y2="19.3024"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F78749" />
        <stop offset="1" stopColor="#F53DA0" />
      </linearGradient>
    </defs>
  </svg>
);

export const DragableIcon = () => (
  <svg width="4" height="24" viewBox="0 0 4 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.3" width="4" height="24" rx="2" fill="white" />
  </svg>
);

export const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.8429 1.82331C12.9421 0.724131 14.7255 0.725447 15.828 1.82797L16.1704 2.17033C17.2722 3.27209 17.2732 5.05731 16.1751 6.15546L14.1536 8.17697C13.0544 9.27614 11.271 9.27482 10.1684 8.1723L9.82608 7.82994C8.72433 6.72819 8.72326 4.94297 9.82141 3.84481L11.8429 1.82331Z"
      stroke="#7C8FA6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.84414 9.82233C4.94331 8.72315 6.72674 8.72447 7.82927 9.827L8.17163 10.1694C9.27338 11.2711 9.27445 13.0563 8.1763 14.1545L6.15479 16.176C5.05562 17.2752 3.27219 17.2738 2.16966 16.1713L1.8273 15.829C0.725549 14.7272 0.724477 12.942 1.82263 11.8438L3.84414 9.82233Z"
      stroke="#7C8FA6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.19946 11.7987L11.7987 6.19943"
      stroke="#7C8FA6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LockIcon = () => (
  <svg
    width="12px"
    height="14px"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="lock_icon"
      masktype="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="12"
      height="14"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0C3.79086 0 2 1.79086 2 4V6H1C0.447715 6 0 6.44772 0 7V13C0 13.5523 0.447715 14 1 14H11C11.5523 14 12 13.5523 12 13V7C12 6.44772 11.5523 6 11 6H4V4C4 2.89543 4.89543 2 6 2C7.10457 2 8 2.89543 8 4H10C10 1.79086 8.20914 0 6 0Z"
        fill="white"
      />
    </mask>
    <g mask="url(#lock_icon)">
      <rect x="-6" y="-5" width="24" height="24" fill="white" />
    </g>
  </svg>
);

export const NodeLockedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path
      d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"
    />
  </svg>
);

export const MoreActionsIcon = () => (
  <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
    <circle cx="1.5" cy="7.5" r="1.5" fill="white" />
    <circle cx="1.5" cy="13.5" r="1.5" fill="white" />
  </svg>
);

export const MinimizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" viewBox="0 0 12 2" fill="none">
    <mask
      id="minimize_icon"
      masktype="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="12"
      height="2"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1C0 0.447715 0.447715 0 1 0H11C11.5523 0 12 0.447715 12 1C12 1.55228 11.5523 2 11 2H1C0.447715 2 0 1.55228 0 1Z"
        fill="white"
      />
    </mask>
    <g mask="url(#minimize_icon)">
      <rect x="-6" y="-11" width="24" height="24" fill="white" />
    </g>
  </svg>
);

export const ResizeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.1" d="M16 0V14C16 15.1046 15.1046 16 14 16H0L10 10L16 0Z" fill="#24446A" />
  </svg>
);
