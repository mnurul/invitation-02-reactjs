import "../../app.scss";
import style from "./cover.module.scss";
import icInvitation from "../../assets/icons/ic-invitation-gray.png";
import icScan from "../../assets/icons/ic-scan-gray.png";
import { Link, useSearchParams } from "react-router-dom";
import videoBG from "../../assets/videos/video-bg-main.mp4";

const Cover = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <div className="w-full h-full">
        <div
          className={`${style.cover} container max-w-screen-sm h-screen flex flex-col justify-center items-center relative`}
        >
          {/* background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          >
            <source src={videoBG}></source>
          </video>
          {/* content */}
          <div className="absolute">
            <div className="flex flex-col items-center">
              <span className="mt-40 text-sm tracking-[3px] text-white roboto-light">
                WEDDING INVITATION
              </span>
              <span className="mt-5 text-5xl font-light text-white great-vibes-regular">
                Qisti & Elgi
              </span>
              <span className="mt-40 text-sm font-light tracking-[3px] text-white roboto-light">
                Dear
              </span>

              {searchParams.get("to") != null ? (
                <span
                  className="text-lg text-white tracking-[3px] roboto-medium"
                  style={{ textTransform: "uppercase" }}
                >
                  {searchParams.get("to")}
                </span>
              ) : (
                <span className="text-lg text-white tracking-[3px] roboto-medium">
                  Tamu Undangan
                </span>
              )}
              {searchParams.get("to") != null ? (
                <Link
                  to={`/invitation/?to=${searchParams.get("to")}`}
                  className="flex flex-row items-center justify-center gap-2 px-5 py-2 mt-3 rounded-2xl bg-soft-white"
                >
                  <img
                    src={icInvitation}
                    alt="Logo"
                    className="object-cover h-4"
                  />
                  <span className="text-xs text-soft-green roboto-regular">
                    Open Invitation
                  </span>
                </Link>
              ) : (
                <Link
                  to={"#"}
                  className="flex flex-row items-center justify-center gap-2 px-5 py-2 mt-3 rounded-2xl bg-soft-white"
                >
                  <img
                    src={icInvitation}
                    alt="Logo"
                    className="object-cover h-4"
                  />
                  <span className="text-xs text-soft-green roboto-regular">
                    Open Invitation
                  </span>
                </Link>
              )}
              <div className="flex flex-row items-center justify-center gap-2 px-5 py-2 mt-3 rounded-2xl bg-soft-white">
                <img src={icScan} alt="Logo" className="object-cover h-4" />
                <label className="text-xs text-soft-green roboto-regular">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    capture="environment"
                  />
                  QR Check-in
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cover;
