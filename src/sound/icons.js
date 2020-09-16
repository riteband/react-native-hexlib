import React from "react";
import {Svg, Path, Circle, Rect} from 'react-native-svg';

export function ScrubForwardShortIcon(props) {
    var size = props.size || "100%"

    return (
        <Svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fillRule="evenodd" clipRule="evenodd" d="M1.83333 11C1.83333 5.9455 5.9455 1.83333 11 1.83333C14.387 1.83333 17.3491 3.67707 18.9349 6.41667H15.5833V8.25H21.0833H22V7.33333V1.83333H20.1667V4.95573C18.2006 1.97455 14.8318 3.25839e-07 11 3.25839e-07C4.93442 3.25839e-07 6.51678e-07 4.93442 6.51678e-07 11H1.83333Z" fill="black"/>
            <Path d="M11 22C8.76463 22 6.62679 21.3309 4.8175 20.0994C1.82754 18.0642 3.25839e-07 14.686 3.25839e-07 11C3.25839e-07 4.92487 4.92487 0 11 0V1.83333C5.93739 1.83333 1.83333 5.93739 1.83333 11C1.83333 14.0727 3.35551 16.8865 5.84908 18.5838C7.35654 19.6099 9.13552 20.1667 11 20.1667V22Z" fill="black"/>
            <Path fillRule="evenodd" clipRule="evenodd" d="M13.7337 18.9281H15.1865V11.9167H13.7289L11.9165 13.1751V14.4967L13.7046 13.2626H13.7337V18.9281ZM19.2934 19.0835C20.9017 19.0835 21.9998 18.0729 21.9998 16.5861C21.9998 15.2207 21.0378 14.2344 19.6967 14.2344C18.9825 14.2344 18.4237 14.5308 18.137 15.0021H18.1079L18.2682 13.0828H21.5771V11.9167H17.1166L16.7717 15.9496H18.0836C18.3265 15.5463 18.7832 15.3033 19.3129 15.3033C20.0708 15.3033 20.6005 15.8475 20.6005 16.6249C20.6005 17.3878 20.0708 17.9223 19.3031 17.9223C18.6229 17.9223 18.0981 17.5141 18.0155 16.9213H16.6599C16.7036 18.1895 17.7872 19.0835 19.2934 19.0835Z" fill="black"/>
        </Svg>
    );
}

export function ScrubBackwardShortIcon(props) {
    var size = props.size || "100%"

    return (
        <Svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fillRule="evenodd" clipRule="evenodd" d="M19.36 11.44C19.36 6.58768 15.4123 2.64 10.56 2.64C7.30844 2.64 4.46483 4.40999 2.9425 7.04H6.16V8.8H0.88H0V7.92V2.64H1.76V5.6375C3.64745 2.77557 6.88143 0.880002 10.56 0.880002C16.383 0.880002 21.12 5.61704 21.12 11.44H19.36Z" fill="black"/>
            <Path fillRule="evenodd" clipRule="evenodd" d="M1.74454 19.0509H3.13923V12.32H1.73987L0 13.5281V14.7969L1.71655 13.6121H1.74454V19.0509Z" fill="black"/>
            <Path fillRule="evenodd" clipRule="evenodd" d="M7.08189 19.2002C8.62585 19.2002 9.68004 18.23 9.68004 16.8026C9.68004 15.4919 8.75646 14.545 7.46905 14.545C6.78336 14.545 6.24694 14.8295 5.97173 15.282H5.94374L6.09767 13.4395H9.27422V12.32H4.99218L4.661 16.1916H5.92042C6.15365 15.8044 6.59211 15.5712 7.10055 15.5712C7.82822 15.5712 8.33665 16.0936 8.33665 16.8399C8.33665 17.5723 7.82822 18.0854 7.09122 18.0854C6.43818 18.0854 5.93441 17.6936 5.85512 17.1245H4.55371C4.59569 18.3419 5.63588 19.2002 7.08189 19.2002Z" fill="black"/>
            <Path d="M10.5601 22C12.706 22 14.7583 21.3576 16.4953 20.1754C19.3656 18.2217 21.1201 14.9785 21.1201 11.44C21.1201 5.60788 16.3922 0.880005 10.5601 0.880005V2.64C15.4202 2.64 19.3601 6.5799 19.3601 11.44C19.3601 14.3898 17.8988 17.0911 15.5049 18.7204C14.0578 19.7055 12.35 20.24 10.5601 20.24V22Z" fill="black"/>
        </Svg>

    );
}

export function PauseIcon(props) {
    return (
        <Svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect width="6.85714" height="21" rx="1" fill="#000106"/>
            <Rect x="9.14282" width="6.85714" height="21" rx="1" fill="#000106"/>
        </Svg>
    );
}

export function PlayIcon(props) {
    return (
        <Svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M15.5393 11.4472L1.41267 20.8507C0.798465 21.2749 0 20.7446 0 19.8962V1.08911C0 0.240675 0.798465 -0.254249 1.41267 0.134619L15.5393 9.53816C16.1536 9.99773 16.1536 11.0229 15.5393 11.4472Z" fill="black"/>
        </Svg>
    );
}
