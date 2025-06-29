import { handleFileChange } from "@/controllers/hero.controllers";
import { FormUtils } from "@/lib/interfaces";
import { useLoaderStore } from "@/store/loader-store";
import React from "react";
import styled from "styled-components";
import ImageLoader from "./image-loader";
import { Trash } from "lucide-react";

const ImageUploader: React.FC<{ formUtils: FormUtils }> = ({ formUtils }) => {
  const { setValue = () => {}, watch } = formUtils;
  const { setImageUploading: setImageUploadingRaw, isImageUploading } =
    useLoaderStore();
  const setImageUploading: React.Dispatch<React.SetStateAction<boolean>> = (
    value
  ) => {
    if (typeof value === "function") {
      // If a function is passed, call it with current state (assume false as default)
      setImageUploadingRaw((value as (prev: boolean) => boolean)(false));
    } else {
      setImageUploadingRaw(value);
    }
  };

  return (
    <>
      {isImageUploading ? (
        <ImageLoader />
      ) : (
        <StyledWrapper>
          {!watch("profileImageUrl") && (
            <label htmlFor="file" className="custum-file-upload">
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                      fill="currentColor"
                    />{" "}
                  </g>
                </svg>
              </div>
              <div className="text">
                <span>Click to upload image</span>
              </div>
              <input
                accept="image/*"
                id="file"
                type="file"
                onChange={(e) => {
                  handleFileChange(e, setValue, setImageUploading);
                }}
                hidden
              />
            </label>
          )}
          {watch("profileImageUrl") && (
            <div className="relative w-52 h-52 rounded-full group">
              <img
                className="rounded-full w-52 h-52 object-cover"
                src={watch("profileImageUrl") || ""}
                alt="Uploaded"
                width={200}
                loading="lazy"
              />
              {/* Mobile view trash */}
              <div
                onClick={() => {
                  setValue("profileImageUrl", "");
                }}
                className="absolute xl:hidden bottom-2 right-2 flex items-center justify-center cursor-pointer z-20"
              >
                <Trash
                  size={24}
                  className="text-red-500 bg-white bg-opacity-70 rounded-full p-1 hover:bg-gray-200"
                />
              </div>
              {/* Overlay */}
              <div className="absolute  inset-0 rounded-full bg-white opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none" />
              {/* Centered Delete Icon (visible on hover) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10  ">
                <Trash
                  onClick={() => {
                    setValue("profileImageUrl", "");
                  }}
                  size={40}
                  className="text-red-500 bg-white bg-opacity-70 rounded-full p-2 hover:bg-gray-200"
                />
              </div>
            </div>
          )}
        </StyledWrapper>
      )}
    </>
  );
};

const StyledWrapper = styled.div`
  .custum-file-upload {
    height: 208px;
    width: 208px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 2px dashed #212121;
    background-color: #212121 #e8e8e8;
    padding: 1.5rem;
    box-shadow: 0px 48px 35px -48px #e8e8e8;
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon svg {
    height: 80px;
    fill: #e8e8e8;
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: #170404;
  }

  .custum-file-upload input {
    display: none;
  }
`;

export default ImageUploader;
