import Subheader from "@/components/resusables/Subheader";
import SubSectionsWrapper from "@/layouts/sub-section-wrapper";
import { FormUtils } from "@/lib/interfaces";
import React from "react";

const ProfileDetails: React.FC<{ formUtils: FormUtils }> = (
  {
    //  formUtils
  }
) => {
  // const { register, setValue, watch } = formUtils;

  // zod

  return (
    <SubSectionsWrapper>
      {/* Layout and alignment sub-section */}
      <section>
        <Subheader heading="Profile Details" />
      </section>
    </SubSectionsWrapper>
  );
};

export default ProfileDetails;
