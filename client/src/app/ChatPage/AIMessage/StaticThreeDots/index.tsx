import React from "react";

const StaticThinking: React.FC = () => {
  return (
    <>
      <style>
        {`
          .loader2 {
            display: flex;
            position: relative;
            bottom: 6.5px;
          }
          
          .loader2 div {
            margin-left: -0.2rem;
            border-radius: 100%;
            height: 1rem;
            width: 1rem;
          }

          .static-load1 {
            background-color: rgba(252,254,252,255);
          }
          
          .static-load2 {
            background-color: rgba(199,232,241,255);
          }
          
          .static-load3 {
            background-color: rgba(36,116,134,255);
          }
          }
        `}
      </style>
      <div className="loader2">
        <div className="static-load1"></div>
        <div className="static-load2"></div>
        <div className="static-load3"></div>
      </div>
    </>
  );
}

export default StaticThinking;