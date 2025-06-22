import React from "react";
import styled from "styled-components";

export interface RadioTabsProps<T extends string> {
  activeTab: T;
  setActiveTab: React.Dispatch<React.SetStateAction<T>>;
  tabs: T[];
}

function RadioTabs<T extends string>({
  activeTab,
  setActiveTab,
  tabs,
}: RadioTabsProps<T>) {
  return (
    <StyledWrapper>
      <div className="radio-input">
        {tabs.map((tab, index) => (
          <label
            key={tab}
            className={`label ${index === 0 ? "first" : ""} ${
              index === tabs.length - 1 ? "last" : ""
            }`}
          >
            <input
              type="radio"
              name="radio-tabs"
              value={tab}
              checked={activeTab === tab}
              onChange={() => setActiveTab(tab)}
            />
            <span className="text">{tab}</span>
          </label>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .radio-input {
    display: flex;
    align-items: center;
    gap: 2px;
    /* background-color: black; */
    padding: 4px;
    border-radius: 10px;
  }

  .radio-input input {
    display: none;
  }

  .radio-input .label {
    width: 90px;
    height: 60px;
    background: linear-gradient(to bottom, #fee685, #f2b523);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px;
    transition: all 0.1s linear;
    background-color: #3b3b3b;
    position: relative;
    cursor: pointer;
    box-shadow: 0px 17px 5px 1px rgba(0, 0, 0, 0.2);
  }

  .label:has(input[type="radio"]:checked) {
    box-shadow: 0px 17px 5px 1px #f7ebbe;
    background: linear-gradient(to bottom, #1d1d1d, #1d1d1d);
    border-top: none;
  }

  .label:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .label:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .label::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 103%;
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(
      to bottom,
      transparent 10%,
      transparent,
      transparent 90%
    );
    transition: all 0.1s linear;
    z-index: -1;
  }

  .label:has(input[type="radio"]:checked)::before {
    background: linear-gradient(
      to bottom,
      transparent 10%,
      #cae2fd63,
      transparent 90%
    );
  }

  .label .text {
    color: #232323;
    font-size: 15px;
    line-height: 12px;
    padding: 0px;
    font-weight: 800;
    text-transform: uppercase;
    transition: all 0.1s linear;
    text-shadow: -1px -1px 1px rgb(224, 224, 224, 0.1),
      0px 2px 3px rgb(0, 0, 0, 0.3);
  }

  .label input[type="radio"]:checked + .text {
    color: #fee685;
    text-shadow: 0px 0px 12px #cae2fd;
  }
`;

export default RadioTabs;
