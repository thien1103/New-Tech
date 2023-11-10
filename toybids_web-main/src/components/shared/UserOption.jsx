export const UserOption = () => {
  return (
    <div className=" flex-col items-start gap-[24px] p-6  bg-[#363636] rounded-[14px] fixed top-16 right-12">
      <div className="relative w-fit mt-[-1.00px] font-normal text-white text-base text-center tracking-[0.24px] leading-[32px] whitespace-nowrap">
        Settings
      </div>
      <div className="relative w-fit  font-normal text-white text-base text-center tracking-[0.24px] leading-[32px] whitespace-nowrap">
        Feedback
      </div>
      <div className="relative w-fit  font-normal text-white text-base text-center tracking-[0.24px] leading-[32px] whitespace-nowrap">
        Contact Us
      </div>
      <div className="inline-flex items-center justify-center gap-[4px] relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px]  font-normal text-white text-base text-center tracking-[0.24px] leading-[32px] whitespace-nowrap">
          Log Out
        </div>
      </div>
    </div>
  );
};
