import React from "react";

const Thinking: React.FC = () => {
  return (
    <>
      <style>
        {`
          .loader {
            display: flex;
            position: relative;
            bottom: 6.5px;
          }
          
          .loader div {
            margin-left: -0.2rem;
            border-radius: 100%;
            height: 1rem;
            width: 1rem;
          }

          .box-load1 {
            background-color: rgba(252,254,252,255);
            animation: brighten-dim 3.5s infinite;
            animation-delay: 0s;
          }
          
          .box-load2 {
            background-color: rgba(199,232,241,255);
            animation: brighten-dim 3.5s infinite;
            animation-delay: 0.5s;
          }
          
          .box-load3 {
            background-color: rgba(36,116,134,255);
            animation: brighten-dim 3.5s infinite;
            animation-delay: 1s;
          }
          
          @keyframes brighten-dim {
            0%, 100% {
              opacity: 0.5;
              box-shadow: none;
            }
            20% {
              opacity: 1;
              box-shadow: 0 0 5px white;
            }
            40%, 60% {
              opacity: 1;
              box-shadow: 0 0 5px white;
            }
            80% {
              opacity: 0.5;
              box-shadow: none;
            }
          }
        `}
      </style>
      <div className="loader">
        <div className="box-load1"></div>
        <div className="box-load2"></div>
        <div className="box-load3"></div>
      </div>
    </>
  );
}

export default Thinking;