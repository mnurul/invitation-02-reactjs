export default function ModalVideo(props) {
  const { video, onClose } = props;

  return (
    <div className="absolute top-auto md:left-[29%] left-0 z-10 flex flex-col items-center justify-center w-full p-5 overflow-visible bg-transparent h-[107%] backdrop-blur-sm container max-w-screen-sm">
      <div className="flex justify-end w-full cursor-pointer" onClick={onClose}>
        <span className="text-base font-bold text-soft-white">X</span>
      </div>
      <video autoPlay loop muted playsInline loading="lazy">
        <source src={video}></source>
      </video>
    </div>
  );
}
