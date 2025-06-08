import React from "react";
import styled from "styled-components";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface RadioOption {
  id: string;
  label: React.ReactNode;
}

interface RadioProps {
  options: RadioOption[];
  register: UseFormRegister<{ layout: string }>; // Properly typed register
  setValue: UseFormSetValue<{ layout: string }>; // Properly typed setValue
}

const MechSelector: React.FC<RadioProps> = ({
  options,
  register,
  setValue,
}) => {
  return (
    <StyledWrapper>
      <div className="radio-input">
        <div className="switch-panel">
          <div className="track-groove" />
        </div>
        <div className="selector">
          {options.map((option) => (
            <div className="choice" key={option.id}>
              <div className="input-container">
                <input
                  {...register("layout")}
                  className="choice-switch"
                  name="mech-selector"
                  value={option.id}
                  id={option.id}
                  onChange={(e) => {
                    setValue("layout", e.target.value);
                  }}
                  type="radio"
                />
                <div className="lever" />
              </div>
              <label htmlFor={option.id} className="choice-plate">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .radio-input {
    display: flex;
    height: 280px;
    align-items: center;
    justify-content: center;
    padding: 25px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .radio-input {
      width: 100%;
    }
  }

  .switch-panel {
    z-index: 1;
    height: 240px;
    width: 70px;
    margin-right: 30px;
    background: linear-gradient(to bottom, #4a4a4a, #383838);
    border-radius: 10px;
    box-shadow: inset 0 5px 15px rgba(0, 0, 0, 0.6),
      inset 0 -5px 15px rgba(100, 100, 100, 0.2);
    position: relative;
    border: 3px solid #555;
  }

  .track-groove {
    position: absolute;
    inset: 10px;
    background: linear-gradient(90deg, #333, #444);
    border-radius: 5px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
  }

  .selector {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 220px;
  }

  .choice {
    display: flex;
    align-items: center;
    position: relative;
    transition: transform 0.2s cubic-bezier(0.6, -0.3, 0.4, 1.3);
  }

  .choice:hover {
    transform: scale(1.02);
  }

  .input-container {
    position: relative;
    width: 36px;
    height: 36px;
    margin-right: 20px;
    z-index: 2;
    perspective: 500px;
  }

  .choice-switch {
    appearance: none;
    height: 100%;
    width: 100%;
    border-radius: 8px;
    border: 3px solid #666;
    cursor: pointer;
    background: linear-gradient(45deg, #5a5a5a, #4a4a4a);
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5), 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .choice-switch:hover {
    border-color: #888;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5),
      0 0 10px rgba(255, 215, 0, 0.4);
  }

  .lever {
    z-index: 1;
    position: absolute;
    width: 28px;
    height: 28px;
    top: 50%;
    left: -73px;
    transform: translateY(-50%) rotateX(30deg);
    border-radius: 6px;
    background: linear-gradient(135deg, #ffd700, #d4af37);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5),
      inset 0 2px 4px rgba(255, 255, 255, 0.3);
    transition: left 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55),
      transform 0.4s cubic-bezier(0.7, 0, 0.3, 1.5), box-shadow 0.3s ease;
    will-change: left, transform;
  }

  .choice-switch:checked + .lever {
    left: 5px;
    transform: translateY(-50%) rotateX(0deg);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.6),
      inset 0 2px 4px rgba(255, 255, 255, 0.3);
  }

  .lever::after {
    content: "";
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .choice-switch:checked + .lever::after {
    opacity: 0.4;
    animation: glowPulse 1.5s infinite cubic-bezier(0.4, 0, 0.6, 1);
  }

  @keyframes glowPulse {
    0% {
      transform: scale(1);
      opacity: 0.4;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0.4;
    }
  }

  .choice-plate {
    color: #d4af37;
    font-size: 16px;
    font-weight: 700;
    font-family: "Arial", sans-serif;
    text-transform: uppercase;
    cursor: pointer;
    padding: 6px 12px;
    background: linear-gradient(to bottom, #444, #333);
    border: 2px solid #666;
    border-radius: 6px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    letter-spacing: 1.5px;
    position: relative;
  }

  .choice-plate:hover {
    color: #ffd700;
    border-color: #888;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4),
      0 0 10px rgba(255, 215, 0, 0.4);
  }

  .choice-switch:checked ~ .choice-plate {
    color: #ffd700;
    border-color: #ffd700;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4),
      0 0 15px rgba(255, 215, 0, 0.6);
    animation: plateGlow 0.8s infinite alternate;
  }

  @keyframes plateGlow {
    0% {
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), 0 0 5px rgba(255, 215, 0, 0.5);
    }
    100% {
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 215, 0, 0.8);
    }
  }

  .choice:hover .choice-switch:not(:checked) {
    border-color: #777;
  }

  .radio-input::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.05;
    pointer-events: none;
  }
`;

export default MechSelector;
