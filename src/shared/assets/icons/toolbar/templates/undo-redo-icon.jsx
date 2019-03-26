// @flow
import React from 'react';

type IUndoRedoIconProps = {
  undo?: boolean;
  redo?: boolean;
};

const UndoRedoIcon = ({ undo, redo }: IUndoRedoIconProps) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.01" width="22" height="22" fill="#7C8FA6" />
    <mask id={`${undo ? 'undo' : 'redo'}-mask0`} mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="0" width="19" height="23">
      { undo && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.38268 0.0761497C9.75636 0.230931 10 0.595567 10 1.00003V4.02578C12.9604 4.18074 15.364 5.02909 17.087 6.40987C19.0167 7.95633 20.0261 10.1227 19.9995 12.5112C19.9508 16.8822 16.347 22 8.88882 22C8.36216 22 7.92577 21.5916 7.891 21.066C7.85624 20.5405 8.23501 20.0781 8.75708 20.0087C11.0859 19.6992 12.5774 18.6954 13.4572 17.5144C14.3506 16.315 14.6599 14.8713 14.5074 13.6212C14.3741 12.5288 13.9198 11.6671 13.1125 11.0595C12.433 10.5481 11.4305 10.1625 10 10.0407V13C10 13.4045 9.75636 13.7691 9.38268 13.9239C9.00901 14.0787 8.57889 13.9931 8.29289 13.7071L2.29289 7.70714C1.90237 7.31661 1.90237 6.68345 2.29289 6.29292L8.29289 0.292922C8.57889 0.00692445 9.00901 -0.0786313 9.38268 0.0761497ZM4.41421 7.00003L8 10.5858V9.00003C8 8.44774 8.44772 8.00003 9 8.00003C11.2485 8.00003 13.03 8.49432 14.3152 9.46154C15.621 10.4443 16.3039 11.8326 16.4926 13.3789C16.6534 14.6964 16.4455 16.1491 15.8003 17.4886C17.2883 16.0191 17.9813 14.1349 17.9996 12.4889C18.0194 10.7178 17.2883 9.13421 15.8363 7.97055C14.3676 6.79354 12.0968 6.00003 9 6.00003C8.44772 6.00003 8 5.55231 8 5.00003V3.41424L4.41421 7.00003Z"
          fill="#7C8FA6"
        />
      )}
      { redo && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.6173 0.0761497C12.2436 0.230931 12 0.595567 12 1.00003V4.02578C9.03962 4.18074 6.63599 5.02909 4.91303 6.40987C2.98332 7.95633 1.97387 10.1227 2.0005 12.5112C2.04923 16.8822 5.65302 22 13.1112 22C13.6378 22 14.0742 21.5916 14.109 21.066C14.1438 20.5405 13.765 20.0781 13.2429 20.0087C10.9141 19.6992 9.42263 18.6954 8.54282 17.5144C7.64939 16.315 7.34008 14.8713 7.49264 13.6212C7.62594 12.5288 8.08022 11.6671 8.88748 11.0595C9.56697 10.5481 10.5695 10.1625 12 10.0407V13C12 13.4045 12.2436 13.7691 12.6173 13.9239C12.991 14.0787 13.4211 13.9931 13.7071 13.7071L19.7071 7.70714C20.0976 7.31661 20.0976 6.68345 19.7071 6.29292L13.7071 0.292922C13.4211 0.00692445 12.991 -0.0786313 12.6173 0.0761497ZM17.5858 7.00003L14 10.5858V9.00003C14 8.44774 13.5523 8.00003 13 8.00003C10.7515 8.00003 8.96996 8.49432 7.68481 9.46154C6.37898 10.4443 5.69607 11.8326 5.50736 13.3789C5.34658 14.6964 5.55446 16.1491 6.19967 17.4886C4.7117 16.0191 4.01873 14.1349 4.00038 12.4889C3.98063 10.7178 4.7117 9.13421 6.16375 7.97055C7.63243 6.79354 9.90321 6.00003 13 6.00003C13.5523 6.00003 14 5.55231 14 5.00003V3.41424L17.5858 7.00003Z"
          fill="#7C8FA6"
        />
      )}
    </mask>
    <g mask={`url(#${undo ? 'undo' : 'redo'}-mask0)`}>
      <rect width="22" height="22" fill="#7C8FA6" />
    </g>
  </svg>
);

UndoRedoIcon.defaultProps = {
  undo: false,
  redo: false,
};

export default UndoRedoIcon;
