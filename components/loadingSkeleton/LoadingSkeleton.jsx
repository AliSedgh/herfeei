import Skeleton from "react-loading-skeleton";

const FullSkeleton = () => {
  return (
    <Skeleton
      containerClassName="w-full h-full absolute top-[-3px] left-0"
      className="w-full h-full"
    />
  );
};

export { FullSkeleton };
