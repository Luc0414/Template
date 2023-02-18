import styled, { keyframes, css } from "styled-components";

export const mountAnimation = keyframes`
    0% {
      transform: translateY(20%);
    }
    100% {
      transform: translateY(0%);
    }
  `;

export const unmountAnimation = keyframes`
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(20%);
    }
  `;