export default function ModalImage(props) {
  const { image, onClose } = props;

  return (
    <div className="absolute top-auto md:left-[29%] left-0 z-10 flex flex-col items-center justify-center max-w-screen-sm w-full p-5 overflow-visible bg-transparent h-[107%] backdrop-blur-sm container">
      <div className="flex justify-end w-full cursor-pointer" onClick={onClose}>
        <span className="text-base font-bold text-soft-white">X</span>
      </div>
      <img src={image} loading="lazy" className="md:h-full" />
    </div>
  );
}
